---
title: GitHub Profile 自动化更新最新博客文章
url: https://blog.kisechan.space/2025/github-actions-blog-update/
type: post
time: '2026-10-24T09:09:07.707Z'
---

## 技术选型 GitHub Actions

我们的**目标**是：在我的 [GitHub 个人主页](https://github.com/Kisechan)（仓库中的 `README.md`）中，添加一个“_Blog Post_”栏目。该栏目需要能够自动、动态地拉取我个人博客的最新文章列表，并以链接的形式展示出来。考虑到我早已为博客提供了 [Atom 形式的 Feed](https://blog.kisechan.space/atom.xml)，这会让完成这个任务简单很多。

既然和 GitHub 仓库有关，那么就可以采用 GitHub Actions 自动化进行 CI/CD 了，于是决定选用社区成熟的 `gautamkrishnar/blog-post-workflow`，它可以提供傻瓜式操作。

<a href="https://github.com/gautamkrishnar/blog-post-workflow" name="https://github.com/fluidicon.png" class="LinkCard">gautamkrishnar/blog-post-workflow</a>

## 配置使用

首先，在 `README.md` 的适当位置加上两行**定位符**：

```md
<!-- BLOG-POST-LIST:START -->
<!-- BLOG-POST-LIST:END -->
```

这是 Actions 识别更新区域的地方。

然后在项目根目录下新建 `.github/workflows/` 目录，在该目录下新建一个 `update-blog-posts.yml` **配置文件**，待推送到云端， GitHub 会自动识别对应的 GitHub Actions。

我的配置文件：

```yaml
name: Latest blog post workflow
on:
  schedule: # Run workflow automatically
    - cron: "0 * * * *" # Runs every hour, on the hour
  workflow_dispatch: # Run workflow manually (without waiting for the cron to be called), through the GitHub Actions Workflow page directly
permissions:
  contents: write # To write the generated contents to the readme

jobs:
  update-readme-with-blog:
    name: Update this repo's README with latest blog posts
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Pull in dev.to posts
        uses: gautamkrishnar/blog-post-workflow@v1
        with:
          feed_list: "https://blog.kisechan.space/atom.xml"
          max_post_count: 5
          date_format: "yyyy-mm-dd"
          custom_tags: "post_tags/category:term/"
          template: >-
            <li> $randomEmoji(🎈,🎇,🎁,🎀,💎) <a href="$url">$title</a> | 🗓 <b>$date</b> </li>$newline
          comment_tag_name: "BLOG-POST-LIST"
          readme_path: "README.md"
          commit_message: "Automatically updated blog post list"
          committer_username: "Blog-Post-Bot"
```

> **注**：`on: schedule: -cron:` 部分的时间语法是 cron 表达式遵循的 _Unix cron 时间语法_（UTC 时间）。
>
> 例如：
>
> ```yaml
> on:
>   schedule:
>     - cron: "0 * * * *"
> ```
>
> 从第一个字段到第五个字段，分别表示**分钟，小时，日，月，星期**。 `*` 表示每小时/每日等，这里就是**每月中的每周中的每日的每小时**都执行一遍；而 `0` 表示每次执行都在这**每小时的零分**执行。
>
> 如果改成：
>
> ```yaml
> - cron: "0 16 * * *"
> ```
>
> 则是 UTC 时间每日的 `16` 点执行这个工作流，也就是**北京时间的零点**。
>
> ---
>
> 可以在 [**这个网站**](https://crontab.guru/) 验证表达式的意义。

## 样式改进

博主尝试过想用 `$categories` 变量显示标签，但始终没成功，内置的 `$categories` 变量似乎没有获取到任何数据。问题在于 **Atom Feed 和标准 RSS 在 `category` 标签上的结构差异**。博主的 Feed 使用 `<category term="分类名"/>` 的**属性**来存储分类，而 Actions 默认尝试读取标签**内部的文本**，因此读取失败。

博主尝试使用 `custom_tags: "自定义变量名/category:term/"` 从 `category` 的 `term` 属性获取信息，但不知为何仍然失败，放弃了。

## 成品展示

![](https://images.kisechan.space/github.com_Kisechan.png)

## 参考和注解

1. https://github.com/gautamkrishnar/blog-post-workflow
2. https://github.com/marketplace/actions/blog-post-workflow
