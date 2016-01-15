
angular.module('scotchIoGulpSlush', [
  'ngRoute',
  'scotchIoGulpSlush.todo'
])
.config(function ($routeProvider) {
  'use strict';
  $routeProvider
    .when('/todo', {
      controller: 'TodoCtrl',
      templateUrl: '/scotch-io-gulp-slush/todo/todo.html'
    })
    .otherwise({
      redirectTo: '/todo'
    });
});
