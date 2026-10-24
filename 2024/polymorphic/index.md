---
title: 多态实验
url: https://blog.kisechan.space/2024/polymorphic/
type: post
time: '2026-10-24T09:09:07.707Z'
---

# 组合模式的应用

每个公司都有总部、多个分公司、多个办事处等，为上下级同构实体关系。每个实体均有人力部、财务部、销售部等职能部门，不再有下级部门。分公司下面继续有子公司……总部需要快速了解总公司的：组织结构+实体职责展示。（两个多态函数，输出文字即可）。

# 关于组合模式和程序的分析

“组合模式”指的是将对象组合成树形结构以表示“**部分—整体**”的一种层次结构。这就需要实验人将“总公司”、“子公司”、“办事处”及其部门实体等对象抽象成为一个组合模式结构，例如：

![参考结构示意图](https://cdn.jsdelivr.net/gh/Kisechan/Picture-Bed-Kisechan@master/img/202405252229869.svg)

在我们的模拟程序中就可以用类模拟一个子公司或总公司，其中包含子公司和办事处类的指针。而子公司类和办事处类都拥有人力部、财务部、销售部等基本部门，这就可以通过**继承**一个基本实体类来实现。

这样我们就可以构造出一个树结构了，类定义的代码*class.h*如下：

```cpp
#pragma once
#include <string>
#include <vector>
class Base
{
public:
	std::string Func1;
	std::string Func2;
	std::string Func3;
	Base();
	virtual void show() = 0;
};
class Agency :public Base
{
	std::string Func;
public:
	int tag;
	Agency();
	virtual void show();
};
class Company :public Base
{
public:
	int tag;
	std::vector <Company*> Branches;
	std::vector <Agency*> Agencies;
	Company() = default;
	Company(int branchnum, int agencynum, int num);
	virtual void show();
};
```

其中，类Base有一个纯虚成员函数show()，是一个抽象类，它代表着基本职能实体的信息；类Agency封装着办事处的信息，继承自类Base；类Company代表着子公司或总公司，也是继承自类Base，存储着Company指针和Agency指针，代表其衍生出来的子公司和办事处。

各个类的构造函数可以参考*class.cpp*：

```cpp
Base::Base()
{
	Func1 = "人力部";
	Func2 = "财务部";
	Func3 = "销售部";
}
Agency::Agency()
{
	Func = "办事处";
	tag = 0;
}
Company::Company() = default;
Company::Company(int branchnum, int agencynum, int num)
{
	tag = num;
	for (int i = 0; i < branchnum; i++)
	{
		Branches.push_back(new Company);
		Branches[i]->tag = i + 1;
	}
	for (int i = 0; i < agencynum; i++)
	{
		Agencies.push_back(new Agency);
		Agencies[i]->tag = i + 1;
	}
}
```

show()函数是类中的一个**虚函数**，在Company类和Agency类中都对它进行了定义的覆盖，以达到多态的目的，这样，调用不同的类中的show()函数就可以做到不同的效果。例如，调用Agency中的show()，会输出它自己的基本信息和它父类Base的一些信息；调用Company中的show()，会输出它自己以及所有子公司和办事处的信息。具体代码如下：

```cpp
void Agency::show()
{
	std::cout << "办事处" << tag << "职能有：" << std::endl;
	std::cout << Func << ' ' << Func1 << ' ' << Func2 << ' ' << Func3 << std::endl;
}
void Company::show()
{
	if (tag != 0)
	{
		std::cout << "子公司" << tag << "下属有：" << std::endl;
	}
	else
	{
		std::cout << "总公司下属有：" << std::endl;
	}
	std::cout << Func1 << ' ' << Func2 << ' ' << Func3 << std::endl;
	if (!Agencies.empty())
	{
		std::cout << Agencies.size() << "个办事处" << std::endl;
		for (int i = 0; i < Agencies.size(); i++)
		{
			Agencies[i]->show();
		}
	}
	if (!Branches.empty())
	{
		std::cout << Branches.size() << "个子公司" << std::endl;
		for (int i = 0; i < Branches.size(); i++)
		{
			Branches[i]->show();
		}
	}
}
```

测试与实现可参考*main.cpp*：

```cpp
#define _CRT_SECURE_NO_WARNINGS
#include "class.h"
#include <iostream>
using namespace std;
int main()
{
	Company Com(10, 5, 0);
	Com.Branches[2]->
Branches.push_back(new Company(3, 0, Com.Branches.size() + 1));
	Com.show();
}
```

![调用结果](https://images.kisechan.space/202405252245405.png)

可以看到，我们的操作都是实现了的。

# 注意事项

- 构造函数需要放在public里面
- 加一个static变量观感会更好，但是要注意类内声明类外定义
