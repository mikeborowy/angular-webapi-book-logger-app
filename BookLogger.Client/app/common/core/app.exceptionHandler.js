(function () {
    'use strict';

    angular
        .module("App.Core")
        .config(ConfigModuleFn)

    ConfigModuleFn.$inject = [
       "$provide"
    ];

    function ConfigModuleFn($provide) {
    
        $provide.decorator("$exceptionHandler", ["$delegate", "$log", ExceptionHandler]);

        function ExceptionHandler($delegate, $log) {

            return function (exception, cause) {

                exception.message = "Please contact the Help Desk! \n Message: " + exception.message;
                $delegate(exception, cause);

                //$log.log('logging with log');
                //$log.info('logging with info');
                //$log.warn('logging with warn');
                //$log.debug(exception.message);

                $log.error(exception.message);
                //toastr.error(exception.message);
            }
        }
    }

})()