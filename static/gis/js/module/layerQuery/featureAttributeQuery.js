/**
 *属性查询
 */
//UMD代码
// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.module = ( root.module) ? root.module : {};
        root.module.layerQuery = ( root.module.layerQuery) ? root.module.layerQuery : {};

        root.module.layerQuery.featureAttributeQuery = factory();
    }
}(this, function () {

    /**
     *arcigs图层属性分页查询，最多1000条
     */
    var queryFeatureLayerByPage = function queryFeatureLayerByPage(node, count, pageIndex, callback) {

        console.log("test")

        var QueryTask = window.require("esri/tasks/QueryTask");
        var Query = window.require("esri/tasks/support/Query");

        var layerUrl = node.url; // Represents the REST endpoint for a layer of cities.
        var queryTask = new QueryTask(layerUrl);

        //查询所有IDs
        queryTask.executeForIds({  // autocasts as new Query()
            where: "1=1"
        }).then(function (results) {
            //console.log(results);  // an array of object IDs

            //分页查询
            var query = new Query();
            //query.returnGeometry = true;
            query.outFields = ["*"];
            query.where = "1=1";  // Return all cities with a population greater than 1 million
            query.objectIds = results.slice(count * (pageIndex - 1), (pageIndex) * count);

            queryTask.execute(query).then(function (results) {
                //图层查询结果
                //console.log(results);
                callback(results.features);
            });
        });

    }

    var queryFeatureLayerCount = function queryFeatureLayerCount(node, callback) {
        var QueryTask = window.require("esri/tasks/QueryTask");
        var Query = window.require("esri/tasks/support/Query");

        var layerUrl = node.url; // Represents the REST endpoint for a layer of cities.
        var queryTask = new QueryTask(layerUrl);

        //查询所有IDs
        queryTask.executeForIds({  // autocasts as new Query()
            where: "1=1"
        }).then(function (results) {
            //console.log(results);  // an array of object IDs
            callback(results.length);
        });
    }


    /**
     *arcigs图层属性SQL查询要素
     */
    var queryFeatureLayerBySql = function queryFeatureLayerBySql(node, sql, callback) {

        console.log("test")

        var QueryTask = window.require("esri/tasks/QueryTask");
        var Query = window.require("esri/tasks/support/Query");

        var layerUrl = node.url; // Represents the REST endpoint for a layer of cities.
        var queryTask = new QueryTask(layerUrl);

        //分页查询
        var query = new Query();
        query.returnGeometry = true;
        query.outFields = ["*"];
        query.where = sql;  // Return all cities with a population greater than 1 million

        queryTask.execute(query).then(function (results) {
            //图层查询结果
            //console.log(results);
            callback(results.features);
        });

    }

    return {
        queryFeatureLayerByPage: queryFeatureLayerByPage,
        queryFeatureLayerCount: queryFeatureLayerCount,
        queryFeatureLayerBySql:queryFeatureLayerBySql
    }
}));
