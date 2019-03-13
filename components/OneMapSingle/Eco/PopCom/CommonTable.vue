<template>
  <div class="common_table">
    <table>
      <thead>
      <tr>
        <th>序号</th><th v-for="(item, index) in theObj[0].data" :key="index">{{item.name}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in theObj" :key="index">
        <td>{{(Number(pages.pageNum) - 1) * Number(pages.pageSize) + index + 1}}</td><td v-for="(a,c) in item.data" :key="c">{{a.value}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped="scoped">
.common_table{
  width:100%;
  height:100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.common_table table{
  width: 100%;
  border:1px solid rgba(209,219,229,0.5);
  -webkit-border-radius:5px;
  -moz-border-radius:5px;
  border-radius:5px;
  text-align: center;
  color:#fff;
  line-height: 40px;

}
.common_table table thead{
  background-color: #11578c;
}
.common_table table thead tr{
  color: #fff;
}
.common_table table thead tr td,
.common_table table tbody tr td{
  border:0;
}
.common_table table tbody tr:nth-child(odd){
  background-color: rgba(126,138,149,0.2);
}
</style>
<script>
  export default{
      props:['theObj'],
      data(){
          return {
              pages:{pageNum:1,pageSize:6,total:98}
             /* obj:[
                {
                   data:[
                     {name:'监测时间',value:'2018-06-10-00'},
                     {name:'温度（℃）',value:'27.4'},
                     {name:'湿度（%）',value:'99.9'},
                     {name:'气压（千帕）',value:'96.3'},
                     {name:'氮氧化物（微克/m³）',value:'36.8'},
                     {name:'二氧化氮（微克/m³）',value:'36.15'},
                     {name:'一氧化碳（微克/m³）',value:'24.2'},
                     {name:'二氧化硫（微克/m³）',value:'10'},
                     {name:'臭氧（微克/㎡）',value:'16.45'},
                     {name:'负氧离子（微克/m³）',value:'947.3'}
                   ]
                },
                {
                  data:[
                    {name:'监测时间',value:'2018-06-10-01'},
                    {name:'温度（℃）',value:'27.4'},
                    {name:'湿度（%）',value:'99.9'},
                    {name:'气压（千帕）',value:'96.3'},
                    {name:'氮氧化物（微克/m³）',value:'36.8'},
                    {name:'二氧化氮（微克/m³）',value:'36.15'},
                    {name:'一氧化碳（微克/m³）',value:'24.2'},
                    {name:'二氧化硫（微克/m³）',value:'10'},
                    {name:'臭氧（微克/㎡）',value:'16.45'},
                    {name:'负氧离子（微克/m³）',value:'947.3'}
                  ]
                },
                {
                  data:[
                    {name:'监测时间',value:'2018-06-10-02'},
                    {name:'温度（℃）',value:'27.4'},
                    {name:'湿度（%）',value:'99.9'},
                    {name:'气压（千帕）',value:'96.3'},
                    {name:'氮氧化物（微克/m³）',value:'36.8'},
                    {name:'二氧化氮（微克/m³）',value:'36.15'},
                    {name:'一氧化碳（微克/m³）',value:'24.2'},
                    {name:'二氧化硫（微克/m³）',value:'10'},
                    {name:'臭氧（微克/㎡）',value:'16.45'},
                    {name:'负氧离子（微克/m³）',value:'947.3'}
                  ]
                }
              ]*/
          }
      }
  }
</script>
