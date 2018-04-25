module.exports = {
    // Check collisions between all objects
    checkCollisions: (checkSrc, obs, renderSize, callBack) => {
        var src = obs[checkSrc];

        for (id in obs) {
            var check = obs[id];

            if (check) {
                var xIn = 
                    valueInRange(src.x - src.hitboxWidth / 2 * renderSize, check.x - check.hitboxWidth / 2 * renderSize, check.x + check.hitboxWidth / 2 * renderSize) ||
                    valueInRange(src.x + src.hitboxWidth / 2 * renderSize, check.x - check.hitboxWidth / 2 * renderSize, check.x + check.hitboxWidth / 2 * renderSize) ||
                    valueInRange(check.x - check.hitboxWidth / 2 * renderSize, src.x - src.hitboxWidth / 2 * renderSize, src.x + src.hitboxWidth / 2 * renderSize) ||
                    valueInRange(check.x + check.hitboxWidth / 2 * renderSize, src.x - src.hitboxWidth / 2 * renderSize, src.x + src.hitboxWidth / 2 * renderSize);

                var yIn =
                    valueInRange(src.y - src.hitboxHeight / 2 * renderSize, check.y - check.hitboxHeight / 2 * renderSize, check.y + check.hitboxHeight / 2 * renderSize) ||
                    valueInRange(src.y + src.hitboxHeight / 2 * renderSize, check.y - check.hitboxHeight / 2 * renderSize, check.y + check.hitboxHeight / 2 * renderSize) ||
                    valueInRange(check.y - check.hitboxHeight / 2 * renderSize, src.y - src.hitboxHeight / 2 * renderSize, src.y + src.hitboxHeight / 2 * renderSize) ||
                    valueInRange(check.y + check.hitboxHeight / 2 * renderSize, src.y - src.hitboxHeight / 2 * renderSize, src.y + src.hitboxHeight / 2 * renderSize);

                if (xIn && yIn) callBack(checkSrc, id);
            }
        }
    },
    // Check collisions between all objects
    checkZoneCollisions: (checkSrc, obs, radius, callBack) => {
        var src = obs[checkSrc];

        for (id in obs) {
            var check = obs[id];

            if (check) {
                var xIn = 
                    valueInRange(src.x - radius, check.x - radius, check.x + radius) ||
                    valueInRange(src.x + radius, check.x - radius, check.x + radius) ||
                    valueInRange(check.x - radius, src.x - radius, src.x + radius) ||
                    valueInRange(check.x + radius, src.x - radius, src.x + radius);

                var yIn =
                    valueInRange(src.y - radius, check.y - radius, check.y + radius) ||
                    valueInRange(src.y + radius, check.y - radius, check.y + radius) ||
                    valueInRange(check.y - radius, src.y - radius, src.y + radius) ||
                    valueInRange(check.y + radius, src.y - radius, src.y + radius);

                if (xIn && yIn) callBack(checkSrc, id);
            }
        }
    },
    // Check collisions between click location and all objects
    checkClickCollisions: (clickX, clickY, obs, renderSize, callBack) => {
        for (id in obs) {
            var check = obs[id];

            if (check) {
                var xIn = 
                    valueInRange(clickX, check.x - check.hitboxWidth / 2 * renderSize, check.x + check.hitboxWidth / 2 * renderSize) ||
                    valueInRange(clickX, check.x - check.hitboxWidth / 2 * renderSize, check.x + check.hitboxWidth / 2 * renderSize);

                var yIn =
                    valueInRange(clickY, check.y - check.hitboxHeight / 2 * renderSize, check.y + check.hitboxHeight / 2 * renderSize) ||
                    valueInRange(clickY, check.y - check.hitboxHeight / 2 * renderSize, check.y + check.hitboxHeight / 2 * renderSize);

                if (xIn && yIn) callBack(id);
            }
        }
    },
    pushBack: (obs, srcId, collisionId, renderSize) => {
        // Push object back out of collision terrain towards which ever side is the closest to the terrain object
        var distRight   = Math.abs((obs[collisionId].x - obs[collisionId].hitboxWidth * renderSize / 2) - (obs[srcId].x + obs[srcId].hitboxWidth * renderSize / 2));
        var distLeft    = Math.abs((obs[collisionId].x + obs[collisionId].hitboxWidth * renderSize / 2) - (obs[srcId].x - obs[srcId].hitboxWidth * renderSize / 2));
        var distUp      = Math.abs((obs[collisionId].y + obs[collisionId].hitboxHeight * renderSize / 2) - (obs[srcId].y - obs[srcId].hitboxHeight * renderSize / 2));
        var distDown    = Math.abs((obs[collisionId].y - obs[collisionId].hitboxHeight * renderSize / 2) - (obs[srcId].y + obs[srcId].hitboxHeight * renderSize / 2));
        
        if (distRight < distLeft && distRight < distUp && distRight < distDown) {
            obs[srcId].x = obs[srcId].x - distRight;
        }
        if (distLeft < distRight && distLeft < distUp && distLeft < distDown) {
            obs[srcId].x = obs[srcId].x + distLeft;
        }
        if (distUp < distRight && distUp < distLeft && distUp < distDown) {
            obs[srcId].y = obs[srcId].y + distUp;
        }
        if (distDown < distRight && distDown < distLeft && distDown < distUp) {
            obs[srcId].y = obs[srcId].y - distDown;
        }
    },
}

// Collision detection helper, checks if value is between min and max
function valueInRange(value, min, max) { 
    return (value >= min) && (value <= max); 
}