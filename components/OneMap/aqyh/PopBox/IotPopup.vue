<template>
  <div class="aqyh_t">
    <div class="aqyh_t_a">
      <div class="aqyh_t_a_left">
        <span>{{title.name}}</span>
        <span v-if="title.alert_num !=='0'">报警</span>
      </div>
      <div class="aqyh_t_a_right">
        <a title="关闭" @click="toClose"><img src="../../../../static/img/aqyhPop/close.png"/></a>
      </div>
    </div>
    <div class="aqyh_t_b" @click="toCollapse(1)">
      基本信息
    </div>
    <div class="aqyh_t_c" v-show="showBasic">
      <ul>
        <li v-for="(item,index) in basicBox" :key="index">
          <span v-if="item[0].indexOf('<hr/>')!==-1" v-html="item[0]"></span><span v-else>{{item[0]}}</span>
          <span>:</span>
          <span v-if="item[0].indexOf('<hr/>')!==-1" v-html="item[1]"></span><span v-else>{{item[1]}}</span>
        </li>
      </ul>
    </div>
    <div class="aqyh_t_b" @click="toCollapse(2)">
      指标检测详情
    </div>
    <div class="aqyh_t_d" v-show="showDetail">
      <ul>
        <li v-for="(item, index) in alertBox" :key="index">
          <div class="aqyh_t_d_a" @click="toOpenPageInfo(item)">
            <img v-if="item.src === '1'" src="../../../../static/img/aqyhPop/env_smog.png"/>
            <img v-else-if="item.src === '2'" src="../../../../static/img/aqyhPop/elect_leakage.png"/>
            <img v-else-if="item.src === '3'" src="../../../../static/img/aqyhPop/elect.png"/>
            <img v-else-if="item.src === '4'" src="../../../../static/img/aqyhPop/temp.png"/>
            <img v-else-if="item.src === '5'" src="../../../../static/img/aqyhPop/voltage.png"/>
            <img v-else-if="item.src === '6'" src="../../../../static/img/aqyhPop/smoke_loop.png"/>
          </div>
          <p v-if="item.isalert"></p>
          <div class="aqyh_t_d_b">{{item.name}} </div>
        </li>
      </ul>
    </div>
    <div class="aqyh_t_b" @click="toCollapse(3)">
      报警列表
      <p class="list_total"><span>共</span><span>{{pageInfo.total}}</span><span>项</span></p>
    </div>
    <div class="aqyh_t_e" v-show="showTable">
      <table>
        <thead>
        <tr>
          <td>序号</td>
          <td v-for="(a,b) in alertTable.thead" :key = 'b'>{{a}}</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(c,d) in alertTable.tbody" :key ='d'>
          <td>{{(Number(pageInfo.pageNum) - 1) * Number(pageInfo.pageSize) + d + 1}}</td>
          <td  v-for="(e,f) in c" :key="f" :class="e ==='异常' ? 'aqyh_t_e_a' : ''">
            <span v-if="typeof e ==='string'">{{e}}</span>
            <p v-else><span>{{e.name}}</span><a :href="e.href" title="查看详细">查看详细</a></p>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="aqyh_t_f" v-show="showTable">
      <page-Menu :page="pageInfo" @toPage="toChangePage"></page-Menu>
    </div>
  </div>
</template>
<style scoped>
  /*导航栏的特殊样式*/
  ::-webkit-scrollbar{width:16px;height:16px;}
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb{border-radius:999px;border:4px solid transparent;}
  ::-webkit-scrollbar-track{box-shadow:1px 1px 5px rgba(185,165,150,.2) inset;}
  ::-webkit-scrollbar-thumb{min-height:20px;background-clip:content-box;box-shadow: 0 0 0 5px rgba(25,109,180,0.5) inset;}
  ::-webkit-scrollbar-corner{/*background:transparent;*/}

  .aqyh_t{width:100%; height:auto; text-align: left; margin: 0 auto;  padding: 15px 0; overflow: hidden; background-color: rgba(2,22,35,0.8); box-shadow:0 0 5px #1c609d; border:1px solid #1c609d; border-radius: 5px;}
  .aqyh_t_a{width:95%; height:35px; text-align: left; margin: 0 auto;position: relative;}
  .aqyh_t_a_left{width:100%; height:100%; text-align: left; display: block;  font-size: 24px; color: #7af3ff;border-bottom:1px solid #196db4;}
  .aqyh_t_a_left span{display: inline-block;vertical-align:bottom;  width:auto;height:auto;}
  .aqyh_t_a_left span:nth-child(2){ padding:0 15px; font-size: 16px; color: #ffffff; height:20px; margin-left:15px;background-color: #df0000; border-radius:3px;}
  .aqyh_t_a_right{cursor: pointer;width:24px; height:24px;  display: block;  position: absolute;  left:100%; top:50%;margin-left: -30px;margin-top: -12px;}
  .aqyh_t_a_right img{width:100%;display: block; height:100%; }

  .aqyh_t_b{position:relative;width:95%; height:35px; line-height: 35px;  text-align: left; margin:15px auto 0 auto; padding:0 0 0 15px;  border: rgba(25,109,180,0.8) solid 1px; background-color: rgba(25,109,180,0.5); border-radius:5px; font-size: 16px; color:#c1e9ff;}
  .aqyh_t_b .list_total{ position: absolute;left:15%;  top:50%; margin-top: -17.5px;font-size: 16px; color:#60b6ff;}
  .aqyh_t_c{width:95%; height:auto; text-align: left; margin: 10px auto 0 auto; padding: 0; border: rgba(25,109,180,0.8) solid 1px; font-size: 18px; color: #666666;}

  .aqyh_t_c ul{width:790px; height:144px; line-height: 36px;  text-align: left; margin: 0 auto; overflow: hidden;}
  .aqyh_t_c ul li{display:inline-block;vertical-align:middle;width:48%; height:36px;  text-align: left; margin: 0 auto;   overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .aqyh_t_c ul li:nth-child(odd){ margin-right: 30px;}
  .aqyh_t_c ul li span{ display: inline-block; vertical-align: middle; font-size: 16px;color:#7af3ff;}
  .aqyh_t_c ul li span:nth-child(2){margin: 0 10px 0 6px;}

  .aqyh_t_c_left{width:80px; height:36px; line-height: 36px;  text-align: left; margin: 0 auto; float: left; display: inline; overflow: hidden;}
  .aqyh_t_c_right{width:300px; height:36px; line-height: 36px;  text-align: left; margin: 0 auto; float: left; display: inline; overflow: hidden;}

  .aqyh_t_d{width:95%;margin: 15px auto 0 auto; height:90px; text-align: left;  overflow: hidden; border: rgba(25,109,180,0.8) solid 1px; font-size: 18px; color: #666666;}
  .aqyh_t_d ul{width:100%; height:90px; margin:0;overflow-y: auto;overflow-x:hidden;padding:10px 0;}
  .aqyh_t_d ul li{width:auto; height:100%;  text-align: center; margin: 0 15px 15px 15px;  display: inline-block; vertical-align: middle;position: relative;}
  .aqyh_t_d ul li p{position: absolute; left:100%;  top:0;margin-left:0;background-color:#ff0000;width: 10px;height:10px; -webkit-border-radius:10px;  -moz-border-radius:10px; border-radius:10px;}
  .aqyh_t_d ul li .aqyh_t_d_a{width:100%; height:40px; text-align: center;margin: 0 auto; overflow: hidden;}
  .aqyh_t_d ul li .aqyh_t_d_a img{width: 39px; height: 39px; margin: 0 auto;display: block;}
  .aqyh_t_d ul li .aqyh_t_d_b{width:auto; height:30px; text-align: center;margin: 10px auto 0 auto; font-size: 16px; color: #7af3ff;overflow: hidden;text-overflow: ellipsis; white-space: nowrap;}

  .aqyh_t_e{width:95%; height:auto; text-align: left; margin: 10px auto 0 auto;max-height: 255px; overflow-x: hidden;overflow-y: auto; }
  .aqyh_t_e table{width:100%; height:auto;text-align: center; margin: 0 auto;  border:transparent solid 1px; border-collapse: collapse;}
  .aqyh_t_e table thead{width:100%; height:40px; text-align: center; margin: 0 auto; overflow: hidden; font-size: 14px; color: #7af3ff; background-color: transparent;}
  .aqyh_t_e table thead tr td{width:auto; height:52px;}
  .aqyh_t_e table tbody{width:100%; height:auto; text-align: center; margin: 0 auto; overflow: hidden;  font-size: 14px; color: #5fb6ff;}
  .aqyh_t_e table tbody tr td{width:auto; height:55px;}
  .aqyh_t_e table thead tr td,
  .aqyh_t_e table tbody tr td{border: rgba(25,109,180,0.8) solid 1px;}
  .aqyh_t_e_a{font-size: 16px; color: #ff1e00;}
  .aqyh_t_e table tbody tr td p{ padding:0; margin:0;text-align: center;}
  .aqyh_t_e table tbody tr td p span,
  .aqyh_t_e table tbody tr td p a{display: block;}
  .aqyh_t_e table tbody tr td p a{text-decoration: none; color: #4e88ff;font-size: 14px;}
  .aqyh_t_e_b a{font-size: 16px; color: #4e88ff; display: block; }
  .aqyh_t_f{width:95%; height:40px; line-height:40px;text-align: right; margin: 0 auto; overflow: hidden;}
</style>
<script>
  import {getPopUp_Iot_yanwu_summaryInfo,getPopUp_Iot_yanwu_detail,getPopUp_Iot_yanwu_pageInfo,
    getPopUp_Iot_dianqihuozaijiance_summaryInfo,getPopUp_Iot_dianqihuozaijiance_detail, getPopUp_Iot_dianqihuozaijiance_pageInfo,
    getPopUp_Iot_yilaodian_summaryInfo,getPopUp_Iot_yilaodian_detail,getPopUp_Iot_yilaodian_pageInfo} from '../../../../api/secapi';
  import PageMenu from '../../Common/Paging/PageMenuSingle.vue';
  export default{
      data(){
          return{
              showBasic:true,
              showDetail:true,
              showTable:false,
              title:{
                  name:'',
                  alert_num:'0'
              },
              pageInfo:{
                  pageSize:4,
                  pageNum: 1,
                  total:0
              },
              detailsItem:{},
              oalarm_num:'',
              alertBox:[/*
               {src:1, name:'环境烟雾报警1',isalert:true},
               {src:2, name:'环境烟雾报警2',isalert:true},
               {src:5, name:'环境烟雾报警2',isalert:true},
               {src:1, name:'环境烟雾报警1',isalert:true},
               {src:4, name:'环境烟雾报警2',isalert:true},
               {src:2, name:'环境烟雾报警2',isalert:true},
               {src:6, name:'环境烟雾报警1',isalert:true},
               {src:2, name:'环境烟雾报警2',isalert:true},
               {src:3, name:'环境烟雾报警2',isalert:true}*/ ],
              basicBox:[/*
                {name:'属性1',value:'属性1的值'},
                {name:'属性1',value:'属性1的值'},
                {name:'属性1',value:'属性1的值'},
                {name:'属性1',value:'属性1的值'}*/ ],
              alertTable:{ /*thead:['时间','设备编码', '监测名称',  '设备类型', '事件名称', '事件类型', '事件等级', '状态', '处置环节'],
                  tbody:[
                      ['','','','','','','','异常',{name:'状态A',href:'' }],
                      ['','','','','','','','正常',{name:'状态B',href:'' }]
                  ]*/},
            flag:'',
            nodeid:''
          }
      },
      // computed:{
      //   flag(){
      //     return this.$store.state.ShowIotPopup;
      //   },
      //   nodeid(){
      //       return this.$store.state.detailMessageNodeId;
      //   }
      // },
    mounted(){
      this.flag = this.$store.state.ShowIotPopup;
      this.nodeid = this.$store.state.detailMessageNodeId;
    },
      watch:{
        pageInfo:{
          handler:function(){},
          deep:true
        },
        nodeid:{
          handler:function(){},
          deep:true
        },
        alertBox:{
          handler:function(){},
          deep:true
        },
        basicBox:{
            handler:function(){},
            deep:true
        },
        alertTable:{
          handler:function(){},
          deep:true
        },
        flag:{
          handler:function(val,oldVal){
            if(val){
              if(val === 'yes'){
                let oid = this.$store.state.detailMessageId;
                this.wholeId =oid;
                this.getData(oid);
              }
            }
          },
          deep:true
        }
      },
      methods:{
        toChangePage:function(msg){

        },
        async toOpenPageInfo(item){
            let nodeid = this.nodeid,c;
            this.detailsItem = item;
            let opageNum = this.pageInfo.pageNum ||1;
            let opageSize =this.pageInfo.pageSize || 4;
            if(nodeid.indexOf('yilaodian')!==-1){
              c= await  getPopUp_Iot_yilaodian_pageInfo({id:item.device_code,pageNum:opageNum,pageSize:opageSize,code:item.ENCODE_DATA});
            }else if(nodeid.indexOf('yanwu')!==-1){
              c= await  getPopUp_Iot_yanwu_pageInfo({id:item.device_code,pageNum:opageNum,pageSize:opageSize,code:item.ENCODE_DATA});
            }else if(nodeid.indexOf('dianqi')!==-1){
              c= await  getPopUp_Iot_dianqihuozaijiance_pageInfo({id:item.device_code,pageNum:opageNum,pageSize:opageSize,code:item.ENCODE_DATA});
            }
            if(c !==''||c !=={}){
                this.showTable = true;
                this.pageInfo.pageNum = c.pageNum;
                this.pageInfo.total =  c.pages;
                this.alertTable = c.list || [];
            }
        },
        async getData(id){
            let nodeid = this.nodeid;
            let odata={},a,b,c;
            if(nodeid.indexOf('yilaodian')!==-1){
                a= await  getPopUp_Iot_yilaodian_summaryInfo({id:id});
                b= await  getPopUp_Iot_yilaodian_detail({id:id});
            }else if(nodeid.indexOf('yanwu')!==-1){
                a= await  getPopUp_Iot_yanwu_summaryInfo({id:id});
                b= await  getPopUp_Iot_yanwu_detail({id:id});
            }else if(nodeid.indexOf('dianqi')!==-1){
                a= await  getPopUp_Iot_dianqihuozaijiance_summaryInfo({id:id});
                b= await  getPopUp_Iot_dianqihuozaijiance_detail({id:id});
            }
            if(a!=='' && a!=={}){
              odata.a = a;
              this.title.name = odata.a.title||'';
              this.title.alert_num = odata.a.info_alert ||'0';
              this.basicBox = [].concat(odata.a.value) ||[];
            }
            if(b!==''||b!=={}){
              odata.b = b;
              this.alertBox=[];
              let c,d,e,f;
              for(let i=0;i<odata.b.length;i++){
                  if(odata.b[i].ENCODE_DATA&&odata.b[i].ENCODE_DATA!=='异常' && odata.b[i].ENCODE_DATA!==''){
                      c= odata.b[i].ENCODE_DATA.charAt(odata.b[i].ENCODE_DATA.length-1);
                  }else{
                      c='1'
                  }
                  if(odata.b[i].DataName && odata.b[i].DataName !=='异常'){
                      d = odata.b[i].DataName;
                  }else{
                      d='异常';
                  }
                  if(odata.b[i].ENCODE_DATA &&odata.b[i].ENCODE_DATA !=='异常'){
                      e = odata.b[i].ENCODE_DATA;
                  }else{
                      e='异常'
                  }
                  if(odata.b[i].device_code && odata.b[i].device_code!=='异常'){
                      f = odata.b[i].device_code;
                  }else{
                      f='异常';
                  }
                  if(e==='异常' && f==='异常'){
                      this.showDetail =false;
                      this.alertBox={};
                  }else{

                    this.showDetail =true;
                    this.alertBox.push({
                      src :c,
                      name:d,
                      isalert:odata.b[i].alarm || false,
                      ENCODE_DATA:e,
                      device_code:f
                    });
                  }

              }
            }

        },
        toClose:function(){
          this.$store.state.ShowIotPopup ='no';
        },
        toCollapse:function(index){
            console.log(1234);
            if(index === 1){
                this.showBasic = !this.showBasic;
            }else if(index ===2){
                this.showDetail = !this.showDetail;
            }else{
                this.showTable = !this.showTable;
            }
        }
      },
      components:{
        PageMenu
      }
  }
</script>
