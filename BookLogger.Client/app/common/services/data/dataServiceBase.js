(function () {
    'use strict';

    var serviceId = "dataServiceBase";

    angular
        .module("App.Common.Services")
        .factory(serviceId, FactoryFn);

    FactoryFn.$inject = [
        "commonServices",
        "logger"
    ]

    function FactoryFn($q, $http, logger) {

        $q = $commonServices.$q;
        $http = $commonServices.$http;

        logger.info(serviceId + ' has been created');

        var _apiUrl = "";

        return {
            getAPIUrl: _apiUrl,
            setAPIUrl: setServiceUrlFn,
            getItemsList: function (configObj) { return GetAllItemsFn(configObj) },
            getItemById: function (id, configObj) { return GetItemByIdFn(id, configObj) },
            addItem: function (modelObject, configObj) { return AddItemFn(modelObject, configObj) },
            updateItem: function (id, modelObject, configObj) { return UpdateItemFn(id, modelObject, configObj) },
            deleteItem: function (id, configObj) { return DeleteItemFn(id, configObj) }
        }

        function setServiceUrlFn(value) {
            _apiUrl = value;
        }

        /*
         * GET ALL         
         */
        function GetAllItemsFn(configObj) {

            var request = $http.get(_apiUrl, configObj)
               .then(function (response) { return OnSuccess(response, "GetAllItemsFn") })
               .catch(function (response) { return OnError(response, "GetAllItemsFn") });

            return request;
        }

        /*
         * GET by ID
         */
        function GetItemByIdFn(id, configObj) {

            var request = $http.get(_apiUrl, configObj)
               .then(function (success) { return OnSuccess(success, "GetItemByIdFn") })
               .catch(function (response) { return OnError(response, "GetItemByIdFn") });

            return request;
        }

        /*
         * CREATE by ID
         */
        function AddItemFn(modelObject, configObj) {

            var request = $http.post(_apiUrl, modelObject, configObj)
            .then(function (success) { return OnSuccess(success, "AddItemFn") })
            .catch(function (response) { return OnError(response, "AddItemFn") });

            return request;
        }

        /*
         * UPDATE
         */
        function UpdateItemFn(id, modelObject, configObj) {

            var request = $http.put(_apiUrl + '/' + id, modelObject)
               .then(function (success) { return OnSuccess(success, "UpdateItemFn") })
               .catch(function (response) { return OnError(response, "UpdateItemFn") });

            return request;
        }

        /*
        * DELETE 
        */
        function DeleteItemFn(id) {

            var request = $http.delete(_apiUrl + '/' + id, configObj)
               .then(function (success) { return OnSuccess(success, "DeleteItemFn") })
               .catch(function (response) { return OnError(response, "DeleteItemFn") });

            return request;
        }

        /***********************
         * HTTP CALLS HANDLERS *
         **********************/

        /*
         * Success Handler
         */
        function OnSuccess(response, httpCall) {
            return response.data;
        }

        /*
         * Error Handler 
         */
        function OnError(response, fnName) {
            return $q.reject('Error retrieving in ' + fnName + '. (HTTP status: ' + response + ')')
        }
    }

})()