---
title: 网页浏览计数服务
url: https://blog.kisechan.space/2025/view-counter/
type: post
time: '2026-10-21T16:02:14.153Z'
---

使用 Golang 和 Gin 实现一个简单的网页浏览计数服务。

<a href="https://github.com/Kisechan/View-Counter" name="https://github.com/fluidicon.png" class="LinkCard">View Counter</a>

## 简介和技术栈

项目的目标是创建一个提供 API 的后端服务，它可以：

- **记录访问**：每当有用户访问网站时，通过调用 API 增加计数值
- **获取访问量**：提供一个接口，让前端能够获取并展示总访问量
- **多网站支持**：能够自动识别请求来源，为不同的网站独立统计
- **稳定防刷**：具备基础的 API 请求频率限制，防止恶意请求

为此选择了以下技术栈：

- **后端语言**：[Go](https://go.dev/)
- **Web 框架**：[Gin](https://gin-gonic.com/)
- **数据库**：[SQLite3](https://www.sqlite.org/index.html)
- **并发控制**：`sync.Mutex`
- **反代理与部署**：[Nginx](https://nginx.org/) 和 [Systemd](https://systemd.io/)

## 部署流程

1. 构建
2. 创建 Systemd 服务
3. Nginx 反代理

## 参考和注解
