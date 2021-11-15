## 项目初始化

1. `npx create-react-app antd4-react-demo`

2. `yarn add antd react-router-dom`

3. 在根目录下创建`.prettierrc.json`文件，内容如下：

   ```json
   {
     "printWidth": 120,
     "singleQuote": true,
     "arrowParens": "avoid",
     "trailingComma": "es5"
   }
   ```

4. 

## 源码托管

```
git init
git config user.email "jayson7710@gmail.com"
git config user.name "jayson-xu"
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/jayson-xu/antd4-react-demo.git
git push -u origin main
```
2021-8-13之后弃用账号密码的方式验证git操作，在settings页面中选择"Developer settings"，再选择"Personal access tokens"，点击"Generate new token"，勾选repo，生成新的Token，并把它记下来，在进行git操作时，依然输入账号，询问密码时输入token即可。

## 组件使用

### Table高度自适应

+ 期望效果

  当显示的数据行较多，高度超出客户区时表格高度适应客户区，显示滚动条

  当显示的数据行较少，表格会吊在半空中影响美观，期望也将其高度调整到合适的高度

+ 实现

  1. 给Table组件指定id，通过scroll控制最大高度

     ```js
         <Table
           id="table2"
           ...
           scroll={{ y: 'calc(100vh - 120px)' }}
           onChange={handleTableChange}
         />
     
     ```

     

  2. 定义一个函数，用于调整Table高度

     ```js
       // 调整Table组件的高度，当数据不够时也撑满客户区
       const adjustTableHeight = () => {
         setTimeout(() => {
           let elTable = document.querySelector('#table2 .ant-table-body table');
           let elTbody = elTable.querySelector('tbody');
           let tableBodyHeight = elTbody.offsetHeight;
           //console.log('table height', tableBodyHeight);
           let remainHeight = tableBodyHeight + 120; //这个120需要实际去计算除表格之外其他组件的高度之和
           let divHeight = `calc(100vh - ${remainHeight}px)`;
           //创建一个div，用于撑高table
           var idOfDivBlank = 'div_blank_in_table2';
           var divBlank = document.createElement('div');
           divBlank.id = idOfDivBlank;
           divBlank.style.height = divHeight;
           let elExisted = document.getElementById(idOfDivBlank);
           if (elExisted) {
             elExisted.remove();
           }
           elTable.appendChild(divBlank);
         }, 10);
       };
     ```

     

  3. 在onChange事件的响应函数中调用`adjustTableHeight()`

