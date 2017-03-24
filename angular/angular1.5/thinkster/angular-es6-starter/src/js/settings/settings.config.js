function SettingsConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.settings', {
      url: '/settings',
      controller: 'SettingsCtrl as $ctrl',
      templateUrl: 'settings/settings.html',
      title: 'Settings',
      resolve: {
        auth: function(User) {
          return User.ensureAuthIs(true);
        }
      }
    });
}

export default SettingsConfig;
