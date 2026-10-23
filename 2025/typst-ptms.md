---
title: 用 Typst 排版一份概率论笔记
url: https://blog.kisechan.space/2025/typst-ptms/
type: post
time: '2026-10-23T15:19:31.963Z'
---

## 排版

博主身为洁癖，受够了 $\LaTeX$ 的繁琐、臃肿和充斥着反斜杠 `\` 的源代码，于是转而拥抱 Typst，希望能给我一些别样的体验。——事实确实是这样的，我们的 Typst 语法简洁得难以置信，**写起来就像 Markdown 一样丝滑**。

编写公式更甚，没有了反斜杠和 `{}` 的代码真是太美观，打分数， `\frac{}{}` 不需要了。

---

本人练手项目选择是把**之前的博客**（概率论与数理统计的复习笔记）重新排版成一份 Typst 笔记，看起来更加美观和正规。

<a href="https://blog.kisechan.space/2025/notes-ptms/" name="https://images.kisechan.space/icon.png" class="LinkCard">笔记原文链接在这里！</a>

### 预设和字体

初次上手排版，于是选择了美观的 [Ori](https://typst.app/universe/package/ori) 作为模板，用Source Han Serif SC 和 IBM Plex 字体让笔记轻松实现从能看到美观（只需要改动几个参数即可）。

### 数学公式

Typst 编写公式就像 Markdown 一样，也是用 `$ $` 将公式包裹起来， 而且有相当多的语法糖和简单表示，消灭反斜杠，函数式的编程也很符合直觉。

## 源码和编译

<a href="https://github.com/Kisechan/Probability-Statistics-Notes" name="" class="LinkCard">笔记源代码仓库</a>

在**上面的仓库**就可以获得笔记的源代码和修订的最新版笔记（Release），自己编译也不难，配好 Typst 环境就可以直接编译了！

## 笔记预览

目前是 [v1.4](https://github.com/Kisechan/Probability-Statistics-Notes/tags) 版本：

## 参考和注解
