(function () {
    'use strict';

    var serviceId = "logger";

    angular
        .module("App.Common.Services")
        .service(serviceId, ServiceFn)


    function LoggerBase() {

        this.log = function (message) {
            console.log('LoggerBase: ' + message);
        }
    }

    //LoggerBase.prototype.trace = function (message) {
    //    console.log('LoggerFn ' + message);
    //}

    LoggerBase.$inject = [
        "$appConfig",   //app config provider defined in core 
        "$log"          //angular console.log()
    ]

    function ServiceFn($appConfig, $log) {

        //$log options:
        //$log.info()
        //$log.warn()
        //$log.error()
        //$log.debug()

        //inheritance from LoggerBase
        LoggerBase.call(this);

        var debugEnabled = $appConfig.debug;
        var objectsDebugEnabled = $appConfig.debugObjects;

        this.out = function (message) {

            if (debugEnabled)
                console.log('%c Logger: ' + message, 'color: black;')
        }

        this.object = function (message) {

            if (debugEnabled) {
                if (objectsDebugEnabled)
                    console.log('%c' + JSON.stringify(message, null, 4), 'color: purple;')
            }
        }

        this.init = function (message) {

            if (debugEnabled)
                console.log('%c Logger: ' + message, 'color: green;')
        }

        this.warn = function (message) {

            if (debugEnabled)
                console.warn('%c Logger: ' + message, 'color: orange;')
        }

        this.info = function (message) {

            if (debugEnabled)
                console.info('%c Logger: ' + message, 'color: blue;')
        }

        this.error = function (message) {

            if (debugEnabled)
                console.error('%c Logger: ' + message, 'color: red;')
        }
    }

    //ServiceFn.prototype = Object.create(LoggerBase.prototype);

})()