'use strict';

angular
.module('directoryApp.modals')
.service('LoginModal',
[        '$modal', '$q',
function ($modal,   $q) {

    this.show = function() {
        var deferred = $q.defer();

        var modal = $modal.open({
            templateUrl: 'js/modals/login/modal.html',
            controller: 'LoginModalCtrl',
            backdrop: 'static',
            keyboard: false,
            windowClass: 'login-modal',
        });

        modal.result.then(function(data) {
            deferred.resolve(data);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }
}])

.controller('LoginModalCtrl',
[        '$scope','$modalInstance','$http',
function ($scope,  $modalInstance,  $http) {

    $scope.user = {};
    $scope.error = undefined;

    $scope.login = function(user) {
        // try a login
        $http({
            method: 'POST',
            url: '/api/authenticate',
            data: user
        }).then(function(response) {
            $modalInstance.close(response.data.token)
        }, function(err) {
            console.error('Uh oh!', err);
            $scope.error = err;
        });
    };

}]);
