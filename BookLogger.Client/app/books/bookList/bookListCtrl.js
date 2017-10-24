(function () {
    'use strict';

    var controllerId = "BookListCtrl";

    angular
        .module("App.Books")
        .controller(controllerId, ControllerFn);

    ControllerFn.$inject = [
        "$appConfig",
        "$q",
        "bookService",
        "readerService",
        "dataResource",
        "logger",
        "badgeService",
        "$cookies",
        "$cookieStore",
        "$route",
        "currentUser",
        "summaryService"
    ]

    function ControllerFn($appConfig, $q, bookService, readerService, dataResource, logger, badgeService, $cookies, $cookieStore, $route, currentUser, summaryService) {

        var vm = this;
        var useResource = $appConfig.useResource;

        logger.init(controllerId + " has been created");

        vm.appName = $appConfig.appName;
        vm.appDesc = $appConfig.appDesc;

        //bookService
        //    .getUserSummary()
        //    .then(GetSummaruSuccess);
        //function GetSummaruSuccess(summaryData) {
        //    vm.userSummary = summaryData;
        //}

        if (!useResource) {
            logger.warn(controllerId + "is using data service")

            //When use bookService
            var booksPromise = bookService.getAllBooks()
            var readersPromise = readerService.getAllReaders();
            var summaryPromise = summaryService.getUserSummary({ 'booksPromise' : booksPromise, 'readersPromise' :readersPromise });

            $q.all([booksPromise, readersPromise, summaryPromise])
                .then(function (response) { return OnSuccess(response, "all") })
                .catch(OnError)

        }
        else {
            logger.warn(controllerId + "is using data resource")
            //When use dataResource
            vm.allBooks = dataResource.query();
        }

        vm.getBadge = badgeService.retrieveBadge;
        vm.favoriteBook = $cookies.favoriteBook;
        vm.lastEditedBook = $cookieStore.get('lastEditedBook', vm.currentBook);
        vm.cart = currentUser.getCart;

        vm.OnRemoveFromCart = function (bookId) {
            currentUser.removeFromCart(bookId)
        }

        vm.OnDelete = function (bookId) {

            bookService
                .deleteBook(bookId)
                .then(function (response) { return OnSuccess(response, "deleteBook") })
                .catch(OnError)
        }

        function OnSuccess(response, httpCall) {
            //throw "error in success handler";

            switch (httpCall) {
                case "all":

                    response.forEach(function (dataSet, index, array) {

                        logger.info(controllerId + " checking promises...")
                        logger.object(JSON.stringify(dataSet))

                        if (index == array.length - 1) {
                            logger.info(controllerId + " loading Data Complete")
                        }
                    })

                    console.log(response[2])

                    vm.allBooks = response[0];
                    vm.allReaders = response[1];
                    vm.userSummary = response[2];

                    break;
                case "deleteBook":

                    logger.info(response);
                    $route.reload();
                    break;
                default:
                    break;
            }
        }

        function OnError(errorMsg) {
            logger.error("Error message: " + errorMsg);
        }

        function OnComplete(dataType) {
            logger.error(dataType + " loading is Complete")
        }

    }

})()