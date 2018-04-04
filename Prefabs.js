var types = require("./ObjectTypes");
var collisions = require("./Collisions");

var renderSize = 4;

// Projectile
var projectileWidth = 2;
var projectileHeight = 0.5;
var projectileHitBoxRadius = 1.5;
var baseProjectileDamage = 10;
var projectileSpeed = 0.8; 
var maxProjDist = 1600;

// Player
var playerSpeed = 0.2;
var playerHealth = 100;
var playerWidth = 4;
var playerHeight = 6;
var playerViewRange = 1 / 2;
var teamColors = ["#FF0000", "#00FF00", "#0000FF"];

// Gravestone
var gravestoneWidth = 3;
var gravestoneHeight = 4;
var gravestoneHitboxWidth = gravestoneWidth;
var gravestoneHitboxHeight = gravestoneHeight;
var gravestoneHealth = 40;
var gravestoneViewRange = 1 / 4;

// Terrain
var treeWidth = 4;
var treeHeight = 8;
var treeHitboxWidth = 4;
var treeHitboxHeight = 8;
var treeHealth = 200;

var wallHorizWidth = 20;
var wallHorizHeight = 12;
var wallHorizHitboxWidth = 20;
var wallHorizHitboxHeight = 2;
var wallHorizHealth = 250;

// Interactables
var healthPickupWidth = 3;
var healthPickupHeight = 3;
var healthPickupHitboxWidth = 3;
var healthPickupHitboxHeight = 3;
var healthPickupHealing = 40;

var carEnterWidth = 24;
var carEnterHeight = 24;
var carEnterHitboxWidth = 24;
var carEnterHitboxHeight = 24;

// Trigger
var spikeTrapWidth = 5;
var spikeTrapHeight = 5;
var spikeTrapHitboxWidth = 5;
var spikeTrapHitboxHeight = 5;
var spikeTrapDamage = 20;

// Vehicle
var carSpeed = 0.2;
var carWidth = 10;
var carHeight = 16;
var carHitboxWidth = 10;
var carHitboxHeight = 16;
var carHealth = 200;
var carViewRange = 1;

// Equipment
var binocularsViewRange = 2;


module.exports = {
    renderSize: renderSize,
    maxProjDist: maxProjDist,
    // Generate a new terrain object
    generateNew: (obs, src, posX, posY, type, subtype) => {
        var newObj;
        
        switch (type) {
            case types.ObjectTypes.PLAYER:
                // TODO: Teams shouldn't be random...
                var playerTeam = subtype
                    ? subtype
                    : Math.floor(Math.random() * (teamColors.length));
                newObj = {
                    type: types.ObjectTypes.PLAYER,
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
                    team: playerTeam,
                    teamColor: teamColors[playerTeam],
                    currentEquipment: 0,
                    equipment: [
                        module.exports.newEquipment(obs, types.EquipmentTypes.BLASTER),
                        module.exports.newEquipment(obs, types.EquipmentTypes.SCANNER),
                        module.exports.newEquipment(obs, types.EquipmentTypes.BUILDER, { type: types.ObjectTypes.TERRAIN, subtype: types.Terrain.TREE }),
                        module.exports.newEquipment(obs, types.EquipmentTypes.BINOCULARS),
                    ],
                    viewRange: playerViewRange,
                    deathrattle: (obs, selfRef) => {
                        module.exports.generateNew(obs, selfRef, obs[selfRef].x, obs[selfRef].y, types.ObjectTypes.GRAVESTONE);
                    },
                    update: (obs, selfId, delta) => {
                        // Calculate player movement
                        obs[selfId].x += obs[selfId].velocityX * delta;
                        obs[selfId].y += obs[selfId].velocityY * delta;

                        // Check collisions with terrain and reposition accordingly
                        collisions.checkCollisions(selfId, obs, renderSize, (srcId, collisionId) => {
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
                        obs[mouseEvent.sourceId].equipment[obs[mouseEvent.sourceId].currentEquipment]
                            .use(obs, mouseEvent.sourceId, mouseEvent.targetX, mouseEvent.targetY);
                    },
                    onPlayerInput: (obs, selfId, playerInput) => {
                        player = obs[selfId];
                        if (playerInput.left) {
                            if (playerInput.right) {
                                player.velocityX = 0;
                            } else {
                                player.velocityX = -player.speed;
                            }
                        } else if (playerInput.right) {
                            player.velocityX = player.speed;
                        } else {
                            player.velocityX = 0;
                        }
                
                        if (playerInput.up) {
                            if (playerInput.down){
                                player.velocityY = 0;
                            } else {
                                player.velocityY = -player.speed;
                            }
                        } else if (playerInput.down) {
                            player.velocityY = player.speed;
                        } else {
                            player.velocityY = 0;
                        }
                
                        if (playerInput.cycleEquipmentForward && !playerInput.cycleEquipmentBackward) {
                            player.equipment[player.currentEquipment].onDequip(obs, selfId);
                            player.currentEquipment = player.currentEquipment + 1 >= player.equipment.length ? 0 : player.currentEquipment + 1;
                            player.equipment[player.currentEquipment].onEquip(obs, selfId);
                        }
                        if (playerInput.cycleEquipmentBackward && !playerInput.cycleEquipmentForward) {
                            player.equipment[player.currentEquipment].onDequip(obs, selfId);
                            player.currentEquipment = player.currentEquipment - 1 < 0 ? player.equipment.length - 1 : player.currentEquipment - 1;
                            player.equipment[player.currentEquipment].onEquip(obs, selfId);
                        }
                
                        if (playerInput.pickup) {
                            collisions.checkCollisions(selfId, obs, renderSize, (srcId, collisionId) => {
                                if (obs[srcId] && collisionId != srcId && obs[collisionId].type == types.ObjectTypes.INTERACTABLE) {
                                    obs[collisionId].onInteract(obs, collisionId, srcId);
                                }
                            });
                        }
                    }
                };
                obs[src] = newObj;
                return;
            case types.ObjectTypes.GRAVESTONE:
                newObj = {
                    type: types.ObjectTypes.GRAVESTONE,
                    x: posX,
                    y: posY + 1 * renderSize,
                    velocityX: 0,
                    velocityY: 0,
                    speed: 0,
                    width: gravestoneWidth,
                    height: gravestoneHeight,
                    hitboxWidth: gravestoneHitboxWidth,
                    hitboxHeight: gravestoneHitboxHeight,
                    health: gravestoneHealth,
                    maxHealth: gravestoneHealth,
                    team: obs[src].team,
                    teamColor: obs[src].teamColor,
                    currentEquipment: undefined,
                    equipment: [],
                    viewRange: gravestoneViewRange,
                    deathrattle: (obs, selfRef) => {
                        module.exports.generateNew(obs, selfRef, 0, 0, types.ObjectTypes.PLAYER);
                    },
                    update: (obs, selfId, delta) => { },
                }
                obs[src] = newObj;
                return;
            case types.ObjectTypes.TERRAIN: 
                switch (subtype) {
                    case types.Terrain.TREE:
                        newObj =  {
                            type: type,
                            subtype: subtype,
                            x: posX,
                            y: posY,
                            width: treeWidth,
                            height: treeHeight,
                            hitboxWidth: treeHitboxWidth,
                            hitboxHeight: treeHitboxHeight,
                            health: treeHealth,
                            maxHealth: treeHealth,
                            update: (obs, selfId, delta) => { },
                        };
                        break;
                    case types.Terrain.WALL_HORIZ:
                        newObj = {
                            type: type,
                            subtype: subtype,
                            x: posX,
                            y: posY,
                            width: wallHorizWidth,
                            height: wallHorizHeight,
                            hitboxWidth: wallHorizHitboxWidth,
                            hitboxHeight: wallHorizHitboxHeight,
                            health: wallHorizHealth,
                            maxHealth: wallHorizHealth,
                            update: (obs, selfId, delta) => { },
                        };
                        break;
                }
                break;
            case types.ObjectTypes.INTERACTABLE:
                switch (subtype) {
                    case types.Interactable.HEALTH_PICKUP:
                        newObj = {
                            type: type,
                            subtype: subtype,
                            x: posX,
                            y: posY,
                            width: healthPickupWidth,
                            height: healthPickupHeight,
                            hitboxWidth: healthPickupHitboxWidth,
                            hitboxHeight: healthPickupHitboxHeight,
                            onInteract: (obs, selfRef, interactId) => {
                                obs[interactId].health + healthPickupHealing >= obs[interactId].maxHealth
                                    ? obs[interactId].health = obs[interactId].maxHealth
                                    : obs[interactId].health += healthPickupHealing;
                                delete obs[selfRef];
                            },
                            update: (obs, selfId, delta) => { },
                        };
                        break;
                    case types.Interactable.CAR_ENTER:
                        newObj = {
                            type: type,
                            subtype: subtype,
                            x: posX,
                            y: posY,
                            width: carEnterWidth,
                            height: carEnterHeight,
                            hitboxWidth: carEnterHitboxWidth,
                            hitboxHeight: carEnterHitboxHeight,
                            vehicleId: src,
                            onInteract: (obs, selfRef, interactId) => {
                                obs[obs[selfRef].vehicleId].rider = obs[interactId];
                                obs[interactId] = obs[obs[selfRef].vehicleId];
                            },
                            update: (obs, selfId, delta) => { },
                        };

                        obs[src + ":" + type + ":" + subtype] = newObj;
                        return;
                }
                break;
            case types.ObjectTypes.TRIGGER:
                switch (subtype) {
                    case types.Trigger.SPIKE_TRAP:
                        newObj = {
                            type: type,
                            subtype: subtype,
                            x: posX,
                            y: posY,
                            width: spikeTrapWidth,
                            height: spikeTrapHeight,
                            hitboxWidth: spikeTrapHitboxWidth,
                            hitboxHeight: spikeTrapHitboxHeight,
                            onTrigger: (obs, selfRef, triggerId) => {
                                if (obs[triggerId] && obs[triggerId].type == types.ObjectTypes.PLAYER) {
                                    obs[triggerId].health - spikeTrapDamage <= 0
                                    ? obs[triggerId].deathrattle(obs, triggerId)
                                    : obs[triggerId].health -= spikeTrapDamage;
                                    delete obs[selfRef];
                                }
                            },
                            update: (obs, selfId, delta) => {
                                collisions.checkCollisions(selfId, obs, renderSize, (srcId, collisionId) => {
                                    if (obs[srcId] && collisionId != srcId){
                                        obs[srcId].onTrigger(obs, srcId, collisionId);
                                    }
                                });
                            },
                        };
                        break;
                }
                break;
            case types.ObjectTypes.VEHICLE:
                var vehicleId = src + ":" + type + ":" + subtype + ":" + posX + ":" + posY;
                switch (subtype) {
                    case types.Vehicle.CAR:
                        newObj = {
                            type: type,
                            subtype: subtype,
                            x: 0,
                            y: 0,
                            velocityX: 0,
                            velocityY: 0,
                            speed: carSpeed,
                            width: carWidth,
                            height: carHeight,
                            hitboxWidth: carHitboxWidth,
                            hitboxHeight: carHitboxHeight,
                            health: carHealth,
                            maxHealth: carHealth,
                            currentEquipment: undefined,
                            equipment: [ ],
                            viewRange: carViewRange,
                            rider: undefined,
                            interactableId: vehicleId + ":" + types.ObjectTypes.INTERACTABLE + ":" + types.Interactable.CAR_ENTER,
                            deathrattle: (obs, selfId) => {
                                if (obs[selfId]) {
                                    delete obs[obs[selfId].interactableId];
                                    obs[selfId] = obs[selfId].rider;
                                } else {
                                    delete obs[obs[selfId].interactableId];
                                    delete obs[selfId];
                                }
                            },
                            update: (obs, selfId, delta) => {
                                // Calculate car movement
                                obs[selfId].x += obs[selfId].velocityX * delta;
                                obs[selfId].y += obs[selfId].velocityY * delta;

                                obs[obs[selfId].interactableId].x = obs[selfId].x;
                                obs[obs[selfId].interactableId].y = obs[selfId].y;

                                // Check collisions with terrain and reposition accordingly
                                collisions.checkCollisions(selfId, obs, renderSize, (srcId, collisionId) => {
                                    if (obs[srcId] && collisionId != srcId){
                                        switch (obs[collisionId].type) {
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
                            mouseDown: (obs, mouseEvent) => { },
                            onPlayerInput: (obs, selfId, playerInput) => {
                                player = obs[selfId];
                                if (playerInput.left) {
                                    if (playerInput.right) {
                                        player.velocityX = 0;
                                    } else {
                                        player.velocityX = -player.speed;
                                    }
                                } else if (playerInput.right) {
                                    player.velocityX = player.speed;
                                } else {
                                    player.velocityX = 0;
                                }
                        
                                if (playerInput.up) {
                                    if (playerInput.down){
                                        player.velocityY = 0;
                                    } else {
                                        player.velocityY = -player.speed;
                                    }
                                } else if (playerInput.down) {
                                    player.velocityY = player.speed;
                                } else {
                                    player.velocityY = 0;
                                }
                            }
                        };
                        obs[vehicleId] = newObj;
                        module.exports.generateNew(obs, vehicleId, posX, posY, types.ObjectTypes.INTERACTABLE, types.Interactable.CAR_ENTER);
                        return;
                }
                break;
            default:
                break;
        }

        if (!newObj) {
            newObj = {
                type: types.ObjectTypes.TERRAIN,
                subtype: subtype,
                x: posX,
                y: posY,
                width: 6,
                height: 6,
                hitboxWidth: 6,
                hitboxHeight: 6,
                health: 100,
                maxHealth: 100,
                update: (obs, selfId, delta) => { },
            }
        }
        obs[src + ":" + type + ":" + subtype + ":" + posX + ":" + posY] = newObj;
    },
    newEquipment: (obs, type, params = {}) => {
        switch (type) {
            case types.EquipmentTypes.BLASTER:
                return {
                    type: type,
                    use: (obs, sourceId, targetX, targetY) => {
                        var angle = Math.atan2(
                            targetY - obs[sourceId].y,
                            targetX - obs[sourceId].x);
                        // Generate unique Id for new projectile
                        var newId = sourceId.concat(":", targetX, ":", targetY);
                        var dup = 0;
                        while (obs[newId.concat(":" + dup)]){
                            dup++;
                        }
                        
                        // Projetile generation should be in generateNew()
                        obs[newId.concat(":" + dup)] = {
                            type: types.ObjectTypes.PROJECTILE,
                            source: sourceId,
                            x: obs[sourceId].x,
                            y: obs[sourceId].y,
                            velocityX: Math.cos(angle) * projectileSpeed,
                            velocityY: Math.sin(angle) * projectileSpeed,
                            width: projectileWidth,
                            height: projectileHeight,
                            hitboxWidth: projectileHitBoxRadius,
                            hitboxHeight: projectileHitBoxRadius,
                            facing: angle * 180 / Math.PI,
                            dist: 0,
                            damage: baseProjectileDamage,
                            update: (obs, selfId, delta) => {
                                // Calculate projectile movement
                                obs[selfId].x += obs[selfId].velocityX * delta;
                                obs[selfId].y += obs[selfId].velocityY * delta;
                                obs[selfId].dist += Math.sqrt(
                                    Math.pow(obs[selfId].velocityX * delta, 2) +
                                    Math.pow(obs[selfId].velocityY * delta, 2));

                                // TODO: Change projectile collisions to ray cast
                                collisions.checkCollisions(selfId, obs, renderSize, (srcId, collisionId) => {
                                    if (obs[srcId] && collisionId != srcId && collisionId != obs[srcId].source){
                                        switch (obs[collisionId].type) {
                                            case types.ObjectTypes.PLAYER:
                                            case types.ObjectTypes.GRAVESTONE:
                                            case types.ObjectTypes.VEHICLE:
                                                if (obs[srcId]) {
                                                    obs[collisionId].health -= obs[srcId].damage;
                                                    delete obs[srcId];

                                                    if (obs[collisionId].health <= 0){
                                                        obs[collisionId].deathrattle(obs, collisionId);
                                                    }
                                                }
                                                break;
                                            case types.ObjectTypes.TERRAIN:
                                                if (obs[srcId]) {
                                                    obs[collisionId].health -= obs[srcId].damage;
                                                    delete obs[srcId];

                                                    if (obs[collisionId].health <= 0){
                                                        delete obs[collisionId];
                                                    }
                                                }
                                                break;
                                        }
                                    }
                                });
                                if (obs[id]) {
                                    if (obs[id].dist > maxProjDist) {
                                        delete obs[id];
                                    }
                                }
                            }
                        }
                    },
                    onEquip: (obs, sourceId) => { },
                    onDequip: (obs, sourceId) => { },
                }
            case types.EquipmentTypes.SCANNER:
                return {
                    type: type,
                    use: (obs, sourceId, targetX, targetY) => {
                        // Replaces all builders with this build type...
                        collisions.checkClickCollisions(targetX, targetY, obs, renderSize, (collisionId) => {
                            obs[sourceId].equipment = obs[sourceId].equipment.map((item) => {
                                if (item.type == types.EquipmentTypes.BUILDER) {
                                    item = module.exports.newEquipment(obs, types.EquipmentTypes.BUILDER, { type: obs[collisionId].type, subtype: obs[collisionId].subtype });
                                }
                                return item;
                            });
                        });
                    },
                    onEquip: (obs, sourceId) => { },
                    onDequip: (obs, sourceId) => { },
                }
            case types.EquipmentTypes.BUILDER:
                return {
                    type: type,
                    use: (obs, sourceId, targetX, targetY) => {
                        module.exports.generateNew(obs, sourceId, targetX, targetY, params.type, params.subtype);
                    },
                    onEquip: (obs, sourceId) => { },
                    onDequip: (obs, sourceId) => { },
                }
            case types.EquipmentTypes.BINOCULARS:
                return {
                    type: type,
                    use: (obs, sourceId, targetX, targetY) => { },
                    onEquip: (obs, sourceId) => {
                        obs[sourceId].viewRange = binocularsViewRange;
                    },
                    onDequip: (obs, sourceId) => {
                        obs[sourceId].viewRange = playerViewRange;
                    },
                }
        }
    },
}