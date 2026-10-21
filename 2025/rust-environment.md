---
title: Windows 下 Rust 环境配置踩坑
url: https://blog.kisechan.space/2025/rust-environment/
type: post
time: '2026-10-21T16:02:14.153Z'
---

## 下载 `rustup`

[`rustup`](https://win.rustup.rs/x86_64) 是 Rust 的安装程序和版本管理程序。

## 环境选择

Windows 环境下， Rust 编译生成 `.obj` 或 `.rlib` 文件后，还需要进行链接，才能产生 `.exe` 或 `.dll` ，但它本身并不内置链接器，所以使用的是 C/C++ 提供的链接器：

- MSVC 工具链：`link.exe`（来自 Visual Studio）
- GNU 工具链使用的是：`ld.exe`（来自 MinGW）

## 安装

Rust 安装默认是安装到 C 盘，如果要将 Rust 安装到别的磁盘，可以事先将 `CARGO_HOME` 和 `RUSTUP_HOME` 两个用户变量设置好[^1]，值就是自定义的目标安装路径，例如：

- `CARGO_HOME` : `D:\Rust\cargo_home`
- `RUSTUP_HOME`: `D:\Rust\rustup_home`
  然后可以把 `%CARGO_HOME%` 和 `%RUSTUP_HOME%` 加到 `PATH` 里（不手动加应该也行）。
  运行 `rustup-init.exe` ，选择配置 MSVC 工具链或 GNU 工具链。

### GNU 工具链[^2]

首先配置 MSYS2 环境，将 `mingw64\bin` 添加到 `PATH` ，在 MSYS2 命令行中输入：

```bash
curl https://sh.rustup.rs -sSf | sh
```

然后按照下面的顺序配置环境：

```text
Current installation options:

   default host triple: x86_64-pc-windows-msvc
     default toolchain: stable (default)
               profile: default
  modify PATH variable: yes

1) Proceed with installation (default)
2) Customize installation
3) Cancel installation
>2

I'm going to ask you the value of each of these installation options.
You may simply press the Enter key to leave unchanged.

Default host triple? [x86_64-pc-windows-msvc]
x86_64-pc-windows-gnu

Default toolchain? (stable/beta/nightly/none) [stable]
stable

Profile (which tools and data to install)? (minimal/default/complete) [default]
complete

Modify PATH variable? (Y/n)
Y

Current installation options:

   default host triple: x86_64-pc-windows-gnu
     default toolchain: stable
               profile: complete
  modify PATH variable: yes

1) Proceed with installation (default)
2) Customize installation
3) Cancel installation
>
```

到这里就配置好了。本人一开始就是使用 GNU 工具链配置环境的（之前嫌麻烦把 VS 删了不想下回来），但是运行 helloworld 的时候就出了错：

```rust
fn main() { println!("Hello, world!"); }
```

> VSCode 输出：
>
> ```text
> Caused by: %1 不是有效的 Win32 应用程序。 (os error 193)
> ```

错误原因不明[^3]，可能是 MSYS2 环境有问题，看来 Windows 搞这些确实用 MSVC 最好。

### MSVC 工具链

安装 [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/)，只用勾选 C++ 环境的这两项：

- `MSVC v143 - VS 2022 C++ x64/x86 build tools`

- `Windows 10 SDK`

然后打开安装程序一路默认即可。

## 参考和注解

[rust圣经](https://course.rs/about-book.html)

[^1]: https://blog.csdn.net/love906897406/article/details/126048624

[^2]: https://course.rs/first-try/installation.html#%E5%9C%A8-windows-%E4%B8%8A%E5%AE%89%E8%A3%85-rustup

[^3]: 可能可以参考： https://www.cnblogs.com/qumogu/p/16412076.html 和 https://zhuanlan.zhihu.com/p/613466378
