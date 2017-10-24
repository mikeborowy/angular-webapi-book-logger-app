(function () {
    'use strict';

    var serviceId = "currentUser";

    angular
        .module("App.Common.Services")
        .factory(serviceId, ServiceFn)

    ServiceFn.$inject = [
        "logger"
    ];

    function ServiceFn($logger) {

        var _cart = [];

        return {
            getCart: _cart,
            addToCart: function (value) {

                var objIndex = CheckObject(_cart, value);

                if (objIndex == -1) {
                    $logger.info("Object added to cart")
                    _cart.push(value)
                }
                else
                    $logger.error("Object exists in cart")

            },
            removeFromCart: function (value) {

                var objIndex = CheckObjectId(_cart, value);

                if (objIndex != -1) {
                    $logger.info("Object removed from cart")
                    _cart.splice(objIndex, 1);
                }
            }
        }

        function CheckObject(a, obj) {

            var i = a.length;

            while (i--) {

                if (a[i] === obj) {
                    //return true;

                    return i;
                }
            }
            //return false;
            return -1;
        }

        function CheckObjectId(a, id) {

            var i = a.length;

            while (i--) {

                if (a[i].bookId === id) {
                    //return true;

                    return i;
                }
            }
            //return false;
            return -1;
        }

    }

})()