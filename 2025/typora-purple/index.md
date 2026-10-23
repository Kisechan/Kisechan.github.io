---
title: 给 Typora 主题 Purple 加上背景图片
url: https://blog.kisechan.space/2025/typora-purple/
type: post
time: '2026-10-23T15:19:31.963Z'
---

# Purple 修改

[Typora-Theme-Purple](https://github.com/hliu202/typora-purple-theme) 是一款简洁、优美的 Typora 主题。

博主主要的修改点在背景和字体上面。在 css 文件中加入：

```css
#write{
    background: url(.[图片路径]);
    background-size: 30%;
    background-repeat: no-repeat;
    background-position: right bottom;
}
```

就可以给背景加上图片。

字体方面就只直接需要修改原文件的`font-family`属性就可以了。

主要参考：[^1][^2]

[^1]: https://github.com/hliu202/typora-purple-theme/issues/38

[^2]: https://blog.csdn.net/lihuadaiyuoo/article/details/110677297

# 效果展示

如图：

![修改效果展示](https://images.kisechan.space/typora-purple-reviseshowtime.png)

---
