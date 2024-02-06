angular.module('psMenu')
  .directive('psMenuItem', function() {
    return {
      require: '^psMenu',
      scope: {
        label: '@',
        icon: '@',
        route: '@'
      },
      templateUrl: 'ext-modules/psMenu/psMenuItemTemplate.html',
      link: function(scope, el, attr, ctrl) {

          scope.isActive = function () {
              // did this because the control has the active item on it's scope, but we don't have access to that scope.
              return el === ctrl.getActiveElement();
          };

        scope.isVertical = function () {
            return ctrl.isVertical() || el.parents('.ps-subitem-section').length > 0;
        };

        el.on('click', function(evt) {
          evt.stopPropagation();
          evt.preventDefault();

          scope.$apply(function () {
            ctrl.setactiveElement(el);
            ctrl.setRoute(scope.route);
          });
        });
      }
    }
  });
