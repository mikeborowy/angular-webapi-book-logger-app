(function () {
    'use strict';

    var controllerId = "BookAddCtrl";

    angular
        .module("App.Books")
        .controller(controllerId, ControllerFn);

    ControllerFn.$inject = [
        "$q",
        "bookService",
        "$location",
        "logger"
    ]

    function ControllerFn($q, dataService, $location, logger) {

        var vm = this;
        vm.newBook = {};
        vm.OnAddBook = function () {

            dataService
                .addBook(vm.newBook)
                .then(function (response) { return OnSuccess(response, "addBook") })
                .catch(OnError)
        }

        logger.init(controllerId + " has been created");

        function OnSuccess(response, httpCall) {

            logger.object(response)
            $location.path('/');
        }

        /*
         * Error Handler 
         */
        function OnError(errorMessage) {
            return logger.error('Error message in ' + controllerId + ':' + errorMessage)
        }

    }

})()