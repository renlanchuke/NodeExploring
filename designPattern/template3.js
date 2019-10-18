'use strict';

function strFormating(str, data) {
    let result = str.replace(/\{#(\w+)#\}/g, function (match, key) {
        return typeof (data[key]) === undefined ? '' : data[key];
    });
    return result;
}

var Nav = function (data) {
    this.item = '<a href="{#href#}" title="{#title#}">{#name#}</a>';
    this.html = '';
    for (let i = 0, len = data.length; i < len; i++) {
        this.html += strFormating(this.item, data[i]);
    }
    return this.html;

}

var NavNum = function (data){
    let tpl = '<b>{#num#}</b>'
    for(let i = data.length -1;i>=0;i--){
        data[i].name += data[i].name + strFormating(tpl, data[i]);
    }

    return Nav.call({},data);
}



// NavNum.prototype = new Nav();
let nav =NavNum([{
    href: 'http://www.baidu.com',
    title: '百度一下，你就知道',
    name: '百度',
    num: '10'
}, {
    href: 'http://www.taobao.com',
    title: '淘宝商城',
    name: '淘宝',
    num: '100'
},
{
    href: 'http://www.qq.com',
    title: '腾讯新闻',
    name: '腾讯',
    num: '100'
}])

console.log(nav);

// let item = '<a href="{#href#}" title="{#title#}">{#name#}</a>';

// item.replace(/\{#(\w+)#\}/g, function(match, key){
//     console.log(key)
//     console.log(match);
// })