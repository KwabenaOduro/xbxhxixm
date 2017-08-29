0/**
 * Created by oduro on 12/24/2016.
 */

App.factory('apiService', ['$http', '$log','AppConstants', function($http, $log,AppConstants,$window,$ionicPopup,showAlertService){
    var apiService = {};

    //chats queries
    apiService.sendChat = function(data,resp){
        $http.post(AppConstants.SERVER_ENDPOINT+'send_chat',data).then(function(responds){

            resp(responds.data);

        }),function(error){
            $log.error("ERROR occurred");
            resp(error.status);
        }

    },
    //
        apiService.activate = function(data,resp){
            $http.post(AppConstants.SERVER_ENDPOINT+'activate',data).then(function(responds){

                resp(responds.data);

            }),function(error){
                $log.error("ERROR occurred");
                resp(error.status);
            }

        },

    apiService.getFeeds = function(resp){
        $http.get(AppConstants.SERVER_ENDPOINT+'get_feeds').then(function(responds){

            resp(responds.data);

        }),function(error){

            $log.error("ERROR occurred");
            resp(error.status);
        }

    },
        //make payment
        apiService.smakePayment = function(data,resp){
            $http.post(AppConstants.SERVER_ENDPOINT+'subscribe',data).then(function(responds){

                resp(responds.data);

            }),function(error){

                $log.error("ERROR occurred");
                resp(error.status);
            }

        },
        apiService.makePayment = function(data,resp){
            $http.post(AppConstants.SERVER_ENDPOINT+'make_payment',data).then(function(responds){

                resp(responds.data);

            }),function(error){

                $log.error("ERROR occurred");
                resp(error.status);
            }

        },
        apiService.paySubscription = function(data,resp){
            $http.post(AppConstants.SERVER_ENDPOINT+'subscribe',data).then(function(responds){

                resp(responds.data);

            }),function(error){

                $log.error("ERROR occurred");
                resp(error.status);
            }

        },



        //Update profile

        apiService.updateProfile = function(data,resp){
            $http.post(AppConstants.SERVER_ENDPOINT+'update_profile',data).then(function(responds){

                resp(responds.data);

            }),function(error){

                $log.error("ERROR occurred");
                resp(error.status);
            }

        },

        apiService.getSubscriptionService = function(index){
            switch (index) {
                case 0:
                    return "daily";
                    break;
                case 1:
                    return "weekly";
                    break;
                case 2:
                    return "monthly";
                    break;
            }

        },
        apiService.getAudioMimeType = function(ext){
            switch (ext) {
                case 'mp2':
                    return "audio/mpeg";
                    break;
                case 'mp3':
                    return "audio/mpeg3";
                    break;
                case 'aac':
                    return "audio/aac";
                    break;
                case 'wav':
                    return "audio/wav";
                    break;
            }

        },
        apiService.getAmountPerSubscription = function(index){
            switch (index) {
                case 0:
                    return 0.50;
                    break;
                case 1:
                    return 1.50;
                    break;
                case 2:
                    return 4.50;
                    break;
            }

        },

        apiService.getDownloadVendorType = function(index){
            switch (index) {
                case 0:
                    return "MTN";
                    break;
                case 1:
                    return "VODAFONE";
                    break;
                case 2:
                    return "TIGO";
                    break;
                case 3:
                    return "AIRTEL";
                    break;
                case 4:
                    return "VISA/MASTERCARD";
                    break;

            }

        },

        apiService.getVendorType = function(index){
            switch (index) {
                case 0:
                    return "air_time";
                    break;
                case 1:
                    return "MTN";
                    break;
                case 2:
                    return "VODAFONE";
                    break;
                case 3:
                    return "TIGO";
                    break;
                case 4:
                    return "AIRTEL";
                    break;
                case 5:
                    return "VISA/MASTERCARD";
                    break;

            }

        },

        //



        apiService.downloadSong = function(data,resp){
            $http.get(AppConstants.SERVER_ENDPOINT+'download_song/'+data.song_id+'/'+data.user_id).then(function(responds){
                $log.log(responds.data);
                resp(responds.data);

            }),function(error){

                $log.error("ERROR occurred");
                resp(error.status);
            }

        },

        apiService.getSongFile = function(song_url){
            window.open(song_url, '_blank', 'location=yes');

        },






        //

        apiService.getSongs = function(resp){
            $http.get(AppConstants.SERVER_ENDPOINT+'get_songs').then(function(responds){

                resp(responds.data);

            }),function(error){

                $log.error("ERROR occurred");
                resp(error.status);
            }

        },
        apiService.getAlbums = function(resp){
            $http.get(AppConstants.SERVER_ENDPOINT+'get_albums').then(function(responds){

                resp(responds.data);

            }),function(error){

                $log.error("ERROR occurred");
                resp(error.status);
            }

        },
        apiService.getAlbums = function(resp){
            $http.get(AppConstants.SERVER_ENDPOINT+'get_albums').then(function(responds){

                resp(responds.data);

            }),function(error){

                $log.error("ERROR occurred");
                resp(error.status);
            }

        },
        apiService.getAlbums = function(resp){
            $http.get(AppConstants.SERVER_ENDPOINT+'get_albums').then(function(responds){
                resp(responds.data);
            }),function(error){
                $log.error("ERROR occurred");
                resp(error.status);
            }

        },
        apiService.getAlbumSongs = function(id,resp){
            $http.get(AppConstants.SERVER_ENDPOINT+'get_album_songs/'+id).then(function(responds){
                resp(responds.data);
            }),function(error){
                $log.error("ERROR occurred");
                resp(error.status);
            }

        },

        apiService.checkSubscription = function(id,resp){
            $http.get(AppConstants.SERVER_ENDPOINT+'check_subscribe/'+id).then(function(responds){
                resp(responds.data);
            }),function(error){
                $log.error("ERROR occurred");
                resp(error.status);
            }

        },





    apiService.getChats = function(resp){
        $http.get(AppConstants.SERVER_ENDPOINT+'get_chats').then(function(responds){
            resp(responds.data);
        }),function(error){
            $log.error("ERROR occurred");
            resp(error.status);
        }

    }


        apiService.getImages = function(resp){
        $http.get(AppConstants.SERVER_ENDPOINT+'get_images').then(function(responds){
            resp(responds.data);
        }),function(error){
            $log.error("ERROR occurred");
            resp(error.status);
        }

    }
    apiService.viewImage = function(image_id,resp){
        $http.get(AppConstants.SERVER_ENDPOINT+'view_image/'+image_id).then(function(responds){
            resp(responds.data);
        }),function(error){
            $log.error("ERROR occurred");
            resp(error.status);
        }

    }

    apiService.viewVideo = function(video_id,resp){
        $http.get(AppConstants.SERVER_ENDPOINT+'view_video/'+video_id).then(function(responds){
            resp(responds.data);
        }),function(error){
            $log.error("ERROR occurred");
            resp(error.status);
        }

    }

    apiService.getAllVideos = function(resp){
        $http.get(AppConstants.SERVER_ENDPOINT+'get_videos').then(function(responds){
            resp(responds.data);
        }),function(error){
            $log.error("ERROR occurred");
            resp(error.status);
        }

    }

    apiService.getGeneralVideos = function(resp){
        $http.get(AppConstants.SERVER_ENDPOINT+'get_general_videos').then(function(responds){
            resp(responds.data);
        }),function(error){
            $log.error("ERROR occurred");
            resp(error.status);
        }

    }

    //Lyrics

    apiService.getAllLyrics = function(resp){
        $http.get(AppConstants.SERVER_ENDPOINT+'get_lyrics').then(function(responds){
            resp(responds.data);
        }),function(error){
            $log.error("ERROR occurred");
            resp(error.status);
        }

    },
        apiService.getSongLyrics = function(data,resp){
            $http.get(AppConstants.SERVER_ENDPOINT+'song_lyrics/'+data).then(function(responds){
                resp(responds.data);
            }),function(error){
                $log.error("ERROR occurred");
                resp(error.status);
            }

        }

        apiService.sendContact = function(data,resp){
            $http.post(AppConstants.SERVER_ENDPOINT+'send_contact',data).then(function(responds){
                resp(responds.data);
            }),function(error){
                $log.error("ERROR occurred");
                resp(error.status);
            }

        }



        //headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}

    apiService.loginUser = function(data,resp){
        $http.post(AppConstants.SERVER_ENDPOINT+'auth_login',data).then(function(responds){

            resp(responds.data);
        }),function(error){
            $log.error("ERROR occurred");
            resp(error.status);
        }

    }
    apiService.registerUser = function(data,resp){
        $http.post(AppConstants.SERVER_ENDPOINT+'auth_register',data).then(function(responds){
            resp(responds.data);
        }),function(error){
            $log.error("ERROR occurred");
            resp(error.status);
        }

    }
    apiService.feedDetails = function(data,resp){
        $http.get(AppConstants.SERVER_ENDPOINT+'feed_details/'+data).then(function(responds){
            resp(responds.data);
        }),function(error){
            $log.error("ERROR occurred");
            resp(error.status);
        }

    }
    return apiService ;
}]);



