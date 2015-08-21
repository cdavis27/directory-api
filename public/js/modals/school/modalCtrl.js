'use strict';

angular
.module('directoryApp.modals')
.service('SchoolModal',
[        '$modal', '$q',
function ($modal,   $q) {

    this.show = function(school) {
        var deferred = $q.defer();

        var modal = $modal.open({
            templateUrl: 'js/modals/school/modal.html',
            controller: 'SchoolModalCtrl',
            backdrop: 'static',
            keyboard: false,
            windowClass: 'login-modal',
            resolve: {
                currentSchool: function() { return school }
            }
        });

        modal.result.then(function(data) {
            deferred.resolve(data);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };
}])

.controller('SchoolModalCtrl',
[        '$scope','$modalInstance','$http','currentSchool','School',
function ($scope,  $modalInstance,  $http,  currentSchool,  School) {

  if (currentSchool) {
    $scope.school = currentSchool;
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

    School.create(mySchool).then(function(school) {
      $modalInstance.close(school);
    }, function(err) {
      console.error('added school fail', err);
    });
  };

  var edit = function(school) {

    School.update(school).then(function(school) {
      $modalInstance.close(school);
    }, function(err) {
      console.error('PUT\'ing school failed', err);
    });
  };

}]);
