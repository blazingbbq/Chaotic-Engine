var fireboltSpeed = 0.35;
var fireboltWidth = 3;
var fireboltHeight = 3;
var fireboltHitBoxRadius = 2;
var fireboltDamage = 12;
var fireboltTickIncrease = 1;

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
        hitboxType: types.HitboxTypes.RECT,
        hitboxWidth: fireboltHitBoxRadius,
        hitboxHeight: fireboltHitBoxRadius,
        damage: fireboltDamage,
        onHit: (obs, srcId, collisionId) => {
            switch (obs[collisionId].type) {
                case types.ObjectTypes.PLAYER:
                case types.ObjectTypes.GRAVESTONE:
                case types.ObjectTypes.VEHICLE:
                case types.ObjectTypes.TERRAIN:
                    if (obs[srcId]) {
                        if (obs[collisionId] && obs[collisionId].damage) {
                            firemage.increaseFireTick(
                                obs,
                                obs[srcId].source,
                                obs[collisionId].type === types.ObjectTypes.PLAYER ? fireboltTickIncrease : 0
                            );

                            const damage = obs[srcId].damage;
                            const fireDamage = obs[obs[srcId].source].fireTicks ? obs[obs[srcId].source].fireTicks * firemage.fireTickDamage: 0;

                            prefabs.generateNew(obs, collisionId, 0, 0, types.ObjectTypes.COMBAT_TEXT, types.CombatText.DAMAGE_TEXT, { text: "-" + damage });
                            if (fireDamage) prefabs.generateNew(obs, collisionId, 0, 0, types.ObjectTypes.COMBAT_TEXT, types.CombatText.FIRE_DAMAGE_TEXT, { text: "-" + fireDamage });

                            obs[collisionId].damage(
                                obs,
                                collisionId,
                                damage + fireDamage
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
