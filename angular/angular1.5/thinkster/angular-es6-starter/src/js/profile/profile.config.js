function ProfileConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.profile', {
    abstract: true,
    url: '/@:username',
    controller: 'ProfileCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile.html',
    resolve: {
      profile: function(Profile, $state, $stateParams) {
        return Profile.get($stateParams.username).then(
          (profile) => profile,
          (err) => {
              console.error("failed to load profile");
              $state.go('app.home');
          }
        )
      }
    }
  })
  .state('app.profile.main', {
    url: '',
    controller: 'ProfileArticlesCtrl as $ctrl',
    templateUrl: 'profile/profile-articles.html',
    title: 'Profile'
  })
  .state('app.profile.favorites', {
    url: '/favorites',
    controller: 'ProfileArticlesCtrl as $ctrl',
    templateUrl: 'profile/profile-articles.html',
    title: 'favorites'
  });

};

export default ProfileConfig;
