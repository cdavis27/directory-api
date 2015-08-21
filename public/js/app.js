'use strict';

angular.module('directoryApp.controllers', []);
angular.module('directoryApp.directives', []);

angular
  .module('directoryApp', [
    'ui.bootstrap',
    'oitozero.ngSweetAlert',
    'directoryApp.controllers',
    'directoryApp.directives'
  ]);
