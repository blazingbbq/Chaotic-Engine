var firemageSpeed = 0.18;
var firemageHealth = 64;

var baseFireTicksDuration = 1500;
var firemageFireTicksDuration = 2500;

function generateNew(obs, src, posX, posY, base) {
    var types = require("../../ObjectTypes");
    var prefabs = require("../Prefabs");
    
    return {
        ...base,
        subtype: types.Player.FIRE_MAGE,
        maxHealth: firemageHealth,
        health: firemageHealth,
        speed: firemageSpeed,
        fireTicksDuration: firemageFireTicksDuration,
        abilities: [
            prefabs.newAbility(obs, types.Abilities.FIREBOLT),
        ],
    }
}

function increaseFireTick(obs, sourceId, amount) {
    var newTime = Date.now();
    if (obs[sourceId].fireTicks && newTime - obs[sourceId].fireTicksLastIncrease < obs[sourceId].fireTicksDuration) {
        obs[sourceId].fireTicks = obs[sourceId].fireTicks + amount;
    } else {
        obs[sourceId].fireTicks = amount;
        
        if (!obs[sourceId].fireTicksDuration) {
            obs[sourceId].fireTicksDuration = baseFireTicksDuration;
        }
    }
    obs[sourceId].fireTicksLastIncrease = newTime;
}

module.exports = {
    generateNew: generateNew,
    increaseFireTick: increaseFireTick,
}
