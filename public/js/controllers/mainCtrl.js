'use strict';

angular.module('directoryApp.controllers')
.controller('MainCtrl', ['$scope', '$modal', '$http',
function ($scope, $modal, $http) {

  $scope.schools = [];

  $http.get('/api//schools').
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
  }


}]);
