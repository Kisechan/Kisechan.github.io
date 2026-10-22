---
title: 算法笔记5：树，最短路和生成树
url: https://blog.kisechan.space/2025/algo-graph/
type: post
time: '2026-10-22T16:41:52.395Z'
---

## 树

### [LCA](https://www.luogu.com.cn/problem/P3379)

```cpp
#include <bits/stdc++.h>
#define endl '\n'
using namespace std;
typedef long long ll;
const int N=5e6+5;
int n,m,s;
vector<vector<int>>graph;
int depth[N],father[N][30],lg[N]={0};

void dfs(int r,int fa)
{
	father[r][0]=fa;
	depth[r]=depth[fa]+1;
	for(int i=1;i<=lg[depth[r]];i++)
	{
		father[r][i]=father[ father[r][i-1] ][i-1];
	}
	for(auto i:graph[r]) if(i!=fa) dfs(i,r);
}
int lca(int x,int y)
{
	if(depth[x]<depth[y]) swap(x,y);
	while(depth[x]>depth[y])
	{
		x=father[x][ lg[depth[x]-depth[y]] -1 ];
	}
	if(x==y) return x;
	for(int k=lg[depth[x]]-1;k>=0;k--)
	{
		if(father[x][k]!=father[y][k])
		{
			x=father[x][k];
			y=father[y][k];
		}
	}
	return father[x][0];
}

int main()
{
    ios::sync_with_stdio(false),cin.tie(0),cout.tie(0);
	cin>>n>>m>>s;
	graph.resize(n+1);
	for(int i=0;i<n-1;i++)
	{
		int x,y;
		cin>>x>>y;
		graph[x].push_back(y);
		graph[y].push_back(x);
	}
	for(int i=1;i<=n;i++)
	{
		lg[i]=lg[i-1]+(1<<lg[i-1]==i);
	}
	dfs(s,0);
	while(m--)
	{
		int x,y;
		cin>>x>>y;
		cout<<lca(x,y)<<endl;
	}
}
```

## 最短路

### [Dijkstra](https://www.luogu.com.cn/problem/P4779)

```cpp
#include <bits/stdc++.h>
#define endl '\n'
using namespace std;
typedef long long ll;
const int N=1e5+5;
struct edge
{
	int v,w;
};
struct node
{
	int u,dis;
};
bool operator>(const node&a,const node&b) {return a.dis>b.dis;}
vector<edge>g[N];
bool vis[N];
int d[N];
priority_queue<node,vector<node>,greater<node>>pq;
int n,m,s;
int main()
{
    ios::sync_with_stdio(false),cin.tie(0),cout.tie(0);
	cin>>n>>m>>s;
	for(int i=0;i<m;i++)
	{
		int u,v,w;
		cin>>u>>v>>w;
		g[u].push_back({v,w});
	}
	memset(d,127,sizeof(d));
	d[s]=0;
	pq.push({s,0});
	while(!pq.empty())
	{
		int u=pq.top().u;
		pq.pop();
		if(vis[u]) continue;
		vis[u]=1;
		for(auto ed:g[u])
		{
			int v=ed.v,w=ed.w;
			if(d[v]>d[u]+w)
			{
				d[v]=d[u]+w;
				pq.push({v,d[v]});
			}
		}
	}
	for(int i=1;i<=n;i++)
	{
		cout<<d[i]<<' ';
	}
}
```

### SPFA

> [**Luogu P3385 【模板】负环**](https://www.luogu.com.cn/problem/P3385)
>
> **题目描述**
>
> 给定一个 $n$ 个点的有向图，请求出图中是否存在**从顶点 $1$ 出发能到达**的负环。
>
> 负环的定义是：一条边权之和为负数的回路。
>
> **输入格式**
>
> **本题单测试点有多组测试数据**。
>
> 输入的第一行是一个整数 $T$，表示测试数据的组数。对于每组数据的格式如下：
>
> 第一行有两个整数，分别表示图的点数 $n$ 和接下来给出边信息的条数 $m$。
>
> 接下来 $m$ 行，每行三个整数 $u, v, w$。
>
> - 若 $w \geq 0$，则表示存在一条从 $u$ 至 $v$ 边权为 $w$ 的边，还存在一条从 $v$ 至 $u$ 边权为 $w$ 的边。
> - 若 $w < 0$，则只表示存在一条从 $u$ 至 $v$ 边权为 $w$ 的边。
>
> **输出格式**
>
> 对于每组数据，输出一行一个字符串，若所求负环存在，则输出 `YES`，否则输出 `NO`。

SPFA 可以找到从顶点 $s$ 出发是否存在一个可到达的负环。

```cpp
#include <bits/stdc++.h>
#define endl '\n'
using namespace std;
typedef long long ll;
const int N = 3000;

struct edge
{
    int v, w;
};

bool spfa()
{
    vector<edge> e[N];
    int dis[N], cnt[N], vis[N];
    int n, m, s = 1;
    cin >> n >> m;
    for (int i = 0; i < m; i++)
    {
        int u, v, w;
        cin >> u >> v >> w;
        if (w >= 0)
        {
            e[u].push_back({v, w});
            e[v].push_back({u, w});
        }
        else e[u].push_back({v, w});
    }

    memset(dis, 0x3f, sizeof(dis));
    memset(cnt, 0, sizeof(cnt));
    memset(vis, 0, sizeof(vis));

    queue<int> q;
    dis[s] = 0;
    vis[s] = 1;
    q.push(s);

    while (!q.empty())
    {
        int u = q.front(); q.pop();
        vis[u] = 0;
        for (auto ed : e[u])
        {
            int v = ed.v, w = ed.w;
            if (dis[v] > dis[u] + w)
            {
                dis[v] = dis[u] + w;
                if (!vis[v])
                {
                    cnt[v]++;
                    if (cnt[v] >= n)  return true;
                    vis[v] = 1;
                    q.push(v);
                }
            }
        }
    }
    return false;
}

int main()
{
    ios::sync_with_stdio(false), cin.tie(0), cout.tie(0);
    int t;
    cin >> t;
    while (t--) cout << (spfa() ? "YES" : "NO") << endl;
}
```

### 分层图最短路

> [**Luogu P4568 [JLOI2011] 飞行路线**](https://www.luogu.com.cn/problem/P4568)
>
> **题目描述**
>
> Alice 和 Bob 现在要乘飞机旅行，他们选择了一家相对便宜的航空公司。该航空公司一共在 $n$ 个城市设有业务，设这些城市分别标记为 $0$ 到 $n-1$，一共有 $m$ 种航线，每种航线连接两个城市，并且航线有一定的价格。
>
> Alice 和 Bob 现在要从一个城市沿着航线到达另一个城市，途中可以进行转机。航空公司对他们这次旅行也推出优惠，他们可以免费在最多 $k$ 种航线上搭乘飞机。那么 Alice 和 Bob 这次出行最少花费多少？
>
> **输入格式**
>
> 第一行三个整数 $n,m,k$，分别表示城市数，航线数和免费乘坐次数。
>
> 接下来一行两个整数 $s,t$，分别表示他们出行的起点城市编号和终点城市编号。
>
> 接下来 $m$ 行，每行三个整数 $a,b,c$，表示存在一种航线，能从城市 $a$ 到达城市 $b$，或从城市 $b$ 到达城市 $a$，价格为 $c$。
>
> **输出格式**
>
> 输出一行一个整数，为最少花费。

可以建立 $k$ 层一模一样的图，每一层之间，则通过免费的航线连起来，如果从第 $i$ 层飞到 $i+1$ 层的话，那么就说明用了一次免费乘坐的次数。

![https://www.luogu.com.cn/article/ul9rz6oi](https://cdn.luogu.com.cn/upload/pic/19106.png)

只需要跑 Dijkstra ，然后找到 `dis[i+n*k]` 中的最小值即可（因为不一定要用完乘坐次数）。

### 二分

> [**Luogu P1462 通往奥格瑞玛的道路**](https://www.luogu.com.cn/problem/P1462)
>
> **题目背景**
>
> 在艾泽拉斯大陆上有一位名叫歪嘴哦的神奇术士，他是部落的中坚力量。
>
> 有一天他醒来后发现自己居然到了联盟的主城暴风城。
>
> 在被众多联盟的士兵攻击后，他决定逃回自己的家乡奥格瑞玛。
>
> **题目描述**
>
> 在艾泽拉斯，有 $n$ 个城市。编号为 $1,2,3,\ldots,n$。
>
> 城市之间有 $m$ 条双向的公路，连接着两个城市，从某个城市到另一个城市，会遭到联盟的攻击，进而损失一定的血量。
>
> 每次经过一个城市，都会被收取一定的过路费（包括起点和终点）。路上并没有收费站。
>
> 假设 $1$ 为暴风城，$n$ 为奥格瑞玛，而他的血量最多为 $b$，出发时他的血量是满的。如果他的血量降低至负数，则他就无法到达奥格瑞玛。
>
> 歪嘴哦不希望花很多钱，他想知道，在所有可以到达奥格瑞玛的道路中，对于每条道路所经过的城市收费的最大值，最小值为多少。
>
> **输入格式**
>
> 第一行 $3$ 个正整数，$n,m,b$。分别表示有 $n$ 个城市，$m$ 条公路，歪嘴哦的血量为 $b$。
>
> 接下来有 $n$ 行，每行 $1$ 个正整数，$f_i$。表示经过城市 $i$，需要交费 $f_i$ 元。
>
> 再接下来有 $m$ 行，每行 $3$ 个正整数，$a_i,b_i,c_i$（$1\leq a_i,b_i\leq n$）。表示城市 $a_i$ 和城市 $b_i$ 之间有一条公路，如果从城市 $a_i$ 到城市 $b_i$，或者从城市 $b_i$ 到城市 $a_i$，会损失 $c_i$ 的血量。
>
> **输出格式**
>
> 仅一个整数，表示歪嘴哦交费最多的一次的最小值。
>
> 如果他无法到达奥格瑞玛，输出 `AFK`。

**找极值都可以用二分**。

二分交费价格 $\mathrm{mid}$，如果超过了 $\mathrm{mid}$ ，那就不走这个城市，如果血量不够寄了那就 `l=mid+1` ，否则 `r=mid` 。

```cpp
#include <bits/stdc++.h>
#define endl '\n'
using namespace std;
typedef long long ll;
const int N = 2e5 + 5, inf = 1061109567;
int n, m, b;
struct edge
{
    int v, w;
};
struct node
{
    int u, dis;
};
vector<edge> g[N];
int f[N], d[N];
bool vis[N];
bool operator>(const node& a, const node& b) { return a.dis > b.dis; }
void dijkstra(int s, int t, int mid)
{
    priority_queue<node, vector<node>, greater<node>> pq;
    memset(d, 63, N * sizeof(int));
    memset(vis, 0, N * sizeof(bool));
    // 注意要用 sizeof bool
    d[s] = 0;
    pq.push({s, 0});
    while (!pq.empty())
    {
        int u = pq.top().u;
        pq.pop();
        if (vis[u]) continue;
        vis[u] = true;
        for (auto ed : g[u])
        {
            int v = ed.v, w = ed.w;
            if (f[v] > mid) continue;
            if (d[v] > d[u] + w)
            {
                d[v] = d[u] + w;
                pq.push({v, d[v]});
            }
        }
    }
}
int main()
{
    ios::sync_with_stdio(false), cin.tie(0), cout.tie(0);
    cin >> n >> m >> b;
    int l, r = -1;
    for (int i = 1; i <= n; i++)
    {
        cin >> f[i];
        r = max(r, f[i]);
    }
    l = max(f[1], f[n]);
    for (int i = 0; i < m; i++)
    {
        int u, v, w;
        cin >> u >> v >> w;
        g[u].push_back({v, w});
        g[v].push_back({u, w});
    }
    while (l < r)
    {
        int mid = (l + r) / 2;
        dijkstra(1, n, mid);
        if (d[n] > b) l = mid + 1;
        else r = mid;
    }
    dijkstra(1, n, l);
    if (d[n] > b) cout << "AFK" << endl;
    else cout << l << endl;
}
```

## 生成树

### 虚点

> **CF1245D Shichikuji and Power Grid**
>
> **题目描述**
>
> Shichikuji is the new resident deity of the South Black Snail Temple. Her first job is as follows:
>
> There are $ n $ new cities located in Prefecture X. Cities are numbered from $ 1 $ to $ n $ . City $ i $ is located $ x_i $ km North of the shrine and $ y_i $ km East of the shrine. It is possible that $ (x_i, y_i) = (x_j, y_j) $ even when $ i \ne j $ .
>
> Shichikuji must provide electricity to each city either by building a power station in that city, or by making a connection between that city and another one that already has electricity. So the City has electricity if it has a power station in it or it is connected to a City which has electricity by a direct connection or via a chain of connections.
>
> - Building a power station in City $ i $ will cost $ c_i $ yen;
> - Making a connection between City $ i $ and City $ j $ will cost $ k_i + k_j $ yen per km of wire used for the connection. However, wires can only go the cardinal directions (North, South, East, West). Wires can cross each other. Each wire must have both of its endpoints in some cities. If City $ i $ and City $ j $ are connected by a wire, the wire will go through any shortest path from City $ i $ to City $ j $ . Thus, the length of the wire if City $ i $ and City $ j $ are connected is $ |x_i - x_j| + |y_i - y_j| $ km.
>
> Shichikuji wants to do this job spending as little money as possible, since according to her, there isn't really anything else in the world other than money. However, she died when she was only in fifth grade so she is not smart enough for this. And thus, the new resident deity asks for your help.
>
> And so, you have to provide Shichikuji with the following information: minimum amount of yen needed to provide electricity to all cities, the cities in which power stations will be built, and the connections to be made.
>
> If there are multiple ways to choose the cities and the connections to obtain the construction of minimum price, then print any of them.
>
> **输入格式**
>
> First line of input contains a single integer $ n $ ( $ 1 \leq n \leq 2000 $ ) — the number of cities.
>
> Then, $ n $ lines follow. The $ i $ -th line contains two space-separated integers $ x_i $ ( $ 1 \leq x_i \leq 10^6 $ ) and $ y_i $ ( $ 1 \leq y_i \leq 10^6 $ ) — the coordinates of the $ i $ -th city.
>
> The next line contains $ n $ space-separated integers $ c_1, c_2, \dots, c_n $ ( $ 1 \leq c_i \leq 10^9 $ ) — the cost of building a power station in the $ i $ -th city.
>
> The last line contains $ n $ space-separated integers $ k_1, k_2, \dots, k_n $ ( $ 1 \leq k_i \leq 10^9 $ ).
>
> **输出格式**
>
> In the first line print a single integer, denoting the minimum amount of yen needed.
>
> Then, print an integer $ v $ — the number of power stations to be built.
>
> Next, print $ v $ space-separated integers, denoting the indices of cities in which a power station will be built. Each number should be from $ 1 $ to $ n $ and all numbers should be pairwise distinct. You can print the numbers in arbitrary order.
>
> After that, print an integer $ e $ — the number of connections to be made.
>
> Finally, print $ e $ pairs of integers $ a $ and $ b $ ( $ 1 \le a, b \le n $ , $ a \ne b $ ), denoting that a connection between City $ a $ and City $ b $ will be made. Each unordered pair of cities should be included at most once (for each $ (a, b) $ there should be no more $ (a, b) $ or $ (b, a) $ pairs). You can print the pairs in arbitrary order.
>
> If there are multiple ways to choose the cities and the connections to obtain the construction of minimum price, then print any of them.

建立一个**虚点**，和虚点连接了就表示建造了一个发电站。

鉴于边很多，使用 Prim 算法效率更高。
