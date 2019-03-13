<template>
  <div class="m">
    <div class="b">
      <div class="b_a">
        <span><img src="../../static/img/yjzx/yjzx_7.png"/></span>
        <span>当前预警</span>
      </div>
      <div class="b_b">
        <div class="b_b_a">
          <span><img src="../../static/img/yjzx/yjzx_3.png"/></span>
          <span>预警数量</span>
        </div>
        <div class="b_b_b">
          <div class="b_b_b_a">
            <!--<div class="b_b_b_a_a">{{remainCount}}</div>-->
            <!--<div class="b_b_b_a_b">待处置</div>-->
            <div class="b_b_b_a_a">{{this.today_alram_one_data.length>0?this.today_alram_one_data[0].value:'--'}}</div>
            <div class="b_b_b_a_b">{{this.today_alram_one_data.length>0?this.today_alram_one_data[0].name:'待处置'}}</div>
          </div>
          <div class="b_b_b_b">
            <!--<span>今日累计总数：</span>-->
            <!--<span>{{warningCount}}</span>-->
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
          <ul>         <!--预警类型下面的按钮 点击事件-->
            <li v-for="(value,key,index) in this.typyOne" :key="index" @click="getTypeList(index,value,$event,key)"> <!--@click="getTitleList(0)"-->
              <div class="b_c_b_a"><a :class="[{b_c_b_a_noclick:index!=current},{b_c_b_a_click:index==current}]"  href="javascript:void(0);" :title="key">{{key}}</a></div>
              <div class="b_c_b_b" v-if="value>0">{{value}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="b_d" v-show="showDetail">
        <!--<div class="b_d_a">-->
          <!--<ul>-->
            <!--<li class="b_d_a_a">-->
              <!--<a target=""  href="javascript:void(0);" title="全部"  @click="getTypeTwo(-1)"-->
                 <!--:class="{b_d_a_click:-1==cur}"-->
              <!--&gt;全部</a>-->
            <!--</li>-->
            <!--<li class="yjzx_c_c b_d_a_b " v-for="(value,index) in typyTwo" :key="index" @click="getTypeTwo(index,value)">-->
              <!--<a target="" href="javascript:void(0);" :title="value"-->
                 <!--:class="{b_d_a_click:index==cur}"-->
              <!--&gt;{{value}}</a>-->
            <!--</li>-->
           <!--&lt;!&ndash; <li class="b_d_a_c">-->
              <!--<a target="" href="####" title="企业外迁">企业外迁</a>-->
            <!--</li>&ndash;&gt;-->
          <!--</ul>-->
        <!--</div>-->

        <el-tabs type="border-card" @tab-click="handleClick">
          <el-tab-pane v-for="(value,key,index) in typyTwo" :key="index" :label="key">
            <div class="b_d_b">
              <div class="b_d_b_a">
                <el-table
                  highlight-current-row
                  :data="value"
                  style="width: 710px;max-height:505px"
                  class="aqyh_q_b_c_c_table"
                  :row-style="{maxHeight:'80px',overflow:'hide'}"
                  :cell-style="{maxHeight:'80px',overflow:'hide',padding:'5px 0'}"
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
                  >
                  </el-table-column>
                  <el-table-column
                    prop="content"
                    label="预警内容"
                    width="300"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="time"
                    label="发生时间"
                    width="130"
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
  import { mapconfig } from '../../api/common'
  import layers from '../../api/layer'
  export default {
    data() {
      return {
        dataList:[],
        allDataList:[],
        typyTwo:["--","--"],
        warningCount: 0,
        remainCount: 0,
        typyOne:null,
        typeOneTemp:[],
        WarningType: [],
        current:-1,
        cur:-2,
        today_alram_one_data:[],
        showDetail:false
      }

    },
    computed:{

    },
    beforeDestroy(){
      bus.$off('curTime')
    },
    mounted() {
      let today = new Date();
      let year = today.getYear()+'';
      let theDate = '20' + year.slice(1) +'-'+(today.getMonth()+1)+'-'+today.getDate();
      this.getdata1(theDate);
      this.a_click= "b_c_b_a_noclick";
      bus.$on('curTime', (date,hour) => {
          this.getdata1(date);
      })

      var $this = this
      today_alram_one().then(function (data) {
        $this.today_alram_one_data = data
      })
      today_alram_two().then(function (data) {
        console.log(data)
        let typeOneArray = {}
        for(let i = 0,j = data.length;i<j;i+=1){
          typeOneArray[data[i].name] = data[i].value
        }
        $this.typyOne = typeOneArray
        $this.typeOneTemp = data
        setTimeout(function () {
          let tempIndex = -1
          for(let i = 0, j = data.length;i<j;i+=1){
            if(data[i].value !== '0'){
              tempIndex = i
              break
            }
          }
          console.log('----'+tempIndex+'----')
          if(tempIndex === -1){
            $this.showDetail = false
            document.getElementsByClassName('yjzx_b_b')[0].children[0].children[0].click()
            bus.$emit('showTimeLine',false)
          }else {
            $this.showDetail = true
            document.getElementsByClassName('yjzx_b_b')[0].children[0].children[tempIndex].click()
            bus.$emit('showTimeLine',true)
          }

        },500)
      })

    },
    methods:{
      getTypeList(index,value,e,key){
        console.log(value)
        this.cur = -1;
        // if(value<1) return false;
        // this.typyTwo=this.WarningType[index].typyTwo;
        // this.dataList = this.WarningType[index].list;
        // this.allDataList = this.WarningType[index].list;
        this.current = index;
   /*     e.target.style.color="#FFAB27";*/
      /*  console.log(e.target.text);*/

        if(value === '0'){
          this.showDetail = false
          // return;
        }

        this.showDetail = false
        let $this = this
        today_alram_three(this.typeOneTemp[index].code).then(function (data) {
          $this.showDetail = true
          console.log(data)
          // $this.today_alram_one_data = data
          // $this.typyOne
          let typeOneArray = {}
          for(let i = 0,j = data.length;i<j;i+=1){
            if(typeOneArray[data[i].type] === undefined){
              typeOneArray[data[i].type] = []
              typeOneArray[data[i].type].push(data[i])
            }else {
              typeOneArray[data[i].type].push(data[i])
            }
            // if(typeOneArray.search(data[i].type) === -1){
            //   typeOneArray += ','+data[i].type
            // }
          }
          // console.log(typeOneArray)
          // $this.typyTwo = typeOneArray.split(',')
          // $this.typyTwo.unshift('全部')
          // $this.allDataList = data
          $this.typyTwo = typeOneArray
          document.getElementsByClassName('b_d_a_a')[0].children[0].click()
        })

        bus.$emit('getMapData',this.typeOneTemp[index].code,this.typeOneTemp[index].layerid)
        // bus.$emit('stopTimeOut')
      },
      getTypeTwo(index,value){
        this.cur = index;
       // $(this).addClass("b_d_a_click");
        if(index == -1&&this.typyTwo.length>0){
          this.dataList = this.allDataList;

          for(let i = 0,j = this.dataList.length;i<j;i+=1){
            this.$set(this.dataList[i],'page', i+1)
          }

          return false;
        }

        var arrList = [];
        for (var i = 0;i<this.allDataList.length;i++){
          if(value == this.allDataList[i].type){
            arrList.push(this.allDataList[i]);
          }
        }
        this.dataList = arrList;
        for(let i = 0,j = this.dataList.length;i<j;i+=1){
          this.$set(this.dataList[i],'page', i+1)
        }
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },

      //网络请求
      async getdata1(date) {
        // let data1 = await gettitle(date);
        // console.log(data1);
        //
        // // this.typyOne = data1.data.typeOne;           /*预警类型的数组*/
        // this.warningCount= data1.data.warningCount;    /*预警总数量*/
        // this.remainCount= data1.data.remainCount;       /*待处理预警数量*/
        //
        // this.WarningType = data1.data.warningType;     /**/
        // this.allDataList = this.WarningType[0].list;




        //this.dataList = this.WarningType[0].list;
        // this.typyTwo = this.WarningType[0].typyTwo;
       /* console.log(data1.data.WarningType)*/
      }/*,
      async getdata2 () {
        let data2 = await gettype();
        this.typyOne = data2.data.typyOne;
       /!* console.log(data1.data.warningCount)*!/
      },*/

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
  .b_c{width:720px; height:200px; text-align: left; margin: 20px auto; overflow: hidden; }
  .b_c_a{width:720px; height:40px; line-height: 40px; text-align: left; margin: 0px auto 10px; overflow: hidden; font-size: 30px; color: #ffffff;}
  .b_c_a span{float: left; display: inline; overflow: hidden;}
  .b_c_a img{ width: 9px; height: 18px; margin: 11px 10px 11px 0px;}
  .b_c_b{width:720px; height:150px; text-align: left; margin: 0px auto; overflow: hidden;}
  .b_c_b ul{width:720px; height:150px; line-height: 50px; text-align: left; margin: 0px auto; overflow: hidden;}
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


  .b_c_b_b{width:30px; height:30px; line-height: 30px; text-align: center; margin: 0px auto 20px; float: left; display: inline; overflow: hidden; background: url(../../static/img/yjzx/yjzx_9.png) no-repeat; font-size: 16px; color: #ff0000;}
  .b_d{width:720px; height:460px; text-align: left; margin: 0px auto; overflow: hidden; }
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
  .b_d_b{width:720px; height:410px; text-align: left; margin: 0px auto; overflow: hidden; background: url(../../static/img/yjzx/yjzx_28.png) no-repeat;}
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
</style>
