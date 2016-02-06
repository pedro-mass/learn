angular.module('psMenu')
  .controller('psMenuController', [
    '$scope', '$rootScope',
    function ($scope, $rootScope) {

        $scope.showMenu = true;
        $scope.isVertical = true;
        $scope.allowHorizontalToggle = true;

      this.getActiveElement = function () {
        return $scope.activeElement;
      }

      this.setactiveElement = function (el) {
        $scope.activeElement = el;
      };

      this.isVertical = function () {
          return $scope.isVertical;
      }

      this.setRoute = function (route) {
        $rootScope.$broadcast('ps-menu-item-selected-event', {
          route: route
        });
      };

      $scope.$on('ps-menu-show', function (evt, data) {
          $scope.showMenu = data.show;
          $scope.isVertical = data.isVertical;
          $scope.allowHorizontalToggle = data.allowHorizontalToggle;
      });

      this.setOpenMenuScope = function (scope) {
          $scope.openMenuScope = scope;
      };

      $scope.toggleMenuOrientation = function () {
          // close any open menu
          if ($scope.openMenuScope) {
              $scope.openMenuScope.closeMenu();
          }

          $scope.isVertical = !$scope.isVertical;

          $rootScope.$broadcast('ps-menu-orientation-changed-event', {
              isMenuVertical: $scope.isVertical
          });
      };

      angular.element(document).bind('click', function (e) {
          if ($scope.openMenuScope && !$scope.isVertical) {

              // check to see if we're clicking within the popup
              if ($(e.target).parent().hasClass('ps-selectable-item'))
                  return;

              // close the popup menu
              $scope.$apply(function () {
                  $scope.openMenuScope.closeMenu();
              });

              // stop the click from being passed
              e.preventDefault();
              e.stopPropagation();
          }
      });


    }
  ]);
