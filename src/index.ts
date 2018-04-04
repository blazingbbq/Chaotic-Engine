import * as socketIo from "socket.io-client";
import { Popova, mousePosition, masterPiece } from "./Popova/Popova";
import * as louvre from "./Louvre/Louvre";
import * as types from "../ObjectTypes";

// Socket listener
var socket = io();
var debug = true;

var cubeSize: number;
var gridSize: number = 48;
var canvasSize: { width: number, height: number };
var equipmentIconPosX: number = 976;
var equipmentIconPosY: number = 726;

var playerId: string;

var renderOffsetX: number;
var renderOffsetY: number;
var cameraMovingToX: number;
var cameraMovingToY: number;
var cameraPanSpeed = 0.015;

var mousePos: mousePosition;

var playerInput = {
    up: false,
    down: false,
    left: false,
    right: false,
    cycleEquipmentForward: false,
    cycleEquipmentBackward: false,
    pickup: false,
}
mousePos = { x: 0, y: 0, outOfBounds: true };

var KEY_UP = 87;                        // Default to W
var KEY_DOWN = 83;                      // Default to S
var KEY_RIGHT = 68;                     // Default to D
var KEY_LEFT = 65;                      // Default to A
var KEY_CYCLE_EQUIPMENT_FORWARD = 69;   // Default to E
var KEY_CYCLE_EQUIPMENT_BACKWARD = 81;  // Default to Q
var KEY_PICKUP = 70                     // Default to F

var prevTime = 0;
var delta = 0;

// Add listeners to document
document.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
        case KEY_UP: // W
            playerInput.up = true;
            break;
        case KEY_DOWN: // S
            playerInput.down = true;
            break;
        case KEY_RIGHT: // D
            playerInput.right = true;
            break;
        case KEY_LEFT: // A
            playerInput.left = true;
            break;
        case KEY_CYCLE_EQUIPMENT_FORWARD:
            playerInput.cycleEquipmentForward = true;
            break;
        case KEY_CYCLE_EQUIPMENT_BACKWARD:
            playerInput.cycleEquipmentBackward = true;
            break;
        case KEY_PICKUP:
            playerInput.pickup = true;
            break;
        default:
            return;
    }
    socket.emit("playerInput", playerInput);
    playerInput.pickup = false;
    playerInput.cycleEquipmentForward = false;
    playerInput.cycleEquipmentBackward = false;
});
document.addEventListener("keyup", (event) => {
    switch (event.keyCode) {
        case KEY_UP: // W
            playerInput.up = false;
            break;
        case KEY_DOWN: // S
            playerInput.down = false;
            break;
        case KEY_RIGHT: // D
            playerInput.right = false;
            break;
        case KEY_LEFT: // A
            playerInput.left = false;
            break;
        default:
            return;
    }
    socket.emit("playerInput", playerInput);
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
            targetY: (mousePos.y + renderOffsetY),
            playerInput: playerInput,
        });
    }
}
window.addEventListener("click", onMouseClick, false);

// Init canvas
var background  = new Popova();
var env         = new Popova();
var foreground  = new Popova();
var cover       = new Popova();
var ui          = new Popova();

background.init("background");
env.init("env");
foreground.init("foreground");
cover.init("cover");
ui.init("ui");

// Tell the server a new player has joined and handshake
socket.emit("new-player");
socket.on("handshake", (info: any) => {
    playerId = info.id;
    cubeSize = info.cubeSize;
    background.setCubeSize(cubeSize);
    env.setCubeSize(cubeSize);
    foreground.setCubeSize(cubeSize);
    cover.setCubeSize(cubeSize);
    ui.setCubeSize(cubeSize);
    canvasSize = foreground.size();

    prevTime = Date.now();
    renderOffsetX = 0;
    renderOffsetY = 0;
});

// Interpret state and draw objects
socket.on("state", (objects: any) => {
    var player = undefined;
    if (playerId && objects[playerId]) {
        player = objects[playerId];
    }

    if (!canvasSize) {
        return;
    }

    foreground.wipeCanvas();
    env.wipeCanvas();
    cover.wipeCanvas();
    ui.wipeCanvas();

    const time = Date.now();
    delta = time - prevTime;
    prevTime = time;

    // Camera smoothing and render offset calculations
    cameraMovingToX = (!!player)
        ? player.x + (mousePos.x - (canvasSize.width / 2)) * player.viewRange - canvasSize.width / 2
        : undefined;
    cameraMovingToY = (!!player)
        ? player.y + (mousePos.y - (canvasSize.height / 2)) * player.viewRange - canvasSize.height / 2
        : undefined;

    renderOffsetX += (!!cameraMovingToX)
        ? (cameraMovingToX - renderOffsetX) * cameraPanSpeed * delta
        : 0;
    renderOffsetY += (!!cameraMovingToY)
        ? (cameraMovingToY - renderOffsetY) * cameraPanSpeed * delta
        : 0;

    // TODO: Draw background map (instead of/with grid)
    if (!!objects) {
        background.wipeCanvas();
        background.drawGrid(gridSize, -renderOffsetX, -renderOffsetY);
    }

    if (debug) {
        ui.drawText(delta.toString() + "ms", canvasSize.width - 48, 16);
    }

    // Draw current equipment ui icon
    if (player && player.currentEquipment != undefined) {
        switch (player.equipment[player.currentEquipment].type) {
            case types.EquipmentTypes.BLASTER:
                ui.draw(louvre.blasterUIMasterPiece(equipmentIconPosX, equipmentIconPosY));
                break;
            case types.EquipmentTypes.SCANNER:
                ui.draw(louvre.scannerUIMasterPiece(equipmentIconPosX, equipmentIconPosY));
                break;
            case types.EquipmentTypes.BUILDER:
                ui.draw(louvre.builderUIMasterPiece(equipmentIconPosX, equipmentIconPosY));
                break;
            case types.EquipmentTypes.BINOCULARS:
                ui.draw(louvre.binocularsUIMasterPiece(equipmentIconPosX, equipmentIconPosY));
                break;
            default:
                break;
        }
    }

    for (var id in objects) {
        var object = objects[id];

        switch (object.type) {
            case types.ObjectTypes.PLAYER:
                foreground.draw(louvre.playerMasterPiece(object, renderOffsetX, renderOffsetY));
                foreground.draw(louvre.healthBarMasterPiece(object, renderOffsetX, renderOffsetY, cubeSize));
                break;
            case types.ObjectTypes.PROJECTILE:
                env.draw(louvre.projectileMasterPiece(object, renderOffsetX, renderOffsetY));
                break;
            case types.ObjectTypes.GRAVESTONE:
                env.draw(louvre.graveStoneMasterPiece(object, renderOffsetX, renderOffsetY));
                env.draw(louvre.healthBarMasterPiece(object, renderOffsetX, renderOffsetY, cubeSize));
                break;
            case types.ObjectTypes.TERRAIN:
                switch (object.subtype) {
                    case types.Terrain.TREE:
                        env.draw(louvre.treeTrunkMasterPiece(object, renderOffsetX, renderOffsetY));
                        cover.draw(louvre.treeLeafMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                    case types.Terrain.WALL_HORIZ:
                        env.draw(louvre.wallHorizBaseMasterPiece(object, renderOffsetX, renderOffsetY));
                        cover.draw(louvre.wallHorizCoverMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case types.ObjectTypes.INTERACTABLE:
                switch (object.subtype) {
                    case types.Interactable.HEALTH_PICKUP:
                        env.draw(louvre.healthPickupMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case types.ObjectTypes.TRIGGER:
                switch (object.subtype) {
                    case types.Trigger.SPIKE_TRAP:
                        env.draw(louvre.spikeTrapMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case types.ObjectTypes.VEHICLE:
                switch (object.subtype) {
                    case types.Vehicle.CAR:
                        foreground.draw(louvre.carMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            default:
                env.draw(louvre.defaultTerrainMasterPiece(object, renderOffsetX, renderOffsetY));
                break;
        }
    }
});
