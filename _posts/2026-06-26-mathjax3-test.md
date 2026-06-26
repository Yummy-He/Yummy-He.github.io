---
layout: post
title: MathJax 3 公式渲染测试
subtitle: 验证升级后的数学公式功能
date: 2026-06-26
author: Yummy He
header-img: img/home-bg.jpg
mathjax: true
published: false
hidden: true
tags:
  - Test
---

## 行内公式

质能方程 $E = mc^2$ 是爱因斯坦提出的。勾股定理 $a^2 + b^2 = c^2$ 是几何学的基础。

## 独立公式

贝叶斯定理：

$$P(A \mid B) = \frac{P(B \mid A) \, P(A)}{P(B)}$$

傅里叶变换：

$$F(\omega) = \int_{-\infty}^{\infty} f(x) \, e^{-i 2\pi \omega x} \, dx$$

## 带编号的公式

麦克斯韦方程组（高斯定律）：

$$
\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}
\tag{1}
$$

$$
\nabla \times \mathbf{B} - \mu_0 \varepsilon_0 \, \frac{\partial \mathbf{E}}{\partial t} = \mu_0 \mathbf{J}
\tag{2}
$$

## 多行公式

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

## 矩阵

$$
\mathbf{A} = \begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{pmatrix}
$$

## 求和与极限

$$
\sum_{k=1}^{n} k = \frac{n(n+1)}{2}
$$

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

## 希腊字母与符号

行内：$\alpha, \beta, \gamma, \delta, \epsilon, \lambda, \mu, \sigma, \omega$

加粗：$\mathbf{x}, \boldsymbol{\beta}$

## 化学方程式（mhchem）

$$x \, \ce{^{2}H} + y \, \ce{^{3}H} \to \ce{^{4}He} + n + 17.6\,\text{MeV}$$

---

> 如果以上所有公式都能正常渲染，说明 MathJax 3 升级成功。
