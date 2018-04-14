var fireboltSpeed = 0.35;
var fireboltWidth = 3;
var fireboltHeight = 3;
var fireboltHitBoxRadius = 2;
var fireboltDamage = 34;

function generateNew(obs, src, posX, posY, base) {
    var types = require("../../ObjectTypes");
    var prefabs = require("../Prefabs");
    
    return {
        ...base,
        subtype: types.Projectile.FIREBOLT_PROJECTILE,
        velocityX: Math.cos(base.angle) * fireboltSpeed,
        velocityY: Math.sin(base.angle) * fireboltSpeed,
        width: fireboltWidth,
        height: fireboltHeight,
        hitboxWidth: fireboltHitBoxRadius,
        hitboxHeight: fireboltHitBoxRadius,
        damage: fireboltDamage,             // TODO: Get firebolt damage from firemage's firecounters
    }
}

module.exports = {
    generateNew: generateNew,
}
