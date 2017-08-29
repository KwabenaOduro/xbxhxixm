// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


var App = angular.module('starter', ['ionic','ngAudio','ngVideo','angularCSS','truncate','ngCordova','ngAnimate','ngSanitize','pusher-angular',
    'ngMessages','formdirectives','ionic.cloud'])



    .run(function($ionicPlatform,$location,$rootScope,$ionicPush,showAlertService,$ionicPopup,$templateCache,$cordovaPushV5) {
        $ionicPlatform.on('resume', function(){
          // alert('i have resumed');
        });


        //


        var user = JSON.parse(window.localStorage.getItem("logged_user"));
        console.log('User logged storage details');
        console.log(user);
        //handle push events
        var pusher = new Pusher('da8b9c6cf93be6f8cc18');
        console.log('Channel connections');
        console.log(pusher);
        var channel = pusher.subscribe('mtech-channel');
        channel.bind('paid-event', function (data) {
            console.log('paid events');
            console.log(data);
            if(data.paid_status === 'payment_success' && data.user_id === user.id){
                var myPopup = $ionicPopup.show({
                    title: 'Your Payment Was Successful.You can Continue Streaming',
                    buttons: [
                        {
                            text: '<b>Okay ...</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                return;
                            }
                        }
                    ]
                });
            }
        });
        channel.bind('airtime-sub-event', function (data) {
            console.log('airtime events');
            console.log(data);
            if(data.airtime_status === 'payment_success' && data.user_id === user.id){
                var myPopup = $ionicPopup.show({
                    title: 'Your Payment Was Successful.You can Continue Streaming',
                    buttons: [
                        {
                            text: '<b>Okay ...</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                return;
                            }
                        }
                    ]
                });
            }
        });
        //end push events
        if(!user || user == null){
            $location.path('app/login');
        }else{
            $location.path('app/home');
        }
        $ionicPlatform.ready(function() {
            /*console.log('platform is ready');
            $ionicPush.register().then(function(t) {
                return $ionicPush.saveToken(t);
            }).then(function(t) {
                console.log('Token saved:', t.token);
            });*/
            localStorage.myPush = ''; // I use a localStorage variable to persist the token
            $cordovaPushV5.initialize(  // important to initialize with the multidevice structure !!
                {
                    android: {
                        senderID: "271686337219",

                    }

                }
            ).then(function (result) {
                $cordovaPushV5.onNotification();
                $cordovaPushV5.onError();
                $cordovaPushV5.register().then(function (resultreg) {
                    localStorage.myPush = resultreg;
                    // SEND THE TOKEN TO THE SERVER, best associated with your device id and user
                }, function (err) {
                    // handle error
                });
            });

            //notification events
           $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data) {  // use two variables here, event and data !!!
                console.log('notification data');

                console.log(data);



            });
            //end
            //handle file permissions
            var permissions = cordova.plugins.permissions;
            permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, checkPermissionCallback, null);
            function checkPermissionCallback(status) {
                if (!status.hasPermission) {
                    var errorCallback = function () {
                        console.warn('Storage permission is not turned on');
                    }
                    permissions.requestPermission(
                        permissions.READ_EXTERNAL_STORAGE,
                        function (status) {
                            if (!status.hasPermission) {
                                errorCallback();
                            } else {
                                console.log('download file begins');

                            }
                        },
                        errorCallback);
                }
            }

            document.addEventListener('deviceready', function() {
                document.addEventListener("offline", onOffline, false);
                cordova.plugins.notification.local.hasPermission(function(granted) {
                    if (granted == false) {
                        // To asking mobile for the permission to allow push notification.
                        cordova.plugins.notification.local.registerPermission(function(granted) {
                            console.log('registerPermission has been granted: ' + granted);
                        });
                    }
                });


            }, false);// End Send push notification

            function onOffline() {
                // Handle the offline event
                showAlertService.show('Sorry You are Offline');
            }

            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if(window.StatusBar) {
                StatusBar.styleDefault();

            }
            //handle admob
            if (! AdMob ) { console.log('api not ready'); return; }
            AdMob.createBanner( {
                //adId: 'ca-app-pub-3940256099942544/6300978111',
                adId: 'ca-app-pub-7303317818993023/2795872599',
                isTesting: false,
                position: AdMob.AD_POSITION.BOTTOM_CENTER // Set AdMob.AD_POSITION.TOP_CENTER for show banner at top section
            } );
            //
        });
    })



    // fitlers
    .filter('nl2br', ['$filter',
        function($filter) {
            return function(data) {
                if (!data) return data;
                return data.replace(/\n\r?/g, '<br />');
            };
        }
    ])

    // directives
    .directive('autolinker', ['$timeout',
        function($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    $timeout(function() {
                        var eleHtml = element.html();

                        if (eleHtml === '') {
                            return false;
                        }

                        var text = Autolinker.link(eleHtml, {
                            className: 'autolinker',
                            newWindow: false
                        });

                        element.html(text);

                        var autolinks = element[0].getElementsByClassName('autolinker');

                        for (var i = 0; i < autolinks.length; i++) {
                            angular.element(autolinks[i]).bind('click', function(e) {
                                var href = e.target.href;
                                console.log('autolinkClick, href: ' + href);

                                if (href) {
                                    //window.open(href, '_system');
                                    window.open(href, '_blank');
                                }

                                e.preventDefault();
                                return false;
                            });
                        }
                    }, 0);
                }
            }
        }
    ])


    .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider, $ionicCloudProvider) {
        $ionicConfigProvider.scrolling.jsScrolling(false);
        $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.tabs.position('top');

        //handle notifications
        /*$ionicCloudProvider.init({
         "core": {
         "app_id": "1:271686337219:android:a3b563422166c676"
         },
         "push": {
         "sender_id": "271686337219",
         "pluginConfig": {
         "android": {
         "iconColor": "#343434"
         }
         }
         }
         });*/
        //

        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'template/menu/menu.html',
                controller: 'menuController'
                /* templateUrl: 'template/menu.html',
                 controller: 'MainCtrl'*/
            })
            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        /* templateUrl: 'template/news_feed.html',
                         controller: 'MainCtrl' */
                        templateUrl: 'template/news_feed/news_feed.html',
                        controller: 'newsFeedController'
                    }
                }
            })
            .state('app.feed_details', {
                url: '/feed_details/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'template/news_feed/feed_details.html',
                        controller: 'newsFeedController'
                        /*templateUrl: 'template/view_details.html',
                         controller: 'MainCtrl'*/
                    }
                }
            })

            //Auth

            .state('app.activate', {
                url: '/activate',
                views: {
                    'menuContent': {
                        templateUrl: 'template/activate.html',
                        controller: 'AuthCtrl'
                    }
                }
            })

            .state('app.profile', {
                url: '/profile',
                views: {
                    'menuContent': {
                        /* templateUrl: 'template/profile.html',
                         controller: 'profileController' */
                        templateUrl: 'template/profile/profile.html',
                        controller: 'profileController'
                    }
                }
            })

            .state('app.login', {
                url: '/login',
                css: 'template/authentication/login.css',
                views: {
                    'menuContent': {
                        /*templateUrl: 'template/login.html',
                         controller: 'AuthCtrl'*/
                        templateUrl: 'template/authentication/login.html',
                        controller: 'authController'
                    }
                }
            })
            .state('app.register', {
                url: '/register',
                css: 'template/authentication/register.css',
                views: {
                    'menuContent': {
                        templateUrl: 'template/authentication/register.html',
                        controller: 'authController'
                        /*templateUrl: 'template/register.html',
                         controller: 'AuthCtrl'*/
                    }
                }
            })

            //

            .state('app.contact', {
                url: '/contact',
                views: {
                    'menuContent': {
                        templateUrl: 'template/contacts/contact_main.html',
                        controller: 'contactController'
                    }
                }
            })
            .state('app.contact.info', {
                url: '/info',
                views: {
                    'contact-info': {
                        templateUrl: 'template/contacts/contact_info.html',
                        controller: 'contactController'
                    },
                }
            })

            .state('app.contact.forms', {
                url: '/forms',
                views: {
                    'contact-forms': {
                        templateUrl: 'template/contacts/contact_forms.html',
                        controller: 'contactController'
                    },
                }

            })

            .state('app.gallery', {
                url: '/gallery',
                views: {
                    'menuContent': {
                        templateUrl: 'template/gallery/gallery.html',
                        /*controller: 'Gallery'*/
                        controller: 'galleryController'
                    }
                }
            })
            .state('app.downloads', {
                url: '/downloads',
                views: {
                    'menuContent': {
                        templateUrl: 'template/downloads/downloads.html',
                        controller: 'downloadCtrl'
                    }
                }
            })
            .state('app.video_detail', {
                url: '/video_detail/:video_file',
                views: {
                    'menuContent': {
                        templateUrl: 'template/videos/view_video.html',
                        controller: 'VideoCtrl'
                    }
                }
            })
            .state('app.sampleGallery', {
                url: '/sampleGallery',
                views: {
                    'menuContent': {
                        templateUrl: 'template/zoom_sample.html',
                        controller: 'Gallery'
                    }
                }
            })
            .state('app.music', {
                url: '/music',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'template/music_main.html',
                        controller: 'playlistController'
                    }
                }
            })

            .state('app.lyrics', {
                url: '/lyrics/:lyrics_detail_id',
                views: {
                    'menuContent': {
                        templateUrl: 'template/lyrics/lyrics_detail.html',
                        controller: 'lyricsController'
                    }
                }
            })
            .state('app.music.playList', {
                url: '/playList',
                cache: false,
                views: {
                    'music-playlist': {
                        //templateUrl: 'template/play_list.html',
                        templateUrl: 'template/playlist/playlist.html',
                        controller: 'playlistController'
                    }
                }
            })
            .state('app.music.albums', {
                url: '/albums',
                cache: false,
                views: {
                    'music-albums': {
                        /*templateUrl: 'template/music_albums.html',
                         controller: 'MusicCtrl'*/
                        templateUrl: 'template/albums/album.html',
                        controller: 'albumController'
                    }
                }
            })
            .state('app.music.lyrics', {
                url: '/lyrics',
                views: {
                    'music-lyrics': {
                        /*templateUrl: 'template/lyrics.html',
                         controller: 'MusicCtrl'*/
                        templateUrl: 'template/lyrics/lyrics.html',
                        controller: 'lyricsController'
                    }
                }
            })

            .state('app.videolist', {
                url: '/videolist',
                cache:false,
                views: {
                    'menuContent':{
                        templateUrl: 'template/videos/video_main.html',
                        controller: 'musicVideosController'
                    }
                }

            })

            //Test
            .state('app.videolist.general_videos', {
                url: '/general_videos',
                cache: false,
                views: {
                    'general_videos':{
                        /*templateUrl: 'template/video.html',
                         controller: 'VideoListCtrl'*/
                        templateUrl: 'template/general_videos/general_videos.html',
                        controller: 'genVideosController'

                    }
                }

            })
            .state('app.videolist.music_videos', {
                url: '/music_videos',
                cache:false,
                views: {
                    'music-videos':{
                        templateUrl: 'template/music_videos/music_videos.html',
                        controller: 'musicVideosController'
                        /*templateUrl: 'template/music_videos.html',
                         controller: 'VideoListCtrl'*/
                    }
                }

            })
            //Test ends
            .state('app.videoview', {
                url: '/videoView/:url',
                views: {
                    'menuContent':{
                        templateUrl: 'template/videos/video_details.html',
                        controller: 'videoController'
                        /* templateUrl: 'template/video_detail.html',
                         controller: 'VideoCtrl'*/
                    }
                }

            })
            .state('app.chats', {
                url: '/chat',
                views: {
                    'menuContent': {
                        templateUrl: 'template/chats/chats.html',
                        controller: 'chatController'
                        /*templateUrl: 'template/chats.html',
                         controller: 'ChatCtrl'*/

                    }
                }
            })
            .state('tabs.contact', {
                url: '/contact',
                views: {
                    'contact-tab': {
                        templateUrl: 'templates/contact.html'
                    }
                }
            });


        //$urlRouterProvider.otherwise('/app/login');
        //$urlRouterProvider.otherwise('app/login');

        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go("app.login");
        });

    });




