<template>
  <div class="alert_container">
    <div class="bar_content" @click="toOpenOrClose">
      <a  class="alert_icon"></a>
      <a class="alert_txt"><span class="val">{{alert_value.val}}</span></a>
      <a class="alert_btn" :class="showSub==='open'?'open' :'close'"></a>
    </div>
    <div class="bar_box" v-show="showSub==='open'">
      <table v-if="alert_value.thData.length!==0">
        <thead>
        <tr><th>序号</th><th v-for="(a,c) in alert_value.thData" :key="c">{{a}}</th></tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in alert_value.tbData" :key="index" class="serious"><td>{{index + 1}}</td><td v-for="(b,d) in item" :key="d" :title = 'b'>{{b}}</td></tr>
        </tbody>
      </table>
      <div v-else>
        今日暂无预警
      </div>
    </div>
  </div>
</template>
<style scoped>
  @import '../../../../assets/css/reset.css';
  .alert_container{width: 100%;height:100%; position: relative;}
  .alert_container .bar_content a{ cursor: pointer;display: inline-block;vertical-align: middle;width: auto;margin-right: 20px;}
  .alert_container .bar_content .alert_icon{
    width:40px;height:40px;
    background: url('../../../../static/img/common/alert/alert_icon.png') no-repeat center;
    background-size: contain;
  }
  .alert_container .bar_content .alert_txt span{ display: inline-block;vertical-align: middle;color: #7ad0ff;font-size: 24px;}
  .alert_container .bar_content .alert_txt span.val{color:#ff5400;font-size: 28px;margin-right: 10px;}
  .alert_container .bar_content .alert_btn{
    width: 18px;height:18px;cursor: pointer;
    margin-right: 0;
  }
  .alert_container .bar_content .open{
    background: url('../../../../static/img/common/alert/arrow_down.png') no-repeat center;
    background-size: contain;
  }
  .alert_container .bar_content .close{
    background: url('../../../../static/img/common/alert/arrow_right.png') no-repeat center;
    background-size: contain;
  }
  .alert_container .bar_box{
    position: absolute;left:0;top:140%;width:600px;height:300px;
    border:1px solid #00a2ff;
    -webkit-border-radius:8px;
    -moz-border-radius:8px;
    border-radius:8px;overflow-x: hidden;background-color: rgba(2,22,35,0.8);
    overflow-y: auto;
  }
  .alert_container .bar_box table{ display: block;width: 90%; height:100%;margin:30px auto 0 auto;}
  .alert_container .bar_box table thead tr,.alert_container .bar_box table tbody tr{border-bottom: 1px solid #0f4e73;}
  .alert_container .bar_box table thead tr th,
  .alert_container .bar_box table tbody tr td{display:inline-block;vertical-align:middle;text-align: center; height:auto; padding:15px 0;}
  .alert_container .bar_box table thead tr th{ color:#7df7ff; font-size: 20px; font-weight: 600;}
  .alert_container .bar_box table tbody tr td{ color:#43d3ff;font-size: 18px; font-weight: 500;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;}
  .alert_container .bar_box table tbody tr td:nth-child(1),.alert_container .bar_box table thead tr th:nth-child(1){width:10%;}
  .alert_container .bar_box table tbody tr td:nth-child(2),.alert_container .bar_box table thead tr th:nth-child(2){width:20%;}
  .alert_container .bar_box table tbody tr td:nth-child(3),.alert_container .bar_box table thead tr th:nth-child(3){width:30%;}
  .alert_container .bar_box table tbody tr td:nth-child(4),.alert_container .bar_box table thead tr th:nth-child(4){width:40%;}
  .alert_container .bar_box table tbody tr.serious td:nth-child(3){color:#ff5400}
  .alert_container .bar_box table tbody tr.middle td:nth-child(3){color:#ed9c00}
  .alert_container .bar_box table tbody tr.light td:nth-child(3){color:#00a2ff}
  .alert_container .bar_box div{ color:#43d3ff;font-size: 18px; width:90%; margin:15px auto;}
</style>
<script>
  /*
  {
   val:'6',
   thData:['序号','预警对象','预警内容','时间'],
   tbData:[
       {degree:'serious',data:['xxx监测点','S02超标','2018/9/19 10:17:00']},
       {degree:'serious',data:['xxx监测点','S02超标','2018/9/19 10:17:00']},
       {degree:'serious',data:['xxx监测点','S02超标','2018/9/19 10:17:00']},
       {degree:'middle',data:['xxx监测点','S02超标','2018/9/19 10:17:00']}
    ]
  }
  * */
  export default{
      props:['alertInfo'],
      data(){
          return{
              alert_value:{
                  val:'',
                  thData:[],
                  tbData:[
                    ]
              },
              showSub:'close'
        }
      },
      mounted(){
        this.$nextTick(function() {
          this.alert_value.val = this.alertInfo.val;
          this.alert_value.thData = this.alertInfo.thData;
          this.alert_value.tbData = [].concat(this.alertInfo.tbData);
        });
      },
      watch:{
        alertInfo : {
          handler:function(num,oldnum){
              this.alert_value.val = num.val;
              this.alert_value.thData = num.thData;
              this.alert_value.tbData = [].concat(num.tbData);
          },
          deep:true
        },
        alert_value:{
            handler:function(val,oldVal){},
            deep:true
        }
      },
      methods:{
        toOpenOrClose:function(){
            let stat = this.showSub;
            if(stat ==='close'){
                /*请求刷新数据*/
            }
            stat ==='open' ?this.showSub='close':this.showSub='open';
        }
      }
  }
</script>

