---
title: Windows上简单的Socket通信：echo程序
url: https://blog.kisechan.space/2024/socket/
type: post
time: '2026-10-21T16:13:46.163Z'
---

### 关于Socket

客户端和服务器通常运行在不同的主机上，而对主机而言，网络也是一种I/O设备。如今，几乎每个计算机系统都支持TCP/IP协议。而与此同时，“套接字（socket）接口”是一组函数，可以与I/O函数结合起来创建网络应用，每当调用套接字函数时，系统都会调用内核模式中的TCP/IP函数。

对于内核而言，一个socket就是通信的一个端点；而从程序的角度来说，一个socket就是一个有相应的描述符的打开文件。internet的socket地址存放在一个类型为sockaddr_in的结构体中。而socket通信相关的函数都需要一个指向该结构的指针。

构建socket首先要将其初始化。在Windows平台上，具体代码如下：

```cpp
#include <winsock2.h>
#define _WINSOCK_DEPRECATED_NOWARNINGS
#define _CRT_SECURE_NO_WARNINGS
#pragma comment(lib,"ws2_32.lib")
WSADATA wsadata;
if (0 != WSAStartup(MAKEWORD(2, 2), &wsadata))
{
	cout << "Socket打开失败！" << endl;
	return 0;
}
else
{
	cout << "已打开Socket" << endl;
}
```

在初始化之后，服务端和客户端就可以分别利用socket()函数创建一个socket描述符了，使之成为一个通信的端点。例如：

```cpp
SOCKET serSocket = socket(AF_INET, SOCK_STREAM, 0);
```

AF表示我们正在使用IPv4协议，AF_INET表明我们正在使用32位IP地址，SOCK_STREAM表示这个socket是一个端点。而socket()返回的变量只是部分打开的，不能对其进行读写操作。

之后，我们就要定义一个sockaddr_in类型的结构体，并对其中的参数进行初始化，绑定IP地址与端口，例如：

```cpp
SOCKADDR_IN addr;
addr.sin_addr.S_un.S_addr = htonl(INADDR_ANY);
addr.sin_family = AF_INET;
addr.sin_port = htons(6000);
```

客户端可以调用connect()函数建立与服务器的连接，而服务器则利用bind()、listen()、accept()函数与客户端进行连接。在连接成功之后就可以进行通信了。

服务端主程序代码如下：

```cpp
bind(serSocket, (SOCKADDR*)&addr, sizeof(SOCKADDR));
listen(serSocket, 1024);
SOCKADDR_IN clientsocket;
int len = sizeof(SOCKADDR);
SOCKET serConn = accept(serSocket, (SOCKADDR*)&clientsocket, &len);
if (serConn != -1)
{
	cout << "与客户端链接成功" << endl;
}
else
{
	cout << "与客户端链接失败！" << endl;
}
closesocket(serConn);//关闭
WSACleanup();
```

客户端主程序代码如下：

```cpp
if (!connect(clientSocket, (SOCKADDR*)&client_in, sizeof(SOCKADDR)))
{
	cout << "与服务器链接成功！" << endl;
}
else
{
	cout << "与服务器链接失败！" << endl;
}
closesocket(clientSocket);
WSACleanup();
```

构建好了如上socket通信的框架之后，就可以进行功能搭建了。我们可以模拟一个echo程序的功能，客户端输入一个字符串，服务端收到它，再将它原模原样地返回。

完整的客户端代码*client.cpp*：

```cpp
#define _WINSOCK_DEPRECATED_NO_WARNINGS
#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <winsock2.h>
#pragma comment (lib,"ws2_32.lib")
using namespace std;
int main()
{
	char sendBuf[1024];
	char receiveBuf[1024];
	char ip[1024];
	cout << "输入服务器ip" << endl;
	cin >> ip;
	while (1)
	{
		WSADATA wsadata;
		if (0 == WSAStartup(MAKEWORD(2, 2), &wsadata))
		{
			cout << "客户端Socket已打开" << endl;
		}
		else
		{
			cout << "客户端Socket打开失败" << endl;
		}
		SOCKET clientSocket = socket(AF_INET, SOCK_STREAM, 0);

		SOCKADDR_IN client_in;
		client_in.sin_addr.S_un.S_addr = inet_addr(ip);
		client_in.sin_family = AF_INET;
		client_in.sin_port = htons(6000);

		if (!connect(clientSocket, (SOCKADDR*)&client_in, sizeof(SOCKADDR)))
		{
			cout << "与服务器链接成功！" << endl;
			cout << "发出信息:";
			gets_s(sendBuf, 1024);
			send(clientSocket, sendBuf, 1024, 0);
			recv(clientSocket, receiveBuf, 1024, 0);
			cout << "收到信息：" << receiveBuf << endl;
		}
		else
		{
			cout << "与服务器链接失败！" << endl;
		}
		closesocket(clientSocket);
		WSACleanup();
	}
	return 0;
}
```

完整的服务端代码*server.cpp*：

```cpp
#include <winsock2.h>
#include <stdio.h>
#include <iostream>
#define _WINSOCK_DEPRECATED_NOWARNINGS
#define _CRT_SECURE_NO_WARNINGS
#pragma comment(lib,"ws2_32.lib")
using namespace std;
int main()
{
	char Buf[1024];
	while (1)
	{
		WSADATA wsadata;
		if (0 != WSAStartup(MAKEWORD(2, 2), &wsadata))
		{
			cout << "Socket打开失败！" << endl;
			return 0;
		}
		else
		{
			cout << "已打开Socket" << endl;
		}
		SOCKET serSocket = socket(AF_INET, SOCK_STREAM, 0);
		SOCKADDR_IN addr;
		addr.sin_addr.S_un.S_addr = htonl(INADDR_ANY);
		addr.sin_family = AF_INET;
		addr.sin_port = htons(6000);
		bind(serSocket, (SOCKADDR*)&addr, sizeof(SOCKADDR));
		listen(serSocket, 1024);
		SOCKADDR_IN clientsocket;
		int len = sizeof(SOCKADDR);
		SOCKET serConn = accept(serSocket, (SOCKADDR*)&clientsocket, &len);
		if (serConn != -1)
		{
			cout << "与客户端链接成功" << endl;
			cout << "服务端收到:" << Buf << endl;
			recv(serConn, Buf, 1024, 0);
			cout << "服务端回复：" << Buf << endl;
			send(serConn, Buf, 1024, 0);
		}
		else
		{
			cout << "与客户端链接失败！" << endl;
		}
		closesocket(serConn);
		WSACleanup();
	}
	return 0;
}
```

流程图可参考：

![](https://cdn.jsdelivr.net/gh/Kisechan/Picture-Bed-Kisechan@master/img/202405191725630.svg)

### 多线程的实现

如果有两个或多个客户端，就需要衍生出子线程分别为他们服务，如图：

![](https://images.kisechan.space/202405191703045.png)
![](https://images.kisechan.space/202405191703385.png)

不过，C++提供的thread库能够帮我们简单地实现多线程编程，其中的thread对象可以创建一个新线程执行函数，让其与主线程并行运行（执行detach()函数），再用vector容器存储它就可以很容易地达到多线程编程的效果。

我们为服务端创建的SOCKET对象serConn承担着accept客户端的任务，如果侦测到有服务端成功连接，就在vector中创建一个新线程并运行它（sockFunc()函数）。

拥有了多线程运行的*server_threads.cpp*完整代码如下：

```cpp
#include <winsock2.h>
#include <stdio.h>
#include <iostream>
#include <thread>
#include <vector>
#define _WINSOCK_DEPRECATED_NOWARNINGS
#define _CRT_SECURE_NO_WARNINGS
#pragma comment(lib,"ws2_32.lib")
using namespace std;
void sockFunc(SOCKET serConn)
{
	char Buf[1024];
	cout << "与客户端链接成功" << endl;
	recv(serConn, Buf, 1024, 0);
	cout << "服务端收到:" << Buf << endl;
	cout << "服务端回复：" << Buf << endl;
	send(serConn, Buf, 1024, 0);
	closesocket(serConn);
}
int main()
{
	while (1)
	{
		WSADATA wsadata;
		if (0 != WSAStartup(MAKEWORD(2, 2), &wsadata))
		{
			cout << "Socket打开失败！" << endl;
			return 0;
		}
		else
		{
			cout << "已打开Socket" << endl;
		}
		SOCKET serSocket = socket(AF_INET, SOCK_STREAM, 0);
		SOCKADDR_IN addr;
		addr.sin_addr.S_un.S_addr = htonl(INADDR_ANY);
		addr.sin_family = AF_INET;
		addr.sin_port = htons(6000);
		bind(serSocket, (SOCKADDR*)&addr, sizeof(SOCKADDR));
		listen(serSocket, 1024);
		vector<thread> tcp;
		while (1)
		{
			SOCKADDR_IN clientsocket;
			int len = sizeof(SOCKADDR);
			SOCKET serConn = accept(serSocket, (SOCKADDR*)&clientsocket, &len);
			if (serConn != -1)
			{
				tcp.emplace_back(sockFunc, serConn);
				if (tcp.back().joinable())
				{
					//cout << "Thread " << tcp.back().get_id() << " is joinable!" << endl;
					tcp.back().detach();
				}
			}
			else
			{
				cout << "与客户端链接失败！" << endl;
			}
		}
		WSACleanup();
	}
	return 0;
}
```

### 参考

- https://blog.csdn.net/wu2304211/article/details/53819311
- https://www.cnblogs.com/Reyzal/p/6742553.html
- https://blog.csdn.net/qq_37245700/article/details/134718505
- https://blog.csdn.net/qq_44101612/article/details/100022786
- https://www.jb51.net/article/254190.htm#_label1
- https://www.cnblogs.com/DOMLX/p/9613861.html
