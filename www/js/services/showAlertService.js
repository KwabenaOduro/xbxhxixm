/**
 * Created by oduro on 2/28/2017.
 */

App.service('showAlertService',  function($cordovaToast) {
 this.show = function (message) {
 $cordovaToast.show(message, '6000', 'center');
 };

 });


