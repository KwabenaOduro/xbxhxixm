/**
 * Created by Gideon Paitoo on 3/22/2016.
 */
(function() {
    var bulkvoteid = 0;
    var url = 'https://scoopms.com';
    var artistdup = '';
    var bck;
    var tempProject =[];
    var tempVideo = [];
    var app = angular.module('smc', [])

        .controller('Gallery',function($scope,ImageGalleryService,apiService,$ionicModal,$ionicSlideBoxDelegate,$ionicScrollDelegate){
            $scope.gallery = function () {
                $scope.loader = true
                apiService.getImages(function (response) {
                    $scope.data = response.category_image;
                    $scope.loader = false;
                    $scope.theme = 'gallery';
                })
            }

        })
        //main controller

        .controller('VidCtrl', function ($scope,$ionicHistory,$state,$location,LeftMenuService,ListViewGoogleCardService,apiService,$window,$sce,$ionicPlatform) {
            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            };
            $(document).ready(function(){
                screen.lockOrientation('landscape');
                window.StatusBar.hide();
                var video_url = 'http://stonebwoy.mhitzgh.com/files/videos/' +$state.params['video_file'];
                $scope.video = video_url;
                //Handle Video Orientation
                var deregister = $ionicPlatform.registerBackButtonAction(
                    function () {
                        history.back();
                        screen.unlockOrientation();
                    }, 100
                );
                //var aud = document.getElementById("video-player");
                var vid = angular.element(document.querySelector( '#video-player' ));
                vid.onended = function() {
                    history.back();
                    screen.unlockOrientation();

                };
                $scope.$on('$destroy', deregister);

                //end

            })


        })

        .controller('MainCtrl', function ($scope,$ionicHistory,$state,$location,LeftMenuService,ListViewGoogleCardService,apiService,$window,$css) {
            ionic.Platform.ready( function() {
                if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
            });

            $scope.news_feed = function () {
                $scope.loader = true;
                apiService.getFeeds(function (response) {
                    $scope.data = response;
                    $scope.loader = false;

                })
                $scope.theme = 'news_feed';
            }
            $scope.viewFeed = function () {
                $scope.loader = true;
                apiService.feedDetails($state.params['id'],function (response) {
                    $scope.data = response.feed_details;
                    $scope.loader = false;
                    $scope.theme = 'feed_details';

                })

                $scope.theme = 'news_feed';
            }

            $scope.initLeftMenu = function () {
                $scope.items = LeftMenuService.getDataForLayout4();
                $scope.theme = 'menu';

            }

            //menuControllerEnds

        })


        //

        //contact Controller
        .controller('contactCtrl',function($scope,LoginAndRegisterService){
            $scope.loader = false;
            $scope.contactForms = function () {
                $scope.theme = 'layout2';
                $scope.data = LoginAndRegisterService.getRegisterDataForLayout2();
            }

        })
        //contact controller ends
        .controller('MusicCtrl', ['$scope','ngAudio','$interval','ListViewExpandableService','ParallaxService','apiService','$css','$state','$stateParams','$cordovaToast', function($scope,ngAudio,$interval,ListViewExpandableService,ParallaxService,apiService,$state,$stateParams, $cordovaToast) {
            $scope.$on('$ionicView.loaded', function() {
                ionic.Platform.ready( function() {
                    if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
                });
            });

            $scope.music_albums = function () {
                $scope.loader = true;
                $scope.theme ='albums';
                apiService.getAlbums(function (response) {
                    $scope.data = response.albums;
                    $scope.loader = false;
                })
            }
            $scope.lyrics = function () {
                $scope.loader = true;
                $scope.theme ='lyrics';
                apiService.getAllLyrics(function (response) {
                    $scope.data = response.result;
                    $scope.loader = false;
                })

            }

            $scope.getSongs = function () {
                $scope.loader = true;
                $scope.theme = 'layout1';
                apiService.getSongs(function (response) {
                    $scope.data = response.songs;
                    $scope.loader = false;

                })
            }

        }])

        .controller("VideoListCtrl",function ($scope,ListViewStickyHeaderService,ListViewDragAndDropService,$ionicHistory,ParallaxService,$css,apiService,$sce,$state,$window,$ionicLoading) {


            $scope.videos = function () {
                $scope.loader = true;
                $scope.theme = 'videos';
                apiService.getGeneralVideos(function (response) {
                    $scope.data = response.videos;
                    $scope.loader = false;
                })

            }
            $scope.musicVideos = function () {
                $scope.loader = true;
                $css.add('css/music_videos.css');
                $scope.theme ='Layout2';
                apiService.getAllVideos(function (response) {
                    $scope.data = response.videos;
                    $scope.loader = false;

                })
            }
        })

        .controller("VideoCtrl_old",["$scope","$timeout","video",'$stateParams', '$sce','$ionicPlatform',function($scope, $timeout, video,$stateParams, $sce, $ionicPlatform,ListViewStickyHeaderService){
            var user_data = JSON.parse(window.localStorage.getItem("logged_user"));
            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            };

            $scope.vid = '';
            $(document).ready(function(){
                screen.lockOrientation('landscape');
                window.StatusBar.hide();
                $scope.vid = "https://scoopms.com/bhim/" + $stateParams.url;
                $('.scroll').css('background-color', 'black');

            });

            var aud = document.getElementById("video-player");
            aud.onended = function() {
                history.back();
                screen.unlockOrientation();
            };

            var deregister = $ionicPlatform.registerBackButtonAction(
                function () {
                    history.back();
                    screen.unlockOrientation();
                }, 100
            );
            //Then when this scope is destroyed, remove the function
            $scope.$on('$destroy', deregister);

            $scope.playlistOpen = false;
            $scope.videos = {
                first:  'http://www.w3schools.com/html/mov_bbb.mp4',
                second: 'http://www.w3schools.com/html/movie.mp4'
            };

            $scope.playVideo = function playVideo(sourceUrl) {
                video.addSource('mp4', sourceUrl, true);
            };

            //handle subscriptions



        }])
        .controller('lyricsCtrl', function($scope, $stateParams, $ionicPopup, $timeout, $interval,apiService) {
            $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
                viewData.enableBack = true;
            });

            apiService.getSongLyrics($stateParams.lyrics_detail_id,function (response) {
                $scope.lyrics_data = response.result;

            });

            //alert($stateParams.lyrics_detail_id);
        })

        //Profile Controller

        .controller('profileControllerOld', function($scope, $stateParams, $ionicPopup,$ionicSideMenuDelegate,$cordovaDevice, $cordovaFile,ImageService,$cordovaCamera,$cordovaFileTransfer,AppConstants,showAlertService,apiService) {
            $scope.$on('$ionicView.enter', function(){
                $ionicSideMenuDelegate.canDragContent(false);
            });
            $scope.profile_fic = 'img/avatar/userDefaultIcon.png';
            $scope.preview = false;
            var user_data = JSON.parse(window.localStorage.getItem("logged_user"));
            $scope.profile = user_data;
            if(user_data.image){
                $scope.profile_fic = user_data.image
            }

            $scope.changeAvatar = function () {
                var options = ImageService.getOptions(1);
                $cordovaCamera.getPicture(options).then(function(imageBase64) {
                    window.resolveLocalFileSystemURL(imageBase64,function (e) {
                        $scope.imageUrl = e.nativeURL;
                        console.log($scope.imageUrl );
                    });
                    $scope.image = imageBase64;
                    if($scope.image){
                        $scope.image_status = 'changed';
                        $scope.preview = true;
                    }

                });

            }

            var uploadAvatar = function () {
                $scope.profile.image_status = $scope.image_status;
                var extension = $scope.imageUrl.split(".").pop();
                var filepart = Date.now();
                var filename = user_data.user_name+"_"+user_data.id+"_"+filepart+"."+extension;
                var options = {
                    fileKey: "image",
                    fileName: filename,
                    chunkedMode: false,
                    mimeType: "image/jpeg",
                };
                options.params = $scope.profile;
                $cordovaFileTransfer.upload(AppConstants.SERVER_ENDPOINT + "update_profile",$scope.imageUrl,options).then(function (result) {
                    var response = JSON.parse(result.response);
                    if(response.status === 'success'){
                        $scope.image_status = '';
                        showAlertService.show('Update was successful');
                        window.localStorage.clear();
                        window.localStorage.setItem("logged_user",JSON.stringify(response.result));
                    }

                }, function (err) {
                    // console.log("ERROR: " + JSON.stringify(err));
                }, function (progress) {

                });

            }


            $scope.updateProfile = function () {
                if($scope.image_status){
                    uploadAvatar();
                    return;
                }
                apiService.updateProfile($scope.profile,function (response) {
                    if(response.status === 'success'){
                        $scope.image_status = '';
                        showAlertService.show('Update was successful');
                        window.localStorage.clear();
                        window.localStorage.setItem("logged_user",JSON.stringify(response.result));
                    }
                })

            }


        })


        //

        //Auth Controller

        .controller('AuthCtrl', function($scope, $stateParams, $ionicPopup, $timeout, $interval,$pusher,apiService,ListViewSwipeToDismissService,WizardService,LoginAndRegisterService,$css,$ionicSideMenuDelegate,$state,$ionicSideMenuDelegate) {
            $scope.$on('$ionicView.enter', function(){
                $ionicSideMenuDelegate.canDragContent(false);
            });

            ionic.Platform.ready( function() {
                if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
            });
            $scope.login = function () {
                $scope.theme = 'login';
                $scope.data = LoginAndRegisterService.getLoginDataForLayout2();

            }
            $scope.activateLogin = function () {
                $scope.theme = 'activation';
                $scope.data = LoginAndRegisterService.getLoginDataForLayout4();

            }
            $scope.register = function () {
                $scope.theme = 'register';
                $scope.data = LoginAndRegisterService.getRegisterDataForLayout1();
            }
        })

        //

        .controller('ChatCtrl', function($scope, $stateParams, $ionicPopup, $timeout, $interval,$pusher,$http,apiService,ListViewSwipeToDismissService,WizardService,LoginAndRegisterService,Sounds,AppConstants,$cordovaFileTransfer,$cordovaMedia,ngAudio,$ionicScrollDelegate) {
            var user_data = JSON.parse(window.localStorage.getItem("logged_user"));
            $scope.audio_play = false;
            $scope.audio_message = false;
            $scope.loading_chats = true;
            $scope.spinner_audio = false;
            $scope.spinner = false;
            $scope.chat_data = [];
            var log_data;
            var promise;
            $scope.data = [];
            var playpos = 0;
            var avatar_directory = AppConstants.ROOT_DIRECTORY+'files/avatars/';
            var audio_directory = AppConstants.ROOT_DIRECTORY+'files/audio/';
            var default_avatar = 'https://www.roadwaytravels.com/img/userDefaultIcon.png';
            $scope.playMe = function (mediaUrl,alt,ind) {
                playpos = ind;
                $scope.audio = ngAudio.load(mediaUrl);
                if(alt == false){
                    $scope.audio.pause();
                    updateUi('pause',ind);
                    return
                }
                try{
                    $scope.audio.play()
                }catch (error){

                }

                updateUi('play',ind);
                promise = $interval(updateProgress,5000);
            }

            var updateProgress = function () {
                if($scope.audio.remaining === 0){
                    updateUi('pause',playpos);
                    $interval.cancel(promise);
                }

            }
            //handle update ui

            function updateUi(alt,ind) {
                $('.plplay').removeClass('text-active'); //show play
                $('.plpause').addClass('text-active'); // hide pause

                if(alt == 'pause'){
                    $('.mposp'+ ind).removeClass('text-active');
                    $('.mpospp'+ ind).addClass('text-active');
                    $('#gp').removeClass('text-active'); //show play
                    $('#gpp').addClass('text-active'); // show pause
                }else{
                    $('.mposp'+ ind).addClass('text-active');
                    $('.mpospp'+ ind).removeClass('text-active');
                    $('#gpp').removeClass('text-active'); // show pause
                    $('#gp').addClass('text-active'); //hide play
                }
            }
            //end update ui

            //handle chats downloads
            apiService.getChats(function (response) {
                $scope.chat_data = response.all_chats;
                angular.forEach($scope.chat_data, function(item){
                    log_data = {
                        'message': (item.message && item.message!= null)?item.message: false,
                        'audio_file': (item.user_audio && item.user_audio!= null)?audio_directory+item.user_audio: false,
                        'user_name':item.user_name,
                        'user_id': item.user_id,
                        'class': (messageIsMine(item.user_id)) ? 'right' : 'left',
                        'profile_pic': (item.user_avatar && item.user_avatar != null)? avatar_directory+item.user_avatar:default_avatar
                    }
                    this.push(log_data);

                },$scope.data)
                $scope.loading_chats = false;
                if($scope.data != null){
                    $ionicScrollDelegate.scrollBottom();
                }

            })
            $scope.notice = function () {
                $scope.data = WizardService.getDataForLayout5();
                $scope.theme = 'layout5';
            }

            $scope.Current_User = user_data.id;
            $scope.chat = {};
            var pusher = new Pusher('da8b9c6cf93be6f8cc18');
            var channel = pusher.subscribe('patrick-channel');
            channel.bind('pat-event', function (data) {
                $scope.audio_message = false;
                var chat_user = (data.chat[0].type && data.chat[0].type === 'audio') ? data.chat[0].user_id : data.chat.user_id;
                var default_avatar = 'https://www.roadwaytravels.com/img/userDefaultIcon.png';
                var message_class = (messageIsMine(chat_user)) ? 'right' : 'left';
                $scope.profile_pic = (user_data.image && user_data.image != null) ? user_data.image : default_avatar;
                if(data.chat[0].type && data.chat[0].type === 'audio'){
                    $scope.audio_message = true;
                    $scope.message_data = {
                        'audio_file': data.chat[0].audio_file,
                        'user_name': data.chat[0].user_name,
                        'user_id' : data.chat[0].user_id,
                        'class': message_class,
                        'profile_pic': (data.chat[0].image && data.chat[0].image != null) ? data.chat[0].image: default_avatar,
                    };
                }else{
                    $scope.message_data = {
                        'message': data.chat[0].message,
                        'user_name': data.chat.user_name,
                        'user_id': data.chat.user_id,
                        'class': message_class,
                        'profile_pic': (data.chat.image && data.chat.image != null) ? data.chat.image: default_avatar,
                    };
                }
                if($scope.message_data && $scope.message_data != null){
                    $scope.spinner = false;
                    $scope.spinner_audio = false;

                }
                $scope.data.push($scope.message_data);
                $timeout(function () {
                });
                $ionicScrollDelegate.scrollBottom();

            });
            $scope.sendChat = function () {
                $scope.spinner = true;
                $scope.chat.user_name = user_data.user_name;
                $scope.chat.user_id  = user_data.id;
                //$scope.chat.image  = user_data.image;
                apiService.sendChat($scope.chat, function (response) {
                    $scope.chat = {};
                    $scope.spinner = false;
                },function (error) {
                    showAlertService.show('sorry an error occurred');
                    $scope.spinner = false;

                })
            }

            var messageIsMine = function (user_details) {
                return $scope.Current_User === parseInt(user_details);

            }
            //handle audio
            $scope.sound = {name: ""};
            var captureError = function (e) {
                console.log('captureError', e);
                $scope.spinner_audio = false;
                showAlertService.show('sorry an error occurred');
            }

            var captureSuccess = function (e) {
                $scope.sound.file = e[0].localURL;
                $scope.sound.filePath = e[0].fullPath;
                saveSound();
            }

            $scope.recordAudio = function () {
                $scope.spinner_audio = true;
                navigator.device.capture.captureAudio(
                    captureSuccess, captureError, {duration: 10});
            }

            var saveSound = function () {
                var extension = $scope.sound.file.split(".").pop();
                var filepart = Date.now();
                var filename = user_data.user_name+"_"+user_data.id+"_"+filepart+"."+extension;
                var options = {
                    fileKey: "audio",
                    fileName: filename,
                    chunkedMode: false,
                    mimeType: "audio/aac"
                };
                options.params = user_data;
                $cordovaFileTransfer.upload(AppConstants.SERVER_ENDPOINT + "post_song", $scope.sound.file, options).then(function (result) {

                }, function (err) {
                    $scope.spinner_audio = false;
                    console.log('error');
                    console.log(err);
                }, function (progress) {

                });
                //end upload

            }


        })




})();


