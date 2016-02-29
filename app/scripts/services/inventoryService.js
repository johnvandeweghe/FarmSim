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

        this.getTappableAt = function(windowWidth, windowHeight, position){
            var destinationTilesize = this.getDestinationTileSize();
            var padding = this.getItemPadding(windowWidth, windowHeight, destinationTilesize);

            var column = (-padding.x + position.x)/(destinationTilesize+padding.x);
            var row = (-padding.y + position.y)/(destinationTilesize+padding.y);

            if(
                column > Math.floor(column) + padding.x/destinationTilesize &&
                row > Math.floor(row) + padding.y/destinationTilesize
            ){
                return;
            }
            row = Math.floor(row);
            column = Math.floor(column);

            console.log(row, column);
            if(row == 0){
                //window.location = "#farm";
            } else {
                row--;
            }
            return inventoryContents[row][column];
        };

        this.draw = function(ctx){
            var destinationTilesize = this.getDestinationTileSize();
            var padding = this.getItemPadding(ctx.canvas.width, ctx.canvas.height, destinationTilesize);
            for(var col = 0; col < width; col++){
                var x =  col * destinationTilesize + (col + 1) * padding.x;
                for(var row = 0; row < height; row++) {
                    var y = (row + 1) * destinationTilesize + (row + 2) * padding.y;

                    if (inventoryContents[col][row]) {
                        inventoryContents[col][row].draw(ctx, x, y, destinationTilesize, destinationTilesize, tilesize, sprites);
                    }
                }
            }

            ctx.fillStyle = "#444444";
            ctx.fillRect(padding.x,padding.y,destinationTilesize,destinationTilesize);
        };

        this.getDestinationTileSize = function(){
            return 32;
        };

        this.getItemPadding = function(cavnasWidth, canvasHeight, tilesize){
            return new THREE.Vector2(
                (cavnasWidth - width*tilesize) / (width + 1),
                (canvasHeight - height*tilesize) / (height + 1)
            );
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
