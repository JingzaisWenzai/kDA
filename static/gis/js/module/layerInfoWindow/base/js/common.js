/**
 * Created by Administrator on 2018/9/25.
 */
/**
 * 获取指定的URL参数值
 * 参数：paramName URL参数
 * 调用方法:getUrlParam()
 * 返回值:params
 */
function getUrlParam() {
    var params = {};
    var name, value;
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("?")
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

    var arr = str.split("&"); //各个参数放到数组里

    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            params[name] = value;
        }
    }
    return params;
}


/**
 * 周边查询
 */


//
/**
 * 数据加载
 */
function loadData(callback) {
    var popupParams = getUrlParam();
    var htmlItem = ""

    var node = parent.module.common.layerControl.mapLayerXml.getLayerNodeById(params.nodeId);
    var getPopupDataUrl = node.url + "/summaryInfo";
    var options = {
        query: {
            id: params.featureId,
            type: parent.MapConfig.backgroundService.webType
        },
        responseType: 'json'
    };


    $.ajax({
        url: getPopupDataUrl,
        type: 'GET',
        data: options.query,
        dataType: "json", //指定服务器返回的数据类型
        async: false,
        success: function (data) {
            /*  //遍历字段
             for (var i = 0; i < data.value.length; i++) {
             var item = data.value[i];
             htmlItem += ""
             + "<li>"
             + "<div class='aqyh_s_b_left'>"
             + item[0] + "："
             + "</div>"
             + " <div class='aqyh_s_b_right'>"
             + item[1]
             + "</div>"
             + "</li>";

             }

             //是否有详细按钮
             if (data.hasDetailInfo) {

             }

             //html填充
             document.getElementById('ulDataList').innerHTML = htmlItem;*/

            //数据填充
            callback(data, popupParams);
        },
        error: function (error) {
            console.log(params.nodeId + "图层弹框加载错误，", error.message);
        }
    });
}


/** ------------------------------------------弹框样式------------------------------------------*/
function initPopupStyle() {
    //删除head
    var childHead = parentWindow.document.getElementsByClassName("esri-popup__header")[0];
//childHead.parentNode.removeChild(childHead);
    childHead.style.cssText = "display:none";

//删除button
    var childButton = parentWindow.document.getElementsByClassName("esri-popup__feature-buttons")[0];
//childButton.parentNode.removeChild(childButton);
    childButton.style.cssText = "display:none";

//去除margin
    var childContent = parentWindow.document.getElementsByClassName("esri-popup__content")[0];
    childContent.style.cssText = "margin-left: 0px;margin-right: 0px;margin-bottom: 0px;";


//设置三角背景色
    var childPointer = parentWindow.document.getElementsByClassName("esri-popup__pointer-direction")[0];
//childPointer.style.cssText = "background-color: #00a2d4";


    /*  //div背景透明
     var childContainer = parentWindow.document.getElementsByClassName("esri-popup__main-container")[0];
     childContainer.style.cssText = "background-color: rgba(0,0,0,0)";

     //边框阴影
     var childContainerParent = parentWindow.document.getElementsByClassName("esri-popup__position-container")[0];
     childContainerParent.style.cssText = "box-shadow:0 1px 4px rgba(0, 0, 0, 0)";*/
}
