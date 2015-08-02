'use strict';

angular.module('directoryApp.controllers', []);
angular.module('directoryApp.directives', []);

angular
  .module('directoryApp', [
    'ui.bootstrap',
    'directoryApp.controllers',
    'directoryApp.directives'
  ]);
