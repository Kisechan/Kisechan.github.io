---
title: 利用hexo-pdf在博客中插入pdf
url: https://blog.kisechan.space/2025/hexo-pdf-test/
type: post
time: '2026-10-23T14:43:06.486Z'
---

# 安装

hexo-pdf可以将pdf文件作为标签嵌入博客文档，利用`npm`安装：

```bash
npm install --save hexo-pdf
```

hexo-pdf的Github仓库：[https://github.com/superalsrk/hexo-pdf](https://github.com/superalsrk/hexo-pdf)

在安装完毕后，就可以在文档中插入语句

```markdown
{% pdf [文件路径] %}
```

来插入pdf文件。

# 示例

例如：

经过试验，移动端的pdf并不会展示出来，而是提供下载，需要解决。
