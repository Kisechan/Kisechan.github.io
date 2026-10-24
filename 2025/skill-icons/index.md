---
title: 在 Cloudflare Workers 部署 skill-icons
url: https://blog.kisechan.space/2025/skill-icons/
type: post
time: '2026-10-24T09:09:07.707Z'
---

[**Skill Icons 项目**](https://skillicons.dev/)是一个用于生成技能展示图标的工具，可以帮助用户在 GitHub 或简历中展示自己掌握的技术栈。但原项目已经很久没有维护，图标库也没有更新，于是博主自己部署了一个到 Cloudflare Workers，访问[这里](https://skill-icons.kisechan.space/)即可看到新的代码。

## 环境配置

Wrangler 是 Cloudflare 官方提供的命令行工具，用于本地开发和部署 Workers。首先需要安装它：

```bash
npm install -g wrangler
```

验证安装：

```bash
wrangler --version
```

然后登录 Cloudflare：

```bash
wrangler login
```

## 项目配置

接下来，我们需要从 [Cloudflare Dashboard](https://dash.cloudflare.com/) 获取自己的 **`Account ID`**，它会在 Dashboard 右下角显示。

或运行命令查看（前提是已经登录好了）：

```bash
wrangler whoami
```

Fork 一份[原仓库的代码](https://github.com/tandpfun/skill-icons)，可以看到根目录有一个 `wrangler.toml` 文件，这是 Wrangler 的主配置文件，但它的版本目前已经过时了，要让它用于现在的 Cloudflare Worker 版本，我们就得把它改一下：

```toml
name = "skill-icons"
main = 'index.js'
account_id = "【你的 Cloudflare Account ID】"
workers_dev = true
compatibility_date = "2025-12-05" # 这是我配置的时候的日期

# 如果你想把 Worker 绑定到自己的自定义域，就可以加上下面的部分
[[routes]]
pattern = "skill-icons.kisechan.space"
custom_domain = true
```

**说明**：

- `name`：Worker 项目名称
- `main`：入口文件路径
- `workers_dev`：启用 `workers.dev` 子域

但是要注意，这个 `Account ID` 是隐私信息，所以如果要推送到公开仓库，就最好把 `wrangler.toml` 取消追踪：

```bash
git rm -r --cached wrangler.toml
echo "wrangler.toml" >> .gitignore
```

当然，理论上用 `.env` 存储环境变量也可以，但是 Wrangler 4.x 不支持在 `wrangler.toml` 中使用 `${}` 环境变量语法，博主也不知道应该怎么办了。

## 本地调试

### 生成构建文件

项目使用 `build.js` 脚本生成图标数据文件 `icons.json`，这个步骤很重要。

```bash
node build.js
```

这个脚本会：

1. 扫描 `icons` 目录下的所有 SVG 文件
2. 将它们转换为 JSON 格式
3. 保存到 `icons.json`

### 启动本地开发服务器

```bash
wrangler dev
```

成功启动后会看到：

```
⛅️ wrangler 4.53.0
▲ [Functions] Listening at http://localhost:8787/
```

### 测试 API 端点

在新的终端窗口中测试：

```bash
# 生成特定图标
curl "http://localhost:8787/icons?i=js,html,css"

# 指定主题和每行数量
curl "http://localhost:8787/icons?i=js,ts,py&theme=light&perline=5"
```

## 添加新的图标

博主添加了一个 [![Static Badge](https://img.shields.io/badge/Typst-%23239DAD?style=flat-square&logo=typst&logoColor=white)](https://typst.app/) 图标来扩展图标库。

新图标必须遵循以下规范：

- **尺寸**：256x256 像素
- **viewBox**：`0 0 256 256`
- **背景**：圆角矩形背景（`rx="60"`）
- **文件名**：`IconName.svg`

然后将 SVG 放入 `icons` 目录即可，重新构建：

```bash
node build.js
wrangler dev
# 访问 http://localhost:8787/icons?i=typst
```

## 部署到 Cloudflare Workers

首先，如果没有登录，那么就得登录 Cloudflare 账号：

```bash
wrangler login
```

浏览器会打开授权页面，点击允许。

接下来进行部署：

```bash
wrangler deploy
```

部署成功后会显示：

```
✨ Successfully published your Worker to
https://skill-icons.kisechan.workers.dev
```

访问测试：

```bash
curl "https://skill-icons.kisechan.workers.dev/icons?i=js,html,css"
```

> 非常搞笑的是，在博主配置 Worker 的时候，[Cloudflare 又崩了](https://www.cloudflarestatus.com/incidents/lfrm31y6sw9q)，明明半个月前就崩了一次，怕不是又是 Rust 程序员干的（）
>
> ![](https://images.kisechan.space/20251206144816526.png)

### 配置根路径重定向

原仓库的代码中，访问 `/` 路径会返回 404。可以自己配置根路径的重定向，例如：

```javascript
async function handleRequest(request) {
  const { pathname, searchParams } = new URL(request.url);

  const path = pathname.replace(/^\/|\/$/g, '');

  if (path === 'icons') {
    // 处理图标请求
  } else {
    // 重定向到 GitHub 仓库
    return Response.redirect('https://github.com/kisechan/skill-icons', 302);
  }
}
```

重新部署：

```bash
wrangler deploy
```

现在访问根路径会自动重定向到 GitHub 仓库。

## 效果展示

可以访问我的 [GitHub Profile](https://github.com/Kisechan) 查看：

![](https://images.kisechan.space/20251206144524071.png)
