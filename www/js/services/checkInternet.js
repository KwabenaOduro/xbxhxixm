/**
 * Created by oduro on 4/29/2017.
 */
App.factory('checkInternet', function() {
    return function checkInternet() {
        var haveInternet= true;
        if (window.cordova) {
            if (window.Connection) {
                if (navigator.connection.type == Connection.NONE) {
                    haveInternet= false;
                }
            }
        }
        return haveInternet;
    };
})