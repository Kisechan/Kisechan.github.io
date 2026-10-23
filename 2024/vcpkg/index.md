---
title: 利用vcpkg在VS中配置第三方库环境
url: https://blog.kisechan.space/2024/vcpkg/
type: post
time: '2026-10-23T14:43:06.486Z'
---

vcpkg是一个跨平台的C++包管理工具，可以自动下载、构建和配置第三方库，十分方便。

## 安装

克隆vcpkg的源代码：

```bash
git clone https://github.com/microsoft/vcpkg
```

## 构建

clone完成后，进入vcpkg目录，运行：

```bash
.\bootstrap-vcpkg.bat
```

以构建vcpkg。

不太需要给vcpkg设置环境变量。

## 集成至VS

```bash
.\vcpkg integrate install
```

此命令会将vcpkg的路径添加到VS的环境变量，从而能够自动配置第三方库。

## 配置库

```bash
.\vcpkg install [库名称]
```

自动安装库，如果已经将vcpkg集成至VS，那么VS会自动检测到已安装的库。

如果自动集成没有成功，在VS中检测不到安装的库，那么就需要手动配置设置：

- **C/C++-常规-附加包含目录：**添加vcpkg下载的包目录的include路径
- **链接器-常规-附加库目录：**添加vcpkg下载的包目录的lib路径
- **链接器-输入-附加依赖项：**添加需要的库文件

删除已下载的库：

```bash
.\vcpkg remove [库名称]

# 如果该包被其他包依赖，vcpkg会提示你删除依赖项或强制删除
# 加上--recurse选项就可以强制删除
```
