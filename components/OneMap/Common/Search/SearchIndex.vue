<template>
  <div class="search_container">
    <div class="search_bar"><search-bar @searchKey ='getSearchKey' @closeAll ='closeAll' :centerInfo="centerInfo" :showCenter="showBarCenter"></search-bar></div>
    <div class="history_box" v-show="showBox ==='whole'"><history-box @reApply="getNewPageNum" :historylists ='historyList' @showDetail="toListDetail"></history-box></div>
    <div class="history_detail" v-show="showBox === 'detail'">
      <history-detail :list-detail ='listDetail'   @toNearByResource="toNearByResource" @toHistoryList="toHistoryList" @toNearBySearch ='toNearBySearch'></history-detail>
    </div>
    <div class="nearby_resource" v-show="toResource==='on'"><nearby-resource  @closeResouce="closeNearbyResource"></nearby-resource></div>
  </div>
</template>
<style scoped>
  @import "../../../../assets/css/center-search.css";
  .search_container{
    position: relative;
  }
  .search_bar{
    width: 500px;
    height: 41px;
  }
  .history_box,
  .history_detail{
    width: 500px;
    margin-top: 20px;
    height:800px;
  }
  .nearby_resource{
    position: absolute;
    left:520px;
    top:62px;
    width:530px;
    height:800px;
  }
</style>
<script>

  import SearchBar from './SearchBar.vue';
  import HistoryBox from './HistoryBox.vue';
  import HistoryDetail from './HistoryDetail.vue';
  import NearbyResource from './NearbyResource.vue';
  import {getSearchList} from '../../../../api/ecoapi';
  import {Fun} from '../../../../static/js/OneMap/apiFuns';

  export default{
      data(){
          return{
            showBox:'off',
            historyList:[],
           // toResource:'off',
            listDetail:{},
            centerKey:'',
            searchKey:'',  //搜索字
            centerInfo:{wd:'',jd:'',name:''},  //附近搜索用到的中心地址 center={wd:'',jd:'',name:''}
      //      layerid:'',//附近搜索用到的layerid
            page:{pageNum:1,pageSize:9},     //翻页组件默认页面 默认每页传八个
       /*     nearbyQuery:{
                layerid:'',
                jd:'',
                wd:''
            },*/
            btnSwitch:'',
            showBarCenter:''     /*传给搜索栏周边搜素的内容*/
       //     searchCenter:{wd:'',jd:'',name:'',layerid:'',nodeid:''}   /*附近资源用到的中心位置*/
          }
      },
    computed:{
      toResource:function(){
          return this.$store.state.Resource.ShowResource;
      },
      ShowSearch:function(){
          return this.$store.state.Resource.ShowSearchWithoutResource;
      }
    },
    watch:{
      ShowSearch:{
          handler:function(val,oldVal){    //删除搜索落点及底部导航栏的落点
            if(val === 'off'){
              this.showBox= 'off';
              this.btnSwitch ='off';
              this.showBarCenter= '';
              Fun.clearLoadPopAndNodes(4);
              this.$store.state.Search.ShowSearch = 'off';  //让查看详情的附近搜索及附近资源样式清空
              this.$store.state.Resource.ShowSearchWithoutResource ='on';
            }
          },
          deep:true
      },
      layerid : {
        handler:function(val,oldVal){
          /*对应的数据不需要请求，根据layerid进行落点操作*/
          let playerid = val;
          let sdata = {
            tableName:this.listDetail.tableName,
            layerid:this.listDetail.layerid,
            id:this.listDetail.id,
            jd:this.listDetail.jd,
            wd:this.listDetail.wd
          };
          let adata=[]; adata.push(sdata);
          if(this.listDetail.layerid && this.listDetail.layerid !==''){
            Fun.loadSearchPoint(playerid,adata);
          }
      },
        deep:true
      },
      showBarCenter:{
        handler:function(val,oldVal){},
        deep:true
      },
      toResource:{
          handler:function(val,oldVal){
              if(val==='on'){
              }
          },
          deep:true
      },
      centerInfo:{
          handler:function () { },
          deep:true
      }
    },
    methods:{
      getSearchKey:function(data){
           console.log(data);
          this.searchKey = data.key;
          this.btnSwitch = 'off';
          this.$store.state.Resource.ShowResource ='off';
          this.$store.state.Search.ShowSearch = 'off';  //让查看详情的附近搜索及附近资源样式清空
          this.$store.state.Resource.clearNearByNodes ='yes'; //让附近搜索的POI点清空样式
          Fun.clearLoadPopAndNodes(3);
        //  console.log(12);
          this.getData({key: this.searchKey, center:this.centerInfo,page:this.page});

      },
      getNewPageNum:function(arg){
        this.page.pageNum =arg;
        this.getData({key: this.searchKey, center:this.centerInfo,page:this.page});
      },
      toListDetail:function(theDetail){
       /*
        {
          "name": "荔枝公园<em>厕所</em>",
          "address": "广东省深圳市福田区华强北街道通新岭社区红岭中路1003号荔枝公园<em>厕所</em>",
          "tableName": "TB_SANXIAOCHANGSUO_002",
          "layerid": "layer_gis_baokanting",
          "id": "AAAUw1AAEAAB1vzAAH",
          "jd": "114.09462820727758",
          "wd": "22.54998918105337",
          details:[
            {name:'医院地址',value:'深圳市福田区中康路27号'},
            {name:'街道',value:'福田区梅林街道'},
            {name:'医院等级',value:'深圳市福田区中康路27号'},
            {name:'剩余床位',value:'福田区梅林街道'},
            {name:'总科室数',value:'深圳市福田区中康路27号深圳市福田区中康路27号深圳市福田区中康路27号深圳市福田区中康路27号深圳市福田区中康路27号'},
            {name:'总床位数',value:'福田区梅林街道'},
            {name:'更新时间',value:'深圳市福田区中康路27号'}
          ]
        }*/
          this.$store.state.Search.ShowSearch = 'off';  //让查看详情的附近搜索及附近资源样式清空
          this.listDetail = theDetail;
          this.showBox= 'detail';
          this.centerInfo = {wd:'',jd:'',name:''}; //此处控制搜索框变化 此时还没有围绕中心搜索 中心搜索信息置空
          this.$store.state.Resource.searchCenter ={wd:theDetail.wd,jd:theDetail.jd,name:theDetail.name,layerid:theDetail.layerid,tableName:theDetail.tableName};
          this.btnSwitch ='';
          /*单点落图*/
          Fun.loadSingleNode(theDetail.layerid,theDetail.id);

      },
      toHistoryList:function(){
        this.$store.state.Resource.ShowResource ='off';
        this.showBox= 'whole';
      },
      toNearByResource:function(lid){
          /*附近资源*/
          if(lid ==='KO'){
            this.$store.state.Resource.ShowResource='off';
          }else{
            this.$store.state.Resource.ShowResource='on';

            /*附近资源弹窗需要layerid*/
/*          this.nearbyQuery.layerid = lid.layerid; //为了之后请求用
            this.nearbyQuery.jd = lid.jd;
            this.nearbyQuery.wd = lid.wd;*/
            this.$store.state.Resource.detailMessageId = lid.layerid ;

          }
      },
      toNearBySearch:function(name){
          /*附近搜索*/
          this.showBarCenter = name;
          if(name !==''){
            this.$store.state.Resource.ShowResource ='off';
          }
      },
      closeNearbyResource:function(){
        /* this.centerInfo.name = '';
        this.centerInfo.wd='';
        this.centerInfo.jd='';*/
        this.showBarCenter= '';
        this.$store.state.Resource.ShowResource ='off';
        /*清楚周边搜索的落点及图层  但不清处底部落点*/
        Fun.clearLoadPopAndNodes(1);
      },
      closeAll:function(){
        this.$store.state.Resource.ShowResource ='off';
        this.$store.state.Search.ShowSearch = 'off';  //让查看详情的附近搜索及附近资源样式清空
        this.showBox= 'off';
        this.btnSwitch ='off';
        this.showBarCenter= '';
        /*清楚周边搜索的落点及图层*/
        Fun.clearLoadPopAndNodes(1);
      },
      async getData ({key,center,page}){
        /*由此向后台请求并获取   this.$store.state.Search.list  */

        let query= {
          content : key,
          wd:center.wd,
          jd:center.jd,
          pageNum:page.pageNum,
          pageSize:page.pageSize
        };

        //console.log(query);
        let list = await getSearchList(query).catch((error)=>{
            console.log('搜索历史接口有误,报错为：'+error);
            alert('接口错误！');
        });

        let historyList = list;
       //console.log(historyList);
        /*   let value = [
          { layerid:'',address:'广东省深圳市南山区深南大道3688号',name:'深圳大学',
            details:[
              {name:'医院地址',value:'深圳市福田区中康路27号'},
              {name:'街道',value:'福田区梅林街道'},
              {name:'医院等级',value:'深圳市福田区中康路27号'},
              {name:'剩余床位',value:'福田区梅林街道'},
              {name:'总科室数',value:'深圳市福田区中康路27号深圳市福田区中康路27号深圳市福田区中康路27号深圳市福田区中康路27号深圳市福田区中康路27号'},
              {name:'总床位数',value:'福田区梅林街道'},
              {name:'更新时间',value:'深圳市福田区中康路27号'}
            ]
          },
          {layerid:'',address:'广东省深圳市南山区深南大道3688号',name:'深圳大学',details:[{name:'key',value:'val'},{name:'key',value:'val'},{name:'key',value:'val'}]},
          {layerid:'',address:'广东省深圳市南山区深南大道3688号',name:'深圳大学',details:[]}
        ];*/
        if(historyList.list){
            if(historyList.list.length!==0){
              let opage = {pageNum:historyList.pageNum,total:historyList.pages};
              this.historyList ={list: [].concat(historyList.list),page: opage};
              this.showBox= 'whole';
              //console.log('0' +  this.historyList);
            }else{
              this.historyList ={list: [],page:{ pageNum: 1, total:1}};this.showBox= 'whole';
            }
        }else{
          this.historyList ={list: [],page:{ pageNum: 1, total:1}};this.showBox= 'whole';
        }
      }
    },
      components:{
        SearchBar,
        HistoryBox,
        HistoryDetail,
        NearbyResource
      }
  }

</script>
