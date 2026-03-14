# 职测刷题 - 事业编制考试学习辅助软件

一款专为事业编制考试（职业能力倾向测验）设计的刷题学习应用。

## 功能特性

### 1. 智能刷题
- **按模块刷题**：支持言语、判断、数量、资料、常识五大模块
- **模拟考试**：随机抽取100道题目进行全真模拟
- **答案解析**：每道题都配有详细解析

### 2. 错题本
- 自动收录做错的题目
- 支持按模块筛选
- 标记已掌握/待复习状态
- 错题复习功能

### 3. 学习统计
- 每日学习时长记录
- 各模块正确率统计
- 连续学习天数追踪
- 考试历史记录

### 4. 知识点背诵
- 判断推理：图形推理规律、逻辑判断公式
- 数量关系：工程问题、行程问题、容斥问题公式
- 资料分析：增长率、比重、平均数公式
- 言语理解：行文脉络法、逻辑填空技巧
- 常识判断：宪法重点、民法典亮点

## 技术栈

- **前端框架**: React 18 + TypeScript
- **UI 组件库**: Tailwind CSS 4
- **状态管理**: Zustand (持久化存储)
- **路由**: React Router DOM
- **打包工具**: Vite 8

## 项目结构

```
src/
├── types/question.ts          # 数据类型定义
├── stores/                    # Zustand 状态管理
│   ├── useUserProgressStore.ts   # 用户进度、统计
│   └── useWrongBookStore.ts      # 错题本
├── data/questions/           # 题库数据
├── pages/
│   ├── Home.tsx              # 首页
│   ├── Practice/             # 刷题模块
│   │   ├── ModulePractice.tsx   # 按模块刷题
│   │   └── ExamPractice.tsx    # 模拟考试
│   ├── WrongBook/WrongBook.tsx  # 错题本
│   ├── Statistics/Statistics.tsx # 学习统计
│   └── Notes/KnowledgePoints.tsx # 知识点
└── layouts/MainLayout.tsx    # 主布局
```

## 运行方式

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 数据存储

所有数据存储在浏览器 localStorage 中，包括：
- 用户学习进度
- 错题记录
- 每日学习统计
- 考试历史

## 题库说明

当前题库包含约 45 道基础题目，涵盖：
- 判断推理：15 道
- 数量关系：10 道
- 言语理解：8 道
- 资料分析：5 道
- 常识判断：7 道

可根据需要扩展题库内容。

## License

MIT
