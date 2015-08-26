'use strict';

angular.module('directoryApp.controllers')
.controller('MainCtrl',
[        '$scope','$http','SweetAlert','User','School','SchoolModal',
function ($scope,  $http,  SweetAlert,  User,  School,  SchoolModal) {

  $scope.schools = [];

  User.onLogin(function() {
    School.getList().then(function(schools) {
      $scope.schools = schools;
    });
  });

  User.showLogin();

  $scope.create = function () {
    SchoolModal.show().then(function(school) {
      console.log('new', school);
      $scope.schools.push(school);
    });
  };

  $scope.edit = function(school) {
    // Create a deep copy
    var mySchool = {};
    angular.copy(school, mySchool);

    SchoolModal.show(mySchool).then(function(school) {
      console.log('edit', school);
      updateSchool(school);
    });
  };

  $scope.delete = function(school) {
    SweetAlert.swal({
       title: "Are you sure?",
       text: "This will remove this school from the list",
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: "#DD6B55",
       confirmButtonText: "Yes, delete it!",
       closeOnConfirm: false
    }, 
    function(isConfirm) {
      if (isConfirm) {
        removeSchool(school._id);
        SweetAlert.swal('Deleted!', 'School removed.', 'success');
        return true;
      } else {
        return false;
      }
    });
  };

  var removeSchool = function(id) {
    School.delete(id);

    var index = findSchoolById(id);
    if (index > -1) $scope.schools.splice(index, 1);
  };

  var updateSchool = function(school) {
    var index = findSchoolById(school._id);
    if (index > -1) $scope.schools.splice(index, 1, school);
  };

  var findSchoolById = function(id) {
    for (var i=0; i<$scope.schools.length; i++) {
      if ($scope.schools[i]._id === id) {
        return i;
      }
    }
    return -1;
  };



}]);
