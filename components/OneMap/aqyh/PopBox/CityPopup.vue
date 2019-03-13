<template>
  <div class="city_container">
    <div class="title">
      <p><span></span><span>{{title.name}}</span><span v-if="flag2 === 'yes'">{{title.subName}}</span></p>
      <i @click='toClose'></i>
    </div>
    <div class="navBar">
      <ul>
        <li v-for="(item,index) in navBar" :style="{padding:item===''?'5px 0':'5px 25px'}" :key="index" :class="navNow === item ? 'active':''"
            @click="toChangeNav(item)">{{item}}
        </li>
      </ul>
    </div>
    <div v-if="navNow === '基本信息' || navNow === '责任主体'" class="basicList">
      <ul>
        <li v-for="(value,key,index) in basicList" :key="index"><span>{{key}}</span><span>:</span><span
          v-if="typeof value === 'string'">{{value}}</span><span v-else v-for="(ovalue,okey,oindex) in value"
                                                                 :key="oindex">{{okey}} : {{ovalue}}</span></li>
      </ul>
    </div>
    <div v-else>
      <div class="tableBox">
        <table v-if="tableBox.thead">
          <thead>
          <tr>
            <td v-if="tableBox.thead.length!==0">序号</td>
            <td v-for="(a,b) in tableBox.thead" :key="b" :title='a'>{{a}}</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(c,d) in tableBox.tbody" :key="d">
            <td>{{d + 1 }}</td>
            <td v-for="(e,f) in c" :key="f">{{e}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="city_page" v-if="tableBox.thead">
        <city-page v-if="tableBox.thead.length!==0" @toPage='toNewPage' :page="pageInfo"></city-page>
      </div>
    </div>
  </div>
</template>
<style scoped>
  ::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }

  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb {
    border-radius: 999px;
    border: 4px solid transparent;
  }

  ::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px rgba(185, 165, 150, .2) inset;
  }

  ::-webkit-scrollbar-thumb {
    min-height: 20px;
    background-clip: content-box;
    box-shadow: 0 0 0 5px #196db4 inset;
  }

  ::-webkit-scrollbar-corner { /*background:transparent;*/
  }

  .city_container {
    width: 100%;
    height: auto;
    background-color: rgba(2, 22, 35, 0.8);
    box-shadow: 0 0 5px #1c609d;
    border: 1px solid #1c609d;
    padding-bottom: 15px;
  }

  .city_container .title {
    overflow: hidden;
    width: 95%;
    margin: 0 auto;
    height: 50px;
    padding-top: 10px;
    color: #5fb6ff;
    font-size: 26px;
    position: relative;
  }

  .city_container .title p {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  .city_container .title p span {
    display: inline-block;
    vertical-align: middle;
  }

  .city_container .title p span:first-child {
    width: 40px;
    height: 40px;
    background: url('../../../../static/img/aqyhPop/building.png') center no-repeat;
    background-size: contain;
  }

  .city_container .title p span:nth-child(2) {
    margin-left: 8px;
    margin-right: 8px;
  }

  .city_container .title p span:nth-child(3) {
    font-size: 20px;
    color: #e20002;
    margin-top: 10px;
    font-weight: bold;
  }

  .city_container .title i {
    cursor: pointer;
    display: block;
    width: 24px;
    height: 24px;
    background: url('../../../../static/img/aqyhPop/close.png') center no-repeat;
    background-size: contain;
    position: absolute;
    left: 100%;
    top: 50%;
    margin-left: -30px;
    margin-top: -12px;
  }

  .city_container .navBar {
    overflow: hidden;
    width: 95%;
    margin: 15px auto 0 auto;
    height: 40px;
    color: #b1d8ed;
    font-size: 22px;
    position: relative;
    border: 1px solid rgba(25, 66, 132, 0.5);
    background-color: rgba(10, 36, 77, 0.8);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .city_container .navBar ul {
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    height: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .city_container .navBar ul li {
    display: inline-block;
    vertical-align: middle;
    width: auto;
    background-color: transparent;
    padding: 5px 25px;
    text-align: center;
  }

  .city_container .navBar ul li.active,
  .city_container .navBar ul li:hover {
    background-color: #196db4;
    color: #ffffff;
  }

  .city_container .tableBox {
    width: 95%;
    margin: 15px auto 0 auto;
    height: auto;
    max-height: 430px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .city_container .tableBox table {
    width: 100%;
    border-collapse: collapse;
    height: auto;
    text-align: center;
  }

  .city_container .tableBox table thead tr td {
    color: #cefeff;
    font-size: 18px;
  }

  .city_container .tableBox table tbody tr td {
    color: #a6d6ff;
    font-size: 16px;
  }

  .city_container .tableBox table thead tr td,
  .city_container .tableBox table tbody tr td {
    border: 1px solid #015376;
    padding: 10px 0;
  }

  .city_container .city_page {
    width: 95%;
    margin: 15px auto 0 auto;
    text-align: right;
  }

  .city_container .basicList {
    width: 95%;
    height: auto;
    margin: 25px auto 20px auto;
    max-height: 450px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .city_container .basicList ul {
    display: block;
    padding: 0 0 0 25px;
    width: 100%;
    list-style: none;
  }

  .city_container .basicList ul li {
    width: 100%;
    padding: 4px 0;
  }

  .city_container .basicList ul li span {
    display: inline-block;
    vertical-align: middle;
    color: #5ddfff;
    font-size: 20px;
  }

  .city_container .basicList ul li span:nth-child(2) {
    color: #cefeff;
    margin: 0 15px 0 6px;
  }

  .city_container .basicList ul li span:nth-child(1) {
    color: #cefeff;
  }

  .city_container .basicList ul li span:nth-child(4) {
    margin-left: 15px;
  }
</style>
<script>
  import CityPage from '../../Common/Paging/PageMenuPopup.vue'
  import {
    getPopUp_CityRisk_Basic,
    getPopUp_CityRisk_Agency,
    getPopUp_CityRisk_Assessment,
    getPopUp_CityRisk_Danger,
    getPopUp_CityRisk_Alarm,
    getPopUp_CityRisk_Accident,
    getPopUp_enterprise_Basic,
    getPopUp_enterprise_Agency,
    getPopUp_enterprise_Assessment,
    getPopUp_enterprise_Danger,
    getPopUp_enterprise_Alarm,
    getPopUp_enterprise_Accident
  } from '../../../../api/secapi'

  export default {
    data() {
      return {
        navNow: '基本信息',
        title: {
          name: '',
          subName: '风险源详情'
        },
        navBar: [],
        navBarBox: [
          // ['基本信息','责任主体','监管机构','风险隐患','风险事故'],
          ['基本信息', '', '监管机构', '风险隐患', '风险事故'],
          ['基本信息', '责任主体', '监管机构', '风险评估', '风险隐患', '风险预警', '风险事故']
        ],
        tableBox: {
          thead: [], tbody: []
          /*thead:['评估人','风险类型','风险等级','风险分值','审核人','审核时间','状态'],
          tbody:[
            ['罗','其他','低','6','罗','2018-12-29','通过'],
            ['罗','其他','低','6','罗','2018-12-29','通过'],
            ['罗','其他','低','6','罗','2018-12-29','通过'],
            ['罗','其他','低','6','罗','2018-12-29','通过'],
            ['罗','其他','低','6','罗','2018-12-29','通过'],
            ['罗','其他','低','6','罗','2018-12-29','通过'],
            ['罗','其他','低','6','罗','2018-12-29','通过'],
            ['罗','其他','低','6','罗','2018-12-29','通过'],
            ['罗','其他','低','6','罗','2018-12-29','通过'],
            ['罗','其他','低','6','罗','2018-12-29','通过'],
            ['罗','其他','低','6','罗','2018-12-29','通过'],
            ['罗','其他','低','6','罗','2018-12-29','通过'],
            ['罗','其他','低','6','罗','2018-12-29','通过'],
            ['罗','其他','低','6','罗','2018-12-29','通过'],
            ['罗','其他','低','6','罗','2018-12-29','通过']
          ]*/
        },
        basicList: {},
        basicWhole: {},
        pageInfo: {
          pageNum: 1,
          pageSize: 6,
          total: 6
        },
        wholeId: '',
        flagType: ''
        // flag1:'',
        // flag2:''
      }
    },
    computed: {
      flag1() {
        return this.$store.state.ShowQiYe
        /*纳管企业*/
      },
      flag2() {
        return this.$store.state.ShowCity
        /*城区风险评估*/
      }
    },
    mounted() {
      // this.flag1 = this.$store.state.ShowQiYe
      // this.flag2 = this.$store.state.ShowCity
      if (this.flag1) {
        if (this.flag1 === 'yes') {
          let oid = this.$store.state.detailMessageId
          this.wholeId = oid
          this.flagType = '1'
          this.getData(oid, this.navNow, this.flagType)
        }
      }

      if (this.flag2) {
        if (this.flag2 === 'yes') {
          let oid = this.$store.state.detailMessageId
          this.wholeId = oid
          this.flagType = '2'
          this.getData(oid, this.navNow, this.flagType)
        }
      }

    },
    watch: {
      navNow: {
        handler: function(val, oldVal) {
          if (val) {
          }
        },
        deep: true
      },
      pageInfo: {
        handler: function(val, oldVal) {
          if (val) {
          }
        },
        deep: true
      },
      tableBox: {
        handler: function(val, oldVal) {
          if (val) {

          }
        },
        deep: true
      },
      basicList: {
        handler: function(val, oldVal) {
          if (val) {
          }
        },
        deep: true
      },
      flag1: {
        handler: function(val, oldVal) {
          if (val) {
            if (val === 'yes') {
              let oid = this.$store.state.detailMessageId
              this.wholeId = oid
              this.flagType = '1'
              this.getData(oid, this.navNow, this.flagType)
            }
          }
        },
        deep: true
      },
      flag2: {
        handler: function(val, oldVal) {
          if (val) {
            if (val === 'yes') {
              let oid = this.$store.state.detailMessageId
              this.wholeId = oid
              this.flagType = '2'
              this.getData(oid, this.navNow, this.flagType)
            }
          }
        },
        deep: true
      }
    },
    components: {
      CityPage
    },
    methods: {
      async getData(id, nav, type) {
        let odata, data
        this.navBar = this.navBarBox[Number(type) - 1]
        if (nav === '基本信息') { /*基本信息*/
          if (type === '1') {
            odata = await getPopUp_enterprise_Basic({ id: id })
          } else if (type === '2') {
            odata = await getPopUp_CityRisk_Basic({ id: id })
          }
          data = odata
          this.title.name = data.buildName
          this.basicList = data.basicDetail
        } else if (nav === '责任主体') { /*责任主体*/
          if (type === '1') {
            odata = await getPopUp_enterprise_Basic({ id: id })
          } else if (type === '2') {
            odata = await getPopUp_CityRisk_Basic({ id: id })
          }
          data = odata
          this.title.name = data.buildName
          this.basicList = data.subjectDetail
        } else if (nav === '监管机构') {  /*监管机构*/
          if (type === '1') {
            odata = await getPopUp_enterprise_Agency({
              id: id,
              pageNum: this.pageInfo.pageNum,
              pageSize: this.pageInfo.pageSize
            })
          } else if (type === '2') {
            odata = await getPopUp_CityRisk_Agency({
              id: id,
              pageNum: this.pageInfo.pageNum,
              pageSize: this.pageInfo.pageSize
            })
          }
          data = odata
          this.tableBox = data.list
          this.pageInfo.pageNum = data.pageNum
          this.pageInfo.total = data.pages
        } else if (nav === '风险评估') {  /*风险评估*/
          if (type === '1') {
            //        odata = await  getPopUp_enterprise_Assessment({id:id,pageNum:this.pageInfo.pageNum,pageSize:this.pageInfo.pageSize});
          } else if (type === '2') {
            odata = await  getPopUp_CityRisk_Assessment({
              id: id,
              pageNum: this.pageInfo.pageNum,
              pageSize: this.pageInfo.pageSize
            })
          }
          if (odata) {
            data = odata
            this.tableBox = data.list
            this.pageInfo.pageNum = data.pageNum
            this.pageInfo.total = data.pages
          } else {
            this.tableBox = { thead: [], tbody: [] }
            this.pageInfo.pageNum = 1
            this.pageInfo.total = 1
          }
        } else if (nav === '风险隐患') {  /*风险隐患*/
          if (type === '1') {
            odata = await  getPopUp_enterprise_Danger({
              id: id,
              pageNum: this.pageInfo.pageNum,
              pageSize: this.pageInfo.pageSize
            })
          } else if (type === '2') {
            odata = await  getPopUp_CityRisk_Danger({
              id: id,
              pageNum: this.pageInfo.pageNum,
              pageSize: this.pageInfo.pageSize
            })
          }
          if (odata) {
            data = odata
            this.tableBox = data.list
            this.pageInfo.pageNum = data.pageNum
            this.pageInfo.total = data.pages
          } else {
            this.tableBox = { thead: [], tbody: [] }
            this.pageInfo.pageNum = 1
            this.pageInfo.total = 1
          }
        } else if (nav === '风险预警') {  /*风险预警*/
          if (type === '1') {
//              odata = await  getPopUp_enterprise_Alarm({id:id,pageNum:this.pageInfo.pageNum,pageSize:this.pageInfo.pageSize});
          } else if (type = '2') {
            odata = await  getPopUp_CityRisk_Alarm({
              id: id,
              pageNum: this.pageInfo.pageNum,
              pageSize: this.pageInfo.pageSize
            })
          }
          if (odata) {
            data = odata
            this.tableBox = data.list
            this.pageInfo.pageNum = data.pageNum
            this.pageInfo.total = data.pages
          } else {
            this.tableBox = { thead: [], tbody: [] }
            this.pageInfo.pageNum = 1
            this.pageInfo.total = 1
          }
        } else if (nav === '风险事故') {  /*风险事故*/
          if (type === '1') {
            odata = await  getPopUp_enterprise_Accident({
              id: id,
              pageNum: this.pageInfo.pageNum,
              pageSize: this.pageInfo.pageSize
            })
          } else if (type = '2') {
            odata = await  getPopUp_CityRisk_Accident({
              id: id,
              pageNum: this.pageInfo.pageNum,
              pageSize: this.pageInfo.pageSize
            })
          }
          if (odata) {
            data = odata
            this.tableBox = data.list
            this.pageInfo.pageNum = data.pageNum
            this.pageInfo.total = data.pages
          } else {
            this.tableBox = { thead: [], tbody: [] }
            this.pageInfo.pageNum = 1
            this.pageInfo.total = 1
          }
        }
      },
      toClose: function() {
        this.$store.state.ShowCity = 'no'
        this.$store.state.ShowQiYe = 'no'
        this.navNow = '基本信息'
      },
      toChangeNav: function(item) {
        this.navNow = item
        if (this.flagType !== '') {
          this.getData(this.wholeId, this.navNow, this.flagType)
        }
      },
      toNewPage: function(asg) {
        this.pageInfo.pageNum = asg
        if (this.flagType !== '') {
          this.getData(this.wholeId, this.navNow, this.flagType)
        }
      }
    }
  }
</script>
