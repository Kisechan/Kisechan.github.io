---
title: 在服务器上比较优雅地使用 Agent
url: https://blog.kisechan.space/2026/server-agent-workflow/
type: post
time: '2026-10-21T16:02:14.153Z'
---

用的是 Mac remote 连接 ubuntu 22.04 的服务器，摸索出来了一套还可以的 agent workflow。

## 代理

安装的是 mihomo，只有 CLI 界面也可以方便使用。

## OpenCode

博主喜欢使用 OpenCode 提供的 WebUI 界面，_TUI 才是需要被淘汰的_。

可以使用 WebUI 和 SSH 隧道的方式来，首先在服务器上配置：

```bash
# 安装 opencode
curl -fsSL https://opencode.ai/install | bash

# 在服务器 localhost 上启动 web 服务
OPENCODE_SERVER_PASSWORD=【密码】 opencode web --port 【端口号，一般是 4096】
```

然后在 Mac 上打开 SSH 隧道，例如：

```zsh
ssh -p 【服务器端口】 -N -L 4096:localhost:4096 【用户】@【IP】
```

这样就可以在本机的 `localhost:4096` 使用远程的 OpenCode WebUI，当然这利用的是远程服务器上的 OpenCode 配置，还需要再配置一下 AI API。

## Codex

Codex 官方提供了 SSH 的方法，只需要在服务器上安装 Codex CLI 并登录账号，然后在本机连接即可。

## 注解与参考

1. https://opencode.ai/docs/zh-cn/web/
2. https://learn.chatgpt.com/docs/codex/cli
