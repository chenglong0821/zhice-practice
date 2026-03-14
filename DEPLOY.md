# 开发与部署指南

本文档说明项目的完整开发、构建和部署流程。

---

## 一、本地开发

### 1. 环境要求

- Node.js 18+
- npm 或 yarn

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 4. 代码检查与构建

```bash
# 检查代码风格
npm run lint

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

---

## 二、部署到 GitHub Pages

### 方式一：手动部署（推荐）

每次更新代码后，执行以下命令：

```bash
npm run deploy
```

这会：
1. 自动构建生产版本
2. 将 dist 目录推送到 `gh-pages` 分支

### 方式二：自动部署

在 GitHub 仓库设置中配置：

1. 打开 https://github.com/chenglong0821/zhice-practice/settings/pages
2. Source 选择 "Deploy from a branch"
3. Branch 选择 "gh-pages"，Folder 选择 "/ (root)"
4. 点击 Save

之后每次 push 代码到 main 分支，GitHub Pages 会自动部署。

### 访问地址

部署成功后访问：https://chenglong0821.github.io/zhice-practice/

---

## 三、技术栈

| 技术 | 用途 |
|------|------|
| React 18 | UI 框架 |
| TypeScript | 类型安全 |
| Tailwind CSS 4 | 样式组件 |
| Zustand | 状态管理 |
| React Router | 路由 |
| Vite | 构建工具 |

---

## 四、项目结构

```
zhice-practice/
├── src/
│   ├── types/           # TypeScript 类型定义
│   ├── stores/         # Zustand 状态管理
│   ├── data/           # 题库数据
│   ├── pages/          # 页面组件
│   ├── layouts/        # 布局组件
│   ├── App.tsx         # 应用入口
│   └── main.tsx       # 渲染入口
├── dist/               # 构建输出（部署用）
├── package.json       # 项目配置
├── vite.config.ts     # Vite 配置
└── README.md          # 项目说明
```

---

## 五、常见问题

### 1. 部署后页面空白

检查 vite.config.ts 中的 base 配置：

```typescript
export default defineConfig({
  base: '/zhice-practice/',  // 必须与仓库名一致
  // ...
})
```

### 2. 本地开发正常但部署后样式丢失

确保 index.html 中资源路径使用相对路径：

```html
<link rel="icon" href="./favicon.svg" />
<script type="module" src="./src/main.tsx"></script>
```

### 3. 更新代码后无法访问新版本

可能是浏览器缓存，尝试：
- 硬刷新：Ctrl + Shift + R (Windows) 或 Cmd + Shift + R (Mac)
- 清除浏览器缓存

---

## 六、扩展题库

题库数据位于 `src/data/questions/index.ts`，可按以下格式添加新题目：

```typescript
{
  id: '唯一ID',
  module: '判断' | '言语' | '数量' | '资料' | '常识',
  type: 'single' | 'multiple',
  content: '题目内容',
  options: [
    { id: 'A', content: '选项A' },
    { id: 'B', content: '选项B' },
    // ...
  ],
  answer: '正确答案',
  explanation: '解析内容',
  difficulty?: 'easy' | 'medium' | 'hard'
}
```

---

## 七、数据存储

所有用户数据（学习进度、错题记录等）存储在浏览器 localStorage 中：
- `user-progress-storage` - 学习进度
- `wrong-book-storage` - 错题本

清除浏览器数据会导致学习记录丢失。
