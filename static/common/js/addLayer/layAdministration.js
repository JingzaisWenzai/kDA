import $ from 'jquery';
import axios from 'axios';
import {DX_aqyh} from "../../../js/DX_aqyh_1.js"

var monographicLayer = {};
monographicLayer.data = {};
monographicLayer.sliderValue = 2000;
monographicLayer.type = 0;
/*monographicLayer.historyHtml =  $('.n').html();
$('.n').hide();*/
/**
 * 0 基础附近资源
 * 1 消防附近资源
 */
monographicLayer.clickXFAction = 1;

monographicLayer.getData = function (className) {
   axios({
    url: '/data/mapconfig.xml',
    method: 'get', // 默认是 get
  }).then(function (response) {
    var xmldata = String2XML(response.data);
    $(xmldata).find("Map").each(function () {
      response.data = xmlToJson($(this).children());
    });
    monographicLayer.data = response.data;
    console.log(monographicLayer.data[13]);
     layerData();
     DX_aqyh.getDX(monographicLayer);
  });

};
function layerData() {



/*<!--所有图层对象-->*/
monographicLayer.layerArray = (function(){
  var tempArray = processingData(monographicLayer.data[2], 0, 'pid').concat(processingData(monographicLayer.data[3], processingData(monographicLayer.data[2], 0, 'pid').length, 'pid'));
  tempArray = tempArray.concat(processingData(monographicLayer.data[13], 0, 'pid'),tempArray.length,'pid');
  tempArray = tempArray.concat(processingData(monographicLayer.data[14], 0, 'pid'),tempArray.length,'pid');
  tempArray = tempArray.concat(processingData(monographicLayer.data[16], 0, 'pid'),tempArray.length,'pid');
  tempArray = tempArray.concat(processingData(monographicLayer.data[17], 0, 'pid'),tempArray.length,'pid');
  tempArray = tempArray.concat(processingData(monographicLayer.data[18], 0, 'pid'),tempArray.length,'pid');
  tempArray = tempArray.concat(processingData(monographicLayer.data[19], 0, 'pid'),tempArray.length,'pid');
  tempArray = tempArray.concat(processingData(monographicLayer.data[20], 0, 'pid'),tempArray.length,'pid');
  tempArray = tempArray.concat(processingData(monographicLayer.data[21], 0, 'pid'),tempArray.length,'pid');
  tempArray = tempArray.concat(processingData(monographicLayer.data[22], 0, 'pid'),tempArray.length,'pid');
  tempArray = tempArray.concat(processingData(monographicLayer.data[23], 0, 'pid'),tempArray.length,'pid');
  tempArray = tempArray.concat(processingData(monographicLayer.data[24], 0, 'pid'),tempArray.length,'pid');
  tempArray = tempArray.concat(processingData(monographicLayer.data[25], 0, 'pid'),tempArray.length,'pid');
  tempArray = tempArray.concat(processingData(monographicLayer.data[26], 0, 'pid'),tempArray.length,'pid');
  var temp = {};
  tempArray.map(function (value,index) {
    temp[value.name] = value;
  });
  return temp;
})();

/*<!--消防图层-->*/
monographicLayer.fire = processingData(monographicLayer.data[13], 0, 'pid');
/*<!--三防图层-->*/
monographicLayer.flood = processingData(monographicLayer.data[14], 0, 'pid');


  /**
   * 动态加载图层数据
   */
  monographicLayer.reloadHtml = function (num) {

    if(num === undefined){
      reloadHtml0();
      reloadHtml1();
      reloadHtml2();
    }else if(num === 0){
      reloadHtml0();
    }else if(num === 1){
      reloadHtml1();
    }

    function reloadHtml0 (){

     /* <!--规土委图层-->*/
      monographicLayer.gtwpoi = reFixLayerData(processingData(monographicLayer.data[2], 0, 'pid'));
      /*<!--重点信息图层-->*/
      monographicLayer.keyinformation = reFixLayerData(processingData(monographicLayer.data[3], 0, 'pid'));
      /**
       * 动态加载规土委常用图层
       */
      reloadLayerHtml($('.h_bottom_b:eq(0) dl'),monographicLayer.gtwpoi,'常用信息');
      /**
       * 动态加载重点信息图层
       */
      reloadLayerHtml($('.h_bottom_b:eq(1) dl'),monographicLayer.keyinformation,'重点信息');
    }
    function reloadHtml1 (){

     /* <!--民生服务图层-->*/
      monographicLayer.livelihoodservice = reFixLayerData(processingData(monographicLayer.data[4], 0, 'pid'));
     /* <!--商业消费图层-->*/
      monographicLayer.commercialconsumption = reFixLayerData(processingData(monographicLayer.data[5], 0, 'pid'));
   /*   <!--机构团体图层-->*/
      monographicLayer.institutionalgroups = reFixLayerData(processingData(monographicLayer.data[6], 0, 'pid'));
    /*  <!--公共安全图层-->*/
      monographicLayer.publicsecurity = reFixLayerData(processingData(monographicLayer.data[7], 0, 'pid'));
   /*   <!--城建住房图层-->*/
      monographicLayer.urbanconstructionhousing = reFixLayerData(processingData(monographicLayer.data[8], 0, 'pid'));
    /*  <!--文化休闲图层-->*/
      monographicLayer.stylisticleisure = reFixLayerData(processingData(monographicLayer.data[9], 0, 'pid'));
      /*<!--教育科技图层-->*/
      monographicLayer.educationalscienceandtechnology = reFixLayerData(processingData(monographicLayer.data[10], 0, 'pid'));
      /*<!--交通运输图层-->*/
      monographicLayer.transportation = reFixLayerData(processingData(monographicLayer.data[11], 0, 'pid'));
     /* <!--生态资源图层-->*/
      monographicLayer.ecologicalresources = reFixLayerData(processingData(monographicLayer.data[12], 0, 'pid'));




    /*  <!--福田-->
      <!--安监-->*/
      monographicLayer.safetysupervision = reFixLayerData(processingData(monographicLayer.data[16], 0, 'pid'));
    /*  <!--消防-->*/
      monographicLayer.xiaofanglei = reFixLayerData(processingData(monographicLayer.data[17], 0, 'pid'));
    /*  <!--三防-->*/
      monographicLayer.sanfanglei = reFixLayerData(processingData(monographicLayer.data[18], 0, 'pid'));
    /*  <!--物联网-->*/
      monographicLayer.wulianwang = reFixLayerData(processingData(monographicLayer.data[19], 0, 'pid'));
    /*  <!--预警中心-->*/
      monographicLayer.yujingzhongxin = reFixLayerData(processingData(monographicLayer.data[20], 0, 'pid'));
    /*  <!--运行展现-->*/
      monographicLayer.yunxingzhanxian = reFixLayerData(processingData(monographicLayer.data[21], 0, 'pid'));
    /*  <!--城市部件-->*/
      monographicLayer.chengshibujian = reFixLayerData(processingData(monographicLayer.data[22], 0, 'pid'));
    /*  <!--公共服务-->*/
      monographicLayer.gonggonganquan = reFixLayerData(processingData(monographicLayer.data[23], 0, 'pid'));
    /*  <!--民生服务-->*/
      monographicLayer.minshengfuwu = reFixLayerData(processingData(monographicLayer.data[24], 0, 'pid'));
      /*  <!--宏观经济-->*/
      monographicLayer.hongguanjingji = reFixLayerData(processingData(monographicLayer.data[25], 0, 'pid'));
      /*  <!--生态环境-->*/
      monographicLayer.shengtaihuanjing = reFixLayerData(processingData(monographicLayer.data[26], 0, 'pid'));
      /**
       * 动态加载民生服务图层
       */
      reloadLayerHtml($('.h_bottom_b:eq(2) dl'),monographicLayer.livelihoodservice,'民生服务');
      /**
       * 动态加载商业消费图层
       */
      reloadLayerHtml($('.h_bottom_b:eq(3) dl'),monographicLayer.commercialconsumption,'商业消费');
      /**
       * 动态加载机构团体图层
       */
      reloadLayerHtml($('.h_bottom_b:eq(4) dl'),monographicLayer.institutionalgroups,'机构团体');
      /**
       * 动态加载公共安全图层
       */
      reloadLayerHtml($('.h_bottom_b:eq(5) dl'),monographicLayer.publicsecurity,'公共安全');
      /**
       * 动态加载城建住房图层
       */
      reloadLayerHtml($('.h_bottom_b:eq(6) dl'),monographicLayer.urbanconstructionhousing,'城建住房');
      /**
       * 动态加载文化休闲图层
       */
      reloadLayerHtml($('.h_bottom_b:eq(7) dl'),monographicLayer.stylisticleisure,'文化休闲');
      /**
       * 动态加载教育科技图层
       */
      reloadLayerHtml($('.h_bottom_b:eq(8) dl'),monographicLayer.educationalscienceandtechnology,'教育科技');
      /**
       * 动态加载交通运输图层
       */
      reloadLayerHtml($('.h_bottom_b:eq(9) dl'),monographicLayer.transportation,'交通运输');
      /**
       * 动态加载生态资源图层
       */
      reloadLayerHtml($('.h_bottom_b:eq(10) dl'),monographicLayer.ecologicalresources,'生态资源');
    }

    function reloadHtml2() {
      /**
       * 动态加载消防专题图层
       */
      reloadLayerHtml($('.h_bottom_b:eq(11) dl'),monographicLayer.fire,'消防专题');
      /**
       * 动态加载三防专题图层
       */
      reloadLayerHtml($('.h_bottom_b:eq(12) dl'),monographicLayer.flood,'三防专题');
    }

    function reloadLayerHtml(element,data,name) {
      element.parent().prev().html(name);
      element.html('');
      data.map(function (value, index) {
        var html = '<dt index="' + value.index + '" class="' + value.pid + '">' +
          '<span><input name="" type="checkbox" value=""></span>' +
          '<span>' + value.name + '</span>' +
          '</dt>';
        element.append(html);

        changeFirstLabeAction();

        element.children().eq(index).children().last().click(function (event) {

          /**
           * 图层弹框一级点击功能
           */
          // console.log(value.index);

          if(value.data.length === 0){
            $('.h_bottom_d').hide();
            return;
          }
          // <li>&nbsp;</li>
          // <li><a href="####" title="综合医院">综合医院</a></li>
          $('.h_bottom_d ul').html('');
          value.data.map(function (value2, index2) {
            var html = '<li index="'+index2+'" check="'+monographicLayer.layerArray[value.name].data[value2.index].checked+'"><a href="####" title="'+value2.name+'">'+value2.name+'</a></li>';
            $('.h_bottom_d ul').append(html);
            if($('.h_bottom_d ul li:last').attr('check') === 'false'){
              $('.h_bottom_d ul li:last').children().css('backgroundColor','#f7f7f7');
              $('.h_bottom_d ul li:last').children().css('color','#666666');
            }else {
              $('.h_bottom_d ul li:last').children().css('backgroundColor','#196db4');
              $('.h_bottom_d ul li:last').children().css('color','#ffffff');
            }
            /**
             * 图层弹框二级点击功能
             */
            $('.h_bottom_d ul li:eq('+index2+')').click(function () {
              monographicLayer.clickXFAction = 1;
              // console.log(value.index);
              // console.log(value2.index);
              // monographicLayer.layerArray[value.name].data[value2.index]
              if($(this).attr('check') === 'false'){
                monographicLayer.layerArray[value.name].data[value2.index].checked = true;
                $(this).attr('check',true);
                $(this).children().css('backgroundColor','#196db4');
                $(this).children().css('color','#ffffff');
              }else {
                monographicLayer.layerArray[value.name].data[value2.index].checked = false;
                $(this).attr('check',false);
                $(this).children().css('backgroundColor','#f7f7f7');
                $(this).children().css('color','#666666');
              }

              changeFirstLabeAction();

              /**
               * 历史落图弹框
               */
              var obj = monographicLayer.layerArray[value.name];
              monographicLayer.historyPopAction(obj);

              /**
               * 加载图层 monographicLayer.layerArray[value.name].data[Number($(this).attr('index'))].pid
               */
              monographicLayer.loadMapLayer(monographicLayer.layerArray[value.name].data[Number($(this).attr('index'))].pid,monographicLayer.layerArray[value.name].data[value2.index].checked);

            });
          });


          for(var i = 0;i<3-value.data.length%4;i++){
            $('.h_bottom_d ul').append('<li>&nbsp;</li>');
          }
          $('.h_bottom_d ul').append('<li id="h_bottom_d_a"><a id="confirmBtn" href="####" title="确定">确定</a></li>');

          $('.h_bottom_d a#confirmBtn').click(function () {
            $('.h_bottom_d').hide();
          });

          $('.h_bottom_d').css('top',event.pageY-200);

          $('.h_bottom_d').show();
        });


        /**
         * 遍历二级是否有点击的，进行切换白、灰、蓝
         */
        function changeFirstLabeAction() {

          if(monographicLayer.layerArray[value.name] === undefined){
            return ;
          }

          var checked = -1;
          for(var i = 0;i<monographicLayer.layerArray[value.name].data.length;i+=1){
            if(monographicLayer.layerArray[value.name].data[i].checked === true){
              checked += 1;
            }
          }

          if(checked === -1){
            $('.slideTxtBox .'+value.pid).css('backgroundColor','#ffffff');
            $('.slideTxtBox .'+value.pid).css('color','#666666');
            for(var i = 0;i<$('.'+value.pid+' input').length;i+=1){
              $('.'+value.pid+' input')[i].checked = false;
            }
            monographicLayer.layerArray[value.name].checked = false;
            monographicLayer.layerArray[value.name].hasChecked = false;
          }else if(checked === monographicLayer.layerArray[value.name].data.length-1){
            $('.slideTxtBox .'+value.pid).css('backgroundColor','#196db4');
            $('.slideTxtBox .'+value.pid).css('color','#ffffff');
            for(var i = 0;i<$('.'+value.pid+' input').length;i+=1){
              $('.'+value.pid+' input')[i].checked = true;
            }
            monographicLayer.layerArray[value.name].checked = true;
            monographicLayer.layerArray[value.name].hasChecked = true;
          }else {
            $('.slideTxtBox .'+value.pid).css('backgroundColor','#cccccc');
            $('.slideTxtBox .'+value.pid).css('color','#666666');
            for(var i = 0;i<$('.'+value.pid+' input').length;i+=1){
              $('.'+value.pid+' input')[i].checked = false;
            }
            monographicLayer.layerArray[value.name].checked = false;
            monographicLayer.layerArray[value.name].hasChecked = true;
          }
        }

      });
    }

    $('.h_bottom_b input').change(function () {
      monographicLayer.clickXFAction = 1;
      // console.log(this);
      monographicLayer.layerArray[$(this).parent().next().html()].checked = this.checked;
      monographicLayer.layerArray[$(this).parent().next().html()].hasChecked = this.checked;

      if(this.checked === true){
        $(this).parent().parent().css('backgroundColor','#196db4');
        $(this).parent().parent().css('color','#ffffff');

        // $('.h_bottom_d ul li a').css('backgroundColor','#196db4');
        // $('.h_bottom_d ul li a').css('color','#ffffff');
        //
        // $('.h_bottom_d ul li a:last()').css('backgroundColor','#ffffff');
        // $('.h_bottom_d ul li a:last()').css('color','#196db4');
      }else {
        $(this).parent().parent().css('backgroundColor','#ffffff');
        $(this).parent().parent().css('color','#666666');

        // $('.h_bottom_d ul li a').css('backgroundColor','#ffffff');
        // $('.h_bottom_d ul li a').css('color','#666666');
        //
        // $('.h_bottom_d ul li a:last()').css('backgroundColor','#ffffff');
        // $('.h_bottom_d ul li a:last()').css('color','#196db4');
      }

      for(var i = 0;i<monographicLayer.layerArray[$(this).parent().next().html()].data.length;i+=1){
        monographicLayer.layerArray[$(this).parent().next().html()].data[i].checked = this.checked;
        $('.h_bottom_d ul li').attr('check',this.checked);
      }

      if($('.h_bottom_d').css('display') !== 'none'){
        $(this).parent().next().click();
      }



      /**
       * 图层历史记录
       */
      var obj = monographicLayer.layerArray[$(this).parent().next().html()];
      monographicLayer.historyPopAction(obj);
      /**
       * 加载图层 $(this).parent().parent().attr('class')
       */
      if(monographicLayer.layerArray[$(this).parent().next().html()].data.length>0){
        monographicLayer.loadMapLayer([monographicLayer.layerArray[$(this).parent().next().html()].pid],this.checked);
      }else {
        monographicLayer.loadMapLayer(monographicLayer.layerArray[$(this).parent().next().html()].pid,this.checked);
      }


    });

  };


  monographicLayer.getPointJsonLayerDataTemp = function(data,params){
    console.log(data);

    var obj = params;
    var node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(params.pid2);
    $('.'+obj.pid+' .n_bottom_a_middle:last span').eq(1).html(data.total);
    $('.'+obj.pid+' .n_bottom_a_middle:last span').eq(0).html(node.label);

    $('.'+obj.pid+' .n_bottom_b_c:last table tbody').html('');
    if(data.list === undefined){
      return;
    }
    for(var i = 0;i<data.list.length;i+=1){
      var html = '<tr>\n' +
        '   <td>'+(i+1+(data.pageNum-1)*10)+'</td>\n' +
        '   <td title="'+data.list[i].name+'">'+data.list[i].name+'</td>\n' +
        '   <td>'+data.list[i].address+'</td>\n' +
        '</tr>';
      $('.'+obj.pid+' .n_bottom_b_c:last table tbody').append(html);
    }

    kkpager.generPageHtml({
      // pagerid:tempNode,
      pno : '${p.pageNo}',
      mode : 'click', //设置为click模式
      //总页码
      total :Math.round(data.total/10),
      //总数据条数
      totalRecords : data.total,
      isShowPrePageBtn:false,// 是否显示上一页按钮 布尔型 默认值 true
      isGoPage:false,// 是否显示页码跳转输入框 布尔型 默认值 true
      isShowNextPageBtn:false,// 是否显示下一页按钮 布尔型 默认值 true
      isWrapedPageBtns:true,// 是否用span包裹住页码按钮 布尔型 默认值 true
      isShowFirstPageBtn:false,// 是否显示首页按钮 布尔型 默认值 true
      isShowLastPageBtn:true,//  是否显示尾页按钮 布尔型 默认值 true
      //点击页码、页码输入框跳转、以及首页、下一页等按钮都会调用click
      //适用于不刷新页面，比如ajax
      click : function(n){
        //这里可以做自已的处理
        //...
        //处理完后可以手动条用selectPage进行页码选中切换
        this.selectPage(n);
        // console.log(monographicLayer.layerArray[$(event.path[3]).attr('title')].data[0].pid);
        // return ;
        getData.publish('getPointJsonLayerData','GET',node.url+'/pageInfo'+'?pageNum='+n+'&pageSize='+10);
        return false;
      }

    });
  };

  monographicLayer.getPointJsonLayerData = function(data,params){
    var tempParams = {};
    if(params.data.length>0){
      tempParams = params.data[params.tempIndex];
    }else {
      tempParams = params;
    }

    $('.'+params.pid+' .n_bottom_a_middle').children().eq(1).html(data.total);
    $('.' + params.pid + ' .n_bottom_b_c table tbody').html('');
    for (var i = 0; i < data.list.length; i += 1) {
      var html = '<tr>\n' +
        '   <td>' + (i + 1 + (data.pageNum - 1) * 10) + '</td>\n' +
        '   <td title="' + data.list[i].name + '">' + data.list[i].name + '</td>\n' +
        '   <td>' + data.list[i].address + '</td>\n' +
        '</tr>';
      $('.' + params.pid + ' .n_bottom_b_c table tbody').append(html);
    }

    $('.' + params.pid + ' .n_bottom_b_d').children().attr('id',params.data[params.tempIndex].pid);
    var node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(tempParams.pid);
    kkpager.generPageHtml({
      pagerid:tempParams.pid,
      pno: data.pageNum,
      mode: 'click', //设置为click模式
      //总页码
      total:data.pages,
      //总数据条数
      totalRecords: data.total,
      isShowPrePageBtn: false,// 是否显示上一页按钮 布尔型 默认值 true
      isGoPage: false,// 是否显示页码跳转输入框 布尔型 默认值 true
      isShowNextPageBtn: false,// 是否显示下一页按钮 布尔型 默认值 true
      isWrapedPageBtns: true,// 是否用span包裹住页码按钮 布尔型 默认值 true
      isShowFirstPageBtn: false,// 是否显示首页按钮 布尔型 默认值 true
      isShowLastPageBtn: true,//  是否显示尾页按钮 布尔型 默认值 true
      //点击页码、页码输入框跳转、以及首页、下一页等按钮都会调用click
      //适用于不刷新页面，比如ajax
      click: function (n) {
        //这里可以做自已的处理
        //...
        //处理完后可以手动条用selectPage进行页码选中切换
        this.selectPage(n);
        // console.log(monographicLayer.layerArray[$(event.path[3]).attr('title')].data[0].pid);
        // return ;
        getData.publish('getPointJsonLayerData', 'GET', node.url + '/pageInfo' + '?pageNum=' + n + '&pageSize=' + 4);
        return false;
      }
    });

  };

  monographicLayer.historyPopAction = function(obj){
    console.log(obj);
    //判断图层父类存不存在，不存在添加
    if($('.history_layers .'+obj.pid)[0] === undefined){
      var tempHtml = '<div class="n '+obj.pid+'">'+monographicLayer.historyHtml+'</div>';
      $('.history_layers').append(tempHtml);

      //标题
      $('.'+obj.pid+' .n_bottom_a_left span:last').html(obj.name);
      //右上角关闭按钮
      $('.'+obj.pid+' .n_top_right').click(function () {
        $('.h_bottom_b .'+obj.pid+' input').first().click();
        $('.history_layers .'+obj.pid).hide();
      });
      //全选
      $('.'+obj.pid+' .n_bottom_a_left input')[0].checked = obj.checked;
      $('.'+obj.pid+' .n_bottom_a_left input').click(function () {
        $('.h_bottom_b .'+obj.pid+' input').first().click();
      });
      //收缩操作
      $('.'+obj.pid+' .n_bottom_a_right_b').click(function () {
        var tempImag = $(this).children().children().attr('src');
        if(tempImag.search('hover') === -1){
          $('.history_layers .'+obj.pid+' .n_bottom_b').show();
          $(this).children().children().attr('src',tempImag.replace('.','hover.'));
        }else {
          $(this).children().children().attr('src',tempImag.replace('hover',''));
          $('.history_layers .'+obj.pid+' .n_bottom_b').hide();
        }

        $(this).parent().parent().parent().parent().parent().siblings().map(function (index2, value2) {
          var className = $(value2).attr('class');
          if(className.split(' ').length>1){
            if($('.'+className.split(' ')[1]+' .n_bottom_a_right_b').children().children().attr('src').search('hover') !== -1){
              $('.history_layers .'+className.split(' ')[1]+' .n_bottom_b').hide();
              var temp = $('.'+className.split(' ')[1]+' .n_bottom_a_right_b').children().children().attr('src');
              $('.'+className.split(' ')[1]+' .n_bottom_a_right_b').children().children().attr('src',temp.replace('hover',''));
            }
          }
        });

      });

      $('.'+obj.pid+' .n_bottom_a_right_b').click();
    }else {
      if(obj.hasChecked === false){
        $('.history_layers .'+obj.pid).hide();
        return;
      }else {
        $('.'+obj.pid+' .n_bottom_a_left input')[0].checked = obj.checked;
        $('.history_layers .'+obj.pid).show();
      }

      //默认正在操作的哪项展开
      // if($('.'+obj.pid+' .n_bottom_a_right_b').children().children().attr('src').search('hover') !== -1){
      //     $('.'+obj.pid+' .n_bottom_a_right_b').click();
      // }
    }

    // $('.history_layers .n_bottom_a_right_b').map(function (index, value) {
    //     if($(value).children().children().attr('src').search('hover') === -1){
    //         $(value).click();
    //     }
    // });

    /**
     * 初始化二级标签列表
     */
    var secondHtmlTemp = $('.'+obj.pid+' .n_bottom_b_a ul');
    secondHtmlTemp.html('');
    for(var i = 0,j = obj.data.length;i<j;i+=1){
      if(obj.data[i].checked === true){
        secondHtmlTemp.append('<li  num="'+i+'"><span>'+obj.data[i].name+'</span><span><a href="####" title="关闭"><img src="img/yxjc_45.png" style="border-radius: 15px;margin-left: 3px;"></a></span></li>');
        $('.history_layers .'+obj.pid+' .n_bottom_b_a ul li:last span:first').click(function () {
          if(document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(obj.data[Number($(this).parent().attr('num'))].pid).url !== '--'){
            $(this).parent().css('backgroundColor','#196db4');
            $(this).parent().css('color','#ffffff');

            $(this).parent().siblings().css('backgroundColor','#ffffff');
            $(this).parent().siblings().css('color','#666666');

            $('.history_layers .'+obj.pid+' .n_bottom_a_middle').children().eq(0).html(obj.data[Number($(this).parent().attr('num'))].name+'共');

            getTableData(Number($(this).parent().attr('num')));
          }else {
            alert(obj.data[Number($(this).parent().attr('num'))].name+'暂无数据!');
          }
        });
        //删除
        $('.history_layers .'+obj.pid+' .n_bottom_b_a ul li:last span:last').click(function () {
          console.log(obj.data[Number($(this).parent().attr('num'))]);
          monographicLayer.layerArray[obj.name].data[Number($(this).parent().attr('num'))].checked = false;
          monographicLayer.loadMapLayer(monographicLayer.layerArray[obj.name].data[Number($(this).parent().attr('num'))].pid,false);
          $(this).parent().hide();
          if($(this).css('color') === "rgb(255, 255, 255)"){

            if($(this).parent().siblings().length === 0){
              $('.history_layers .'+obj.pid).hide();
            }

            $(this).parent().siblings().map(function (index3, value3) {
              if($(value3).css('display') !== 'none'){
                $(value3).children().first().click();
              }
            })
          }
        });
      }
    }

    if(obj.data){
      if(obj.data.length === 0){
        $('.history_layers .'+obj.pid+' .n_bottom_a_middle').children().eq(0).html(obj.name+'共');
        getTableData();
      }
    }

    /**
     * 初始化图层总数标签
     */
    var tempIndex = 0;
    $('.'+obj.pid+' .n_bottom_a_middle').children().eq(1).html('---');
    for(var i = 0,j = $('.'+obj.pid+' .n_bottom_b_a ul li').length;i<j;i+=1){
      if(obj.data[Number($('.'+obj.pid+' .n_bottom_b_a ul li').eq(i).attr('num'))].checked === true && document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(obj.data[Number($('.'+obj.pid+' .n_bottom_b_a ul li').eq(i).attr('num'))].pid).url !== '--'){
        tempIndex = i;
        $('.'+obj.pid+' .n_bottom_b_a ul li').eq(i).children().first().click();
        break;
      }
    }
    // for(var i = 0,j = obj.data.length;i<j;i+=1){
    //     if(obj.data[i].checked === true && document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(obj.data[i].pid).url !== '--'){
    //         tempIndex = i;
    //         $('.'+obj.pid+' .n_bottom_b_a ul li span').eq(i).click();
    //         break;
    //     }
    // }

    function getTableData(tempIndex) {
      var tempObj = {};
      if(obj.data.length > 0){
        obj.tempIndex = tempIndex;
        tempObj = obj.data[tempIndex];
      }else {
        tempObj = obj;
      }

      var node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(tempObj.pid);
      if(node.type === 'PointJsonLayer'){
        //后台数据
        getData.subscribe('getPointJsonLayerData',monographicLayer.getPointJsonLayerData,obj);
        getData.publish('getPointJsonLayerData','GET',node.url+'/pageInfo'+'?pageNum='+1+'&pageSize='+4);
      }else {
        //规土委数据
        monographicLayer.getFeatureLayerData(obj,1);
      }
    }
  };

  monographicLayer.getFeatureLayerData = function(obj,pagerNum){

    var tempObj = {};
    if(obj.data.length>0){
      tempObj = obj.data[obj.tempIndex];
    }else {
      tempObj = obj;
    }

    var node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(tempObj.pid);

    document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureAttributeQuery.queryFeatureLayerByPage(node, 4, pagerNum, function (data) {
      $('.'+obj.pid+' .n_bottom_b_c table tbody').html('');
      for(var i = 0;i<data.length;i+=1){
        var html = '';
        if(monographicLayer.type === 0){
          html = '<tr>\n' +
            '   <td>'+data[i].attributes.objectid+'</td>\n' +
            '   <td>'+data[i].attributes.name+'</td>\n' +
            '   <td>'+data[i].attributes.address+'</td>\n' +
            '</tr>';
        }else {
          html = '<tr>\n' +
            '   <td>'+data[i].attributes.FID+'</td>\n' +
            '   <td>'+data[i].attributes["简称"]+'</td>\n' +
            '   <td>'+data[i].attributes["地址"]+'</td>\n' +
            '</tr>';
        }
        $('.'+obj.pid+' .n_bottom_b_c:last table tbody').append(html);
      }
    });
    //图层总数
    $('.' + obj.pid + ' .n_bottom_b_d').children().attr('id',tempObj.pid);
    document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureAttributeQuery.queryFeatureLayerCount(node,function (results) {
      $('.'+obj.pid+' .n_bottom_a_middle span').eq(1).html(results);
      kkpager.generPageHtml({
        pagerid:tempObj.pid,
        pno: pagerNum,
        mode: 'click', //设置为click模式
        //总页码
        total:Math.round(results/4),
        //总数据条数
        totalRecords: results,
        isShowPrePageBtn: false,// 是否显示上一页按钮 布尔型 默认值 true
        isGoPage: false,// 是否显示页码跳转输入框 布尔型 默认值 true
        isShowNextPageBtn: false,// 是否显示下一页按钮 布尔型 默认值 true
        isWrapedPageBtns: true,// 是否用span包裹住页码按钮 布尔型 默认值 true
        isShowFirstPageBtn: false,// 是否显示首页按钮 布尔型 默认值 true
        isShowLastPageBtn: true,//  是否显示尾页按钮 布尔型 默认值 true
        //点击页码、页码输入框跳转、以及首页、下一页等按钮都会调用click
        //适用于不刷新页面，比如ajax
        click: function (n) {
          //这里可以做自已的处理
          //...
          //处理完后可以手动条用selectPage进行页码选中切换
          this.selectPage(n);

          monographicLayer.getFeatureLayerData(obj,n);

          return false;
        }
      });

    });
  };

  monographicLayer.historyPopActionTemp = function(obj){
    if(obj.hasChecked === false){
      $('.n_bottom')[0].removeChild($('.n_bottom .'+obj.pid)[0]);

      for(var i = 0,j = $('.n .n_bottom').children().length;i<j;i+=1){
        if($('.n .n_bottom').children().eq(i).attr('class') !== undefined){
          return;
        }
      }

      $('.n').hide();

      return;
    }

    $('.n').show();
    // console.log(monographicLayer.layerArray[$(this).parent().next().html()]);

    if($('.n_bottom .'+obj.pid)[0] === undefined){
      $('.n_bottom').children().last().show();
      $('.n_bottom').children().last().addClass(obj.pid);
    }
    $('.'+obj.pid+' .n_bottom_a_left span:last').html(obj.name);
    $('.n_bottom_a').removeClass('on');
    $('.'+obj.pid+' .n_bottom_a').addClass('on');
    $('.'+obj.pid+' .n_bottom_b_a:last ul').html('');
    if(obj.data.length > 0){
      for(var i = 0;i<obj.data.length;i+=1){
        var tempNodeUrl = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(obj.data[i].pid).url;
        if(obj.data[i].checked === true){
          var html = '<li>\n' +
            '                                <span id="'+obj.data[i].pid+'">'+obj.data[i].name+'</span>\n' +
            '                                ' + //<span><a href="####" title="关闭"><img src="img/yxjc_45.png"/></a></span>
            '                            </li>';
          $('.'+obj.pid+' .n_bottom_b_a:last ul').append(html);

          if(tempNodeUrl === '--'){
            break;
          }

          $('.'+obj.pid+' .n_bottom_b_a:last ul li').last().children().first().click(function () {
            reloadTableData(obj,$(this).attr('id'));
            $(this).parent().css('backgroundColor','#196db4');
            $(this).parent().css('color','#ffffff');

            $(this).parent().siblings().css('backgroundColor','#ffffff');
            $(this).parent().siblings().css('color','#666666');
          });
        }
      }
    }
    // $('.'+obj.pid+' .n_bottom_b_d:last div').attr('id',obj.pid);
    $('.'+obj.pid+' .n_bottom_b_d:last div').attr('title',obj.name);

    reloadTableData(obj,$(this).attr('id'));
    function reloadTableData(obj,pid){
      if(pid === undefined){
        if(obj.data[0] !== undefined){
          for(var i = 0;i<obj.data.length;i+=1){
            if(obj.data[i].checked === true){
              pid = obj.data[i].pid;
              break;
            }
          }
        }else {
          pid = obj.pid;
        }
      }
      //分页查询
      var node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(pid);
      obj.pid2 = pid;
      if(node.type === 'PointJsonLayer'){
        getData.subscribe('getPointJsonLayerData',monographicLayer.getPointJsonLayerData,obj);
        getData.publish('getPointJsonLayerData','GET',node.url+'/pageInfo'+'?pageNum='+1+'&pageSize='+10);
      }else {
        document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureAttributeQuery.queryFeatureLayerByPage(node, 10, 1, function (data) {
          $('.'+obj.pid+' .n_bottom_b_c:last table tbody').html('');
          for(var i = 0;i<data.length;i+=1){
            var html = '';
            if(monographicLayer.type === 0){
              html = '<tr>\n' +
                '   <td>'+data[i].attributes.objectid+'</td>\n' +
                '   <td>'+data[i].attributes.name+'</td>\n' +
                '   <td>'+data[i].attributes.address+'</td>\n' +
                '</tr>';
            }else {
              html = '<tr>\n' +
                '   <td>'+data[i].attributes.FID+'</td>\n' +
                '   <td>'+data[i].attributes["简称"]+'</td>\n' +
                '   <td>'+data[i].attributes["地址"]+'</td>\n' +
                '</tr>';
            }
            $('.'+obj.pid+' .n_bottom_b_c:last table tbody').append(html);
          }
        });
        //图层总数
        document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureAttributeQuery.queryFeatureLayerCount(node,function (results) {
          $('.'+obj.pid+' .n_bottom_a_middle:last span').eq(1).html(results);
          $('.'+obj.pid+' .n_bottom_a_middle:last span').eq(0).html(node.label);
        });
      }
    }


    $(".n_bottom").slide({
      titCell: ".n_bottom_a", //鼠标触发对象
      targetCell: ".n_bottom_b", //与titCell一一对应，第n个titCell控制第n个targetCell的显示隐藏
      effect: "slideDown", //targetCell下拉效果
      trigger:'click',//触发方式
      delayTime: 300, //效果时间
      triggerTime: 150, //鼠标延迟触发时间（默认150）
      defaultPlay: true,//默认是否执行效果（默认true）
      returnDefault: false, //鼠标从.sideMen移走后返回默认状态（默认false）
      startFun:function( i, c, slider, titCell, mainCell, targetCell, prevCell, nextCell ){
        // console.log(i);
        $('.kkpager').map(function (index,value) {
          if(i !== index){
            $(value).attr('id','kkpager01');
          }else {
            $(value).attr('id','kkpager');
          }
          $(".n_bottom").children().eq(i).children().first().children().last().children().children().attr('src','img/yxjc_46.png');
          $(".n_bottom").children().eq(i).siblings().map(function (index, map) {
            // console.log(this);
            $(this).children().first().children().last().children().children().attr('src','img/yxjc_47.png');
          })
        });
        //总条数
        var pid;
        var tempNode = monographicLayer.layerArray[$('.n_bottom .n_bottom_a_left').eq(i).children().last().html()];
        if(tempNode.data.length>0){
          for(var i = 0;i<tempNode.data.length;i+=1){
            var tempNodeUrl = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(tempNode.data[i].pid).url;
            if(tempNode.data[i].checked === true && tempNodeUrl !== '--'){
              pid = tempNode.data[i].pid;
              break;
            }
          }

          if(pid === undefined){
            pid = tempNode.data[0].pid;
          }

        }else {
          pid = monographicLayer.layerArray[$('.n_bottom .n_bottom_a_left').eq(i).children().last().html()].pid;
        }

        var node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(pid);
        if(node.type === 'PointJsonLayer'){
          obj.pid2 = pid;
          if(node.url === '--'){
            $('.'+obj.pid+' .n_bottom_b_a:eq(1)').html('');
            $('.'+obj.pid+' .n_bottom_b_a:last ul').html('');
          }else {
            getData.subscribe('getPointJsonLayerData',monographicLayer.getPointJsonLayerData,obj);
            getData.publish('getPointJsonLayerData','GET',node.url+'/pageInfo'+'?pageNum='+1+'&pageSize='+10);
          }
        }else {
          document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureAttributeQuery.queryFeatureLayerCount(node,function (results) {
            // console.log(results);

            //生成分页控件
            // var kkpager = monographicLayer.layerArray[$(this).parent().next().html()].pid;
            // yypager.pagerid = $('.n_bottom_b_d:last div').attr('id');
            // var tempNode = node.pid;
            // monographicLayer[node.pid] = kkpager;
            kkpager.generPageHtml({
              // pagerid:tempNode,
              pno : '${p.pageNo}',
              mode : 'click', //设置为click模式
              //总页码
              total :Math.round(results/10),
              //总数据条数
              totalRecords : results,
              isShowPrePageBtn:false,// 是否显示上一页按钮 布尔型 默认值 true
              isGoPage:false,// 是否显示页码跳转输入框 布尔型 默认值 true
              isShowNextPageBtn:false,// 是否显示下一页按钮 布尔型 默认值 true
              isWrapedPageBtns:true,// 是否用span包裹住页码按钮 布尔型 默认值 true
              isShowFirstPageBtn:false,// 是否显示首页按钮 布尔型 默认值 true
              isShowLastPageBtn:true,//  是否显示尾页按钮 布尔型 默认值 true
              //点击页码、页码输入框跳转、以及首页、下一页等按钮都会调用click
              //适用于不刷新页面，比如ajax
              click : function(n){
                //这里可以做自已的处理
                //...
                //处理完后可以手动条用selectPage进行页码选中切换
                this.selectPage(n);
                // console.log(monographicLayer.layerArray[$(event.path[3]).attr('title')].data[0].pid);
                // return ;
                var tempNode = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(monographicLayer.layerArray[$(event.path[3]).attr('title')].data[0].pid);
                document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureAttributeQuery.queryFeatureLayerByPage(tempNode,10, n, function (data) {
                  $('.'+tempNode.pid+' .n_bottom_b_c:last table tbody').html('');
                  for(var i = 0;i<data.length;i+=1){
                    var html = '<tr>\n' +
                      '   <td>'+data[i].attributes.objectid+'</td>\n' +
                      '   <td>'+data[i].attributes.name+'</td>\n' +
                      '   <td>'+data[i].attributes.address+'</td>\n' +
                      '</tr>';
                    $('.'+tempNode.pid+' .n_bottom_b_c:last table tbody').append(html);
                  }
                });
                return false;
              }

            });

          });
        }
        // console.log(node);

      }
    });
    $('.n_bottom').append(monographicLayer.historyHtml);
    $('.n_bottom').children().last().hide();

  };

// monographicLayer.loadGISMapData = function(data){
//     console.log(data[0].attributes);
//
// };

  monographicLayer.reloadHtml();

  /**
   *slider切换时要更新数据
   */

  /*monographicLayer.sliderChangeDataAction = (function () {
    $('.slideTxtBox').slide({
      startFun:function( i,c,s ){
        $('.h_bottom_d').hide();
        switch (i){
          case 0:
            monographicLayer.reloadHtml(i);
            // $(".xfztxxzc_f").show();
            // $(".xfztxxzc_a,.xfztxxzc_d,.xfztxxzc_e").hide();
            break;
          case 1:
            monographicLayer.reloadHtml(i);
            // $(".xfztxxzc_a").show();
            // $(".xfztxxzc_f,.xfztxxzc_d,.xfztxxzc_e").hide();
            break;
          case 2:
            // $(".xfztxxzc_d").show();
            // $(".xfztxxzc_a,.xfztxxzc_f,.xfztxxzc_e").hide();
            break;
          default:
            break;
        }
      }
    });
  })();*/

  /**
   * 展示图层
   * @param id
   * @param checked
   */
  monographicLayer.loadMapLayer = function (id, checked) {
    monographicLayer.clickXFAction = 1;

    var node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(id);
    getMapLayersOnMap(node,checked);

    if(typeof id === 'string'){

      if(checked === true){
        // if(node.id === 'wulianwang_wulianganzhi'){
        //     return;
        // }
        if(node.url === '--'){
          alert(node.label+'暂无数据！');
          return;
        }
        document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerById(id);
      }else {
        document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.closeSingleLayerById(id);
      }
    }else {
      if(checked === true){
        document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadGroupLayerById(id[0]);
      }else {
        document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.closeGroupLayerById(id[0]);
      }
    }
  };

  function getMapLayersOnMap(node,checked) {
    if(typeof DX_aqyh !== 'undefined'){
      if(node.url !== '--'){
        if(DX_aqyh.mapLayersArray){
          if(checked === true){
            DX_aqyh.mapLayersArray.reverse().push(node);
            DX_aqyh.mapLayersArray.reverse();
          }else {
            for(var i = 0,j = DX_aqyh.mapLayersArray.length;i<j;i+=1){
              if(DX_aqyh.mapLayersArray[i].id === node.id){
                DX_aqyh.mapLayersArray.splice(i,1);
                break;
              }
            }
          }
        }
      }
    }
  }


  /**
   * 附近资源
   * @type {string}
   */
  /**
   * 消防附近资源
   */

  $('.zhfjzyxx_a_right img').click(function () {
    $('.k').hide();
    document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.closeResultGrapicLayer();
  });
  $('.xffjzyxx_a_right img').click(function () {
    $('.k').hide();
    document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.closeResultGrapicLayer();
  });

  $('.xffjzyxx_b_a_left img').map(function (index, value) {
    $(value).click(function () {
      if($(this).attr('src').indexOf('hover') === -1){
        var src = $(this).attr('src').split('.');
        $(this).attr('src',src[0]+'hover.'+src[1]);
        for(var i = 0;i<$('.xffjzyxx_b_a_right').children().length;i+=1){
          if(i === $(this).parent().parent().prevAll().length){
            $('.xffjzyxx_b_a_right').children().eq(i).show();
            $('.xffjzyxx_b_b_a ul li').eq(i).css('background-color','#edf4f9');
          }else {
            $('.xffjzyxx_b_a_right').children().eq(i).hide();
            $('.xffjzyxx_b_b_a ul li').eq(i).css('background-color','#ffffff');
          }
        }
        $(this).parent().parent().siblings().map(function (index, value) {
          var src = $(this).children().children().attr('src');
          $(this).children().children().attr('src',src.replace('hover',''));
        });

        //先清除附近资源其他所有图层
        document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.clearResultGrapicLayer();
        var data = monographicLayer.nearByData.fire[1][$(this).parent().parent().prevAll().length];
        for(var i = 0;i<data.length;i+=1){
          // monographicLayer.loadMapPoint = function(data,pid);
          if(typeof data[i] !== 'string'){
            if(data[i].count !== 0){
              for(var j = 0;j<data[i].dataArray.length;j+=1){
                if(data[i].dataArray[j].data.length>0){
                  for(var n = 0;n<data[i].dataArray[j].data.length;n+=1){
                    monographicLayer.loadMapPoint([data[i].dataArray[j].data[n]],data[i].dataArray[j].layerid);
                  }
                }
              }
            }
          }
        }
      }
    });
  });

  /**
   * 基础附近资源
   */
  $('.zhfjzyxx_b_a_left img').map(function (index, value) {
    $(value).click(function () {
      if($(this).attr('src').indexOf('hover') === -1){
        var src = $(this).attr('src').split('.');
        $(this).attr('src',src[0]+'hover.'+src[1]);
        for(var i = 0;i<$('.zhfjzyxx_b_a_right').children().length;i+=1){
          if(i === $(this).parent().parent().prevAll().length){
            $('.zhfjzyxx_b_a_right').children().eq(i).show();
            $('.zhfjzyxx_b_b_a ul li').eq(i).css('background-color','#edf4f9');
          }else {
            $('.zhfjzyxx_b_a_right').children().eq(i).hide();
            $('.zhfjzyxx_b_b_a ul li').eq(i).css('background-color','#ffffff');
          }
        }
        $(this).parent().parent().siblings().map(function (index, value) {
          var src = $(this).children().children().attr('src');
          $(this).children().children().attr('src',src.replace('hover',''));
        });

        //先清除附近资源其他所有图层
        document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.clearResultGrapicLayer();
        var data = monographicLayer.nearByData.common[1][$(this).parent().parent().prevAll().length];
        for(var i = 0;i<data.length;i+=1){
          // monographicLayer.loadMapPoint = function(data,pid);
          if(typeof data[i] !== 'string'){
            if(data[i].count !== 0){
              for(var j = 0;j<data[i].dataArray.length;j+=1){
                if(data[i].dataArray[j].data.length>0){
                  for(var n = 0;n<data[i].dataArray[j].data.length;n+=1){
                    monographicLayer.loadMapPoint([data[i].dataArray[j].data[n]],data[i].dataArray[j].layerid);
                  }
                }
              }
            }
          }
        }
      }
    });
  });

  monographicLayer.nearByData = {};
  monographicLayer.reloadXFNearByMessage = function(data) {

    console.log(data);
    /**
     * 调整附近资源范围弹框工具
     */
    $('.k').show();
    /**
     * 显示附近资源内容   $('.items-box span.num')
     */

    function countGisNumber(arr) {
      var pointObj = {};
      pointObj.count = 0;
      pointObj.dataArray = [];
      for(var i = 0;i<arr.length;i+=1){
        pointObj.count += arr[i].count;
        pointObj.dataArray.push({layerid:arr[i].layerid,data:arr[i].data});
      }
      return pointObj;
    }
    function countMyNumber(obj) {
      var pointObj = {};
      pointObj.count = 0;
      pointObj.dataArray = [];
      pointObj.count = obj.count;
      pointObj.dataArray.push({layerid:obj.layerid,data:obj.data});
      return pointObj;
    }

    function combine(obj1,obj2) {
      var obj = {};
      obj.count = 0;
      obj.dataArray = [];
      obj.count = obj1.count+obj2.count;
      obj.dataArray = obj1.dataArray;
      obj.dataArray = obj.dataArray.concat(obj2.dataArray);
      return obj;
    }

    /**
     * 消防
     */
    var firObj = [
      '0', //'对象统计':'',
      '0',// '实时人流':'',
      '0', // '房屋登记人口':'',
      '---',// '街道办':'',
      '0', //'巡逻民警':'',
      '0',// '消防武警':'',
      '0',// '监控摄像头':'',
      '0', // '楼栋消防物联感知设备':'',
      countMyNumber(data.sqldata['建筑物']), //'楼栋建筑':'',
      '0', // '危险化学品企业':'',
      '0', // '燃气类企业':'',
      '0', // '粉尘涉爆企业':'',
      '0',// '干冰储存点':'',
      countGisNumber(data.gisdata['医院']), // '医疗机构':'',
      '0',// '沙土存储点':'',
      '0', //'消防站':'',
      '0', // '重点消防部位':'',
      '0',// '实时路线':'',
      '0',// '危化车辆':'',
      countGisNumber(data.gisdata['公交车站']), // '公交车':'',
      countGisNumber(data.gisdata['地铁站']),// '地铁路线':'',
      '0',// '消防车':'',
      countGisNumber(data.gisdata['学校']),// '学校':'',
      countGisNumber(data.gisdata['医院']),// '医院':'',
      countGisNumber(data.gisdata['公园']),// '公园':'',
      combine(countGisNumber(data.gisdata['加油站']) , countMyNumber(data.sqldata['加油站'])),// '油气站/加油站':'',
      '0',// '燃气站':'',
      countGisNumber(data.gisdata['公交车站']),// '公共汽车站':'',
      countGisNumber(data.gisdata['地铁站']),// '地铁站':'',
      countGisNumber(data.gisdata['港口']),// '港口':'',
      '0', // '室外消火栓':'',
      '0', // '给水管网':'',
      '0', // '通信管道':'',
      '0'// '燃气管道':''
    ];

    monographicLayer.nearByData.fire = [firObj,[
      [firObj[0],firObj[1],firObj[2],firObj[3],firObj[4],firObj[5]],
      [firObj[6],firObj[7]],
      [firObj[8],firObj[9],firObj[10],firObj[11],firObj[12],firObj[13],firObj[14],firObj[15],firObj[16]],
      [firObj[17],firObj[18],firObj[19],firObj[20],firObj[21]],
      [firObj[22],firObj[23],firObj[24],firObj[25],firObj[26],firObj[27],firObj[28],firObj[29]],
      [firObj[30],firObj[31],firObj[32],firObj[33]]
    ]];

    if(monographicLayer.clickXFAction === 0){
      var temp = 0;
      for(var i = 0;i<firObj.length;i+=1){
        if(typeof firObj[i] === 'string'){
          $('.firMsg').eq(i).html(firObj[i]);
        }else {
          $('.firMsg').eq(i).html(firObj[i].count);
          temp += firObj[i].count;
        }
      }
      $('.xffjzyxx').show();
      $('.zhfjzyxx').hide();
      //默认点击最后一个--------基础设施
      $('.xffjzyxx_b_a_left img:last').click();
      $('.k_laft span:eq(4)').html(temp);
    }

    /**
     * 基础
     */

    var commonobj = [
      '0',//户籍人口
      '0',//实时人口
      '---',// 街道办
      countGisNumber(data.gisdata['社区工作站']),// 社区工作站
      countGisNumber(data.gisdata['银行']),// 银行
      countGisNumber(data.gisdata['知名企事业']),// 知名企事业
      '0',// 隐患事件
      '0',// 监控摄像头
      '0',// 楼栋消防物联感知设备
      countMyNumber(data.sqldata['建筑物']),// 建筑物
      countMyNumber(data.sqldata['建筑工地']),// 建筑工地
      '0',// 道路施工
      '0', // 实时路线
      countGisNumber(data.gisdata['公交车站']),// 公交车站
      countGisNumber(data.gisdata['地铁站']),// 地铁站
      '0',// 道路交叉口
      combine(countGisNumber(data.gisdata['加油站']) , countMyNumber(data.sqldata['加油站'])),//加油站
      countGisNumber(data.gisdata['学校']),//学校
      countGisNumber(data.gisdata['自然景点']),// 自然景点
      countGisNumber(data.gisdata['公园']),// 公园
      countGisNumber(data.gisdata['餐厅']),// 餐厅
      countGisNumber(data.gisdata['综合商场']),// 综合商场
      countGisNumber(data.gisdata['邮政']),// 邮政
      countGisNumber(data.gisdata['公共厕所']),// 公共厕所
      countGisNumber(data.gisdata['电信']),// 电信
      '0',// 给水管网
      '0', // 排水管网
      '0'// 电力设配
    ];

    monographicLayer.nearByData.common = [commonobj,[
      [commonobj[0],commonobj[1],commonobj[2],commonobj[3],commonobj[4],commonobj[5],commonobj[6]],
      [commonobj[7],commonobj[8]],
      [commonobj[9],commonobj[10],commonobj[11]],
      [commonobj[12],commonobj[13],commonobj[14],commonobj[15],commonobj[16]],
      [commonobj[17],commonobj[18],commonobj[19],commonobj[20],commonobj[21]],
      [commonobj[22],commonobj[23],commonobj[24],commonobj[25],commonobj[26],commonobj[27]]
    ]];

    if(monographicLayer.clickXFAction === 1){
      var temp = 0;
      for(var i = 0;i<commonobj.length;i+=1){
        if(typeof commonobj[i] === 'string'){
          $('.commonMsg').eq(i).html(commonobj[i]);
        }else {
          $('.commonMsg').eq(i).html(commonobj[i].count);
          temp += commonobj[i].count;
        }
      }

      $('.xffjzyxx').hide();
      $('.zhfjzyxx').show();
      //默认点击最后一个--------基础设施
      $('.zhfjzyxx_b_a_left img:last').click();
      $('.k_laft span:eq(4)').html(temp);
      // getTotleNumber($('.commonMsg'));
    }


    function getTotleNumber(element){
      var totle = 0;
      element.map(function (index, value) {
        if(Number($(value).html())){
          totle += !Number($(value).html());
        }
      });

      $('.k').show();
      $('.k').css('z-index','999999');
      $('.k_laft span:eq(4)').html(totle);
    }

    hideToolAction ();

  };


  /**
   * 调整附近资源圈圈大小
   * @type {string}
   */

  monographicLayer.changeMapSize = (function () {

    $('.k_laft input').val(50);
    $('.k_laft span:eq(1)').html(monographicLayer.sliderValue/1000);
    $('.k_laft span:eq(4)').html('--');
    $('#sliderInput').change(function (event) {
      console.log(event.target.value);
      monographicLayer.sliderValue = (event.target.value)*40;

      $('.k_laft span:eq(1)').html(monographicLayer.sliderValue/1000);
      $('.k_laft span:eq(4)').html('--');

      document.getElementById("iframeGisMap").contentWindow.module.layerControl.common.loadUtil.drawCirleQuery(document.getElementById("iframeGisMap").contentWindow.drawCircleQuery_Center.x,document.getElementById("iframeGisMap").contentWindow.drawCircleQuery_Center.y);
    });
  })();

  /**
   * 附近资源主动调用
   */
  monographicLayer.popNearByMessage = function (LatAndLon) {
    document.getElementById("iframeGisMap").contentWindow.module.layerControl.common.loadUtil.drawCirleQuery(LatAndLon[0],LatAndLon[1]);
  };

  /**
   * 落全域搜索单点
   */
  monographicLayer.loadSearchPoint = function(pid,data){
    monographicLayer.clickXFAction = 1;
    var node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(pid);
    var pointJsonFeature = document.getElementById("iframeGisMap").contentWindow.module.layerControl.common.convert.pointJsonToFeatureLayerJson(data, "jd", "wd");
    document.getElementById("iframeGisMap").contentWindow.module.layerControl.common.loadUtil.loadSinglePointJsonResultGrapicLayer(pointJsonFeature.graphics,node);

    monographicLayer.removeSingleLayerData = {type:'quanyujiansuo',data:{graphics:pointJsonFeature.graphics,pid:pid,node:node}};
  };



  /**
   * 前端主动落点落图
   */
  monographicLayer.loadMapPoint = function(data,pid){

    monographicLayer.clickXFAction = 1;

    if(pid === undefined){
      pid = 'layer_otherPoint_fireEventList_xiaofangshijianliebiao';
    }

    var node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(pid);
    if(node.type === 'PointJsonLayer'){
      var pointJsonFeature = document.getElementById("iframeGisMap").contentWindow.module.layerControl.common.convert.pointJsonToFeatureLayerJson(data, "jd", "wd");
      document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.loadPointJsonResultGrapicLayer(pointJsonFeature.graphics, node);//我们自己数据
    }else if(node.type === 'FeatureLayer'){
      document.getElementById("iframeGisMap").contentWindow.module.layerQuery.featureNearbyQuery.loadGtwResultGrapicLayer(data, node);//规土委数据
    }
  };

  /**
   * 消防事件列表单点落点
   */
  monographicLayer.loadEventMapPoint = function(id,pid){

    monographicLayer.clickXFAction = 0;

    //先移除落图
    document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(pid);
    var node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(pid);
    node.query = '?id='+id;
    document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.loadSingleLayerByNode(node);

    monographicLayer.removeSingleLayerData = {type:'xiaofang',data:{id:id,pid:pid}};
  };

  monographicLayer.clearAll = function(){
    var data = monographicLayer.layerArray;
    for(var i in data){
      if(i === 'undefined'){
        return;
      }
      if(data[i].checked === true){
        // data[i].checked = false;
        $('.'+data[i].pid+' input').eq(0).click();
      }

      if(data[i].hasChecked === true){
        $('.'+data[i].pid+' input').eq(0).click();
        $('.'+data[i].pid+' input').eq(0).click();
      }
      // data[i].hasChecked = false;
      // if(data[i].data.length>0 ){
      //     for(var j = 0;j<data[i].data.length;j++){
      //         if(data[i].data[j].checked === true){
      //             data[i].data[j].checked = false;
      //         }
      //     }
      // }
    }

    $('.n').hide();
    monographicLayer.layerArray = data;
  };

  /**
   * 消防事件列表详情
   */
  monographicLayer.loadSFDetailMessage = function (pid,id,url) {
   /* if(pid === 'layer_otherPoint_fireEventList_xiaofangshijianliebiao'){
      monographicLayer.moveAction('swzs');
      $('.swzs').show();
    }else if(pid === 'safetysupervision_yinhuanfenbu' || pid.search('xiaofanglei_yinhuansanse') !== -1 || pid === 'sanfanglei_daolubinghai'){
      var node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(pid);
      DX_aqyh.showYinhuanList(pid,node.url,id);
    }else if(pid.search("wulianwang") != -1){
      var node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(pid);
      DX_aqyh.showWulianwang(pid,node.url,id);
    }else if(pid.search("layer_basegeo_featureMapFutian_building") != -1){
      var node = document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerXml.getLayerNodeById(pid);
      yxzx.jzfxTip(url,id);
    }else{
      alert('hehe');
    }*/
    alert('hehe');
  };


//清除单点落图（1、消防事件单落图；2、全域检索单落图落图）
  if($('#search-bar').find('.clear')[0] !== undefined){
    $('#search-bar').find('.clear')[0].addEventListener('click',function () {
      monographicLayer.removeSingleLayer();
    });
  }
  /**
   * monographicLayer.removeSingleLayerData = {type:'xiaofang',data:{id:id,pid:pid}};
   * monographicLayer.removeSingleLayerData = {type:'quanyujiansuo',data:{graphics:pointJsonFeature.graphics,pid:pid,node:node}};
   */
  monographicLayer.removeSingleLayer = function () {
    if(monographicLayer.removeSingleLayerData === undefined){

    }else {
      if(monographicLayer.removeSingleLayerData.type === 'xiaofang'){
        document.getElementById("iframeGisMap").contentWindow.module.common.layerControl.mapLayerOperate.removeSingleLayerById(monographicLayer.removeSingleLayerData.data.pid);
      }else if(monographicLayer.removeSingleLayerData.type === 'quanyujiansuo'){
        document.getElementById("iframeGisMap").contentWindow.module.layerControl.common.loadUtil.closeSinglePointJsonResultGrapicLayer(monographicLayer.removeSingleLayerData.data.graphics,monographicLayer.removeSingleLayerData.data.node);
      }
    }
  };











/*  <!---视频自定义-->
//公安视频*/
  monographicLayer.videoIDArray = [];
  var placeID = '';
  monographicLayer.closeVideos = function (event) {
    $(".videos2").css('right',-1000);
    document.getElementById("videoHtml2").contentWindow.StopLivePlay1();
  };
  monographicLayer.openVideoAction = function(id,pid){

    $('.videos2').css('right',20);
    document.getElementById("videoHtml2").contentWindow.StopLivePlay1();
    document.getElementById("videoHtml2").contentWindow.videosObj.videosId = id;
    document.getElementById("videoHtml2").contentWindow.StartLivePlay1();
  };

//安保视频
// monographicLayer.videoIDArray = [];
// var placeID = '';
// monographicLayer.closeVideos = function (event) {
//     // console.log(event);
//     $(".videos").css('right',-1000);
//     document.getElementById("videoHtml").contentWindow.DHVideo.ButtonLogout_onclick();
// };
// monographicLayer.openVideoAction = function(id,pid){
//     // console.log('^^^^'+id);
//     placeID = id;
//     $('.videos').css('right',20);
//     monographicLayer.playMyVideo(pid);
//
//     var ifHas = -1;
//     for(var i = 0,j = monographicLayer.videoIDArray.length;i<j;i+=1){
//         if(monographicLayer.videoIDArray[i].id === placeID){
//             ifHas = i;
//             $('.videos h3').removeAttr('class');
//             $('.videos h3:eq(i)').attr('class','on');
//             //直接播放
//             break;
//         }
//     }
//
//     var returnVideoMessage = function (data) {
//         console.log('---'+placeID);
//         monographicLayer.videoIDArray.push({id:placeID,value:data});
//         if($('.videos h3').length>0){
//             $('.videos h3').removeAttr('class');
//         }
//         var html =  '<h3 class="on" style="color: #00b7ee;">'+data.value[2][1]+'</h3><ul style="padding: auto 10px;color: #2e6da4">';
//         for(var i = 0,j = data.video.length;i<j;i+=1){
//             html += '<li style="cursor: pointer;">'+data.video[i].videoName+'</li>';
//         }
//         html += '</ul>';
//         $('.videos .sideMenu').append(html);
//         $('.videos .sideMenu h3:last')[0].scrollIntoView();
//         $('.videos ul').map(function (index,value) {
//             if(index === monographicLayer.videoIDArray.length-1){
//                 $(this).children().map(function (index2, value2) {
//                     $(value2).on('click',function () {
//                         monographicLayer.playMyVideo(monographicLayer.videoIDArray[index].value.video[index2].videoId) ;
//                     });
//                 })
//             }
//         });
//
//         $(".sideMenu").slide({
//             titCell: "h3", //鼠标触发对象
//             targetCell: "ul", //与titCell一一对应，第n个titCell控制第n个targetCell的显示隐藏
//             effect: "slideDown", //targetCell下拉效果
//             trigger:'click',//触发方式
//             delayTime: 300, //效果时间
//             triggerTime: 150, //鼠标延迟触发时间（默认150）
//             defaultPlay: true,//默认是否执行效果（默认true）
//             returnDefault: false //鼠标从.sideMen移走后返回默认状态（默认false）
//             // startFun:function ( i, c, slider, titCell, mainCell, targetCell, prevCell, nextCell ) {
//             //     console.log(this);
//             // }
//         });
//         console.log(data);
//     };
//
//     if(ifHas === -1){
//         getData.subscribe('getVideoMessage',returnVideoMessage);
//         getData.publish('getVideoMessage','GET','http://192.168.16.195:8080'+'/video/summaryInfo?id='+placeID);
//     }else {
//         //直接播放
//     }
//
//
//
// //'<li onclick="monographicLayer.playMyVideo('+data.value[i][3]+')">'+data.value[i][5]+'</li>';
//
//
//     // function addHtml(title,videoID) {
//     //     var html = '<h3 class="on">'+title+'</h3>' +
//     //         '            <ul>' +
//     //         '                <li onclick="playMyVideo()">'+videoID[0]+'</li>' +
//     //         '                <li onclick="playMyVideo()">'+videoID[0]+'</li>' +
//     //         '                <li onclick="playMyVideo()">'+videoID[0]+'</li>' +
//     //         '                <li onclick="playMyVideo()">'+videoID[0]+'</li>' +
//     //         '                <li onclick="playMyVideo()">'+videoID[0]+'</li>' +
//     //         '            </ul>';
//     // }
//
//
// };

  monographicLayer.playMyVideo = function(id){
    document.getElementById("videoHtml").contentWindow.DHVideo.myButtonStartRealplayByWndNo_onclick([id]);
  };


  /**
   * 福田安全一张图
   */






























  var creatMyHtml = '<div class="n_bottom">\t\n' +
    '             \t <div class="n_bottom_a">\n' +
    '             \t \t <div class="n_bottom_a_left">\n' +
    '                         <span><input name="" type="radio" value="" disabled/></span>\n' +
    '                         <span>医院</span>            \t \t \t\n' +
    '             \t \t </div>\t\n' +
    '              \t \t <div class="n_bottom_a_middle">\n' +
    '              \t \t \t <span>四类共</span>\n' +
    '              \t \t \t <span>12</span>\n' +
    '              \t \t \t <span>个</span>\n' +
    '             \t \t </div>\t\n' +
    '             \t \t <div class="n_bottom_a_right">\n' +
    '             \t \t \t <a href="####" title="折叠"><img src="img/yxjc_46.png"/></a>\n' +
    '             \t \t </div>\t             \t \t \n' +
    '                 </div>\n' +
    '             \t <div class="n_bottom_b" style="display: none;">\n' +
    '             \t     <div class="n_bottom_b_a">\n' +
    '             \t     \t <ul>\n' +
    //     <li>
    //     <span>综合医院</span>
    //     <span><a href="####" title="关闭"><img src="img/yxjc_45.png"/></a></span>
    // </li>
    /**
     * 动态加载选择列表
     */
    '             \t     \t </ul>\t\n' +
    '                     </div>  \n' +
    '             \t     <div class="n_bottom_b_b">\t\n' +
    '             \t     \t <span><input name="" type="text" value="" checked="" /></span>\n' +
    '             \t     \t <span><a href="####" title="搜索">搜索</a></span>\n' +
    '                     </div>\n' +
    '             \t     <div class="n_bottom_b_c">\t\n' +
    '              \t         <table>\n' +
    '             \t \t         <thead>\n' +
    '             \t \t\t         <tr>\n' +
    '             \t \t \t             <td>序号</td>\n' +
    '             \t \t \t             <td>医院名称</td>  \n' +
    '              \t \t \t             <td>医院地点</td>\n' +
    '             \t \t             </tr>\n' +
    '             \t \t         </thead>\n' +
    '             \t \t         <tbody>\n' +
    // '<tr>' +
    // '<td>1</td>' +
    // '<td>×××××医院</td>' +
    // '<td>×××××路×××××号</td>' +
    // '</tr> \n' +
    /**
     * 加载具体内容
     */
    '             \t \t         </tbody>\n' +
    '             \t         </table>               \t     \t\n' +
    '                     </div> \n' +
    '              \t     <div class="n_bottom_b_d">\t\n' +
    '<div id="yypager"></div>'+
    '                     </div>                     \n' +
    '                 </div>                 \n' +
    '             </div>';

































































































































































  monographicLayer.moveAction = function (odiv) {
    // console.log(odiv);
    var  styler  = window.popmotion.styler;
    var   spring  = window.popmotion.spring;
    var   listen  = window.popmotion.listen;
    var  pointer  = window.popmotion.pointer;
    var  value  = window.popmotion.value;

    var ball = document.querySelector('.'+odiv);
    var divStyler = styler(ball);
    var ballXY = value({ x: 0, y: 0 }, divStyler.set);

    listen(ball, 'mousedown touchstart')
      .start(function(e) {
        e.preventDefault();
        pointer(ballXY.get()).start(ballXY);
      });

    listen(document, 'mouseup touchend')
      .start(function() {
        ballXY.stop();
      });
  };






}



function reFixLayerData(data) {
  var temp = [];
  data.map(function (value, index) {
    temp.push(monographicLayer.layerArray[value.name]);
  });
  return temp;
}
function processingData(data, num, id) {

  return returnMyData(data, num, id);

  function returnMyData(data, num, id) {
    var tempArray = [];
    data.nodes.map(function (value, index) {
        var temp = {name: data.nodes[index].label, index: index + num, checked: false, data: [],icon:data.nodes[index].icon};
        temp[id] = data.nodes[index].id;
        if (data.nodes[index].nodes !== undefined && data.nodes[index].nodes.length > 0) {
          data.nodes[index].nodes.map(function (value2, index2) {
            var temp2 = {name: data.nodes[index].nodes[index2].label, index: index2, checked: false,icon:data.nodes[index].nodes[index2].icon};
            temp2[id] = data.nodes[index].nodes[index2].id;
            temp.data.push(temp2);
          });
        }
        tempArray.push(temp);
      }
    );
    return tempArray;
  }
}

/**
 *xml对象转json对象
 **/
//xml转json
function xmlToJson(nodes) {
  var itemList = new Array();
  $.each(nodes, function () {
    var entity = {};
    var obj = $(this);
    entity.label = obj[0].getAttribute("label");
    entity.id = obj[0].getAttribute("id");
    //entity.text = obj[0].getAttribute("label");
    //entity.href = '#parent1';
    // entity.tags = ['0'];

    if (obj[0].hasChildNodes()) {
      entity.nodes = xmlToJson(obj.children());
    }
    else {
      entity.pid = obj[0].getAttribute("pid");
      entity.type = obj[0].getAttribute("type");
      entity.show = obj[0].getAttribute("show");
      entity.bm = obj[0].getAttribute("bm");
      entity.function = obj[0].getAttribute("function");
      entity.url = obj[0].getAttribute("url");
      entity.query = obj[0].getAttribute("query");
      entity.icon = obj[0].getAttribute("icon");
    }
    itemList.push(entity);
  });
  return itemList;
}


/**
 *xml对象转json对象
 **/
//xml转json
function xmlToJson(nodes) {
    var itemList = new Array();
    $.each(nodes, function () {
        var entity = {};
        var obj = $(this);
        entity.label = obj[0].getAttribute("label");
        entity.id = obj[0].getAttribute("id");
        //entity.text = obj[0].getAttribute("label");
        //entity.href = '#parent1';
        // entity.tags = ['0'];

        if (obj[0].hasChildNodes()) {
            entity.nodes = xmlToJson(obj.children());
        }
        else {
            entity.pid = obj[0].getAttribute("pid");
            entity.type = obj[0].getAttribute("type");
            entity.show = obj[0].getAttribute("show");
            entity.bm = obj[0].getAttribute("bm");
            entity.function = obj[0].getAttribute("function");
            entity.url = obj[0].getAttribute("url");
            entity.query = obj[0].getAttribute("query");
            entity.icon = obj[0].getAttribute("icon");
        }
        itemList.push(entity);
    });
    return itemList;
}
//convert string to xml object
function String2XML(xmlString) {
  // for IE
  if (window.ActiveXObject) {
    var xmlobject = new ActiveXObject("Microsoft.XMLDOM");
    xmlobject.async = "false";
    xmlobject.loadXML(xmlString);
    return xmlobject;
  }
  // for other browsers
  else {
    var parser = new DOMParser();
    var xmlobject = parser.parseFromString(xmlString, "text/xml");
    return xmlobject;
  }
}
//convert xml object to string
function XML2String(xmlObject) {
  // for IE
  if (window.ActiveXObject) {
    return xmlobject.xml;
  }
  // for other browsers
  else {
    return (new XMLSerializer()).serializeToString(xmlobject);
  }
}
export { //很关键
  monographicLayer
}







