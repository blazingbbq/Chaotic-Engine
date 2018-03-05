import * as socketIo from "socket.io-client";
import { Popova } from "./Popova/Popova";

// Socket listener
var socket = io();

var cubeSize: number;
var gridSize: number = 64;

var playerId: string;
var playerWidth: number;
var playerHeight: number;

var mousePos: { x: number, y: number };

var movement = {
    up: false,
    down: false,
    left: false,
    right: false
}
document.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
        case 65: // A
            movement.left = true;
            break;
        case 87: // W
            movement.up = true;
            break;
        case 68: // D
            movement.right = true;
            break;
        case 83: // S
            movement.down = true;
            break;
    }
});
document.addEventListener("keyup", (event) => {
    switch (event.keyCode) {
        case 65: // A
            movement.left = false;
            break;
        case 87: // W
            movement.up = false;
            break;
        case 68: // D
            movement.right = false;
            break;
        case 83: // S
            movement.down = false;
            break;
    }
});

mousePos = { x: 0, y: 0};

function onMouseMove(event: any) {
    mousePos = foreground.getMousePos(event);
}
window.addEventListener('mousemove', onMouseMove, false);

// Tell the server a new player has joined
socket.emit("new-player");
socket.on("handshake", (info: any) => {
    playerId = info.id;
    playerWidth = info.playerWidth;
    playerHeight = info.playerHeight;
});

// Broadcast player movement
setInterval(() => {
    socket.emit("movement", movement);
}, 1000/60);

// Init canvas
var background  = new Popova();
var env         = new Popova();
var foreground  = new Popova();

background.init("background");
env.init("env");
foreground.init("foreground");

background.drawGrid(50);

// Interpret state and draw players
socket.on("state", (players: any) => {
    foreground.wipeCanvas();
    var canvasSize = foreground.size();

    // TODO: Add smoothing to camera movement
    var renderOffsetX = (!!playerId)
        ? players[playerId].x + playerWidth * foreground.cubeSize() / 2 + (mousePos.x - (canvasSize.width / 2)) / 3
        : undefined;
    var renderOffsetY = (!!playerId)
        ? players[playerId].y + playerHeight * foreground.cubeSize() / 2 + (mousePos.y - (canvasSize.height / 2)) / 3
        : undefined;

    if (!!players) {
        background.wipeCanvas();
        background.drawGrid(gridSize, -renderOffsetX, -renderOffsetY);
    }

    for(var id in players){
        var player = players[id];
        foreground.draw({
            palette: ["#abab9a", "#FF69B4", "#AAAAAA", "#775050"],
            posX: player.x - renderOffsetX + canvasSize.width / 2,
            posY: player.y - renderOffsetY + canvasSize.height / 2,
            facing: 0,
            strokes: [{
                cellX: 0,
                cellY: 2,
                width: 4,
                height: 2,
                swatch: 1
            }, {
                cellX: 1,
                cellY: 0,
                width: 2,
                height: 2,
                swatch: 0
            }, {
                cellX: 0,
                cellY: 3,
                width: 1,
                height: 1,
                swatch: 2
            }, {
                cellX: 3,
                cellY: 3,
                width: 1,
                height: 1,
                swatch: 2
            }, {
                cellX: 1,
                cellY: 4,
                width: 1,
                height: 2,
                swatch: 3
            }, {
                cellX: 2,
                cellY: 4,
                width: 1,
                height: 2,
                swatch: 3
            }]
        });
    }
});
