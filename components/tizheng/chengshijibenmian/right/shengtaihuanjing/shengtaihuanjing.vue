<template>
  <div>
    <div class="c_a">
      生态环境
    </div>
    <div>
      <tab-chart01 v-for="(item, index) in this.data"
                   v-bind:class="{sthjTabChart_2n:((index+1)%2 === 0), sthjTabChart_4n:((index+1)%4 === 0)}"
                   v-bind:key="index" v-bind:chartData="{item,index}"></tab-chart01>
    </div>
  </div>
</template>

<script>
  import tabChart01 from '../../../../../components/tizheng/chengshijibenmian/right/shengtaihuanjing/components/tabChart01'
  import {ecological_air_day, ecological_air_month, ecological_waterOnGround_day,ecological_waterOnGround_month,ecological_waterQuality_day,ecological_waterQuality_month} from '../../../../../api/tizheng'

  export default {
    name: "shengtaihuanjing",
    components: {
      tabChart01
    },
    data: function () {
      return {
        data: [
          {
            name: '空气质量',
            msg: { subtext: '历史走势', name: '当前AQI', value: 34},
            data: [
              {
                name: '空气质量',
                color: 'rgb(254,0,102)',
                data: [{name: '6.15', value: 100}, {name: '6.16', value: 110}, {
                  name: '6.17',
                  value: 120
                }, {name: '6.18', value: 130}, {name: '6.19', value: 140}, {name: '6.20', value: 150}, {
                  name: '6.21',
                  value: 160
                }, {name: '6.22', value: 170}, {name: '6.23', value: 180}, {name: '6.24', value: 190}]
              }
            ]
          },
          {
            name: '温度',
            msg: { subtext: '历史走势', name: '全年平均气温', value: '25℃'},
            data: [
              {
                name: '温度',
                color: 'rgb(64,240,122)',
                data: [{name: '6.15', value: 100}, {name: '6.16', value: 110}, {
                  name: '6.17',
                  value: 120
                }, {name: '6.18', value: 130}, {name: '6.19', value: 140}, {name: '6.20', value: 150}, {
                  name: '6.21',
                  value: 160
                }, {name: '6.22', value: 170}, {name: '6.23', value: 180}, {name: '6.24', value: 190}]
              }
            ]
          },
          {
            name: '空气湿度',
            msg: { subtext: '历史走势', name: '全年平均湿度', value: '50%'},
            data: [
              {
                name: '空气湿度',
                color: 'orange',
                data: [{name: '6.15', value: 100}, {name: '6.16', value: 110}, {
                  name: '6.17',
                  value: 120
                }, {name: '6.18', value: 130}, {name: '6.19', value: 140}, {name: '6.20', value: 150}, {
                  name: '6.21',
                  value: 160
                }, {name: '6.22', value: 170}, {name: '6.23', value: 180}, {name: '6.24', value: 190}]
              }
            ]
          },
          {
            name: '废气排放量',
            msg: { subtext: '日排放历史走势', name: '今日废水排放量（顿）', value: 34},
            data: [
              {
                name: '废气排放量',
                data: [{name: '6.15', value: 100}, {name: '6.16', value: 110}, {
                  name: '6.17',
                  value: 120
                }, {name: '6.18', value: 130}, {name: '6.19', value: 140}, {name: '6.20', value: 150}, {
                  name: '6.21',
                  value: 160
                }, {name: '6.22', value: 170}, {name: '6.23', value: 180}, {name: '6.24', value: 190}]
              }
            ]
          },
          {
            name: '废气排放',
            msg: { subtext: '日排放历史走势', name: '今日废气排放量（顿）', value: 34},
            data: [
              {
                name: '废气排放',
                color: 'rgb(0,254,239)',
                data: [{name: '6.15', value: 100}, {name: '6.16', value: 110}, {
                  name: '6.17',
                  value: 120
                }, {name: '6.18', value: 130}, {name: '6.19', value: 140}, {name: '6.20', value: 150}, {
                  name: '6.21',
                  value: 160
                }, {name: '6.22', value: 170}, {name: '6.23', value: 180}, {name: '6.24', value: 190}]
              }
            ]
          },
          {
            name: '废气排放',
            msg: { subtext: '日排放历史走势', name: '今日废气排放量（顿）', value: 34},
            data: [
              {
                name: '废气排放',
                color: 'rgb(0,254,239)',
                data: [{name: '6.15', value: 100}, {name: '6.16', value: 110}, {
                  name: '6.17',
                  value: 120
                }, {name: '6.18', value: 130}, {name: '6.19', value: 140}, {name: '6.20', value: 150}, {
                  name: '6.21',
                  value: 160
                }, {name: '6.22', value: 170}, {name: '6.23', value: 180}, {name: '6.24', value: 190}]
              }
            ]
          }
        ]
      }
    },
    mounted(){
      // this.getEcological_air_day()
      // this.getEcological_air_month()
      // this.getEcological_waterOnGround_day()
      // this.getEcological_waterOnGround_month()
      // this.getEcological_waterQuality_day()
      // this.getEcological_waterQuality_month()

      this.getChartData([ecological_air_day, ecological_air_month, ecological_waterOnGround_day,ecological_waterOnGround_month,ecological_waterQuality_day,ecological_waterQuality_month])

    },
    methods:{
      getChartData(array){
        let $this = this
        for(let i = 0,j = array.length;i<j;i+=1){
          array[i]().then(function(data) {
            $this.data[i].data = data.data.chart
            $this.data[i].name = data.data.chart[0].name
          })
        }
      }
      // getEcological_air_day(){
      //   let $this = this
      //   ecological_air_day().then(function(data) {
      //     console.log('---'+data)
      //     $this.data[0].data = data.data.chart
      //     $this.data[0].name = data.data.chart[0].name
      //   })
      //
      // },
      // getEcological_air_month(){
      //   let $this = this
      //   ecological_air_month().then(function(data) {
      //     console.log('---'+data)
      //     $this.data[1] = data.data.chart
      //     $this.data[1].name = data.data.chart[0].name
      //   })
      //
      // },
      // getEcological_waterOnGround_day(){
      //   let $this = this
      //   ecological_waterOnGround_day().then(function(data) {
      //     console.log('---'+data)
      //     $this.data[2] = data.data.chart
      //     $this.data[2].name = data.data.chart[0].name
      //   })
      //
      // },
      // getEcological_waterOnGround_month(){
      //   let $this = this
      //   ecological_waterOnGround_month().then(function(data) {
      //     console.log('---'+data)
      //     $this.data[3] = data.data.chart
      //     $this.data[3].name = data.data.chart[0].name
      //   })
      //
      // },
      // getEcological_waterQuality_day(){
      //   let $this = this
      //   ecological_waterQuality_day().then(function(data) {
      //     console.log('---'+data)
      //     $this.data[4] = data.data.chart
      //     $this.data[4].name = data.data.chart[0].name
      //   })
      //
      // },
      // getEcological_waterQuality_month(){
      //   let $this = this
      //   ecological_waterQuality_month().then(function(data) {
      //     console.log('---'+data)
      //     $this.data[5] = data.data.chart
      //     $this.data[5].name = data.data.chart[0].name
      //   })
      // }
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

  /*.sthjTabChart_2n {*/
    /*margin: 0 19.5px 10px !important;*/
  /*}*/

  /*.sthjTabChart_4n {*/
    /*margin-left: 0 !important;*/
  /*}*/
</style>
