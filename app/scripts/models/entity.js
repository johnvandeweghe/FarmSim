var Entity = function(type, position){
    this.type = type;
    this.position = position;
};


Entity.prototype.constructor = Entity;

Entity.prototype.tick = function(timestamp, map){

};

Entity.prototype.draw = function(ctx, tilesize, sprites, camera) {
    ctx.drawImage(sprites, (this.type % 8) * tilesize, Math.floor(this.type / 8) * tilesize, tilesize, tilesize, this.position.x - camera.position.x, this.position.y - camera.position.y, tilesize, tilesize);
};

Entity.prototype.tap = function($scope, position, mapService){

};

Entity.prototype.export = function(){
    return {
        position: {
            x: this.position.x,
            y: this.position.y
        }
    };
};
