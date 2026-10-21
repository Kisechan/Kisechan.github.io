---
title: 网站域名变更所做的工作
url: https://blog.kisechan.space/2025/site-domain/
type: post
time: '2026-10-21T16:02:14.153Z'
---

从现在开始，本站域名便从 **kisechan.github.io** 正式迁移到 **blog.kisechan.space** 了！

## 购买、配置域名

博主一直使用的是由 Github Page 提供的免费二级域名 kisechan.github.io ，最近想换成自由一些的新域名，于是在阿里云买了十年的 kisechan.space 域名。

> 对于我来说原本的备选除了 .space 其实还有 .site、 .top、 .fun、 .host 这样的域名，最中意的选项也是第一个，但就在博主正准备买的时候 .site 和 .fun 突然从230/10年涨到800多，就放弃了。 .top 倒是一直很便宜，就是风评比较差，例如这里[^1]。所以就选了现在的这个顶级域名。

[^1]: https://blog.liushen.fun/posts/260f4f9a/#逐渐黑产化

有了域名以后就可以把原本部署到 Github Page 的博客绑定到域名上了，主要的流程是：

- 在域名注册商的网站打开后台，增添 DNS 解析，添加一个 CNAME 记录（别名记录，只能解析到一个域名，如果是 A 记录，也就是地址/ Address 记录那就只能解析到 IP 地址），给子域名 blog.kisechan.space 解析到 Github Page 的 kisechan.github.io。
- 在 Github Page 的仓库 Settings 中的 Page 选项中，在 Custom domain 下添加自定义域名，进行好 DNS 解析以后就是把域名绑定到博客了。
- 勾选强制 HTTPS 。

**注意**

在这个时候要在博客根目录（不是 `theme/` ）下的 `source/` 文件夹内新建一个 `CNAME` 文件，里面写上需要绑定的自定义域名。

而且， `CNAME` 内填写的域名**不能包含有https://等内容**[^2]，就是一个单纯的域名，否则在每次使用 `hexo d` 进行部署的时候，都会把 Github Page 仓库里配置好了的域名给刷新掉，访问就会 404 。

[^2]: https://liunwcj.cn/2022/02/11/hexo-gh-host-bug/

## 域名解析到 Cloudflare

关键点是把域名的 **DNS 服务器**从注册商给的域名改成 Cloudflare 提供的那两个域名，随后点击检测，待检测完毕就相当于解析到 Cloudflare 了。

解析完毕以后，博主发现访问本站时，会出现重定向过多网站进不去，是因为解析到 Cloudflare 后， Cloudflare 的 SSL 证书默认选择的是**灵活 SSL** ，强制通过未加密的 HTTP 连接到源 Web 服务器，然而 Web 服务器只能以 HTTPS 的方式进行访问，所以无法访问。解决方案就是将 SSL 方式选择为**完全 SSL** 。[^3]

[^3]: https://blog.csdn.net/qq_21405949/article/details/144277026?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EYuanLiJiHua%7EPaidSort-1-144277026-blog-112727903.235%5Ev43%5Epc_blog_bottom_relevance_base6&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EYuanLiJiHua%7EPaidSort-1-144277026-blog-112727903.235%5Ev43%5Epc_blog_bottom_relevance_base6&utm_relevant_index=1

---
