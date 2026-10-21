---
title: 编译原理题型总结笔记
url: https://blog.kisechan.space/2026/notes-compiler-solutions/
type: post
time: '2026-10-21T16:13:46.163Z'
---

## 主要题型（根据 23 级考题）

1. NFA、DFA 画图、转换、最小 DFA
2. 画语法树，找短语、简单短语和句柄
3. 求三个集合和递归下降程序编写
4. 驻留法求符号表
5. 写四元式并优化它

## NFA，DFA 和正则表达式

### 概念题

> 与DFA相比，NFA的非确定性体现在:
>
> A. 允许有多个开始状态
>
> B. 允许有多个终止状态
>
> C. 在没有任何输入的情况下允许进行状态转换
>
> D. 一个状态可以有多个不同后继状态

选择 AC，注意 D 说的应该是在**同一个输入下**，一个状态可以有多个不同的后继状态。

---

> 正则表达式和有限自动机的关系以下说法正确的是:
>
> A. 一个正则表达式只能等价于一个确定的有限自动机
>
> B. 正则表达式、NFA和DFA在接受语言的能力上是相互等价的
>
> C. 对任何形式正则表达式r,都存在一个NFA M,满足L(M)=L(r)
>
> D. 一个正则表达式可以转化为一个等价的自动机,但自动机不一定都能表示为等价的正则表达式

选择 BC。

A，一个正则表达式可以对应多个等价的有限自动机。比如同一个正则表达式可以先构造出一个 NFA，再转成 DFA，还可以继续最小化 DFA；这些自动机结构可能不同，但接受的语言相同。题干说“只能等价于一个确定的有限自动机”，把“语言等价”误解成了“结构唯一”。

B，正则表达式、NFA、DFA 都接受正则语言，所以识别能力相同。NFA 可以通过子集构造转成 DFA，正则表达式也可以构造出等价自动机。

C，对任意正则表达式 $r$，都可以构造一个 NFA $M$，使得 $L(M)=L(r)$，这是正则表达式到自动机转换的基本结论。

D，自动机也可以转换为等价的正则表达式。

**正则表达式、NFA、DFA 是同一类语言的三种表示法**。

$$
\text{正则表达式}\Longleftrightarrow \text{NFA}\Longleftrightarrow \text{DFA}
$$

## 文法相关概念

文法一般写成：

$$
G=(V_N,V_T,S,P)
$$

其中：

| 概念  | 含义         | 解释                                               |
| ----- | ------------ | -------------------------------------------------- |
| $V_N$ | 非终结符集合 | 可以继续展开的“语法类别”，如 $E,T,F$               |
| $V_T$ | 终结符集合   | 最终出现在程序里的基本符号，如 $\text{id},+,*,(,)$ |
| $S$   | 开始符号     | 推导的起点，且 $S\in V_N$                          |
| $P$   | 产生式集合   | 规定如何展开非终结符                               |

文法符号全集常写作：

$$
V=V_N\cup V_T,\quad V_N\cap V_T=\varnothing
$$

终结符从语法分析角度看是语言中不可再分的基本符号，通常对应词法分析输出的 Token 类型。

### 产生式、终结符、非终结符

上下文无关文法中的产生式一般写成：

$$
A\to\alpha
$$

其中：

$$
A\in V_N
$$

$$
\alpha\in (V_T\cup V_N)^*
$$

$A$ 是产生式左部，也叫头；$\alpha$ 是产生式右部，也叫体；$\to$ 或 $::=$ 读作“定义为”“推导出”。例如：

$$
E\to E+T
$$

$$
T\to F
$$

$$
F\to i
$$

这里 $E,T,F$ 是非终结符，$+,i$ 是终结符。

### 文法的分类

文法分类按乔姆斯基层次来记，层级从强到弱是：$0$ 型 $\supset$ $1$ 型 $\supset$ $2$ 型 $\supset$ $3$ 型

| 类型   | 名称                  | 产生式形式                                                  | 对应语言       | 对应模型       |
| ------ | --------------------- | ----------------------------------------------------------- | -------------- | -------------- |
| $0$ 型 | 无限制文法 / 短语文法 | $\alpha\to\beta$，且 $\alpha$ 中含非终结符                  | 递归可枚举语言 | 图灵机         |
| $1$ 型 | 上下文有关文法        | $\alpha A\beta\to\alpha\gamma\beta$，通常要求长度增长或保持 | 上下文有关语言 | 线性有界自动机 |
| $2$ 型 | 上下文无关文法        | $A\to\alpha$                                                | 上下文无关语言 | 下推自动机     |
| $3$ 型 | 正则文法              | 右线性 $A\to aB$ 或 $A\to a$；左线性 $A\to Ba$ 或 $A\to a$  | 正则语言       | 有限自动机     |

编译原理中最常用的是 $2$ 型和 $3$ 型。通常用 $3$ 型文法或正则表达式描述词法结构，用 $2$ 型文法描述表达式、语句等语法结构；“文法”无特殊说明时通常指上下文无关文法。

### 推导、句型、句子、语言

核心关系是：

$$
S\Rightarrow^*\alpha
$$

表示从开始符号 $S$ 经过零步或多步推导得到 $\alpha$。

| 概念 | 定义                             | 例子                                          |
| ---- | -------------------------------- | --------------------------------------------- |
| 推导 | 用产生式把某个非终结符替换成右部 | $E\Rightarrow E+T$                            |
| 句型 | **从 $S$ 推导出来的任意符号串**  | $E+T$、$i+T$、$i+i$                           |
| 句子 | **只含终结符的句型**             | $i+i$                                         |
| 语言 | 文法能推出的所有**句子**的集合   | $L(G)=\{w\mid S\Rightarrow^_w,\ w\in V_T^_\}$ |

**句型可以含非终结符，句子只含终结符，语言是所有句子的集合**。句子是句型的特例。

### 语法树

语法树是推导过程的图形表示。它的规则是：

- **根节点标记为开始符号 $S$**
- **内部节点通常是非终结符**
- **叶节点可以是终结符，也可以是非终结符**

如果某个内部节点 $A$ 有从左到右的孩子 $X_1,X_2,\dots,X_n$，那么文法中必须有产生式：$A\to X_1X_2\cdots X_n$。

语法树既反映推导过程，也反映句型的层次结构。语法树的“父节点扩展为子节点”对应一次产生式使用。

---

语法树的所有叶节点从左到右连起来，就是一个句型。

如果所有叶节点都是终结符，那么这个叶节点串就是句子。

#### 子树和简单子树

- 子树是从某个节点开始，把它下面所有后代节点都包含进去形成的树。
- 简单子树，也叫直接子树，是某个节点和它的直接孩子组成的一层树。它直接对应一个产生式。

简单子树的特点是“一步展开”。普通子树可以包含多步展开。简单子树是最小的结构单元，直接对应文法中的一个产生式规则。

### 短语、简单短语、句柄

这三个概念都要放在某个具体句型和某棵语法树中理解。

#### 短语

如果某棵子树的叶节点从左到右连起来是 $\beta$，那么 $\beta$ 是该句型的一个短语。

形式化地说：

$$
S\Rightarrow^*\alpha A\gamma\\
A\Rightarrow^*\beta
$$

所以：

$$
S\Rightarrow^*\alpha A\gamma\Rightarrow^*\alpha\beta\gamma
$$

那么 $\beta$ 是句型 $\alpha\beta\gamma$ 相对于 $A$ 的短语。**短语对应子树，允许多步推导**。

#### 简单短语 / 直接短语

如果某棵简单子树的叶节点从左到右连起来是 $\beta$，那么 $\beta$ 是简单短语。**简单短语对应简单子树，只看一步产生式右部**。

### 句柄

句柄是当前句型中需要被归约的简单短语。按照笔记里的表述，它是最左简单子树叶节点从左到右组成的符号串；在自底向上分析中，每一步识别并归约的对象就是句柄。对于无歧义文法，句柄唯一。

记忆方式：**句柄是自底向上分析中“当前该收回去”的那一段**。

### 包含关系

可以这样记：

简单短语 $\subseteq$ 短语

句柄 $\in$ 简单短语集合

也就是说，短语范围最大，简单短语更小，句柄是分析过程中当前要归约的那个简单短语。

更具体地说：

- 子树 $\longleftrightarrow$ 短语
- 简单子树 $\longleftrightarrow$ 简单短语
- 最左简单子树 $\longleftrightarrow$ 句柄
- 整棵语法树的叶节点 $\longleftrightarrow$ 句型或句子

## 三个集合的求法

![](https://images.kisechan.space/uploads/2026/06/23/image-20260623150209481-6d0570da.png)

### First 集

找到**左部是该非终结符的展开式，看得到的第一个项**。如果得到的是终结符，就加入 First 集；否则继续递归查询；如果得到的是 $\varepsilon$，就也加进来，并计算下一个符号。First 可以有空串。

### Follow 集

按下面的步骤来做：

1. 输入符首先有 $\#$。
2. 看右部，找到该非终结符，**如果它后面跟着终结符，则把这个终结符加入 Follow 集**；**否则加入后面这个非终结符的 First 集减去 $\varepsilon$**。
3. 看右部，找到该终结符，**如果它后面的非终结符能够消失变成 $\varepsilon$，或者它后面没东西，那就加入左部的 Follow 集**。

**Follow 集不会有空串**。

### Predict 集

对于：

$$
A\to b\dots
$$

就是求：

$$
\text{Predict}(A\to b\dots)=\begin{cases}\text{First}(b)&, \varepsilon\notin\text{First}(b)\\ [\text{First}(b)-\varepsilon]\cup\text{Follow}(A)&, \varepsilon\in\text{First}(b) \end{cases}
$$

### 例题

![](https://images.kisechan.space/uploads/2026/06/24/image-20260624192528632-72fcc142.png)

首先需要包含 $T'$ 的 First 集减去 $\varepsilon$。

$T'$ 的 First 集是 $\{\varepsilon, *\}$。可以是空串，所以要加入左部的 Follow 集。

然后，加入 $T$ 的 Follow 集。现在开始求 $T$ 的 Follow 集。它应该首先包含 $E'$ 的 First 集，也就是 $\{\varepsilon, +\}$，又因为 $E'$ 可以是空，所以要加入 $E$ 和 $E'$ 的 Follow 集。

$E$ 的 Follow 集显然是 $\lbrace\#, )\rbrace$。$\text{Follow}(E')\subset \text{Follow}(E)$ ，所以综上所述，应该选择 C。

## LL(1) 分析表

标准构表流程是：**先求每个产生式右部的 $\text{FIRST}$，再求各非终结符的 $\text{FOLLOW}$，最后按规则把产生式填入表格。**

![](https://images.kisechan.space/uploads/2026/06/24/image-20260624194729158-7c1b2ac3.png)

终结符集合是：${a,b,d,e,\# }$

非终结符集合是：${S,T,R,D}$

---

先求 $\text{FIRST}$ 集。

$D\to a\mid bd$，所以：$\text{FIRST}(D)={a,b}$

$R\to dR\mid \varepsilon$，所以：$\text{FIRST}(R)={d,\varepsilon}$

$T\to DR\mid \varepsilon$，因为 $\text{FIRST}(D)={a,b}$，所以：$\text{FIRST}(DR)={a,b}$

再加上 $T\to\varepsilon$：$\text{FIRST}(T)={a,b,\varepsilon}$，$S\to eT\mid RT$

其中：$\text{FIRST}(eT)={e}$

再看 $RT$：$\text{FIRST}(R)={d,\varepsilon}$

因为 $R$ 可以推出 $\varepsilon$，所以还要看 $T$：$\text{FIRST}(T)={a,b,\varepsilon}$

因此：$\text{FIRST}(RT)={d,a,b,\varepsilon}$

所以：$\text{FIRST}(S)={e,d,a,b,\varepsilon}$

---

再求 $\text{FOLLOW}$ 集。

开始符号是 $S$，所以：$\#\in \text{FOLLOW}(S)$

因此：$\text{FOLLOW}(S)=\lbrace\#\rbrace$

看产生式：$S\to eT$

$T$ 在产生式末尾，所以：$\text{FOLLOW}(S)\subseteq \text{FOLLOW}(T)$，得到：$\#\in \text{FOLLOW}(T)$

再看：$S\to RT$，$R$ 后面跟着 $T$，所以：$\text{FIRST}(T)-{\varepsilon}\subseteq \text{FOLLOW}(R)$

因为：$\text{FIRST}(T)={a,b,\varepsilon}$，所以：${a,b}\subseteq \text{FOLLOW}(R)$

又因为 $T\Rightarrow^*\varepsilon$，所以：$\text{FOLLOW}(S)\subseteq \text{FOLLOW}(R)$，得到：$\#\in \text{FOLLOW}(R)$

同时 $T$ 在末尾，所以：$\text{FOLLOW}(S)\subseteq \text{FOLLOW}(T)$，因此：$\text{FOLLOW}(T)=\lbrace\#\rbrace$

再看：$T\to DR，$$D$ 后面跟着 $R$，所以：$\text{FIRST}(R)-{\varepsilon}\subseteq \text{FOLLOW}(D)$，因为：$\text{FIRST}(R)={d,\varepsilon}$，所以：$d\in \text{FOLLOW}(D)$

又因为 $R\Rightarrow^*\varepsilon$，所以：$\text{FOLLOW}(T)\subseteq \text{FOLLOW}(D)$，得到：$\#\in \text{FOLLOW}(D)$

因此最终为：

$\text{FOLLOW}(S)=\lbrace\#\rbrace$

$\text{FOLLOW}(T)=\lbrace\#\rbrace$

$\text{FOLLOW}(R)={a,b,\# }$

$\text{FOLLOW}(D)={d,\# }$

---

构造 LL(1) 分析表的规则是：

对于产生式 $A\to\alpha$：

如果 $x\in \text{FIRST}(\alpha)$，且 $x\neq \varepsilon$，则把 $A\to\alpha$ 填入 $M[A,x]$。

如果 $\varepsilon\in \text{FIRST}(\alpha)$，则对所有 $y\in \text{FOLLOW}(A)$，把 $A\to\alpha$ 填入 $M[A,y]$。

---

逐条填表。

对 $S\to eT$：

$\text{FIRST}(eT)={e}$

所以填：

$M[S,e]=S\to eT$

对 $S\to RT$：

$\text{FIRST}(RT)={d,a,b,\varepsilon}$

所以先填：

$M[S,d]=S\to RT$

$M[S,a]=S\to RT$

$M[S,b]=S\to RT$

因为 $\varepsilon\in \text{FIRST}(RT)$，还要看：

$\text{FOLLOW}(S)=\lbrace\#\rbrace$

所以填：

$M[S,\#]=S\to RT$

对 $T\to DR$：

$\text{FIRST}(DR)={a,b}$

所以填：

$M[T,a]=T\to DR$

$M[T,b]=T\to DR$

对 $T\to\varepsilon$：

因为右部是 $\varepsilon$，看：

$\text{FOLLOW}(T)=\lbrace\#\rbrace$

所以填：

$M[T,\#]=T\to\varepsilon$

对 $R\to dR$：

$\text{FIRST}(dR)={d}$

所以填：

$M[R,d]=R\to dR$

对 $R\to\varepsilon$：

看：

$\text{FOLLOW}(R)={a,b,\# }$

所以填：

$M[R,a]=R\to\varepsilon$

$M[R,b]=R\to\varepsilon$

$M[R,\#]=R\to\varepsilon$

对 $D\to a$：

$M[D,a]=D\to a$

对 $D\to bd$：

$M[D,b]=D\to bd$

---

最终 LL(1) 分析表是：

| 非终结符 |        $a$        |        $b$        |    $d$    |    $e$    |       $\#$        |
| :------: | :---------------: | :---------------: | :-------: | :-------: | :---------------: |
|   $S$    |     $S\to RT$     |     $S\to RT$     | $S\to RT$ | $S\to eT$ |     $S\to RT$     |
|   $T$    |     $T\to DR$     |     $T\to DR$     |           |           | $T\to\varepsilon$ |
|   $R$    | $R\to\varepsilon$ | $R\to\varepsilon$ | $R\to dR$ |           | $R\to\varepsilon$ |
|   $D$    |     $D\to a$      |     $D\to bd$     |           |           |                   |

空白格表示分析到对应“非终结符 + 当前输入符号”组合时出错。

## 自顶向下分析

在这门课、这类题的语境里，LL(1) 文法和不带回溯的**基本可以当成一样**：构造“不带回溯的自顶向下语法分析器”的判定条件，就是文法满足 **LL(1)** 的条件。标准判据是：对于同一非终结符 $A$ 的任意两个不同候选式：

$$
A\to \alpha_i\mid \alpha_j
$$

要求：

$$
\text{PREDICT}(A\to\alpha_i)\cap \text{PREDICT}(A\to\alpha_j)=\varnothing,\quad i\neq j
$$

展开成常见的两条条件就是：

1. **候选式的开头集合互斥**：

$$
\text{FIRST}(\alpha_i)\cap \text{FIRST}(\alpha_j)=\varnothing,\quad i\neq j
$$

2. **如果某个候选式能推出空串**：

$$
\alpha_i\Rightarrow^*\varepsilon
$$

则它和其他候选式之间还要满足：

$$
  \text{FIRST}(\alpha_j)\cap \text{FOLLOW}(A)=\varnothing,\quad i\neq j
$$

原因是：当分析栈顶是 $A$，当前输入符号是 $a$ 时，分析器需要根据 $a$ 唯一选择一条 $A$ 的产生式。$\text{PREDICT}$ 集两两不相交，就能唯一选择；有交集，就会出现多个候选式都可选，需要回溯或报冲突。

更精确地说：

- “不带回溯”描述的是**分析器行为**：看当前输入符号即可决定规则。
- “LL(1)”描述的是**文法性质**：从左到右扫描输入，构造最左推导，只向前看 $1$ 个符号即可决定规则。

## 判断 LL(1) 文法

快速判断 LL(1) 文法，先看三件事：

第一，看有没有**左递归**。有左递归基本直接排除 LL(1)。例如 $S\to Sab$，这是直接左递归，因为右部一开始就是 $S$。所以 B 排除。

第二，看同一个非终结符的多个候选式，**开头符号是否冲突**。也就是判断 $\text{FIRST}(\alpha_i)\cap \text{FIRST}(\alpha_j)=\varnothing$，如果两个候选式都能以同一个终结符开头，就无法根据一个输入符号决定选哪条产生式。

第三，如果有 $\varepsilon$ 产生式，再额外看 $\text{FIRST}(\alpha_j)\cap \text{FOLLOW}(A)=\varnothing$

---

![](https://images.kisechan.space/uploads/2026/06/24/image-20260624201107189-06ff19d2.png)

这道题没有 $\varepsilon$，所以只看前两步就够了。

---

逐项看：

A：$S\to aSb\mid ab$

两个候选式都是以 $a$ 开头：

$\text{FIRST}(aSb)={a}$

$\text{FIRST}(ab)={a}$

所以：

$\text{FIRST}(aSb)\cap \text{FIRST}(ab)={a}$

有冲突，排除。

B：$S\to ab\mid Sab$

这里有直接左递归：

$S\to Sab$

直接排除。

C：$S\to aSb\mid b$

两个候选式开头分别是 $a$ 和 $b$：

$\text{FIRST}(aSb)={a}$

$\text{FIRST}(b)={b}$

所以：

$\text{FIRST}(aSb)\cap \text{FIRST}(b)=\varnothing$

没有 $\varepsilon$ 产生式，也没有左递归，所以它是 LL(1) 文法。

D：$S\to aS\mid a$

两个候选式都是以 $a$ 开头：

$\text{FIRST}(aS)={a}$

$\text{FIRST}(a)={a}$

所以：

$\text{FIRST}(aS)\cap \text{FIRST}(a)={a}$

有冲突，排除。

最终选 **C**。

---

> 下列文法中属于LL（1）文法的是：
> A. G[S]:
>
> S → ABc
>
> A → a | ε
>
> B → b | ε
>
> B. G[S]:
>
> S → Ab
>
> A → a | B | ε
>
> B → b | ε
>
> C. G[S]:
>
> S → ABBA
>
> A → a | ε
>
> B → b | ε
>
> D. G[S]:
>
> S → aSe | B
>
> B → bBe | C
>
> C → cCe | d
>
> 正确答案AD，

判断 LL(1) 文法最稳的方法是：**只比较同一个非终结符的不同候选式**，看它们的 $\text{PREDICT}$ 集是否两两不相交。

规则：

若 $A\to\alpha$，且 $\alpha$ 不能推出空串：

$\text{PREDICT}(A\to\alpha)=\text{FIRST}(\alpha)$

若 $A\to\alpha$，且 $\alpha\Rightarrow^*\varepsilon$：

$\text{PREDICT}(A\to\alpha)=(\text{FIRST}(\alpha)-{\varepsilon})\cup \text{FOLLOW}(A)$

然后检查：

$\text{PREDICT}(A\to\alpha_i)\cap \text{PREDICT}(A\to\alpha_j)=\varnothing,\quad i\neq j$

---

A 是 LL(1)。

文法：

$S\to ABc$

$A\to a\mid\varepsilon$

$B\to b\mid\varepsilon$

只需要检查 $A$ 和 $B$ 的候选式。

因为 $A$ 后面是 $Bc$，所以：

$\text{FOLLOW}(A)=\text{FIRST}(Bc)={b,c}$

因此：

$\text{PREDICT}(A\to a)={a}$

$\text{PREDICT}(A\to\varepsilon)=\text{FOLLOW}(A)={b,c}$

两者不相交。

因为 $B$ 后面是 $c$，所以：

$\text{FOLLOW}(B)={c}$

因此：

$\text{PREDICT}(B\to b)={b}$

$\text{PREDICT}(B\to\varepsilon)=\text{FOLLOW}(B)={c}$

两者不相交。

所以 A 满足 LL(1)。

---

B 不是 LL(1)。

文法：

$S\to Ab$

$A\to a\mid B\mid\varepsilon$

$B\to b\mid\varepsilon$

先看 $B$：

$\text{PREDICT}(B\to b)={b}$

$\text{PREDICT}(B\to\varepsilon)=\text{FOLLOW}(B)$

$B$ 出现在 $A\to B$ 的末尾，所以：

$\text{FOLLOW}(A)\subseteq\text{FOLLOW}(B)$

又因为 $S\to Ab$，所以：

$b\in\text{FOLLOW}(A)$

于是：

$b\in\text{FOLLOW}(B)$

所以：

$\text{PREDICT}(B\to\varepsilon)$ 中也含有 $b$

于是：

$\text{PREDICT}(B\to b)\cap\text{PREDICT}(B\to\varepsilon)\neq\varnothing$

冲突，B 排除。

也可以从 $A$ 看出冲突：$A\to B$ 可以推出 $b$，$A\to\varepsilon$ 也会在后继符号 $b$ 时使用，看到 $b$ 时无法确定选 $A\to B$ 还是 $A\to\varepsilon$。

---

C 不是 LL(1)。

文法：

$S\to ABBA$

$A\to a\mid\varepsilon$

$B\to b\mid\varepsilon$

问题出在第一个 $B$。

在 $S\to ABBA$ 中，第一个 $B$ 后面跟着 $BA$。

所以：

$\text{FOLLOW}(B)$ 至少包含 $\text{FIRST}(BA)-{\varepsilon}$

因为：

$\text{FIRST}(B)={b,\varepsilon}$

$\text{FIRST}(A)={a,\varepsilon}$

所以：

$\text{FIRST}(BA)={b,a,\varepsilon}$

因此：

$b\in\text{FOLLOW}(B)$

再看 $B$ 的两个候选式：

$\text{PREDICT}(B\to b)={b}$

$\text{PREDICT}(B\to\varepsilon)=\text{FOLLOW}(B)$

由于 $b\in\text{FOLLOW}(B)$，所以：

$b\in\text{PREDICT}(B\to\varepsilon)$

于是：

$\text{PREDICT}(B\to b)\cap\text{PREDICT}(B\to\varepsilon)={b}$

有冲突，C 排除。

直观理解：在 $ABBA$ 里，第一个 $B$ 后面还能跟另一个 $B$，而 $B$ 自己又能推出 $\varepsilon$。看到输入符号 $b$ 时，分析器无法判断当前这个 $b$ 是属于第一个 $B$，还是第一个 $B$ 取空、交给后面的第二个 $B$。

---

D 是 LL(1)。

文法：

$S\to aSe\mid B$

$B\to bBe\mid C$

$C\to cCe\mid d$

没有 $\varepsilon$ 产生式，所以只看同一左部候选式的 $\text{FIRST}$ 是否相交。

对 $S$：

$\text{FIRST}(aSe)={a}$

$\text{FIRST}(B)=\text{FIRST}(bBe\mid C)={b,c,d}$

所以：

${a}\cap{b,c,d}=\varnothing$

对 $B$：

$\text{FIRST}(bBe)={b}$

$\text{FIRST}(C)={c,d}$

所以：

${b}\cap{c,d}=\varnothing$

对 $C$：

$\text{FIRST}(cCe)={c}$

$\text{FIRST}(d)={d}$

所以：

${c}\cap{d}=\varnothing$

所有同左部候选式都能用一个向前看符号唯一选择，所以 D 是 LL(1)。

---

最终答案：**A、D**。

这题的关键不是“文法里有没有 $\varepsilon$”，而是“有 $\varepsilon$ 时，$\varepsilon$ 产生式的 $\text{FOLLOW}$ 会不会和其他候选式的 $\text{FIRST}$ 冲突”。A 没冲突，B 和 C 有冲突，D 没有 $\varepsilon$ 且首符号完全分开。

## 语法分析大题

### 例题 1

> **设有文法** **G**：
>
> S→SaA | bB
>
> A→aB | c
>
> B→Bb | d
>
> （1）消除该文法的左递归；
>
> （2）给出修改后文法每条规则的 Predict 集；
>
> （3）试写出改造后的文法的递归下降语法分析程序。

关于 (1)：

左递归指某个非终结符可以推出以自己开头的形式：

$A\Rightarrow^+ A\alpha$

其中最常见的是直接左递归：

$A\to A\alpha\mid \beta$

这里的规则是：

$A\to A\alpha\mid \beta$

消除后变成：

$A\to \beta A'$（最后一定是会有一个 $\beta$ 在前面的）

$A'\to \alpha A'\mid \varepsilon$

含义是：原来左递归表示“先有一个 $A$，再不断往右追加 $\alpha$”；改写后变成“先生成一个基础部分 $\beta$，再用 $A'$ 不断追加 $\alpha$”。

对 $S$：

$S\to SaA\mid bB$

这里：

$\alpha=aA$

$\beta=bB$

所以改写为：

$S\to bBS'$

$S'\to aAS'\mid \varepsilon$

对 $A$：

$A\to aB\mid c$

右部没有以 $A$ 开头的候选式，所以不用改。

对 $B$：

$B\to Bb\mid d$

这里：

$\alpha=b$

$\beta=d$

所以改写为：

$B\to dB'$

$B'\to bB'\mid \varepsilon$

最终消除左递归后的文法是：

$S\to bBS'$

$S'\to aAS'\mid \varepsilon$

$A\to aB\mid c$

$B\to dB'$

$B'\to bB'\mid \varepsilon$

快速做法：看到 $X\to X\alpha\mid\beta$，直接改成 $X\to\beta X'$，$X'\to\alpha X'\mid\varepsilon$。这题分别对 $S$ 和 $B$ 套模板即可。

标准答案：

> （1）消除左递归后的文法为：
>
> ​ S→bBS’
>
> ​ S’→aAS’ | ε
>
> ​ A→aB | c
>
> ​ B→dB’
>
> ​ B’→bB’ | ε
>
> ​ (2) 消除左递归后每个产生式的Predict集合为
>
> ​ Predict(S→bBS’)={b}
>
> ​ Predict (S’→aAS’)={a}
>
> ​ Predict (S'→ε)={&#35;}
>
> ​ Predict (A→aB)={a}
>
> Predict (A→c)={c}
>
> ​ Predict (B→dB’)={d}
>
> ​ Predict (B’→bB’)={b}
>
> Predict (B'→ε)={a, &#35;}
>
> (3)消除左递归后的文法对应的递归下降语法分析程序如下：
>
> ```cpp
>     void S()
>
>     { if(token==b) {Match(b); B(); S’();}
>
>      else Error();}
>
>     void S’()
>
>     { if(token==a) {Match(a); A(); S’();}
>
>      else if(token==#) {skip;}
>
>      else Error();}
>
>      void A()
>
>     { if(token==a) {Match(a); B();}
>
> else if (token==c) {Match(c);}
>
> else Error();}
>
>     void B()
>
>     { if(token==d) {Match(d); B’();}
>
> else Error();}
>
>     void B’()
>
>     { if(token==b) {Match(b); B’();}
>
> else if (token==a | #) {skip;}
>
>       else Error();}
> ```

## 层数和偏移量的计算

做法固定为三步：

1. 先确定变量使用位置所在的局部化单位
2. 再按“由内到外”查找同名变量
3. 最后用该声明所在层的起始偏移和类型大小计算偏移量

使用性标识符查表时要从当前层开始，逐层向外查找；声明性标识符要登记名字、种类、类型、层数、偏移等属性。

一般规则：

- 进入一个新的局部化单位，也就是新的 `{ ... }` 或函数体，层数加深一层。题目约定“每个局部化单位的起始偏移为 $0$”，所以每一层自己的局部变量都从偏移 $0$ 开始分配。
- 同一局部化单位内，声明变量时按顺序分配偏移。整型、字符型占 $1$ 个单元，实型占 $2$ 个单元。变量的偏移量就是它在本层局部区中的起始位置。
- 使用变量时，采用**近处优先原则**：当前层有同名变量就用当前层的；当前层没有，再向外层查找。笔记中的例子也说明，内层变量会遮蔽外层同名变量。

---

> 约定每个局部化单位的起始偏移为 0，整型、字符型占 1 个单元，实型占 2 个单元。在下面的程序中，第 5 行代码中变量 `i` 的层数和偏移量是_______.
>
> ```cpp
> int  i , j ;
> int main()
> {  	char  i;
>  		i=’A’;
>  		{		float  i;
>     i = 0; }
>  		i = ‘B’;
> }
> ```
>
> A. 1,0 B. 1,1 C. 2,0 D. 2,1

选择 B，因为 C 语言只有 0 层和 1 层之分。

## 四元式

|    类别    |                         四元式                         |        高级语言含义        |
| :--------: | :----------------------------------------------------: | :------------------------: |
|  算术运算  |      $(\text{ADDI},a,b,t)$、$(\text{ADDF},a,b,t)$      |          $t=a+b$           |
|  算术运算  |                 $(\text{SUBI},a,b,t)$                  |          $t=a-b$           |
|  算术运算  |     $(\text{MULTI},a,b,t)$、$(\text{MULTF},a,b,t)$     |          $t=a*b$           |
|  算术运算  |                 $(\text{DIVF},a,b,t)$                  |          $t=a/b$           |
|  类型转换  |  $(\text{FLOAT},x,-,t)$、$(\text{int-to-real},x,-,t)$  |        $t=(float)x$        |
|    赋值    |          $(\text{ASSIG},x,-,y)$、$(:=,x,-,y)$          |           $y=x$            |
|  地址计算  |                 $(\text{AADD},A,t,t')$                 |   $t'=\text{Addr}(A)+t$    |
| 无条件跳转 |                  $(\text{JMP},-,-,L)$                  |         `goto L;`          |
|   真跳转   |                 $(\text{JMP1},E,-,L)$                  |      `if (E) goto L;`      |
|   假跳转   |                 $(\text{JMP0},E,-,L)$                  |     `if (!E) goto L;`      |
|  if 条件   |                 $(\text{THEN},E,-,-)$                  |   $E$ 为假时跳过 `then`    |
| else 分界  |                 $(\text{ELSE},-,-,-)$                  | `then` 执行完后跳过 `else` |
|  if 结束   |                 $(\text{ENDIF},-,-,-)$                 |       `if` 结束定位        |
| while 开始 |                 $(\text{WHILE},-,-,-)$                 |          循环入口          |
| while 条件 |                  $(\text{DO},E,-,-)$                   |     $E$ 为假时跳出循环     |
| while 结束 |               $(\text{ENDWHILE},-,-,-)$                |        跳回循环开始        |
|    标号    |                 $(\text{LABEL},-,-,L)$                 |            `L:`            |
| 子程序入口 | $(\text{ENTRY},\text{Label},\text{Size},\text{Level})$ |       函数/过程入口        |
|  过程返回  |                $(\text{ENDPROC},-,-,-)$                |        过程结束返回        |
|  函数返回  |                $(\text{ENDFUNC},-,-,-)$                |        函数结束返回        |

四元式统一格式是：$(\text{op},\text{ARG1},\text{ARG2},\text{RESULT})$。

其中 $\text{op}$ 是操作码，$\text{ARG1}$、$\text{ARG2}$ 是操作分量，$\text{RESULT}$ 是结果分量；这些分量可以是常量、变量名、临时变量，也可以是带层数、偏移、访问方式的抽象地址。笔记中明确用四元式表示中间代码，并给出 $(\text{op},\text{ARG1},\text{ARG2},\text{RESULT})$ 这个格式。

### 表达式与赋值类四元式

| 四元式形式                      | 含义                             | 对应高级语言写法 |
| ------------------------------- | -------------------------------- | ---------------- |
| $(+,a,b,t)$                     | 计算 $a+b$，结果放入 $t$         | $t=a+b$          |
| $(*,a,b,t)$                     | 计算 $a*b$，结果放入 $t$         | $t=a*b$          |
| $(:=,t,-,x)$                    | 把 $t$ 赋给 $x$                  | $x=t$            |
| $(\text{int-to-real},10,-,t_1)$ | 把整数 $10$ 转成实数，放入 $t_1$ | $t_1=(real)10$   |
| $(\text{FLOAT},x,-,t)$          | 把整数型 $x$ 转成实型，放入 $t$  | $t=(float)x$     |

可以把：

$\text{sum}:=\text{first}+\text{count}*10$

翻译成：

$(\text{int-to-real},10,-,t_1)$

$(*,\text{count},t_1,t_2)$

$(+,\text{first},t_2,t_3)$

$(:=,t_3,-,\text{sum})$

意思是先做类型转换，再做乘法，再做加法，最后赋值。

也可以把整数运算和实数运算区分开，例如：

| 四元式形式             | 含义     | 高级语言写法 |
| ---------------------- | -------- | ------------ |
| $(\text{ADDI},a,b,t)$  | 整数加法 | $t=a+b$      |
| $(\text{ADDF},a,b,t)$  | 实数加法 | $t=a+b$      |
| $(\text{MULTI},a,b,t)$ | 整数乘法 | $t=a*b$      |
| $(\text{MULTF},a,b,t)$ | 实数乘法 | $t=a*b$      |
| $(\text{DIVF},a,b,t)$  | 实数除法 | $t=a/b$      |
| $(\text{SUBI},a,b,t)$  | 整数减法 | $t=a-b$      |

例如表达式：

$X*2+A*(i+1)/(j+1)$

给出的四元式包含：

$(\text{FLOAT},2,-,t_1)$

$(\text{MULTF},X,t_1,t_2)$

$(\text{ADDI},i,1,t_3)$

$(\text{FLOAT},t_3,-,t_4)$

$(\text{MULTF},A,t_4,t_5)$

$(\text{ADDI},j,1,t_6)$

$(\text{FLOAT},t_6,-,t_7)$

$(\text{DIVF},t_5,t_7,t_8)$

$(\text{ADDF},t_2,t_8,t_9)$

这里可以看出：整数表达式用 $\text{ADDI}$，实数表达式用 $\text{ADDF},\text{MULTF},\text{DIVF}$，类型不匹配时先生成 $\text{FLOAT}$ 转换四元式。

### 数组下标变量与地址计算类四元式

数组下标变量的中间代码重点是**计算元素地址**。

数组：$A[i_1][i_2]\cdots[i_n]$

地址公式是：

$$
\text{Addr}(A[i_1][i_2]\cdots[i_n])=\text{Addr}(A)+(i_1-L_1)S_1+(i_2-L_2)S_2+\cdots+(i_n-L_n)S_n
$$

其中：

$\alpha=\text{size}(T)$

$D_i=U_i-L_i+1$

$S_i=D_{i+1}D_{i+2}\cdots D_n\alpha$

用这个公式讲下标变量地址计算。

常见四元式如下：

| 四元式形式                   | 含义                                | 对应高级语言含义       |
| ---------------------------- | ----------------------------------- | ---------------------- |
| $(\text{SUBI},i,L_1,t_1)$    | 计算下标差 $i-L_1$                  | 数组第 1 维偏移起点    |
| $(\text{MULTI},t_1,S_1,t_2)$ | 计算 $(i-L_1)S_1$                   | 第 1 维贡献的地址偏移  |
| $(\text{AADD},A,t_2,t_3)$    | 地址加法，得到 $\text{Addr}(A)+t_2$ | 得到数组元素或部分地址 |
| $(\text{AADD},t_3,t_5,t_6)$  | 继续累加下一维偏移                  | 得到多维数组元素地址   |

例如 $A[i]$可能生成：

$ (\text{SUBI},i,L_1,t_1)$

$(\text{MULTI},t_1,\alpha,t_2)$

$(\text{AADD},A,t_2,t_3)$

最终 $t_3$ 表示 $A[i]$ 的地址。

例如 $A[i][j]$ 可能生成：

$(\text{SUBI},i,L_1,t_1)$

$(\text{MULTI},t_1,S_1,t_2)$

$(\text{AADD},A,t_2,t_3)$

$(\text{SUBI},j,L_2,t_4)$

$(\text{MULTI},t_4,S_2,t_5)$

$(\text{AADD},t_3,t_5,t_6)$

最终 $t_6$ 表示 $A[i][j]$ 的地址。

所以数组类题要抓住：$\text{SUBI}$ 算下标差，$\text{MULTI}$ 算偏移量，$\text{AADD}$ 算地址。

### 无条件与条件跳转类四元式

转移性四元式会在目标代码中生成跳转指令。

| 四元式形式            | 含义                 | 对应高级语言写法  |
| --------------------- | -------------------- | ----------------- |
| $(\text{JMP},-,-,L)$  | 无条件跳转到标号 $L$ | `goto L;`         |
| $(\text{JMP1},E,-,L)$ | 若 $E=1$，跳转到 $L$ | `if (E) goto L;`  |
| $(\text{JMP0},E,-,L)$ | 若 $E=0$，跳转到 $L$ | `if (!E) goto L;` |

这三个是最通用的跳转四元式：

$(\text{JMP},-,-,L)$：直接跳。

$(\text{JMP1},E,-,L)$：条件为真跳。

$(\text{JMP0},E,-,L)$：条件为假跳。

### `if` 语句相关四元式

`if-else` 的结构是：

$(\text{THEN},E.\text{FORM},-,-)$

$S_1$ 的中间代码

$(\text{ELSE},-,-,-)$

$S_2$ 的中间代码

$(\text{ENDIF},-,-,-)$

并且 $\text{THEN}$ 和 $\text{ELSE}$ 的跳转目标地址需要回填。

| 四元式形式             | 含义                                                       | 对应高级语言写法              |
| ---------------------- | ---------------------------------------------------------- | ----------------------------- |
| $(\text{THEN},E,-,-)$  | if 条件控制；按笔记/题库口径，$E$ 为假时跳到 else 或 endif | `if (E) then S1` 中的条件判断 |
| $(\text{ELSE},-,-,-)$  | then 子句结束后，跳过 else 子句                            | `else` 分界                   |
| $(\text{ENDIF},-,-,-)$ | if 语句结束定位                                            | `if` 语句结束                 |

例子：

```c
if (a < b)
    x = 1;
else
    x = 2;
```

可以抽象成：

$(\text{LT},a,b,t_1)$

$(\text{THEN},t_1,-,-)$

$(\text{ASSIG},1,-,x)$

$(\text{ELSE},-,-,-)$

$(\text{ASSIG},2,-,x)$

$(\text{ENDIF},-,-,-)$

回填后，$\text{THEN}$ 跳到 `else` 分支，$\text{ELSE}$ 跳到 `endif` 位置。

没有 `else` 时：

```
if (a < b)
    x = 1;
```

结构是：

$(\text{LT},a,b,t_1)$

$(\text{THEN},t_1,-,-)$

$(\text{ASSIG},1,-,x)$

$(\text{ENDIF},-,-,-)$

此时 $\text{THEN}$ 的假出口回填到 $\text{ENDIF}$。

### `while` 语句相关四元式

`while` 的中间代码结构是：

$(\text{WHILE},-,-,-)$

$E$ 的中间代码

$(\text{DO},E.\text{FORM},-,-)$

$S$ 的中间代码

$(\text{ENDWHILE},-,-,-)$

其中 $\text{WHILE}$ 标记循环开始，$\text{DO}$ 做条件转移，$\text{ENDWHILE}$ 跳回循环头。

| 四元式形式                | 含义                               | 对应高级语言写法          |
| ------------------------- | ---------------------------------- | ------------------------- |
| $(\text{WHILE},-,-,-)$    | 定位循环开始入口                   | `while` 的循环头          |
| $(\text{DO},E,-,-)$       | 条件转移；$E$ 为假时跳出循环       | `while (E) do` 的条件判断 |
| $(\text{ENDWHILE},-,-,-)$ | 循环体结束，跳回 $\text{WHILE}$ 处 | 循环末尾回跳              |

例子：

```c
while (a < b) {
    a = a + 1;
}
```

可抽象成：

$(\text{WHILE},-,-,-)$

$(\text{LT},a,b,t_1)$

$(\text{DO},t_1,-,-)$

$(\text{ADDI},a,1,t_2)$

$(\text{ASSIG},t_2,-,a)$

$(\text{ENDWHILE},-,-,-)$

这里 $\text{DO}$ 的假出口通常要回填到循环后继位置。

### 标号与 `goto` 类四元式

标号定位和 goto 语句主要用：

| 四元式形式             | 含义                 | 对应高级语言写法 |
| ---------------------- | -------------------- | ---------------- |
| $(\text{LABEL},-,-,L)$ | 定义标号位置         | `L: statement`   |
| $(\text{JMP},-,-,L)$   | 无条件跳转到标号 $L$ | `goto L;`        |

`LABEL` 是定位性四元式，本身不产生跳转；`JMP` 是转移性四元式，会生成跳转指令。在基本块划分中也把 `LABEL` 归为标号性/定位性四元式，把 `JMP` 归为转移性四元式。

例子：

```c
goto L1;
x = 1;
L1:
x = 2;
```

可抽象成：

$(\text{JMP},-,-,L_1)$

$(\text{ASSIG},1,-,x)$

$(\text{LABEL},-,-,L_1)$

$(\text{ASSIG},2,-,x)$

如果 `goto L1` 出现时还不知道 $L_1$ 的具体内部标号，就先生成缺目标地址的跳转四元式，后面遇到 `L1:` 时再回填。

### 过程、函数入口与返回类四元式

在基本块划分里列出：

| 四元式形式                                             | 含义                                         | 对应高级语言写法          |
| ------------------------------------------------------ | -------------------------------------------- | ------------------------- |
| $(\text{ENTRY},\text{Label},\text{Size},\text{Level})$ | 子程序入口，记录入口标号、活动记录大小、层数 | 函数/过程定义入口         |
| $(\text{ENDPROC},-,-,-)$                               | 过程返回，跳转到过程调用后的下一句           | `return;` 或过程结束      |
| $(\text{ENDFUNC},-,-,-)$                               | 函数返回，跳转到函数调用处后继位置           | `return expr;` 或函数结束 |

$\text{ENDPROC}$、$\text{ENDFUNC}$ 归为转移性四元式，把 $\text{ENTRY}$ 归为标号性四元式。

另外，运行时存储部分提到：遇到 `call` 四元式时申请新的活动记录，遇到 `return` 或函数结束时释放当前活动记录。也就是说，过程调用类四元式会触发活动记录申请和返回恢复。

### 基本块划分中特别提到的四元式类别

可以把四元式按基本块作用分成几类。

#### 转移性四元式

这些四元式会导致当前基本块结束：

$(\text{JMP},-,-,L)$

$(\text{JMP1},E,-,L)$

$(\text{JMP0},E,-,L)$

$(\text{ENDPROC},-,-,-)$

$(\text{ENDFUNC},-,-,-)$

$(\text{THEN},E,-,-)$

$(\text{ELSE},-,-,-)$

$(\text{DO},E,-,-)$

$(\text{ENDWHILE},-,-,-)$

#### 标号性 / 定位性四元式

这些四元式通常作为新基本块入口：

$(\text{LABEL},-,-,L)$

$(\text{ENTRY},\text{Label},\text{Size},\text{Level})$

$(\text{WHILE},-,-,-)$

$(\text{ENDIF},-,-,-)$
