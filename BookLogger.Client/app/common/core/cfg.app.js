var APP_START_CFG = (function (cfg) {
    'use strict';

    var cfg = {};
    var dependencies = [
         // Angular modules 
        "ngRoute",          // routing based on url, $routeProvider, $route, $location
        "ngResource",       // $resource service
        "ngCookies",        // $cookies, $cookieStore

        "ngAnimate",        // animations
        "ngSanitize",       // sanitizes html bindings (ex: sidebar.js)

        // 3rd party libraries
        //"ui.router",  		//ui angular routing based on states
        //"ui.mask",			//masks input fields
        //"ui.bootstrap",		//bootstrap
        //"chart.js"			//charts
    ];

    var server = {
        host: "http://localhost",
        port: "53518"
    };

    var serverMockEnabled = true;
    
    var debug = true;
    var debugObjects = false;

    var GetDependenciesFn = function () {
        //if (serverMockEnabled)
        //    dependencies.push("ProductResourceMock");
        return dependencies;
    }

    var cConfig = {};
    cConfig.APP_TITLE = "Book Logger";
    cConfig.APP_DESC = "Track which books you read";
    cConfig.APP_VER = "1.0";
    cConfig.APP_DEBUG = debug;
    cConfig.DEBUG_OBJECTS = debugObjects;
    cConfig.API_SERVER_URL = server.host + ":" + server.port;
    cConfig.IS_LOGGED_IN = serverMockEnabled ? true : false;
    cConfig.DATA_IS_RESOURCE = true;
    cConfig.INTERCEPTORS_ON = false;

    cfg.C_CONFIG = cConfig;
    cfg.SERVER_MOCK_ENABLED = serverMockEnabled;
    cfg.DEPENDENCIES = GetDependenciesFn();

    return cfg;

}(APP_START_CFG));


