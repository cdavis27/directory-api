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
            keyboard: true,
            windowClass: 'school-modal',
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
    $scope.school = { contacts: [] };
    $scope.edit = false;
    $scope.buttonText = 'ADD';
    $scope.title = 'Create New School';
  }

  if ($scope.school && !$scope.school.contacts.length) {
    // there are no contacts, leave a placeholder
    $scope.school.contacts.push({});
  }

  $scope.buttonClick = function(school) {
    if ($scope.edit) edit(school);
    else             create(school);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  $scope.addContact = function() {
    var lastIndex = $scope.school.contacts.length-1;
    if ($scope.school.contacts[lastIndex].name || $scope.school.contacts[lastIndex].position) {
      $scope.school.contacts.push({});
    }
  };
  
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
    console.log(school);

    School.update(school).then(function(response) {
      $modalInstance.close(school);
    }, function(err) {
      console.error('PUT\'ing school failed', err);
    });
  };

}]);