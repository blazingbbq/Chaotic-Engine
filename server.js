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
var players = {};
io.on("connection", (socket) => {
    // Handle connection
    socket.on("new-player", () => {
        players[socket.id] = {
            x: 100,
            y: 100,
        };
        socket.emit("handshake", {
            id: socket.id,
            playerWidth: 4,
            playerHeight: 6,
        });
    });

    // Handle player movement event
    socket.on("movement", (movement) => {
        var player = players[socket.id] || {};
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

    // Handle player disconnect - Clean up resources 
    socket.on("disconnect", () => {
        delete players[socket.id];
    });
});

setInterval(() => {
    io.sockets.emit("state", players);
}, 1000 / 60);
