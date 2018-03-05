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
        this.ctx.strokeStyle = "#d8d8d8";
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
        this.prepCanvas(masterPiece.posX, masterPiece.posY, masterPiece.facing);
        masterPiece.strokes.forEach(function (stroke) {
            _this.renderStroke(stroke, masterPiece.palette);
        });
        this.ctx.restore();
    };
    /**
     * Centers the canvas on position, and rotates to a certain facing
     * @param positionX The x position of what is being drawn
     * @param positionY The y position of what is being drawn
     * @param degrees Degrees to rotate the canvas by
     */
    Popova.prototype.prepCanvas = function (positionX, positionY, degrees) {
        this.ctx.beginPath();
        this.ctx.translate(positionX, positionY);
        this.ctx.rotate(degrees * Math.PI / 180);
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
    Popova.prototype.getMousePos = function (evt) {
        var rect = this.canvas.getBoundingClientRect();
        var posX = evt.clientX - rect.left;
        var posY = evt.clientY - rect.top;
        if (posX < 0)
            posX = 0;
        if (posY < 0)
            posY = 0;
        if (posX > this.width)
            posX = this.width;
        if (posY > this.height)
            posY = this.height;
        return {
            x: posX,
            y: posY,
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
var mousePos;
var movement = {
    up: false,
    down: false,
    left: false,
    right: false
};
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
mousePos = { x: 0, y: 0 };
function onMouseMove(event) {
    mousePos = foreground.getMousePos(event);
}
window.addEventListener('mousemove', onMouseMove, false);
// Tell the server a new player has joined
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
// Interpret state and draw players
socket.on("state", function (players) {
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
    for (var id in players) {
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BvcG92YS9Qb3BvdmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ25EQTtBQUFBLElBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQztBQUVwQjtJQU9JO0lBQWdCLENBQUM7SUFFakI7OztPQUdHO0lBQ0gscUJBQUksR0FBSixVQUFLLFFBQWdCO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQVMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FB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QUNDLEtBQUssRUFBRSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDO29CQUNSLE1BQU0sRUFBRSxDQUFDO29CQUNULE1BQU0sRUFBRSxDQUFDO2lCQUNaLEVBQUU7b0JBQ0MsS0FBSyxFQUFFLENBQUM7b0JBQ1IsS0FBSyxFQUFFLENBQUM7b0JBQ1IsS0FBSyxFQUFFLENBQUM7b0JBQ1IsTUFBTSxFQUFFLENBQUM7b0JBQ1QsTUFBTSxFQUFFLENBQUM7aUJBQ1osRUFBRTtvQkFDQyxLQUFLLEVBQUUsQ0FBQztvQkFDUixLQUFLLEVBQUUsQ0FBQztvQkFDUixLQUFLLEVBQUUsQ0FBQztvQkFDUixNQUFNLEVBQUUsQ0FBQztvQkFDVCxNQUFNLEVBQUUsQ0FBQztpQkFDWixFQUFFO29CQUNDLEtBQUssRUFBRSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDO29CQUNSLEtBQUssRUFBRSxDQUFDO29CQUNSLE1BQU0sRUFBRSxDQUFDO29CQUNULE1BQU0sRUFBRSxDQUFDO2lCQUNaLENBQUM7U0FDTCxDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IGludGVyZmFjZSBtYXN0ZXJQaWVjZSB7XG4gICAgcGFsZXR0ZTogc3RyaW5nW10sXG4gICAgcG9zWDogbnVtYmVyLFxuICAgIHBvc1k6IG51bWJlcixcbiAgICBmYWNpbmc6IG51bWJlcixcbiAgICBzdHJva2VzOiBzdHJva2VbXSxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBzdHJva2Uge1xuICAgIGNlbGxYOiBudW1iZXIsXG4gICAgY2VsbFk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHN3YXRjaDogbnVtYmVyLFxufVxuXG5jb25zdCBDVUJFX1NJWkUgPSA4O1xuXG5leHBvcnQgY2xhc3MgUG9wb3ZhIHtcblxuICAgIHByaXZhdGUgY2FudmFzOiBhbnk7XG4gICAgcHJpdmF0ZSBjdHg6IGFueTtcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBQb3BvdmEncyBjYW52YXNcbiAgICAgKiBAcGFyYW0gY2FudmFzSWQgSWQgb2YgaHRtbCBjYW52YXMgZWxlbWVudFxuICAgICAqL1xuICAgIGluaXQoY2FudmFzSWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IDxhbnk+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY2FudmFzLm9mZnNldFdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY2FudmFzLm9mZnNldEhlaWdodDtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIGdyaWQgb24gdGhlIGNhbnZhc1xuICAgICAqIEBwYXJhbSBzcGFjaW5nIE51bWJlciBvZiBwaXhlbHMgYmV0d2VlbiBncmlkIGxpbmVzXG4gICAgKi9cbiAgICBkcmF3R3JpZChzcGFjaW5nOiBudW1iZXIsIG9mZnNldFg/OiBudW1iZXIsIG9mZnNldFk/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgLy8gRHJhdyBncmlkIG9uIGJhY2tncm91bmRcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIiNkOGQ4ZDhcIjtcbiAgICAgICAgZm9yICh2YXIgeCA9ICghIW9mZnNldFgpID8gb2Zmc2V0WCAlIHNwYWNpbmcgOiAwOyB4IDw9IHRoaXMud2lkdGg7IHggKz0gc3BhY2luZykge1xuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIDApO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIHkgPSAoISFvZmZzZXRZKSA/IG9mZnNldFkgJSBzcGFjaW5nIDogMDsgeSA8PSB0aGlzLmhlaWdodDsgeSArPSBzcGFjaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oMCwgeSk7XG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8odGhpcy53aWR0aCwgeSk7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmF3cyBhIG1hc3RlcnBpZWNlIHRvIHRoZSBjYW52YXNcbiAgICAgKiBAcGFyYW0gbWFzdGVyUGllY2UgRGVmaW5pdGlvbiBmb3Igd2hhdCB0byBkcmF3XG4gICAgICovXG4gICAgZHJhdyhtYXN0ZXJQaWVjZTogbWFzdGVyUGllY2UpIHtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuXG4gICAgICAgIHRoaXMucHJlcENhbnZhcyhtYXN0ZXJQaWVjZS5wb3NYLCBtYXN0ZXJQaWVjZS5wb3NZLCBtYXN0ZXJQaWVjZS5mYWNpbmcpO1xuICAgICAgICBtYXN0ZXJQaWVjZS5zdHJva2VzLmZvckVhY2goKHN0cm9rZTogc3Ryb2tlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclN0cm9rZShzdHJva2UsIG1hc3RlclBpZWNlLnBhbGV0dGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2VudGVycyB0aGUgY2FudmFzIG9uIHBvc2l0aW9uLCBhbmQgcm90YXRlcyB0byBhIGNlcnRhaW4gZmFjaW5nXG4gICAgICogQHBhcmFtIHBvc2l0aW9uWCBUaGUgeCBwb3NpdGlvbiBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIHBvc2l0aW9uWSBUaGUgeSBwb3NpdGlvbiBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIGRlZ3JlZXMgRGVncmVlcyB0byByb3RhdGUgdGhlIGNhbnZhcyBieVxuICAgICAqL1xuICAgIHByZXBDYW52YXMocG9zaXRpb25YOiBudW1iZXIsIHBvc2l0aW9uWTogbnVtYmVyLCBkZWdyZWVzOiBudW1iZXIpe1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHBvc2l0aW9uWCwgcG9zaXRpb25ZKTtcbiAgICAgICAgdGhpcy5jdHgucm90YXRlKGRlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIFxuICAgICAqIEBwYXJhbSBzdHJva2UgU3Ryb2tlIHRvIHJlbmRlclxuICAgICAqIEBwYXJhbSBwYWxldHRlIENvbnRhaW5zIHRoZSBtYXN0ZXIgcGllY2UncyBjb2xvciBzd2F0Y2hlc1xuICAgICAqL1xuICAgIHJlbmRlclN0cm9rZShzdHJva2U6IHN0cm9rZSwgcGFsZXR0ZTogc3RyaW5nW10pe1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBwYWxldHRlW3N0cm9rZS5zd2F0Y2hdO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChzdHJva2UuY2VsbFggKiBDVUJFX1NJWkUsIHN0cm9rZS5jZWxsWSAqIENVQkVfU0laRSxcbiAgICAgICAgICAgIHN0cm9rZS53aWR0aCAqIENVQkVfU0laRSwgc3Ryb2tlLmhlaWdodCAqIENVQkVfU0laRSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXJhc2VzIGV2ZXJ5dGhpbmcgb24gdGhlIGNhbnZhc1xuICAgICAqL1xuICAgIHdpcGVDYW52YXMoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY2FudmFzJyB3aWR0aCBhbmQgaGVpZ2h0XG4gICAgICovXG4gICAgc2l6ZSgpOiB7d2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9IHtcbiAgICAgICAgcmV0dXJuIHsgd2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy4gaGVpZ2h0IH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBQb3BvdmEncyBjdWJlIHJlbmRlciBzaXplXG4gICAgICovXG4gICAgY3ViZVNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIENVQkVfU0laRTtcbiAgICB9XG5cblxuICAgIGdldE1vdXNlUG9zKGV2dDogYW55KTogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9IHtcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHBvc1ggPSBldnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgdmFyIHBvc1kgPSBldnQuY2xpZW50WSAtIHJlY3QudG9wO1xuXG4gICAgICAgIGlmIChwb3NYIDwgMCkgcG9zWCA9IDA7XG4gICAgICAgIGlmIChwb3NZIDwgMCkgcG9zWSA9IDA7XG4gICAgICAgIGlmIChwb3NYID4gdGhpcy53aWR0aCkgcG9zWCA9IHRoaXMud2lkdGg7XG4gICAgICAgIGlmIChwb3NZID4gdGhpcy5oZWlnaHQpIHBvc1kgPSB0aGlzLmhlaWdodDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHBvc1gsXG4gICAgICAgICAgeTogcG9zWSxcbiAgICAgICAgfTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCAqIGFzIHNvY2tldElvIGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XG5pbXBvcnQgeyBQb3BvdmEgfSBmcm9tIFwiLi9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8vIFNvY2tldCBsaXN0ZW5lclxudmFyIHNvY2tldCA9IGlvKCk7XG5cbnZhciBjdWJlU2l6ZTogbnVtYmVyO1xudmFyIGdyaWRTaXplOiBudW1iZXIgPSA2NDtcblxudmFyIHBsYXllcklkOiBzdHJpbmc7XG52YXIgcGxheWVyV2lkdGg6IG51bWJlcjtcbnZhciBwbGF5ZXJIZWlnaHQ6IG51bWJlcjtcblxudmFyIG1vdXNlUG9zOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH07XG5cbnZhciBtb3ZlbWVudCA9IHtcbiAgICB1cDogZmFsc2UsXG4gICAgZG93bjogZmFsc2UsXG4gICAgbGVmdDogZmFsc2UsXG4gICAgcmlnaHQ6IGZhbHNlXG59XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSA2NTogLy8gQVxuICAgICAgICAgICAgbW92ZW1lbnQubGVmdCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA4NzogLy8gV1xuICAgICAgICAgICAgbW92ZW1lbnQudXAgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNjg6IC8vIERcbiAgICAgICAgICAgIG1vdmVtZW50LnJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDgzOiAvLyBTXG4gICAgICAgICAgICBtb3ZlbWVudC5kb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn0pO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDY1OiAvLyBBXG4gICAgICAgICAgICBtb3ZlbWVudC5sZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA4NzogLy8gV1xuICAgICAgICAgICAgbW92ZW1lbnQudXAgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDY4OiAvLyBEXG4gICAgICAgICAgICBtb3ZlbWVudC5yaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgODM6IC8vIFNcbiAgICAgICAgICAgIG1vdmVtZW50LmRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn0pO1xuXG5tb3VzZVBvcyA9IHsgeDogMCwgeTogMH07XG5cbmZ1bmN0aW9uIG9uTW91c2VNb3ZlKGV2ZW50OiBhbnkpIHtcbiAgICBtb3VzZVBvcyA9IGZvcmVncm91bmQuZ2V0TW91c2VQb3MoZXZlbnQpO1xufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlLCBmYWxzZSk7XG5cbi8vIFRlbGwgdGhlIHNlcnZlciBhIG5ldyBwbGF5ZXIgaGFzIGpvaW5lZFxuc29ja2V0LmVtaXQoXCJuZXctcGxheWVyXCIpO1xuc29ja2V0Lm9uKFwiaGFuZHNoYWtlXCIsIChpbmZvOiBhbnkpID0+IHtcbiAgICBwbGF5ZXJJZCA9IGluZm8uaWQ7XG4gICAgcGxheWVyV2lkdGggPSBpbmZvLnBsYXllcldpZHRoO1xuICAgIHBsYXllckhlaWdodCA9IGluZm8ucGxheWVySGVpZ2h0O1xufSk7XG5cbi8vIEJyb2FkY2FzdCBwbGF5ZXIgbW92ZW1lbnRcbnNldEludGVydmFsKCgpID0+IHtcbiAgICBzb2NrZXQuZW1pdChcIm1vdmVtZW50XCIsIG1vdmVtZW50KTtcbn0sIDEwMDAvNjApO1xuXG4vLyBJbml0IGNhbnZhc1xudmFyIGJhY2tncm91bmQgID0gbmV3IFBvcG92YSgpO1xudmFyIGVudiAgICAgICAgID0gbmV3IFBvcG92YSgpO1xudmFyIGZvcmVncm91bmQgID0gbmV3IFBvcG92YSgpO1xuXG5iYWNrZ3JvdW5kLmluaXQoXCJiYWNrZ3JvdW5kXCIpO1xuZW52LmluaXQoXCJlbnZcIik7XG5mb3JlZ3JvdW5kLmluaXQoXCJmb3JlZ3JvdW5kXCIpO1xuXG5iYWNrZ3JvdW5kLmRyYXdHcmlkKDUwKTtcblxuLy8gSW50ZXJwcmV0IHN0YXRlIGFuZCBkcmF3IHBsYXllcnNcbnNvY2tldC5vbihcInN0YXRlXCIsIChwbGF5ZXJzOiBhbnkpID0+IHtcbiAgICBmb3JlZ3JvdW5kLndpcGVDYW52YXMoKTtcbiAgICB2YXIgY2FudmFzU2l6ZSA9IGZvcmVncm91bmQuc2l6ZSgpO1xuXG4gICAgLy8gVE9ETzogQWRkIHNtb290aGluZyB0byBjYW1lcmEgbW92ZW1lbnRcbiAgICB2YXIgcmVuZGVyT2Zmc2V0WCA9ICghIXBsYXllcklkKVxuICAgICAgICA/IHBsYXllcnNbcGxheWVySWRdLnggKyBwbGF5ZXJXaWR0aCAqIGZvcmVncm91bmQuY3ViZVNpemUoKSAvIDIgKyAobW91c2VQb3MueCAtIChjYW52YXNTaXplLndpZHRoIC8gMikpIC8gM1xuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB2YXIgcmVuZGVyT2Zmc2V0WSA9ICghIXBsYXllcklkKVxuICAgICAgICA/IHBsYXllcnNbcGxheWVySWRdLnkgKyBwbGF5ZXJIZWlnaHQgKiBmb3JlZ3JvdW5kLmN1YmVTaXplKCkgLyAyICsgKG1vdXNlUG9zLnkgLSAoY2FudmFzU2l6ZS5oZWlnaHQgLyAyKSkgLyAzXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKCEhcGxheWVycykge1xuICAgICAgICBiYWNrZ3JvdW5kLndpcGVDYW52YXMoKTtcbiAgICAgICAgYmFja2dyb3VuZC5kcmF3R3JpZChncmlkU2l6ZSwgLXJlbmRlck9mZnNldFgsIC1yZW5kZXJPZmZzZXRZKTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGlkIGluIHBsYXllcnMpe1xuICAgICAgICB2YXIgcGxheWVyID0gcGxheWVyc1tpZF07XG4gICAgICAgIGZvcmVncm91bmQuZHJhdyh7XG4gICAgICAgICAgICBwYWxldHRlOiBbXCIjYWJhYjlhXCIsIFwiI0ZGNjlCNFwiLCBcIiNBQUFBQUFcIiwgXCIjNzc1MDUwXCJdLFxuICAgICAgICAgICAgcG9zWDogcGxheWVyLnggLSByZW5kZXJPZmZzZXRYICsgY2FudmFzU2l6ZS53aWR0aCAvIDIsXG4gICAgICAgICAgICBwb3NZOiBwbGF5ZXIueSAtIHJlbmRlck9mZnNldFkgKyBjYW52YXNTaXplLmhlaWdodCAvIDIsXG4gICAgICAgICAgICBmYWNpbmc6IDAsXG4gICAgICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgICAgIGNlbGxZOiAyLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA0LFxuICAgICAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICAgICAgY2VsbFk6IDMsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgICAgIHN3YXRjaDogMlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGNlbGxYOiAzLFxuICAgICAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICAgICAgc3dhdGNoOiAzXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICAgICAgY2VsbFk6IDQsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgICAgIHN3YXRjaDogM1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9