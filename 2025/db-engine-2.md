---
title: 设计一个数据库引擎 (2) 索引
url: https://blog.kisechan.space/2025/db-engine-2/
type: post
time: '2026-10-22T16:41:52.395Z'
---

**数据库系列笔记**

点击查看系列汇总：

---

Kisechan 的数据库系列笔记
https://blog.kisechan.space/tags/%E6%95%B0%E6%8D%AE%E5%BA%93/

---

- **数据库原理课程笔记部分**：
  - [数据库原理 课程笔记 (1) 数据库、关系代数和 SQL](https://blog.kisechan.space/2025/notes-database-1/)
  - [数据库原理 课程笔记 (2) E-R 模型和关系模式](https://blog.kisechan.space/2025/notes-database-2/)
  - [数据库原理 课程笔记 (3) 存储、索引、事务和并发](https://blog.kisechan.space/2025/notes-database-3/)
  - [数据库原理 课程笔记 (4) 杂项和题目整理](https://blog.kisechan.space/2025/notes-database-4/)
- **手搓数据库** (CS346) **部分**：
  - [设计一个数据库引擎 (1) 内存、外存和记录管理](https://blog.kisechan.space/2025/db-engine-1/)
  - 设计一个数据库引擎 (2) 索引 【**当前阅读**】
  - [设计一个数据库引擎 (3) SQL 处理](https://blog.kisechan.space/2025/db-engine-3/)
- **Oracle 和 NoSQL 课程部分**：
  - ~~Oracle 的学习使用和环境配置~~
  - [NoSQL 的学习使用和环境配置](https://blog.kisechan.space/2026/nosql/)

## 任务需求

1. **实现 B+ 树的算法**：生成、插入、修改、删除
2. **针对 task1 中的表**：完成 create index 后，自动生成 B+ 树
3. **显示索引文件内容**：以十六进制格式查看
4. **定义系统表**：存放表和索引的定义
5. **索引存储**：按照数据页面结构存储
6. **容量计算**：根据页面大小计算每页能存放多少索引项

## 实现详情

### 索引容量计算

#### 公式推导

$$
\begin{align*}
\text{可用空间}&=\text{页面大小}-\text{节点头大小}\\
&=4096-9\\
&=4087\text{（字节）}
\end{align*}
$$

$$
\text{索引项大小}=\text{key\_len (2 Byte) + key (变长) + rid(8 Byte)}
$$

对于 4 字节的 ID 作为键：

- $索引项大小=2+4+8=14 \text{ Byte}$
- $每页能存放的索引项数 = 4087 / 14 ≈ 291 项$

#### 代码实现

```rust
fn calculate_entries_per_page(key_size: usize, rid_size: usize) -> usize {
    let header_size = 9; // is_leaf(1) + key_count(4) + next_leaf(4)
    let entry_size = 2 + key_size + rid_size; // key_len(2) + key + rid
    let available_space = PAGE_SIZE - header_size;
    available_space / entry_size
}
```

**结果**：每页最多可存放 **291 个索引项**

### 索引文件结构

#### 文件页面布局

`Page 0` (4096 bytes):

- `FileHeader` (12 bytes)
  - `header_size`: `u32` = 12
  - `total_pages`: `u32` = 1
  - `free_list_len`: `u32` = 0
- Padding (4084 bytes)

`Page 1+` (4096 bytes):

- `BPTreeNode` (可变大小)
  - `is_leaf`: `u8` = 1
  - `key_count`: `u32`
  - `next_leaf`: `u32`
  - `entries` (变长数据)
- Padding (补齐到 4096 Byte)

#### 十六进制示例

```
00000000: 0c 00 00 00 01 00 00 00  00 00 00 00 00 00 00 00
          ^^^^^^^^^^ ^^^^^^^^^^ ^^^^^^^^^^
          header_sz  total_pgs free_list

          12 bytes 的 FileHeader，后跟 4084 字节的填充
```

### 实现流程

![结果示例](https://images.kisechan.space/%E6%88%AA%E5%B1%8F2025-11-11%2019.49.34.png)

#### 创建表并插入数据

- 创建 `account` 表（包含 id, name, balance 三个字段）
- 插入 **100 条** 测试记录
- 使用随机名字生成测试数据

```rust
// 表结构
TableSchema {
    table_name: "account",
    columns: [
        { name: "id", type: Int32, nullable: false },
        { name: "name", type: Char(20), nullable: false },
        { name: "balance", type: Int32, nullable: false },
    ],
}
```

#### 创建第一个索引

- 调用 `IXManager::create_index("account", 0, 4)`
- 生成文件 `data/account.idx0`
- 初始化根页面（`page_id` 为 1）
- 注册 `handler` 到管理器

**输出示例**：

```
[FileHandler] Flushed header to data/account.idx0: size=12 bytes
[IXManager] Created index file: data/account.idx0
[IXManager] Initialized B+ tree root page (page_id=1, size=9 bytes)
[IXHandler] Initialized BPTree with order=4 for file: account.idx0
[IXManager] Created index: account_0 (data/account.idx0)
```

#### 构建索引

- 将前 **50 个** ID 插入到索引中
- 使用 ID 作为键（4 字节小端序）
- B+ 树自动进行节点分裂和重新平衡

**关键日志**：

- 叶子节点分裂：`[BPTree] Leaf page XX is full, splitting...`
- 内部节点分裂：`[BPTree] Internal page XX is full, splitting...`
- 根节点分裂：`[BPTree] Root split, new root page_id=XX`

**分裂示例**：

```
[BPTree] Split leaf: mid=2, promote_key_len=4
[BPTree] Write node page_id=21 (is_leaf=true, keys=2)
[BPTree] Write node page_id=24 (is_leaf=true, keys=2)
```

#### 索引查询

- 查询已插入的 ID：[1000, 1005, 1010, 1020, 1049, 1050, 1100]
- 演示查询存在和不存在的记录

**查询结果**：

```
Found ID 1049 -> RID(1049, 49)
ID 1000 not found
```

#### 范围扫描

- 执行范围扫描：ID 从 1010 到 1030
- 使用叶子链遍历查找所有匹配项

**扫描操作**：

```
[BPTree] Scan: starting from leaf page 40
[BPTree] Scan: processing leaf page 40 with 2 keys
[BPTree] Scan: reached upper bound, stopping
Found 0 entries in range [1010, 1030)
```

#### 索引更新（删除）

- 删除 3 个索引条目（ID: 1005, 1015, 1025）
- 演示删除操作（部分可能失败，取决于是否存在）

```
[Phase6] Deleting index entries...
[BPTree] Delete: searching for key in leaf page 40
[BPTree] Key not found in leaf page 40
[Phase6] Failed to delete ID 1005: KeyNotFound
```

#### 更新后的验证

- 再次查询已删除的 ID
- 验证删除操作是否成功

#### 创建多个索引

- 创建额外的索引：`account_1`, `account_2`
- 演示多索引管理

**输出**：

```
[Phase8] Total indexes created: 3
  - account_2
  - account_0
  - account_1
```

#### 系统目录信息

- 显示所有创建的索引
- 显示索引文件大小

```
Index Files in data/ directory:
  account.idx0 (8192 bytes)    ← 2 pages
  account.idx1 (8192 bytes)    ← 2 pages
  account.idx2 (8192 bytes)    ← 2 pages
```

#### 信息统计

```
========== Index Performance Report ==========
Page Size                    : 4096 bytes
Key Size (ID)                : 4 bytes
RID Size                     : 8 bytes
Maximum Entries Per Page     : 291
Test Data Records Inserted   : 100
Index Entries Inserted       : 50
Index Entries Deleted        : 3
Final Index Entries          : 47
Total Indexes Created        : 3
Index File Size (each)       : 4096 bytes (1 page)
```

## 核心模块

### `IXManager`（索引管理器）

**职责**：

- 创建和销毁索引
- 打开和关闭索引
- 管理 IXHandler 实例

**关键方法**：

```rust
pub fn create_index(&mut self, table: &str, index_no: usize, attr_len: usize) -> IXResult<()>
pub fn destroy_index(&mut self, table: &str, index_no: usize) -> IXResult<()>
pub fn open_index(&mut self, table: &str, index_no: usize) -> IXResult<()>
pub fn close_index(&mut self, table: &str, index_no: usize) -> IXResult<()>
```

### `IXHandler`（索引处理器）

**职责**：

- 执行索引操作（插入、删除、搜索）
- 管理 B+ 树生命周期
- 缓存管理

**关键方法**：

```rust
pub fn insert_entry(&mut self, key: Vec<u8>, rid: (u32, u16)) -> IXResult<()>
pub fn delete_entry(&mut self, key: Vec<u8>, rid: (u32, u16)) -> IXResult<()>
pub fn search_entry(&self, key: &[u8]) -> IXResult<Option<(u32, u16)>>
pub fn scan_range(&self, lower: &[u8], upper: &[u8]) -> IXResult<Vec<(u32, u16)>>
```

### `BPTree`（B+ 树核心）

**实现的操作**：

- `insert(key, rid)` - O(log N) 插入
- `delete(key, rid)` - O(log N) 删除
- `search(key)` - O(log N) 查询
- `scan_range(lower, upper)` - O(log N + K) 范围扫描

### `BPTreeNode`（节点结构）

**序列化格式**（9 字节头 + 可变数据）：

- `is_leaf` (1 字节): 节点类型
- `key_count` (4 字节): 键数量
- `next_leaf` (4 字节): 下一个叶子节点指针

## 文件生成结果

### 创建的索引文件

```
data/account.idx0  - 8 KB (2 pages)
data/account.idx1  - 8 KB (2 pages)
data/account.idx2  - 8 KB (2 pages)
```

### 文件内容验证

```
$ xxd data/account.idx0 | head -5

00000000: 0c 00 00 00 01 00 00 00  00 00 00 00 00 00 00 00
          ↓                    ↓
          header_size=12      total_pages=1
```

## 性能分析

### 空间复杂度

- **每个索引项**: 14 字节 ( 2 字节长度 + 4 字节键 + 8 字节 `RID`)
- **每页最大容量**: 291 个索引项
- **每个索引文件**: 初始 8 KB（1页 `FileHeader` + 1页 `RootNode`）

### 时间复杂度

- **插入**: $O(\log N)$ ，需要找到叶子并可能分裂
- **删除**: $O(\log N)$ ，需要找到并删除，可能涉及合并
- **查询**: $O(\log N)$ ，二分查找到叶子
- **范围扫描**: $O(\log N + K)$ ，$N$ 是树中元素数，$K$ 是结果数
