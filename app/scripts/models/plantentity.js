var PlantEntity = function(type, position, state, growthTime, watered){
    Entity.prototype.constructor.apply(this, [type, position]);
    this.state = state;
    this.growthTime = growthTime || Date.now() + 60 * 1000;
    this.watered = watered;
};

PlantEntity.prototype = Object.create(Entity.prototype);

PlantEntity.prototype.constructor = PlantEntity;

PlantEntity.prototype.tick = function(timestamp, map){
    var tile = map.getTileAt(this.position);
    if(tile.state == 0 && this.watered || tile.state == 1 && !this.watered) {
        this.changeGrowthRate(tile.state == 0 ? -0.2 : 0.2);
        this.watered = !this.watered;
    }
    if(this.state == 0 && this.growthTime < Date.now()){
        this.state = 1;
        switch(this.type){
            case 0:
                this.type = 1;
                this.growthTime = Date.now() + 60 * 1000;
                break;
        }
    }
};

PlantEntity.prototype.draw = function(ctx, tilesize, sprites, camera) {
    ctx.drawImage(sprites, (this.type % 8) * tilesize, Math.floor(this.type / 8) * tilesize, tilesize, tilesize, this.position.x - camera.position.x, this.position.y - camera.position.y, tilesize, tilesize);
};

PlantEntity.prototype.tap = function($scope, position, mapService){

};

PlantEntity.prototype.changeGrowthRate = function(rateDifference){
    var timeLeft = this.growthTime - Date.now();

    if(timeLeft > 0 && rateDifference != 0){
        timeLeft *= 1 + -rateDifference;
        this.growthTime = Date.now() + timeLeft;
    }
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
