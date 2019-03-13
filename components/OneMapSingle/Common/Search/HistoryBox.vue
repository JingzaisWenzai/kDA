<template>
  <div class="history-box search-box">
      <div class="history-list" v-if="history.lists.length!==0">
        <a v-for="(item, index) in history.lists" :key = 'index' @click="toDetail(item)">
          <p class="gs-target"></p>
          <p>
            <span class="gs-target-name" v-html="item.name">{{item.name}}</span>
            <span v-html="item.address">{{item.address}}</span>
          </p>
        </a>
      </div>
      <div id="history-page" class="history-page page" v-if="history.lists.length!==0">
        <page-menu @toPage = 'toApply' :page ='history.pageInfo'></page-menu>
      </div>
    <div class="history-list" v-else>
      <a class="nodata_show"><p>暂无数据</p></a>
    </div>
  </div>
</template>
<style>
  @import '../../../../assets/css/center-search.css';

  /*搜索历史弹框*/
  .history-box{
    width:100%;
    height:100%;
    max-width:530px;
    max-height:880px;
    background-color: rgba(2,17,32,1)!important;
    -webkit-border-radius: 8px!important;
    -moz-border-radius: 8px!important;
    border-radius: 8px!important;
    border:1px solid #196db4!important;
  }
  /*搜索结果展示部分*/
  .search-box .history-list{
    width: 100%;
    margin: 0 auto;
    height: 91%;
    overflow: hidden;
  }
  .history-list a{
    display:block;
    cursor:pointer;
    width:100%;
    height:65px;
    border:1px solid transparent;
  }
  .history-list a:hover{
    background-color: rgba(25,109,180,0.5);
    border-top:1px solid transparent;
    border-bottom:1px solid transparent;
    text-decoration: none;
  }
  .history-list a p{
    display: inline-block;
    vertical-align: middle;
  }
  .history-list a p:first-child{
    width:11.88%;
    height:100%;
    background-color: transparent;
  }
  .history-list a p:last-child{
    width:82%;
    height:60%;
    background-color: transparent;
    text-align: left;
  }
  .history-list a p span{
    display: block;
    width:100%;
    line-height:20px;
    font-size: 16px;
    color: #a7d7ff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .history-list a p span.gs-target-name{
    color:#cefeff;
    font-size: 16px;
  }

  .search-box .history-page{
    width: 95%;
    height:50px;
    margin:5px auto 0 auto;
  }

  .search-box .history-list .nodata_show{
    display: block;
    width: 90%;
    margin: 30px auto;
    font-size: 20px;
    color:#a7d7ff;
  }
  /***********暗灰色************/
 /* .history-list a:hover{
    background-color: #ffffff;
    border-top:1px solid #e2e3e4;
    border-bottom:1px solid #e2e3e4;
    text-decoration: none;
  }*/
</style>
<script>
  import PageMenu from '../Paging/PageMenu.vue';
  export default{
      props:['historylists'],   /*传过来的数据{lists:[], pageInfo:{pageNum:'',total:''} }*/
      data(){
        return {
            history:{
                lists:[],
                pageInfo:{pageNum:1,total:60},
            },
            showContent:'lists'
        }
      },
      watch:{
          historylists : {
              handler:function(val,oldVal){
                this.history.lists = [].concat(val.list);
                this.history.pageInfo = val.page;
              },
              deep:true
          }
      },
      methods:{
        toDetail:function(thedetail){
            this.$emit('showDetail', thedetail);
        },
        toApply:function(num){
            /*由下部翻页组件跳转页面*/
            this.$emit('reApply',num);
        }
      },
      components:{
        PageMenu
      }
  }






  /*lists:[
   {layerid:'',address:'广东省深圳市南山区深南大道3688号',name:'深圳大学'},
   {layerid:'',address:'广东省深圳市南山区深南大道3688号',name:'深圳大学'},
   {layerid:'',address:'广东省深圳市南山区深南大道3688号',name:'深圳大学'}
   ]*/
</script>
