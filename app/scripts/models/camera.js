var Camera = function() {
    this.position = new THREE.Vector2(0, 0);

    var momentum = null;

    this.moveTo = function (newPosition, map) {
        var min = new THREE.Vector2(0, 0);
        var max = new THREE.Vector2(map.width - window.innerWidth, map.height - window.innerHeight);
        newPosition.clamp(min, max);

        this.position = newPosition;
    };

    this.tick = function (timestamp, map) {
        if (momentum){
            if (!momentum.timestamp) {
                momentum.timestamp = timestamp;
            }
            var elapsed = timestamp - momentum.timestamp;
            var timeConstant = 325;
            var exp = Math.exp(-elapsed / timeConstant);

            this.moveTo(momentum.targetPosition.clone().sub(momentum.amplitude.clone().multiplyScalar(exp)), map);

            if (elapsed > 6 * timeConstant) {
                this.stopMomentum();
            }
        }
    };

    this.calculateMomentum = function(velocity){
        if(velocity) {
            momentum = {};
            momentum.amplitude = velocity.clone().multiplyScalar(100);
            momentum.targetPosition = this.position.clone().add(momentum.amplitude);
        }
    };

    this.stopMomentum = function(){
        momentum = null;
    };
};
