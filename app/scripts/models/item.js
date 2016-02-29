var Item = function(type, quantity){
    this.type = type;
    this.quantity = quantity || 1;
};

Item.prototype.constructor = Item;

Item.prototype.tick = function(timestamp){

};

Item.prototype.draw = function(ctx, x, y, width, height, tilesize, sprites) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x,y,width,height);
    ctx.fillStyle = "#AAAAAA";
    ctx.font = "8px Arial";
    ctx.fillText(this.quantity, x, y);
    //ctx.drawImage(sprites, (this.type % 8) * tilesize, Math.floor(this.type / 8) * tilesize, tilesize, tilesize, x, y, width, height);
};

Item.prototype.tap = function($scope, position){
    this.quantity--;
};

Item.prototype.export = function(){
    return {
        state: this.state
    };
};

Item.prototype.equal = function(item){
    return item.type === this.type;
};
