/**
 * 安全隐患弹框
 * */
import FenBu from '../components/OneMap/aqyh/PopBox/YinHuanFenBu.vue';
import YinHuan from '../components/OneMap/aqyh/PopBox/JianZhuYinHuan.vue';
import IotPopup from '../components/OneMap/aqyh/PopBox/IotPopup.vue';
import CityPopup from '../components/OneMap/aqyh/PopBox/CityPopup.vue';
import TriChrome from '../components/OneMap/aqyh/PopBox/YinHuanTrichrome.vue';
import ThreeS from '../components/OneMap/aqyh/PopBox/ThreeS.vue';
import p2pDetail from '../components/common/p2pDetailPop';
import hosptialPop from '../components/weiji/hospitalPop'
export default {
  components:{
    TriChrome,
    CityPopup,
    FenBu,
    YinHuan,
    ThreeS,
    IotPopup,
    p2pDetail,
    hosptialPop
  },
  watch:{
    showChrome:{/*隐患三色查看详情弹*/
      handler:function(val,oldVal){},
      deep:true
    },
    showCity:{  /*城市风险评估查看详情弹*/
      handler:function(val,oldVal){},
      deep:true
    },
    showQiYe:{
      handler:function(val,oldVal){},
      deep:true
    },
    showFenBu:{ /*隐患分布查看详情弹窗*/
      handler:function(val,oldVal){},
      deep:true
    },
    showYinHuan:{/*建筑隐患查看详情弹*/
      handler:function(val,oldVal){},
      deep:true
    },
    showThreeS:{/* 三小场所查看详情弹*/
      handler:function(val,oldVal){},
      deep:true
    },
    showEmergency:{/*  应急资源查看详情弹*/
      handler:function(val,oldVal){},
      deep:true
    },
    showIotPopup:{      /*物联网查看详情弹*/
      handler:function(val,oldVal){},
      deep:true
    },
    ShowJingjiDetail:{ /*宏观经济 经济 查看详情弹*/
      handler:function(val,oldVal){},
      deep:true
    },
    ShowHospital:{ /*医院 查看详情弹*/
      handler:function(val,oldVal){},
      deep:true
    },
    detailPopupType:{
      handler:function(val,oldVal){
        if(val !==''){
          this.toGetThePopUpData(val);
        }
      },
      deep:true
    }
  },
  computed:{
    showChrome(){
      return this.$store.state.ShowChrome;
    },
    showCity(){
      return this.$store.state.ShowCity;
    },
    showQiYe(){
      return this.$store.state.ShowQiYe;
    },
    showFenBu(){
      return this.$store.state.ShowFenBu;
    },
    showYinHuan(){
      return this.$store.state.ShowYinHuan;
    },
    showThreeS(){
      return this.$store.state.ShowThreeS;
    },
    showEmergency(){
      return this.$store.state.ShowEmergency;
    },
    showIotPopup(){
      return this.$store.state.ShowIotPopup;
    },
    detailPopupType(){
      return this.$store.state.detailPopupType;
    },
    ShowJingjiDetail(){
      return this.$store.state.ShowJingjiDetail
    },
    ShowHospital(){
      return this.$store.state.ShowHospital
    }
  },
  methods:{
    async toGetThePopUpData(val){

      for(let i = 0,j = document.getElementsByClassName('box').length;i<j;i+=1){
        document.getElementsByClassName('box')[i].style.transform = 'translateX(0px) translateY(0px) translateZ(0px)';
      }
      if(val ==='ShowCity'){
        if(this.$store.state.ShowCity !=='yes'){
          this.$store.state.ShowCity ='yes';
        }
      }else if(val ==='ShowFenBu'){ //隐患分布
        if(this.$store.state.ShowFenBu !=='yes'){
          this.$store.state.ShowFenBu ='yes';
        }
      }else if(val ==='ShowYinHuan'){ //隐患建筑
        if(this.$store.state.ShowYinHuan !=='yes'){
          this.$store.state.ShowYinHuan ='yes';
        }
      }else if(val ==='ShowIotPopup'){ //物联网
        if(this.$store.state.ShowIotPopup !=='yes'){
          this.$store.state.ShowIotPopup ='yes';
        }
      }else if(val ==='ShowChrome'){   //隐患三色
        if(this.$store.state.ShowChrome !=='yes'){
          this.$store.state.ShowChrome ='yes';
        }
      }else if(val ==='ShowQiYe'){ //纳管企业
        if(this.$store.state.ShowQiYe !=='yes'){
          this.$store.state.ShowQiYe ='yes';
        }
      }else if(val ==='ShowThreeS'){ //三小场所
        if(this.$store.state.ShowThreeS !=='yes'){
          this.$store.state.ShowThreeS ='yes';
        }
      }else if(val ==='ShowEmergency'){ //应急资源
        if(this.$store.state.ShowEmergency !=='yes'){
          this.$store.state.ShowEmergency ='yes';
        }
      }else if(val ==='ShowJingjiDetail'){ //应急资源
        if(this.$store.state.ShowJingjiDetail !=='yes'){
          this.$store.state.ShowJingjiDetail ='yes';
        }
      }else if(val ==='ShowHospital'){ //应急资源
        if(this.$store.state.ShowHospital !=='yes'){
          this.$store.state.ShowHospital ='yes';
        }
      }
      this.$store.state.detailPopupType = '';
    }
  }
}
