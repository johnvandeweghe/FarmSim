angular.module('farmsim.services')
    .service('InventoryService', function() {
        var inventoryContents = [];

        this.save = function(){
            localStorage.setItem('farmInventory', JSON.stringify(inventoryContents));
        };

        this.load = function(){
            inventoryContents = localStorage.getItem('farmInventory');
        }
    });
