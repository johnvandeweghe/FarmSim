var PlotTile = function(type, state, stateChangeTime) {
    Tile.prototype.constructor.apply(this, [type, state]);
    this.stateChangeTime = stateChangeTime;
};


PlotTile.prototype = Object.create(Tile.prototype);

PlotTile.prototype.constructor = PlotTile;

PlotTile.prototype.draw = function(ctx, x, y, tilesize, sprites) {
    ctx.drawImage(sprites, (this.type % 8) * tilesize, Math.floor(this.type / 8) * tilesize, tilesize, tilesize, x, y, tilesize, tilesize);
};

PlotTile.prototype.tap = function($scope, position){
    var tileCenter = $scope.map.roundToTileCenter(position);
    var entities = $scope.map.findEntitiesAt(tileCenter, $scope.map.getTilesize()/2);
    if(entities.length == 0){
        var newEntity = Entity.getEntity(0, {
            position: {
                x: tileCenter.x,
                y: tileCenter.y
            }
        });
        $scope.map.addEntity(newEntity);
    } else {
        var entitiesDidAnything = false;
        for(var e in entities){
            if(entities[e].tap($scope, position)){
                entitiesDidAnything = true;
                break;
            }
        }
        if(this.state == 0 && !entitiesDidAnything) {
            this.stateChangeTime = Date.now() + this.getWaterTime();
            this.state = 1;
            switch (this.type) {
                case 0:
                    this.type = 4;
                    break;
                case 5:
                    this.type = 7;
                    break;
                case 6:
                    this.type = 8;
                    break;
                case 9:
                    this.type = 19;
                    break;
                case 10:
                    this.type = 20;
                    break;
                case 11:
                    this.type = 21;
                    break;
                case 12:
                    this.type = 16;
                    break;
                case 13:
                    this.type = 17;
                    break;
                case 14:
                    this.type = 18;
                    break;
            }
        }
    }
};

PlotTile.prototype.tick = function(timestamp, map){
    if(this.state == 1 && this.stateChangeTime < Date.now()){
        this.state = 0;
        switch(this.type){
            case 4:
                this.type = 0;
                break;
            case 7:
                this.type = 5;
                break;
            case 8:
                this.type = 6;
                break;
            case 19:
                this.type = 9;
                break;
            case 20:
                this.type = 10;
                break;
            case 21:
                this.type = 11;
                break;
            case 16:
                this.type = 12;
                break;
            case 17:
                this.type = 13;
                break;
            case 18:
                this.type = 14;
                break;
        }
    }
};

PlotTile.prototype.getWaterTime = function(){
    return 1000 * (30 + Math.round(Math.random() * 30));
};

PlotTile.prototype.export = function(){
    return {
        state: this.state,
        stateChangeTime: this.stateChangeTime
    };
};
