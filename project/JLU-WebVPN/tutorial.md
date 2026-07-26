---
title: "JLU-WebVPN 使用教程"
subtitle: "网页演示使用说明与故障排查"
layout: project-post
author: "何尹铭"
header-style: text
date: 2024-09-06
---

## 使用方式

1. 确保已登录 [JLU WebVPN](https://vpn.jlu.edu.cn)
2. 打开 [在线工具](https://Yummy-He.github.io/JLU-WebVPN)
3. 输入目标网址 → 点击转换 → 复制结果链接
4. 在新标签页打开复制的链接即可访问

## 故障排查：生成的链接不可用？

如果转换后的链接打不开，可以通过「重新学习」功能修复。操作步骤：

**第 1 步**：确保已登录 [JLU WebVPN](https://vpn.jlu.edu.cn)

![VPN 登录页](/img/in-post/JLU-WebVPN/1-vpn登录页.png)

**第 2 步**：在 VPN 页面中手动打开目标网址（此处以 OA 系统为例）

![选择打开 OA](/img/in-post/JLU-WebVPN/2-选择打开oa.png)

**第 3 步**：从浏览器地址栏复制实际可访问的完整 URL

![OA 页面地址栏](/img/in-post/JLU-WebVPN/3-oa页.png)

**第 4 步**：回到 [转换工具页面](https://Yummy-He.github.io/JLU-WebVPN)，点击左侧「生成的链接不可用？」展开故障排查区域，再点击「开始排查」，填写表单后提交即可。

## 部署自己的实例

### GitHub Pages 部署

```bash
# 仓库：Yummy-He/JLU-WebVPN
# Settings → Pages → Source → Deploy from branch → main 或 gh-pages → Save
```

### 自定义 CORS 代理

如果默认代理 `proxy.cors.sh` 不稳定，可部署自己的 Cloudflare Worker：

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → Create Worker
2. 粘贴 [`proxy/worker.js`](https://github.com/Yummy-He/JLU-WebVPN/blob/main/proxy/worker.js) 内容 → Deploy
3. 复制 Worker URL（如 `https://webvpn-proxy.xxxxx.workers.dev`）
4. 在 `js/config.js` 中将 `CORS_PROXY_URL` 替换为该 URL

### 本地预览

```bash
python3 -m http.server 8080
# 访问 http://localhost:8080
```

## 项目结构

```
├── index.html              # 主页面
├── css/
│   └── style.css           # 全局样式（Apple 风格）
├── js/
│   ├── config.example.js   # 配置文件模板
│   ├── config.js           # 实际配置（不纳入版本控制）
│   ├── app.js              # 主应用逻辑与 UI 控制
│   ├── converter.js        # 转换核心算法
│   ├── shortener.js        # 短网址 API 封装
│   └── learner.js          # 重新学习模块
├── proxy/
│   └── worker.js           # Cloudflare Worker CORS 代理
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions 自动部署
└── fonts/                  # SF Pro 字体文件
```
