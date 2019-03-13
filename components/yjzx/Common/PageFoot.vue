<!-- 表格分页组件 -->
<template>
  <div class="fPage" v-if="showPagination">
          <ul>
                <li class="sumData">
                      <span>共</span>
                      <span>{{pageNum}}</span>
                      <span>页</span>
                  </li>
                <li class="prevPage" :class="{disabled:!prevDisabled}">
                      <a @click="prevText">{{clickText.prevText}}</a>
                  </li>
                <li class="pageNum" v-for="(item,index) in pageSum" :key="index">
                      <a @click="itemclick(item)" :class="{active:item.active}">{{item.text}}</a>
                  </li>
                <li class="nextPage" :class="{disabled:!nextDisabled}">
                      <a @click="nextText">{{clickText.nextText}}</a>
                  </li>
                <!--<li class="showPageNum" v-if="showPageNum">
                      <select v-model="currentperPageNum" @change="changePerPageNum">
                            <option v-for="(item,index) in perPageNum"  :value="item" :key="index">
                                   <span>{{item}}</span>
                                     <span>条/页</span>
                          </option>
                        </select>
                  </li>-->
                <li class="selectPageNum" v-if="skipPage">
                      <span>跳至</span>
                      <input type="text" v-model="skipPageNum" @keyup.13="skipPageclick">
                      <span>页</span>
                  </li>
            </ul>
        </div>

</template>

<script>
  export default {
    props:{
      pageNum:{  //总页数
        type:Number,
        default:0
      },
      sumData:{  //总数据
        type:Number,
        default:0
      },
      clickText:{
        type:Object,
        default:function(){
          return {
            prevText:"上一页",
            nextText:"下一页"
          }
        }
      },
      perPageNum:{  //每页显示多少条
        type:Array,
        default:function(){
          return [100,200,300,400]
        }
      },
      options:{
        type:Object,
        default:function(){
          return {
            pageRows:'1',
          visibleCount:5,
            limitNum:true,  //是否显示每页多少条
            skipPage:true
        }
        }
      }
    },
    data:function(){
      return{
        pageSum:[],//页数数据
        currentPage: 1,
        prevDisabled: true, //上一页
        nextDisabled: false, //下一页
        skipPageNum:1,
        currentperPageNum:'' //每页显示多少条数据
    }
    },
    computed:{
      showPagination:function(){  //总页数大于1时才显示分页
        if(this.pageNum == 0 || this.pageNum == 1){
          return false;
        }else{
          return true;
        }
      },
      pageCount:function(){ //显示的页数
        if(this.pageNum >= this.options.visibleCount){
          return this.options.visibleCount;
        }else{
          return this.pageNum;
        }
      },
      showPageNum:function(){
        return this.options.limitNum;
      },
      skipPage:function(){
        return this.options.skipPage;
      }
    },
    methods:{
      initData:function(){  //页面初始化
        if(!this.pageCount) return false;
        this.pageSum = [];
        this.currentPage = 1;
        for(var i = 0; i < this.pageCount; i++){
          this.pageSum.push({
            text: i+1,
            active: false
          });
        }
        this.pageSum[0].active = true;
        this.prevDisabled = false;
        this.nextDisabled = true;
        this.skipPageNum = this. pageNum;
      },
      itemclick:function(item){ //点击页
        if(this.currentPage != item.text){
          this.currentPage = item.text;
          this.calcItem();
        }
      },
      prevText:function(){ //上一页
        if(this.prevDisabled){
          this.currentPage-=1;
          this.calcItem();
        }
      },
      nextText:function(){ //下一页
        if(this.nextDisabled){
          this.currentPage+=1;
          this.calcItem();
        }
      },
      calcItem:function(){
        if(this.pageCount < this.options.visibleCount){
          this.resetStyle();
          this.pageSum[this.currentPage-1].active = true
          //计算上一页，下一页的显示
          if(this.currentPage == 1){
            this.prevDisabled = false;
            this.nextDisabled = true;
          }else if(this.currentPage == this.pageCount){
            this.prevDisabled = true;
            this.nextDisabled = false;
          }else{
            this.prevDisabled = true;
            this.nextDisabled = true;
          }
        } else {
          var midNum = Math.ceil((this.pageCount)/2); //中间数
          if(this.pageCount % 2 == 0){  //如果是偶数中间数加1
            midNum += 1;
          }
          var midPage = this.pageNum - (this.pageCount - midNum);//最后一页在中间的页码
          if(this.currentPage <= midPage){  //当前页在最后一页前
            this.resetStyle();
            if(this.currentPage <= midNum){ //当前点击的页数小于当前的中间页
              this.pageSum[this.currentPage-1].active = true;
              var starNum = 0;
              for(var i = 0; i < this.pageCount; i++){
                this.pageSum[i].text = starNum + i + 1;
              }
            } else {  //当前点击的页数大于当前的中间页
              var starNum = this.currentPage - midNum;
              for(var i = 0;i < this.pageCount; i++){
                this.pageSum[i].text = starNum + i + 1;
              }
              this.pageSum[midNum-1].active = true;
            }
            //计算上一页的显示,下一页始终显示
            if(this.currentPage == 1){
              this.prevDisabled = false;
            }else {
              this.prevDisabled = true;
            }
            this.nextDisabled = true;
          } else {  //如果当前到最后页
            var starNum = this.pageNum - this.pageCount +1;
            for(var i = 0;i < this.pageCount; i++){
              this.pageSum[i].text = starNum + i;
            }
            this.resetStyle();
            var index = this.pageNum - this.currentPage;
            this.pageSum[this.pageCount - index - 1].active = true;
            //计算下一页的显示,上一页始终显示
            if(this.currentPage == this.pageNum){
              this.nextDisabled = false;
            }else {
              this.nextDisabled = true;
            }
            this.prevDisabled = true;
          }
        }
      },
      resetStyle:function(){
        for(var i = 0; i < this.pageCount; i++){
          this.pageSum[i].active = false;
        }
      },
      skipPageclick:function(){
        if(this.skipPageNum>=1 && this.skipPageNum<= this.pageNum){
          this.currentPage = parseInt(this.skipPageNum);
        }else if(this.skipPageNum>this.pageNum){
          this.currentPage = parseInt(this.pageNum);
        }else{
          this.currentPage = 1;
        }
        this.calcItem();
        this.skipPageNum ='';
      },
      changePerPageNum:function(){
        console.log(this.currentperPageNum);
      }
    },
    created:function(){
      this.initData();
    }

  }
</script>

<style>
  ul,li,span,input,select{
    margin:0;
    padding:0;
  }
  ul{
    list-style: none;
  }
  li{
    float:left;
    margin-right:10px;
    font-size:14px;
  }
  a{
    text-decoration: none;
    color:black;
  }
  .fPage{
    margin:10px 10px;
  }
  .fPage ul>li>a{
    border:1px solid #C3C9D3;
    text-align:center;
    color: #656565;
    padding: 6px 12px;
  }
  .pageNum .active{
    background-color: #1B6FEC;
    color:white;
  }
  .fPage .showPageNum>select{
    padding: 6px 10px;
    margin-top:-6px;
  }
  .fPage .selectPageNum{
    margin-top:-5px;
  }
  .fPage .selectPageNum>input{
    width:20px;
    padding: 5px 8px;
  }
  .disabled{
    outline:0 none;
    cursor:default;
    opacity: 0.4;
    /*filer:alpha(opacity=40);*/
    pointer-events: none;
  }
</style>
