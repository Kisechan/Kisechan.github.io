---
title: 算法笔记3：折半搜索
url: https://blog.kisechan.space/2025/algo-meet-in-the-middle/
type: post
time: '2026-10-23T15:19:31.963Z'
---

## 优化

Meet in the middle / 折半搜索算法的主要思想是将整个搜索过程**分成两半**，分别搜索，最后将两半的结果**合并**。

本质上还是暴力搜索，但是可以将暴力搜索的复杂度 $O(a^n)$ 减半到 $O(a^{\frac{n}{2}})$ ，适用于数据规模比较小，但是没那么小的题目。

> [**Luogu P2962 [USACO09NOV] Lights G**](https://www.luogu.com.cn/problem/P2962)
>
> **题目描述**
>
> 给出一张 $n$ 个点 $m$ 条边的无向图，每个点的初始状态都为 0。
>
> 你可以操作任意一个点，操作结束后该点以及所有与该点相邻的点的状态都会改变，由 0 变成 1 或由 1 变成 0。
>
> 你需要求出最少的操作次数，使得在所有操作完成之后所有 $n$ 个点的状态都是 1。
>
> **输入格式**
>
> 第一行两个整数 $n$, $m$。
>
> 之后 $m$ 行，每行两个整数 $a$, $b$，表示在点 $a$, $b$ 之间有一条边。
>
> **输出格式**
>
> 一行一个整数，表示最少需要的操作次数。
>
> 本题保证有解。

首先可以考虑用位运算模拟图和状态（ $1$ 表示亮 $0$ 表示不亮）。利用折半查找，那么就是在二进制的状态 `i` 和 `j` 满足 `i^j==(1<<n)-1` 时找到了一个满足的解，记录下最优的那个。

运用位运算要注意运算符**优先级**，多用括号。

代码[^1]：

[^1]: https://oi-wiki.org/search/bidirectional/#meet-in-the-middle

```cpp
#include <algorithm>
#include <iostream>
#include <map>
using namespace std;

int n, m, ans = 0x7fffffff;
map<long long, int> f;
long long a[40];

int main() {
  cin >> n >> m;
  a[0] = 1;
  for (int i = 1; i < n; ++i) a[i] = a[i - 1] * 2;  // 进行预处理

  for (int i = 1; i <= m; ++i) {  // 对输入的边的情况进行处理
    int u, v;
    cin >> u >> v;
    --u;
    --v;
    a[u] |= ((long long)1 << v);
    a[v] |= ((long long)1 << u);
      // 1 表示有边， 0 表示没边
  }

  for (int i = 0; i < (1 << (n / 2)); ++i) {  // 对前一半进行搜索
      // 枚举所有情况
    long long t = 0;
    int cnt = 0;
    for (int j = 0; j < n / 2; ++j) {
      if ((i >> j) & 1) {
          // 按这个灯的时候
        t ^= a[j];
          // 所有它和它连在一起的灯状态都变成相反的
        ++cnt;
      }
    }
    if (!f.count(t))
        // 记录下这个状态的答案
      f[t] = cnt;
    else
      f[t] = min(f[t], cnt);
  }

  for (int i = 0; i < (1 << (n - n / 2)); ++i) {  // 对后一半进行搜索
    long long t = 0;
    int cnt = 0;
    for (int j = 0; j < (n - n / 2); ++j) {
      if ((i >> j) & 1) {
        t ^= a[n / 2 + j];
        ++cnt;
      }
    }
    if (f.count((((long long)1 << n) - 1) ^ t))
      ans = min(ans, cnt + f[(((long long)1 << n) - 1) ^ t]);
  }

  cout << ans;

  return 0;
}
```

---
