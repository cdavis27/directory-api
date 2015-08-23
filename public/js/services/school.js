'use strict';

angular.module('directoryApp.services')
.provider('School', function() {
this.$get = ['$q','$http','User',
    function ($q,  $http,  User) {

        return {
            getList: function() {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: '/api/schools',
                    headers: {
                        'x-access-token': User.getToken()
                    }
                }).then(function(response) {
                    deferred.resolve(response.data);
                });

                return deferred.promise;
            },
            create: function(school) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: '/api/schools',
                    headers: {
                        'x-access-token': User.getToken()
                    },
                    data: school
                }).then(function(response) {
                    deferred.resolve(response.data);
                });

                return deferred.promise;
            },
            update: function(school) {
                var deferred = $q.defer();

                $http({
                    method: 'PUT',
                    url: '/api/schools/' + school._id,
                    headers: {
                        'x-access-token': User.getToken()
                    },
                    data: school
                }).then(function(response) {
                    deferred.resolve(response.data);
                });

                return deferred.promise;
            },
            delete: function(id) {
                var deferred = $q.defer();

                $http({
                    method: 'DELETE',
                    url: '/api/schools/' + id,
                    headers: {
                        'x-access-token': User.getToken()
                    }
                }).then(function(response) {
                    deferred.resolve(response.data);
                });

                return deferred.promise;
            }
        }
    }];
});