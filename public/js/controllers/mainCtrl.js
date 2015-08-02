'use strict';

angular.module('directoryApp.controllers')
.controller('MainCtrl', ['$scope', '$modal',
function ($scope, $modal) {

  $scope.openModal = function () {
    var modalInstance = $modal.open ({
      templateUrl: 'js/directives/modal.html',
      controller: 'ModalCtrl'
    });
  }


}]);
