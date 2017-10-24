(function () {
    'use strict';

    /*
     *   Create Run Method
     * RunModuleFn.$inject = ["$rootScope"];
     * function RunModuleFn($rootScope) { }
     */

    angular
        .module("App.Core")
        .run(["$rootScope", "logger", function ($rootScope, logger) {

        $rootScope.$on('$routeChangeStart', function (event, current, previous) {

            logger.info('----changing routes has started');

        });

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

            logger.info('----successfully changed routes');

        });

        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {

            logger.error('----error changing routes');

            logger.error(event);
            logger.error(current);
            logger.error(previous);
            logger.error(rejection);

        });
    }]);

})()