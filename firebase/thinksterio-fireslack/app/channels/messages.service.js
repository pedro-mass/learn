angular.module('angularfireSlackApp')
  .factory('Messages', function($firebaseArray, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl + 'channelMessages');

    return {
      forChannel: function(channelId) {
        return $firebaseArray(ref.child(channelId));
      }
    }
  });
