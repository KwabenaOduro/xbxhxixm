
/*App.service('alertService',  function($cordovaToast) {
    this.show = function (message) {
        $cordovaToast.show(message, '6000', 'bottom');
    };

});*/



App.factory('Toast', function () {
    return {
        showToast: function (message, duration) {
            Materialize.toast(
                message,
                duration || 1000,
                'rounded custom-toast'
            );
        }
    };
});