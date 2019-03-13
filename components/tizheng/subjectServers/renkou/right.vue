<template>
  <div class="renkou_right">
    <el-tabs v-model="activeName" class="right_border_card" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="人口基本情况" name="first">
        <!--<div class="title">人口基本情况</div>-->
        <ul>
          <!--<li v-for="(item, index) in this.chartData1" v-bind:key="index+2">-->
          <!--<bar-chart v-bind:chartData="{item,index:index+2}"></bar-chart>-->
          <!--</li>-->
          <li>
            <bar-chart v-bind:chartData="{item:chartData1,index:2}"></bar-chart>
          </li>
          <li>
            <bar-chart v-bind:chartData="{item:chartData2,index:3,type:'pie'}"></bar-chart>
          </li>
          <li>
            <bar-chart v-bind:chartData="{item:chartData3,index:4,type:'bar'}"></bar-chart>
          </li>
          <li>
            <bar-chart v-bind:chartData="{item:chartData4,index:5,type:'line'}"></bar-chart>
          </li>
        </ul>
        <!--<div class="bottom_select">-->
          <!--<div :class="left_select?'left_select select':'select'" @click.stop="nextPage_temp(0)"></div>-->
          <!--<div :class="right_select?'right_select select right':'select right'" @click.stop="nextPage_temp(1)"></div>-->
        <!--</div>-->
      </el-tab-pane>
      <el-tab-pane label="人才引进情况" name="second">
        <ul>
          <li>
            <bar-chart v-bind:chartData="{item:chartData5,index:6,type:'pie'}"></bar-chart>
          </li>
          <li>
            <bar-chart v-bind:chartData="{item:chartData6,index:7,type:'bar'}"></bar-chart>
          </li>
          <li>
            <bar-chart v-bind:chartData="{item:chartData8,index:9,type:'pie'}"></bar-chart>
          </li>
          <li>
            <bar-chart v-bind:chartData="{item:chartData7,index:10,type:'line'}"></bar-chart>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="特殊人口情况" name="third">
        <ul>
          <li>
            <bar-chart v-bind:chartData="{item:chartData9,index:11,type:'bar'}"></bar-chart>
          </li>
          <li>
            <bar-chart v-bind:chartData="{item:chartData10,index:12,type:'bar'}"></bar-chart>
          </li>
          <li style="width: 100%">
            <bar-chart v-bind:chartData="{item:chartData11,index:13,type:'bar'}"></bar-chart>
          </li>
          <!--<li>-->
            <!--孕妇-->
          <!--</li>-->
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import barChart from '../../../../components/tizheng/subjectServers/common/barChart_01'
  import {
    population_rightOne,
    population_rightTwo,
    population_rightThree,
    population_rightFour,
    population_rightFive,
    population_rightSix,
    population_rightSeven,
    population_rightEight,
    population_rightNight,
    population_rightTen,
    population_rightEleven,
    population_rightTwelve
  } from '../../../../api/subjectServers'
  import bus from '../../../../assets/js/main'
  import {bubbleSort} from '../../../../utils/validate'

  export default {
    name: 'right',
    components: { barChart },
    data: function() {
      return {
        chartData1: null,
        chartData2: null,
        chartData3: null,
        chartData4: null,
        chartData5: null,
        chartData6: null,
        chartData7: null,
        chartData8: null,
        chartData9: null,
        chartData10: null,
        chartData11: null,
        chartData12: null,
        right_select: true,
        left_select: false,
        index: 0,
        activeName: 'first',
        dataArray: [population_rightOne, population_rightTwo, population_rightThree, population_rightFour, population_rightFive, population_rightSix, population_rightSeven, population_rightEight, population_rightNight, population_rightTen, population_rightEleven, population_rightTwelve]
      }
    },
    watch:{
      '$store.state.addressStreet':function(val, oldVal) {
        this.initData()
        return this.$store.state.addressStreet
      }
    },
    mounted() {
      bus.$emit('showLoading', true)
      this.initData()
      bus.$on('selectedAddress', this.selectedAddress)
    },
    methods: {
      handleClick(tab, event) {
        this.initData()
      },
      selectedAddress(params) {
        if (params.search('-') === -1) {
          this.getData({ street: params })
        } else {
          let temp = params.split('-')
          this.getData({ street: temp[0], community: temp[1] })
        }
        bus.$emit('showLoading', true)
      },
      getPopulation_rightOne(params) {
        let $this = this
        population_rightOne(params).then(function(data) {

          $this.chartData1 = {
            title: data.name,
            chartData: {
              data: [data]
            }
          }
        })

      },
      getPopulation_rightTwo(params) {
        let $this = this
        population_rightTwo(params).then(function(data) {

          $this.chartData2 = {
            title: data.name,
            chartData: {
              data: [data]
            }
          }
        })

      },
      getPopulation_rightThree(params) {
        let $this = this
        population_rightThree(params).then(function(data) {

          let tempArray = []
          for(let i = 0,j = data.data.length-1;i<j;i+=1){
            let temp = {
              name:data.data[i].name,
              type:'bar',
              data:[]
            }
            if(i === 0){
              temp.barGap = '-100%'
            }
            for(let n = 0,m = data.data[i].data.length;n<m;n+=1){
              if(i === 0){
                temp.data.push({
                  name:data.data[i].data[n].time,
                  value:0-Number(data.data[i].data[n].value)
                })
              }else {
                temp.data.push({
                  name:data.data[i].data[n].time,
                  value:Number(data.data[i].data[n].value)
                })
              }
            }
            tempArray.push(temp)
          }

          $this.chartData3 = {
            title: data.name,
            chartData: {
              tooltip:{
                formatter:function(a, b, c) {
                  console.log(a,b,c)
                  let temp = a[0].name+'<br/>'
                  for(let i = 0,j = a.length;i<j;i+=1){
                    if(a[i].value < 0){
                      a[i].value = (-1)*a[i].value
                    }
                    temp += a[i].seriesName+'：'+a[i].value+'人<br/>'
                  }
                  return temp
                }
              },
              yAxis:[
                {
                  axisLabel: {
                    formatter: function(a,b,c){
                      if(a>0){
                        return '女'+a
                      }else if(a === 0){
                        return 0
                      }else{
                        return '男'+(-1)*a
                      }
                    }
                  }
                }
              ],
              xAxis: { axisLabel: { interval: 'auto', rotate: '45' } },
              data: tempArray
            }
          }
          console.log(tempArray)
          return ;

          let tempArray1 = {}
          for(let i = 0,j = data.data.length;i<j;i+=1){
            let tempArray2 = [],tempData = []
            for(let n = 0,m = data.data[i].data.length;n<m;n+=1){
              tempArray2.push(Number(data.data[i].data[n].value))
              tempData.push({
                name:data.data[i].data[n].time,
                value:data.data[i].data[n].value
              })
            }
            tempArray1[data.data[i].name] = bubbleSort(tempArray2).reverse()[0]
            data.data[i].data = tempData
          }

          for (let i = 0, j = data.data.length; i < j; i += 1) {
            if (i === data.data.length-1) {
              data.data[i].type = 'funnel'
              data.data[i].left = '0%'
              data.data[i].top = '50%'
              data.data[i].width = '80%'
              data.data[i].height = '50%'
              data.data[i].label = {
                normal: {
                  position:'right',
                  formatter: '{b}总'
                },
                emphasis: {
                  position: 'inside',
                  // formatter: '{b}总: {c}'
                  formatter: '{b}总'
                }
              }
              data.data[i].labelLine = {
                normal: {
                  show: false
                }
              }
              data.data[i].itemStyle = {
                normal: {
                  opacity: 0.6
                }
              }
            } else {
              data.data[i].type = 'funnel'
              data.data[i].label = {
                normal: {
                  position: 'inside',
                  formatter: '{a}:{c}',
                  textStyle: {
                    color: '#fff'
                  }
                },
                emphasis: {
                  position: 'inside',
                  formatter: '{b}: {c}'
                }
              }
              data.data[i].itemStyle = {
                normal: {
                  opacity: 0.5,
                  borderColor: '#fff',
                  borderWidth: 2
                }
              }
              data.data[i].height = '50%'
              data.data[i].top = '0'
              if(i === 0){
                data.data[i].left = (100-tempArray1[data.data[i].name]/tempArray1['全部']*100)/2-5+'%'
                data.data[i].width = tempArray1[data.data[i].name]/tempArray1['全部']*100-10+'%'
                data.data[i].sort = 'ascending'
              }else {
                data.data[i].top = '50%'
                data.data[i].left = (100-tempArray1[data.data[i].name]/tempArray1['全部']*100)/2-5+'%'
                data.data[i].width = tempArray1[data.data[i].name]/tempArray1['全部']*100-10+'%'
              }
            }
          }

          data.data.push({
            data:data.data[data.data.length-1].data,
            name:'总',
            type: 'funnel',
            left: '0%',
            width: '80%',
            height: '50%',
            sort: 'ascending',
            top: '0%',
            label: {
              normal: {
                formatter: '{b}总'
              },
              emphasis: {
                position: 'inside',
                formatter: '{b}总'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                opacity: 0.7
              }
            }
          })

          $this.chartData3 = {
            title: data.name,
            chartData: {
              data: [data.data[2],data.data[3],data.data[0],data.data[1]]
            }
          }
        })

      },
      getPopulation_rightFour(params) {
        let $this = this
        population_rightFour(params).then(function(data) {

          console.log(data)
          for(let i = 0,j = data.data.length;i<j;i+=1){
            let temp = []
            for (let n = 0, m = data.data[i].data.length; n < m; n += 1) {
              temp.push({
                name: data.data[i].data[n].time,
                value: data.data[i].data[n].value
              })
            }
            data.data[i].data = temp
            if(i !== j-1){
              data.data[i].type = 'bar'
              data.data[i].type = 'line'
            }else {
              data.data[i].type = 'line'
              data.data[i].yAxisIndex = 1
            }
          }

          $this.chartData4 = {
            title: data.name,
            chartData: {
              yAxis: [
                {
                  type: 'value',
                  name: data.data[0].name,
                  axisLabel: {
                    formatter: '{value} 人'
                  }
                }
              ],
              color:["#e6b600"],
              data: [data.data[0]]
            }
          }
        })

      },
      getPopulation_rightFive(params) {
        let $this = this
        population_rightFive(params).then(function(data) {

          let temp = []
          for (let n = 0, m = data.data.length; n < m; n += 1) {
            for (let i in data.data[n]) {
              temp.push({
                name: i,
                value: data.data[n][i]
              })
            }
          }

          data.data = temp

          $this.chartData5 = {
            title: data.name,
            chartData: {
              legend: {
                show: false
              },
              data: [data]
            }
          }
        })

      },
      getPopulation_rightSix(params) {
        let $this = this
        population_rightSix(params).then(function(data) {

          // console.log(data)
          let temp = []
          for (let n = 0, m = data.data.length; n < m; n += 1) {
            temp.push({
              name: data.data[n].time,
              value: data.data[n].value
            })
          }

          data.data = temp
          data.type = 'bar'

          $this.chartData6 = {
            title: data.name,
            chartData: {
              xAxis: { axisLabel: { interval: 'auto', rotate: '45' } },
              yAxis:[{name:'万元'}],
              data: [data]
            }
          }
        })

      },
      getPopulation_rightSeven(params) {
        let $this = this
        // population_rightSeven(params).then(function(data) {
        //
        //   $this.chartData7 = {
        //     title: data.name,
        //     chartData: {
        //       data: [data]
        //     }
        //   }
        // })
        $this.chartData7 = $this.chartData4

      },
      getPopulation_rightEight(params) {
        let $this = this
        population_rightEight(params).then(function(data) {

          console.log(data)
          let temp = []
          for (let i in data) {
            temp.push({
              name: i,
              value: data[i]
            })
          }

          data.data = temp
          data.name = '引进人口学历构成'

          $this.chartData8 = {
            title: '引进人口学历构成',
            chartData: {
              data: [data]
            }
          }
        })

      },
      getPopulation_rightNine(params) {
        let $this = this
        population_rightNight(params).then(function(data) {

          let temp = []
          for (let n = 0, m = data.data.length; n < m; n += 1) {
            temp.push({
              name: data.data[n].time,
              value: data.data[n].value
            })
          }

          data.data = temp
          data.type = 'bar'

          $this.chartData9 = {
            title: data.name,
            chartData: {
              color:["#e6b600", "#0098d9"],
              data: [data]
            }
          }
        })

      },
      getPopulation_rightTen(params) {
        let $this = this
        population_rightTen(params).then(function(data) {

          data.type = 'bar'
          $this.chartData10 = {
            title: data.name,
            chartData: {
              color:["#0098d9"],
              xAxis: { axisLabel: { interval: 'auto', rotate: '45' } },
              data: [data]
            }
          }
        })

      },
      getPopulation_rightEleven(params) {
        let $this = this
        population_rightEleven(params).then(function(data) {

          data.type = 'bar'
          $this.chartData11 = {
            title: data.name,
            chartData: {
              color:["#32a487"],
              xAxis: { axisLabel: { interval: 'auto', rotate: '45' } },
              data: [data]
            }
          }
        })

      },
      // getPopulation_rightTwelve(params) {
      //   let $this = this
      //   population_rightTwelve(params).then(function(data) {
      //
      //     $this.chartData12 = {
      //       title:data.name,
      //       chartData:{
      //         data:[data]
      //       }
      //     }
      //   })
      //
      // },
      initData(){
        let temp = this.$store.state.addressStreet
        if(this.$store.state.addressStreet.search('福田区') !== -1 && this.$store.state.addressStreet.search('街道') === -1){
          this.getData()
        }else {
          this.getData({street:temp})
        }
      },
      getData(params) {
        if (this.activeName === 'first') {
          this.getPopulation_rightOne(params)
          this.getPopulation_rightTwo(params)
          this.getPopulation_rightThree(params)
          this.getPopulation_rightFour(params)
          // if (this.chartData1 === null) {
          //   this.getPopulation_rightOne(params)
          // }
          // if (this.chartData2 === null) {
          //   this.getPopulation_rightTwo(params)
          // }
          // if (this.chartData3 === null) {
          //   this.getPopulation_rightThree(params)
          // }
          // if (this.chartData4 === null) {
          //   this.getPopulation_rightFour(params)
          // }
        } else if (this.activeName === 'second') {
          this.getPopulation_rightFive(params)
          this.getPopulation_rightSix(params)
          this.getPopulation_rightSeven(params)
          this.getPopulation_rightEight(params)
          // if (this.chartData5 === null) {
          //   this.getPopulation_rightFive(params)
          // }
          // if (this.chartData6 === null) {
          //   this.getPopulation_rightSix(params)
          // }
          // if (this.chartData7 === null) {
          //   this.getPopulation_rightSeven(params)
          // }
          // if (this.chartData8 === null) {
          //   this.getPopulation_rightEight(params)
          // }
        } else {
          this.getPopulation_rightNine(params)
          this.getPopulation_rightTen(params)
          this.getPopulation_rightEleven(params)
          // this.getPopulation_rightOne(params)
          // if (this.chartData9 === null) {
          //   this.getPopulation_rightNine(params)
          // }
          // if (this.chartData10 === null) {
          //   this.getPopulation_rightTen(params)
          // }
          // if (this.chartData11 === null) {
          //   this.getPopulation_rightEleven(params)
          // }
          // if (this.chartData12 === null) {
          //   // this.getPopulation_rightTwelve()
          // }
        }
      },
      nextPage_temp(type) {
        console.log('888')
        if (type === 0) {
          if (this.left_select === false) {

          }
          if (this.index === 0) {
            this.left_select = false
          } else {
            this.index -= 1
            this.right_select = true
          }
        } else {
          if (this.right_select === false) {

          }
          if (this.index === 1) {
            this.right_select = false
          } else {
            this.index += 1
            this.left_select = true
          }
        }
      }
    },
    beforeDestroy() {
      bus.$off('selectedAddress')
    }
  }
</script>

<style lang="scss" scoped>
  .renkou_right {
    width: 830px;
    .right_border_card {
      background: transparent;
      border: none;
    }
    .title {
      font-size: 30px;
      font-weight: bolder;
      color: rgb(67, 211, 255);
      padding-bottom: 20px;
      text-align: left;
      background: url("../../../../assets/img/renkou.png") no-repeat;
      padding-left: 50px;
    }
    ul {
      padding: 0;
      width: 100%;
      li {
        width: 395px;
        /*height: 283px;*/
        height: 370px;
        list-style: none;
        display: inline-block;
      }
      float: left;
    }
    .bottom_select {
      .select {
        width: 38px;
        height: 38px;
        background: url("../../../../assets/img/left.png") no-repeat;
        display: inline-block;
        cursor: auto;
      }
      .right {
        margin-left: 20px;
        background: url("../../../../assets/img/right.png") no-repeat;
      }
      .right_select {
        background: url("../../../../assets/img/right_select.png") no-repeat;
        cursor: pointer;
        position: relative;
        left: 20px;
      }
      .left_select {
        background: url("../../../../assets/img/left_select.png") no-repeat;
        cursor: pointer;
      }
    }
  }
</style>

<style lang="scss">
  .el-tabs--border-card > .el-tabs__header {
    background-color: transparent;
    border: none;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    color: white;
    font-size: 22px;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    background-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
  }
</style>
