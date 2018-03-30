// Dependencies
var http = require("http");
var path = require("path");
var express = require("express");
var socketIO = require("socket.io");
var types = require("./ObjectTypes");
var prefabs = require("./Prefabs");
var collisions = require("./Collisions");
var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.use("/dist", express.static(__dirname + "/dist"));

const PORT = process.env.PORT || 5000;
const INDEX = path.join(__dirname, "dist/index.html");

app.use((req, res) => res.sendFile(INDEX) );

// Start the server
server.listen(PORT, () => {
    console.log(`Starting server on port ${ PORT }`);
});

var renderSize = prefabs.renderSize;

// Listen for connection on IO
var objects = {};

// Adds starting resources to the map
initializeMap(objects);

io.on("connection", (socket) => {
    // Handle connection
    socket.on("new-player", () => {
        prefabs.generateNew(objects, socket.id, 0, 0, types.ObjectTypes.PLAYER);

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

        if (playerInput.cycleEquipmentForward && !playerInput.cycleEquipmentBackward) {
            player.currentEquipment = player.currentEquipment + 1 >= player.equipment.length ? 0 : player.currentEquipment + 1;
        }
        if (playerInput.cycleEquipmentBackward && !playerInput.cycleEquipmentForward) {
            player.currentEquipment = player.currentEquipment - 1 < 0 ? player.equipment.length - 1 : player.currentEquipment - 1;
        }

        if (playerInput.pickup) {
            collisions.checkCollisions(socket.id, objects, renderSize, (srcId, collisionId) => {
                if (objects[srcId] && collisionId != srcId && objects[collisionId].type == types.ObjectTypes.INTERACTABLE){
                    objects[collisionId].onInteract(objects, collisionId, srcId);
                }
            });
        }
    });

    // Handle mouse down event from player
    socket.on("mouseDown", (object) => {
        if (objects[object.sourceId] && objects[object.sourceId].type == "player") {
            objects[object.sourceId].equipment[objects[object.sourceId].currentEquipment]
                .use(objects, object.sourceId, object.targetX, object.targetY);
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
                collisions.checkCollisions(id, objects, renderSize, (srcId, collisionId) => {
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

                collisions.checkCollisions(id, objects, renderSize, (srcId, collisionId) => {
                    if (objects[srcId] && collisionId != srcId && collisionId != objects[srcId].source){
                        switch (objects[collisionId].type) {
                            case types.ObjectTypes.PLAYER:
                                objects[collisionId].health -= objects[srcId].damage;
                                delete objects[srcId];

                                if (objects[collisionId].health <= 0){
                                    objects[collisionId].deathrattle(objects, collisionId);
                                }
                                break;
                            case types.ObjectTypes.GRAVESTONE:
                                if (objects[srcId]) {
                                    objects[collisionId].health -= objects[srcId].damage;
                                    delete objects[srcId];

                                    if (objects[collisionId].health <= 0){
                                        objects[collisionId].deathrattle(objects, collisionId);
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
                    if (objects[id].dist > prefabs.maxProjDist) {
                        delete objects[id];
                    }
                }
                break;
            case types.ObjectTypes.TRIGGER:
                collisions.checkCollisions(id, objects, renderSize, (srcId, collisionId) => {
                    if (objects[srcId] && collisionId != srcId){
                        objects[srcId].onTrigger(objects, srcId, collisionId);
                    }
                });
                break;
        }
    }

    io.sockets.emit("state", objects);
}, 1000 / 60);

// Initializes starting map resources
function initializeMap(obs) {
    prefabs.generateNew(obs, "init", 50, -25, types.ObjectTypes.TERRAIN, types.Terrain.TREE);
    prefabs.generateNew(obs, "init", 180, 210, types.ObjectTypes.TERRAIN, types.Terrain.TREE);
    prefabs.generateNew(obs, "init", -150, 185, types.ObjectTypes.TERRAIN, types.Terrain.TREE);
    prefabs.generateNew(obs, "init", 220, -205, types.ObjectTypes.TERRAIN, types.Terrain.TREE);
    prefabs.generateNew(obs, "init", -195, -175, types.ObjectTypes.TERRAIN, types.Terrain.TREE);

    prefabs.generateNew(obs, "init", -120, 125, types.ObjectTypes.TERRAIN, types.Terrain.WALL_HORIZ);
    prefabs.generateNew(obs, "init", 0, 150, types.ObjectTypes.TERRAIN, types.Terrain.WALL_HORIZ);
    prefabs.generateNew(obs, "init", 120, 125, types.ObjectTypes.TERRAIN, types.Terrain.WALL_HORIZ);

    prefabs.generateNew(obs, "init", -100, 0, types.ObjectTypes.INTERACTABLE, types.Interactable.HEALTH_PICKUP);
    prefabs.generateNew(obs, "init", -120, 0, types.ObjectTypes.INTERACTABLE, types.Interactable.HEALTH_PICKUP);
    prefabs.generateNew(obs, "init", -140, 0, types.ObjectTypes.INTERACTABLE, types.Interactable.HEALTH_PICKUP);

    prefabs.generateNew(obs, "init", 150, 0, types.ObjectTypes.TRIGGER, types.Trigger.SPIKE_TRAP);
    prefabs.generateNew(obs, "init", 150, 24, types.ObjectTypes.TRIGGER, types.Trigger.SPIKE_TRAP);
    prefabs.generateNew(obs, "init", 150, 48, types.ObjectTypes.TRIGGER, types.Trigger.SPIKE_TRAP);
    prefabs.generateNew(obs, "init", 170, 12, types.ObjectTypes.TRIGGER, types.Trigger.SPIKE_TRAP);
    prefabs.generateNew(obs, "init", 170, 36, types.ObjectTypes.TRIGGER, types.Trigger.SPIKE_TRAP);
    prefabs.generateNew(obs, "init", 190, 0, types.ObjectTypes.TRIGGER, types.Trigger.SPIKE_TRAP);
    prefabs.generateNew(obs, "init", 190, 24, types.ObjectTypes.TRIGGER, types.Trigger.SPIKE_TRAP);
    prefabs.generateNew(obs, "init", 190, 48, types.ObjectTypes.TRIGGER, types.Trigger.SPIKE_TRAP);
}
