/**
 * Created by wangxi on 2018/9/21.
 */

import axios from 'axios'

axios.defaults.baseURL = '/web/OneMap/';
/*let baseUrl={
    searchList:'/data/monitoring-station.json'
};*/
let urlBox ={
    searchFor:'', /*根据搜索关键字得到list*/
    BottomRightPop:'',    /*点击底部导航栏子导航栏，出来右侧弹窗*/
    BottomDotPopCurent:'',  /*点击底部导航栏子导航栏，点击落点出来弹窗  当前详情*/
    BottomDotPopHisitory:''
};

export default {
  getInfoList(context,query){
    return new Promise(resolve =>{
      axios.get(url.searchFor,query)
        .then((res)=>{
          res.status === 200 ? resolve(res) : reject('错误:', res.status);
        }).catch((err)=>{console.log('获取搜索结果出错的原因是'+err);});
    }).then((value)=>{
      context.commit('getSearchList',value.data);
    }).catch((error)=>{
      console.log('fail: ',error);
    })
  },


  getSearchList(context,query){
    return new Promise(resolve =>{
      axios.get(url.searchFor,query)
           .then((res)=>{
             res.status === 200 ? resolve(res) : reject('错误:', res.status);
           }).catch((err)=>{console.log('获取搜索结果出错的原因是'+err);});
    }).then((value)=>{
      context.commit('getSearchList',value.data);
    }).catch((error)=>{
      console.log('fail: ',error);
    })
  },
  getBottomRightPop(context,query){     /*query为参数json*/
    return new Promise(resolve =>{
      axios.get(url.BottomRightPop,query)
        .then((res)=>{
          res.status === 200 ? resolve(res) : reject('错误:', res.status);
        }).catch((err)=>{console.log('获取搜索结果出错的原因是'+err);});
    }).then((value)=>{
      context.commit('getBottomRightPop',value.data);
    }).catch((error)=>{
      console.log('fail: ',error);
    })
  },
  getBottomDotPopCurrent(context,query){
    return new Promise(resolve =>{
      axios.get(url.BottomDotPopCurent,query)
        .then((res)=>{
          res.status === 200 ? resolve(res) : reject('错误:', res.status);
        }).catch((err)=>{console.log('获取搜索结果出错的原因是'+err);});
    }).then((value)=>{
      context.commit('getBottomDotPopCurrent',value.data);
    }).catch((error)=>{
      console.log('fail: ',error);
    })
  },
  getBottomDotPopHistory(context,query){
    return new Promise(resolve =>{
      axios.get(url.BottomDotPopHisitory,query)
        .then((res)=>{
          res.status === 200 ? resolve(res) : reject('错误:', res.status);
        }).catch((err)=>{console.log('获取搜索结果出错的原因是'+err);});
    }).then((value)=>{
      context.commit('getBottomDotPopHistory',value.data);
    }).catch((error)=>{
      console.log('fail: ',error);
    })
  },
  /* getHistoryChartData(context){
   return new Promise(resolve =>{
   axios.get('/data/monitoring-station.json')
   .then((res)=>{
   res.status === 200 ? resolve(res) : reject('错误:', res.status);
   }).catch((err)=>{
   console.log(err);
   });
   }).then((value)=>{
   context.commit('getHistoryChartData',value.data);
   //context.state.historyChart = [].concat(value.data);
   console.log(context.state.historyChart);
   }).catch((error)=>{
   console.log('fail: ',error);
   })
   }*/
  getHistoryChartData(context){

    return new Promise(resolve =>{
      axios.get('../../../web/data/monitoring-station.json')
        .then((res)=>{
          res.status === 200 ? resolve(res) : reject('错误:', res.status);
        }).catch((err)=>{
        console.log(err);
      });
    }).then((value)=>{
      context.commit('getHistoryChartData',value.data);
    }).catch((error)=>{
      console.log('fail: ',error);
    })
  },
  getHistoryTableData(context){
    return new Promise(resolve =>{
      let {data} = axios.get('../../../web/data/estuary.json')
        .then((res)=>{
          res.status === 200 ? resolve(res) : reject('错误:', res.status);
        }).catch((err)=>{
          console.log(err);
        });
    }).then((value) =>{
      context.commit('getHistoryTableData',value.data);
    }).catch((error)=>{
      console.log('fail',error);
    })
  },
  getBuildDetailData(context){
    return new Promise(resolve =>{
      let {data} = axios.get('/data/houseBasicDetails.json')
        .then((res)=>{
          res.status === 200 ? resolve(res) : reject('错误:', res.status);
        }).catch((err)=>{
          console.log(err);
        });
    }).then((value) =>{
      context.commit('getBuildDetailData',value.data);
    }).catch((error)=>{
      console.log('fail',error);
    })
  },
  getBuildHouseData(context){
    return new Promise(resolve =>{
      /*http://10.190.55.58:8081/blk_house/blk/house?buildid=4403040020080200012*/
      let {data} = axios.get('/data/houseDetails.json')
        .then((res)=>{
          res.status === 200 ? resolve(res) : reject('错误:', res.status);
        }).catch((err)=>{
          console.log(err);
        });
    }).then((value) =>{
      context.commit('getBuildHouseData',value.data);
    }).catch((error)=>{
      console.log('fail',error);
    })
  },
  getAirDetailData(context){
    return new Promise(resolve =>{
      let {data} = axios.get('/data/station-detail.json')
        .then((res)=>{
          res.status === 200 ? resolve(res) : reject('错误:', res.status);
        }).catch((err)=>{
          console.log(err);
        });
    }).then((value) =>{
      console.log(value.data);
      context.commit('getAirDetailData',value.data);
    }).catch((error)=>{
      console.log('fail',error);
    })
  },
  getWaterDetailData(context){
    return new Promise(resolve =>{
      let {data} = axios.get('../../../web/data/estuary-detail.json')
        .then((res)=>{
          res.status === 200 ? resolve(res) : reject('错误:', res.status);
        }).catch((err)=>{
          console.log(err);
        });
    }).then((value) =>{
      console.log(value.data);
      context.commit('getWaterDetailData',value.data);
    }).catch((error)=>{
      console.log('fail',error);
    })
  }
}
