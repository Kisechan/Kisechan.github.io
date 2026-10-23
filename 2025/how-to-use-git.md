---
title: Git 团队合作的简单使用教程
url: https://blog.kisechan.space/2025/how-to-use-git/
type: post
time: '2026-10-23T15:19:31.963Z'
---

- 可以直接把本文投喂给你的队友
- 只限于使用 Git 进行合作的场景，不会涉及刁钻神秘的 Git 命令比如 `cherrypick` 以及复杂原理

## 1. 基础准备

### 1.1 Git安装

- **Windows用户**：[下载Git](https://git-scm.com/download/win) → 全默认安装
- **验证安装**：打开终端输入 `git --version`，看到版本号即成功

### 1.2 GitHub配置

这部分如果没有配置也可以去网上搜搜教程，比这里的详细。

```bash
# 1. 设置身份
git config --global user.name "你的名字"
git config --global user.email "邮箱"
# 这里的邮箱如果没用你 GitHub 的邮箱，GitHub 就会识别不到你的共献，但是正常的代码提交不影响

# 2. 生成SSH密钥
ssh-keygen -t rsa -b 4096 -C "你的邮箱"
# 连续按3次回车

# 3. 复制公钥到剪贴板
# Windows: type ~/.ssh/id_rsa.pub
# Mac/Linux: cat ~/.ssh/id_rsa.pub

# 4. 添加到GitHub
# 登录GitHub → 头像 → Settings → SSH and GPG keys → New SSH key
# 如果没有注册，则注册 GitHub
# 标题写"我的电脑"，粘贴密钥
```

**不要在 GitHub 直接上传代码**，使用 VS Code 或本地命令行（Git Bash 或 Powershell 等）。

### 1.3 项目克隆

```bash
# 组长创建仓库后，队友执行：
git clone git@github.com:组长用户名/项目名.git
cd 项目名
```

---

## 2. 分支与提交规范

分支可以让大家并行写代码不受到冲突。

`main` 分支是功能完整的、成熟的、经过测试后的代码的分支，**不要直接在 `main` 分支上面编辑代码**，而是在自己创建的分支上面进行编辑，然后再合并到它上面（通过 PR）。

```bash
# 创建或切换功能分支
git checkout -b feature/你的功能
# 或切换到已有分支
git checkout feature/你的功能
```

### 2.1 分支命名规范

```
✅ 正确命名：
feature/login-auth      # 登录认证功能
bugfix/crash-on-start   # 修复启动崩溃
hotfix/security-issue   # 紧急安全修复
docs/update-api         # 更新API文档
refactor/database       # 重构数据库代码

❌ 不建议命名：
test                    # 太模糊
zhangsan-work           # 个人工作分支，咱们人少其实也不是不行
new-feature             # 没有具体描述
```

### 2.2 提交信息规范（Commit Message）

提交就是写好了代码，然后记录一下，作为一个存档点。

```
格式：类型: 简短描述

示例：
✅ feat: 添加用户登录页面
✅ fix: 修复密码验证逻辑错误
✅ docs: 更新安装说明
✅ refactor: 优化数据库查询性能
✅ style: 调整按钮间距

❌ 错误示例：
更新                # 太模糊
修复bug             # 没有说明范围
今天的工作           # 没有信息量
```

**完整格式：**

```
feat(login): 添加第三方登录支持

- 添加微信登录接口
- 添加QQ登录按钮
- 更新相关文档
```

---

## 3. 日常开发流程

### 3.1 每日开始工作

```bash
# 1. 拉取最新代码（使用 --rebase，保持历史整洁）
# 可能 main 已经有新的代码了，所以得进行随时更新
git checkout main
git pull --rebase origin main

# 2. 创建或切换功能分支
git checkout -b feature/你的功能
# 或切换到已有分支：
git checkout feature/你的功能
```

### 3.2 开发中的小步提交

```bash
# 每完成一个小功能就提交
git add .
git commit -m "feat: 添加登录按钮"
# 继续开发...
git add .
git commit -m "feat: 添加表单验证"
```

### 3.3 同步主分支更新

```bash
# 每天至少执行2次，避免落后太多
# 方法1：rebase方式（推荐，保持历史线性）
git fetch origin
git rebase origin/main

# 方法2：merge方式（有合并记录，但更安全）
git fetch origin
git merge origin/main
```

### 3.4 完成功能，准备提交

```bash
# 1. 确保所有代码已提交
git add .
# . 就是当前路径下所有不被 .gitignore 记录在案的文件，建议少用，或者用之前仔细一点
git commit -m "feat(login): 完成登录功能"

# 2. 推送到远程（只能推自己的分支！）
git push origin feature/你的功能
```

---

## 4. Pull Request（PR）流程

建议写完了一个完整的，大家可以用的功能以后，提交 PR 把你的分支合并进 `main`。

### 4.1 什么是PR？

**Pull Request = 代码合并请求**，相当于：

- "我写完了这个功能，请审查并合并到主分支"
- 是代码审查和团队协作的核心机制

### 4.2 为什么要PR？

1. **代码审查**：队友检查你的代码质量
2. **知识共享**：大家了解你做了什么
3. **质量保证**：合并前确保代码可靠
4. **冲突检测**：提前发现集成问题

### 4.3 在哪里提交PR？

1. 推送到GitHub后，打开项目页面
2. 点击 **Pull requests** 标签页
3. 点击绿色的 **New pull request** 按钮
4. 选择：
   - **`base: main`** （目标分支）
   - **`compare: feature/你的功能`** （来源分支）

### 4.4 PR描述怎么写？

```
## 做了什么
- 添加了用户登录页面
- 实现了JWT token验证
- 更新了API文档

## 测试情况（可选）
- [x] 登录功能正常
- [x] 错误处理正常
- [x] 移动端适配正常

## 截图（可选）
![登录页面](截图链接)
```

### 4.5 PR审查流程

提交PR → _队友审查（留评论）→ 修改代码 → 重新测试 → 再次推送 → 等待批准_ → 合并

---

## 5. VS Code可视化操作

推荐使用 VS Code 进行 Git 操作，命令行作为备选。

### 5.1 为什么用VS Code管理Git？

- 部分 IDE 对Git支持有限
- VS Code有强大的Git图形界面
- 可以同时编辑代码、管理版本控制和使用 Copilot

### 5.2 VS Code Git基础操作

#### 安装Git插件（推荐）：

1. 打开VS Code
2. 点击左侧扩展图标（四个方块）
3. 搜索"GitLens"并安装（增强Git功能）

#### 常用操作：

1. **查看更改**：
   - 点击左侧源代码管理图标（第三个）
   - 看到所有修改的文件
   - 点击文件查看具体改动（红色删除，绿色新增）

2. **提交代码**：
   1. 修改完代码后，在"更改"区域
   2. 点击文件旁的"+"号暂存（或点全部暂存）
   3. 在上方输入框写提交信息
   4. 点击"✓"提交

3. **分支管理**：
   1. 点击左下角分支名（如`main`）
   2. 创建分支：输入新分支名
   3. 切换分支：从列表选择
   4. 同步分支：点击同步图标

4. **解决冲突**：
   1. 冲突时VS Code会提示
   2. 点击冲突文件，打开三栏编辑器
   3. 左：你的代码，右：他人代码，中：结果
   4. 点击"接受当前/传入/两者"或手动编辑
   5. 点击"完成合并"

### 5.3 Qt Creator 等其他 IDE 等开发者工作流

1. 在Qt Creator中编写C++代码
2. 保存文件后，切换到VS Code
3. 在VS Code中执行可视化的Git操作
4. 也可以用VS Code编辑其他文件（README、脚本等）

---

## 6. 禁止事项

### 6.1 绝对禁止 `git push -f`（强制推送）

```bash
❌ 绝对不要用：
git push -f origin main
git push --force origin 任何分支

✅ 正确的推送：
git push origin feature/你的分支
# 如果推送失败，先拉取再推送
git pull --rebase origin feature/你的分支
git push origin feature/你的分支
```

**为什么禁止？**
强制推送会覆盖远程历史，可能：

1. 删除队友的提交
2. 导致数据丢失
3. 让所有人的仓库混乱

### 6.2 只能推送自己的分支

```bash
❌ 错误：
git push origin main           # 禁止直接推main
git push origin 队友的分支     # 禁止推别人的分支

✅ 正确：
git push origin feature/你自己的分支  # 只能推自己的
```

### 6.3 禁止在主分支直接开发

```bash
❌ 错误：
git checkout main
# 然后开始写代码...

✅ 正确：
git checkout main
git pull origin main
git checkout -b feature/新功能
# 在新分支上开发
```

---

## 7. 解决合并冲突

如果你同时跟别人修改了同一个代码，那就会有冲突，这时候就得留一个人的下来（a or b），或者重新编辑一个新的出来（选 or）。

但是我们如果每个人都负责不同的文件，就几乎不会这样，这部分作为未雨绸缪。

VS Code 支持可视化的冲突合并，所以推荐使用 VS Code。

### 7.1 冲突识别

VS Code会在以下情况提示冲突：

1. 左侧源代码管理图标显示红色数字
2. 冲突文件有"⚡"或"!"图标
3. 底部状态栏显示"合并冲突"

### 7.2 解决步骤

```
步骤1：点击冲突文件 → 打开合并编辑器
步骤2：看到三个面板：
  左面板：你的更改（Current Change）
  中面板：结果（可编辑）
  右面板：他人更改（Incoming Change）

步骤3：选择解决方案：
  - 点击"接受当前更改"（用你的）
  - 点击"接受传入更改"（用他人的）
  - 点击"接受两者更改"（合并）
  - 或手动编辑中间面板

步骤4：点击"完成合并"
步骤5：提交解决结果
```

### 7.3 冲突解决原则

1. **沟通优先**：冲突时先问队友，不要擅自决定
2. **功能完整**：确保合并后功能正常
3. **测试验证**：解决后必须测试
4. **小步解决**：一次解决一个文件的冲突

### 7.4 命令行备用方案

```bash
# 查看冲突文件
git status

# 手动编辑冲突文件
# 删除 <<<<<<<, =======, >>>>>>> 标记
# 保留正确的代码

# 标记为已解决
git add 文件名

# 继续操作
git rebase --continue  # 如果是rebase
# 或
git commit -m "解决冲突"  # 如果是merge
```

---

## 8. 文件管理规范

**不要把大文件或者不相干的文件提交/推送到 GitHub**，如果超过 50M 是上传不了 GitHub 的。

### 8.1 禁止提交的文件类型

```gitignore
# 在项目根目录创建或编辑 .gitignore 文件

# 二进制文件和大文件
*.exe
*.dll
*.so
*.dylib
*.bin
*.dat
*.zip
*.tar.gz
*.7z

# 编译产物
build*/
# 尤其是 Qt 会自己生成一个 build 开头的文件夹，里面会有编译相关的文件，就不要把它提交了！
dist/
*.o
*.obj
*.class

# 系统文件
.DS_Store
Thumbs.db
*.swp
*.swo

# IDE和编辑器配置
.vscode/
.idea/
*.code-workspace

# 依赖目录（根据语言）
node_modules/
__pycache__/
*.pyc

# 个人测试文件
test_个人名.*
temp_*
```

### 8.3 清理已提交的不该提交的文件

如果不小心提交了大文件：

```bash
# 1. 从Git历史中删除
git filter-branch --tree-filter 'rm -f 大文件' HEAD

# 2. 强制推送（需要组长权限）
git push origin main --force

# 注意：这会重写历史，全组需要重新克隆
# 所以一定要提前沟通！
```

---

## 9. 快速参考手册

### 开发命令速查

```bash
# 开始新功能
git checkout main
git pull --rebase origin main
git checkout -b feature/功能名

# 日常开发
git add .
git commit -m "类型: 描述"
git fetch origin
git rebase origin/main  # 或 git merge origin/main
git push origin feature/功能名

# 完成功能
git add .
git commit -m "feat: 完成所有开发"
git push origin feature/功能名
# 去GitHub创建PR
```
