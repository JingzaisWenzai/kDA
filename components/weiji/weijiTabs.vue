<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="myTabs">
    <el-tab-pane label="门诊统计" name="first">
      <div>
        <div class="title"><span>近一年门诊人次</span></div>
        <div id="chart1" class="myChart">

        </div>
        <div class="title"><span>各医院门诊人次</span></div>
        <div id="chart2" class="myChart special">

        </div>
        <div id="chart3" class="myChart special">

        </div>
        <div class="title"><span>各科室门诊人次</span></div>
        <div id="chart4" class="myChart">

        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="住院统计" name="second">
      <div>
        <div class="title"><span>近一年住院人次</span></div>
        <div id="chart5" class="myChart">

        </div>
        <div class="title"><span>各医院住院人次</span></div>
        <div id="chart6" class="myChart special">

        </div>
        <div id="chart7" class="myChart special">

        </div>
        <div class="title">
          <span>各科室住院人次</span>
          <div style="float: right;padding-right: 40px;">
            <el-select v-model="value" placeholder="请选择" @change="elSelect" size="small" class="mySelect">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div id="chart8" class="myChart">

        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="卫生人员" name="third">
      <div>
        <div class="title"><span>各医院卫生人员</span></div>
        <div id="chart9" class="myChart">

        </div>
        <div class="title"><span>卫生人员分布情况</span></div>
        <div id="chart10" class="myChart special">

        </div>
        <div id="chart11" class="myChart special">

        </div>
        <div id="chart12" class="myChart special">

        </div>
        <div id="chart13" class="myChart special">

        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="特殊病种" name="fourth">
      <div>
        <div class="title"><span>特殊病种数量走势</span></div>
        <div id="chart14" class="myChart">

        </div>
        <div class="title"><span>各医院特殊病种统计</span></div>
        <div id="chart15" class="myChart">

        </div>
        <div class="title"><span>全部发病次数统计</span></div>
        <div id="chart16" class="myChart special">

        </div>
        <div id="chart17" class="myChart special">

        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>

  import {showLineCharts,showPieCharts} from '../../static/js/OneMap/DX/DX_Chart'

  //门诊信息BI
  import {outpatient_lately,outpatient_hospital,outpatient_month,outpatient_department} from '../../api/weiji'
  //住院信息BI
  import {hospitalization_lately,hospitalization_hospital,hospitalization_month,hospitalization_department} from '../../api/weiji'
  //卫生人员信息BI
  import {healthPersonnel_num,healthPersonnel_Authorized,healthPersonnel_DOCTOR_TYPE,healthPersonnel_JOB_LEVEL_CODE,healthPersonnel_CSZYLBDM} from '../../api/weiji'
  //特殊病种信息BI
  import {diseases_trend,diseases_hospital,diseases_num,diseases_proportion} from '../../api/weiji'

  export default {
    name: 'weijiTabs',
    props: [],
    components: {},
    data() {
      return {
        activeName: 'first',
        chartsObj:[],
        value:'医院一',
        options:[
          {label:'医院一',value:'01'},
          {label:'医院二',value:'02'},
          {label:'医院三',value:'03'},
          {label:'医院四',value:'04'},
          {label:'医院五',value:'05'},
          {label:'医院六',value:'06'}
        ]
      }
    },
    mounted() {
      for(let i = 0,j = 17;i<j;i+=1){
        this.chartsObj.push({})
        if(i<4){
          this.getData(i+1)
        }
      }
    },
    methods: {
      reloadCharts(index,data,type){
        //重新赋值之前，注销echarts实例
        if(this.chartsObj[index].getOption !== undefined){
          echarts.dispose(this.chartsObj[index])
        }
        if(type === 'bar' || type === 'line'){
          this.chartsObj[index] = showLineCharts(data)
        }else if(type === 'pie'){
          this.chartsObj[index] = showPieCharts(data)
        }
      },
      getData(index){
        let $this = this
        switch (index){
          case 1:
            outpatient_lately().then(function(data) {
              console.log(1111,data)
              $this.reloadCharts(index-1,{
                "id":"chart"+index,
                xAxis : { axisLabel: { interval: 'auto', rotate: '45' }},
                "data":[
                  {
                    "name":"医院近一年门诊人次",
                    "type": "line",
                    "data":data,
                  }
                ]
              },'line')
            })
            break;
          case 2:
          outpatient_hospital().then(function(data) {
            $this.reloadCharts(index-1,{
              "id":"chart"+index,
              title: {
                text: '近两年记录总和',
                left: 'center',
                top:'bottom',
                textStyle:{
                  color:'white',
                  fontSize:14
                }
              },
              legend:{
                show:false
              },
              "data":[
                {
                  "name":"近两年记录总和",
                  "type": "pie",
                  "data":data,
                  roseType : false,
                  radius: ['15%', '55%'],
                  labelLine:{
                    show:true,
                    smooth: 0.2,
                    length: 5,
                    length2: 2
                  }
                }
              ]
            },'pie')
          })
            break;
          case 3:
          outpatient_month().then(function(data) {
            $this.reloadCharts(index-1,{
              "id":"chart"+index,
              title: {
                text: '近一个月各医院门诊人次',
                left: 'center',
                top:'bottom',
                textStyle:{
                  color:'white',
                  fontSize:14
                }
              },
              legend:{
                show:false
              },
              "data":[
                {
                  "name":"近一个月各医院门诊人次",
                  "type": "pie",
                  "data":data,
                  roseType : false,
                  radius: ['15%', '55%'],
                  labelLine:{
                    show:true,
                    smooth: 0.2,
                    length: 5,
                    length2: 2
                  }
                }
              ]
            },'pie')
          })
            break;
          case 4:
          outpatient_department().then(function(data) {
            console.log(4444,data)
          })
            this.reloadCharts(index-1,{
              "id":"chart"+index,
              "data":[
                {
                  "name":"序列一",
                  "type": "bar",
                  "data":[{"name":"Mon","value":820},{"name":"Tue","value":820},{"name":"Wed","value":820}],
                }
              ]
            },'bar')
            break;
          case 5:
            hospitalization_lately().then(function(data) {
              console.log(5555,data)
            })
            this.reloadCharts(index-1,{
              "id":"chart"+index,
              "data":[
                {
                  "name":"序列一",
                  "type": "line",
                  "data":[{"name":"Mon","value":820},{"name":"Tue","value":820},{"name":"Wed","value":820}],
                }
              ]
            },'line')
            break;
          case 6:
          hospitalization_hospital().then(function(data) {
            console.log(6666,data)
          })
            this.reloadCharts(index-1,{
              "id":"chart"+index,
              "data":[
                {
                  "name":"序列一",
                  "type": "pie",
                  "data":[{"name":"Mon","value":820},{"name":"Tue","value":820},{"name":"Wed","value":820}],
                }
              ]
            },'pie')
            break;
          case 7:
          hospitalization_month().then(function(data) {
            console.log(7777,data)
          })
            this.reloadCharts(index-1,{
              "id":"chart"+index,
              "data":[
                {
                  "name":"序列一",
                  "type": "pie",
                  "data":[{"name":"Mon","value":820},{"name":"Tue","value":820},{"name":"Wed","value":820}],
                }
              ]
            },'pie')
            break;
          case 8:
          hospitalization_department().then(function(data) {
            console.log(8888,data)
          })
            this.reloadCharts(index-1,{
              "id":"chart"+index,
              "data":[
                {
                  "name":"序列一",
                  "type": "bar",
                  "data":[{"name":"Mon","value":820},{"name":"Tue","value":820},{"name":"Wed","value":820}],
                }
              ]
            },'bar')
            break;
          case 9:
            healthPersonnel_num().then(function(data) {
              console.log(9999,data)
              $this.reloadCharts(index-1,{
                "id":"chart"+index,
                yAxis:[{
                  name:'人',
                  type: 'value'
                }],
                "data":[
                  {
                    "name":"医院卫生人员",
                    "type": "bar",
                    "data":data,
                  }
                ]
              },'bar')
            })
            break;
          case 10:
          healthPersonnel_Authorized().then(function(data) {
            console.log(1010,data)
            $this.reloadCharts(index-1,{
              "id":"chart"+index,
              title: {
                text: '卫生人员编制情况',
                left: 'center',
                top:'bottom',
                textStyle:{
                  color:'white',
                  fontSize:14
                }
              },
              legend:{
                show:false
              },
              "data":[
                {
                  "name":"卫生人员编制情况",
                  "type": "pie",
                  "data":data,
                  roseType : false,
                  radius: ['15%', '55%'],
                  labelLine:{
                    show:true,
                    smooth: 0.2,
                    length: 5,
                    length2: 2
                  }
                }
              ]
            },'pie')
          })
            break;
          case 11:
          healthPersonnel_DOCTOR_TYPE().then(function(data) {
            console.log(1212,data)
            $this.reloadCharts(index-1,{
              "id":"chart"+index,
              title: {
                text: '医师执业类别情况',
                left: 'center',
                top:'bottom',
                textStyle:{
                  color:'white',
                  fontSize:14
                }
              },
              legend:{
                show:false
              },
              "data":[
                {
                  "name":"医师执业类别情况",
                  "type": "pie",
                  "data":data,
                  roseType : false,
                  radius: ['15%', '55%'],
                  labelLine:{
                    show:true,
                    smooth: 0.2,
                    length: 5,
                    length2: 2
                  }
                }
              ]
            },'pie')
          })
            break;
          case 12:
          healthPersonnel_JOB_LEVEL_CODE().then(function(data) {
            console.log(1313,data)
            $this.reloadCharts(index-1,{
              "id":"chart"+index,
              title: {
                text: '专业技术职务（聘）情况',
                left: 'center',
                top:'bottom',
                textStyle:{
                  color:'white',
                  fontSize:14
                }
              },
              legend:{
                show:false
              },
              "data":[
                {
                  "name":"专业技术职务（聘）情况",
                  "type": "pie",
                  "data":data,
                  roseType : false,
                  radius: ['15%', '55%'],
                  labelLine:{
                    show:true,
                    smooth: 0.2,
                    length: 5,
                    length2: 2
                  }
                }
              ]
            },'pie')
          })
            break;
          case 13:
          healthPersonnel_CSZYLBDM().then(function(data) {
            console.log(1414,data)
            $this.reloadCharts(index-1,{
              "id":"chart"+index,
              title: {
                text: '从事的专业类别情况',
                left: 'center',
                top:'bottom',
                textStyle:{
                  color:'white',
                  fontSize:14
                }
              },
              legend:{
                show:false
              },
              "data":[
                {
                  "name":"从事的专业类别情况",
                  "type": "pie",
                  "data":data,
                  roseType : false,
                  radius: ['15%', '55%'],
                  labelLine:{
                    show:true,
                    smooth: 0.2,
                    length: 5,
                    length2: 2
                  }
                }
              ]
            },'pie')
          })
            break;
          case 14:
            diseases_trend().then(function(data) {
              console.log(1515,data)
              for(let i = 0,j = data.length;i<j;i+=1){
                data[i].type = 'line'
              }
              $this.reloadCharts(index-1,{
                "id":"chart"+index,
                xAxis : { axisLabel: { interval: 'auto', rotate: '45' }},
                "data":data
              },'line')
            })
            // this.reloadCharts(index-1,{
            //   "id":"chart"+index,
            //   "data":[
            //     {
            //       "name":"序列一",
            //       "type": "line",
            //       "data":[{"name":"Mon","value":820},{"name":"Tue","value":820},{"name":"Wed","value":820}],
            //     }
            //   ]
            // },'line')
            break;
          case 15:
          diseases_hospital().then(function(data) {
            console.log(1616,data)
            for(let i = 0,j = data.length;i<j;i+=1){
              data[i].type = 'bar'
            }
            $this.reloadCharts(index-1,{
              "id":"chart"+index,
              "data":data
            },'bar')
          })
            break;
          case 16:
            diseases_num().then(function(data) {
              console.log(1717,data)
              $this.reloadCharts(index-1,{
                "id":"chart"+index,
                title: {
                  text: '特殊病种数量',
                  left: 'center',
                  top:'bottom',
                  textStyle:{
                    color:'white',
                    fontSize:14
                  }
                },
                legend:{
                  show:false
                },
                "data":[
                  {
                    "name":"特殊病种数量",
                    "type": "pie",
                    "data":data,
                    roseType : false,
                    radius: ['15%', '55%'],
                    labelLine:{
                      show:true,
                      smooth: 0.2,
                      length: 5,
                      length2: 2
                    }
                  }
                ]
              },'pie')
            })
            break;
          case 17:
            diseases_proportion().then(function(data) {
              console.log(1818,data)
              $this.reloadCharts(index-1,{
                "id":"chart"+index,
                title: {
                  text: '所有初诊、确证比例',
                  left: 'center',
                  top:'bottom',
                  textStyle:{
                    color:'white',
                    fontSize:14
                  }
                },
                legend:{
                  show:false
                },
                "data":[
                  {
                    "name":"所有初诊、确证比例",
                    "type": "pie",
                    "data":data,
                    roseType : false,
                    radius: ['15%', '55%'],
                    labelLine:{
                      show:true,
                      smooth: 0.2,
                      length: 5,
                      length2: 2
                    }
                  }
                ]
              },'pie')
            })
            break;
          default:
            break;
        }
      },
      handleClick(tab, event) {
        let num = Number(tab.index)
        switch (num){
          case 0:
            for(let i = 0,j = 4;i<j;i+=1){
              this.getData(i+1)
            }
            break;
          case 1:
            for(let i = 4,j = 8;i<j;i+=1){
              this.getData(i+1)
            }
            break;
          case 2:
            for(let i = 8,j = 13;i<j;i+=1){
              this.getData(i+1)
            }
            break;
          case 3:
            for(let i = 13,j = 17;i<j;i+=1){
              this.getData(i+1)
            }
            break;
          default:
            break;
        }
      },
      elSelect(){
        console.log(this.value)
      }
    },
    beforeDestroy() {

    }
  }
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">
  .myTabs {
    width: 600px;
    .el-tabs__item {
      font-size: 20px;
      color: white;
    }
    .el-tabs__item.is-active {
      color: #409EFF;
    }
    .el-tabs__item:hover{
      color: #409EFF;
    }
    .myChart{
      height: 250px;
      width: 600px;
    }
    .special{
      width: 295px;
      display: inline-block;
    }
    .title{
      margin: 10px auto;
      /*color: #409EFF;*/
      color: white;
    }
    .mySelect{
      width: 150px;
      .el-input__inner{
        color: #409EFF;
      }
    }
  }
  .el-select-dropdown__item{
    color: #409EFF;
  }
  .el-input__inner {
    background-color: rgba(2,22,35,0.8);
    box-shadow: 0 0 5px #1c609d;
    border: 1px solid #1c609d;
    border-radius: 5px;
  }
</style>
