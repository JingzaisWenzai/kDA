<template>
  <div id="related" class="yinhuan_related">
    <div class="title">
      <a class="content"><i></i> <span>{{title}}</span></a>
      <span class="close" @click="toClose"></span>
    </div>
    <div class="navBar">
      <ul>
        <li :class=" contentBox  === index?'active':''" v-for="(item , index) in navBar" :key = 'index' @click="toChangeNav(index)">{{item}}</li>
      </ul>
    </div>

    <div class="related-table" v-if="contentBox === 0">
      <ul v-for="(a , b) in cardBox" :key ='b'>
        <p>{{a.name}}</p>
        <li v-for="(c , d) in a.data" :key='d'><span>{{c.name}}</span><span>:</span><span>{{c.value}}</span></li>
      </ul>
    </div>
    <div class="related-table" v-else-if=" contentBox === 1">
      <ul>
        <li v-for="(value, key, index) in cardBox_obj" :key='index'><span>{{key}}</span><span>:</span><span>{{value}}</span></li>
      </ul>
    </div>
    <div class="related-table" v-else-if ="contentBox === 2">
      <div class="the-line">
        <a><span>{{lineBar.title1.name}}</span><span>:</span><span>{{lineBar.title1.value}}</span></a>
        <a><span>{{lineBar.title2.name}}</span><span>:</span><span>{{lineBar.title2.value}}</span></a>
        <a><span>{{lineBar.title3.name}}</span><span>:</span><span>{{lineBar.title3.value}}</span></a>
      </div>
      <div class="the-table">
        <table v-loading="loading">
          <thead>
          <tr>
            <td>序号</td>
            <th v-for="(e,f) in tableBox.thead" :key="f"> {{e}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for ='(g,h) in tableBox.tbody' :key="h">
            <td>{{h + 1}}</td>
            <td v-for="(i,o) in g" :key="o">{{i}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="the-page">
        <build-page :page="pageInfo" @toPage="toChangePage"></build-page>
      </div>
    </div>
    <div class="related-table" v-else-if=" contentBox === 3">
      <div class="the-line">
        <a><span>{{lineBar.title4.name}}</span><span>:</span><span>{{lineBar.title4.value}}</span></a>
      </div>
      <div class="the-table c_c_b_b">
        <table v-loading="loading">
          <thead>
            <tr>
              <td v-for="(item,index) in tableBoxMulti.thead" :key="index">{{item}}</td>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td rowspan="6">
              <div class="c_c_b_b_a">建筑基础属性</div>
              <div class="c_c_b_b_b">10%</div>
            </td>
            <td>建筑年龄</td>
            <td>45.0</td>
            <td>13</td>
          </tr>
          <tr>
            <td>建筑高度</td>
            <td>55.0</td>
            <td>60.0</td>
          </tr>
          <tr>
            <td>耐火等级</td>
            <td>10.0</td>
            <td>1</td>
          </tr>
          <tr>
            <td>建筑面积</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>人口密度</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>老人小孩占比</td>
            <td>--</td>
            <td>--</td>
          </tr>

          <tr>
            <td rowspan="5">
              <div class="c_c_b_b_a">安全管理水平</div>
              <div class="c_c_b_b_b">20%</div>
            </td>
            <td>火灾报警器情况</td>
            <td>32.0</td>
            <td>13</td>
          </tr>
          <tr>
            <td>消防控制室</td>
            <td>0.0</td>
            <td>1</td>
          </tr>
          <tr>
            <td>消防设备完好度</td>
            <td>60.0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>消防巡查</td>
            <td>100.0</td>
            <td>0</td>
          </tr>
          <tr>
            <td>是否火灾史</td>
            <td>--</td>
            <td>--</td>
          </tr>

          <tr>
            <td rowspan="4">
              <div class="c_c_b_b_a">隐患巡查</div>
              <div class="c_c_b_b_b">20%</div>
            </td>
            <td>A类建筑隐患数量</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>B类建筑隐患数量</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>C类建筑隐患数量</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>隐患等级</td>
            <td>--</td>
            <td>--</td>
          </tr>

          <tr>
            <td rowspan="3">
              <div class="c_c_b_b_a">周边环境</div>
              <div class="c_c_b_b_b">20%</div>
            </td>
            <td>季节与降雨强度</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>温度与湿度</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>交通拥堵指数</td>
            <td>--</td>
            <td>--</td>
          </tr>

          <tr>
            <td rowspan="5">
              <div class="c_c_b_b_a">周边危险品分布</div>
              <div class="c_c_b_b_b">20%</div>
            </td>
            <td>危险品生产单位</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>危险品零售点</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>加油/加气站</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>危险品储存点</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>危险品运输车辆</td>
            <td>--</td>
            <td>--</td>
          </tr>

          <tr>
            <td rowspan="6">
              <div class="c_c_b_b_a">社会消防管理能力</div>
              <div class="c_c_b_b_b">20%</div>
            </td>
            <td>社会消防抢险人员密度</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>基础网格员人员密度</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>消防专业网员人员密度</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>摄像头密度</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>消防站密度</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>专职消防员密度</td>
            <td>--</td>
            <td>--</td>
          </tr>

          <tr>
            <td rowspan="6">
              <div class="c_c_b_b_a">消防救援能力</div>
              <div class="c_c_b_b_b">20%</div>
            </td>
            <td>沙土存储量</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>干冰存储量</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>消防车密度</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>消防取水点</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>天然水源取水点</td>
            <td>--</td>
            <td>--</td>
          </tr>
          <tr>
            <td>消防栓密度</td>
            <td>--</td>
            <td>--</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="related-table" v-else-if="contentBox === 4"> <!--建筑隐患信息-->
      <div class="the-table">
        <table>
          <thead>
          <tr>
            <th>序号</th>
            <th v-for="(e,f) in tableBox.thead" :key="f"> {{e}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for ='(g,h) in tableBox.tbody' :key="h">
            <td>{{h + 1}}</td>
            <td v-for="(i,o) in g" :key="o">{{i}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="the-page">
        <build-page :page="pageInfo" @toPage="toChangePage"></build-page>
      </div>
    </div>
    <div class="related-table" v-else-if="contentBox === 5">   <!--建筑平平面纸-->
      <div class="imgBox">
        <img :src="listBox.imgSrc"  @click="toMagnifying(listBox.imgSrc)"/>
      </div>
      <div class="listBox">
        <a v-for="(value,key,index) in listBox.list" :key="index"><span :title="key">{{key}}</span><span>:</span><span :title="value">{{value}}</span></a>
      </div>
    </div>
  </div>
</template>
<script>
  import BuildPage from '../../Common/Paging/PageMenuPopup.vue';
  import {getPopUp_BuildingRisk_basic,getPopUp_BuildingRisk_duty,getPopUp_BuildingRisk_plain,getPopUp_BuildingRisk_risk,popup_BuildingRisk_hidden_danger, getPopUp_BuildingRisk_enterprise} from '../../../../api/secapi';
  import img_404 from '../../../../static/img/aqyhPop/404.png';

  export default{
      data(){
          return {
              title:'',
              navBar:['基本信息','责任信息','企业信息','建筑风险','隐患信息','建筑平面图纸'],
              contentBox:0,
              cardBox:[],
              cardBox_obj:{},
              tableBox:{
                  thead:[],
                  tbody:{}
              },
              wholeId:'',
              pageInfo:{
                  pageNum:1,
                  pageSize:4,
                  total:1
              },
              lineBar:{
                  title1:{name:'实有法人',value:''},
                  title2:{name:'注册法人',value:''},
                  title3:{name:'其他',value:''},
                  title4:{name:'建筑风险评分（总分）',value:''}
              },
              tableBoxMulti:{
                  thead:[],
                  tbody:[]
              },
              listBox:{
                  imgSrc:'http://10.190.55.58:8081/img/build-sz-web/content/upload/2016-06-20/733f4ff4-5b3c-4f32-9a7d-4973bd6c6887.jpg',
                  list:[]
              }
          }
      },
      computed:{
        flag(){
          return this.$store.state.ShowYinHuan;
        }
      },
      watch:{
        flag:{
          handler:function(val,oldVal){
              if(val){
                if(val==='yes'){
                  let oid = this.$store.state.detailMessageId;
                  this.wholeId=oid;
                  this.getData(oid, this.contentBox);
                }
              }
          },
          deep:true
        },
        pageInfo:{
          handler:function(val,oldVal){},
          deep:true
        },
        cardBox:{
            handler:function(val,oldVal){},
            deep:true
        },
        tableBox:{
          handler:function(val,oldVal){},
          deep:true
        },
      },
      methods:{
        async getData(id,nav){
            let odata,data;
          if(nav === 0){ /*基本信息*/
            odata = await getPopUp_BuildingRisk_basic({id:id});
            if(odata!=={}){
              this.title = odata.name;
              this.cardBox = [].concat(odata.data) || [];
            }
          }else if(nav ===1){ /*责任信息*/
            odata = await getPopUp_BuildingRisk_duty({id:id});
            data = odata;
            if(data!=={}){
              this.cardBox_obj = data ||{};
            }
          }else if(nav === 2){  /*建筑企业信息*/
            odata = await getPopUp_BuildingRisk_enterprise({id:id,pageNum:this.pageInfo.pageNum,pageSize:this.pageInfo.pageSize});
            data = odata;
            if(data !=={}){
              this.lineBar.title1.value = data.legalPerson ===''?'0':data.legalPerson;
              this.lineBar.title2.value = data.registerLegalPerson===''?'0': data.registerLegalPerson;
              this.lineBar.title3.value = data.otherPerson===''?'0':data.otherPerson;
              if(data.alarmList){
                this.pageInfo.pageNum = data.alarmList.pageNum || 1;
                this.pageInfo.total = data.alarmList.pages || 1;
                if(data.alarmList.list.length!==0){
                  let arr = data.alarmList.list;
                  let thead=['企业名称','企业类型','法人代表','更新时间'];
                  let tbody=[],res;
                  for(let i=0;i<arr.length;i++){
                    res=[];
                    res.push(arr[i]['企业名称']);
                    res.push(arr[i]['企业类型']);
                    res.push(arr[i]['法人代表']);
                    res.push(arr[i]['更新时间']);
                    tbody.push(res);
                  }
                  this.tableBox.thead=[].concat(thead)||[];
                  this.tableBox.tbody=[].concat(tbody)||[];
                }
              }
            }
          }else if(nav === 3){  /*建筑风险*/
            odata = await  getPopUp_BuildingRisk_risk({id:id,pageNum:this.pageInfo.pageNum,pageSize:this.pageInfo.pageSize});
            data = odata;
            if(data!=={}){
                this.lineBar.title4.value = data.scoreTotle ||'';
                this.tableBoxMulti.thead=['评分维度','评分项','分数','实际数值'];
              $(".c_c_b_b table tbody tr:eq(0) td:eq(-2)").text(data.basic[0].buildAge.score || '--');
              $(".c_c_b_b table tbody tr:eq(0) td:eq(-1)").text(data.basic[0].buildAge.value || '--');
              $(".c_c_b_b table tbody tr:eq(1) td:eq(-2)").text(data.basic[0].buildHeight.score || '--');
              $(".c_c_b_b table tbody tr:eq(1) td:eq(-1)").text(data.basic[0].buildHeight.value || '--');
              $(".c_c_b_b table tbody tr:eq(2) td:eq(-2)").text(data.basic[0].buildGrade.score || '--');
              $(".c_c_b_b table tbody tr:eq(2) td:eq(-1)").text(data.basic[0].buildGrade.value || '--');

              $(".c_c_b_b table tbody tr:eq(6) td:eq(-2)").text(data.buildSecurity[0].fireAlarm.score || '--');
              $(".c_c_b_b table tbody tr:eq(6) td:eq(-1)").text(data.buildSecurity[0].fireAlarm.value || '--');
              $(".c_c_b_b table tbody tr:eq(7) td:eq(-2)").text(data.buildSecurity[0].fireControlRoom.score || '--');
              $(".c_c_b_b table tbody tr:eq(7) td:eq(-1)").text(data.buildSecurity[0].fireControlRoom.value || '--');
              $(".c_c_b_b table tbody tr:eq(8) td:eq(-2)").text(data.buildSecurity[0].fireEquipment.score || '--');
              $(".c_c_b_b table tbody tr:eq(8) td:eq(-1)").text(data.buildSecurity[0].fireEquipment.value || '--');
              $(".c_c_b_b table tbody tr:eq(9) td:eq(-2)").text(data.buildSecurity[0].firePatrol.score || '--');
              $(".c_c_b_b table tbody tr:eq(9) td:eq(-1)").text(data.buildSecurity[0].firePatrol.value || '--');
              $(".c_c_b_b table tbody tr:nth-child(17) td:eq(-2)").text(data.buildSurroundingEnvironment[0].ws.score || '--');
              $(".c_c_b_b table tbody tr:nth-child(17) td:eq(-1)").text(data.buildSurroundingEnvironment[0].ws.value || '--');
              $(".c_c_b_b table tbody tr:nth-child(18) td:eq(-2)").text(data.buildSurroundingEnvironment[0].temperatureDifference.score || '--');
              $(".c_c_b_b table tbody tr:nth-child(18) td:eq(-1)").text(data.buildSurroundingEnvironment[0].temperatureDifference.value || '--');
            }
          }else if(nav === 4){  /*建筑隐患信息*/
            odata = await  popup_BuildingRisk_hidden_danger({id:id,pageNum:this.pageInfo.pageNum,pageSize:this.pageInfo.pageSize});
            data = odata;
            this.tableBox = data.list;
            this.pageInfo.pageNum = data.pageNum;
            this.pageInfo.total = data.pages;
          }else if(nav === 5){  /*建筑平面图纸*/
            odata = await  getPopUp_BuildingRisk_plain({id:id,pageNum:this.pageInfo.pageNum,pageSize:this.pageInfo.pageSize});
            data = odata;
            if(data){
              this.listBox.imgSrc = data.name!=='未找到'&& data.name!==''? data.name : img_404;  //图片的地址
              this.listBox.list =  data.data;  //图片的属性介绍
            }
          }
        },
        toClose:function(){
          this.$store.state.ShowYinHuan ='no';
        },
        toChangeNav:function(index){
            this.contentBox = index;
            this.pageInfo.pageSize=4;
            this.pageInfo.pageNum =1;
            this.getData(this.wholeId, this.contentBox);
        },
        toChangePage:function(msg) {
            this.pageInfo.pageNum = msg;
            this.getData(this.wholeId,this.contentBox);
        },
        toMagnifying:function(src){
            this.$store.state.ShowImgBoxSrc = src;
            this.$store.state.ShowImgBox ='yes';
        }
      },
      components:{
          BuildPage
      }
  }
</script>
<style scoped>
  ::-webkit-scrollbar{width:16px;height:16px;}
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb{border-radius:999px;border:4px solid transparent;}
  ::-webkit-scrollbar-track{box-shadow:1px 1px 5px rgba(185,165,150,.2) inset;}
  ::-webkit-scrollbar-thumb{min-height:20px;background-clip:content-box;box-shadow: 0 0 0 5px rgba(25,109,180,0.5) inset;}
  ::-webkit-scrollbar-corner{/*background:transparent;*/}

  .yinhuan_related{ background-color: rgba(2,22,35,0.8); box-shadow:0 0 5px #1c609d; border:1px solid #1c609d; border-radius: 5px;
    width: 100%;  height: 100%;    z-index: 3; padding-bottom: 15px;}
  .yinhuan_related .title{ width:95%; height: auto; margin:0 auto;  text-align: right;   position: relative; }
  .yinhuan_related .title a.content{
    display:  block;
    width: 100%;
    height:50px;
    margin: 0 auto;
    text-align: left;
    line-height: 50px;
  }
  .yinhuan_related .title a.content i,
  .yinhuan_related .title a.content span{
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    color: #5fb6ff;
  }
  .yinhuan_related .title a.content span{
    padding-left: 15px;
  }
  .yinhuan_related .title a.content i{
    width:24px;
    height:24px;
    background: url('../../../../static/img/aqyhPop/address.png') no-repeat center;
    background-size: contain;
  }
  .yinhuan_related .title .close{
    cursor:pointer;
    display: block;
    position: absolute;
    left:100%;
    top:50%;
    margin-left: -30px;
    margin-top: -12px;
    width:24px;
    height:24px;
    background: url('../../../../static/img/aqyhPop/close.png') center no-repeat;
    background-size: contain;
  }
  .yinhuan_related .related-echart,
  .yinhuan_related .related-table,
  .yinhuan_related .navBar{  width:95%;  margin:15px auto 0 auto;}
  .yinhuan_related .related-echart{
    height:350px;
    border:1px solid #345167;
    background-color: transparent;
  }
  .yinhuan_related .navBar{max-height: 40px;height:40px;overflow: hidden;}
  .yinhuan_related .navBar ul{padding:0;text-align: left;margin: 0;display: block;overflow-y:auto;overflow-x:hidden;width:100%;height:100%; border:1px solid #345167;border-radius: 5px;}
  .yinhuan_related .navBar ul li{cursor:pointer;display: inline-block;vertical-align: middle;width: auto; height:100%; color: rgba(0,252,255,0.5);font-size: 15px;
    padding:10px 20px;background-color: transparent;}
  .yinhuan_related .navBar ul li:hover,.yinhuan_related .navBar ul li.active{ color: #ffffff;background-color: #196db4; }


  .yinhuan_related .related-table{ height:355px; overflow: hidden;  }
  .yinhuan_related .related-table ul{
    padding-bottom:3px;margin:15px 0 0 0; width: 100%;display: block;
    border:1px solid #1a3d58;height: auto;
  }
  .yinhuan_related .related-table ul p{
    display: block;width: 100%;text-align: left;padding: 10px 0 10px 15px;color: #00fcff;font-size: 15px;
  }
  .yinhuan_related .related-table ul li{
    display: inline-block;vertical-align: middle;
    width: 48%;text-align: left;
    padding:6px 0 6px 15px;
  }
  .yinhuan_related .related-table ul li span{
    display: inline-block;vertical-align: middle;max-width: 70%;
    overflow: hidden;white-space: nowrap; text-overflow: ellipsis;
    color: #00fcff;font-size: 14px;
  }
  .yinhuan_related .related-table ul li span:nth-child(2){margin-left: 8px;margin-right: 10px;}
  .yinhuan_related .related-table ul li span:nth-child(3){ color:  #a2d0ec; }

  .yinhuan_related .related-table table{
    display: block;border-collapse: collapse;
    border:1px solid transparent;
  }
  .yinhuan_related .related-table table tr th,
  .yinhuan_related .related-table table tr td{
    background-color: transparent;
    color: #a2d0ec;
    font-size: 12px;
    width: 300px;
    border:1px solid #1a3d58;
    padding:10px 0;
    text-align: center;
  }
  .yinhuan_related .related-table table thead  tr th{
    color:#00fcff;
  }
  .yinhuan_related .related-table .the-table{
    width:100%;
    height:250px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .yinhuan_related .related-table .the-page{
    width:100%;
    text-align: right;
    margin-top: 15px;
  }
  .yinhuan_related .related-table .the-line{
    width:100%;
  }
  .yinhuan_related .related-table .the-line a{
    display: inline-block;
    vertical-align: middle;
    width:auto;
    margin-right: 10px;
  }
  .yinhuan_related .related-table .the-line a span{
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    color:#7af3ff;
    padding:15px 0;
  }
  .yinhuan_related .related-table .the-line a span:nth-child(2){
    margin:0 8px 0 5px;
  }
  .yinhuan_related .related-table .imgBox,
  .yinhuan_related .related-table .listBox{
      display: inline-block;vertical-align: middle;
  }
  .yinhuan_related .related-table .imgBox{
    width: 58%;
    height:100%;
  }
  .yinhuan_related .related-table .imgBox img{cursor:pointer; display: block;width: 90%; height: 100%;max-height: 100%;max-width:100%;
    margin: 0 auto;}
  .yinhuan_related .related-table .listBox{width:40%;height:calc(100% - 2px); padding:15px 8px; border:1px solid #196db4;}
  .yinhuan_related .related-table .listBox a{display:block;width:95%;margin: 0 auto;text-align: left; padding:6px 0;}
  .yinhuan_related .related-table .listBox a span{display: inline-block;vertical-align: middle;width: auto;color: #7af3ff;font-size: 14px;}
  .yinhuan_related .related-table .listBox a span:nth-child(2){margin:0 8px 0 6px;}
  .yinhuan_related .related-table .listBox a span:nth-child(3){color: #a2d0ec;}
</style>
