'use strict';

angular
.module('directoryApp.directives')
.directive('daFocus', ['$parse', '$timeout', function($parse, $timeout){
    return {
        link: function($scope, iElm, iAttrs, controller) {
            var model = $parse(iAttrs.daFocus);
            var unwatch = $scope.$watch(model, function(value) {
                if(value === true) {
                    $timeout(function() {
                        iElm[0].focus(); 
                    });
                    unwatch();
                }
            });
        }
    };
}])