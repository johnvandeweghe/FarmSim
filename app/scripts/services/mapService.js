angular.module('farmsim.services')
    .factory('MapService', function() {
        var ms = {
            load: function() {
                var tiles = localStorage.getItem('farmTiles');
                if(tiles) {
                    tiles = JSON.parse(tiles);
                    for(var y in tiles){
                        for(var x in tiles[y]) {
                            tiles[y][x] = ms.getTile(tiles[y][x].type, tiles[y][x].data);
                        }
                    }
                    return new Map(tiles, 32);
                } else {
                    return this.newMap();
                }
            },
            save: function(map) {
                var tiles = map.getTiles();
                var notTiles = [];
                for(var y in tiles){
                    notTiles[y] = [];
                    for(var x in tiles[y]) {
                        notTiles[y][x] = {
                            type: tiles[y][x].type,
                            data: tiles[y][x].export()
                        };
                    }
                }
                localStorage.setItem('farmTiles', JSON.stringify(notTiles));
            },
            newMap: function(){
                var blankRow = function() {
                    return [
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2),
                        ms.getTile(2)
                    ];
                };
                var topRow = function(){
                    return [
                        ms.getTile(2),
                        ms.getTile(6),
                        ms.getTile(5),
                        ms.getTile(5),
                        ms.getTile(5),
                        ms.getTile(5),
                        ms.getTile(5),
                        ms.getTile(5),
                        ms.getTile(5),
                        ms.getTile(5),
                        ms.getTile(5),
                        ms.getTile(5),
                        ms.getTile(5),
                        ms.getTile(5),
                        ms.getTile(5),
                        ms.getTile(5),
                        ms.getTile(5),
                        ms.getTile(5),
                        ms.getTile(5),
                        ms.getTile(9),
                        ms.getTile(2)
                    ];
                };
                var middleRow = function() {
                    return [
                        ms.getTile(2),
                        ms.getTile(14),
                        ms.getTile(0),
                        ms.getTile(0),
                        ms.getTile(0),
                        ms.getTile(0),
                        ms.getTile(0),
                        ms.getTile(0),
                        ms.getTile(0),
                        ms.getTile(0),
                        ms.getTile(0),
                        ms.getTile(0),
                        ms.getTile(0),
                        ms.getTile(0),
                        ms.getTile(0),
                        ms.getTile(0),
                        ms.getTile(0),
                        ms.getTile(0),
                        ms.getTile(0),
                        ms.getTile(12),
                        ms.getTile(2)
                    ];
                };
                var bottomRow = function() {
                    return [
                        ms.getTile(2),
                        ms.getTile(11),
                        ms.getTile(13),
                        ms.getTile(13),
                        ms.getTile(13),
                        ms.getTile(13),
                        ms.getTile(13),
                        ms.getTile(13),
                        ms.getTile(13),
                        ms.getTile(13),
                        ms.getTile(13),
                        ms.getTile(13),
                        ms.getTile(13),
                        ms.getTile(13),
                        ms.getTile(13),
                        ms.getTile(13),
                        ms.getTile(13),
                        ms.getTile(13),
                        ms.getTile(13),
                        ms.getTile(10),
                        ms.getTile(2)
                    ];
                };

                var tiles = [
                    blankRow(),
                    topRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    middleRow(),
                    bottomRow(),
                    blankRow()
                ];

                return new Map(tiles, 32);
            },
            getTile: function(type, data){
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
            }
        };
        return ms;
    });
