'use strict';

angular
.module('directoryApp.modals')
.service('PictureModal',
[        '$modal', '$q',
function ($modal,   $q) {

  this.show = function(contact) {
    var deferred = $q.defer();

    var modal = $modal.open({
      templateUrl: 'js/modals/picture/modal.html',
      controller: 'PictureModalCtrl',
      keyboard: true,
      windowClass: 'picture-modal',
      resolve: {
        contact: function() { return contact }
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

.controller('PictureModalCtrl',
[        '$scope','$modalInstance','contact',
function ($scope,  $modalInstance,  contact) {

  $scope.images = {
    original: undefined,
    cropped: '' // <-- for some reason ngImageCrop requires an empty string
  }

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  $scope.crop = function(picture) {
    $modalInstance.close(picture);
  };

}]);