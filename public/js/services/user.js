'use strict';

angular.module('directoryApp.services')
.provider('User', function() {
this.$get = ['LoginModal',
    function (LoginModal) {

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

        return {
            onLogin: function(callback) {
                register(callback);
            },
            getToken: function() {
                return _token;
            },
            showLogin: function() {
                LoginModal.show().then(function(token) {
                    // store the token
                    _token = token;

                    // call all the callbacks!
                    flush();
                });
            }
        };
    }];
})