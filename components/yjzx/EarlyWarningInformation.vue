<template>
  <div style="width: 1870px;height: 800px;margin: auto;position: relative;bottom: 950px;z-index: 3;">
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
                    <el-date-picker
                      v-model="rangeTime"
                      class="el-date-picker"
                      type="daterange"
                      :picker-options="pickerOptions"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :default-value="defaultValue"
                      @change="searchAction()"
                    >
                    </el-date-picker>
                  </td>
                </tr>
                <tr>
                  <td>街&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</td>
                  <td>
                    <select name="全部" v-on:change="indexjd">
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
                      <option v-for="(value,index) in community" :value="index" :key="index">
                        {{value.name}}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>预警类型</td>
                  <td>
                    <select name="全部" v-on:change="indexSelect">
                      <option value ="-1">全部</option>
                      <option v-for="(item,index) in type===undefined?[]:type.data" :value="item.code" :key="index">
                        {{item.name}}</option>
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
                  <td @click="searchAction({'ALARM_TYPE_LV2':'','ALARM_TYPE_LV1':params.ALARM_TYPE_LV1},$event)" style="color: #fffc00;">全部</td>
                </tr>
                <tr  v-for="(item,key,index) in unitSecond" :key="index">
                  <td  @click="searchAction({'ALARM_TYPE_LV2':item.value,'ALARM_TYPE_LV1':params.ALARM_TYPE_LV1},$event)">{{item.name}}</td>
                </tr>
              </table>
            </div>
            <div class="c_b_a_b_b">
              处置状态
            </div>
            <div class="c_b_a_b_c">
              <table>
                <tr v-for="(item,index) in warnStatus" :key="index">
                  <td @click="searchAction({'DISPOSAL_STATE':item.code},$event)">{{item.name}}</td>
                  <td>{{item.value}}</td>
                </tr>
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
              <li v-for="(item,index) in centerData" :key="index">
                <div class="c_b_b_a_a">
                  {{item.name}}
                </div>
                <div class="c_b_b_a_b">
                  <span>{{item.value}}</span>
                  <span>个</span>
                </div>
              </li>
              <!--<li>-->
                <!--<div class="c_b_b_a_a">-->
                  <!--待处理预警-->
                <!--</div>-->
                <!--<div class="c_b_b_a_b">-->
                  <!--<span>{{remainWarning}}</span>-->
                  <!--<span>个</span>-->
                <!--</div>-->
              <!--</li>-->
              <!--<li>-->
                <!--<div class="c_b_b_a_a">-->
                  <!--超时预警-->
                <!--</div>-->
                <!--<div class="c_b_b_a_b">-->
                  <!--<span>{{overtimeWarning}}</span>-->
                  <!--<span>个</span>-->
                <!--</div>-->
              <!--</li>-->
            </ul>
          </div>
          <div class="aqyh_q_b_c_c" v-show="flag">
            <div class="aqyh_q_b_c_c_a col_8">
              <el-table
                highlight-current-row
                :data="dataList"
                style="width: 1298px;max-height:505px"
                class="aqyh_q_b_c_c_table"
                :row-style="{maxHeight:'80px',overflow:'hide'}"
                :cell-style="{maxHeight:'80px',overflow:'hide',padding:'5px 0'}"
                @current-change="handleRowChange"
              >
                <el-table-column
                  prop="page"
                  label="序号"
                  width="60"
                  >
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="预警类型"
                  width="150"
                  >
                </el-table-column>
                <el-table-column
                  prop="time"
                  label="发布时间"
                  >
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="预警状态"
                  >
                </el-table-column>
                <el-table-column
                  prop="area"
                  label="所属区域"
                  >
                </el-table-column>
                <el-table-column
                  prop="content"
                  label="内容"
                  width="400"
                  show-overflow-tooltip
                  >
                </el-table-column>
                <el-table-column
                  prop="publish"
                  label="发布人"
                  >
                </el-table-column>
                <el-table-column
                  prop="processingState"
                  label="处置状态"
                  width="100"
                  >
                </el-table-column>
              </el-table>
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="current"
                :page-size="display"
                layout="total, prev, pager, next, jumper"
                :total="total"
              >
              </el-pagination>
            </div>
          </div>
          <div v-if="!flag">
              <div class="c_b_b_b">
                <a target="" href="javascript:void(0);" title="返回列表" @click="getDetailList(-1)">
                  <span>〈</span>
                  <span>返回列表</span>
                </a>
              </div>
              <div class="c_b_b_c">
                <div class="c_b_b_c_a">
                  <div class="c_b_b_c_a_a">
                    <span>{{detail.state===undefined?'':detail.state.name}}：</span>
                    <span>{{detail.state===undefined?'':detail.state.value}}</span>
                  </div>
                  <div class="c_b_b_c_a_b">
                    <table>
                      <tr>
                        <td>
                          <span>{{detail.earlyWarningType===undefined?'':detail.earlyWarningType.name}}：</span>
                          <span>{{detail.earlyWarningType===undefined?'':detail.earlyWarningType.value}}</span>
                        </td>
                        <td>
                          <span>{{detail.sentStatus===undefined?'':detail.sentStatus.name}}：</span>
                          <span>{{detail.sentStatus===undefined?'':detail.sentStatus.value}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>{{detail.earlyWarningType===undefined?'':detail.earlyWarningName.name}}：</span>
                          <span>{{detail.earlyWarningType===undefined?'':detail.earlyWarningName.value}}</span>
                        </td>
                        <td>
                          <span>{{detail.allocationStatus===undefined?'':detail.allocationStatus.name}}：</span>
                          <span>{{detail.allocationStatus===undefined?'':detail.allocationStatus.value}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>{{detail.earlyWarningType===undefined?'':detail.earlyWarningGrade.name}}：</span>
                          <span>{{detail.earlyWarningType===undefined?'':detail.earlyWarningGrade.value}}</span>
                        </td>
                        <td>
                          <span>{{detail.handleStatus===undefined?'':detail.handleStatus.name}}：</span>
                          <span>{{detail.handleStatus===undefined?'':detail.handleStatus.value}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <span>{{detail.belongToRegion===undefined?'':detail.belongToRegion.name}}：</span>
                          <span>{{detail.belongToRegion===undefined?'':detail.belongToRegion.value}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <span>{{detail.publishTime===undefined?'':detail.publishTime.name}}：</span>
                          <span>{{detail.publishTime===undefined?'':detail.publishTime.value}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <span>{{detail.publishPeople===undefined?'':detail.publishPeople.name}}：</span>
                          <span>{{detail.publishPeople===undefined?'':detail.publishPeople.value}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <span>{{detail.cancleTime===undefined?'':detail.cancleTime.name}}：</span>
                          <span>{{detail.cancleTime===undefined?'':detail.cancleTime.value}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          <span id="c_b_b_c_a_b_a">{{detail.warningDetail===undefined?'':detail.warningDetail.name}}：</span>
                          <span id="c_b_b_c_a_b_b">{{detail.warningDetail===undefined?'':detail.warningDetail.value}}
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
                          <td>{{detail.num===undefined?'':detail.num.name}}：</td>
                          <td>{{detail.num===undefined?'':detail.num.value}}</td>
                        </tr>
                        <tr>
                          <td>{{detail.comming===undefined?'':detail.comming.name}}：</td>
                          <td>{{detail.comming===undefined?'':detail.comming.value}}</td>
                        </tr>
                        <tr>
                          <td>{{detail.updateTime===undefined?'':detail.updateTime.name}}：</td>
                          <td>{{detail.updateTime===undefined?'':detail.updateTime.value}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
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
  // import {unit,unitSecond} from "../../utils/street_community";

  export default {
    props: ['type'],
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
        centerData:null,

        warningTotal:'--',
        remainWarning:'--',
        overtimeWarning:'--',
        dataList: [
          // {
          //   page: 0,
          //   type: '气象预警',
          //   time: '发布时间',
          //   status: '生效',
          //   area: '福田区',
          //   content: '福田气象局发布气象预警警告',
          //   publish: '深圳市气象局',
          //   processingState: '处置中'
          // }
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
          "STREET_CODE":"",
          "COMMUNITY_CODE":"",
          "ALARM_TYPE_LV1":"",
          "ALARM_TYPE_LV2":"",
          "DISPOSAL_STATE":"0"
        },
        showCommunity:true,
        // typeTwo:[{name:'预警总计',value:'--'},{name:'待处理预警',value:'--'},{name:'超时预警',value:'--'}]
        // unit:unit,//预警类型一级分类
        unitSecond:[],//预警类型二级分类
        warnStatus:[
          {name:'全部', value:'--'},
          {name:'待处置', value:'--'},
          {name:'处置中', value:'--'},
          {name:'已处置', value:'--'}
        ],
        secendUtil:[]
      }

    },
    computed:{

    },
    beforeDestroy(){
      bus.$off('openInfo')
    },
    mounted() {
      this.showDateTime();
      this.getSearchData()
    },
    methods:{
      handleRowChange(val){
        this.getDetailList(val.id)
      },
      handleCurrentChange(val){
        console.log(val)
        this.pagechange(val)
      },
      indexjd(event){
       // alert(event.target.value);
        if(event.target.value === '0'){
          this.params.STREET_CODE = ''
          this.showCommunity = true
        }else {
          this.community = selectCommunityById(street[event.target.value].data).data
          this.params.STREET_CODE = street[event.target.value].data
          this.showCommunity = false
        }
        document.getElementsByTagName('select')[1].selectedIndex = 0
        this.params.COMMUNITY_CODE = ''
        this.params.pageNum = 1
        this.getSearchData()
      },
      indexsq(event){
       console.log(event.target.value);
       if(event.target.value === '-1'){
         this.params.COMMUNITY_CODE = ''
       }else {
         this.params.COMMUNITY_CODE = this.community[event.target.value].data
       }
       this.params.pageNum = 1
        this.getSearchData()
      },
      indexSelect(event){
        let val = event.target.value;
        if(val === '-1'){
          this.unitSecond = []
        }else {
          this.unitSecond = this.type.code[val].data
        }
        this.params.pageNum = 1
        this.params.ALARM_TYPE_LV1 = val==='-1'?'':val
        this.params.ALARM_TYPE_LV2 = ''
          console.log(event)
        // this.getSearchData({
        //   ALARM_TYPE_LV1:val==='-1'?'':val,
        //   ALARM_TYPE_LV2 : '',
        //   pageNum:1
        // })
        document.getElementsByClassName('c_b_a_b_c')[0].children[0].children[0].children[0].click()
      },
      closeInfo(){
        document.getElementsByClassName('a_b_b')[0].children[0].click()
      },
      async getDetailList(id){
        console.log(id)
        if(id === -1){
          this.flag = true; return false;
        }
        this.detail = {}
        this.flag = false;
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
        this.searchAction({'pageNum':currentPage})

      },
      async initData1 () {
        let warningData = await getlist();
        /*let warningData = this.temp;*/
        console.log(99999,warningData)
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

        console.log(data)

        if(event !== undefined){
          for(let i = 0,j = event.target.parentElement.parentElement.children.length;i<j;i+=1){
            event.target.parentElement.parentElement.children[i].children[0].style.color = ''
          }
          event.target.style.color = '#fffc00'
        }
        //搜索
        this.params.pageNum = 1
        this.getSearchData(data)
      },
      getSearchData(data){
        let $this = this
        var paramsTemp = {}
        for(let i in this.params){
          paramsTemp[i] = this.params[i]
        }
        if(this.rangeTime.length === 0 || this.rangeTime === undefined){
          this.params.startTime = ''
          this.params.endTime = ''
        }else {
          this.params.startTime = this.rangeTime[0]
          this.params.endTime = this.rangeTime[1]
        }
        if(this.params.COMMUNITY_CODE.length === 0){
          for(let i in this.params){
            if(i !== 'community_CODE'){
              paramsTemp[i] = this.params[i]
            }
          }
        }
        if(data !== undefined){
          for(let i in data){
            paramsTemp[i] = data[i]
          }
        }
        for(let i in paramsTemp){
          this.params[i] = paramsTemp[i]
        }
        today_alram_center(paramsTemp).then(function (data) {
          console.log(data)
          // $this.warningTotal = data.center[0].value
          // $this.remainWarning = data.center[1].value
          // $this.overtimeWarning = data.center[2].value
          $this.centerData = data.center
          $this.dataList = []
          $this.total = data.list.total;
          $this.current = data.list.pageNum

          //处置状态
          $this.warnStatus = data.disposalStatus

          for(let i = 0,j = data.list.list.length;i<j;i+=1){
            let tempDataList = {
              page: (data.list.pageNum-1)*data.list.pageSize+i+1,
              type: data.list.list[i].lv_1_NAME+'-'+data.list.list[i].lv_2_NAME,
              time: data.list.list[i].release_TIME.split(' ')[0],
              status: data.list.list[i].alarm_NAME,
              area: data.list.list[i].streetName+'-'+data.list.list[i].communityName,
              content: data.list.list[i].contents,
              publish: data.list.list[i].release_PERSON,
              processingState: data.list.list[i].disposal_NAME,
              id:data.list.list[i].id
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

<style lang="scss" scoped>
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
  .c_b_a{width:420px; /*height:740px;*/ text-align: left; margin: 0px 20px 0px 0px; float: left; display: inline; overflow: hidden;}
  .c_b_a_a{/*width:328px; height:188px; */text-align: left; margin: 0px auto 10px; overflow: hidden; padding: 10px 20px; border: #2578a0 solid 1px; border-radius:5px;}
  .c_b_a_a_a{width:100%; height:30px; line-height:30px; text-align: left; margin: 0; overflow: hidden; font-size: 26px; color: #a6d6ff;}
  .c_b_a_a_b{width:100%; /*height:148px;*/ text-align: left; margin: 0; overflow: hidden; font-size: 22px; color: #ffffff;}
  .c_b_a_a_b table{/*width:328px;*/ height:148px; text-align: left; margin: 0px auto; overflow: hidden; }
  .c_b_a_a_b table tr td:nth-child(1){ width: 100px;display: inline-block;}
  .c_b_a_a_b table input{ width: 90px; height: 28px; line-height: 28px; border: #6370e2 solid 1px; background-color: #05294c; font-size: 20px; color: #ffffff;}
  .c_b_a_a_b table select { width: 270px;height: 30px;display:inline-block;line-height: 28px;border: #6370e2 solid 1px;background-color: #05294c;font-size: 18px;color: #ffffff;border-radius: 5px;}
  .c_b_a_b{/*width:328px; height:498px;*/ text-align: left; margin: 0px auto; overflow: hidden; padding: 10px 20px; border: #2578a0 solid 1px; border-radius:5px;}
  .c_b_a_b_a{width:328px; height:30px; line-height:30px; text-align: left; /*margin: 0px auto 10px; */overflow: hidden; font-size: 26px; color: #a6d6ff;}
  .c_b_a_b_b{width:312px; height:20px; line-height:20px; text-align: left;/* margin: 10px auto; */padding-left: 10px; overflow: hidden; font-size: 20px; color: #ffffff; border-left: #b6eeff solid 6px;}
  .c_b_a_b_c{width:328px; height:auto; line-height:25px; text-align: left; margin: 0px auto; overflow: hidden; font-size: 18px; color: #d7edff}
  .c_b_a_b_c table{width:328px; height:auto; line-height:25px; text-align: left; margin: 0px auto; overflow: hidden; }
  .c_b_a_b_c table tr td:nth-child(1){ cursor: pointer;width:auto; height:25px; line-height:25px; text-align: left; margin: 0px auto; overflow: hidden; }
  .c_b_a_b_c table tr td:nth-child(2){ cursor: pointer;width:auto; height:25px; line-height:25px; text-align: right; margin: 0px auto; overflow: hidden; font-size: 18px; color: #fffc00;}
  .c_b_a_b_c_a{border-right: #cc0000 solid 12px; margin-left: 10px;}
  .c_b_a_b_c_b{border-right: #ffff00 solid 12px; margin-left: 10px;}
  .c_b_a_b_c_c{border-right: #ff9900 solid 12px; margin-left: 10px;}
  .c_b_a_b_c_d{border-right: #3366ff solid 12px; margin-left: 10px;}
  .c_b_b{width: 1402px;height: 710px; text-align: left; /*margin: 0 60px;*//*margin: 0px auto;*/ float: left; display: inline; overflow: hidden;}
  .c_b_b_a{/*width:1480px;height:168px; */ text-align: left; margin: 0px auto; overflow: hidden;}
  .c_b_b_a ul{/*width:1480px; height:168px; */text-align: left; margin: 0px auto; overflow: hidden;}
  .c_b_b_a ul li{width:405px; height:128px; text-align: left; margin: 0px auto; float: left; display: inline; overflow: hidden; padding: 20px 30px;}
  .c_b_b_a ul li:nth-child(1){background: url(../../static/img/yjzx/yjzx_16.png) no-repeat;background-size: contain;}
  .c_b_b_a ul li:nth-child(2){background: url(../../static/img/yjzx/yjzx_17.png) no-repeat; margin: 0px 42.5px;background-size: contain;}
  .c_b_b_a ul li:nth-child(3){background: url(../../static/img/yjzx/yjzx_17.png) no-repeat;background-size: contain;}
  .c_b_b_a_a{/*width:405px;*/ height:30px; line-height: 30px; text-align: left; /*margin: 0px auto 20px;*/ overflow: hidden; font-size: 26px; color: #a6d6ff; }
  .c_b_b_a_b{    width: 90%;
    height: 78px;
    line-height: 78px;
    text-align: right;
    /* margin: 0px auto 20px; */
    /* padding-left: 150px; */
    overflow: hidden;
    font-size: 60px;
    color: #ffab27; }
  .c_b_b_a_b span:nth-child(2){ font-size: 22px; color: #ffffff;}
  .c_b_b_b{width:1440px; height:63px; line-height: 63px; text-align: left; margin: 29px auto 10px; padding: 0px 20px; overflow: hidden; background: url(../../static/img/yjzx/yjzx_27.png) no-repeat;}
  .c_b_b_b a{width:1440px; height:63px; line-height: 63px; text-align: left; margin: 0px auto; overflow: hidden; text-decoration: none; display: block; font-size: 24px; color: #a6d6ff;}
  .c_b_b_c{width:1480px; height:470px; text-align: left; margin: 0px auto; overflow: hidden;}
  .c_b_b_c_a{width:960px;/*width:898px;*/ height:428px; text-align: left; padding: 20px 10px 0px 10px; float: left; display: inline;  overflow: auto; border:#008bff solid 1px;}
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
  #c_b_b_c_a_b_b{width:790px; height:114px; line-height: 38px; text-align: left; margin: 0px auto; float: right; display: inline;  overflow: hidden;}
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
    /*height: 550px;*/
    text-align: left;
    margin: 0 1px;
    overflow: hidden;
  }

  .el-date-picker{
    width: 270px;
    height: 33px;
    line-height: 30px;
    border: #6370e2 solid 1px;
    background-color: #05294c;
    color: #fff;
  }

  .aqyh_q_b_c_c_a{
    width: 100%;
    height: 100%;
    text-align: left;
    margin: 0px auto 5px;
    overflow-x: hidden;
    overflow-y: hidden;

   /* width:860px; !*height:329px;*! text-align: left; margin: 0px auto 5px; overflow-x: hidden;*/
   /* overflow-y: auto;*/
  }

  .aqyh_q_b_c_c_table{
    background-color: transparent;
    font-size: 16px;
    color: white;
    cursor: pointer;
  }
  .el-table thead {
    color: white;
  }
  .el-table th, .el-table tr{
    background-color: transparent;
  }
  .el-table th, .el-table tr:hover{
    background-color: transparent;
  }
  .el-pagination {
    padding: 15px 5px;
    text-align: center;
    /* font-size: 16px; */
  }
  .el-table td, .el-table th.is-leaf {
     border-bottom: 0 solid #ebeef5;
  }
  .el-pagination__total {
    color: white;
    font-size: 16px !important;
    line-height: 40px !important;
    height: 40px !important;
  }
  .el-pagination .btn-next, .el-pagination .btn-prev {
    background: transparent;
    color: white;
    font-size: 16px !important;
    line-height: 40px !important;
    height: 40px !important;
  }
  .el-pager li {
    background: transparent;
    color: white;
    font-size: 16px !important;
    line-height: 40px !important;
    height: 40px !important;
  }
  .el-pager li.btn-quicknext, .el-pager li.btn-quickprev {
    color: white;
  }
  .el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon {
    font-size: 16px;
  }
  .el-pagination button, .el-pagination span:not([class*=suffix]) {
    height: 40px;
    line-height: 40px;
  }

  .el-pagination__jump {
    color: white;
  }
  .c{
    .el-table--enable-row-hover .el-table__body tr:hover>td{
      background-color: #212e3e !important;
      cursor: pointer;
    }
    .el-table__body tr.current-row>td{
      background-color: #212e3e !important;
    }
  }
  .el-pagination button:disabled {
    color: white;
    background-color: transparent;
  }

  /*.aqyh_q_b_c_c_a table thead{*/
    /*width: 100%;*/
    /*line-height: 40px;*/
    /*margin: 0 80px;*/
    /*font-size: 20px;*/
    /*color: #dac6c6;*/
    /*!*width:860px; height:auto; line-height: 40px; font-size: 16px; color: #555555; font-weight: bold;*!*/
  /*}*/
  /*.aqyh_q_b_c_c_a table tbody{*/
    /*width: 100%;*/
    /*line-height: 40px;*/
    /*margin: 0 80px;*/
    /*font-size: 20px;*/
    /*color: #dac6c6;*/
  /*}*/

  /*.aqyh_q_b_c_c_a table{*/

    /*width: 99%;*/
    /*height: 80%;*/
    /*display: block;*/
    /*padding-top: 30px;*/
  /*}*/
  /*.aqyh_q_b_c_c_a table thead,*/
  /*.aqyh_q_b_c_c_a table tbody,*/
  /*.aqyh_q_b_c_c_a table thead tr,*/
  /*.aqyh_q_b_c_c_a table tbody tr{*/
    /*!*width:100%;*!*/
    /*!*height:100%;*!*/
    /*display: block;*/
    /*clear:both;*/
  /*}*/
  /*.aqyh_q_b_c_c_a table thead tr td,*/
  /*.aqyh_q_b_c_c_a table tbody tr td{*/
    /*display: block;float:left;overflow: hidden;*/
    /*text-overflow: ellipsis;white-space: nowrap;text-align: center;*/
  /*}*/
</style>
<style lang="scss">
  .el-date-editor .el-range__icon {
    line-height: 22px;
  }
  .el-range-separator {
    line-height: 22px!important;
    width: auto!important;
    color: white!important;
  }
  .el-date-editor .el-range-input{
    color: white;
    background-color: transparent;
  }
</style>
