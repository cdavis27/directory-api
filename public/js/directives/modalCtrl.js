'use strict';

angular.module('directoryApp.directives')
.controller('ModalCtrl', ['$scope', '$modalInstance', '$http',
function ($scope, $modalInstance, $http) {

  $scope.school = undefined;

  $scope.createSchool = function(school) {
  $http.post('/api/schools', school).
    then(function(res) {
      console.log('added school success');
    }, function(res) {
      console.log('added school fail');
    });

    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  }

}]);
