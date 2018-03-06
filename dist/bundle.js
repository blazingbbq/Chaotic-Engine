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
mousePos = { x: 0, y: 0, outOfBounds: true };
function onMouseMove(event) {
    mousePos = foreground.getMousePos(event);
}
window.addEventListener("mousemove", onMouseMove, false);
function onMouseClick(event) {
    if (!mousePos.outOfBounds) {
        socket.emit("mouseDown", { sourceId: playerId, targetX: (mousePos.x + renderOffsetX), targetY: (mousePos.y + renderOffsetY) });
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
        ? objects[playerId].x + playerWidth * foreground.cubeSize() / 2 + (mousePos.x - (canvasSize.width / 2)) / 3 - canvasSize.width / 2
        : undefined;
    renderOffsetY = (!!playerId)
        ? objects[playerId].y + playerHeight * foreground.cubeSize() / 2 + (mousePos.y - (canvasSize.height / 2)) / 3 - canvasSize.height / 2
        : undefined;
    if (!!objects) {
        background.wipeCanvas();
        background.drawGrid(gridSize, -renderOffsetX, -renderOffsetY);
    }
    for (var id in objects) {
        var object = objects[id];
        // TODO: Specify dimensions of masterpiece and render around position,
        // Instead of from top-left corner as it is now,
        // Will help with object position later on.
        switch (object.type) {
            case "player":
                foreground.draw({
                    palette: ["#abab9a", "#FF69B4", "#AAAAAA", "#775050"],
                    posX: object.x - renderOffsetX,
                    posY: object.y - renderOffsetY,
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
                    palette: ["#444444"],
                    posX: object.x - renderOffsetX,
                    posY: object.y - renderOffsetY,
                    facing: 0,
                    strokes: [{
                            cellX: 0,
                            cellY: 0,
                            width: 2,
                            height: 2,
                            swatch: 0
                        }]
                });
        }
    }
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BvcG92YS9Qb3BvdmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzdDQTtBQUFBLElBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQztBQUVwQjtJQU9JO0lBQWdCLENBQUM7SUFFakI7OztPQUdHO0lBQ0gscUJBQUksR0FBSixVQUFLLFFBQWdCO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQVMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FB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LEtBQUssRUFBRSxDQUFDOzRCQUNSLEtBQUssRUFBRSxDQUFDOzRCQUNSLE1BQU0sRUFBRSxDQUFDOzRCQUNULE1BQU0sRUFBRSxDQUFDO3lCQUNaLEVBQUU7NEJBQ0MsS0FBSyxFQUFFLENBQUM7NEJBQ1IsS0FBSyxFQUFFLENBQUM7NEJBQ1IsS0FBSyxFQUFFLENBQUM7NEJBQ1IsTUFBTSxFQUFFLENBQUM7NEJBQ1QsTUFBTSxFQUFFLENBQUM7eUJBQ1osRUFBRTs0QkFDQyxLQUFLLEVBQUUsQ0FBQzs0QkFDUixLQUFLLEVBQUUsQ0FBQzs0QkFDUixLQUFLLEVBQUUsQ0FBQzs0QkFDUixNQUFNLEVBQUUsQ0FBQzs0QkFDVCxNQUFNLEVBQUUsQ0FBQzt5QkFDWixDQUFDO2lCQUNMLENBQUMsQ0FBQztnQkFDSCxLQUFLLENBQUM7WUFDVixLQUFLLFlBQVk7Z0JBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDTCxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ3BCLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLGFBQWE7b0JBQzlCLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLGFBQWE7b0JBQzlCLE1BQU0sRUFBRSxDQUFDO29CQUNULE9BQU8sRUFBRSxDQUFDOzRCQUNOLEtBQUssRUFBRSxDQUFDOzRCQUNSLEtBQUssRUFBRSxDQUFDOzRCQUNSLEtBQUssRUFBRSxDQUFDOzRCQUNSLE1BQU0sRUFBRSxDQUFDOzRCQUNULE1BQU0sRUFBRSxDQUFDO3lCQUNaLENBQUM7aUJBQ0wsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztJQUNMLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJleHBvcnQgaW50ZXJmYWNlIG1hc3RlclBpZWNlIHtcbiAgICBwYWxldHRlOiBzdHJpbmdbXSxcbiAgICBwb3NYOiBudW1iZXIsXG4gICAgcG9zWTogbnVtYmVyLFxuICAgIGZhY2luZzogbnVtYmVyLFxuICAgIHN0cm9rZXM6IHN0cm9rZVtdLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIHN0cm9rZSB7XG4gICAgY2VsbFg6IG51bWJlcixcbiAgICBjZWxsWTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgc3dhdGNoOiBudW1iZXIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgbW91c2VQb3NpdGlvbiB7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICBvdXRPZkJvdW5kczogYm9vbGVhbixcbn1cblxuY29uc3QgQ1VCRV9TSVpFID0gODtcblxuZXhwb3J0IGNsYXNzIFBvcG92YSB7XG5cbiAgICBwcml2YXRlIGNhbnZhczogYW55O1xuICAgIHByaXZhdGUgY3R4OiBhbnk7XG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgUG9wb3ZhJ3MgY2FudmFzXG4gICAgICogQHBhcmFtIGNhbnZhc0lkIElkIG9mIGh0bWwgY2FudmFzIGVsZW1lbnRcbiAgICAgKi9cbiAgICBpbml0KGNhbnZhc0lkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSA8YW55PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNJZCk7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbnZhcy5vZmZzZXRXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYSBncmlkIG9uIHRoZSBjYW52YXNcbiAgICAgKiBAcGFyYW0gc3BhY2luZyBOdW1iZXIgb2YgcGl4ZWxzIGJldHdlZW4gZ3JpZCBsaW5lc1xuICAgICovXG4gICAgZHJhd0dyaWQoc3BhY2luZzogbnVtYmVyLCBvZmZzZXRYPzogbnVtYmVyLCBvZmZzZXRZPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIC8vIERyYXcgZ3JpZCBvbiBiYWNrZ3JvdW5kXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCIjZDBkMGQwXCI7XG4gICAgICAgIGZvciAodmFyIHggPSAoISFvZmZzZXRYKSA/IG9mZnNldFggJSBzcGFjaW5nIDogMDsgeCA8PSB0aGlzLndpZHRoOyB4ICs9IHNwYWNpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCAwKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB0aGlzLmhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciB5ID0gKCEhb2Zmc2V0WSkgPyBvZmZzZXRZICUgc3BhY2luZyA6IDA7IHkgPD0gdGhpcy5oZWlnaHQ7IHkgKz0gc3BhY2luZykge1xuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKDAsIHkpO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHRoaXMud2lkdGgsIHkpO1xuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhd3MgYSBtYXN0ZXJwaWVjZSB0byB0aGUgY2FudmFzXG4gICAgICogQHBhcmFtIG1hc3RlclBpZWNlIERlZmluaXRpb24gZm9yIHdoYXQgdG8gZHJhd1xuICAgICAqL1xuICAgIGRyYXcobWFzdGVyUGllY2U6IG1hc3RlclBpZWNlKSB7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcblxuICAgICAgICB0aGlzLnByZXBDYW52YXMobWFzdGVyUGllY2UucG9zWCwgbWFzdGVyUGllY2UucG9zWSwgbWFzdGVyUGllY2UuZmFjaW5nKTtcbiAgICAgICAgbWFzdGVyUGllY2Uuc3Ryb2tlcy5mb3JFYWNoKChzdHJva2U6IHN0cm9rZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJTdHJva2Uoc3Ryb2tlLCBtYXN0ZXJQaWVjZS5wYWxldHRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENlbnRlcnMgdGhlIGNhbnZhcyBvbiBwb3NpdGlvbiwgYW5kIHJvdGF0ZXMgdG8gYSBjZXJ0YWluIGZhY2luZ1xuICAgICAqIEBwYXJhbSBwb3NpdGlvblggVGhlIHggcG9zaXRpb24gb2Ygd2hhdCBpcyBiZWluZyBkcmF3blxuICAgICAqIEBwYXJhbSBwb3NpdGlvblkgVGhlIHkgcG9zaXRpb24gb2Ygd2hhdCBpcyBiZWluZyBkcmF3blxuICAgICAqIEBwYXJhbSBkZWdyZWVzIERlZ3JlZXMgdG8gcm90YXRlIHRoZSBjYW52YXMgYnlcbiAgICAgKi9cbiAgICBwcmVwQ2FudmFzKHBvc2l0aW9uWDogbnVtYmVyLCBwb3NpdGlvblk6IG51bWJlciwgZGVncmVlczogbnVtYmVyKXtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZShwb3NpdGlvblgsIHBvc2l0aW9uWSk7XG4gICAgICAgIHRoaXMuY3R4LnJvdGF0ZShkZWdyZWVzICogTWF0aC5QSSAvIDE4MCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBcbiAgICAgKiBAcGFyYW0gc3Ryb2tlIFN0cm9rZSB0byByZW5kZXJcbiAgICAgKiBAcGFyYW0gcGFsZXR0ZSBDb250YWlucyB0aGUgbWFzdGVyIHBpZWNlJ3MgY29sb3Igc3dhdGNoZXNcbiAgICAgKi9cbiAgICByZW5kZXJTdHJva2Uoc3Ryb2tlOiBzdHJva2UsIHBhbGV0dGU6IHN0cmluZ1tdKXtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gcGFsZXR0ZVtzdHJva2Uuc3dhdGNoXTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3Qoc3Ryb2tlLmNlbGxYICogQ1VCRV9TSVpFLCBzdHJva2UuY2VsbFkgKiBDVUJFX1NJWkUsXG4gICAgICAgICAgICBzdHJva2Uud2lkdGggKiBDVUJFX1NJWkUsIHN0cm9rZS5oZWlnaHQgKiBDVUJFX1NJWkUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVyYXNlcyBldmVyeXRoaW5nIG9uIHRoZSBjYW52YXNcbiAgICAgKi9cbiAgICB3aXBlQ2FudmFzKCkge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhbnZhcycgd2lkdGggYW5kIGhlaWdodFxuICAgICAqL1xuICAgIHNpemUoKToge3dpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfSB7XG4gICAgICAgIHJldHVybiB7IHdpZHRoOiB0aGlzLndpZHRoLCBoZWlnaHQ6IHRoaXMuIGhlaWdodCB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgUG9wb3ZhJ3MgY3ViZSByZW5kZXIgc2l6ZVxuICAgICAqL1xuICAgIGN1YmVTaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBDVUJFX1NJWkU7XG4gICAgfVxuXG5cbiAgICBnZXRNb3VzZVBvcyhldnQ6IGFueSk6IG1vdXNlUG9zaXRpb24ge1xuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgcG9zWCA9IGV2dC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICB2YXIgcG9zWSA9IGV2dC5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgICAgIHZhciBvZmZDYW52YXMgPSBmYWxzZTtcblxuICAgICAgICBpZiAocG9zWCA8IDApIHtcbiAgICAgICAgICAgIHBvc1ggPSAwO1xuICAgICAgICAgICAgb2ZmQ2FudmFzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zWSA8IDApIHtcbiAgICAgICAgICAgIHBvc1kgPSAwO1xuICAgICAgICAgICAgb2ZmQ2FudmFzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zWCA+IHRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgIHBvc1ggPSB0aGlzLndpZHRoO1xuICAgICAgICAgICAgb2ZmQ2FudmFzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zWSA+IHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICBwb3NZID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgICAgICBvZmZDYW52YXMgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiBwb3NYLFxuICAgICAgICAgIHk6IHBvc1ksXG4gICAgICAgICAgb3V0T2ZCb3VuZHM6IG9mZkNhbnZhcyxcbiAgICAgICAgfTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCAqIGFzIHNvY2tldElvIGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XG5pbXBvcnQgeyBQb3BvdmEsIG1vdXNlUG9zaXRpb24gfSBmcm9tIFwiLi9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8vIFNvY2tldCBsaXN0ZW5lclxudmFyIHNvY2tldCA9IGlvKCk7XG5cbnZhciBjdWJlU2l6ZTogbnVtYmVyO1xudmFyIGdyaWRTaXplOiBudW1iZXIgPSA2NDtcblxudmFyIHBsYXllcklkOiBzdHJpbmc7XG52YXIgcGxheWVyV2lkdGg6IG51bWJlcjtcbnZhciBwbGF5ZXJIZWlnaHQ6IG51bWJlcjtcblxudmFyIHJlbmRlck9mZnNldFg6IG51bWJlcjtcbnZhciByZW5kZXJPZmZzZXRZOiBudW1iZXI7XG5cbnZhciBtb3VzZVBvczogbW91c2VQb3NpdGlvbjtcblxudmFyIG1vdmVtZW50ID0ge1xuICAgIHVwOiBmYWxzZSxcbiAgICBkb3duOiBmYWxzZSxcbiAgICBsZWZ0OiBmYWxzZSxcbiAgICByaWdodDogZmFsc2Vcbn1cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDY1OiAvLyBBXG4gICAgICAgICAgICBtb3ZlbWVudC5sZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDg3OiAvLyBXXG4gICAgICAgICAgICBtb3ZlbWVudC51cCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA2ODogLy8gRFxuICAgICAgICAgICAgbW92ZW1lbnQucmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgODM6IC8vIFNcbiAgICAgICAgICAgIG1vdmVtZW50LmRvd24gPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgNjU6IC8vIEFcbiAgICAgICAgICAgIG1vdmVtZW50LmxlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDg3OiAvLyBXXG4gICAgICAgICAgICBtb3ZlbWVudC51cCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNjg6IC8vIERcbiAgICAgICAgICAgIG1vdmVtZW50LnJpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA4MzogLy8gU1xuICAgICAgICAgICAgbW92ZW1lbnQuZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufSk7XG5cbm1vdXNlUG9zID0geyB4OiAwLCB5OiAwLCBvdXRPZkJvdW5kczogdHJ1ZSB9O1xuXG5mdW5jdGlvbiBvbk1vdXNlTW92ZShldmVudDogYW55KSB7XG4gICAgbW91c2VQb3MgPSBmb3JlZ3JvdW5kLmdldE1vdXNlUG9zKGV2ZW50KTtcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlLCBmYWxzZSk7XG5cbmZ1bmN0aW9uIG9uTW91c2VDbGljayhldmVudDogYW55KSB7XG4gICAgaWYgKCFtb3VzZVBvcy5vdXRPZkJvdW5kcykge1xuICAgICAgICBzb2NrZXQuZW1pdChcIm1vdXNlRG93blwiLCB7IHNvdXJjZUlkOiBwbGF5ZXJJZCwgdGFyZ2V0WDogKG1vdXNlUG9zLnggKyByZW5kZXJPZmZzZXRYKSwgdGFyZ2V0WTogKG1vdXNlUG9zLnkgKyByZW5kZXJPZmZzZXRZKSB9KTtcbiAgICB9XG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uTW91c2VDbGljaywgZmFsc2UpO1xuXG4vLyBUZWxsIHRoZSBzZXJ2ZXIgYSBuZXcgcGxheWVyIGhhcyBqb2luZWQgYW5kIGhhbmRzaGFrZVxuc29ja2V0LmVtaXQoXCJuZXctcGxheWVyXCIpO1xuc29ja2V0Lm9uKFwiaGFuZHNoYWtlXCIsIChpbmZvOiBhbnkpID0+IHtcbiAgICBwbGF5ZXJJZCA9IGluZm8uaWQ7XG4gICAgcGxheWVyV2lkdGggPSBpbmZvLnBsYXllcldpZHRoO1xuICAgIHBsYXllckhlaWdodCA9IGluZm8ucGxheWVySGVpZ2h0O1xufSk7XG5cbi8vIEJyb2FkY2FzdCBwbGF5ZXIgbW92ZW1lbnRcbnNldEludGVydmFsKCgpID0+IHtcbiAgICBzb2NrZXQuZW1pdChcIm1vdmVtZW50XCIsIG1vdmVtZW50KTtcbn0sIDEwMDAvNjApO1xuXG4vLyBJbml0IGNhbnZhc1xudmFyIGJhY2tncm91bmQgID0gbmV3IFBvcG92YSgpO1xudmFyIGVudiAgICAgICAgID0gbmV3IFBvcG92YSgpO1xudmFyIGZvcmVncm91bmQgID0gbmV3IFBvcG92YSgpO1xuXG5iYWNrZ3JvdW5kLmluaXQoXCJiYWNrZ3JvdW5kXCIpO1xuZW52LmluaXQoXCJlbnZcIik7XG5mb3JlZ3JvdW5kLmluaXQoXCJmb3JlZ3JvdW5kXCIpO1xuXG5iYWNrZ3JvdW5kLmRyYXdHcmlkKDUwKTtcblxuLy8gSW50ZXJwcmV0IHN0YXRlIGFuZCBkcmF3IG9iamVjdHNcbnNvY2tldC5vbihcInN0YXRlXCIsIChvYmplY3RzOiBhbnkpID0+IHtcbiAgICBmb3JlZ3JvdW5kLndpcGVDYW52YXMoKTtcbiAgICBlbnYud2lwZUNhbnZhcygpO1xuICAgIHZhciBjYW52YXNTaXplID0gZm9yZWdyb3VuZC5zaXplKCk7XG5cbiAgICAvLyBUT0RPOiBBZGQgc21vb3RoaW5nIHRvIGNhbWVyYSBtb3ZlbWVudFxuICAgIHJlbmRlck9mZnNldFggPSAoISFwbGF5ZXJJZClcbiAgICAgICAgPyBvYmplY3RzW3BsYXllcklkXS54ICsgcGxheWVyV2lkdGggKiBmb3JlZ3JvdW5kLmN1YmVTaXplKCkgLyAyICsgKG1vdXNlUG9zLnggLSAoY2FudmFzU2l6ZS53aWR0aCAvIDIpKSAvIDMgLSBjYW52YXNTaXplLndpZHRoIC8gMlxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICByZW5kZXJPZmZzZXRZID0gKCEhcGxheWVySWQpXG4gICAgICAgID8gb2JqZWN0c1twbGF5ZXJJZF0ueSArIHBsYXllckhlaWdodCAqIGZvcmVncm91bmQuY3ViZVNpemUoKSAvIDIgKyAobW91c2VQb3MueSAtIChjYW52YXNTaXplLmhlaWdodCAvIDIpKSAvIDMgLSBjYW52YXNTaXplLmhlaWdodCAvIDJcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoISFvYmplY3RzKSB7XG4gICAgICAgIGJhY2tncm91bmQud2lwZUNhbnZhcygpO1xuICAgICAgICBiYWNrZ3JvdW5kLmRyYXdHcmlkKGdyaWRTaXplLCAtcmVuZGVyT2Zmc2V0WCwgLXJlbmRlck9mZnNldFkpO1xuICAgIH1cblxuICAgIGZvcih2YXIgaWQgaW4gb2JqZWN0cyl7XG4gICAgICAgIHZhciBvYmplY3QgPSBvYmplY3RzW2lkXTtcblxuICAgICAgICAvLyBUT0RPOiBTcGVjaWZ5IGRpbWVuc2lvbnMgb2YgbWFzdGVycGllY2UgYW5kIHJlbmRlciBhcm91bmQgcG9zaXRpb24sXG4gICAgICAgIC8vIEluc3RlYWQgb2YgZnJvbSB0b3AtbGVmdCBjb3JuZXIgYXMgaXQgaXMgbm93LFxuICAgICAgICAvLyBXaWxsIGhlbHAgd2l0aCBvYmplY3QgcG9zaXRpb24gbGF0ZXIgb24uXG4gICAgICAgIHN3aXRjaCAob2JqZWN0LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJwbGF5ZXJcIjpcbiAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kLmRyYXcoe1xuICAgICAgICAgICAgICAgICAgICBwYWxldHRlOiBbXCIjYWJhYjlhXCIsIFwiI0ZGNjlCNFwiLCBcIiNBQUFBQUFcIiwgXCIjNzc1MDUwXCJdLFxuICAgICAgICAgICAgICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgICAgICAgICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgICAgICAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWTogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFg6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3dhdGNoOiAyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFk6IDQsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3YXRjaDogM1xuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2F0Y2g6IDNcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwcm9qZWN0aWxlXCI6XG4gICAgICAgICAgICAgICAgZW52LmRyYXcoe1xuICAgICAgICAgICAgICAgICAgICBwYWxldHRlOiBbXCIjNDQ0NDQ0XCJdLFxuICAgICAgICAgICAgICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgICAgICAgICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgICAgICAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICAgICAgICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=