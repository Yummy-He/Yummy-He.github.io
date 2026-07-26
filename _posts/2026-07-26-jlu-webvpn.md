---
layout:     post
title:      "深信服 SSL VPN URL 加密算法逆向分析"
subtitle:   "以吉林大学 WebVPN 为例，将任意网址一键转换为校园网可访问地址"
date:       2026-07-26 12:00:00
author:     "何尹铭"
header-img: "img/post-bg/post-bg-20260726.jpg"
header-mask: 0.2
tags:
    - 安全
    - 网络
    - 逆向
    - Web
---

> 吉林大学的 WebVPN 会在地址栏里生成一串神秘 hex——这串字符背后，是一套 XOR 流密码 + AES-ECB 密钥扩展的加密机制。我把它完整逆向出来了。

## 背景

吉林大学使用深信服 SSL VPN 系统，允许师生在校外访问内网资源（如图书馆数据库、OA 系统）。当你通过 VPN 访问一个网址时，浏览器地址栏的 URL 会变成这样：

```
原始: https://iedu.jlu.edu.cn/jwapp/sys/emaphome/portal/index.do
VPN:  https://vpn.jlu.edu.cn/https/48714f71...a42f1/jwapp/sys/emaphome/portal/index.do
```

VPN 把原始域名替换成了一串 hex 字符串，路径部分保持不变。本文记录了对这套编码机制的完整逆向分析，以及一个前端工具的实现。

## 相关链接

| 资源 | 地址 |
|------|------|
| 网页演示 | [Yummy-He.github.io/JLU-WebVPN](https://Yummy-He.github.io/JLU-WebVPN) |
| 使用教程 | [JLU-WebVPN 使用教程](tutorial) |
| GitHub 仓库 | [Yummy-He/JLU-WebVPN](https://github.com/Yummy-He/JLU-WebVPN) |

## URL 结构分析

VPN URL 的结构可以拆解为：

```
https://vpn.jlu.edu.cn/{protocol}/{hex_encoded}{original_path}
```

其中 `hex_encoded` 正是我们关注的核心。通过对比同一次 VPN 会话中的 7 个样本：

| 主机名 | 长度（字节） | 编码长度（字节） |
|--------|------------|----------------|
| oa.jlu.edu.cn | 14 | 30 |
| lib.jlu.edu.cn | 14 | 30 |
| iedu.jlu.edu.cn | 15 | 31 |
| ievaluate.jlu.edu.cn | 20 | 36 |
| g.wanfangdata.com.cn | 20 | 36 |
| pubmed.ncbi.nlm.nih.gov | 23 | 39 |
| webofscience.clarivate.cn | 25 | 41 |

**关键发现：编码长度 = 16 + 主机名长度**。多出来的 16 字节在所有样本中完全相同，说明存在一个固定的「前缀」。

## 已知明文攻击

既然 URL 中的域名是已知的明文，而 hex 编码区是密文，如果加密方式是 XOR，我们可以直接反推密钥：

```
密钥[i] = 密文[16+i] XOR 主机名[i]
```

对全部 7 个样本提取密钥流后，发现了密钥的分层结构：

```
+-------------+--------------------+------------------------+
| 前缀 (16B)  | 全局密钥流 (16B)   | 域名扩展密钥流 (可变)  |
| 固定不变    | 跨用户/跨会话一致  | 每个域名独立           |
| 位置 0-15   | 位置 16-31         | 位置 32+               |
+-------------+--------------------+------------------------+
```

位置 16-31 的密钥字节在**所有样本中完全一致**，证明存在一个全局密钥流：

```
全局密钥流 (hex): 3fac137a68aaaec5d1e2327874219f58
前缀 (hex):       48714f71342f7a336d582f7e28573737
```

这意味着：**任何 ≤16 字节的域名，只需全局密钥流即可直接生成 VPN URL，无需任何预先学习。**

### 加密过程

```
1. 目标域名编码为 UTF-8 字节序列
2. 取全局密钥流的前 len(域名) 字节
3. 逐字节 XOR：enc[i] = domain[i] XOR key[i]
4. 拼接：result = 前缀 + enc
5. 输出 hex 字符串
```

以 `oa.jlu.edu.cn` 为例：

```
domain = 6f 61 2e 6a 6c 75 2e 65 64 75 2e 63 6e
key    = 3f ac 13 7a 68 aa ae c5 d1 e2 32 78 74 21
enc    = 50 cd 3d 10 04 df 80 a0 b5 97 1c 1b 1a

result = 48714f71342f7a336d582f7e28573737 50cd3d1004df80a0b5971c1b1a
```

完整 VPN URL：
```
https://vpn.jlu.edu.cn/https/48714f71342f7a336d582f7e2857373750cd3d1004df80a0b5971c1b1a/xxgk.jsp
```

## 域名扩展密钥流（位置 32+）

对于超过 16 字节的域名（如 `webofscience.clarivate.cn`，27 字节），仅靠全局密钥流不够。位置 32+ 的密钥流在不同域名间不可推导。

我测试了以下假设，全部排除：

- 与全局密钥流的线性关系（每个域名算出不同的系数）
- MD5/SHA256（主机名）取前 N 字节
- MD5（前缀）或 MD5（前 16 字节密文块）
- CRC32 校验

最终推测：**域名扩展密钥流 = AES-ECB（设备密钥，前 16 字节密文块）的前 N 字节**。这解释了为什么不同域名的扩展密钥不同——每个域名前 16 字节密文块唯一，AES 输出自然也各不相同。

不过，AES-128 设备密钥的暴力破解（2^128 密钥空间）不可行。庆幸的是，通过跨用户验证发现，密钥与用户身份、VPN 会话无关——另一名同学访问同一域名的 hex 完全一致，证明这是深信服设备固件中硬编码的值。

## 工具实现：短网址方案

既然无法直接计算长域名的扩展密钥，我设计了一套替代方案：**长域名先走短网址服务生成短链，再对短域名做 XOR 转换**。

### 整体流程

```
用户输入 URL
  │
  ├── 域名 ≤ 16 字节 ──→ XOR 加密 ──→ 输出 VPN URL
  │
  └── 域名 > 16 字节
        │
        ├── 缓存命中？──→ 直接返回
        │
        └── 缓存未命中
              │
              └── 调用短网址 API（通过 CORS 代理）
                    │
                    ├── 成功：对短域名 XOR ──→ 输出
                    │
                    └── 失败：提示用户手动「重新学习」
```

### 为什么选短网址而非扩展密钥？

| 方案 | 优点 | 缺点 |
|------|------|------|
| 扩展密钥 | 一步到位，无需外部 API | 每个长域名需预先采集样本学习 |
| 短网址 API | 自动覆盖所有长域名 | 依赖外部服务，多一次网络请求 |

对普通用户来说，「开箱即用」比理论优雅更重要。

### 短网址 API 与 CORS

使用 urlc.cn 的短网址 API：

```javascript
// POST https://www.urlc.cn/api/url/add
// Body: {"url": "https://pubmed.ncbi.nlm.nih.gov"}
// → {"error": 0, "short": "http://i8c.cn/IlgJ9"}
```

短域名 `i8c.cn` 仅 7 字节，可直接用全局密钥 XOR。但 urlc.cn API 不返回 CORS 头，浏览器会拦截前端 fetch 请求。解决方案是通过 `proxy.cors.sh` 公共 CORS 代理转发，它会在响应中注入 `Access-Control-Allow-Origin: *`。

### 离线降级：重新学习

短网址 API 和 CORS 代理都存在不确定性。为此实现了映射缓存机制——用户可通过「重新学习」功能手动提交 VPN 实际可用的 URL，存入 `localStorage`，下次自动命中缓存。

## 验证数据

以下测试向量可验证 XOR 实现的正确性：

| 域名 | 预期 hex |
|------|----------|
| `oa.jlu.edu.cn` | `48714f71342f7a336d582f7e2857373750cd3d1004df80a0b5971c1b1a` |
| `lib.jlu.edu.cn` | `48714f71342f7a336d582f7e2857373753c5715402c6dbebb4864756174f` |
| `iedu.jlu.edu.cn` | `48714f71342f7a336d582f7e2857373756c9770f46c0c2b0ff87560d5a42f1` |
| `baidu.com` | `48714f71342f7a336d582f7e285737375dcd7a1e1d84cdaabc` |

## 架构

- **纯前端**：HTML5 + CSS3 + Vanilla JavaScript（零依赖）
- **部署**：GitHub Pages 静态站点
- **代理**：proxy.cors.sh（公共 CORS 代理）/ Cloudflare Workers（自建）

模块划分：

| 文件 | 职责 |
|------|------|
| `converter.js` | URL 解析、XOR 加密转写 |
| `shortener.js` | 短网址 API 调用（通过 CORS 代理） |
| `learner.js` | 映射缓存（localStorage 读写） |
| `app.js` | UI 控制、事件绑定、流程编排 |
| `config.js` | API 密钥和代理地址配置 |

## 总结

这套深信服 VPN 的 URL 编码机制本质上是一个 **XOR 流密码 + AES-ECB 密钥扩展**的两层架构。全局密钥流（16 字节）对短域名即可完成转写，长域名则需要设备密钥参与的 AES 扩展——但设备密钥不可爆破。

通过引入短网址服务作为中间层，绕过了扩展密钥的限制，实现了任意域名的零样本 VPN 链接生成。整个工具纯前端运行，部署在 GitHub Pages 上，零运维成本。

如果你也是吉大学生，欢迎试用 [JLU WebVPN 转换工具](https://Yummy-He.github.io/JLU-WebVPN)，任何问题或建议欢迎在 [GitHub Issues](https://github.com/Yummy-He/JLU-WebVPN/issues) 提出。
