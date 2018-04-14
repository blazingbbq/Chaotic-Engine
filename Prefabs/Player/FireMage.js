var firemageSpeed = 0.18;
var firemageHealth = 64;

function generateNew(obs, src, posX, posY, base) {
    var types = require("../../ObjectTypes");
    var prefabs = require("../Prefabs");
    
    return {
        ...base,
        subtype: types.Player.FIRE_MAGE,
        maxHealth: firemageHealth,
        health: firemageHealth,
        speed: firemageSpeed,
        abilities: [
            prefabs.newAbility(obs, types.Abilities.FIREBOLT),
        ],
    }
}

module.exports = {
    generateNew: generateNew,
}
