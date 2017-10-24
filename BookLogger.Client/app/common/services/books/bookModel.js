(function () {
    'use strict';

    angular
        .module('App.Core')
        .value('BookModel', EmployeeModel);

    function EmployeeModel() {
        this.bookId = 0;
        this.title = '';
        this.author = '';
        this.yearPublished = '';
    }

    EmployeeModel.prototype = {
        toObject: function (data) {
            this.bookId = data.bookId;
            this.title = data.title;
            this.author = data.author;
            this.yearPublished = data.yearPublished;
            return this;
        }
    }

})();