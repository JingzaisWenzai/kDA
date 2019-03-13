<template>
  <div v-show="ewtrend" style="width: 1870px; height: 800px; margin: auto; position: relative; bottom: 950px; z-index: 3;">
    <!--预警趋势分析开始-->
    <div class="d">
      <div class="d_a">
        <a target="" href="javascript:void(0);" title="关闭" @click="closeTrend"><img src="../../static/img/yjzx/yjzx_15.png"/></a>
      </div>
      <div class="d_b">
        <ul>
          <li class="d_b_a">
            <a target="" :class="[{trend_click:currentTrend},{trend_noclick:currentInfo}]" href="javascript:void(0);" title="趋势" id="d_b_click" @click="getTrendList(0)">
              <span><img src="../../static/img/yjzx/yjzx_24hover.png"/></span>
              <span>趋势</span>
            </a>
          </li>
          <li class="d_b_b">
            <a target="" :class="[{trend_click:currentInfo},{trend_noclick:currentTrend}]" href="javascript:void(0);" title="对比" @click="getTrendList(1)">
              <span><img src="../../static/img/yjzx/yjzx_25.png"/></span>
              <span>对比</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="d_c" v-show="trendPage">
        <div class="d_c_a">
          <ul>
            <li @click="ewTitleClick(-1)"
                :class="[{trend_noclick:-1!=current},{trend_click:-1==current}]"
            >-&nbsp;&nbsp;全览&nbsp;&nbsp;-</li>
            <!-- <li :id="ms.id" v-for="(ms,index) in msgTitle" :key="index">
             </li>-->
            <!--<li v-for="(da,index) in ewTitle" :key="index" @click="ewTitleClick(index,$event)"-->
                <!--:class="[{trend_noclick:index!=current},{trend_click:index==current}]">-->
              <!--{{da}} - -->
            <!--</li>-->
            <li v-for="(value,key,index) in unitTemp" :key="index" @click="ewTitleClick(index,$event)"
                :class="[{trend_noclick:index!=current},{trend_click:index==current}]">
              {{key.split('预警')[0]}} -
            </li>

          </ul>
        </div>
        <div class="d_c_b">
          <ul>
            <li @click="ewTitleRankClick(-1)"
              :class="[{trend_noclick:-1!=currentRank},{trend_click:-1==currentRank}]"
            >-&nbsp;&nbsp;默认&nbsp;&nbsp;-</li>
            <li v-for="(da,index) in ewTitleRank" :key="index" @click="ewTitleRankClick(index)"
                :class="[{trend_noclick:index!=currentRank},{trend_click:index==currentRank}]">
            >{{da}} - </li>
           <!-- <li>增长率</li>
            <li>-</li>
            <li>下降率</li>
            <li>-</li>
            <li>平稳率</li>
            <li>-</li>
            <li>波动率</li>
            <li>-</li>-->
          </ul>
        </div>
        <div class="d_c_c">
          <ul v-show="echartCount[0]">
            <li :id="ms.id" v-for="(ms,index) in msgTitle" :key="index"></li>
          </ul>
          <ul v-for="(msc,index) in cechartData" :key="index" v-show="echartCount[index+1]">
            <li :id="ms.id" v-for="(ms,index) in cmsgTitle[index]" :key="index"></li>
          </ul>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
      <div class="d_d" v-show="contrastPage"><!--style="display: none;"-->
        <div class="d_d_a">
          <ul>
            <li @click="ewTitleComClick(-1)"
                :class="[{trend_noclick:-1!=currentCompaere},{trend_click:-1==currentCompaere}]"
            >-&nbsp;&nbsp;全览&nbsp;&nbsp;-</li>
            <!-- <li :id="ms.id" v-for="(ms,index) in msgTitle" :key="index">
             </li>-->
            <li v-for="(da,index) in ewTitle" :key="index" @click="ewTitleComClick(index)"
                :class="[{trend_noclick:index!=currentCompaere},{trend_click:index==currentCompaere}]">
              {{da}} -
            </li>
           <!-- <li>-&nbsp;&nbsp;全览&nbsp;&nbsp;-</li>
            <li>城市生命线</li>
            <li>-</li>
            <li>重点企业预警</li>
            <li>-</li>
            <li>生态环境</li>
            <li>-</li>
            <li>气象</li>
            <li>-</li>
            <li>地质灾害</li>
            <li>-</li>
            <li>三防</li>
            <li>-</li>
            <li>消防</li>
            <li>-</li>
            <li>安监</li>
            <li>-</li>
            <li>卫计</li>
            <li>-</li>
            <li>舆情</li>
            <li>-</li>-->
          </ul>
        </div>
        <div class="d_d_b">
          <div class="d_d_b_a" id="db">
            <!-- <script src="js/db.js" type="text/javascript" language="javascript"></script>-->
          </div>
          <div class="d_d_b_b" style="display: none;">
            <div class="d_d_b_b_a"  v-bind:style="{ 'padding-left':yearcurSty+'px'}">
              {{yearcur}}
            </div>
            <div class="d_d_b_b_b">
              <img src="../../static/img/yjzx/yjzx_26_2.png"/>
              <img src="../../static/img/yjzx/yjzx_26_3.png" v-bind:style="{ 'margin-left':valTime+'px'}"/>
            </div>
            <div class="d_d_b_b_c">
              <ul>
                <li v-for="(da,index) in ycurrent" :key="index" @click="animationTime(index)">{{da}}</li>
              <!--  <li>2016</li>
                <li>2017</li>
                <li>2018</li>-->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--预警趋势分析结束-->
  </div>
</template>
<script>
  import bus from '../../assets/js/main.js'
  import {line_echart} from '../../static/js/yjzx/line_echart.js';
  import {bar_echart} from '../../static/js/yjzx/bar_echart.js';
  import $ from 'jquery';
  import {getTrend} from "../../api/yjzxapi.js"
  import {getCom} from "../../api/yjzxapi.js"
  import {getCom2017} from "../../api/yjzxapi.js"
  import {alram_trend_rate,alram_trend_one,alram_trend_two,alram_trend_two_drillDown,alram_trend_one_drillDown} from '../../api/yjzx'
  import {unitTemp} from "../../utils/street_community";

  export default {
    data: function () {
      return {
        loading:true,
        yearcur:2018,
        yearcurSty:245,  //数字
        valTime:-50,    //滑动条
        ycurrent:[2015,2016,2017,2018],
        ewtrend: false,
        trendPage: true,
        contrastPage: false,

        echartCount:[true,false,false,false,false,false,false,false,false,false,false],
        ewTitle: [],
        ewTitleRank:[],
        mTitle: [],
        msgTitle: [],
        cmsgTitle:[],
        cechartData:[],
        echartData: {
          title: [],

          ydata: [],
          color: []

        },

        barEchartData:{},


        //用于样式  //标签颜色
        currentTrend:true,
        currentInfo:false,
        current:-1,  //趋势颜色
        currentRank:-1, //排行颜色
        currentCompaere:-1, //对比分析颜色
        myEcharts_one:[],
        myEcharts_bar:[],
        barData:[],
        unitTemp:unitTemp
      }
    },
    beforeDestroy(){
      bus.$off('openTrend')
    },
    mounted() {
      bus.$on('openTrend', (data) => {
        if ("futian" === data) {
          this.ewtrend = true;
          this.creatLineEchart();
        } else {
          this.ewtrend = false;
        }
      });
      this.getTrendData();
    },
    computed:{

    },
    methods: {
      animationTime(index){
        this.getComDataYear(this.ycurrent[index],index);

      },
      closeTrend() {
        this.ewtrend = false;
      },
      creatLineEchart() {
        console.log(1);
        for (var i = 0; i < this.msgTitle.length; i++) {
          this.myEcharts_one.push(line_echart(this.msgTitle[i].id, this.echartData, i));
        }
        // for (var i = 0; i < this.cmsgTitle.length; i++) {
        //   for (var j = 0; j < this.cmsgTitle[i].length; j++) {
        //     line_echart(this.cmsgTitle[i][j].id, this.cechartData[i], j);
        //   }
        // }
      },
      creatBarEchart() {
        this.myEcharts_bar = bar_echart("db",this.barEchartData);

      },
      getTrendList(data) {
        if (data == 0) {
          this.trendPage = true;
          this.contrastPage = false;
          this.currentInfo=false
          this.currentTrend=true;
          var $this = this
          alram_trend_one().then(function (data) {
          console.log(data)
            $this.loading = false
            for(let i = 0, j = data.length;i<j;i+=1){
              $this.myEcharts_one[i].setOption({
                title: {
                  text:data[i].name
                },
                xAxis: {
                  data: (function (xData) {
                    let xAxis = []

                    if(xData.length>4){
                      for(let i = 0,j = xData.length;i<j;i+=1){
                        xAxis.push(xData[i].name)
                      }
                    }else {
                      xAxis = ['1月', '4月', '8月', '12月']
                    }
                    return xAxis
                  })(data[i].data)
                },
                series: [{
                  // 根据名字对应到相应的系列
                  name: '个数',
                  data: data[i].data
                }]
              })
            }
          })
        } else {
          this.trendPage = false;
          this.contrastPage = true;
          console.log(222)
          this.creatBarEchart();
          console.log(333)

          this.currentTrend=false;
          this.currentInfo=true
          var $this = this
          alram_trend_two().then(function (data) {
            console.log(55555,data)
            $this.loading = false
            let name = [],dataArray = []
            for(let i in data){
              name.push(data[i].name)
              dataArray.push(data[i])
            }

            $this.ewTitle = name
            $this.barData = data
            $this.myEcharts_bar.setOption({
              yAxis: {
                data: name
              },
              series: [{
                // 根据名字对应到相应的系列
                name: (new Date()).getFullYear()+'',
                data: dataArray
              }]
            })

          })
        }

      },
      ewTitleClick(index) {
        console.log(index)
        console.log(unitTemp[event.target.innerText.split('-')[0].replace(/\s*/g,"")+'预警'])
        this.current = index;
        if (index == -1) {
          this.echartCount.splice(0,1,true);
        } else {
          index  = index +1;
          this.echartCount.splice(0,1,false);
          for(var i = 1;i<this.echartCount.length;i++){
            this.echartCount.splice(i,1,false);
            if(i==index){
              this.echartCount.splice(index,1,true);
            }
          }
          let $this = this
          alram_trend_one_drillDown({alarm_Name:event.target.innerText.split('-')[0].replace(/\s*/g,"")+'预警'}).then(function (data) {
            console.log(data)

            let tempobj= {title:[],data:[]}
            for(let i = 0,j = data.length;i<j;i+=1){
              tempobj.title.push(data[i].name)
              tempobj.data.push(data[i].data)
            }
            $this.cechartData[index-1].title = tempobj.title
            $this.cechartData[index-1].ydata = tempobj.data

            for (var i = 0; i < $this.cmsgTitle.length; i++) {
              if(i === index-1){
                for (var j = 0; j < $this.cechartData[i].title.length; j++) {
                  line_echart($this.cmsgTitle[i][j].id, $this.cechartData[i], j);
                }
              }
            }

          })
        }

      },
      ewTitleComClick(index) {
        this.currentCompaere = index;
        var $this = this
        if (index == -1) {
          // bar_echart("db",this.barEchartData);
          alram_trend_two().then(function (data) {
            console.log(data)
            $this.loading = false
            let name = [],dataArray = []
            for(let i in data){
              name.push(data[i].name)
              dataArray.push(data[i])
            }

            $this.ewTitle = name
            $this.barData = data
            $this.myEcharts_bar.setOption({
              yAxis: {
                data: name
              },
              series: [{
                // 根据名字对应到相应的系列
                name: (new Date()).getFullYear()+'',
                data: dataArray
              }]
            })

          })
        } else {
          // bar_echart("db", this.barEchartData.cBarEchart[index]);
          console.log($this.barData[index])
          alram_trend_two_drillDown({
            summary_code : $this.barData[index].code,
            date : (new Date()).getFullYear()+''
          }).then(function (data) {
            console.log(data)
            $this.loading = false
            let name = [],dataArray = []
            for(let i in data){
              name.push(data[i].name)
              dataArray.push(data[i])
            }

            // $this.ewTitle = name
            // $this.barData = data
            $this.myEcharts_bar.setOption({
              yAxis: {
                data: name
              },
              series: [{
                // 根据名字对应到相应的系列
                name: (new Date()).getFullYear()+'',
                data: dataArray
              }]
            })

          })
        }
      },
      ewTitleRankClick(index){
        this.currentRank = index;
        var $this = this
          switch (index){
            case -1:

              alram_trend_one().then(function (data) {
                console.log(data)
                $this.loading = false
                for(let i = 0, j = data.length;i<j;i+=1){
                  $this.myEcharts_one[i].setOption({
                    title: {
                      text:data[i].name
                    },
                    xAxis: {
                      data: (function (xData) {
                        let xAxis = []
                        console.log(xData)
                        if(xData.length>4){
                          for(let i = 0,j = xData.length;i<j;i+=1){
                            xAxis.push(xData[i].name)
                          }
                        }else {
                          xAxis = ['1月', '4月', '8月', '12月']
                        }
                        return xAxis
                      })(data[i].data)
                    },
                    series: [{
                      // 根据名字对应到相应的系列
                      name: '个数',
                      data: data[i].data
                    }]
                  })
                }



              })
              break;
            case 0:
             /* var arrdata = [];
              $(".d_c_c ul:nth-child(1)").find("li").each(function(index,obj){
                arrdata.push(obj);
                $(this).remove();
              });
              for(var i=arrdata.length-1;i>=0;i--){
                $(".d_c_c ul:nth-child(1)").append(arrdata[i])
              }*/

              alram_trend_rate().then(function (data) {
                $this.loading = false
                for(let i = 0, j = data.length;i<j;i+=1){
                  $this.myEcharts_one[i].setOption({
                    title: {
                      text:data[i].name
                    },
                    xAxis: {
                      data: (function (xData) {
                        let xAxis = []
                        if(xData.length>4){
                          for(let i = 0,j = xData.length;i<j;i+=1){
                            xAxis.push(xData[i].name)
                          }
                        }else {
                          xAxis = ['1月', '4月', '8月', '12月']
                        }
                        return xAxis
                      })(data[i].data)
                    },
                    series: [{
                      // 根据名字对应到相应的系列
                      name: '百分比',
                      data: (function (seriesData) {
                        for(let i = 0,j = seriesData.length;i<j;i+=1){
                          seriesData[i].value = seriesData[i].value*100
                        }
                        return seriesData
                      })(data[i].data)
                    }]
                  })
                }
              })
              break;
            case 1:
              break;
            case 2:

              break;
            case 3:

              break;
          }
      },
      //网络请求
      async getTrendData () {
        let trendData = await getTrend();
        let comData = await getCom();

        console.log('----')
        console.log(trendData)
        console.log('---')

      /*  let trendData = this.temp;*/
        this.ewTitle = trendData.ewTitle;
        this.ewTitleRank = trendData.ewTitleRank;
        console.log(99999,trendData)
        this.mTitle = trendData.msgTitle;
        this.msgTitle = trendData.msgTitle;
        this.echartData.title = trendData.echartData.title;
        this.echartData.ydata = trendData.echartData.ydata;
        this.echartData.color = trendData.echartData.color;
        this.cmsgTitle = trendData.cmsgTitle;

        this.cechartData = trendData.cechartData;

        this.barEchartData = comData;

        var $this = this
        alram_trend_one().then(function (data) {
          console.log(data)
          $this.loading = false
          let temp = []
          for(let i = 0, j = data.length;i<j;i+=1){
            temp.push(data[i].data)
            // if($this.myEcharts_one.length === 0)break
            // $this.myEcharts_one[i].setOption({
            //   title: {
            //     text:data[i].name
            //   },
            //   xAxis: {
            //     data: (function (xData) {
            //       let xAxis = []
            //
            //       if(xData.length>4){
            //         for(let i = 0,j = xData.length;i<j;i+=1){
            //           xAxis.push(xData[i].name)
            //         }
            //       }else {
            //         xAxis = ['1月', '4月', '8月', '12月']
            //       }
            //       return xAxis
            //     })(data[i].data)
            //   },
            //   series: [{
            //     // 根据名字对应到相应的系列
            //     name: '个数',
            //     data: data[i].data
            //   }]
            // })
          }
          let tempTitle = []
          for(let i in $this.unitTemp){
            tempTitle.push(i)
          }
          $this.echartData.title = tempTitle
          $this.echartData.ydata = temp
        })
      },
      async getComDataYear (year,index) {
        if(year === 2017) {
          let comData = await getCom2017();
          this.barEchartData = comData.data;
          bar_echart("db",this.barEchartData);
        }
        if(year === 2018) {
          let comData = await getCom();
          this.barEchartData = comData.data;
          bar_echart("db",this.barEchartData);
        }
        if(year === 2015) {

          this.barEchartData = {};
        }
        if(year === 2016) {

          this.barEchartData = {};
        }
        var arr = Object.getOwnPropertyNames(this.barEchartData);
        if(arr.length<=1) {
          alert("无数据");
          return false;
        }
        this.valTime = -280 + 75*index; //滑动条
        this.yearcurSty = 20 + 75*(index);//数字
        this.yearcur = this.ycurrent[index];


        //标签颜色
        this.currentCompaere = -1;
      }
    }
  }
</script>
<style scoped>
  /* ---------------------------预警趋势分析---------------------------------------------------------------------------------------------------*/
  .d {
    width: 1870px;
    height: 800px;
    text-align: left;
    margin: 0px auto;
    padding: 20px;
    overflow: hidden;
    /*position: absolute;*/
    /*bottom: 110px;*/
    /*right: 40px;*/
    border: #00d8ff solid 1px;
    border-radius: 5px;
    background-color: #041738;
    z-index: 2;
  }

  .d_a {
    /*width: 1870px;*/
    height: 23px;
    line-height: 23px;
    text-align: right;
    margin: 0px auto;
    overflow: hidden;
    cursor:pointer;
  }

  .d_a img {
    width: 23px;
    height: 23px;
  }

  .d_b {
    width: 1870px;
    height: 35px;
    line-height: 35px;
    text-align: left;
    margin: 0px auto 22px;
    overflow: hidden;
  }

  /*
    .d_b ul{width:602px; height:35px; line-height: 35px; text-align: left; margin: 0px 684px;  overflow: hidden;}
  */
  .d_b ul {
    width: 502px;
    height: 35px;
    line-height: 35px;
    text-align: left;
    margin: 0px 684px;
    overflow: hidden;
  }

  .d_b ul li {
    width: 250px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin: 0px auto;
    float: left;
    display: inline;
    overflow: hidden;
    cursor:pointer;
  }

  .d_b ul li:nth-child(1) {
    border-right: #4151a6 solid 2px;
  }

  .d_b ul li img {
    width: 35px;
    height: 35px;
    margin-right: 25px;
  }

  /*
    .d_b a{ height:35px; line-height: 35px; padding: 0px 40px; text-decoration: none; display: block; font-size: 26px; color: #00d8ff;}
  */
  .d_b a {
    /*width: 170px;*/
    height: 35px;
    line-height: 35px;
    padding: 0px 40px;
    text-decoration: none;
    display: block;
    font-size: 26px;
   /* color: #00d8ff;*/
  }

  .d_b ul li a:hover, .d_b ul li a:active, .d_b ul li a:focus {
    height: 35px;
    line-height: 35px;
    padding: 0px 40px;
    text-decoration: none;
    display: block;
    font-size: 26px;
    color: #ffab27;
  }

  .d_b_on {
    font-size: 26px;
    color: #00d8ff;
  }

  .d_b_click {
    font-size: 26px;
    color: #ffab27;
  }

  .d_b ul li span {
    float: left;
    display: inline;
    overflow: hidden;
  }

  .d_c {
    width: 1870px;
    height: 720px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_c_a {
    width: 1870px;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_c_a ul {
    width: 1210px;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px 330px;
    overflow: hidden;
  }

  .d_c_a ul li {
    cursor:pointer;
    width: auto;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px 5px;
    float: left;
    display: inline;
    overflow: hidden;
    font-size: 24px;
   /* color: #ffffff;*/
  }

  .d_c_a ul li:nth-child(1) {
    font-size: 24px;
   /* color: #ffab27;*/
  }

  .d_c_b {
    width: 1870px;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_c_b ul {
    width: 550px;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px 660px;
    overflow: hidden;
  }

  .d_c_b ul li {
    width: auto;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px 5px;
    float: left;
    display: inline;
    overflow: hidden;
    font-size: 24px;
    cursor:pointer;
  /*  color: #ffffff;*/
  }

  .d_c_b ul li:nth-child(1) {
    font-size: 24px;
    /*color: #ffab27;*/
  }

  .d_c_c {
    width: 1870px;
    height: 630px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_c_c ul {
    width: 1870px;
    height: 630px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_c_c ul li {
    width: 360px;
    height: 180px;
    text-align: left;
    margin: 15px 53.75px;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .d_d {
    width: 1870px;
    height: 720px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_d_a {
    width: 1870px;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_d_a ul {
    width: 1210px;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px 330px;
    overflow: hidden;
  }

  .d_d_a ul li {
    width: auto;
    height: 45px;
    line-height: 45px;
    text-align: left;
    margin: 0px 5px;
    float: left;
    display: inline;
    overflow: hidden;
    font-size: 18px;
    cursor: pointer;
   /* color: #ffffff;*/
  }

  .d_d_a ul li:nth-child(1) {
    font-size: 24px;
    /*color: #ffab27;*/
  }

  .d_d_b {
    width: 1540px;
    height: 640px;
    text-align: left;
    margin: 15px 0px 20px 330px;
    overflow: hidden;
  }

  .d_d_b_a {
    width: 1200px;
    height: 640px;
    text-align: left;
    margin: 0px 20px 0px 0px;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .d_d_b_b {
    width: 320px;
    height: 100px;
    text-align: left;
    margin: 540px 0px 0px 0px;
    float: left;
    display: inline;
    overflow: hidden;
  }

  .d_d_b_b_a {
   /* width: 230px;*/
    height: 38px;
    line-height: 38px;
    text-align: left;
    margin: 0px auto;
   /* padding-left: 90px;*/
    overflow: hidden;
    font-size: 21px;
    color: #0077ed;
  }

  .d_d_b_b_b {
    width: 320px;
    height: 25px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_d_b_b_b img:nth-child(2) {
    position:absolute;
  }

  .d_d_b_b_c {
    width: 320px;
    height: 37px;
    line-height: 37px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
    font-size: 17px;
    color: #ffffff;
  }

  .d_d_b_b_c ul {
    width: 320px;
    height: 37px;
    line-height: 37px;
    text-align: left;
    margin: 0px auto;
    overflow: hidden;
  }

  .d_d_b_b_c ul li {
    width: 78px;
    height: 37px;
    line-height: 37px;
    text-align: center;
    margin: 0px auto;
    float: left;
    display: inline;
    overflow: hidden;
    cursor:pointer;
  }
  .trend_click{
    color: #ffab27;
  }
  .trend_noclick{
    color: #e1eaff;
  }
  .trend{
    color: #00d8ff;
  }
.el-picker-panel{
  background: rgb(4,23,56) !important;
}
  .el-date-editor--daterange.el-input__inner{
    width: auto;
    background-color: #05294c;
  }
  .c_b_a_a_b table input{
    background-color: transparent;
  }
  .el-input__inner{
    border: #6370e2 solid 1px;
  }
  .el-picker-panel,.el-date-table th,.el-date-range-picker__content.is-left{
    border-color: #6370e2;
  }
  .el-date-editor .el-range-input{
    color: white;
  }
  .el-date-editor .el-range__close-icon{
    display: none;
  }
  .el-date-editor .el-range-separator{
    color: white;
  }
</style>
//transparent
