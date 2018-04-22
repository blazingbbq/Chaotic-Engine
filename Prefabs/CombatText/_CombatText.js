var combatTextAnimationSpeed = 0.12;
var combatTextFontSize = 10;
var combatTextColor = "#999999FF";
var combatTextDuration = 200;

function generateNew(obs, src, posX, posY, params) {
    var types = require("../../ObjectTypes");

    var angle = obs[src] ? Math.atan2(posY - obs[src].y, posX - obs[src].x) : 0;

    return {
        type: types.ObjectTypes.COMBAT_TEXT,
        x: posX,
        y: posY,
        velocityX: Math.cos(angle) * combatTextAnimationSpeed,
        velocityY: Math.sin(angle) * combatTextAnimationSpeed,
        text: "Boop!",
        size: combatTextFontSize,
        color: combatTextColor,
        facing: angle * 180 / Math.PI + 90,
        initTime: Date.now(),
        duration: combatTextDuration,
        hitboxWidth: 0,
        hitboxHeight: 0,
        update: (obs, selfId, delta) => {
            const newTime = Date.now();
            const lifeTime = newTime - obs[selfId].initTime;

            obs[selfId].x += obs[selfId].velocityX * delta;
            obs[selfId].y += obs[selfId].velocityY * delta;

            var newOpacity = Math.max((1 - lifeTime / obs[selfId].duration) * 255, 0).toString(16).substring(0, 2).replace(".", "");
            if (newOpacity.length <= 1) newOpacity = "0" + newOpacity;
            obs[selfId].color = obs[selfId].color.substring(0, 7) + newOpacity;

            if (obs[selfId] && lifeTime >= obs[selfId].duration) {
                delete obs[selfId];
            }
        },
    };
}

module.exports = {
    generateNew: generateNew,
}
