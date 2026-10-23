---
title: 用AstrBot框架搭建一个qq机器人
url: https://blog.kisechan.space/2025/qqbot-astrbot/
type: post
time: '2026-10-23T15:19:31.963Z'
---

## 部署框架

**框架**提供的是机器人的基础功能，简化开发流程。

AstrBot 官方文档：https://astrbot.app/

博主使用的是官方提供的一键安装器部署[^1]，也可以使用 Docker [^2]。

[^1]: https://astrbot.app/deploy/astrbot/windows.html

[^2]: https://astrbot.app/deploy/astrbot/docker.html

安装完毕后就可以按照命令行的输出打开控制面板了。

## 部署协议端

**协议端**负责用 Websocket 等协议和聊天软件的服务器通信，并处理收发信息逻辑。

### Napcat[^3]

[^3]: https://napneko.github.io/

博主尝试过部署 Napcat ，但是在唤起 QQ 客户端时， QQ 会直接崩溃，需要解决方案。

### Lagrange[^4]

[^4]: https://lagrangedev.github.io/Lagrange.Doc/

根据文档配置好 `appsettings.json` 后，就可以扫描二维码登录 QQ ，就算是连接上机器人了。

## 部署完成

效果如图：

![部署完成后的仪表盘](https://images.kisechan.space/astrbot-showtime.png)

---
