---
layout:     post
title:      "SCORM API 标记完成漏洞分析及复现教程"
subtitle:   "如何在 30 秒内「完成」任何 SCORM 在线课程"
date:       2026-06-18 12:00:00
author:     "何尹铭、Deepseek"
header-img: "img/post-bg/post-bg-20260618.jpg"
header-mask: 0.7
tags:
    - 安全
    - Web
    - E-Learning
---

> 当你花钱买了一门在线课，打开浏览器控制台，执行几行 JavaScript，课程就显示「已完成」——这不是魔法，这是 SCORM 标准的设计缺陷。

## 背景

SCORM (Sharable Content Object Reference Model) 是全球最广泛使用的在线学习标准之一。绝大多数 LMS (Learning Management System) 平台——包括 Moodle、Blackboard、Canvas——都通过 SCORM 来加载和追踪课件内容。

我在研究某知名在线学习平台时，发现了一个普遍存在的安全问题：**SCORM 将课程完成状态的 API 直接暴露在浏览器全局对象上，任何人都可以通过开发者工具直接操控。**

本文将拆解这个漏洞的原理，并提供完整的手动复现教程。

## SCORM 运行时架构

SCORM 的核心是一套 JavaScript API。当 LMS 加载 SCORM 课件时，它会在页面中创建两个关键环境：

```
┌─────────────────────────────────────────┐
│  父页面 (player.php)                    │
│  window.API_1484_11  ← LMS 侧 API       │
│  ┌───────────────────────────────────┐  │
│  │  iframe (课件内容)                │  │
│  │  SCORM2004_SetCompleted()         │  │
│  │  SCORM2004_Finish()               │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**两层 API 结构：**

| 层级 | 位置 | 对象 | 作用 |
|:------:|:------:|:------:|:------:|
| LMS 端 | 父页面 `window` | `API_1484_11` | 与 LMS 后端通信，读写 `cmi.*` 数据 |
| 课件端 | iframe `contentWindow` | `SCORM2004_*` | 课件内部调用的完成检查函数 |

关键点是：**这两层 API 都直接暴露在浏览器中，没有任何鉴权机制。** 浏览器认为当前用户就是合法用户，API 完全信任来自控制台的调用。

## 漏洞原理

SCORM 的设计假设是：课件内容（通常是 Flash 或 HTML5 包）会通过用户交互逐步调用 API 记录进度。但它忽略了一个基本事实——**客户端的一切都是可以被用户控制的**。

完成一门课的流程其实就三步：

1. 调用 `SetValue()` 写入完成状态和成绩
2. 调用 `Commit()` 将数据提交到 LMS
3. 调用 `Terminate()` 结束会话

这三步，没有任何一步需要证明「用户真的看完了课件」。任何人都可以在浏览器控制台里手动执行它们。

## 手动复现教程

### 前置条件

- 一个登录了任意 SCORM 课程平台的浏览器
- 进入课程的 SCORM 播放器页面（通常在 `mod/scorm/player.php`）
- 能打开浏览器开发者工具（F12）

### 步骤一：进入 SCORM 播放器

在课程主页找到 SCORM 类型模块，点击 **Enter** 进入播放器。此时你会看到类似这样的页面结构：iframe 内加载了课件，但你不必真的去翻完它。

### 步骤二：打开控制台

按 `F12` 打开开发者工具，切换到 **Console** 标签。

### 步骤三：逐行执行以下代码

首先，验证 API 是否存在：

```javascript
// 检查 LMS API 是否可用
console.log(window.API_1484_11);

// 检查 iframe 内的 SCORM 函数
var iframe = document.querySelector('iframe');
console.log(iframe.contentWindow.SCORM2004_SetCompleted);
```

如果两个都返回了对象/函数而不是 `undefined`，说明目标存在。

### 步骤四：一键标记完成

将以下代码粘贴到控制台执行：

```javascript
(function() {
  var iframe = document.querySelector('iframe');
  var win = iframe.contentWindow;

  // 在 iframe 侧设置完成
  win.SCORM2004_SetCompleted();

  // 在父页面通过 LMS API 写入完成状态
  window.API_1484_11.SetValue('cmi.completion_status', 'completed');
  window.API_1484_11.SetValue('cmi.success_status', 'passed');

  // 部分 LMS 需要同时设置成绩才接受提交
  window.API_1484_11.SetValue('cmi.score.raw', '100');
  window.API_1484_11.SetValue('cmi.score.scaled', '1');

  // 提交数据到 LMS
  var result = window.API_1484_11.Commit('');
  console.log('Commit result:', result);

  // 正确终止会话
  window.API_1484_11.Terminate('');
  win.SCORM2004_Finish();

  console.log('Done! 刷新课程主页查看效果。');
})();
```

### 步骤五：验证

返回课程主页，刷新页面。你会发现刚才操作的模块已经显示为 **Done ✓**。

整个过程不超过 30 秒。

## 深入分析：为什么 Commit 有时返回 false

在实际测试中，我发现不同的 LMS 实现差异很大。核心问题出在对 SCORM 数据模型校验的严格程度上。

**宽松模式**：大多数 LMS 只检查 `completion_status` 是否为合法值（`completed` / `incomplete` / `not attempted`），写入后直接 `Commit()` 返回 `true`。

**严格模式**：部分 LMS（如某些 Moodle 插件）在 `Commit()` 时会做更复杂的校验：

- 仅设置 `completion_status` 时，`Commit()` 返回 `false`，数据未保存
- 必须同时设置 `cmi.score.raw` 和 `cmi.score.scaled` 后，`Commit()` 才返回 `true`

这也是为什么教程中的代码**同时设置了成绩字段**——这是多轮测试后验证出的最高兼容性写法。

实际测试记录：

| 课程 | 仅设 completion | 加上 score | Commit 结果 |
|:------:|:--:|:--:|:--:|
| ACS Author Lab | `true` | `true` | 两种都成功 |
| ACS Reviewer Lab | `false` | `true` | 需要 score 字段 |

## IFrame 加载时序问题

另一个常见的坑是 **iframe 未完全加载**。SCORM 课件内容在 iframe 中需要时间初始化，如果你在页面刚打开就执行代码，会看到：

```
Uncaught TypeError: SCORM2004_SetCompleted is not a function
```

这是因为 iframe 内的脚本还在执行中。最简单的方法是等 5-8 秒再操作。如果你要用代码检查：

```javascript
// 轮询等待 iframe 就绪
function waitForSCORM(callback) {
  var iframe = document.querySelector('iframe');
  var check = setInterval(function() {
    var win = iframe.contentWindow;
    if (win && win.SCORM2004_SetCompleted) {
      clearInterval(check);
      callback(win);
    }
  }, 500);
}

waitForSCORM(function(win) {
  // 这里执行标记完成的代码
  win.SCORM2004_SetCompleted();
  // ...
});
```

## 漏洞根源与修复方向

这个问题的根源在于 SCORM 标准本身的设计理念：**它把信任完全放在了客户端**。SCORM 1.2 和 SCORM 2004 在设计之初，并未预料到浏览器开发者工具会变得如此普及和强大。

要从根本上修复，LMS 端需要：

1. **服务端验证**：`Commit()` 应该在服务端有监控——如果课件内容承诺的学习时长是 60 分钟，而用户在 3 秒内就标记完成，这显然异常
2. **心跳追踪**：课件应定期向 LMS 报告进度事件（`cmi.progress_measure`、`cmi.location`），服务端记录时间戳序列
3. **不可绕过的事件链**：SCORM 内容的每个关键节点（视频播放完毕、问答题完成）都应该在服务端记录为独立事件，而非仅依赖最终的一个完成标记
4. **SCORM 标准升级**：xAPI (Tin Can) 一定程度上改善了这个问题，它支持服务端签名和更细粒度的语句追踪

但这些修复都需要 LMS 厂商和内容提供商共同努力。在现有生态下，**绝大多数 SCORM 课程依然可以通过本文描述的方法绕过**。

## 结语

这个漏洞不是某个具体平台的 bug，而是 SCORM 标准在浏览器环境下难以避免的问题。只要「完成」的判定依赖客户端 JavaScript，用户就能操控它。

本文的目的不是鼓励作弊——在线学习的价值在于真正掌握知识，绕过课件最终欺骗的是自己。但从安全研究的角度，理解系统边界、认识到哪些设计假设在浏览器环境中不成立，是有价值的思考。

如果你所在的机构使用 SCORM 课程做合规培训或认证考核，建议向 LMS 供应商咨询服务端校验方案，或考虑迁移到 xAPI 等更现代的追踪标准。

---

*本文仅用于安全研究和技术交流。请勿将文中技术用于不正当目的。*
