<template>
  <div class="table_container">
    <table>
      <thead>
      <tr><td><span>对象</span><span>指标</span></td><td v-for="(item , index) in theObj[0].value" :key="index">{{item.name}}</td></tr>
      </thead>
      <tbody>
      <tr v-for="(item , index) in theObj" :key="index"><td>{{item.name}}</td><td v-for="(item , index) in item.value" :key="index">{{item.value}}</td></tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
    .table_container{
      width:100%;
      height:100%;
      min-width: 1245px;
      min-height:125px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .table_container table,
    .table_container table thead,
    .table_container table tbody{
      width: 100%;
    }
    .table_container table thead tr td,
    .table_container table tbody tr td{
      color: #fff;
      font-size: 20px;
      text-align: center;
      border-bottom:1px solid #fff; border-right:1px solid #fff;
      padding:5px 0;
    }
    .table_container table thead tr td:first-child{
      background: url('./TwoTable/line.png') no-repeat center;
      background-size: 100% 100%;
    }
  .table_container table{
    border-top:1px solid #fff; border-left:1px solid #fff;
  }
    .table_container table thead tr td:first-child {
      clear: both;
      position: relative;
    }
    .table_container table thead tr td:first-child span:first-child{
      display: block;
      float: left;
      position: absolute;
      top:100%;
      left: 0;
      margin-top: -30px;
    }
    .table_container table thead tr td:first-child span:last-child{
      float: right;
      display: block;
      position: absolute;
      top: 0;
      left: 100%;
      margin-left: -50px;
    }

</style>
<script>
  export default{
      data(){
          return {
          /*    obj:this.theObj*/
               /* {
                title:[],
                key:[
                  {name:'浓度',value:[
                    {name:'二氧化硫',value:'10.0'},
                    {name:'一氧化碳',value:'24.2'},
                    {name:'二氧化氮',value:'36.15'},
                    {name:'臭氧',value:'16.45'},
                    {name:'颗粒物（粒径小于10μm）',value:'40.7'},
                    {name:'颗粒物（粒径小于2.5μm）',value:'24.1'}
                  ]},
                  {name:'分指数',value:[
                    {name:'二氧化硫',value:'3'},
                    {name:'一氧化碳',value:'0'},
                    {name:'二氧化氮',value:'18'},
                    {name:'臭氧',value:'5'},
                    {name:'颗粒物（粒径小于10μm）',value:'41'},
                    {name:'颗粒物（粒径小于2.5μm）',value:'34'}
                  ]}
                ]
              }*/
          }
      },
    props:['theObj']
  }
</script>
