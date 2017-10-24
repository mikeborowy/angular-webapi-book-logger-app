(function () {
    'use strict';

    angular
        .module("App.Books")
        .config(ConfigModuleFn)

    ConfigModuleFn.$inject = [
        "$appRoutesProvider"
    ]

    function ConfigModuleFn($appRoutesProvider) {
        $appRoutesProvider.SetRoutes( GetModuleRoutesFn() )
    }

    function GetModuleRoutesFn() {
        return [
            {
                name: '/',
                config: {
                    templateUrl: '/app/books/bookList/bookListView.html',
                    controller: 'BookListCtrl',
                    controllerAs: 'vm'
                }
            },
            {
                name: '/AddBook',
                config: {
                    templateUrl: '/app/books/bookAdd/bookAddView.html',
                    controller: 'BookAddCtrl',
                    controllerAs: 'vm'
                }
            },
            {
                name: '/EditBook/:bookId',
                config: {
                    templateUrl: '/app/books/bookEdit/bookEditView.html',
                    controller: 'BookEditCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        dataCtx: function (bookService) {
                            return bookService.getAllBooks();
                        }
                    }
                }
            },
            {
                name: '/BookDetails/:bookId',
                config: {
                    templateUrl: '/app/books/bookDetails/bookDetailsView.html',
                    controller: 'BookDetailsCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        dataCtx: function (bookService) {
                            return bookService.getAllBooks();
                        }
                    }
                }
            }
        ]
    }

})();