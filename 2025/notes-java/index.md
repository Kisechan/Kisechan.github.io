---
title: Java 程序设计
url: https://blog.kisechan.space/2025/notes-java/
type: post
time: '2026-10-24T09:09:07.707Z'
---

> 速通的倒数第二门，唉这学期怎么都在速通，活得太没意思了。
>
> 祝我好运。

## Java 基础

### 概述

Java 是一种“**简单、面向对象、分布式、解释型、健壮、安全、体系结构中立、可移植、高性能、多线程和动态**”的编程语言。

- **简单性**
  - 去掉了指针，取消多重继承和运算符重载。
  - 自动内存分配与回收机制。
- **纯粹的面向对象**
- **分布式**，面向网络
- **健壮性**
  - 内存自动管理。
  - 异常处理机制。
- **安全性**
  - 直接去掉指针。
  - 所有程序和数据都在沙箱中。
- **体系结构中立**，平台无关
  - 只要安装了 **Java 虚拟机** (JVM)，代码就可以在随处运行。
- **可移植性**
- **解释执行**
  - Java 程序被编译成 JVM 字节码，不依赖机器，可运行在任意安装了 Java 解释器的机器上。
- **高性能**
- **多线程**
- **动态性**
  - 在类库中可以自由地加入新的方法和实例变量而不会影响用户程序的执行。

### Java 和 C++

1. Java 语言中**不允许在类之外定义全局变量**，而只能通过在类中定义静态变量来实现。
2. Java 语言中**没有 `goto` 语句**。
3. Java 语言中**没有指针型变量**。
4. **内存管理**实现了自动化。
5. Java 语言对于**不同的数据类型定义统一的规格**，保证了平台无关性。
6. Java 语言中**不允许像 C 和 C++ 中那样任意进行类型转换**。
7. Java 语言中**无头文件**。
8. Java 语言中**无结构体和联合**。
9. Java 语言中**无预处理和宏定义**。

---

Java 语言特色：

- **类不支持多重继承**
- **`Abstract`/`Final` 类**
- **接口**
- **自动内存回收**
- **多线程**

### 标识符使用惯例

- **类和接口** `SimpleApp`
  - 类名和接口名通常用名词，且每个单词的首字母大写。
- **方法** `processResult`
  - 方法名用动词开头的单词序列，首单词全部小写，后面的每个单词首
    字母大写。
- **常量** `PI`
  - 常量名全部用大写字母。
- **变量** `outputResult`
  - 所有的对象实例名和全局变量名都使用首单词全部小写，后面的每个
    单词首字母大写的格式。

## 对象

### 访问控制

|          控制符          | 同一个类中 | 同一个包 中 | 不同包中的子类 | 不同包中的非子类 |
| :----------------------: | :--------: | :---------: | :------------: | :--------------: |
|         `public`         |     ✅     |     ✅      |       ✅       |        ✅        |
|       `protected`        |     ✅     |     ✅      |       ✅       |                  |
| `default` （什么都不写） |     ✅     |     ✅      |                |                  |
|        `private`         |     ✅     |             |                |                  |

### 接口和类

Java 中所有的类都继承自 `java.lang.Object`。

|       基本方法       |             作用             |            是否常重写            |
| :------------------: | :--------------------------: | :------------------------------: |
|     `toString()`     |     返回对象的字符串表示     |            ✅ 常重写             |
| `equals(Object obj)` |    判断两个对象是否“相等”    |            ✅ 常重写             |
|     `hashCode()`     |       返回对象的哈希值       |    ✅ 常和 `equals` 一起重写     |
|     `getClass()`     |       返回运行时类对象       |          ❌ 一般不重写           |
|      `clone()`       |       对对象进行浅拷贝       | ❌ 少用，需实现 `Cloneable` 接口 |
|     `finalize()`     | 垃圾回收前调用（不推荐使用） |             ❌ 废弃              |
|       `wait()`       |   线程等待（需在同步块中）   |          ❌ 通常不重写           |
|      `notify()`      |        唤醒等待的线程        |          ❌ 通常不重写           |
|    `notifyAll()`     |      唤醒所有等待的线程      |          ❌ 通常不重写           |

|   特性   |                        接口（interface）                        |            类（class）            |
| :------: | :-------------------------------------------------------------: | :-------------------------------: |
|   语义   |                    定义行为规范，类似“能力”                     |       定义对象的属性和行为        |
|   方法   | 默认是 `public abstract`（除非是 `default`/`static`/`private`） |       可包含具体实现的方法        |
|   字段   |     默认是 `public static final`（常量），且只能是 `public`     |    可定义变量，有访问权限控制     |
|   继承   |                       可以多继承多个接口                        |         只能单继承一个类          |
| 实现方式 |                  类用 `implements` 来实现接口                   |    类用 `extends` 继承另一个类    |
|  实例化  |                         无法直接实例化                          | 可以实例化（如果不是 `abstract`） |

## 数据结构

### 数组

数组是一种固定大小的同类型数据序列。

声明数组变量有两种形式：

- `类型[] 数组名;` (推荐)
- `类型 数组名[];`

例如：`int[] a;` 或 `String[] names;`

**创建与初始化**：

- **静态初始化**：在声明时直接指定元素值。数组长度由元素个数决定 。

  ```java
  int[] numbers = {1, 2, 3, 4, 5}; // 长度为 5
  String[] colors = new String[]{"Red", "Green", "Blue"};
  ```

- **动态初始化**：指定数组长度，元素会自动赋为默认值（数值型为 0，布尔型为 `false`，引用型为 `null`）。

  ```java
  int[] scores = new int[10]; // 长度为 10，所有元素初始化为 0
  String[] names = new String[5]; // 长度为 5，所有元素初始化为 null
  ```

- **对象数组**：数组元素是对象引用，需要单独初始化每个对象 。

  ```java
  // 声明并动态初始化一个 Person 对象数组
  Person[] people = new Person[2];
  people[0] = new Person("Alice", 30); // 单独初始化对象
  people[1] = new Person("Bob", 25);
  ```

**访问**：使用 `数组名[索引值]` 访问元素，索引从 0 开始 。

**长度属性**：数组具有唯一的 `length` 属性，记录数组中元素的个数 ，用 `numbers.length` 获取数组长度 。

- **多维数组**：是数组的数组，可以是不规则数组（各维长度不等） 。

  ```java
  int[][] matrix = {{1, 2, 3}, {4, 5, 6}}; // 2x3 矩阵
  int[][] irregularArray = new int[2][]; // 不规则数组
  irregularArray[0] = new int[2]; // 第一行 2 列
  irregularArray[1] = new int[3]; // 第二行 3 列
  ```

- **数组引用**：Java 数组是特殊的对象，数组变量存放一个数组对象的引用 。因此，数组作为方法参数时，传递的是引用，可以改变数组元素的值 。

  ```java
  public static void changeArrayValue(int[] arr) {
      arr[0] = 99; // 改变原数组的值
  }
  // 调用：int[] myArr = {1, 2, 3}; changeArrayValue(myArr); System.out.println(myArr[0]); // 输出 99
  ```

**`Arrays` 工具类**：`java.util.Arrays` 提供了一套静态方法，用于数组的排序 (`sort()`)、查找 (`binarySearch()`)、复制 (`copyOf()`)、比较 (`equals()`) 等 。

### 枚举

枚举是一种**特殊的类**，用于定义固定数量的命名常量。

使用 `enum` 关键字定义，枚举类型变量只能保存此类声明时给定的某个枚举值 。

```Java
enum Season {
    SPRING, SUMMER, FALL, WINTER; // 枚举常量列表
}
Season s = Season.SPRING; // 声明和赋值
```

**本质**：Java 的枚举是真正的类，它们可以有构造方法、成员变量、方法，甚至可以实现接口 。每个枚举常量都是该枚举类型的一个实例。

```java
enum TrafficLight {
    RED("Stop"), YELLOW("Caution"), GREEN("Go");

    private final String action;

    TrafficLight(String action) { // 构造方法
        this.action = action;
    }

    public String getAction() { // 方法
        return action;
    }
}
TrafficLight currentLight = TrafficLight.RED;
System.out.println(currentLight.getAction()); // 输出 "Stop"
```

**使用**：

- 可以在 `switch` 语句中使用 。
- `name()` 方法：返回枚举常量的名称字符串。
- `ordinal()` 方法：返回枚举常量的序数（在枚举声明中的位置，从 0 开始）。
- `valueOf(String name)`：返回具有指定名称的枚举常量。
- `values()`：返回包含所有枚举常量的数组。

### 容器

Java 集合框架（`java.util` 包）提供了一套用于存储和管理对象的接口和类，具有动态容量。这是 Java 处理对象集合的主要方式，与 C++ 的 STL 类似。

**Java 中的容器：**

- **核心接口**：

  - `Collection`：所有集合的根接口，定义了集合的基本操作（添加、删除、判断包含等） 。
  - `List`：有序的 `Collection`，元素有索引，允许重复元素 。
    - **实现类**：
      - `ArrayList`：基于动态数组实现，随机访问效率高，中间插入删除慢 。
      - `LinkedList`：基于双向链表实现，中间插入删除效率高，随机访问慢 。
  - `Set`：无序的 `Collection`，**不允许重复元素** 。
    - **实现类**：
      - `HashSet`：基于哈希表实现，查找、添加、删除效率高（平均 $O(1)$），元素无序 。要求元素类正确重写 `hashCode()` 和 `equals()` 。
      - `LinkedHashSet`：基于哈希表和链表实现，保持元素的插入顺序 。
      - `TreeSet`：基于红黑树实现，元素按自然顺序或比较器顺序排序 。查找效率 $O(\log N)$。
  - `Map`：存储**键值对 (KV Pair)**，键唯一，值可重复 。
    - **实现类**：
      - `HashMap`：基于哈希表实现，查找、添加、删除效率高（平均 $O(1)$），键值对无序 。要求键类正确重写 `hashCode()` 和 `equals()` 。
      - `LinkedHashMap`：基于哈希表和链表实现，保持键值对的插入顺序 。
      - `TreeMap`：基于红黑树实现，键按自然顺序或比较器顺序排序 。查找效率 $O(\log N)$。

- **迭代器**：

  - `Iterator`：用于遍历 `Collection` 中的元素 。
  - `ListIterator`：专门用于 `List`，支持双向遍历和修改元素 。

- **泛型 (Generics)**：Java 1.5 引入，用于在编译时提供类型安全，避免运行时类型转换错误 。

  ```java
  List<String> names = new ArrayList<>(); // 编译时检查，只能存 String
  Map<Integer, String> students = new HashMap<>();
  ```

- **工具类**：

  - `java.util.Collections`：提供对 `Collection` 进行操作的静态方法（排序、查找、反转等） 。
  - `java.util.Arrays`：提供对数组进行操作的静态方法 。

## 图形化界面

### Swing

- **AWT (Abstract Window Toolkit)**:
  - 提供一套与本地图形界面交互的接口。
  - 依赖本地方法实现功能，因此 AWT 控件被称为**重量级控件**。
- **Swing**:
  - 在 AWT 基础上构建的新图形界面系统。
  - 提供 AWT 的所有功能，并进行大幅扩充。
  - 没有使用本地方法实现图形功能，因此 Swing 控件被称为**轻量级控件**。
  - 随着 Java2 的发布，Swing 逐渐替代了 AWT，本章主要介绍 Swing 组件。
  - Swing 组件类以字母 “J” 开头，除了与 AWT 类似的组件外，还增加了丰富的**高层组件**。
  - Java 语言采用**向容器中添加组件**的方式构建 GUI。通常使用**顶级容器**作为所有组件的承载物，可以向其中添加包括容器在内的各种组件，并合理安排布局。容器之间允许嵌套。

---

GUI 组件从使用上可分为三大类：

1. **容器类** (Container):
   - 用于包含其他组件的容器。
   - 例如： `JFrame` (顶层容器), `JApplet`, `JDialog`, `JPanel` (普通容器)。
2. **控件类** (Control):
   - 都是 `JComponent` 类（抽象类）的子类。
   - 例如： `JButton`, `JTextField`, `JTextArea`, `JComboBox`, `JList`, `JRadioButton`, `JMenu`。
3. **辅助类** (Auxiliary Class):
   - 描述和绘制容器类和组件类属性和放置的类。
   - 例如： `Graphics`, `Color`, `Font`, `FontMetrics`, `Dimension`, `LayoutManager`。

### 常用组件

#### `JFrame` 类

- **继承关系**: `java.lang.Object` -> `java.awt.Component` -> `java.awt.Container` -> `java.awt.Window` -> `java.awt.Frame` -> `javax.swing.JFrame`。
- **构造方法**: `public JFrame()`, `public JFrame(String title)`。
- **成员方法**:
  - `setSize()`: 设置**窗口大小**。
  - `setVisible()`: 设置**窗口可见性**。
  - `setLocation()`: 设置**窗口位置**。
  - `setDefaultCloseOperation(int operation)`: 设置**窗口关闭时的动作**。
    - 参数 `operation` 有四种取值：`DO_NOTHING_ON_CLOSE`, `HIDE_ON_CLOSE`, `DISPOSE_ON_CLOSE`, `EXIT_ON_CLOSE`。
  - `getContentPane()`: 获取**内容面板**。
  - `setTitle()`: 设置**窗口标题**。

#### `JLabel` 类

- **继承关系**: `java.lang.Object` -> `java.awt.Component` -> `java.awt.Container` -> `javax.swing.JComponent` -> `javax.swing.JLabel`。
- **构造方法**: 支持多种构造方法，如只带文本、只带图标、或同时带文本和图标及对齐方式。
- **对齐属性**: `SwingConstants.LEFT`, `SwingConstants.CENTER`, `SwingConstants.RIGHT`, `SwingConstants.BOTTOM`。
- **成员方法**: `setText()`, `setIcon()`, `getText()`, `setHorizontalTextPosition()`, `setVerticalTextPosition()`。

#### `JPanel` 类

- **面板容器**: `JPanel` 是分组放置组件的、位于框架更低一级的普通容器。
- **继承关系**: `java.lang.Object` -> `java.awt.Component` -> `java.awt.Container` -> `javax.swing.JComponent` -> `javax.swing.JPanel`。
- **构造方法**: `public JPanel()`。
- **成员方法**: `paintComponents(Graphics g)`, `add(Component comp)`。

#### `JButton` 类

- **继承关系**: `java.lang.Object` -> `java.awt.Component` -> `java.awt.Container` -> `javax.swing.JComponent` -> `javax.swing.AbstractButton` -> `javax.swing.JButton`。
- **构造方法**: 支持多种构造方法，如无文本、带文本、带图标、或同时带文本和图标。
- **成员方法**: `setText()`, `setIcon()`, `setBounds()`, `addActionListener(ActionListener l)`。

#### 文本框 `JTextField`

- **构造方法**: `public JTextField()`, `public JTextField(String text)`, `public JTextField(int columns)`, `public JTextField(String text, int columns)`。
- **成员方法**: `addActionListener(ActionListener l)`, `setColumns(int columns)`, `setText(String text)`。

#### 其他常用组件

- **`JTextArea`**: 提供多行文本编辑功能。
- **`JCheckBox`**: 复选框。
- **`JRadioButton`**: 单选按钮，常与 `ButtonGroup` 配合使用。
- **`JComboBox`**: 组合框（下拉列表）。
- **`JDialog`**: 对话框，可设置模式（应用程序只能响应对话框内事件）或非模式（可响应其他窗口事件）。
- **`JFileChooser`**: 文件对话框，用于打开或存储文件。
- **`JMenuBar`, `JMenu`, `JMenuItem`**: 用于创建菜单栏、菜单和菜单项。

### 布局管理

当向窗口中放置组件时，需要指定组件放置策略。

Java 中有两种定位组件的方法：

- **硬编码**: 屏幕绝对位置，与机器相关。

- **软编码**: 布局管理器，与机器无关。

  - Java 布局管理器类存在于

    `java.awt` 包中。

  - 在 `Container` 中有一个 `setLayout()` 方法，可以选择不同的布局方式。

#### `FlowLayout` （顺序布局）

- **继承关系**: `java.lang.Object` -> `java.awt.FlowLayout`。
- **构造方法**: `public FlowLayout()`, `public FlowLayout(int align)`, `public FlowLayout(int align, int hGap, int vGap)`。
- **成员属性**: `LEFT`, `CENTER`, `RIGHT`。
- **特点**: 将组件从左到右放置，直到占满上方空间，再向下移动一行继续放置。所有组件将被压缩到它们的最小尺寸，按“合适”的大小呈现。

#### `BorderLayout` （边界布局）

- **继承关系**: `java.lang.Object` -> `java.awt.BorderLayout`。
- **构造方法**: `public BorderLayout()`, `public BorderLayout(int hGap, int vGap)`。
- **成员属性**: `NORTH`, `SOUTH`, `EAST`, `WEST`, `CENTER`。
- **特点**: 将组件分置五个区域：北、南、东、西、中。`BorderLayout` 是 `JFrame` 的默认布局。
- 使用 `add()` 方法时，第一个参数可以指定区域，如 `BorderLayout.NORTH`。 未指定区域的组件将放置在中央并拉伸。

#### GridLayout (网格布局)

- **继承关系**: `java.lang.Object` -> `java.awt.GridLayout`。
- **构造方法**: `public GridLayout()`, `public GridLayout(int rows, int columns)`, `public GridLayout(int rows, int columns, int hGap, int vGap)`。
- **特点**: 在网格里从左到右、从上到下布局。确定行列数后，组件将以相同的长宽比排列。

### 事件处理

#### 事件处理机制

要让图形界面接收用户的操作，必须为组件添加事件处理机制。

事件处理主要涉及三类对象：

1. **Event (事件)**: 用户对界面操作在 Java 语言上的描述，以类的形式出现。例如键盘操作对应的事件类是 `KeyEvent`。

2. **Event Source (事件源)**: 事件发生的场所，通常是各个组件，例如按钮 `JButton`。

3. **Event Handler (事件处理者)**: 接收事件对象并对其进行处理的对象，也称为事件监听器 (`Listener`)。

   ***

**事件响应过程**:

1. 组件（事件源）触发相应类型的事件。
2. 生成事件对象。
3. 把事件对象传入事件处理器。
4. 事件由相应类型的 `Listener`（事件监听器）接收并处理。
   - **实现事件监听器的方式**:
     - **内部类实现监听器方式**：定义一个独立的内部类实现监听器接口，并在组件中注册该内部类的对象。
     - **匿名内部类实现监听器方式**：直接在 `addActionListener()` 方法中定义并实例化一个匿名内部类来实现监听器接口。
     - **直接实现监听器方式**：主类直接实现监听器接口，然后将 `this` 关键字作为监听器对象注册到组件中。

#### 事件类与事件监听接口

- Java 使用 `AWTEvent` 类表示事件，其继承关系为 `java.lang.Object` -> `java.util.EventObject` -> `java.awt.AWTEvent`。
- 各种事件类别对应不同的监听器接口和方法：
  - `ActionEvent`: `ActionListener` ( `actionPerformed` )
  - `ItemEvent`: `ItemListener` ( `itemStateChanged` )
  - `MouseEvent`: `MouseListener` ( `mousePressed`, `mouseReleased`, `mouseEntered`, `mouseExited`, `mouseClicked` )
  - `MouseEvent` (移动): `MouseMotionListener` ( `mouseDragged`, `mouseMoved` )
  - `KeyEvent`: `KeyListener` ( `keyPressed`, `keyReleased`, `keyTyped` )
  - `FocusEvent`: `FocusListener` ( `focusGained`, `focusLost` )
  - `AdjustmentEvent`: `AdjustmentListener` ( `adjustmentValueChanged` )
  - `ComponentEvent`: `ComponentListener` ( `componentMoved`, `componentHidden`, `componentResized`, `componentShown` )
  - `WindowEvent`: `WindowListener` ( `windowClosing`, `windowOpened`, `windowIconified`, `windowDeiconified`, `windowClosed`, `windowActivated`, `windowDeactivated` )
  - `ContainerEvent`: `ContainerListener` ( `componentAdded`, `componentRemoved` )
  - `TextEvent`: `TextListener` ( `textValueChanged` )

#### 适配器类 (`Adapter`)

每个具有不止一个方法的 AWT 监听器接口都有一个实现了其所有方法但

**不做任何工作**的适配器类。

可以通过**继承适配器类**来只重写需要的方法，避免实现接口中所有的方法。

`java.awt.event` 包中定义的事件适配器类包括：

- `ComponentAdapter`
- `ContainerAdapter`
- `FocusAdapter`
- `KeyAdapter`
- `MouseAdapter` (示例显示其实现了 `mouseClicked` 等空方法)
- `MouseMotionAdapter`
- `WindowAdapter`

## I/O 流

**I/O (Input/Output)** 指计算机与外部世界进行数据交换的过程，例如从键盘读取数据、向屏幕输出信息、读写文件、网络通信等。

**流 (Stream) **是 Java 语言输入/输出的方式， Java 程序通过流来完成输入/输出工作。是一个想象中的无限长的数据序列。 Java 提供了各种各样的流类来实现 I/O，封装了数据处理的细节.

**流的分类**:

- **按数据流向**：
  - **输入流 (InputStream/Reader)**： 从数据源读取数据到程序中。
  - **输出流 (OutputStream/Writer)**： 从程序中写入数据到数据目的地。
- **按处理数据单位**：
  - **字节流 (Byte Stream)**: 以字节（8位）为单位处理数据，适用于所有类型的数据（如图片、视频、文本等）。
  - **字符流 (Character Stream)**: 以字符（16位 Unicode 字符）为单位处理数据，专门用于处理文本数据，可以避免编码问题。
- **按功能**：
  - **节点流 (Node Stream)**: 直接与数据源（如文件、内存数组、管道）连接，提供基本的读写功能。
  - **处理流 / 包装流 (Processing Stream / Wrapper Stream)**: 包装在其他流之上，修改或管理流中数据，提供额外的功能（如缓冲、数据转换、对象序列化、打印等）。

---

|     类型     |         字节流          |      字符流       |
| :----------: | :---------------------: | :---------------: |
| 输入流（读） | `InputStream` 及其子类  | `Reader` 及其子类 |
| 输出流（写） | `OutputStream` 及其子类 | `Writer` 及其子类 |

常见的 I/O 流类：

|     类型     |        字节流类        |                  字符流类                  |                   说明                   |
| :----------: | :--------------------: | :----------------------------------------: | :--------------------------------------: |
| **文件输入** |   `FileInputStream`    |                `FileReader`                |               从文件中读取               |
| **文件输出** |   `FileOutputStream`   |                `FileWriter`                |                 写入文件                 |
| **缓冲输入** | `BufferedInputStream`  |              `BufferedReader`              |         提高读性能，支持按行读取         |
| **缓冲输出** | `BufferedOutputStream` |              `BufferedWriter`              |                提高写性能                |
|    转换流    |           —            | `InputStreamReader` / `OutputStreamWriter` |            将字节流转为字符流            |
|  **数据流**  |   `DataInputStream`    |                     —                      | 读写 Java 原始类型（如 `int`, `double`） |
|    打印流    |     `PrintStream`      |               `PrintWriter`                |              方便格式化输出              |
|  **对象流**  |  `ObjectInputStream`   |                     —                      |           对象序列化与反序列化           |
|  **标准流**  |      `System.in`       |                     —                      |           控制台输入（字节流）           |

#### 文件 I/O

**文件存储格式**：

- 文件可以看作一系列字节的集合。

- 无论是字符 I/O 还是字节 I/O，最终文件中存储的都是这些字符的编码（字节序列）。
- 字符 I/O 程序：处理字符的统一码，进行编码/解码，文件中存储的是字符的编码（如 UTF-8, GBK 等）。
- 字节 I/O 程序：直接读写字节，文件中存储的是等价的字节数据。

---

**`File` 类**:

- `java.io.File`：文件和目录路径名的抽象表示形式，用于获取文件或目录的信息.
- **构造器**:
  - `public File(String pathname)`: 以 `pathname` 为路径创建 `File` 对象，如果为相对路径则在默认的当前路径下存储.
  - `public File(String parent, String child)`: 以 `parent` 为父路径，`child` 为子路径创建 `File` 对象.
- **常用方法**:
  - `boolean canRead()`: 判断是否可读.
  - `boolean canWrite()`: 判断是否可写.
  - `boolean exists()`: 判断文件或目录是否存在.
  - `boolean isDirectory()`: 判断是否是目录.
  - `boolean isFile()`: 判断是否是文件.
  - `boolean isHidden()`: 判断是否是隐藏文件.
  - `long lastModified()`: 返回最后修改时间.
  - `long length()`: 返回文件长度（字节数）.
  - `String getName()`: 返回文件或目录名.
  - `String getPath()`: 返回文件或目录的路径名字符串.
  - `String getAbsolutePath()`: 返回文件的绝对路径名字符串.
  - `boolean createNewFile()`: 创建新文件.
  - `boolean delete()`: 删除文件或目录.
  - `boolean mkdir()`: 创建单级目录.
  - `boolean mkdirs()`: 创建多级目录.
  - `File getParentFile()`: 返回父目录的 `File` 对象.
  - `String[] list()`: 列出目录下的文件和目录名.
  - `File[] listFiles()`: 返回目录下的 `File` 对象数组.

#### 流与相关类

- **字节流类层次结构**:

  - **`InputStream` (抽象基类)**: 所有字节输入流的父类.

    - `int read()`: 读取一个字节并以整数形式返回.
    - `int read(byte[] buffer)`: 读取一系列字节到数组 `buffer` 中，返回读取的字节数.
    - `int read(byte[] buffer, int offset, int length)`: 从 `offset` 位置开始存储到 `buffer` 中.
    - `void close()`: 关闭流，释放内存资源.
    - `long skip(long n)`: 跳过 `n` 个字节.

    - **主要子类 (节点流)**:
      - `FileInputStream`: 从文件中读取信息.
      - `ByteArrayInputStream`: 将内存的缓冲区当作 `InputStream` 使用.
      - `PipedInputStream`: 产生用于写入相关 `PipedOutputStream` 的数据，实现“管道化”.
      - `SequenceInputStream`: 将两个或多个 `InputStream` 对象转换成单一 `InputStream`.
      - `StringBufferInputStream` (已弃用): 将 `String` 转换成 `InputStream`.
    - **处理流 (`FilterInputStream` 的子类)**:
      - `DataInputStream`: 与 `DataOutputStream` 搭配使用，可以可移植方式从流读取基本数据类型 (`int`, `char`, `long` 等).
      - `BufferedInputStream`: 使用缓冲区，防止每次读取都进行实际的读操作，提高效率.
      - `LineNumberInputStream`: 跟踪输入流中的行号.
      - `PushbackInputStream`: 具有一个字节的回退缓冲区，可以将读到的最后一个字符回退.
      - `ObjectInputStream`: 用于读取对象，也可以处理基本数据类型.

  - **`OutputStream` (抽象基类)**: 所有字节输出流的父类.

    - **常用方法** (可能抛出 `IOException`):
      - `void write(int b)`: 写入一个字节.
      - `void write(byte[] b)`: 写入字节数组.
      - `void write(byte[] b, int off, int len)`: 写入字节数组的一部分.
      - `void close()`: 关闭流.
      - `void flush()`: 刷新缓冲区，强制写入数据.
    - **主要子类 (节点流)**:
      - `FileOutputStream`: 用于向文件中写入信息.
      - `ByteArrayOutputStream`: 将数据写入内存缓冲区.
      - `PipedOutputStream`: 写入数据到相关 `PipedInputStream`.
    - **处理流 (`FilterOutputStream` 的子类)**:
      - `DataOutputStream`: 与 `DataInputStream` 搭配使用，可移植地向流写入基本数据类型.
      - `BufferedOutputStream`: 使用缓冲区，提高写入效率.
      - `PrintStream`: 打印流，为其他输出流添加打印各种数据值表示形式的功能，不抛出 `IOException`，自动刷新.
      - `ObjectOutputStream`: 用于写入对象.

- **字符流类层次结构**:

  - **`Reader` (抽象基类)**: 所有字符输入流的父类.

    - **常用方法** (可能抛出 `IOException`): `int read()`, `int read(char[] cbuf)`, `int read(char[] cbuf, int offset, int length)`, `void close()`, `long skip(long n)`.

    - **主要子类 (节点流)**:

      `FileReader` (文件), `CharArrayReader` (内存字符数组), `StringReader` (内存字符串), `PipedReader` (管道).

    - **处理流 (`FilterReader` 的子类 或 其他)**:

      `BufferedReader` (缓冲), `LineNumberReader` (行号), `PushbackReader` (回退), `InputStreamReader` (字节到字符的转换流).

  - **`Writer` (抽象基类)**: 所有字符输出流的父类.

    - **常用方法** (可能抛出 `IOException`):

      `void write(int c)`, `void write(char[] cbuf)`, `void write(char[] cbuf, int offset, int length)`, `void write(String string)`, `void write(String string, int offset, int length)`, `void close()`, `void flush()`.

    - **主要子类 (节点流)**:

      `FileWriter` (文件), `CharArrayWriter` (内存字符数组), `StringWriter` (内存字符串), `PipedWriter` (管道).

    - **处理流 (`FilterWriter` 的子类 或 其他)**:

      `BufferedWriter` (缓冲), `PrintWriter` (打印流), `OutputStreamWriter` (字符到字节的转换流).

- **特殊流类型**:

  - **`DataInputStream` / `DataOutputStream`**: 用于对已经存在的输入/输出流进行包装，以便在原始流中过滤数据。支持原始数据类型（`boolean`, `char`, `byte`, `short`, `int`, `long`, `float`, `double`）的输入输出，与机器无关.

  - **`BufferedInputStream` / `BufferedOutputStream`**: 减少读写次数，提高 I/O 效率，通过在高速设备和低速设备之间使用缓冲区实现。缓冲区默认大小为 512 字节。当缓冲满或调用 `flush` 方法时，数据写入.

    - **常用方法** (仅 `BufferedReader`/`BufferedWriter`):

      `readLine()` (读取一行), `newLine()` (写入行分隔符), `mark()`, `reset()`.

  - **`ObjectInputStream` / `ObjectOutputStream`**: 支持对象的输入输出，像数据流一样支持对象的输入输出。可序列化对象实现了 `java.io.Serializable` 接口。`Serializable` 是一个标记性接口，没有方法，实现它可启动 Java 序列化机制.

    - 读取对象时，必须与写入时的类型顺序一致.
    - 要使用读回的对象，必须使用 Java 安全类型转换.
    - 数组也可以被序列化.

  - **`PrintStream` / `PrintWriter`**: 为其他输出流添加了方便地打印各种数据值表示形式的功能。分别针对字节和字符，提供重载的 `print` 和 `println` 方法。特点是不抛出 `IOException`，自动刷新.

#### 标准 I/O 流

**三个标准 I/O 流**:

- `System.in`: `InputStream` 类的对象实例 `in` 作为标准输入流对象，对应于键盘输入.
- `System.out`: `PrintStream` 类的对象实例 `out` 作为标准输出流对象，对应于显示器输出.
- `System.err`: `PrintStream` 类的对象实例 `err` 作为标准错误输出流对象，对应于显示器输出.

- 标准 I/O 流可以被重定向到文件或其他流，实现文件复制等功能。

#### 随机访问文件 (`RandomAccessFile`)

`RandomAccessFile`: 适用于由大小已知的记录组成的文件，可以使用 `seek()` 将记录从一处转移到另一处.

它不是继承自 `InputStream` 和 `OutputStream`，而是像 `DataInputStream` 和 `DataOutputStream` 一样实现了 `DataInput` 和 `DataOutput` 接口.

- 类似于把 `DataInputStream` 和 `DataOutputStream` 结合在一起使用.

- 只有 `RandomAccessFile` 类在文件上支持搜寻（`seek()`）方法.

- **构造器**:

  `RandomAccessFile(File file, String mode)`, `RandomAccessFile(String name, String mode)`.

- **常用方法**:

  - `void seek(long pos)`: 用于文件内移至新位置.
  - `long getFilePointer()`: 得到当前位置.
  - `long length()`: 判断文件大小.

压缩流

**`ZipOutputStream` / `GZIPOutputStream`**: 压缩数据，生成 Zip 或 GZip 格式文件.

**`ZipInputStream` / `GZIPInputStream`**: 解压缩已经生成的 Zip 或 GZip 文件.

它们继承于 `InputStream` 和 `OutputStream`.

#### `Scanner` 类

`java.util.Scanner`: Java 5 添加的类，用于从各种输入源（如 `System.in`、文件、字符串）解析基本类型和字符串。

支持使用**正则表达式**来检索、替换那些符合某个模式（规则）的文本。

|             方法             |             含义             |
| :--------------------------: | :--------------------------: |
|           `next()`           | 读取下一个单词（以空格为界） |
|         `nextLine()`         |           读取整行           |
| `nextInt()` / `nextDouble()` |         读取指定类型         |
| `hasNext()` / `hasNextInt()` |    判断是否还有下一个输入    |
|       `useDelimiter()`       |  自定义分隔符（如读取 CSV）  |

## 并发

实现并发有两种方法：

- **继承 `Thread` 类**，重写 `run` 方法

```java
class MyThread extends Thread {
    private String threadName;

    public MyThread(String threadName) {
        this.threadName = threadName;
    }

    @Override
    public void run() { // 线程执行的逻辑
        for (int i = 1; i <= 5; i++) {
            System.out.println(threadName + " --- " + i);
        }
    }
}

public class TestThread {
    public static void main(String[] args) {
        MyThread t1 = new MyThread("Thread-1");
        MyThread t2 = new MyThread("Thread-2");
        t1.start(); // 启动线程，JVM 调用 run 方法
        t2.start();
    }
}
```

- **实现 `Runnable` 接口**，重写 `run` 方法，并创建 `Thread` 对象

```java
class MyRunnable implements Runnable {
    private String threadName;

    public MyRunnable(String threadName) {
        this.threadName = threadName;
    }

    @Override
    public void run() { // 线程执行的逻辑
        for (int i = 1; i <= 5; i++) {
            System.out.println(threadName + " --- " + i);
        }
    }
}

public class TestRunnable {
    public static void main(String[] args) {
        Runnable r1 = new MyRunnable("Runnable-1");
        Runnable r2 = new MyRunnable("Runnable-2");
        new Thread(r1).start(); // 将 Runnable 实例包装到 Thread 对象中
        new Thread(r2).start();
    }
}
```

**线程生命周期**:

- **Born state / New Thread (出生)**：线程对象被创建但尚未启动。
- **Ready state / Runnable Thread (就绪)**：线程调用 `start()` 方法后进入此状态，等待 CPU 调度。
- **Running state (运行)**：线程获得 CPU 时间片，正在执行 `run()` 方法中的代码。
- **Sleeping state (休眠)**：线程调用 `Thread.sleep()` 方法后进入此状态，暂停执行指定时间，时间结束后进入就绪态。
- **Waiting state (等待)**：线程调用 `Object.wait()` 或 `Thread.join()` 等方法后进入此状态，等待其他线程的特定通知或完成。
- **Blocked state (阻塞)**：线程试图获取一个被其他线程持有的 `synchronized` 锁时进入此状态。
- **Dead state (死亡)**：线程的 `run()` 方法执行完毕或因未捕获的异常而终止。

---

Java 线程优先级由操作系统实现。

- 分为 **1 到 10 级**（`Thread.MIN_PRIORITY` 到 `Thread.MAX_PRIORITY`），默认是 5 (`Thread.NORM_PRIORITY`)。
- `setPriority(int newPriority)`: 设置线程优先级。
- 线程组调度依赖于宿主系统的调度算法，优先级设置的复杂性。Java 线程优先级只是给操作系统的一个提示，具体调度由操作系统决定。

### 同步

Java 提供了 **`synchronized` 关键字**作为最基本的同步机制。每个 Java 对象都可以作为一个**监视器锁** (monitor lock)。

当一个线程进入 `synchronized` 代码块或方法时，它会尝试获取该对象的锁。如果锁已经被其他线程持有，当前线程就会被阻塞，直到锁被释放。

- **`synchronized` 方法**
- **`synchronized` 块**

### 协作

除了简单的同步访问共享资源，线程有时还需要**相互协调**，即一个线程等待某个条件满足，而另一个线程负责满足条件并通知等待的线程。Java 的 `Object` 类提供了 `wait()`, `notify()`, `notifyAll()` 方法来实现这种协作。

- **`wait()`**:
  - **作用**: 使当前线程**释放它所持有的对象锁** ，并进入该对象的**等待池**（或称等待队列），从而暂停执行。
  - **调用时机**: 必须在 `synchronized` 块或方法中调用，否则会抛出 `IllegalMonitorStateException`。
  - **唤醒**: 线程会一直等待，直到被 `notify()` 或 `notifyAll()` 唤醒，或者达到超时时间 (`wait(long timeout)`)，或者被中断 (`InterruptedException`)。
  - **虚假唤醒 (Spurious Wakeup)**: 线程有可能在没有被 `notify()` 或 `notifyAll()` 明确通知的情况下被唤醒。因此，等待的条件**必须用 `while` 循环进行检查**，而不是 `if` 语句 。
- **`notify()`**:
  - **作用**: 唤醒在该对象上等待的**一个**任意线程（JVM 决定唤醒哪个）。被唤醒的线程会尝试重新获取对象锁，然后从 `wait()` 暂停的地方继续执行。
  - **调用时机**: 必须在 `synchronized` 块或方法中调用。
- **`notifyAll()`**:
  - **作用**: 唤醒在该对象上等待的**所有**线程。所有被唤醒的线程都会竞争对象锁。
  - **调用时机**: 必须在 `synchronized` 块或方法中调用。
  - **建议**: 鉴于虚假唤醒和条件竞争的复杂性，通常建议使用 `notifyAll()` 而非 `notify()`，以确保所有相关线程都有机会重新检查条件并继续执行 。

---

#### `volatile` 关键字

`volatile` 关键字典型的应用是作为**状态标志**或**开关**。

1. **保证可见性** (Visibility)
   - 在多核处理器系统中，每个 CPU 都可能有自己的高速缓存 (cache) 。当一个线程修改了一个共享变量时，它可能只修改了自己 CPU 缓存中的副本，而没有立即写入主内存 (main memory) 。其他线程在读取同一个变量时，可能仍然从自己的旧缓存中读取，从而看不到最新的修改。
   - `volatile` 关键字的作用是强制对变量的所有修改都立即从 CPU 缓存写入到主内存中，并且强制对该变量的所有读取都直接从主内存中进行，而不是从线程的本地缓存中读取 。这确保了当一个线程修改了 `volatile` 变量的值，其他线程能够立即看到最新的值。
2. **保证有序性** (Ordering) ，禁止指令重排序
   - 为了提高性能，编译器和处理器可能会对指令进行重排序。例如，在一个线程中，如果代码是 `operation1(); volatileVariable = true; operation2();`，在没有 `volatile` 的情况下，`operation1()` 和 `operation2()` 可能会被重排序到 `volatileVariable = true;` 之前或之后执行，只要它们之间没有数据依赖。
   - `volatile` 关键字会禁止对其前后代码的**指令重排序**。具体来说，当一个变量被声明为 `volatile` 后，读操作不能被重排序到写操作之后，写操作不能被重排序到读操作之前 。这确保了在写入 `volatile` 变量之前的所有操作都已完成，并且在读取 `volatile` 变量之后的所有操作都能看到最新的值。

`volatile` **不保证原子性**，只能保证可见性和有序性。这意味着对于复合操作（如 `i++`，它实际上是读-改-写三个步骤），即使变量是 `volatile` 的，仍然可能出现竞态条件和数据不一致问题。

## 网络编程

### TCP

服务端：

```java
import java.io.DataOutputStream; // 用于发送数据 [cite: 339]
import java.io.IOException;     // 处理 I/O 异常 [cite: 333]
import java.net.ServerSocket;   // 服务器 Socket 类 [cite: 333]
import java.net.Socket;         // 客户端 Socket 类 [cite: 334]
import java.io.BufferedOutputStream; // 用于提高写入效率

public class SimpleTCPServer {
    public static void main(String[] args) {
        int port = 8081; // 服务器监听端口 [cite: 338]
        ServerSocket serverSocket = null; // 服务器套接字 [cite: 333]
        Socket clientSocket = null;     // 客户端套接字 [cite: 334]

        try {
            // 1. 创建 ServerSocket 对象，指定服务端口 [cite: 338]
            serverSocket = new ServerSocket(port);
            System.out.println("服务器已启动，正在监听端口 " + port + "...");

            // 2. 接受客户端的连接，此方法会阻塞直到有客户端连接 [cite: 333]
            clientSocket = serverSocket.accept();
            System.out.println("服务端接受连接! 客户端地址: " + clientSocket.getInetAddress().getHostAddress()); [cite: 339]

            // 3. 获取输出流并发送数据 [cite: 334]
            DataOutputStream dos = new DataOutputStream(new BufferedOutputStream(clientSocket.getOutputStream()));
            dos.writeUTF("你好!我是服务端!"); // 发送 UTF 字符串 [cite: 339]
            dos.flush(); // 刷新缓冲区，确保数据发送 [cite: 339]
            System.out.println("服务端已发送消息。");

        } catch (IOException e) {
            System.err.println("服务器发生 I/O 错误: " + e.getMessage());
            e.printStackTrace();
        } finally {
            // 4. 关闭连接和流，释放资源 [cite: 333, 334]
            try {
                if (clientSocket != null) clientSocket.close();
                if (serverSocket != null) serverSocket.close();
                System.out.println("服务器连接已关闭。");
            } catch (IOException e) {
                System.err.println("关闭资源时发生错误: " + e.getMessage());
            }
        }
    }
}
```

客户端：

```java
import java.io.BufferedInputStream; // 用于提高读取效率
import java.io.DataInputStream;     // 用于接收数据 [cite: 340]
import java.io.IOException;
import java.net.Socket;             // 客户端 Socket 类 [cite: 334]

public class SimpleTCPClient {
    public static void main(String[] args) {
        String serverAddress = "localhost"; // 服务器地址 [cite: 340]
        int serverPort = 8081;             // 服务器端口 [cite: 340]
        Socket clientSocket = null;        // 客户端套接字 [cite: 334]

        try {
            // 1. 创建 Socket 对象，连接到服务器 [cite: 337]
            clientSocket = new Socket(serverAddress, serverPort);
            System.out.println("客户端已连接到服务器 " + serverAddress + ":" + serverPort);

            // 2. 获取输入流并接收数据 [cite: 337]
            DataInputStream dis = new DataInputStream(new BufferedInputStream(clientSocket.getInputStream()));
            String message = dis.readUTF(); // 接收 UTF 字符串 [cite: 340]
            System.out.println("客户端收到消息: " + message);

        } catch (IOException e) {
            System.err.println("客户端发生 I/O 错误: " + e.getMessage());
            e.printStackTrace();
        } finally {
            // 3. 关闭连接和流，释放资源 [cite: 337]
            try {
                if (clientSocket != null) clientSocket.close();
                System.out.println("客户端连接已关闭。");
            } catch (IOException e) {
                System.err.println("关闭资源时发生错误: " + e.getMessage());
            }
        }
    }
}
```

### UDP

Sender:

```Java
import java.io.ByteArrayOutputStream; // 用于将字符串转换为字节数组
import java.io.DataOutputStream;     // 用于将字符串写入字节流
import java.io.IOException;
import java.net.DatagramPacket;      // UDP 数据报包 [cite: 362]
import java.net.DatagramSocket;      // UDP 套接字 [cite: 361]
import java.net.InetSocketAddress;   // IP 地址和端口的组合

public class SimpleUDPSender {

    // 辅助方法：将字符串转换为字节数组
    public static byte[] convertStringToBytes(String str) throws IOException { [cite: 378]
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        DataOutputStream dos = new DataOutputStream(bos);
        dos.writeUTF(str); // 写入 UTF 字符串
        dos.flush();
        byte[] data = bos.toByteArray();
        dos.close();
        return data;
    }

    public static void main(String[] args) {
        DatagramSocket clientSocket = null; // UDP 套接字 [cite: 376]
        String message = "哈哈哈!"; // 要发送的数据 [cite: 377]
        String receiverAddress = "localhost"; // 接收方地址 [cite: 377]
        int receiverPort = 8086;             // 接收方端口 [cite: 377]

        try {
            // 1. 创建 DatagramSocket 对象 (客户端通常无需指定端口，系统会随机分配) [cite: 376]
            clientSocket = new DatagramSocket();
            System.out.println("UDP 发送方已启动。");

            // 2. 准备要发送的数据 (转换为字节数组) [cite: 377]
            byte[] data = convertStringToBytes(message);

            // 3. 数据打包: 创建 DatagramPacket，指定数据、长度、目标地址和端口 [cite: 362, 377]
            DatagramPacket packet = new DatagramPacket(data, data.length,
                    new InetSocketAddress(receiverAddress, receiverPort));

            // 4. 发送数据报 [cite: 361, 378]
            clientSocket.send(packet);
            System.out.println("UDP 发送方已发送消息: '" + message + "' 到 " + receiverAddress + ":" + receiverPort);

        } catch (IOException e) {
            System.err.println("UDP 发送方发生 I/O 错误: " + e.getMessage());
            e.printStackTrace();
        } finally {
            // 5. 关闭 DatagramSocket，释放资源 [cite: 378]
            if (clientSocket != null) clientSocket.close();
            System.out.println("UDP 发送方已关闭。");
        }
    }
}
```

Receiver:

```java
import java.io.ByteArrayInputStream; // 用于将字节数组转换为输入流
import java.io.DataInputStream;     // 用于从字节流中读取数据
import java.io.IOException;
import java.net.DatagramPacket;      // UDP 数据报包 [cite: 362]
import java.net.DatagramSocket;      // UDP 套接字 [cite: 361]

public class SimpleUDPReceiver {

    // 辅助方法：将字节数组转换为字符串
    public static String convertBytesToString(byte[] data) throws IOException { [cite: 374]
        ByteArrayInputStream bais = new ByteArrayInputStream(data);
        DataInputStream dis = new DataInputStream(bais);
        String str = dis.readUTF(); // 读取 UTF 字符串
        dis.close();
        return str;
    }

    public static void main(String[] args) {
        int port = 8086; // 接收方监听端口
        DatagramSocket serverSocket = null; // UDP 套接字

        try {
            // 1. 创建 DatagramSocket 对象，并绑定到指定端口
            serverSocket = new DatagramSocket(port);
            System.out.println("UDP 接收方已启动，正在监听端口 " + port + "...");

            // 2. 准备容器（字节数组）用于接收数据 [cite: 372]
            byte[] buffer = new byte[1024];

            // 3. 打包容器：创建 DatagramPacket，用于接收数据报 [cite: 372]
            DatagramPacket packet = new DatagramPacket(buffer, buffer.length);

            // 4. 接收数据报，此方法会阻塞直到接收到数据 [cite: 372]
            serverSocket.receive(packet);
            System.out.println("UDP 接收方收到数据报。");

            // 5. 从包里取出数据 [cite: 373]
            byte[] receivedData = packet.getData();
            // 6. 转换数据为字符串 [cite: 373]
            String message = convertBytesToString(receivedData);

            System.out.println("收到消息: '" + message + "'");
            System.out.println("来自发送方: " + packet.getAddress().getHostAddress() + ":" + packet.getPort());

        } catch (IOException e) {
            System.err.println("UDP 接收方发生 I/O 错误: " + e.getMessage());
            e.printStackTrace();
        } finally {
            // 7. 关闭 DatagramSocket，释放资源
            if (serverSocket != null) serverSocket.close();
            System.out.println("UDP 接收方已关闭。");
        }
    }
}
```

## SQL

### 增

```java
import java.sql.Connection;     // 数据库连接 [cite: 61]
import java.sql.DriverManager;  // 驱动管理器 [cite: 61]
import java.sql.SQLException;   // SQL 异常 [cite: 61]
import java.sql.Statement;      // SQL 语句 [cite: 61]

public class DerbyCreateInsertExample {
    public static void main(String[] args) {
        // Derby 嵌入式驱动类名
        String driver = "org.apache.derby.jdbc.EmbeddedDriver"; [cite: 82]
        // Derby 数据库 URL，如果不存在会自动创建
        String url = "jdbc:derby:helloDB;create=true"; [cite: 83]
        String username = "user";
        String password = "password";

        Connection conn = null; // 数据库连接对象 [cite: 61]
        Statement stmt = null;   // SQL 语句执行对象 [cite: 61]

        try {
            // 1. 加载 JDBC 驱动程序 [cite: 82]
            Class.forName(driver);
            System.out.println("驱动加载成功。");

            // 2. 建立与数据库的连接 [cite: 83]
            conn = DriverManager.getConnection(url, username, password);
            System.out.println("成功连接到数据库 helloDB。");

            // 3. 创建 Statement 对象 [cite: 84]
            stmt = conn.createStatement();

            // 4. 定义并执行 SQL 语句 - 创建表 [cite: 85]
            String createTableSQL = "CREATE TABLE students (id INT PRIMARY KEY, name VARCHAR(50), age INT)";
            stmt.execute(createTableSQL); // execute() 用于 DDL 语句 [cite: 85]
            System.out.println("表 'students' 创建成功。");

            // 5. 定义并执行 SQL 语句 - 插入数据 [cite: 86]
            String insertSQL1 = "INSERT INTO students VALUES (1, 'Alice', 20)";
            String insertSQL2 = "INSERT INTO students VALUES (2, 'Bob', 22)";
            stmt.executeUpdate(insertSQL1); // executeUpdate() 用于 INSERT/UPDATE/DELETE [cite: 86]
            stmt.executeUpdate(insertSQL2);
            System.out.println("数据插入成功。");

        } catch (ClassNotFoundException e) {
            System.err.println("未找到 JDBC 驱动类: " + e.getMessage());
        } catch (SQLException e) {
            System.err.println("数据库操作失败: " + e.getMessage());
            // Derby 错误码 X0Y32 表示表已存在，可以忽略
            if (e.getSQLState().equals("X0Y32")) {
                System.out.println("注意: 表 'students' 可能已存在，跳过创建。");
            } else {
                e.printStackTrace();
            }
        } finally {
            // 6. 关闭连接和流 (使用 try-with-resources 更简洁，这里为了演示手动关闭) [cite: 88]
            try {
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
                System.out.println("资源已关闭。");
            } catch (SQLException e) {
                System.err.println("关闭资源时发生错误: " + e.getMessage());
            }
            // 对于嵌入式 Derby，通常在程序结束时需要显式关闭数据库
            try {
                DriverManager.getConnection("jdbc:derby:;shutdown=true"); // [cite: 89]
                System.out.println("Derby 数据库已正常关闭。"); // [cite: 90]
            } catch (SQLException e) {
                // SQLSTATE 08006 表示数据库已关闭，这是正常现象 [cite: 89]
                if (!e.getSQLState().equals("08006")) {
                    System.err.println("关闭 Derby 数据库时发生错误: " + e.getMessage());
                }
            }
        }
    }
}
```

### 查

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;      // 结果集 [cite: 61]
import java.sql.SQLException;
import java.sql.Statement;

public class DerbyQueryExample {
    public static void main(String[] args) {
        String driver = "org.apache.derby.jdbc.EmbeddedDriver";
        String url = "jdbc:derby:helloDB"; // 注意：这里不再用 create=true
        String username = "user";
        String password = "password";

        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null; // 结果集对象 [cite: 61]

        try {
            Class.forName(driver);
            System.out.println("驱动加载成功。");

            conn = DriverManager.getConnection(url, username, password);
            System.out.println("成功连接到数据库 helloDB。");

            stmt = conn.createStatement();

            // 1. 执行 SQL 查询语句
            String selectSQL = "SELECT id, name, age FROM students ORDER BY age DESC";
            rs = stmt.executeQuery(selectSQL); // executeQuery() 用于 SELECT

            System.out.println("\n查询结果:");
            System.out.println("ID\t姓名\t年龄");
            // 2. 处理结果集
            while (rs.next()) { // 遍历结果集的每一行 [cite: 70, 87]
                int id = rs.getInt("id");     // 根据列名获取 int 类型数据 [cite: 72]
                String name = rs.getString("name"); // 根据列名获取 String 类型数据 [cite: 72]
                int age = rs.getInt("age");
                System.out.println(id + "\t" + name + "\t" + age);
            }

        } catch (ClassNotFoundException e) {
            System.err.println("未找到 JDBC 驱动类: " + e.getMessage());
        } catch (SQLException e) {
            System.err.println("数据库操作失败: " + e.getMessage());
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) rs.close(); // 关闭 ResultSet [cite: 88]
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
                System.out.println("资源已关闭。");
            } catch (SQLException e) {
                System.err.println("关闭资源时发生错误: " + e.getMessage());
            }
            // 关闭 Derby 数据库
            try {
                DriverManager.getConnection("jdbc:derby:;shutdown=true");
            } catch (SQLException e) {
                if (!e.getSQLState().equals("08006")) {
                    System.err.println("关闭 Derby 数据库时发生错误: " + e.getMessage());
                }
            }
        }
    }
}
```

### 删改

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DerbyUpdateDeleteExample {
    public static void main(String[] args) {
        String driver = "org.apache.derby.jdbc.EmbeddedDriver";
        String url = "jdbc:derby:helloDB"; // 注意：这里不再用 create=true
        String username = "user";
        String password = "password";

        Connection conn = null;
        Statement stmt = null;

        try {
            Class.forName(driver);
            System.out.println("驱动加载成功。");

            conn = DriverManager.getConnection(url, username, password);
            System.out.println("成功连接到数据库 helloDB。");

            stmt = conn.createStatement();

            // 1. 更新数据
            String updateSQL = "UPDATE students SET age = 21 WHERE name = 'Alice'";
            int updatedRows = stmt.executeUpdate(updateSQL); // executeUpdate() 返回受影响行数
            System.out.println("更新成功，影响行数: " + updatedRows);

            // 2. 插入新数据以便稍后删除
            String insertSQL = "INSERT INTO students VALUES (3, 'Charlie', 25)";
            stmt.executeUpdate(insertSQL);
            System.out.println("插入 Charlie 成功。");

            // 3. 删除数据
            String deleteSQL = "DELETE FROM students WHERE name = 'Bob'";
            int deletedRows = stmt.executeUpdate(deleteSQL); // executeUpdate() 返回受影响行数
            System.out.println("删除成功，影响行数: " + deletedRows);

        } catch (ClassNotFoundException e) {
            System.err.println("未找到 JDBC 驱动类: " + e.getMessage());
        } catch (SQLException e) {
            System.err.println("数据库操作失败: " + e.getMessage());
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
                System.out.println("资源已关闭。");
            } catch (SQLException e) {
                System.err.println("关闭资源时发生错误: " + e.getMessage());
            }
            // 关闭 Derby 数据库
            try {
                DriverManager.getConnection("jdbc:derby:;shutdown=true");
            } catch (SQLException e) {
                if (!e.getSQLState().equals("08006")) {
                    System.err.println("关闭 Derby 数据库时发生错误: " + e.getMessage());
                }
            }
        }
    }
}
```

## 备考建议

- 选择题
- 大题主要有
  - OOP 继承多态
  - 比较简单的容器使用
  - 多线程互斥同步
  - SQL 或者通信应该会考一个

## 参考和注解

- [Y分钟速成X 其中 X=Java](https://learnxinyminutes.com/zh-cn/java/)
