<template>
  <div class="f">
    <div class="f_b f_b_img">
      <div class="f_b_a">
        <div class = "f_b_a_left">
          <img src="../../../static/img/yjzx/eco_f_1.jpg"/>
          <span>风险概览</span>
        </div>
        <div class = "f_b_a_right">
          <p @click="subopen">
            <span>{{month}}</span>
            <img v-show="subNav!='open'" src="../../../static/img/common/alert/arrow_right.png"/>
            <img v-show="subNav==='open'" src="../../../static/img/common/alert/arrow_down.png"/>
          </p>

        </div>
        <div class = "f_b_a_right_sub" v-show="subNav==='open'">
          <p @click="clSelect"> <a href="javascript:void(0)">近一个月&nbsp;&nbsp;</a></p>
          <p @click="clSelect"> <a href="javascript:void(0)">近三个月&nbsp;&nbsp;</a></p>
          <p @click="clSelect"> <a href="javascript:void(0)">近六个月&nbsp;&nbsp;</a></p>
        </div>
      </div>
      <div class="f_b_b_1">
        <div class="f_b_b_left">
          <img src="../../../static/img/yjzx/yjzx_3.png"/>
          <span>&nbsp;&nbsp;{{title0.name}}：</span>
          <span>{{title0.value}}</span>
        </div>
        <div class="f_b_b_right">
          <img src="../../../static/img/yjzx/yjzx_3.png"/>
          <span>&nbsp;&nbsp;{{title1.name}}</span>
        </div>
      </div>
      <div class="f_b_all">
        <div class="f_b_b_a" id="jzfx">
          <!-- <script src="js/jzfx.js" type="text/javascript" language="javascript"></script>-->
        </div>
        <div class="f_b_b_a" id="jzfx2" >
          <!--   <script src="js/jzfx2.js" type="text/javascript" language="javascript"></script>-->
        </div>
      </div>
      <div class="f_b_c">
        <img src="../../../static/img/yjzx/yjzx_3.png"/>
        <span>&nbsp;&nbsp;{{title2.name}}</span>
      </div>
      <div class="f_b_d" id="jzfx3" >
      </div>
      <div class="f_b_c">
					 <span>
						 <img src="../../../static/img/yjzx/yjzx_3.png"/>
					 </span>
           <span>&nbsp;&nbsp;{{title3.name}}</span>
          <div class="f_b_c_2">
            <span>总数：</span>
            <span>{{title3.value}}</span>
          </div>
      </div>
      <div class="f_b_c_1">
        <span>风险类型</span>
      </div>
      <div class="f_b_d_bottom" id="jzfx4">
      </div>
    </div>

    <div class="g">
      <ul>
        <li>
          <div class="g_left">
          </div>
          <div class="g_right">
            极高
          </div>
        </li>
        <li>
          <div class="g_left">
          </div>
          <div class="g_right">
            高
          </div>
        </li>
        <li>
          <div class="g_left">
          </div>
          <div class="g_right">
            中
          </div>
        </li>
        <li>
          <div class="g_left">
          </div>
          <div class="g_right">
            低
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  import {ringechart} from '../../../static/js/OneMap/ringechart.js';
  import {barChart} from '../../../static/js/OneMap/barChart.js';
  import {lineChart} from '../../../static/js/OneMap/lineChart.js';
  import {getPopUp_cityRisk_right_one,getPopUp_cityRisk_right_two,getPopUp_cityRisk_right_three,getPopUp_cityRisk_right_four} from "../../../api/secapi.js"
  import bus from '../../../assets/js/main.js'
  export default {
    data() {
      return {
        flag :true,
        subNav:"close",
        month:"近一个月",
        echartData:[],
        title0:{
            name:'',
            value:''
        },
        title1:{
            name:''
        },
        title2:{
          name:''
        },
        title3:{
            name:'',
            value:''
        }
      }

    },
    watch:{
      streetOrCommunity: {
        handler:function(newName, oldName){
          if(newName){
            //console.log("街道社区名称：" + this.$store.state.addressStreet);  //街道名称
            this.initData1(newName);
          }
        },
        deep:true
      }
    },

    computed:{
      streetOrCommunity(){
          return this.$store.state.addressStreet;
      }
    },
    mounted() {
      let street = this.$store.state.addressStreet;
      this.initData1(street);
    },
    methods:{
      async initData1 (name) {
        let riskData1 = await getPopUp_cityRisk_right_one({street:name});
        let riskData2 = await getPopUp_cityRisk_right_two({street:name});
        let riskData3 = await getPopUp_cityRisk_right_three({street:name});
        let riskData4 = await getPopUp_cityRisk_right_four({street:name});
        riskData1 !=={} ? this.echartData.push(riskData1) :this.echartData.push({
          name:"区域风险总数",
          color:["#5bf385", "#007cee","#ff7300","#00c6ef"],
          data:[],
          value:''
        });

        riskData2 !=={} ? this.echartData.push(riskData2): this.echartData.push({
          name:"城区风险类型",
          color:["#5bf385", "#007cee","#ff7300","#00c6ef"],
          data:[],
          value:''
        });
        riskData3 !=={}? this.echartData.push(riskData3) : this.echartData.push({
          name:"街道风险分布",
          color:["#5bf385", "#007cee","#ff7300","#00c6ef"],
          xdata:[],
          ydata:[]
        });
        riskData4 !=={}? this.echartData.push(riskData4) : this.echartData.push({
          name:"三小场所概览",
          color:["#5bf385", "#007cee","#ff7300","#00c6ef"],
          data:[],
          value:''
        });
        this.creatEchart();
      },
      creatEchart(){
        this.title0.name =  this.echartData[0].name;
        this.title0.value =  this.echartData[0].value;
        this.title1.name =  this.echartData[1].name;
        this.title2.name =  this.echartData[2].name;
        this.title3.name =  this.echartData[3].name;
        this.title3.value = this.echartData[3].value;
        ringechart("jzfx",this.echartData[0]);
        ringechart("jzfx2",this.echartData[1]);
        barChart("jzfx3",this.echartData[2]);
        lineChart('jzfx4',this.echartData[3]);
      },
      subopen(){
          if(this.flag){
            this.flag = false;
            this.subNav = "open";
          }else {
            this.flag = true;
            this.subNav = "";
          }
      },
      clSelect(e){
        this.subNav = "";
        this.flag = true;
        this.month = e.target.innerText.trim();
      }
    }
  }
</script>
<style >
  .f{
    width: 720px;
    height: 1000px;
    text-align: left;
    margin: 0 50px;
    overflow: visible;
    position: absolute;
    top:60px;
    right:5px;
    /*z-index: 1001;*/
  }
.f_b{width:720px; height: 960px;  padding:20px 0; text-align: left; margin: 0 auto; overflow: hidden;}
.f_b_img{
  width: 720px;
  height: 1000px;
  /*background: linear-gradient(to left, #00141f, #021621, #152e48);*/
  background: linear-gradient(to left,#001521, rgba(13, 32, 42, .3));
}

  .f_b_a{
    width: 95%;
    margin:0 auto;
  }
  .f_b_a .f_b_a_left{
    margin :0  0 20px 10px;
    font-size: 30px;
    color: #43d3ff;
    display: inline-block;
    height: 50px;
    line-height: 50px;
  }
  .f_b_a .f_b_a_left span{
    left: 10px;
    bottom: 6px;
    position: relative;
    font-size: 28px;
  }
  .f_b_a .f_b_a_right{
    margin:0 50px 20px 10px;
    font-size: 20px;
    color: #0e3b61;
    display: inline-block;
    float: right;
  }
  .f_b_a .f_b_a_right p,.f_b_a .f_b_a_right_sub p{
    width: 145px;
    height: 40px;
    line-height: 45px;
    border-radius: 5px;
    font-size: 20px;
    padding-left: 25px;
    color: #ffffff;

  }
  .f_b_a .f_b_a_right p{
    background: url("../../../static/img/sec/selectmon.png") no-repeat center;
  }
  .f_b_all{display: block;width:95%;vertical-align: middle;text-align: center;}
  .f_b_b_a{width:300px; height:280px; display: inline-block; line-height:48px; text-align: left; margin: 0 30px 30px 0; overflow: hidden; /*background-color: #0a244d; border: #313d8a solid 1px;*/ border-radius:5px;}

  .f_b_c{
    color: #FFFFFF;
    display: block;
    font-size: 24px;
    width: 95%;
    margin:0 auto;
    position: relative;
  }
  .f_b_b_1{
    width: 95%;
    margin:0 auto;
    height: 50px;
    line-height: 50px;
  }
  .f_b_b_left,
  .f_b_b_right{
    display: inline-block;
    vertical-align: middle;
  }
  .f_b_b_left{
    color: #FFFFFF;
    margin-left: 10px;
    width: 360px;
    font-size: 24px;
  }
  .f_b_b_right{
    position: relative;
    color: #FFFFFF;
    margin-left: 0;
    font-size: 24px;
  }
  .f_b_c_1{
    color: #bfc5c9;
    display: block;
    width:95%;
    margin:0 auto;
    padding-left: 100px;
  }
  .f_b_c_2{
    color: #FFFFFF;
    font-size: 20px;
    position: absolute;
    top:50%;
    left:100%;
    margin-left: -150px;
    margin-top: -10px;
  }
  .f_b_d{
    display: inline-block;
    margin: 0 20px 10px 0;
    width: 100%;
    height:238px;
  }
  .f_b_d_bottom{
    display: inline-block;
    margin: 0 10px 10px 0;
    width: 100%;
    height:210px;
  }
.g{
  width: 322px;
  height: 45px;
  border: 1px solid #3e7db2;
  position: absolute;
  right: 1000px;
  bottom: 24px;
  border-radius: 5px;
}

.g ul{
  width: auto;
  height: 40px;
}
.g ul li .g_left{
  width: 13px;
  height: 13px;
  display: inline-block;
  margin-right: 5px;
}
  .g ul li:nth-child(1) .g_left{
    background: #cc0000;
  }
  .g ul li:nth-child(2) .g_left{
    background: #ff6600;
  }
  .g ul li:nth-child(3) .g_left{
    background: #ffd339;
  }
  .g ul li:nth-child(4) .g_left{
    background: #0099ff;
  }
 .g ul li .g_right{
   display: inline-block;
   height: 40px;
   line-height: 40px;
   font-size: 18px;
   color:#c5e2f2 ;
 }
 .g ul li{
    display: inline-block;
    margin-right: 28px;
}
.f_b_a_right_sub{
  position: absolute;
  top: 60px;
  right: 45px;
  width: 150px;
  height: 130px;
  border-radius: 5px;
  border: 1px solid #497DBD;
  z-index: 100;
}
.f_b_a_right_sub p a{
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
  .f_b_a_right_sub p a:hover{
    color: #497DBD;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: 0 0 0 5px hsla(26,20%,66%,.05) inset!important;
    background-image: -webkit-gradient(linear,left bottom,left top,color-stop(.44,#7a99d9),color-stop(.72,#497dbd),color-stop(.86,#1c3a94));
  }

</style>
