---
title: 把 Docker 安装到别的磁盘
url: https://blog.kisechan.space/2025/docker-anotherdisk/
type: post
time: '2026-10-22T16:41:52.395Z'
---

## 安装

博主把 Docker 安装到 C 盘导致 C 盘爆炸，需要把它挪个地方。

以管理员模式打开 cmd 对 `Docker Desktop Installer.exe` 执行：

```cmd
"Docker Desktop Installer.exe" install --installation-dir="[目标路径]"
```

如果用 powershell 的话，因为 powershell 语法比较严格，所以命令最前面就必须加上`&`。否则 powershell 就会把安装程序的名字解析成一个字符串，而不是一个可执行程序。

部署 wsl2 的时候也可以用类似的方法把它安装到别的盘符。
