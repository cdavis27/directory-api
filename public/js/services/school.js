'use strict';

angular.module('directoryApp.services')
.provider('School', function() {
this.$get = ['$q','$http','User',
    function ($q,  $http,  User) {

        var UPLOADS_DIR = '/uploads'

        var jsonMethods = {
            post: function(school) {
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
            get: function(id) {
                var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: '/api/schools' + ((id) ? ('/'+id) : ''),
                    headers: {
                        'x-access-token': User.getToken()
                    }
                }).then(function(response) {
                    deferred.resolve(response.data);
                });

                return deferred.promise;
            },
            put: function(school) {
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
        };

        var fdMethods = {
            createFD: function(prefix, contacts) {
                var fd = new FormData();

                for (var i=0; i<contacts.length; i++) {
                    if (isDataURI(contacts[i].img)) {
                        var value = dataURItoBlob(contacts[i].img);
                        var filename = createFilename(prefix, contacts[i].name)
                        console.log(filename);
                        fd.append('picture', value, filename);
                    }
                }

                return fd;
            },
            post: function(prefix, contacts) {
                var deferred = $q.defer();

                // Create form data from the contacts, with a school prefix
                var fd = this.createFD(prefix, contacts);

                $http.post('/api/pictures', fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'x-access-token': User.getToken(),
                        'Content-Type': undefined
                    }
                }).success(function(data){
                    deferred.resolve(data);
                }).error(function(data){
                    deferred.reject(data);
                });

                return deferred.promise;
            }
        };

        var imagify = function(school) {
            // change all data URIs to paths and
            // post the images separately
            if (hasDataURIs(school)) {
                // post images
                fdMethods.post(school.name, school.contacts);

                // change Data URIs to paths
                renameDataURIs(school);
            }

            return school;
        };

        var renameDataURIs = function(school) {
            for (var i=0; i<school.contacts.length; i++) {
                if (isDataURI(school.contacts[i].img)) {
                    school.contacts[i].img = createFilename(school.name, school.contacts[i].name, true);
                }
            }
        };

        var createFilename = function(prefix, name, includeDir) {
            prefix = prefix.replace(/\s+/g, '-').toLowerCase();
            name = name.replace(/\s+/g, '-').toLowerCase();
            if (includeDir) prefix = UPLOADS_DIR + '/' + prefix;
            return prefix + '-' + name + '.png';
        }

        var hasDataURIs = function(school) {
            for (var i=0; i<school.contacts.length; i++) {
                if (isDataURI(school.contacts[i].img)) return true;
            }
            return false;
        };

        var isDataURI = function(string) {
            var regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
            return regex.test(string);
        };

        var dataURItoBlob = function(dataURI) {
            var byteString = atob(dataURI.split(',')[1]);

            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++)
            {
                ia[i] = byteString.charCodeAt(i);
            }

            var bb = new Blob([ab], { "type": mimeString });
            return bb;
        }

        return {
            getList: function() {
                return jsonMethods.get();
            },
            create: function(school) {
                return jsonMethods.post(imagify(school));
            },
            update: function(school) {
                return jsonMethods.put(imagify(school));
            },
            delete: function(id) {
                return jsonMethods.delete(id);
            }
        }
    }];
});