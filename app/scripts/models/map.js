var Map = function(tiles, tilesize){
    tilesize = tilesize || 32;

    this.draw = function(ctx, cameraPosition){
        ctx.fillStyle = '#AFADFD';
        var startY = Math.floor(cameraPosition.y/tilesize);
        var startX = Math.floor(cameraPosition.x/tilesize);
        var endY = startY + Math.ceil(ctx.canvas.height/tilesize);
        var endX = startX + Math.ceil(ctx.canvas.width/tilesize);
        for(var y = startY; y <= endY; y++){
            for(var x = startX; x<= endX; x++){
                ctx.fillRect(x * tilesize - cameraPosition.x, y*tilesize - cameraPosition.y, tilesize, tilesize);
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
