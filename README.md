![纸片君ee的博客~截图](./client/resources/screenshot.png)

<h1 align="center">Transfer Paper</h1>

<p align="center"><b>纸片君ee的新博客 OvO</b></p>

## 关于此项目

由 paperee 与 hawav 合作

hawav：等待 paperee 施工~

## 更新记录

- **2025/10/28** 修改了响应式布局
- **2025/10/31** 添加了留言/评论功能
- **2025/11/02** 添加了部分动画
- **2026/06/10** 修复了最新评论的文章 BUG

## 目录结构

```python
transfer-paper/
├── .dockerignore                    # Docker 构建时的忽略文件列表
├── .gitattributes                   # Git 文件换行符与编码规范化配置
├── .gitignore                       # Git 版本控制忽略规则
├── LICENSE                          # 项目开源许可证（WTFPL）
├── README.md                        # 项目说明文档，含截图与更新记录
├── config.json                      # 博客全局配置（重要！）
├── design.md                        # 博客 UI 布局与功能的设计稿/规划文档
├── TODO.md                          # 待办事项清单，跟踪功能开发进度
├── package.json                     # Node.js 项目元数据与依赖声明
├── package-lock.json                # npm 依赖锁定文件，确保版本一致性
├── server.mjs                       # 主入口：Express 服务器，定义所有路由
│
├── client/                          # 前端静态资源目录（浏览器端）
│   ├── index.ejs                    #   主页模板，定义单页应用 HTML 结构
│   ├── resources/                   #   第三方库与静态资源
│   │   ├── background.webp          #     页面背景图片
│   │   ├── eebot.png                #     eebot 形象图片
│   │   ├── fish.ico                 #     网站 favicon 图标
│   │   ├── fontawesome.min.css      #     Font Awesome 图标字体样式
│   │   ├── highlight.min.js         #     highlight.js 代码高亮库
│   │   ├── rainbow.css              #     代码高亮彩虹主题样式
│   │   ├── remarkable.min.js        #     Remarkable Markdown 解析器
│   │   ├── screenshot.png           #     博客截图，用于 README 展示
│   │   ├── vanilla-tilt.min.js      #     Vanilla Tilt.js 3D 倾斜效果库
│   │   └── vs-dark.css              #     VS Code Dark 代码高亮主题样式
│   ├── script/                      #   JavaScript 脚本文件
│   │   ├── client.js                #     客户端主入口/初始化逻辑
│   │   ├── comments.js              #     评论区渲染与交互
│   │   ├── default.js               #     默认配置与基础工具函数
│   │   ├── eebot.js                 #     eebot 彩蛋/交互功能
│   │   ├── essay.js                 #     单篇文章渲染逻辑
│   │   ├── essays.js                #     文章列表渲染与筛选逻辑
│   │   ├── flip.js                  #     文章分页/翻页功能
│   │   ├── notices.js               #     通知/消息提示功能
│   │   ├── sidebar.js               #     侧边栏渲染逻辑
│   │   ├── text.js                  #     文本处理工具函数
│   │   ├── time.js                  #     时间显示与格式化功能
│   │   └── webzoom.js               #     网页缩放控制功能
│   ├── style/                       #   CSS 样式文件
│   │   ├── root.css                 #     自定义属性（变量）定义
│   │   ├── default.css              #     默认/重置样式
│   │   ├── main.css                 #     主要布局与核心样式
│   │   ├── responsive.css           #     响应式媒体查询样式
│   │   ├── animation.css            #     动画与过渡效果样式
│   │   ├── uwu1.css ~ uwu7.css      #     各模块分层样式
│   └── webfonts/                    #   Web 字体文件
│       ├── fa-brands-400.*          #     Font Awesome 品牌图标字体
│       ├── fa-regular-400.*         #     Font Awesome 常规图标字体
│       ├── fa-solid-900.*           #     Font Awesome 实心图标字体
│       └── ZCOOLXiaoWei-Regular.*   #     站酷小薇中文字体
│
└── server/                          # 后端服务端目录
    ├── essay.mjs                    #   单篇文章读取模块
    ├── essays.mjs                   #   文件监控与文章管理系统
    ├── comments.mjs                 #   评论功能集成模块
    ├── essays/                      #   文章内容存储目录（Markdown）
    └── comments/                    #   评论数据存储目录（JSON）
```

<p align="center">—— 未完待续 ——</p>
