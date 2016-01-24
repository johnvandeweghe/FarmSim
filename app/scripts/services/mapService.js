angular.module('farmsim.services')
    .factory('MapService', function() {
        return {
            load: function() {
                var blankRow = [
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0),
                    new Tile(2, 0)
                ];
                var topRow = [
                    new Tile(2, 0),
                    new Tile(6, 0),
                    new Tile(5, 0),
                    new Tile(5, 0),
                    new Tile(5, 0),
                    new Tile(5, 0),
                    new Tile(5, 0),
                    new Tile(5, 0),
                    new Tile(5, 0),
                    new Tile(5, 0),
                    new Tile(5, 0),
                    new Tile(5, 0),
                    new Tile(5, 0),
                    new Tile(5, 0),
                    new Tile(5, 0),
                    new Tile(5, 0),
                    new Tile(5, 0),
                    new Tile(5, 0),
                    new Tile(5, 0),
                    new Tile(9, 0),
                    new Tile(2, 0)
                ];
                var middleRow = [
                    new Tile(2, 0),
                    new Tile(14, 0),
                    new Tile(0, 0),
                    new Tile(0, 0),
                    new Tile(0, 0),
                    new Tile(0, 0),
                    new Tile(0, 0),
                    new Tile(0, 0),
                    new Tile(0, 0),
                    new Tile(0, 0),
                    new Tile(0, 0),
                    new Tile(0, 0),
                    new Tile(0, 0),
                    new Tile(0, 0),
                    new Tile(0, 0),
                    new Tile(0, 0),
                    new Tile(0, 0),
                    new Tile(0, 0),
                    new Tile(0, 0),
                    new Tile(12, 0),
                    new Tile(2, 0)
                ];
                var bottomRow = [
                    new Tile(2, 0),
                    new Tile(11, 0),
                    new Tile(13, 0),
                    new Tile(13, 0),
                    new Tile(13, 0),
                    new Tile(13, 0),
                    new Tile(13, 0),
                    new Tile(13, 0),
                    new Tile(13, 0),
                    new Tile(13, 0),
                    new Tile(13, 0),
                    new Tile(13, 0),
                    new Tile(13, 0),
                    new Tile(13, 0),
                    new Tile(13, 0),
                    new Tile(13, 0),
                    new Tile(13, 0),
                    new Tile(13, 0),
                    new Tile(13, 0),
                    new Tile(10, 0),
                    new Tile(2, 0)
                ];

                var tiles = [
                    blankRow,
                    topRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    middleRow,
                    bottomRow,
                    blankRow
                ];

                return new Map(tiles, 32);
                //return new Map(JSON.parse(localStorage.getItem('farmTiles')), 32);
            },
            save: function(map) {
                localStorage.setItem(JSON.stringify(map.getTiles()));
            }
        };
    });
