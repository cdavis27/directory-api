'use strict';

angular.module('directoryApp.directives')
.controller('ModalCtrl', ['$scope', '$modalInstance', '$http',
function ($scope, $modalInstance, $http) {

  $scope.school = undefined;

  $scope.createSchool = function(school) {
  // Create a deep copy
  var mySchool = {};
  angular.copy(school, mySchool);

  // Validation
  mySchool.enrollment = parseInt(mySchool.enrollment);

  $http.post('/api/schools', mySchool).
    then(function(res) {
      $modalInstance.close(res);
    }, function(res) {
      console.log('added school fail');
    });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  }

}]);
