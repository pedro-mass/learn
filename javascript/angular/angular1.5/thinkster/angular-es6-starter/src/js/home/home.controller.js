class HomeCtrl {
  constructor(User, Tags, AppConstants, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;

    // Get list of all Tags
    Tags
      .getAll()
      .then(
        (tags) => {
          this.tagsLoaded = true;
          this.tags = tags;
        }
      );

    // set the current list to either feed or all, depending on auth status
    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    }
  }

  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
  }
}

export default HomeCtrl;
