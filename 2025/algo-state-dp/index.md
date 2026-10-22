---
title: 算法笔记2：状压 dp
url: https://blog.kisechan.space/2025/algo-state-dp/
type: post
time: '2026-10-22T16:41:52.395Z'
---

## 优化方式

状压 dp 能将**排列复杂度**转为**指数级复杂度**。

> [**Luogu P1433 吃奶酪**](https://www.luogu.com.cn/problem/P1433)
>
> **题目描述**
>
> 房间里放着 $n$ 块奶酪。一只小老鼠要把它们都吃掉，问至少要跑多少距离？老鼠一开始在 $(0,0)$ 点处。
>
> **输入格式**
>
> 第一行有一个整数，表示奶酪的数量 $n$。
>
> 第 2 到第 $(n+1)$ 行，每行两个实数，第 $(i+1)$ 行的实数分别表示第 $i$ 块奶酪的横纵坐标 $x_i$,$y_i$。
>
> **输出格式**
>
> 输出一行一个实数，表示要跑的最少距离，保留 2 位小数。

暴力求解的话就需要把所有的路径排列：$ABC$、$ACB$枚举出来，并计算总长度，复杂度为 $O(n!)$ ，且不同顺序的路径之间不能够共享子问题的答案，难以优化。

所以状压 dp 的核心思路就是：

- **状态压缩**，关心已经走过了的点的集合（用二进制数表示），而不是走过点的顺序，避免枚举全排列
- **动态规划**，找到子问题的最优解，并把它们合起来

那么它需要维护的数据就是：

- **当前的状态**，也就是走过了的点的集合，毕竟要用动态规划求解，路径是不重要的，只需要找出当前状态的最短的路径和就行
- **当前走到了的点**，因为要枚举，所以就从这里入手

这样的话，时间复杂度就变成了 $O(n2^n)$ ， $n$ 代表着要遍历某状态下，当前所处的点的所有的可能， $2^n$ 就是对所有状态的枚举。一般 $n\leq21$ 的数据是可以通过的。

为什么相比于枚举所有路径，状压 dp 能优化呢？因为动态规划让我们根据不同路径走到了相同的状态时，不再需要去寻找别的解，直接**复用**已经找到了的最优解。

```cpp
#include <bits/stdc++.h>
#define endl '\n'
using namespace std;
typedef long long ll;
const int N=20;
double x[N],y[N];
double dis[N][N]={0};
double f[N][40000];
int n;
double ans;
inline double cal(int u,int v)
{
	return sqrt((x[u]-x[v])*(x[u]-x[v])+(y[u]-y[v])*(y[u]-y[v]));
}
int main()
{
    scanf("%d",&n);
    memset(f,127,sizeof(f));
    //赋极大值
    ans=f[0][0];
    for(int i=1;i<=n;i++)
    {
    	scanf("%lf%lf",x+i,y+i);
    }
    for(int i=0;i<=n;i++)
    {
    	for(int j=i+1;j<=n;j++)
    	{
    		dis[j][i]=cal(i,j);
    		dis[i][j]=dis[j][i];
    	}
    }
    for(int i=1;i<=n;i++)
    {
    	f[i][1<<(i-1)]=dis[i][0];
    }
    for(int i=1;i<=n;i++)
    {
    	for(int k=1;k<(1<<n);k++)
    	{
    		if((k&(1<<(i-1)))==0)
				continue;
			for(int j=1;j<=n;j++)
			{
				if(i==j)
					continue;
				if((k&(1<<(j-1)))==0)
					continue;
				f[i][k]=min(f[i][k],f[j][k-(1<<(i-1))]+dis[i][j]);
			}
    	}
    }
    for(int i=1;i<=n;i++)
    {
    	ans=min(ans,f[i][(1<<n)-1]);
    }
    printf("%.2lf",ans);
}
```

> ### 关于 `memset` 的踩坑
>
> 使用 `memset` 对数组进行赋值是按照字节来的，所以有一些需要注意的地方：
>
> 常见的 `0x3f3f3f` = `1061109567` ，赋值给普通的 `int` 变量，就相当于 `1e9` 没什么问题，但是通过 `memset` 赋值给整型数组的话就不一样了，它是只取最后两个 `3f` 给 `int` 的每一个字节（一个 `int` 占 4 个字节）赋值，所以这个时候 `0x3f3f3f` 和 `0x3f` 是等效的。
>
> 那么就可以发现：**用 `memset` 赋值的话也可以直接用 `127` = `0111 1111` 赋极大值**，**用 `128` = `1000 0000` 赋极小值**。
>
> 对于浮点数，因为引入了阶码所以要另外讨论，如果对 `double` 数组用 `memset` 赋 `0x3f3f3f` ，只能得到一个很小的值 **`0.000476792`**，只有赋 `127` 或者 `128` 才能给它赋成极大值或极小值。
>
> ```cpp
> #include <bits/stdc++.h>
> #define endl '\n'
> using namespace std;
> typedef long long ll;
> const int N=1e3;
> int main()
> {
>     ios::sync_with_stdio(false),cin.tie(0),cout.tie(0);
>     int a[N],b[N],c[N];
>     double d[N],e[N],f[N];
>     memset(a,127,sizeof(a));
>     cout<<a[0]<<endl;
>     memset(b,128,sizeof(b));
>     cout<<b[0]<<endl;
>     memset(c,0x3f,sizeof(b));
>     cout<<c[0]<<endl;
>     memset(d,127,sizeof(d));
>     cout<<d[0]<<endl;
>     memset(e,128,sizeof(e));
>     cout<<e[0]<<endl;
>     memset(f,0x3f,sizeof(f));
>     cout<<f[0]<<endl;
> }
> ```
>
> 输出为：
>
> ```text
> 2139062143
> -2139062144
> 1061109567
> 1.38242e+306
> -2.93745e-306
> 0.000476792
> ```

## 集合的状压

> [**Luogu P5911 [POI 2004] PRZ**](https://www.luogu.com.cn/problem/P5911)
>
> **题目背景**
>
> 一只队伍在爬山时碰到了雪崩，他们在逃跑时遇到了一座桥，他们要尽快的过桥。
>
> **题目描述**
>
> 桥已经很旧了, 所以它不能承受太重的东西。任何时候队伍在桥上的人都不能超过一定的限制。 所以这只队伍过桥时只能分批过，当一组全部过去时，下一组才能接着过。队伍里每个人过桥都需要特定的时间，当一批队员过桥时时间应该算走得最慢的那一个，每个人也有特定的重量，我们想知道如何分批过桥能使总时间最少。
>
> **输入格式**
>
> 第一行两个数: $W$ 表示桥能承受的最大重量和 $n$ 表示队员总数。
>
> 接下来 $n$ 行：每行两个数: $t$ 表示该队员过桥所需时间和 $w$ 表示该队员的重量。
>
> **输出格式**
>
> 输出一个数表示最少的过桥时间。

需要模拟的对象从一个单独的地点，变成了若干个人组成的集合，怎么样枚举呢？

如果用二进制数 $010101$ 表示状态，$1$ 表示已经过去的人，那首先就是从 0 开始顺序枚举每一种情况 $i$ ，再枚举它的每一个真子集 $j$ ，因为 $j$ 里面 $1$ 的数量更少，就表示 $i$ 是从 $j$ 转变过来的，那它们进行异或就表示这个状态具体的变化 $i\oplus j$ 。写出状态转移:

$$
f(i)= \begin{cases}
\min (f(i),f(j)+T[i\oplus j]), &{W[i\oplus j] \leq }W_{\mathrm{max}} \\
f(i), &\text{else}
\end{cases}
$$

```cpp
#include <bits/stdc++.h>
#define endl '\n'
using namespace std;
typedef long long ll;
const int N=17;
int t[N],w[N];
int T[1<<N],W[1<<N],f[1<<N];
int tot,n;
int main()
{
    ios::sync_with_stdio(false),cin.tie(0),cout.tie(0);
    cin>>tot>>n;
    for(int i=1;i<=n;i++) cin>>t[i]>>w[i];
    for(int i=0;i<(1<<n);i++)
    {
    	for(int j=1;j<=n;j++)
    	{
    		if(i&(1<<(j-1)))
    		{
    			T[i]=max(T[i],t[j]);
    			W[i]+=w[j];
    		}
    	}
    }
    memset(f,0x3f,sizeof(f));
    f[0]=0;
    for(int i=0;i<(1<<n);i++)
    {
    	for(int j=i;;j=i&(j-1))
    	{
    		if(W[i^j]<=tot)
    		{
    			f[i]=min(f[i],f[j]+T[i^j]);
    		}
    		if(!j) break;
    	}
    }
    cout<<f[(1<<n)-1]<<endl;
}
```
