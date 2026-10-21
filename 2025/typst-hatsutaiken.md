---
title: Typst 初体验
url: https://blog.kisechan.space/2025/typst-hatsutaiken/
type: post
time: '2026-10-21T16:02:14.153Z'
---

**参考**：

- [Typst 官方文档](https://typst.app/docs/)
- [中文用户指南（非官方）](https://typst.dev/docs/chinese/)

## 句法

Typst 有三种语法模式：

- **标记模式**（Markup），是 Typst 的默认模式。
- **数学模式**，用来编写公式。
- **代码模式**，用来使用脚本功能。

|   模式   |        句法        |             例如              |
| :------: | :----------------: | :---------------------------: |
| 代码模式 |  以 `#` 作为前缀   |      `Number: #(1 + 2)`       |
| 数学模式 | 用 `$..$` 包围标记 | `$-x$ is the opposite of $x$` |
| 标记模式 | 用 `[..]` 包围标记 |    `let name = [*Typst!*]`    |

注意，用 `#` 是不需要用两个井号[^1]的。

[^1]: 这句话的文档原文是“Once you have entered code mode with `#`, you don't need to use **further hashes** unless you switched back to markup or math mode in between.”，本人英语不好，一开始把 “hash” 理解成了哈希，所以没读懂这是什么意思。其实 “hash” 这个词指的就是井号 `#` 这个符号，和哈希没关系。外国人也会把 `#` 叫做pound sign，number sign，hex 或者 square，可以看看这篇文章：https://zhuanlan.zhihu.com/p/683936872。类似的称呼有：ampersand - `&` ，asterisk - `*` ，tilde - `~` ，caret - `^` 。

### 标记模式

Typst 内置的标记类似于 markdown ，主要有：

|             名字             |           例子           |                                 参考                                 |
| :--------------------------: | :----------------------: | :------------------------------------------------------------------: |
|          段落分隔符          |        Blank line        |    [`parbreak`](https://typst.app/docs/reference/model/parbreak/)    |
|           强烈强调           |        `*strong*`        |      [`strong`](https://typst.app/docs/reference/model/strong/)      |
|           强调[^2]           |       `_emphasis_`       |        [`emph`](https://typst.app/docs/reference/model/emph/)        |
|           原始文本           |     `` `print(1)` ``     |         [`raw`](https://typst.app/docs/reference/text/raw/)          |
|             链接             |   `https://typst.app/`   |        [`link`](https://typst.app/docs/reference/model/link/)        |
|             标签             |        `<intro>`         |    [`label`](https://typst.app/docs/reference/foundations/label/)    |
|             引用             |         `@intro`         |         [`ref`](https://typst.app/docs/reference/model/ref/)         |
|             标题             |       `= Heading`        |     [`heading`](https://typst.app/docs/reference/model/heading/)     |
|           无序列表           |         `- item`         |        [`list`](https://typst.app/docs/reference/model/list/)        |
|           编号列表           |         `+ item`         |        [`enum`](https://typst.app/docs/reference/model/enum/)        |
|           术语列表           |  `/ Term: description`   |       [`terms`](https://typst.app/docs/reference/model/terms/)       |
|           数学公式           |         `$x^2$`          |            [Math](https://typst.app/docs/reference/math/)            |
|             换行             |           `\`            |   [`linebreak`](https://typst.app/docs/reference/text/linebreak/)    |
| 根据语言，智能地展示文字引用 |  `'single' or "double"`  |  [`smartquote`](https://typst.app/docs/reference/text/smartquote/)   |
|           符号简写           |        `~`, `---`        |       [Symbols](https://typst.app/docs/reference/symbols/sym/)       |
|       调用 Typst 代码        |   `#rect(width: 1cm)`    | [Scripting](https://typst.app/docs/reference/scripting/#expressions) |
|            转义符            |    `Tweet at us \#ad`    |      [Below](https://typst.app/docs/reference/syntax/#escapes)       |
|             注释             | `/* block */`, `// line` |      [Below](https://typst.app/docs/reference/syntax/#comments)      |

[^2]: 强调（emphasis）在英语中一般对应的是*斜体*，强烈强调（strong emphasis）则对应**加粗**。

### 数学模式

如果公式中，以至少一个空格开头和结尾，则会将其单独排版到其自己的块中。可以通过删除空格来生成行内公式。

|           名字           |         例子          |                                 参考                                 |
| :----------------------: | :-------------------: | :------------------------------------------------------------------: |
|         行内公式         |        `$x^2$`        |            [Math](https://typst.app/docs/reference/math/)            |
|     块级 / 行间公式      |       `$ x^2 $`       |            [Math](https://typst.app/docs/reference/math/)            |
|           下标           |        `$x_1$`        |      [`attach`](https://typst.app/docs/reference/math/attach/)       |
|           上标           |        `$x^2$`        |      [`attach`](https://typst.app/docs/reference/math/attach/)       |
|           分数           |    `$1 + (a+b)/5$`    |        [`frac`](https://typst.app/docs/reference/math/frac/)         |
|           换行           |       `$x \ y$`       |   [`linebreak`](https://typst.app/docs/reference/text/linebreak/)    |
|      换行时对齐的点      |   `$x &= 2 \ &= 3$`   |            [Math](https://typst.app/docs/reference/math/)            |
|         调用变量         |     `$#x$, $pi$`      |            [Math](https://typst.app/docs/reference/math/)            |
| 调用字段 / 成员（field） |   `$arrow.r.long$`    |   [Scripting](https://typst.app/docs/reference/scripting/#fields)    |
|     省略掉乘号的乘法     |        `$x y$`        |            [Math](https://typst.app/docs/reference/math/)            |
|         符号简写         |    `$->$`, `$!=$`     |       [Symbols](https://typst.app/docs/reference/symbols/sym/)       |
|      公式里的字符串      |  `$a "is natural"$`   |            [Math](https://typst.app/docs/reference/math/)            |
|       调用数学函数       |     `$floor(x)$`      |            [Math](https://typst.app/docs/reference/math/)            |
|     调用 Typst 代码      | `$#rect(width: 1cm)$` | [Scripting](https://typst.app/docs/reference/scripting/#expressions) |
|          转义符          |       `$x\^2$`        |      [Below](https://typst.app/docs/reference/syntax/#escapes)       |
|           注释           |   `$/* comment */$`   |      [Below](https://typst.app/docs/reference/syntax/#comments)      |

### 代码模式

代码模式下，有些表达式是可以不用 `#` 作为前缀的，参考表：

|          名字          |             例子              |                                  参考                                  |
| :--------------------: | :---------------------------: | :--------------------------------------------------------------------: |
|         `none`         |            `none`             |      [`none`](https://typst.app/docs/reference/foundations/none/)      |
|         `auto`         |            `auto`             |      [`auto`](https://typst.app/docs/reference/foundations/auto/)      |
|         布尔值         |        `false`, `true`        |      [`bool`](https://typst.app/docs/reference/foundations/bool/)      |
|          整数          |         `10`, `0xff`          |       [`int`](https://typst.app/docs/reference/foundations/int/)       |
|         浮点数         |         `3.14`, `1e5`         |     [`float`](https://typst.app/docs/reference/foundations/float/)     |
|        绝对长度        |    `2pt`, `3mm`, `1em`, ..    |      [`length`](https://typst.app/docs/reference/layout/length/)       |
|          角度          |        `90deg`, `1rad`        |       [`angle`](https://typst.app/docs/reference/layout/angle/)        |
|          分数          |          `2fr` [^3]           |    [`fraction`](https://typst.app/docs/reference/layout/fraction/)     |
|          比率          |             `50%`             |       [`ratio`](https://typst.app/docs/reference/layout/ratio/)        |
|         字符串         |           `"hello"`           |       [`str`](https://typst.app/docs/reference/foundations/str/)       |
|          标签          |           `<intro>`           |     [`label`](https://typst.app/docs/reference/foundations/label/)     |
|        数学公式        |            `$x^2$`            |             [Math](https://typst.app/docs/reference/math/)             |
|         原文本         |       `` `print(1)` ``        |          [`raw`](https://typst.app/docs/reference/text/raw/)           |
|        调用变量        |              `x`              |    [Scripting](https://typst.app/docs/reference/scripting/#blocks)     |
|         代码块         |    `{ let x = 1; x + 2 }`     |    [Scripting](https://typst.app/docs/reference/scripting/#blocks)     |
|         内容块         |          `[*Hello*]`          |    [Scripting](https://typst.app/docs/reference/scripting/#blocks)     |
|       括号表达式       |           `(1 + 2)`           |    [Scripting](https://typst.app/docs/reference/scripting/#blocks)     |
|          数组          |          `(1, 2, 3)`          |      [Array](https://typst.app/docs/reference/foundations/array/)      |
|         键值对         |       `(a: "hi", b: 2)`       | [Dictionary](https://typst.app/docs/reference/foundations/dictionary/) |
|       单元运算符       |             `-x`              |   [Scripting](https://typst.app/docs/reference/scripting/#operators)   |
|       双元运算符       |            `x + y`            |   [Scripting](https://typst.app/docs/reference/scripting/#operators)   |
|        赋值[^4]        |            `x = 1`            |   [Scripting](https://typst.app/docs/reference/scripting/#operators)   |
|        访问成员        |             `x.y`             |    [Scripting](https://typst.app/docs/reference/scripting/#fields)     |
|      调用成员函数      |         `x.flatten()`         |    [Scripting](https://typst.app/docs/reference/scripting/#methods)    |
|        调用函数        |          `min(x, y)`          |   [Function](https://typst.app/docs/reference/foundations/function/)   |
|      参数展开[^5]      |         `min(..nums)`         |  [Arguments](https://typst.app/docs/reference/foundations/arguments/)  |
|        匿名函数        |       `(x, y) => x + y`       |   [Function](https://typst.app/docs/reference/foundations/function/)   |
|     声明并赋值[^6]     |          `let x = 1`          |   [Scripting](https://typst.app/docs/reference/scripting/#bindings)    |
|      非匿名的函数      |      `let f(x) = 2 * x`       |   [Function](https://typst.app/docs/reference/foundations/function/)   |
|        设置规则        |       `set text(14pt)`        |     [Styling](https://typst.app/docs/reference/styling/#set-rules)     |
|      条件设置规则      |     `set text(..) if ..`      |     [Styling](https://typst.app/docs/reference/styling/#set-rules)     |
|    设置 `show `规则    | `show heading: set block(..)` |    [Styling](https://typst.app/docs/reference/styling/#show-rules)     |
| 用函数设置 `show `规则 |    `show raw: it => {..}`     |    [Styling](https://typst.app/docs/reference/styling/#show-rules)     |
| `Show-everything rule` |       `show: template`        |    [Styling](https://typst.app/docs/reference/styling/#show-rules)     |
|  `Context expression`  |      `context text.lang`      |          [Context](https://typst.app/docs/reference/context/)          |
|          条件          |  `if x == 1 {..} else {..}`   | [Scripting](https://typst.app/docs/reference/scripting/#conditionals)  |
|       `for `循环       |   `for x in (1, 2, 3) {..}`   |     [Scripting](https://typst.app/docs/reference/scripting/#loops)     |
|      `while `循环      |      `while x < 10 {..}`      |     [Scripting](https://typst.app/docs/reference/scripting/#loops)     |
|       循环控制流       |       `break, continue`       |     [Scripting](https://typst.app/docs/reference/scripting/#loops)     |
|        函数返回        |          `return x`           |   [Function](https://typst.app/docs/reference/foundations/function/)   |
|        包含模块        |      `include "bar.typ"`      |    [Scripting](https://typst.app/docs/reference/scripting/#modules)    |
|      引入模块[^7]      |      `import "bar.typ"`       |    [Scripting](https://typst.app/docs/reference/scripting/#modules)    |
|    引入模块中的成员    |  `import "bar.typ": a, b, c`  |    [Scripting](https://typst.app/docs/reference/scripting/#modules)    |
|          注释          |   `/* block */`, `// line`    |       [Below](https://typst.app/docs/reference/syntax/#comments)       |

[^3]: `fr` 是 **fraction** 的缩写，表示比例份数，一般用在分配空间的时候，相当于给这部分分几份。

[^4]: 原文是 assign ，指定，赋值。

[^5]: 原文是 arguments spreading ，也就是把一个参数（arguement）集合（比如数组、列表、元组等）“摊开”，一个个作为独立的参数传给函数。

[^6]: 原文是 let binding 。 let: 声明，binding: 绑定。所以字面意思就是声明+赋值。

[^7]: include 的字面意思就是把对应的内容在本位置展开，简单粗暴；import 就则是结构化的导入了。

### 转义符

在 Typst 中如果要转义字符，就要在其前面加上反斜杠 `\` 。

可以用十六进制转义序列插入任意 Unicode 字符，比如 `\u{1f600}` ，转义出来的是`😀`。

## 样式

### `set` 规则

`set` 规则可以配置文档元素的基本属性，用来设置大多常用文档样式。它后面紧随一个**文档元素**的函数调用。例如：

```typst
#set heading(numbering: "I.")
// 设置编号
#set text(
  font: "New Computer Modern"
)
= Introduction
With set rules, you can style
your document.
```

顶层 `set` 规则一直作用到文件结束，当在块内使用时，只作用到块结束。例如，这个例子中 `set` 规则只对这个列表起作用：

```typst
This list is affected: #[
  #set list(marker: [--])
  - Dash
]

This one is not:
- Bullet
```

可以使用条件 `set` 设置：

```typst
#let task(body, critical: false) = {
  set text(red) if critical
  [- #body]
}

#task(critical: true)[Food today?]
#task(critical: false)[Work deadline]
```

### `show` 规则

使用 `show` 规则可以深度定制特定类型文档元素的外观，最常用的基本形式是 `show-set` 规则， 以 `show` 关键字作为开始标记，紧随一个[选择器](https://typst.dev/docs/reference/foundations/selector/)，一个冒号，最后是一个 `set` 规则。 例如：

```typst
#show heading: set text(navy)

= This is navy-blue
But this stays black.
```

选择器有：

- **所有文档：** `show: rest => ..`
  转换 show 规则后的所有文档元素，这样就免于将所有文档元素都包含在一个巨大的函数调用中，来实现更复杂的布局。
- **特定文本：** `show "Text": ..`
  设置特定文本样式，转变或替换特定文本。
- **正则表达式：** `show regex("\w+"): ..`
  更自由的选择并转换匹配特定正则表达式的文本，详见于 [regex 函数](https://typst.dev/docs/reference/foundations/regex/)文档。
- **字段选择函数：** `show heading.where(level: 1): ..`
  转换具有特定字段的文档元素。比如，可以只设置文档一级标题样式。
- **标签：** `show <intro>: ..`
  选择并转换具有特定标签的文档元素，详见于[标签函数](https://typst.dev/docs/reference/foundations/label/)文档。

## 脚本表达式

Typst 中，除了最常用的文档元素，其他所有均是由**函数**生成。

Typst 可以将代码嵌入在标记中：用 `#`(井号) 来引入一个代码表达式， 表达式结束后，再恢复到正常的标记语法解析。 有些字符能够使其后字符继续解析为表达式，如果想将其解释为文本，可以用分号(`;`)来强制结束表达式解析。

### 块

Typst 为了架构代码以及将代码嵌入内容中，设计了两种**块**：

- **代码块：** `{ let x = 1; x + 2 }`
  编写代码时，一个计算过程可能需要分解为多个语句，创建多个中间变量，等等。 可以将多个表达式组成一个代码块，就像一个表达式一样。在代码块中，多个表达式由换行符或者分号分割。 其中每个表达式的输出值被合并起来，作为代码块的值。 有些表达式没有有用的输出，比如 `let` 绑定返回 `none`，与其他值合并，没有任何效果。上面的表达式输出 `3` 。
- **文档内容块** `[*Hey* there!]`
  使用文档内容块，可以将标记/文档内容作为可编程值，存储到变量，传送给[函数](https://typst.dev/docs/reference/foundations/function/)。 文档内容块由方括号包裹，可以包含任何标记。 一个文档内容块产生一个 [content 类型](https://typst.dev/docs/reference/foundations/content/)的值。 文档内容块可以后缀参数形式任意多个传递给函数，就是说，`list[A][B]` 等效于 `list([A], [B])`。

文档内容块和代码块可以相互内嵌，例如：

```typst
#{
  let a = [from]
  let b = [*world*]
  [hello ]
  a + [ the ] + b
}
```

### 绑定

上面已经展示，变量由 `let` 绑定定义。 `=` 符号后表达式的值被赋值给变量，这里赋值可以被省略，如果没有赋值，变量会初始化为 `none`。 `let` 关键词也可以用来生成一个[自定义的有名函数](https://typst.dev/docs/reference/foundations/function//#definitions)。

`let` 绑定的变量可以在接下来的块中或者文档中被访问。

```typst
#let name = "Typst"
This is #name's documentation.
It explains #name.

#let add(x, y) = x + y
Sum is #add(2, 3).
```

`let` 绑定也常用来解构[数组](https://typst.dev/docs/reference/foundations/array/)和[字典](https://typst.dev/docs/reference/foundations/dictionary/)， 解构时，等号左边的形式需要与数组或字典相似， `..` 模式操作符只可被使用一次，用来指代数组或字典剩余的条目。

```typst
#let (x, y) = (1, 2)
The coordinates are #x, #y.

#let (a, .., b) = (1, 2, 3, 4)
The first element is #a.
The last element is #b.

#let books = (
  Shakespeare: "Hamlet",
  Homer: "The Odyssey",
  Austen: "Persuasion",
)

#let (Austen,) = books
Austen wrote #Austen.

#let (Homer: h) = books
Homer wrote #h.

#let (Homer, ..other) = books
#for (author, title) in other [
  #author wrote #title.
]

#let (_, y, _) = (1, 2, 3)
The y coordinate is #y.
// 用 _ 丢弃一个元素
```

---
