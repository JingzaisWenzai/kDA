<template>
  <div class="p2pDetailPop box">
    <div class="p2pDetailPop_content">{{this.title}}</div>
    <span class="close" @click="closeDetailPop"></span>
    <ul>
      <li class="p2pDetailPop_group" v-for="(item,index) in listsData" :key="index">
        <div v-if="listsData.length>1" class="p2pDetailPop_title">{{item.name}}</div>
        <ul>
          <li v-for="(item2,index2) in item.data" :key="index2">
            <span class="p2pDetailPop_name">{{item2.name+'：'}}</span><span class="p2pDetailPop_value">{{item2.value}}</span>
          </li>
        </ul>
      </li>
      <!--<li class="p2pDetailPop_group">-->
        <!--<div class="p2pDetailPop_title">平台基本信息</div>-->
        <!--<ul>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value" title="中电科新型智慧城市研究院有限公司">中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value">中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value">中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</li>-->
      <!--<li class="p2pDetailPop_group">-->
        <!--<div class="p2pDetailPop_title">平台基本信息</div>-->
        <!--<ul>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value" title="中电科新型智慧城市研究院有限公司">中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value">中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value">中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</li>-->
      <!--<li class="p2pDetailPop_group">-->
        <!--<div class="p2pDetailPop_title">平台基本信息</div>-->
        <!--<ul>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value" title="中电科新型智慧城市研究院有限公司">中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value">中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value">中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</li>-->
      <!--<li class="p2pDetailPop_group">-->
        <!--<div class="p2pDetailPop_title">平台基本信息</div>-->
        <!--<ul>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value" title="中电科新型智慧城市研究院有限公司">中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value">中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value">中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</li>-->
      <!--<li class="p2pDetailPop_group">-->
        <!--<div class="p2pDetailPop_title">平台基本信息</div>-->
        <!--<ul>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value" title="中电科新型智慧城市研究院有限公司">中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value">中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value">中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</li>-->
      <!--<li class="p2pDetailPop_group">-->
        <!--<div class="p2pDetailPop_title">平台基本信息</div>-->
        <!--<ul>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value" title="中电科新型智慧城市研究院有限公司">中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value">中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value">中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</li>-->
      <!--<li class="p2pDetailPop_group">-->
        <!--<div class="p2pDetailPop_title">平台基本信息</div>-->
        <!--<ul>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value" title="中电科新型智慧城市研究院有限公司">中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value">中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value">中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</li>-->
      <!--<li class="p2pDetailPop_group">-->
        <!--<div class="p2pDetailPop_title">平台基本信息</div>-->
        <!--<ul>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value" title="中电科新型智慧城市研究院有限公司">中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value">中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
          <!--<li>-->
            <!--<span class="p2pDetailPop_name">企业名称：</span><span class="p2pDetailPop_value">中电科新型智慧城市研究院有限公司</span>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</li>-->
    </ul>
  </div>
</template>

<script>
  import {p2p_plat,p2p_private,p2p_other} from '../../api/yxzx'

  export default {
    name: 'p2pDetailPop',
    props: [],
    components: {},
    data() {
      return {
        id:'',
        layerId:'',
        title:'',
        listsData:[]
      }
    },
    watch:{
      '$store.state.detailMessageId':{
        handler:function(val,oldVal){
          this.determineType()
        },
        deep:true
      }
    },
    mounted() {
      this.determineType()
    },
    methods: {
      determineType(){
        let $this = this
        this.id = this.$store.state.detailMessageId;
        this.layerId = this.$store.state.detailMessageNodeId;
        this.title = this.$store.state.detailMessageName;
        //p2p平台：p2p_plat，私募机构：p2p_private，其他涉众金融平台：p2p_other_plat
        if(this.layerId === 'p2p_plat'){
          p2p_plat({id:this.id}).then(function(data) {
            $this.listsData = data
            $this.$nextTick(function() {
              $this.initMsgLength()
            })
          })
        }else if(this.layerId === 'p2p_private'){
          p2p_private({id:this.id}).then(function(data) {
            $this.listsData = data
            $this.$nextTick(function() {
              $this.initMsgLength()
            })
          })

        }else if(this.layerId === 'p2p_other_plat'){
          p2p_other({id:this.id}).then(function(data) {
            $this.listsData = data
            $this.$nextTick(function() {
              $this.initMsgLength()
            })
          })
        }
      },
      initMsgLength(){
        console.log(123)
        let elementLi = document.getElementsByClassName('p2pDetailPop_group')
        for(let i = 0,j = elementLi.length;i<j;i+=1){
          let elementLi2 = elementLi[i].children[1].children
          for(let n = 0,m = elementLi2.length;n<m;n+=2){
            let nameWidth1 = elementLi2[n].children[0].offsetWidth
            let valueWidth1 = elementLi2[n].children[1].offsetWidth
            let nameWidth2 = 0
            let valueWidth2 = 0
            if(n+1<elementLi2.length){
              nameWidth2 = elementLi2[n+1].children[0].offsetWidth
              valueWidth2 = elementLi2[n+1].children[1].offsetWidth

              //同一行的两个li标签长度都超过350，那就要同时限制长度
              if(nameWidth1+valueWidth1>=350&&nameWidth2+valueWidth2>=350){
                elementLi2[n].children[1].style.width = (350-nameWidth1)+'px'
                elementLi2[n].children[1].setAttribute('title',elementLi2[n].children[1].innerText)
                elementLi2[n+1].children[1].style.width = (350-nameWidth2)+'px'
                elementLi2[n+1].children[1].setAttribute('title',elementLi2[n+1].children[1].innerText)
              }else if(nameWidth1+valueWidth1>=350&&nameWidth2+valueWidth2<350&&nameWidth1+valueWidth1+nameWidth2+valueWidth2<700){
                //同一行的两个li标签长度：第一个超过350，第二个不超过350，且加起来和不超过700，不用处理，刚好放的下
                elementLi2[n].style.width = nameWidth1+valueWidth1+'px'
                elementLi2[n+1].style.width = nameWidth2+valueWidth2+'px'
              }else if(nameWidth1+valueWidth1>=350&&nameWidth2+valueWidth2<350&&nameWidth1+valueWidth1+nameWidth2+valueWidth2>=700){
                //同一行的两个li标签长度：第一个超过350，第二个不超过350，且加起来和超过700，第一个要限制长度
                elementLi2[n].children[1].style.width = (700-nameWidth1-nameWidth2-valueWidth2)+'px'
                elementLi2[n].style.width = (700-nameWidth2-valueWidth2)+'px'
                elementLi2[n].children[1].setAttribute('title',elementLi2[n].children[1].innerText)
                elementLi2[n+1].style.width = nameWidth2+valueWidth2+'px'
              }else if(nameWidth1+valueWidth1>=350&&nameWidth2+valueWidth2<350&&nameWidth1+valueWidth1+nameWidth2+valueWidth2<700){
                //同一行的两个li标签长度：第二个超过350，第一个不超过350，且加起来和不超过700，不用处理，刚好放的下
                elementLi2[n].style.width = nameWidth1+valueWidth1+'px'
                elementLi2[n+1].style.width = nameWidth2+valueWidth2+'px'
              }else if(nameWidth1+valueWidth1<350&&nameWidth2+valueWidth2>=350&&nameWidth1+valueWidth1+nameWidth2+valueWidth2>=700){
                //同一行的两个li标签长度：第二个超过350，第一个不超过350，且加起来和超过700，第二个要限制长度
                elementLi2[n+1].children[1].style.width = (700-nameWidth2-nameWidth1-valueWidth1)+'px'
                elementLi2[n+1].style.paddingLeft = '10px'
                elementLi2[n+1].style.width = (700-nameWidth1-valueWidth1)+'px'
                elementLi2[n+1].children[1].setAttribute('title',elementLi2[n+1].children[1].innerText)
                elementLi2[n].style.width = nameWidth1+valueWidth1+'px'
              }
            }
          }
        }
        for(let i = 0,j= document.getElementsByClassName('p2pDetailPop_value').length;i<j;i+=1){
          document.getElementsByClassName('p2pDetailPop_value')[i].style.color = '#196db4'
        }
      },
      closeDetailPop(){
        this.$store.state.ShowJingjiDetail ='no'
      }
    },
    beforeDestroy() {

    }
  }
</script>

<style lang="scss" scoped>
.p2pDetailPop{
  background-color: rgba(2, 22, 35, 0.9);
  box-shadow: 0 0 5px #1c609d;
  border: 1px solid #1c609d;
  border-radius: 5px;
  padding: 10px 0 10px 10px;
  position: relative;
  margin: 0 auto;
  z-index: 9;
  width: 744px;
  color: #196db4;
  .p2pDetailPop_content{
    height: 30px;
    width: 90%;
    color: #43d3ff;
    padding-left: 30px;
    line-height: 30px;
    display: inline-block;
    background: url("../../static/img/aqyhPop/address.png") no-repeat left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .close {
    background: url("../../static/img/aqyhPop/close.png");
    width: 20px;
    height: 20px;
    margin-right: 10px;
    display: inline-block;
    float: right;
    cursor: pointer;
  }
  ul{
    padding: 0;
    margin: 0;
    width: 100%;
    max-height: 600px;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    ul{
      width: 100%;
      max-height: 100%;
    }
    li{
      list-style: none;
      display: inline-block;
      width: 350px;
      margin: 5px 0;
      .p2pDetailPop_name{
        /*width: 120px;*/
        display: inline-block;
        text-align: right;
        color: #43d3ff;
      }
      .p2pDetailPop_value{
        /*width: 230px;*/
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: absolute;
        color: transparent;
      }
    }
    .p2pDetailPop_group{
      width: 100%;
      border-bottom: 1px solid;
      .p2pDetailPop_title{
        color: #a2d0ec;
      }
    }
    .p2pDetailPop_group:last-child{
      border-bottom: none;
    }

  }
}
</style>
