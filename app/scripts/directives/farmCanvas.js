angular.module('farmsim.directives').
    directive("farmcanvas", ['$compile', function($compile){
        return {
            restrict: "A",
            link: function($scope, element){
                var ctx = element[0].getContext('2d');
                ctx.canvas.width = window.innerWidth;
                ctx.canvas.height = window.innerHeight;

                element.bind('touchstart', function(event){
                    $scope.$broadcast('farmsim.touchstart', event);
                });
                element.bind('touchmove', function(event){
                    $scope.$broadcast('farmsim.touchmove', event);
                });
                element.bind('touchend', function(event){
                    $scope.$broadcast('farmsim.touchend', event);
                });

                var start = null;
                function step(timestamp) {
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                    if (!start) start = timestamp;
                    var progress = timestamp - start;

                    //@TODO: Extract cameraMovement (momentum based or otherwise (see touchMove)) to separate class
                    if($scope.momentum) {
                        if(!$scope.momentum.timestamp){
                            $scope.momentum.timestamp = timestamp;
                        }
                        var elapsed = timestamp - $scope.momentum.timestamp;
                        var timeConstant = 325;
                        var exp = Math.exp(-elapsed / timeConstant);
                        var newX = $scope.momentum.targetPosition.x - $scope.momentum.amplitude.x * exp;
                        var newY = $scope.momentum.targetPosition.y - $scope.momentum.amplitude.y * exp;

                        if(newX < 0) {
                            newX = 0;
                            $scope.momentum.amplitude.x = 0;
                        }
                        if(newY < 0) {
                            newY = 0;
                            $scope.momentum.amplitude.y = 0;
                        }
                        if(newX > $scope.map.width - window.innerWidth){
                            newX = $scope.map.width - window.innerWidth;
                            $scope.momentum.amplitude.x = 0;
                        }
                        if(newY > $scope.map.height - window.innerHeight){
                            newY = $scope.map.height - window.innerHeight;
                            $scope.momentum.amplitude.y = 0;
                        }
                        $scope.cameraPosition = {
                            x: newX,
                            y: newY
                        };
                        if (elapsed > 6 * timeConstant) {
                            $scope.momentum = null;
                        }
                    }

                    $scope.map.tick();
                    $scope.map.draw(ctx, $scope.cameraPosition);

                    //Todo, only request animation frames on change to drawn stuff?
                    window.requestAnimationFrame(step);
                }
                step();
            }
        };
    }]);
