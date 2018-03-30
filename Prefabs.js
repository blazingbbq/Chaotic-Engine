var types = require("./ObjectTypes");
var collisions = require("./Collisions");

var renderSize = 4;

// Projectile
var projectileWidth = 2;
var projectileHeight = 0.5;
var projectileHitBoxRadius = 1;
var baseProjectileDamage = 10;
var projectileSpeed = 12; 
var maxProjDist = 1600;

// Player
var playerSpeed = 3;
var playerHealth = 100;
var playerWidth = 4;
var playerHeight = 6;
var teamColors = ["#FF0000", "#00FF00", "#0000FF"];

// Gravestone
var gravestoneWidth = 3;
var gravestoneHeight = 4;
var gravestoneHitboxWidth = gravestoneWidth;
var gravestoneHitboxHeight = gravestoneHeight;
var gravestoneHealth = 40;

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

// Trigger
var spikeTrapWidth = 5;
var spikeTrapHeight = 5;
var spikeTrapHitboxWidth = 5;
var spikeTrapHitboxHeight = 5;
var spikeTrapDamage = 20;


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
                        module.exports.newEquipment(obs, types.EquipmentTypes.BUILDER, { type: types.ObjectTypes.INTERACTABLE, subtype: types.Interactable.HEALTH_PICKUP }),
                    ],
                    deathrattle: (obs, selfRef) => {
                        module.exports.generateNew(obs, selfRef, obs[selfRef].x, obs[selfRef].y, types.ObjectTypes.GRAVESTONE);
                    },
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
                    currentEquipment: 0,
                    equipment: [],
                    deathrattle: (obs, selfRef) => {
                        module.exports.generateNew(obs, selfRef, 0, 0, types.ObjectTypes.PLAYER);
                    },
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
                        };
                        break;
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
                        };
                        break;
                }
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
                        }
                    }
                }
                break;
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
                    }
                }
                break;
            case types.EquipmentTypes.BUILDER:
                return params ? {
                    type: type,
                    use: (obs, sourceId, targetX, targetY) => {
                        module.exports.generateNew(obs, sourceId, targetX, targetY, params.type, params.subtype);
                    }
                } : {
                    type: type,
                    use: (obs, sourceId, targetX, targetY) => {
                        console.log("Cannot initialize builder equipment without params");
                    }
                };
                break;
        }
    },
}