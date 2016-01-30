var Map = function(tiles, tilesize, entities){
    tilesize = tilesize || 32;

    entities = entities || [];

    var tileSprites = new Image();
    tileSprites.src = 'images/sprites.png';

    var entitySprites = new Image();
    entitySprites.src = 'images/entitySprites.png';

    this.draw = function(ctx, camera){
        var startY = Math.floor(camera.position.y/tilesize);
        var startX = Math.floor(camera.position.x/tilesize);
        var endY = Math.min(startY + Math.ceil(ctx.canvas.height/tilesize), tiles.length-1);
        var endX = Math.min(startX + Math.ceil(ctx.canvas.width/tilesize), tiles[0].length-1);
        for(var y = startY; y <= endY; y++){
            for(var x = startX; x <= endX; x++){
                tiles[y][x].draw(ctx, Math.round(x * tilesize - camera.position.x), Math.round(y*tilesize - camera.position.y), tilesize, tileSprites);
            }
        }

        for(var i in entities){
            entities[i].draw(ctx, tilesize, entitySprites, camera);
        }
    };

    this.tick = function(timestamp){
        for(var y in tiles){
            for(var x in tiles[y]){
                tiles[y][x].tick(timestamp, this);
            }
        }
        for(var i in entities){
            entities[i].tick(timestamp, this);
        }
    };

    this.width = tiles[0].length * tilesize;
    this.height = tiles.length * tilesize;

    this.getTiles = function(){
        return tiles;
    };

    this.getTilesize = function(){
        return tilesize;
    }

    this.getEntities = function(){
        return entities;
    };

    this.getTileAt = function(position){
        return tiles[Math.floor(position.y/tilesize)][Math.floor(position.x/tilesize)];
    };

    this.findEntitiesAt = function(position, allowedDistance){
        var foundEntities = [];

        for(var i in entities){
            if(entities[i].position.distanceTo(position) <= (allowedDistance|| 10)){
                foundEntities.push(entities[i]);
            }
        }

        return foundEntities;
    };

    this.addEntity = function(entity){
        entities.push(entity);
    }
};
