<template>
  <section class="tablechart_container" :id="tableChartId">
    <table>
      <thead>
        <tr><th v-for="(item,index) in ohead" :key="index">{{item}}</th></tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in theData" :key="index"><td v-for="(a,c) in item.data" :key='c'>{{a.value}}</td></tr>
      </tbody>
    </table>
  </section>
</template>
<script>
  export default{
      props:['chartData'],
      mounted(){
        this.tableChartId =   this.chartData.oid;
        let odata = this.chartData.data;
        for(let i=0;i<odata[0].data.length;i++){
          let name = odata[0].data[i].name || '';
          this.ohead.push(name);
        }
      },
      data(){
          return {
            tableChartId:'',
            ohead:[],
            odata: [],
            barChartId:'',
            theData:[
              {name:'深圳河',data:[
                {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
              ]},
              {name:'深圳河',data:[
                {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
              ]},
              {name:'深圳河',data:[
                {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
              ]},
              {name:'深圳河',data:[
                {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
              ]},
              {name:'深圳河',data:[
                {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
              ]},
              {name:'深圳河',data:[
                {name:'河段',value:'深圳河'},{name:'河长',value:'张三'},{name:'联系方式',value:'189****'}
              ]}
            ]
          }
      }
  }
</script>
<style scoped>
  /*导航栏的特殊样式*/
  ::-webkit-scrollbar{width:16px!important;height:16px!important;}
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb{border-radius:999px!important; border:4px solid transparent!important;}
  ::-webkit-scrollbar-track{box-shadow:1px 1px 5px rgba(185,165,150,.2) inset!important;}
  ::-webkit-scrollbar-thumb{min-height:20px!important;background-clip:content-box!important;box-shadow: 0 0 0 5px rgba(25,109,180,0.5) inset!important;}
  ::-webkit-scrollbar-corner{/*background:transparent;*/}

  .tablechart_container{ width:100%;height:100%;overflow:hidden auto;}
  .tablechart_container table{display: table;width:90%;margin:0 auto;height:auto; text-align: center;}
  .tablechart_container table thead tr,
  .tablechart_container table thead,
  .tablechart_container table tbody,
  .tablechart_container table tbody tr{width:100%;height: auto;}
  .tablechart_container table thead tr th{
    color:#ffffff;font-size: 20px; padding: 15px 0;border-width:0;border-bottom:1px solid #0d436d; font-weight: 500;
  }
  .tablechart_container table tbody tr td{
    color:#a6d6ff;font-size: 18px;border-width:0;padding:10px 0 5px 0; font-weight: 500;
  }
</style>
