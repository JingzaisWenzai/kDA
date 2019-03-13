<template>
  <div class="aqyh_n">
    <div class="aqyh_n_a">
      <div class="aqyh_n_a_left">
        <img src="../../../../static/img/aqyhPop/yxjc_247.png"/>
      </div>
      <div class="aqyh_n_a_middle">
        <span>{{title.name}}</span>
        <span>共</span>
        <span>{{title.total}}</span>
        <span>条</span>
      </div>
      <div class="aqyh_n_a_right">
        <a @click="toClose()" title="关闭"><img src="../../../../static/img/aqyhPop/yxjc_120.png"/></a>
      </div>
    </div>
    <div class="aqyh_n_b col_5">
      <table>
        <thead>
        <tr>
          <td>时间</td>
          <td>隐患等级</td>
          <td>隐患内容</td>
          <td>隐患基本情况</td>
          <td>巡查方式</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>一般隐患</td>
          <td>安全疏散通道、疏散指示标志、应急照明和安全出口情况</td>
          <td>没有安全标识</td>
          <td>自查</td>
        </tr>
        <tr>
          <td>2</td>
          <td>一般隐患</td>
          <td>安全疏散通道、疏散指示标志、应急照明和安全出口情况</td>
          <td>没有安全标识</td>
          <td>巡查</td>
        </tr>
        <tr>
          <td>3</td>
          <td>一般隐患</td>
          <td>安全疏散通道、疏散指示标志、应急照明和安全出口情况</td>
          <td>没有安全标识</td>
          <td>自查</td>
        </tr>
        <tr>
          <td>4</td>
          <td>一般隐患</td>
          <td>安全疏散通道、疏散指示标志、应急照明和安全出口情况</td>
          <td>没有安全标识</td>
          <td>巡查</td>
        </tr>
        <tr>
          <td>5</td>
          <td>一般隐患</td>
          <td>安全疏散通道、疏散指示标志、应急照明和安全出口情况</td>
          <td>没有安全标识</td>
          <td>巡查</td>
        </tr>
        </tbody>
      </table>
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
  .col_1 table thead tr td,
  .col_1 table tbody tr td{
    width:100%!important;
  }
  .col_2 table thead tr td:first-child,
  .col_2 table tbody tr td:first-child{
    width:30%!important;
  }
  .col_2 table thead tr td:last-child,
  .col_2 table tbody tr td:last-child{
    width:69%!important;
  }
  .col_3 table thead tr td:first-child,
  .col_3 table tbody tr td:first-child{
    width:10%!important;
  }
  .col_3 table thead tr td:last-child,
  .col_3 table tbody tr td:last-child,
  .col_3 table thead tr td:nth-child(2),
  .col_3 table tbody tr td:nth-child(2){
    width:44.5%!important;
  }

  /*4列*/
  .col_4 table thead tr td,
  .col_4 table tbody tr td{
    width: 29%!important;
  }
  .col_4 table thead tr td:first-child,
  .col_4 table tbody tr td:first-child{
    width:11.5%!important;
  }
  /*5列*/
  .col_5 table thead tr td,
  .col_5 table tbody tr td{
    width:22%!important;
  }
  .col_5 table thead tr td:first-child,
  .col_5 table tbody tr td:first-child{
    width:10%!important;
  }


  /*6列*/
  .col_6 table thead tr td:first-child,
  .col_6 table tbody tr td:first-child,
  .col_6 table thead tr td:nth-child(4),
  .col_6 table tbody tr td:nth-child(4),
  .col_6 table thead tr td:nth-child(5),
  .col_6 table tbody tr td:nth-child(5),
  .col_6 table thead tr td:nth-child(6),
  .col_6 table tbody tr td:nth-child(6){
    width: 15.1%!important;
  }

  .col_6 table thead tr td:nth-child(2),
  .col_6 table tbody tr td:nth-child(2),
  .col_6 table thead tr td:nth-child(3),
  .col_6 table tbody tr td:nth-child(3){
    width: 19%!important;
  }
  /*7列*/

  .col_7 table thead tr td:first-child,
  .col_7 table tbody tr td:first-child{
    width:8%!important;
  }
  .col_7 table thead tr td:nth-child(2),
  .col_7 table tbody tr td:nth-child(2),
  .col_7 table thead tr td:nth-child(3),
  .col_7 table tbody tr td:nth-child(3),
  .col_7 table thead tr td:nth-child(4),
  .col_7 table tbody tr td:nth-child(4),
  .col_7 table thead tr td:nth-child(5),
  .col_7 table tbody tr td:nth-child(5),
  .col_7 table thead tr td:nth-child(6),
  .col_7 table tbody tr td:nth-child(6),
  .col_7 table thead tr td:nth-child(7),
  .col_7 table tbody tr td:nth-child(7){
    width:15%!important;
  }
  /*8列*/
  .col_8 table thead tr td:first-child,
  .col_8 table tbody tr td:first-child,
  .col_8 table thead tr td:nth-child(2),
  .col_8 table tbody tr td:nth-child(2){
    width: 8%!important;
  }
  .col_8 table thead tr td:nth-child(3),
  .col_8 table tbody tr td:nth-child(3),
  .col_8 table thead tr td:nth-child(4),
  .col_8 table tbody tr td:nth-child(4),
  .col_8 table thead tr td:nth-child(5),
  .col_8 table tbody tr td:nth-child(5),
  .col_8 table thead tr td:nth-child(6),
  .col_8 table tbody tr td:nth-child(6),
  .col_8 table thead tr td:nth-child(7),
  .col_8 table tbody tr td:nth-child(7),
  .col_8 table thead tr td:nth-child(8),
  .col_8 table tbody tr td:nth-child(8){
    width: 13.6%!important;
  }

  /*9列*/
  .col_9 table thead tr td,
  .col_9 table tbody tr td{
    width:11%!important;
  }

  .col_9 table thead tr td:first-child,
  .col_9 table tbody tr td:first-child{
    width:10%!important;
  }
  /*10列*/
  .col_10 table thead tr td,
  .col_10 table tbody tr td{
    width:11%!important;
  }
  .col_10 table thead tr td:first-child,
  .col_10 table tbody tr td:first-child,
  .col_10 table thead tr td:nth-child(5),
  .col_10 table tbody tr td:nth-child(5),
  .col_10 table thead tr td:nth-child(8),
  .col_10 table tbody tr td:nth-child(8),
  .col_10 table thead tr td:nth-child(9),
  .col_10 table tbody tr td:nth-child(9){
    width:6.5%!important;
  }

  .aqyh_n{width:100%; height:100%;  text-align: left;overflow: hidden; background-color: rgba(2,22,35,0.8); box-shadow:0 0 5px #1c609d; border:1px solid #1c609d; border-radius: 5px;}
  .aqyh_n_a{ position: relative;width:90%; height:50px; margin: 0 auto;  line-height: 50px; border-bottom: #345167 solid 1px; text-align: left;  overflow: hidden;}
  .aqyh_n_a_left,
  .aqyh_n_a_middle{display: inline-block;vertical-align: middle;}
  .aqyh_n_a_left{width:24px; height:24px;}
  .aqyh_n_a_left img{display: block;width: 100%;height:100%; line-height: 1;}
  .aqyh_n_a_middle{padding-left:20px;width:calc(100% - 30px); height:100%;  text-align: left;  font-size: 16px; color: #ff0000;}
  .aqyh_n_a_middle span{display: inline-block;vertical-align: bottom;}
  .aqyh_n_a_middle span:nth-child(1){font-size: 18px; color: #5fb6ff;margin-right: 15px;}
  .aqyh_n_a_right{cursor:pointer;width:24px; height:24px;  position:absolute;left:100%; top:50%; margin-left:-30px;margin-top:-12px;}

  .aqyh_n_b{width:90%; height:auto; max-height: 565px; text-align: left; margin:20px auto 30px auto; overflow-x: hidden;overflow-y:auto;}
  .aqyh_n_b table{width:100%; height:100%; text-align: left; margin: 0 auto; border:1px solid transparent; }
  .aqyh_n_b table thead{width:100%; line-height: 45px;height:45px;  text-align: center; margin: 0 auto; overflow: hidden;  background-color: transparent; font-size: 16px; color: #cefeff; }
  .aqyh_n_b table tbody{width:100%; height:calc(100% - 45px);  text-align: center; margin: 0 auto; overflow: auto;  background-color:transparent; font-size: 14px; color: #a6d6ff;}
  .aqyh_n_b table tbody tr:hover{ background-color: transparent;}

  .aqyh_n_b table{width:99%;height:99%;display: block;}
  .aqyh_n_b table thead,
  .aqyh_n_b table tbody,
  .aqyh_n_b table thead tr,
  .aqyh_n_b table tbody tr{
    display:block;
    width: 100%;
    clear: both;
  }
  .aqyh_n_b table thead tr{height:100%;}
  .aqyh_n_b table tbody tr{height:70px; line-height: 70px;}
  .aqyh_n_b table thead tr td,
  .aqyh_n_b table tbody tr td{
    display:block;float:left;border:1px solid #038b94;
    overflow: hidden;height:100%;
    text-overflow:ellipsis;
    white-space:nowrap
  }
</style>
<script>
  import {getPopUp_Distribution} from '../../../../api/secapi';
  export default{
    data(){
      return{
          title:{name:'',total:''},
          tableBox:{ }
      }
    },
    computed:{
      flag(){
        return this.$store.state.ShowFenBu;
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
      async getData(oid){
        /* let odata = await getPopUp_Distribution({id:id});
         let data = odata;*/
        let data ={
          title:{ name:'样例',  total:'12' },
          tableBox:{
            thead:['评估人','风险类型','风险等级','风险分值','审核人','审核时间','状态'],
            tbody:[
              ['罗','其他','低','6','罗','2018-12-29','通过'],
              ['罗','其他','低','6','罗','2018-12-29','通过'],
              ['罗','其他','低','6','罗','2018-12-29','通过'],
              ['罗','其他','低','6','罗','2018-12-29','通过'],
              ['罗','其他','低','6','罗','2018-12-29','通过'],
              ['罗','其他','低','6','罗','2018-12-29','通过'],
              ['罗','其他','低','6','罗','2018-12-29','通过'],
              ['罗','其他','低','6','罗','2018-12-29','通过'],
              ['罗','其他','低','6','罗','2018-12-29','通过'],
              ['罗','其他','低','6','罗','2018-12-29','通过'],
              ['罗','其他','低','6','罗','2018-12-29','通过'],
              ['罗','其他','低','6','罗','2018-12-29','通过'],
              ['罗','其他','低','6','罗','2018-12-29','通过'],
              ['罗','其他','低','6','罗','2018-12-29','通过'],
              ['罗','其他','低','6','罗','2018-12-29','通过']
            ]
          }
        };
        if(data){
          this.title.name = data.title.name;
          this.title.total = data.title.total;
          this.tableBox =data.tableBox;
        }
      },
      toClose:function(){
        this.$store.state.ShowFenBu ='no';
      }
    }
  }
</script>
