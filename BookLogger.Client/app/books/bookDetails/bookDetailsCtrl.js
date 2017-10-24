(function () {
    'use strict';

    var controllerId = "BookDetailsCtrl";

    angular
        .module("App.Books")
        .controller(controllerId, ControllerFn);

    ControllerFn.$inject = [
        "$appConfig",
        "$routeParams",
        "bookService",
        "dataResource",
        "logger",
        "$cookies",
        "$cookieStore",
        "$location",
        "currentUser"
    ]

    function ControllerFn($appConfig, $routeParams, dataService, dataResource, logger, $cookies, $cookieStore, $location, currentUser) {

        var vm = this;
        var useResource = $appConfig.useResource;
        logger.init(controllerId + " has been created");

        if (!useResource) {

            logger.warn(controllerId + " use data service")
            //When use dataService
            //$routeParams.bookID must be the same as in cfg.routes.js file
            dataService
                .getBookById($routeParams.bookId)
                .then(function (response) { return OnSuccess(response, "getBookById") })
                .catch(OnError)
        }
        else {
            logger.warn(controllerId + " use data resource")
            //When use dataResource
            vm.currentBook = dataResource.get({ bookId: $routeParams.bookId });
        }

        //vm.currentBook = dataService.filter(function (item) {
        //    return item.bookId == $routeParams.bookID;
        //})[0];

        vm.cart = currentUser.getCart;

        vm.SetAsFavorite = function () {
            $cookies.favoriteBook = vm.currentBook.title + ", " + vm.currentBook.author;
        };

        vm.OnAddToCart = function () {
         
            vm.cart = currentUser.getCart;
            currentUser.addToCart(vm.currentBook);
        }

        /*
         * Success Handler
         */
        function OnSuccess(response, httpCall) {

            switch (httpCall) {
                case "getBookById":

                    logger.object(response);

                    vm.currentBook = response;
                    $cookieStore.put('lastEditedBook', vm.currentBook);

                    break;
                case "updateBook":

                    logger.info(response)

                    $location.path('/');

                    break;
                default:
                    break;
            }
        }

        /*
         * Error Handler 
         */
        function OnError(errorMessage) {
            return logger.error('Error message in ' + controllerId + ':' + errorMessage)
        }

    }

})()