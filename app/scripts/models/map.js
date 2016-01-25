var Map = function(tiles, tilesize){
    tilesize = tilesize || 32;

    var sprites = new Image();
    sprites.src = 'images/sprites.png';

    this.draw = function(ctx, camera){
        var startY = Math.floor(camera.position.y/tilesize);
        var startX = Math.floor(camera.position.x/tilesize);
        var endY = Math.min(startY + Math.ceil(ctx.canvas.height/tilesize), tiles.length-1);
        var endX = Math.min(startX + Math.ceil(ctx.canvas.width/tilesize), tiles[0].length-1);
        for(var y = startY; y <= endY; y++){
            for(var x = startX; x <= endX; x++){
                tiles[y][x].draw(ctx, Math.round(x * tilesize - camera.position.x), Math.round(y*tilesize - camera.position.y), tilesize, sprites);
            }
        }
    };

    this.tick = function(timestamp){
        for(var y in tiles){
            for(var x in tiles[y]){
                tiles[y][x].tick(timestamp);
            }
        }
    };

    this.width = tiles[0].length * tilesize;
    this.height = tiles.length * tilesize;

    this.getTiles = function(){
        return tiles;
    };

    this.getTileAt = function(position){
        return tiles[Math.floor(position.y/tilesize)][Math.floor(position.x/tilesize)];
    }
};
