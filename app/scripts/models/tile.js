var Tile = function(type, state){
    this.type = type;
    this.state = state || 0;
};

Tile.prototype.constructor = Tile;

Tile.prototype.tick = function(timestamp){

};

Tile.prototype.draw = function(ctx, x, y, tilesize, sprites) {
    if (this.state == 0) {
        ctx.drawImage(sprites, (this.type % 8) * tilesize, Math.floor(this.type / 8) * tilesize, tilesize, tilesize, x, y, tilesize, tilesize);
    } else {
        ctx.fillStyle = "red";
        ctx.fillRect(x,y,tilesize,tilesize);
    }
};

Tile.prototype.tap = function($scope, position){
    this.state = +!this.state;
    $scope.debugDots.push({
        position: position,
        timeLeft: 10000,
        startTime: performance.now(),
        draw: function(ctx, time){
            this.timeLeft-=(time - this.startTime);

            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fillStyle = 'blue';
            ctx.fill();

            return this.timeLeft > 0;
        }
    });
};

Tile.prototype.export = function(){
    return {
        state: this.state
    };
};
