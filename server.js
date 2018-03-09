// Dependencies
var http = require("http");
var path = require("path");
var express = require("express");
var socketIO = require("socket.io");
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

var speed = 10; 
var maxProjDist = 1600;

// Listen for connection on IO
var objects = {};
io.on("connection", (socket) => {
    // Handle connection
    socket.on("new-player", () => {
        objects[socket.id] = {
            type: "player",
            x: 0,
            y: 0,
        };
        socket.emit("handshake", {
            id: socket.id,
            playerWidth: 4,
            playerHeight: 6,
        });
    });

    // Handle player movement event
    socket.on("movement", (movement) => {
        var player = objects[socket.id] || {};
        if (movement.left) {
            player.x -= 5;
        }
        if (movement.up) {
            player.y -= 5;
        }
        if (movement.right) {
            player.x += 5;
        }
        if (movement.down) {
            player.y += 5;
        }
    });

    // Handle mouse down event from player
    socket.on("mouseDown", (object) => {
        var angle = Math.atan2(
            object.targetY - objects[object.sourceId].y,
            object.targetX - objects[object.sourceId].x);
    
        // Generate unique Id for new projectile
        var newId = object.sourceId.concat(":", object.targetX, ":", object.targetY);
        var dup = 0;
        while (objects[newId.concat(":" + dup)]){
            dup++;
        }
        
        objects[newId.concat(":" + dup)] = {
            type: "projectile",
            source: object.sourceId,
            x: objects[object.sourceId].x,
            y: objects[object.sourceId].y,
            velocityX: Math.cos(angle) * speed,
            velocityY: Math.sin(angle) * speed,
            facing: angle * 57.2958,
            dist: 0,
        }
    });

    // Handle player disconnect - Clean up resources 
    socket.on("disconnect", () => {
        delete objects[socket.id];
    });
});

// Update state sent at 60fps
setInterval(() => {
    for (var id in objects) {
        switch (objects[id].type) {
            case "player":
                break;
            case "projectile":
                objects[id].x += objects[id].velocityX;
                objects[id].y += objects[id].velocityY;
                objects[id].dist += Math.sqrt(
                    Math.pow(objects[id].velocityX, 2) +
                    Math.pow(objects[id].velocityY, 2));
                if (objects[id].dist > maxProjDist) {
                    delete objects[id];
                }
                break;
        }
    }

    io.sockets.emit("state", objects);
}, 1000 / 60);
