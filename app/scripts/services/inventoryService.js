angular.module('farmsim.services')
    .service('InventoryService', function() {
        var width = 10;
        var height = 10;
        var inventoryContents = [];



        this.add = function(item){

        };

        this.save = function(){
            localStorage.setItem('farmInventory', JSON.stringify(inventoryContents));
        };

        this.load = function(){
            inventoryContents = localStorage.getItem('farmInventory');
        }
    });
