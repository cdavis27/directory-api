'use strict';

angular.module('directoryApp.directives')
.controller('ModalCtrl', ['$scope', '$modalInstance',
function ($scope, $modalInstance) {

  $scope.school = undefined;

  console.log("here");

  $scope.createSchool = function(school) {
  // $http.POST('/api/schools', )
  };

}]);
