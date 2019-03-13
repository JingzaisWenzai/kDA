
export default {
  computed:{
    detailPopupType(){
      return this.$store.state.detailPopupType;
    }
  },
  watch:{
    detailPopupType:{
      handler:function(val,oldVal){
        if(val !==''){
          this.toGetThePopUpData(val);
        }
      },
      deep:true
    },
  },
  methods:{
    //根据val 判断到底是哪个详细弹框展示
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
      }else if(val ==='ShowHospital'){ //医院
        if(this.$store.state.ShowHospital !=='yes'){
          this.$store.state.ShowHospital ='yes';
        }
      }
      this.$store.state.detailPopupType = '';
    },
  }
}
