var module = angular.module('example', []);

module.directive('exampleBindLeet', function() {
  var leet = {
    a: '4', b: '8', e: '3',
    g: '6', i: '!', l: '1',
    o: '0', s: '5', t: '7',
    z: '2'
  };

  var link = function($scope, $elem, attrs) {
    var convertText = function() {
      var leetText = $scope.exampleBindLeet.replace(/[abegilostz]/gmi, function (letter) {
          return leet[letter.toLowerCase()];
      });

      $elem.text(leetText);
    }

    // updates if any changes
    $scope.$watch('exampleBindLeet', convertText);
  };



  return {
    link: link,
    scope: {
      exampleBindLeet: '='
    }
  };
});

module.directive('exampleProgress', function() {
  function link($scope, $elem, attrs) {
    function updateProgress() {
        var percentValue = Math.round($scope.value / $scope.max * 100);
        $scope.percentValue = Math.min(Math.max(percentValue, 0), 100);

        // immediate update
        // $elem.children()[0].style.width = $scope.percentValue + '%';

        // animate the transition
        $elem.children('.progressBar').stop(true, true).animate({ width: $scope.percentValue + '%' });
    }

    $scope.$watchCollection('[value, max]', updateProgress);
  };

  return {
    restrict: 'E',
    scope: {
      value: '=',
      max: '='
    },
    template: '<div class="progressBar"></div><div class="progressValue">{{ percentValue }}%</div>',
    link: link
  }
});
