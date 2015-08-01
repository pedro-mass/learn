'use strict';

angular
  .module('meanApp', ['ngRoute'])
  
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({redirectTo: '/'});
  }])
  
  .controller('index', ['$scope', function ($scope) {
    $scope.message = 'MEAN Bootcamp 101';
  }])
  ;