---
title: 机器人学入门笔记
url: https://blog.kisechan.space/2026/robotics/
type: post
time: '2026-10-22T16:41:52.395Z'
---

机器人学主要包含三个方面：

- **描述一个物体的坐标**
- **运动学**
  - **顺运动学**：根据肌肉等的状态知道“手”的位置和动作
  - **逆运动学**：根据想要的动作，逆解出肌肉的状态
- **运动轨迹问题**

## 旋转矩阵

描述一个平面中的物体需要三个自由度，即 $x$ 轴、$y$ 轴和转动，同理，描述三维中的物体就需要六个自由度，即 $x$ 轴、$y$ 轴、$z$ 轴和三种相应的转动。

要描述一个三维空间的物体，可以在质心标记它的位置，要记录它的转动形态，就可以在质心上建立三个坐标（body frame），然后计算它们和世界坐标（world frame）的投影：

![](https://images.kisechan.space/20260326162921588.webp)

其中，$^A_BR$ 表示 body frame $B$ 对 world frame $A$ 的坐标，依次用 $X$、$Y$、$Z$ 的 column vector （长度都是 1）表示，也表示三主轴对 frame $A$ 的投影。叫做**旋转矩阵**。

可以得到一个特性：

$$
\begin{align*}
{}^{A}_{B}R &=
\begin{bmatrix}
\hat{X}_A \cdot \hat{X}_B & \hat{X}_A \cdot \hat{Y}_B & \hat{X}_A \cdot \hat{Z}_B \\
\hat{Y}_A \cdot \hat{X}_B & \hat{Y}_A \cdot \hat{Y}_B & \hat{Y}_A \cdot \hat{Z}_B \\
\hat{Z}_A \cdot \hat{X}_B & \hat{Z}_A \cdot \hat{Y}_B & \hat{Z}_A \cdot \hat{Z}_B
\end{bmatrix}
\\
&=
\begin{bmatrix}
\hat{X}_B \cdot \hat{X}_A & \hat{Y}_B \cdot \hat{X}_A & \hat{Z}_B \cdot \hat{X}_A \\
\hat{X}_B \cdot \hat{Y}_A & \hat{Y}_B \cdot \hat{Y}_A & \hat{Z}_B \cdot \hat{Y}_A \\
\hat{X}_B \cdot \hat{Z}_A & \hat{Y}_B \cdot \hat{Z}_A & \hat{Z}_B \cdot \hat{Z}_A
\end{bmatrix}
\\
&=
\begin{bmatrix}
\hat{X}_B \cdot \hat{X}_A & \hat{X}_B \cdot \hat{Y}_A & \hat{X}_B \cdot \hat{Z}_A \\
\hat{Y}_B \cdot \hat{X}_A & \hat{Y}_B \cdot \hat{Y}_A & \hat{Y}_B \cdot \hat{Z}_A \\
\hat{Z}_B \cdot \hat{X}_A & \hat{Z}_B \cdot \hat{Y}_A & \hat{Z}_B \cdot \hat{Z}_A
\end{bmatrix}^ T
\\
&= ({}^{B}_{A}R)^{T}
\end{align*}

\\
\Rightarrow
\boxed{^A_BR= {}^{B}_{A}R^{T}}
$$

而且显然可以得到：

$$
^A_B R^ T \cdot ^A_BR^T =I_3
$$

所以旋转矩阵属于**正交矩阵**，它的逆可以很简单地得到：

$$
R^{-1}=R^T
$$

正交矩阵的行列式 $|R|=\pm 1$，

- **当 $|R|=1$ 时，该操作为纯旋转**
- **当 $|R|=-1$ 时，该操作为反射，包含了镜像，改变了坐标系的手性**

---

另外，虽然这里 $R$ 有九个数字，但是它需要满足：

- 组成它们的方向向量模长为 1
- 方向向量互相垂直

这就嵌入了六个条件，相当于九元方程组已经有了六个确定的方程，还剩三个方程组，也就和“需要三个自由度”是等价的了。

### Fixed angle 旋转

Fixed angle 旋转指的是这个物体**依次绕空间中固定不动的坐标轴**（world frame）进行旋转，最后也可以得到一个旋转矩阵。

绕固定坐标系 $X,Y,Z$ 轴旋转角度 $\alpha,\beta,\gamma$，则对应的基本旋转矩阵为：

$$
R_x(\alpha)=
\begin{bmatrix}
1 & 0 & 0\\
0 & \cos\alpha & -\sin\alpha\\
0 & \sin\alpha & \cos\alpha
\end{bmatrix}
\\

R_y(\beta)=
\begin{bmatrix}
\cos\beta & 0 & \sin\beta\\
0 & 1 & 0\\
-\sin\beta & 0 & \cos\beta
\end{bmatrix}
\\
R_z(\gamma)=
\begin{bmatrix}
\cos\gamma & -\sin\gamma & 0\\
\sin\gamma & \cos\gamma & 0\\
0 & 0 & 1
\end{bmatrix}
$$

若使用 Fixed angle，按绕 $X$轴、$Y$ 轴、$Z$ 轴的旋转顺序分别旋转角度 $\alpha,\beta,\gamma$，它的整体旋转矩阵为

$$
\begin{align*}
R &= R_z(\gamma)\,R_y(\beta)\,R_x(\alpha)\\
&= \begin{bmatrix}
\cos\gamma & -\sin\gamma & 0\\
\sin\gamma & \cos\gamma & 0\\
0 & 0 & 1
\end{bmatrix}\cdot
\begin{bmatrix}
\cos\beta & 0 & \sin\beta\\
0 & 1 & 0\\
-\sin\beta & 0 & \cos\beta
\end{bmatrix}
\cdot\begin{bmatrix}
1 & 0 & 0\\
0 & \cos\alpha & -\sin\alpha\\
0 & \sin\alpha & \cos\alpha
\end{bmatrix}
\\&=

\begin{bmatrix}
c_\gamma c_\beta &
c_\gamma s_\beta s_\alpha - s_\gamma c_\alpha &
c_\gamma s_\beta c_\alpha + s_\gamma s_\alpha \\

s_\gamma c_\beta &
s_\gamma s_\beta s_\alpha + c_\gamma c_\alpha &
s_\gamma s_\beta c_\alpha - c_\gamma s_\alpha \\

- s_\beta &
c_\beta s_\alpha &
c_\beta c_\alpha
\end{bmatrix}

\text{，其中，$c_\theta=\cos\theta, s_\theta=\sin\theta$}
\\&=\textcolor{red}{
\begin{bmatrix}
r_{11} & r_{12} & r_{13}\\
r_{21} & r_{22} & r_{23}\\
r_{31} & r_{32} & r_{33}\\
\end{bmatrix}}
\end{align*}
$$

那么同时也可以通过得到的 $R=\begin{bmatrix}
r_{11} & r_{12} & r_{13}\\
r_{21} & r_{22} & r_{23}\\
r_{31} & r_{32} & r_{33}\\
\end{bmatrix}$，反推出三个角的值。当 $\beta\ne 90\degree$ 时[^1]，可以得到下面的解：

$$
\begin{align*}
\beta &= \mathrm{atan2}(-r_{31}, \sqrt{r_{11}^2+r_{21}^2}),\\
\alpha &= \mathrm{atan2}(r_{21} / c_\beta, r_{11} / c_\beta),\\
\gamma &= \mathrm{atan2}(r_{32} / c_\beta, r_{33} / c_\beta)
\end{align*}
$$

$\beta=\pm 90\degree$ 时可以得到*其中一组*比较特别的解：

$$
\begin{cases}
\beta=90\degree \\
\alpha=0\\
\gamma=\mathrm{atan2}(r_{12}, r_{22})
\end{cases}
\qquad
\begin{cases}
\beta=-90\degree \\
\alpha=0\\
\gamma=-\mathrm{atan2}(r_{12}, r_{22})
\end{cases}
$$

另外需要注意，虽然描述顺序是 $X \rightarrow Y \rightarrow Z$，但矩阵乘法顺序是**从右往左的**，因为后发生的旋转在左侧。

[^1]: 因为等于 90 度的时候这个解就不唯一了，这个叫**万向节锁**。

### Euler angle 旋转

Euler angle 旋转就是绕**当前坐标轴** $Z$、$Y$、$X$ 进行旋转，注意这里的轴是物体自己的轴，会随旋转变化。

它可以和 fixed angle 旋转对应起来：

$$
\text{Fixed } XYZ \equiv \text{Euler } ZYX
$$

但是一般使用 $ZYZ$ Euler angle 旋转来举例。例如旋转过程为：

- 绕 $Z$ 轴旋转 $\alpha$，
- 绕新的 $Y$ 轴旋转 $\beta$，
- 绕新的 $Z$ 轴旋转 $\gamma$，

就可以得到对应的旋转矩阵，注意这里是先旋转的操作放在左边了：

$$
R = R_z(\alpha)\,R_y(\beta)\,R_z(\gamma)
$$

同理可以得到解：

$$
\begin{cases}
\beta &= \mathrm{atan2}(\sqrt{r_{31}^2+r_{32}^2}, r_{33})\ne 0\\
\alpha &= \mathrm{atan2}(r_{23} / s_\beta, r_{13} / s_\beta)\\
\gamma &= \mathrm{atan2}(r_{32} / s_\beta, -r_{31} / s_\beta)
\end{cases}
\qquad
\begin{cases}
\beta&=90\degree \\
\alpha&=0\\
\gamma&=\mathrm{atan2}(-r_{12}, r_{11})
\end{cases}
\qquad
\begin{cases}
\beta&=180\degree \\
\alpha&=0\\
\gamma&=-\mathrm{atan2}(r_{12}, -r_{11})
\end{cases}
$$

### Homogeneous transformation matrix

那要同时表示移动和转动该怎么办呢？把它们放在同一个矩阵里面就好了：

$$
{}^{A}_{B}T =
\begin{bmatrix}
^A_BR & ^A p_B \\
0 & 1
\end{bmatrix}
=
\begin{bmatrix}
r_{11} & r_{12} & r_{13} & p_x \\
r_{21} & r_{22} & r_{23} & p_y \\
r_{31} & r_{32} & r_{33} & p_z \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

其中，

- $R$ 表示坐标系 $B$ 相对于 $A$ 的**旋转**
- $p$ 表示坐标系 $B$ 在 $A$ 坐标系中的**位置**

如果点 $P$ 在坐标系 $B$ 中表示为 $_BP$，则在坐标系 $A$ 中为

$$
_AP = {}^{A}_{B}T\cdot_AP
$$

也就是说，

$$
\begin{bmatrix}
x_A\\y_A\\z_A\\1
\end{bmatrix}
=
\begin{bmatrix}
R & p\\
0 & 1
\end{bmatrix}
\begin{bmatrix}
x_B\\y_B\\z_B\\1
\end{bmatrix}
$$

展开得到，

$$
p_A = R\,p_B + p
$$

主要的性质就是多个坐标变换可以通过矩阵乘法组合。例如

$$
{}^{A}_{C}T = {}^{A}_{B}T \, {}^{B}_{C}T
$$

同时它的逆为 $
^A_BT^{-1}=
\begin{bmatrix}
^A_BR^T & -^A_BR^T p_B\\
0 & 1
\end{bmatrix}
$。

#### 乘法规则

![](https://images.kisechan.space/20260330223802383.png)

主要是为了区分两种情况：

1. 相对于**固定坐标系**旋转（premultiply）
2. 相对于**自身坐标系**旋转（postmultiply）

这两个不同就决定了矩阵应该左乘还是右乘，本质上就和之前的两种旋转一样。

## 顺向运动学

所谓运动学，就是只讨论运动状态本身，而不涉及到产生运动的力，也就是讨论位移（$x$）、速度（$v$）、加速度（$a$）、时间（$t$）之间的关系。顺向运动学则是通过每个“关节”的性质，推算出它们之间的几何关系，从而计算出末端执行器的状态和位置。

$$
\begin{align*}
v&=\frac{\mathrm d x}{\mathrm d t}\\
a&=\frac{\mathrm d v}{\mathrm d t}\\
a&=\frac{\mathrm d^2 x}{\mathrm d t^2}\\
v\mathrm dv&=a\mathrm dx
\end{align*}
$$

对于机械臂来说，就可以把它拟合成下面的形式：

![](https://images.kisechan.space/20260401084938943.png)

### 手臂几何描述和 DH 表示法

在机器人手臂的几何建模中，需要描述**连杆**（link）和**关节**（axis）的几何关系，有了这样的建模我们才能计算出顺运动学的结果。

![](https://images.kisechan.space/20260401090236099.png)

每个关节需要四个参数：

- $a_i$：**连杆长度**，异面直线仅有一条公垂线段，这指的就是这条垂线段的长度
- $\alpha_i$：**连杆扭角**，两个关节轴之间的夹角，垂线方向上看两个 axes 之间形成的角度

有了这两个参数足以应付一个杆连接的情况了，但是多杆连接就需要更多参数来描述：

![](https://images.kisechan.space/20260401090628601.png)

- $d_i$：**连杆偏移**，用于描述关节之间沿关节轴方向的距离
- $\theta_i$：**关节角**，如图所示

#### 建立坐标系

有了这四个参数还需要建立坐标系，才能描述出变换矩阵，建立坐标系的规则如下：

![](https://images.kisechan.space/20260401091039736.png)

![](https://images.kisechan.space/20260401091141508.png)

![](https://images.kisechan.space/img/20260401091219407.png)

#### Denavit-Hartenberg 表示法

通过这四个参数，构造的齐次变换矩阵如下：

$$
T_i =
\begin{bmatrix}
\cos\theta_i & -\sin\theta_i\cos\alpha_i & \sin\theta_i\sin\alpha_i & a_i\cos\theta_i \\
\sin\theta_i & \cos\theta_i\cos\alpha_i & -\cos\theta_i\sin\alpha_i & a_i\sin\theta_i \\
0 & \sin\alpha_i & \cos\alpha_i & d_i \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

然后就可以通过连乘得到末端位置了：

$$
T = T_1 T_2 \dots T_n
$$

## 逆向运动学

给予特定的位置和姿态，反推出所有关节的相关参数。

两个概念：

- **可达工作空间**，Reachable workspace：手臂可以用至少一种的姿态到达的位置

- **灵巧工作空间**，Dexterous workspace：手臂可以用任何的姿态到达的位置

- $$
    W_\text{dexterous} \subseteq W_\text{reachable}
  $$

![图 2 的原点就是灵巧工作空间](https://images.kisechan.space/20260401093729658.png)

以及**子空间**，Subspace，即**运动集合或姿态集合的子空间**。

---

因为逆向运动学的方程是一个非线性超越方程[^2]，所以虽然有六个方程六个未知数，也不代表只有一组解。另外，如果机械臂本身有几何限制的话，这也不代表着某一组解是可行解。我们也要从多重解中，找到一个最适合的解，最快，或是能避开障碍物。

[^2]: 很显然是因为里面有三角函数。

解这个方程方法很多，既可以用几何解也可以用代数解、数值解。

### Pieper's solution

![PUMA](https://images.kisechan.space/20260401103705760.png)

如果一个六自由度机械臂满足以下条件之一，则逆运动学可以解析求解：

1. **最后三个关节轴相交于一点**（球形腕，spherical wrist）
2. **最后三个关节轴互相平行**

为什么呢？因为当最后三个关节轴交于一点时：

- 前三个关节只决定**末端位置**
- 后三个关节只决定**末端姿态**

这样就可以把逆运动学问题 **分解成两个独立问题**：

1. 求**腕中心位置**
2. 求**末端姿态**

具体的运算过程省略，和之前大同小异，爆算即可。

## 参考和注解

### 参考

https://www.bilibili.com/video/BV1v4411H7ez。

### 注释
