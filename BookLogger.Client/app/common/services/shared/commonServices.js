(function () {
    'use strict';

    var serviceId = "commonServices";

    angular
		.module("App.Common.Services")
        .factory([ServiceFn]);
      		
    ServiceFn.$inject = [
        "$q",
        "$http",
        "$resource"
    ]

    function ServiceFn($q, $http, $resource) {

        var services = {
            $q: $q,
            $http: $http,
            $resource: $resource,
            transformToModel: TransformFn
        }

        return services;

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

})();