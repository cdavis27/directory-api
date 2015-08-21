'use strict';

angular.module('directoryApp.directives')
.controller('ModalCtrl',
[        '$scope','$modalInstance','$http','school',
function ($scope,  $modalInstance,  $http,  school) {

  if (school) {
    $scope.school = school;
    $scope.edit = true;
    $scope.buttonText = 'UPDATE';
    $scope.title = 'Edit School';
  } else {
    $scope.school = undefined;
    $scope.edit = false;
    $scope.buttonText = 'ADD';
    $scope.title = 'Create New School';
  }

  $scope.buttonClick = function(school) {
    if ($scope.edit) edit(school);
    else             create(school);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  }
  
  // ---------------------------------------------
  // Private Methods
  // ---------------------------------------------

  var create = function(school) {
  // Create a deep copy
  var mySchool = {};
  angular.copy(school, mySchool);

  // Validation
  mySchool.enrollment = ~~parseInt(mySchool.enrollment);

  $http.post('/api/schools', mySchool).
    then(function(res) {
      $modalInstance.close(res);
    }, function(res) {
      console.error('added school fail', res);
    });
  };

  var edit = function(school) {

    $http.put('/api/schools/' + school._id, school).
      then(function(res) {
        $modalInstance.close(res);
      }, function(res) {
        console.error('PUT\'ing school failed', res);
      })
  };

}]);
