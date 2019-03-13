import baseUrl from '../../baseUrl';
import Vue from 'vue'
var app = new Vue();

let PidBaseUrl = baseUrl;

/*物联网部分信息列表*/
let InternetOfThings ={

  //保存已打开的选项卡
  arrs:[],
  //保存当前在最前的选项卡
  cardNow:'',
  urlBox:{'公安视频':'/VIDEO_POLICE@shiping/pageInfo','烟雾传感器':'yanwu','剩余电流控制器':'shengyudianliu','气体传感器':'qiti','内涝监测设备':'neilaojiance','电气火灾监测设备':'dianqihuozaijiance','地质灾害监测设备':'dizhizaihaijiance','压力传感器':'yali'},
  tableBox :[],
  tableParentId : 'table_coupon',
  pageId:'page_coupon',
  titleId:'title_coupon',
  wholeId:'info_list',
  leftBar:'aqyh_j_left',
  rightBar:'aqyh_i',
  prefix:'type_',
  searchBtn :'search_now',
  resetBtn:'reset_now',
  searchBar:'aqyh_j_right_d',
  opageNum:1,
  opageSize:6,
  areaOptions:['全部','华富','梅林','沙头','香蜜湖','福保','福田','南园','华强北','桂园','莲花','南湖','园岭','笋岗'],
  areaVideoOptions:['全部','华富派出所','沙头派出所','皇岗口岸（卡口）','福强派出所','华强北（卡口）','景田派出所（卡口）','加油站','南园所（卡口）','会展中心','福田口岸','沙头所（卡口）','福保派出所','天安所（卡口）','华富派出所（卡口）','莲花派出所','八卦岭派出所','华强北派出所','福田派出所','福保所（卡口）','通心岭派出所','福田制高点','香蜜湖派出所','梅林派出所','八卦岭所（卡口）','天安派出所','南园派出所','莲花派出所（卡口）','警银亭','福田高铁站','香蜜湖（卡口）','福强所（卡口）','梅林所（卡口）','景田派出所','福田口岸（人脸）','通心岭（卡口）','福田所（卡口）','皇岗口岸派出所'],
  typeOptions:['漏电流监控','其他监控'],
  typeOptions2:['火灾','水涝','坍塌','地陷'],
  timeOptions:[],
  query:"",
  url:''
};
/*获取已被点击且具有数据返回值的卡*/
InternetOfThings.getClickedArray = function(node){


  InternetOfThings.getClickedData(node);

  /*点击选项卡切换*/
  /**/
  $('#' + this.titleId).find('li').on('click',function(){
    //每个点击可以调用
    let that = $(this);
    let clas = that.attr('class');
    //选项卡新的效果
    if(clas.indexOf('active') !==-1){
      return false;
    }else{
      that.siblings('li').map(function(){
        let oclass = $(this).attr('class');
        if(oclass.indexOf('active')!== -1){
          $(this).removeClass('active');
        }
      });
      let obj =InternetOfThings.getLabelArr(that.attr('title'),arr);
      that.addClass('active');
      InternetOfThings.getClickedData(obj.content);
    }
  });

  /*查询按钮查询*/
/*  let $this = this;
  $('#' + this.searchBtn).on('click',function () {
    /!*辨别参数的种类 + 获取当前搜索的内容范围*!/
    let nowObj = $('#'+ $this.titleId).find('li.active').attr('title');
    let nowdata =InternetOfThings.getLabelArr(nowObj,arr).content;
    let oquery,ourl;
    let oarea = $('.type_area .aqyh_j_right_d_right select option:selected').text();
    let otime = $('.type_time .aqyh_j_right_d_right select option:selected').text();
    let odeviceid = $('.type_device .aqyh_j_right_d_right select option:selected').text();
    let otype =$('.type_type .aqyh_j_right_d_right select option:selected').text();

    let wholeClass = $('#' + $this.wholeId).attr('class');
    if(wholeClass.indexOf($this.prefix  + '0')!==-1){
      if(nowdata.pid.indexOf('xiaofanglei_yinhuansanse') !== -1){
        ourl = PidBaseUrl+'/t_xiaofang_buwei'+'/pageInfo';
      }else{
        ourl = nowdata.url + '/pageInfo';
      }

      oquery = {
        "label": nowdata.label,
        "pageNum": 1,
        "pageSize": $this.pageSize,
        "area": oarea,
        "time": "",
        "deviceId": "",
        "type": ""
      }
    }else if(wholeClass.indexOf($this.prefix  + '1')!==-1){
      ourl = '/iot_device@'+$this.urlBox[nowdata.label]+'/oracle/pageInfo';
      oquery = {
        "label": nowdata.label,
        "pageNum": 1,
        "pageSize": $this.pageSize,
        "area": oarea,
        "time": otime,
        "deviceId": odeviceid,
        "type": ""
      }
    }else if(wholeClass.indexOf($this.prefix  + '2')!==-1){
      ourl = '/iot_device@'+$this.urlBox[nowdata.label]+'/oracle/pageInfo';
      oquery = {
        "label": nowdata.label,
        "pageNum": 1,
        "pageSize": $this.pageSize,
        "area": oarea,
        "time": otime,
        "deviceId": odeviceid,
        "type": otype
      }
    }else{
      ourl = $this.urlBox[nowdata.label];
      oquery = {
        "label": nowdata.label,
        "pageNum": 1,
        "pageSize": $this.pageSize,
        "area": oarea,
        "time": '',
        "deviceId": odeviceid,
        "type": ''
      }
    }

    /!*将结果刷新到页面*!/
    InternetOfThings.oajax(oquery,ourl);
  });*/


};

InternetOfThings.lightUpCoupon=function(num){
  $('#' + this.titleId).find('li:nth-child(num)').addClass('active');
  return true;
}
/*获得被点击的tab在arr中的数据*/
InternetOfThings.getLabelArr = function(name,arr){
  for(let i=0;i<arr.length;i++){
    if(arr[i].label === name ){
      return {content :arr[i], num:i };
    }
  }
}
/*生成选项卡title*/
InternetOfThings.getTabLines=function(arr){
  let html='';
  for(let i =0;i<arr.length;i++){
    let abc = i===0? 'active':'';
    html += '<li class="aqyh_j_right_e_b ' + abc +'" title="' + arr[i].label+'"><span>'+ arr[i].label+'</span></li>'
  }
  $('#' + this.titleId).html(html);
};

/* 操作 infoList的class  清空 state.infoList.typeClass*/
InternetOfThings.clearClass =function(prefix,id){
 /* let classname = $('#'+id).attr('class');
  if(classname.indexOf(prefix) !== -1){
    $('#'+id).removeClass();
    $('#'+id).addClass('aqyh_j');
  }*/

}
InternetOfThings.getClickedData = function(obj,area,pages){
  this.pageNum = pages? pages.pageNum : this.opageNum;
  this.pageSize = pages? pages.pageSize : this.opageSize;
  if(obj !== ''){
    let pid = obj.id, oquery,ourl;
    let odeviceid,otime,otype,oarea;

    let res ={}; // typeClass ourl
    res.ourl ='';
    res.typeClass='';
    if(pid.indexOf('wulianwang') === -1){  /*不是物联网的*/
      if(pid.indexOf('keyinformation_realtimevideo') !== -1){  //视频部分
        res.ourl = obj.url + '/pageInfo';
        res.typeClass ='type_3';
        res.areaVideoOptions = this.areaVideoOptions;
        res.oquery={
          label: obj.label,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          area:area
        }

      }else if(pid.indexOf('urbanAssessment') !== -1){     //城区风险评估部分
        res.typeClass = 'type_4';
        res.ourl = obj.url + '/pageInfo';
        res.typeOptions = this.typeOptions2;
        res.oquery={
          label: obj.label,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          type:'',
          area:area
        }

      }else{  //不是物联网部分 也不是视频部分
        res.ourl = obj.url + '/pageInfo';

        res.typeClass = 'type_0';
        res.areaOptions = this.areaOptions;
        /*oarea = $('.type_area .aqyh_j_right_d_right select option:selected').text();*/
        res.oquery = {
          "label": obj.label,
          "pageNum": this.pageNum,
          "pageSize": this.pageSize,
          "area": area,
          "time": "",
          "deviceId": "",
          "type": ""
        }
      }
    }else if(pid.indexOf('wulianwang_yalichuanganqi') !== -1){  /*压力传感器的*/
      res.ourl = PidBaseUrl + '/iot_device@'+this.urlBox[obj.label]+'/oracle/pageInfo';
      res.typeClass ='type_2';
      res.timeOptions = this.timeOptions;
      res.typeOptions = this.typeOptions;
      res.areaOptions = this.areaOptions;
      res.oquery = {
        "label": obj.label,
        "pageNum": this.pageNum,
        "pageSize": this.pageSize,
        "area": area,
        "time": '',
        "deviceId": '',
        "type": ''
      }
      /*otime = $('.type_time .aqyh_j_right_d_right select option:selected').text();
      odeviceid = $('.type_device .aqyh_j_right_d_right select option:selected').text();
      otype =$('.type_type .aqyh_j_right_d_right select option:selected').text();
      oarea = $('.type_area .aqyh_j_right_d_right select option:selected').text();
      oquery = {
        "label": obj.label,
        "pageNum": 1,
        "pageSize": this.pageSize,
        "area": oarea,
        "time": otime,
        "deviceId": odeviceid,
        "type": otype
      }*/

    }else{  /*物联网不是压力传感器的*/
 /*     res.ourl = PidBaseUrl + '/iot_device@'+this.urlBox[obj.label]+'/pageInfo';*/
      res.ourl = obj.url + '/pageInfo';
      res.typeClass ='type_1';
      res.timeOptions = this.timeOptions;
      res.areaOptions = this.areaOptions;
      res.oquery = {
        "label": obj.label,
        "pageNum": this.pageNum,
        "pageSize": this.pageSize,
        "area": area,
        "time": '',
        "deviceId": '',
        "type": ""
      }
      /*otime = $('.type_time .aqyh_j_right_d_right select option:selected').text();
      odeviceid = $('.type_device .aqyh_j_right_d_right select option:selected').text();
      oarea = $('.type_area .aqyh_j_right_d_right select option:selected').text();
      oquery = {
        "label": obj.label,
        "pageNum": 1,
        "pageSize": this.pageSize,
        "area": oarea,
        "time": otime,
        "deviceId": odeviceid,
        "type": ""
      }*/
    }
    return res;
    //InternetOfThings.oajax(oquery,ourl);
  }else{     /*标签全部关闭*/
    InternetOfThings.failFun();
  }
};
/*失败填充*/
InternetOfThings.failFun=function(){
  /*let content=[
    {'设备编号':'','设备名称':'','设备类型':''}
  ];
  let class_col = 'aqyh_j_right_b col_' + 4;
  this.arrs.length =0;
  this.tableBox.length= 0;
  let attributes = InternetOfThings.getAttributes(content);
  let html =InternetOfThings.combinate(attributes,content);
  $('#' + this.tableParentId).html(html);
  $('#' + this.tableParentId).removeClass().addClass(class_col);*/
}

/*获取数据*/
InternetOfThings.oajax = function(query,url){
  let $this = this;//保存当前的this
  $this.url = url;
  this.query = query;
  $.ajax({
    type: 'get',
    url: $this.url,
    data: query,
    dataType: 'json',
    cache: false,
    success: function (data) {
      //根据收获到的数据进行不同的处理
      /*得到的数据*/
      InternetOfThings.myCallBack(data);


      //分页
      let totalPage = data.pages || 1;
      let totalRecords = data.total || 0;
      let pageNo = data.pageNum || 1;
      //分页
      //有些参数是可选的，比如lang，若不传有默认值
      $("#totalpages").val(totalPage); //绑定获取的总页数
      $("#totalRecords").val(totalRecords);//绑定获取的总条数
      document.querySelector('#kkpager').innerHTML = ' ';
      kkpager.generPageHtml({
        pagerId:'kkpager',
        pno: pageNo,
        //总页码
        total: totalPage,
        //总数据条数
        totalRecords: totalRecords,
        isShowPrePageBtn	: false, //是否显示上一页按钮
        isShowNextPageBtn	: false, //是否显示下一页按钮
        mode: 'click',
        click: function (n) {
          $this.query.pageNum = n;
          $.ajax({
            type: 'get',
            url: $this.url,
            data: $this.query,
            dataType: 'json',
            cache: false,
            success: function (response) {
              InternetOfThings.myCallBack(response,$this);
            },
            error: function (res) {
              console.log('数据加载失败，请检查网络是否通畅;具体原因如下：'+res);
              InternetOfThings.failFun();
            }
          });
          this.selectPage(n, $("#totalpages").val(), $("#totalRecords").val());
          return false;
        }
      },true);

    },
    error: function (res) {
      console.log('数据加载失败，请检查网络是否通畅');
      InternetOfThings.failFun();
    }
  });
}

InternetOfThings.myCallBack =function(data,$this){
  let content = data.list || [];
  let othis = $this || this;
  /*得到的属性值的数组*/
  let attributes = InternetOfThings.getAttributes(content);

  let class_col = 'aqyh_j_right_b col_' + (attributes.length + 1);

  let html =InternetOfThings.combinate(attributes,content);
  othis.arrs.push(this.query.label);
  othis.tableBox.push({'name': this.query.label, 'table': html });
/*  $('#' + this.tableParentId).html(html);
  $('#' + this.tableParentId).removeClass().addClass(class_col);*/

};

InternetOfThings.getAttributes =function(arr){
  let res=[];
  for(let i = 0;i<arr.length;i++){
    for(let key in arr[i]){
      if(res.indexOf(key) === -1){
        res.push(key);
      }
    }
  }
  return res;
};
InternetOfThings.combinate = function(arr, data){
  let html = '', othead ='<td>序号</td>' , otbody='';
  for(let i in arr){
    othead += '<td>'+ arr[i] +'</td>'
  }
  for(let j=0; j<data.length;j++){
    let item = '<td>' + j+'</td>';
    for(let key in data[j]){
      item +='<td>' + data[j][key] + '</td>';
    }
    otbody += '<tr>'+ item +'</tr>';
  }
  html +='<table>'
    +'<thead>' + othead +'</thead>'
    +'<tbody>' + otbody + '</tbody>'
    +'</table>';
  return html;
}

InternetOfThings.getTbody = function(arr ,head){
    let res=[],m=[],obj={};
    for(let i=0;i<arr.length;i++){
        obj = arr[i];
        m=[];
        for(let j=0;j<head.length;j++){
          m.push(obj[head[j]]);
        }
        res.push({
          data:m
        })
    }
    return res;
};

export {InternetOfThings}

export const toGetInfoBoxData = (ourl,query,status) => {   //落点弹窗  根据

let url = encodeURI(ourl +'?label=' + query.label+'&pageNum='+query.pageNum +'&pageSize=' +query.pageSize
  +'&area=' + query.area +'&time='+query.time +'&deviceId='+ query.deviceId + '&type=' +query.type);
  return app.$myAxios.myGet(url).then(function (response) {
    console.log(response);
    let data = response; /* list, pageSize, total 总条数, pages 总页数,pageNum */
    let res={};
    res.pages={};
    res.pages.pageNum= data.pageInfo.pageNum;
    res.pages.total = data.pageInfo.pages;
    res.pages.pageSize = data.pageInfo.pageSize;
    res.pages.pageNumTotal = data.pageInfo.total;

    res.list={};
    let content = data.pageInfo.list || [];
    res.list.thead=InternetOfThings.getAttributes(content);
    res.list.tbody=InternetOfThings.getTbody(content, res.list.thead);
    res.nodes = [].concat(data.id);

    res.clomnClass = 'col_' + res.list.thead.length;
    return res;
  });
};


export const toGetNodesInfo = (query) => {
  let ourl = encodeURI(query.url + '?id=' + query.id);

  return app.$myAxios.myGet(ourl);
}
