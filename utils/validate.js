/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 *
 * @param str 要去掉空格的文本
 * @param is_global 是否去掉全部空格，默认去掉首尾空格
 * @returns {string | void | *}
 * @constructor
 */
export function Trim(str,is_global)
{
  if(typeof str === 'number'){
    str += ''
  }
  var result;
  result = str.replace(/(^\s+)|(\s+$)/g,"");
  if(is_global)
  {
    result = result.replace(/\s/g,"");
  }
  return result;
}

/*
根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
    地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
    出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
    顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
    校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

出生日期计算方法。
    15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
    2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
下面是正则表达式:
 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
 身份证正则表达式    /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
 15位校验规则 6位地址编码+6位出生日期+3位顺序号
 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位

 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
                公式(1)中：
                i----表示号码字符从由至左包括校验码在内的位置序号；
                ai----表示第i位置上的号码字符值；
                Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
                i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
                Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

*/
//身份证号合法性验证
//支持15位和18位身份证号
//支持地址编码、出生日期、校验位验证
export function IdentityCodeValid(code) {
  var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
  var tip = "";
  var pass= true;

  if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
    tip = "身份证号格式错误";
    pass = false;
  }

  else if(!city[code.substr(0,2)]){
    tip = "地址编码错误";
    pass = false;
  }
  else{
    //18位身份证需要验证最后一位校验位
    if(code.length === 18){
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
      //校验位
      var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++)
      {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11]+'';
      if(last !== code[17]){
        tip = "校验位错误";
        pass =false;
      }
    }
  }
  return {pass,tip};
}

/**
 * 手机号校验
 * @param number
 * @returns {boolean}
 */
export function iphoneNumber(number) {
  let valid_rule = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;// 手机号码校验规则
  if ( ! valid_rule.test(number)) {
    return false;
  }else {
    return true
  }
}

/**
 *格式化时间
 * var time1 = new Date().format("yyyy-MM-dd hh:mm:ss");
 * var time2 = new Date().format("yyyy-MM-dd");
 */
Date.prototype.Format = function(fmt)
{
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
export function DateFormat(date,format) {
  if(date===undefined){
    return new Date().Format(format)
  }else {
    return new Date(date).Format(format)
  }

}

/**
 * 获取浏览器地址栏参数
 */
export function getParams(){
  let paramsObj = {}
  let params = decodeURIComponent(document.location.search)
  if(params.search('/?') === 0){
    params = params.split('?')
    if(params.length>1){
      params = params[1].split('&')
      for(let i = 0,j = params.length;i<j;i+=1){
        let temp = params[i].split('=')
        paramsObj[temp[0]] = temp.length>1?temp[1]:''
      }
    }
  }
  return paramsObj
}

/**
 * 随机数生成 传入先生成的最大、最小值
 */
export function randomFrom(lowerValue,upperValue) {
  return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue)
}

/**
 *
 * @param obj 原有对象
 * @param newObj 在原有对象基础上覆盖新的内容
 * @returns {*}
 */
export function recursionObject(obj,newObj) {

  if(newObj instanceof Object) {
    for (let i in newObj) {
      if (newObj[i] instanceof Object) {
        if(obj[i] === undefined){
          obj[i] = newObj[i]
        }
        obj[i] = recursionObject(obj[i],newObj[i])
      } else {
        obj[i] = newObj[i]
      }
    }
  }
  return obj
}

// export function recursionObject(obj,newObj) {
//
//   let tempObj
//   if(obj instanceof Object) {
//     tempObj = {}
//     for (let i in obj) {
//       if (obj[i] instanceof Object) {
//         tempObj[i] = recursionObject(obj[i])
//       } else {
//         tempObj[i] = obj[i]
//       }
//     }
//   }else if(obj instanceof Array){
//     tempObj = []
//     for(let i = 0,j = obj.length;i<j;i+=1){
//       tempObj.push(recursionObject(obj[i]))
//     }
//   }
//   return tempObj
// }

/**
 * 排序
 */

export function bubbleSort(arr) {
  var low = 0;
  var high= arr.length-1; //设置变量的初始值
  var tmp,j;
  // console.time('3.改进后冒泡排序耗时');
  while (low < high) {
    var pos1 = 0,pos2=0;
    for (let i= low; i< high; ++i) { //正向冒泡,找到最大者
      if (arr[i]> arr[i+1]) {
        tmp = arr[i]; arr[i]=arr[i+1];arr[i+1]=tmp;
        pos1 = i ;
      }
    }

    high = pos1;// 记录上次位置

    for (let j=high; j>low; --j) { //反向冒泡,找到最小者
      if (arr[j]<arr[j-1]) {
        tmp = arr[j]; arr[j]=arr[j-1];arr[j-1]=tmp;
        pos2 = j;
      }
    }

    low = pos2; //修改low值
  }
  // console.timeEnd('3.改进后冒泡排序耗时');
  return arr;
}
