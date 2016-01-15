angular.module('farmsim.controllers')
    .controller('farmCtrl', ['$scope', 'MapService', function($scope, MapService){
        $scope.map = MapService.load();

        $scope.cameraPosition = {
            x: 0,
            y: 0
        };

        var touching = null;

        var touchStartPos = {};

        var originalCameraPosition = $scope.cameraPosition;

        $scope.$on('farmsim.touchstart', function(e, touchEvent) {
            var pos = {
                x: touchEvent.changedTouches[0].pageX,
                y: touchEvent.changedTouches[0].pageY
            };

            touching = getAtPos(pos);
            touchStartPos = pos;
        });
        $scope.$on('farmsim.touchmove', function(e, touchEvent) {
            for(var t in touchEvent.changedTouches) {
                var x = touchEvent.changedTouches[t].pageX;
                if(x) {
                    switch(touching){
                        case $scope.map:
                            var newX = originalCameraPosition.x + touchStartPos.x - x;
                            var newY = originalCameraPosition.y + touchStartPos.y - touchEvent.changedTouches[t].pageY;

                            if(newX < 0) {
                                newX = 0;
                            }
                            if(newY < 0) {
                                newY = 0;
                            }
                            if(newX > $scope.map.width){
                                newX = $scope.map.width;
                            }
                            if(newY > $scope.map.height){
                                newY = $scope.map.height;
                            }

                            $scope.cameraPosition = {
                                x: newX,
                                y: newY
                            };
                    }
                }
            }
        });
        $scope.$on('farmsim.touchend', function(e, touchEvent) {
            touching = null;
            touchStartPos = null;
            //Tapped!
            originalCameraPosition = $scope.cameraPosition;
        });

        function getAtPos(pos){
            return $scope.map;
        }
    }]);
