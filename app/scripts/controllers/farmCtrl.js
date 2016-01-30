angular.module('farmsim.controllers')
    .controller('farmCtrl', ['$scope', 'MapService', function($scope, MapService){
        $scope.map = MapService.load();

        setInterval(function(){
            MapService.save($scope.map)
        }, 10000);

        $scope.camera = new Camera();

        $scope.debugDots = [];

        var touching = null;
        var tapped = true;

        var touchStartPos = null;
        var touchStartTime = 0;

        var touchLastPos = null;
        var touchLastTime = 0;
        var touchVelocity = null;

        var originalCameraPosition = null;

        $scope.$on('farmsim.touchstart', function(e, touchEvent) {
            touchStartPos = new THREE.Vector2(touchEvent.changedTouches[0].pageX, touchEvent.changedTouches[0].pageY);
            touchStartTime = performance.now();

            $scope.camera.stopMomentum();

            touching = getAtPos(touchStartPos);
            tapped = true;
            originalCameraPosition = $scope.camera.position.clone();
        });
        $scope.$on('farmsim.touchmove', function(e, touchEvent) {
            for(var t in touchEvent.changedTouches) {
                if(touchEvent.changedTouches[t].pageX) {
                    var pos = new THREE.Vector2(touchEvent.changedTouches[t].pageX, touchEvent.changedTouches[t].pageY);
                    if(pos.distanceTo(touchStartPos) > 10){
                        tapped = false;
                    }
                    //Drag!
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
            var pos = new THREE.Vector2(touchEvent.changedTouches[0].pageX, touchEvent.changedTouches[0].pageY);
            if(tapped) {
                var absolutePos = pos.clone().add($scope.camera.position);
                var tile = $scope.map.getTileAt(absolutePos);
                tile.tap($scope, absolutePos, MapService);
            } else {
                switch (touching) {
                    case $scope.map:
                        originalCameraPosition = $scope.camera.position.clone();

                        if (touchVelocity) {
                            $scope.camera.calculateMomentum(touchVelocity);
                        }

                        touchLastPos = null;
                        touchLastTime = 0;
                        touchVelocity = null;
                }
                touching = null;
                touchStartPos = null;
                //Tapped!
            }
        });

        function getAtPos(pos){
            return $scope.map;
        }
    }]);
