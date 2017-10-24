(function () {
    'use strict';
    /*
     * REMEMBER!!!
     * .value - values cannot be injected into providers
     */
    angular
        .module("App.Common.Services")
        .value("badgeService", {
            retrieveBadge: RetrieveBadgeFn
        })

    function RetrieveBadgeFn(minutesRead) {

        var badge = null;

        switch(true){
        
            case (minutesRead > 5000):
                badge = "Book Warm";
                break;
        
            case (minutesRead > 2500):
                badge = "Page Turner";
                break;

            default:
                badge = "Getting Started";
        }
        return badge;
    }

})()