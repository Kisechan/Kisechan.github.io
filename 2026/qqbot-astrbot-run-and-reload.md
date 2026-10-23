---
title: 在各种情况导致 QQBot 崩了以后进行重新启动的快捷方式
url: https://blog.kisechan.space/2026/qqbot-astrbot-run-and-reload/
type: post
time: '2026-10-23T14:43:06.486Z'
---

最近用 Napneko+Astrbot 重新部署了一下 QQ 机器人，但是频频出现问题，重启都麻烦，所以记录一下。

## 重新启动 Napcat

进入服务器，直接输入 `Napcat` （适用于我现在这样安装了 Napcat CLI 工具的情况），就可以按照之前配置的来重新启动。

千万不要修改配置，直接启动就可以了，除非登录不上。这样的话可以直接启动 webUI，在 webUI 里面工作没那么麻烦。

## 重新启动 AstrBot

进入 `~/astrbot` 路径（一般会有 `data` 子路径），输入 `astrbot run`，即可启动。

但是这个时候 AstrBot 会阻塞终端，可以先按 <kbd>Ctrl</kbd>+<kbd>Z</kbd> 然后输入下面的命令脱离：

```bash
bg
# 把刚才的任务转移到后台运行

disown
# 让任务和当前终端解绑，要不然退出终端进程就会被杀掉
# 如果忘掉了这个，就用下面的方式：

disown -h %1
# %1 是任务编号，可以用 jobs 查看
```

但是更推荐用 `screen` 直接让 AstrBot 在后台运行：

```bash
screen -dmS [任务名称] bash -c "astrbot run"
```
