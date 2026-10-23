---
title: Web编程学习笔记1：HTML基础语法
url: https://blog.kisechan.space/2025/web1/
type: post
time: '2026-10-23T15:19:31.963Z'
---

本笔记主要依据MDN Web Docs：[https://developer.mozilla.org/zh-CN/](https://developer.mozilla.org/zh-CN/)

# HTML元素

> 本节主要参考[^1]

[^1]: https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax

HTML（HyperText Markup Language，超文本标记语言）是一种用于了解浏览器如何组织页面的标记语言。HTML可复杂、可简单，一切都取决于网络开发者。HTML由一系列的元素组成，这些元素可以用来包围或标记不同部分的内容，从而以某种方式考虑工作。结尾的标签可以使超链接变成超链接，以连接到另一个页面；使字体呈现斜体等。

## 元素的构成

HTML由HTML元素构成。一个HTML元素一般有三部分：

- **开始标签**（Opening Tag）：包含元素的，被`<`、`>`所包围。开头标签包含元素开始或开始生效的位置。例如`<p>`。
- **内容**（Content）：元素的内容。
- **结束标签**（Closing Tag）：与开始标签相似，只是其在元素名之前包含了一个斜杠`/`。这引发了该元素的结束。不包含关闭标签可能会产生奇怪的结果。例如`</p>`。

一个元素可以被嵌套到其他元素中。

## 块级元素和内联元素

- **块级元素**在页面中以块的形式展现。一个块级元素出现在它前面的内容之后的新行上。任何跟在块级元素后面的内容也会出现在新的行上。块级元素通常是页面上的结构元素。例如，一个块级元素可能代表标题、段落、列表、导航菜单或页脚。一个块级元素不会嵌套在一个内联元素里面，但它可能嵌套在另一个块级元素里面。
- **内联元素**通常出现在块级元素中并环绕文档内容的一小部分，而不是一整个段落或者一组内容。内联元素不会导致文本换行。它通常与文本一起使用，例如，`<a>` 元素创建一个超链接，`<em>` 和` <strong>` 等元素创建强调。

## 空元素

如果要在此位置插入/嵌入一些东西，就会用到一些没有内容和结束标签的元素，所以它们被叫做称为**空元素**。例如：元素 `<img>` 是用来在页面插入一张指定的图片。例如：

```html
<img
  src="https://roy-tian.github.io/learning-area/extras/getting-started-web/beginner-html-site/images/firefox-icon.png"
  alt="Firefox 图标" />

```

效果如下：

<img
  src="https://roy-tian.github.io/learning-area/extras/getting-started-web/beginner-html-site/images/firefox-icon.png"
  alt="Firefox 图标" />

注意，HTML 中，**无需在一个空元素的标签末尾添加 `/`**，例如 `<img src="images/cat.jpg" alt="cat" />`。然而，这也是一种有效的语法，当你希望你的 HTML 是有效的 XML 时，这么做也没问题。

## 属性

元素可以拥有**属性**，以包含元素的额外信息，这些信息不会出现在实际的内容中，一般作为一个识别名称，以后为元素设置样式信息时更加方便。例如：

```html
<p attribute-name="foo">
    bar
</p>
```

如果一个元素有多个属性，那么就要用空格分开。`<p attribute-name="foo">`中，`attribute-name`就是属性的名字，引号内的`foo`是该属性的值。

属性值最好加上引号`""`或`''`，否则如果属性值中间存在空格，就不能被识别出来。

### `<a>`标签的属性

标签 `<a>`，即**anchor**（翻译为锚），用于让其包裹的内容成为一个**超链接**。`<a>`元素可以添加多种属性：

- `href`：是“超文本引用”（Hypertext Reference）的缩写，用于声明超链接的 web 地址。例如 `href="https://www.mozilla.org/"`。

- `title`：为超链接声明额外的信息，比如你将链接至的那个页面。例如 `title="The Mozilla homepage"`。当鼠标悬停在超链接上面时，这部分信息将以工具提示的形式显示。

- `target`：用于指定链接如何呈现出来。例如，`target="_blank"` 将在新标签页中显示链接。如果你希望在当前标签页显示链接，忽略这个属性即可。

## 实体引用

在HTML中，字符 `<`、`>`、`"`、`'` 和 `&` 等是特殊字符，它们是HTML语法自身的一部分。某些特殊字符（如版权符号）也难以从键盘中输入。另外在HTML中多个空格会被合并成一个。

那么，要想在HTML中引入它们，就要使用**实体引用**（Entity Reference）方法。实体引用通常以 `&` 开头，以 `;` 结尾，格式如下：

```HTML
&实体名称;
```

或等效的：

```HTML
&#实体编号;
```

- **实体名称**：易于记忆的名称（如 `&lt;` 表示 `<`）。
- **实体编号**：字符的Unicode编号（如 `&#60;` 表示 `<`）。

常见的引用有：

| 字符 |     描述     | 实体名称 | 实体编号  |
| :--: | :----------: | :------: | :-------: |
| `<`  |    小于号    |  `&lt;`  |  `&#60;`  |
| `>`  |    大于号    |  `&gt;`  |  `&#62;`  |
| `&`  |     和号     | `&amp;`  |  `&#38;`  |
| `"`  |    双引号    | `&quot;` |  `&#34;`  |
| `'`  |    单引号    | `&apos;` |  `&#39;`  |
| `©`  |   版权符号   | `&copy;` | `&#169;`  |
| `®`  | 注册商标符号 | `&reg;`  | `&#174;`  |
| ` `  |  非换行空格  | `&nbsp;` | `&#160;`  |
| `€`  |   欧元符号   | `&euro;` | `&#8364;` |

## 注释

HTML的注释由`<!--` 和 `-->` 包裹起来，如：

```HTML
<p>我在注释外！</p>

<!-- <p>我在注释内！</p> -->
```

# HTML文档结构

一个典型的HTML文件内容：

```HTML
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <title>我的测试站点</title>
  </head>
  <body>
    <p>这是我的页面</p>
  </body>
</html>
```

其中主要有以下几部分：

1. `<!DOCTYPE html>`: 声明文档类型。早期的 HTML（大约 1991-1992 年）文档类型声明类似于链接，规定了 HTML 页面必须遵从的良好规则，能自动检测错误和其他有用的东西。文档类型使用类似于这样：

   ```HTML
   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   ```

   文档类型是一个历史遗留问题，需要包含它才能使其他东西正常工作。现在，只需要知道 `<!DOCTYPE html>` 是最短的有效文档声明。

2. `<html></html>`: `<html>`元素，包裹了页面中所有的内容，有时被称为根元素。`lang="zh-CN"`属性用于指定语言，主要是方便搜索引擎搜索。

3. `<head></head>`: `<head>` 元素，是一个容器，它包含了所有你想包含在 HTML 页面中但**不在 HTML 页面中显示**的内容，包括页面描述、CSS 样式、字符集声明等等。

4. `<meta charset="utf-8">`: `<meta>` 元素。这个元素代表了不能由其他 HTML 元相关元素表示的元数据，比如`<base>`、`<link>`、`<script>`、`<style>` 或` <title>`。`charset` 属性将你的文档的字符集设置为 `utf-8`，有了这个设置，页面现在可以处理它可能包含的任何文本内容。没有理由不对它进行设置，它可以帮助避免以后的一些问题。

5. `<title></title>`: `<title>`元素，设置页面的标题，也就是出现在该页面加载的浏览器标签中的内容。当页面被加入书签时，页面标题也被用来描述该页面。

6. `<body></body>`: `<body>`元素。包含了你访问页面时所有显示在页面上的内容，包含文本、图片、视频、游戏、可播放音频轨道等等。

## `<head>`元素

> 本节主要参考[^2]

[^2]: https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/Webpage_metadata

`<head>`元素保存的是网站的一些元数据。

### `<title>`元素

`<title>`用于保存HTML页面的标题。

### `<meta>`元素

`<meta>`元素用于保存元数据。**元数据**（Metadata），是用来描述其他数据的信息， 即“关于数据的数据”，相当于数据的“标签”或“说明书”。

HTML中涉及到的元数据主要有：

- `<meta charset="utf-8">`指定了网页的字符编码。
- `<meta name="author" content="Chris Mills">`指定了网页的作者
- `<meta name="description" content="The MDN Web Docs Learning Area aims to provide complete beginners to the Web with all they need to know to get started with developing web sites and applications.">`指定了网站的描述信息。

### `<link>`元素

`<link>`标签主要用于引入或关联外部资源，如样式表、图标、字体等。常见的属性有：

|    属性    |                                             描述                                              |
| :--------: | :-------------------------------------------------------------------------------------------: |
|   `rel`    | 用于定义当前文档与链接资源之间的关系（Relationship），如 `stylesheet`、`icon`、`preload` 等。 |
|   `href`   |                                     指定链接资源的路径。                                      |
|   `type`   |                 指定链接资源的MIME类型（如 `text/css`、`image/x-icon` 等）。                  |
|    `as`    |              用于 `preload`，指定资源的类型（如 `image`、`font`、`script` 等）。              |
| `hreflang` |                           指定链接资源的语言（用于 `alternate`）。                            |
|  `sizes`   |                                指定图标的大小（用于 `icon`）。                                |

### `<script>` 元素

`<script>` 元素是HTML中用于嵌入或引用 **JavaScript 代码** 的标签。通过 `<script>` 标签，可以在网页中实现动态功能、交互效果或数据处理，既可以包含直接编写的JavaScript代码，也可以引用外部的JavaScript文件。例如：

```html
<script>
    alert("Hello, World!");
</script>
```

或：

```HTML
<script src="scripts.js" defer></script>
```

引入时最好加上 `defer` （与`async`相反）以告诉浏览器在解析完成 HTML 后再加载 JavaScript。这样可以确保在加载脚本之前浏览器已经解析了所有的 HTML 内容。这样你就不会因为 JavaScript 试图访问页面上不存在的 HTML 元素而产生错误。

## 内容层次和效果

> 本节主要参考[^3]

[^3]: https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/Headings_and_paragraphs

### 段落和标题

在 HTML 中，每个段落是通过`<p>` 元素标签进行定义的，而一共有六种标题元素标签——h1、h2、h3、h4、h5 和 h6。每个元素代表文档中不同级别的内容：`<h1>` 表示主标题，`<h2>` 表示二级子标题，`<h3>` 表示三级子标题，依此类推。

如果没有标题和段落标签，那么HTML文件中`<body>`元素的所有文字都会糊成一坨。

### 列表

#### 无序列表

无序列表由`<ul>`标签开始，其中的每一个元素都由`<li>`括起，例如：

```html
<ul>
  <li>豆浆</li>
  <li>油条</li>
  <li>豆汁</li>
  <li>焦圈</li>
</ul>
```

效果为：

<ul>
  <li>豆浆</li>
  <li>油条</li>
  <li>豆汁</li>
  <li>焦圈</li>
</ul>

#### 有序列表

有序列表则是由`<ol>`标签开始，别的和无序列表一样，例如：

```html
<ol>
  <li>沿这条路走到头</li>
  <li>右转</li>
  <li>直行穿过第一个十字路口</li>
  <li>在第三个十字路口处左转</li>
  <li>继续走 300 米，学校就在你的右手边</li>
</ol>
```

效果为：

<ol>
  <li>沿这条路走到头</li>
  <li>右转</li>
  <li>直行穿过第一个十字路口</li>
  <li>在第三个十字路口处左转</li>
  <li>继续走 300 米，学校就在你的右手边</li>
</ol>

#### 嵌套列表

列表可以嵌套，例如：

```html
<ol>
  <li>
    先用蛋白一个、盐半茶匙及淀粉两大匙搅拌均匀，调成“腌料”，鸡胸肉切成约一厘米见方的碎丁并用“腌料”搅拌均匀，腌渍半小时。
  </li>
  <li>
    用酱油一大匙、淀粉水一大匙、糖半茶匙、盐四分之一茶匙、白醋一茶匙、蒜末半茶匙调拌均匀，调成“综合调味料”。
  </li>
  <li>
    鸡丁腌好以后，色拉油下锅烧热，先将鸡丁倒入锅内，用大火快炸半分钟，炸到变色之后，捞出来沥干油汁备用。
  </li>
  <li>
    在锅里留下约两大匙油，烧热后将切好的干辣椒下锅，用小火炒香后，再放入花椒粒和葱段一起爆香。随后鸡丁重新下锅，用大火快炒片刻后，再倒入“综合调味料”继续快炒。
    <ul>
      <li>
        如果你采用正宗川菜做法，最后只需加入花生米，炒拌几下就可以起锅了。
      </li>
      <li>如果你在北方，可加入黄瓜丁、胡萝卜丁和花生米，翻炒后起锅。</li>
    </ul>
  </li>
</ol>
```

效果为：

<ol>
  <li>
    先用蛋白一个、盐半茶匙及淀粉两大匙搅拌均匀，调成“腌料”，鸡胸肉切成约一厘米见方的碎丁并用“腌料”搅拌均匀，腌渍半小时。
  </li>
  <li>
    用酱油一大匙、淀粉水一大匙、糖半茶匙、盐四分之一茶匙、白醋一茶匙、蒜末半茶匙调拌均匀，调成“综合调味料”。
  </li>
  <li>
    鸡丁腌好以后，色拉油下锅烧热，先将鸡丁倒入锅内，用大火快炸半分钟，炸到变色之后，捞出来沥干油汁备用。
  </li>
  <li>
    在锅里留下约两大匙油，烧热后将切好的干辣椒下锅，用小火炒香后，再放入花椒粒和葱段一起爆香。随后鸡丁重新下锅，用大火快炒片刻后，再倒入“综合调味料”继续快炒。
    <ul>
      <li>
        如果你采用正宗川菜做法，最后只需加入花生米，炒拌几下就可以起锅了。
      </li>
      <li>如果你在北方，可加入黄瓜丁、胡萝卜丁和花生米，翻炒后起锅。</li>
    </ul>
  </li>
</ol>

### 文字效果

#### `<em>`元素

`<em>`标签用于**强调**（emphasis），浏览器默认会将它渲染为斜体，但是它的原意并不是单纯的斜体效果。

> 如果仅仅为了获得斜体样式而不增加语义辅助，你应该使用 `<span> `元素和一些 CSS，或者是 `<i> `元素

例如：

```html
<p>我很<em>庆幸</em>你没有<em>迟到</em>。</p>
```

效果为：

<p>我很<em>庆幸</em>你没有<em>迟到</em>。</p>

#### `<strong>`元素

`<strong>`标签用于表示**强烈的重要性**（strong importance），浏览器会默认将它渲染为粗体，但是和`<em>`一样，最好不要把它当做粗体用。

这两种标签可以互相嵌套，例如：

```html
<p>
  这杯液体<strong>毒性很大</strong>——如果饮用了它，你<strong>可能<em>会死</em></strong>。
</p>
```

效果为：

<p>
  这杯液体<strong>毒性很大</strong>——如果饮用了它，你<strong>可能<em>会死</em></strong>。
</p>

#### 表象元素

**表象元素（Presentational Elements）** 是指在HTML中主要用于控制内容外观（如样式、布局等）的元素，且不同于上面的两种，并非用于描述内容的语义或结构。主要有：

|    元素    |                       描述                       |
| :--------: | :----------------------------------------------: |
|   `<b>`    |                       加粗                       |
|   `<i>`    |                       斜体                       |
|   `<u>`    |                    添加下划线                    |
|   `<s>`    |                    添加删除线                    |
|  `<font>`  | 设置文本的字体、颜色和大小（已废弃，不推荐使用） |
| `<center>` |       将内容居中显示（已废弃，不推荐使用）       |
|  `<big>`   |        增大文本大小（已废弃，不推荐使用）        |
| `<small>`  |                   减小文本大小                   |
| `<strike>` |      为文本添加删除线（已废弃，不推荐使用）      |
|   `<dl>`   |         创建描述列表（definition list）          |
|   `<dt>`   |      创建描述列表的术语（即名称，term）部分      |
|   `<dd>`   |       创建描述列表的描述（definition）部分       |

例如：

```html
<!-- 学名 -->
<p>
  红喉北蜂鸟（学名：<i>Archilocus colubris</i>）是北美东部最常见的蜂鸟品种。
</p>

<!-- 舶来词 -->
<p>
  菜单上有好多舶来词汇，比如 <i lang="uk-latn">vatrushka</i>（东欧乳酪面包）、<i
    lang="id"
    >nasi goreng</i
  >（印尼炒饭）以及 <i lang="fr">soupe à l'oignon</i>（法式洋葱汤）。
</p>

<!-- 已知的错误书写 -->
<p>总有一天我会改掉写<u class="spelling-error">措字</u>的毛病。</p>

<!-- 在定义中，被定义的术语 -->
<dl>
  <dt>语义化 HTML</dt>
  <dd>根据元素的<b>语义</b>意义而不是外观来使用它们。</dd>
</dl>
```

效果为：

<p>
  红喉北蜂鸟（学名：<i>Archilocus colubris</i>）是北美东部最常见的蜂鸟品种。
</p>

<p>
  菜单上有好多舶来词汇，比如 <i lang="uk-latn">vatrushka</i>（东欧乳酪面包）、<i
    lang="id"
    >nasi goreng</i
  >（印尼炒饭）以及 <i lang="fr">soupe à l'oignon</i>（法式洋葱汤）。
</p>

<p>总有一天我会改掉写<u class="spelling-error">措字</u>的毛病。</p>

<dl>
  <dt>语义化 HTML</dt>
  <dd>根据元素的<b>语义</b>意义而不是外观来使用它们。</dd>
</dl>

现代网页开发中，更推荐使用CSS来控制样式和布局，而HTML应专注于内容的语义和结构。

### 无语义元素

对于一些要组织的项目或要包装的内容，现有的语义元素均不能很好对应。有时候你可能只想将一组元素作为一个单独的实体来修饰来响应单一的用 CSS 或 JavaScript。为了应对这种情况，HTML 提供了 `<div>` 和`<span>`元素。应配合使用 class 属性提供一些标签，使这些元素能易于查询。

#### `<span>元素`

`<span>` 是一个内联的（inline）无语义元素，最好只用于无法找到更好的语义元素来包含内容时，或者不想增加特定的含义时。例如：

```html
<p> 国王喝得酩酊大醉，在凌晨 1 点时才回到自己的房间，踉跄地走过门口。<span class="editor-note" >[编辑批注：此刻舞台灯光应变暗]</span >. </p>
```

> 这里，“编辑批注”仅仅是对舞台剧导演提供额外指引；没有具体语义。对于视力正常的用户，CSS应将批注内容与主内容稍微隔开一些。

未被CSS渲染的效果为：

<p> 国王喝得酩酊大醉，在凌晨 1 点时才回到自己的房间，踉跄地走过门口。<span class="editor-note" >[编辑批注：此刻舞台灯光应变暗]</span >. </p>

#### `<div>`元素

`<div>`是一个块级无语义元素，应仅用于找不到更好的块级元素时，或者不想增加特定的意义时。[跳转到块级元素和内联元素章节。](#块级元素和内联元素)

div 元素非常便利但容易被滥用。由于它们没有语义值，会使 HTML 代码变得混乱。

### 换行和分割线

#### `<br>`标签

`<br>`能够在段落中换行。`<br>` 是唯一能够生成多个短行结构的元素。例如：

```html
<p>
  从前有个人叫小高<br />
  他说写 HTML 感觉最好<br />
  但他写的代码结构语义一团糟<br />
  他写的标签谁也懂不了。
</p>
```

效果为：

<p>
  从前有个人叫小高<br />
  他说写 HTML 感觉最好<br />
  但他写的代码结构语义一团糟<br />
  他写的标签谁也懂不了。
</p>

#### `<hr>` 标签

`<hr>` 元素在文档中生成一条水平分割线。例如：

```html
<p>
  原来这唐僧是个慈悯的圣僧。他见行者哀告，却也回心转意道：“既如此说，且饶你这一次。再休无礼。如若仍前作恶，这咒语颠倒就念二十遍！”行者道：“三十遍也由你，只是我不打人了。”却才伏侍唐僧上马，又将摘来桃子奉上。唐僧在马上也吃了几个，权且充饥。
</p>
<hr />
<p>
  却说那妖精，脱命升空。原来行者那一棒不曾打杀妖精，妖精出神去了。他在那云端里，咬牙切齿，暗恨行者道：“几年只闻得讲他手段，今日果然话不虚传。那唐僧已此不认得我，将要吃饭。若低头闻一闻儿，我就一把捞住，却不是我的人了。不期被他走来，弄破我这勾当，又几乎被他打了一棒。若饶了这个和尚，诚然是劳而无功也。我还下去戏他一戏。”
</p>
```

效果为：

<p>
  原来这唐僧是个慈悯的圣僧。他见行者哀告，却也回心转意道：“既如此说，且饶你这一次。再休无礼。如若仍前作恶，这咒语颠倒就念二十遍！”行者道：“三十遍也由你，只是我不打人了。”却才伏侍唐僧上马，又将摘来桃子奉上。唐僧在马上也吃了几个，权且充饥。
</p>
<hr />
<p>
  却说那妖精，脱命升空。原来行者那一棒不曾打杀妖精，妖精出神去了。他在那云端里，咬牙切齿，暗恨行者道：“几年只闻得讲他手段，今日果然话不虚传。那唐僧已此不认得我，将要吃饭。若低头闻一闻儿，我就一把捞住，却不是我的人了。不期被他走来，弄破我这勾当，又几乎被他打了一棒。若饶了这个和尚，诚然是劳而无功也。我还下去戏他一戏。”
</p>

### 引用

如果一个块级内容（一个段落、多个段落、一个列表等）从其他地方被引用，你应该把它用 `<blockquote>` 元素包裹起来表示，并且在 `cite` 属性里用url来指向引用的资源。例如：

```html
<p>Here is a blockquote:</p>
<blockquote
  cite="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/blockquote">
  <p>
    The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or
    <em>HTML Block Quotation Element</em>) indicates that the enclosed text is
    an extended quotation.
  </p>
</blockquote>
```

效果为：

<p>Here is a blockquote:</p>
<blockquote
  cite="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/blockquote">
  <p>
    The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or
    <em>HTML Block Quotation Element</em>) indicates that the enclosed text is
    an extended quotation.
  </p>
</blockquote>

行内引用同理：

```html
<p>
  The quote element — <code>&lt;q&gt;</code> — is
  <q cite="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/q"
    >intended for short quotations that don't require paragraph breaks.</q
  >
</p>
```

效果为：

<p>
  The quote element — <code>&lt;q&gt;</code> — is
  <q cite="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/q"
    >intended for short quotations that don't require paragraph breaks.</q
  >
</p>

不过，浏览器默认不会显示`cite`的内容，如果想要显示，就要用到`<cite>`标签：

```html
<p>
  According to the
  <a href="/zh-CN/docs/Web/HTML/Element/blockquote">
    <cite>MDN blockquote page</cite></a
  >:
</p>

<blockquote
  cite="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/blockquote">
  <p>
    The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or
    <em>HTML Block Quotation Element</em>) indicates that the enclosed text is
    an extended quotation.
  </p>
</blockquote>

<p>
  The quote element — <code>&lt;q&gt;</code> — is
  <q cite="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/q"
    >intended for short quotations that don't require paragraph breaks.</q
  >
  — <a href="/zh-CN/docs/Web/HTML/Element/q"> <cite>MDN q page</cite></a
  >.
</p>
```

效果为：

<p>
  According to the
  <a href="/zh-CN/docs/Web/HTML/Element/blockquote">
    <cite>MDN blockquote page</cite></a
  >:
</p>

<blockquote
  cite="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/blockquote">
  <p>
    The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or
    <em>HTML Block Quotation Element</em>) indicates that the enclosed text is
    an extended quotation.
  </p>
</blockquote>

<p>
  The quote element — <code>&lt;q&gt;</code> — is
  <q cite="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/q"
    >intended for short quotations that don't require paragraph breaks.</q
  >
  — <a href="/zh-CN/docs/Web/HTML/Element/q"> <cite>MDN q page</cite></a
  >.
</p>

### 缩写

使用`<abbr>`标签，用来表示缩写，例如：

```html
<p>
  我们使用
  <abbr title="超文本标记语言（Hyper text Markup Language）">HTML</abbr>
  来组织网页文档。
</p>
```

效果为：

<p>
  我们使用
  <abbr title="超文本标记语言（Hyper text Markup Language）">HTML</abbr>
  来组织网页文档。
</p>

### 联系方式

`<address>`标签用于表示联系方式，例如：

```html
<address>Chris Mills, Manchester, The Grim North, UK</address>
```

<address>Chris Mills, Manchester, The Grim North, UK</address>

### 上下标

`<sup>`和`<sub>`标签用于表示上下标，例如：

```html
<p>
  咖啡因的化学方程式是 C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>。
</p>
<p>如果 x<sup>2</sup> 的值为 9，那么 x 的值必为 3 或 -3。</p>
```

效果为：

<p>
  咖啡因的化学方程式是 C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>。
</p>
<p>如果 x<sup>2</sup> 的值为 9，那么 x 的值必为 3 或 -3。</p>

### 代码块

很多标签都可以用来表示代码块：

- `<code>`：用于标记计算机通用代码。
- `<pre>`：用于保留空白字符（通常用于代码块）——如果文本中使用了缩进或多余的空白，浏览器将忽略它，你将不会在呈现的页面上看到它。但是，如果你将文本包含在 `<pre></pre>` 标签中，那么空白将会以与你在文本编辑器中看到的相同的方式渲染出来。
- `<var>`：用于标记具体变量名。
- `<kbd>`：用于标记输入电脑的键盘（或其他类型）输入。
- `<samp>`：用于标记计算机程序的输出。

例如：

```html
<pre><code>const para = document.querySelector('p');

para.onclick = function() {
  alert('噢，噢，噢，别点我了。');
}</code></pre>

<p>
  请不要使用 <code>&lt;font&gt;</code> 、
  <code>&lt;center&gt;</code> 等表象元素。
</p>

<p>在上述的 JavaScript 示例中，<var>para</var> 表示一个段落元素。</p>

<p>按 <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>A</kbd> 选择全部内容。</p>

<pre>$ <kbd>ping mozilla.org</kbd>
<samp>PING mozilla.org (63.245.215.20): 56 data bytes
64 bytes from 63.245.215.20: icmp_seq=0 ttl=40 time=158.233 ms</samp></pre>
```

效果为：

<pre>
<code>
const para = document.querySelector('p');
para.onclick = function() {
  alert('噢，噢，噢，别点我了。');
}
</code>
</pre>

<p>
  请不要使用 <code>&lt;font&gt;</code> 、
  <code>&lt;center&gt;</code> 等表象元素。
</p>

<p>在上述的 JavaScript 示例中，<var>para</var> 表示一个段落元素。</p>

<p>按 <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>A</kbd> 选择全部内容。</p>

<pre>$ <kbd>ping mozilla.org</kbd>
<samp>PING mozilla.org (63.245.215.20): 56 data bytes
64 bytes from 63.245.215.20: icmp_seq=0 ttl=40 time=158.233 ms</samp></pre>

### 时间和日期

HTML 还支持将时间和日期标记为可供机器识别的格式的 `<time>` 元素，例如：

```html
<time datetime="2016-01-20">2016 年 1 月 20 日</time>
```

效果为：

<time datetime="2016-01-20">2016 年 1 月 20 日</time>

它的主要作用是供程序自动爬取相关的数据。

## 构建网页的HTML

> 本节主要参考[^4]

[^4]: https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/Structuring_documents

典型的网页主要分为几部分，HTML中也有标签与之对应：

|  HTML标签  |          网页元素          |
| :--------: | :------------------------: |
| `<header>` |            页眉            |
|  `<nav>`   |           导航栏           |
|  `<main>`  |    主内容及其字内容区段    |
| `<aside>`  | 侧边栏（通常嵌套于主内容） |
| `<footer>` |            页脚            |
