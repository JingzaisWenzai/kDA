<template>
  <section>
    <div class="search-bar the-shadow box-common_dkg move-left"  v-show="showBarCenter ===''">
      <a class="inout"><input type="text" class="input_dkg"   @keyup.13 ='doSearch($event)' @focus='doFocus'  v-model="searchBox.val" :placeholder="searchBox.holder"/></a>
      <a class="clear" @click='doClear'></a>
      <a class="search" @click='doSearch'>搜索</a>
    </div>
    <div class="search-bar the-shadow box-common_dkg move-left search-nearby" v-show = "showBarCenter !==''">
      <p><span>在</span><span v-html="showBarCenter"></span><span>附近搜索</span><span>|</span></p>
      <a class="inout"><input class="input_dkg" type="text" @keyup.13 ='doSearch($event)' @focus='doFocus'  v-model="searchBox.val" :placeholder="searchBox.holder"/></a>
      <a class="clear" @click='doClear'></a>
      <a @click='doSearch' class="search">搜索</a>
    </div>
  </section>
</template>
<style scoped>
  @import "../../../../assets/css/center-search.css";

  .search-bar{
    /*position: absolute;
    left:675px;
    top:104px;*/
    width:100%;
    height:100%;
    max-width:530px;
    max-height:41px;
    text-align: right;
  }
  .search-bar a,.search-bar a:hover,
  .search-nearby p{
    display: inline-block;
    vertical-align: middle;
    margin:0;
    border:0;
  }
  .search-bar a:first-child{
    width: 70%;
    height:100%;
  }
  .search-bar a.inout input{
    display: block;
    width: 100%;
    height: 100%;
    font-size: 18px;
    padding-left:20px;
    color: #333333;
    border: 0;
    background-color: transparent;
    border:transparent;
  }
  .search-bar a.inout input:focus{
    border-color: transparent;
    outline: 0;
  }
  .search-bar a.clear{
    cursor: pointer;
    width:8.49%;
    height:36px;
    background:transparent url('../../../../static/img/common/search/cross.png') center no-repeat;
    background-size: 18px 18px;
    border:0;
  }
  .search-bar a.search{
    width:18.6%;
    height:100%;
    background-color: #196db4;
    -webkit-border-bottom-right-radius:8px;
    -moz-border-radius-bottomright:8px;
    border-bottom-right-radius:8px;
    -webkit-border-top-right-radius:8px;
    -moz-border-radius-topleft:8px;
    border-top-right-radius:8px;
    color:#ffffff;
    font-size: 18px;
    line-height: 41px;
    text-align: center;
  }
  .search-nearby p{width:auto;text-align: center;}
  .search-nearby p span{display: inline-block;vertical-align: middle;width:auto;color:#7a7a7a;font-size: 18px;}
  .search-nearby p span:nth-child(2){ width:80px;overflow: hidden;white-space:nowrap;text-overflow: ellipsis;}
  .search-nearby a.inout{ width: 30%; height:100%;}
  .search-nearby a.inout input{padding-left:5px;}

  /***************** 暗灰版样式******************/
  .box-common_dkg{
    background-color: rgba(0,162,255,0.1)!important;
    -webkit-border-radius: 8px!important;
    -moz-border-radius: 8px!important;
    border-radius: 8px!important;
    border:1px solid #036db9!important;
  }
  .search-bar a.clear{
    cursor: pointer;
    width:8.49%;
    height:36px;
    background:transparent url('../../../../static/img/common/search/cross_dkg.png') center no-repeat;
    background-size: 18px 18px;
    border:0;
  }
  .search-bar a.inout input.input_dkg{
    color:#43d3ff;
  }
</style>
<script>
  export default {
      props:['centerInfo','showCenter'],
      data(){
          return{
              searchBox:{
                val:'',
                holder:'请输入名称'
              },
              center:'',
              showBarCenter:''
          }
      },
      watch:{
        centerInfo : {
          handler:function(val,oldVal){
            //this.searchBox.val ='';  //清空搜索框
            this.$nextTick(function(){
              this.center = val.name;
            })
          },
          deep:true
        },
        showCenter:{
            handler:function(val,oldVal){
                if(val !== {}){
                    this.showBarCenter = val;
                }else{
                  this.showBarCenter ='';
                }
            },
            deep:true
        }
      },
      methods:{
        doSearch(event,arg){
            if(event){
               if(this.searchBox.val ===''){
                   alert('输入框不可为空！');
               }else{
                   /*将搜索的数据进行搜索 并将得到的结果进行展示   其中key是搜索字  center是围绕的中心地址*/
                  this.$emit('searchKey',{key:this.searchBox.val,center:this.centerInfo});
               }
            }
        },
        doFocus(event){
            if(event){
                this.searchBox.val ='';
            }
        },
        doClear:function(event){
          if(event){
             this.searchBox.val ='';  //清空搜索框
            this.$emit('closeAll','on');
          }
        }
      }
  }
</script>
