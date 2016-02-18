angular.module('farmsim.controllers')
    .controller('inventoryCtrl', ['$scope', 'InventoryService', function($scope, InventoryServices){
        $scope.inventoryService = InventoryServices;
    }]);
