<template>
  <div class="type-select-container">
    <ul id="select" tabindex="123" @blur="toOnblur"  @focus ='OpenOptionsCard'  style="outline:0;" hidefocus="true">
      <li>
        <div class="select-head" >
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
<script>
  export default{
    data(){
      return{
        checked:'小时数据'
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
            let obj = ['小时数据','日数据'];
            obj.unshift();
            return obj;
        }
    },
    methods:{
      OpenOptionsCard(){
          if(this.Option.style.display === 'block'){
            this.Option.style.display ='none';
          }else{
            this.Option.style.display ='block';
          }
      },
      ToTheOption(n){
          this.checked = n;
          this.$emit('typeSelect',n);
          this.Option.style.display ='none';
      },
      toOnblur(){
        this.Option.style.display ='none';
      }
    }
  }
</script>
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
    border: 1px solid  rgba(255,255,255,0.6);
    border-radius: 5px;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    list-style: none;
    cursor: pointer;
  }
  .select-head{
    overflow: hidden;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    line-height: 30px;
    font-size: 14px;
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
    color: #ffffff;
    background: rgba(6,42,66,1);
    line-height: 25px;
    border: 1px rgba(255,255,255,0.6) solid;
    display: none;
    list-style: none;
    padding: 0;
    font-size: 14px;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
  }
  .option-item{
    padding:5px 0;
  }
  .option-item:nth-child(even){
    background-color: rgba(10, 65, 102,1);
  }
  .option-item:hover{
    background: rgba(31,150,242,0.8);
  }
</style>
