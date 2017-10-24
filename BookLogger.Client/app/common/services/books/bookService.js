(function () {
    'use strict';

    var serviceId = "bookService";

    angular
        .module("App.Common.Services")
        .factory(serviceId, FactoryFn);

    FactoryFn.$inject = [
        "$q",
        "$http",
        "BookModel",
        "$timeout",
        "logger",
        "cConfig",
        "summaryService"
    ]

    function FactoryFn($q, $http, BookModel, $timeout, logger, config, summaryService) {

        logger.info(serviceId + ' has been created');

        return {
            getAllBooks: getAllBooksFn,
            getBookById: getBookByIdFn,
            addBook: addBookFn,
            updateBook: updateBookFn,
            deleteBook: deleteBookFn
        }

        /*********
         * BOOKS *
         ********/
        /*
         * GET ALL Books
         */
        function getAllBooksFn() {

            var request = $http(
                {
                    method: 'GET',
                    url: config.API_SERVER_URL + '/api/books',
                    headers: {
                        'PS-BookLogger-Version': config.APP_VERSION
                    },
                    transformResponse: transformGetDataFn,
                    cache: true
                })
               .then(function (response) { return OnSuccess(response, "getAllBooksFn") })
               .catch(function (response) { return OnError(response, "getAllBooksFn") });

            return request;
        }

        /*
         * GET Book by ID
         */
        function getBookByIdFn(bookId) {

            var request = $http(
                {
                    method: 'GET',
                    url: config.API_SERVER_URL + '/api/books/' + bookId
                })
               .then(function (success) { return OnSuccess(success, "getBookByIdFn") })
               .catch(function (response) { return OnError(response, "getBookByIdFn") });

            return request;
        }

        /*
         * CREATE Book by ID
         */
        function addBookFn(newBook) {

            summaryService.deleteSummaryFromCache();
            summaryService.deleteHttpCache();

            var request = $http(
                {
                    method: 'POST',
                    url: config.API_SERVER_URL + '/api/books',
                    data: newBook,
                    headers: {
                        'Content-type': 'application/json'
                    },
                    responseType: 'json',
                    transformResponse: transformPostDataFn
                })
            .then(function (success) { return OnSuccess(success, "addBookFn") })
            .catch(function (response) { return OnError(response, "addBookFn") });

            return request;
        }

        /*
         * UPDATE Book
         */
        function updateBookFn(book) {

            summaryService.deleteSummaryFromCache();
            summaryService.deleteHttpCache();

            var request = $http(
                {
                    method: 'PUT',
                    url: config.API_SERVER_URL + '/api/books/' + book.bookId,
                    data: book
                })
               .then(function (success) { return OnSuccess(success, "updateBookFn") })
               .catch(function (response) { return OnError(response, "updateBookFn") });

            return request;
        }

        /*
        * DELETE Book
        */
        function deleteBookFn(bookId) {

            summaryService.deleteSummaryFromCache();
            summaryService.deleteHttpCache();

            var request = $http(
                {
                    method: 'DELETE',
                    url: config.API_SERVER_URL + '/api/books/' + bookId
                })
               .then(function (success) { return OnSuccess(success, "deleteBookFn") })
               .catch(function (response) { return OnError(response, "deleteBookFn") });

            return request;
        }

        /***********************
         * HTTP CALLS HANDLERS *
         **********************/
        /*
         * Success Handler
         */
        function OnSuccess(response, httpCall) {

            // transforms the JSON response to a list of EmployeeModel
            var data;

            if (response.data.length === 0)
                data = []
            else
                data = TransformFn(response.data, BookModel);

            return data;
        }

        /*
         * Error Handler 
         */
        function OnError(response, fnName) {
            return $q.reject('Error retrieving in ' + fnName + '. (HTTP status: ' + response + ')')
        }

        /**********************
        * TRANSFORM TO MODEL *
        **********************/
        /*
         * Transform json result to a given object
         */
        function TransformFn(jsonResult, modelConstructor, user, propertyName) {

            if (angular.isArray(jsonResult)) {

                var models = [];

                angular.forEach(jsonResult, function (object) {
                    models.push(TransformObjectFn(object, modelConstructor, user, propertyName));
                });

                return models;
            }
            else {
                return TransformObjectFn(jsonResult, modelConstructor, user, propertyName);
            }
        }

        /*** Private Methods ***/
        function TransformObjectFn(jsonResult, modelConstructor, user, propertyName) {

            var model = new modelConstructor();
            model.toObject(jsonResult, user, propertyName);

            return model;
        }

        /**************
         * DATA TOOLS *
         *************/
        /*
         * Transform Object on POST
         */

        function transformPostDataFn(data, headersGetters) {

            //useful to standarize recieved/send data from 
            //different sources and code notation

            data.isNewBook = true;
            logger.object(data);

            return JSON.stringify(data);
        }

        /*
         * Transform Object On GET
         */
        function transformGetDataFn(data, headersGetters, httpStatusCode) {

            //useful to standarize recieved/send data from 
            //different sources and code notation

            var transformed = angular.fromJson(data);
            transformed.forEach(function (currentValue, index, array) {
                currentValue.dateDownloaded = new Date();
            });

            logger.object(transformed);
            return transformed;
        }
    }
})()