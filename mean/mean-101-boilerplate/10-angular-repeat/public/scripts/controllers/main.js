'use strict';

/**
 * @ngdoc function
 * @name meanApp.controller: MainCtrl
 * @description
 * # MainCtrl
 * Controller of the meanApp
 */
angular.module('meanApp')
  .controller('MainCtrl', function($scope) {
    
    $scope.products = [
      { id: 1, name: 'Hockey puck' },
      { id: 2, name: 'Golf club' },
      { id: 3, name: 'Baseball bat' },
      { id: 4, name: 'Lacrosse stick' }
    ];

  });
