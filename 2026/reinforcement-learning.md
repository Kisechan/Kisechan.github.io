---
title: 强化学习概述：复习一些经典算法
url: https://blog.kscn.uk/2026/reinforcement-learning/
type: post
time: '2026-11-23T04:44:58.410Z'
---

## 决策和交互

强化学习的经典决策环境模型是一个 Markov 决策过程（MDP, Markov Decision Process），通常表示为：

$$
\mathcal M=(\mathcal S,\mathcal A,P,R,\gamma)
$$

其实就是状态和转移，强化学习的最基本状态交互循环，符号可以用下面的方式理解：

|      符号       |                       理解                        |
| :-------------: | :-----------------------------------------------: |
|  $\mathcal S$   |                  所有可能的状态                   |
|  $\mathcal A$   |                所有可以执行的动作                 |
| $P(s'\mid s,a)$ | 在状态 $s$，执行动作 $a$ 后到达新状态 $s'$ 的概率 |
|   $R(s,a,s')$   |   从状态 $s$ 到 $s'$，执行动作 $a$ 所获得的奖励   |
|    $\gamma$     |               对未来奖励的折扣程度                |

下面讲到的所有东西，都**只和动作、状态、奖励有关**。

### 动作状态和奖励

Agent 每走一步得到的 reward，真的就代表这一步有多好吗？当然不是，所以需要计算长期收益 return，表示从当前时刻开始，未来所有奖励的*折扣*累计值：

$$
\begin{align*}
G_t&=r_t+\gamma r_{t+1}
+\gamma^2r_{t+2}+\cdots\\
&=
{
\sum_{k=0}^{\infty}\gamma^k r_{t+k}
}\quad \text{where } \gamma \in [0,1]

\end{align*}
$$

- $\gamma\to1$ ：更加重视长期收益。
- $\gamma\to0$ ：更加重视短期收益。

强化学习的核心目标就是寻找一种**策略** $\pi$（是一个条件概率函数，而不是一个具体的值），让期望累计 $G_t$ 最大。其中，$\mathbb E$ 表示数学期望，$*$ 一般表示“最优的”策略，**$\arg\max$** 的意思是“找出让后面这个式子取得最大值时的那个输入参数（在这里参数就是策略 $\pi$）”。

$$
{ \pi^*=\arg\max_\pi \mathbb E_\pi[G_t] }
$$

既然我们关心长期收益，就需要一个方法预测未来能够获得多少奖励。所以可以定义一个 Value 函数，表示假设智能体现在处于状态 $s$，接下来一直按照策略 $\pi$ 行动，那么未来平均能够获得多少累计奖励。就是**当前所处的状态**整体上看有多好。

$$
{
V^\pi(\textcolor{red}{s})=
\mathbb E_\pi[G_t|\textcolor{red}{s_t=s}]
}
$$

我们希望知道**每一个动作分别有多好**，也可以定义：

$$
{ Q^\pi(\textcolor{red}{s,a})= \mathbb E_\pi[G_t|\textcolor{red}{s_t=s,a_t=a}] }
$$

表示在状态 $s$ 下，先执行动作 $a$，然后继续按照策略 $\pi$ 行动，最终能够获得多少累计奖励。

$V$ 和 $Q$ 存在关系：

$$
V^\pi(s) = \sum_a
\underbrace{ \pi(a|s) }_{ \mathclap{\text{当智能体处于状态 } s \text{ 时，采取动作 } a \text{ 的概率}} }
Q^\pi(s,a)
$$

### Bellman Equation

Return 可以拆成两部分：

$$
G_t=\underbrace{r_t}_{\mathclap{\text{当前的奖励}}}+\gamma G_{t+1}
$$

当前的累计收益 = 当前奖励 + 折扣后的未来累计收益。因此有 Bellman Expectation Equation，其中 $a\sim \pi$ 表示 $a$ 服从 $\pi$ 分布，也就是从其中取出来的：

$$
\begin{align*}
V^\pi(s)&= \mathbb E_{a\sim\pi} \left[ r+\gamma V^\pi(s') \right] \\
 Q^\pi(s,a)&= \mathbb E \left[ r+\gamma \mathbb E_{a'\sim\pi} Q^\pi(s',a') \right]
\end{align*}
$$

更详细的推导可以看一看 Candlest 老师写的文章，写得很透彻：

---

从高中数学到 MDP
https://blog.candlest.cc/archives/1027

---

## DQN

根据 Bellman Expectation Equation，我们可以找到最优 $Q$ Function，也就是 Bellman Optimality Equation：

$$
{ Q^*(s,a)= \mathbb E \left[ r+\gamma\max_{a'}Q^*(s',a') \right] }
$$

---

DQN 全称 Deep $Q$-Network，它的思路很简单，也就是使用神经网络拟合 $Q$ Function，让网络学会预测每个动作的长期收益。

假设一个 agent 有$n$ 个离散动作，输入当前状态 $s_t$，要神经网络 $\theta$ 输出 $Q_\theta(s_t)= [Q_1,Q_2,\ldots,Q_n]$，选择 $Q$ 最大的那个动作就可以了。但是网络本身并不知道 $Q$ 应该是多少，它需要通过环境交互得到的 reward，不断调整参数，让预测的 $Q$ 越来越准确。

### DQN 是怎么利用 reward 的

对于当前状态 $s_t$ 和动作 $a_t$，我们知道：

- 当前获得的奖励 $r_t$。
- 执行动作后到达的新状态 $s_{t+1}$。
- 下一状态下能够选择的动作。

因此，我们可以构造一个目标值 $y_t$，这个在强化学习里面叫做 TD (Temporal-Difference) Target[^1]：

$$
y_t= r_t+ \gamma\max_{a'} Q_{\theta^-}(s_{t+1},a')
$$

其中：

[^1]: 这个叫时序差分，利用相邻时间步的价值估计之差，逐步修正对长期收益的预测。TD Target 的含义就是根据当前真实获得的 Reward，以及下一状态的价值估计，计算当前状态应该具有的目标价值。并不是等 agent 完成整个任务，拿到所有未来奖励之后，才更新当前价值。而是只观察一步，然后利用当前时间步获得的真实 reward 和下一时间步的价值估计。差不多就是 Monte Carlo 和动态规划的思想。单步 TD 和全盘 Monte Carlo 是两个极端，一个只看眼前眼界太小，一个看全局方差太大，后面的 GAE 就是引入指数计算来对这两个极端做一种平衡。

- $r_t$：环境给出的即时奖励。
- $\gamma$：折扣因子。
- $Q_{\theta^-}$：Target Network 预测的下一状态 $Q$ Value。
- $\max_{a'}$：假设下一步选择价值最高的动作。
- 如果当前状态已经终止，则 $y_t=r_t$，因为终止状态之后没有未来奖励。

那我们已经有了预测值和目标值，接下来就可以使用均方误差构造 Loss，梯度下降优化这个函数就好了。

$$
 { L(\theta)= \mathbb E \left[ (y_t-Q_\theta(s_t,a_t))^2 \right] }
$$

### Policy

Agent 连续向右走了 100 步，这 100 条数据高度相关，训练数据的分布也会非常集中。神经网络可能过度适应最近的经验，训练稳定性较差。因此 DQN 引入了 Experience Replay。

每次与环境交互，保存一定的信息，形成一个经验池（buffer），进行 random sampling，每次从历史经验中随机抽取 batch。这样一批训练数据可以包含不同时间、不同状态下的经验。

$$
(s_t,a_t,r_t,s_{t+1},\text{done})
$$

Replay Buffer 带来两个主要好处：

1. 降低连续经验之间的相关性。
2. 重复利用历史经验，提高数据利用率。

这也引出了一个重要概念：**DQN 是一个 Off-Policy 算法**，它可以利用旧策略甚至其他行为策略产生的经验来训练当前 $Q$ Network。

### Target network

还有一个问题，我们前面的目标值：

$$
y_t=r_t+\gamma\max_{a'}Q_{\theta}(s_{t+1},a')
$$

如果目标值和预测值都使用同一个网络，那么每次更新参数，目标值也会跟着变化。这会导致训练目标不断移动，影响稳定性。

所以 DQN 引入两个网络：

| 网络           | 作用                    |
| -------------- | :---------------------- |
| Policy Network | 负责当前 $Q$ Value 预测 |
| Target Network | 负责计算 TD Target      |

Target Network 使用相对稳定的参数 $\theta^-$，定期将 Policy Network 的参数 $\theta$ 复制过去，或者是使用软更新：

$$
\theta^-\leftarrow \tau\theta+(1-\tau)\theta^-
$$

这使得 TD Target 的变化更加平缓。

## PPO

DQN 学习 $Q$ Value，然后根据 $Q$ Value 选择动作。

PPO 采取另一种思路，直接训练一个神经网络，让它学习**在不同状态下应该以多大概率选择各个动作**。

### Actor

PPO 使用一个 Policy Network，也叫 Actor。Actor 输入 $s_t$，输出 $\pi_\theta(a|s)$，也就是给定状态 $s$，选择动作 $a$ 的概率。通常是用 softmax 处理然后输出的。

### Critic

Actor 可以输出动作概率，那应该怎么知道某个动作究竟好不好呢？因此，我们需要一个基准，就是 Critic。它预测当前状态的期望累计收益，学习 $V_\phi(s)$。

### Advantage

现在我们有环境实际给出的 reward 和 Critic 预测的 value。我们就可以比较实际结果和预期结果。

首先定义 TD Error：

$$
{ \delta_t= r_t+\gamma V_\phi(s_{t+1})-V_\phi(s_t) }
$$

计算实际得到的即时奖励，加上下一状态的估计价值，减去当前状态的估计价值。也就是单次动作**实际结果和 Critic 的预期的差值**。

但这个就是一步的动作差值，为了考虑连续多步的结果，PPO 使用 GAE（Generalized Advantage Estimation），定义一个 advantage $A(s,a)=Q(s,a)-V(s)$​，表示某个动作的价值，比当前状态的平均价值高出多少。这就是 PPO 更新 Actor 的重要依据。

- Advantage 为正：倾向于提高这个动作的概率。
- Advantage 为负：倾向于降低这个动作的概率。

$$
\begin{align*}
 A_t&= \delta_t+ \gamma\lambda\delta_{t+1} +(\gamma\lambda)^2\delta_{t+2} +\cdots \\
&= \delta_t+\gamma\lambda A_{t+1}

\end{align*}
$$

其中：

- $\gamma$：折扣因子。
- $\lambda$：GAE 参数，控制我们如何综合不同时间跨度的 TD Error。

  - $\lambda=0$：只使用单步 TD Error。

  - $\lambda\to1$：综合更多未来 TD Error。

因此，GAE 能够在估计偏差和方差之间进行折中。

### Actor 的 Loss

我们希望提高高 Advantage 动作的概率，降低低 Advantage 动作的概率，所以最直接的目标可以写成：

$$
J(\theta)= \mathbb E \left[ \log\pi_\theta(a_t|s_t)A_t \right]
$$

用 $\log$ 是因为对数概率具有良好的数学性质，$\nabla_\theta\log\pi_\theta(a|s) = \frac{\nabla_\theta\pi_\theta(a|s)} {\pi_\theta(a|s)}$，可以用于构造 Policy Gradient。

#### Clip

但这里存在一个问题，如果每次更新都让某些动作概率大幅度变化，策略可能突然发生剧烈改变，训练容易不稳定，因此 PPO 引入了 **Clipped Surrogate Objective**（截断）。

首先定义：

$$
r_t(\theta)= \frac{ \pi_\theta(a_t|s_t) }{ \pi_{\theta_{\text{old}}}(a_t|s_t) }
$$

这个比例衡量当前新策略对这个动作的概率，相比采集经验时的旧策略发生了多大变化。

接下来定义：

$$
L^\text{CLIP}(\theta)= \mathbb E_t \left[ \textcolor{red}{\min \left( r_t(\theta),

\underbrace{ \operatorname{clip} (r_t(\theta),1-\epsilon,1+\epsilon) }_\text{将概率比例限制在一定范围内}

\right)}

\times A_t \right]
$$

其中，

$$
\operatorname{clip}(r,1-\epsilon,1+\epsilon)=
\begin{cases}
1+\epsilon, & \text{if }\quad 1+\epsilon < r  \\
r, & \text{if } \quad1-\epsilon \le r \le 1+\epsilon\\
1-\epsilon, & \text{if }\quad r < 1-\epsilon
\end{cases}
$$

### Critic 的 Loss

我们可以利用 GAE 得到 Return Target：

$$
{ R_t^\text{target}=A_t+V_\phi(s_t) }
$$

然后让 Critic 的预测值接近这个目标：

$$
{ L^{VF}(\phi)= \mathbb E_t \left[ (V_\phi(s_t)-R_t^\text{target})^2 \right] }
$$

这就是 Value Loss。

### Entropy Bonus

Entropy Bonus（熵奖励）是强化学习和 LLM 强化学习微调常见的一种正则化机制。

如果 Actor 发现某个动作目前表现很好，可能迅速把它的概率提高到 99%，这样策略就会变得非常确定，探索能力下降。因此 PPO 通常会加入 Entropy Bonus。

策略熵衡量策略概率分布的不确定性，定义为：

$$
\begin{align*}
\mathcal H(\pi) &= -\sum_a\pi(a|s)\log\pi(a|s)\\
&= -\mathbb E_{a\sim\pi} [\log\pi(a|s)]
\end{align*}
$$

PPO 希望在优化动作价值的同时，保留适当的探索能力。

比如二元熵函数（$H(x)=\left[x\ln\left(x\right)+\left(1-x\right)\ln\left(1-x\right)\right]$）：

{
title: {
text: 'Binary Entropy Function',
left: 'center'
},
tooltip: {
trigger: 'axis',
formatter: function(params) {
return 'x = ' + params[0].value[0].toFixed(3) +
'<br/>H(x) = ' + params[0].value[1].toFixed(5);
}
},
grid: {
left: '12%',
right: '8%',
top: '18%',
bottom: '15%'
},
xAxis: {
type: 'value',
name: 'x',
min: 0,
max: 1,
interval: 0.1,
axisLine: {
onZero: false
}
},
yAxis: {
type: 'value',
name: 'H(x)',
min: 0,
max: 0.75,
interval: 0.1
},
series: [{
name: 'H(x)',
type: 'line',
smooth: true,
symbol: 'none',
lineStyle: {
width: 3
},
areaStyle: {
opacity: 0.12
},
data: [
[0.00, 0.00000],
[0.05, 0.19852],
[0.10, 0.32508],
[0.15, 0.42271],
[0.20, 0.50040],
[0.25, 0.56234],
[0.30, 0.61086],
[0.35, 0.64745],
[0.40, 0.67301],
[0.45, 0.68814],
[0.50, 0.69315],
[0.55, 0.68814],
[0.60, 0.67301],
[0.65, 0.64745],
[0.70, 0.61086],
[0.75, 0.56234],
[0.80, 0.50040],
[0.85, 0.42271],
[0.90, 0.32508],
[0.95, 0.19852],
[1.00, 0.00000]
],
markPoint: {
data: [{
coord: [0.5, 0.69315],
name: 'Maximum',
symbolSize: 45,
label: {
formatter: 'Maximum'
}
}]
}
}]
}

### On-Policy 训练

PPO 的 Actor 和 Critic 是共享底层的两个头，它们是一起更新的[^2]，所以可以把它们的 Loss 放在一起，PPO 算法的整体 Loss 通常写成：

[^2]: Actor 头只受到 $L^\text{CLIP}$ 和熵的影响，Critic 头只受到 $L^{VF}(\phi)$ 的影响，这个可以求偏导看出来的，但是它们最终会汇合到共享的底层网络，所以最终还是会以 $L$ 来反向传播。

$$
L= -L^\text{CLIP} +c_vL^{VF} -c_e\mathcal H(\pi)
$$

这里采用最小化 Loss 的形式：

- $-L^\text{CLIP}$：最大化策略目标。
- $c_vL^{VF}$：降低 Critic 的预测误差。
- $-c_e\mathcal H$：鼓励策略保持一定熵。
- $c_v$ 和 $c_e$ 是超参数。

那么训练过程大概就可以写成：

1. **使用当前策略采样**，Actor 根据当前状态输出动作概率，随机选择动作。
2. **收集经验**，保存 State、Action、Reward、旧策略概率、Value。
3. **计算 GAE**，利用 Reward 和 Critic 的预测计算 Advantage。
4. **更新 Actor 和 Critic**。
5. **重复优化**，对刚刚收集的 Batch 进行多个 Epoch 的优化。
6. **重新采样**，使用更新后的策略与环境交互，收集新经验。

PPO **主要使用当前策略产生的数据来更新当前策略**，所以叫做 On-Policy 的算法。例如：

- 当前策略是 $\pi_{\theta_1}$。
- 用它收集一批数据。
- 使用这批数据更新得到 $\pi_{\theta_2}$。
- 再用新策略收集下一批数据。

PPO 会对同一批数据做多个 Epoch 的优化，但 Clip 限制了策略相对旧策略的变化。

## SAC

SAC 的全称是 Soft Actor-Critic，但它追求**最大熵 Actor-Critic**。PPO 通过 Entropy Bonus 鼓励探索，SAC 将这个思想进一步融入整个优化目标——它希望智能体：

1. 获得较高的累计 reward。
2. 保持足够的随机性，避免过早陷入单一策略。

定义最大熵目标：

$$
\begin{align*}
J(\pi)&= \mathbb E_\pi \left[ \sum_{t=0}^{\infty} \gamma^t \left( r_t+\alpha\mathcal H(\pi(\cdot|s_t)) \right) \right]\\
&=\mathbb E_\pi \left[ \sum_t\gamma^t \left( r_t\textcolor{red}{\underbrace{-\alpha\log\pi(a_t|s_t)}_{\text{熵奖励项}}} \right) \right]
\end{align*}
$$

其中 $\alpha$ 叫作 Temperature Parameter，控制奖励和熵之间的权衡。它使得策略在追求高 Reward 的同时，也会考虑动作分布的多样性。

### SAC 的网络

标准 SAC 通常包含：

- Actor：策略网络。
- Critic 1：第一个 $Q$ Network。
- Critic 2：第二个 $Q$ Network。
- Target Critic 1。
- Target Critic 2。

为什么需要两个 Critic？因为单个 $Q$ Network 容易高估动作价值。

注意， **$Q$ 评价的是动作，$V$ 评价的是整体状态**。

SAC 的 $Q$ 通常取两个 Critic 预测的最小值 $Q_{\min}(s,a)= \min(Q_1(s,a),Q_2(s,a))$，使用较小的估计值，可以减轻 $Q$ Value 的过度高估。

### Critic

SAC 构造的 TD Target 与 DQN 相比，它考虑了下一状态策略的熵。首先从下一状态的 Actor 中采样动作 $a'\sim\pi_\theta(\cdot|s')$，然后计算：

$$
y= r+ \gamma \left[ \min_{i=1,2}Q_{\bar\phi_i}(s',a') -\alpha\log\pi_\theta(a'|s') \right]
$$

其中：

- $r$：当前 Reward。
- $Q_{\bar\phi_i}$：Target Critic。
- $\min Q$：使用较保守的 $Q$ Value。
- $-\alpha\log\pi$：熵奖励。
- $\gamma$：未来奖励折扣。

对比 DQN 的 $y_{\text{DQN}} = r+\gamma\max_{a'}Q(s',a')$，SAC 的目标 $y_{\text{SAC}} = r+\gamma \left[ Q_{\min}(s',a') -\alpha\log\pi(a'|s') \right]$ 体现了两种算法的不同。DQN 假设下一步选择 $Q$ Value 最大的动作，而 SAC 从当前策略中采样下一步动作，并把熵也纳入未来价值。

Critic 使用 MSE Loss：

$$
L_Q(\phi_i)= \mathbb E \left[ (Q_{\phi_i}(s,a)-y)^2 \right]
$$

两个 Critic 分别计算自己的 Loss，再进行梯度下降，与 DQN 的 Q Network 更新有很强的相似性。

### Actor

SAC 希望 Actor 选择具有较高 $Q$ Value 的动作，同时保持较高熵，因此 Actor 的目标是：

$$
J_\pi(\theta)= \mathbb E_{s\sim D,\ a\sim\pi_\theta} \left[ \alpha\log\pi_\theta(a|s) - \min_iQ_{\phi_i}(s,a) \right]
$$

### 处理连续动作

比如 agent 需要输出一个连续控制向量 $\vec a=[a_1,a_2,\ldots,a_n]$[^3]，Actor 通常不直接输出一个确定动作，而是输出概率分布的参数：

[^3]: 比如机器人关节的参数就不是一个固定的值，是离散的。PPO 当然也可以用这样的输出来做，但是 SAC 这个貌似比较典型。

$$
\mu_\theta(s),\quad \sigma_\theta(s)
$$

然后做正态分布：

$$
u=\mu_\theta(s)+ \sigma_\theta(s)\odot\epsilon, \quad \epsilon\sim\mathcal N(0,I)
$$

再通过 $\tanh$ 将动作限制到指定范围：

$$
a=\tanh(u)
$$

这叫重参数化技巧，它的作用是让随机动作采样过程可以参与梯度计算。因为随机变量 $\epsilon$ 独立于网络参数，梯度可以通过 $\mu_\theta$、$\sigma_\theta$ 传递，因此 SAC 可以通过 Actor 的梯度更新，逐步找到具有更高价值的连续动作分布。

### Temperature

前面介绍了 $\alpha$，它决定奖励与熵之间的权重。如果 $\alpha$ 固定，可能出现探索过多或探索不足的情况。因此 SAC 可以自动调整 Temperature。

定义目标熵 $\mathcal H_{\text{target}}$，希望当前策略的熵接近这个目标。常见的自动 Temperature 调整 Loss 为：

$$
L(\alpha)= -\mathbb E \left[ \alpha \left( \log\pi_\theta(a|s) +\mathcal H_{\text{target}} \right) \right]
$$

这里通常使用 $\alpha=e^\beta$，通过优化 $\beta$ 保证 $\alpha>0$。直观理解：

- 当前策略熵低于目标：增加探索强度。
- 当前策略熵高于目标：降低探索强度。

这样 SAC 可以根据策略实际表现动态调整探索程度。

### Off-Policy 训练

SAC 同样使用 Replay Buffer，每次环境交互后，保存 $(s_t,a_t,r_t,s_{t+1},\text{done})$，随后从历史经验中随机采样 batch，这些经验可以来自过去的不同策略。

SAC 使用当前 Actor 和 Critic 来处理这些历史数据：

- Critic 利用经验计算 TD Target。
- Actor 利用当前 Critic 优化策略。
- Temperature 根据目标熵进行调整。
- Target Critic 通过软更新保持稳定。Target Network 的软更新：

$$
\bar\phi\leftarrow \tau\phi+(1-\tau)\bar\phi
$$

这里的 $\tau$ 通常比较小。这样 Target Critic 会平滑地跟随在线 Critic。

## 参考和注解
