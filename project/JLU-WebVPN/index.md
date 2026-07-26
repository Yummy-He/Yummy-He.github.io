---
title: "JLU WebVPN"
subtitle: "吉林大学校园网 WebVPN 地址转换工具——将普通网址转换为深信服 SSL VPN 可访问的内网地址"
layout: project-item
author: "何尹铭"
header-style: text
tags:
  - JavaScript
  - 安全
  - 网络
  - 逆向
date: 2026-07-26
---

## 简介

**JLU WebVPN** 是一个纯前端工具，将深信服 SSL VPN 的 URL 转换算法从前端实现。输入任意网址，一键生成可通过吉林大学校园网 VPN 访问的代理链接。

主要特性：

- **一键转换**：输入网址 → 点击转换 → 复制结果，三步完成
- **智能处理**：短域名（≤16 字节）直接 XOR 加密，长域名自动走短网址服务
- **离线降级**：API 不可用时，支持手动「重新学习」保存映射
- **零依赖**：纯 HTML/CSS/JS，无外部框架，部署在 GitHub Pages

## 快速开始

1. 确保已登录 [JLU WebVPN](https://vpn.jlu.edu.cn)
2. 打开 [网页演示](https://Yummy-He.github.io/JLU-WebVPN)
3. 输入目标网址 → 点击转换 → 复制结果链接
4. 在新标签页打开复制的链接

详细使用方法见 [使用教程](tutorial)。

## 链接

| 资源 | 地址 |
|------|------|
| 网页演示 | [Yummy-He.github.io/JLU-WebVPN](https://Yummy-He.github.io/JLU-WebVPN) |
| 技术博客 | [深信服 SSL VPN URL 加密算法逆向分析](/2026/07/26/jlu-webvpn/) |
| 使用教程 | [JLU-WebVPN 使用教程](tutorial) |
| GitHub 仓库 | [Yummy-He/JLU-WebVPN](https://github.com/Yummy-He/JLU-WebVPN) |

## 技术原理

深信服 SSL VPN 对目标域名使用 **XOR 流密码 + AES-ECB 密钥扩展** 进行加密后嵌入代理 URL，结构为：

```
https://vpn.jlu.edu.cn/{protocol}/{hex_encoded}/{path}
```

本项目将该算法从前端实现——全局密钥流已通过已知明文攻击恢复，所有加密运算在浏览器本地完成。详见 [技术博客](/2026/07/26/jlu-webvpn/)。

## 技术栈

- HTML5 + CSS3 + Vanilla JavaScript
- proxy.cors.sh / Cloudflare Workers（CORS 代理）
- GitHub Pages 部署

## 许可

MIT
