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
var CUBE_SIZE = 8;
var Popova = /** @class */ (function () {
    function Popova() {
    }
    /**
     * Initializes Popova's canvas
     * @param canvasId Id of html canvas element
     */
    Popova.prototype.init = function (canvasId) {
        this.canvas = document.getElementById(canvasId);
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
        this.prepCanvas(masterPiece.posX, masterPiece.posY, masterPiece.width, masterPiece.height, masterPiece.facing);
        masterPiece.strokes.forEach(function (stroke) {
            _this.renderStroke(stroke, masterPiece.palette);
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
     */
    Popova.prototype.prepCanvas = function (positionX, positionY, width, height, degrees) {
        this.ctx.beginPath();
        this.ctx.translate(positionX, positionY);
        this.ctx.rotate(degrees * Math.PI / 180);
        this.ctx.translate(-width * CUBE_SIZE / 2, -height * CUBE_SIZE / 2);
    };
    /**
     * Renders
     * @param stroke Stroke to render
     * @param palette Contains the master piece's color swatches
     */
    Popova.prototype.renderStroke = function (stroke, palette) {
        this.ctx.fillStyle = palette[stroke.swatch];
        this.ctx.fillRect(stroke.cellX * CUBE_SIZE, stroke.cellY * CUBE_SIZE, stroke.width * CUBE_SIZE, stroke.height * CUBE_SIZE);
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
    Popova.prototype.cubeSize = function () {
        return CUBE_SIZE;
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
var gridSize = 64;
var playerId;
var playerWidth;
var playerHeight;
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
// Tell the server a new player has joined and handshake
socket.emit("new-player");
socket.on("handshake", function (info) {
    playerId = info.id;
    playerWidth = info.playerWidth;
    playerHeight = info.playerHeight;
});
// Broadcast player movement
setInterval(function () {
    socket.emit("movement", movement);
}, 1000 / 60);
// Init canvas
var background = new _Popova_Popova__WEBPACK_IMPORTED_MODULE_0__["Popova"]();
var env = new _Popova_Popova__WEBPACK_IMPORTED_MODULE_0__["Popova"]();
var foreground = new _Popova_Popova__WEBPACK_IMPORTED_MODULE_0__["Popova"]();
background.init("background");
env.init("env");
foreground.init("foreground");
background.drawGrid(50);
// Interpret state and draw objects
socket.on("state", function (objects) {
    foreground.wipeCanvas();
    env.wipeCanvas();
    var canvasSize = foreground.size();
    // TODO: Add smoothing to camera movement
    renderOffsetX = (!!playerId)
        ? objects[playerId].x + (mousePos.x - (canvasSize.width / 2)) / 3 - canvasSize.width / 2
        : undefined;
    renderOffsetY = (!!playerId)
        ? objects[playerId].y + (mousePos.y - (canvasSize.height / 2)) / 3 - canvasSize.height / 2
        : undefined;
    if (!!objects) {
        background.wipeCanvas();
        background.drawGrid(gridSize, -renderOffsetX, -renderOffsetY);
    }
    for (var id in objects) {
        var object = objects[id];
        switch (object.type) {
            case "player":
                foreground.draw({
                    palette: ["#abab9a", "#FF69B4", "#AAAAAA", "#775050"],
                    posX: object.x - renderOffsetX,
                    posY: object.y - renderOffsetY,
                    width: playerWidth,
                    height: playerHeight,
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
                break;
            case "projectile":
                env.draw({
                    palette: ["#FF6666", "#66FF66", "#6666FF", "#FFFF66", "#FF66FF", "#66FFFF", "#000000"],
                    posX: object.x - renderOffsetX,
                    posY: object.y - renderOffsetY,
                    width: 2,
                    height: 1,
                    facing: object.facing,
                    strokes: [{
                            cellX: 0,
                            cellY: 0,
                            width: 2,
                            height: 1,
                            swatch: Math.floor(Math.random() * 6)
                        }]
                });
                break;
        }
    }
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BvcG92YS9Qb3BvdmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzNDQTtBQUFBLElBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQztBQUVwQjtJQU9JO0lBQWdCLENBQUM7SUFFakI7OztPQUdHO0lBQ0gscUJBQUksR0FBSixVQUFLLFFBQWdCO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQVMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FB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LENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQzt5QkFDeEMsQ0FBQztpQkFDTCxDQUFDLENBQUM7Z0JBQ0gsS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJleHBvcnQgaW50ZXJmYWNlIG1hc3RlclBpZWNlIHtcbiAgICBwYWxldHRlOiBzdHJpbmdbXSxcbiAgICBwb3NYOiBudW1iZXIsXG4gICAgcG9zWTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgZmFjaW5nOiBudW1iZXIsXG4gICAgc3Ryb2tlczogc3Ryb2tlW10sXG59XG5cbmV4cG9ydCBpbnRlcmZhY2Ugc3Ryb2tlIHtcbiAgICBjZWxsWDogbnVtYmVyLFxuICAgIGNlbGxZOiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBzd2F0Y2g6IG51bWJlcixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBtb3VzZVBvc2l0aW9uIHtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIG91dE9mQm91bmRzOiBib29sZWFuLFxufVxuXG5jb25zdCBDVUJFX1NJWkUgPSA4O1xuXG5leHBvcnQgY2xhc3MgUG9wb3ZhIHtcblxuICAgIHByaXZhdGUgY2FudmFzOiBhbnk7XG4gICAgcHJpdmF0ZSBjdHg6IGFueTtcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBQb3BvdmEncyBjYW52YXNcbiAgICAgKiBAcGFyYW0gY2FudmFzSWQgSWQgb2YgaHRtbCBjYW52YXMgZWxlbWVudFxuICAgICAqL1xuICAgIGluaXQoY2FudmFzSWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IDxhbnk+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY2FudmFzLm9mZnNldFdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY2FudmFzLm9mZnNldEhlaWdodDtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIGdyaWQgb24gdGhlIGNhbnZhc1xuICAgICAqIEBwYXJhbSBzcGFjaW5nIE51bWJlciBvZiBwaXhlbHMgYmV0d2VlbiBncmlkIGxpbmVzXG4gICAgKi9cbiAgICBkcmF3R3JpZChzcGFjaW5nOiBudW1iZXIsIG9mZnNldFg/OiBudW1iZXIsIG9mZnNldFk/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgLy8gRHJhdyBncmlkIG9uIGJhY2tncm91bmRcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIiNkMGQwZDBcIjtcbiAgICAgICAgZm9yICh2YXIgeCA9ICghIW9mZnNldFgpID8gb2Zmc2V0WCAlIHNwYWNpbmcgOiAwOyB4IDw9IHRoaXMud2lkdGg7IHggKz0gc3BhY2luZykge1xuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIDApO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIHkgPSAoISFvZmZzZXRZKSA/IG9mZnNldFkgJSBzcGFjaW5nIDogMDsgeSA8PSB0aGlzLmhlaWdodDsgeSArPSBzcGFjaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oMCwgeSk7XG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8odGhpcy53aWR0aCwgeSk7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmF3cyBhIG1hc3RlcnBpZWNlIHRvIHRoZSBjYW52YXNcbiAgICAgKiBAcGFyYW0gbWFzdGVyUGllY2UgRGVmaW5pdGlvbiBmb3Igd2hhdCB0byBkcmF3XG4gICAgICovXG4gICAgZHJhdyhtYXN0ZXJQaWVjZTogbWFzdGVyUGllY2UpIHtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuXG4gICAgICAgIHRoaXMucHJlcENhbnZhcyhcbiAgICAgICAgICAgIG1hc3RlclBpZWNlLnBvc1gsXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS5wb3NZLFxuICAgICAgICAgICAgbWFzdGVyUGllY2Uud2lkdGgsXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS5oZWlnaHQsXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS5mYWNpbmcpO1xuICAgICAgICBtYXN0ZXJQaWVjZS5zdHJva2VzLmZvckVhY2goKHN0cm9rZTogc3Ryb2tlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclN0cm9rZShzdHJva2UsIG1hc3RlclBpZWNlLnBhbGV0dGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2VudGVycyB0aGUgY2FudmFzIG9uIHBvc2l0aW9uLCBhbmQgcm90YXRlcyB0byBhIGNlcnRhaW4gZmFjaW5nXG4gICAgICogQHBhcmFtIHBvc2l0aW9uWCBUaGUgeCBwb3NpdGlvbiBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIHBvc2l0aW9uWSBUaGUgeSBwb3NpdGlvbiBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIHdpZHRoIFRoZSB3aWR0aCBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIGhlaWdodCBUaGUgaGVpZ2h0IG9mIHdoYXQgaXMgYmVpbmcgZHJhd25cbiAgICAgKiBAcGFyYW0gZGVncmVlcyBEZWdyZWVzIHRvIHJvdGF0ZSB0aGUgY2FudmFzIGJ5XG4gICAgICovXG4gICAgcHJlcENhbnZhcyhwb3NpdGlvblg6IG51bWJlciwgcG9zaXRpb25ZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBkZWdyZWVzOiBudW1iZXIpe1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHBvc2l0aW9uWCwgcG9zaXRpb25ZKTtcbiAgICAgICAgdGhpcy5jdHgucm90YXRlKGRlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKC0gd2lkdGggKiBDVUJFX1NJWkUgLyAyLCAtIGhlaWdodCAqIENVQkVfU0laRSAvIDIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgXG4gICAgICogQHBhcmFtIHN0cm9rZSBTdHJva2UgdG8gcmVuZGVyXG4gICAgICogQHBhcmFtIHBhbGV0dGUgQ29udGFpbnMgdGhlIG1hc3RlciBwaWVjZSdzIGNvbG9yIHN3YXRjaGVzXG4gICAgICovXG4gICAgcmVuZGVyU3Ryb2tlKHN0cm9rZTogc3Ryb2tlLCBwYWxldHRlOiBzdHJpbmdbXSl7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHBhbGV0dGVbc3Ryb2tlLnN3YXRjaF07XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHN0cm9rZS5jZWxsWCAqIENVQkVfU0laRSwgc3Ryb2tlLmNlbGxZICogQ1VCRV9TSVpFLFxuICAgICAgICAgICAgc3Ryb2tlLndpZHRoICogQ1VCRV9TSVpFLCBzdHJva2UuaGVpZ2h0ICogQ1VCRV9TSVpFKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFcmFzZXMgZXZlcnl0aGluZyBvbiB0aGUgY2FudmFzXG4gICAgICovXG4gICAgd2lwZUNhbnZhcygpIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjYW52YXMnIHdpZHRoIGFuZCBoZWlnaHRcbiAgICAgKi9cbiAgICBzaXplKCk6IHt3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0ge1xuICAgICAgICByZXR1cm4geyB3aWR0aDogdGhpcy53aWR0aCwgaGVpZ2h0OiB0aGlzLiBoZWlnaHQgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIFBvcG92YSdzIGN1YmUgcmVuZGVyIHNpemVcbiAgICAgKi9cbiAgICBjdWJlU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gQ1VCRV9TSVpFO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgbW91c2UgcG9zaXRpb24gYW5kIGlmIG1vdXNlIGlzIGluc2lkZSBjYW52YXNcbiAgICAgKiBAcGFyYW0gZXZ0IE1vdXNlIG1vdmVtZW50IGV2ZW50LCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uXG4gICAgICovXG4gICAgZ2V0TW91c2VQb3MoZXZ0OiBhbnkpOiBtb3VzZVBvc2l0aW9uIHtcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHBvc1ggPSBldnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgdmFyIHBvc1kgPSBldnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICB2YXIgb2ZmQ2FudmFzID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHBvc1ggPCAwKSB7XG4gICAgICAgICAgICBwb3NYID0gMDtcbiAgICAgICAgICAgIG9mZkNhbnZhcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc1kgPCAwKSB7XG4gICAgICAgICAgICBwb3NZID0gMDtcbiAgICAgICAgICAgIG9mZkNhbnZhcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc1ggPiB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICBwb3NYID0gdGhpcy53aWR0aDtcbiAgICAgICAgICAgIG9mZkNhbnZhcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc1kgPiB0aGlzLmhlaWdodCkge1xuICAgICAgICAgICAgcG9zWSA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICAgICAgb2ZmQ2FudmFzID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogcG9zWCxcbiAgICAgICAgICB5OiBwb3NZLFxuICAgICAgICAgIG91dE9mQm91bmRzOiBvZmZDYW52YXMsXG4gICAgICAgIH07XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgKiBhcyBzb2NrZXRJbyBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xuaW1wb3J0IHsgUG9wb3ZhLCBtb3VzZVBvc2l0aW9uIH0gZnJvbSBcIi4vUG9wb3ZhL1BvcG92YVwiO1xuXG4vLyBTb2NrZXQgbGlzdGVuZXJcbnZhciBzb2NrZXQgPSBpbygpO1xuXG52YXIgY3ViZVNpemU6IG51bWJlcjtcbnZhciBncmlkU2l6ZTogbnVtYmVyID0gNjQ7XG5cbnZhciBwbGF5ZXJJZDogc3RyaW5nO1xudmFyIHBsYXllcldpZHRoOiBudW1iZXI7XG52YXIgcGxheWVySGVpZ2h0OiBudW1iZXI7XG5cbnZhciByZW5kZXJPZmZzZXRYOiBudW1iZXI7XG52YXIgcmVuZGVyT2Zmc2V0WTogbnVtYmVyO1xuXG52YXIgbW91c2VQb3M6IG1vdXNlUG9zaXRpb247XG5cbnZhciBtb3ZlbWVudCA9IHtcbiAgICB1cDogZmFsc2UsXG4gICAgZG93bjogZmFsc2UsXG4gICAgbGVmdDogZmFsc2UsXG4gICAgcmlnaHQ6IGZhbHNlXG59XG5tb3VzZVBvcyA9IHsgeDogMCwgeTogMCwgb3V0T2ZCb3VuZHM6IHRydWUgfTtcblxuXG4vLyBBZGQgbGlzdGVuZXJzIHRvIGRvY3VtZW50XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSA2NTogLy8gQVxuICAgICAgICAgICAgbW92ZW1lbnQubGVmdCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA4NzogLy8gV1xuICAgICAgICAgICAgbW92ZW1lbnQudXAgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNjg6IC8vIERcbiAgICAgICAgICAgIG1vdmVtZW50LnJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDgzOiAvLyBTXG4gICAgICAgICAgICBtb3ZlbWVudC5kb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn0pO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDY1OiAvLyBBXG4gICAgICAgICAgICBtb3ZlbWVudC5sZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA4NzogLy8gV1xuICAgICAgICAgICAgbW92ZW1lbnQudXAgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDY4OiAvLyBEXG4gICAgICAgICAgICBtb3ZlbWVudC5yaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgODM6IC8vIFNcbiAgICAgICAgICAgIG1vdmVtZW50LmRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBvbk1vdXNlTW92ZShldmVudDogYW55KSB7XG4gICAgbW91c2VQb3MgPSBmb3JlZ3JvdW5kLmdldE1vdXNlUG9zKGV2ZW50KTtcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlLCBmYWxzZSk7XG5cbmZ1bmN0aW9uIG9uTW91c2VDbGljayhldmVudDogYW55KSB7XG4gICAgaWYgKCFtb3VzZVBvcy5vdXRPZkJvdW5kcykge1xuICAgICAgICBzb2NrZXQuZW1pdChcIm1vdXNlRG93blwiLCB7XG4gICAgICAgICAgICBzb3VyY2VJZDogcGxheWVySWQsXG4gICAgICAgICAgICB0YXJnZXRYOiAobW91c2VQb3MueCArIHJlbmRlck9mZnNldFgpLFxuICAgICAgICAgICAgdGFyZ2V0WTogKG1vdXNlUG9zLnkgKyByZW5kZXJPZmZzZXRZKSB9KTtcbiAgICB9XG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uTW91c2VDbGljaywgZmFsc2UpO1xuXG4vLyBUZWxsIHRoZSBzZXJ2ZXIgYSBuZXcgcGxheWVyIGhhcyBqb2luZWQgYW5kIGhhbmRzaGFrZVxuc29ja2V0LmVtaXQoXCJuZXctcGxheWVyXCIpO1xuc29ja2V0Lm9uKFwiaGFuZHNoYWtlXCIsIChpbmZvOiBhbnkpID0+IHtcbiAgICBwbGF5ZXJJZCA9IGluZm8uaWQ7XG4gICAgcGxheWVyV2lkdGggPSBpbmZvLnBsYXllcldpZHRoO1xuICAgIHBsYXllckhlaWdodCA9IGluZm8ucGxheWVySGVpZ2h0O1xufSk7XG5cbi8vIEJyb2FkY2FzdCBwbGF5ZXIgbW92ZW1lbnRcbnNldEludGVydmFsKCgpID0+IHtcbiAgICBzb2NrZXQuZW1pdChcIm1vdmVtZW50XCIsIG1vdmVtZW50KTtcbn0sIDEwMDAvNjApO1xuXG4vLyBJbml0IGNhbnZhc1xudmFyIGJhY2tncm91bmQgID0gbmV3IFBvcG92YSgpO1xudmFyIGVudiAgICAgICAgID0gbmV3IFBvcG92YSgpO1xudmFyIGZvcmVncm91bmQgID0gbmV3IFBvcG92YSgpO1xuXG5iYWNrZ3JvdW5kLmluaXQoXCJiYWNrZ3JvdW5kXCIpO1xuZW52LmluaXQoXCJlbnZcIik7XG5mb3JlZ3JvdW5kLmluaXQoXCJmb3JlZ3JvdW5kXCIpO1xuXG5iYWNrZ3JvdW5kLmRyYXdHcmlkKDUwKTtcblxuLy8gSW50ZXJwcmV0IHN0YXRlIGFuZCBkcmF3IG9iamVjdHNcbnNvY2tldC5vbihcInN0YXRlXCIsIChvYmplY3RzOiBhbnkpID0+IHtcbiAgICBmb3JlZ3JvdW5kLndpcGVDYW52YXMoKTtcbiAgICBlbnYud2lwZUNhbnZhcygpO1xuICAgIHZhciBjYW52YXNTaXplID0gZm9yZWdyb3VuZC5zaXplKCk7XG5cbiAgICAvLyBUT0RPOiBBZGQgc21vb3RoaW5nIHRvIGNhbWVyYSBtb3ZlbWVudFxuICAgIHJlbmRlck9mZnNldFggPSAoISFwbGF5ZXJJZClcbiAgICAgICAgPyBvYmplY3RzW3BsYXllcklkXS54ICsgKG1vdXNlUG9zLnggLSAoY2FudmFzU2l6ZS53aWR0aCAvIDIpKSAvIDMgLSBjYW52YXNTaXplLndpZHRoIC8gMlxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICByZW5kZXJPZmZzZXRZID0gKCEhcGxheWVySWQpXG4gICAgICAgID8gb2JqZWN0c1twbGF5ZXJJZF0ueSArIChtb3VzZVBvcy55IC0gKGNhbnZhc1NpemUuaGVpZ2h0IC8gMikpIC8gMyAtIGNhbnZhc1NpemUuaGVpZ2h0IC8gMlxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmICghIW9iamVjdHMpIHtcbiAgICAgICAgYmFja2dyb3VuZC53aXBlQ2FudmFzKCk7XG4gICAgICAgIGJhY2tncm91bmQuZHJhd0dyaWQoZ3JpZFNpemUsIC1yZW5kZXJPZmZzZXRYLCAtcmVuZGVyT2Zmc2V0WSk7XG4gICAgfVxuXG4gICAgZm9yKHZhciBpZCBpbiBvYmplY3RzKXtcbiAgICAgICAgdmFyIG9iamVjdCA9IG9iamVjdHNbaWRdO1xuXG4gICAgICAgIHN3aXRjaCAob2JqZWN0LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJwbGF5ZXJcIjpcbiAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kLmRyYXcoe1xuICAgICAgICAgICAgICAgICAgICBwYWxldHRlOiBbXCIjYWJhYjlhXCIsIFwiI0ZGNjlCNFwiLCBcIiNBQUFBQUFcIiwgXCIjNzc1MDUwXCJdLFxuICAgICAgICAgICAgICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgICAgICAgICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHBsYXllcldpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHBsYXllckhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWTogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFg6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3dhdGNoOiAyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFk6IDQsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3YXRjaDogM1xuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2F0Y2g6IDNcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwcm9qZWN0aWxlXCI6XG4gICAgICAgICAgICAgICAgZW52LmRyYXcoe1xuICAgICAgICAgICAgICAgICAgICBwYWxldHRlOiBbXCIjRkY2NjY2XCIsIFwiIzY2RkY2NlwiLCBcIiM2NjY2RkZcIiwgXCIjRkZGRjY2XCIsIFwiI0ZGNjZGRlwiLCBcIiM2NkZGRkZcIiwgXCIjMDAwMDAwXCJdLFxuICAgICAgICAgICAgICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgICAgICAgICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgICAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3dhdGNoOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9