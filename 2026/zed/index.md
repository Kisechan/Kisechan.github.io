---
title: 我的简易 Zed 配置和使用体验
url: https://blog.kisechan.space/2026/zed/
type: post
time: '2026-10-23T15:19:31.963Z'
---

因为 VSCode 目前一些已有的不好体验，包括 Electron 开发、新版本的丑陋 UI，外加社交媒体之类的地方对 Zed 的炒作，所以尝试了一下这个新的编辑器。

不得不说，其实使用起来比 VSCode 的可定制化程度还是更高的。但没有内置的 WebView 比较麻烦，不可以实时在侧边/软件内渲染出 Typst 或 PDF 的预览，不太方便。

我对 Zed 的配置目标只有下面的要求：

- 代码阅读和 UI 美观，符合我在 VSCode 的习惯。
- 终端和 Agent 能融入日常开发。
- 一些 Git 的配置改善。

Zed 的配置文件一般位于 `~/.config/zed/settings.json`，快捷键配置位于 `~/.config/zed/keymap.json`。

![](https://images.kisechan.space/uploads/2026/09/12/image-20260912234325938-19986147.png)

## 外观配置

### 字体

编辑器正文主要使用 `Source Code Pro Light`，字号 20。我比较喜欢大字号而且纤细的字体。字体 fallback 分两层：

- `Symbols Nerd Font Mono` 负责 Starship、Git、文件类型等 Nerd Font 图标。
- `Source Han Sans SC Light` 负责中英文混排中的中文字符。

```json
"buffer_font_family": "Source Code Pro Light",
"buffer_font_size": 20.0,
"buffer_font_fallbacks": [
  "Symbols Nerd Font Mono",
  "Source Han Sans SC Light"
]
```

界面字体原本想一直用苹果系统字体，最后选了 `Avenir Next`，这个字体是我随便乱试找到的，意外地很美观，中文用`思源黑体 Light`；Agent 面板输入区也沿用这套界面字体。代码块则继续使用 `Source Code Pro Light`，避免对话和代码混在一起时发生字形风格跳变。

```json
"ui_font_family": "Avenir Next",
"ui_font_fallbacks": ["Source Han Sans SC Light"],
"ui_font_size": 18.0,

"agent_ui_font_family": "Avenir Next",
"agent_ui_font_size": 16.0,
"agent_buffer_font_family": "Source Code Pro Light",
"agent_buffer_font_size": 16.0
```

Markdown 预览正文采用系统 UI 字体，代码块固定为 `Source Code Pro`，阅读文档时更接近浏览器与技术文档站点的体验。

终端主字体设为 `Source Code Pro`，字号和我的终端配置一样保持在 16；`Nerd Font` 以 fallback 方式负责 Powerline、Starship、语言图标等私有区字符。

```json
"terminal": {
  "font_family": "Source Code Pro",
  "font_size": 16.0,
  "font_fallbacks": [
    "Symbols Nerd Font Mono",
    "Source Han Sans SC Light"
  ]
}
```

### 主题

我在什么环境一般都用浅色，配色使用 `Catppuccin Latte`，图标主题也选用 `Catppuccin Latte`。

```json
"theme": {
  "mode": "system",
  "light": "Catppuccin Latte",
  "dark": "One Dark"
},
"icon_theme": "Catppuccin Latte"
```

## Agent Panel

Agent 面板固定在右侧，宽度 360，高度 320，输入框默认至少三行。并且配置了让 Agent 完成时仅在窗口隐藏时播放提示音。

```json
"agent": {
  "dock": "right",
  "sidebar_side": "right",
  "default_width": 360.0,
  "default_height": 320.0,
  "flexible": true,
  "thinking_display": "always_collapsed",
  "show_turn_stats": true,
  "use_modifier_to_send": true,
  "message_editor_min_lines": 3,
  "play_sound_when_agent_done": "when_hidden"
}
```

思考过程设置成了默认折叠，每轮统计信息保持显示。我在配置中也注册了 OpenCode 与 Codex 的 ACP，可在 Zed Agent 面板里直接使用外部 Agent。

说起来感觉 ACP 也像是要被淘汰了的东西呢，但是我还是喜欢 Agent Panel 这样嵌在编辑器中的形式。

## 扫描和保存

对于 Node、Python、前端构建产物和测试缓存，配置会提前排除常见高噪音目录：

```json
"file_scan_exclusions": [
  "**/node_modules",
  "**/.next",
  "**/dist",
  "**/build",
  "**/coverage",
  "**/__pycache__",
  "**/.pytest_cache",
  "**/.mypy_cache",
  "..."
]
```

末尾的 `"..."` 会保留 Zed 自带的默认排除项。这样能降低文件索引和文件搜索的压力，同时继续遵循编辑器原有的忽略规则。

自动保存延迟设为一秒，适合配合格式化器、LSP 与持续运行的开发服务。

```json
"autosave": {
  "after_delay": {
    "milliseconds": 1000
  }
}
```

Diff 使用 unified 视图，行内 blame 延迟 500ms 出现，Code Lens 仅在菜单中展示，编辑器主体会保持更干净。

```json
"code_lens": "menu",
"diff_view_style": "unified",
"git": {
  "inline_blame": {
    "delay_ms": 500
  }
}
```

关闭文件在磁盘上被删除时，Zed 会同步关闭对应标签；按 <kbd>⌘</kbd> + <kbd>Q</kbd> 直接退出，适合把窗口生命周期交给 macOS 与自动保存。

```json
"close_on_file_delete": true,
"confirm_quit": false
```

## Markdown 快捷键

配置了一个 Markdown 预览的快捷键，默认配置的 Markdown 预览只会打开一个新标签展示预览页面，现在用快捷键可以直接像 VSCode 一样在侧边预览了。绑定为 <kbd>⌘</kbd> + <kbd>⇧</kbd> + <kbd>V</kbd>：

```json
[
  {
    "bindings": {
      "cmd-shift-v": "markdown::OpenPreviewToTheSide"
    }
  }
]
```
