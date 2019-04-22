'use strict';

// 加载模块
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// MongoDB地址，数据库mongoExp如果不存在则自动创建
var url = 'mongodb://localhost:27017/mongoExp';
// 连接数据库
MongoClient.connect(url)
    .then(function(err, db) {
      assert.equal(err, null);
      console.log('连接成功！');
      // 获取集合，如果集合不存在则创建集合
      var collection = db.collection('students');
      // 插入一条数据
      collection.insertOne({
        name: '小明',
        class: '三年级',
        grade: '99'
      })
            .then(function(err, result) {
              assert.equal(err, null);
              console.log('插入第一条记录成功');

              // 插入第二条数据
              collection.insertOne({
                name: '张旻',
                class: '三年级',
                grade: '95'
              }, function(err, result) {
                assert.equal(err, null);
                console.log('插入第二条记录成功');
                // 查找集合信息
                collection.find({}).toArray(function(err, docs) {
                  assert.equal(err, null);
                  console.log('找到:');
                  console.log(docs);
                  // 查找一条记录
                  collection.find({
                    'name': '张旻'
                  }).each(function(err, docs) {
                    assert.equal(err, null);
                    if (docs !== null) {
                      console.log('找到张旻:');
                      console.log(docs);
                    }
                  });
                  // 修改记录
                  collection.updateOne({
                    'name': '小明'
                  }, {
                    $set: {
                      'name': '小青'
                    }
                  }, function(err, result) {
                    assert.equal(err, null);
                    console.log('修改成功！');
                  });
                  // 删除记录
                  collection.deleteMany({
                    'name': '张旻'
                  }, function(err, results) {
                    assert.equal(err, null);
                    console.log('删除成功');
                    collection.find({}).toArray(function(err, docs) {
                      assert.equal(err, null);
                      console.log('找到:');
                      console.log(docs);
                      // 删除集合
                      db.dropCollection('students', function(err, result) {
                        assert.equal(err, null);
                        console.log('删除成功');
                        collection.find({}).toArray(function(err, docs) {
                          assert.equal(err, null);
                          console.log('找到:');
                          console.log(docs);
                          // 关闭数据库
                          db.close();
                        });
                      });
                    });
                  });
                });
              });
            });
    });
