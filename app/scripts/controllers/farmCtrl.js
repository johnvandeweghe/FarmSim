angular.module('farmsim.controllers')
    .controller('farmCtrl', ['$scope', 'MapService', function($scope, MapService){
        $scope.map = MapService.load();

        $scope.camera = new Camera();

        var touching = null;

        var touchStartPos = null;

        var touchLastPos = null;
        var touchLastTime = 0;
        var touchVelocity = null;

        var originalCameraPosition = null;

        $scope.$on('farmsim.touchstart', function(e, touchEvent) {
            touchStartPos = new THREE.Vector2(touchEvent.changedTouches[0].pageX, touchEvent.changedTouches[0].pageY);

            $scope.camera.stopMomentum();

            touching = getAtPos(touchStartPos);
            originalCameraPosition = $scope.camera.position.clone();
        });
        $scope.$on('farmsim.touchmove', function(e, touchEvent) {
            for(var t in touchEvent.changedTouches) {
                if(touchEvent.changedTouches[t].pageX) {
                    var pos = new THREE.Vector2(touchEvent.changedTouches[t].pageX, touchEvent.changedTouches[t].pageY);
                    switch(touching){
                        case $scope.map:
                            var newPosition = originalCameraPosition.clone().add(touchStartPos).sub(pos);

                            var now = performance.now();

                            if(now - touchLastTime && touchLastPos) {
                                var currentVelocity = touchLastPos.sub(pos).divideScalar(now - touchLastTime);
                                if(touchVelocity) {
                                    touchVelocity.add(currentVelocity).divideScalar(2);
                                } else {
                                    touchVelocity = currentVelocity;
                                }
                            }

                            touchLastPos = pos.clone();
                            touchLastTime = now;

                            $scope.camera.moveTo(newPosition, $scope.map);
                    }
                }
            }
        });
        $scope.$on('farmsim.touchend', function(e, touchEvent) {
            switch(touching){
                case $scope.map:
                    originalCameraPosition = $scope.camera.position.clone();

                    if(touchVelocity) {
                        $scope.camera.calculateMomentum(touchVelocity);
                    }

                    touchLastPos = null;
                    touchLastTime = 0;
                    touchVelocity = null;
            }
            touching = null;
            touchStartPos = null;
            //Tapped!
        });

        function getAtPos(pos){
            return $scope.map;
        }
    }]);
