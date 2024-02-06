export default class Tags {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
  }

  getAll() {
    return this._$http({
      url: this._AppConstants.api + '/tags',
      method: 'GET',
    }).then((res) => res.data.tags);
  }
}
