angular.module('example', [])
  .controller('MyController', [
    '$scope',
    function($scope) {
      $scope.someMessage = "Hi MEAN people!";
    }
  ]);
