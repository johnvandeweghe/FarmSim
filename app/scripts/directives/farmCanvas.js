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
                    $scope.map.tick();
                    $scope.map.draw(ctx, $scope.cameraPosition);

                    //Todo, only request animation frames on change to drawn stuff?
                    window.requestAnimationFrame(step);
                }
                step();
            }
        };
    }]);
