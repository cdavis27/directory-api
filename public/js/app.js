'use strict';

angular.module('directoryApp.controllers', []);
angular.module('directoryApp.modals', []);
angular.module('directoryApp.services', []);
angular.module('directoryApp.directives', []);

angular
.module('directoryApp', [
    'ui.bootstrap',
    'ngRoute',
    'oitozero.ngSweetAlert',
    'LocalStorageModule',
    'ngImgCrop',
    'directoryApp.controllers',
    'directoryApp.services',
    'directoryApp.modals',
    'directoryApp.directives'
])
.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider
    .when('/', {
        title: 'Home',
        templateUrl: 'partials/home.html',
        controller: 'MainCtrl',
    })
    .otherwise({ redirectTo: '/' });
}]);