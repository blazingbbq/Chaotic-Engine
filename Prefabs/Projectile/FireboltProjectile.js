var fireboltSpeed = 0.35;
var fireboltWidth = 3;
var fireboltHeight = 3;
var fireboltHitBoxRadius = 2;
var fireboltDamage = 18;
var fireboltTickIncrease = 1;
var fireTickDamage = 8;

function generateNew(obs, src, posX, posY, base) {
    var types = require("../../ObjectTypes");
    var prefabs = require("../Prefabs");
    var firemage = require("../Player/FireMage");
    
    return {
        ...base,
        subtype: types.Projectile.FIREBOLT_PROJECTILE,
        velocityX: Math.cos(base.angle) * fireboltSpeed,
        velocityY: Math.sin(base.angle) * fireboltSpeed,
        width: fireboltWidth,
        height: fireboltHeight,
        hitboxWidth: fireboltHitBoxRadius,
        hitboxHeight: fireboltHitBoxRadius,
        damage: fireboltDamage,
        onHit: (obs, srcId, collisionId) => {
            switch (obs[collisionId].type) {
                case types.ObjectTypes.PLAYER:
                    firemage.increaseFireTick(obs, obs[srcId].source, fireboltTickIncrease);
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
