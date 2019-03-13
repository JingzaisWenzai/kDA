/**
 * Created by wangxi on 2018/8/21.
 */
import axios from 'axios'

export default {

  /*搜索的获取地址*/
  getSearchList(state,value){
      state.search.list = [].concat(value);
  },
  getBottomRightPop(state,value){
      state.bottomRight = [].concat(value);
  },
  getBottomDotPopCurrent(state,value){
      state.bottomDotPop.current=value;
  },
  getBottomDotPopHistory(state,value){
      state.bottomDotPop.history.ochart=[].concat(value.ochart);
      state.bottomDotPop.history.otable=[].concat(value.otable);
  },








  /*建筑build*/
  getHistoryChartData(state,value){
    state.historyChart = [].concat(value);
  },
  getHistoryTableData(state,value){
    state.historyTable = [].concat(value);
  },
  getBuildDetailData(state,value){
    state.build.basicDetails = [].concat(value.data);
  },
  getBuildHouseData(state,value){
    state.build.houses.length  = 0;
    for(let key in value){
      try{
        let val = value[key];
        if((typeof val === 'string') && (val.constructor===String)){
          state.build.houses.push({
            name: key,
            data : val
          })
        }else{
          state.build.houses.push({
            name: key,
            data : [].concat(val)
          })
        }
      }catch(e){}
    }
    state.build.houseDetail = [].concat(state.build.houses[1].data[0].data[0].data);
  },
  getAirDetailData(state,value){
    state.popobj.length = 0;
    for(let key in value){
      try{
        let val = eval("value['" + key +"']");
        if((typeof val === 'string')&&val.constructor===String){
          state.popobj.push({
            name: key,
            data : val
          })
        }else{
          state.popobj.push({
            name: key,
            data : [].concat(val)
          })
        }
      }catch(e){}
    }
    //console.log( state.popobj );
  },
  getWaterDetailData(state,value){
    state.popobj.length = 0;
    for(let key in value){
      try{
        let val = eval("value['" + key +"']");
        if((typeof val === 'string')&&val.constructor===String){
          state.popobj.push({
            name: key,
            data : val
          })
        }else{
          state.popobj.push({
            name: key,
            data : [].concat(val)
          })
        }
      }catch(e){}
    }
    //console.log( state.popobj );
  }
}
