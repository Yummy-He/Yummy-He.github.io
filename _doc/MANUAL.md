# Yummy Blog 项目完全手册

> 基于 [Hux Blog](http://huangxuan.me) 模板的 Jekyll + GitHub Pages 个人博客
>
> 当前版本：v1.8.2 | 作者：何尹铭（Yummy He）
>
> 仓库地址：https://github.com/Yummy-He/Yummy-He.github.io

---

## 目录

1. [项目概述](#1-项目概述)
2. [项目目录结构](#2-项目目录结构)
3. [核心配置文件 `_config.yml` 详解](#3-核心配置文件-_configyml-详解)
4. [页面文件与 Front Matter 参数](#4-页面文件与-front-matter-参数)
5. [布局系统（Layouts）](#5-布局系统layouts)
6. [包含模块（Includes）](#6-包含模块includes)
7. [新建一篇文章](#7-新建一篇文章)
8. [新建一个项目文档](#8-新建一个项目文档)
9. [标签（Tags）系统](#9-标签tags系统)
10. [归档页面（Archive）](#10-归档页面archive)
11. [搜索功能](#11-搜索功能)
12. [评论系统](#12-评论系统)
13. [数据分析与统计](#13-数据分析与统计)
14. [数学公式与图形（MathJax / TikZJax）](#14-数学公式与图形mathjax--tikzjax)
15. [多语言支持](#15-多语言支持)
16. [社交网络链接（SNS）](#16-社交网络链接sns)
17. [友情链接（Friends）](#17-友情链接friends)
18. [PWA / Service Worker](#18-pwa--service-worker)
19. [样式构建系统（LESS / Grunt）](#19-样式构建系统less--grunt)
20. [Rake 任务](#20-rake-任务)
21. [npm scripts](#21-npm-scripts)
22. [本地开发与环境搭建](#22-本地开发与环境搭建)
23. [部署到 GitHub Pages](#23-部署到-github-pages)
24. [常见问题与故障排除](#24-常见问题与故障排除)
25. [附录：所有可用参数速查表](#25-附录所有可用参数速查表)

---

## 1. 项目概述

### 1.1 什么是本站

本站是一个基于 **Jekyll** 静态网站生成器的个人博客，托管在 **GitHub Pages** 上。它使用 **Hux Blog** 模板（原始作者：黄玄 @huxpro），经过深度自定义后形成现在的样子。

### 1.2 核心技术栈

| 技术 | 用途 |
|------|------|
| **Jekyll** 4.x | 静态网站生成引擎 |
| **GitHub Actions** | CI/CD 自动构建部署 |
| **GitHub Pages** | 静态站点托管 |
| **kramdown** | Markdown 渲染器，支持 GFM（GitHub Flavored Markdown） |
| **Rouge** | 代码语法高亮 |
| **Bootstrap** 3 | 前端CSS框架 |
| **jQuery** | JavaScript 工具库 |
| **LESS** | CSS 预处理器 |
| **Grunt** | 前端构建工具（压缩JS/CSS） |
| **font-awesome** 4.6.3 | 图标字体 |

### 1.3 主要功能特性

- 响应式设计，适配桌面端和移动端
- 首页文章列表 + 分页
- 文章内自动目录（Side Catalog）
- 全文搜索（Simple Jekyll Search）
- 标签系统 + 特色标签展示
- 归档页面（按年份 + 标签筛选）
- 项目文档模块（Project）
- PWA 离线访问 + 内容更新通知
- 数学公式支持（MathJax 3，SVG 渲染）
- TikZ 图形渲染（TikZJax，自建部署，WebAssembly）
- 代码一键复制按钮
- 多语言支持框架
- Disqus / 网易云跟帖 评论系统
- Google Analytics / 百度统计
- RSS 订阅
- 友链系统

---

## 2. 项目目录结构

```text
Yummy-He.github.io/
├── _config.yml              # [核心] Jekyll 站点配置文件
├── index.html               # 首页（文章列表 + 分页）
├── about.html               # 关于页面
├── archive.html             # 归档页面（按年份+标签）
├── offline.html             # PWA 离线页面
├── 404.html                 # 404 错误页面
├── feed.xml                 # RSS 订阅源
├── search.json              # 搜索数据 JSON（由 Jekyll 生成）
├── Gemfile                  # Ruby 依赖
├── Gemfile.lock             # Ruby 依赖锁定
├── Rakefile                 # Rake 任务脚本
├── Gruntfile.js             # Grunt 构建配置
├── package.json             # Node.js 依赖与脚本
├── sw.js                    # Service Worker 脚本
│
├── _includes/               # Jekyll 包含模块（HTML片段）
│   ├── head.html            #   <head> 元数据
│   ├── nav.html             #   顶栏导航
│   ├── footer.html          #   页脚（含搜索、目录等所有脚本）
│   ├── intro-header.html    #   页面头部（大图/文字标题）
│   ├── sns-links.html       #   社交链接图标
│   ├── featured-tags.html   #   特色标签云
│   ├── friends.html         #   友情链接
│   ├── short-about.html     #   侧边栏个人简介
│   ├── search.html          #   搜索弹出层
│   ├── ads.html             #   Google AdSense 广告
│   ├── mathjax_support.html #   MathJax 数学公式配置
│   ├── tikzjax_support.html #   TikZJax 图形渲染配置
│   ├── multilingual-sel.html#   多语言选择器
│   └── about/               #   关于页面中英内容
│       ├── zh.md
│       └── en.md
│
├── _layouts/                # Jekyll 布局模板
│   ├── default.html         #   基础布局（HTML骨架）
│   ├── page.html            #   页面布局（带侧边栏）
│   ├── post.html            #   文章布局（带目录、评论）
│   ├── project.html         #   项目列表布局
│   ├── project-item.html    #   项目文档入口布局
│   ├── project-post.html    #   项目子页面布局
│   └── keynote.html         #   Keynote 演示文稿布局
│
├── _posts/                  # 博客文章（Markdown）
│   ├── 2026-02-27-myblog.markdown
│   └── HUX/                 #   Hux 原示例文章
│
├── project/                 # 项目文档模块
│   ├── index.md             #   项目列表首页
│   ├── APMMC/               #   APMMC 项目
│   │   ├── index.md         #     项目主页
│   │   ├── code.md          #     代码页
│   │   ├── code-down.md     #     代码下载/提取页
│   │   ├── dev.md           #     开发参与页
│   │   └── main.pdf         #     PDF附件
│   └── Small_Paper_Template/
│       └── index.md
│
├── pwa/                     # PWA 相关
│   └── manifest.json        #   Web App Manifest
│
├── css/                     # 样式文件
│   ├── bootstrap.css / .min.css
│   ├── yummy-blog.css / .min.css  # 主题样式
│
├── js/                      # JavaScript 文件
│   ├── jquery.js / .min.js
│   ├── bootstrap.js / .min.js
│   ├── yummy-blog.js / .min.js    # 主题脚本
│   ├── archive.js                  # 归档页面标签筛选
│   ├── jquery.tagcloud.js          # 标签云动画
│   ├── jquery.nav.js               # 文章目录滚动导航
│   ├── snackbar.js                 # 提示条组件
│   ├── sw-registration.js          # Service Worker 注册
│   ├── simple-jekyll-search.min.js # 搜索库
│   ├── animatescroll.min.js        # 平滑滚动
│   └── copy-to-clipboard.js        # 代码复制
│
├── less/                    # LESS 源文件
│   ├── yummy-blog.less      #   主样式文件
│   ├── variables.less       #   变量定义
│   ├── mixins.less          #   混合宏
│   ├── highlight.less       #   代码高亮样式
│   ├── code-copy.less       #   代码复制按钮样式
│   ├── sidebar.less         #   侧边栏样式
│   ├── side-catalog.less    #   文章目录样式
│   ├── search.less          #   搜索样式
│   └── snackbar.less        #   提示条样式
│
├── assets/
│   └── tikzjax/              #   TikZJax 自建部署文件（JS/WASM/字体/TeX包）
├── fonts/                   # 字体文件（自定义等宽字体 MapleMono WOFF2）
├── img/                     # 图片资源
│   ├── home-bg.jpg          #   首页头图
│   ├── about-bg.jpg         #   关于页头图
│   ├── archive-bg.jpg       #   归档页头图
│   ├── 404-bg.jpg           #   404页头图
│   ├── post-bg/             #   文章头图目录
│   ├── in-post/             #   文章内图片目录
│   ├── favicon.ico          #   网站图标
│   └── icon_wechat.jpg      #   微信分享图
│
├── vendor/                  # 第三方库
└── _site/                   # [生成] Jekyll 构建输出（不需手动编辑）
```

> **提示**：下划线 `_` 开头的目录是 Jekyll 的特殊目录，构建时会被特殊处理。`_site/` 是 `jekyll build` 的输出目录。部署通过 GitHub Actions 自定义工作流完成（见[第 23 章](#23-部署到-github-pages)）。

---

## 3. 核心配置文件 `_config.yml` 详解

配置文件位于项目根目录的 [_config.yml](/_config.yml)。以下是每一项参数的完整说明：

### 3.1 站点基本信息

```yaml
title: 何尹铭 Blog              # 站点名称，显示在导航栏和页面标题中
SEOTitle: 何尹铭的博客 | Yummy Blog  # SEO 标题，会出现在浏览器标签页和 Open Graph 标签中
header-img: img/home-bg.jpg     # 默认头图，当页面未指定 header-img 时使用
email: yummy_he_mail@qq.com     # 邮箱
description: "这里是 @Yummy 何尹铭 的个人博客"  # 站点描述，用于 <meta> 标签和 SEO
keyword: "何尹铭, 何尹铭的博客, Yummy Blog, 博客, 个人网站"  # 站点关键词，用于 <meta> 标签
url: ""                         # 站点完整URL（部署到 GitHub Pages 时一般留空）
baseurl: ""                     # 子路径（如站点在子目录 /blog 下，则填写 "/blog"）
```

**说明**：
- `url` 和 `baseurl` 在部署到 `username.github.io` 仓库时通常都留空即可。
- `SEOTitle` 用于 `<title>` 标签和社交媒体分享（Open Graph）。格式：`{页面标题} - {SEOTitle}`

### 3.2 发布时间控制

```yaml
future: true        # 是否发布未来日期的文章。true=发布，false=隐藏未来的文章
```

**说明**：如果文章 Front Matter 中的 `date` 设置为未来的日期，`future: true` 会让它正常显示；`false` 则会被 Jekyll 跳过。

### 3.3 社交网络设置（SNS）

```yaml
RSS: false                      # RSS 订阅开关。true=在页脚显示RSS图标
weibo_username: false           # 微博用户名。false=不显示
zhihu_username: false           # 知乎用户名。false=不显示
github_username: Yummy-He       # GitHub 用户名
gitee_username: Yummy-He        # Gitee 用户名
mail-address: yummy_he_mail@qq.com  # 邮箱（会显示邮箱图标链接）
# twitter_username: false       # Twitter 用户名（已注释）
# facebook_username: false      # Facebook 用户名（已注释）
# linkedin_username: false      # LinkedIn 用户名（已注释）
```

**说明**：所有社交链接显示在页脚和侧边栏。设置为 `false` 则隐藏该项。社交图标使用 font-awesome。

### 3.4 构建设置

```yaml
highlighter: rouge              # 代码语法高亮引擎。GitHub Pages 仅支持 rouge
permalink: pretty               # 文章URL格式。"pretty" 表示 /:categories/:year/:month/:day/:title/
paginate: 10                    # 首页每页显示的文章数
plugins: [jekyll-paginate, jekyll-mentions, jekyll-feed, jekyll-sitemap]  # 使用的Jekyll插件列表
```

**permalink 可选值**：
| 值 | URL 格式示例 |
|----|-------------|
| `date` | `/2026/02/27/myblog.html` |
| `pretty` | `/2026/02/27/myblog/` |
| `none` | `/myblog.html` |
| `/:title/` | `/myblog/` |
| `/:year/:title/` | `/2026/myblog/` |

### 3.5 排除文件

```yaml
exclude:
  [
    "less",
    "node_modules",
    "Gruntfile.js",
    "package.json",
    "README.md",
    "README.zh.md",
    "vendor",
  ]
```

**说明**：Jekyll 构建时忽略这些目录和文件，不会复制到 `_site/` 中。`node_modules` 必须排除，否则构建会非常慢。

### 3.6 AnchorJS 设置

```yaml
anchorjs: true    # 是否启用锚点链接功能。在文章标题旁显示可点击的链号图标
```

**行为**：启用后，文章内所有标题（h1-h6）会自动添加锚点链接。鼠标悬停时显示，点击后URL会变为 `#标题id`，可用于分享直达某章节。

### 3.7 Markdown 设置

```yaml
markdown: kramdown               # Markdown 解析器
kramdown:
  input: GFM                      # 输入格式：GitHub Flavored Markdown
  syntax_highlighter_opts:
    span:
      line_numbers: false         # 行内代码不显示行号
    block:
      line_numbers: true          # 代码块显示行号
      start_line: 1               # 行号从1开始
```

**GFM 特性**：支持表格、任务列表、删除线、自动链接等 GitHub 风格语法。

### 3.8 评论系统设置

```yaml
disqus_username: false            # Disqus 评论用户名。false=禁用
netease_comment: false            # 网易云跟帖评论。false=禁用
```

**使用方式**：
- Disqus：在 [disqus.com](https://disqus.com) 注册后获取 shortname，填入此处替换 `false`
- 网易云跟帖：设为 `true` 启用（使用硬编码的 productKey）

### 3.9 统计分析设置

```yaml
# ba_track_id: [your track id]        # 百度统计ID（已注释）
# ga_track_id: "UA-49627206-1"        # Google Analytics ID（已注释）
# ga_domain: huangxuan.me             # GA 域名（已注释）
```

**使用方式**：取消注释并填入自己的统计 ID 即可启用。

### 3.10 侧边栏设置

```yaml
sidebar: true                       # 是否启用侧边栏。true=启用，false=全宽布局
sidebar-about-description: "一个简单的本科生 <br>  @ Jilin University"
                                    # 侧边栏个人简介，支持 HTML
sidebar-avatar: https://github.com/Yummy-He.png
                                    # 侧边栏头像，使用绝对URL（首页和关于页都会用到）
```

### 3.11 特色标签设置

```yaml
featured-tags: true                 # 是否启用特色标签功能
featured-condition-size: 1          # 标签数量超过此值的标签会被标记为"特色标签"
```

**行为**：标签关联的文章+项目数量大于 `featured-condition-size` 时，该标签会显示在侧边栏的 "FEATURED TAGS" 区域。当前值为 1，即所有标签都是特色标签。

### 3.12 PWA 设置

```yaml
chrome-tab-theme-color: "#000000"   # Chrome 浏览器标签颜色（Android）
service-worker: true                # 是否启用 Service Worker（离线访问）
```

### 3.13 MathJax 设置

```yaml
page-mathjax: false                 # 全局数学公式开关。true=所有页面加载MathJax
```

**说明**：这是 `layout: page` 用于首页/归档等列表页的公式渲染开关（默认关闭，避免无公式页面加载额外 JS）。单篇文章通过 Front Matter 中的 `mathjax: true` 启用（作用于 `layout: post`）。

> 一般保持 `false`，只在需要公式的文章中单独启用即可。

### 3.14 友情链接设置

```yaml
friends:
  [
    { title: "HuxBlog", href: "http://huangxuan.me" },
    { title: "MingyuYou", href: "https://github.com/MingyuYou" },
    { title: "TyeGuo", href: "https://github.com/ty64abczip" },
  ]
```

**格式**：JSON 数组，每项包含 `title`（显示名称）和 `href`（链接地址）。显示在侧边栏和页面底部。

---

## 4. 页面文件与 Front Matter 参数

### 4.1 什么是 Front Matter

Front Matter 是 Jekyll 中写在 Markdown/HTML 文件开头的 YAML 配置块，用 `---` 包裹。它告诉 Jekyll 如何渲染该页面。

```markdown
---
key: value
---
```

### 4.2 文章（Post）的 Front Matter 参数

#### 4.2.1 必填参数

| 参数 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `layout` | string | 使用的布局模板 | `post` |
| `title` | string | 文章标题 | `"欢迎来到我的博客"` |
| `date` | datetime | 发布日期 | `2026-02-27 12:00:00` |

#### 4.2.2 选填参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `subtitle` | string | (空) | 文章副标题，显示在标题下方 |
| `author` | string | `site.title` | 文章作者 |
| `header-img` | string | `site.header-img` | 文章头图路径（相对于项目根目录） |
| `header-style` | string | (默认图) | `"text"` = 纯文字标题（无背景图） |
| `header-mask` | float | `0` | 头图蒙版透明度，0~1。如 `0.3` 即 30% 黑色遮罩 |
| `header-img-credit` | string | (空) | 头图来源署名 |
| `header-img-credit-href`| string | (空) | 头图来源链接 |
| `tags` | array | `[]` | 文章标签列表 |
| `mathjax` | boolean | `false` | 是否为该文章单独加载 MathJax |
| `tikzjax` | boolean | `false` | 是否为该文章单独加载 TikZJax |
| `no-catalog` | boolean | `false` | 设为 `true` 则隐藏该文章的侧边目录 |
| `multilingual` | boolean | `false` | 是否启用中英双语 |
| `content-preview` | boolean | 未设置 | 是否在首页显示文章内容预览 |
| `lang` | string | (空) | 文章语言。`'en'` 会让预览截取更多字符 |
| `published` | boolean | `true` | 设为 `false` 隐藏该文章 |
| `hidden` | boolean | `false` | 设为 `true` 则在归档页隐藏 |
| `nav-style` | string | (空) | `"invert"` 让导航栏反色 |
| `plchart` | boolean | `false` | 是否嵌入外部图表 iframe |
| `description` | string | (空) | 页面描述，用于SEO和搜索 |
| `header-bg-css` | string | (空) | 头部背景CSS（如渐变等）|

#### 4.2.3 文章 Front Matter 完整示例

```yaml
---
layout:     post
title:      "我的文章标题"
subtitle:   "文章副标题"
date:       2026-05-06 12:00:00
author:     "何尹铭"
header-img: "img/post-bg/post-bg-example.jpg"
header-mask: 0.3
header-style: text
tags:
    - LaTeX
    - Fortran
    - 笔记
mathjax: true
tikzjax: false
no-catalog: false
multilingual: false
published: true
hidden: false
---
```

### 4.3 普通页面（Page）的 Front Matter 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `layout` | string | `page` 或 `default` |
| `title` | string | 页面标题 |
| `description` | string | 页面描述（显示在头部副标题位置） |
| `header-img` | string | 头图路径 |
| `header-mask` | float | 头图蒙版透明度 |
| `hide-in-nav` | boolean | `true` 则不在导航栏中显示 |
| `no-catalog` | boolean | `true` 则隐藏侧边目录 |
| `sidebar` | boolean | 覆盖全局侧边栏设置 |

### 4.4 项目文档（Project）的 Front Matter 参数

#### project-item 布局（项目入口页）

```yaml
---
layout: project-item      # 必须
title: "项目名称"          # 必须
subtitle: "项目简要描述"   # 选填
author: "何尹铭"           # 选填
header-style: text         # 选填，"text" = 纯文字头部
tags: [LaTeX, Fortran]     # 选填，用于标签筛选
---
```

#### project-post 布局（项目子页面）

```yaml
---
layout: project-post       # 必须
title: "子页面标题"
author: "何尹铭"
header-style: text
# hidden: true             # 设为true可在项目列表中隐藏
---
```

#### project 布局（项目列表首页 `project/index.md`）

```yaml
---
layout: project             # 必须
title: "Project"
author: "何尹铭"
description: "所有项目文档汇总"
header-mask: 0.3
---
```

此页面无需写正文内容，项目列表由 `project` 布局自动遍历 `/project/` 下所有 `project-item` 生成。

### 4.5 Keynote 布局的特殊参数

```yaml
---
layout: keynote              # 必须
title: "演示文稿标题"
subtitle: "副标题"
iframe: "https://example.com/slides"  # 嵌入的演示文稿 URL
tags: [tag1, tag2]
---
```

Keynote 布局会将头部区域替换为一个全宽的 iframe，适合嵌入在线幻灯片。

---

## 5. 布局系统（Layouts）

### 5.1 布局层级关系

```text
default.html  （最基础布局，HTML骨架）
├── page.html          （页面布局，带侧边栏）
│   ├── index.html     （首页：page + 文章列表 + 分页器）
│   ├── about.html     （关于页：page + 中英文内容）
│   └── archive.html   （归档页：default + 年份/标签列表）
├── post.html           （文章布局：default + 目录 + 评论 + 前后导航）
│   └── project-item.html  （项目入口：post 样式的副本）
├── project.html        （项目列表：类似 page，自动遍历项目）
│   └── project-post.html  （项目子页：post 样式的副本）
└── keynote.html         （Keynote 布局：全宽 iframe）
```

### 5.2 default.html

最基础的 HTML 骨架。包含：
- `{% include head.html %}` — `<head>` 中所有元数据、CSS
- `{% include nav.html %}` — 顶部导航栏
- `{% include search.html %}` — 搜索弹出层
- `{{ content }}` — 具体页面内容
- `{% include footer.html %}` — 页脚 + 所有 JS 脚本

### 5.3 page.html

`layout: default` 的子布局。提供两栏结构：
- 左栏（宽）：`{{ content }}` 页面主内容
- 右栏（窄）：侧边栏（特色标签 + 个人简介 + 友链 + 广告）

通过 `site.sidebar` 配置可切换有无侧边栏两种模式。

### 5.4 post.html

`layout: default` 的子布局。文章页的完整功能：

1. **头部**（`intro-header.html`）：大图标题或纯文字标题
2. **文章内容**：`{{ content }}`
3. **前后导航**：上一篇 / 下一篇链接
4. **评论系统**：Disqus 或 网易云跟帖
5. **侧边目录**（Side Catalog）：自动提取 h1-h6 标题生成目录
6. **锚点链接**（AnchorJS）：标题悬停显示链接图标

### 5.5 project.html

项目文档列表页面。自动遍历 `/project/` 下所有 `layout: project-item` 的页面，按日期降序排列。样式与首页文章列表一致。

### 5.6 project-item.html / project-post.html

它们分别是 `post.html` 的功能副本（独立于 post.html，便于后续独立修改）。

---

## 6. 包含模块（Includes）

### 6.1 head.html — `<head>` 元数据

| 功能 | 实现 |
|------|------|
| SEO 关键词 | `{{ site.keyword }}` |
| Open Graph 标签 | 自动判断 page/post 类型输出不同 meta |
| Chrome 标签色 | `{{ site.chrome-tab-theme-color }}` |
| PWA manifest | `<link rel="manifest" href="/pwa/manifest.json">` |
| Favicon | `/img/favicon.ico` |
| CSS | bootstrap.min.css + yummy-blog.min.css + font-awesome |
| Google AdSense | data-ad-client="ca-pub-6487568398225121" |

### 6.2 nav.html — 顶部导航栏

固定顶部（`navbar-fixed-top`）的 Bootstrap 导航栏，包含：

- **网站名称**：链接到首页
- **HOME**：首页
- **Project**：项目列表 `{{ site.baseurl }}/project/`
- **ABOUT**：关于页 `{{ site.baseurl }}/about/`
- **Archive**：归档页 `{{ site.baseurl }}/archive/`
- **搜索图标**：点击弹出搜索层

**注意**：导航栏项目是手动硬编码的，如需添加新页面，需直接修改 `nav.html`（约第 24-26 行）。导航栏还包含一个自定义的移动端菜单展开/收起动画（纯 CSS3，不依赖 Bootstrap 的 JS）。

### 6.3 footer.html — 页脚

包含所有页面的共有底部内容：

1. **社交链接**（SNS Links）
2. **版权信息**（Copyright + 模板来源）
3. **JS 库加载**：jQuery → Bootstrap → yummy-blog → SimpleJekyllSearch → SW Registration
4. **侧边目录生成**：从文章 h1-h6 提取并生成导航
5. **FastClick**：解决移动端 300ms 点击延迟
6. **Google Analytics / 百度统计**：条件加载
7. **搜索功能**：SimpleJekyllSearch 初始化
8. **AnchorJS**：文章标题锚点链接

### 6.4 intro-header.html — 页面头部

根据 `include.type` 参数有三种模式：

| type | 用途 | 特点 |
|------|------|------|
| `page` | 首页/关于/归档 | 大图+标题+描述，支持 `short=true` 缩小版 |
| `post` | 文章页 | 大图+标题+副标题+标签+作者+日期 |
| `keynote` | 演示文稿 | 全宽 iframe 替代头图 |

头图参数：
- `page.header-img` — 页面级头图（优先级最高）
- `site.header-img` — 全局默认头图（`img/home-bg.jpg`）
- `page.header-mask` — 黑色蒙版透明度（如 `0.3`）
- `page.header-style: text` — 纯文字模式，不用头图背景
- `page.header-img-credit` — 图片署名

### 6.5 sns-links.html — 社交链接

支持的社交平台及其配置方式：

| 平台 | _config.yml 参数 | 图标 |
|------|-----------------|------|
| RSS | `RSS: true` | fa-rss |
| Twitter | `twitter_username: "xxx"` | fa-twitter |
| 知乎 | `zhihu_username: "xxx"` | 知乎SVG |
| 微博 | `weibo_username: "xxx"` | fa-weibo |
| Facebook | `facebook_username: "xxx"` | fa-facebook |
| GitHub | `github_username: "xxx"` | fa-github |
| Gitee | `gitee_username: "xxx"` | Gitee SVG |
| LinkedIn | `linkedin_username: "xxx"` | fa-linkedin |
| 邮箱 | `mail-address: "xxx@example.com"` | fa-envelope |

`include.center=true` 时链接居中排列。

### 6.6 featured-tags.html — 特色标签

显示在侧边栏和文章页底部。逻辑：

1. 收集所有已发布文章和项目的标签
2. 按标签分组，统计每个标签的出现次数
3. 数量 > `site.featured-condition-size` 的标签才会显示
4. 按标签数量降序排列（数量多的在前）
5. 点击标签跳转到归档页并自动筛选

### 6.7 其他 includes

| 文件 | 功能 |
|------|------|
| `short-about.html` | 侧边栏个人简介（头像 + 描述 + SNS链接） |
| `friends.html` | 友情链接列表 |
| `search.html` | 搜索弹出层 HTML 结构 |
| `ads.html` | Google AdSense 广告单元 |
| `mathjax_support.html` | MathJax 3 配置（SVG渲染，含分隔符、缩放、mhchem） |
| `tikzjax_support.html` | TikZJax 配置（WebAssembly 图形渲染，自建部署） |
| `multilingual-sel.html` | 中英文语言切换下拉框 |
| `about/zh.md` | 关于页中文内容 |
| `about/en.md` | 关于页英文内容（空文件） |

---

## 7. 新建一篇文章

### 7.1 方法一：使用 Rake 任务（推荐）

在项目根目录执行：

```bash
rake post title="文章标题" subtitle="文章副标题"
```

**参数说明**：

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `title=` | 文章标题（必填） | `"new-post"` |
| `subtitle=` | 文章副标题 | `"This is a subtitle"` |
| `date=` | 发布日期，格式 YYYY-MM-DD | 当天日期 |

**示例**：

```bash
# 创建标题为"Linux笔记"的文章，副标题为"入门指南"
rake post title="Linux笔记" subtitle="入门指南"

# 指定日期
rake post title="My Post" date="2026-05-01"
```

**执行后**：会在 `_posts/` 目录生成 `2026-05-06-linuxbi-ji.md`（文件名由日期+标题拼音自动生成），内容为预填充的 Front Matter 模板。

> **注意**：如果目录不存在同名文件，会直接创建；如果存在，会询问是否覆盖。

### 7.2 方法二：手动创建

在 `_posts/` 目录下新建 Markdown 文件，文件名格式：

```text
YYYY-MM-DD-slug.markdown
```

或

```text
YYYY-MM-DD-slug.md
```

`slug` 为 URL 友好的英文/拼音标识，如 `my-first-post`。

**标准模板**：

```markdown
---
layout:     post
title:      "文章标题"
subtitle:   "副标题（可选）"
date:       2026-05-06 12:00:00
author:     "何尹铭"
header-img: "img/post-bg/post-bg-2025.jpg"
header-mask: 0.3
tags:
    - 标签1
    - 标签2
mathjax: false
tikzjax: false
no-catalog: false
published: true
---

> 引用文字可以放在这里作为文章引言

## 第一章

正文内容使用 Markdown 语法编写...

### 1.1 小节

更多内容...

## 第二章

```python
# 代码块支持语法高亮
def hello():
    print("Hello, World!")
```

> 更多 Markdown 语法请参考 [kramdown 文档](https://kramdown.gettalong.org/syntax.html)
```

### 7.3 文章头图管理

文章头图放在 `img/post-bg/` 目录中：

```text
img/post-bg/
├── post-bg-2015.jpg
├── post-bg-myblog.jpg
├── post-bg-unix-linux.jpg
└── ...
```

在 Front Matter 中引用：
```yaml
header-img: "img/post-bg/post-bg-myblog.jpg"
```

### 7.4 文章中插入图片

文章中使用的图片放在 `img/in-post/` 目录中：

```text
img/in-post/
├── post-myblog/
│   └── hux.jpg
└── APMMC/
    └── star.png
```

在 Markdown 中引用：
```markdown
<img class="shadow" width="320" src="/img/in-post/post-myblog/hux.jpg" />
<small class="img-hint">图片说明文字</small>
```

添加 `class="shadow"` 会给图片加阴影效果，`<small class="img-hint">` 显示灰色图片说明。

### 7.5 隐藏或取消发布文章

```yaml
published: false    # 文章不会出现在任何列表和 RSS 中
hidden: true        # 文章存在但归档页面隐藏（可在标签筛选中不出现）
```

`published: false` 更彻底——文章在 Jekyll 中不会被编译。`hidden: true` 只是前端筛选。两者都可用于草稿管理。

### 7.6 文章内容预览（首页摘要）

在 Front Matter 中添加 `content-preview`：

```yaml
content-preview: true    # 首页显示文章前200字（中文）或300字（英文）
```

语言判断通过 `lang: 'en'` 进行。

---

## 8. 新建一个项目文档

### 8.1 创建项目入口

在 `project/` 下新建目录，如 `project/MyProject/`，然后创建 `index.md`：

```markdown
---
title: "My Project"
subtitle: "项目的简短描述"
layout: project-item
author: "何尹铭"
header-style: text
tags:
  - 标签1
  - 标签2
---

# 项目标题

项目介绍内容...

## 下载

点击下载PDF文档...

## 链接

[GitHub仓库](https://github.com/...)

如果这个项目对你有帮助，不妨点个 Star！
```

**关键参数说明**：

| 参数 | 说明 |
|------|------|
| `layout: project-item` | **必须**，否则不会出现在项目列表中 |
| `title` | 项目名称 |
| `subtitle` | 简短描述（显示在列表和头部） |
| `tags` | 标签用于 Archive 页面分类筛选 |
| `header-style: text` | 建议使用纯文字头部，更简约 |
| `date` | 可选，用于项目列表排序。不填则不显示日期 |

### 8.2 创建项目子页面

在项目目录下创建更多 `.md` 文件：

```markdown
---
title: "子页面标题"
layout: project-post
author: "何尹铭"
header-style: text
---

子页面内容...
```

**注意**：若在 `project/` 目录下创建子页面，使用 `layout: project-post`；若想子页面在项目列表中隐藏，使用 `hidden: true`。

### 8.3 项目列表页（已存在）

`project/index.md` 是已经配置好的项目列表首页，使用 `layout: project`，无需修改。它会自动遍历 `/project/` 下所有 `project-item`，按日期降序展示。

### 8.4 在项目中添加文件附件

直接把文件放在项目目录下即可：

```text
project/MyProject/
├── index.md
├── main.pdf         # PDF附件
├── code.md          # 代码子页面
└── dev.md           # 开发子页面
```

在 Markdown 中引用同目录文件：
```markdown
点击下载 <a href="main.pdf" download="文档.pdf">PDF文档</a>
[在线查看](code){:target="_blank"}
```

---

## 9. 标签（Tags）系统

### 9.1 在文章中设置标签

```yaml
tags:
    - OS
    - Linux
    - 笔记
```

标签会：
- 显示在文章头部的标签栏
- 被归档页面收集用于分类筛选
- 在侧边栏 FEATURED TAGS 中显示
- 在 search.json 中用于全文搜索

### 9.2 特色标签

`_config.yml` 中 `featured-condition-size` 控制特色标签的阈值：

```yaml
featured-tags: true
featured-condition-size: 1    # 数量超过1的标签即为特色标签（当前所有标签都是）
```

**调整建议**：如果标签很多，可以设为 `3`，则只有被 3 篇以上文章/项目关联的标签才会在侧边栏中显示。

### 9.3 标签的排序逻辑

特色标签按关联数量降序排列。排序算法：
- 计算 `total_items - tag_size` 作为排序值
- 值越小（即标签关联内容越多）越靠前
- 用字符串排序实现（利用了 4 位数补零的技巧）

---

## 10. 归档页面（Archive）

### 10.1 功能概述

归档页面 [`archive.html`](/archive.html) 提供：

1. **标签云**：显示所有标签及文章/项目数量
2. **点击筛选**：点击标签只显示关联的内容
3. **"Show All"**：重置筛选，显示全部
4. **项目置顶**：Project 分组始终在最前面
5. **年份分组**：文章按年份分组（如 2026、2025）
6. **模糊搜索**：标签云支持 jquery.tagcloud.js 动态颜色动画

### 10.2 URL 筛选参数

归档页支持通过 URL query 参数筛选：

```text
/archive/?tag=Linux          # 只显示标签为 Linux 的内容
/archive/                    # 显示全部
```

标签栏的链接格式：`/archive/?tag={{ tag | url_encode }}`

### 10.3 隐藏内容不参与归档

在 Front Matter 中设置：
```yaml
hidden: true        # 不在归档中显示
published: false    # 不被 Jekyll 编译
```

归档页的筛选条件：
```liquid
{% assign filtered_posts = site.posts
    | where_exp: "post", "post.hidden != true"
    | where_exp: "post", "post.published != false" %}
```

---

## 11. 搜索功能

### 11.1 实现原理

搜索基于 [Simple Jekyll Search](https://github.com/christian-fei/Simple-Jekyll-Search) 库。

1. Jekyll 构建时生成 [`search.json`](/search.json)，包含所有文章和项目的标题、副标题、标签、URL
2. 前端搜索栏弹出后，Simple Jekyll Search 加载 JSON 进行客户端模糊搜索

### 11.2 search.json 数据结构

```json
[
  {
    "title": "文章/项目标题",
    "subtitle": "副标题",
    "tags": "标签1, 标签2",
    "url": "/2026/02/27/myblog/",
    "date": "2026-02-27T12:00:00+08:00"
  }
]
```

### 11.3 搜索配置

在 `footer.html` 中的配置：

```javascript
SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('search-results'),
    json: '/search.json',
    searchResultTemplate: '<div class="post-preview item">...',
    noResultsText: 'No results',
    limit: 50,
    fuzzy: false,        // 精确搜索（非模糊）
});
```

### 11.4 搜索范围

搜索包含：
- 所有 `site.posts`（文章），排除 `hidden: true` 和 `published: false` 的
- 所有 `site.pages` 中 `layout: project-item` 的（项目文档），同样应用过滤条件

---

## 12. 评论系统

### 12.1 Disqus 评论

**启用步骤**：

1. 在 [disqus.com](https://disqus.com) 注册并创建一个站点
2. 获取 Disqus shortname
3. 在 `_config.yml` 中配置：

```yaml
disqus_username: "你的shortname"    # 将 false 替换为你的 shortname
```

**评论框位置**：
- 文章页（`post.html`）底部
- 关于页（`about.html`）底部（使用独立的代码块）

### 12.2 网易云跟帖评论

```yaml
netease_comment: true    # 设为 true 启用
```

使用硬编码的 `productKey`（来自模板原作者），如需更换请修改 `post.html` 中的 `cloudTieConfig.productKey`。

---

## 13. 数据分析与统计

### 13.1 Google Analytics

```yaml
ga_track_id: "UA-49627206-1"     # 取消注释并填入你的 Tracking ID
ga_domain: huangxuan.me           # 取消注释并填入你的域名
```

脚本在 `footer.html` 中，使用条件加载。配置后会在所有页面启用 GA 追踪。

### 13.2 百度统计

```yaml
ba_track_id: "your-baidu-id"      # 取消注释并填入你的百度统计ID
```

### 13.3 Google AdSense

已在 `head.html` 和 `ads.html` 中硬编码了 AdSense 代码（`ca-pub-6487568398225121`），如需更换请修改这两个文件。

---

## 14. 数学公式与图形（MathJax 3 / TikZJax）

本站使用 **MathJax 3** 提供 LaTeX 数学公式渲染，输出格式为 SVG。

### 14.1 单篇文章启用

在文章的 Front Matter 中设置：

```yaml
mathjax: true
```

这会在该文章页底部加载 MathJax 脚本（`_includes/mathjax_support.html`）。

### 14.2 全站启用（列表页）

```yaml
# _config.yml
page-mathjax: true
```

这会让首页、归档页等使用 `layout: page` 的页面也加载 MathJax。一般不需要开启，因为列表页通常只显示摘要，公式在正文页才展开。

### 14.3 公式语法

支持标准 LaTeX 数学语法，两种分隔符写法均可：

| 类型 | 写法一 | 写法二 | 说明 |
|------|--------|--------|------|
| 行内公式 | `$E = mc^2$` | `\(E = mc^2\)` | 与正文混排 |
| 块级公式 | `$$E = mc^2$$` | `\[E = mc^2\]` | 独立居中显示 |

**关于分隔符的选择**：
- 用 `$...$` / `$$...$$` 写起来更简洁
- kramdown 会将 `$$...$$` 自动转换为 `\[...\]` 输出，最终由 MathJax 的 `\[...\]` 配置渲染
- 两种写法效果完全相同，写 `$$` 即可，无需关心转换细节

> **注意**：公式中不要有空格，如 `$ E = mc^2 $`（前后空格）会导致无法识别。

### 14.4 常用公式示例

**行内公式**：
```latex
质能方程 $E = mc^2$ 是爱因斯坦提出的。
勾股定理 $a^2 + b^2 = c^2$ 是几何学的基础。
```

**块级公式（带编号）**：
```latex
$$
\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}
\tag{1}
$$
```

**多行对齐**：
```latex
$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0
\end{aligned}
$$
```

**矩阵**：
```latex
$$
\mathbf{A} = \begin{pmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{pmatrix}
$$
```

**化学方程式（mhchem）**：
```latex
$$
\ce{^{2}H} + \ce{^{3}H} \to \ce{^{4}He} + n + 17.6\,\text{MeV}
$$
```

### 14.5 实现原理

MathJax 3 通过浏览器端 JavaScript 渲染，工作流程：

```
Markdown 源码           kramdown 处理              HTML 输出               MathJax 3 渲染
──────────────────────────────────────────────────────────────────────────────────
$E = mc^2$          →    不转换                →   $E = mc^2$           →   SVG 公式
$$E = mc^2$$        →    转换为 \[...\]         →   \[E = mc^2\]         →   SVG 公式
```

配置文件位于 [_includes/mathjax_support.html](/_includes/mathjax_support.html)：

```javascript
MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    tags: 'ams'              // 支持 \tag{} 编号
  },
  svg: {
    fontCache: 'global',
    scale: 0.9               // 90% 缩放
  },
  options: {
    menuOptions: {
      settings: {
        assistiveMml: false  // 禁用辅助 MathML，避免 retry 错误
      }
    }
  }
};
```

关键设计决策：
- **同时支持 `$` 和 `\(\)` 分隔符**：兼容 kramdown 自动转换 `$$` → `\[` 的行为，避免块级公式无法渲染
- **异步加载**：`<script async>` 不阻塞页面，公式按需渲染
- **SVG 输出**：相比 CHTML 更清晰，缩放不失真
- **CDN 加载**：使用 jsDelivr CDN（`mathjax@3/es5/tex-svg.js`），无需本地托管
- **溢出处理**：`mjx-container[display="true"]` 设置 `overflow-x: auto`，超宽公式出现横向滚动条（定义于 `less/yummy-blog.less`）

### 14.6 故障排查

| 症状 | 可能原因 | 解决 |
|------|----------|------|
| 公式显示为原始 `$...$` 文本 | 未设置 `mathjax: true` | 检查文章 Front Matter |
| 块级公式显示为 `\[...\]` 文本 | MathJax 配置缺少 `\[` 分隔符 | 确认 `_includes/mathjax_support.html` 中 `displayMath` 包含 `['\\[', '\\]']` |
| 控制台报 "MathJax retry" 错误 | mhchem 等扩展动态加载失败 | 检查 `options.menuOptions.settings.assistiveMml` 是否为 `false` |
| 公式渲染但样式异常 | CSS 冲突 | 检查主题样式是否覆盖了 MathJax SVG |
| 化学式 `\ce` 不渲染 | mhchem 扩展未加载 | mhchem 已内置在 tex-svg.js 中，`\ce` 自动触发加载 |
### 14.7 TikZ 图形渲染（TikZJax）

本站集成 **TikZJax** 实现 LaTeX TikZ 图形在浏览器中的直接渲染，采用**自建部署**方案，所有文件本地托管。

**工作原理**：TikZJax 将 TeX 引擎通过 WebAssembly 编译到浏览器端运行，TikZ 源码 → DVI → SVG 的转换完全在客户端完成，首次初始化 < 500ms，后续利用 IndexedDB 缓存几乎即时渲染。

#### 14.7.1 单篇文章启用

在文章的 Front Matter 中设置：

```yaml
tikzjax: true
```

这会在该文章页底部加载 TikZJax 脚本（`_includes/tikzjax_support.html`），加载 `fonts.css` + `tikzjax.js`。

#### 14.7.2 在 Markdown 中嵌入 TikZ

使用 `<script type="text/tikz">` 标签嵌入 TikZ 代码：

```html
<script type="text/tikz">
\begin{tikzpicture}
  \draw[->] (0,0) -- (2,0) node[right] {$x$};
  \draw[->] (0,0) -- (0,2) node[above] {$y$};
  \draw[blue, thick] (0,0) circle (1);
\end{tikzpicture}
</script>
```

**注意**：如果直接写在 Markdown 中（非 raw 包裹），Jekyll/Liquid 可能会解析 `{`  `%` 等字符导致渲染失败。大多数情况下直接写即可工作。如遇到问题，可用 `{% raw %}{% endraw %}` 包裹整个 `<script>` 块。

#### 14.7.3 配置选项

`<script>` 标签支持 `data-*` 属性控制行为：

| 属性 | 说明 | 示例 |
|------|------|------|
| `data-tex-packages` | 加载额外 TeX 包（JSON） | `'{"pgfplots":""}'` |
| `data-tikz-libraries` | 加载 TikZ 库 | `"arrows.meta,calc,positioning"` |
| `data-add-to-preamble` | 自定义 preamable | `"\\usepackage{siunitx}"` |
| `data-show-console` | 显示 TeX 编译日志 | `"true"` |
| `data-disable-cache` | 禁用 IndexedDB 缓存 | `"true"` |
| `data-aria-label` | SVG 无障碍标签 | `"函数y=sin(x)图像"` |

**示例**（使用 pgfplots 绘图）：

```html
<script type="text/tikz" data-tex-packages='{"pgfplots":""}'>
\begin{tikzpicture}
  \begin{axis}[
    width=10cm, height=6cm,
    xlabel={$x$}, ylabel={$f(x)$},
    grid=major]
    \addplot[blue, thick, samples=100] {sin(deg(x))};
  \end{axis}
\end{tikzpicture}
</script>
```

**示例**（使用 TikZ 库绘制流程图）：

```html
<script type="text/tikz" data-tikz-libraries="arrows.meta,calc,positioning">
\begin{tikzpicture}[
  node distance=2cm,
  box/.style={draw, rounded corners, minimum width=3cm, minimum height=1cm, align=center},
  arrow/.style={->, >=Stealth, thick}]

  \node[box] (a) {输入};
  \node[box, right=of a] (b) {处理};
  \node[box, right=of b] (c) {输出};

  \draw[arrow] (a) -- (b);
  \draw[arrow] (b) -- (c);
\end{tikzpicture}
</script>
```

#### 14.7.4 自建部署说明

TikZJax 相关文件位于 `assets/tikzjax/` 目录：

```text
assets/tikzjax/
├── tikzjax.js       # 主加载脚本（53KB），寻找 <script type="text/tikz"> 并触发渲染
├── run-tex.js       # Web Worker 脚本（524KB），在后台线程运行 TeX 引擎
├── tex.wasm.gz      # TeX WebAssembly 二进制（123KB）
├── core.dump.gz     # TeX 内存转储（2.9MB），加速初始化
├── fonts.css        # 字体样式（13KB）
├── fonts/           # 字体文件（152个 .woff2，共约 1.8MB）
└── tex_files/       # TeX 宏包文件（172个 .sty.gz）
```

**升级方式**：从 [npm @rod2ik/tikzjax](https://www.npmjs.com/package/@rod2ik/tikzjax) 下载最新版本，替换 `assets/tikzjax/` 目录下同名文件即可。

**CDN vs 自建**：自建部署避免了第三方 CDN 的可用性风险，所有文件随博客一起托管在 GitHub Pages，零额外成本。

#### 14.7.5 可用的 TeX 包和 TikZ 库

**内置 TeX 包**：`amsmath`, `amssymb`, `amsfonts`, `array`, `etoolbox`, `hf-tikz`, `pgfplots`, `tikz-3dplot`, `tikz-cd`, `xparse` 等

**内置 TikZ 库**：`arrows`, `arrows.meta`, `calc`, `positioning`, `shapes`, `patterns`, `decorations`, `backgrounds`, `fit`, `matrix`, `chains`, `scopes`, `3d` 等（几乎所有标准库，`external` 等少数不适合浏览器环境的除外）

#### 14.7.6 CSS 辅助类

| 类名 | 说明 |
|------|------|
| `.tikzjax-container` | `max-width: 100%; overflow: visible` |
| `svg.tikzjax` | `max-width: 100%; height: auto; display: block; margin: 1em auto` — SVG 等比缩放至页面宽度 |
| `.tikzjax-scaled-container` | `width: 100%; height: 100%` |

#### 14.7.7 故障排查

| 症状 | 可能原因 | 解决 |
|------|----------|------|
| 图形不显示，只有空白 | 未设置 `tikzjax: true` | 检查文章 Front Matter |
| 看到加载动画后消失 | TeX 编译失败 | 添加 `data-show-console="true"` 查看日志 |
| 渲染为原始 TikZ 代码文本 | `<script>` 标签 `type` 属性缺失 | 确保 `type="text/tikz"` |
| LuaLaTeX 报错 | 使用了不支持的宏包 | 检查 14.7.5 节可用列表 |
| 字体不正确 | fonts.css 文件丢失 | 检查浏览器 Network 面板，确认 `assets/tikzjax/fonts.css` 可访问 |
| 首次加载慢 | tex.wasm 下载 + WASM 初始化 | 首次 ~500ms，后续 IndexedDB 缓存即时 |

#### 14.7.8 响应式行为

TikZ SVG 图形在移动端或窄视口下会自动等比缩放至页面宽度（`max-width: 100%; height: auto`），无需手动设置。

### 14.8 移动端适配与溢出处理

在移动端或窄视口下，长公式和宽图形可能超出页面宽度。本博客提供两套处理策略：

| 内容类型 | 溢出处理 | 桌面端交互 |
|---------|---------|-----------|
| TeX 块级公式 (`$$...$$`) | 横向滚动条，与代码块一致 | 鼠标悬停时滚轮自动转为横向滚动 |
| TikZ 图形 | CSS 等比缩放至页面宽度 | 始终保持完整可见，无需滚动 |
| 代码块 / 表格 | 横向滚动条 | 鼠标悬停时滚轮自动转为横向滚动 |

> **滚轮横向滚动**：当鼠标位于代码块、表格或 TeX 公式区域时，滚轮的纵向滚动会自动转为横向滚动（不再同时滚动页面）。将鼠标移出该区域即可恢复页面纵向滚动。此功能仅在桌面端生效（`js/yummy-blog.js` 中实现）。

#### 14.8.1 如何避免 TeX 公式超出宽度

最好的解决方案是在**书写阶段**就让公式适配窄宽度，而不是依赖滚动条。

**方法一：使用多行环境拆分长公式**

| 环境 | 对齐方式 | 适用场景 |
|------|---------|---------|
| `aligned` | `&` 处对齐 | 多行公式，指定对齐点 |
| `multline` | 首行左、末行右、中间居中 | 超长公式无法对齐拆分 |
| `split` | 类似 `aligned`，支持编号 | 需要整体编号的多行公式 |
| `gathered` | 多行居中 | 无需对齐的多行公式 |

**对比示例**：

不推荐的写法（单行过长，移动端需滚动）：

```latex
$$
B(\omega) = \int_{-\infty}^{\infty} f(x) e^{-i 2\pi \omega x} dx = \int_{-\infty}^{\infty} f(x) e^{-i 2\pi \omega x} dx = \int_{-\infty}^{\infty} f(x) e^{-i 2\pi \omega x} dx
$$
```

推荐写法（用 `aligned` 拆分为多行）：

```latex
$$
\begin{aligned}
B(\omega) &= \int_{-\infty}^{\infty} f(x) e^{-i 2\pi \omega x} dx \\
          &= \int_{-\infty}^{\infty} f(x) e^{-i 2\pi \omega x} dx \\
          &= \int_{-\infty}^{\infty} f(x) e^{-i 2\pi \omega x} dx
\end{aligned}
$$
```

**方法二：使用 `multline` 拆分超长单行公式**：

```latex
$$
\begin{multline}
f(x) = a_0 + a_1 x + a_2 x^2 + a_3 x^3 + a_4 x^4 \\
     + a_5 x^5 + a_6 x^6 + a_7 x^7 + a_8 x^8 + \cdots
\end{multline}
$$
```

**方法三：缩小长矩阵的列间距**：

```latex
$$
\setlength{\arraycolsep}{3pt}
\begin{pmatrix}
a_{11} & a_{12} & a_{13} & a_{14} & a_{15} \\
a_{21} & a_{22} & a_{23} & a_{24} & a_{25}
\end{pmatrix}
$$
```

**方法四：行内公式改为块级公式**：

```markdown
<!-- 不推荐：行内超长公式 -->
文中有一长公式 $a + b + c + d + e + f + g + h + i + j + k$ 混在文字中。

<!-- 推荐：改为块级公式，独立一行 -->
文中有一长公式：
$$
a + b + c + d + e + f + g + h + i + j + k
$$
在文字之外展示。
```

> **原则**：行内公式应尽量简短。超过 20 个字符的公式建议改为块级公式。

#### 14.8.2 如何避免 TikZ 图形超出宽度

TikZ 图形已具备自动缩放能力（`svg.tikzjax` 设置了 `max-width: 100%`），但过度缩放会导致文字过小难以阅读。更好的做法是在绘制时就控制好尺寸。

**方法一：在 tikzpicture 中使用 `scale` 参数**

```latex
\begin{tikzpicture}[scale=0.8]
  \draw[->] (0,0) -- (10,0);
  \draw[->] (0,0) -- (0,10);
\end{tikzpicture}
```

**方法二：pgfplots 中使用相对宽度**

```latex
\begin{tikzpicture}
  \begin{axis}[
    width=\linewidth,      % 使用相对宽度，替代如 width=12cm
    height=0.6\linewidth,
    xlabel={$x$},
    ylabel={$f(x)$}]
    \addplot[blue, thick] {sin(deg(x))};
  \end{axis}
\end{tikzpicture}
```

> **重要**：`\linewidth` 会随容器宽度自动调整。避免使用 `width=15cm` 等绝对尺寸，在移动端会导致图形超出视口。

**方法三：使用 `\resizebox` 包裹 TikZ 代码（最后手段）**

当 TikZ 代码无法修改（如从外部工具导出）时，可包裹一层缩放：

```latex
\resizebox{\linewidth}{!}{
  \begin{tikzpicture}
    % 不可修改的 TikZ 代码
  \end{tikzpicture}
}
```

> **注意**：TikZJax 对 `\resizebox` 的支持取决于所使用的 TeX 宏包，可能不完全兼容。优先使用方法一或方法二。

**方法四：调整节点文字大小**

```latex
\begin{tikzpicture}[
  every node/.style={font=\footnotesize},  % 全局缩小字体
  scale=0.9]
  % ... TikZ 代码
\end{tikzpicture}
```

**尺寸建议**：

| 场景 | 推荐最大宽度 | 说明 |
|------|------------|------|
| 桌面端（>768px） | `\linewidth` (~700px) | 在正文区域完整显示 |
| 平板端（768px） | `\linewidth` (~700px) | 自动适配 |
| 手机端（<500px） | 自动缩放 | CSS `max-width: 100%` 兜底 |

> **经验法则**：在 `tikzpicture` 中，将坐标范围控制在约 10cm 以内，线条粗细和字体大小适中，一般都能在移动端良好显示。

---

## 15. 多语言支持

### 15.1 启用条件

在文章 Front Matter 中设置：

```yaml
multilingual: true
```

### 15.2 工作原理

1. 页面上方出现语言选择下拉框（`multilingual-sel.html`）
2. URL 参数 `?lang=zh` 或 `?lang=en` 切换语言
3. 中文内容放在 `<div class="zh post-container">` 中
4. 英文内容放在 `<div class="en post-container">` 中
5. 切换时页面刷新，JavaScript 根据 URL 参数显示/隐藏对应容器

### 15.3 关于页的多语言

关于页（`about.html`）使用 `{% capture %}` 方式加载中英文内容：

```markdown
{% capture about_zh %}{% include about/zh.md %}{% endcapture %}
{{ about_zh | markdownify }}

{% capture about_en %}{% include about/en.md %}{% endcapture %}
{{ about_en | markdownify }}
```

默认显示中文版本。

---

## 16. 社交网络链接（SNS）

### 16.1 含义

页面底部和侧边栏的社交网站图标，通过 `_config.yml` 中的 SNS 参数控制：

```yaml
RSS: false                  # 改为 true 显示 RSS
github_username: Yummy-He   # GitHub链接
gitee_username: Yummy-He    # Gitee链接
mail-address: xxx@qq.com    # 邮箱链接
weibo_username: false       # 填入用户名启用微博
zhihu_username: false       # 填入用户名启用知乎
```

### 16.2 样式

使用 font-awesome 图标 + `fa-stack` 双层图标（圆形背景+图标前景），居中或左对齐排列。

---

## 17. 友情链接（Friends）

在 `_config.yml` 中配置：

```yaml
friends:
  [
    { title: "友链名称", href: "https://example.com" },
    { title: "另一个友链", href: "https://other.com" },
  ]
```

显示位置：
- 侧边栏底部（`short-about.html` 下方）
- 归档页面底部
- 文章页底部

`site.friends` 为空时不显示该模块。

---

## 18. PWA / Service Worker

### 18.1 功能

- **离线访问**：已访问过的页面可离线浏览
- **内容更新提示**：检测到新内容后弹出提示条并自动刷新
- **添加到主屏幕**：支持 Android Chrome 的 "添加到主屏幕" (A2HS)

### 18.2 配置

```yaml
# _config.yml
chrome-tab-theme-color: "#000000"    # Android Chrome 标签栏颜色
service-worker: true                  # 启用 Service Worker
```

### 18.3 相关文件

| 文件 | 说明 |
|------|------|
| `sw.js` | Service Worker 主脚本（缓存策略、更新检测等） |
| `sw-registration.js` | SW 注册脚本（主线程加载） |
| `snackbar.js` | 提示条组件（更新通知） |
| `offline.html` | 离线时显示的页面 |
| `pwa/manifest.json` | Web App Manifest 配置 |

### 18.4 缓存策略

```javascript
// 预缓存列表（安装时立即缓存）
const PRECACHE_LIST = [
    "./", "./offline.html",
    "./js/jquery.min.js", "./js/bootstrap.min.js",
    "./js/yummy-blog.min.js", "./js/snackbar.js",
    "./css/yummy-blog.min.css", "./css/bootstrap.min.css",
    // ...
];

// 运行时策略：Stale-while-revalidate
// 先从缓存返回，同时从网络获取最新版本更新缓存
```

### 18.5 更新机制

1. Service Worker 检测到页面内容有更新（`last-modified` 时间戳变化）
2. 通过 `postMessage` 通知主线程
3. 主线程显示 Snackbar 提示 "内容更新，页面即将刷新..."
4. 30秒内不会重复刷新（`sessionStorage` 防抖）

### 18.6 PWA Manifest 配置

```json
{
  "name": "何尹铭 Blog",
  "short_name": "何尹铭 Blog",
  "icons": [
    { "src": "icons/128.png", "sizes": "128x128", "type": "image/png" },
    { "src": "icons/512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#fff",
  "theme_color": "#000"
}
```

> **注意**：Manifest 中引用的图标文件（`icons/128.png`, `icons/512.png`）需要在 `pwa/` 目录下提供。

---

## 19. 样式构建系统（LESS / Grunt）

### 19.1 概述

主题样式源码是 LESS 格式，通过 Grunt 编译为 CSS 并压缩。

### 19.2 LESS 源文件

| 文件 | 内容 |
|------|------|
| `yummy-blog.less` | 主入口，@import 所有其他 less 文件 |
| `variables.less` | 颜色、字体、尺寸等变量 |
| `mixins.less` | LESS 混合宏 |
| `highlight.less` | 代码高亮样式（Rouge） |
| `code-copy.less` | 代码复制按钮样式 |
| `sidebar.less` | 侧边栏样式 |
| `side-catalog.less` | 文章目录样式 |
| `search.less` | 搜索层样式 |
| `snackbar.less` | Snackbar 提示条样式 |

### 19.3 Grunt 构建命令

```bash
# 一次性构建（编译LESS + 压缩JS + 添加banner）
npx grunt

# 监听模式（文件修改自动构建）
npx grunt watch
```

### 19.4 Grunt 任务流程

1. **uglify**：压缩 `js/yummy-blog.js` → `js/yummy-blog.min.js`
2. **less**：编译 `less/yummy-blog.less` → `css/yummy-blog.css` + `css/yummy-blog.min.css`
3. **usebanner**：在输出的 CSS/JS 文件顶部添加版本注释

### 19.5 自定义代码块字体

代码块等宽字体在 `less/mixins.less` 的 `.monospace` 混合宏中配置：

```less
.monospace () {
    font-family: "MapleMono", "Fira Code", Menlo, Monaco, Consolas, "Courier New", monospace;
}
```

字体文件通过 `@font-face` 声明在 `less/yummy-blog.less` 开头加载。更换字体时：
1. 将 WOFF2 字体文件放入 `fonts/` 目录
2. 在 `less/yummy-blog.less` 中修改 `@font-face` 的 `src: url()` 路径
3. 更新 `less/mixins.less` 中 `.monospace` 的 `font-family` 名称
4. 运行 `npx grunt less` 重新编译 CSS

### 19.6 自定义样式

修改 LESS 源文件后，运行 `npx grunt` 重新构建。或者直接修改 `css/yummy-blog.css`（不推荐，会被覆盖）。

---

## 20. Rake 任务

### 20.1 可用任务

```bash
# 创建新文章
rake post title="标题" subtitle="副标题" [date="YYYY-MM-DD"]

# 启动本地预览（等同于 jekyll serve）
rake preview
```

### 20.2 Rakefile 配置

```ruby
CONFIG = {
  'version' => "12.3.2",
  'themes' => File.join(SOURCE, "_includes", "themes"),
  'layouts' => File.join(SOURCE, "_layouts"),
  'posts' => File.join(SOURCE, "_posts"),
  'post_ext' => "md",               # 文章文件后缀
  'theme_package_version' => "0.1.0"
}
```

### 20.3 自定义 Rake 任务

可将额外的 `.rake` 文件放在 `_rake/` 目录，Rakefile 会自动加载。

---

## 21. npm scripts

`package.json` 中定义：

```json
{
  "scripts": {
    "start": "bundle exec jekyll serve",
    "dev": "grunt watch & npm run start",
    "boil": "git push boilerplate boilerplate:master",
    "push": "git push origin master --tag"
  }
}
```

| 命令 | 说明 |
|------|------|
| `npm start` | 启动 Jekyll 本地服务器（bundle exec jekyll serve） |
| `npm run dev` | 同时运行 Grunt 监听 + Jekyll 服务器（前端样式自动构建 + 站点热更新） |
| `npm run boil` | 推送到 boilerplate 远程仓库（模板源） |
| `npm run push` | 推送到 origin master 并推送 tag |

---

## 22. 本地开发与环境搭建

### 22.1 前置要求

- **Ruby** ≥ 2.7（Jekyll 4.x 运行环境）
- **Bundler**（`gem install bundler`）
- **Node.js** + npm（Grunt 构建 CSS/JS）
- **Git**

### 22.2 克隆项目

```bash
git clone https://github.com/Yummy-He/Yummy-He.github.io.git
cd Yummy-He.github.io
```

### 22.3 安装依赖

```bash
# Ruby 依赖
bundle install

# Node.js 依赖
npm install
```

### 22.4 启动本地服务器

```bash
# 方式1：仅 Jekyll
npm start

# 方式2：Jekyll + Grunt 监听同时运行
npm run dev

# 或直接使用
bundle exec jekyll serve
```

默认地址：`http://localhost:4000`

Jekyll 会监听文件变化自动重新生成 `_site/` 目录。

### 22.5 构建生产版本

```bash
bundle exec jekyll build
```

输出在 `_site/` 目录中。

### 22.6 Gemfile

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.4"
gem "kramdown-parser-gfm"
gem "rouge", "~> 4.0"
gem "webrick"

# 实际使用的插件
gem "jekyll-paginate"
gem "jekyll-mentions"

# 可选插件
gem "jekyll-feed"
gem "jekyll-sitemap"
```

项目不再依赖 `github-pages` gem，改为直接管理各依赖版本。这样可以获得 Jekyll 4.x 和 Rouge 4.x 的较新版本。

---

## 23. 部署到 GitHub Pages

### 23.1 自动部署（GitHub Actions）

项目使用 GitHub Actions 自定义工作流构建并部署。推送代码后自动触发：

```bash
git add .
git commit -m "更新内容"
git push origin main
```

工作流文件位于 `.github/workflows/deploy.yml`，构建流程包含：
1. 安装 Ruby 依赖（`bundle install`）
2. 安装 Node.js 依赖并运行 Grunt 构建 CSS/JS
3. 执行 `jekyll build` 生成静态文件
4. 部署到 GitHub Pages

站点地址：`https://Yummy-He.github.io`

> **注意**：GitHub 仓库的 **Settings > Pages > Source** 必须设置为 **"GitHub Actions"**。

### 23.2 本地手动构建

```bash
# 构建 CSS/JS
npm install && npx grunt

# 构建站点
bundle exec jekyll build

# 预览
bundle exec jekyll serve
```

---

## 24. 常见问题与故障排除

### 24.1 Jekyll 构建失败

**问题**：`bundle exec jekyll serve` 报错

**解决**：
1. 确保 Ruby 版本符合要求（`ruby --version`）
2. 运行 `bundle update` 更新依赖
3. 检查 `_config.yml` 语法是否正确（YAML 对缩进敏感）
4. 检查 Front Matter 中的日期格式是否正确

### 24.2 文章不显示

**排查**：
1. 文件名是否符合 `YYYY-MM-DD-slug.md` 格式？
2. Front Matter 中 `published` 是否设为 `false`？
3. 日期是否为未来的日期且 `_config.yml` 中 `future: false`？
4. 文章是否在 `_posts/` 目录中？

### 24.3 项目文档不显示

**排查**：
1. Front Matter 中 `layout` 是否为 `project-item`？
2. 文件是否在 `project/` 目录下？
3. `hidden: true` 或 `published: false` 是否正确？

### 24.4 样式不生效

**排查**：
1. 修改了 LESS 文件后是否运行了 `npx grunt`？
2. 浏览器缓存是否已清除？（Ctrl+Shift+R 强制刷新）
3. CSS 文件路径是否正确？（检查 `<link>` 标签）

### 24.5 数学公式不渲染

**排查**：
1. 文章 Front Matter 中 `mathjax: true` 是否已设置？
2. 块级公式是否被 kramdown 转换为 `\[...\]`？（查看页面源代码确认）MathJax 3 配置中是否包含 `['\\[', '\\]']` 分隔符？
3. 浏览器控制台是否有 MathJax 相关报错？（常见：assistiveMml 导致的 retry 错误）
4. MathJax CDN（jsDelivr）是否可访问？
5. 公式中 `$` 前后是否有空格？（`$ E=mc^2 $` 带空格无法识别）
6. 如果公式在移动端仍超宽，参考 [14.8.1 节](#1481-如何避免-tex-公式超出宽度) 拆分长公式为多行

### 24.6 TikZ 图形不渲染

**排查**：
1. 文章 Front Matter 中 `tikzjax: true` 是否已设置？
2. 浏览器 Network 面板能否成功加载 `assets/tikzjax/tikzjax.js`？
3. 是否在无网络环境下首次访问？（WASM 首次需从服务器下载 ~3.5MB）
4. TikZ 代码语法是否正确？（可先用 [TikZJax 在线编辑器](https://tikzjax-demo.think.somethingorotherwhatever.com/) 测试）
5. 是否使用了不被支持的宏包或 TikZ 库？（参考可用列表）
6. `<script>` 标签的 `type` 属性是否为 `"text/tikz"`？
7. 节点文本是否包含中文或其他非拉丁字符？TikZJax 使用的 Computer Modern 字体不含 CJK 字形，TeX 编译会失败。节点文本应使用英文或数学模式（如 `$f(x)$`）。
8. 图形在移动端显示过小难以阅读？参考 [14.8.2 节](#1482-如何避免-tikz-图形超出宽度)，在绘制时使用 `\linewidth` 等相对宽度而非绝对尺寸

### 24.7 Service Worker 问题

**排查**：
1. `sw.js` 是否在项目根目录？（SW 只能控制同级或子级路径）
2. `_config.yml` 中 `service-worker: true`？
3. 开发模式下 SW 可能行为异常，尝试在生产环境测试

### 24.8 搜索无结果

**排查**：
1. `search.json` 是否正确生成？（访问 `http://localhost:4000/search.json`）
2. 文章 Front Matter 中 `title` 是否存在？

---

## 25. 附录：所有可用参数速查表

### 25.1 _config.yml 所有参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | string | - | 站点名称 |
| `SEOTitle` | string | - | SEO标题 |
| `header-img` | string | - | 默认头图 |
| `email` | string | - | 邮箱 |
| `description` | string | - | 站点描述 |
| `keyword` | string | - | 关键词 |
| `url` | string | `""` | 站点URL |
| `baseurl` | string | `""` | 子路径 |
| `future` | boolean | `true` | 发布未来文章 |
| `RSS` | boolean | `false` | RSS开关 |
| `weibo_username` | boolean/string | `false` | 微博用户名 |
| `zhihu_username` | boolean/string | `false` | 知乎用户名 |
| `github_username` | string | - | GitHub用户名 |
| `gitee_username` | string | - | Gitee用户名 |
| `mail-address` | string | - | 邮箱地址 |
| `highlighter` | string | `rouge` | 代码高亮 |
| `permalink` | string | `pretty` | URL格式 |
| `paginate` | int | `10` | 每页文章数 |
| `exclude` | array | - | 排除目录 |
| `anchorjs` | boolean | `true` | 锚点链接 |
| `markdown` | string | `kramdown` | Markdown引擎 |
| `plugins` | array | `[jekyll-paginate, jekyll-mentions, jekyll-feed, jekyll-sitemap]` | 插件 |
| `disqus_username` | boolean/string | `false` | Disqus评论 |
| `netease_comment` | boolean | `false` | 网易评论 |
| `ga_track_id` | string | (注释) | GA追踪ID |
| `ga_domain` | string | (注释) | GA域名 |
| `ba_track_id` | string | (注释) | 百度统计ID |
| `sidebar` | boolean | `true` | 侧边栏 |
| `sidebar-about-description` | string | - | 个人简介 |
| `sidebar-avatar` | string | - | 头像URL |
| `featured-tags` | boolean | `true` | 特色标签 |
| `featured-condition-size` | int | `1` | 标签阈值 |
| `chrome-tab-theme-color` | string | `"#000000"` | Chrome标签色 |
| `service-worker` | boolean | `true` | PWA开关 |
| `page-mathjax` | boolean | `false` | 全站MathJax |
| `friends` | array | - | 友链列表 |

### 25.2 文章 Front Matter 所有参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `layout` | string | 是 | - | `post` |
| `title` | string | 是 | - | 文章标题 |
| `date` | datetime | 是 | - | 发布日期 |
| `subtitle` | string | 否 | (空) | 副标题 |
| `author` | string | 否 | `site.title` | 作者 |
| `header-img` | string | 否 | `site.header-img` | 头图路径 |
| `header-style` | string | 否 | 默认 | `"text"` = 纯文字 |
| `header-mask` | float | 否 | 0 | 头图蒙版 |
| `header-img-credit` | string | 否 | (空) | 头图署名 |
| `header-img-credit-href` | string | 否 | (空) | 头图署名链接 |
| `tags` | array | 否 | `[]` | 标签列表 |
| `mathjax` | boolean | 否 | `false` | 加载MathJax |
| `tikzjax` | boolean | 否 | `false` | 加载TikZJax |
| `no-catalog` | boolean | 否 | `false` | 隐藏目录 |
| `multilingual` | boolean | 否 | `false` | 双语模式 |
| `content-preview` | boolean | 否 | 否 | 首页预览 |
| `lang` | string | 否 | (空) | `"en"` = 英文 |
| `published` | boolean | 否 | `true` | 是否发布 |
| `hidden` | boolean | 否 | `false` | 归档隐藏 |
| `nav-style` | string | 否 | 默认 | `"invert"` = 导航反色 |
| `plchart` | boolean | 否 | `false` | 嵌入图表 |
| `description` | string | 否 | (空) | 页面描述 |

### 25.3 项目文档 Front Matter 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `layout` | string | 是 | `project-item` / `project-post` |
| `title` | string | 是 | 项目名称 |
| `subtitle` | string | 否 | 简短描述 |
| `author` | string | 否 | 作者 |
| `header-style` | string | 否 | `"text"` 建议 |
| `header-img` | string | 否 | 可选的头图 |
| `tags` | array | 否 | 用于Archive筛选 |
| `date` | datetime | 否 | 用于排序 |
| `hidden` | boolean | 否 | 列表隐藏 |

### 25.4 Markdown 常用语法参考

| 语法 | 效果 |
|------|------|
| `# H1` `## H2` `### H3` | 标题（会自动出现在侧边目录中） |
| `**粗体**` | **粗体** |
| `*斜体*` | *斜体* |
| `~~删除线~~` | ~~删除线~~ |
| `[链接文字](URL)` | 超链接 |
| `![图片描述](URL)` | 图片 |
| `> 引用` | 块引用 |
| `` `行内代码` `` | `行内代码` |
| ` ```语言名 ` 开头结尾 | 代码块（带语法高亮） |
| `- 无序列表` | 无序列表 |
| `1. 有序列表` | 有序列表 |
| `---` | 水平分隔线 |
| `{:target="_blank"}` | 链接新窗口打开 |

---

> **文档维护说明**：本文档覆盖了 Yummy Blog v1.8.2 的所有功能和配置。如有新增功能或参数变更，请同步更新本文档。
>
> 本文档生成于 2026-06-18。
>
> 最后更新：2026-06-28（新增 14.8 移动端溢出适配、滚轮横向滚动功能）。
