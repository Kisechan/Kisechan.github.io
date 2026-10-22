---
title: 算法笔记4：数学专题
url: https://blog.kisechan.space/2025/algo-maths/
type: post
time: '2026-10-22T16:41:52.395Z'
---

主要记录遇到的数学/统计专题和优化方法，不涉及到太难的数论。

## 排列组合

- **无重复排列**：

$$
A(n, k) = \frac{n!}{(n - k)!}
$$

- **全排列**：当 $k = n$ 时，排列数为 $n!$ 。

- **有重复排列**：排列数为 $n^k$ 。

* **无重复组合**：

$$
C(n, k) = \binom{n}{k} = \frac{n!}{k!(n - k)!}
$$

- **有重复组合**：

$$
\binom{n + k - 1}{k}
$$

- **递推关系式**：

$$
\binom{n}{k} = \binom{n - 1}{k} + \binom{n - 1}{k - 1}
$$

$$
\sum_{i=r}^n \binom{i}{r} = \binom{n + 1}{r + 1}
$$

- **二项式定理**：

$$
(a + b)^n = \sum_{k=0}^n \binom{n}{k} a^{n - k} b^k
$$

- **求和**：

$$
\sum_{k=0}^n \binom{n}{k} = 2^n
\sum_{k=0}^n (-1)^k \binom{n}{k} = 0 \quad (n \geq 1)
$$

- **多重集排列**：

$$
\frac{n!}{n_1! n_2! \cdots n_k!}
$$

- **多重集组合**：

$$
\binom{n + k - 1}{k}
$$

- **圆排列**

$$
\frac{n!}{n} = (n - 1)!
$$

---

### 初始化组合数

个人比较喜欢使用杨辉三角：

```cpp
typedef unsigned long long ull;
const int N=101;
ull c[N][N];
void init()
{
    for(int i=0;i<=100;i++)
	{
		for(int j=0;j<=i;j++)
		{
			if(!j||j==i) c[i][j]=1;
			else c[i][j]=c[i-1][j-1]+c[i-1][j];
		}
	}
}
```

---

> [**Luogu P1246 编码**](https://www.luogu.com.cn/problem/P1246)
>
> **题目描述**
>
> 编码工作常被运用于密文或压缩传输。这里我们用一种最简单的编码方式进行编码：把一些有规律的单词编成数字。
>
> 字母表中共有 $26$ 个字母 $\mathtt{a,b,c,\cdots,z}$，这些特殊的单词长度不超过 $6$ 且字母**按升序排列**。把所有这样的单词放在一起，按字典顺序排列，一个单词的编码就对应着它在字典中的位置。
>
> 例如：
>
> - $\verb!a! \to 1$；
> - $\verb!b! \to 2$；
> - $\verb!z! \to 26$；
> - $\verb!ab! \to 27$；
> - $\verb!ac! \to 28$。
>
> 你的任务就是对于所给的单词，求出它的编码。
>
> **输入格式**
>
> 仅一行，被编码的单词。
>
> **输出格式**
>
> 仅一行，对应的编码。如果单词不在字母表中，输出 $0$。

可以使用组合数进行求解，而不是枚举：

注意到，对于 $n$ 位的组合数，它总共的数量 $f(n)$ 满足：

$$
\begin{align*}
f(x) =
\begin{cases}
26 & n=1 \\
\binom{26}{2} & n=2\\
\binom{25}{2}+\binom{24}{2}+...\binom{2}{2}=\binom{26}{3}&n=3\\
...
\end{cases}
\end{align*}
$$

- $n=1$ 时，显然是这样的。

- $n=2$ 时，那么就是从 $26$ 个字母里面选出 $2$ 个，每个都是满足的。

- $n=3$ 时，就要考虑了：

  - 如果第一个字母是 `a` ，那接下来的两个就只能是剩下 $25$ 个字母里面挑 $2$ 个。

  - 如果第一个字母是 `b` ，那接下来的两个就只能是剩下 $24$ 个字母里面挑 $2$ 个。

  - ……

  - 所有的方案应该是

$$
\sum_{i=2}^{25} \binom{i}{2}  =\binom{26}{3}
$$

- 以此类推。

```cpp
#include <bits/stdc++.h>
#define endl '\n'
using namespace std;
typedef long long ll;
const int N=6;
string str;
ll c(int m,int n)
{
	ll a=1,b=1;
	for(int i=1;i<=n;i++) b*=i;
	for(int i=m-n+1;i<=m;i++) a*=i;
	return a/b;
}
int main()
{
    ios::sync_with_stdio(false),cin.tie(0),cout.tie(0);
    cin>>str;
    int n=str.length();
    for(int i=1;i<n;i++)
    	if(str[i]<=str[i-1])
    	{
    		cout<<0<<endl;
    		return 0;
    	}
    ll ans=0;
    for(int i=1;i<n;i++) ans+=c(26,i);
    for(int i=0;i<n;i++)
    	for(char j=(i?str[i-1]+1:'a');j<str[i];j++)
    		ans+=c('z'-j,n-i-1);
    cout<<ans+1<<endl;
}
```

## 最大公约数

```cpp
int gcd(int a,int b)
{
    return b>0?gcd(b,a%b):a;
}

int lcm(int a,int b)
{
    return (a/gcd(a, b))*b;
    // 先除后乘，避免溢出
}
```

或者用 C++ `<algorithm>` 提供的 `__gcd()` 库。

C++ 17 引入了 `std::gcd()` 和 `std::lcm()` ，用于计算最大公约数和最小公倍数。

性质：

$$
[a,b](a,b)=|ab|
$$

$$
[a,b,c](a,b,c)=|abc|
$$

---

> [**Luogu P1029 [NOIP 2001 普及组] 最大公约数和最小公倍数问题**](https://www.luogu.com.cn/problem/P1029)
>
> **题目描述**
>
> 输入两个正整数 $x_0, y_0$，求出满足下列条件的 $P, Q$ 的个数：
>
> 1.  $P,Q$ 是正整数。
>
> 2.  要求 $P, Q$ 以 $x_0$ 为最大公约数，以 $y_0$ 为最小公倍数。
>
> 试求：满足条件的所有可能的 $P, Q$ 的个数。
>
> **输入格式**
>
> 一行两个正整数 $x_0, y_0$。
>
> 输出格式
>
> 一行一个数，表示求出满足条件的 $P, Q$ 的个数。

```cpp
#include <bits/stdc++.h>
#define endl '\n'
using namespace std;
typedef long long ll;
const int N=1e6+5;
int a,b;
int ans=0;
int main()
{
    ios::sync_with_stdio(false),cin.tie(0),cout.tie(0);
	cin>>a>>b;
	if(a==b)
		// 显然，特判一下
	{
		cout<<1<<endl;
		return 0;
	}
	for(int i=1;i*i<=a*b;i++)
	{
		if(!((a*b)%i)&&__gcd(i,a*b/i)==a)
		// 运用 gcd(x,y)*lcm(x,y)==x*y
			ans+=2;
	}
	cout<<ans<<endl;
}
```

## 素数筛

板子：

```cpp
const int N=1e8+5;
int pri[N],top=0;
bool not_prime[N];

void pre(int n)
{
	for(int i=2;i<=n;++i)
	{
		if(!not_prime[i])
		{
			pri[top++]=i;
		}
		for(int pri_j:pri)
		{
			if(i*pri_j>n) break;
			not_prime[i*pri_j]=true;
			if (!(i%pri_j)) break;
		}
	}
}
```
