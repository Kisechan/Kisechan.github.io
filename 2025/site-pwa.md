---
title: 为博客增添 PWA 支持
url: https://blog.kisechan.space/2025/site-pwa/
type: post
time: '2026-10-21T16:13:46.163Z'
---

## 介绍

Progressive Web App (PWA) 可以让网站变成一个可安装的小应用，甚至于能离线访问，非常炫酷。

要实现 PWA 支持，网站需要满足：

- 有一个 `manifest.json`；

- 有 HTTPS；

- 有 Service Worker；

## 配置 `manifest.json`

本人选用了 `hexo-pwa` 插件，它能够自动生成 `manifest.json`：

```bash
npm install hexo-pwa --save
```

然后在 Hexo 博客的 `_config.yml` 添加以下配置：

```yaml
# 启用 PWA 插件
pwa:
  manifest:
    path: /manifest.json
    body:
      name: "Kisechan's Blog"
      short_name: Blog
      start_url: /
      display: standalone
      description: "Kisechan's Blog"
      background_color: "#ffffff"
      theme_color: "#004e66"
      # 下面添加 icon，千万不要写错路径
      icons:
        - src: /images/icon.png
          sizes: 512x512
          type: image/png
```

这时候，执行构建和本地运行：

```bash
hexo clean && hexo g && hexo s
```

在浏览器中按下 F12，就可以看到 `应用` 标签下，`清单` 中存在 `manifest.json`，但是我们还没有配置 `sw.js` （Service Worker）等其它的文件，所以应该是看不到下载按钮的。

## 配置 `sw.js`

这一部分我主要参考了[这篇博客](https://www.w4ter.com/posts/2024/11/20/%E6%80%8E%E4%B9%88%E7%BB%99hexo%E9%85%8D%E7%BD%AEPWA#service-worker)，这位大佬的解决方案很有效。

另外，Fluid 框架不会把 `sw.js` 解析成页面，不用担心被解析成页面的问题。

## 一些其他的改进

做完上面的工作，就可以本地跑通了，但不知是不是 GitHub 为了安全性不让访问 `json` 或者 `js` 的问题（博客一直是托管在 GitHub Pages 的），部署好了却不能实现 PWA（虽然过了一会就正常了）并且无法访问到 `kisechan.github.io/manifest.json`，会显示 404。于是就想着正好改掉原来的方案，用 Cloudflare 部署一个镜像的博客，把域名绑到那里去。

现在博客可以通过下面的域名访问到：

- [https://blog.kisechan.space/](https://blog.kisechan.space/)，用 Cloudflare 部署的镜像。
- [https://kisechan-blog.pages.dev/](https://kisechan-blog.pages.dev/)，和上面是一个站，只是上面的绑了域名。
- [https://kisechan.github.io/](https://kisechan.github.io/)，在 GitHub Pages 部署的博客。

## 参考和注解

1. 最主要的参考：https://www.w4ter.com/posts/2024/11/20/%E6%80%8E%E4%B9%88%E7%BB%99hexo%E9%85%8D%E7%BD%AEPWA#service-worker
2. https://www.ucloud.cn/yun/97427.html
3. https://hexo.fluid-dev.com/posts/hexo-pwa/
