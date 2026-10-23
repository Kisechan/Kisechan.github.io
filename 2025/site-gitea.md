---
title: 自部署 Gitea
url: https://blog.kisechan.space/2025/site-gitea/
type: post
time: '2026-10-23T15:19:31.963Z'
---

## 部署

可以直接访问[这里](https://gitea.kisechan.space/)。

## 弯路

第一次上手玩服务器，试着部署了 Gitea，还是走了不少弯路的。

### 基本环境

- **Linux (ubuntu 20.04) (2C1G, Azure, East Asia)**

- Gitea 二进制包部署

- Nginx 反向代理

- Certbot 配置 HTTPS

- SQLite 数据库

### 流程

1. 安装主程序
2. 配置 `systemd` 服务
3. 申请 HTTPS

### 问题和解决

#### 无管理员用户

因为 SQLite 没有正常初始化（我的问题）， `app.ini` 的 `INSTALL_LOCK` 也有问题，所以出现了没有初始化界面的情况。

所以只能通过手动到数据库里创建一个管理员用户了：

```bash
sudo -u git /usr/local/bin/gitea admin user create \
  --config /etc/gitea/app.ini \
  --username admin --password '密码' \
  --email 邮箱 --admin
# 记得修改不一样的参数
```

#### HTTPS 配置失败

Certbot 提示：

```text
Fetching http://<domain>/.well-known/...: Timeout during connect (likely firewall problem)
```

主要的原因是：

- `UFW` 防火墙：没有放行 80/443 端口。
- **Azure 的网络安全组也没有放行这两个端口**，导致访问不到。

## 感想

第一次玩服务器，还是学到了挺多东西的，嗯嗯嗯嗯。
