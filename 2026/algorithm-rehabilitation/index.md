---
title: 算法题复健和推免机试记录
url: https://blog.kisechan.space/2026/algorithm-rehabilitation/
type: post
time: '2026-10-24T09:09:07.707Z'
---

最近为了准备推免机试才重新捡起了算法题，老实说我其实一直对自己的做题能力没有什么信心：

- 太久没做题了，一些板子都不记得了。
- 难的题型还有高阶的数据结构和完全不会。
- 之前参加的算法比赛没有成绩，被早培的 OIer 和天赋哥们吊起来打。
- 不愿意动脑子只想用 Agent 来写代码。

因为这些原因，所以心里很虚，一直也没有什么动力去做题，本科三年也越来越觉得做题是毫无意义的，大一的时候放弃 ACM 队的选拔还有蓝桥杯大概也是因为这个原因[^1]。但是总归是要考的，所以就大概过了一遍 LeetCode Hot 100。

[^1]: 好在蓝桥杯现在变成路边一条了。

其实到了现在我几乎连 C++ 都不会了，只能手打一下题目来训练，于是复健了三天一直在做题，还是有好结果的。今天中午考武大的机试，四题 <font color="green">AC</font> 了两题，拿到 350/400 过了：

1. 一个区间 DP，<font color="green">AC</font>。
2. 图 BFS，一个点 <font color="red">WA</font> 没调出来，90/100。
3. 矩阵的 01 的翻转，<font color="red">不会</font>，骗分 60/100。
4. 手写 GCD，签到题，<font color="green">AC</font>。

![](https://images.kisechan.space/uploads/2026/09/15/image-20260915182715003-566e2bb8.png)

私以为 Hot 100 的题型覆盖范围还是挺广挺全的，如果真的能吃透差不多就能应付大多数机试了（清除外）。会了典型题型，然后再做一些模拟就够了，当然“掌握”的意思就是要熟练于心。

## 二分

二分是这次最早复习的一类。以前对二分的印象经常停留在 `while (l <= r)`，然后 `mid` 左右移动，但是**不同写法的返回值到底代表什么**很容易搞错。

### 精确查找

最普通的二分：

```cpp
int l = 0, r = n - 1;

while (l <= r) {
    int mid = l + (r - l) / 2;

    if (a[mid] == target)
        return mid;
    else if (a[mid] < target)
        l = mid + 1;
    else
        r = mid - 1;
}

return -1;
```

这里维护的是闭区间：$[l, r]$。

`mid` 已经检查过，所以更新时直接排除：

```cpp
l = mid + 1;
r = mid - 1;
```

### `lower_bound`

找第一个大于等于 `target` 的位置（LeetCode 35）：

```cpp
int l = 0, r = n - 1;

while (l <= r) {
    int mid = l + (r - l) / 2;

    if (a[mid] < target)
        l = mid + 1;
    else
        r = mid - 1;
}

return l;
```

最后的 `l` 表示：第一个满足 `a[i] >= target` 的位置，以前很容易顺手 `return mid`，但循环结束后的 `mid` 只是最后一次被检查的位置，并不代表边界。

### `upper_bound`

找第一个严格大于 `target` 的位置（LeetCode 34）。只需要改一个等号：

```cpp
if (a[mid] <= target)
    l = mid + 1;
else
    r = mid - 1;
```

最后：

```cpp
return l;
```

表示第一个大于 `target` 的位置，所以查找元素区间也可以写成：

```cpp
left = lower_bound(...)
right = upper_bound(...) - 1;
```

### `while (l < r)` 型二分

另一类题不是“检查 mid 然后排除”，而是不断缩小候选区间，最终让 $l = r$。比如旋转数组找最小值：

```cpp
while (l < r) {
    int mid = l + (r - l) / 2;

    if (nums[mid] > nums[r])
        l = mid + 1;
    else
        r = mid;
}
```

这里 `r = mid` 而不是 `mid - 1`，因为 `mid` 本身仍然可能是答案。

---

所以可以总结成：

- `while (l <= r)` 常用于检查 `mid`，然后排除 `mid`。
- `while (l < r)` 常用于保留候选答案，不断收敛。

### 二分 debug

建议直接打印：

```cpp
cerr << "l=" << l
     << " r=" << r
     << " mid=" << mid
     << '\n';
```

主要检查三个东西：

1. 区间有没有真的缩小；
2. `mid` 有没有可能永远等于某个边界；
3. 最后应该返回 `l`、`r` 还是 `mid`。

特别是：`l = mid` 这种写法要非常警惕，因为下一轮可能完全不变，直接死循环。

## 链表

考验指针操作，但是机试一般不会给 LeetCode 那样封装好的链表，所以出现概率应该很小。

### 反转链表

标准三指针：

```cpp
ListNode* prev = nullptr;
ListNode* cur = head;

while (cur) {
    ListNode* next = cur->next;

    cur->next = prev;

    prev = cur;
    cur = next;
}

return prev;
```

### 快慢指针

其实是我第一次知道有快慢指针这种写法，主要题型是：

- 找链表中点；
- 判断环；
- 找环入口；
- 删除倒数第 `N` 个节点。

### Dummy Node

删除节点、交换节点、合并链表时，dummy node 很有价值。本质上是把“头节点的特殊情况”统一成普通节点操作。

## 滑动窗口、前缀和与双指针

这几类算法形式很像，但适用条件不一样。

### 滑动窗口

LeetCode 3 最长无重复子串：

```cpp
unordered_set<char> st;
int l = 0;

for (int r = 0; r < s.size(); r++) {
    while (st.count(s[r])) {
        st.erase(s[l]);
        l++;
    }

    st.insert(s[r]);
    ans = max(ans, r - l + 1);
}
```

核心模型：右指针扩展窗口，条件不满足时移动左指针。

### 固定长度窗口

LeetCode 438 找异位词属于固定窗口。

窗口长度始终等于 `p.size()`。维护两个 26 长度数组即可。

### 前缀和 + 哈希

LeetCode 560：`prefix[j] - prefix[i] = k` 等价于 `prefix[i] = prefix[j] - k`，所以维护：

```cpp
unordered_map<int, int> cnt;
cnt[0] = 1;
```

然后遍历：

```cpp
sum += x;

ans += cnt[sum - k];

cnt[sum]++;
```

其中 `cnt[0] = 1;` 代表虚拟的 `prefix[-1] = 0`，这样从数组开头开始的子数组也能被统计。

### 三数之和

排序 + 双指针，基本思路：固定 `nums[i]`，然后在 `i+1...n-1` 中做 Two Sum。排序之后：

```cpp
int j = i + 1;
int k = n - 1;
```

如果 `sum < 0`，就 `j++`，因为需要更大的值。如果 `sum > 0`，就 `k--`，因为需要更小的值。整体复杂度 $O(n^2)$。另外，去重即使写成额外的 `while`，也不会变成 $O(n^3)$，因为左右指针始终只单向移动。

## 栈、单调栈和单调队列

这一块是复习过程中比较有意思的一部分，因为很多题我记得“用单调栈”，但忘了为什么。

### MinStack

最小栈可以用两个栈：

- 普通栈 `s`
- 最小值栈 `mins`

`push` 时：

```cpp
s.push(x);

if (mins.empty() || x <= mins.top())
    mins.push(x);
```

这里必须是 `<=`，因为可能存在重复最小值。

`pop` 时：

```cpp
if (s.top() == mins.top())
    mins.pop();

s.pop();
```

### 字符串解码

LeetCode 394 是典型的栈保存上下文。例如 `3[a2[c]]`，遇到 `[` 时，把当前重复次数和当前字符串压栈，处理 `]` 时恢复外层字符串并展开。

### 每日温度

单调递减栈。题目要求要右边第一个更大的元素，所以要维护**从栈底到栈顶对应温度递减**，新温度一旦大于栈顶，就说明栈顶那个元素的答案确定了。

### 柱状图最大矩形

单调递增栈。

这道题有个关键的数学事实是：任意一个矩形的高度，一定由它覆盖范围中最低的柱子决定。

所以对于每根柱子 `k`，把 `heights[k]` 作为矩形高度，然后我们要找到：

- 左边第一个小于 `heights[k]` 的柱子 `L`。
- 右边第一个大于 `heights[k]` 的柱子 `R`。

那么 $(L, R)$ 内部所有柱子高度都至少为 `heights[k]`。所以：

- $\text{width}=L-R-1$。
- $\text{area} = \text{heights}[k] * \text{width}$。

单调递增栈的巧妙之处在于：

```cpp
int k = st.top();
st.pop();

int right = i;
int left = st.empty() ? -1 : st.top();
```

弹出的 `k` 才是当前正在“结算面积”的柱子。此时：

- `i` 就是 `k`，右边第一个更矮的位置；
- 弹栈后的 `st.top()` 是 `k`，左边第一个更矮的位置。

我一开始一直把这题和接雨水混在一起，以为应该找“两边更高的柱子”，后来才区分出来：

- 最大矩形：找左右第一个更矮。
- 接雨水：关注左右更高的挡板。

###单调队列

LeetCode 239 滑动窗口最大值：`deque` 中存下标，对应数值保持递减，窗口每移动一次：

- 队头删除过期下标；
- 队尾删除比当前值小的元素；
- 当前下标入队；
- 队头就是窗口最大值。

整个过程 $O(n)$，因为每个下标最多入队、出队各一次。

## 堆、并查集和图论

这部分是为了补齐机试里很常见、但 Hot 100 中占比没那么高的一些基础结构。

### `priority_queue`

默认 `priority_queue<int> pq` 是大根堆。

小根堆：`priority_queue<int, vector<int>, greater<int>> pq;`。

### 并查集

基础模板：

```cpp
int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);

    return parent[x];
}
```

合并：

```cpp
int ra = find(a);
int rb = find(b);

if (ra != rb)
    parent[ra] = rb;
```

LeetCode 684 冗余连接就是非常典型的并查集题：如果一条边的两个端点已经属于同一个集合，那么加入这条边一定产生环，所以这条边是不能要的。

### 邻接表建图

无权图：

```cpp
vector<vector<int>> g(n + 1);

g[u].push_back(v);
g[v].push_back(u);
```

有向图只保留：

```cpp
g[u].push_back(v);
```

带权图：

```cpp
vector<vector<pair<int,int>>> g(n + 1);

g[u].push_back({v, w});
```

### BFS 和多源 BFS

岛屿数量属于连通块问题，DFS/BFS 都可以。

腐烂的橘子则是典型多源 BFS：一开始把所有腐烂橘子一起入队这样自然模拟“同时扩散”。

### 拓扑排序

维护 `indegree[a]++` 把所有入度为 `0` 的节点入队，不断删除：

- 如果最终能处理所有节点则无环；
- 处理不完则存在环。

### Dijkstra

```cpp
vector<long long> dist(n + 1, INF);

priority_queue<
    pair<long long,int>,
    vector<pair<long long,int>>,
    greater<pair<long long,int>>
> pq;
```

操作：

```cpp
if (dist[v] > dist[u] + w) {
    dist[v] = dist[u] + w;
    pq.push({dist[v], v});
}
```

然后还要维护 `visited[]`，第一次真正出队时确定最短距离。

## 树

树题本身不难。

### 最大深度

LeetCode 104：

```cpp
int depth(TreeNode* root) {
    if (!root) return 0;

    return max(
        depth(root->left),
        depth(root->right)
    ) + 1;
}
```

函数定义就是返回以 `root` 为根的子树高度。

### 最近公共祖先

不用倍增 LCA 也能过，个人觉得倍增就不要花时间单独学了。倍增维护适合一棵固定树大量 LCA 查询。但 LeetCode 236 只有一次查询，用递归就能过：

```cpp
if (!root || root == p || root == q)
    return root;

TreeNode* left = dfs(root->left);
TreeNode* right = dfs(root->right);

if (left && right)
    return root;

return left ? left : right;
```

典型的递归和分治。

### Trie

数组写法：

```cpp
int son[N][26];
bool isEnd[N];
int idx;
```

其中：`son[u][c]` 表示：从节点 `u` 经过字符 `c` 后到达哪个节点，数组里存的是“下一节点编号”。

## DP

### 01 背包和完全背包

01 背包：

```cpp
for (int j = capacity; j >= w; j--)
    dp[j] = max(dp[j], dp[j-w] + value);
```

容量必须倒序，因为每个物品只能用一次。

完全背包：

```cpp
for (int j = w; j <= capacity; j++)
    dp[j] = max(dp[j], dp[j-w] + value);
```

容量正序，因为当前物品可以重复使用。

#### 完全平方数

LeetCode 279 可以理解成完全背包：

- 物品：1², 2², 3²...
- 容量：`n`
- 每个物品可以无限用
- 代价：`1`
- 目标：最少使用多少个

关键初始化 `dp[0] = 0` 而不是 1。

#### 零钱兑换

同样是完全背包最小值问题：

```cpp
dp[i] = min(dp[i], dp[i - coin] + 1);
```

初始化：

- `dp[0] = 0`
- 其他：`INF`

#### 分割等和子集

LeetCode 416：如果总和为 `sum`，问题转换成**能否从数组中选一些数使和为 `sum / 2`**。就是 01 背包可达性：

```cpp
vector<bool> dp(target + 1, false);
dp[0] = true;

for (int x : nums)
    for (int j = target; j >= x; j--)
        dp[j] = dp[j] || dp[j-x]; // 关键是这个转换
```

### 多维 DP

多维 DP 和普通 DP 在本质上没有任何区别，只是描述一个状态需要多个变量。

#### 最长公共子序列

定义 `dp[i][j]` 为 `text1` 的前 `i` 个字符和 `text2` 前 `j` 个字符的最长公共子序列长度。如果 `text1[i-1] == text2[j-1]`，那么 `dp[i][j] = dp[i-1][j-1] + 1`，否则 `dp[i][j] = max(dp[i-1][j], dp[i][j-1]);`。

#### 区间 DP

区间 DP 通常是定义 `dp[l][r]` 为区间 $[l,r]$ 的最优答案

例如最长回文子序列，如果 `s[l] == s[r]`，则 `dp[l][r] = dp[l+1][r-1] + 2`。否则 `dp[l][r] = max(dp[l+1][r], dp[l][r-1])`。

区间 DP 有一个非常明显的特点：**长区间依赖短区间**，所以一般按区间长度从小到大遍历。

还有一类区间 DP 会枚举分割点：

```cpp
dp[l][r] =
min/max(
    dp[l][k] + dp[k+1][r] + cost
)
```

## 状态机 DP

股票问题系列里面有一个。

第二维表示的不是数组位置，而是当前所处状态。

再复杂一点：

```cpp
dp[day][交易次数][是否持股]
```

就可以自然扩展成三维 DP。

## QuickSort 与 QuickSelect

Lomuto partition：

```cpp
int pivot = nums[r];
int i = l;

for (int j = l; j < r; j++) {
    if (nums[j] < pivot) {
        swap(nums[i], nums[j]);
        i++;
    }
}

swap(nums[i], nums[r]);

return i;
```

始终保持：

- $[l, i-1] < \text{pivot}$
- $[i, j-1] \ge \text{pivot}$
- $[j, r-1]$ 还未处理

平均 $O(n)$。

---

不过在 LeetCode 215 里，还碰到了随机 pivot 依然 TLE 的情况，原因是大量重复元素会让普通二路 partition 退化。更稳的方案是**三路划分**，也算是典型题了。

## 真正的编程环境

刷 LeetCode 时很多东西都已经自己准备好了，但是机试还是要自己写 IO 的。

一般机试用的是 `-std=c++11`，我一般用 VS Code + g++，直接按 <kbd>Ctrl</kbd>+ <kbd>Shift</kbd>+ <kbd>B</kbd> 即可编译。

基础模板：

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const int N = 1e5 + 3;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    return 0;
}
```

这里特别要注意 C++11，现代代码里很常见的 `auto [u, v]=` 是 C++17 的结构化绑定，11 不能用这个。

## 参考和注解
