<template>
  <div class="aqyh_n">
    <div class="aqyh_n_a">
      <div class="aqyh_n_a_left">
        <img src="../../../../static/img/aqyhPop/yxjc_247.png"/>
      </div>
      <div class="aqyh_n_a_middle">
        <span>{{Title.name}}</span>
        <span>共</span>
        <span>{{Title.total}}</span>
        <span>条</span>
      </div>
      <div class="aqyh_n_a_right">
        <a @click="toClose()" title="关闭"><img src="../../../../static/img/aqyhPop/close.png"/></a>
      </div>
    </div>
    <div class="aqyh_n_b">
      <div class="card" v-for="(item,index) in TriBox" :key="index">
        <p class="rank">{{index + 1 }}</p>
        <div class="listBox">
          <a v-for="(a,b) in item.data" :key="b"><span>{{a.name}}</span><span>:</span><span :title="a.value">{{a.value}}</span></a>
        </div>
        <div class="tip" :class="item.level ===1 ?'A' : (item.level === 2 ?'B':'C')"></div>
      </div>
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

  .aqyh_n{width:100%; height:100%;  text-align: left;overflow: hidden; background-color: rgba(2,22,35,0.8); box-shadow:0 0 5px #1c609d; border:1px solid #1c609d; border-radius: 5px;}
  .aqyh_n_a{ position: relative;width:90%; height:50px; margin: 0 auto;  line-height: 50px; border-bottom: #345167 solid 1px; text-align: left;  overflow: hidden;}
  .aqyh_n_a_left,
  .aqyh_n_a_middle{display: inline-block;vertical-align: middle;}
  .aqyh_n_a_left{width:24px; height:24px;}
  .aqyh_n_a_left img{display: block;width: 100%;height:100%; line-height: 1;}
  .aqyh_n_a_middle{padding-left:20px;width:calc(100% - 30px); height:100%;  text-align: left;  font-size: 16px; color: #ff0000;}
  .aqyh_n_a_middle span{display: inline-block;vertical-align: bottom;}
  .aqyh_n_a_middle span:nth-child(1){font-size: 24px; color: #5fb6ff;margin-right: 15px;}
  .aqyh_n_a_right{cursor:pointer;width:24px; height:24px;  position:absolute;left:100%; top:50%; margin-left:-30px;margin-top:-12px;}

  .aqyh_n_b{width:90%; height:auto; max-height: 565px; text-align: left; margin:20px auto 30px auto; overflow-x: hidden;overflow-y:auto;}
  .aqyh_n_b .card{ position: relative;width:100%;height:auto;max-height: 135px;margin: 15px 0;}
  .aqyh_n_b .card .rank,
  .aqyh_n_b .card .listBox{display: inline-block;vertical-align: middle;}
  .aqyh_n_b .card .rank{text-align:center;width:30px;height:30px;line-height:30px;color:#ffffff;background-color: #196db4; -webkit-border-radius:30px;  -moz-border-radius:30px;  border-radius:30px;}
  .aqyh_n_b .card .listBox{width:calc(100% - 30px);color:#73fdff;font-size: 14px;}
  .aqyh_n_b .card .listBox a{display: block; width: 100%;padding:2px 0 2px 15px;}
  .aqyh_n_b .card .listBox a span{display: inline-block;vertical-align: middle;}
  .aqyh_n_b .card .listBox a span:nth-child(2){margin: 0 10px 0 8px;}
  .aqyh_n_b .card .listBox a span:nth-child(3){position:relative;color:#5fb6ff;width:auto;max-width: calc(100% - 15px - 70px);height:auto;max-height: 2.8em;overflow: hidden;line-height:1.4em;}
  .aqyh_n_b .card .listBox a span:nth-child(3)::after{content:'...'; font-weight: bold;position: absolute;bottom:0;right:0;}
  .aqyh_n_b .card .tip{ position: absolute;left: 100%;margin-left:-30px;top:10%;width:20px;height:20px;}
  .aqyh_n_b .card .A{background:url('../../../../static/img/aqyhPop/A.png') center no-repeat;background-size: contain;}
  .aqyh_n_b .card .B{background:url('../../../../static/img/aqyhPop/B.png') center no-repeat;background-size: contain;}
  .aqyh_n_b .card .C{background:url('../../../../static/img/aqyhPop/C.png') center no-repeat;background-size: contain;}
</style>
<script>
  import {getPopUp_Trichrome} from '../../../../api/secapi';
  export default{
    data(){
      return{
        Title:{ name:'',  total:'' },
        TriBox:[]
      }
    },
    computed:{
      flag(){
        return this.$store.state.ShowChrome;
      }
    },
    watch:{
      flag:{
        handler:function(val,oldVal){
          if(val==='yes'){
            let oid = this.$store.state.detailMessageId;
            this.getData(oid);
          }
        },
        deep:true
      }
    },
    methods:{
      async getData(id){
          let odata = await getPopUp_Trichrome({id:id});
          let data = odata;
         /* let data ={
            title:{ name:'样例',  total:'12' },
            tableBox:[
              {level:1,data:[
                {name:'隐患类别', value:'群众生活类'},
                {name:'隐患部位', value:'海冰社区'},
                {name:'隐患问题', value:'海滨社区多数小区楼龄较长海滨社区多数.'}
              ]},
              {level:2,data:[
                {name:'隐患类别', value:'群众生活类'},
                {name:'隐患部位', value:'海冰社区'},
                {name:'隐患问题', value:'海滨社区多数小区楼龄较长，消防设施设备日久欠维修，多处于老化故障，众多物业管理公司属于不管股部阶段'}
              ]},
              {level:3,data:[
                {name:'隐患类别', value:'群众生活类'},
                {name:'隐患部位', value:'海冰社区'},
                {name:'隐患问题', value:'海滨社区多数小区楼龄较长，消防设施设备日久欠维修，多处于老化故障，众多物业管理公司属于不管股部阶段'}
              ]},
              {level:1,data:[
                {name:'隐患类别', value:'群众生活类'},
                {name:'隐患部位', value:'海冰社区'},
                {name:'隐患问题', value:'海滨社区多数小区楼龄较长，消防设施设备日久欠维修，多处于老化故障，众多物业管理公司属于不管股部阶段,海滨社区多数小区楼龄较长，消防设施设备日久欠维修，多处于老化故障，众多物业管理公司属于不管股部阶段'}
              ]},
              {level:1,data:[
                {name:'隐患类别', value:'群众生活类'},
                {name:'隐患部位', value:'海冰社区'},
                {name:'隐患问题', value:'海滨社区多数小区楼龄较长，消防设施设备日久欠维修，多处于老化故障，众多物业管理公司属于不管股部阶段'}
              ]},
              {level:2,data:[
                {name:'隐患类别', value:'群众生活类'},
                {name:'隐患部位', value:'海冰社区'},
                {name:'隐患问题', value:'海滨社区多数小区楼龄较长，消防设施设备日久欠维修，多处于老化故障，众多物业管理公司属于不管股部阶段'}
              ]},
              {level:3,data:[
                {name:'隐患类别', value:'群众生活类'},
                {name:'隐患部位', value:'海冰社区'},
                {name:'隐患问题', value:'海滨社区多数小区楼龄较长，消防设施设备日久欠维修，多处于老化故障，众多物业管理公司属于不管股部阶段'}
              ]}
            ]
          };*/
          if(data){
            this.Title.name = data.title.name;
            this.Title.total = data.title.total;
            this.TriBox =data.tableBox;
          }
      },
      toClose:function(){
        this.$store.state.ShowChrome ='no';
      }
    }
  }
</script>
