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
                ctx.drawImage(sprites, (tiles[y][x].type % 8) * tilesize, Math.floor(tiles[y][x].type / 8) * tilesize, tilesize, tilesize, Math.round(x * tilesize - camera.position.x), Math.round(y*tilesize - camera.position.y), tilesize, tilesize);
            }
        }
    };

    this.tick = function(){

    };

    this.width = tiles[0].length * tilesize;
    this.height = tiles.length * tilesize;

    this.getTiles = function(){
        return tiles;
    };
};
