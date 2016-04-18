##Node.js使用MongoDB

###mongodb
安装MongoDB官方驱动mongodb
和调试工具assert
```
npm install mongodb --save
npm install assert --save
```
运行
```
npm mongodb.js
```
MongoDB数据库基本操作函数
1. 插入一条document db.collection.insertOne({document},callback)
2. 更新一条document db.collection.updateOne({"field","value"},$set{"name":"value"},callback)
3. 查找document db.collection.find({"field","value"}).each(callback)
4. 删除document db.collection.deleteMany({"field","value"}).each(callback)deleteMany
5. 删除collection db.dropCollection("collectionName", callback)

###mongoose
[mongoose][1]是node.js上一个mongodb的ODM(Object Data Model)插件。
MongoDB对于插入到collection的document没有限制，任何document可以存放
到任意的collection中，维护collection数据结构的统一需要我们自己去做。
Mongoose组件可以进行object document mapping,利用Schema定义每个
collection的数据结构。也可以进行object relational mapping(ORM)为
MongoDB的操作添加关系数据库的特性。由于MongoDB不支持join,要在一个文档
中引用另一个文档，需要将另一个document的对象保存在当前document中。在mongoose
中<code>[population][2]</code>实现<code>reference</code>另一个文档


[1] http://mongoosejs.com/
[2] http://mongoosejs.com/docs/populate.html
