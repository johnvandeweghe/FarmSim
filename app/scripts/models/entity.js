var Entity = function(type, position){
    this.type = type;
    this.position = position;
};


Entity.prototype.constructor = Entity;

Entity.prototype.tick = function(timestamp, map){

};

Entity.prototype.draw = function(ctx, tilesize, sprites, camera) {
    ctx.drawImage(sprites, (this.type % 8) * tilesize, Math.floor(this.type / 8) * tilesize, tilesize, tilesize, this.position.x - camera.position.x - Math.floor(tilesize/2), this.position.y - camera.position.y - Math.floor(tilesize/2), tilesize, tilesize);
};

Entity.prototype.tap = function($scope, position, mapService){
    return false;
};

Entity.prototype.export = function(){
    return {
        position: {
            x: this.position.x,
            y: this.position.y
        }
    };
};

Entity.getEntity = function(type, data){
    data = data || {};
    switch(type){
        case 0:
        case 1:
            return new PlantEntity(type, new THREE.Vector2(data.position.x || 0, data.position.y || 0), data.state || 0, data.growthTime || 0, data.watered || false);
        default:
            return new Entity(type, new THREE.Vector2(data.position.x || 0, data.position.y || 0));
    }
};
