##Node.js使用MongoDB

###mongodb.js
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
2. 跟新一条document db.collection.updateOne({"field","value"},$set{"name":"value"},callback)
3. 查找document db.collection.find({"field","value"}).each(callback)
4. 删除document db.collection.deleteMany({"field","value"}).each(callback)deleteMany
5. 删除collection db.dropCollection("collectionName", callback)
