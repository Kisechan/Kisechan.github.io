---
title: Cloudflare+Github图床
url: https://blog.kisechan.space/2025/site-image-host/
type: post
time: '2026-10-22T16:41:52.395Z'
---

## 旧图床

之前网站使用的图床是用 Github 仓库 + jsDelivr 的 cdn ，但是jsDelivr 在国内的备案早就被吊销了，~~据说是因为被很多人用来传涩图~~，所以使用起来加载速度有时候会特别慢，~~而且图床这么大的流量用 cdn 疑似有点不道德~~，就打算换一个新的。

恰好现在有了 Cloudflare ，那就薅它的吧。

## Cloudflare 图床

因为博主的图片是放在 Github 的仓库里面的，嫌麻烦不想转到 Cloudflare 的容器里面，所以就在 Cloudflare 新建了一个项目页面 `images.kisechan.space/` ，对接这个图床的仓库。同时，这个仓库就可以设置成私有了，之前使用公用 cdn 仓库就必须是公开的，让博主有些不舒服。

加载图片测试：

![测试图片：https://images.kisechan.space/site-image-host-index.jpg](https://images.kisechan.space/site-image-host-index.jpg)

从本人的体感上面来说，加载速度确实是快了一些，以前有时候能卡个半天图片还经常挂掉:cry:。

## 更新图片的链接

既然换了图床，那么曾经的图片链接就作废了，就得一个一个把它们的链接换成新的。

对我来说就是将原来链接的 `https://cdn.jsdelivr.net/gh/用户名/仓库名@分支/文件名` 前面的部分改成新的，就可以用脚本来实现了：

```python
import os
import re

old_pattern = re.compile(r'https://cdn\.jsdelivr\.net/gh/Github 用户名/仓库名@分支/路径/(.*?\.(?:jpg|png|gif))')

new_url = 'https://images.kisechan.space/'

for root, dirs, files in os.walk('./'):
    for file in files:
        if file.endswith('.md'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            new_content = re.sub(old_pattern, lambda match: new_url + match.group(1), content)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
```
