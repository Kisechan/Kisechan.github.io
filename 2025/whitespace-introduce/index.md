---
title: 难绷语言之 Whitespace
url: https://blog.kisechan.space/2025/whitespace-introduce/
type: post
time: '2026-10-21T16:13:46.163Z'
---

## 简介

Whitespace 是一个由 Edwin Brady 和 Chris Morris 在 2002 年创造的语言[^1]，因为年代过于久远官网早就挂掉了，所以只能通过网站时光机访问： https://web.archive.org/web/20150523181043/http://compsoc.dur.ac.uk/whitespace/index.php 。

[^1]: https://en.wikipedia.org/wiki/Whitespace_(programming_language)#History

## 指令

Whitespace 的基本指令只有空格、制表符、换行符三种字符，其他的所有可见文字都会被当成注释忽略掉。

主要操作有：

- 栈（以 ` ` 开头）

  - ` ` + ` ` + `（数字）`：将数字压入栈（` ` 后跟二进制表示的数字，以 `\n` 结束）

  - ` ` + `\n` + ` `：复制栈顶元素

  - ` ` + `\t` + ` `：交换栈顶两个元素

  - ` ` + `\n` + `\t`：丢弃栈顶元素

- 算术运算（以 `\t ` 开头）

  - `\t` + ` ` + ` `：加法

  - `\t` + ` ` + `\t`：减法

  - `\t` + ` ` + `\n`：乘法

  - `\t` + `\t` + ` `：除法

  - `\t` + `\t` + `\t`：取模

- 堆操作

  - `\t` + `\n` + ` `：将栈顶值存储到堆中（地址由次栈顶指定）

  - `\t` + `\n` + `\t`：从堆中取出值（地址由栈顶指定）并压入栈

- 流程控制（以 `\n` 开头）

  - `\n` + ` ` + ` `：标记一个标签（` ` 后跟二进制表示的标签编号，以 `\n` 结束）

  - `\n` + ` ` + `\t`：调用子程序（跳转到标签）

  - `\n` + ` ` + `\n`：无条件跳转（跳转到标签）

  - `\n` + `\t` + ` `：如果栈顶为 0，则跳转到标签

  - `\n` + `\t` + `\t`：如果栈顶为负，则跳转到标签

  - `\n` + `\t` + `\n`：结束子程序并返回

  - `\n` + `\n` + `\n`：结束程序

- I/O（以 `\t\n` 开头）

  - `\t` + `\n` + ` `：输出栈顶字符

  - `\t` + `\n` + `\t`：输出栈顶数字

  - `\t` + `\n` + `\n`：读取字符并存储到堆中

  - `\t` + `\n` + `\n`：读取数字并存储到堆中

## 数字

在 Whitespace 中数字和字符（ ASCII ）是用二进制数表示的，` ` 表示 `0` ， `\t` 表示 `1` 。

如果要表示负数，那就要在最前面加上 `\t` 。

## Label

Label 是一个 ` ` 和 `\t` 组成的，以 `\n` 结尾的语句，所有的标签都需要是唯一的，用于控制流（ `goto` ）。

## 编译

Hello world：

```whitespace
Say hello.














































































































```

https://vii5ard.github.io/whitespace/ 和 https://www.jdoodle.com/execute-whitespace-online 还有官网都提供了编译 Whitespace 的工具，第一个网站还提供了相当多的实例，以飨爱好者。

---
