(function () {
    angular
        .module('common.services')
        .factory('productResource', productResource);

    productResource.$inject = ['$resource', 'appSettings'];

    function productResource($resource, appSettings) {
        return $resource(appSettings.serverPath + '/api/products/:id', null, {
            'update': { method: 'PUT' }
        });
    }
}());