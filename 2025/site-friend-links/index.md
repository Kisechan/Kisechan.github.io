---
title: 用 Vue、 Element Plus 和 Yaml 实现的友链页面
url: https://blog.kisechan.space/2025/site-friend-links/
type: post
time: '2026-10-23T14:43:06.486Z'
---

## 友链格式

使用 Yaml 文件配置友链信息，改起来方便，格式比如：

```yaml
- category: "朋友们"
  links:
    - avatar: "https://images.kisechan.space/icon.jpg"
      title: "Kisechan's Blog"
      description: "Kisechan 的博客"
      url: "https://blog.kisechan.space"
    - avatar: "https://example.com/avatar.png"
      title: "个人博客"
      description: "这是一个个人博客"
      url: "https://example.com/personal-blog"
- category: "友情链接"
  links:
    - avatar: "https://example.com/avatar.png"
      title: "友情链接1"
      description: "这是一个友情链接"
      url: "https://example.com/friend-link-1"
    - avatar: "https://example.com/avatar.png"
      title: "友情链接2"
      description: "这是一个友情链接"
      url: "https://example.com/friend-link-2"
```

## 布局模板

主要用 `v-for` 属性来建立模板：

```vue
<template>
  <div class="friend-links">
    <!-- 友链列表 -->
    <el-card
      v-for="(category, categoryIndex) in friendLinks"
      :key="categoryIndex"
      class="category-card"
    >
      <template #header>
        <div class="category-header">{{ category.category }}</div>
      </template>
      <div class="links-container">
        <el-card
          v-for="(link, linkIndex) in category.links"
          :key="linkIndex"
          class="link-card"
          @mouseenter="hoverEffect(`${categoryIndex}-${linkIndex}`)"
          @mouseleave="resetEffect"
          :style="cardStyle(`${categoryIndex}-${linkIndex}`)"
          @click="openLink(link.url)"
        >
          <div class="link-content">
            <el-avatar :src="link.avatar" class="link-avatar" />
            <div class="link-info">
              <div class="link-title">{{ link.title }}</div>
              <div class="link-description">{{ link.description }}</div>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
    <el-card class="add-link-card">
      <div class="add-link-header">添加友链</div>
      <div class="add-link-content">
        <p>请按照以下格式提交您的友链信息：</p>
        <pre>avatar: "您的头像链接"
title: "您的博客标题"
description: "您的博客描述"
url: "您的博客链接"</pre
        >
        <p>并发送至：
            <ahref="mailto:邮箱地址">
                邮箱地址
            </a>
        </p>
      </div>
    </el-card>
  </div>
</template>
```

## 脚本和样式

做了一个简单的悬浮放大的动效。

```vue
<script>
import yaml from "js-yaml";
import { ref } from "vue";

export default {
  name: "FriendLinks",
  setup() {
    const friendLinks = ref([]);
    const hoveredCardId = ref(null);

    // 加载 YAML 文件
    fetch("/links.yml")
      .then((response) => response.text())
      .then((text) => {
        friendLinks.value = yaml.load(text);
      })
      .catch((error) => {
        console.error("Failed to load YAML file:", error);
      });

    const hoverEffect = (cardId) => {
      hoveredCardId.value = cardId;
    };

    const resetEffect = () => {
      hoveredCardId.value = null;
    };

    const cardStyle = (cardId) => {
      return {
        transform: hoveredCardId.value === cardId ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.3s ease",
      };
    };

    const openLink = (url) => {
      window.open(url, "_blank");
    };

    return {
      friendLinks,
      hoverEffect,
      resetEffect,
      cardStyle,
      openLink,
    };
  },
};

</script>

<style scoped>
.friend-links {
  padding: 20px;
}

.add-link-card {
  margin-bottom: 20px;
}

.add-link-header {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
}

.add-link-content {
  font-size: 1em;
  color: #333;
}

.add-link-content pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}

.add-link-content a {
  color: #409eff;
  text-decoration: none;
}

.add-link-content a:hover {
  text-decoration: underline;
}

.category-card {
  margin-bottom: 20px;
}

.category-header {
  font-size: 1.5em;
  font-weight: bold;
}

.links-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
}

.link-card {
  width: 100%;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.link-card:hover {
  z-index: 2;
}

.link-content {
  display: flex;
  align-items: center;
}

.link-avatar {
  margin-right: 15px;
}

.link-info {
  display: flex;
  flex-direction: column;
}

.link-title {
  font-size: 1.2em;
  font-weight: bold;
}

.link-description {
  font-size: 0.9em;
  color: #666;
}
</style>
```

## 效果展示

![Demo](https://images.kisechan.space/site-friend-links-showtime.png)

具体的可以移步[https://www.kisechan.space/links](https://www.kisechan.space/links)。
