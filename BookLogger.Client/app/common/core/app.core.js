(function (appStartCfg) {
    'use strict';

    var app = angular
        .module("App.Core", appStartCfg.DEPENDENCIES)
        .constant("cConfig", appStartCfg.C_CONFIG)
        .provider('$appConfig', ConfigProviderFn)
        .config(ConfigModuleFn)

    /*
     *  Create Config Provider Function
     */

    ConfigProviderFn.$inject = [
        "cConfig"       //config constant defined in core
    ];

    function ConfigProviderFn(cConfig) {

        var _includeVersionTitle = false;

        this.setincludeVersionTitle = function (value) {
            _includeVersionTitle = value
        };

        this.$get = function () {

            var _appName = cConfig.APP_TITLE;
            var _appDesc = cConfig.APP_DESC;
            var _version = cConfig.APP_VER;

            if (_includeVersionTitle) {
                _appName += " " + _version;
            }

            return {
                appName: _appName,
                appDesc: _appDesc,
                debug: cConfig.APP_DEBUG,
                debugObjects: cConfig.DEBUG_OBJECTS,
                useResource: cConfig.USE_DATA_RESOURCE,
                interceptorsOn: cConfig.INTERCEPTORS_ON
            };
        };
    };

    /*
     *  Access Module Config Function
     */

    ConfigModuleFn.$inject = [
       "$locationProvider",     //comes with $routeProvider
       "$appConfigProvider",    //accessing app config provider, in other modules acced by $appConfig
       "$logProvider",          //setup angular console.log
       "$httpProvider",          //reason is here : adding interceptors
       "$provide"
    ];

    function ConfigModuleFn($locationProvider, $appConfigProvider, $logProvider, $httpProvider, $provide) {

        //when is not setup base url
        $locationProvider.hashPrefix('');

        //Config AppConfigProvider
        $appConfigProvider.setincludeVersionTitle(true);

        //Enable debug mode
        //   $log.debug('logging with debug');
        $logProvider.debugEnabled($appConfigProvider.$get().debug);

        //$httpProvider neede here because of app.dataInterceptor.js
        if ($appConfigProvider.interceptorsOn)
            $httpProvider.interceptors.push("dataInterceptor")

        //Redefine "$log" service
        $provide.decorator("$log", ["$delegate", "$appConfig", LogDecoratorFn]);

    };

    function LogDecoratorFn($delegate, $appConfig) {

        function log(message) {
            message += ' - ' + new Date() + ' (' + books.appName + ')';
            $delegate.log(message);
        }

        function info(message) {
            $delegate.info(message);
        }

        function warn(message) {
            $delegate.warn(message);
        }

        function error(message) {
            $delegate.error(message);
        }

        function debug(message) {
            $delegate.debug(message);
        }

        function awesome(message) {
            message = 'Awesome!!! - ' + message;
            $delegate.debug(message);
        }

        return {
            log: log,
            info: info,
            warn: warn,
            error: error,
            debug: debug,
            awesome: awesome
        };

    }

})(APP_START_CFG)