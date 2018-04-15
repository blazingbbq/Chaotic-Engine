var playerSpeed = 0.2;
var playerHealth = 100;
var playerWidth = 4;
var playerHeight = 6;
var playerViewRange = 1 / 2;

function generateNew(obs, src, posX, posY) {
    var types = require("../../ObjectTypes");
    var collisions = require("../../Collisions");
    var prefabs = require("../Prefabs");

    return {
        type: types.ObjectTypes.PLAYER,
        subtype: types.Player.HUMAN,
        x: posX,
        y: posY,
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
                    switch (obs[collisionId].type) {        // Should players collide with other players?
                        case types.ObjectTypes.VEHICLE:
                        case types.ObjectTypes.TERRAIN:
                            collisions.pushBack(obs, srcId, collisionId, prefabs.renderSize);
                            break;
                    }
                }
            });
        },
        mouseDown: (obs, mouseEvent) => {   // Primary click casts first ability
            if (obs[mouseEvent.sourceId].abilities[0]) {
                obs[mouseEvent.sourceId].abilities[0].cast(obs, mouseEvent.sourceId, 0, mouseEvent.targetX, mouseEvent.targetY);
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
    
            if (playerInput.cycleEquipmentForward && !playerInput.cycleEquipmentBackward && obs[selfId].currentEquipment != undefined) {
                player.equipment[player.currentEquipment].onDequip(obs, selfId);
                player.currentEquipment = player.currentEquipment + 1 >= player.equipment.length ? 0 : player.currentEquipment + 1;
                player.equipment[player.currentEquipment].onEquip(obs, selfId);
            }
            if (playerInput.cycleEquipmentBackward && !playerInput.cycleEquipmentForward && obs[selfId].currentEquipment != undefined) {
                player.equipment[player.currentEquipment].onDequip(obs, selfId);
                player.currentEquipment = player.currentEquipment - 1 < 0 ? player.equipment.length - 1 : player.currentEquipment - 1;
                player.equipment[player.currentEquipment].onEquip(obs, selfId);
            }
            if (playerInput.useEquipment && obs[selfId].currentEquipment != undefined) {
                obs[selfId].equipment[obs[selfId].currentEquipment]
                    .use(obs, selfId, playerInput.targetX, playerInput.targetY);
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
                collisions.checkCollisions(selfId, obs, prefabs.renderSize, (srcId, collisionId) => {
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
