angular.module('farmsim.services')
    .factory('MapService', function() {
        return {
            load: function() {
                var tiles = [];
                for(var y = 0; y <= 200; y++){
                    tiles[y] = [];
                    for(var x = 0; x <= 200; x++){
                        tiles[y][x] = new Tile(Math.floor(Math.random()*23), 0);
                    }
                }
                return new Map(tiles, 32);
                //return new Map(JSON.parse(localStorage.getItem('farmTiles')), 32);
            },
            save: function(map) {
                localStorage.setItem(JSON.stringify(map.getTiles()));
            }
        };
    });
