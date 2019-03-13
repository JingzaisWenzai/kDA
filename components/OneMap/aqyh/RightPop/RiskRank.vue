<template>
  <div class="f">
    <div class="f_b">
      <div class="f_b_a">
        <span>重点建筑隐患排行</span><i @click="toClose()"></i>
      </div>
      <div class="f_b_b">
       <!-- <div class="f_b_b_a">
          <ul>
            <li class="f_b_b_a_a">
              <a   :class="navFocus === msg.navTit[0]? 'active':''" @click="toChangeFocus(msg.navTit[0])"  title="msg.navTit[1]">{{msg.navTit[0]}}</a>
            </li>
            <li class="f_b_b_a_b">
              <a  :class="navFocus === msg.navTit[1]? 'active':''" @click="toChangeFocus(msg.navTit[1])"   title="msg.navTit[2]">{{msg.navTit[1]}}</a>
            </li>
          </ul>
        </div>-->
        <div class="f_b_b_b">
          <div class="f_b_b_b_a">
            <div class="sideBox">
              <div class="hd" :class="nowFocus === index ? 'on' :''" @click="toChangeList(index)"  v-for="(item,index) in navList" :key="index">
                <a class="hd_tit"><h3><span>{{index + 1}}</span><span>{{item.tit}}</span></h3></a>
                <div class="hd_content">
                  <ul>
                    <li v-for="(a,b) in item.data" :key="b">
                      <span :title="a.name">{{a.name}}</span> <span>:</span> <span :title="a.value">{{a.value}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  /*导航栏的特殊样式*/
  ::-webkit-scrollbar{width:16px;height:16px;}
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb{border-radius:999px;border:4px solid transparent;}
  ::-webkit-scrollbar-track{box-shadow:1px 1px 5px rgba(185,165,150,.2) inset;}
  ::-webkit-scrollbar-thumb{min-height:20px;background-clip:content-box;box-shadow: 0 0 0 5px rgba(25,109,180,0.5) inset;}
  ::-webkit-scrollbar-corner{/*background:transparent;*/}

  .f{width:100%; height:100%; text-align: left; margin: 0 auto; overflow: visible;}
  .f_a{width:17px; height:204px; text-align: left; margin: 269px auto;  float: left; display: inline;  overflow: visible;  z-index: 999999; position: absolute; left:-10px;}
  .f_b{width:100%; height:100%; text-align: left; margin: 0 auto; float: left; display: inline;  overflow: hidden; background-color: rgba(2,22,35,0.8); border: 1px solid #196db4; }
  .f_b_a{ position: relative;width:100%; height:50px; line-height: 50px; padding:0 30px; text-align: left; margin: 0 auto; overflow: hidden; background-color: rgba(6,74,142,0.6); }
  .f_b_a span{font-size: 22px; color: #ffffff;display: block;width:100%;}
  .f_b_a i{cursor: pointer;display: block; background:url('../../../../static/img/aqyhPop/close.png') no-repeat center;background-size:80% 80%;width: 20px;height:20px; position: absolute;-webkit-border-radius:20px; -moz-border-radius:20px; border-radius:20px; left:100%; top: 50%; margin-left: -30px; margin-top:-10px;}
  .f_b_b{width:95%; height:calc( 100% - 10px);  padding:10px 10px; text-align: left; margin: 0 auto; overflow: hidden;}
  .f_b_b_a{width:100%; height:48px;   text-align: left; margin: 0 auto; overflow: hidden; background-color: #0a244d; border: #313d8a solid 1px; border-radius:5px;}
  .f_b_b_a ul{ display: block; padding: 0;width:100%; height:100%;  text-align: left; margin: 0 auto; overflow: hidden;}
  .f_b_b_a ul li{width:50%; height:100%;  line-height:48px; text-align: center; margin: 0 auto;float: left; display: inline-block; vertical-align: middle; overflow: hidden;}
  .f_b_b_a ul li a{font-size: 18px; color: #ffffff; text-decoration: none; display: block;}
  .f_b_b_a ul li a:hover,.f_b_b_a ul li a.active{font-size: 20px; color: #aad9ff; text-decoration: none; display: block; background-color: #196db4;}
  .f_b_b_b{width:100%; height:calc( 100% - 50px); text-align: left; margin: 0 auto;  overflow: hidden;}
  .f_b_b_b_a{width:100%; height:100%; text-align: left; margin: 0 auto;  overflow: hidden;}


  .sideBox{width:100%; height:100%; margin: 15px auto; overflow-x: hidden;overflow-y: auto; }
  .sideBox .hd{width:100%;  height: auto;border: 1px solid #4775d0;background-color: rgba(17,51,120, 0.7); -webkit-border-radius:5px;  -moz-border-radius:5px;  border-radius:5px; margin-bottom: 15px;}
  .sideBox .hd .hd_tit{display: block; width:100%; height: 50px;line-height: 50px; background:url('../../../../static/img/aqyhPop/yxzx_11.png') 95% center no-repeat; background-size:16px 15px;cursor:pointer;}
  .sideBox .hd .hd_tit h3{width:90%;height:50px;margin:0 auto;font-weight: 500; font-size: 20px; color:#aad9ff;line-height: 50px;border-bottom:1px solid transparent;}
  .sideBox .on .hd_tit{width:100%; height: 50px; line-height: 50px;  background:url('../../../../static/img/aqyhPop/yxzx_10.png') 95% center no-repeat; }
  .sideBox .on .hd_tit h3{ color:#ffffff;border-bottom:1px solid #214485;}
  .sideBox .hd .hd_tit h3 span{display: inline-block;vertical-align: middle;color:#aad9ff;width:auto;}
  .sideBox .hd .hd_tit h3 span:nth-child(1){ width:30px; height: 30px; line-height: 30px; margin-right: 15px;  text-align: center; border-radius:20px; font-size: 18px; color: #ffffff; background-color: #175e9c;}
  .sideBox .hd .hd_content{display: none;width:100%; height:auto; max-height: 180px;overflow-x: hidden;overflow-y: auto;}
  .sideBox .on .hd_content{display: block;}
  .sideBox .on .hd_content ul{padding:0; list-style: none;display: block; width:90%;margin: 0 auto;}
  .sideBox .on .hd_content ul li{display: inline-block;vertical-align: middle; color:#aad9ff;font-size: 18px; width:48%;
    padding:8px 0;}
  .sideBox .on .hd_content ul li span{display: inline-block;;vertical-align: middle;overflow: hidden; text-overflow:ellipsis;white-space: nowrap;}
  .sideBox .on .hd_content ul li span:nth-child(1){max-width: 56%;}
  .sideBox .on .hd_content ul li span:nth-child(2){margin:0 10px 0 4px;}
  .sideBox .on .hd_content ul li span:nth-child(3){font-size: 18px; color: #ff9700;max-width:40%;}
</style>
<script>
  import {getKey_danger} from '../../../../api/secapi';
  export default{
      data(){
          return{
            msg:{
               navTit:['高风险建筑','高风险消防网络']
            },
            navFocus:'高风险建筑',
            navList:[],
            nowFocus:0
          }
      },

    watch:{
      navFocus:{
          handler:function (val, oldval) {
            let query ={
              tit:val
            };
            this.getData(query);
          },
          deep:true
      }
    },
    mounted:function(){
          let query ={
            tit:this.navFocus
          };
          this.getData(query);
    },
    methods:{
      toChangeList:function(asg){
        if(this.nowFocus === asg){
          this.nowFocus = '';
        }else{
          this.nowFocus = asg;
        }
      },
      toClose:function () {
        this.$store.state.ShowRiskRank ='no';
      },
      toChangeFocus:function(arg){
            this.navFocus = arg;
      },
      async getData(query){
          let data = await getKey_danger(query);
          //console.log(data);
          let odata = data;
          let res=[];
          for(let i=0;i<odata.length;i++){
              res.push({
                tit:odata[i].buildName,
                data:[
                  {name:'消防隐患评分',value:odata[i].dangerScore},
                  {name:'主要隐患原因',value:odata[i].dangerReason},
                  {name:'消防民警',value:odata[i].firePolice},
                  {name:'消防民警联系方式',value:odata[i].firePoliceTel}
                ]
              });
          }
          this.navList =[].concat(res);
      }
    }
  }
</script>
