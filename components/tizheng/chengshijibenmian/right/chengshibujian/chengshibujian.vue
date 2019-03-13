<template>
  <div>
    <div class="c_a">
      城市部件
    </div>
    <div class="csbj">
      <ul>
        <li v-for="(item, index) in this.data" v-bind:key="index">
          <tab-chart02 v-bind:chartData="{item,index}"></tab-chart02>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import tabChart02 from '../../../../../components/tizheng/chengshijibenmian/right/hongguanjingji/components/tabChart01'
  import {cityComponent_camera,cityComponent_cityComponent,cityComponent_iot,cityComponent_site} from '../../../../../api/tizheng'

  export default {
    name: "chengshibujian",
    components: {
      tabChart02
    },
    data:function () {
      return {
        data: [
          {
            elementNode: {},
            // xAxis: {name: 'x轴', nameTextStyleColor: 'red', axisLineColor: 'blue', axisLabelColor: 'green'},
            // yAxis: {name: 'y轴', nameTextStyleColor: 'red', axisLineColor: 'blue', axisLabelColor: 'green'},
            data: [
              {
                name: '测试数据源1',
                color: 'rgb(254,0,102)',
                data: [{name: '一月', value: 1}, {name: '二月', value: 2}, {name: '三月', value: 3}, {
                  name: '四月',
                  value: 4
                }, {name: '五月', value: 5}, {name: '六月', value: 6}, {name: '七月', value: 7}]
              }
            ]
          },
          {
            elementNode: {},
            // xAxis: {name: 'x轴', nameTextStyleColor: 'red', axisLineColor: 'blue', axisLabelColor: 'green'},
            // yAxis: {name: 'y轴', nameTextStyleColor: 'red', axisLineColor: 'blue', axisLabelColor: 'green'},
            data: [
              {
                name: '测试数据源1',
                color: 'yellow',
                data: [{name: '一月', value: 1}, {name: '二月', value: 2}, {name: '三月', value: 3}, {
                  name: '四月',
                  value: 4
                }, {name: '五月', value: 5}, {name: '六月', value: 6}, {name: '七月', value: 7}]
              }
            ]
          },
          {
            elementNode: {},
            // xAxis: {name: 'x轴', nameTextStyleColor: 'red', axisLineColor: 'blue', axisLabelColor: 'green'},
            // yAxis: {name: 'y轴', nameTextStyleColor: 'red', axisLineColor: 'blue', axisLabelColor: 'green'},
            data: [
              {
                name: '测试数据源1',
                // color: 'black',
                data: [{name: '一月', value: 1}, {name: '二月', value: 2}, {name: '三月', value: 3}, {
                  name: '四月',
                  value: 4
                }, {name: '五月', value: 5}, {name: '六月', value: 6}, {name: '七月', value: 7}]
              }
            ]
          },
          {
            elementNode: {},
            // xAxis: {name: 'x轴', nameTextStyleColor: 'red', axisLineColor: 'blue', axisLabelColor: 'green'},
            // yAxis: {name: 'y轴', nameTextStyleColor: 'red', axisLineColor: 'blue', axisLabelColor: 'green'},
            data: [
              {
                name: '测试数据源1',
                color: 'rgb(64,240,122)',
                data: [{name: '一月', value: 1}, {name: '二月', value: 2}, {name: '三月', value: 3}, {
                  name: '四月',
                  value: 4
                }, {name: '五月', value: 5}, {name: '六月', value: 6}, {name: '七月', value: 7}]
              }
            ]
          }
        ]
      }
    },
    mounted(){
      this.getChartData([cityComponent_camera,cityComponent_cityComponent,cityComponent_iot,cityComponent_site])
    },
    methods:{
      getChartData(array){
        let $this = this
        for(let i = 0,j = array.length;i<j;i+=1){
          array[i]().then(function(data) {
            console.log('333',data)
            $this.data[i].data = data.data.chart
            $this.data[i].name = data.data.chart[0].name
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .c_a {
    width: 1798px;
    height: 48px;
    line-height: 48px;
    text-align: left;
    margin: 0px auto 20px;
    padding: 0px 30px;
    overflow: hidden;
    font-size: 30px;
    color: #ffffff;
    background-color: #011d48;
    border: #013fba solid 1px;
  }
  .csbj{
    ul{
      padding-left: 0px;
      li{
        width: 880px;
        height: 380px;
        overflow: hidden;
        display: inline-block;
        margin: 0px 25px 30px;
      }
      :nth-child(2n){
        /*margin-left: 20px;*/
      }
    }
  }
</style>
