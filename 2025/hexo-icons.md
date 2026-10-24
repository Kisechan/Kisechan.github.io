---
title: 给Fluid主题引入外部图标CSS
url: https://blog.kisechan.space/2025/hexo-icons/
type: post
time: '2026-10-24T09:09:07.707Z'
---

# 图标库

准备增加的是 **FontAwesome 4.7.0 中完整的675个图标样式CSS**，链接可以参考：https://9iphp.com/fa-icons

# 添加

博主尝试过在`_config.fluid.yml`的`custom_css`下和新定义一个`fa`引入 CSS ，但是都不起效，查了文档[^1][^2]发现可以直接自定义网页`<head>`元素里面的内容，那就好办了，在`_config.fluid.yml`下直接引入：

```yaml
custom_head:
  - <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
```

配置文件里的图标可以命名成`fa fa-xxx`的形式引入，例如：

```yaml
icon: "fa fa-archive"
```

---

[^1]: https://hexo.fluid-dev.com/docs/icon/#%E5%86%85%E7%BD%AE%E7%A4%BE%E4%BA%A4%E5%9B%BE%E6%A0%87

[^2]: https://hexo.fluid-dev.com/docs/guide/#%E4%BA%8C%E7%BA%A7%E7%AB%99%E7%82%B9%E8%B7%AF%E5%BE%84
