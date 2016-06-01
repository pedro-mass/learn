function EditorConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.editor', {
      url: '/editor',
      controller: 'EditorCtrl as $ctrl',
      templateUrl: 'editor/editor.html',
      title: 'Editor',
      resolve: {
        auth: function(User) {
          return User.ensureAuthIs(true);
        }
      }
    });
}

export default EditorConfig;
