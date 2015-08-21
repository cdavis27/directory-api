'use strict';

angular.module('directoryApp.controllers')
.controller('MainCtrl',
[        '$scope','$modal','$http','SweetAlert',
function ($scope,  $modal,  $http,  SweetAlert) {

  $scope.schools = [];

  $http.get('/api/schools').
  then(function(res) {
    $scope.schools = res.data;
    console.log(res);

  }, function(res) {
    console.log('got schools fail');
  });

  $scope.openModal = function () {
    var modalInstance = $modal.open ({
      templateUrl: 'js/directives/modal.html',
      controller: 'ModalCtrl'
    });

    modalInstance.result.then(function (result) {
         console.log(result.data);
         $scope.schools.push(result.data);
    });
  };

  $scope.edit = function(school) {

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
    $http.delete('/api/schools/' + id);

    for (var i=0; i<$scope.schools.length; i++) {
      if ($scope.schools[i]._id === id) {
        $scope.schools.splice(i, 1);
      }
    }
  };



}]);
