(function () {
    'use strict';

    var serviceId = "readerService";

    angular
        .module("App.Common.Services")
        .factory(serviceId, FactoryFn);

    FactoryFn.$inject = [
        "$q",
        "$http",
        "ReaderModel",
        "$timeout",
        "logger",
        "cConfig"
    ]

    function FactoryFn($q, $http, ReaderModel, $timeout, logger, config) {

        logger.info(serviceId + ' has been created');

        var modelConstructor = ReaderModel

        return {
            getAllReaders: getAllReadersFn
        }

        /*
         * GET ALL Readers
         */
        function getAllReadersFn() {

            logger.info("Geeting all Readers");

            var readersArray = [
                {
                    "readerId": 1,
                    "name": "Marie",
                    "weeklyReadingGoal": 400,
                    "totalMinutesRead": 5600
                },
                {
                    "readerId": 2,
                    "name": "Daniel",
                    "weeklyReadingGoal": 210,
                    "totalMinutesRead": 3000
                },
                {
                    "readerId": 3,
                    "name": "Lanier",
                    "weeklyReadingGoal": 140,
                    "totalMinutesRead": 600
                }
            ]


            var deferred = $q.defer();

            $timeout(function () {

                var successful = true;

                deferred.notify("Just getting started gathering readers...");
                deferred.notify("Almost done gathering readers...");

                if (successful) {
                    deferred.resolve(readersArray);
                }
                else {
                    deferred.reject('Error retrieving books');
                }

            }, 1500);

            return deferred.promise;
        }

        /***********************
         * HTTP CALLS HANDLERS *
         **********************/

        /*
         * Success Handler
         */
        function OnSuccess(response, httpCall) {

            // transforms the JSON response to a list of EmployeeModel
            var data;

            if (response.data.length === 0)
                data = []
            else
                data = TransformFn(response.data, modelConstructor);

            return data;
        }

        /*
         * Error Handler 
         */
        function OnError(response, fnName) {
            return $q.reject('Error retrieving in ' + fnName + '. (HTTP status: ' + response + ')')
        }

        /*
         * Transform json result to a given object
         */
        function TransformFn(jsonResult, modelConstructor, user, propertyName) {

            if (angular.isArray(jsonResult)) {

                var models = [];

                angular.forEach(jsonResult, function (object) {
                    models.push(TransformObjectFn(object, modelConstructor, user, propertyName));
                });

                return models;
            }
            else {
                return TransformObjectFn(jsonResult, modelConstructor, user, propertyName);
            }
        }

        /*** Private Methods ***/
        function TransformObjectFn(jsonResult, modelConstructor, user, propertyName) {

            var model = new modelConstructor();
            model.toObject(jsonResult, user, propertyName);

            return model;
        }
    }

})()