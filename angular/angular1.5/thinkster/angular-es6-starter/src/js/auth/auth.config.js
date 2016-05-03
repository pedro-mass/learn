function AuthConfig($stateProvider, $httpProvider) {
  'ngInject';

  // Define the routes
  $stateProvider
    .state('app.login', {
      url: '/login',
      controller: 'AuthCtrl as $ctrl',
      templateUrl: 'auth/auth.html',
      title: 'Sign in'
    })

    .state('app.register', {
      url: '/register',
      controller: 'AuthCtrl as $ctrl',
      templateUrl: 'auth/auth.html',
      title: 'Sign up'
    });
};

export default AuthConfig;
