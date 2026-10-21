---
title: 用 Wine 在 Mac 上玩一些老 galgame 的方法
url: https://blog.kisechan.space/2026/games-for-mac/
type: post
time: '2026-10-21T16:13:46.163Z'
---

最近想在 macOS 上玩一些 Windows 老游戏，主要是体积不大的 `.exe` 小游戏和视觉小说。我的机器是 Apple Silicon Mac，所以玩 Windows 游戏要多一层架构转换问题。

最开始考虑的是直接使用 wine-stable：

```shell
brew install --cask wine-stable
```

实际尝试后发现 Homebrew 里的 `wine-stable` 已经因为 Gatekeeper 检查问题被禁用了，所以就换了个思路，选择了 Sikarugir。

Sikarugir 是一个面向 macOS 的 Wine Wrapper 管理工具。它把 Wine、Wine Prefix、Windows 虚拟磁盘、图形转换层和 macOS 的 `.app` 封装整合在一起，比较适合在 Apple Silicon Mac 上管理和运行 Windows 软件。

---

Sikarugir-App/Sikarugir
https://github.com/Sikarugir-App/Sikarugir

---

## 理解

Wine 的作用是把 Windows API 调用转换成 Unix/macOS 能理解的调用，Windows 程序仍然是原来的 `.exe`，Wine 提供它期待的 Windows 运行环境。一个典型 Wine 环境大致包括：

- Windows API compatibility layer
- Registry
- `C:`
- DLL
- `Program Files`

Wine 会给每个环境建立一个 Prefix，大致就是一个轻量的 Windows 用户空间：

```text
prefix/
├── drive_c/
│   ├── Program Files/
│   ├── Program Files (x86)/
│   ├── users/
│   └── windows/
├── system.reg
├── user.reg
└── dosdevices/
```

`drive_c/` 就是 Windows 程序看到的 `C:\`。

---

而 Sikarugir 在这个基础上又做了一层 macOS 封装，于是最终一个 Windows 软件会变成一个普通 macOS 应用。除此之外 DirectX 的图形 API 转换也集成在了 Sikarugir 里面。

## 安装

Apple Silicon 首先需要 Rosetta 2。

```shell
/usr/sbin/softwareupdate --install-rosetta --agree-to-license
```

然后可以通过 brew 安装 Sikarugir 官方 tap：

```shell
brew trust Sikarugir-App/sikarugir
brew install --cask Sikarugir-App/sikarugir/sikarugir
```

安装完成以后，会出现 `Sikarugir Creator.app`，它的作用就是创建和管理不同的 Wine Wrapper。

## 创建

第一次创建 Wrapper 时，Sikarugir 会要求选择 Wine Engine，可以使用最新版本的 Engine。然后虚拟 C 盘、Windows 注册表、Wine Prefix 等内容都会自动配置。
