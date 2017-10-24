(function () {
    'use strict';

    angular
        .module('App.Core')
        .value('ReaderModel', EmployeeModel);

    function EmployeeModel() {
        this.readerId = 0;
        this.name = '';
        this.weeklyReadingGoal = '';
        this.totalMinutesRead = '';
    }

    EmployeeModel.prototype = {
        toObject: function (data) {
            this.readerId = data.readerId;
            this.name = data.name;
            this.weeklyReadingGoal = data.weeklyReadingGoal;
            this.totalMinutesRead = data.totalMinutesRead;
            return this;
        }
    }

})();