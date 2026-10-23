---
title: 概率论与数理统计
url: https://blog.kisechan.space/2025/notes-ptms/
type: post
time: '2026-10-23T14:43:06.486Z'
---

## 概率论

### 连续型随机变量分布

|            分布名称            |                             概率密度函数（PDF）                             |               分布函数（CDF）                | 期望 $\mathbb{E}[X]$ |  方差 $\mathrm{D}[X]$  |             参数说明              |
| :----------------------------: | :-------------------------------------------------------------------------: | :------------------------------------------: | :------------------: | :--------------------: | :-------------------------------: |
|       均匀分布 $U(a, b)$       |                  $f(x) = \frac{1}{b - a},\ a \le x \le b$                   | $F(x) = \frac{x - a}{b - a},\ a \le x \le b$ |  $\frac{a + b}{2}$   | $\frac{(b - a)^2}{12}$ |              $a < b$              |
| 指数分布 $\text{Exp}(\lambda)$ |                  $f(x) = \lambda e^{-\lambda x},\ x \ge 0$                  |    $F(x) = 1 - e^{-\lambda x},\ x \ge 0$     | $\frac{1}{\lambda}$  | $\frac{1}{\lambda^2}$  |           $\lambda > 0$           |
|  正态分布 $N(\mu, \sigma^2)$   | $f(x) = \frac{1}{\sqrt{2\pi\sigma^2}} e^{ -\frac{(x - \mu)^2}{2\sigma^2} }$ |                      无                      |        $\mu$         |       $\sigma^2$       | $\mu \in \mathbb{R},\ \sigma > 0$ |

### 离散型随机变量分布

|         分布名称          |                       概率质量函数（PMF）                        |                                  分布函数（CDF）                                   | 期望 $\mathbb{E}[X]$ | 方差 $\mathrm{D}[X]$ |            参数说明            |
| :-----------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------------------------: | :------------------: | :------------------: | :----------------------------: |
|        伯努利分布         |                  $P(X=1) = p,\ P(X=0) = 1 - p$                   | $F(x) = \begin{cases} 0 & x < 0 \\ 1 - p & 0 \le x < 1 \\ 1 & x \ge 1 \end{cases}$ |         $p$          |      $p(1 - p)$      |          $0 < p < 1$           |
| 二项分布 $\text{B}(n, p)$ |           $P(X = k) = \binom{n}{k}p^k(1 - p)^{n - k}$            |                                      累加 PMF                                      |         $np$         |     $np(1 - p)$      | $n \in \mathbb{N},\ 0 < p < 1$ |
|         几何分布          |           $P(X = k) = (1 - p)^{k - 1} p,\ k = 1,2,...$           |                               $F(k) = 1 - (1 - p)^k$                               |    $\frac{1}{p}$     | $\frac{1 - p}{p^2}$  |          $0 < p < 1$           |
|  泊松分布 $\pi(\lambda)$  | $P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!},\ k = 0,1,2,\dots$ |                                      累加 PMF                                      |      $\lambda$       |      $\lambda$       |         $\lambda > 0$          |

二项分布的众数为 $\lfloor(n+1)p\rfloor$

二项分布的极限情况就是泊松分布，此时，

- $n\to+\infty$
- $p\to 0$
- $np\to \lambda$

### 标准正态分布

$$
\begin{align*}
X &\sim \mathcal N (\mu, \sigma^2)\\
\frac{X-\mu}{\sigma}&\sim \mathcal N(0, 1)
\end{align*}
$$

- $\mu=0$
- $\sigma=1$

$$
f(x)=\frac{1}{\sqrt{2\pi}}e^{-\frac{x^2}{2}}
$$

$$
\mathbb EX^2=1
$$

若 $X, Y\sim\mathcal N(\mu_i, \sigma_i)$ 且相互独立，则有：

- $\mathbb E(XY)=\mathrm{Cov}(X, Y)+\mu_X\mu_Y=\mu_X\mu_Y$
- $\mathrm D(XY)=\mu_X^2\sigma_Y^2+\mu_Y^2\sigma_X^2+\sigma_X^2\sigma_Y^2$
- $XY$ 一般**不再是正态分布**

### Gauss 积分

$$
\int_{-\infty}^{+\infty} e^{-x^2}\mathrm{d}x=\sqrt \pi
$$

### 随机变量函数的分布

$$
\text{if}\quad x=g(y)\quad\text{and}\quad f(x) \text{ 为 } X \text{ 的 PMF， }g(y)\text{ 单调， then}\\
f_Y(y)=f_X(g(y))g'(y)
$$

另外注意上下限

### 二维正态分布

$$
(X,Y)\sim\mathcal N(\mu_1,\mu_2,\sigma^2_1,\sigma^2_2,\rho)
$$

$$
f(x,y)=\frac{1}{2\pi\sigma_1\sigma_2\sqrt{1-\rho^2}}e^{-\frac{1}{2\sqrt{1-\rho^2}}(\frac{(x-\mu_1)^2}{\sigma_1^2}+\frac{(x-\mu_2)^2}{\sigma_2^2}-\frac{2\rho(x-\mu_1)(y-\mu_2)}{\sigma_1\sigma_2})}
$$

正态分布满足**可加性**：

$$
X_i\sim \mathcal N(\mu_i,\sigma_i^2)
$$

$$
\sum c_iX_i\sim \mathcal N(\sum c_i\mu_i,\sum \textcolor{red}{ c_i^2}\sigma_i^2)
$$

### 二维随机变量函数的分布

注意**这里涉及到的都是 CDF**

#### $Z=X+Y$ 型

$$
\begin{align*}
F_Z(z)=P(Z\le z)&=P(X+Y\le z)\\
&=\iint \limits_{x+y\le z}f(x,y)\mathrm dx\mathrm dy\\
&=\int_{-\infty}^{+\infty}[\int_{-\infty}^{z-x}f(x,y)\mathrm dy]\mathrm dx\\
&=\boxed{\int_{-\infty}^{+\infty}f(x,z-x)\mathrm dx}\\
&=\boxed{\int_{-\infty}^{+\infty}f(z-y,y)\mathrm dy}\\
\end{align*}
$$

#### $Z=\max(X,Y)$ 和 $Z=\min(X,Y)$ 型

**独立同分布**，则有

$$
F_{\max} (z)=P(Z\le z)=P(Z\le x)P(z\le y)=\boxed{F_X(z)F_Y(z)=F^2(z)}
$$

$$
F_{\min} (z)=1-P(Z\ge z)=1-P(Z\ge x)P(z\ge y)=\boxed{1-[1-F_X(z)][1-F_Y(z)]=1-[1-F(z)]^2}
$$

### 随机变量的数字特征

#### $\mathbb{E}X$

- **离散型随机变量** $\mathbb EX=\sum x_ip_i$
- **连续型随机变量** $\mathbb EX=\int xf(x)\mathrm dx$

线性性质：

- $\mathbb E(c)=c\quad c \text{ 为常数}$
- $\mathbb E(aX+bY)=a\mathbb EX+b\mathbb EY$

- $\mathbb E(XY)=\mathbb EX \mathbb EY \quad X, Y \text{ 相互独立}$

$$
\begin{align*}
\mathbb E(g(X))&=\sum g(x)\times P\{x=X_i\}\\
&=\int g(x)f(x)\mathrm dx
\end{align*}
$$

#### $\mathrm DX$

$$
\mathrm DX=\mathbb E(X^2)-(\mathbb EX)^2
$$

- $\mathrm D(aX+b)=a^2\mathrm DX$
- $\mathrm D(X\pm Y)=\mathrm DX+\mathrm DY\pm 2\mathrm{Cov}(X,Y)$

标准差 $\sigma_X=\sqrt {\mathrm DX}$

> 特别注意标准差和方差要不要开方

一般计算样本的方差使用的是无偏方差，**注意分母不是 $n$**！

$$
S^2\equiv \frac{1}{\textcolor{red}{n-1}}\sum_{i=1}^{n}(X_i-\bar X)^2
$$

#### $\mathrm{Cov}(X,Y)$

$$
\mathrm{Cov}(X,Y)=\mathbb E(XY)-\mathbb EX \mathbb EY
$$

- $\mathrm{Cov}(X,X)=\mathrm DX$

线性性质：

- $\mathrm{Cov}(X,c)=0$
- $\mathrm{Cov}(aX,Y)=a\mathrm{Cov}(X,Y)$
- $\mathrm{Cov}(X+Y,Z)=\mathrm{Cov}(X,Z)+\mathrm{Cov}(Y,Z)$

#### $\rho_{XY}$

$$
\rho_{XY}=\frac{\mathrm{Cov}(X,Y)}{\sqrt{\mathrm DX\mathrm DY}}\in[-1,1]
$$

取值范围由 Cauchy-Schwarz 不等式得到，因为方差永远大于 $0$

$$
[\mathbb E(UV)]^2\leq \mathbb E(U^2)\mathbb E(V^2)
$$

特殊地，

$$
\rho_{XY}=\pm1\Rightarrow \exists a,b,\text{ s.t. } Y=aX+b
$$

且

$$
\frac{\sigma_Y}{\sigma_X}=|a| \quad\text{and}\quad \mathrm D(X|Y)=\mathrm D(Y|X)=0
$$

### Chebyshev 不等式

$$
P(|X-\mu|\ge \epsilon)<\frac{\sigma^2}{\epsilon^2}
$$

### 大数定律

记 $\bar{X_n}$ 为样本均值， $\forall\epsilon>0$，有

$$
\lim\limits_{n\to+\infty}P\{|\bar{X_n}-\mu|<\epsilon\}=1
$$

也就是说 $n\to+\infty$ 时，样本均值依概率收敛于数学期望

### 中心极限定理

记 $\bar{X_n}$ 为样本均值， $Z_n$ 为其标准化形式

$$
Z_n = \frac{\bar{X}_n - \mathbb{E}[\bar{X}_n]}{\mathrm{D}[\bar{X}_n]} = \frac{\bar{X}_n - \mu}{\sigma / \sqrt{n}} \sim \mathcal{N}(0,1)
$$

也就是说，不管 $X_i$ 服从什么分布，其样本均值的标准化形式 $Z_n$ 都服从标准正态分布，非标准化形式满足

$$
\boxed{\bar{X_n}\sim\mathcal N(\mu,\frac{\sigma^2}{n})}
$$

## 数理统计

### 正态总体

$X_n$ 是从正态总体 $\mathcal N(\mu, \sigma^2)$ 中抽取的一群样本，则样本均值和样本方差满足以下说法： (Fisher’s Lemma)

- $\bar{X_n}\sim \mathcal N\left(\mu,\frac{\sigma^2}n\right)$
  - $\mathbb E\bar{X_n}=\mu$
  - $\mathrm D\bar{X_n}=\frac {\mu^2} {\sqrt n}$

- $\frac{(n-1)S^2}{\sigma^2}\sim\chi^2(n-1)$
  - 注意， $S^2$ 计算是使用的 $\bar X$
  - 如果使用均值 $\mu$ 计算方差，**则不会损失自由度**，它会遵从 $\chi^2(n)$ 分布
  - $\mathbb ES^2=\sigma^2$
  - $\mathrm DS^2=\frac{2\sigma^4}{n-1}$

- $S^2$ 和 $\bar X$ 是**相互独立的**

### $\chi^2$ 分布

$X_1,X_2,\dots,X_k$ 满足 $X_k\sim\mathcal N(0,1)$，则

$$
Z=\sum X_i\sim \chi^2(k)
$$

- $\mathbb EZ=k$
- $\mathrm DZ=2k$

若 $Z_i$ 独立同分布，则满足可加性：

$$
\sum Z_i\sim \chi^2(\sum k_i)
$$

### $t$ 分布

- $Z\sim\mathcal N(0,1)$
- $U\sim\chi^2(k)$
- 相互独立

则

$$
T=\frac{Z}{\sqrt{U/k}}\sim t(k)
$$

- $\mathbb ET=0\quad \text{if } k>1$
- $\mathrm DT=\frac{k}{k-2} \quad \text{if }k>2$

$k\to+\infty$ 时， $t$ 分布收敛于 $\mathcal N(0,1)$

---

对于从正态总体中抽取的样本 $X_i$，有，

$$
\frac{\bar{X}_n - \mu}{\sigma / \sqrt{n}} \sim \mathcal{N}(0,1)\\
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2(n-1)
$$

则，

$$
\begin{align*}
T&=\frac{\bar{X_n}-\mu}{S/\sqrt{n}}\\
&=\frac{\frac{\bar{X}_n - \mu}{\sigma / \sqrt{n}}}{\sqrt{S^2/\sigma^2}} \\
&=\frac{\textcolor{red}{\frac{\bar{X}_n - \mu}{\sigma / \sqrt{n}}}}{\textcolor{green}{\sqrt{\frac{\chi^2(n-1)}{n-1}}}}
\sim t(n-1)
\end{align*}
$$

#### $F$ 分布

- $U\sim \chi^2(d_1)$
- $V\sim\chi^2(d_2)$
- 相互独立

则

$$
F=\frac{U/d_1}{V/d_2}\sim F(d_1,d_2)
$$

且

$$
\text{if } T\sim t(k)\text{, then}\\
T^2\sim F(1,k)
$$

### 点估计法

#### 矩估计法

核心思想：令

$$
\mathbb EX^t(\theta)=\bar{X_n^t}
$$

求解出矩估计量 $\hat \theta=f(\bar x)$

#### 最大似然估计法

核心思想：令

$$
L(\theta)=\prod p(x_i;\theta)=
\left\{
\begin{aligned}
&\prod P\{X=x_i;\theta\} &\quad \text{离散型随机变量} \\
&\prod f(x_i;\theta) &\quad \text{连续型随机变量}
\end{aligned}
\right.
$$

取对数后求其驻点

$$
\frac{\mathrm d \ln L(\theta)}{\mathrm d\theta}=\sum \frac{p'(x_i;\theta)}{p(x_i;\theta)}=0
$$

如果有多个最大似然估计量，例如正态分布的 $\mu$ 和 $\sigma^2$，则需要求它们的偏导，组成一个方程组

$$
\left\{
\begin{aligned}
\frac{\partial \ln L(\theta_i)}{\partial \theta_1} &= 0 \\
\frac{\partial \ln L(\theta_i)}{\partial \theta_2} &= 0 \\
\dots\\
\frac{\partial \ln L(\theta_i)}{\partial \theta_n} &= 0
\end{aligned}
\right.
$$

更严谨的话还要检查一下 Hessian 矩阵

---

当似然函数满足：

- **是单调函数**
- $x_i$ **依赖于待估计的参数**

时，参数的最大似然估计值可以是 $\max \{X_i\}$ 或 $\min \{X_i\}$

例如均匀分布，观察值 $X_i$ 必须处在某和 $\theta$ 相关的区间内时会涉及到这种情况

### 估计量评选标准

#### 无偏性

若

$$
\mathbb E\hat \theta=\theta
$$

则称 $\hat\theta$ 为 $\theta$ 的无偏估计量

---

一些无偏估计量

- $\mathbb E\bar{X_n}=\mu$
- $\mathbb ES^2=\sigma^2$，若样本方差计算使用的不是无偏方差，则它不是无偏的估计量

#### 有效性

若 $\hat{\theta_i}$ 和 $\hat{\theta_j}$ 都是 $\theta$ 的无偏估计量

$$
\mathrm D\hat{\theta_i}\le \mathrm D\hat{\theta_j}
$$

则称 $\hat{\theta_i}$ 比 $\hat{\theta_j}$ 更有效

### 一致性

当 $n\to +\infty$ 时，估计量 $\hat{\theta_n}$ 依概率收敛于 $\theta$，即

$$
\forall \epsilon>0, \lim\limits_{n\to+\infty} P\{|\hat{\theta_n}-\theta|<\epsilon \}=1
$$

则称 $\hat{\theta_n}$ 为 $\theta$ 的一致估计量

### 区间估计法

注意分位点是一个**坐标**，而不是长度

#### 求 $\mu$

- **若方差已知**，则 $1-\alpha$ 下，枢轴量 $\frac{\bar X-\mu}{\sigma/\sqrt n}\sim\mathcal N(0,1)$ 需要在 $(-u_{\frac{\alpha}{2}},u_{\frac{\alpha}{2}})$ 区间内，求解出 $\mu$ 的置信区间为

$$
\mu\in\boxed{(\bar X\pm u_{\frac{\alpha}{2}}\frac{\sigma}{\sqrt n})}
$$

- **若方差未知**，则 $1-\alpha$ 下，枢轴量 $\frac{\bar X-\mu}{S/\sqrt n}\sim t(n-1)$ 需要在 $(-t_{\frac{\alpha}{2}}(n-1), t_{\frac{\alpha}{2}}(n-1))$ 区间内，求解出 $\mu$ 的置信区间为

$$
\mu\in\boxed{(\bar X\pm t_{\frac{\alpha}{2}}(n-1)\frac{S}{\sqrt n})}
$$

#### 求 $\sigma^2$

- **若期望未知**，则 $1-\alpha$ 下，枢轴量 $\frac{(n-1)S^2}{\sigma^2}\sim \chi^2(n-1)$ 需要在 $(\chi^2_{1-\frac{\alpha}{2}}(n-1),\chi^2_{\frac{\alpha}{2}}(n-1))$ 区间内，求解出 $\sigma$ 的置信区间为

$$
\sigma^2\in\boxed{(\frac{(n-1)S^2}{\chi^2_{\frac{\alpha}{2}}(n-1)},\frac{(n-1)S^2}{\chi^2_{1-\frac{\alpha}{2}}(n-1)})}
$$

- **若期望已知**，则

$$
\sigma^2\in\boxed{(\frac{\sum(X_i-\mu)^2}{\chi^2_{\frac{\alpha}{2}}(n-1)},\frac{\sum(X_i-\mu)^2}{\chi^2_{1-\frac{\alpha}{2}}(n-1)})}
$$

---

求单侧置信区间只需要把 $\alpha/2$ 变成 $\alpha$ 就行

### 假设检验

假设检验的结果可能犯两类错误：

- **第一类错误**（弃真）：当原假设 $H_0$ 为真时，作出的决定却是拒绝 $H_0$ ,犯这
  类错误的概率不超过显著性水平 $\alpha$ ，

$$
P\{拒绝H_0\mid H_0为真\}=\alpha
$$

- **第二类错误**（取伪）：当原假设 $H_0$ 为假时，作出的决定却是接受 $H_0$ ,犯这
  类错误的概率记为 $\beta$ ，

$$
P\{接受H_0\mid H_0为假\}=\beta
$$

|          | $H_0$ 为真 | $H_0$ 为假 |
| :------: | :--------: | :--------: |
| **接受** |    正确    | 第二类错误 |
| **拒绝** | 第一类错误 |    正确    |

#### 检验 $\mu$

1. **提出假设** $H_0: \enspace \mu=\mu_0$，$H_1: \enspace \mu\ne\mu_0$
2. **选检验统计量**
   - **方差已知**，选 $\boxed{\frac{\bar X-\mu}{\sigma/\sqrt n}}\sim\mathcal N(0,1)$，进行 **U 检验**
   - **方差未知**，选 $\boxed{\frac{\bar X-\mu}{S/\sqrt n}}\sim t(n-1)$，进行 **T 检验**
3. **求拒绝域**
   - **方差已知**，拒绝域 $W=(-\infty,-u_{\frac{\alpha}{2}})\cup(u_{\frac{\alpha}{2}},+\infty)$
   - **方差未知**，拒绝域 $W=(-\infty,-t_{\frac{\alpha}{2}}(n-1))\cup(t_{\frac{\alpha}{2}}(n-1),+\infty)$
4. **做出检验**：将 $\bar X$ 和 $S$ 代入枢轴量，若在拒绝域 $W$ 内，则拒绝 $H_0$

#### 检验 $\sigma^2$

1. **提出假设** $H_0: \enspace \sigma=\sigma_0$，$H_1: \enspace \sigma\ne\sigma_0$
2. **选检验统计量** $\boxed{\frac{(n-1)S^2}{\sigma^2}}\sim \chi^2(n-1)$，进行 $\chi^2$ **检验**
3. **求拒绝域** $W=(-\infty,\chi^2_{1-\frac{\alpha}{2}}(n-1))\cup(\chi^2_{\frac{\alpha}{2}}(n-1),+\infty)$
4. **做出检验**：将 $S$ 代入枢轴量，若在拒绝域 $W$ 内，则拒绝 $H_0$

## 参考和注解
