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
.directive('daEnter', [function(){
    return {
        link: function($scope, iElm, iAttrs, controller) {
            iElm.bind('keypress', function(e) {

                // If there is an attr, eval it
                if (iAttrs.daEnter !== 'da-enter') {
                    $scope.$apply(function() {
                      $scope.$eval(iAttrs.daEnter);
                    });  
                }

                e.preventDefault();

            });
        }
    };
}])