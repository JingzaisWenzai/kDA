<template>
  <div class="b">
    <div class="b_a">
      <div class="b_a_a tabClick" v-for="obj in topData" v-bind:key="obj.index"  @click="tabClick($event,obj.msg.name,obj.index)">
        <chartTab v-bind:chartId="obj"></chartTab>
      </div>
    </div>
    <div class="b_b">
      <div class="b_b_a tabClick" v-for="obj in bottomData" v-bind:key="obj.index" @click="tabClick($event,obj.msg.name,obj.index)">
        <chartTab v-bind:chartId="obj"></chartTab>
      </div>
    </div>
  </div>
</template>

<script>
  import chartTab from '../../../../components/tizheng/common/chartTab/chartTab.vue'
  import {publicSecurity,ecological_total,macroEconomy,peopleLive_total,cityComponent_total} from '../../../../api/tizheng'
  import bus from '../../../../assets/js/main'
  import {getParams} from '../../../../utils/validate'

  export default {
    name: "index",
    components: {
      chartTab
    },
    data:function () {
      return{
        data:[
          {
          chart:{data:[{name:'公共安全',data:[{name:'2008',value:100},{name:'2009',value:110},{name:'2010',value:120},{name:'2011',value:130},{name:'2012',value:140},{name:'2013',value:150},{name:'2014',value:160},{name:'2015',value:170},{name:'2016',value:180},{name:'2017',value:190}]}],
            xAxis:{name:''},
            yAxis:{name:''},
            type:'line',
            // type:'lineChart'
          },
          msg:{name:'公共安全',index:0,data:[{name:'今日重大安全事件数',value:15,type:'人',icon:'↑'},{name:'今日伤亡人数',value:6,type:'人',icon:''}]},
          index:0
        },
          {
            chart:{data:[{name:'生态环境',data:[{name:'2008',value:100},{name:'2009',value:110},{name:'2010',value:120},{name:'2011',value:130},{name:'2012',value:140},{name:'2013',value:150},{name:'2014',value:160},{name:'2015',value:170},{name:'2016',value:180},{name:'2017',value:190}]}],
              xAxis:{name:''},
              yAxis:{name:''},
              type:'line',
              // type:'lineChart'
            },
            msg:{name:'生态环境',index:1,data:[{name:'水污染指数',value:28,type:'',icon:'↑'},{name:'空气质量指数',value:30,type:'',icon:''},{name:'重大环保事件数',value:7,type:'',icon:''}]},
            index:1
          },
          {
            chart:{data:[{name:'宏观经济',data:[{name:'2008',value:100},{name:'2009',value:110},{name:'2010',value:120},{name:'2011',value:130},{name:'2012',value:140},{name:'2013',value:150},{name:'2014',value:160},{name:'2015',value:170},{name:'2016',value:180},{name:'2017',value:190}]}],
              xAxis:{name:''},
              yAxis:{name:''},
              type:'line',
              // type:'lineChart'
            },
            msg:{name:'宏观经济',index:2,data:[{name:'人均生产总值',value:6.7,type:'万元',icon:'↑'},{name:'居民消费价格指数',value:1234,type:'',icon:''},{name:'一般公共预算增长率',value:11.2,type:'%',icon:''}]},
            index:2
          },
          {
            chart:{data:[{name:'民生服务',data:[{name:'2008',value:100},{name:'2009',value:110},{name:'2010',value:120},{name:'2011',value:130},{name:'2012',value:140},{name:'2013',value:150},{name:'2014',value:160},{name:'2015',value:170},{name:'2016',value:180},{name:'2017',value:190}]}],
              yAxis:{name:'万人'},
              xAxis:{name:'地点'},
              type:'barChart'},
            msg:{name:'民生服务',index:3,data:[{name:'学位供需差',value:1895,type:'缺',icon:'↑'},{name:'医疗床位供需差',value:1226,type:'余',icon:''},{name:'养老床位供需差',value:2126,type:'余',icon:''}]},
            index:3
          },
          {
            chart: {
              data: [{
                name: '城市部件',
                data: [{ name: '2008', value: 100 }, { name: '2009', value: 110 }, {
                  name: '2010',
                  value: 120
                }, { name: '2011', value: 130 }, { name: '2012', value: 140 }, {
                  name: '2013',
                  value: 150
                }, { name: '2014', value: 160 }, { name: '2015', value: 170 }, {
                  name: '2016',
                  value: 180
                }, { name: '2017', value: 190 }]
              }],
              yAxis: { name: '万人' },
              xAxis: { name: '地点' },
              type: 'barChart'
            },
            msg: {
              name: '城市部件',
              index: 4,
              data: [{ name: '物联网感知设备保有量', value: 1884, type: '', icon: '↓' }, {
                name: '水电气感知设备触发事件数',
                value: 18656,
                type: '',
                icon: ''
              }]
            },
            index: 4
          }
        ],
        topData:[],
        bottomData:[],
        getDataArray:[[publicSecurity],[ecological_total],[macroEconomy],[peopleLive_total],[cityComponent_total]],
        index:0
      }
    },
    mounted:function () {
      this.topData = [this.data[0],this.data[1],this.data[2]]
      this.bottomData = [this.data[3],this.data[4]]

      this.getPublicSecurityData(0)
      this.getEcological_total(1)
      this.getMacroEconomyData(2)
      this.getPeopleLive_total(3)
      this.getCityComponent_total(4)

      let index = 0
      if(getParams().index !== undefined){
        index = Math.trunc(Number(getParams().index))
        if(index>4 || index <0){
          index = 0
        }
      }
      this.index = index

    },
    methods:{
      tabClick:function (event,obj,index) {
        $('.tabClick').css('backgroundColor','')
        event.currentTarget.style.backgroundColor = '#030d35';
        bus.$emit('showComponents',index)
        this.$router.push('/tizheng?index='+index)
      },
      getPublicSecurityData:function(index) {
        var $this = this
        if(this.getDataArray[index][0] !== undefined){
          this.getDataArray[index][0]().then(function(data) {
            // console.log(data)
            var temp = []
            temp.msg = []
            temp.data = []
            for(var i in data.data){
              temp.msg.push(
                {name:data.data[i].name,value:data.data[i].today,type:'人'}
              )
              if(i !== 'majorSafetyAccident'){
                temp.data.push({
                  name:data.data[i].name,
                  data:data.data[i].data
                })
              }
            }
            $this.topData[index].msg.data = temp.msg
            $this.topData[index].msg.name = data.name
            $this.topData[index].chart.data = temp.data

            // console.log('---',$this.topData[index],'---')
          })
        }
      },
      getEcological_total:function(index){
        let $this = this
        $this.getDataArray[index][0]().then(function(data) {
          console.log('---',data)
        })
      },
      getMacroEconomyData:function(index) {
        var $this = this
        this.getDataArray[index][0]().then(function(data){
          console.log(data)

          $this.topData[index].msg.data = data.data.grossRegionalProduct.today
          $this.topData[index].msg.name = data.name

          var temp = []
          for(var i = 0,j = data.data.grossRegionalProduct.data.length;i<j;i+=1){
            var tempData = {}
            tempData = $this.topData[index].chart
            tempData.data = []
            tempData.data.push(data.data.grossRegionalProduct.data[i])
            temp.push(tempData)
          }
          $this.topData[index].chart = temp
        })
      },
      getPeopleLive_total:function(index){
        let $this = this
        $this.getDataArray[index][0]().then(function(data) {
          $this.bottomData[index-3].msg.data = data.data.detail
          $this.bottomData[index-3].chart.data = data.data.chart
        })
      },
      getCityComponent_total:function(index) {
        let $this = this
        this.getDataArray[index][0]().then(function(data){
          console.log(data)

          // $this.bottomData[index-3].msg.data = data.data.detail
          $this.bottomData[index-3].msg.data = null
          $this.bottomData[index-3].chart.data = data.data.chart
        })
      }
    },
    updated:function () {
      $('.tabClick').eq(this.index).click()
    }
  }
</script>

<style scoped>
  .b_a {
    width: 1860px;
    height: 430px;
    text-align: left;
    margin: 0px auto 20px;
    overflow: hidden;
  }

  .b_b {
    width: 1860px;
    /*height: 460px;*/
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .b_a_a {
    width: 606px;
    height: 420px;
    text-align: left;
    margin: 0px auto;
    padding: 20px 15px;
    border: #0238a3 solid 1px;
    border-radius: 5px;
    float: left;
    display: inline;
    /*overflow: hidden;*/
  }
  .b_b_a {
    width: 910px;
    height: 415px;
    text-align: left;
    margin: 0px auto;
    padding: 20px 30px;
    border: #0238a3 solid 1px;
    border-radius: 5px;
    float: left;
    display: inline;
    /*overflow: hidden;*/
  }

  .b_a_a:nth-child(2) {
    margin-left: 20px;
    margin-right: 20px;
  }
  .b_b_a:nth-child(2) {
    margin-left: 40px;
  }
</style>
