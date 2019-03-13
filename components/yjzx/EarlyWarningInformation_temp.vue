<template>
  <div v-if="ewinfo" style="width: 1870px;height: 800px;margin: auto;position: relative;bottom: 950px;z-index: 3;">
    <!--预警信息中心开始-->
    <div class="c">
      <div class="c_a">
        <div class="c_a_a">
          <span><img src="../../static/img/yjzx/yjzx_13.png"/></span>
          <span>预警信息中心</span>
        </div>
        <div class="c_a_b">
          <span><img src="../../static/img/yjzx/yjzx_14.png"/></span>
          <span>福田区</span>
          <span>&nbsp;&nbsp;&nbsp;{{todayData}}</span>
        </div>
        <div class="c_a_c">
          <a target="" href="javascript:void(0);" title="关闭" @click="closeInfo"><img src="../../static/img/yjzx/yjzx_15.png"/></a>
        </div>
      </div>
      <div class="c_b">
        <!--<dataPicker v-model="time" format="YYYY-MM-DD" :local="local" /><span style="width:45px;display: inline-block"></span>-->
        <!--<dataPicker v-model="time2" format="YYYY-MM-DD" :local="local2" />-->
        <div class="c_b_a">
          <div class="c_b_a_a">
            <div class="c_b_a_a_a">
              预警搜索
            </div>
            <div class="c_b_a_a_b">
              <table>
                <tr>
                  <td>时间范围</td>
                  <td>
                    <!--<span style="display: inline-block;width: 45%;"></span>-->
                    <!--<span>至</span>-->
                    <!--<span></span>-->
                    <el-date-picker
                      v-model="rangeTime"
                      type="daterange"
                      :picker-options="pickerOptions"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :default-value="defaultValue"
                      @change="searchAction"
                    >
                    </el-date-picker>
                  </td>
                </tr>
                <tr>
                  <td>街&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</td>
                  <td>
                   <!-- <select name="全部">
                      <option value ="全部">全部</option>
                      <option value ="第二季度">福保</option>
                      <option value ="第三季度">园岭</option>
                      <option value ="第四季度">南园</option>
                      <option value ="第四季度">福田</option>
                      <option value ="第四季度">香蜜湖</option>
                      <option value ="第四季度">沙头</option>
                      <option value ="第四季度">梅林</option>
                      <option value ="第四季度">华富</option>
                      <option value ="第四季度">莲花</option>
                      <option value ="第四季度">华强北</option>
                    </select>-->
                    <select name="全部" v-on:change="indexjd">
                       <!--<option value ="-1">全部</option>-->
                      <!--<option v-for="(value,index) in warningStreet" :value="index" :key="index">-->
                      <option v-for="(value,index) in street" :value="index" :key="index">
                        {{value.name}}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>社&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区</td>
                  <td>
                    <select name="全部" v-on:change="indexsq" v-bind:disabled="showCommunity">
                       <option value ="-1">全部</option>
                      <!--<option v-for="(value,index) in warningsocial" :value="index" :key="index">-->
                      <option v-for="(value,index) in community" :value="index" :key="index">
                        {{value.name}}</option>
                    </select>
                  <!--  <select name="全部">
                      <option value ="下沙社区">下沙社区</option>
                      <option value ="水域社区">水域社区</option>
                      <option value ="沙尾社区">沙尾社区</option>
                      <option value ="沙头社区">沙头社区</option>
                      <option value ="金碧社区">金碧社区</option>
                      <option value ="上沙社区">上沙社区</option>
                      <option value ="新华社区">新华社区</option>
                      <option value ="新洲社区">新洲社区</option>
                      <option value ="新沙社区">新沙社区</option>
                      <option value ="天安社区">天安社区</option>
                      <option value ="金地社区">金地社区</option>
                      <option value ="金域社区">金域社区</option>
                    </select>-->
                  </td>
                </tr>
                <tr>
                  <td>预警类型</td>
                  <td>
                    <select name="全部" v-on:change="indexSelect">
                      <option value ="-1">全部</option>
                      <!--<option v-for="(value,index) in warningTypeTitle" :value="index" :key="index">-->
                        <!--{{value}}</option>-->
                      <option v-for="(item,index) in unit" :value="item.data" :key="index">
                        {{item.name}}</option>
                     <!-- <option value ="重点企业预警">重点企业预警</option>
                      <option value ="生态环境预警">生态环境预警</option>
                      <option value ="城市生命线">城市生命线</option>
                      <option value ="气象预警">气象预警</option>
                      <option value ="地址灾害预警">地址灾害预警</option>
                      <option value ="安监预警">安监预警</option>
                      <option value ="三防预警">三防预警</option>
                      <option value ="消防预警">消防预警</option>
                      <option value ="卫计预警">卫计预警</option>
                      <option value ="舆情预警">舆情预警</option>-->
                    </select>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="c_b_a_b">
            <div class="c_b_a_b_a">
              缩小搜索范围
            </div>
            <div class="c_b_a_b_b">
              预警类型
            </div>
            <div class="c_b_a_b_c">
              <table>
                <tr>
                  <td @click="searchAction({name:'alarm_TYPE_CODE',value:'全部'},$event)" style="color: #fffc00;">全部</td>
                  <!--<td>2</td>-->
                </tr>
                <!--<tr  v-for="(value,key,index) in warningType" :key="index">-->
                  <!--<td  @click="searchAction({name:'alarm_TYPE_CODE',value:key},$event)">{{key}}</td>-->
                  <!--<td>{{value}}</td>-->
                <!--</tr>-->
                <tr  v-for="(item,key,index) in unitSecond" :key="index">
                  <td  @click="searchAction({name:'alarm_TYPE_CODE',value:item.data},$event)">{{item.name}}</td>
                  <td></td>
                </tr>
              </table>
            </div>
            <div class="c_b_a_b_b">
              处置状态
            </div>
            <div class="c_b_a_b_c">
              <table>
                <tr v-for="(item,index) in warnStatus" :key="index">
                  <td @click="searchAction({name:'disposal_STATE',value:item.name},$event)" style="color: #fffc00;">{{item.name}}</td>
                  <td>{{item.value}}</td>
                </tr>
                <!--<tr>-->
                  <!--<td @click="searchAction({name:'disposal_STATE',value:'全部'},$event)" style="color: #fffc00;">全部</td>-->
                  <!--<td>{{processStatus.remainProcess+processStatus.processing+processStatus.postProcess}}</td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td @click="searchAction({name:'disposal_STATE',value:'待处置'},$event)">待处置</td>-->
                  <!--<td>{{processStatus.remainProcess}}</td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td @click="searchAction({name:'disposal_STATE',value:'处置中'},$event)">处置中</td>-->
                  <!--<td>{{processStatus.processing}}</td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td @click="searchAction({name:'disposal_STATE',value:'已处置'},$event)">已处置</td>-->
                  <!--<td>{{processStatus.postProcess}}</td>-->
                <!--</tr>-->
              </table>
            </div>
            <div class="c_b_a_b_b" style="display: none;">
              预警颜色
            </div>
            <div class="c_b_a_b_c" style="display: none;">
              <table>
                <tr>
                  <td><span>红色</span><span class="c_b_a_b_c_a"></span></td>
                  <td>{{warningColor.red}}</td>
                </tr>
                <tr>
                  <td><span>黄色</span><span class="c_b_a_b_c_b"></span></td>
                  <td>{{warningColor.yellow}}</td>
                </tr>
                <tr>
                  <td><span>橙色</span><span class="c_b_a_b_c_c"></span></td>
                  <td>{{warningColor.orange}}</td>
                </tr>
                <tr>
                  <td><span>蓝色</span><span class="c_b_a_b_c_d"></span></td>
                  <td>{{warningColor.blue}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="c_b_b">
          <div class="c_b_b_a">
            <ul>
              <li>
                <div class="c_b_b_a_a">
                  预警总计
                </div>
                <div class="c_b_b_a_b">
                  <span>{{warningTotal}}</span>
                  <span>个</span>
                </div>
              </li>
              <li>
                <div class="c_b_b_a_a">
                  待处理预警
                </div>
                <div class="c_b_b_a_b">
                  <span>{{remainWarning}}</span>
                  <span>个</span>
                </div>
              </li>
              <li>
                <div class="c_b_b_a_a">
                  超时预警
                </div>
                <div class="c_b_b_a_b">
                  <span>{{overtimeWarning}}</span>
                  <span>个</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="aqyh_q_b_c_c" v-show="flag">
            <div class="aqyh_q_b_c_c_a col_8">
              <table>
                <thead>
                <tr>
                  <td style="width: 8%">序号</td>
                  <td style="width: 8%">预警类型</td>
                  <td style="width: 8%">发布时间</td>
                  <td style="width: 10%">预警状态</td>
                  <td style="width: 20%">所属区域</td>
                  <td style="width: 30%">内容</td>
                  <td style="width: 8%">发布人</td>
                  <td style="width: 8%">处置状态</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(value,index) in dataList" :key="index" @click="getDetailList(value.id)">
                  <td>{{value.page}}</td>
                  <td :title="value.type">{{value.type}}</td>
                  <td>{{value.time}}</td>
                  <td>{{value.status}}</td>
                  <td :title="value.area">{{value.area}}</td>
                  <td :title="value.content">{{value.content}}</td>
                  <td>{{value.publish}}</td>
                  <td>{{value.processingState}}</td>
                </tr>
                </tbody>
              </table>

              <foot-bar :total="total" :display="display" :current-page='current' @pagechange="pagechange"></foot-bar>
            </div>
          </div>
          <div v-show="!flag">
              <div class="c_b_b_b">
                <a target="" href="javascript:void(0);" title="返回列表" @click="getDetailList(-1)">
                  <span>〈</span>
                  <span>返回列表</span>
                </a>
              </div>
              <div class="c_b_b_c">
                <div class="c_b_b_c_a">
                  <div class="c_b_b_c_a_a">
                    <span>{{detail.state.name}}：</span>
                    <span>{{detail.state.value}}</span>
                  </div>
                  <div class="c_b_b_c_a_b">
                    <table>
                      <tr>
                        <td>
                          <span>{{detail.earlyWarningType.name}}：</span>
                          <span>{{detail.earlyWarningType.value}}</span>
                        </td>
                        <td>
                          <span>{{detail.sentStatus.name}}：</span>
                          <span>{{detail.sentStatus.value}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>{{detail.earlyWarningName.name}}：</span>
                          <span>{{detail.earlyWarningName.value}}</span>
                        </td>
                        <td>
                          <span>{{detail.allocationStatus.name}}：</span>
                          <span>{{detail.allocationStatus.value}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>{{detail.earlyWarningGrade.name}}：</span>
                          <span>{{detail.earlyWarningGrade.value}}</span>
                        </td>
                        <td>
                          <span>{{detail.handleStatus.name}}：</span>
                          <span>{{detail.handleStatus.value}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <span>{{detail.belongToRegion.name}}：</span>
                          <span>{{detail.belongToRegion.value}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <span>{{detail.publishTime.name}}：</span>
                          <span>{{detail.publishTime.value}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <span>{{detail.publishPeople.name}}：</span>
                          <span>{{detail.publishPeople.value}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <span>{{detail.cancleTime.name}}：</span>
                          <span>{{detail.cancleTime.value}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <span id="c_b_b_c_a_b_a">{{detail.warningDetail.name}}：</span>
                          <span id="c_b_b_c_a_b_b">{{detail.warningDetail.value}}
                                   </span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="c_b_b_c_b">
                  <div class="c_b_b_c_b_a">
                    <div class="c_b_b_c_b_a_a">
                      属性信息
                    </div>
                    <div class="c_b_b_c_b_a_b">
                      <table>
                        <tr>
                          <td>{{detail.num.name}}：</td>
                          <td>{{detail.num.value}}</td>
                        </tr>
                        <tr>
                          <td>{{detail.comming.name}}：</td>
                          <td>{{detail.comming.value}}</td>
                        </tr>
                        <tr>
                          <td>{{detail.updateTime.name}}：</td>
                          <td>{{detail.updateTime.value}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <!--<div class="c_b_b_c_b_b">-->
                    <!--<div class="c_b_b_c_b_b_a">-->
                      <!--处置信息-->
                    <!--</div>-->
                    <!--<div class="c_b_b_c_b_b_b">-->
                      <!--<div class="c_b_b_c_b_b_b_a">-->
                        <!--<ul>-->
                          <!--<li v-for="(value,index) in detail.handleProcess" :key="index"><a target="" href="javascript:void(0);" title=""></a></li>-->
                         <!--&lt;!&ndash; <li><a target="" href="####" title=""></a></li>-->
                          <!--<li><a target="" href="####" title=""></a></li>&ndash;&gt;-->
                        <!--</ul>-->
                      <!--</div>-->
                      <!--&lt;!&ndash;<div class="c_b_b_c_b_b_b_b">&ndash;&gt;-->
                        <!--&lt;!&ndash;<ul>&ndash;&gt;-->
                          <!--&lt;!&ndash;<li  v-for="(value,index) in detail.handleProcess" :key="index">&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="c_b_b_c_b_b_b_b_a">&ndash;&gt;-->
                              <!--&lt;!&ndash;{{value.time}}&ndash;&gt;-->
                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="c_b_b_c_b_b_b_b_b">&ndash;&gt;-->
                              <!--&lt;!&ndash;<span>{{value.publishComing}}</span>&ndash;&gt;-->
                              <!--&lt;!&ndash;<span>{{value.tpte}}</span>&ndash;&gt;-->
                              <!--&lt;!&ndash;<span>转至</span>&ndash;&gt;-->
                              <!--&lt;!&ndash;<span>{{value.platform}}</span>&ndash;&gt;-->
                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                          <!--&lt;!&ndash;</li>&ndash;&gt;-->
                          <!--&lt;!&ndash;&lt;!&ndash;<li>&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="c_b_b_c_b_b_b_b_a">&ndash;&gt;-->
                              <!--&lt;!&ndash;2018年07月26日08：50：16&ndash;&gt;-->
                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="c_b_b_c_b_b_b_b_b">&ndash;&gt;-->
                              <!--&lt;!&ndash;<span>预警信息已</span>&ndash;&gt;-->
                              <!--&lt;!&ndash;<span>处理完毕</span>&ndash;&gt;-->
                              <!--&lt;!&ndash;<span>，预警取消</span>&ndash;&gt;-->
                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                          <!--&lt;!&ndash;</li>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;</ul>&ndash;&gt;-->
                      <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--</div>-->
                  <!--</div>-->
                </div>
              </div>
          </div>
        </div>

      </div>
    </div>
    <!--预警信息中心结束-->
  </div>
</template>
<script>
  import PageFoot from '../../components/yjzx/Common/PageFoot.vue';
  import FootBar from '../../components/yjzx/Common/FootBar.vue';
  import bus from '../../assets/js/main.js'
  import {getlist} from "../../api/yjzxapi.js"
  import {getDetail} from "../../api/yjzxapi.js"
  import dataPicker from '../../components/yjzx/Common/VueDatepickerLocal.vue';
  import {street,selectCommunityById} from "../../utils/street_community";
  import {today_alram_center,today_alram_center_detail,disposalState} from '../../api/yjzx'
  import {unit,unitSecond} from "../../utils/street_community";

  export default {
    data: function () {

      const min = new Date()
      const max = new Date(2050, 8, 30, 0, 0, 0)
      const now = new Date()
      return {
        todayData: (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString(),
        ewinfo:false,
        flag:true,

        historyData:{},
        warningType :{},
        processStatus:{},
        warningColor:{},
        detail:{
          state:{name:'详细信息',value:'--'},
          earlyWarningType:{name:'预警类型',value:'--'},
          sentStatus:{name:'发送状态',value:'--'},
          earlyWarningName:{name:'预警名称',value:'--'},
          allocationStatus:{name:'分拨状态',value:'--'},
          earlyWarningGrade:{name:'预警等级',value:'--'},
          handleStatus:{name:'处置状态',value:'--'},
          belongToRegion:{name:'所属区域',value:'--'},
          publishTime:{name:'发布时间',value:'--'},
          publishPeople:{name:'发布人',value:'--'},
          cancleTime:{name:'取消时间',value:'--'},
          warningDetail:{name:'预警详情',value:'--'},
          num:{name:'预警编号',value:'--'},
          comming:{name:'渠道',value:'--'},
          updateTime:{name:'更新时间',value:'--'}
        },
        handleProcess:[],


        warningTotal:'--',
        remainWarning:'--',
        overtimeWarning:'--',
        dataList: [
          {
            page: 0,
            type: '气象预警',
            time: '发布时间',
            status: '生效',
            area: '福田区',
            content: '福田气象局发布气象预警警告',
            publish: '深圳市气象局',
            processingState: '处置中'
          }
        ],
        allDataList:[
        ],
        warningStreet: [
          "福保", "园岭", "南园", "福田", "香蜜湖", "沙头","梅林","华富","莲花","华强北"
        ],
        warningsocial: [
          "下沙社区", "水域社区", "沙尾社区", "沙头社区", "金碧社区", "上沙社区","新华社区","新洲社区","新沙社区","天安社区","金地社区","金域社区"
        ],
        warningTypeTitle: [
          "城市生命线", "气象预警", "地址灾害预警", "三防预警", "消防预警", "安监预警","舆情预警","卫计预警","生态环境预警","重点企业预警"
        ],

        //日期
        now: now,
        time: min,
        time2: min,
        min: min,
        max: max,
        timeRange: [min, max],
        local: {
          dow: 7, // Sunday is the first day of the week
          hourTip: 'Select Hour', // tip of select hour
          minuteTip: 'Select Minute', // tip of select minute
          secondTip: 'Select Second', // tip of select second
          yearSuffix: '', // suffix of head
          monthsHead: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'), // months of head
          months: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'), // months of panel
          weeks: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'), // weeks,
          cancelTip: 'Cancel', // text for cancel button for daterange picker
          submitTip: 'Submit' // text for submit button for daterange picker
        },
        local2: {
          dow: 7, // Sunday is the first day of the week
          hourTip: 'Select Hour', // tip of select hour
          minuteTip: 'Select Minute', // tip of select minute
          secondTip: 'Select Second', // tip of select second
          yearSuffix: '', // suffix of head
          monthsHead: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'), // months of head
          months: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'), // months of panel
          weeks: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'), // weeks,
          cancelTip: 'Cancel', // text for cancel button for daterange picker
          submitTip: 'Submit' // text for submit button for daterange picker
        },
        //分页插件数据
        total: 0,     // 记录总条数
        display: 8,   // 每页显示条数
        current: 1,   // 当前的页数
        street:street,
        community:[],
        rangeTime:[],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },
        defaultValue:(function () {
          return (new Date()).getTime()-30*24*60*60*1000
        })(),
        params:{
          "pageNum":"1",
          "pageSize":"8",
          "startTime": "",
          "endTime":"",
          "STREET_CODE":"all",
          "COMMUNITY_CODE":"",
          "ALARM_TYPE_LV1":"",
          "ALARM_TYPE_LV2":"",
          "DISPOSAL_STATE":"0"
        },
        showCommunity:true,
        // typeTwo:[{name:'预警总计',value:'--'},{name:'待处理预警',value:'--'},{name:'超时预警',value:'--'}]
        unit:unit,//预警类型一级分类
        unitSecond:[],//预警类型二级分类
        warnStatus:[
          {name:'全部', value:'--'},
          {name:'待处置', value:'--'},
          {name:'处置中', value:'--'},
          {name:'已处置', value:'--'}
        ]
      }

    },
    computed:{

    },
    beforeDestroy(){
      bus.$off('openInfo')
    },
    mounted() {
      bus.$on('openInfo', (data)=> {
        if("futian"===data){
          this.ewinfo = true;
          this.showDateTime();
          this.getSearchData()
        }else {
          this.ewinfo = false;
        }
      })
      // let $this = this
      // // this.initData1();
      // today_alram_center({
      //   "pageNum":"1",
      //   "pageSize":"3",
      //   "startTime": "2018-09-12",
      //   "endTime":"2018-10-24",
      //   "street_CODE":"440304001",
      //   "community_CODE":"440304001007",
      //   "alarm_SUMMARY_CODE":"003",
      //   "alarm_TYPE_CODE":"003002",
      //   "disposal_STATE":"待处置"
      // }).then(function (data) {
      //   console.log(data)
      //
      // })
      // this.getSearchData()
    },
    methods:{

      indexjd(event){
       // alert(event.target.value);
        if(event.target.value === '0'){
          this.params.STREET_CODE = 'all'
          this.showCommunity = true
        }else {
          this.community = selectCommunityById(street[event.target.value].data).data
          this.params.STREET_CODE = street[event.target.value].data
          this.showCommunity = false
        }
        this.params.COMMUNITY_CODE = ''
        this.getSearchData()
      },
      indexsq(event){
       console.log(event.target.value);
       if(event.target.value === '-1'){
         this.params.COMMUNITY_CODE = ''
       }else {
         this.params.COMMUNITY_CODE = this.community[event.target.value].data
       }
        this.getSearchData()
      },
      indexSelect(event){
        console.log(event)
        let val = event.target.value;
        if(val === '-1'){
          this.unitSecond = []
        }else {
          this.unitSecond = unitSecond[val].data
        }
        // switch(val){
        //   case "0":{
        //     this.warningType = this.historyData.warningType.city;
        //     this.processStatus = this.historyData.processStatus.city;
        //     this.warningColor = this.historyData.warningColor.city;
        //     break;
        //   }
        //   case "1":{
        //     this.warningType = this.historyData.warningType.meteorological;
        //     this.processStatus = this.historyData.processStatus.meteorological;
        //     this.warningColor = this.historyData.warningColor.meteorological;
        //     break;
        //   }
        //   case "2":{
        //     this.warningType = this.historyData.warningType.geologic;
        //     this.processStatus = this.historyData.processStatus.geologic;
        //     this.warningColor = this.historyData.warningColor.geologic;
        //     break;
        //   }
        //   case "3":{
        //     this.warningType = this.historyData.warningType.threeDefense;
        //     this.processStatus = this.historyData.processStatus.threeDefense;
        //     this.warningColor = this.historyData.warningColor.threeDefense;
        //     break;
        //   }
        //   case "4":{
        //     this.warningType = this.historyData.warningType.fire;
        //     this.processStatus = this.historyData.processStatus.fire;
        //     this.warningColor = this.historyData.warningColor.fire;
        //     break;
        //   }
        //   case "5":{
        //     this.warningType = this.historyData.warningType.safety;
        //     this.processStatus = this.historyData.processStatus.safety;
        //     this.warningColor = this.historyData.warningColor.safety;
        //     break;
        //   }
        //   case "6":{
        //     this.warningType = this.historyData.warningType.publicOpinion;
        //     this.processStatus = this.historyData.processStatus.publicOpinion;
        //     this.warningColor = this.historyData.warningColor.publicOpinion;
        //     break;
        //   }
        //   case "7":{
        //     this.warningType = this.historyData.warningType.earlyWarning;
        //     this.processStatus = this.historyData.processStatus.earlyWarning;
        //     this.warningColor = this.historyData.warningColor.earlyWarning;
        //     break;
        //   }
        //   case "8":{
        //     this.warningType = this.historyData.warningType.ecological;
        //     this.processStatus = this.historyData.processStatus.ecological;
        //     this.warningColor = this.historyData.warningColor.ecological;
        //     break;
        //   }
        //   case "9":{
        //     this.warningType = this.historyData.warningType.keyEnterprises;
        //     this.processStatus = this.historyData.processStatus.keyEnterprises;
        //     this.warningColor = this.historyData.warningColor.keyEnterprises;
        //     break;
        //   }
        //
        // }

      },
      closeInfo(){
        this.ewinfo = false;
      },
      async getDetailList(id){
        if(id == -1){
          this.flag = true; return false;
        }
        this.flag = false;
        // let warningDetail = await getDetail(id);
        // /*let warningDetail = this.temp1;*/
        // this.detail = warningDetail.data.detail;
       // alert(id);
        let $this = this
        today_alram_center_detail({id: id}).then(function (data) {
          console.log('*****')
          console.log(data)
          $this.detail.state = data[0]
          $this.detail.earlyWarningType=data[0].data[0]
          $this.detail.sentStatus=data[0].data[7]
          $this.detail.earlyWarningName=data[0].data[1]
          $this.detail.allocationStatus=data[0].data[8]
          $this.detail.earlyWarningGrade=data[0].data[2]
          $this.detail.handleStatus=data[0].data[9]
          $this.detail.belongToRegion=data[0].data[3]
          $this.detail.publishTime=data[0].data[4]
          $this.detail.publishPeople=data[0].data[6]
          $this.detail.cancleTime=data[0].data[10]
          $this.detail.warningDetail=data[0].data[5]
          $this.detail.num = data[1].data[0]
          $this.detail.comming = data[1].data[1]
          $this.detail.updateTime = data[1].data[2]
        })
      },
      pagechange:function(currentPage){
        console.log(currentPage);
       // this.allDataList = this.dataList;
        this.dataList = this.allDataList.slice((currentPage-1)*this.display,currentPage*this.display)
        // ajax请求, 向后台发送 currentPage, 来获取对应的数据
        this.searchAction({pageNum:currentPage})

      },
      async initData1 () {
        let warningData = await getlist();
        /*let warningData = this.temp;*/
        this.historyData = warningData.data;
        this.allDataList = warningData.data.list;
        this.dataList = this.allDataList.slice(0,this.display)

        this.total = warningData.data.list.length;
        this.warningTotal = warningData.data.warning;
        this.remainWarning = warningData.data.remain;
        this.overtimeWarning = warningData.data.overtime;


        this.warningType = warningData.data.warningType.city;
        this.processStatus = warningData.data.processStatus.city;
        this.warningColor = warningData.data.warningColor.city;



      },
      //每秒刷新时间
      showDateTime(){
        setInterval(this.showTime,1000);
        this.showTime();
      },
      showTime(){
        // console.log(this.todayData);
        this.todayData = (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString();
      },
      searchAction(data,event){
        if(event !== undefined){
          for(let i = 0,j = event.target.parentElement.parentElement.children.length;i<j;i+=1){
            event.target.parentElement.parentElement.children[i].children[0].style.color = ''
          }
          event.target.style.color = '#fffc00'
        }
        //搜索
        this.getSearchData(data)
      },
      getSearchData(data){
        let $this = this
        if(this.rangeTime.length === 0){
          // let tempDate = new Date()
          // let year = tempDate.getFullYear(),month = tempDate.getMonth()>8?(tempDate.getMonth()+1):('0'+(tempDate.getMonth()+1)),day = tempDate.getMonth()>9?tempDate.getDate():('0'+tempDate.getDate())
          // this.params.startTime = year+'-'+month+'-'+day
          // this.params.endTime = year+'-'+month+'-'+day
        }else {
          this.params.startTime = this.rangeTime[0]
          this.params.endTime = this.rangeTime[1]
        }
        var paramsTemp = {}
        if(this.params.COMMUNITY_CODE.length === 0){
          for(let i in this.params){
            if(i !== 'community_CODE'){
              paramsTemp[i] = this.params[i]
            }
          }
        }else {
          for(let i in this.params){
            paramsTemp[i] = this.params[i]
          }
        }
        if(data !== undefined){
          paramsTemp[data.name] = data.value
        }
        today_alram_center({
          // "pageNum":"1",
          // "pageSize":"3",
          // "startTime": "2018-09-12",
          // "endTime":"2018-10-24",
          // "street_CODE":"all",
          // "community_CODE":"",
          // "alarm_SUMMARY_CODE":"",
          // "alarm_TYPE_CODE":"",
          // "disposal_STATE":""
          "pageNum":"1",
          "pageSize":"8",
          "startTime": this.params.startTime,
          "endTime":this.params.endTime,
          "STREET_CODE":this.params.STREET_CODE,
          "COMMUNITY_CODE":this.params.COMMUNITY_CODE,
          "ALARM_TYPE_LV1":this.params.ALARM_TYPE_LV1,
          "ALARM_TYPE_LV2":this.params.ALARM_TYPE_LV2,
          "DISPOSAL_STATE":this.params.DISPOSAL_STATE
        }).then(function (data) {
          console.log(data)
          $this.warningTotal = data.center[0].value
          $this.remainWarning = data.center[1].value
          $this.overtimeWarning = data.center[2].value
          $this.dataList = []
          $this.total = data.list.total;
          $this.current = data.list.pageNum

          //处置状态
          $this.warnStatus = data.disposalStatus

          for(let i = 0,j = data.list.list.length;i<j;i+=1){
            let tempDataList = {
              page: (data.list.pageNum-1)*data.list.pageSize+i+1,
              type: data.list.list[i].alarm_TYPE,
              time: data.list.list[i].update_TIME.split(' ')[0],
              status: data.list.list[i].alarm_STATE,
              area: data.list.list[i].street_CODE,
              content: data.list.list[i].contents,
              publish: data.list.list[i].release_PERSON,
              processingState: data.list.list[i].disposal_STATE
            }
            $this.dataList.push(tempDataList)
          }
        })
      }
    },
    components: {
      FootBar,
      dataPicker
    }
  }
</script>

<style >
  .c_b .datepicker {
    bottom: -50px;
    width: 86px;
    left: -260px;
  }
  .c_b .datepicker:before {
  background: none;
  }
  .c_b .datepicker>input {
    height: 35px;
    padding: 0;
    left: -260px;
  }
  .c_b .datepicker-popup {
   margin-top: 0px;
  }
  .c_b .datepicker-popup .calendar-body {
     width: 256px;
   }
  /* ---------------------------预警信息中心----------------------------------------------------------------------------------------------------*/
  .c{width:1870px; height:800px; text-align: left; margin: 0px auto; padding: 20px;  overflow: hidden;  /*position: absolute; bottom:110px; right:40px;*/ border: #00d8ff solid 1px; border-radius:5px; background-color: #041738; z-index: 2;}
  .c_a{/*width:1870px;*/ height:34px; line-height: 34px; text-align: left; margin: 0px auto 26px;  overflow: hidden;}
  .c_a_a{width:auto; height:34px; line-height: 34px; text-align: left; margin: 0px 70px 0px 0px; float: left; display: inline; overflow: hidden; font-size: 32px; color: #00d8ff;}
  .c_a_a img{width:34px; height:34px; margin-right: 20px;}
  .c_a_a span{float: left; display: inline;  overflow: hidden;}
  .c_a_b{width:auto; height:34px; line-height: 34px; text-align: left; margin: 0px auto; float: left; display: inline; overflow: hidden; font-size: 18px; color: #ffffff;}
  .c_a_b img{width:20px; height:20px; margin-right: 10px;}
  .c_a_b span{float: left; display: inline;  overflow: hidden;}
  .c_a_c{ cursor: pointer;width:23px; height:34px; line-height: 34px; text-align: left; margin: 0px auto; float: right; display: inline; overflow: hidden;}
  .c_a_c img{width:23px; height:23px;  margin: 5.5px auto;}
  .c_b{width:1870px; height:740px; text-align: left; margin: 0px auto;  overflow: hidden;}
  .c_b_a{width:370px; height:740px; text-align: left; margin: 0px 20px 0px 0px; float: left; display: inline; overflow: hidden;}
  .c_b_a_a{/*width:328px; height:188px; */text-align: left; margin: 0px auto 10px; overflow: hidden; padding: 10px 20px; border: #2578a0 solid 1px; border-radius:5px;}
  .c_b_a_a_a{width:328px; height:30px; line-height:30px; text-align: left; margin: 0px auto 10px; overflow: hidden; font-size: 26px; color: #a6d6ff;}
  .c_b_a_a_b{width:328px; height:148px; text-align: left; margin: 0px auto; overflow: hidden; font-size: 22px; color: #ffffff;}
  .c_b_a_a_b table{width:328px; height:148px; text-align: left; margin: 0px auto; overflow: hidden; }
  .c_b_a_a_b table tr td:nth-child(1){ width: 33%;}
  .c_b_a_a_b table input{ width: 90px; height: 28px; line-height: 28px; border: #6370e2 solid 1px; background-color: #05294c; font-size: 20px; color: #ffffff;}
  .c_b_a_a_b table select { width: 220px;height: 30px;line-height: 28px;border: #6370e2 solid 1px;background-color: #05294c;font-size: 18px;color: #ffffff;border-radius: 5px;}
  .c_b_a_b{/*width:328px; height:498px;*/ text-align: left; margin: 0px auto; overflow: hidden; padding: 10px 20px; border: #2578a0 solid 1px; border-radius:5px;}
  .c_b_a_b_a{width:328px; height:30px; line-height:30px; text-align: left; margin: 0px auto 10px; overflow: hidden; font-size: 26px; color: #a6d6ff;}
  .c_b_a_b_b{width:312px; height:20px; line-height:20px; text-align: left; margin: 10px auto; padding-left: 10px; overflow: hidden; font-size: 20px; color: #ffffff; border-left: #b6eeff solid 6px;}
  .c_b_a_b_c{width:328px; height:auto; line-height:25px; text-align: left; margin: 0px auto; overflow: hidden; font-size: 18px; color: #d7edff}
  .c_b_a_b_c table{width:328px; height:auto; line-height:25px; text-align: left; margin: 0px auto; overflow: hidden; }
  .c_b_a_b_c table tr td:nth-child(1){ cursor: pointer;width:auto; height:25px; line-height:25px; text-align: left; margin: 0px auto; overflow: hidden; }
  .c_b_a_b_c table tr td:nth-child(2){ cursor: pointer;width:auto; height:25px; line-height:25px; text-align: right; margin: 0px auto; overflow: hidden; font-size: 18px; color: #fffc00;}
  .c_b_a_b_c_a{border-right: #cc0000 solid 12px; margin-left: 10px;}
  .c_b_a_b_c_b{border-right: #ffff00 solid 12px; margin-left: 10px;}
  .c_b_a_b_c_c{border-right: #ff9900 solid 12px; margin-left: 10px;}
  .c_b_a_b_c_d{border-right: #3366ff solid 12px; margin-left: 10px;}
  .c_b_b{/*width:1480px;*/ height:740px; text-align: left; margin: 0 60px;/*margin: 0px auto;*/ float: left; display: inline; overflow: hidden;}
  .c_b_b_a{/*width:1480px;*/ height:168px; text-align: left; margin: 0px auto; overflow: hidden;}
  .c_b_b_a ul{/*width:1480px;*/ height:168px; text-align: left; margin: 0px auto; overflow: hidden;}
  .c_b_b_a ul li{width:405px; height:128px; text-align: left; margin: 0px auto; float: left; display: inline; overflow: hidden; padding: 20px 30px;}
  .c_b_b_a ul li:nth-child(1){background: url(../../static/img/yjzx/yjzx_16.png) no-repeat;background-size: contain;}
  .c_b_b_a ul li:nth-child(2){background: url(../../static/img/yjzx/yjzx_17.png) no-repeat; margin: 0px 42.5px;background-size: contain;}
  .c_b_b_a ul li:nth-child(3){background: url(../../static/img/yjzx/yjzx_17.png) no-repeat;background-size: contain;}
  .c_b_b_a_a{width:405px; height:30px; line-height: 30px; text-align: left; /*margin: 0px auto 20px;*/ overflow: hidden; font-size: 26px; color: #a6d6ff; }
  .c_b_b_a_b{width:255px; height:78px; line-height: 78px; text-align: left; /*margin: 0px auto 20px;*/ padding-left: 150px; overflow: hidden; font-size: 80px; color: #ffab27; }
  .c_b_b_a_b span:nth-child(2){ font-size: 22px; color: #ffffff;}
  .c_b_b_b{width:1440px; height:63px; line-height: 63px; text-align: left; margin: 29px auto 10px; padding: 0px 20px; overflow: hidden; background: url(../../static/img/yjzx/yjzx_27.png) no-repeat;}
  .c_b_b_b a{width:1440px; height:63px; line-height: 63px; text-align: left; margin: 0px auto; overflow: hidden; text-decoration: none; display: block; font-size: 24px; color: #a6d6ff;}
  .c_b_b_c{width:1480px; height:470px; text-align: left; margin: 0px auto; overflow: hidden;}
  .c_b_b_c_a{width:898px; height:428px; text-align: left; margin: 0px 10px 0px 0px; padding: 20px 30px; float: left; display: inline;  overflow: hidden; border:#008bff solid 1px;}
  .c_b_b_c_a_a{width:898px; height:28px; line-height: 28px; text-align: left; margin: 0px auto 20px; overflow: hidden; font-size: 24px; color: #a6d6ff;}
  .c_b_b_c_a_a span:nth-child(1){ border-left: #a6d6ff solid 5px; padding-left: 10px; margin-right: 10px;}
  .c_b_b_c_a_a span:nth-child(2){font-size: 18px; color: #ff0000;}
  .c_b_b_c_a_b{width:898px; height:380px; line-height: 38px; text-align: left; margin: 0px auto; overflow: hidden;}
  .c_b_b_c_a_b table{width:898px; height:380px; line-height: 38px; text-align: left; margin: 0px auto; overflow: hidden;}
  .c_b_b_c_a_b table tr{width:898px; height:auto; line-height: 38px; text-align: left; margin: 0px auto; overflow: hidden; }
  .c_b_b_c_a_b table tr td{width:auto; height:auto; line-height: 38px; text-align: left; margin: 0px auto; overflow: hidden;}
  .c_b_b_c_a_b table tr td span:nth-child(1){width:auto; height:auto; line-height: 38px; text-align: left; margin: 0px auto; overflow: hidden; font-size: 20px; color: #a6d6ff;}
  .c_b_b_c_a_b table tr td span:nth-child(2){width:auto; height:auto; line-height: 38px; text-align: left; margin: 0px auto;  overflow: hidden; font-size: 20px; color: #ffffff;}
  .c_b_b_c_a_b table tr td span{float: left; display: inline;  overflow: hidden;}
  .c_b_b_c_a_b table tr:nth-last-child(1){width:898px; height:114px; line-height: 38px; text-align: left; margin: 0px auto; overflow: hidden; }
  #c_b_b_c_a_b_a{width:100px; height:114px; line-height: 38px; text-align: left; margin: 0px auto; float: left; display: inline;  overflow: hidden;}
  #c_b_b_c_a_b_b{width:797px; height:114px; line-height: 38px; text-align: left; margin: 0px auto; float: right; display: inline;  overflow: hidden;}
  .c_b_b_c_b{width:510px; /*height:470px; */text-align: left; margin: 0px auto; float: left; display: inline;  overflow: hidden;}
  .c_b_b_c_b_a{width:448px; /*height:188px;*/height:438px; text-align: left; margin: 0px auto 10px; overflow: hidden; padding: 15px 30px; border:#008bff solid 1px; }
  .c_b_b_c_b_a_a{width:433px; height:28px; line-height: 28px; text-align: left; margin: 0px auto 20px; overflow: hidden; font-size: 24px; color: #a6d6ff; border-left: #a6d6ff solid 5px; padding-left: 10px; }
  .c_b_b_c_b_a_b{width:448px; height:140px; line-height: 35px; text-align: left; margin: 0px auto; overflow: hidden;}
  .c_b_b_c_b_a_b table{width:448px; height:140px; line-height: 35px; text-align: left; margin: 0px auto; overflow: hidden;}
  .c_b_b_c_b_a_b table tr{width:448px; height:auto; line-height: 35px; text-align: left; margin: 0px auto; overflow: hidden; }
  .c_b_b_c_b_a_b table tr td{width:auto; height:auto; line-height: 35px; text-align: left; margin: 0px auto; overflow: hidden;}
  .c_b_b_c_b_a_b table tr td:nth-child(1){width:auto; height:auto; line-height: 35px; text-align: left; margin: 0px auto; overflow: hidden; font-size: 20px; color: #a6d6ff;}
  .c_b_b_c_b_a_b table tr td:nth-child(2){width:auto; height:auto; line-height: 35px; text-align: left; margin: 0px auto;  overflow: hidden; font-size: 20px; color: #ffffff;}
  .c_b_b_c_b_b{width:448px; height:208px; text-align: left; margin: 0px auto; overflow: hidden; padding: 15px 30px; border:#008bff solid 1px; }
  .c_b_b_c_b_b_a{width:433px; height:28px; line-height: 28px; text-align: left; margin: 0px auto 20px; overflow: hidden; font-size: 24px; color: #a6d6ff; border-left: #a6d6ff solid 5px; padding-left: 10px; }
  .c_b_b_c_b_b_b{width:448px; height:160px; text-align: left; margin: 0px auto; overflow: hidden; }
  .c_b_b_c_b_b_b_a{width:15px; height:160px; text-align: left; margin: 0px 55px; float: left; display: inline; overflow: visible; border-left: #008bff solid 3px; }
  .c_b_b_c_b_b_b_a ul{width:15px; height:160px; text-align: left; margin: 0px auto 0px -8px; overflow: hidden; }
  .c_b_b_c_b_b_b_a ul li{width:15px; height:15px; text-align: left; margin: 20px auto; float: left; display: inline; overflow: hidden;}
  .c_b_b_c_b_b_b_a ul li a{width:15px; height:15px; background-color: #008bff; border-radius:15px; text-decoration: none; display: block;}
  .c_b_b_c_b_b_b_a ul li a:hover,.c_b_b_c_b_b_b_a ul li a:active,.c_b_b_c_b_b_b_a ul li a:focus{width:15px; height:15px; background-color: #ffab27; border-radius:15px; text-decoration: none; display: block;}
  .c_b_b_c_b_b_b_b{width:320px; height:160px; text-align: left; margin: 0px auto; float: left; display: inline; overflow: hidden; }
  .c_b_b_c_b_b_b_b ul{width:320px; height:160px; text-align: left; margin: 0px auto;  overflow: hidden; }
  .c_b_b_c_b_b_b_b ul li{width:320px; height:50px; line-height: 25px; text-align: left; margin: 0px auto;  overflow: hidden; font-size: 18px; color: #ffffff;}
  .c_b_b_c_b_b_b_b ul li:nth-child(2){margin: 5px auto;}
  .c_b_b_c_b_b_b_b_b span:nth-child(even){font-size: 18px; color: #ffab27;}

  /*.aqyh_q_b_c_c{width:860px; height:364px; text-align: left; margin: 0px auto; overflow: hidden; }*/
  .aqyh_q_b_c_c{
    width: 90%;
    height: 550px;
    text-align: left;
    margin: 0 1px;
    overflow: hidden;
  }



  .aqyh_q_b_c_c_a{
    width: 100%;
    height: 529px;
    text-align: left;
    margin: 0px auto 5px;
    overflow-x: hidden;
    overflow-y: hidden;

   /* width:860px; !*height:329px;*! text-align: left; margin: 0px auto 5px; overflow-x: hidden;*/
   /* overflow-y: auto;*/
  }
  .aqyh_q_b_c_c_a table thead{
    width: 100%;
    line-height: 40px;
    margin: 0 80px;
    font-size: 20px;
    color: #dac6c6;
    /*width:860px; height:auto; line-height: 40px; font-size: 16px; color: #555555; font-weight: bold;*/
  }
  .aqyh_q_b_c_c_a table tbody{
    width: 100%;
    line-height: 40px;
    margin: 0 80px;
    font-size: 20px;
    color: #dac6c6;
  }

  .aqyh_q_b_c_c_a table{

    width: 99%;
    height: 80%;
    display: block;
    padding-top: 30px;
  }
  .aqyh_q_b_c_c_a table thead,
  .aqyh_q_b_c_c_a table tbody,
  .aqyh_q_b_c_c_a table thead tr,
  .aqyh_q_b_c_c_a table tbody tr{
    /*width:100%;*/
    /*height:100%;*/
    display: block;
    clear:both;
  }
  .aqyh_q_b_c_c_a table thead tr td,
  .aqyh_q_b_c_c_a table tbody tr td{
    display: block;float:left;overflow: hidden;
    text-overflow: ellipsis;white-space: nowrap;text-align: center;
  }
</style>
