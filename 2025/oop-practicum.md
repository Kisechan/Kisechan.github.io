---
title: 面向对象程序设计课设心得
url: https://blog.kisechan.space/2025/oop-practicum/
type: post
time: '2026-10-24T09:09:07.707Z'
---

# 题设：电商系统

利用**C/S框架**完成一个电商系统的开发：
![主要功能](https://images.kisechan.space/202501111458665.png)

![性能要求](https://images.kisechan.space/202501111459828.png)

根据题设，可以依据如下的架构完成该项目：

<img src="https://cdn.jsdelivr.net/gh/Kisechan/Picture-Bed-Kisechan@master/img/202501111454468.svg" alt="主要流程设计">

项目主要采用的语言为**Golang和C++**。

[本项目Github仓库](https://github.com/Kisechan/oop_practicum)

# 后端

## Web服务

项目的Web服务采用的是Golang的Gin框架，以为前端提供api。

```go
package route

import (
	"fmt"
	"web_sql/control"

	"github.com/gin-gonic/gin"
)

func APIInit() {
	r := gin.Default()
	SetupRoutes(r)
	r.Run(":8080")

	fmt.Println("Web API Start at 8080 Successfully")
}
func SetupRoutes(r *gin.Engine) {
	userRoutes := r.Group("/users")
	{
		userRoutes.POST("/register", control.RegisterHandler)
		userRoutes.POST("/login", control.LoginHandler)
		userRoutes.GET("/profile/:id", control.GetUserInfoHandler)
		userRoutes.PUT("/profile", control.UpdateUserInfoHandler)
		userRoutes.PUT("/change-password", control.ChangePasswordHandler)
	}
	productRoutes := r.Group("/products")
	{
		productRoutes.GET("/", control.GetProductsHandler)
		productRoutes.GET("/:id", control.GetProductsHandler)
		productRoutes.POST("/search", control.SearchProductsHandler)
	}
	cartRoutes := r.Group("/cart")
	{
		cartRoutes.POST("/items", control.AddCartHandler)
		cartRoutes.DELETE("/items/:id", control.RemoveCartHandler)
		cartRoutes.GET("/items", control.GetCartHandler)
	}
	reviewRoutes := r.Group("/reviews")
	{
		reviewRoutes.POST("/", control.CreateReviewHandler)
		reviewRoutes.GET("/product/:id", control.GetProductReviewsHandler)
	}
	couponRoutes := r.Group("/coupons")
	{
		couponRoutes.GET("/user/:id", control.GetUserCouponsHandler)
		couponRoutes.POST("/use", control.UseCouponHandler)
	}
	orderRoutes := r.Group("/orders")
	{
		orderRoutes.POST("/checkout", control.CheckoutHandler)
		orderRoutes.GET("/checkout/result/:order_number", control.GetCheckResultHandler)
		orderRoutes.GET("/:id", control.GetOrdersHandler)
	}
}
```

前端通过JSON和HTTP协议，向后端传递请求，并接受Gin返回的信息。

## 持久层

项目的持久层采用的是GORM框架对MySQL数据库进行映射和数据库的CURD操作，对于简单的CURD，可以采用Golang的泛型编程，例如：

```go
func GetID[T any](db *gorm.DB, id int, preloads ...string) (*T, error) {
	var record T
	query := db
	for _, preload := range preloads {
		query = query.Preload(preload)
	}
	err := query.First(&record, id).Error
	return &record, err
}
```

## Redis

在Golang部分的项目里，通过配置**Go-Redis**的环境能够让Go客户端也访问Redis。在C++中则可以使用**hiredis库**（配置环境可以参考[这一篇博客](https://kisechan.github.io/2024/vcpkg/)）

### 缓存

对于一些经常需要查询的信息，可以把它们放到Redis缓存中（`SET`命令）以避免过于频繁地访问数据库，当数据库里面的东西被改动时，再删掉Redis里的缓存信息（`DEL`命令）。

Golang连接Redis服务端：

```go
var (
	ctx = context.Background()

	redisClient = redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})
)

func RedisInit() {
	ctx := context.Background()
	_, err := redisClient.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	}
}
```

在缓存中查询信息则可以参考：

```go
func GetAllProductsHandler(c *gin.Context) {
	// 尝试从 Redis 缓存中获取所有商品信息
	cacheKey := "all_products"
	cachedProducts, err := redisClient.Get(ctx, cacheKey).Result()
	if err == nil {
		// 如果缓存中存在商品信息，直接返回
		var products []rep.Product
		if err := json.Unmarshal([]byte(cachedProducts), &products); err == nil {
			c.JSON(http.StatusOK, gin.H{
				"products": products,
			})
			return
		}
	}

	// 查询所有商品
	var products []rep.Product
	if err := rep.DB.Find(&products).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch products"})
		return
	}

	// 将商品信息存入 Redis 缓存
	productsJSON, err := json.Marshal(products)
	if err == nil {
		redisClient.Set(ctx, cacheKey, productsJSON, time.Hour) // 缓存 1 小时
	}

	// 返回商品信息
	c.JSON(http.StatusOK, gin.H{
		"products": products,
	})
}
```

### 消息队列

本项目利用Redis的`LPush`、`LPop`等操作实现消息队列（现在Redis也有更消息队列的操作了，不一定就需要完全这样），和C++业务层实现高性能的通讯：

```go
// 将结算请求推送到Redis消息队列
func PushToRedisQueue(queueName string, data map[string]interface{}) error {
	jsonData, err := json.Marshal(data)
	if err != nil {
		return err
	}
	return redisClient.LPush(context.Background(), queueName, jsonData).Err()
}
```

在推送到Redis后，会有一个信息的消费者，持续消费另外一端传来的消息：

```cpp
void consumeRedisMessages(redisContext* context) {
    std::cout << "Starting Consuming Redis Messages" << std::endl;
    while (true) {
        redisReply* reply = (redisReply*)redisCommand(context, "BLPOP checkout_queue 0");
        if (reply && reply->type == REDIS_REPLY_ARRAY && reply->element[1]) {
            std::string message(reply->element[1]->str, reply->element[1]->len);
            std::cout << "Received message: " << message << std::endl;
            if (message == "") {
                std::cout << "Message is empty! Continue!" << std::endl;
                continue;
            }
            processCheckoutRequest(message);
        }
        freeReplyObject(reply);
    }
}
```

这样利用消息队列，就可以成功解耦小部件之间的关系。

## C++业务层

C++业务层主要的职责就是对订单进行处理、验证（结算部分通过前端预结算差不多做好了，后端就偷个懒），在这一过程中，其实不太需要访问到数据库，直接对Redis缓存中的信息进行验证、减少，就可以了。

### 通信

C++业务层利用**Boost.Asio、Boost.Beast**等库进行HTTP通信，发送JSON，调用Golang那一端的api。

### 异步

为了实现在高并发情景下的性能，C++业务层利用多线程（没有对线程池优化）完成异步地订单持久化（存入数据库）和更新库存这样耗时长的操作。

但是这样就会有一个问题：**在高并发环境下，多个线程进行同一个操作未免不会导致竞争和冲突**，那么就需要**锁**来避免。本项目采用的是Redis提供的分布式锁（`SET`命令实现），这样，在一个线程访问资源时，设置分布式锁，别的线程就不能够访问了。

```cpp
#include "lock.h"

// 获取分布式锁
bool acquireLock(redisContext* context, const std::string& lockKey, int timeout) {
    std::string command = "SET " + lockKey + " locked NX EX " + std::to_string(timeout);
    redisReply* reply = (redisReply*)redisCommand(context, command.c_str());
    if (reply == nullptr || reply->type == REDIS_REPLY_ERROR) {
        std::cerr << "Failed to acquire lock: " << (reply ? reply->str : "Unknown error") << std::endl;
        freeReplyObject(reply);
        return false;
    }
    bool lockAcquired = (reply->type == REDIS_REPLY_STATUS && std::string(reply->str) == "OK");
    freeReplyObject(reply);
    return lockAcquired;
}

// 释放分布式锁
void releaseLock(redisContext* context, const std::string& lockKey) {
    redisReply* reply = (redisReply*)redisCommand(context, "DEL %s", lockKey.c_str());
    if (reply == nullptr || reply->type == REDIS_REPLY_ERROR) {
        std::cerr << "Failed to release lock: " << (reply ? reply->str : "Unknown error") << std::endl;
    }
    freeReplyObject(reply);
}
```

用`mutex`设置全局锁也可以，但是全局锁性能肯定不及分布式锁。

# 前端

课题要求不能采用Web编程，于是采用的是Golang的Fyne框架进行桌面应用UI的开发。Fyne目前的功能不多，本人不是很推荐使用。

# 总结

其实做这样的一个前后端分离的项目，最难的部分其实是在**思路**这一方面。只有想清楚了每一部分是什么职能、如何实现才能够去完成自己的项目。在打好了基础以后，再进行优化，那就简单多了。
