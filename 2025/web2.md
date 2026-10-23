---
title: Web编程学习笔记2：CSS基础样式
url: https://blog.kisechan.space/2025/web2/
type: post
time: '2026-10-23T15:19:31.963Z'
---

本笔记主要依据MDN Web Docs：[https://developer.mozilla.org/zh-CN/](https://developer.mozilla.org/zh-CN/)

# 工作原理

> 本节主要参考[^1]

[^1]: https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/What_is_CSS

## 文件处理流程

当浏览器展示一个文件的时候，必须兼顾文件的内容和文件的样式信息，那么它处理文件的流程就是：

1. 浏览器载入 HTML 文件（比如从网络上获取）。
2. 将 HTML 文件转化成一个 DOM（Document Object Model），DOM 是文件在计算机内存中的表现形式。
3. 接下来，浏览器会拉取该 HTML 相关的大部分资源，比如嵌入到页面的图片、视频和 CSS 样式。JavaScript 则会稍后进行处理，简单起见，同时此节主讲 CSS，所以这里对如何加载 JavaScript 不会展开叙述。
4. 浏览器拉取到 CSS 之后会进行解析，根据选择器的不同类型（比如 element、class、id 等等）把他们分到不同的“桶”中。浏览器基于它找到的不同的选择器，将不同的规则（基于选择器的规则，如元素选择器、类选择器、id 选择器等）应用在对应的 DOM 的节点中，并添加节点依赖的样式（这个中间步骤称为渲染树）。
5. 上述的规则应用于渲染树之后，渲染树会依照应该出现的结构进行布局。
6. 网页展示在屏幕上（这一步被称为着色）。

<img src="https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/What_is_CSS/rendering.svg" alt="处理文件的流程">

## DOM

一个 DOM 有一个树形结构，**标记语言中的每一个元素、属性以及每一段文字都对应着结构树中的一个节点（Node/DOM 或 DOM node）。**节点由节点本身和其他 DOM 节点的关系定义，有些节点有父节点，有些节点有兄弟节点（同级节点）。DOM 可以帮助 CSS 样式和 HTML 文件的内容结合。

例如：

```html
<p>
  Let's use:
  <span>Cascading</span>
  <span>Style</span>
  <span>Sheets</span>
</p>
```

它的DOM为：

```text
P
├─ "Let's use:"
├─ SPAN
|  └─ "Cascading"
├─ SPAN
|  └─ "Style"
└─ SPAN
    └─ "Sheets"
```

在这个时候，如果在网页中加上一些 CSS 文件加以渲染的话：

```css
span {
  border: 1px solid black;
  background-color: lime;
}
```

那么浏览器就会解析 HTML 文件，并创造一个 DOM，然后解析 CSS：浏览器会把 CSS 中的规则使用在三个`<span>`标签上，然后渲染出图像到屏幕。效果如图：

![使用 CSS 渲染的效果](https://images.kisechan.space/20250212155818.png)

<p class="note note-warning">如果 CSS 文件中出现了无法解析的属性或值，那么浏览器并不会报错，它会什么也不做，然后继续处理下一个规则。</p>

# CSS 语法

> 本节主要参考[^2]

[^2]: https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/Getting_started

## 引入 CSS

在 HTML 的`<head>`元素中，加上`<link rel="stylesheet" href="styles.css" />`，就可以引入`styles.css`文件。

## 选择器

CSS 的基本语法由**选择器**和**声明块**构成，例如：

```css
选择器 {
  属性: 值;
  属性: 值;
}
```

- **选择器**指的就是要应用这个样式的 HTML 元素
- **声明块**：用 `{}` 包裹，包含若干个**声明**。
- **声明**：由**属性**和**值**组成，用 `:` 分隔，以 `;` 结束。

### 元素选择器

元素选择器根据 **HTML 标签**的名称来选择元素。例如：

```css
p,
li {
  color: green;
}
```

这样就能把段落和列表都变成绿色。

需要注意的是，如果其中一个选择器是失效的（存在语法错误），那么**整个规则**就会被忽略。

### 类选择器

以`.`开头的选择器是类选择器，**根据`class`的值**进行选择。例如对于 HTML 文本：

```html
<ul>
  <li>项目一</li>
  <li class="special">项目二</li>
  <li>项目 <em>三</em></li>
</ul>
```

的 CSS 样式文件：

```css
.special {
  color: orange;
  font-weight: bold;
}
```

就会将“项目二”渲染为粗体橘色。

也可以混合使用：

```css
li.special {
  color: orange;
  font-weight: bold;
}
```

就表示选中了每个`<li>`标签中类名为`special`的元素。

### id选择器

根据 `id` 属性选择元素，以 `#` 开头。

```css
#header {
  background-color: yellow;
}
```

### 通配符选择器

选择所有元素，用 `*` 表示。

```css
* {
  margin: 0;
  padding: 0;
}
```

### 属性选择器

> 本节主要参考[^3]

[^3]: https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/Attribute_selectors

#### 存在与否选择器

根据元素的属性是否存在或是否为某个值选择元素：

|       选择器        |              示例               |                                                                                          描述                                                                                          |
| :-----------------: | :-----------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     `[*attr*]`      |           `a[title]`            |                                                                  匹配带有一个名为*`attr`*的属性的元素——方括号里的值。                                                                  |
| `[*attr*=*value*]`  | `a[href="https://example.com"]` |                                                       匹配带有一个名为*`attr`_的属性的元素，其值正为_`value`*——引号中的字符串。                                                        |
| `[*attr*~=*value*]` |      `p[class~="special"]`      | 匹配带有一个名为*`attr`_的属性的元素，其值正为_`value`_，或者匹配带有一个_`attr`_属性的元素，其值有一个或者更多，至少有一个和_`value`*匹配。注意，在一列中的好几个值，是用空格隔开的。 |
|      `[_attr_       |           =_value_]`            |                                                                                       `div[lang                                                                                        | ="zh"]` | 匹配带有一个名为*`attr`_的属性的元素，其值可正为_`value`_，或者开始为_`value`*，后面紧随着一个连字符。 |

例如，对于：

```html
<h1>Attribute presence and value selectors</h1>
<ul>
  <li>Item 1</li>
    <li class="a">Item 2</li>
    <li class="a b">Item 3</li>
    <li class="ab">Item 4</li>
</ul>
```

```css
li[class] {
  font-size: 200%;
}

li[class="a"] {
  background-color: yellow;
}

li[class~="a"] {
  color: red;
}
```

效果为：

![](https://images.kisechan.space/attr1.png)

#### 子字符串匹配选择器

根据类值的字符串进行相应匹配。

|     选择器      |        示例         |                                             描述                                              |
| :-------------: | :-----------------: | :-------------------------------------------------------------------------------------------: |
| `[attr^=value]` | `li[class^="box-"]` |                匹配带有一个名为*attr*的属性的元素，其值开头为*value*子字符串。                |
| `[attr$=value]` | `li[class$="-box"]` |                 匹配带有一个名为*attr*的属性的元素，其值结尾为*value*子字符串                 |
| `[attr*=value]` | `li[class*="box"]`  | 匹配带有一个名为*attr*的属性的元素，其值的字符串中的任何地方，至少出现了一次*value*子字符串。 |

例如，对于：

```html
<h1>Attribute substring matching selectors</h1>
<ul>
  <li class="a">Item 1</li>
  <li class="ab">Item 2</li>
  <li class="bca">Item 3</li>
  <li class="bcabc">Item 4</li>
</ul>
```

```css
li[class^="a"] {
  font-size: 200%;
}

li[class$="a"] {
  background-color: yellow;
}

li[class*="a"] {
  color: red;
}
```

效果为：

![](https://images.kisechan.space/attr2.png)

选择器进行字符串匹配时，是默认大小写敏感的。在选择器的`]`之前，加上字母`i`，就可以实现大小写不敏感。

### 伪类选择器

选择元素的特定状态（如悬停、点击等）。

```css
a:hover {
  color: red;
}
```

### 伪元素选择器

选择元素的特定部分（如首行、首字母等）。

```css
p::first-line {
  font-weight: bold;
}
```

### 组合选择器

#### 后代选择器

在两个选择器中加上空格，就可以表示选择**某元素的某某后代**，例如：

```css
li em {
  color: rebeccapurple;
}
```

该选择器将选择`<li>`内部的任何`<em>`元素（`<li>`的后代）。

#### 子元素选择器

选择某个元素的直接子元素。

```css
div > p {
color: blue;
}
```

#### 相邻兄弟选择器

选择紧接在某个元素后的兄弟元素。

```css
h1 + p {
font-size: 20px;
}
```

#### 通用兄弟选择器

选择某个元素后的所有兄弟元素。

```css
h1 ~ p {
color: orange;
}
```

## CSS 优先级

> 本节主要参考[^4]

[^4]: https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics/Handling_conflicts

### 继承

继承指的是**父元素和嵌套的子元素**分别应用了不同的 CSS 样式，例如：

```html
<ul class="main">
  <li>项目 1</li>
  <li>
    项目 2
    <ul>
      <li>2.1</li>
      <li>2.2</li>
    </ul>
  </li>
  <li>
    项目 3
    <ul class="special">
      <li>
        3.1
        <ul>
          <li>3.1.1</li>
          <li>3.1.2</li>
        </ul>
      </li>
      <li>3.2</li>
    </ul>
  </li>
</ul>
```

应用样式：

```css
.main {
  color: rebeccapurple; /* 设置文本颜色为 rebeccapurple（紫色） */
  border: 2px solid #ccc; /* 设置边框为 2 像素宽，颜色为浅灰色（#ccc） */
  padding: 1em; /* 设置元素内边距为 1em，em 是相对于当前字体大小的单位 */
}

.special {
  color: black; /* 设置文本颜色为黑色 */
  font-weight: bold; /* 设置文本为粗体 */
}

```

效果为：

![](https://images.kisechan.space/css-inherit1.png)

可以看到，`项目1`和`项目2`继承了`<main>`的样式，把文字变成了紫色，而`项目3`并没有继承父类的样式，而是被它自己的样式覆盖率。一般而言，与文字有关的样式会被继承，而**与布局（宽、高、边框等）有关的不会**。

#### 控制继承

可以通过一些关键字控制继承：

|     关键字     |                                    继承方式                                     |
| :------------: | :-----------------------------------------------------------------------------: |
|   `inherit`    |                          开启继承，让该属性和父类一样                           |
|   `initial`    |                                将值设置为初始值                                 |
|    `revert`    |                             设置为浏览器的默认样式                              |
| `revert-layer` |                         重置为在上一个层叠层中建立的值                          |
|    `unset`     | 重置为自然值，也就是如果属性是自然继承那么就是 `inherit`，否则和 `initial `一样 |

在样式里，可以用属性名`all`来给所有的属性设置继承，比如：

```html
<blockquote>
  <p>当前块引用设置了样式</p>
</blockquote>

<blockquote class="fix-this">
  <p>当前块引用未设置样式</p>
</blockquote>
```

```css
blockquote {
  background-color: orange;
  border: 2px solid blue;
}

.fix-this {
  all: unset;
}
```

### 层叠

层叠就是一个元素对应了多个 CSS 样式的时候（例如同时被类选择器和通配选择器选中了），**按照优先级顺序选择**按哪个样式应用。

主要规则有：

1. **样式来源**（不同来源的样式优先级）

2. **选择器的优先级**（不同类型的选择器权重不同）

3. **出现顺序**（后面的规则会覆盖前面的规则）

优先级顺序是仅对于单个属性而言的，例如对于某个元素，同时设置了“加粗，颜色为绿色”，“颜色为红色”，那么要比较优先级仅仅是对于“颜色”这个属性来说的，“加粗”并没有冲突，会直接应用。

#### 样式来源

样式来源指的是 CSS 是什么形式插入 HTML 的。优先级顺序为：

```text
浏览器默认样式 < 外部CSS < 内部CSS < 行内CSS < `!important`
```

#### 选择器优先级

如果一个元素被多个选择器匹配，CSS 会使用 **选择器的优先级** 来决定哪个规则生效。优先级规则如下：

|   选择器类型   |           示例           |   权重    |
| :------------: | :----------------------: | :-------: |
|   通配选择器   |          `* {}`          |     0     |
|   元素选择器   |     `div`, `p`, `h1`     |     1     |
| 类选择器、伪类 |    `.main`, `:hover`     |    10     |
|   ID 选择器    |        `#header`         |    100    |
|    行内样式    |  `style="color: blue;"`  |   1000    |
|  `!important`  | `color: red !important;` | ∞（最高） |

#### 出现顺序

后出现的选择器优先级更高，例如：

```css
p {
  font-weight: bold; /* 设置 p 元素加粗 */
  color: blue; /* 设置 p 元素颜色为蓝色 */
}

p {
  color: green; /* 设置 p 元素颜色为绿色（覆盖上面的蓝色） */
}
```

那么，在 HTML 中，所有的段落都会被设置为字体为蓝色，且加粗。

### 级联层

级联层（Cascade Layer）让开发者能够将样式分配到不同的**层**中，每一层具有不同的优先级。当多个层的样式规则发生冲突时，浏览器会按照层的顺序来决定哪一层的样式优先生效。

`@layer`是定义层的关键字，用法为：

```css
@layer <层名> {
  /* 层内的 CSS 规则 */
}
```

对于很多个层，是按照层定义的先后顺序来决定优先级的。在层内有冲突的话，那么就是按照继承和层叠来解决冲突。

比如：

```css
@layer reset {
  p {
    font-size: 12px;
  }
}

@layer default {
  p {
    font-size: 16px;
  }
}

@layer theme {
  p {
    font-size: 18px;
  }
}
```

最终，`<p>`会采取`theme`层中的字体样式。
