---
title: 二手房房价数据的爬取、清洗、可视化、预测
url: https://blog.kisechan.space/2024/crawer/
type: post
time: '2026-10-21T16:13:46.163Z'
---

# 数据爬取

## 爬虫和人机验证

利用Selenium库和Edge Driver可唤起实体浏览器，并捕获网站中的`Element`元素。

```python
count=0
dataList=[]
# 浏览器可无头化：
# options=webdriver.EdgeOptions()
# options.add_argument('--headless')
# driver = webdriver.Edge(options=options)
# driver = webdriver.Edge()
driver = webdriver.Edge()
flag=1
for i in range(32,64):    # 爬取第几页
    print("爬取第"+str(i)+"页")
    url=baseUrl+str(i)
    driver.get(url)
    if flag:
        time.sleep(10)
        flag=0
    print(driver.title)
    item0=driver.find_elements(By.CLASS_NAME,"lj-lazy")
    item1=driver.find_elements(By.CLASS_NAME,"title")
    item2=driver.find_elements(By.CLASS_NAME,"positionInfo")
    item3=driver.find_elements(By.CLASS_NAME,"houseInfo")
    item4=driver.find_elements(By.CLASS_NAME,"totalPrice ")
    item5=driver.find_elements(By.CLASS_NAME,"unitPrice ")
    item6 = driver.find_elements(By.CLASS_NAME, "followInfo")
    for i in range(0,len(item2)):
        data=[]
        data.append(item1[i].text)  # 概况
        print("第"+str(i+1)+"个："+item1[i].text)
        data.append(item2[i].text.split("-")[0])  # 小区名
        data.append(item2[i].text.split("-")[1])  # 所属地区
        if len(item3[i].text.split("|"))>0:
            data.append(item3[i].text.split("|")[0])  # 其他信息
        else:
            data.append('未知数据')
        if len(item3[i].text.split("|"))>1:
            data.append(item3[i].text.split("|")[1])
        else:
            data.append('未知数据')
        if len(item3[i].text.split("|"))>2:
            data.append(item3[i].text.split("|")[2])
        else:
            data.append('未知数据')
        if len(item3[i].text.split("|"))>3:
            data.append(item3[i].text.split("|")[3])
        else:
            data.append('未知数据')
        if len(item3[i].text.split("|"))>4:
            if len(item3[i].text.split("|")[4].split("("))>0:
                data.append(item3[i].text.split("|")[4].split("(")[0])
                if len(item3[i].text.split("|")[4].split("("))>1:
                    amount = re.search(r'共(\d+)层', item3[i].text.split("|")[4].split("(")[1])
                    if amount:
                        # 提取第一个捕获组的内容
                        number = amount.group(1)
                        data.append(number)
                    else:
                        data.append('未知数据')
                else:
                    data.append('未知数据')
            else:
                data.append('未知数据')
        else:
            data.append('未知数据')
        if len(item3[i].text.split("|"))>5:
            data.append(item3[i].text.split("|")[5])
        else:
            data.append('未知数据')

        data.append(item4[i].text.split()[0]+item4[i].text.split()[1])  # 总价
        data.append(item5[i].text)  # 单价
        data.append(item6[i].text.split("/")[0])
        data.append(item6[i].text.split("/")[1])
        data.append(item0[i].get_attribute("data-original"))  # 图片
        dataList.append(data)
        count=count+1
    print("完成")
driver.quit()
```

倘若遇到人机验证，可`time.sleep()`给我们手动输入验证码的时间。

## 输出

利用xlwt库：

```python
def saveData(dataList,savepath,count):
    book = xlwt.Workbook(encoding="utf-8",style_compression=0)
    sheet = book.add_sheet('二手房', cell_overwrite_ok=True)
    col = ("概况","小区名","所属地区","户型","面积","朝向","装潢","楼层高低","总楼层数","建筑类型","总价","单价","关注度","发布时间","图片地址")
    for i in range(0,15):
        sheet.write(0,i,col[i])
    for i in range(0,count):
        data = dataList[i]
        for j in range(0,15):
            sheet.write(i+1,j,data[j])
    book.save(savepath)
```

## 多线程化

直接调用库即可，可启动多个浏览器进行爬虫：

```python
def main(page_start,pages_end, savepath):
    all_data = []

    with ThreadPoolExecutor(max_workers=(pages_end-page_start+1)) as executor:
        futures = [executor.submit(scrape_page, i) for i in range(page_start, pages_end + 1)]

        for future in futures:
            page_data = future.result()
            all_data.extend(page_data)

    saveData(all_data, savepath)
    print(f"成功抓取 {pages_end-page_start+1} 页数据并保存到 {savepath}")
```

# 数据清洗

主要调用Pandas和Numpy：

```python
column_names = ['概况','小区名','所属地区','户型','面积','朝向','装潢','楼层高低','总楼层数','建筑类型','总价','单价','关注度','发布时间','图片地址']
data = pd.read_excel('二手房.xls', usecols=column_names, engine='xlrd')
data.head()
df=pd.DataFrame(data)
df['概况']=df['概况'].str.replace('\n',' ')
df['小区名']=df['小区名'].str.replace(' ','')
df['所属地区']=df['所属地区'].str.replace(' ','')
df['户型']=df['户型'].str.replace(' ','')
df['面积']=df['面积'].str.replace(' ','')
df['面积']=df['面积'].str.replace('平米','')
df['朝向']=df['朝向'].map(str.strip)
df['装潢']=df['装潢'].str.replace(' ','')
df['楼层高低']=df['楼层高低'].str.replace(' ','')
df['建筑类型']=df['建筑类型'].str.replace(' ','')
df['总价']=df['总价'].str.replace('万','')
df['单价']=df['单价'].str.replace(',','')
df['单价']=df['单价'].str.replace('元/平','')
df['关注度']=df['关注度'].str.replace('人关注','')
df['关注度']=df['关注度'].str.replace(' ','')
df['发布时间']=df['发布时间'].str.replace(' ','')
df['发布时间'] = df['发布时间'].str.replace('以前发布', '前')
df['发布时间'] = df['发布时间'].str.replace('前发布', '前')
df['总楼层数'] = df['总楼层数'].astype(int, errors='ignore')
df = df.astype({'单价': float, '总价': float, '面积': float ,'关注度': int})
df = df.drop_duplicates(subset=['概况','小区名','所属地区','户型','面积','朝向','装潢','楼层高低','总楼层数','建筑类型','总价','单价','关注度','发布时间','图片地址'])
df = df[df['总楼层数'] != '未知数据']
# print(df['总楼层数'].value_counts())

df.to_excel("清洗.xlsx", index=False)
```

可以做到简单的去除重复数据、格式标准化、类型转换。

# 数据可视化

主要利用Matplotlib，也可使用Pyecharts。

# 数据预测

主要使用Scikit-Learn机器学习。

## 数据编码

要将非数值数据进行编码，可采用**标签编码、独热编码、平均值编码**等方式，我们主要采用的是独热编码和平均值编码。

### 独热编码

将数据编码为列向量的形式，即非“本特征”定义为`0`，否则为`1`。但是为了拟合的准确性，我们需要丢弃每个元素进行独热编码后的第一列（即`drop_first=True`语句）。独热编码适合类型少的数据。

```python
def preOneHot(data):    # 使用OneHot预处理数据
    types = data[['楼层高低', '建筑类型']]
    types_encoded = pd.get_dummies(types, drop_first=True)
    return types_encoded
```

### 平均值编码

即编码为该特征目标值的平均值。适合类型多的数据。

```python
def PreAverage(df, feature, target):    # 平均值编码
    encoding_map = df.groupby(feature)[target].mean()
    return df[feature].map(encoding_map)
```

## 模型训练

### 划分

在对数据进行编码后，就可以划分为训练集和测试集了。其中还用StandardScaler进行了正态分布化，可以提高训练效率。

```python
data = inputData()
final_data = preData(data)
X = final_data.values
y = data[targetCols].values.ravel()


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.6, random_state=400)

scaler = StandardScaler()   # 数据标准化，转化成正态分布
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
```

### 模型选择

回归模型有很多种，但我们必须选择性能最好的那个，所以先每一个都试一遍：

```python
models = {
    'K-邻近算法': KNeighborsRegressor(),
    '线性回归': LinearRegression(),
    '岭回归': Ridge(),
    '拉索回归': Lasso(),
    '决策树回归': DecisionTreeRegressor(),
    '支持向量回归': SVR()
}

for name, model in models.items():              # 每个模型都试一遍
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    r2 = r2_score(y_test, y_pred)               # r2值
    mse = mean_squared_error(y_test, y_pred)    # 均方根误差

    print(f"模型 {name} 的 r2 值为：{r2:.4f}，RMSE 值为 {np.sqrt(mse):.4f}")

    R = random.randrange(0, len(X_test))  # 取随机数
    y_true = y_test[R]
    X_sample = X_test[R].reshape(1, -1)         # 转置向量

    y_pred_sample = model.predict(X_sample)
    print(f'房价真实值为：{y_true:.2f}，房价推测值为：{y_pred_sample[0]:.2f}，差值为：{abs(y_pred_sample[0] - y_true):.2f}\n')

print("综合以上，可以看到线性回归、岭回归、拉索回归的效果是最好的")
```

接下来，就可以用线性回归模型进行拟合预测了。结合可交互界面就可以完成本项目。
