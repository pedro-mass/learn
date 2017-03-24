'use strict';

angular
  .module('meanApp', ['ngRoute'])
  
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      
      .otherwise({redirectTo: '/'});
  }]);