/**
 * Created by wangxi on 2018/9/18.
 */
let win={};

win.addEvents = function(target,type,func){
  if(target.addEventListener) //非IE和IE9
    target.addEventListener(type,func,false);
  else if(target.attachEvent) //IE6 到IE8
    target.attachEvent('on'+type,func);
  else target["on"+type] = func; //IE5
};

win.removeEvents=function(target,type,func){
  if(target.removeEventListener)
    target.removeEventListener(type,func,false);
  else if(target.detachEvent)
    target.detachEvent('on'+type,func);
  else target["on" + type] =null;
};

win.stopBubble = function(e) {
//如果提供了事件对象，则这是一个非IE浏览器
  if ( e && e.stopPropagation )
  //因此它支持W3C的stopPropagation()方法
    e.stopPropagation();
  else
  //否则，我们需要使用IE的方式来取消事件冒泡
    window.event.cancelBubble = true;
}
//阻止浏览器的默认行为
win.stopDefault = function( e ) {
  //阻止默认浏览器动作(W3C)
  if ( e && e.preventDefault )
    e.preventDefault();
  //IE中阻止函数器默认动作的方式
  else
    window.event.returnValue = false;
  return false;
}

export {win}
