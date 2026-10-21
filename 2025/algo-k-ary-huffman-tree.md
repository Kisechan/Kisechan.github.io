---
title: 算法笔记7：k-叉 Huffman 树
url: https://blog.kisechan.space/2025/algo-k-ary-huffman-tree/
type: post
time: '2026-10-21T16:13:46.163Z'
---

## 证明

假设在 $k$-叉 Huffman 树中，叶子结点有 $n$ 个，内部结点有 $m$ 个。每个内部节点都有 $k$ 个子结点，叶子结点没有子结点，所以这棵树总**子结点数**就是 $mk$ ；另外，树的**总边数**等于 $n+m-1$ 。

因为树的边是父结点指向子结点的，所以子结点数等于总边数：

$$
n+m-1=mk
$$

整理得：

$$
m=\frac{n-1}{k-1}\Longrightarrow (k-1)\mid(n-1)
$$

所以对于一个 $k$-叉 Huffman 树，一定满足 $(k-1)\mid(n-1)$ 。如果提供的叶结点数不满足这个条件，只用在建树的时候加上若干个权值为 $0$ 的结点直到条件成立为止。

> [**Luogu P2168 [NOI2015] 荷马史诗**](https://www.luogu.com.cn/problem/P2168)
>
> **题目背景**
>
> > 追逐影子的人，自己就是影子 —— 荷马
>
> **题目描述**
>
> Allison 最近迷上了文学。她喜欢在一个慵懒的午后，细细地品上一杯卡布奇诺，静静地阅读她爱不释手的《荷马史诗》。但是由《奥德赛》和《伊利亚特》 组成的鸿篇巨制《荷马史诗》实在是太长了，Allison 想通过一种编码方式使得它变得短一些。
>
> 一部《荷马史诗》中有 $n$ 种不同的单词，从 $1$ 到 $n$ 进行编号。其中第 $i$ 种单词出现的总次数为 $w_i$。Allison 想要用 $k$ 进制串 $s_i$ 来替换第 $i$ 种单词，使得其满足如下要求：
>
> 对于任意的 $1\leq i, j\leq n$ ，$i\ne j$ ，都有：$s_i$ 不是 $s_j$ 的前缀。
>
> 现在 Allison 想要知道，如何选择 $s_i$，才能使替换以后得到的新的《荷马史诗》长度最小。在确保总长度最小的情况下，Allison 还想知道最长的 $s_i$ 的最短长度是多少？
>
> 一个字符串被称为 $k$ 进制字符串，当且仅当它的每个字符是 $0$ 到 $k-1$ 之间（包括 $0$ 和 $k-1$ ）的整数。
>
> 字符串 $str1$ 被称为字符串 $str2$ 的前缀，当且仅当：存在 $1 \leq t\leq m$ ，使得 $str1 = str2[1..t]$。其中，$m$ 是字符串 $str2$ 的长度，$str2[1..t]$ 表示 $str2$ 的前 $t$ 个字符组成的字符串。
>
> **输入格式**
>
> 输入的第 $1$ 行包含 $2$ 个正整数 $n, k$ ，中间用单个空格隔开，表示共有 $n$ 种单词，需要使用 $k$ 进制字符串进行替换。
>
> 接下来 $n$ 行，第 $i + 1$ 行包含 $1$ 个非负整数 $w_i$，表示第 $i$ 种单词的出现次数。
>
> **输出格式**
>
> 输出包括 $2$ 行。
>
> 第 $1$ 行输出 $1$ 个整数，为《荷马史诗》经过重新编码以后的最短长度。
>
> 第 $2$ 行输出 $1$ 个整数，为保证最短总长度的情况下，最长字符串 $s_i$ 的最短长度。

```cpp
#include <bits/stdc++.h>
#define endl '\n'
#define ll long long
using namespace std;
const int N=1e6+5;
struct node
{
	ll w,h;
	bool operator<(const node&a) const
	{ return w>a.w||w==a.w&&h>a.h; }
};
priority_queue<node>q;
ll n,k;
ll ans=0;
int main()
{
    ios::sync_with_stdio(false),cin.tie(0),cout.tie(0);
    cin>>n>>k;
    for(int i=0;i<n;i++)
    {
    	ll t; cin>>t;
    	q.push({t,0});
    }
    while((q.size()-1)%(k-1)) q.push({0,0});
    // 插入虚结点
    while(q.size()>=k)
    {
    	ll w=0,h=-1;
    	for(int i=0;i<k;i++)
    	{
    		auto[tw,th]=q.top(); q.pop();
    		h=max(h,th);
    		w+=tw;
            ans+=tw;
    	}
    	q.push({w,h+1});
    }
    cout<<ans<<endl;
    cout<<q.top().h<<endl;
}
```
