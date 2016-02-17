var Item = function(type, quantity){
    this.type = type;
    this.quantity = quantity || 1;
};

Item.prototype.constructor = Item;

Item.prototype.tick = function(timestamp){

};

Item.prototype.draw = function(ctx, x, y, tilesize, sprites) {
    ctx.drawImage(sprites, (this.type % 8) * tilesize, Math.floor(this.type / 8) * tilesize, tilesize, tilesize, x, y, tilesize, tilesize);
};

Item.prototype.tap = function($scope, position){
};

Item.prototype.export = function(){
    return {
        state: this.state
    };
};
