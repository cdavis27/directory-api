'use strict';

angular.module('directoryApp.services')
.provider('User', function() {
this.$get = ['$http','LoginModal','localStorageService',
    function ($http,  LoginModal, localStorage) {

        var LS_KEY = 'jwt';

        var _callbacks = [];
        var _token;

        var register = function(cb) {
            if (_token) cb();
            else _callbacks.push(cb);
        };

        var flush = function() {
            for (var i=0; i<_callbacks.length; i++) {
                _callbacks[i]();
            }
        };

        var successfulLogin = function(token) {
            // Save the token
            storeToken(token);

            // call all the callbacks!
            flush();
        };

        var storeToken = function(token) {
            // store the token locally
            _token = token;

            // store in the browser for later
            localStorage.set(LS_KEY, token);
        };

        var openModal = function() {
            LoginModal.show().then(successfulLogin);
        };

        return {
            onLogin: function(callback) {
                register(callback);
            },
            getToken: function() {
                return _token;
            },
            showLogin: function() {
                var token;
                // Before showing the modal, let's make sure that it's needed
                if (token = localStorage.get(LS_KEY)) {
                    
                    // verify our JWT with the server
                    $http({
                        method: 'GET',
                        url: '/api/verify',
                        headers: {
                            'x-access-token': token
                        }
                    }).then(function(response) {
                        successfulLogin(token);
                    }, function(err) {
                        // our token was invalid! Make the user login again
                        openModal();
                    });
                } else {
                    // It's needed. Let the user login.
                    openModal();
                }
            }
        };
    }];
})