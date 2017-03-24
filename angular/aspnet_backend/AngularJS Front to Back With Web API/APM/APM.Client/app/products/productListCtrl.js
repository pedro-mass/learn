(function () {
    "use strict";
    angular
        .module("productManagement")
        .controller("ProductListCtrl",
                     ProductListCtrl);

    ProductListCtrl.$inject = ['productResource'];

    function ProductListCtrl(productResource) {
        var vm = this;
        vm.products = [];

        vm.searchCriteria = 'GDN';

        productResource.query({
            $filter: "substringof('GDN', ProductCode) and Price ge 5 and Price le 20",
            $orderby: "Price desc"
        }, function (data) {
            vm.products = data;
        });
    }
}());
