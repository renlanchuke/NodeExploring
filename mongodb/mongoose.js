/**
 * mongoose提供了一个schema-based的数据建模方案，
 * 可以为MongoDB提供一些关系数据库的特性，如引用其它的文档，
 * 类型检查等
 * renlanchuke
 * 2016-4-17
 */
//加载模块  
var mongoose=require('mongoose'),
assert =require('assert');

var Heros=require('./models/heros');
//连接MongoDB
var  url='mongodb://localhost:27017/mongoExp';
mongoose.connect(url);
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function () {
    console.log("成功打开英雄谱!");
    
    //创建新的Hero
    var newHero=Heros({
        name:"李寻欢",
        nickname:"小李探花",
        shengong:"小李飞刀",
        description:"飞刀一出，例不虚发",
        weapen:
            {
                name:"飞刀",
                label:"暗器",
                price:"1.5",
                description:"大冶铁匠花三个时辰打好的普通飞刀"
            }
        
     });
     //将新的hero存入数据库
     newHero.save(function (err) {
         if(err) throw err;
         console.log('李寻欢录入英雄谱');
         
         
         Heros.find({},function (err,heros) {
            if(err) throw err;
            console.log(heros);
            //删除collection
            db.collection('heros').drop(function (){
                db.close();
            });
         });
     });
});