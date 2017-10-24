(function () {
    'use strict';

    angular
        .module("App.Constants", [])
        .constant("cCustomEvents", {
            //PRELOADING EVENTS
            LOADING_STARTED: 'loadingStarted',
            LOADING_ENDED: 'loadingEnded'
           })
        .constant("cUserActions", {
            //USER ACTIONS
            REGISTER: "register",
            LOGIN: "login",
            LOGOUT: "logout"
        }).
        constant("cDataActions", {
            //DATA CONTEXT ACTIONS
            QUERY: "query",
            GET: "get",
            SAVE: "save",
            UPDATE: "update",
            DELETE: "delete"
        })


})()