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
    };

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
    };

    this.removeEntity = function(entity){
        var index = entities.indexOf(entity);
        if(index > -1) {
            entities.splice(index, 1);
        }
    };

    this.roundToTileCenter = function(position){
       return position.clone().divideScalar(this.getTilesize()).floor().multiplyScalar(this.getTilesize()).addScalar(this.getTilesize()/2);
    }
};

Map.load = function() {
    var tiles = localStorage.getItem('farmTiles');
    if(tiles) {
        tiles = JSON.parse(tiles);
        for(var y in tiles){
            for(var x in tiles[y]) {
                tiles[y][x] = Tile.getTile(tiles[y][x].type, tiles[y][x].data);
            }
        }

        var entities = localStorage.getItem('farmEntities');

        entities = JSON.parse(entities) || [];
        for(var i in entities){
            entities[i] = Entity.getEntity(entities[i].type, entities[i].data);
        }

        return new Map(tiles, 32, entities);
    } else {
        return this.newMap();
    }
};

Map.save = function(map) {
    var tiles = map.getTiles();
    var notTiles = [];
    for(var y in tiles){
        notTiles[y] = [];
        for(var x in tiles[y]) {
            notTiles[y][x] = {
                type: tiles[y][x].type,
                data: tiles[y][x].export()
            };
        }
    }
    localStorage.setItem('farmTiles', JSON.stringify(notTiles));

    var entities = map.getEntities();
    var notEntities = [];
    for(var i in entities){
        notEntities[i] = {
            type: entities[i].type,
            data: entities[i].export()
        };
    }
    localStorage.setItem('farmEntities', JSON.stringify(notEntities));
};

Map.newMap = function(){
    var blankRow = function() {
        return [
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2),
            Tile.getTile(2)
        ];
    };
    var topRow = function(){
        return [
            Tile.getTile(2),
            Tile.getTile(6),
            Tile.getTile(5),
            Tile.getTile(5),
            Tile.getTile(5),
            Tile.getTile(5),
            Tile.getTile(5),
            Tile.getTile(5),
            Tile.getTile(5),
            Tile.getTile(5),
            Tile.getTile(5),
            Tile.getTile(5),
            Tile.getTile(5),
            Tile.getTile(5),
            Tile.getTile(5),
            Tile.getTile(5),
            Tile.getTile(5),
            Tile.getTile(5),
            Tile.getTile(5),
            Tile.getTile(9),
            Tile.getTile(2)
        ];
    };
    var middleRow = function() {
        return [
            Tile.getTile(2),
            Tile.getTile(14),
            Tile.getTile(0),
            Tile.getTile(0),
            Tile.getTile(0),
            Tile.getTile(0),
            Tile.getTile(0),
            Tile.getTile(0),
            Tile.getTile(0),
            Tile.getTile(0),
            Tile.getTile(0),
            Tile.getTile(0),
            Tile.getTile(0),
            Tile.getTile(0),
            Tile.getTile(0),
            Tile.getTile(0),
            Tile.getTile(0),
            Tile.getTile(0),
            Tile.getTile(0),
            Tile.getTile(12),
            Tile.getTile(2)
        ];
    };
    var bottomRow = function() {
        return [
            Tile.getTile(2),
            Tile.getTile(11),
            Tile.getTile(13),
            Tile.getTile(13),
            Tile.getTile(13),
            Tile.getTile(13),
            Tile.getTile(13),
            Tile.getTile(13),
            Tile.getTile(13),
            Tile.getTile(13),
            Tile.getTile(13),
            Tile.getTile(13),
            Tile.getTile(13),
            Tile.getTile(13),
            Tile.getTile(13),
            Tile.getTile(13),
            Tile.getTile(13),
            Tile.getTile(13),
            Tile.getTile(13),
            Tile.getTile(10),
            Tile.getTile(2)
        ];
    };

    var tiles = [
        blankRow(),
        topRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        middleRow(),
        bottomRow(),
        blankRow()
    ];

    return new Map(tiles, 32, []);
};
