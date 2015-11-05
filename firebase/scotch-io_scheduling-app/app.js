// create our angular module and inject firebase
angular.module('scheduleApp', ['firebase'])

// create our main controller and get access to firebase
.controller('mainController', function($scope, $firebase) {
  // connect to the firebase
  var ref = new Firebase("https://sweltering-torch-9709.firebaseio.com/scotchSchedule/days")
  var fb = $firebase(ref);

  // sync as object
  var syncObject = fb.$asObject();

  // three way data binding
  syncObject.$bindTo($scope, 'days');

  // function to set the default data
  $scope.reset = function() {
    fb.$set({
      monday: {
        name: 'Monday',
        slots: {
          0900: {
            time: '9:00am',
            booked: false
          },
          1100: {
            time: '11:00am',
            booked: false
          }
        }
      },
      tuesday: {
        name: 'Tuesday',
        slots: {
          0900: {
            time: '9:00am',
            booked: false
          },
          1100: {
            time: '11:00am',
            booked: false
          }
        }
      }
    })
  };
});
