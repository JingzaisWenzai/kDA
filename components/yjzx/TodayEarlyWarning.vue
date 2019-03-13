<template>
  <div class="m">
    <div class="b">
      <div class="b_a">
        <span><img src="../../static/img/yjzx/yjzx_7.png"/></span>
        <a href="/web/yxzxVSyjzx/yjzx"><span style="color: #43d3ff;">当前预警</span></a>
      </div>
      <div class="b_b">
        <!--<div class="b_b_a">-->
          <!--<span><img src="../../static/img/yjzx/yjzx_3.png"/></span>-->
          <!--<span>预警数量</span>-->
        <!--</div>-->
        <div class="b_b_b">
          <div class="b_b_b_a">
            <div class="b_b_b_a_a">{{this.today_alram_one_data.length>0?this.today_alram_one_data[0].value:'--'}}</div>
            <div class="b_b_b_a_b">{{this.today_alram_one_data.length>0?this.today_alram_one_data[0].name:'待处置'}}</div>
          </div>
          <div class="b_b_b_b">
            <span>{{this.today_alram_one_data.length>1?this.today_alram_one_data[1].name+'：':'今日累计总数：'}}</span>
            <span>{{this.today_alram_one_data.length>1?this.today_alram_one_data[1].value:'--'}}</span>
          </div>
        </div>
      </div>
      <div class="b_c">
        <div class="b_c_a">
          <span><img src="../../static/img/yjzx/yjzx_3.png"/></span>
          <span>预警类型</span>
        </div>
        <div class="b_c_b yjzx_b_b">
          <ul>
            <!--预警类型下面的按钮 点击事件-->
            <li v-for="(item,index) in this.typyOne" :key="index" @click="getTypeList(index,item)"> <!--@click="getTitleList(0)"-->
              <div class="b_c_b_a"><a :class="current === index?'b_c_b_a_click':'b_c_b_a_noclick'"  href="javascript:void(0);" :title="item.name">{{item.name}}</a></div>
              <div class="b_c_b_b" v-if="item.value === undefined?false:(item.value>0)">{{item.value}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="b_d">
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane v-for="(value,key,index) in typyTwo" :key="index" :label="key" :name="key">
            <div class="b_d_b">
              <div class="b_d_b_a">
                <el-table
                  :data="value"
                  style="width: 710px;max-height:505px"
                  class="aqyh_q_b_c_c_table"
                  max-height="450"
                  :row-style="{maxHeight:'35px',overflow:'hide'}"
                  :cell-style="{maxHeight:'35px',overflow:'hide',padding:'5px 0'}"
                >
                  <el-table-column
                    prop="page"
                    label="序号"
                    width="80px"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="类型细分"
                    width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    label="预警内容"
                    width="315"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="time"
                    label="发生时间"
                    width="160"
                  >
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
  import bus from '../../assets/js/main.js'
  import {today_alram_one,today_alram_two,today_alram_three} from '../../api/yjzx'
  export default {
    props:['type'],
    data() {
      return {
        typyTwo:null,
        typyOne:null,
        current:-1,
        cur:-2,
        today_alram_one_data:[],
        time:'',
        activeName:'全部'
      }

    },
    watch:{
      type:{
        handler:function(val, old) {
          if(this.typyOne === null){
            this.typyOne = val.data
          }
        },
        deep:true
      }
    },
    computed:{

    },
    beforeDestroy(){
      bus.$off('curTime')
    },
    mounted() {
      this.a_click= "b_c_b_a_noclick";

      //头部当前预警数量及几日预警数量
      this.getToday_alram_one()
      //各类预警及其数量
      this.getToday_alram_two()

      let $this = this
      bus.$on('timeSelect',function(time) {
        console.log(time)
        $this.time = time
        //各类预警及其数量，先清除之前的数量
        for(let i = 0,j = $this.typyOne.length;i<j;i+=1){
          $this.typyOne[i].value = 0
        }
        $this.getToday_alram_two()
      })

    },
    methods:{
      /**
       * 当前预警及其数量
       * */
      getToday_alram_one(){
        let $this = this
        today_alram_one().then(function (data) {
          $this.today_alram_one_data = data
        })
      },
      /**
       * 预警类别及其数量
       * */
      getToday_alram_two(){
        let $this = this
        today_alram_two({date:this.time}).then(function (data) {
          console.log(data)
          $this.typyOne = data
          return
          setTimeout(function () {
            let tempIndex = -1
            for(let i = 0, j = data.length;i<j;i+=1){
              if(Number(data[i].value) > 0){
                tempIndex = i
                break
              }
            }
            if(tempIndex === -1){
              // $this.showDetail = false
              $this.current = 0
              document.getElementsByClassName('yjzx_b_b')[0].children[0].children[0].click()
              // bus.$emit('showTimeLine',false)
            }else {
              // $this.showDetail = true
              $this.current = tempIndex
              document.getElementsByClassName('yjzx_b_b')[0].children[0].children[tempIndex].click()
              // bus.$emit('showTimeLine',true)
            }
          },500)
        })
      },
      /**
       * 预警列表
       * @param index 一级分类位置
       * @param item 一级分类详情数据
       */
      getTypeList(index,item){
        console.log(item)
        this.current = index
        this.activeName = '全部'
        this.typyTwo = null
        let $this = this
        let typeOneArray = {
          '全部':[]
        }
        for(let i = 0 ,j = $this.type.code[item.code].data.length;i<j;i+=1){
          typeOneArray[$this.type.code[item.code].data[i].name] = []
        }
        today_alram_three(item.code,{date:this.time}).then(function (data) {

          for(let i = 0,j = data.length;i<j;i+=1){
            typeOneArray['全部'][i] = {}
            data[i].time = data[i].time.split('.0')
            for(let n in data[i]){
              typeOneArray['全部'][i][n] = data[i][n]
            }
            typeOneArray['全部'][i].page = i+1
          }
          for(let i = 0,j = data.length;i<j;i+=1){
            if(typeOneArray[data[i].type][typeOneArray[data[i].type].length] === undefined){
              typeOneArray[data[i].type][typeOneArray[data[i].type].length] = {}
            }
            for(let n in data[i]){
              typeOneArray[data[i].type][typeOneArray[data[i].type].length-1][n] = data[i][n]
            }
            typeOneArray[data[i].type][typeOneArray[data[i].type].length-1].page = typeOneArray[data[i].type].length

          }
          $this.typyTwo = typeOneArray
        })
        bus.$emit('getMapData',item.code,item.layerid)
      }

    }
  }
</script>
<style lang="scss" scoped>
  /* ----------------------------------------------------左边----------------------------------------------- */
  .b{width:720px; height:980px; text-align: left; margin: 0px auto; overflow: hidden;  position: absolute; bottom:20px; left:40px;}
  .b_a{width:720px; height:40px; line-height: 40px; text-align: left; margin: 0px auto 20px; overflow: hidden; font-size: 36px; color: #43d3ff;}
  .b_a span{float: left; display: inline; overflow: hidden;}
  .b_a span:nth-child(1) img{ width: 40px; height: 40px; margin-right: 10px;}
  .b_b{width:720px; height:220px; text-align: left; margin: 0px auto; overflow: hidden; }
  .b_b_a{width:720px; height:40px; line-height: 40px; text-align: left; margin: 0px auto; overflow: hidden; font-size: 30px; color: #ffffff;}
  .b_b_a span{float: left; display: inline; overflow: hidden;}
  .b_b_a img{ width: 9px; height: 18px; margin: 11px 10px 11px 0px;}
  .b_b_b{width:460px; height:180px; text-align: left; margin: 0px auto ; /*padding-left: 260px;*/overflow: hidden;}
  .b_b_b_a{width:180px; height:180px; text-align: center; margin: 0px auto;  float: left; display: inline; overflow: hidden; background: url(../../static/img/yjzx/yjzx_8.png) no-repeat;}
  .b_b_b_a_a{width:180px; height:70px; line-height: 70px; text-align: center; margin: 40px auto 0px; float: left; display: inline; overflow: hidden; font-size: 70px; color: #ffab27;}
  .b_b_b_a_b{width:180px; height:40px; line-height:40px; text-align: center; margin: 0px auto 30px; float: left; display: inline; overflow: hidden; font-size: 22px; color: #ffffff;}
  .b_b_b_b{width:280px; height:40px; line-height: 40px; text-align: left; margin: 140px auto 0px; float: left; display: inline; overflow: hidden; font-size: 24px; color: #43d3ff;}
  .b_b_b_b span:nth-child(2){font-size: 24px; color: #ffab27;}
  .b_c{width:720px;/* height:200px;*/ text-align: left; margin: 20px auto; overflow: hidden; }
  .b_c_a{width:720px; height:40px; line-height: 40px; text-align: left; margin: 0px auto 10px; overflow: hidden; font-size: 30px; color: #ffffff;}
  .b_c_a span{float: left; display: inline; overflow: hidden;}
  .b_c_a img{ width: 9px; height: 18px; margin: 11px 10px 11px 0px;}
  .b_c_b{width:720px;/* height:150px;*/ text-align: left; margin: 0px auto; overflow: hidden;}
  .b_c_b ul{width:720px; /*height:150px; */line-height: 50px; text-align: left; margin: 0px auto; overflow: hidden;}
  .b_c_b ul li{/*width:176px;*/cursor:pointer; height:50px; line-height: 50px; text-align: left; margin: 0px 2px; float: left; display: inline; overflow: hidden;}
  .b_c_b_a{width:auto; height:50px; line-height: 50px; text-align: left; margin: 0px 2px 0px 0px; float: left; display: inline; overflow: hidden;}
  .b_c_b_a a{width:auto; height:48px; line-height: 48px; text-align: left; padding: 1px 6px;  text-decoration: none; display: block; font-size: 22px; }
  .b_c_b_a a:hover{width:auto; height:48px; line-height: 48px; text-align: left; padding: 0px 5px;  text-decoration: none; display: block; font-size: 22px; color: #ffab27; border: #ffab27 solid 0px; border-radius:5px;}

  .b_c_b_a_click{
    color: #ffab27;
  }
  .b_c_b_a_noclick{
    color: #43D3FF;
  }


  .b_c_b_b{/*width:30px;*/ height:30px; line-height: 30px; text-align: center; margin: 0px auto 20px; float: left; display: inline; overflow: hidden; /*background: url(../../static/img/yjzx/yjzx_9.png) no-repeat;*/ font-size: 16px; color: #ff0000;}
  .b_d{width:720px; /*height:460px;*/ text-align: left; margin: 0px auto; overflow: hidden; }
  .b_d_a{width:720px; height:35px; line-height: 35px; text-align: left; margin: 0px auto 15px; overflow: hidden; }
/*
  .b_d_a ul{ height:35px; line-height: 35px; text-align: left; margin: 0px auto; overflow: hidden;}
*/
  .b_d_a ul{width:402px; height:35px; line-height: 35px; text-align: left; margin: 0px auto; padding-right: 318px; overflow: hidden;}
  .b_d_a ul li{width:114px; height:35px; line-height:35px; text-align: left; margin: 0px 20px 0px 0px; float: left; display: inline;  overflow: hidden;}
  .b_d_a ul li a{cursor:pointer;
    width:114px; height:35px; line-height:35px; text-align: center; text-decoration: none; display: block; font-size: 20px; color: #36aacc;
  }
  .b_d_a ul li a:hover{
    width:110px; height:32px; line-height:35px; text-align: center; text-decoration: none; display: block; font-size: 20px;
    color:#3DBAFF;
  /*  border: #3DBAFF solid 1px;*/
    border-radius:5px;
  }
  .b_d_a_click{
    width:114px; height:35px; line-height:35px; text-align: center; text-decoration: none; display: block; font-size: 20px;
    color:#3DBAFF;
    border-radius:5px;
  }
 /* .b_d_a_click{

  }*/


  .b_d_a_click{background: url(../../static/img/yjzx/yjzx_29.png) no-repeat;}
  .b_d_b{width:720px; /*height:410px;*/ text-align: left; margin: 0px auto; overflow: hidden; background: url(../../static/img/yjzx/yjzx_28.png) no-repeat;}
  /*.b_d_b .b_d_b_a table{*/
    /*!*table-layout: fixed;*!*/
    /*float: left;*/
    /*table-layout:fixed;*/
    /*width:680px;*/
    /*height:410px;*/
    /*text-align: left;*/
    /*!*margin: 0px auto; *!*/
    /*!*padding:0px 20px; *!*/
    /*overflow: hidden;*/
  /*}*/

  .b_d_b_a {
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: transparent !important;
      cursor: pointer;
    }
    .el-table__body tr.current-row > td {
      background-color: transparent !important;
    }
  }
  /*.b_d_b .b_d_b_a table thead{width:680px; height:50px; line-height: 50px; text-align: center; margin: 0px auto; overflow: hidden; font-size: 20px; color: #43d3ff;}*/
  /*.b_d_b .b_d_b_a table tbody{width:680px; height:360px; line-height: 36px; text-align: center; margin: 0px auto; overflow: hidden; font-size: 18px; color: #43d3ff;}*/
  /*.b_d_b .b_d_b_a table tbody tr{height: 40px;}*/
  .b_d_b .b_d_b_a table tbody tr td{
    /*max-width:8px;
    text-overflow:ellipsis;
    overflow:hidden;*/
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
  /*.b_d_b .b_d_b_a table thead tr td:nth-child(1),.b_d_b .b_d_b_a table tbody tr td:nth-child(1){*/
    /*width: 10%;*/
  /*}*/
  .b_d_b_a{
    height: 100%;
    overflow-y: auto;
  }
  .bfb{width: 40%;}

  .aqyh_q_b_c_c_table{
    /*cursor: pointer;*/
  }

  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: 0 0 0 5px hsla(26,20%,66%,.05) inset!important;
    background-image: -webkit-gradient(linear,left bottom,left top,color-stop(.44,#7a99d9),color-stop(.72,#497dbd),color-stop(.86,#1c3a94));
  }

</style>
<style lang="scss">
  .el-tabs--border-card>.el-tabs__content {
    padding: 15px 0 !important;
  }
  .el-tabs--border-card {
    background: transparent !important;
    border: none !important;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: transparent !important;
  }
  .el-table__body tr.current-row>td{
    background-color: transparent;
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    font-size: 20px;
  }
</style>
