var types = require("../../ObjectTypes");
var collisions = require("../../Collisions");
var prefabs = require("../Prefabs");

var playerSpeed = 0.2;
var playerHealth = 100;
var playerWidth = 4;
var playerHeight = 6;
var playerViewRange = 1 / 2;

function generateNew(obs, src, posX, posY) {
    return {
        type: types.ObjectTypes.PLAYER,
        subtype: types.Player.HUMAN,
        x: 0,
        y: 0,
        velocityX: 0,
        velocityY: 0,
        speed: playerSpeed,
        width: playerWidth,
        height: playerHeight,
        hitboxWidth: playerWidth - 2,
        hitboxHeight: playerHeight,
        health: playerHealth,
        maxHealth: playerHealth,
        currentEquipment: undefined,
        equipment: [ ],
        abilities: [ ],
        viewRange: playerViewRange,
        deathrattle: (obs, selfRef) => {
            prefabs.generateNew(obs, selfRef, obs[selfRef].x, obs[selfRef].y, types.ObjectTypes.GRAVESTONE);
        },
        update: (obs, selfId, delta) => {
            // Calculate player movement
            obs[selfId].x += obs[selfId].velocityX * delta;
            obs[selfId].y += obs[selfId].velocityY * delta;

            // Check collisions with terrain and reposition accordingly
            collisions.checkCollisions(selfId, obs, prefabs.renderSize, (srcId, collisionId) => {
                if (obs[srcId] && collisionId != srcId){
                    switch (obs[collisionId].type) {
                        case types.ObjectTypes.VEHICLE:
                        case types.ObjectTypes.TERRAIN:
                            // Push object back out of collision terrain towards which ever side is the closest to the terrain object
                            var distRight = Math.abs((obs[collisionId].x - obs[collisionId].hitboxWidth * renderSize / 2) - (obs[srcId].x + obs[srcId].hitboxWidth * renderSize / 2));
                            var distLeft =  Math.abs((obs[collisionId].x + obs[collisionId].hitboxWidth * renderSize / 2) - (obs[srcId].x - obs[srcId].hitboxWidth * renderSize / 2));
                            var distUp =    Math.abs((obs[collisionId].y + obs[collisionId].hitboxHeight * renderSize / 2) - (obs[srcId].y - obs[srcId].hitboxHeight * renderSize / 2));
                            var distDown =  Math.abs((obs[collisionId].y - obs[collisionId].hitboxHeight * renderSize / 2) - (obs[srcId].y + obs[srcId].hitboxHeight * renderSize / 2));
                            
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
                            break;
                    }
                }
            });
        },
        mouseDown: (obs, mouseEvent) => {
            if (obs[mouseEvent.sourceId].currentEquipment != undefined) {
                obs[mouseEvent.sourceId].equipment[obs[mouseEvent.sourceId].currentEquipment]
                    .use(obs, mouseEvent.sourceId, mouseEvent.targetX, mouseEvent.targetY);
            }
        },
        onPlayerInput: (obs, selfId, playerInput) => {
            player = obs[selfId];
            var xDir = 0;
            var yDir = 0;

            if (playerInput.left) {
                xDir -= 1;
            }
            if (playerInput.right) {
                xDir += 1;
            }

            if (playerInput.up) {
                yDir -= 1;
            }
            if (playerInput.down) {
                yDir += 1;
            }

            player.velocityX = xDir * player.speed;
            player.velocityY = yDir * player.speed;
    
            if (obs[selfId].currentEquipment != undefined && playerInput.cycleEquipmentForward && !playerInput.cycleEquipmentBackward) {
                player.equipment[player.currentEquipment].onDequip(obs, selfId);
                player.currentEquipment = player.currentEquipment + 1 >= player.equipment.length ? 0 : player.currentEquipment + 1;
                player.equipment[player.currentEquipment].onEquip(obs, selfId);
            }
            if (obs[selfId].currentEquipment != undefined && playerInput.cycleEquipmentBackward && !playerInput.cycleEquipmentForward) {
                player.equipment[player.currentEquipment].onDequip(obs, selfId);
                player.currentEquipment = player.currentEquipment - 1 < 0 ? player.equipment.length - 1 : player.currentEquipment - 1;
                player.equipment[player.currentEquipment].onEquip(obs, selfId);
            }

            if (playerInput.ability1 && obs[selfId].abilities[0]) {
                obs[selfId].abilities[0].cast(obs, selfId, 0, playerInput.targetX, playerInput.targetY);
            }
            if (playerInput.ability2 && obs[selfId].abilities[1]) {
                obs[selfId].abilities[1].cast(obs, selfId, 1, playerInput.targetX, playerInput.targetY);
            }
            if (playerInput.ability3 && obs[selfId].abilities[2]) {
                obs[selfId].abilities[2].cast(obs, selfId, 2, playerInput.targetX, playerInput.targetY);
            }
            if (playerInput.ability4 && obs[selfId].abilities[3]) {
                obs[selfId].abilities[3].cast(obs, selfId, 3, playerInput.targetX, playerInput.targetY);
            }
    
            if (playerInput.pickup) {
                collisions.checkCollisions(selfId, obs, renderSize, (srcId, collisionId) => {
                    if (obs[srcId] && collisionId != srcId && obs[collisionId].type == types.ObjectTypes.INTERACTABLE) {
                        obs[collisionId].onInteract(obs, collisionId, srcId);
                    }
                });
            }
        },
        heal: (obs, selfId, amount) => {
            obs[selfId].health + amount >= obs[selfId].maxHealth
                ? obs[selfId].health = obs[selfId].maxHealth
                : obs[selfId].health += amount;
        },
        damage: (obs, selfId, amount) => {
            obs[selfId].health -= amount;

            if (obs[selfId].health <= 0){
                obs[selfId].deathrattle(obs, selfId);
            }
        },
    };
}

module.exports = {
    generateNew: generateNew,
}
