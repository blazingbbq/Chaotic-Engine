// Dependencies
var http = require("http");
var path = require("path");
var express = require("express");
var socketIO = require("socket.io");
var types = require("./ObjectTypes");
var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set("port", 5000);
app.use("/dist", express.static(__dirname + "/dist"));

// Routing
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "dist/index.html"));
});

// Start the server
server.listen(5000, () => {
  console.log("Starting server on port 5000");
}); 

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

// Listen for connection on IO
var objects = {};

// Adds starting resources to the map
initializeMap(objects);

io.on("connection", (socket) => {
    // Handle connection
    socket.on("new-player", () => {
        // TODO: Teams shouldn't be random...
        var newPlayerTeam = Math.floor(Math.random() * (teamColors.length))
        generateNew(objects, socket.id, 0, 0, types.ObjectTypes.PLAYER, newPlayerTeam);

        socket.emit("handshake", {
            id: socket.id,
            cubeSize: renderSize,
        });
    });

    // Handle player input event
    socket.on("playerInput", (playerInput) => {
        var player = objects[socket.id] || {};
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

        if (playerInput.pickup) {
            checkCollisions(socket.id, objects, (srcId, collisionId) => {
                if (objects[srcId] && collisionId != srcId && objects[collisionId].type == types.ObjectTypes.INTERACTABLE){
                    objects[collisionId].onInteract(collisionId, srcId);
                }
            });
        }
    });

    // Handle mouse down event from player
    socket.on("mouseDown", (object) => {
        if (objects[object.sourceId].type == "player") {
            var angle = Math.atan2(
                object.targetY - objects[object.sourceId].y,
                object.targetX - objects[object.sourceId].x);
            
            if (object.playerInput.build) {
                generateNew(objects, object.sourceId, object.targetX, object.targetY, types.ObjectTypes.INTERACTABLE, types.Interactable.HEALTH_PICKUP);
            } else {
                // Generate unique Id for new projectile
                var newId = object.sourceId.concat(":", object.targetX, ":", object.targetY);
                var dup = 0;
                while (objects[newId.concat(":" + dup)]){
                    dup++;
                }
                
                objects[newId.concat(":" + dup)] = {
                    type: types.ObjectTypes.PROJECTILE,
                    source: object.sourceId,
                    x: objects[object.sourceId].x,
                    y: objects[object.sourceId].y,
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
    });

    // Handle player disconnect - Clean up resources 
    socket.on("disconnect", () => {
        delete objects[socket.id];
    });
});

// Main update loop at 60fps
setInterval(() => {
    for (var id in objects) {
        switch (objects[id].type) {
            case types.ObjectTypes.PLAYER:
                // Calculate player movement
                objects[id].x += objects[id].velocityX;
                objects[id].y += objects[id].velocityY;

                // Check collisions with terrain and reposition accordingly
                checkCollisions(id, objects, (srcId, collisionId) => {
                    if (objects[srcId] && collisionId != srcId){
                        switch (objects[collisionId].type) {
                            case types.ObjectTypes.TERRAIN:
                                // Push object back out of collision terrain towards which ever side is the closest to the terrain object
                                var distRight = Math.abs((objects[collisionId].x - objects[collisionId].hitboxWidth * renderSize / 2) - (objects[srcId].x + objects[srcId].hitboxWidth * renderSize / 2));
                                var distLeft =  Math.abs((objects[collisionId].x + objects[collisionId].hitboxWidth * renderSize / 2) - (objects[srcId].x - objects[srcId].hitboxWidth * renderSize / 2));
                                var distUp =    Math.abs((objects[collisionId].y + objects[collisionId].hitboxHeight * renderSize / 2) - (objects[srcId].y - objects[srcId].hitboxHeight * renderSize / 2));
                                var distDown =  Math.abs((objects[collisionId].y - objects[collisionId].hitboxHeight * renderSize / 2) - (objects[srcId].y + objects[srcId].hitboxHeight * renderSize / 2));
                                
                                if (distRight < distLeft && distRight < distUp && distRight < distDown) {
                                    objects[srcId].x = objects[srcId].x - distRight;
                                }
                                if (distLeft < distRight && distLeft < distUp && distLeft < distDown) {
                                    objects[srcId].x = objects[srcId].x + distLeft;
                                }
                                if (distUp < distRight && distUp < distLeft && distUp < distDown) {
                                    objects[srcId].y = objects[srcId].y + distUp;
                                }
                                if (distDown < distRight && distDown < distLeft && distDown < distUp) {
                                    objects[srcId].y = objects[srcId].y - distDown;
                                }
                                break;
                        }
                    }
                });

                break;
            case types.ObjectTypes.PROJECTILE:
                // Calculate projectile movement
                objects[id].x += objects[id].velocityX;
                objects[id].y += objects[id].velocityY;
                objects[id].dist += Math.sqrt(
                    Math.pow(objects[id].velocityX, 2) +
                    Math.pow(objects[id].velocityY, 2));

                checkCollisions(id, objects, (srcId, collisionId) => {
                    if (objects[srcId] && collisionId != srcId && collisionId != objects[srcId].source){
                        switch (objects[collisionId].type) {
                            case types.ObjectTypes.PLAYER:
                                objects[collisionId].health -= objects[srcId].damage;
                                delete objects[srcId];

                                if (objects[collisionId].health <= 0){
                                    objects[collisionId].deathrattle(collisionId);
                                }
                                break;
                            case types.ObjectTypes.GRAVESTONE:
                                if (objects[srcId]) {
                                    objects[collisionId].health -= objects[srcId].damage;
                                    delete objects[srcId];

                                    if (objects[collisionId].health <= 0){
                                        objects[collisionId].deathrattle(collisionId);
                                    }
                                }
                                break;
                            case types.ObjectTypes.TERRAIN:
                                if (objects[srcId]) {
                                    objects[collisionId].health -= objects[srcId].damage;
                                    delete objects[srcId];

                                    if (objects[collisionId].health <= 0){
                                        delete objects[collisionId];
                                    }
                                }
                                break;
                        }
                    }
                });
                if (objects[id]) {
                    if (objects[id].dist > maxProjDist) {
                        delete objects[id];
                    }
                }
                break;
            case types.ObjectTypes.TRIGGER:
                checkCollisions(id, objects, (srcId, collisionId) => {
                    if (objects[srcId] && collisionId != srcId){
                        objects[srcId].onTrigger(srcId, collisionId);
                    }
                });
                break;
        }
    }

    io.sockets.emit("state", objects);
}, 1000 / 60);

// Check collisions between all objects
function checkCollisions(checkSrc, obs, callBack) {
    var src = obs[checkSrc];

    for (id in obs) {
        var check = obs[id];

        var xIn = 
            valueInRange(src.x - src.hitboxWidth / 2 * renderSize, check.x - check.hitboxWidth / 2 * renderSize, check.x + check.hitboxWidth / 2 * renderSize) ||
            valueInRange(src.x + src.hitboxWidth / 2 * renderSize, check.x - check.hitboxWidth / 2 * renderSize, check.x + check.hitboxWidth / 2 * renderSize) ||
            valueInRange(check.x - check.hitboxWidth / 2 * renderSize, src.x - src.hitboxWidth / 2 * renderSize, src.x + src.hitboxWidth / 2 * renderSize) ||
            valueInRange(check.x + check.hitboxWidth / 2 * renderSize, src.x - src.hitboxWidth / 2 * renderSize, src.x + src.hitboxWidth / 2 * renderSize);

        var yIn =
            valueInRange(src.y - src.hitboxHeight / 2 * renderSize, check.y - check.hitboxHeight / 2 * renderSize, check.y + check.hitboxHeight / 2 * renderSize) ||
            valueInRange(src.y + src.hitboxHeight / 2 * renderSize, check.y - check.hitboxHeight / 2 * renderSize, check.y + check.hitboxHeight / 2 * renderSize) ||
            valueInRange(check.y - check.hitboxHeight / 2 * renderSize, src.y - src.hitboxHeight / 2 * renderSize, src.y + src.hitboxHeight / 2 * renderSize) ||
            valueInRange(check.y + check.hitboxHeight / 2 * renderSize, src.y - src.hitboxHeight / 2 * renderSize, src.y + src.hitboxHeight / 2 * renderSize);

        if (xIn && yIn) callBack(checkSrc, id);
    }
}

// Collision detection helper, checks if value is between min and max
function valueInRange(value, min, max) { 
    return (value >= min) && (value <= max); 
}

// Initializes starting map resources
function initializeMap(obs) {
    generateNew(obs, "init", 50, -25, types.ObjectTypes.TERRAIN, types.Terrain.TREE);
    generateNew(obs, "init", 180, 210, types.ObjectTypes.TERRAIN, types.Terrain.TREE);
    generateNew(obs, "init", -150, 185, types.ObjectTypes.TERRAIN, types.Terrain.TREE);
    generateNew(obs, "init", 220, -205, types.ObjectTypes.TERRAIN, types.Terrain.TREE);
    generateNew(obs, "init", -195, -175, types.ObjectTypes.TERRAIN, types.Terrain.TREE);

    generateNew(obs, "init", -120, 125, types.ObjectTypes.TERRAIN, types.Terrain.WALL_HORIZ);
    generateNew(obs, "init", 0, 150, types.ObjectTypes.TERRAIN, types.Terrain.WALL_HORIZ);
    generateNew(obs, "init", 120, 125, types.ObjectTypes.TERRAIN, types.Terrain.WALL_HORIZ);

    generateNew(obs, "init", -100, 0, types.ObjectTypes.INTERACTABLE, types.Interactable.HEALTH_PICKUP);

    generateNew(obs, "init", 150, 0, types.ObjectTypes.TRIGGER, types.Trigger.SPIKE_TRAP);
    generateNew(obs, "init", 150, 24, types.ObjectTypes.TRIGGER, types.Trigger.SPIKE_TRAP);
    generateNew(obs, "init", 150, 48, types.ObjectTypes.TRIGGER, types.Trigger.SPIKE_TRAP);
    generateNew(obs, "init", 170, 12, types.ObjectTypes.TRIGGER, types.Trigger.SPIKE_TRAP);
    generateNew(obs, "init", 170, 36, types.ObjectTypes.TRIGGER, types.Trigger.SPIKE_TRAP);
    generateNew(obs, "init", 190, 0, types.ObjectTypes.TRIGGER, types.Trigger.SPIKE_TRAP);
    generateNew(obs, "init", 190, 24, types.ObjectTypes.TRIGGER, types.Trigger.SPIKE_TRAP);
    generateNew(obs, "init", 190, 48, types.ObjectTypes.TRIGGER, types.Trigger.SPIKE_TRAP);
}

// Generate a new terrain object
function generateNew(obs, src, posX, posY, type, subtype) {
    var newObj;
    
    switch (type) {
        case types.ObjectTypes.PLAYER:
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
                team: subtype,
                teamColor: teamColors[subtype],
                deathrattle: (selfRef) => {
                    objects[selfRef] = playerToGravestone(objects[selfRef]);
                },
            };
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
                        onInteract: (selfRef, interactId) => {
                            objects[interactId].health + healthPickupHealing >= objects[interactId].maxHealth
                                ? objects[interactId].health = objects[interactId].maxHealth
                                : objects[interactId].health += healthPickupHealing;
                            delete objects[selfRef];
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
                        onTrigger: (selfRef, triggerId) => {
                            if (objects[triggerId] && objects[triggerId].type == types.ObjectTypes.PLAYER) {
                                objects[triggerId].health - spikeTrapDamage <= 0
                                ? objects[triggerId].deathrattle(triggerId)
                                : objects[triggerId].health -= spikeTrapDamage;
                                delete objects[selfRef];
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
}

// Transform a player into a gravestone
function playerToGravestone(player) {
    return {
        type: types.ObjectTypes.GRAVESTONE,
        x: player.x,
        y: player.y + 1 * renderSize,
        velocityX: 0,
        velocityY: 0,
        speed: 0,
        width: gravestoneWidth,
        height: gravestoneHeight,
        hitboxWidth: gravestoneHitboxWidth,
        hitboxHeight: gravestoneHitboxHeight,
        health: gravestoneHealth,
        maxHealth: gravestoneHealth,
        team: player.team,
        teamColor: player.teamColor,
        deathrattle: (collisionId) => {
            objects[collisionId] = gravestoneToPlayer(objects[collisionId]);
        },
    }
}

// Transform a gravestone into a player
function gravestoneToPlayer(gravestone) {
    return {
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
        team: gravestone.team,
        teamColor: gravestone.teamColor,
        deathrattle: (collisionId) => {
            objects[collisionId] = playerToGravestone(objects[collisionId]);
        },
    }
}
