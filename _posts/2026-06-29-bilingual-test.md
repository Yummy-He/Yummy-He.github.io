---
layout: post
title: 中英双语功能测试
subtitle: |
  Bilingual Feature Test
  一则科技新闻的双语呈现
date: 2026-06-29
author: Yummy He
header-img: img/home-bg.jpg
multilingual: true
published: true
hidden: true
tags:
  - Test
---

<div class="zh post-container" lang="zh" markdown="1">

> 测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本。

## NASA 毅力号在火星发现远古有机分子

美国宇航局（NASA）的**毅力号**火星车在杰泽罗陨石坑的岩石样本中检测到了多种**复杂有机分子**，为火星远古时期可能曾存在生命提供了新的线索。

这批样本采集自杰泽罗陨石坑边缘一处名为"蛇纹石急流"（Serpentine Rapids）的区域。科学家利用火星车搭载的 **SHERLOC** 光谱仪（用拉曼光谱与荧光扫描宜居环境中的有机物与化学物质），在岩石中识别出了包含**羧酸类、芳香族化合物**在内的多种有机分子。

> "这并非首次在火星上发现有机物，但这次发现的分子种类之丰富、信号之清晰，令人振奋。" —— 项目科学家 Ken Farley 教授

这些有机分子的存在有多种可能的解释：
- 可能来源于远古火星的**生物活动**
- 也可能是地质化学过程（如火山活动或陨石撞击）的产物
- 还可能由彗星或小行星携带至火星表面

### 为什么杰泽罗陨石坑很重要？

杰泽罗陨石坑是经过精心挑选的着陆点。数十亿年前，这里曾是一个**湖泊**，有河流注入形成三角洲——与地球上容易保存生命痕迹的环境极为相似。

```python
# 科学家使用机器学习筛选有机物信号
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100)
model.fit(spectral_data, known_labels)
predictions = model.predict(unlabeled_spectra)
```

### 后续计划

| 任务阶段 | 时间 | 内容 |
|:--------:|:----:|:----:|
| 采样收集 | 2023-2026 | 采集并封装岩石样本 |
| 样本返回 | 2030s | NASA-ESA 联合任务带回地球 |
| 实验室分析 | 2033+ | 地球实验室精细分析 |

NASA 与欧洲航天局（ESA）合作的**火星样本返回计划**（Mars Sample Return）将把这些珍贵的样本带回地球，届时科学家可以在实验室中进行更加精确的分析——那或许将是我们距离"火星是否曾有生命"这一问题答案最近的时刻。

</div>

<div class="en post-container" lang="en" markdown="1">

## NASA's Perseverance Rover Finds Ancient Organic Molecules on Mars

NASA's **Perseverance** rover has detected a variety of **complex organic molecules** in rock samples from Jezero Crater, providing new clues that ancient Mars may have once harbored life.

The samples were collected from an area called "Serpentine Rapids" at the edge of Jezero Crater. Using the rover's onboard **SHERLOC** spectrometer (Scanning Habitable Environments with Raman &amp; Luminescence for Organics &amp; Chemicals), scientists identified multiple organic molecules including **carboxylic acids** and **aromatic compounds**.

> "This is not the first time organics have been found on Mars, but the richness of molecular species and the clarity of the signals this time is truly exciting." — Professor Ken Farley, Project Scientist

The presence of these organic molecules has several possible explanations:
- They could originate from **biological activity** on ancient Mars
- They may be products of geochemical processes (such as volcanic activity or meteorite impacts)
- They might have been delivered to the Martian surface by comets or asteroids

### Why Jezero Crater Matters

Jezero Crater was a carefully chosen landing site. Billions of years ago, it was a **lake** with a river feeding into it, forming a delta — an environment remarkably similar to places on Earth where evidence of life is well-preserved.

```python
# Scientists use machine learning to filter organic signatures
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100)
model.fit(spectral_data, known_labels)
predictions = model.predict(unlabeled_spectra)
```

### Next Steps

| Mission Phase | Timeline | Description |
|:------------:|:-------:|:------------|
| Sample Collection | 2023-2026 | Collect and seal rock samples |
| Sample Return | 2030s | Joint NASA-ESA mission to bring samples back |
| Lab Analysis | 2033+ | Detailed analysis in Earth laboratories |

NASA and ESA's **Mars Sample Return** campaign will bring these precious samples back to Earth, where scientists can perform far more precise analyses in laboratories — perhaps bringing us closer than ever to answering the question: "Did Mars ever host life?"

</div>
