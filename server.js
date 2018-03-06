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
        objects[object.sourceId.concat(":", object.targetX, ":", object.targetY)] = {
            type: "projectile",
            source: object.sourceId,
            x: object.targetX,
            y: object.targetY,
        }
    });

    // Handle player disconnect - Clean up resources 
    socket.on("disconnect", () => {
        delete objects[socket.id];
    });
});

setInterval(() => {
    io.sockets.emit("state", objects);
}, 1000 / 60);
