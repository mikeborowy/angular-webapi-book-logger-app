(function () {
    'use strict';

    angular
        .module("App.Core")
        .provider("$appRoutes", AppRoutesProviderFn)

    AppRoutesProviderFn.$inject = [
       "$routeProvider"
    ]

    function AppRoutesProviderFn($routeProvider) {
        var _routes = [];
        return {
            //native must have function
            $get: function () { return _routes },
            //my custom function
            SetRoutes: function (value) {

                _routes = value;
                _routes.forEach(function (_route) {
                    $routeProvider
                        .when(_route.name, _route.config)
                });

                $routeProvider.otherwise({ redirectTo: '/' });
            }
        };

    }
})();