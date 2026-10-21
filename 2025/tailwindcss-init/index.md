---
title: 初始化 TailwindCSS 遇到的一些问题
url: https://blog.kisechan.space/2025/tailwindcss-init/
type: post
time: '2026-10-21T16:02:14.153Z'
---

## 问题

博主当前的工程使用的是 Vite + Vue + Element Plus ，但 Element Plus 手感不好，还得手搓 CSS ，不好用，就打算转向 TailwindCSS 。

在对 TailwindCSS 进行初始化时要使用命令：

```bash
npx tailwindcss init
```

但使用后出现报错：

```text
npm ERR! could not determine executable to run

npm ERR! A complete log of this run can be found in: npm_cache\_logs\2025-03-04T14_15_15_682Z-debug-0.log
```

日志文件是：

```text
0 verbose cli node.exe nodejs\node_modules\npm\bin\npm-cli.js
1 info using npm@10.9.2
2 info using node@v22.14.0
3 silly config load:file:nodejs\node_modules\npm\npmrc
4 silly config load:file:\.npmrc
5 silly config load:file:.npmrc
6 silly config load:file:\npm_global\etc\npmrc
7 verbose title npm exec tailwindcss init
8 verbose argv "exec" "--" "tailwindcss" "init"
9 verbose logfile logs-max:10 dir:...npm\npm_cache\_logs\2025-03-04T14_29_06_018Z-
10 verbose logfile ...npm\npm_cache\_logs\2025-03-04T14_29_06_018Z-debug-0.log
11 silly logfile start cleaning logs, removing 1 files
12 silly logfile done cleaning log files
13 silly packumentCache heap:4345298944 maxSize:1086324736 maxEntrySize:543162368
14 verbose stack Error: could not determine executable to run
14 verbose stack     at getBinFromManifest (nodejs\node_modules\npm\node_modules\libnpmexec\lib\get-bin-from-manifest.js:17:23)
14 verbose stack     at exec (nodejs\node_modules\npm\node_modules\libnpmexec\lib\index.js:202:15)
14 verbose stack     at async Npm.exec (nodejs\node_modules\npm\lib\npm.js:207:9)
14 verbose stack     at async module.exports (nodejs\node_modules\npm\lib\cli\entry.js:74:5)
15 verbose pkgid tailwindcss@4.0.9
16 error could not determine executable to run
17 verbose cwd D:\Blog\Mainpage
18 verbose os Windows_NT 10.0.19045
19 verbose node v22.14.0
20 verbose npm  v10.9.2
21 verbose exit 1
22 verbose code 1
23 error A complete log of this run can be found in: npm\npm_cache\_logs\2025-03-04T14_29_06_018Z-debug-0.log
```

总结起来就一句话： `could not determine executable to run` ，找不到对应的 TailwindCSS 可执行文件，这是为什么呢？

## 解决

注意到 package.json 文件中：

```json
{
  "name": "main-page",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@element-plus/icons-vue": "^2.3.1",
    "@fortawesome/fontawesome-free": "^6.7.2",
    "element-plus": "^2.9.5",
    "vue": "^3.5.13",
    "vue-router": "^4.5.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.1",
    "autoprefixer": "^10.4.20",
    "path": "^0.12.7",
    "postcss": "^8.5.3",
    "tailwindcss": "^4.0.9",
    "unplugin-vue-components": "^28.4.1",
    "vite": "^6.2.0"
  }
}
```

其中：

> **"tailwindcss": "^4.0.9",**

这个版本号是 `^4.0.9`，但 Tailwind CSS 的官方最新版本是 `3.x` ，`4.0.9` 是个根本不存在的版本号，所以要把它修改成正确的版本（最新版）：

```json
"tailwindcss": "^3.4.1",
```

重新下载依赖：

```bash
npm install
```

这样就可以正常执行了。
