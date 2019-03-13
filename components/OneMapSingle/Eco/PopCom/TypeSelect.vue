<template>
  <div class="type-select-container">
    <ul id="select">
      <li>
        <div class="select-head"  @click ='OpenOptionsCard'>
          <span class="select-head-cont" v-text="checked"></span>
          <span class="select-icon">▼</span>
        </div>
        <ul class="option">
          <li class="option-item" @click="ToTheOption(item)" v-for="(item , index) in opts" :key="index">{{item}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  .type-select-container{
    position: relative;
    width:120px;
    height:30px;
    z-index: 3;
  }
  #select{
    display: block;
    margin:0;
    background: rgba(0,0,0,0);
    width: 100%;
    height: 100%;
    font-family: "微软雅黑";
    padding:0;
    font-size: 18px;
    color: white;
    border: 1px solid  #fff;
    border-radius: 6px;
    -webkit-border-radius:6px;
    -moz-border-radius:6px;
    list-style: none;
  }
  .select-head{
    overflow: hidden;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    line-height: 30px;
  }
  .select-head .select-head-cont{
    float: left;
  }
  .select-head .select-icon{
    float: right;
  }
  .option{
    text-indent: 10px;
    margin-top: 1px;
    width: 100%;
    color: #333;
    background: rgba(255,255,255,0.8);
    line-height: 25px;
    border: 1px #fff solid;
    display: none;
    list-style: none;
    padding: 0;
  }
  .option-item{
    padding:5px 0;
  }
  .option-item:nth-child(even){
    background-color: rgba(204,204,204,0.8);
  }
  .option-item:hover{
    background: rgba(31,150,242,0.8);
  }
</style>
<script>
  export default{
    data(){
      return{
        checked:'全部'
      }
    },
    computed:{
        selectHead(){
            return document.getElementsByClassName('select-head')[0];
        },
        selectHeadCont(){
            return document.getElementsByClassName('select-head-cont');
        },
        Option(){
            return document.getElementsByClassName('option')[0];
        },
        optionItem (){
          return document.getElementsByClassName('option-item');
        },
        opts(){
            let obj = ['选项1','选项2','选项3','选项4','选项5','选项6'];
            obj.unshift('全部');
            return obj;
        }
    },
    methods:{
      OpenOptionsCard(){
          this.Option.style.display ='block';
      },
      ToTheOption(n){
          this.checked = n;
        this.Option.style.display ='none';
      }
    }
  }
</script>
