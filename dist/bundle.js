/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Popova/Popova.ts":
/*!******************************!*\
  !*** ./src/Popova/Popova.ts ***!
  \******************************/
/*! exports provided: Popova */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Popova", function() { return Popova; });
var Popova = /** @class */ (function () {
    function Popova() {
    }
    /**
     * Initializes Popova's canvas
     * @param canvasId Id of html canvas element
     * @param cubeSize Render size for each cube when drawing with cubes
     */
    Popova.prototype.init = function (canvasId, cubeSize) {
        this.canvas = document.getElementById(canvasId);
        this.cubeSize = cubeSize;
        this.width = this.canvas.offsetWidth;
        this.height = this.canvas.offsetHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
    };
    /**
     * Renders a grid on the canvas
     * @param spacing Number of pixels between grid lines
    */
    Popova.prototype.drawGrid = function (spacing, offsetX, offsetY) {
        this.ctx.beginPath();
        this.ctx.save();
        // Draw grid on background
        this.ctx.strokeStyle = "#d0d0d0";
        for (var x = (!!offsetX) ? offsetX % spacing : 0; x <= this.width; x += spacing) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }
        for (var y = (!!offsetY) ? offsetY % spacing : 0; y <= this.height; y += spacing) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }
        this.ctx.restore();
    };
    /**
     * Draws a masterpiece to the canvas
     * @param masterPiece Definition for what to draw
     */
    Popova.prototype.draw = function (masterPiece) {
        var _this = this;
        this.ctx.save();
        this.prepCanvas(masterPiece.posX, masterPiece.posY, masterPiece.width, masterPiece.height, masterPiece.facing, masterPiece.freeHand);
        masterPiece.strokes.forEach(function (stroke) {
            _this.renderStroke(stroke, masterPiece.palette, masterPiece.freeHand);
        });
        this.ctx.restore();
    };
    /**
     * Centers the canvas on position, and rotates to a certain facing
     * @param positionX The x position of what is being drawn
     * @param positionY The y position of what is being drawn
     * @param width The width of what is being drawn
     * @param height The height of what is being drawn
     * @param degrees Degrees to rotate the canvas by
     * @param freeHand If the stroke is rendered with blocks or free hand
     */
    Popova.prototype.prepCanvas = function (positionX, positionY, width, height, degrees, freeHand) {
        this.ctx.beginPath();
        this.ctx.translate(positionX, positionY);
        this.ctx.rotate(degrees * Math.PI / 180);
        if (freeHand) {
            this.ctx.translate(-width / 2, -height / 2);
        }
        else {
            this.ctx.translate(-width * this.cubeSize / 2, -height * this.cubeSize / 2);
        }
    };
    /**
     * Renders
     * @param stroke Stroke to render
     * @param palette Contains the master piece's color swatches
     * @param freeHand If the stroke is rendered with blocks or free hand
     */
    Popova.prototype.renderStroke = function (stroke, palette, freeHand) {
        this.ctx.fillStyle = palette[stroke.swatch];
        if (freeHand) {
            this.ctx.fillRect(stroke.cellX, stroke.cellY, stroke.width, stroke.height);
        }
        else {
            this.ctx.fillRect(stroke.cellX * this.cubeSize, stroke.cellY * this.cubeSize, stroke.width * this.cubeSize, stroke.height * this.cubeSize);
        }
    };
    /**
     * Erases everything on the canvas
     */
    Popova.prototype.wipeCanvas = function () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    };
    /**
     * Returns the canvas' width and height
     */
    Popova.prototype.size = function () {
        return { width: this.width, height: this.height };
    };
    /**
     * Returns Popova's cube render size
     */
    Popova.prototype.getCubeSize = function () {
        return this.cubeSize;
    };
    /**
     * Sets Popova's cube render size
     * @param size Value for cube render size
     */
    Popova.prototype.setCubeSize = function (size) {
        this.cubeSize = size;
    };
    /**
     * Returns mouse position and if mouse is inside canvas
     * @param evt Mouse movement event, containing position information
     */
    Popova.prototype.getMousePos = function (evt) {
        var rect = this.canvas.getBoundingClientRect();
        var posX = evt.clientX - rect.left;
        var posY = evt.clientY - rect.top;
        var offCanvas = false;
        if (posX < 0) {
            posX = 0;
            offCanvas = true;
        }
        if (posY < 0) {
            posY = 0;
            offCanvas = true;
        }
        if (posX > this.width) {
            posX = this.width;
            offCanvas = true;
        }
        if (posY > this.height) {
            posY = this.height;
            offCanvas = true;
        }
        return {
            x: posX,
            y: posY,
            outOfBounds: offCanvas,
        };
    };
    return Popova;
}());



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Popova_Popova__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popova/Popova */ "./src/Popova/Popova.ts");

// Socket listener
var socket = io();
var cubeSize;
var gridSize = 48;
var viewRange = 1 / 2;
var playerId;
var renderOffsetX;
var renderOffsetY;
var mousePos;
var playerInput = {
    up: false,
    down: false,
    left: false,
    right: false,
    build: false,
};
mousePos = { x: 0, y: 0, outOfBounds: true };
// Add listeners to document
document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 65:// A
            playerInput.left = true;
            break;
        case 87:// W
            playerInput.up = true;
            break;
        case 68:// D
            playerInput.right = true;
            break;
        case 83:// S
            playerInput.down = true;
            break;
    }
});
document.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
        case 65:// A
            playerInput.left = false;
            break;
        case 87:// W
            playerInput.up = false;
            break;
        case 68:// D
            playerInput.right = false;
            break;
        case 83:// S
            playerInput.down = false;
            break;
    }
});
function onMouseMove(event) {
    mousePos = foreground.getMousePos(event);
}
window.addEventListener("mousemove", onMouseMove, false);
function onMouseClick(event) {
    if (!mousePos.outOfBounds) {
        socket.emit("mouseDown", {
            sourceId: playerId,
            targetX: (mousePos.x + renderOffsetX),
            targetY: (mousePos.y + renderOffsetY)
        });
    }
}
window.addEventListener("click", onMouseClick, false);
// Init canvas
var background = new _Popova_Popova__WEBPACK_IMPORTED_MODULE_0__["Popova"]();
var env = new _Popova_Popova__WEBPACK_IMPORTED_MODULE_0__["Popova"]();
var foreground = new _Popova_Popova__WEBPACK_IMPORTED_MODULE_0__["Popova"]();
var cover = new _Popova_Popova__WEBPACK_IMPORTED_MODULE_0__["Popova"]();
background.init("background", cubeSize);
env.init("env", cubeSize);
foreground.init("foreground", cubeSize);
cover.init("cover", cubeSize);
// Broadcast player input
setInterval(function () {
    socket.emit("playerInput", playerInput);
}, 1000 / 60);
// Tell the server a new player has joined and handshake
socket.emit("new-player");
socket.on("handshake", function (info) {
    playerId = info.id;
    cubeSize = info.cubeSize;
    background.setCubeSize(cubeSize);
    env.setCubeSize(cubeSize);
    foreground.setCubeSize(cubeSize);
    cover.setCubeSize(cubeSize);
});
// Interpret state and draw objects
socket.on("state", function (objects) {
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
    for (var id in objects) {
        var object = objects[id];
        switch (object.type) {
            case "player":
                foreground.draw(playerMasterPiece(object));
                foreground.draw(healthBarMasterPiece(object));
                break;
            case "projectile":
                env.draw({
                    palette: ["#FF6666", "#66FF66", "#6666FF", "#FFFF66", "#FF66FF", "#66FFFF"],
                    posX: object.x - renderOffsetX,
                    posY: object.y - renderOffsetY,
                    width: object.width,
                    height: object.height,
                    facing: object.facing,
                    strokes: [{
                            cellX: 0,
                            cellY: 0,
                            width: object.width,
                            height: object.height,
                            swatch: Math.floor(Math.random() * 6)
                        }]
                });
                break;
            case "gravestone":
                env.draw({
                    palette: ["#888888"],
                    posX: object.x - renderOffsetX,
                    posY: object.y - renderOffsetY,
                    width: object.width,
                    height: object.height,
                    facing: object.facing,
                    strokes: [{
                            cellX: 0,
                            cellY: 1,
                            width: object.width,
                            height: 1,
                            swatch: 0,
                        }, {
                            cellX: 1,
                            cellY: 0,
                            width: 1,
                            height: object.height,
                            swatch: 0,
                        }]
                });
                env.draw(healthBarMasterPiece(object));
                break;
            case "terrain":
                switch (object.subtype) {
                    case "tree":
                        env.draw(treeTrunkMasterPiece(object));
                        cover.draw(treeLeafMasterPiece(object));
                }
                break;
        }
    }
});
// TODO: Move these to an art collection class, which handles generating art for each of these objects
/**
 * Get master peice for player object
 * @param object The player object
 */
function playerMasterPiece(object) {
    return {
        palette: ["#abab9a", "#775050", "#AAAAAA"].concat(object.teamColor),
        posX: object.x - renderOffsetX,
        posY: object.y - renderOffsetY,
        width: object.width,
        height: object.height,
        facing: 0,
        strokes: [{
                cellX: 0,
                cellY: 2,
                width: 4,
                height: 2,
                swatch: 3
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
                swatch: 1
            }, {
                cellX: 2,
                cellY: 4,
                width: 1,
                height: 2,
                swatch: 1
            }],
    };
}
/**
 * Get master piece for object's health bar
 * @param object The object that needs a health bar
 */
function healthBarMasterPiece(object) {
    return {
        palette: ["#00a400", "#FF0000"],
        posX: object.x - renderOffsetX,
        posY: object.y - renderOffsetY - (object.height + 2) * cubeSize / 2,
        width: object.width * cubeSize,
        height: 1 * cubeSize,
        facing: 0,
        strokes: [{
                cellX: 0,
                cellY: 0,
                width: object.health / object.maxHealth * object.width * cubeSize,
                height: cubeSize * 3 / 4,
                swatch: (object.health > object.maxHealth / 3) ? 0 : 1,
            },],
        freeHand: true
    };
}
/**
 * Get master piece for tree object
 * @param object The tree object
 */
function treeTrunkMasterPiece(object) {
    return {
        palette: ["#993300"],
        posX: object.x - renderOffsetX,
        posY: object.y - renderOffsetY,
        width: object.width,
        height: object.height,
        facing: object.facing,
        strokes: [{
                cellX: 0,
                cellY: 0,
                width: object.width,
                height: object.height,
                swatch: 0
            },],
    };
}
// TODO: Change leaf rendering depending on tree health
/**
 * Get master piece for tree object's leaves
 * @param object The tree object
 */
function treeLeafMasterPiece(object) {
    return {
        palette: ["#228822"],
        posX: object.x - renderOffsetX,
        posY: object.y - renderOffsetY,
        width: object.width,
        height: object.height,
        facing: object.facing,
        strokes: [{
                cellX: -2,
                cellY: -4,
                width: object.width * 2,
                height: object.height,
                swatch: 0
            }, {
                cellX: 0,
                cellY: -10,
                width: 4,
                height: 7,
                swatch: 0
            },],
    };
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BvcG92YS9Qb3BvdmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzFDQTtBQUFBO0lBUUk7SUFBZ0IsQ0FBQztJQUVqQjs7OztPQUlHO0lBQ0gscUJBQUksR0FBSixVQUFLLFFBQWdCLEVBQUUsUUFBZ0I7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBUyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENB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O2dCQUNDLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsTUFBTSxFQUFFLENBQUM7YUFDWixFQUFFO0tBQ04sQ0FBQztBQUNOLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IGludGVyZmFjZSBtYXN0ZXJQaWVjZSB7XG4gICAgcGFsZXR0ZTogc3RyaW5nW10sXG4gICAgcG9zWDogbnVtYmVyLFxuICAgIHBvc1k6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIGZhY2luZzogbnVtYmVyLFxuICAgIHN0cm9rZXM6IHN0cm9rZVtdLFxuICAgIGZyZWVIYW5kPzogYm9vbGVhbixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBzdHJva2Uge1xuICAgIGNlbGxYOiBudW1iZXIsXG4gICAgY2VsbFk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHN3YXRjaDogbnVtYmVyLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIG1vdXNlUG9zaXRpb24ge1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgb3V0T2ZCb3VuZHM6IGJvb2xlYW4sXG59XG5cbmV4cG9ydCBjbGFzcyBQb3BvdmEge1xuXG4gICAgcHJpdmF0ZSBjYW52YXM6IGFueTtcbiAgICBwcml2YXRlIGN0eDogYW55O1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgY3ViZVNpemU6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBQb3BvdmEncyBjYW52YXNcbiAgICAgKiBAcGFyYW0gY2FudmFzSWQgSWQgb2YgaHRtbCBjYW52YXMgZWxlbWVudFxuICAgICAqIEBwYXJhbSBjdWJlU2l6ZSBSZW5kZXIgc2l6ZSBmb3IgZWFjaCBjdWJlIHdoZW4gZHJhd2luZyB3aXRoIGN1YmVzXG4gICAgICovXG4gICAgaW5pdChjYW52YXNJZDogc3RyaW5nLCBjdWJlU2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gPGFueT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpO1xuICAgICAgICB0aGlzLmN1YmVTaXplID0gY3ViZVNpemU7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbnZhcy5vZmZzZXRXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYSBncmlkIG9uIHRoZSBjYW52YXNcbiAgICAgKiBAcGFyYW0gc3BhY2luZyBOdW1iZXIgb2YgcGl4ZWxzIGJldHdlZW4gZ3JpZCBsaW5lc1xuICAgICovXG4gICAgZHJhd0dyaWQoc3BhY2luZzogbnVtYmVyLCBvZmZzZXRYPzogbnVtYmVyLCBvZmZzZXRZPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIC8vIERyYXcgZ3JpZCBvbiBiYWNrZ3JvdW5kXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCIjZDBkMGQwXCI7XG4gICAgICAgIGZvciAodmFyIHggPSAoISFvZmZzZXRYKSA/IG9mZnNldFggJSBzcGFjaW5nIDogMDsgeCA8PSB0aGlzLndpZHRoOyB4ICs9IHNwYWNpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCAwKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB0aGlzLmhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciB5ID0gKCEhb2Zmc2V0WSkgPyBvZmZzZXRZICUgc3BhY2luZyA6IDA7IHkgPD0gdGhpcy5oZWlnaHQ7IHkgKz0gc3BhY2luZykge1xuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKDAsIHkpO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHRoaXMud2lkdGgsIHkpO1xuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhd3MgYSBtYXN0ZXJwaWVjZSB0byB0aGUgY2FudmFzXG4gICAgICogQHBhcmFtIG1hc3RlclBpZWNlIERlZmluaXRpb24gZm9yIHdoYXQgdG8gZHJhd1xuICAgICAqL1xuICAgIGRyYXcobWFzdGVyUGllY2U6IG1hc3RlclBpZWNlKSB7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcblxuICAgICAgICB0aGlzLnByZXBDYW52YXMoXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS5wb3NYLFxuICAgICAgICAgICAgbWFzdGVyUGllY2UucG9zWSxcbiAgICAgICAgICAgIG1hc3RlclBpZWNlLndpZHRoLFxuICAgICAgICAgICAgbWFzdGVyUGllY2UuaGVpZ2h0LFxuICAgICAgICAgICAgbWFzdGVyUGllY2UuZmFjaW5nLFxuICAgICAgICAgICAgbWFzdGVyUGllY2UuZnJlZUhhbmQpO1xuICAgICAgICBtYXN0ZXJQaWVjZS5zdHJva2VzLmZvckVhY2goKHN0cm9rZTogc3Ryb2tlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclN0cm9rZShzdHJva2UsIG1hc3RlclBpZWNlLnBhbGV0dGUsIG1hc3RlclBpZWNlLmZyZWVIYW5kKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENlbnRlcnMgdGhlIGNhbnZhcyBvbiBwb3NpdGlvbiwgYW5kIHJvdGF0ZXMgdG8gYSBjZXJ0YWluIGZhY2luZ1xuICAgICAqIEBwYXJhbSBwb3NpdGlvblggVGhlIHggcG9zaXRpb24gb2Ygd2hhdCBpcyBiZWluZyBkcmF3blxuICAgICAqIEBwYXJhbSBwb3NpdGlvblkgVGhlIHkgcG9zaXRpb24gb2Ygd2hhdCBpcyBiZWluZyBkcmF3blxuICAgICAqIEBwYXJhbSB3aWR0aCBUaGUgd2lkdGggb2Ygd2hhdCBpcyBiZWluZyBkcmF3blxuICAgICAqIEBwYXJhbSBoZWlnaHQgVGhlIGhlaWdodCBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIGRlZ3JlZXMgRGVncmVlcyB0byByb3RhdGUgdGhlIGNhbnZhcyBieVxuICAgICAqIEBwYXJhbSBmcmVlSGFuZCBJZiB0aGUgc3Ryb2tlIGlzIHJlbmRlcmVkIHdpdGggYmxvY2tzIG9yIGZyZWUgaGFuZFxuICAgICAqL1xuICAgIHByZXBDYW52YXMocG9zaXRpb25YOiBudW1iZXIsIHBvc2l0aW9uWTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgZGVncmVlczogbnVtYmVyLCBmcmVlSGFuZD86IGJvb2xlYW4pe1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHBvc2l0aW9uWCwgcG9zaXRpb25ZKTtcbiAgICAgICAgdGhpcy5jdHgucm90YXRlKGRlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgaWYgKGZyZWVIYW5kKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoLSB3aWR0aCAvIDIsIC0gaGVpZ2h0IC8gMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoLSB3aWR0aCAqIHRoaXMuY3ViZVNpemUgLyAyLCAtIGhlaWdodCAqIHRoaXMuY3ViZVNpemUgLyAyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgXG4gICAgICogQHBhcmFtIHN0cm9rZSBTdHJva2UgdG8gcmVuZGVyXG4gICAgICogQHBhcmFtIHBhbGV0dGUgQ29udGFpbnMgdGhlIG1hc3RlciBwaWVjZSdzIGNvbG9yIHN3YXRjaGVzXG4gICAgICogQHBhcmFtIGZyZWVIYW5kIElmIHRoZSBzdHJva2UgaXMgcmVuZGVyZWQgd2l0aCBibG9ja3Mgb3IgZnJlZSBoYW5kXG4gICAgICovXG4gICAgcmVuZGVyU3Ryb2tlKHN0cm9rZTogc3Ryb2tlLCBwYWxldHRlOiBzdHJpbmdbXSwgZnJlZUhhbmQ/OiBib29sZWFuKXtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gcGFsZXR0ZVtzdHJva2Uuc3dhdGNoXTtcbiAgICAgICAgaWYgKGZyZWVIYW5kKXtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHN0cm9rZS5jZWxsWCwgc3Ryb2tlLmNlbGxZLFxuICAgICAgICAgICAgICAgIHN0cm9rZS53aWR0aCwgc3Ryb2tlLmhlaWdodCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChzdHJva2UuY2VsbFggKiB0aGlzLmN1YmVTaXplLCBzdHJva2UuY2VsbFkgKiB0aGlzLmN1YmVTaXplLFxuICAgICAgICAgICAgICAgIHN0cm9rZS53aWR0aCAqIHRoaXMuY3ViZVNpemUsIHN0cm9rZS5oZWlnaHQgKiB0aGlzLmN1YmVTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFcmFzZXMgZXZlcnl0aGluZyBvbiB0aGUgY2FudmFzXG4gICAgICovXG4gICAgd2lwZUNhbnZhcygpIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjYW52YXMnIHdpZHRoIGFuZCBoZWlnaHRcbiAgICAgKi9cbiAgICBzaXplKCk6IHt3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0ge1xuICAgICAgICByZXR1cm4geyB3aWR0aDogdGhpcy53aWR0aCwgaGVpZ2h0OiB0aGlzLiBoZWlnaHQgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIFBvcG92YSdzIGN1YmUgcmVuZGVyIHNpemVcbiAgICAgKi9cbiAgICBnZXRDdWJlU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jdWJlU2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIFBvcG92YSdzIGN1YmUgcmVuZGVyIHNpemVcbiAgICAgKiBAcGFyYW0gc2l6ZSBWYWx1ZSBmb3IgY3ViZSByZW5kZXIgc2l6ZVxuICAgICAqL1xuICAgIHNldEN1YmVTaXplKHNpemU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmN1YmVTaXplID0gc2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG1vdXNlIHBvc2l0aW9uIGFuZCBpZiBtb3VzZSBpcyBpbnNpZGUgY2FudmFzXG4gICAgICogQHBhcmFtIGV2dCBNb3VzZSBtb3ZlbWVudCBldmVudCwgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvblxuICAgICAqL1xuICAgIGdldE1vdXNlUG9zKGV2dDogYW55KTogbW91c2VQb3NpdGlvbiB7XG4gICAgICAgIHZhciByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBwb3NYID0gZXZ0LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgIHZhciBwb3NZID0gZXZ0LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgdmFyIG9mZkNhbnZhcyA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChwb3NYIDwgMCkge1xuICAgICAgICAgICAgcG9zWCA9IDA7XG4gICAgICAgICAgICBvZmZDYW52YXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NZIDwgMCkge1xuICAgICAgICAgICAgcG9zWSA9IDA7XG4gICAgICAgICAgICBvZmZDYW52YXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NYID4gdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgcG9zWCA9IHRoaXMud2lkdGg7XG4gICAgICAgICAgICBvZmZDYW52YXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NZID4gdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHBvc1kgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgICAgIG9mZkNhbnZhcyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHBvc1gsXG4gICAgICAgICAgeTogcG9zWSxcbiAgICAgICAgICBvdXRPZkJvdW5kczogb2ZmQ2FudmFzLFxuICAgICAgICB9O1xuICAgIH1cblxufVxuIiwiaW1wb3J0ICogYXMgc29ja2V0SW8gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcbmltcG9ydCB7IFBvcG92YSwgbW91c2VQb3NpdGlvbiwgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8vIFNvY2tldCBsaXN0ZW5lclxudmFyIHNvY2tldCA9IGlvKCk7XG5cbnZhciBjdWJlU2l6ZTogbnVtYmVyO1xudmFyIGdyaWRTaXplOiBudW1iZXIgPSA0ODtcbnZhciB2aWV3UmFuZ2UgPSAxIC8gMjtcblxudmFyIHBsYXllcklkOiBzdHJpbmc7XG5cbnZhciByZW5kZXJPZmZzZXRYOiBudW1iZXI7XG52YXIgcmVuZGVyT2Zmc2V0WTogbnVtYmVyO1xuXG52YXIgbW91c2VQb3M6IG1vdXNlUG9zaXRpb247XG5cbnZhciBwbGF5ZXJJbnB1dCA9IHtcbiAgICB1cDogZmFsc2UsXG4gICAgZG93bjogZmFsc2UsXG4gICAgbGVmdDogZmFsc2UsXG4gICAgcmlnaHQ6IGZhbHNlLFxuICAgIGJ1aWxkOiBmYWxzZSxcbn1cbm1vdXNlUG9zID0geyB4OiAwLCB5OiAwLCBvdXRPZkJvdW5kczogdHJ1ZSB9O1xuXG5cbi8vIEFkZCBsaXN0ZW5lcnMgdG8gZG9jdW1lbnRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDY1OiAvLyBBXG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5sZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDg3OiAvLyBXXG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC51cCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA2ODogLy8gRFxuICAgICAgICAgICAgcGxheWVySW5wdXQucmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgODM6IC8vIFNcbiAgICAgICAgICAgIHBsYXllcklucHV0LmRvd24gPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgNjU6IC8vIEFcbiAgICAgICAgICAgIHBsYXllcklucHV0LmxlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDg3OiAvLyBXXG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC51cCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNjg6IC8vIERcbiAgICAgICAgICAgIHBsYXllcklucHV0LnJpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA4MzogLy8gU1xuICAgICAgICAgICAgcGxheWVySW5wdXQuZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIG9uTW91c2VNb3ZlKGV2ZW50OiBhbnkpIHtcbiAgICBtb3VzZVBvcyA9IGZvcmVncm91bmQuZ2V0TW91c2VQb3MoZXZlbnQpO1xufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmUsIGZhbHNlKTtcblxuZnVuY3Rpb24gb25Nb3VzZUNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAoIW1vdXNlUG9zLm91dE9mQm91bmRzKSB7XG4gICAgICAgIHNvY2tldC5lbWl0KFwibW91c2VEb3duXCIsIHtcbiAgICAgICAgICAgIHNvdXJjZUlkOiBwbGF5ZXJJZCxcbiAgICAgICAgICAgIHRhcmdldFg6IChtb3VzZVBvcy54ICsgcmVuZGVyT2Zmc2V0WCksXG4gICAgICAgICAgICB0YXJnZXRZOiAobW91c2VQb3MueSArIHJlbmRlck9mZnNldFkpIH0pO1xuICAgIH1cbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25Nb3VzZUNsaWNrLCBmYWxzZSk7XG5cbi8vIEluaXQgY2FudmFzXG52YXIgYmFja2dyb3VuZCAgPSBuZXcgUG9wb3ZhKCk7XG52YXIgZW52ICAgICAgICAgPSBuZXcgUG9wb3ZhKCk7XG52YXIgZm9yZWdyb3VuZCAgPSBuZXcgUG9wb3ZhKCk7XG52YXIgY292ZXIgICAgICAgPSBuZXcgUG9wb3ZhKCk7XG5cbmJhY2tncm91bmQuaW5pdChcImJhY2tncm91bmRcIiwgY3ViZVNpemUpO1xuZW52LmluaXQoXCJlbnZcIiwgY3ViZVNpemUpO1xuZm9yZWdyb3VuZC5pbml0KFwiZm9yZWdyb3VuZFwiLCBjdWJlU2l6ZSk7XG5jb3Zlci5pbml0KFwiY292ZXJcIiwgY3ViZVNpemUpO1xuXG4vLyBCcm9hZGNhc3QgcGxheWVyIGlucHV0XG5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgc29ja2V0LmVtaXQoXCJwbGF5ZXJJbnB1dFwiLCBwbGF5ZXJJbnB1dCk7XG59LCAxMDAwLzYwKTtcblxuLy8gVGVsbCB0aGUgc2VydmVyIGEgbmV3IHBsYXllciBoYXMgam9pbmVkIGFuZCBoYW5kc2hha2VcbnNvY2tldC5lbWl0KFwibmV3LXBsYXllclwiKTtcbnNvY2tldC5vbihcImhhbmRzaGFrZVwiLCAoaW5mbzogYW55KSA9PiB7XG4gICAgcGxheWVySWQgPSBpbmZvLmlkO1xuICAgIGN1YmVTaXplID0gaW5mby5jdWJlU2l6ZTtcbiAgICBiYWNrZ3JvdW5kLnNldEN1YmVTaXplKGN1YmVTaXplKTtcbiAgICBlbnYuc2V0Q3ViZVNpemUoY3ViZVNpemUpO1xuICAgIGZvcmVncm91bmQuc2V0Q3ViZVNpemUoY3ViZVNpemUpO1xuICAgIGNvdmVyLnNldEN1YmVTaXplKGN1YmVTaXplKTtcbn0pO1xuXG4vLyBJbnRlcnByZXQgc3RhdGUgYW5kIGRyYXcgb2JqZWN0c1xuc29ja2V0Lm9uKFwic3RhdGVcIiwgKG9iamVjdHM6IGFueSkgPT4ge1xuICAgIGZvcmVncm91bmQud2lwZUNhbnZhcygpO1xuICAgIGVudi53aXBlQ2FudmFzKCk7XG4gICAgY292ZXIud2lwZUNhbnZhcygpO1xuICAgIHZhciBjYW52YXNTaXplID0gZm9yZWdyb3VuZC5zaXplKCk7XG5cbiAgICAvLyBUT0RPOiBBZGQgc21vb3RoaW5nIHRvIGNhbWVyYSBtb3ZlbWVudFxuICAgIHJlbmRlck9mZnNldFggPSAoISFwbGF5ZXJJZClcbiAgICAgICAgPyBvYmplY3RzW3BsYXllcklkXS54ICsgKG1vdXNlUG9zLnggLSAoY2FudmFzU2l6ZS53aWR0aCAvIDIpKSAqIHZpZXdSYW5nZSAtIGNhbnZhc1NpemUud2lkdGggLyAyXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIHJlbmRlck9mZnNldFkgPSAoISFwbGF5ZXJJZClcbiAgICAgICAgPyBvYmplY3RzW3BsYXllcklkXS55ICsgKG1vdXNlUG9zLnkgLSAoY2FudmFzU2l6ZS5oZWlnaHQgLyAyKSkgKiB2aWV3UmFuZ2UgLSBjYW52YXNTaXplLmhlaWdodCAvIDJcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBUT0RPOiBEb24ndCB3aXBlIGJhY2tncm91bmQgY2FudmFzLCB0cmFuc2xhdGUgaXQgdG8gbWF0Y2ggcGxheWVyIHBvc2l0aW9uXG4gICAgaWYgKCEhb2JqZWN0cykge1xuICAgICAgICBiYWNrZ3JvdW5kLndpcGVDYW52YXMoKTtcbiAgICAgICAgYmFja2dyb3VuZC5kcmF3R3JpZChncmlkU2l6ZSwgLXJlbmRlck9mZnNldFgsIC1yZW5kZXJPZmZzZXRZKTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGlkIGluIG9iamVjdHMpe1xuICAgICAgICB2YXIgb2JqZWN0ID0gb2JqZWN0c1tpZF07XG5cbiAgICAgICAgc3dpdGNoIChvYmplY3QudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcInBsYXllclwiOlxuICAgICAgICAgICAgICAgIGZvcmVncm91bmQuZHJhdyhwbGF5ZXJNYXN0ZXJQaWVjZShvYmplY3QpKTtcbiAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kLmRyYXcoaGVhbHRoQmFyTWFzdGVyUGllY2Uob2JqZWN0KSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicHJvamVjdGlsZVwiOlxuICAgICAgICAgICAgICAgIGVudi5kcmF3KHtcbiAgICAgICAgICAgICAgICAgICAgcGFsZXR0ZTogW1wiI0ZGNjY2NlwiLCBcIiM2NkZGNjZcIiwgXCIjNjY2NkZGXCIsIFwiI0ZGRkY2NlwiLCBcIiNGRjY2RkZcIiwgXCIjNjZGRkZGXCJdLFxuICAgICAgICAgICAgICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgICAgICAgICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3YXRjaDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNilcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJncmF2ZXN0b25lXCI6XG4gICAgICAgICAgICAgICAgZW52LmRyYXcoe1xuICAgICAgICAgICAgICAgICAgICBwYWxldHRlOiBbXCIjODg4ODg4XCJdLFxuICAgICAgICAgICAgICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgICAgICAgICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3YXRjaDogMCxcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3dhdGNoOiAwLFxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGVudi5kcmF3KGhlYWx0aEJhck1hc3RlclBpZWNlKG9iamVjdCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInRlcnJhaW5cIjpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0cmVlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyh0cmVlVHJ1bmtNYXN0ZXJQaWVjZShvYmplY3QpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdmVyLmRyYXcodHJlZUxlYWZNYXN0ZXJQaWVjZShvYmplY3QpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLy8gVE9ETzogTW92ZSB0aGVzZSB0byBhbiBhcnQgY29sbGVjdGlvbiBjbGFzcywgd2hpY2ggaGFuZGxlcyBnZW5lcmF0aW5nIGFydCBmb3IgZWFjaCBvZiB0aGVzZSBvYmplY3RzXG5cbi8qKlxuICogR2V0IG1hc3RlciBwZWljZSBmb3IgcGxheWVyIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgcGxheWVyIG9iamVjdFxuICovXG5mdW5jdGlvbiBwbGF5ZXJNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSk6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjYWJhYjlhXCIsIFwiIzc3NTA1MFwiLCBcIiNBQUFBQUFcIl0uY29uY2F0KG9iamVjdC50ZWFtQ29sb3IpLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IDAsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAyLFxuICAgICAgICAgICAgd2lkdGg6IDQsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDNcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDMsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMyxcbiAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAyLFxuICAgICAgICAgICAgY2VsbFk6IDQsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9XSxcbiAgICB9XG59XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3Igb2JqZWN0J3MgaGVhbHRoIGJhclxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0IHRoYXQgbmVlZHMgYSBoZWFsdGggYmFyXG4gKi9cbmZ1bmN0aW9uIGhlYWx0aEJhck1hc3RlclBpZWNlKG9iamVjdDogYW55KTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiMwMGE0MDBcIiwgXCIjRkYwMDAwXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSAtIChvYmplY3QuaGVpZ2h0ICsgMikgKiBjdWJlU2l6ZSAvIDIsXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggKiBjdWJlU2l6ZSxcbiAgICAgICAgaGVpZ2h0OiAxICogY3ViZVNpemUsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LmhlYWx0aCAvIG9iamVjdC5tYXhIZWFsdGggKiBvYmplY3Qud2lkdGggKiBjdWJlU2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogY3ViZVNpemUgKiAzIC8gNCxcbiAgICAgICAgICAgIHN3YXRjaDogKG9iamVjdC5oZWFsdGggPiBvYmplY3QubWF4SGVhbHRoIC8gMykgPyAwIDogMSxcbiAgICAgICAgfSxdLFxuICAgIGZyZWVIYW5kOiB0cnVlfTtcbn1cblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciB0cmVlIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgdHJlZSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gdHJlZVRydW5rTWFzdGVyUGllY2Uob2JqZWN0OiBhbnkpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzk5MzMwMFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdLFxuICAgIH07XG59XG5cbi8vIFRPRE86IENoYW5nZSBsZWFmIHJlbmRlcmluZyBkZXBlbmRpbmcgb24gdHJlZSBoZWFsdGhcbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgdHJlZSBvYmplY3QncyBsZWF2ZXNcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHRyZWUgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIHRyZWVMZWFmTWFzdGVyUGllY2Uob2JqZWN0OiBhbnkpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzIyODgyMlwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IC0yLFxuICAgICAgICAgICAgY2VsbFk6IC00LFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAqIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogLTEwLFxuICAgICAgICAgICAgd2lkdGg6IDQsXG4gICAgICAgICAgICBoZWlnaHQ6IDcsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdLFxuICAgIH07XG59XG4iXSwic291cmNlUm9vdCI6IiJ9