<template>
  <div>
    <div class="c_a">
      民生服务
      <div style="float: right;"><span style="cursor: pointer;color: #7af3ff;font-size: 18px;" @click="showTableDetail">查看专题报告</span></div>
    </div>
    <div class="f_b_a">
      <div class="f_b_a_a">
        教育
      </div>
      <div class="f_b_a_b">
        <ul>
          <li v-for="(item, index) in this.data" v-bind:key="index">
            <tab-chart01 v-bind:chartData="{item,index}"></tab-chart01>
          </li>
        </ul>
      </div>
    </div>
    <div class="f_b_b">
      <tab-chart02  v-for="(item, index) in this.data2" v-bind:key="index"  v-bind:chartData="{item,index}"></tab-chart02>
    </div>
  </div>
</template>

<script>
  import tabChart01 from '../../../../../components/tizheng/chengshijibenmian/right/minshengfuwu/components/tabChart01'
  import tabChart02 from '../../../../../components/tizheng/chengshijibenmian/right/minshengfuwu/components/tabChart02'
  import bus from '../../../../../assets/js/main'
  import {peopleLive_littleSchool,peopleLive_smallSchool,peopleLive_middleSchool,peopleLive_professionalSchool,peopleLive_feedOld,peopleLive_hospitalBed} from '../../../../../api/tizheng'

  export default {
    name: "minshengfuwu",
    components:{
      tabChart01,
      tabChart02
    },
    data:function () {
      return {
        data: [
          {
            title: {text:'学位供需差 24'},
            msg: { subtext: '幼儿园', name: '幼儿园数量', value: 34},
            xAxis:{name:'年份'},
            yAxis:{name:'万人'},
            data: [
              {
                name: '供应',
                data: [{name: '6.15', value: 100}, {name: '6.16', value: 110}, {
                  name: '6.17',
                  value: 120
                }, {name: '6.18', value: 130}, {name: '6.19', value: 140}, {name: '6.20', value: 150}, {
                  name: '6.21',
                  value: 160
                }, {name: '6.22', value: 170}, {name: '6.23', value: 180}, {name: '6.24', value: 190}]
              },
              {
                name: '需求',
                color: 'yellow',
                data: [{name: '6.15', value: 100}, {name: '6.16', value: 110}, {
                  name: '6.17',
                  value: 120
                }, {name: '6.18', value: 130}, {name: '6.19', value: 140}, {name: '6.20', value: 150}, {
                  name: '6.21',
                  value: 160
                }, {name: '6.22', value: 170}, {name: '6.23', value: 180}, {name: '6.24', value: 190}]
              },
              {
                name: '供应差',
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
            title: {text:'学位供需差 24'},
            msg: { subtext: '小学', name: '小学数量', value: 34},
            xAxis:{name:'年份'},
            yAxis:{name:'万人'},
            data: [
              {
                name: '供应',
                data: [{name: '6.15', value: 100}, {name: '6.16', value: 110}, {
                  name: '6.17',
                  value: 120
                }, {name: '6.18', value: 130}, {name: '6.19', value: 140}, {name: '6.20', value: 150}, {
                  name: '6.21',
                  value: 160
                }, {name: '6.22', value: 170}, {name: '6.23', value: 180}, {name: '6.24', value: 190}]
              },
              {
                name: '需求',
                color: 'yellow',
                data: [{name: '6.15', value: 100}, {name: '6.16', value: 110}, {
                  name: '6.17',
                  value: 120
                }, {name: '6.18', value: 130}, {name: '6.19', value: 140}, {name: '6.20', value: 150}, {
                  name: '6.21',
                  value: 160
                }, {name: '6.22', value: 170}, {name: '6.23', value: 180}, {name: '6.24', value: 190}]
              },
              {
                name: '供应差',
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
            title: {text:'学位供需差 24'},
            msg: { subtext: '初中', name: '初中数量', value: 34},
            xAxis:{name:'年份'},
            yAxis:{name:'万人'},
            data: [
              {
                name: '供应',
                data: [{name: '6.15', value: 100}, {name: '6.16', value: 110}, {
                  name: '6.17',
                  value: 120
                }, {name: '6.18', value: 130}, {name: '6.19', value: 140}, {name: '6.20', value: 150}, {
                  name: '6.21',
                  value: 160
                }, {name: '6.22', value: 170}, {name: '6.23', value: 180}, {name: '6.24', value: 190}]
              },
              {
                name: '需求',
                color: 'yellow',
                data: [{name: '6.15', value: 100}, {name: '6.16', value: 110}, {
                  name: '6.17',
                  value: 120
                }, {name: '6.18', value: 130}, {name: '6.19', value: 140}, {name: '6.20', value: 150}, {
                  name: '6.21',
                  value: 160
                }, {name: '6.22', value: 170}, {name: '6.23', value: 180}, {name: '6.24', value: 190}]
              },
              {
                name: '供应差',
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
            title: {text:'学位供需差 24'},
            msg: { subtext: '职业中学', name: '高中数量', value: 34},
            xAxis:{name:'年份'},
            yAxis:{name:'万人'},
            data: [
              {
                name: '供应',
                data: [{name: '6.15', value: 100}, {name: '6.16', value: 110}, {
                  name: '6.17',
                  value: 120
                }, {name: '6.18', value: 130}, {name: '6.19', value: 140}, {name: '6.20', value: 150}, {
                  name: '6.21',
                  value: 160
                }, {name: '6.22', value: 170}, {name: '6.23', value: 180}, {name: '6.24', value: 190}]
              },
              {
                name: '需求',
                color: 'yellow',
                data: [{name: '6.15', value: 100}, {name: '6.16', value: 110}, {
                  name: '6.17',
                  value: 120
                }, {name: '6.18', value: 130}, {name: '6.19', value: 140}, {name: '6.20', value: 150}, {
                  name: '6.21',
                  value: 160
                }, {name: '6.22', value: 170}, {name: '6.23', value: 180}, {name: '6.24', value: 190}]
              },
              {
                name: '供应差',
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
          }
        ],
        data2: [
          {
            title: {text:'医疗床位供需差 24',left:'right'},
            msg: { subtext: '二级及以上医院数量',subTextValue: 12, name: '社康中心数量', value: 34},
            data: [
              {
                name: '医疗',
                color: 'rgb(64,240,122)',
                data: [{name: '6.15', value: 100}, {name: '6.16', value: 110}, {
                  name: '6.17',
                  value: 120
                }, {name: '6.18', value: 130}, {name: '6.19', value: 140}, {name: '6.20', value: 150}, {
                  name: '6.21',
                  value: 160
                }, {name: '6.22', value: 170}, {name: '6.23', value: 180}, {name: '6.24', value: 190}]
              }
            ],
            name:'医疗'
          },
          {
            title: {text:'养老床位供需差 24',left:'right'},
            msg: { subtext: '养老金支出',subTextValue: '12万元', name: '养老机构数量', value: 34},
            data: [
              {
                name: '养老',
                color: 'yellow',
                data: [{name: '6.15', value: 100}, {name: '6.16', value: 110}, {
                  name: '6.17',
                  value: 120
                }, {name: '6.18', value: 130}, {name: '6.19', value: 140}, {name: '6.20', value: 150}, {
                  name: '6.21',
                  value: 160
                }, {name: '6.22', value: 170}, {name: '6.23', value: 180}, {name: '6.24', value: 190}]
              }
            ],
            name:'养老'
          }
        ]
      }
    },
    mounted(){
      this.getDataArray([peopleLive_littleSchool,peopleLive_smallSchool,peopleLive_middleSchool,peopleLive_professionalSchool,peopleLive_hospitalBed,peopleLive_feedOld])
    },
    methods:{
      getDataArray(array){
        let $this = this
        for(let i = 0,j = array.length;i<j;i+=1){
          array[i]().then(function(data) {
            console.log('--'+i+'--',data)

            if(i<4){
              for(let i = 0,j = data.data.chart.length;i<j;i+=1){
                data.data.chart[i].type = 'bar'
              }
              $this.data[i].data = data.data.chart
            }else {
              $this.data2[i-4].msg = null
              $this.data2[i-4].data = data.data.chart
            }

          })
        }
      },
      showTableDetail(){
        bus.$emit('showTableauDetail','181128/_')
      }
    }
  }
</script>

<style scoped>
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
  .f_b_a{width:1108px; height:798px; text-align: left; margin: 0px 20px 0px 31px;  padding: 20px 30px; border: #0238a3 solid 1px;  border-radius:5px;  float: left; display: inline; overflow: hidden; }
  .f_b_a_a{width:1108px; height:36px; text-align: left; margin: 0px auto 20px; overflow: hidden; font-size: 30px; color: #40c6f0;}
  .f_b_a_b{width:1108px; height:742px; text-align: left; margin: 0px auto; overflow: hidden;}
  .f_b_a_b ul{width:1108px; height:742px; text-align: left; margin: 0px auto; overflow: hidden;padding-left: 0px}
  .f_b_a_b ul li{width:504px; height:331px; text-align: left; margin: 0px auto; float: left; display: inline; /*overflow: hidden;*/}
  .f_b_a_b ul li:nth-child(1),.f_b_a_b ul li:nth-child(2){ margin-bottom: 20px;}
  .f_b_a_b ul li:nth-child(1),.f_b_a_b ul li:nth-child(3){ margin-right: 20px;}
</style>
