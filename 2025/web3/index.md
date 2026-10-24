---
title: Web编程学习笔记3：JS入门
url: https://blog.kisechan.space/2025/web3/
type: post
time: '2026-10-24T09:09:07.707Z'
---

本笔记主要依据MDN Web Docs：[https://developer.mozilla.org/zh-CN/](https://developer.mozilla.org/zh-CN/)

# 基本语法

JavaScript 是一种轻量级的**动态类型解释型语言**。JS 语法风格类似于 C 语言家族：

- **分号**：语句以分号 `;` 结尾（可选，但推荐使用）
- **花括号**：代码块用 `{}` 包裹
- **控制结构**：`if`、`else`、`for`、`while`、`switch` 等与 C 语言几乎一致
- **运算符**和 C 语言家族几乎完全一样

但是特性类似于 Python：

- 用`function`关键字定义函数
- 动态类型
- 数组和对象用法类似于 Py
- 支持将函数作为参数，或者把函数作为返回值

## 变量声明

JavaScript 使用 `var`、`let` 或 `const` 来声明变量：

- `var`：函数作用域，传统方式（不推荐使用）
- `let`：块级作用域，可以重新赋值
- `const`：块级作用域，声明后不能重新赋值（常量）

> **块级作用域**：一个`{}`包裹的区域有效
>
> **函数作用域**：在一个函数里就有效：
>
> ```js
> function example() {
>  if (true) {
>      var x = 10; // 函数作用域变量
>  }
>  console.log(x); // 输出 10
> }
> example();
> console.log(x); // 报错：x is not defined
> ```

```js
let name = "Alice"; // 声明一个变量
const age = 25;      // 声明一个常量
name = "Bob";        // 可以修改
// age = 30;         // 报错，const 不能重新赋值
```

另外，变量**可以**在没有 `let`、`const` 或 `var` 声明的情况下直接使用，但这会导致变量成为**全局变量**（在非严格模式下），或者**报错**（在严格模式下）。这种行为通常是不推荐的，因为它可能导致意外的全局变量污染和难以调试的问题。

> **严格模式**（Strict Mode）和**非严格模式**（Sloppy Mode）是 JavaScript 的两种运行模式。严格模式是 ES5（ECMAScript 5）引入的特性，旨在帮助开发者避免一些常见的错误和不规范的写法。
>
> 在脚本或函数的顶部添加 `"use strict";` 即可启用严格模式。
>
> ```js
> "use strict"; // 启用严格模式
> x = 10; // 报错：x is not defined
> ```
>
> ```js
> function strictFunction() {
>     "use strict"; // 局部严格模式
>     y = 20; // 报错：y is not defined
> }
> ```
>
> 在严格模式下，**使用未声明的变量**、**删除（`delete`）变量**，以及**在函数参数中使用两个名字一样的变量（比如`function example(a,a)`）**等方面都会报错。

## 数据类型

JavaScript 是动态类型语言，常见的数据类型包括：

- **基本类型**：`string`、`number`、`boolean`、`null`、`undefined`、`symbol`。
- **引用类型**：`object`、`array`、`function`。

```js
let str = "Hello";       // 字符串
let num = 123;           // 数字
let isTrue = true;       // 布尔值
let obj = { name: "Alice", age: 25 }; // 对象
let arr = [1, 2, 3];     // 数组
let func = function() {  // 函数
    console.log("Hello!");
};
```

## 运算符

- 算术运算符：`+`、`-`、`*`、`/`、`%`。
- 比较运算符：`==`、`===`、`!=`、`!==`、`>`、`<`。
- 逻辑运算符：`&&`、`||`、`!`。

```js
let a = 10;
let b = 5;
console.log(a + b); // 15
console.log(a === b); // false
console.log(a > 5 && b < 10); // true
```

`==`和`===`的区别主要在于是否为**严格相等**。前者在比较的时候会进行隐式类型转换，并且会运用`valueOf`或者`toString`等方法。所以更推荐使用`===`和`!==`。

## 条件语句

- `if...else`：根据条件执行代码。
- `switch`：多条件分支。

```js
let age = 18;
if (age >= 18) {
    console.log("成年人");
} else {
    console.log("未成年人");
}
```

## 循环

- `for`：遍历数组或执行固定次数的循环。
- `while`：条件为真时执行循环。
- `for...of`：遍历可迭代对象（如数组）

```js
for (let i = 0; i < 5; i++) {
    console.log(i); // 输出 0 到 4
}

let i = 0;
while (i < 5) {
    console.log(i); // 输出 0, 1, 2, 3, 4
    i++;
}

let arr = [1, 2, 3];
for (let num of arr) {
    // 用于遍历可迭代对象（如数组、字符串、Map、Set 等
    console.log(num); // 输出 1, 2, 3
}

let obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
    // 用于遍历对象的可枚举属性（如对象的键）
    console.log(key, obj[key]); // 输出 a 1, b 2, c 3
}
```

## 函数

函数是 JavaScript 的核心，用于封装可重复使用的代码。

```js
function greet(name) {
    return "Hello, " + name;
}
console.log(greet("Alice")); // 输出 "Hello, Alice"
```

### 默认参数

在参数名称后添加 `= 默认值`，来指定默认值：

```js
function hello(name = "克里斯") {
  console.log(`你好，${name}！`);
}

hello("阿里"); // 你好，阿里！
hello(); // 你好，克里斯！
```

### 匿名函数和箭头函数

把函数作为参数传递时，可以使用匿名函数，例如：

```js
textBox.addEventListener("keydown", function (event) {
  console.log(`You pressed "${event.key}".`);
});
```

也可以用 `(event) =>` 来代替 `function(event)`：

```js
textBox.addEventListener("keydown", (event) => {
  console.log(`You pressed "${event.key}".`);
});
```

如果函数只含有一个参数，那就可以省略掉括号：

```js
textBox.addEventListener("keydown", event => {
  console.log(`You pressed "${event.key}".`);
});
```

最终，如果函数只包含一行`return`语句，那就可以省略到只剩下`参数 => 返回值`：

```js
const originals = [1, 2, 3];

const doubled = originals.map(item => item * 2);

console.log(doubled); // [2, 4, 6]
```

或

```js
textBox.addEventListener("keydown", (event) =>
  console.log(`You pressed "${event.key}".`),
);
// 函数返回console.log的返回值，也就是undefined
```

# 事件

> 本节主要参考[^1]

[^1]: https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting/Events

**事件**是系统遇到的一些事情，在这个时候，系统会产生某种信号，并可以自动地采取某种行动（即运行一些代码）。

为了对一个事件做出反应，你要给它附加一个**事件处理器**（通常是创建的一个 JavaScript 函数），在事件发生时运行。当这样一个代码块被定义为响应一个事件而运行时，称为**注册一个事件处理器**。事件处理器有时候被叫做**事件监听器**——从我们的用意来看这两个名字是相同的，尽管严格地来说这块代码既监听也处理事件。监听器留意事件是否发生，处理器对事件发生做出回应。

## 事件处理

### HTML 事件属性

直接在 HTML 元素中定义事件处理程序。

```html
<button onclick="alert('按钮被点击了！')">点击我</button>
```

### DOM 属性

通过 JavaScript 为元素的属性赋值来绑定事件处理程序。

```js
const button = document.querySelector("button");
button.onclick = function() {
    alert("按钮被点击了！");
};
```

### `addEventListener`

**推荐的方式**，可以为同一个事件绑定多个处理程序。

```js
const button = document.querySelector("button");
button.addEventListener("click", function() {
    alert("按钮被点击了！");
});
```

### 阻止默认行为

有时会遇到一些情况：希望事件不执行它的默认行为。这个时候就可以在事件对象上使用`preventDefault()`方法，停止默认行为，例如：

```html
<form>
  <div>
    <label for="fname">First name: </label>
    <input id="fname" type="text" />
  </div>
  <div>
    <label for="lname">Last name: </label>
    <input id="lname" type="text" />
  </div>
  <div>
    <input id="submit" type="submit" />
  </div>
</form>
<p></p>
```

```js
const form = document.querySelector("form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const para = document.querySelector("p");

form.addEventListener("submit", (e) => {
  if (fname.value === "" || lname.value === "") {
    e.preventDefault();
    para.textContent = "You need to fill in both names!";
  }
});
```

## 事件冒泡

> 本节主要参考[^2]

[^2]: https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Scripting/Event_bubbling

事件冒泡指的是，对于**嵌套元素**的事件，浏览器要如何处理它。例如：

```html
<body>
  <div id="container">
    <button>点我！</button>
  </div>
  <pre id="output"></pre>
</body>
```

这个 HTML 语句中，`button`是嵌套在`div`中的，`div`又嵌套在`body`里，那么如果绑定一个 JS ：

```js
const output = document.querySelector("#output");
function handleClick(e) {
  output.textContent += `你在 ${e.currentTarget.tagName} 元素上进行了点击\n`;
}

const container = document.querySelector("#container");
const button = document.querySelector("button");

document.body.addEventListener("click", handleClick);
container.addEventListener("click", handleClick);
button.addEventListener("click", handleClick);
```

它的输出是：

> 你在 BUTTON 元素上进行了点击
>
> 你在 DIV 元素上进行了点击
>
> 你在 BODY 元素上进行了点击

那是因为它们互相嵌套，按了按钮以后，肯定`div`也被按了，`body`也是。但是`button`最先被监听到，就好像从最里面冒泡出来，所以叫**事件冒泡**。

显然，事件冒泡可能会造成一些很奇怪的问题，那么就可以用`event.stopPropagation()`修复，防止事件向其他元素传递。

### 事件捕获

事件冒泡是从里向外的，捕获就是**从外向里的**。事件捕获默认是关闭的，可以在`addEventListener()` 的 `capture` 选项中启用。例如：

```html
<body>
  <div id="container">
    <button>点我！</button>
  </div>
  <pre id="output"></pre>
</body>
```

```js
const output = document.querySelector("#output");
function handleClick(e) {
  output.textContent += `你在 ${e.currentTarget.tagName} 元素上进行了点击\n`;
}

const container = document.querySelector("#container");
const button = document.querySelector("button");

document.body.addEventListener("click", handleClick, { capture: true });
container.addEventListener("click", handleClick, { capture: true });
button.addEventListener("click", handleClick);
```

它的输出会是：

> 你在 BODY 元素上进行了点击
>
> 你在 DIV 元素上进行了点击
>
> 你在 BUTTON 元素上进行了点击

可以看到完全颠倒过来了。

> 为什么要同时使用捕获和冒泡功能？在过去的坏日子里，当浏览器的交叉兼容性远不如现在时，Netscape 只使用事件捕捉，而 Internet Explorer 只使用事件冒泡。当 W3C 决定尝试将行为标准化并达成共识时，他们最终确定了这个包括这两种行为的系统，这也是现代浏览器所实现的。
>
> 默认情况下，几乎所有的事件处理程序都是在冒泡阶段注册的，这在大多数情况下更有意义。

### 事件委托

如果想在用户与大量的子元素中的任何一个互动时运行一些代码时，我们在它们的父元素上设置事件监听器，让发生在它们身上的事件冒泡到它们的父元素上，而不必在每个子元素上单独设置事件监听器。这叫做**事件委托**。

例如：

<main>
    <ul id="list">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
	<pre id="output"></pre>
</main>

```html
<main>
    <ul id="list">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
	<pre id="output"></pre>
</main>
<script>
    const output = document.querySelector("#output");
    const list = document.getElementById("list");
    list.addEventListener("click", function(event) {
        if (event.target.tagName === "LI") {
    		output.textContent = "";
            output.textContent += `点击了：${event.target.textContent} \n`;
        }
    });
</script>
```

> 事件的基本属性：
>
> `event.type`：事件的类型（如 `click`、`keydown`、`mouseover` 等），例如：
>
> ```js
> button.addEventListener("click", function(event) {
>    console.log(event.type); // 输出 "click"
> });
> ```
>
> `event.target`：触发事件的元素（即事件的目标元素），例如：
>
> ```js
> button.addEventListener("click", function(event) {
>    console.log(event.target); // 输出触发事件的按钮元素
> });
> ```
>
> `event.currentTarget`：当前正在处理事件的元素（可能与 `event.target` 不同，尤其是在事件冒泡阶段），例如：
>
> ```js
> div.addEventListener("click", function(event) {
>    console.log(event.currentTarget); // 输出绑定事件的 div 元素
> });
> ```
>
> `event.bubbles`：表示事件是否冒泡，例如：
>
> ```js
> button.addEventListener("click", function(event) {
>    console.log(event.bubbles); // 输出 true（click 事件会冒泡）
> });
> ```
>
> `event.preventDefault()`：阻止事件的默认行为（如表单提交、链接跳转），例如：
>
> ```js
> link.addEventListener("click", function(event) {
>    event.preventDefault(); // 阻止链接跳转
> });
> ```
>
> `event.stopPropagation()`：阻止事件继续传播（捕获或冒泡），例如
>
> ```js
> button.addEventListener("click", function(event) {
>    event.stopPropagation(); // 阻止事件冒泡
> });
> ```
