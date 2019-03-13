// 基于准备好的dom，初始化echarts实例
import echarts from 'echarts';
function ringechart(id,edata) {

  let myChart = echarts.init(document.getElementById(id));
  // 指定图表的配置项和数据
  let data=edata.data ;
  let legendList=[];
  for(let i = 0;i<data.length; i++){
    let x = 0,y=0;
    if(i%2 === 0){
      x = "5%";
    }else {
      x = '55%';
    }
    if(i<2){
      y = "70%";
    }else if(i<4 && i>=2){
      y = "80%";
    }else{
      y = '90%';
    }
    legendList.push({
      orient: 'horizontal',
      bottom: "left" ,
      data: [data[i]] ||'',
      x:x,
      y:y,
      itemWidth:6,
      itemHeight:4,
      textStyle:{//图例文字的样式
        color:'#ccc',
        fontSize:12
      },
      formatter:  function(name){
        let target;
        target = data[i].value;
        let arr = [
          name, target
        ];
        return arr.join(': ')
      }
    });
  }

  let option = {
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      color:edata.color,
      legend: legendList ||{},
      series : [
          {
              name: edata.name ||'',
              type: 'pie',
              radius: ['30%', '50%'],
              center: ['55%', '42%'],
              data:data ||[],
              labelLine:{
                length:0,
                length2:5,
                smooth:true
              },
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);

}

export { //很关键
  ringechart
}
