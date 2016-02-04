var PlantEntity = function(type, position, state, growthTime, watered){
    Entity.prototype.constructor.apply(this, [type, position]);
    this.state = state;
    this.growthTime = growthTime || Date.now() + this.getGrowthTime(type, state);
    this.watered = watered;
};

PlantEntity.prototype = Object.create(Entity.prototype);

PlantEntity.prototype.constructor = PlantEntity;

PlantEntity.prototype.tick = function(timestamp, map){
    var tile = map.getTileAt(this.position);
    if(tile.state == 0 && this.watered || tile.state == 1 && !this.watered) {
        this.applyGrowthRateChange(tile.state == 0 ? -0.2 : 0.2);
        this.watered = !this.watered;
    }
    if(this.state == 0 && this.growthTime < Date.now()){
        this.state = 1;
        switch(this.type){
            case 0:
                this.type = 1;
                this.growthTime = Date.now() + this.getGrowthTime(this.type, this.state);
                break;
        }
    }
};

PlantEntity.prototype.draw = function(ctx, tilesize, sprites, camera) {
    ctx.drawImage(sprites, (this.type % 8) * tilesize, Math.floor(this.type / 8) * tilesize, tilesize, tilesize, this.position.x - camera.position.x - Math.floor(tilesize/2), this.position.y - camera.position.y - Math.floor(tilesize/2), tilesize, tilesize);
};

PlantEntity.prototype.tap = function($scope, position, mapService){
    if(this.state == 1){
        //add this to inv
        $scope.map.removeEntity(this);
        return true;
    }

    return false;
};

PlantEntity.prototype.applyGrowthRateChange = function(rateChange){
    var timeLeft = this.growthTime - Date.now();

    if(timeLeft > 0 && rateChange != 0){
        timeLeft *= 1 + -rateChange;
        this.growthTime = Date.now() + timeLeft;
    }
};

PlantEntity.prototype.getGrowthTime = function(type, state){
    return 1000 * (50 + Math.round(Math.random() * 10));
};

PlantEntity.prototype.export = function(){
    return {
        position: {
            x: this.position.x,
            y: this.position.y
        },
        state: this.state,
        growthTime: this.growthTime,
        watered: this.watered
    };
};
