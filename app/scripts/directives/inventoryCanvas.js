angular.module('farmsim.directives').
directive("farminventorycanvas", ['$compile', function($compile){
    return {
        restrict: "A",
        link: function($scope, element){
            var ctx = element[0].getContext('2d');
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;

            element.bind('touchstart', function(event){
                $scope.$broadcast('farmsim.inventory.touchstart', event);
            });
            element.bind('touchmove', function(event){
                $scope.$broadcast('farmsim.inventory.touchmove', event);
            });
            element.bind('touchend', function(event){
                $scope.$broadcast('farmsim.inventory.touchend', event);
            });

            var start = null;
            function step(timestamp) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                if (!start) start = timestamp;
                var progress = timestamp - start;

                $scope.inventoryService.tick(timestamp);
                $scope.inventoryService.draw(ctx, timestamp);

                //Todo, only request animation frames on change to drawn stuff?
                window.requestAnimationFrame(step);
            }
            step();
        }
    };
}]);
