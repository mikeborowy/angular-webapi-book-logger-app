(function () {
    'use strict';

    var serviceId = "dataResource";

    angular
        .module("App.Common.Services")
        .factory(serviceId, ServiceFn)

    ServiceFn.$inject = [
        "$resource",
        "cConfig"
    ]

    function ServiceFn($resource, config) {

        return $resource(config.API_SERVER_URL + '/api/books/:bookId', { bookId: '@bookId' },
            {
                'update': { method: 'PUT' }
            }
        );
    }

})()