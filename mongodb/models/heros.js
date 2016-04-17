/**
 * renlanchuke
 * 2016-4-8
 * mongoose创建model
 */

var mongoose=require("mongoose");
var Schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

//currency类型 https://www.npmjs.com/package/mongoose-currency
//输出可以控制精度，如按两位小数输出 *.price.toFixed(2)	
var Currency=mongoose.Types.Currency;

//设置数据类型等信息，可以进行数据校验
var weapenSchema=new Schema({
	name:{
		type:String,
		required:true,
	},
	label:{
		type:String,
		required:true
	},
	price:{
		type:Currency,
		default:""
	},
	description:{
		type:String,
		default:""
	}
},{
	timestamps:true
});

var heroSchema= new Schema({
	name:{
		type:String,
		required:true,
		unique:true
	},
	nickname:{
		type:String,
		default:""
	},
	shengong:{
		type:String,
		default:""
	},
	description:{
		type:String,
		default:""
	},
	//在一个Schema中嵌入另一个Schema,
	weapen:weapenSchema
},{
	//设置时间戳
	timestamps:true
});
var Heros=mongoose.model('heros',heroSchema);
module.exports=Heros;