angular.module('psMenu')
  .directive('psMenu', function() {
    return {
      scope: {

      },
      transclude: true,
      templateUrl: 'ext-modules/psMenu/psMenuTemplate.html',
      controller: 'psMenuController',
      link: function(scope, el, attr, $timeout) {
          var item = el.find('.ps-selectable-item:first');
          $timeout(function () {
              item.trigger('click');
          });
      }
    }
  });
