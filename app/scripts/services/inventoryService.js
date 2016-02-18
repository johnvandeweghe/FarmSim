angular.module('farmsim.services')
    .service('InventoryService', function() {
        var width = 10;
        var height = 10;
        var inventoryContents = [];

        var sprites = new Image;
        sprites.src = "images/itemsprites.png";

        var tilesize = 32;

        for(var row = 0; row < width; row++){
            inventoryContents[row] = [];
            for(var col = 0; col < height; col++){
                inventoryContents[row][col] = null;
            }
        }

        this.add = function(item){
            var found = this.find(item);

            if(found){
                found.quantity += item.quantity;
                return true;
            } else {
                var openSlot = this.findFirstSlot();
                if(openSlot){
                    inventoryContents[openSlot[0]][openSlot[1]] = item;
                    return true;
                } else {
                    return false;
                }
            }
        };

        this.find = function(item){
            for (var row in inventoryContents) {
                for (var col in inventoryContents[row]) {
                    if (inventoryContents[row][col] && inventoryContents[row][col].equal(item)) {
                        return inventoryContents[row][col];
                    }
                }
            }
            return null;
        };

        this.findFirstSlot = function(){
            for(var row = 0; row < width; row++){
                for(var col = 0; col < height; col++){
                    if(inventoryContents[row][col] === null){
                        return [row, col];
                    }
                }
            }

            return null;
        };

        this.save = function(){
            localStorage.setItem('farmInventory', JSON.stringify(inventoryContents));
        };

        this.load = function(){
            inventoryContents = localStorage.getItem('farmInventory');
        };

        this.resetSize = function(){
            width = 10;
            height = 10;
        };

        this.draw = function(ctx){
            var destinationTilesize = 32;
            for(var row = 0; row < width; row++){
                var x = row * (tilesize + 10) + 10;
                for(var col = 0; col < height; col++) {
                    var y = col * (tilesize + 10) + 10;
                    if (inventoryContents[row][col]) {
                        inventoryContents[row][col].draw(ctx, x, y, destinationTilesize, destinationTilesize, tilesize, sprites);
                    }
                }
            }
        };

        this.tick = function(progress){
            for(var row = 0; row < width; row++){
                for(var col = 0; col < height; col++){
                    if(inventoryContents[row][col]) {
                        inventoryContents[row][col].tick(progress);
                    }
                }
            }
        };
    });
