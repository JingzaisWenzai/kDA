<template>
  <div class="hongguanjingji">
    <div class="c_a">
      宏观经济
      <div style="float: right;"><span style="cursor: pointer;color: #7af3ff;font-size: 18px;" @click="showTableDetail">查看专题报告</span></div>
    </div>
    <div class="e_b_a">
      <!--<gonggonganquanleft></gonggonganquanleft>-->
      <div class="e_b_a_a">
        <div class="e_b_a_a_a">
          宏观经济
        </div>
        <div class="e_b_a_a_b">
          <ul>
            <li v-for="item in message">
              <div class="e_b_a_a_b_a">
                {{item.name}}
              </div>
              <div class="e_b_a_a_b_b">
                <span>{{item.value}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="e_b_a_b">
        <!--<tab-chart1 v-for="(item, index) in macroEconomyData" v-bind:key="index"-->
                     <!--v-bind:chartData="{item,index}"></tab-chart1>-->
        <chart-type01 v-bind:chartData="macroEconomyData[0]"></chart-type01>
      </div>
    </div>
    <div class="e_b_b">
      <ul>
        <li v-for="(item, index) in data2" v-bind:key="index">
          <tab-chart2 v-bind:chartData="{item,index}"></tab-chart2>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  // import tabChart1
  //   from '../../../../../components/tizheng/chengshijibenmian/right/gonggonganquan/components/tabChart01'
  import tabChart2
    from '../../../../../components/tizheng/chengshijibenmian/right/hongguanjingji/components/tabChart01'
  import chartType01 from '../common/chartType01'
  import bus from '../../../../../assets/js/main'

  import { macroEconomyDetail } from '../../../../../api/tizheng'

  export default {
    name: 'hongguanjingji',
    components: {
      // tabChart1,
      tabChart2,
      chartType01
    },
    data: function() {
      return {
        macroEconomyData: [
          {
            data: [
              {
                name: '宏观经济1',
                color: 'yellow',
                data: [{ name: '一月', value: 1 }, { name: '二月', value: 2 }, { name: '三月', value: 3 }, {
                  name: '四月',
                  value: 4
                }, { name: '五月', value: 5 }, { name: '六月', value: 6 }, { name: '七月', value: 7 }]
              }
            ]
          },
          {
            data: [
              {
                name: '宏观经济2',
                data: [{ name: '一月', value: 1 }, { name: '二月', value: 2 }, { name: '三月', value: 3 }, {
                  name: '四月',
                  value: 4
                }, { name: '五月', value: 5 }, { name: '六月', value: 6 }, { name: '七月', value: 7 }]
              }
            ]
          }
        ],
        data2: [
          {
            data: [
              {
                name: '测试数据源1',
                color: 'rgb(64,240,122)',
                data: [{ name: '一月', value: 1 }, { name: '二月', value: 2 }, { name: '三月', value: 3 }, {
                  name: '四月',
                  value: 4
                }, { name: '五月', value: 5 }, { name: '六月', value: 6 }, { name: '七月', value: 7 }]
              }
            ]
          },
          {
            data: [
              {
                name: '测试数据源1',
                color: 'yellow',
                data: [{ name: '一月', value: 1 }, { name: '二月', value: 2 }, { name: '三月', value: 3 }, {
                  name: '四月',
                  value: 4
                }, { name: '五月', value: 5 }, { name: '六月', value: 6 }, { name: '七月', value: 7 }]
              }
            ]
          }
          ,
          {
            data: [
              {
                name: '测试数据源1',
                data: [{ name: '一月', value: 1 }, { name: '二月', value: 2 }, { name: '三月', value: 3 }, {
                  name: '四月',
                  value: 4
                }, { name: '五月', value: 5 }, { name: '六月', value: 6 }, { name: '七月', value: 7 }]
              }
            ]
          }
        ],
        message: []
      }
    },
    mounted: function() {
      this.message = [{ name: '年度GDP总额', data: '3144亿元' }, { name: 'GDP增长率', data: '9.8%' }, {
        name: '当年GDP总额',
        data: '821亿元'
      }]
      var $this = this
      macroEconomyDetail().then(function(data) {
        console.log(data)
        $this.message = data.macroEconomy.generalSituation
        let temp = [data.macroEconomy.data]
        $this.macroEconomyData = [temp]

        $this.dealingData(data)
      })
    },
    methods:{
      showTableDetail(){
        bus.$emit('showTableauDetail','181121UI/P2P')
      },
      dealingData(data){
        let data1 = {},data2 = {},data3 = {}
        data1 = {
          name:data.disposable_income.name,
          msg:[{
            name:data.disposable_income.data.name,
            value:data.disposable_income.data.value
          }],
          data:[
            {
              name:'城镇居民人均可支配收入',
              data:data.disposable_income.data.data
            }
          ]
        }
        data2.name = data.public_budget.name
        data2.msg = []
        data2.data = []
        for(let i = 0,j = data.public_budget.data.length;i<j;i+=1){
          data2.msg.push({
            name:data.public_budget.data[i].name,
            value:data.public_budget.data[i].value
          })
          data2.data.push({
            name:data.public_budget.data[i].name,
            data:data.public_budget.data[i].data
          })
        }

        data3.msg = data.fixed_assets.generalSituation
        data3.data = [{
          name:data.fixed_assets.name,
          data:data.fixed_assets.data
        }]

        this.data2 = [data1, data2, data3]
      }
    },
    computed: {
      // messageData: function () {
      //   return this.message.filter(function (item) {
      //     if(typeof item.data !== 'string'){
      //       this.data = item
      //     }
      //     return typeof item.data === 'string'
      //   })
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .hongguanjingji{
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

    .e_b_a {
      width: 808px;
      height: 798px;
      text-align: left;
      margin: 0px 20px 0px 31px;
      padding: 20px;
      border: #0238a3 solid 1px;
      border-radius: 5px;
      float: left;
      display: inline;
      overflow: hidden;
    }

    .e_b_a_a {
      /*width: 808px;*/
      height: 196px;
      text-align: left; /*margin: 0px auto 52px; */
      overflow: hidden;
    }

    .e_b_a_a_a {
      width: 798px;
      height: 36px;
      text-align: left;
      margin: 0px auto 20px;
      padding-left: 10px;
      overflow: hidden;
      font-size: 30px;
      color: #40c6f0;
    }

    .e_b_a_a_b {
      width: 807px;
      height: 140px;
      text-align: left;
      margin: 0px 0.5px;
      overflow: hidden;
    }

    .e_b_a_a_b ul {
      width: 857px;
      height: 140px;
      text-align: left;
      margin: 0px auto;
      overflow: hidden;
    }

    .e_b_a_a_b ul li {
      width: 209px;
      height: 140px;
      line-height: 100px;
      text-align: left;
      margin: 0px 30px;
      float: left;
      display: inline;
      overflow: hidden;
    }

    .e_b_a_a_b_a {
      width: 209px;
      height: 60px;
      line-height: 30px;
      text-align: center; /*margin: 0px auto 30px;*/
      overflow: hidden;
      font-size: 19px;
      color: #b7ecff;
    }

    .e_b_a_a_b_b {
      width: 209px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin: 0px auto;
      overflow: hidden;
      font-size: 30px;
      color: #40c6f0;
    }

    .e_b_a_a_b_b span:nth-child(2) {
      font-size: 22px;
      color: #ffffff;
    }

    .e_b_a_b {
      /*width: 808px;*/
      height: 550px;
      text-align: left;
      margin: 0px auto;
      overflow: hidden;
      /*margin-top: 52px;*/
      :nth-child(2) {
        margin-left: 20px;
      }
    }

    .e_b_b {
      width: 990px; /*height:840px;*/
      text-align: left;
      /*margin: 20px auto 0;*/
      float: left;
      display: inline; /*overflow: hidden;*/
      ul {
        padding-left: 0;
        margin: -20px 0px auto 0;
        li {
          width: 990px;
          height: 255px;
        }
        :nth-child(2n) {
          margin: 18px auto;
        }
      }
    }
  }

</style>
