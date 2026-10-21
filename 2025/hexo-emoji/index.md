---
title: 让Hexo博客支持Emoji表情
url: https://blog.kisechan.space/2025/hexo-emoji/
type: post
time: '2026-10-21T16:13:46.163Z'
---

# 安装

[hexo-filter-github-emojis](http://github.com/arturi/hexo-filter-github-emojis) 是一个使用 Github Emojis API 来添加 Emoji表情的 Hexo 插件。

安装插件：

```bash
npm install hexo-filter-github-emojis --save
```

# 配置

在`_config.yml`中配置：

```yaml
githubEmojis:
  enable: true
  className: github-emoji
  inject: true
  styles:
  customEmojis:
```

# 示例

例如：

```md
:smile:
```

渲染为：

:smile:

支持的所有符号可以参考：https://www.webfx.com/tools/emoji-cheat-sheet/
