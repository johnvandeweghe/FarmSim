angular.module('farmsim.controllers')
    .controller('inventoryCtrl', ['$scope', 'InventoryService', function($scope, InventoryServices){
        $scope.inventoryService = InventoryServices;

        var touching = null;
        var tapped = true;

        var touchStartPos = null;
        var touchStartTime = 0;

        $scope.$on('farmsim.inventory.touchstart', function(e, touchEvent) {
            touchStartPos = new THREE.Vector2(touchEvent.changedTouches[0].pageX, touchEvent.changedTouches[0].pageY);
            touchStartTime = performance.now();

            touching = getAtPos(touchStartPos);
            tapped = true;
        });
        $scope.$on('farmsim.inventory.touchmove', function(e, touchEvent) {
            for(var t in touchEvent.changedTouches) {
                if(touchEvent.changedTouches[t].pageX) {
                    var pos = new THREE.Vector2(touchEvent.changedTouches[t].pageX, touchEvent.changedTouches[t].pageY);
                    if(pos.distanceTo(touchStartPos) > 10){
                        tapped = false;
                    }
                }
            }
        });
        $scope.$on('farmsim.inventory.touchend', function(e, touchEvent) {
            var pos = new THREE.Vector2(touchEvent.changedTouches[0].pageX, touchEvent.changedTouches[0].pageY);
            if(tapped) {
                var absolutePos = pos.clone();
                var tappable = $scope.inventoryService.getTappableAt(window.innerWidth, window.innerHeight, absolutePos);
                if(tappable) {
                    tappable.tap($scope, absolutePos);
                }
            }
        });

        function getAtPos(pos){
            return $scope.map;
        }
    }]);
