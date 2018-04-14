function generateNew(obs, src, posX, posY) {
    var types = require("../../ObjectTypes");

    return {
        type: types.ObjectTypes.TERRAIN,
        x: posX,
        y: posY,
        update: (obs, selfId, delta) => { },
        damage: (obs, selfId, amount) => {
            obs[selfId].health -= amount;

            if (obs[selfId].health <= 0){
                delete obs[selfId];
            }
        },
    };
}

module.exports = {
    generateNew: generateNew,
}
