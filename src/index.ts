import * as socketIo from "socket.io-client";
import { Popova, mousePosition, masterPiece } from "./Popova/Popova";
import * as louvre from "./Louvre/Louvre";

// Socket listener
var socket = io();

var cubeSize: number;
var gridSize: number = 48;
var viewRange = 1 / 2;

var playerId: string;

var renderOffsetX: number;
var renderOffsetY: number;

var mousePos: mousePosition;

var playerInput = {
    up: false,
    down: false,
    left: false,
    right: false,
    build: false,
}
mousePos = { x: 0, y: 0, outOfBounds: true };


// Add listeners to document
document.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
        case 65: // A
            playerInput.left = true;
            break;
        case 87: // W
            playerInput.up = true;
            break;
        case 68: // D
            playerInput.right = true;
            break;
        case 83: // S
            playerInput.down = true;
            break;
    }
});
document.addEventListener("keyup", (event) => {
    switch (event.keyCode) {
        case 65: // A
            playerInput.left = false;
            break;
        case 87: // W
            playerInput.up = false;
            break;
        case 68: // D
            playerInput.right = false;
            break;
        case 83: // S
            playerInput.down = false;
            break;
    }
});

function onMouseMove(event: any) {
    mousePos = foreground.getMousePos(event);
}
window.addEventListener("mousemove", onMouseMove, false);

function onMouseClick(event: any) {
    if (!mousePos.outOfBounds) {
        socket.emit("mouseDown", {
            sourceId: playerId,
            targetX: (mousePos.x + renderOffsetX),
            targetY: (mousePos.y + renderOffsetY) });
    }
}
window.addEventListener("click", onMouseClick, false);

// Init canvas
var background  = new Popova();
var env         = new Popova();
var foreground  = new Popova();
var cover       = new Popova();

background.init("background", cubeSize);
env.init("env", cubeSize);
foreground.init("foreground", cubeSize);
cover.init("cover", cubeSize);

// Broadcast player input
setInterval(() => {
    socket.emit("playerInput", playerInput);
}, 1000/60);

// Tell the server a new player has joined and handshake
socket.emit("new-player");
socket.on("handshake", (info: any) => {
    playerId = info.id;
    cubeSize = info.cubeSize;
    background.setCubeSize(cubeSize);
    env.setCubeSize(cubeSize);
    foreground.setCubeSize(cubeSize);
    cover.setCubeSize(cubeSize);
});

// Interpret state and draw objects
socket.on("state", (objects: any) => {
    foreground.wipeCanvas();
    env.wipeCanvas();
    cover.wipeCanvas();
    var canvasSize = foreground.size();

    // TODO: Add smoothing to camera movement
    renderOffsetX = (!!playerId)
        ? objects[playerId].x + (mousePos.x - (canvasSize.width / 2)) * viewRange - canvasSize.width / 2
        : undefined;
    renderOffsetY = (!!playerId)
        ? objects[playerId].y + (mousePos.y - (canvasSize.height / 2)) * viewRange - canvasSize.height / 2
        : undefined;

    // TODO: Don't wipe background canvas, translate it to match player position
    if (!!objects) {
        background.wipeCanvas();
        background.drawGrid(gridSize, -renderOffsetX, -renderOffsetY);
    }

    for(var id in objects){
        var object = objects[id];

        switch (object.type) {
            case "player":
                foreground.draw(louvre.playerMasterPiece(object, renderOffsetX, renderOffsetY));
                foreground.draw(louvre.healthBarMasterPiece(object, renderOffsetX, renderOffsetY, cubeSize));
                break;
            case "projectile":
                env.draw(louvre.projectileMasterPiece(object, renderOffsetX, renderOffsetY));
                break;
            case "gravestone":
                env.draw(louvre.graveStoneMasterPiece(object, renderOffsetX, renderOffsetY));
                env.draw(louvre.healthBarMasterPiece(object, renderOffsetX, renderOffsetY, cubeSize));
                break;
            case "terrain":
                switch (object.subtype) {
                    case "tree":
                        env.draw(louvre.treeTrunkMasterPiece(object, renderOffsetX, renderOffsetY));
                        cover.draw(louvre.treeLeafMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                    default:
                        env.draw(louvre.defaultTerrainMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
        }
    }
});
