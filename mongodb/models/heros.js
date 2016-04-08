/**
 * renlanchuke
 * 2016-4-8
 * mongoose创建model
 */

var mongoose=require("mongoose");
var Schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

var Currency=mongoose.Types.Currency;

var weapenSchema=new Schema({
	name:{
		type:String,
		required:true,
	},
	label:{
		type:String,
		required:true,
		default:""
	},
	price:{
		type:Currency,
		default:""
	},
	description:{
		type:String,
		default:""
	}
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
	weapen:[weapenSchema]
});
var Hero=mongoose.model('model',heroSchema);
module.exports=Hero;