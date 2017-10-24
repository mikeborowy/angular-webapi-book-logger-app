(function () {
    'use strict';

    var serviceId = "summaryService";

    angular
        .module("App.Common.Services")
        .factory(serviceId, FactoryFn);

    FactoryFn.$inject = [
        "$q",
        "$http",
        "$cacheFactory",
        "logger",
        "cConfig",
    ]

    function FactoryFn($q, $http, $cacheFactory, logger, config) {

        logger.info(serviceId + ' has been created');

        return {
            /*Cache*/
            getUserSummary: function (promiseObject) { return getUserSummaryFn(promiseObject) },
            deleteSummaryFromCache: deleteSummaryFromCacheFn,
            deleteHttpCache: deleteHttpCacheFn
        }

        /*********
         * CACHE *
         ********/
       
        /*
         * Create Object and CacheFactory
         */
        function getUserSummaryFn(promiseObject) {

            var deferred = $q.defer();

            var dataCache = $cacheFactory.get('bookLoggerCache');

            if (!dataCache) {
                dataCache = $cacheFactory('bookLoggerCache');
            }

            var summaryFromCache = dataCache.get('summary');

            if (summaryFromCache) {

                logger.warn(serviceId + " return summary from cache")
                console.log(summaryFromCache)

                deferred.resolve(summaryFromCache)
            }
            else {

                logger.warn(serviceId + ' gathering new summary data');

                var booksPromise = promiseObject.booksPromise;
                var readersPromise = promiseObject.readersPromise;

                $q.all([booksPromise, readersPromise ])
                    .then(function (bookLoggerData) {

                        var allBooks = bookLoggerData[0];
                        var allReaders = bookLoggerData[1];

                        var grandTotalMinutes = 0;

                        allReaders.forEach(function (currentReader, index, array) {
                            grandTotalMinutes += currentReader.totalMinutesRead;
                        });

                        logger.warn(serviceId + ' gathered new summary data');

                        var summaryData = {
                            bookCount: allBooks.length,
                            readerCount: allReaders.length,
                            grandTotalMinutes: grandTotalMinutes
                        };

                        logger.object(summaryData)

                        dataCache.put('summary', summaryData);
                        deferred.resolve(summaryData);

                    });
            }
            return deferred.promise;
        }

        /*
         * Delete Object from CacheFactory
         */
        function deleteSummaryFromCacheFn() {

            var dataCache = $cacheFactory.get('bookLoggerCache');
            dataCache.remove('summary');
        }

        /*
         * Delete $http Cache
         */
        function deleteHttpCacheFn() {

            var httpCache = $cacheFactory.get('$http');
            httpCache.remove(config.API_SERVER_URL + '/api/books');
        }
    }

})()