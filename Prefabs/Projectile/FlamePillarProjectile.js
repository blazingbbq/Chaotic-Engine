var flamePillarSpeed = 0;
var flamePillarWidth = 8;
var flamePillarHeight = 8;
var flamePillarHitBoxWidth = 8;
var flamePillarHitBoxHeight = 8;
var flamePillarDamage = 26;
var flamePillarTickIncrease = 3;
var flamePillarStunDuration = 3000;
var fireTickDamage = 8;

var flamePillarTriggerDelay = 1500;
var flamePillarTimeout = 4000;

function generateNew(obs, src, posX, posY, base) {
    var types = require("../../ObjectTypes");
    var prefabs = require("../Prefabs");
    var firemage = require("../Player/FireMage");
    var collisions = require("../../Collisions");
    
    return {
        ...base,
        subtype: types.Projectile.FLAME_PILLAR_PROJECTILE,
        x: posX,
        y: posY,
        velocityX: flamePillarSpeed,
        velocityY: flamePillarSpeed,
        width: flamePillarWidth,
        height: flamePillarHeight,
        hitboxWidth: flamePillarHitBoxWidth,
        hitboxHeight: flamePillarHitBoxHeight,
        damage: flamePillarDamage,
        initTime: Date.now(),
        update: (obs, selfId, delta) => {
            var newTime = Date.now();

            // If timeout is passed, delete item
            if (obs[selfId] && newTime - obs[selfId].initTime >= flamePillarTimeout) {
                delete obs[id];
            }

            // If trigger delay elapsed, check for object collisions
            if (obs[selfId] && newTime - obs[selfId].initTime >= flamePillarTriggerDelay) {
                collisions.checkCollisions(selfId, obs, prefabs.renderSize, (srcId, collisionId) => {
                    if (obs[srcId] && collisionId != srcId && collisionId != obs[srcId].source){
                        obs[srcId].onHit(obs, srcId, collisionId);
                    }
                });
            }
        },
        onHit: (obs, srcId, collisionId) => {
            switch (obs[collisionId].type) {
                case types.ObjectTypes.PLAYER:
                    firemage.increaseFireTick(obs, obs[srcId].source, flamePillarTickIncrease);
                    obs[collisionId].addStatusEffect(obs, collisionId, types.StatusEffects.STUNNED, flamePillarStunDuration);
                case types.ObjectTypes.GRAVESTONE:
                case types.ObjectTypes.VEHICLE:
                case types.ObjectTypes.TERRAIN:
                    if (obs[srcId]) {
                        if (obs[collisionId] && obs[collisionId].damage) {
                            obs[collisionId].damage(
                                obs,
                                collisionId,
                                obs[srcId].damage + (obs[obs[srcId].source].fireTicks ? obs[obs[srcId].source].fireTicks * fireTickDamage: 0)
                            );
                        }
                        delete obs[srcId];
                    }
                    break;
            }
        },
    }
}

module.exports = {
    generateNew: generateNew,
}
