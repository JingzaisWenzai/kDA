<template>
  <div class="history-box search-box the-shadow detail_bg">
    <div class="detail_container">
      <div class="title"><span>{{detail.tit.txt}}</span><a><img title="返回" :src ='detail.tit.url' @click="backToHistoty"></a></div>
      <div class="content">
        <div>
          <p v-html="list.name" :title = "list.name">{{list.name}}</p>
          <a v-for="(item , index) in list.data" :key="index"><span v-html="item.name" :title = "item.name">{{item.name}}</span><span>:</span><span v-html="item.value" :title="item.value">{{item.value}}</span></a>
          <a v-if="list.data.length===0">{{detail.alt}}</a>
        </div>
      </div>
      <div class="detail_btn">
        <a @click="toNearbyResource(list)"   :class ="btn ==='res' ? 'active':''"><img class="src" :src="detail.bottom.btn1.src" /><img class="hover" :src="detail.bottom.btn1.hover" /><span>{{detail.bottom.btn1.txt}}</span></a>
        <a @click="toNearbySearch(list.name)"   :class ="btn ==='sea'? 'active':''"><img class="src" :src="detail.bottom.btn2.src" /><img class="hover"  :src="detail.bottom.btn2.hover" /><span>{{detail.bottom.btn2.txt}}</span></a>
      </div>
    </div>
  </div>
</template>
<style scoped>
  @import '../../../../assets/css/center-search.css';

  .detail_bg{width: 100%;height:100%;
    background-color: rgba(2,17,32,1)!important;
    -webkit-border-radius: 8px!important;
    -moz-border-radius: 8px!important;
    border-radius: 8px!important;
    border:1px solid #196db4!important;}
  .detail_container{ width:90%; margin:0 auto;text-align: left; height:100%;}
  .detail_container .title{width:100%;  border-bottom:1px solid rgba(0,0,0,0.5);  text-align: left;}
  .detail_container .title a,
  .detail_container .title span{  display: inline-block; vertical-align: middle;}
  .detail_container .title span{ color: #a7d7ff;font-size: 22px; padding:22px 0; width:calc(100% - 30px);}
  .detail_container .title a{ width:28px; height:28px;}
  .detail_container .title a img{ width: 100%; height:100%; display: block;}
  .detail_container .content{width:100%;height:83%;overflow: hidden;}
  .detail_container .content div{width:100%;height:93%;overflow-x: hidden;overflow-y: auto;margin-top: 15px;}
  .content p {width:100%;display: block;padding:20px 0;color:#cefeff;font-size:22px;font-weight: 800;overflow: hidden;text-overflow: ellipsis; white-space: nowrap; }
  .content a,.content a:hover{text-decoration: none;}
  .content a{width:95%; margin:0 auto;font-size: 20px;color:#cefeff;display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .content a span{display: block;float:left;width:auto;padding:6px 0;}
  .content a span:first-child{  max-width:150px;overflow: hidden;text-align:left;text-overflow: ellipsis;white-space: nowrap;}
  .content a span:nth-child(2){margin: 0 10px 0 5px;}
  .content a span:last-child{color: #a7d7ff;width:calc(100% - 170px);margin-left: 0;text-align:left;word-wrap:break-word;white-space:normal;}
  .detail_container .detail_btn{width:100%;text-align: right;color:#a7d7ff;font-size: 20px;margin-top: 0;}
  .detail_container .detail_btn a{display: inline-block;vertical-align: middle;width: auto;}
  .detail_container .detail_btn a span,.detail_container .detail_btn a img{display: inline-block;vertical-align: middle;width: auto;}
  .detail_container .detail_btn a img{width:30px;height: 30px; margin-right:8px;}
  .detail_container .detail_btn a:nth-child(even){margin-left: 20px;margin-right:20px;}
  .detail_container .detail_btn a .src,
  .detail_container .detail_btn a.active .hover,
  .detail_container .detail_btn a:hover .hover{display: inline-block;}
  .detail_container .detail_btn a.active .src,
  .detail_container .detail_btn a:hover .src,
  .detail_container .detail_btn a .hover{display: none;}
  .detail_container .detail_btn a:hover,
  .detail_container .detail_btn a.active{text-decoration: none;}
  .detail_container .detail_btn a.active span,
  .detail_container .detail_btn a:hover span{color:#2c61c3;}
</style>
<script>
  import backUrl from '../../../../static/img/common/search/back.png';
  import  resource from '../../../../static/img/common/search/resource_nearby.png';
  import  resource_hover from '../../../../static/img/common/search/resource_nearby_hover.png';
  import search from '../../../../static/img/common/search/search_nearby.png';
  import search_hover from '../../../../static/img/common/search/search_nearby_hover.png'
  import { removeWeiWenLayer } from '../../../../utils/mapOption'

  export default{
      props:['listDetail' ],
      data(){
          return{
            detail:{
                tit:{txt:'基本信息',url:backUrl},
                bottom:{
                    btn1:{txt:'附近资源',src:resource,hover:resource_hover},
                    btn2:{txt:'附近搜索',src:search,hover:search_hover}
                },
                alt:'暂无详细数据'
            },
            btn:'',
            list:{
              layerid:'',
              name:'',
              data:[],
              jd:'',
              wd:''
            }
          }
      },
    computed:{
          showSearch(){
              return this.$store.state.Search.ShowSearch;
          },
          showResource(){
            return this.$store.state.Resource.ShowResource;
          }
    },
    watch:{
      showResource:{
          handler:function(val,oldVal){
              if(val === 'off'){
                  if(this.btn === 'res'){
                    this.btn = '';
                  }
              }
          },
          deep:true
      },
      showSearch:{
        handler:function(val,oldVal){
            if(val === 'off'){
                this.btn='';
                this.$store.state.Search.ShowSearch = 'on';
            }
        },
        deep:true
      },
      listDetail : {
        handler:function(val,oldVal){
          console.log('3', val);
          this.list.layerid = val.layerid;
          this.list.name = val.name;
          this.list.data = [].concat(val.details);
        },
        deep:true
      }
    },
    methods:{
      backToHistoty:function(){
        /*返回到搜索结果页*/
        this.btn='';
        this.$emit('toHistoryList','on');
      },
      toNearbyResource:function(list){
        /*附近资源*/
        this.btn = 'res';
        this.$emit('toNearByResource',{jd:list.jd,wd:list.wd,layerid:list.layerid,center:list.name});
        this.$emit('toNearBySearch','');

        removeWeiWenLayer()
      },
      toNearbySearch:function(name){
         /*附近搜索*/
        this.btn = 'sea';
        this.$emit('toNearBySearch',name);
        this.$emit('toNearByResource','KO');
      }
    }
  }
  /*
  {   layerid:'',
      address:'广东省深圳市南山区深南大道3688号',
      name:'深圳大学',
      details:[
         {name:'医院地址',value:'深圳市福田区中康路27号'},
         {name:'街道',value:'福田区梅林街道'},
         {name:'医院等级',value:'深圳市福田区中康路27号'},
         {name:'剩余床位',value:'福田区梅林街道'},
         {name:'总科室数',value:'深圳市福田区中康路27号深圳市福田区中康路27号深圳市福田区中康路27号深圳市福田区中康路27号深圳市福田区中康路27号'},
         {name:'总床位数',value:'福田区梅林街道'},
         {name:'更新时间',value:'深圳市福田区中康路27号'}
      ]
  }
   */
</script>
