<template>
  <div class="map">
    <img src="../../assets/img/cstz_13.jpg"/>
    <div class="a">
      <div class="a_a">
        <ul>
          <li>
            <nuxt-link style="cursor: pointer;" to="/subjectServers?page=0" title="城市基本面"><img src="../../assets/img/cstz_1.png"/></nuxt-link>
          </li>
          <li>
            <img style="cursor: pointer;" src="../../assets/img/cstz_2.png" @click="openTableauList"/>
            <!--<el-dropdown :hide-on-click="false" placement="top" @visible-change="visibleChange" @command="tableauClick">-->
              <!--<img src="../../assets/img/cstz_2.png" @click="openTableauList"/>-->
              <!--&lt;!&ndash;<a style="cursor: pointer;" title="体征报告" @click="openTableau"><img src="../../assets/img/cstz_2.png"/></a>&ndash;&gt;-->
              <!--<el-dropdown-menu slot="dropdown">-->
                <!--<el-dropdown-item v-for="(item, index) in tableau_list" :key="index" :command="item.view_url">{{item.view_name}}</el-dropdown-item>-->
              <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->
          </li>
        </ul>
      </div>
      <div class="a_b"></div>
      <div class="door_bar"><protall-nav></protall-nav></div>
    </div>
    <div class="left">
      <left></left>
    </div>
    <div class="right child">
      <!--<router-view></router-view>-->
      <!--<right-page></right-page>-->
      <component v-bind:is="data[selectIndex]"></component>
    </div>
    <div class="tableau_list">
      <tableau-list v-if="showTableauList" :url="tableau_id"></tableau-list>
    </div>
  </div>
</template>

<script>
  import left from '../../components/tizheng/chengshijibenmian/left/index.vue'
  import gonggonganquan from '../../components/tizheng/chengshijibenmian/right/gonggonganquan/gonggonganquan.vue'
  import chengshibujian from '../../components/tizheng/chengshijibenmian/right/chengshibujian/chengshibujian.vue'
  import hongguanjingji from '../../components/tizheng/chengshijibenmian/right/hongguanjingji/hongguanjingji.vue'
  import minshengfuwu from '../../components/tizheng/chengshijibenmian/right/minshengfuwu/minshengfuwu.vue'
  import shengtaihuanjing from '../../components/tizheng/chengshijibenmian/right/shengtaihuanjing/shengtaihuanjing.vue'
  import bus from '../../assets/js/main'
  import ProtallNav from '../../components/common/ProtallNav';
  import {getParams} from '../../utils/validate'
  import { tableau_ticket, tableau_list } from '../../api/tizheng'
  import tableauList from '../../components/tizheng/common/reportList'

  export default {
    layout:'yujinjiance',
    head(){
      return {
        title:'城市体征' ,
        meta:[
          {hid:'description',name:'descriptyion',content:'预警监测平台'},
          {hid:'keywords',name:'keywords',content:'城市体正'}
        ]
      }
    },
    components: {
      left,
      gonggonganquan,
      chengshibujian,
      hongguanjingji,
      minshengfuwu,
      shengtaihuanjing,
      ProtallNav,
      tableauList
    },
    data:function () {
      return {
        data:['gonggonganquan','shengtaihuanjing','hongguanjingji','minshengfuwu','chengshibujian'],
        selectIndex:0,
        centerDialogVisible: false,
        tableauUrl:'http://10.190.65.33:80/trusted/',
        tableau_list:[],
        showTableauList:false,
        tableau_id:'181128/sheet0'
      }
    },
    beforeDestroy(){
      bus.$off('showComponents')
      bus.$off('showTableauList')
      bus.$off('showTableauDetail')
    },
    mounted:function () {
      bus.$on('showComponents',this.showComponents)
      bus.$on('showTableauList',this.showTableau)

      bus.$on('showTableauDetail',this.showTableauDetail)
      // this.visibleChange(true)
    },
    methods:{
      showTableauDetail(url){
        this.tableau_id = url
        this.showTableauList = true
      },
      showTableau(){
        this.showTableauList = false
      },
      showComponents(index){
        this.selectIndex = index
      },
      openTableau(command){
        let $this = this
        tableau_ticket().then(function(data) {
          $this.tableauUrl += data.data+'/views/'+command
          console.log($this.tableauUrl)
          $this.centerDialogVisible = true
        })
      },
      visibleChange(type){
        console.log(type)
        let $this = this
        if(type === true){
          tableau_list().then(function(data) {
            console.log(data)
            $this.tableau_list = data.data
          })
        }
      },
      tableauClick(command){
        console.log(command)
        this.openTableau(command)
      },
      openTableauList(){
        this.showTableauList = !this.showTableauList
      }
    }
    // async asyncData (context) {
    //   // var url = "http://"+context.req.headers.host+"/popsData.json"
    //   // var url = "./popsData.json"
    //   // let { data } = await axios.get(url)
    //   return { data:data }
    // }
  }
</script>

<style>
  body{
    margin: 0;
  }
  .map{width:3840px; height:1080px; text-align:center; margin:0px auto; overflow: hidden; position: relative;}
  .a{width:3780px; height:128px; text-align: left; margin: 0px auto; padding: 0px 20px 0px 40px; /*overflow: hidden;*/  position: absolute; top:0px; left:0px; }
  .a_a{width:600px; height:70px; text-align: left; margin: 29px auto;  float: left; display: inline; overflow: hidden;}
  .a_a ul{width:600px; height:70px; text-align: left; margin: 0px auto; overflow: hidden;padding: 0;}
  .a_a ul li{width:250px; height:70px; line-height: 70px; text-align: left; margin: 0px 25px;  float: left; display: inline; /*overflow: hidden;*/}
  .a_a ul li img{width:250px; height:70px;}
  .a_b{width:2332px; height:128px; text-align: left; margin: 0px 63px 0px 114px;  float: left; display: inline; overflow: hidden; background: url(../../assets/img/cstz_5.png) no-repeat;}
  .a_c{width:101px; height:54px; line-height: 54px; text-align: left; margin-top: 29px;  float: right; display: inline; overflow: hidden; background-color: #021019; border-bottom: #272a7d solid 1px;}
  .a_c img{width:101px; height:54px;}
  .left{width:1860px; height:910px; text-align: left; margin: 0px auto; overflow: hidden;  position: absolute; bottom:0px; left:40px;}
  .map .right{width:1860px; height:910px; text-align: left; margin: 0px auto; overflow: hidden;  position: absolute; bottom:0px; right:40px;}
  .door_bar{position: absolute;left:100%;margin-left:-160px;top:30%;margin-top:-22px;width: 101px;height: 54px;}
  .a_a .el-dropdown {
    height: 70px !important;
  }
  /*.el-dropdown-menu__item {*/
    /*color: white;*/
    /*text-align: center;*/
    /*border-bottom: 1px solid #272a7d;*/
  /*}*/
  /*.el-dropdown-menu {*/
    /*background-color: transparent;*/
    /*border: 1px solid #0238a3;*/
  /*}*/
  .map .tableau_list{
    width: 0;
    height: 0;
    overflow: hidden;
    position: absolute;
    left: 310px;
    top: 88px;
  }
</style>

