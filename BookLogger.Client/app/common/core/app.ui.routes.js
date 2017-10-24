(function () {
    'use strict';

    angular
        .module("App.Core")
        .provider("$appStates", AppStatesProviderFn)

    //must be sent as parameter with addition "Provider" so it is 
    //named as appStates but called as "appStatesProvider"
    function AppStatesProviderFn($urlRouterProvider, $stateProvider) {

        var _states = [];

        return {

            SetStates: function (value) {

                _states = value
                _states.forEach(function (st) {
                    $stateProvider.state(st.name, st.config);
                });

                $urlRouterProvider.otherwise('/');
            },

            $get: function () { return _states }
        };

    }
  
})();