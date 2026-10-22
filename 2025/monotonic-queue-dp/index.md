---
title: 算法笔记1：单调队列优化 dp
url: https://blog.kisechan.space/2025/monotonic-queue-dp/
type: post
time: '2026-10-22T16:41:52.395Z'
---

## 单调队列

想要**在一个固定区间内维护最大/最小值**，就可以考虑用单调队列实现。

**[Luogu P1886 滑动窗口 /【模板】单调队列](https://www.luogu.com.cn/problem/P1886)**

```cpp
#include <bits/stdc++.h>
#define endl '\n'
using namespace std;
typedef long long ll;
const int N=1e6+5;
int n,k;
int a[N];
int main()
{
	ios::sync_with_stdio(false),cin.tie(0),cout.tie(0);
    cin>>n>>k;
    deque<int>q1,q2;	// 一个单调增，一个单调减
    vector<int>v1,v2;	// 存答案
	for(int i=0;i<n;i++)
	{
		while(!q1.empty()&&q1.front()<i-k+1) q1.pop_front();
		while(!q2.empty()&&q2.front()<i-k+1) q2.pop_front();
		cin>>a[i];
		while(!q1.empty()&&a[q1.back()]>a[i]) q1.pop_back();
		q1.push_back(i);
		if(i>k-2) v1.push_back(a[q1.front()]);
		while(!q2.empty()&&a[q2.back()]<a[i]) q2.pop_back();
		q2.push_back(i);
		if(i>k-2) v2.push_back(a[q2.front()]);
	}
	for(auto i:v1) cout<<i<<' ';
	cout<<endl;
	for(auto i:v2) cout<<i<<' ';
	cout<<endl;
}
```

主要注意点：

- 存储的是**坐标**而不是值
- 先把区间以外的坐标筛掉，再把不单调的元素删掉

## 单调队列优化的 dp

[**Luogu P1725 琪露诺**](https://www.luogu.com.cn/problem/P1725)

显然本题是一个 dp ：$f(x)=\max\{f(x-r),f(x-r+1),...,f(x-l)\}$，但是它的状态转移是在区间里面的，如果要在区间里面每个元素都遍历一遍，那么复杂度就会变成$O(n^2)$。

但是，对于一个点$i$，如果能够用单调队列维护这个区间$x\in[i-r,i-l]$内$f(x)$的最大值，那么复杂度就会降至$O(n)$，不需要遍历区间内的所有元素。

```cpp
#include <bits/stdc++.h>
#define endl '\n'
using namespace std;
typedef long long ll;
const int N=2e5+5;
int n,l,r;
int a[N],f[N];
int ans=-0x3f3f3f;
deque<int>q;
int main()
{
    ios::sync_with_stdio(false),cin.tie(0),cout.tie(0);
    cin>>n>>l>>r;
    memset(f,-0x3f3f3f,sizeof(a));
    // 设为128=2^8也可以，每个字节自然溢出成为负的极大值
    f[0]=0;
    for(int i=0;i<=n;i++) cin>>a[i];
    for(int i=l;i<=n;i++)
    // 从l开始，因为0不能跳到1~l-1的地方
	{
    	while(!q.empty()&&q.front()<i-r) q.pop_front();
		while(!q.empty()&&f[q.front()]<f[i-l]) q.pop_back();
		q.push_back(i-l);
    		f[i]=max(f[i],f[q.front()]+a[i]);
    		if(i+r>n) ans=max(ans,f[i]);
    }
    cout<<ans<<endl;
}
```
