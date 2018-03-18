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
var healthBarHeight = 6;
var viewRange = 1 / 2;
var playerId;
var renderOffsetX;
var renderOffsetY;
var mousePos;
var movement = {
    up: false,
    down: false,
    left: false,
    right: false
};
mousePos = { x: 0, y: 0, outOfBounds: true };
// Add listeners to document
document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 65:// A
            movement.left = true;
            break;
        case 87:// W
            movement.up = true;
            break;
        case 68:// D
            movement.right = true;
            break;
        case 83:// S
            movement.down = true;
            break;
    }
});
document.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
        case 65:// A
            movement.left = false;
            break;
        case 87:// W
            movement.up = false;
            break;
        case 68:// D
            movement.right = false;
            break;
        case 83:// S
            movement.down = false;
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
background.init("background", cubeSize);
env.init("env", cubeSize);
foreground.init("foreground", cubeSize);
// Broadcast player movement
setInterval(function () {
    socket.emit("movement", movement);
}, 1000 / 60);
// Tell the server a new player has joined and handshake
socket.emit("new-player");
socket.on("handshake", function (info) {
    playerId = info.id;
    cubeSize = info.cubeSize;
    background.setCubeSize(cubeSize);
    env.setCubeSize(cubeSize);
    foreground.setCubeSize(cubeSize);
});
// Interpret state and draw objects
socket.on("state", function (objects) {
    foreground.wipeCanvas();
    env.wipeCanvas();
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
                foreground.draw({
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
                });
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
        }
    }
});
/**
 * Get master piece for object's health bar
 * @param object The object that needs a health bar
 * @param renderOffsetX The horizontal render offset
 * @param renderOffsetY The vertical render offset
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
                height: healthBarHeight,
                swatch: (object.health > object.maxHealth / 3) ? 0 : 1,
            },],
        freeHand: true
    };
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BvcG92YS9Qb3BvdmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzFDQTtBQUFBO0lBUUk7SUFBZ0IsQ0FBQztJQUVqQjs7OztPQUlHO0lBQ0gscUJBQUksR0FBSixVQUFLLFFBQWdCLEVBQUUsUUFBZ0I7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBUyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENB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QUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUM7UUFDbkUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUTtRQUM5QixNQUFNLEVBQUUsQ0FBQyxHQUFHLFFBQVE7UUFDcEIsTUFBTSxFQUFFLENBQUM7UUFDVCxPQUFPLEVBQUUsQ0FBQztnQkFDTixLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUTtnQkFDakUsTUFBTSxFQUFFLGVBQWU7Z0JBQ3ZCLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3pELEVBQUU7UUFDSCxRQUFRLEVBQUUsSUFBSTtLQUFDLENBQUM7QUFDeEIsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJleHBvcnQgaW50ZXJmYWNlIG1hc3RlclBpZWNlIHtcbiAgICBwYWxldHRlOiBzdHJpbmdbXSxcbiAgICBwb3NYOiBudW1iZXIsXG4gICAgcG9zWTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgZmFjaW5nOiBudW1iZXIsXG4gICAgc3Ryb2tlczogc3Ryb2tlW10sXG4gICAgZnJlZUhhbmQ/OiBib29sZWFuLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIHN0cm9rZSB7XG4gICAgY2VsbFg6IG51bWJlcixcbiAgICBjZWxsWTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgc3dhdGNoOiBudW1iZXIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgbW91c2VQb3NpdGlvbiB7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICBvdXRPZkJvdW5kczogYm9vbGVhbixcbn1cblxuZXhwb3J0IGNsYXNzIFBvcG92YSB7XG5cbiAgICBwcml2YXRlIGNhbnZhczogYW55O1xuICAgIHByaXZhdGUgY3R4OiBhbnk7XG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBjdWJlU2l6ZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIFBvcG92YSdzIGNhbnZhc1xuICAgICAqIEBwYXJhbSBjYW52YXNJZCBJZCBvZiBodG1sIGNhbnZhcyBlbGVtZW50XG4gICAgICogQHBhcmFtIGN1YmVTaXplIFJlbmRlciBzaXplIGZvciBlYWNoIGN1YmUgd2hlbiBkcmF3aW5nIHdpdGggY3ViZXNcbiAgICAgKi9cbiAgICBpbml0KGNhbnZhc0lkOiBzdHJpbmcsIGN1YmVTaXplOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSA8YW55PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNJZCk7XG4gICAgICAgIHRoaXMuY3ViZVNpemUgPSBjdWJlU2l6ZTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY2FudmFzLm9mZnNldFdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY2FudmFzLm9mZnNldEhlaWdodDtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIGdyaWQgb24gdGhlIGNhbnZhc1xuICAgICAqIEBwYXJhbSBzcGFjaW5nIE51bWJlciBvZiBwaXhlbHMgYmV0d2VlbiBncmlkIGxpbmVzXG4gICAgKi9cbiAgICBkcmF3R3JpZChzcGFjaW5nOiBudW1iZXIsIG9mZnNldFg/OiBudW1iZXIsIG9mZnNldFk/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgLy8gRHJhdyBncmlkIG9uIGJhY2tncm91bmRcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIiNkMGQwZDBcIjtcbiAgICAgICAgZm9yICh2YXIgeCA9ICghIW9mZnNldFgpID8gb2Zmc2V0WCAlIHNwYWNpbmcgOiAwOyB4IDw9IHRoaXMud2lkdGg7IHggKz0gc3BhY2luZykge1xuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIDApO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIHkgPSAoISFvZmZzZXRZKSA/IG9mZnNldFkgJSBzcGFjaW5nIDogMDsgeSA8PSB0aGlzLmhlaWdodDsgeSArPSBzcGFjaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oMCwgeSk7XG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8odGhpcy53aWR0aCwgeSk7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmF3cyBhIG1hc3RlcnBpZWNlIHRvIHRoZSBjYW52YXNcbiAgICAgKiBAcGFyYW0gbWFzdGVyUGllY2UgRGVmaW5pdGlvbiBmb3Igd2hhdCB0byBkcmF3XG4gICAgICovXG4gICAgZHJhdyhtYXN0ZXJQaWVjZTogbWFzdGVyUGllY2UpIHtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuXG4gICAgICAgIHRoaXMucHJlcENhbnZhcyhcbiAgICAgICAgICAgIG1hc3RlclBpZWNlLnBvc1gsXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS5wb3NZLFxuICAgICAgICAgICAgbWFzdGVyUGllY2Uud2lkdGgsXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS5oZWlnaHQsXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS5mYWNpbmcsXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS5mcmVlSGFuZCk7XG4gICAgICAgIG1hc3RlclBpZWNlLnN0cm9rZXMuZm9yRWFjaCgoc3Ryb2tlOiBzdHJva2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU3Ryb2tlKHN0cm9rZSwgbWFzdGVyUGllY2UucGFsZXR0ZSwgbWFzdGVyUGllY2UuZnJlZUhhbmQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2VudGVycyB0aGUgY2FudmFzIG9uIHBvc2l0aW9uLCBhbmQgcm90YXRlcyB0byBhIGNlcnRhaW4gZmFjaW5nXG4gICAgICogQHBhcmFtIHBvc2l0aW9uWCBUaGUgeCBwb3NpdGlvbiBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIHBvc2l0aW9uWSBUaGUgeSBwb3NpdGlvbiBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIHdpZHRoIFRoZSB3aWR0aCBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIGhlaWdodCBUaGUgaGVpZ2h0IG9mIHdoYXQgaXMgYmVpbmcgZHJhd25cbiAgICAgKiBAcGFyYW0gZGVncmVlcyBEZWdyZWVzIHRvIHJvdGF0ZSB0aGUgY2FudmFzIGJ5XG4gICAgICogQHBhcmFtIGZyZWVIYW5kIElmIHRoZSBzdHJva2UgaXMgcmVuZGVyZWQgd2l0aCBibG9ja3Mgb3IgZnJlZSBoYW5kXG4gICAgICovXG4gICAgcHJlcENhbnZhcyhwb3NpdGlvblg6IG51bWJlciwgcG9zaXRpb25ZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBkZWdyZWVzOiBudW1iZXIsIGZyZWVIYW5kPzogYm9vbGVhbil7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUocG9zaXRpb25YLCBwb3NpdGlvblkpO1xuICAgICAgICB0aGlzLmN0eC5yb3RhdGUoZGVncmVlcyAqIE1hdGguUEkgLyAxODApO1xuICAgICAgICBpZiAoZnJlZUhhbmQpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSgtIHdpZHRoIC8gMiwgLSBoZWlnaHQgLyAyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSgtIHdpZHRoICogdGhpcy5jdWJlU2l6ZSAvIDIsIC0gaGVpZ2h0ICogdGhpcy5jdWJlU2l6ZSAvIDIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBcbiAgICAgKiBAcGFyYW0gc3Ryb2tlIFN0cm9rZSB0byByZW5kZXJcbiAgICAgKiBAcGFyYW0gcGFsZXR0ZSBDb250YWlucyB0aGUgbWFzdGVyIHBpZWNlJ3MgY29sb3Igc3dhdGNoZXNcbiAgICAgKiBAcGFyYW0gZnJlZUhhbmQgSWYgdGhlIHN0cm9rZSBpcyByZW5kZXJlZCB3aXRoIGJsb2NrcyBvciBmcmVlIGhhbmRcbiAgICAgKi9cbiAgICByZW5kZXJTdHJva2Uoc3Ryb2tlOiBzdHJva2UsIHBhbGV0dGU6IHN0cmluZ1tdLCBmcmVlSGFuZD86IGJvb2xlYW4pe1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBwYWxldHRlW3N0cm9rZS5zd2F0Y2hdO1xuICAgICAgICBpZiAoZnJlZUhhbmQpe1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3Qoc3Ryb2tlLmNlbGxYLCBzdHJva2UuY2VsbFksXG4gICAgICAgICAgICAgICAgc3Ryb2tlLndpZHRoLCBzdHJva2UuaGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHN0cm9rZS5jZWxsWCAqIHRoaXMuY3ViZVNpemUsIHN0cm9rZS5jZWxsWSAqIHRoaXMuY3ViZVNpemUsXG4gICAgICAgICAgICAgICAgc3Ryb2tlLndpZHRoICogdGhpcy5jdWJlU2l6ZSwgc3Ryb2tlLmhlaWdodCAqIHRoaXMuY3ViZVNpemUpO1xuICAgICAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVyYXNlcyBldmVyeXRoaW5nIG9uIHRoZSBjYW52YXNcbiAgICAgKi9cbiAgICB3aXBlQ2FudmFzKCkge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhbnZhcycgd2lkdGggYW5kIGhlaWdodFxuICAgICAqL1xuICAgIHNpemUoKToge3dpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfSB7XG4gICAgICAgIHJldHVybiB7IHdpZHRoOiB0aGlzLndpZHRoLCBoZWlnaHQ6IHRoaXMuIGhlaWdodCB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgUG9wb3ZhJ3MgY3ViZSByZW5kZXIgc2l6ZVxuICAgICAqL1xuICAgIGdldEN1YmVTaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1YmVTaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgUG9wb3ZhJ3MgY3ViZSByZW5kZXIgc2l6ZVxuICAgICAqIEBwYXJhbSBzaXplIFZhbHVlIGZvciBjdWJlIHJlbmRlciBzaXplXG4gICAgICovXG4gICAgc2V0Q3ViZVNpemUoc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY3ViZVNpemUgPSBzaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgbW91c2UgcG9zaXRpb24gYW5kIGlmIG1vdXNlIGlzIGluc2lkZSBjYW52YXNcbiAgICAgKiBAcGFyYW0gZXZ0IE1vdXNlIG1vdmVtZW50IGV2ZW50LCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uXG4gICAgICovXG4gICAgZ2V0TW91c2VQb3MoZXZ0OiBhbnkpOiBtb3VzZVBvc2l0aW9uIHtcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHBvc1ggPSBldnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgdmFyIHBvc1kgPSBldnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICB2YXIgb2ZmQ2FudmFzID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHBvc1ggPCAwKSB7XG4gICAgICAgICAgICBwb3NYID0gMDtcbiAgICAgICAgICAgIG9mZkNhbnZhcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc1kgPCAwKSB7XG4gICAgICAgICAgICBwb3NZID0gMDtcbiAgICAgICAgICAgIG9mZkNhbnZhcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc1ggPiB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICBwb3NYID0gdGhpcy53aWR0aDtcbiAgICAgICAgICAgIG9mZkNhbnZhcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc1kgPiB0aGlzLmhlaWdodCkge1xuICAgICAgICAgICAgcG9zWSA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICAgICAgb2ZmQ2FudmFzID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogcG9zWCxcbiAgICAgICAgICB5OiBwb3NZLFxuICAgICAgICAgIG91dE9mQm91bmRzOiBvZmZDYW52YXMsXG4gICAgICAgIH07XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgKiBhcyBzb2NrZXRJbyBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xuaW1wb3J0IHsgUG9wb3ZhLCBtb3VzZVBvc2l0aW9uLCBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuL1BvcG92YS9Qb3BvdmFcIjtcblxuLy8gU29ja2V0IGxpc3RlbmVyXG52YXIgc29ja2V0ID0gaW8oKTtcblxudmFyIGN1YmVTaXplOiBudW1iZXI7XG52YXIgZ3JpZFNpemU6IG51bWJlciA9IDQ4O1xudmFyIGhlYWx0aEJhckhlaWdodCA9IDY7XG52YXIgdmlld1JhbmdlID0gMSAvIDI7XG5cbnZhciBwbGF5ZXJJZDogc3RyaW5nO1xuXG52YXIgcmVuZGVyT2Zmc2V0WDogbnVtYmVyO1xudmFyIHJlbmRlck9mZnNldFk6IG51bWJlcjtcblxudmFyIG1vdXNlUG9zOiBtb3VzZVBvc2l0aW9uO1xuXG52YXIgbW92ZW1lbnQgPSB7XG4gICAgdXA6IGZhbHNlLFxuICAgIGRvd246IGZhbHNlLFxuICAgIGxlZnQ6IGZhbHNlLFxuICAgIHJpZ2h0OiBmYWxzZVxufVxubW91c2VQb3MgPSB7IHg6IDAsIHk6IDAsIG91dE9mQm91bmRzOiB0cnVlIH07XG5cblxuLy8gQWRkIGxpc3RlbmVycyB0byBkb2N1bWVudFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgNjU6IC8vIEFcbiAgICAgICAgICAgIG1vdmVtZW50LmxlZnQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgODc6IC8vIFdcbiAgICAgICAgICAgIG1vdmVtZW50LnVwID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDY4OiAvLyBEXG4gICAgICAgICAgICBtb3ZlbWVudC5yaWdodCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA4MzogLy8gU1xuICAgICAgICAgICAgbW92ZW1lbnQuZG93biA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59KTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSA2NTogLy8gQVxuICAgICAgICAgICAgbW92ZW1lbnQubGVmdCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgODc6IC8vIFdcbiAgICAgICAgICAgIG1vdmVtZW50LnVwID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA2ODogLy8gRFxuICAgICAgICAgICAgbW92ZW1lbnQucmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDgzOiAvLyBTXG4gICAgICAgICAgICBtb3ZlbWVudC5kb3duID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gb25Nb3VzZU1vdmUoZXZlbnQ6IGFueSkge1xuICAgIG1vdXNlUG9zID0gZm9yZWdyb3VuZC5nZXRNb3VzZVBvcyhldmVudCk7XG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSwgZmFsc2UpO1xuXG5mdW5jdGlvbiBvbk1vdXNlQ2xpY2soZXZlbnQ6IGFueSkge1xuICAgIGlmICghbW91c2VQb3Mub3V0T2ZCb3VuZHMpIHtcbiAgICAgICAgc29ja2V0LmVtaXQoXCJtb3VzZURvd25cIiwge1xuICAgICAgICAgICAgc291cmNlSWQ6IHBsYXllcklkLFxuICAgICAgICAgICAgdGFyZ2V0WDogKG1vdXNlUG9zLnggKyByZW5kZXJPZmZzZXRYKSxcbiAgICAgICAgICAgIHRhcmdldFk6IChtb3VzZVBvcy55ICsgcmVuZGVyT2Zmc2V0WSkgfSk7XG4gICAgfVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbk1vdXNlQ2xpY2ssIGZhbHNlKTtcblxuLy8gSW5pdCBjYW52YXNcbnZhciBiYWNrZ3JvdW5kICA9IG5ldyBQb3BvdmEoKTtcbnZhciBlbnYgICAgICAgICA9IG5ldyBQb3BvdmEoKTtcbnZhciBmb3JlZ3JvdW5kICA9IG5ldyBQb3BvdmEoKTtcblxuYmFja2dyb3VuZC5pbml0KFwiYmFja2dyb3VuZFwiLCBjdWJlU2l6ZSk7XG5lbnYuaW5pdChcImVudlwiLCBjdWJlU2l6ZSk7XG5mb3JlZ3JvdW5kLmluaXQoXCJmb3JlZ3JvdW5kXCIsIGN1YmVTaXplKTtcblxuLy8gQnJvYWRjYXN0IHBsYXllciBtb3ZlbWVudFxuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIHNvY2tldC5lbWl0KFwibW92ZW1lbnRcIiwgbW92ZW1lbnQpO1xufSwgMTAwMC82MCk7XG5cbi8vIFRlbGwgdGhlIHNlcnZlciBhIG5ldyBwbGF5ZXIgaGFzIGpvaW5lZCBhbmQgaGFuZHNoYWtlXG5zb2NrZXQuZW1pdChcIm5ldy1wbGF5ZXJcIik7XG5zb2NrZXQub24oXCJoYW5kc2hha2VcIiwgKGluZm86IGFueSkgPT4ge1xuICAgIHBsYXllcklkID0gaW5mby5pZDtcbiAgICBjdWJlU2l6ZSA9IGluZm8uY3ViZVNpemU7XG4gICAgYmFja2dyb3VuZC5zZXRDdWJlU2l6ZShjdWJlU2l6ZSk7XG4gICAgZW52LnNldEN1YmVTaXplKGN1YmVTaXplKTtcbiAgICBmb3JlZ3JvdW5kLnNldEN1YmVTaXplKGN1YmVTaXplKTtcbn0pO1xuXG4vLyBJbnRlcnByZXQgc3RhdGUgYW5kIGRyYXcgb2JqZWN0c1xuc29ja2V0Lm9uKFwic3RhdGVcIiwgKG9iamVjdHM6IGFueSkgPT4ge1xuICAgIGZvcmVncm91bmQud2lwZUNhbnZhcygpO1xuICAgIGVudi53aXBlQ2FudmFzKCk7XG4gICAgdmFyIGNhbnZhc1NpemUgPSBmb3JlZ3JvdW5kLnNpemUoKTtcblxuICAgIC8vIFRPRE86IEFkZCBzbW9vdGhpbmcgdG8gY2FtZXJhIG1vdmVtZW50XG4gICAgcmVuZGVyT2Zmc2V0WCA9ICghIXBsYXllcklkKVxuICAgICAgICA/IG9iamVjdHNbcGxheWVySWRdLnggKyAobW91c2VQb3MueCAtIChjYW52YXNTaXplLndpZHRoIC8gMikpICogdmlld1JhbmdlIC0gY2FudmFzU2l6ZS53aWR0aCAvIDJcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgcmVuZGVyT2Zmc2V0WSA9ICghIXBsYXllcklkKVxuICAgICAgICA/IG9iamVjdHNbcGxheWVySWRdLnkgKyAobW91c2VQb3MueSAtIChjYW52YXNTaXplLmhlaWdodCAvIDIpKSAqIHZpZXdSYW5nZSAtIGNhbnZhc1NpemUuaGVpZ2h0IC8gMlxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIC8vIFRPRE86IERvbid0IHdpcGUgYmFja2dyb3VuZCBjYW52YXMsIHRyYW5zbGF0ZSBpdCB0byBtYXRjaCBwbGF5ZXIgcG9zaXRpb25cbiAgICBpZiAoISFvYmplY3RzKSB7XG4gICAgICAgIGJhY2tncm91bmQud2lwZUNhbnZhcygpO1xuICAgICAgICBiYWNrZ3JvdW5kLmRyYXdHcmlkKGdyaWRTaXplLCAtcmVuZGVyT2Zmc2V0WCwgLXJlbmRlck9mZnNldFkpO1xuICAgIH1cblxuICAgIGZvcih2YXIgaWQgaW4gb2JqZWN0cyl7XG4gICAgICAgIHZhciBvYmplY3QgPSBvYmplY3RzW2lkXTtcblxuICAgICAgICBzd2l0Y2ggKG9iamVjdC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwicGxheWVyXCI6XG4gICAgICAgICAgICAgICAgZm9yZWdyb3VuZC5kcmF3KHtcbiAgICAgICAgICAgICAgICAgICAgcGFsZXR0ZTogW1wiI2FiYWI5YVwiLCBcIiM3NzUwNTBcIiwgXCIjQUFBQUFBXCJdLmNvbmNhdChvYmplY3QudGVhbUNvbG9yKSxcbiAgICAgICAgICAgICAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICAgICAgICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWTogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3dhdGNoOiAzXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFg6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3dhdGNoOiAyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFk6IDQsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZm9yZWdyb3VuZC5kcmF3KGhlYWx0aEJhck1hc3RlclBpZWNlKG9iamVjdCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInByb2plY3RpbGVcIjpcbiAgICAgICAgICAgICAgICBlbnYuZHJhdyh7XG4gICAgICAgICAgICAgICAgICAgIHBhbGV0dGU6IFtcIiNGRjY2NjZcIiwgXCIjNjZGRjY2XCIsIFwiIzY2NjZGRlwiLCBcIiNGRkZGNjZcIiwgXCIjRkY2NkZGXCIsIFwiIzY2RkZGRlwiXSxcbiAgICAgICAgICAgICAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICAgICAgICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2F0Y2g6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZ3JhdmVzdG9uZVwiOlxuICAgICAgICAgICAgICAgIGVudi5kcmF3KHtcbiAgICAgICAgICAgICAgICAgICAgcGFsZXR0ZTogW1wiIzg4ODg4OFwiXSxcbiAgICAgICAgICAgICAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICAgICAgICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2F0Y2g6IDAsXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3YXRjaDogMCxcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBlbnYuZHJhdyhoZWFsdGhCYXJNYXN0ZXJQaWVjZShvYmplY3QpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIG9iamVjdCdzIGhlYWx0aCBiYXJcbiAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdCB0aGF0IG5lZWRzIGEgaGVhbHRoIGJhclxuICogQHBhcmFtIHJlbmRlck9mZnNldFggVGhlIGhvcml6b250YWwgcmVuZGVyIG9mZnNldFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVGhlIHZlcnRpY2FsIHJlbmRlciBvZmZzZXRcbiAqL1xuZnVuY3Rpb24gaGVhbHRoQmFyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnkpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzAwYTQwMFwiLCBcIiNGRjAwMDBcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZIC0gKG9iamVjdC5oZWlnaHQgKyAyKSAqIGN1YmVTaXplIC8gMixcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAqIGN1YmVTaXplLFxuICAgICAgICBoZWlnaHQ6IDEgKiBjdWJlU2l6ZSxcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3QuaGVhbHRoIC8gb2JqZWN0Lm1heEhlYWx0aCAqIG9iamVjdC53aWR0aCAqIGN1YmVTaXplLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWFsdGhCYXJIZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IChvYmplY3QuaGVhbHRoID4gb2JqZWN0Lm1heEhlYWx0aCAvIDMpID8gMCA6IDEsXG4gICAgICAgIH0sXSxcbiAgICAgICAgZnJlZUhhbmQ6IHRydWV9O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==