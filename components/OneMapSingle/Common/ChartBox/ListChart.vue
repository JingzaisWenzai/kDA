<template>
  <div class="listchart" :id="barChartId">
    <table>
      <thead>
        <tr><th v-for="(a,b) in barTit" :key="b">{{a}}</th></tr>
      </thead>
      <tbody>
      <tr v-if="serial ==='yes'" v-for="(item,index) in barContent" :key="index"><td>{{index + 1}}</td><td>{{item.name}}</td><td>{{item.value}}</td></tr>
      <tr v-if="serial ==='no'" v-for="(item,index) in barContent" :key="index"><td>{{item.name}}</td><td>{{item.value}}</td></tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
  .listchart{
    width:100%;
    height:100%;
    min-width: 100px;
    min-height:80px;
    border:0 solid #f00;
  }
  .listchart table{
    display: inline-block; margin:0 auto; width:auto;max-width:100%;text-align: center;
  }
  .listchart table tr th{ font-size: 14px;color: #cccccc;}
  .listchart table tr td{
    padding:5px 5px; font-size: 12px;color: #cccccc;
  }
</style>
<script>
  import echart from 'echarts'
  import $ from 'jquery'

  export default{
    name:'ListChart',
    props:['chartData'],
    data(){
      return {
        barTit:[],
        barContent:[],
        barChartId:'',
        dataStyle:[],
        colors:['#6000ff','#0057e5','#00c5fc','#9ee006'],
        serial:'yes'
      }
    },
    mounted(){
      this.barChartId =  this.chartData.oid;
      this.barTit = this.chartData.typeTitle;
      this.barContent = this.chartData.data;
      this.serial = this.dealData(this.chartData.typeTitle);
    },
    watch:{
      chartData:{
          handler:function(val,oldVal){
            this.barChartId =  val.oid;
            this.barTit = val.typeTitle;
            this.barContent = val.data;
          },
          deep:true
      }
    },
    methods:{
      dealData:function(obj){
        let s='no' ;
        for(let i =0;i<obj.length;i++){
            if(obj[i] === '序号'){
                s = 'yes';
            }
        }
        return s;
      }
    }
  }
</script>
