---
layout: post
title: MathJax 3 公式渲染测试
subtitle: 验证升级后的数学公式功能
date: 2026-06-26
author: Yummy He
header-img: img/home-bg.jpg
mathjax: true
tikzjax: true
published: true
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

$$F(\omega) = \int_{-\infty}^{\infty} f(x) \, e^{-i 2\pi \omega x} \, dx F(\omega) = \int_{-\infty}^{\infty} f(x) \, e^{-i 2\pi \omega x} \, dx F(\omega) = \int_{-\infty}^{\infty} f(x) \, e^{-i 2\pi \omega x} \, dx F(\omega) = \int_{-\infty}^{\infty} f(x) \, e^{-i 2\pi \omega x} \, dx F(\omega) = \int_{-\infty}^{\infty} f(x) \, e^{-i 2\pi \omega x} \, dx$$

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

---

## TikZJax 图形渲染测试

### 基础图形

坐标轴与圆：

<script type="text/tikz">
\begin{tikzpicture}
  \draw[->, thick] (-2,0) -- (3,0) node[right] {$x$};
  \draw[->, thick] (0,-2) -- (0,3) node[above] {$y$};
  \draw[blue, thick] (0,0) circle (1.5);
  \draw[red, dashed] (0,0) -- (1.06, 1.06);
  \node[below left] at (0,0) {$O$};
  \node[above right] at (0.75,0.75) {$r=1.5$};
\end{tikzpicture}
</script>

### 函数图像

使用 pgfplots 绘制 $\sin(x)$ 函数：

<script type="text/tikz" data-tex-packages='{"pgfplots":""}'>
\begin{tikzpicture}
  \begin{axis}[
    width=10cm, height=6cm,
    xlabel={$x$}, ylabel={$f(x)$},
    grid=major, domain=-2*pi:2*pi,
    legend pos=north west]
    \addplot[blue, thick, samples=100] {sin(deg(x))};
    \addlegendentry{$\sin(x)$}
    \addplot[red, dashed, samples=100] {cos(deg(x))};
    \addlegendentry{$\cos(x)$}
  \end{axis}
\end{tikzpicture}
</script>

### 箭头测试（arrows.meta）

<script type="text/tikz" data-tikz-libraries="arrows.meta">
\begin{tikzpicture}
  \draw[->, >=Stealth, thick] (0,0) -- (2,0) node[right] {Stealth};
  \draw[->, >=Latex, thick] (0,-1) -- (2,-1) node[right] {Latex};
  \draw[->, >=Triangle, thick] (0,-2) -- (2,-2) node[right] {Triangle};
\end{tikzpicture}
</script>

### 流程图（纯基础 TikZ）

<script type="text/tikz">
\begin{tikzpicture}[
  box/.style={draw, rounded corners, minimum width=2.5cm, minimum height=0.8cm}]

  \node[box] (input) at (0,0) {Input};
  \node[box] (process) at (4,0) {Process};
  \node[box] (output) at (8,0) {Output};

  \draw[->, thick] (input) -- (process);
  \draw[->, thick] (process) -- (output);
\end{tikzpicture}
</script>

### 3D 示例

<script type="text/tikz" data-tex-packages='{"tikz-3dplot":""}'>
\begin{tikzpicture}
  \draw[->, thick] (0,0,0) -- (2,0,0) node[right] {$x$};
  \draw[->, thick] (0,0,0) -- (0,2,0) node[above] {$y$};
  \draw[->, thick] (0,0,0) -- (0,0,2) node[below left] {$z$};

  \fill[blue, opacity=0.3] (0,0,0) -- (1.5,0,0) -- (1.5,1,0) -- (0,1,0) -- cycle;
  \draw[blue, thick] (0,0,0) -- (1.5,0,0) -- (1.5,1,0) -- (0,1,0) -- cycle;

  \node[above right] at (0.75,0.5,0) {$\pi: z=0$};
\end{tikzpicture}
</script>

### 实测示例：Vim 模式切换图

<script type="text/tikz" data-tex-packages='{"amsmath":""}'>
\begin{tikzpicture}[x=0.75pt,y=0.75pt,yscale=-1,xscale=1]

%Shape: Rectangle
\draw   (270,39.67) -- (411.67,39.67) -- (411.67,94.5) -- (270,94.5) -- cycle ;
%Shape: Rectangle
\draw   (106.67,192.67) -- (248.33,192.67) -- (248.33,247.5) -- (106.67,247.5) -- cycle ;
%Shape: Rectangle
\draw   (434,192.33) -- (575.67,192.33) -- (575.67,247.17) -- (434,247.17) -- cycle ;
%Straight Lines
\draw    (270,94.5) -- (218.12,183.83) ;
\draw [shift={(217.11,185.56)}, rotate = 300.15] [red][line width=0.75]    (10.93,-3.29) .. controls (6.95,-1.4) and (3.31,-0.3) .. (0,0) .. controls (3.31,0.3) and (6.95,1.4) .. (10.93,3.29)   ;
%Straight Lines
\draw    (411.67,94.5) -- (464.75,183.17) ;
\draw [shift={(465.78,184.89)}, rotate = 239.09] [red][line width=0.75]    (10.93,-3.29) .. controls (6.95,-1.4) and (3.31,-0.3) .. (0,0) .. controls (3.31,0.3) and (6.95,1.4) .. (10.93,3.29)   ;
%Straight Lines
\draw    (454.44,184.89) -- (402.15,99.26) ;
\draw [shift={(401.11,97.56)}, rotate = 58.59] [red][line width=0.75]    (10.93,-3.29) .. controls (6.95,-1.4) and (3.31,-0.3) .. (0,0) .. controls (3.31,0.3) and (6.95,1.4) .. (10.93,3.29)   ;
%Straight Lines
\draw    (228.44,186.22) -- (278.77,99.95) ;
\draw [shift={(279.78,98.22)}, rotate = 120.26] [red][line width=0.75]    (10.93,-3.29) .. controls (6.95,-1.4) and (3.31,-0.3) .. (0,0) .. controls (3.31,0.3) and (6.95,1.4) .. (10.93,3.29)   ;

% Text Node
\draw (306,58.67) node [anchor=north west][inner sep=0.75pt] [align=left] {${\mathrm{Normal}}$};
% Text Node
\draw (145,211.67) node [anchor=north west][inner sep=0.75pt] [align=left] {${\text{Insert}}$};
% Text Node
\draw (450.67,211.67) node [anchor=north west][inner sep=0.75pt] [align=left] {${\text{CmdLine}}$};
% Text Node
\draw (266.44,141.89) node [anchor=north west][inner sep=0.75pt] [red] [align=left] {Esc};
% Text Node
\draw (390.44,141.22) node [anchor=north west][inner sep=0.75pt] [red] [align=left] {Esc};
% Text Node
\draw (133,141.33) node [anchor=north west][inner sep=0.75pt] [align=left] {\textcolor{red}{i}, \textcolor{red}{o}, O, a, r, R};
% Text Node
\draw (464.33,141.33) node [anchor=north west][inner sep=0.75pt] [align=left] {\textcolor{red}{:}, /, ?};

\end{tikzpicture}
</script>

> 如果以上所有 TikZ 图形都能正常渲染，说明 TikZJax 集成成功。

---

## 代码高亮测试

### Python

```python
import numpy as np
from scipy.optimize import minimize


def rosenbrock(x: np.ndarray) -> float:
    """Rosenbrock 香蕉函数"""
    return (1 - x[0])**2 + 100 * (x[1] - x[0]**2)**2


class Optimizer:
    def __init__(self, method: str = "BFGS"):
        self.method = method
        self.result = None

    def minimize(self, func, x0, tol=1e-6):
        """最小化标量函数"""
        self.result = minimize(func, x0, method=self.method, tol=tol)
        return self.result.x


if __name__ == "__main__":
    opt = Optimizer()
    x_opt = opt.minimize(rosenbrock, np.array([-1.0, 1.0]))
    print(f"最优解: x = {x_opt}")  # 应为 (1, 1)
```

### Fortran

```fortran
module linear_algebra
  implicit none
  integer, parameter :: dp = selected_real_kind(15, 307)

contains

  !> 计算矩阵-向量乘积  y = A*x
  subroutine matvec(A, x, y, n)
    integer, intent(in)    :: n
    real(dp), intent(in)   :: A(n,n), x(n)
    real(dp), intent(out)  :: y(n)
    integer :: i, j
    real(dp) :: s

    do i = 1, n
      s = 0.0_dp
      do j = 1, n
        s = s + A(i,j) * x(j)
      end do
      y(i) = s
    end do
  end subroutine matvec

  !> 求解器主程序
  subroutine solve(n, A, b, x, info)
    integer, intent(in)    :: n
    real(dp), intent(in)   :: A(n,n), b(n)
    real(dp), intent(out)  :: x(n)
    integer, intent(out)   :: info
    real(dp), allocatable  :: lu(:,:)
    integer, allocatable   :: ipiv(:)

    allocate(lu(n,n), ipiv(n))
    lu = A
    x = b
    call dgesv(n, 1, lu, n, ipiv, x, n, info)
    deallocate(lu, ipiv)
  end subroutine solve

end module linear_algebra
```

### MATLAB

```matlab
function [x_opt, f_val, history] = gradient_descent(f, gradf, x0, opts)
    % GRADIENT_DESCENT  梯度下降优化器
    %
    % 用法:
    %   [x_opt, f_val, history] = gradient_descent(@f, @gradf, x0, opts)
    %
    % 输入:
    %   f     - 目标函数句柄
    %   gradf - 梯度函数句柄
    %   x0    - 初始点
    %   opts  - 选项结构体 (lr, max_iter, tol)

    arguments
        f function_handle
        gradf function_handle
        x0 (:,1) double
        opts.lr (1,1) double = 1e-3
        opts.max_iter (1,1) double = 1000
        opts.tol (1,1) double = 1e-6
    end

    x = x0;
    history = zeros(length(x0), opts.max_iter);

    for k = 1:opts.max_iter
        g = gradf(x);                  % 计算梯度
        x = x - opts.lr * g;           % 更新参数
        history(:,k) = x;

        if norm(g) < opts.tol          % 收敛判据
            break;
        end
    end

    x_opt = x;
    f_val = f(x_opt);
    history = history(:, 1:k);
    fprintf('迭代 %d 步, f(x) = %.6e\n', k, f_val);
end
```