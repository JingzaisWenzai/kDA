<template>
  <div>
    <ul class="pageMenu clearfix">
      <!--<li class="firstPage">首页</li>-->
      <li class="prevPage" @click="toPage('prev')" :class="pageNum === '1'?'disabled':''"> &lt; 上一页 </li>
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
  .pageMenu{    display: inline-block; position: relative; width: 100%;}
  .pageMenu li{padding:  6px;
    border: 1px solid #eaeaea;line-height: 1;
    text-align: center;
    color: #cccccc;
    font-size: 10px;
    background-color: #8d979e;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .pageMenu li.firstPage{}
  .pageMenu li.prevPage{  background-color: rgba(23,94,156,0.5); color:#cccccc;font-size: 10px;border: 1px solid #186aaf;}
  .pageMenu li.nextPage{background-color: #175e9c;color:#6ef5f9;font-size: 10px;border: 1px solid #186aaf;}
  .pageMenu li.lastPage{}
  .pageMenu li.disabled{ background-color: rgba(23,94,156,0.5); color:#cccccc;font-size: 10px;border: 1px solid #186aaf;   cursor: not-allowed;}
  .pageMenu li.active{ background-color: #175e9c;color:#6ef5f9;font-size: 10px;border: 1px solid #186aaf;color: white;}
  .pageMenu li.last{background: transparent;color:#666666; border:0;margin-left: 15px;margin-right: 15px;}
  .pageMenu li.last span,  .pageMenu li.last a{display: inline-block;vertical-align: middle;}
  .pageMenu .page-input{
    border: 1px solid #196db4;
    background-color: rgba(23,94,156,0.5);
    text-align: center;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 10px;
    padding: 2px 0;
    margin-left: 5px;
    margin-right: 5px; width: 50px;
  }
  .pageMenu .page-input .keuInput{
    padding: 0 5px;width: 100%;outline: none;display: block;
    text-align: center;
    font-size: 12px;background-color: transparent;
    border: 1px solid transparent;
    color: #6ef5f9;
  }
  .pageMenu .pageObj,.pageMenu li{
    display:inline-block;vertical-align:middle;
  }
  .pageMenu .pageObj p{
    color:#5fb6ff;
    font-size: 12px;
  }
  .pageMenu .pageObj li{
    border:1px solid transparent;
    background-color: transparent;
    color:#5fb6ff;
    font-size: 12px;
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
    color:#5fb6ff;
    width:auto;
  }
  .pageMenu .total-box .totalPage{
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #5fb6ff;
    font-size: 12px;
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
          toPageNow:'',  //点击目前跳转的页面
          pageNum:1,
          total:1,
        }
    },
    watch:{
        page:{
          handler:function(val,oldVal){
              if(val){
                this.pageNum = val.pageNum;
                this.total = val.total;
                this.toPageNow = 0;
              }
          },
          deep:true
        },
        total:{
            handler:function(val,oldVal){},
            deep:true
        },
        pageNum:{
          handler:function(val,oldVal){},
          deep:true
        }
    },
    methods:{
        toPage:function(arg){
            let now = Number(this.pageNum);
            let whole = Number(this.total);
            let toNow = Number(this.toPageNow);
            let res;
            if(arg ==='prev'){
              if(now > 1 ){
                res = now - 1;
                this.$emit('toPage', res);
              }
            }else if(arg === 'next'){
              if(now < whole ){
                res = now + 1 ;
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
    }
}
</script>
