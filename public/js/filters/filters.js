'use strict';

angular.module('directoryApp.filters')
.filter('humanBool', function() {
    return function(input) {
        return input ? 'yes' : 'no';
    }
});