(function () {
    'use strict';

    var serviceId = "dataInterceptor";

    angular
        .module("App.Common.Services")
        .factory(serviceId, ServiceFn)

    ServiceFn.$inject = [
        "$q",
        "$log"
    ]

    function ServiceFn($q, $log) {

        return {
            request: requestInterceptor,
            requestError: requestErrorInterceptor,
            response: responseInterceptor,
            responseError: responseErrorInterceptor
        }

        function requestInterceptor(config) {

            $log.debug('HTTP ' + config.method + ' request - ' + config.url);
            return config;

        }
         
        function requestErrorInterceptor(request) {

            $log.debug('HTTP ' + request.config.method + ' request error - ' + request.config.url);
            return $q.reject(request);

        }

        function responseInterceptor(response) {

            $log.debug('HTTP ' + response.config.method + ' response - ' + response.config.url);
            return response;

        }

        function responseErrorInterceptor(response) {

            $log.debug('HTTP ' + response.config.method + ' response error - ' + response.config.url);
            return $q.reject(response);

        }

    };

})()