'use strict';

angular
  .module('meanApp', ['ngRoute'])
  
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({redirectTo: '/'});
  }])
  ;