  <template>
  <div class="dot_container">
    <p class="title" v-if="dotType ==='air'">{{build.name}}</p>
    <p class="title" v-if="dotType ==='water'">{{river.name}}</p>
    <div class="to-left"  v-if="myType === 'left-chart'">
      <div class="left">
        <div class="echart">
            <component :is="piedata.chartType" :theData ='piedata'></component>
        </div>
        <div class="echart-related">
          <span>{{ocomment.name}}</span><span :class="ocomment.cs">{{ocomment.value}}</span>
        </div>
      </div>
      <div class="right">
        <p v-for="(item , index) in build.data" :key="index"><span>{{item.name}}</span><span>:</span><span>{{item.value}}</span></p>
      </div>
    </div>
    <div class='to-right' v-else-if="myType === 'right-pic'">
      <div class="left">
        <p v-for="(item , index) in river.data" :key="index"><span>{{item.name}}</span><span>:</span><span>{{item.value}}</span></p>
      </div>
      <div class="right">
        <img :src="river.url">
      </div>
    </div>
    <div class="details" @click = 'openDetail'>查看详情</div>
  </div>
</template>
<style scoped>
  .dot_container{
    width:380px;
    height:300px;
    background: url('../../../static/img/yxzx/pop_bg_380.png') center no-repeat;
    background-size: contain;
  }
  .dot_container .title{
    font-size:24px;
    color:#00e4ff;
    width:100%;
    text-align: center;
    line-height: 70px;
    margin:0;
  }
  .dot_container .to-left,
  .dot_container .to-right,
  .dot_container .details{
    clear: both;
    width:100%;
  }
  .dot_container .to-left .left,
  .dot_container .to-left .right,
  .dot_container .to-right .left,
  .dot_container .to-right .right{
    float: left;
    min-height: 153px;
  }
  .dot_container .to-left .left,
  .dot_container .to-right .right{
    width:35%;
  }
  .dot_container .to-left .right,
  .dot_container .to-right .left{
    width:60%;
  }
  .dot_container .to-left .left,
  .dot_container .to-left .right{
    margin-left:2%;
  }
  .dot_container .to-right .right,
  .dot_container .to-right .left{
    margin-right:2%;
  }
  .dot_container .to-left .right p,
  .dot_container .to-right .left p{
    width:90%;
    padding:0;
    margin:0 5%;
    color:#fff;
    font-size:18px;
    line-height: 34px;
  }
  .dot_container .to-left .right p span,
  .dot_container .to-right .left p span{
    display: inline-block;
    vertical-align: middle;
    width:auto;
  }
  .dot_container .to-left .right p span:nth-child(2),
  .dot_container .to-right .left p span:nth-child(2){
    margin: 0 8px;
  }
  .to-left .echart-related{
    color: #fff;
    font-size:16px;
    text-align: center;
  }
  .to-left .echart-related span{
    display: inline-block;
    vertical-align: middle;
    width:auto;
    padding:0px 10px;
  }
  .to-left .echart-related span.excellent,
  .to-left .echart-related span.good,
  .to-left .echart-related span.mild,
  .to-left .echart-related span.middle,
  .to-left .echart-related span.serious,
  .to-left .echart-related span.grave{
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    color: #fff;
    text-align: center;
    padding:0px 20px;
  }
  .to-left .echart-related span.excellent{
    background-color: #6bcd07;
  }
  .to-left .echart-related span.good{
    background-color: #fbd029;
  }
  .to-left .echart-related span.mild{
    background-color: #fe8800;
  }
  .to-left .echart-related span.middle{
    background-color: #fe0000;
  }
  .to-left .echart-related span.serious{
    background-color: #970454;
  }
  .to-left .echart-related span.grave{
    background-color: #62001e;
  }
  .dot_container .details{
    color: #009cff;
    font-size: 18px;
    text-align: right;
    margin: 0;
    padding: 0;
    width: 90%;
  }
</style>
<script>
  import PieChart from '../Echarts/PieChart.vue'


  export default{
      props:['myType','dotType'],
      computed:{
        piekey(){
          let b;
          b = parseInt(Math.random()*10);
          return b;
        },
        piedata(){
            let a;
            a = this.build.rate;
            a.index= this.piekey;
            a.chartType = 'PieChart';
            a.col = this.getComment(a.value).color;
            return a;
        },
        ocomment(){
            let a,comment;
            a= this.build.rate;
            comment = this.getComment(a.value);
            return comment;
        }
      },
      methods:{
        getComment:function(com){
            let res,num,cls,col;
            num = Number(com);
            if(num<=50){
                res='优';
                cls='excellent';
                col = '#6bcd07';
            }else if(50<num && num<=100){
              res='良';
              cls='good';
              col = '#fbd029';
            }else if(100<num && num<=150){
              res='轻度污染';
              cls='mild';
              col='#fe8800';
            }else if(100<num && num<=150){
              res='中度污染';
              cls='middle';
              col='#fe0000';
            }else if(com ==='中度污染'){
              res='重度污染';
              cls='serious';
              col = '#970454';
            }else{
              res='严重污染';
              cls='grave';
              col='#62001e';
            }
            return {
                name:'等级',
                value:res,
                cs:cls,
                color:col
            }
        },
        openDetail:function(){
            this.$emit('toOpenDotDetail',this.dotType);
        }
      },
      data(){
          return{
            build:{
                name:'福田环境监测大楼固定站',
                data:[
                  {name:'空气质量指数',value:'41'},
                  {name:'首要污染物',value:'PM10'},
                  {name:'空气质量指数级别',value:'一级'},
                  {name:'空气质量指数类别',value:'优'}
                ],
                rate:{name:'空气质量指数',value:'41'}
            },
            river:{
                name:'凤塘河口',
                data:[
                  {name:'监测水质',value:'劣V类'},
                  {name:'水质要求',value:'IV类'},
                  {name:'总磷（mg/L）',value:'0.25'},
                  {name:'溶解氧（mg/L）',value:'3.5'},
                  {name:'氨氮（mg/L）',value: '1.2'}
                ],
                url:'http://10.190.55.58:8081/web/yxzxVSyjzx/img/images/test_03.png'
            }
          }
      },
      components:{
        PieChart
      }
  }

  /**
   * 空气污染指数的取值范围定为0～500，
   * 其中0～50、51～100、101～200、201～300和大于300，
   * 分别对应国家空气质量标准中日均值的
   * I级、II级、III级、IV级和V级标准的污染物浓度限定数值，
   * 在实际应用中，又把III级和IV级分为III（1）级、III（2）级和IV（1） 级、IV（2）级。
   * I级，空气质量评估为优，对人体健康无影响；
   * II级，空气质量评估为良，对人体健康无显著影响；
   * III级，为轻度污染，健康人群出现刺 激症状；
   * IV级，中度污染，健康人群普遍出现刺激症状；
   * V级，严重污染，健康人群出现严重刺激症状。
   * **/
</script>
