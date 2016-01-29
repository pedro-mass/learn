angular.module("psFramework")
  .controller("psFrameworkController", [
    '$scope', '$rootScope', '$window', '$timeout',
    function ($scope, $rootScope, $window, $timeout) {
      $scope.isMenuVisible = true;

      $scope.$on('ps-menu-item-selected-event', function (evt, data) {
        $scope.routeString = data.route;

        checkWidth();
      });

      $($window).on('resize.psFramework', function () {
        $scope.$apply(function () {
          checkWidth();
        });
      });

      $scope.$on("$destroy", function () {
        $($window).off('resize.psFramework'); // remove the handler
      });

      var checkWidth = function () {
        var width = Math.max($($window).width(), $($window).innerWidth());

        $scope.isMenuVisible = (width > 765);
        $scope.isMenuButtonVisible = !$scope.isMenuVisible;

        broadcastMenuState();
      };

      $scope.menuButtonClicked = function () {
        $scope.isMenuVisible = !$scope.isMenuVisible;
        broadcastMenuState();
        // $scope.$apply();
      };

      var broadcastMenuState = function () {
        $rootScope.$broadcast('ps-menu-show', {
          show: $scope.isMenuVisible
        });
      };

      $timeout(function () {
        checkWidth();
      }, 0);
    }
  ]);
