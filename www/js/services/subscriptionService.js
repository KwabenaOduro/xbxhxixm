/**
 * Created by oduro on 3/30/2017.
 */
App.service('subscriptionService',  function($cordovaToast,$ionicPopup,$ionicActionSheet,apiService,showAlertService,$rootScope) {
    var payment_option;
    this.subscribe = function (message) {
        var myPopup = $ionicPopup.show({
            title: 'You will be charged 0.60 pesewas for subscription',
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Okay ...</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        show();
                    }
                }
            ]
        });

        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });

    };

    var makePayment = function () {
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            templateUrl: (status === 'visa')? 'template/visa_payment_modal.html': 'template/payment_modal.html',
            scope: $rootScope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Okay ...</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        var user_data = JSON.parse(window.localStorage.getItem("logged_user"));
                        var user_id = user_data.id;
                        var amount_paid = 0.6;
                        console.log('check scope');
                        console.log($rootScope.pay);
                       /* apiService.makePayment($rootScope.pay,function (response) {
                            if(response.type == 'visa'){
                                window.open(response.url, '_system');
                                return;
                            }
                            if(response.status === 'success'){
                                $scope.showConfirm('others');
                                return
                            }
                            showAlertService.show('Sorry and Error Occurred');

                        })
                        console.log('Payment Data');
                        console.log(scope.pay);*/
                    }
                }
            ]
        });

        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });

    }
    
    var show = function () {
        var hideSheet = $ionicActionSheet.show({
            titleText: 'Select Subscription Option',
            buttons: [
                { text: 'Air Time Subscription <img src="http://flash.co.za/wp-content/uploads/2014/10/ICONS_DEV_ICON1.png">' },
                { text: 'MTN Mobile Money <img src="http://www.xbridals.com/wp-content/uploads/2015/06/mobilemoney1.png">' },
                { text: 'Vodafone Cash <img src="img/mobilemoney1.png">' },
                { text: 'Tigo Cash <img src="img/tigoCash.png">' },
                { text: 'Airtel Money <img src="img/airtelmoney.png">' },
                { text: 'Visa/Master Card <img src="img/visa.png">'},
            ],
            destructiveText: 'Cancel <i class="icon ion-android-cancel"></i>',
            cancelText: 'Cancel',
            cancel: function() {
                console.log('CANCELLED');
            },
            buttonClicked: function(index) {
                payment_option = apiService.getVendorType(index);
                makePayment((index === 4)?'visa':'others');

            },
            destructiveButtonClicked: function() {
                console.log('DESTRUCT');
                return true;
            }
        });

        return hideSheet;
        
    }

    this.getPaymentOption = function () {

        return payment_option ;
    }

});
