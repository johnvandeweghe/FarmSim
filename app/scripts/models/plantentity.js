var PlantEntity = function(type, position, state, growthTimes, watered){
    Entity.prototype.constructor.apply(this, [type, position]);
    this.state = state;
    if(growthTimes.length == 0) {
        this.growthTimes = this.buildGrowthTimes(type, state);
    } else {
        this.growthTimes = growthTimes
    }
    this.watered = watered;
};

PlantEntity.prototype = Object.create(Entity.prototype);

PlantEntity.prototype.constructor = PlantEntity;

PlantEntity.prototype.tick = function(timestamp, map){
    var tile = map.getTileAt(this.position);
    if(tile.state == 0 && this.watered || tile.state == 1 && !this.watered) {
        this.watered = !this.watered;
        this.applyGrowthRateChange(this.watered ? -0.2 : 0.2);
    }
    while(this.timeToGrow()){
        this.grow();
    }
};

PlantEntity.prototype.timeToGrow = function(){
    return this.state < this.getMaxState() && this.growthTimes.length != 0 && this.growthTimes[0] < Date.now();
};

PlantEntity.prototype.grow = function(){
    this.state++;
    this.type++;
    this.growthTimes.shift();
};

PlantEntity.prototype.draw = function(ctx, tilesize, sprites, camera) {
    ctx.drawImage(sprites, (this.type % 8) * tilesize, Math.floor(this.type / 8) * tilesize, tilesize, tilesize, this.position.x - camera.position.x - Math.floor(tilesize/2), this.position.y - camera.position.y - Math.floor(tilesize/2), tilesize, tilesize);
};

PlantEntity.prototype.tap = function($scope, position){
    if(this.state >= this.getMaxState()){
        var item = new Item(this.getItemType(), 1);
        $scope.inventoryService.add(item);
        $scope.map.removeEntity(this);
        return true;
    }

    return false;
};

PlantEntity.prototype.applyGrowthRateChange = function(rateChange){
    if(rateChange == 0){
        return;
    }

    for(var i in this.growthTimes) {
        var timeLeft = this.growthTimes[i] - Date.now();

        if (timeLeft > 0) {
            timeLeft *= 1 + -rateChange;
            this.growthTimes[i] = Date.now() + timeLeft;
        }
    }
};

PlantEntity.prototype.buildGrowthTimes = function(type, state){
    var growthTimes = [];
    var lastTime = Date.now();
    for(var i = state; i < this.getMaxState(); i++){
        var growTime = lastTime + this.getGrowthTime(type, i);
        growthTimes.push(growTime);
        lastTime = growTime;
    }
    return growthTimes;
};

PlantEntity.prototype.getGrowthTime = function(type, state){
    return 300 * (50 + Math.round(Math.random() * 10));
};

PlantEntity.prototype.getItemType = function(){
    switch(this.type){
        case 5:
            return 0;
    }
};

PlantEntity.prototype.getMaxState = function(){
    return PlantEntity.getMaxState(this.type);
};

PlantEntity.getMaxState = function(type){
    if(type <= 5){
        return 4;
    } else {
        return 4;
    }
};

PlantEntity.prototype.export = function(){
    return {
        position: {
            x: this.position.x,
            y: this.position.y
        },
        state: this.state,
        growthTimes: this.growthTimes,
        watered: this.watered
    };
};
