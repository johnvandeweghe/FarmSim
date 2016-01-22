angular.module('farmsim.controllers')
    .controller('farmCtrl', ['$scope', 'MapService', function($scope, MapService){
        $scope.map = MapService.load();

        $scope.cameraPosition = {
            x: 0,
            y: 0
        };

        $scope.momentum = null;

        var touching = null;

        var touchStartPos = {};

        var touchLastPos = {};
        var touchLastTime = 0;
        var touchVelocity = {};

        var originalCameraPosition = $scope.cameraPosition;

        $scope.$on('farmsim.touchstart', function(e, touchEvent) {
            var pos = {
                x: touchEvent.changedTouches[0].pageX,
                y: touchEvent.changedTouches[0].pageY
            };

            if($scope.momentum){
                $scope.momentum = null;
            }

            touching = getAtPos(pos);
            touchStartPos = pos;
            originalCameraPosition = $scope.cameraPosition;
        });
        $scope.$on('farmsim.touchmove', function(e, touchEvent) {
            for(var t in touchEvent.changedTouches) {
                var x = touchEvent.changedTouches[t].pageX;
                if(x) {
                    switch(touching){
                        case $scope.map:
                            var newX = originalCameraPosition.x + touchStartPos.x - x;
                            var newY = originalCameraPosition.y + touchStartPos.y - touchEvent.changedTouches[t].pageY;

                            var now = performance.now();

                            if(now - touchLastTime) {
                                touchVelocity = {
                                    x: (touchLastPos.x - x) / (now - touchLastTime),
                                    y: (touchLastPos.y - touchEvent.changedTouches[t].pageY) / (now - touchLastTime)
                                };
                            }

                            touchLastPos = {x: x, y: touchEvent.changedTouches[t].pageY};
                            touchLastTime = now;

                            if(newX < 0) {
                                newX = 0;
                            }
                            if(newY < 0) {
                                newY = 0;
                            }
                            if(newX > $scope.map.width - window.innerWidth){
                                newX = $scope.map.width - window.innerWidth;
                            }
                            if(newY > $scope.map.height - window.innerHeight){
                                newY = $scope.map.height - window.innerHeight;
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
            switch(touching){
                case $scope.map:
                    originalCameraPosition = $scope.cameraPosition;

                    var momentum = {};
                    momentum.amplitude = {
                        x: touchVelocity.x * 100,
                        y: touchVelocity.y * 100
                    };// * scaleFactor;
                    momentum.targetPosition = {
                        x: $scope.cameraPosition.x + momentum.amplitude.x,
                        y: $scope.cameraPosition.y + momentum.amplitude.y
                    };

                    $scope.momentum = momentum;

                    touchLastPos = {};
                    touchLastTime = 0;
                    touchVelocity = {};
            }
            touching = null;
            touchStartPos = null;
            //Tapped!
        });

        function getAtPos(pos){
            return $scope.map;
        }
    }]);
