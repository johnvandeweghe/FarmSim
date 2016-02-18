var Tile = function(type, state){
    this.type = type;
    this.state = state || 0;
};

Tile.prototype.constructor = Tile;

Tile.prototype.tick = function(timestamp, map){

};

Tile.prototype.draw = function(ctx, x, y, tilesize, sprites) {
    ctx.drawImage(sprites, (this.type % 8) * tilesize, Math.floor(this.type / 8) * tilesize, tilesize, tilesize, x, y, tilesize, tilesize);
};

Tile.prototype.tap = function($scope, position){
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
    window.location = "#inventory";
};

Tile.prototype.export = function(){
    return {
        state: this.state
    };
};

Tile.getTile = function(type, data){
    data = data || {};
    switch(type){
        case 0:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 11:
        case 12:
        case 13:
        case 14:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
            return new PlotTile(type, data.state || 0, data.stateChangeTime || 0);
        default:
            return new Tile(type, data.state || 0);
    }
};
