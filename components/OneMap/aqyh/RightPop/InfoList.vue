<template>
  <div class="aqyh_j" :class="typeClass" :id="wholeId">
    <div class="aqyh_j_right">
      <div class="aqyh_j_right_a">
        <span>信息列表</span><span class="count" v-if="infoCount && infoCount!==0">共{{infoCount}}条数据</span> <i @click="toClose()"></i>
      </div>
      <!--<div class="aqyh_j_right_d" >
        <ul>
          &lt;!&ndash;此处不需要区域了 直接由左侧的来测&ndash;&gt;
         &lt;!&ndash; <li class="type_area">
            <div class="aqyh_j_right_d_left">
              区域：
            </div>
            <div class="aqyh_j_right_d_right">
                  <select :name="areaOptionsContent" v-model="areaOptionsContent">
                    <option :value ="a" v-for="(a , b) in areaOptions" :key = 'b'>{{a}}</option>
                  </select>
            </div>
          </li>&ndash;&gt;
          <li class="type_time">
            <div class="aqyh_j_right_d_left">
              时间：
            </div>
            <div class="aqyh_j_right_d_right">
              <select  :name="timeOptionsContent" v-model="timeOptionsContent">
                <option :value ="e" v-for="(e,f) in timeOptions" :key="f">{{e}}</option>
              </select>
            </div>
          </li>
          <li class="type_type">
            <div class="aqyh_j_right_d_left">
              类型：
            </div>
            <div class="aqyh_j_right_d_right">
                    <select :name="typeOptionsContent" v-model="typeOptionsContent">
                       <option :value ="c" v-for="(c,d) in typeOptions" :key="d">{{c}}</option>
                    </select>
            </div>
          </li>
          <li class="type_device">
            <div class="aqyh_j_right_d_left">
              设备标号：
            </div>
            <div class="aqyh_j_right_d_right">
              <input type="text" placeholder="" v-model ='devicedId'/>
            </div>
          </li>
          <li class="type_set">
            <div class="aqyh_j_right_d_left" id="search_now">
              <a href="####" title="查询">查询</a>
            </div>
            <div class="aqyh_j_right_d_right" id="reset_now">
              <a href="####" title="重置">重置</a>
            </div>
          </li>
        </ul>
      </div>-->
      <div class="aqyh_j_right_e">
        <ul id="title_coupon">
          <li v-for="(item, index) in cardBox" @click="toShowThis(item)" :key = 'index' class="aqyh_j_right_e_a"  :class ="index ===0 ? 'active' :''"  :title="item"><span>{{item.name}}</span></li>
        </ul>
      </div>
      <div class="aqyh_j_right_f" :class="clomnClass">      <!-- -->
        <div class="aqyh_j_right_f_a">
          <div class="aqyh_j_right_b" :id="tableId" >
            <table v-if="tableList.thead">
              <thead>
              <tr><td v-if="tableList.thead.length!==0">序号</td><td v-for="(o,p) in tableList.thead" :key="p">{{o}}</td></tr>
              </thead>
              <tbody>
              <tr v-for="(q,r) in tableList.tbody" :key="r" @click="toFocus(r)"><td v-if="q.data.length!==0">{{(Number(pages.pageNum) - 1) * Number(pages.pageSize) + r + 1}}</td><td v-for="(m,n) in q.data" :key="n" :title="m">{{m}}</td></tr>
              </tbody>
            </table>
          </div>
          <div class="aqyh_j_right_c" id="page_coupon">
            <page-menu :page = pages @toPage="toThePage"></page-menu>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

  /*导航栏的特殊样式*/
  ::-webkit-scrollbar{width:16px!important;height:16px!important;}
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb{border-radius:999px!important; border:4px solid transparent!important;}
  ::-webkit-scrollbar-track{box-shadow:1px 1px 5px rgba(185,165,150,.2) inset!important;}
  ::-webkit-scrollbar-thumb{min-height:20px!important;background-clip:content-box!important;box-shadow: 0 0 0 5px rgba(25,109,180,0.5) inset!important;}
  ::-webkit-scrollbar-corner{/*background:transparent;*/}
  .aqyh_j{width:100%; height:auto; text-align: left; margin: 0 auto; padding: 0; overflow: hidden; background-color: rgba(2,22,35,0.8); border: 1px solid #196db4; }
  .aqyh_j_right{width:100%; height:auto; text-align: left; margin: 0 auto; overflow: hidden;}
  .aqyh_j_right_a{padding-left:20px;width:100%; height:36px; line-height: 50px; text-align: left; margin: 0 auto;background-color: rgba(6,28,58,0.9); overflow: hidden; font-size: 10px; color: #7af3ff; position: relative;}
  .aqyh_j_right_a span{display: inline;font-size: 16px;color: #7af3ff;}
  .aqyh_j_right_a .count{font-size: 14px;margin-left: 15px;    color: #2aabd2;}
  .aqyh_j_right_a i {cursor: pointer;display: block; background:url('../../../../static/img/aqyhPop/close.png') no-repeat center;background-size:80% 80%;width: 20px;height:20px; position: absolute;/*border:1px solid #fff; */-webkit-border-radius:20px; -moz-border-radius:20px; border-radius:20px; left:100%; top: 50%; margin-left: -30px; margin-top:-10px;}
  .aqyh_j_right_d{width:100%;  height:80px; line-height: 32px; text-align: left; margin: 10px auto; overflow: hidden; }
  .aqyh_j_right_d ul{width:100%;  padding: 0; height:80px; line-height: 32px; text-align: left; margin: 0 auto; overflow: hidden; }
  .aqyh_j_right_d ul li{width:33%; height:32px; line-height: 32px; text-align: left; margin: 4.5px 0 4.5px 0; float: left; display: inline; overflow: hidden; font-size: 10px; color: #4c545b;}
  .aqyh_j_right_d_left{width:60px;color:#73fdff;font-size:12px; height:32px; line-height: 32px; text-align: right; margin: 0 10px 0 0; float: left; display: inline; overflow: hidden;}
  .aqyh_j_right_d_right{width:130px; height:32px; line-height: 32px; text-align: left; margin: 0 auto; float: left; display: inline; overflow: hidden;}
  .aqyh_j_right_d_right select{width:130px; height:30px; line-height: 30px; padding: 0 3px; text-align: left; margin: 0 auto; overflow: hidden;  box-shadow:0 0 5px #e6e6e6; border:1px solid transparent; border-radius:5px ;color: #73fdff; font-size: 12px;background-color:#175e9c; }
  .aqyh_j_right_d_right select option{ width:100%; height:30px; line-height: 30px;  font-size: 10px; color: #cccccc; border:1px solid #d0d0d0;}
  .aqyh_j_right_d_left a{ width:100%; height: 30px; line-height: 30px;color: #73fdff; font-size: 12px; display: block; text-align: center; background-color: #175e9c; border-radius:5px; text-decoration: none;}
  .aqyh_j_right_d_right a{ width:100%; height: 30px; line-height: 30px;color: #73fdff; font-size: 12px; display: block; text-align: center;  border-radius:5px; text-decoration: none;border:1px solid transparent; background-color: #175e9c;}
  .aqyh_j_right_d input{color:#73fdff;font-size:12px;padding-left:3px; width:100%; background-color:transparent;height:24px; line-height: 24px; text-align: left; margin: 0 auto; overflow: hidden; border:1px solid #175e9c;}
  .aqyh_j_right_e{width:100%; height:31px; line-height: 31px; text-align: left; margin: 20px auto 0; overflow: hidden;}
  .aqyh_j_right_e ul{width:100%;  padding: 0 0 0 20px;display: block; height:31px;  text-align: left; margin: 0 auto; overflow: hidden; }
  .aqyh_j_right_e ul li{
    width: 16px; height: 32px;min-width: 103px; max-width: 131px; line-height: 31px; text-align: center; margin: 0 auto; float: left; display: block; overflow: hidden;
    background-image:url('../../../../static/img/aqyhPop/wlw_title_left.png'), url('../../../../static/img/aqyhPop/wlw_title_right.png') ;
    background-repeat:  no-repeat no-repeat;
    background-position: left center, right center;
    background-size: contain, contain;
  }
  .aqyh_j_right_e ul li:hover,
  .aqyh_j_right_e ul li.active{
    background-image:url('../../../../static/img/aqyhPop/wlw_title_left_hover.png') ,url('../../../../static/img/aqyhPop/wlw_title_right_hover.png') ;
    background-repeat:  no-repeat no-repeat;
    background-position: left center, right center;
  }
  .aqyh_j_right_e ul li span{
    display: block; color:rgba(115,253,255,0.5);font-size:12px;margin:0 16px;line-height: 31px; text-align: center;
    background-color: rgba(25,109,180,0.5); border-top:1px solid rgba(25,109,180,0.5);border-bottom:1px solid rgba(25,109,180,0.5);
  }
  .aqyh_j_right_e ul li.active span,
  .aqyh_j_right_e ul li:hover span{color:#ffffff; background-color:#175e9c;border-top:1px solid transparent;border-bottom:1px solid transparent;}
  /*根据不同的情况 展示不同的搜索栏*/
  /*不是物联网的，只有区域选项*/
  .type_0 .aqyh_j_right_d .type_time,
  .type_0 .aqyh_j_right_d .type_type,
  .type_0 .aqyh_j_right_d .type_device{ display:none;}
  .type_0 .type_set{margin-left:66%;}
  .type_0 .aqyh_j_right_d{display: none;}

  .type_1 .aqyh_j_right_d,
  .type_2 .aqyh_j_right_d,
  .type_3 .aqyh_j_right_d,
  .type_4 .aqyh_j_right_d{display: block}
    /*视频展示*/
  .type_3 .aqyh_j_right_d .type_time,
  .type_3 .aqyh_j_right_d .type_type{display: none}
  .type_3 .aqyh_j_right_d .type_device{display:block;}

  /*是物联网不是压力传感器的*/
  .type_1 .aqyh_j_right_d .type_time,
  .type_1 .aqyh_j_right_d .type_device{display: block}
  .type_1 .aqyh_j_right_d .type_type{display:none;}
  .type_1 .type_set{margin-left:66%;}
  /*是压力传感器的*/
  .type_2 .aqyh_j_right_d .type_time,
  .type_2 .aqyh_j_right_d .type_type,
  .type_2 .aqyh_j_right_d .type_device{
    display:block;
  }
  /*风险评估城区*/
  .type_4 .aqyh_j_right_d .type_type{
    display: block;
  }
  .type_4 .aqyh_j_right_d .type_time,
  .type_4 .aqyh_j_right_d .type_device{
    display:none;
  }
  .aqyh_j_right_f{width:100%; height:368px; text-align: left; margin: 0 auto; overflow: hidden;}
  .aqyh_j_right_f_a{width:100%; height:100%; text-align: left; margin: 0 auto; overflow: hidden;}
  .aqyh_j_right_f_b{width:100%; height:518px; text-align: left; margin: 0 auto; overflow: hidden;}
  .aqyh_j_right_f_c{width:100%; height:518px; text-align: left; margin: 0 auto; overflow: hidden;}
  .aqyh_j_right_f_d{width:100%; height:518px; text-align: left; margin: 0 auto; overflow: hidden;}
  .tableStyle thead tr td,
  .tableStyle tbody tr td,
  .aqyh_j_right_f_a .aqyh_j_right_b table thead tr td,
  .aqyh_j_right_f_a .aqyh_j_right_b table tbody tr td{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    line-height: 30px;
  }
  .aqyh_j_right_f_a .aqyh_j_right_b{width:95%; margin: 0 auto; height:315px; text-align: left; overflow: auto;}
  .aqyh_j_right_f_a .aqyh_j_right_b table,
  .tableStyle{ display:table; width:100%;border-collapse: collapse;max-width: 640px; height: auto; text-align: center;  border: #224f77 solid 1px;}
  .aqyh_j_right_f_a .aqyh_j_right_b table thead,
  .tableStyle thead{width:100%; height:45px; text-align: center; margin: 0 auto; overflow: hidden; font-size: 12px;font-weight: 800; color: #73fdff; background-color: transparent;}
  .aqyh_j_right_f_a .aqyh_j_right_b table thead tr td,
  .tableStyle thead tr td{ height:auto;  padding:0;  border-right: #224f77 solid 1px; border-bottom: #224f77 solid 1px;}
  .aqyh_j_right_f_a .aqyh_j_right_b table tbody,
  .tableStyle tbody{width:100%; height:auto; text-align: center; margin: 0 auto; overflow: hidden;  font-size: 12px; color: #a2d0ec;}
  .aqyh_j_right_f_a .aqyh_j_right_b table tbody tr td,
  .tableStyle tbody tr td{ height:auto;  padding:7px 0;  border-right: #224f77 solid 1px; border-bottom: #224f77 solid 1px;}


  .aqyh_j_right_f_a .aqyh_j_right_b table tbody tr td,
  .aqyh_j_right_f_a .aqyh_j_right_b table thead tr td:first-child,
  .tableStyle tbody tr td,
  .tableStyle thead tr td:first-child{ border-left: #224f77 solid 1px;}
  .aqyh_j_right_c{padding-right:20px;width:100%; height:30px; line-height:30px; text-align: right; margin: 0 auto; overflow: hidden;}

</style>
<script>
  import PageMenu from '../../Common/Paging/PageMenuSingle.vue';
  import $ from 'jquery';
  import {toGetNodesInfo} from '../../../../static/js/OneMap/InfoList/getClickedPid';
  export default{
      data(){
          return{
//保存已打开的选项卡
            arrs:[],
            areaOptionsContent:'全部',
            typeOptionsContent:'',
            timeOptionsContent:'',
            devicedId:'', //设备编号
            //保存当前在最前的选项卡
            cardNow:'',
            tableBox :[],
            tableId:'table_coupon',
            pageId:'page_coupon',
            titleId:'title_coupon',
            leftBar:'aqyh_j_left',
            rightBar:'aqyh_i',
            prefix:'type_',
            searchBtn :'search_now',
            resetBtn:'reset_now',
            searchBar:'aqyh_j_right_d',
            pages:{pageNum:1,total:1,pageSize:6},
            query:"",
            url:'',
            clomnClass:'',
            infoCount:0,
            infoNodes:[],
            loading: true
        }
      },
      computed:{
        infoTable:function(){
            return this.$store.state.infoTable;
        },
        cardBox:function(){
          return  this.$store.state.infoListBox;
        },
        wholeId :function(){
          return this.$store.state.infoList.wholeId;
        },
        tableParentId :function(){
          return this.$store.state.infoList.tableParentId;
        },
        typeClass :function(){
            return this.$store.state.infoList.typeClass;
        },
        urlHead_iot:function(){
            return this.$store.state.infoList.urlHead_iot;
        },
        urlFoot_iot:function(){
          return this.$store.state.infoList.urlFoot_iot;
        },
        urlBox:function(){
          return this.$store.state.infoList.urlBox;
        },
        areaOptions:function(){
          return this.$store.state.infoList.areaOptions;
        },
        areaVideoOptions:function(){
          return this.$store.state.infoList.areaVideoOptions;
        },
        typeOptions:function(){
          return this.$store.state.infoList.typeOptions;
        },
        timeOptions:function(){
          return this.$store.state.infoList.timeOptions;
        },
        tableList:function(){
          return this.$store.state.infoList.tableList;
        },
        ShowInfoList:function(){
          return this.$store.state.ShowInfoList;
        }
      },
      watch:{
          ShowInfoList:{
              handler:function (val, oldVal) {
                  if(val==='no'){
                    this.$store.state.infoList.clickedNode.node={};
                    this.$store.state.infoList.clickedNode.name='';
                    this.$store.state.infoList.clickedNode.txt={};
                    this.$store.state.infoListBox=[];
                  }
              },
              deep:true
          },
          infoTable:{
            handler:function(val, oldVal){
                this.$store.state.infoList.tableList={
                    thead:[],
                    tbody:[]
                };
                if(val){
                  this.$nextTick(function(){  //等待视图加载完成进行
                    this.$store.state.infoList.tableList = val.list;
                    this.pages = val.pages;
                    this.clomnClass = val.clomnClass;
                    this.infoCount = val.pages.pageNumTotal;
                    this.infoNodes = val.nodes;
                    this.loading=false;
                  })
                }
            },
            deep:true
          },
          cardBox:{
            handler:function(val, oldVal){

            },
            deep:true
          },
          areaOptionsContent:{
            handler:function(val, oldVal){
                console.log(val);
              this.$store.state.infoList.areaOptionsContent=val;
            },
            deep:true
          },
          typeOptionsContent:{
            handler:function(val, oldVal){
              this.$store.state.infoList.typeOptionsContent=val
            },
            deep:true
          },
          timeOptionsContent:{
            handler:function(val, oldVal){
              this.$store.state.infoList.timeOptionsContent=val
            },
            deep:true
          },
          wholeId:{
            handler:function(val, oldVal){

            },
            deep:true
          },
          tableParentId :{
            handler:function(val, oldVal){

            },
            deep:true
          },
          clomnClass:{
             handler:function(val, oldVal){

             },
            deep:true
          },
          typeClass :{
            handler:function(val, oldVal){

            },
            deep:true
          },
          urlHead_iot:{
            handler:function(val, oldVal){

            },
            deep:true
          },
          urlFoot_iot:{
            handler:function(val, oldVal){
            },
            deep:true
          },
          urlBox:{
            handler:function(val, oldVal){

            },
            deep:true
          },
          areaOptions:{
            handler:function(val, oldVal){

            },
            deep:true
          },
          areaVideoOptions:{
            handler:function(val, oldVal){

            },
            deep:true
          },
          typeOptions:{
            handler:function(val, oldVal){
            },
            deep:true
          },
          timeOptions:{
            handler:function(val, oldVal){

            },
            deep:true
          }
        },
      methods:{
        async toFocus(index){
              let id = this.infoNodes[index];
              let url =this.$store.state.infoList.applyUrl;
              let ourl = url.slice(0,url.indexOf('pageInfo')) +'selectByExample';

              let nodes = await toGetNodesInfo({id: id,url:ourl});
              if(nodes.length !== 0){
                for(let i=0;i<nodes.length;i++){
                  let point = nodes[i];
                  document.getElementById("iframeGisMap").contentWindow.module.common.mapTool.mapOperate.setMapViewCenter(point.jd, point.wd);
                  document.getElementById("iframeGisMap").contentWindow.module.layerControl.basegeoLayer.featureMapFutian.openFeatureLayerPopup(point.layerid,point.id);
                  document.getElementById("iframeGisMap").contentWindow.module.common.mapTool.mapOperate.setMapViewZoom(6);
                }
              }else{
                  console.log('返回的落图信息为空数组');
              }

        },
        toThePage:function(msg){
          this.$emit('toPage',msg);
        },
        toClose:function(){
          this.$store.state.ShowInfoList='no';
        },
        getIndex:function(box,txt){
          let res=-1;
          for(let i=0;i<box.length;i++){
            if( box[i] === txt){
              res=i;
            }
          }
          return res === -1 ? (-1) : res;
        },
        toShowThis:function(item){
          this.$store.state.infoList.clickedNode.node = item.node;
          let box = this.cardBox;
          let index = this.getIndex(box,item);
          if( index !== -1){
            box.splice(index,1);
            box.splice(0,0,item);
          }else{
            this.$store.state.infoListBox.reverse().push(item);
            this.$store.state.infoListBox.reverse();
          }
//          console.log(this.$store.state.infoListBox);
        }
      },
      components:{
        PageMenu
      }
  }
</script>
