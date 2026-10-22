---
title: 体验 Rust 的特性
url: https://blog.kisechan.space/2025/rust-taste/
type: post
time: '2026-10-22T16:41:52.395Z'
---

众所周知， Rust 是一个**无 GC 且无需手动内存管理、性能高、工程性强、语言级安全性以及能同时得到工程派和学院派认可的语言**[^1]。这篇文章就记录一下本人在*工程*中感受到的， Rust 作为一个“现代语言”的一些**特性**（语法、用法等，个人感觉它的语法用法比起 C/C++ 之类的语言确实怪很多，比 Golang 还更有风格）。

我最近正在用 Rust 做的课程项目（环境：WSL/Ubuntu 22.04），目标是模仿 [Stanford CS346](https://web.stanford.edu/class/cs346/2015/) 的 RedBase 实现一个自己的小型数据库引擎：

<a href="https://github.com/Kisechan/db-engine" name="https://github.com/fluidicon.png" class="LinkCard">db-engine</a>

## 类型和变量绑定

Rust 默认变量不可变，通过 `mut` 关键字显式声明可变性，且类型放在变量后面，这一点和 Go 比较像：

```rust
let x = 5;
let mut y: i64 = 10.0;
```

函数也是这样：

```rust
fn add<T: std::ops::Add<Output = T>>(x: T, y: T) -> T {
    x + y
}	// 泛型写法 -> 就表示返回值类型
```

## 所有权和借用系统

Rust 在编译器就能保证**内存安全**（比 C/C++ 的混乱手动管理高到不知道哪里去了）就是靠这一套系统，不需要垃圾回收机制。

### 所有权

Rust 规定每个值有且只有**一个所有者**，当所有者离开作用域时，值会自动销毁（调用 `drop`）。变量受到转移（`move`）时，所有权随之转移。

```rust
let s1 = String::from("hello");
let s2 = s1; // s1 不再有效（被转移了）
```

### 引用和借用

Rust 的借用和引用是**一个操作的两个概念**[^2]。引用指的是语法层面的（通过 `&` 运算符做到），借用则是意图层面上的概念。

```rust
fn print(s: &String) {
    println!("{}", s);
}
```

引用/借用不会转移所有权，这个引用和 C++ 的引用不一样，有**可变借用和不可变借用两种**，这样可以在编译阶段就避免数据竞争。

- `&T` 是不可变借用；

- `&mut T` 是可变借用；

Rust 要求同一时刻必须满足：

- 可以有**多个不可变借用**。
- 但只能有**一个可变借用**。

### 生命周期

生命周期比较复杂，它用于描述**引用的有效范围**，编译器通过生命周期检查避免垂悬引用。

例如：

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
```

`<'a>` 声明生命周期参数，告诉编译器返回值与参数同寿命。

## 错误

### 错误处理

Rust 用 `Result<T, E>` 与 `Option<T>` 表示错误，

```rust
fn read() -> Result<String, std::io::Error> { ... }
fn find() -> Option<i32> { ... }
```

`Result<T, E>` 是一个枚举，可能返回 `Ok(T)` 或 `Err(E)`。

`Option<T>` 也是一个枚举，可能返回 `Some(T)` 或 `None`。

### 错误传播

Golang 的错误处理：

```go
if err != nil {}
```

而这种处理可以在 Rust 中等价替换成用问号运算符 `?` 的版本：

```rust
let content = std::fs::read_to_string("hello.txt")?;
```

问号运算符也可以展开成：

```rust
match std::fs::read_to_string("hello.txt") {
    Ok(v) => v,
    Err(e) => return Err(e),
}
```

成功了就返回 `v`，否则返回 `Err(e)`。

## 包和模块

```text
crate
 ├── mod a
 └── mod b
```

Rust 的模块系统以 `crate` 为根：

- `crate::`：当前包根路径

- `super::`：上级模块

- `self::`：当前模块

- `pub`：公开可见

```rust
mod utils {
    pub fn greet() { println!("hi"); }
}
fn main() {
    crate::utils::greet();
}
```

Rust 的模块系统强封装比 C++ 的命名空间更严格，也比 Golang 的包系统更精细。

## 宏

定位类似于 C++ 的预处理，是一系列以 `!` 结尾的语句（但是不是所有 `!` 结尾的都是宏）。

|      宏      |     功能     |              示例              |
| :----------: | :----------: | :----------------------------: |
|  `println!`  |   标准输出   |    `println!("x = {}", x)`     |
| `assert_eq!` |   断言相等   |       `assert_eq!(a, b)`       |
|   `panic!`   |   抛出错误   |       `panic!("fatal")`        |
|    `vec!`    |   创建向量   |     `let v = vec![1,2,3];`     |
|  `format!`   | 格式化字符串 | `let s = format!("x = {}", x)` |
|   `todo!`    |  待实现标记  |        `todo!("later")`        |

也可以自定义宏：

```rust
macro_rules! say_hello {
    () => {
        println!("Hello, world!");
    };
}
```

## 面向对象

Rust 不存在类，它的类是通过**结构体**（`struct`，相当于 C++ 类的数据结构）和**实现**（`impl`，相当于 C++ 类的成员函数）实现的。并且可以通过**特征**（`trait`）实现多态。

```rust
trait Speak {
    fn speak(&self);
} // 特征，可以实现多态函数

struct Dog; // 结构体，存放数据结构
impl Speak for Dog {
    fn speak(&self) {
        println!("Woof!");
    }
} // 实现
```

Rust 的面向对象是“基于行为的组合”，不是“基于类的继承”。

## 属性

在结构前标记 `#[derive(...)]`，代表着为这个结构体/其他东西生成一些默认的代码，例如深拷贝函数 `Clone` 等。

```rust
#[derive(Debug, Clone, Copy, PartialEq)]
struct Point { x: i32, y: i32 }
```

这个例子中，编译器会让这些 `derive` 宏自动生成实现下面功能的代码：

- `Debug`：可打印 Debug 信息。
- `Clone` / `Copy`：可复制。
- `PartialEq`：可比较。

## 其他特别功能

### 枚举

```rust
match value {
    0 => println!("zero"),
    1..=9 => println!("small"),
    _ => println!("other"),
}
```

Rust 的枚举是其他语言枚举的扩展，它不仅可以枚举值，还可以枚举：

- 匹配范围、结构体
- 类型
- 带有绑定、条件

枚举强制要求必须**覆盖所有情况**。

### 闭包

```rust
let add = |x, y| x + y;
println!("{}", add(2, 3));
```

闭包就是**匿名函数**，但是样式比较独特 `| |`。

因为足够独特，所以记录下来。

[^1]: [Rust 圣经的介绍](https://course.rs/into-rust.html)

[^2]: [评论区的讨论](https://course.rs/basic/ownership/borrowing.html)

## 参考和注解
