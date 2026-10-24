---
title: Agent 时代一些有意思的 Web 小惯例
url: https://blog.kisechan.space/2026/web-for-agents/
type: post
time: '2026-10-24T09:09:07.707Z'
---

本文主要来介绍一些 Web 开发领域有意思的约定，以及现在的 Agent 时代又有些什么新的潮流，来方便 Agent 工作。例如，`robots.txt` 可以让爬虫了解网站希望它遵循的抓取规则；搜索引擎可以通过 `sitemap.xml` 获得网站的页面清单；RSS 阅读器能够通过 `atom.xml` 订阅内容更新。

这些东西算是很常见但是很少看见有人讲解的。它们一部分属于正式互联网标准，一部分是被广泛采用的行业协议，还有一部分是社区提出并逐渐推广的约定。

这种机制涉及几个相关的技术概念：

- **Convention over Configuration**（约定优于配置）：通过事先确定的默认路径和格式减少显式配置。
- **Machine-readable Metadata**（机器可读元数据）：以程序容易解析的格式描述网站及其内容。
- **Resource / Service Discovery**（资源与服务发现）：允许客户端自动找到网站提供的资源、API 或服务。
- **Well-Known URIs**（众所周知的 URI）：通过正式注册的固定路径实现服务发现。
- **Content Negotiation**（内容协商）：通过 HTTP 请求和响应头，在同一资源的不同表示形式之间进行选择。

---

也可以去知乎看本文
https://zhuanlan.zhihu.com/p/2097102804544496101

---

## 根目录中的经典约定

### `robots.txt`

- **典型路径**：`/robots.txt`
- **内容格式**：UTF-8 纯文本
- **媒体类型**：`text/plain`
- **标准**：RFC 9309
- **主要用途**：声明自动化爬虫的访问规则

这是 Web 中历史最悠久、影响范围最广的文件约定之一。一个典型的 `robots.txt`：

```text
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

User-agent: ExampleBot
Disallow: /drafts/

Sitemap: https://example.com/sitemap.xml
```

`User-agent` 指定爬虫名称，`Allow` 和 `Disallow` 分别声明允许、限制抓取的 URL 路径。`Sitemap` 则是被主流搜索引擎支持的扩展指令。

RFC 9309 的核心规则包括：

- 根据爬虫的 product token 匹配 `User-agent` 规则组。
- 使用最具体的匹配路径决定访问规则。
- 支持 `*` 通配符与 `$` 路径结尾标记。
- 对文件编码、重定向、缓存和访问失败行为作出规定。

`robots.txt` 属于爬虫自律协议，对遵守规则的客户端产生作用。而真正的访问权限由服务器认证和授权机制决定。

### `sitemap.xml`

- **典型路径**：`/sitemap.xml`
- **格式**：XML
- **主要用途**：提供网站 URL 清单
- **性质**：搜索引擎广泛支持的开放协议

Sitemap 协议最早由 Google 于 2005 年推出，后来得到 Yahoo、Microsoft 等搜索引擎支持。标准内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-10-21</lastmod>
  </url>
  <url>
    <loc>https://example.com/posts/hello/</loc>
    <lastmod>2026-10-20</lastmod>
  </url>
</urlset>
```

其核心字段包括 `loc`、`lastmod`，以及可选的 `changefreq` 和 `priority`。后两者虽然存在于协议中，但现代 Google 搜索已忽略它们。

对于大型网站，Sitemap 可以使用 `sitemapindex` 汇总多个文件。还存在图片、视频、新闻等专用扩展。文件名本身也可以变化，例如变成 `sitemap_index` 等等。

### RSS 和 Atom

RSS 和 Atom 都是 Web 内容聚合与分发技术，允许客户端定期获取网站发布的新文章或其他信息。它们最典型的应用是博客和新闻网站。常见的地址包括：

- `/rss.xml`
- `/atom.xml`
- `/feed.xml`
- `/feed/`
- `/index.xml`

典型 RSS 文件采用 XML 格式，使用 `channel` 表达订阅源，使用 `item` 表达单篇内容：

```xml
<rss version="2.0">
  <channel>
    <title>Example Blog</title>
    <link>https://example.com/</link>
    <description>Personal blog</description>

    <item>
      <title>Hello World</title>
      <link>https://example.com/hello/</link>
      <description>My first post.</description>
    </item>
  </channel>
</rss>
```

Atom[^1] 是后来由 IETF 标准化的订阅格式，正式规范为 RFC 4287。它明确定义了 `id`、`updated`、`entry` 等字段，具备严格的身份标识和时间戳语义。

[^1]: 大概就是原子的意思。但是这个名字是投票得来的，可以参考：https://flylib.com/books/en/1.114.1.16/1/。

```xml
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Example Blog</title>
  <id>https://example.com/</id>
  <updated>2026-10-21T12:00:00Z</updated>

  <entry>
    <title>Hello World</title>
    <id>https://example.com/hello/</id>
    <updated>2026-10-21T12:00:00Z</updated>
    <link href="https://example.com/hello/"/>
  </entry>
</feed>
```

Atom 和 RSS 是不一样的两种格式，但很多博客生成器同时支持这两种格式，RSS 阅读器也通常兼容两者。

### `favicon.ico`

`favicon.ico` 起源于早期浏览器的网站收藏夹图标机制，后来逐渐成为浏览器标签页、书签和其他网站标识场景中的通用资源。其传统路径为 `/favicon.ico`。

现代网页还可以显式声明其他格式：

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32x32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

相关资源可能包括：

- `/favicon.ico`
- `/favicon.svg`
- `/favicon-16x16.png`
- `/favicon-32x32.png`
- `/apple-touch-icon.png`
- `/android-chrome-192x192.png`
- `/android-chrome-512x512.png`

这些文件并非都属于统一的正式标准。现代浏览器通过 HTML `rel="icon"` 机制发现图标，移动操作系统还维护各自的设备图标约定。

### `humans.txt`

`humans.txt` 是一个带有互联网早期人文精神的社区倡议。它希望在机器可读的 Web 中，为网站的设计者、开发者和内容贡献者保留一个公开署名的位置。典型路径：`/humans.txt`。[^2]

[^2]: https://www.zhangxinxu.com/wordpress/2011/01/humans-txt-%E7%BD%91%E7%AB%99%E7%9B%B8%E5%85%B3%E4%BA%BA%E5%91%98%E4%BF%A1%E6%81%AF%E8%AE%B0%E5%BD%95%E7%9A%84idea/

例如：

```text
/* TEAM */
Developer: Alice
Website: https://example.com
Location: Shanghai, China

/* SITE */
Language: Chinese
Standards: HTML5, CSS3
Software: Hexo
```

`humans.txt` 通常采用普通文本，包含团队、联系方式、网站技术和其他致谢信息。

它属于自愿采用的社区约定，内容结构也较自由。

这种做法体现了 Web 的一项传统：网站既可以面向机器提供协议，也可以保留设计者的署名和创作信息。

---

humans.txt 官方网站
https://humanstxt.org/

---

### 其他的根目录文件

除了上述经典文件，还有许多具有特定用途的路径。

| 路径                      | 内容与作用                              | 标准化情况             |
| :------------------------ | :-------------------------------------- | :--------------------- |
| `/manifest.webmanifest`   | PWA 名称、图标、显示模式、启动路径      | W3C Web App Manifest   |
| `/manifest.json`          | Web App Manifest 的常见文件名           | 约定                   |
| `/ads.txt`                | 声明授权销售网站广告库存的平台          | IAB Tech Lab           |
| `/app-ads.txt`            | 移动应用广告授权关系                    | IAB Tech Lab           |
| `/opensearch.xml`         | 描述网站搜索服务                        | OpenSearch Description |
| `/browserconfig.xml`      | 旧版 Microsoft 磁贴与浏览器配置         | 历史平台约定           |
| `/crossdomain.xml`        | Adobe Flash 跨域访问策略                | 历史平台协议           |
| `/clientaccesspolicy.xml` | Microsoft Silverlight 跨域访问策略      | 历史平台协议           |
| `/CNAME`                  | GitHub Pages 等静态托管的自定义域名配置 | 托管平台约定           |
| `/404.html`               | 静态网站常见的自定义错误页              | 服务器与托管平台约定   |
| `/humans.txt`             | 介绍网站创作者及技术信息                | 社区倡议               |

其中有些文件主要存在于早期 Web 或特定平台生态，它们共同展示了通过已知路径发布配置与元数据的传统。

## Well-Known URIs

这是一些正式化的网站服务发现机制。

随着 Web 服务数量增加，越来越多的协议需要在固定位置发布配置信息，IETF 因此建立了统一的 Well-Known URI 命名空间。基本形式为 `https://example.com/.well-known/<registered-name>`。

常见 Well-Known 路径有：

| 路径                                      | 规范 / 生态                 | 作用                        |
| ----------------------------------------- | --------------------------- | --------------------------- |
| `/.well-known/security.txt`               | RFC 9116                    | 公布安全漏洞报告联系方式    |
| `/.well-known/change-password`            | Well-Known URI 约定         | 跳转到密码修改入口          |
| `/.well-known/openid-configuration`       | OpenID Connect              | 发现身份提供方元数据        |
| `/.well-known/oauth-authorization-server` | RFC 8414                    | OAuth 授权服务器元数据      |
| `/.well-known/oauth-protected-resource`   | RFC 9728                    | OAuth 受保护资源元数据      |
| `/.well-known/webfinger`                  | RFC 7033                    | 通过账号标识发现相关资源    |
| `/.well-known/host-meta`                  | RFC 6415                    | 主机级元数据                |
| `/.well-known/assetlinks.json`            | Android Digital Asset Links | 验证 Android App 和网站关联 |
| `/.well-known/apple-app-site-association` | Apple Associated Domains    | 配置 Universal Links 等关联 |
| `/.well-known/acme-challenge/`            | RFC 8555                    | ACME HTTP-01 证书验证       |
| `/.well-known/api-catalog`                | RFC 9727                    | 自动发现网站 API            |
| `/.well-known/did.json`                   | did                         | 发布去中心化身份文档        |
| `/.well-known/matrix/server`              | Matrix                      | Matrix 服务发现             |
| `/.well-known/matrix/client`              | Matrix                      | Matrix 客户端发现           |
| `/.well-known/agent-card.json`            | Agent2Agent                 | AI Agent 能力发现           |
| `/.well-known/mcp/server-card.json`       | MCP Server Card 草案        | MCP 服务发现                |
| `/.well-known/agent-skills/index.json`    | Agent Skills Discovery 提案 | Agent 技能目录              |

表中的部分机制属于 IETF RFC，部分属于平台规范或仍在发展中的提案。路径的存在本身也不代表所有网站都会发布对应资源。

## HTML、HTTP 与结构化元数据

Web 惯例还广泛存在于 HTML 元素和 HTTP 协议中。这些机制能够在保留正常网页内容的同时，为其他程序增加额外的信息层。

### Metadata 与 Link Relations

HTML 的 `<head>` 可以描述页面摘要、图标、主版本 URL、替代语言和订阅源。例如：

```html
<head>
  <meta name="description" content="Example Blog">

  <link rel="canonical"
        href="https://example.com/post/hello/">

  <link rel="alternate"
        type="application/atom+xml"
        href="/atom.xml">

  <link rel="alternate"
        hreflang="en"
        href="https://example.com/en/">

  <link rel="manifest"
        href="/manifest.webmanifest">
</head>
```

其中：

- `canonical` 表示页面的首选规范 URL。
- `alternate` 表示另一种语言、格式或内容表示。
- `manifest` 用于发现 Web App Manifest。
- `icon` 则用于发现网站图标。

这些关系类型属于 Web Linking 与 HTML 规范体系的一部分。

### Open Graph Protocol

Open Graph 使用 HTML 的 `meta` 标签为网页提供结构化的分享预览信息。

```html
<meta property="og:type" content="article">
<meta property="og:title" content="Hello World">
<meta property="og:description" content="My first post">
<meta property="og:image" content="https://example.com/cover.png">
<meta property="og:url" content="https://example.com/hello/">
```

社交平台和聊天软件可以利用这些数据生成标题、图片和摘要预览。

---

Open Graph Protocol
https://ogp.me/

---

### Schema.org 与 JSON-LD

Schema.org 是一套描述现实世界实体及其关系的共享词汇表，JSON-LD 则是一种以 JSON 表示关联数据的格式。例如，网站可以在 HTML 中声明：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Hello World",
  "datePublished": "2026-10-21",
  "author": {
    "@type": "Person",
    "name": "Alice"
  }
}
</script>
```

这里的 `BlogPosting` 表明页面描述的是一篇博客文章，其他字段则表达标题、发布日期和作者。JSON-LD 广泛用于搜索引擎结构化数据，也可以被其他程序消费。

## 面向语言模型的 Web 惯例

随着大语言模型开始主动访问互联网，网站又出现了新的访客：AI Agent。它们通常需要直接获取信息、检索文档、理解 API，有时还需要代表用户执行操作。

传统 HTML 包含导航、样式、脚本和交互组件。而相比之下，Markdown 能够以较低的解析开销表达标题、正文、链接、列表和代码。

### `llms.txt`

Jeremy Howard 于 2024 年 9 月提出了 `llms.txt`，希望网站能够向语言模型提供一个统一、易于读取的内容入口。该提案在 2026 年 8 月更新到 v2。典型路径是 `/llms.txt`。也有 `/llms-full.txt`，通常把完整文档组合为一个大型 Markdown 文件

一个典型的 `llms.txt` 文件如下：

```markdown
# Example Project

> An open-source web application framework.

Example Project supports APIs and edge deployment.

## Documentation

- [Getting Started](https://example.com/docs/start.md): Installation and setup
- [API Reference](https://example.com/docs/api.md): API documentation
- [Configuration](https://example.com/docs/config.md): Configuration options

## Optional

- [Changelog](https://example.com/changelog.md): Release history
- [Examples](https://example.com/examples.md): Example applications
```

`llms.txt` v2 的结构主要包括：

1. 一个必需的 H1 标题。
2. 可选的简短摘要和说明正文。
3. 使用 H2 标题分组的 Markdown 链接清单。
4. 通过 `Optional` 分组表达次要资料。

每条链接可以附带简短描述，帮助 Agent 判断其用途。

---

Cloudflare 是近年来积极推广 Agent Web 相关技术的公司之一，所以这里的很多做法都可以学习它们的网页，算是比较标准化了。比如：

---

www.cloudflare.com/llms.txt
https://www.cloudflare.com/llms.txt

---

Cloudflare 将未来 Agentic Internet 的关键能力概括为四个方面：

| 能力         | 主要问题               | 相关技术                                   |
| ------------ | ---------------------- | ------------------------------------------ |
| Readable     | Agent 怎样高效读取内容 | Markdown for Agents                        |
| Discoverable | Agent 怎样发现服务     | API Catalog、MCP Server Card、Agent Skills |
| Callable     | Agent 怎样执行操作     | WebMCP、MCP                                |
| Payable      | Agent 怎样购买资源     | x402、支付协议                             |

身份验证、授权和访问控制则贯穿整个过程。

### Markdown for Agents

Cloudflare 于 2026 年 2 月推出 Markdown for Agents。这项机制建立在 HTTP 的内容协商之上，让 Agent 通过请求头明确表示自己希望接收 Markdown。例如：

```text
GET /docs/ HTTP/1.1
Host: example.com
Accept: text/markdown
```

支持这一机制的网站可以返回：

```text
HTTP/1.1 200 OK
Content-Type: text/markdown; charset=utf-8
Vary: Accept
```

并响应正文：

```markdown
# Documentation

## Introduction

This project provides a serverless API.

## Installation

Run the following command:

`npm install example`
```

相同 URL 仍然可以向普通浏览器返回 HTML。这一机制使用了成熟的 HTTP 标准能力，而 Cloudflare 的贡献主要在于提供实际的 Markdown 转换和分发服务。

Markdown 的优势包括较低的 Token 开销，以及更直接的标题层次、正文内容和代码结构。

### Content Signals Policy

传统 `robots.txt` 侧重抓取访问规则，Cloudflare 提出的 Content Signals 进一步区分抓取后的使用目的，用于扩展网站对自动化客户端的内容使用声明。

Cloudflare 定义了三个主要信号：

| 信号       | 含义                                         |
| ---------- | -------------------------------------------- |
| `search`   | 构建搜索索引、显示链接及简短摘要             |
| `ai-input` | 把内容提供给 AI 模型进行推理、RAG 或回答生成 |
| `ai-train` | 使用内容训练或微调 AI 模型                   |

例如：

```text
User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /
```

表示网站所有者声明允许搜索索引和实时 AI 输入，同时反对将内容用于模型训练。该提案也允许省略某一信号，表示网站所有者没有通过该字段声明相应偏好。

Cloudflare 的完整 Content Signals Policy 还包含解释这些声明含义的文字和有关权利保留的条款。

### Agent Skills Discovery

Agent Skills 是一种面向智能体的能力说明形式，通常以 Markdown 文档描述某项任务的执行流程、工具使用方法和约束。

Cloudflare 推广的 Agent Skills Discovery 试图让网站通过约定路径公开其技能目录。提案中的代表性路径为 `/.well-known/agent-skills/index.json`，该目录可以指向站点公开的技能说明文件，使 Agent 发现它们的名称、用途和入口。

技能本体常采用 `SKILL.md` 文件名，这类文件的内容通常包含技能名称、说明、操作流程、工具调用要求及示例。

Agent Skills Discovery 属于新兴服务发现实践，其具体目录结构和客户端支持仍在演进。

### MCP Server Card

Model Context Protocol（MCP）允许 AI 应用通过统一接口发现并调用外部工具和资源。MCP Server Card 进一步探索如何让 Agent 自动发现一个网站提供的 MCP 服务。其提案路径为 `/.well-known/mcp/server-card.json`。

Server Card 希望描述服务器身份、连接地址、传输方式、授权需求等元数据，这和 API Catalog 有着相似的设计思想：通过固定位置为机器提供可发现的服务入口。MCP Server Card 仍处于提案发展阶段，具体字段应以相应草案版本为准。

### Agent Readiness

另外，Cloudflare 推出了一个 Agent Readiness 检测服务：

---

isitagentready.com
https://isitagentready.com/

---

该服务从内容可读取性、访问策略、身份认证、服务发现等维度检查网站的 Agent 兼容能力。

![本站的 Agent-Ready 分数](https://images.kisechan.space/uploads/2026/10/23/agent-readiness-https-blog-kisechan-space-622a0fca.png)

本站的 Agent-Ready 分数不算太高，可能主要是因为确实没有提供 API、 MCP 等的能力。但在 Markdown for Agents 等方面做了很多努力哦。现在可以让 Agent 直接获取本站的 markdown 文章了。

## 参考与注解

### 社区约定与开放技术

1. [humans.txt](https://humanstxt.org/)
2. [llms.txt 官方提案](https://llmstxt.org/)
3. [OpenSearch Description](https://github.com/dewitt/opensearch)
4. [Model Context Protocol](https://modelcontextprotocol.io/)
5. [Agent Skills](https://agentskills.io/)
6. [Agent2Agent Protocol](https://a2a-protocol.org/)
7. [x402 Protocol](https://www.x402.org/)

### Cloudflare 的文章

1. [Introducing Markdown for Agents — 2026-02-12](https://blog.cloudflare.com/markdown-for-agents/)
2. [Giving users choice with Cloudflare’s Content Signals Policy](https://blog.cloudflare.com/content-signals-policy/)
3. [Introducing the Agent Readiness score — 2026-04-17](https://blog.cloudflare.com/agent-readiness/)
4. [Building an open Agentic Internet — 2026-08-06](https://blog.cloudflare.com/the-agentic-internet/)
5. [Give any website a WebMCP interface — 2026-08-06](https://blog.cloudflare.com/webmcp/)
6. [How Commerce.com and Cloudflare are getting storefronts ready for AI agents — 2026-10-21](https://blog.cloudflare.com/webmcp-commerce/)
7. [Cloudflare Agent Readiness 检测服务](https://isitagentready.com/)

### 注解和其他引用
