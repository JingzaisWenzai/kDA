import Vuex from 'vuex'

import mutations from '~/store/mutation'
import actions from '~/store/action'

const store = () => {
  return new Vuex.Store({
    state: {
      author: 'cutexiaole',
      counter: 0,
      mapType:0,
      ShowInfoList:'no',
      Resource:{  //附近搜索
        ShowResource:'off',
        clearNearByNodes:'no',
        ShowSearchWithoutResource:'on', //控制关闭搜索的除了附近资源的其他弹窗
        searchCenter:{
          wd:'',   //latitude 维度
          jd:'',    //longitude  经度
          name:'',
          layerid:'',  //就是id
          nodeid:'',
          tableName:''
        }
      },
      infoList:{
        applyUrl:'',
        applyQuery:{},
        clickedNode:{
          node:{},
          parentname:'',
          txt:'',
          ppname:''
        },
        urlHead_iot:'/iot_device@',
        tableParentId : 'table_coupon',
        wholeId:'info_list',
        urlFoot_iot:'/oracle/pageInfo',
        urlBox:{'公安视频':'/videop/pageInfo','烟雾传感器':'yanwu','剩余电流控制器':'shengyudianliu','气体传感器':'qiti','内涝监测设备':'neilaojiance','电气火灾监测设备':'dianqihuozaijiance','地质灾害监测设备':'dizhizaihaijiance','压力传感器':'yali'},
        areaOptions:['全部','华富','梅林','沙头','香蜜湖','福保','福田','南园','华强北','桂园','莲花','南湖','园岭','笋岗'],
        areaVideoOptions:['全部','华富派出所','沙头派出所','皇岗口岸（卡口）','福强派出所','华强北（卡口）','景田派出所（卡口）','加油站','南园所（卡口）','会展中心','福田口岸','沙头所（卡口）','福保派出所','天安所（卡口）','华富派出所（卡口）','莲花派出所','八卦岭派出所','华强北派出所','福田派出所','福保所（卡口）','通心岭派出所','福田制高点','香蜜湖派出所','梅林派出所','八卦岭所（卡口）','天安派出所','南园派出所','莲花派出所（卡口）','警银亭','福田高铁站','香蜜湖（卡口）','福强所（卡口）','梅林所（卡口）','景田派出所','福田口岸（人脸）','通心岭（卡口）','福田所（卡口）','皇岗口岸派出所'],
        typeOptions:['漏电流监控','其他监控'],
        clomnClass:'col_6',
        typeClass:'type_0',
        timeOptions:[],
        areaOptionsContent:'全部',
        typeOptionsContent:'',
        timeOptionsContent:'',
        pageSize:6,
        tableHtml:'<table class="tableStyle"><thead><tr><td>序号</td><td>设备编码</td><td>设备名称</td><td>设备类型</td><td>责任人信息（角色：名称/电话）</td><td>地址</td></tr></thead><tbody><tr><td>1</td><td>M-N-0016565654</td> <td>漏电流监控</td>           <td>电器火灾监控设备</td>             <td>***********</td>             <td>***********</td>         </tr></tbody></table>', //插入的htmlTable代码
        tableList:{
          thead:[],
          tbody:[
            {data:[]}
          ]
        }
      },
      infoListBox:[], //[{txt:'',}]
      infoTable:{},
      clickedResault:{ name:'',clicked:false},
      ShowRiskRank:'no',   /*显示隐患排行弹窗*/
      ShowFenBu:'no',      /*显示隐患分布查看详情弹窗弹窗*/
      ShowYinHuan:'no',   /*显示建筑隐患查看详情弹弹窗*/
      ShowIotPopup:'no',  /*显示物联网的查看详情弹弹窗*/
      ShowCity:'no',      /*显示城市风险评估查看详情弹弹窗*/
      ShowChrome:'no',    /*显示隐患三色的查看详情弹弹窗*/
      ShowQiYe:'no',  /*显示纳管企业的查看详情弹窗*/
      ShowEmergency:'no', /*三小场所*/
      ShowThreeS:'no',  /*应急物资*/
      ShowImgBox:'no',
      ShowHospital:'no',//卫计医院
      ShowJingjiDetail:'no',//运行展现 宏观经济 金融 p2p平台：p2p_plat，私募机构：p2p_private，其他涉众金融平台：p2p_other_plat
      ShowImgBoxSrc:'',
      ClearBottomClass:'no',
      PopUp:{
        CityRisk:[],
        Distribution:[],
        BuildingRisk:[],
        Iot:[],
        Trichrome:[],
      },
      Search:{
        ShowSearch:'on',     /*控制搜索详情弹窗中附近搜索等按钮的样式*/
        list:[],                 /* 搜索下拉框（包含详情的信息）*/
        POI:[
          /*
          {name:'城市部件',sub:[
            {name:'消火栓'},{name:'报刊亭'},{name:'路灯'},
            {name:'公共厕所'},{name:'环卫工具房'},{name:'供水器'},{name:'人防工事'},{name:'交通岗亭'},
            {name:'地铁出入口'},{name:'污水井盖'},{name:'雨水井盖'},{name:'燃气调压站（箱）'},{name:'高压线铁塔'},
            {name:'公交站'},{name:'加油站'}
          ]},
          {name:'公共安全',sub:[
            {name:'监控视频'},{name:'治安岗亭'},{name:'重大危险源'},{name:'工地'},{name:'道路病害'},{name:'内涝点'},{name:'应急资源仓库'},{name:'重点场所'},{name:'三小场所'},{name:'应急避难所'}
          ]},
          {name:'民生服务',sub:[
            {name:'教育机构'},{name:'医疗卫生'},{name:'养老中心'},{name:'停车场'}
          ]},
          {name:'宏观经济',sub:[
            {name:'企业分布'}
          ]},
          {name:'生态环境',sub:[
            {name:'空气质量'},{name:'地表水'},{name:'噪声'},{name:'污染源'},{name:'餐饮油烟'},{name:'工厂扬尘'}
          ]}*/ ]
      },
      bottomRight:[],           /*右侧弹窗*/
      bottomDotPop:{
        current:{},            /*当前详情部分*/
        history:{
          ochart:[],
          otable:[]
        }              /*历史查询部分*/
      },          /*点击落点弹窗*/
      historyChart: [],         /*表格部分*/
      historyTable: [],         /*table部分*/
      popobj: [],               /*当前详情部分*/
      build: {
        basicDetails:[],
        houses:[],
        houseDetail:[]
      },
      //生态 显示右侧弹窗
      eco:{
        dotType:''
      },
      rightPopChart:'',
      ShowEnv:'no',
      //wyk,安全一张图  显示tablelist
      addressStreet:"福田区", //用于街道地图 根据不同的地图进行筛选
     /* index0:-1, //l落图一级菜单索引
      index1:-1, //落图二级菜单索引*/
      flag:-1,   //落图标记
      detailMessageNodeId:"",//落点nodeID
      detailMessageId:"",   //落点ID
      detailMessageName:'',    //落点的name 只为了应急仓库查看详情
      detailPopupType:'',    //落点类型
      tableList:""     //设置否显示列表，并传参
    },
    mutations,
    actions,
    getters:{}
  })
}

export default store
