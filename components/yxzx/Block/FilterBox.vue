<template>
  <div class="filter_contain">
    <i class = 'close' @click="toClose"></i>
    <a v-for="(item , index) in filterBox" :key ='index'><span>{{item.txt}}：</span><span  @click="toSelect($event,item.txt,a.name)" v-for="(a,c) in item.data" :key="c">{{a.name}}</span></a>
  </div>
</template>
<script>

  import bus from '../../../assets/js/main'

  export default{
      data(){
          return{
            filterBox:[
              {txt:'隐患类型', data:[{name:'全部'},{name:'建筑边坡'},{name:'地址灾害'}]},
              {txt:'巡查点', data:[{name:'全部'},{name:'巡查点'},{name:'非巡查点'}]},
              {txt:'预测危险性', data:[{name:'全部'},{name:'中'},{name:'小'}]},
              {txt:'治理情况', data:[{name:'进行中'},{name:'已治理'}]}
            ],
            type0:'全部',
            type1:'全部',
            type2:'全部',
            type3:'进行中'
          }
      },
    props:['layerId'],
    methods:{
        toSelect:function(ev,txt,name){
            console.log(ev.currentTarget.parentNode.childNodes);
            let $ev = ev.currentTarget;
            let parent =ev.currentTarget.parentNode;
            let childs = ev.currentTarget.parentNode.childNodes;
            this.clearClass(childs);
            $ev.className ='active';
        },
        clearClass:function(arr){
            for(let i =0;i<arr.length;i++){
                if(arr[i].className!==''){
                    arr[i].className ='';
                }
            }
        },
        toClose:function(){
              bus.$emit('roadDiseaseFilter',{state:false});
        }
    }
  }
</script>
<style scoped>
  .filter_contain{
    text-align:left;
    width:100%;height:100%; border:1px solid #00d8ff;background-color: rgba(0,58,88,0.7);
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    padding: 15px 30px;
    position: relative;
  }
  .filter_contain .close{
    position: absolute;
    cursor:pointer;
    top:10px;
    left:100%;
    margin-left: -40px;
    width:24px;
    height:24px;
    background: url('../../../static/img/yxzx/close.png') no-repeat center;
    background-size: contain;
  }
  .filter_contain a{
    display: block;
    cursor:pointer;
    width:100%;
    color:#81fbff;
    font-size: 20px;
    border-bottom:1px solid #076081;
  }
  .filter_contain a:last-child{border-bottom: 0;}
  .filter_contain a span{
    display: inline-block;
    vertical-align: middle;
    padding:10px 20px 10px 0;
  }
  .filter_contain a span:first-child{
    font-weight: 600;
    min-width:130px;
    text-align: left;
    padding:10px 0;
  }
  .filter_contain a span.active,
  .filter_contain a span:hover{
    color:#ffc600;
  }

</style>
