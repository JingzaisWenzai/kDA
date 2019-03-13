<template>
  <div>
    <ul class="pageMenu clearfix">
      <!--<li class="firstPage">首页</li>-->
      <li class="prevPage" @click="toPage('prev')" :class="pageNum === 1?'disabled':''"> &lt; 上一页 </li>
      <div class="pageObj clearfix">
        <p class="pageNum"><span>第</span><span>{{pageNum}}</span><span>页</span></p>
      </div>
      <li class="nextPage" @click="toPage('next')" :class="pageNum === total?'disabled':''"> 下一页 &gt; </li>
      <!-- <li class="lastPage">尾页</li>-->
      <li class="last" style="font-size: 14px;">
        <span>跳转至</span>
        <a class="page-input"><input value="1" class="keuInput" type="number" v-model="toPageNow" @keyup.13="toPage()"></a>
        <span>页</span>
      </li>
      <li class="total-box">
        <span>共</span><span class="totalPage">{{total}}</span><span>页</span>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  ul,li{margin: 0;padding: 0;list-style: none;}
  .pageMenu li::selection{background:transparent;}
  .clearfix{zoom:1;}
  .clearfix:after{content:"";display: block;clear: both;}
  .pageBox{width:800px;background: #eee;border:1px solid #ebebeb;padding: 10px;margin: 0 auto;}
  .pageDiv{width: 98.75%;background: #fff;padding-left: 1.25%;margin-bottom: 10px;}
  .pageDiv li{margin-bottom: 10px;border:1px solid #dbdbdb;width: 21.5%;margin-right: 1.25%;margin-top: 10px;padding: 1%;text-align: center;}
  .hide{display: none;}
  .notContent{padding: 15px 0;text-align: center;}
  .pageMenu{    display: inline-block; position: relative; width: 100%; color:#fff;}
  .pageMenu li{padding: 6px;
    border: 1px solid transparent;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    background-color: #196db4;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .pageMenu li.firstPage{}
  .pageMenu li.prevPage{cursor: pointer;}
  .pageMenu li.nextPage{cursor: pointer;}
  .pageMenu li.lastPage{}
  .pageMenu li.disabled{  background-color: rgba(25,109,180,0.5); color: rgba(255,255,255,0.5);   cursor: not-allowed;}
  .pageMenu li.active{ border: solid thin #0099FF;background-color: #0099FF;color: white;}
  .pageMenu li.last{cursor: pointer;background: transparent;color:rgba(255,255,255,0.8); border:0;margin-left: 15px;margin-right: 15px;}
  .pageMenu li.last span,  .pageMenu li.last a{display: inline-block;vertical-align: middle;}
  .pageMenu .page-input{
    border: 1px solid transparent;
    background-color: rgba(25,109,180,0.5);
    text-align: center;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 14px;
    padding: 6px 0;
    margin-left: 5px;
    margin-right: 5px; width: 50px;
  }
  .pageMenu .page-input .keuInput{
    padding: 0 5px;width: 100%;outline: none;display: block;
    text-align: center;
    font-size: 14px;background-color: transparent;
    border: 1px solid transparent;
    color: #ffffff;
  }
  .pageMenu .pageObj,.pageMenu li{
    display:inline-block;vertical-align:middle;
  }
  .pageMenu .pageObj li{
    border:1px solid transparent;
    background-color: transparent;
    color:#666666;
    font-size: 14px;
  }

  .pageMenu .total-box{
    border: 1px solid transparent;
    background-color: transparent;
    padding: 0;
    width: auto;
  }
  .pageMenu .total-box span{
    display: inline-block;
    vertical-align: middle;
    color:rgba(255,255,255,0.8);
    width:auto;
  }
  .pageMenu .total-box .totalPage{
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(255,255,255,0.9);
    font-size: 14px;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 6px 0;
  }
</style>
<script>
export default{
    props:['page'],
    data(){
        return {
          toPageNow:1,  //点击目前跳转的页面
          pageNum:1,
          total:50,
        }
    },
    watch:{
        page:{
          handler:function(val,oldVal){
            this.pageNum = val.pageNum;
            this.total = val.total;
            this.toPageNow ='';
          },
          deep:true
        }
    },
    methods:{
        toPage:function(arg){
            let now =  this.pageNum;
            let whole = this.total ;
            let toNow = this.toPageNow ;
            let res;
            if(arg ==='prev'){
              if(now > 1 ){
                res = now - 1;
                this.$emit('toPage', res);
              }
            }else if(arg === 'next'){
              if(now < whole ){
                res = now + 1;
                this.$emit('toPage', res);
              }
            }else{
              /*跳转到当前条件下的结果的第几页*/
                if(now !== toNow && toNow > 0 && toNow <= whole){
                    res = toNow ;  //将数字统一为字符串
                    this.$emit('toPage', res );
                }else if(toNow <= 0 || toNow > whole){
                  alert('请输入正常的数值');
                }else{
                  alert('你正在重复请求');
                }
            }
        }
       /* toTrim:function(x){
            return  x.replace(/^\s+|\s+$/gm,'');
        }*/
    }
}
</script>
