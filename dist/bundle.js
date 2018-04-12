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

/***/ "./ObjectTypes.js":
/*!************************!*\
  !*** ./ObjectTypes.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    ObjectTypes: {
        PLAYER: "player",
        GRAVESTONE: "gravestone",
        PROJECTILE: "projectile",
        TERRAIN: "terrain",
        INTERACTABLE: "interactable",
        TRIGGER: "trigger",
        VEHICLE: "vehicle",
    },
    Player: {
        HUMAN: "human",
        GOD: "god",
        FIRE_MAGE: "fire-mage",
        KNIGHT: "knight",
    },
    Projectile: {
        BASIC_PROJECTILE: "basic-projectile",
        FIREBOLT_PROJECTILE: "firebold-projectile",
    },
    Terrain: {
        TREE: "tree",
        WALL_HORIZ: "wall-horiz",
    },
    Interactable: {
        HEALTH_PICKUP: "health-pickup",
        CAR_ENTER: "car-enter",
    },
    Trigger: {
        SPIKE_TRAP: "spike-trap",
    },
    Vehicle: {
        CAR: "car",
    },
    EquipmentTypes: {
        BLASTER: "blaster",
        SCANNER: "scanner",
        BUILDER: "builder",
        BINOCULARS: "binoculars",
    },
    Abilities: {
        FIREBOLT: "firebolt",
    },
};


/***/ }),

/***/ "./src/Louvre/Louvre.ts":
/*!******************************!*\
  !*** ./src/Louvre/Louvre.ts ***!
  \******************************/
/*! exports provided: playerMasterPiece, godPlayerMasterPiece, firemagePlayerMasterPiece, healthBarMasterPiece, treeTrunkMasterPiece, treeLeafMasterPiece, graveStoneMasterPiece, projectileMasterPiece, fireboltProjectileMasterPiece, defaultTerrainMasterPiece, wallHorizBaseMasterPiece, wallHorizCoverMasterPiece, healthPickupMasterPiece, spikeTrapMasterPiece, carMasterPiece, blasterUIMasterPiece, scannerUIMasterPiece, builderUIMasterPiece, binocularsUIMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerMasterPiece", function() { return playerMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "godPlayerMasterPiece", function() { return godPlayerMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firemagePlayerMasterPiece", function() { return firemagePlayerMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "healthBarMasterPiece", function() { return healthBarMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "treeTrunkMasterPiece", function() { return treeTrunkMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "treeLeafMasterPiece", function() { return treeLeafMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graveStoneMasterPiece", function() { return graveStoneMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "projectileMasterPiece", function() { return projectileMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fireboltProjectileMasterPiece", function() { return fireboltProjectileMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultTerrainMasterPiece", function() { return defaultTerrainMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wallHorizBaseMasterPiece", function() { return wallHorizBaseMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wallHorizCoverMasterPiece", function() { return wallHorizCoverMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "healthPickupMasterPiece", function() { return healthPickupMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spikeTrapMasterPiece", function() { return spikeTrapMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "carMasterPiece", function() { return carMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blasterUIMasterPiece", function() { return blasterUIMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scannerUIMasterPiece", function() { return scannerUIMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "builderUIMasterPiece", function() { return builderUIMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "binocularsUIMasterPiece", function() { return binocularsUIMasterPiece; });
/**
 * Get master piece for player object
 * @param object The player object
 * @param renderOffsetX Horizontal offset for rendering objects
 * @param renderOffsetY Vertical offset for render objects
 */
function playerMasterPiece(object, renderOffsetX, renderOffsetY) {
    return {
        palette: ["#abab9a", "#775050", "#AAAAAA", "#000080"],
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
 * Get master piece for god player object
 * @param object The god player object
 * @param renderOffsetX Horizontal offset for rendering objects
 * @param renderOffsetY Vertical offset for render objects
 */
function godPlayerMasterPiece(object, renderOffsetX, renderOffsetY) {
    return {
        palette: ["#FF149388"],
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
                swatch: 0
            }, {
                cellX: 1,
                cellY: 0,
                width: 2,
                height: 2,
                swatch: 0
            }, {
                cellX: 1,
                cellY: 4,
                width: 2,
                height: 2,
                swatch: 0
            },],
    };
}
/**
 * Get master piece for firemage player object
 * @param object The firemage player object
 * @param renderOffsetX Horizontal offset for rendering objects
 * @param renderOffsetY Vertical offset for render objects
 */
function firemagePlayerMasterPiece(object, renderOffsetX, renderOffsetY) {
    return {
        palette: ["#D2B48C", "#A52A2A", "#DC143C", "#dbc3a3"],
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
                swatch: 2
            }, {
                cellX: 1,
                cellY: 0,
                width: 2,
                height: 4,
                swatch: 0
            }, {
                cellX: 1,
                cellY: 0,
                width: 2,
                height: 2,
                swatch: 3
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
            }, {
                cellX: 1,
                cellY: 0,
                width: 0.5,
                height: 6,
                swatch: 2
            }, {
                cellX: 2.5,
                cellY: 0,
                width: 0.5,
                height: 6,
                swatch: 2
            }, {
                cellX: 1,
                cellY: 0,
                width: 2,
                height: 0.5,
                swatch: 2
            },],
    };
}
/**
 * Get master piece for object's health bar
 * @param object The object that needs a health bar
 * @param renderOffsetX Horizontal offset for rendering objects
 * @param renderOffsetY Vertical offset for render objects
 * @param cubeSize The cube render size, required when drawing free hand
 */
function healthBarMasterPiece(object, renderOffsetX, renderOffsetY, cubeSize) {
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
 * @param renderOffsetX Horizontal offset for rendering objects
 * @param renderOffsetY Vertical offset for render objects
 */
function treeTrunkMasterPiece(object, renderOffsetX, renderOffsetY) {
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
 * @param renderOffsetX Horizontal offset for rendering objects
 * @param renderOffsetY Vertical offset for render objects
 */
function treeLeafMasterPiece(object, renderOffsetX, renderOffsetY) {
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
/**
 * Get master piece for gravestone object
 * @param object The gravestone object
 * @param renderOffsetX Horizontal offset for rendering objects
 * @param renderOffsetY Vertical offset for render objects
 */
function graveStoneMasterPiece(object, renderOffsetX, renderOffsetY) {
    return {
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
    };
}
/**
 * Get master piece for basic projectile
 * @param object The projectile object
 * @param renderOffsetX Horizontal offset for rendering the objects
 * @param renderOffsetY Vertical offset for rendering the objects
 */
function projectileMasterPiece(object, renderOffsetX, renderOffsetY) {
    return {
        // Remove comments for rainbow bullets
        // palette: ["#FF6666", "#66FF66", "#6666FF", "#FFFF66", "#FF66FF", "#66FFFF"],
        palette: ["#222222"],
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
                // swatch: Math.floor(Math.random() * 6)
                swatch: 0
            }]
    };
}
/**
 * Get master piece for firebolt projectile
 * @param object The firebolt projectile object
 * @param renderOffsetX Horizontal offset for rendering the objects
 * @param renderOffsetY Vertical offset for rendering the objects
 */
function fireboltProjectileMasterPiece(object, renderOffsetX, renderOffsetY) {
    return {
        palette: ["#CD5C5C", "#FF8C00"],
        posX: object.x - renderOffsetX,
        posY: object.y - renderOffsetY,
        width: object.width,
        height: object.height,
        facing: object.facing,
        strokes: [{
                cellX: 1,
                cellY: 0,
                width: 1,
                height: object.height,
                swatch: 0
            }, {
                cellX: 0,
                cellY: 1,
                width: object.width,
                height: 1,
                swatch: 0
            }, {
                cellX: 0.5,
                cellY: 0.5,
                width: 2,
                height: 2,
                swatch: 0
            }, {
                cellX: 1,
                cellY: 1,
                width: 1,
                height: 1,
                swatch: 1
            },]
    };
}
/**
 * Get master piece for default terrain object
 * @param object The terrain object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
function defaultTerrainMasterPiece(object, renderOffsetX, renderOffsetY) {
    return {
        palette: ["#FFB3FF"],
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
            }]
    };
}
/**
 * Get master piece for horizontal wall object base
 * @param object The horizontal wall object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
function wallHorizBaseMasterPiece(object, renderOffsetX, renderOffsetY) {
    return {
        palette: ["#888888"],
        posX: object.x - renderOffsetX,
        posY: object.y - renderOffsetY,
        width: object.hitboxWidth,
        height: object.hitboxHeight,
        facing: object.facing,
        strokes: [{
                cellX: 0,
                cellY: 0,
                width: object.hitboxWidth,
                height: object.hitboxHeight,
                swatch: 0
            }]
    };
}
// TODO: Add more detail to wall (cobblestone style), change coloring depending on object health
/**
 * Get master piece for horizontal wall object cover
 * @param object The horizontal wall object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
function wallHorizCoverMasterPiece(object, renderOffsetX, renderOffsetY) {
    return {
        palette: ["#A3A3C2BB"],
        posX: object.x - renderOffsetX,
        posY: object.y - renderOffsetY,
        width: object.width,
        height: object.height,
        facing: object.facing,
        strokes: [{
                cellX: 0,
                cellY: -object.height / 2,
                width: object.width,
                height: object.height,
                swatch: 0
            }]
    };
}
/**
 * Get master piece for health pickup object
 * @param object The health pickup object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
function healthPickupMasterPiece(object, renderOffsetX, renderOffsetY) {
    return {
        palette: ["#FFFFFF", "#FF0000"],
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
            }, {
                cellX: 0,
                cellY: 1,
                width: object.width,
                height: 1,
                swatch: 1
            }, {
                cellX: 1,
                cellY: 0,
                width: 1,
                height: object.height,
                swatch: 1
            }]
    };
}
/**
 * Get master piece for spike trap object
 * @param object The spike trap object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
function spikeTrapMasterPiece(object, renderOffsetX, renderOffsetY) {
    return {
        palette: ["#808080"],
        posX: object.x - renderOffsetX,
        posY: object.y - renderOffsetY,
        width: object.width,
        height: object.height,
        facing: object.facing,
        strokes: [{
                cellX: 1,
                cellY: 0,
                width: 1,
                height: 2,
                swatch: 0
            }, {
                cellX: 3,
                cellY: 0,
                width: 1,
                height: 2,
                swatch: 0
            }, {
                cellX: 0,
                cellY: 3,
                width: 1,
                height: 2,
                swatch: 0
            }, {
                cellX: 2,
                cellY: 3,
                width: 1,
                height: 2,
                swatch: 0
            }, {
                cellX: 4,
                cellY: 3,
                width: 1,
                height: 2,
                swatch: 0
            },]
    };
}
function carMasterPiece(object, renderOffsetX, renderOffsetY) {
    var highlightR = parseInt("0x" + object.carColor.substring(1, 3), 16) + 0x33;
    var highlightG = parseInt("0x" + object.carColor.substring(3, 5), 16) + 0x33;
    var highlightB = parseInt("0x" + object.carColor.substring(5, 7), 16) + 0x33;
    return {
        palette: ["#333333"]
            .concat(object.carColor)
            .concat("#" +
            (highlightR > 0xFF ? 0xFF : highlightR).toString(16) +
            (highlightG > 0xFF ? 0xFF : highlightG).toString(16) +
            (highlightB > 0xFF ? 0xFF : highlightB).toString(16)),
        posX: object.x - renderOffsetX,
        posY: object.y - renderOffsetY,
        width: object.width,
        height: object.height,
        facing: object.facing,
        strokes: [{
                cellX: 0,
                cellY: 1,
                width: object.width,
                height: 5,
                swatch: 1
            }, {
                cellX: 1,
                cellY: 0,
                width: object.width - 2,
                height: 5,
                swatch: 1
            }, {
                cellX: 1,
                cellY: 4,
                width: object.width - 2,
                height: 6,
                swatch: 1
            }, {
                cellX: 0,
                cellY: 9,
                width: object.width,
                height: 6,
                swatch: 1
            }, {
                cellX: 1,
                cellY: 9,
                width: object.width - 2,
                height: 7,
                swatch: 1
            }, {
                cellX: 1,
                cellY: 3,
                width: object.width - 2,
                height: 2,
                swatch: 0
            }, {
                cellX: 2,
                cellY: 2,
                width: object.width - 4,
                height: 3,
                swatch: 0
            }, {
                cellX: 1,
                cellY: 10,
                width: object.width - 2,
                height: 3,
                swatch: 0
            }, {
                cellX: 2,
                cellY: 10,
                width: object.width - 4,
                height: 4,
                swatch: 0
            }, {
                cellX: 3,
                cellY: 6,
                width: object.width - 6,
                height: 3,
                swatch: 2
            }, {
                cellX: -1,
                cellY: 6,
                width: 1,
                height: 1,
                swatch: 1
            }, {
                cellX: object.width,
                cellY: 6,
                width: 1,
                height: 1,
                swatch: 1
            },]
    };
}
// --- UI Icons ---
/**
 * Get master piece for blaster ui icon
 * @param posX Horizontal icon position
 * @param posY Vertical icon position
 */
function blasterUIMasterPiece(posX, posY) {
    return {
        palette: ["#000000"],
        posX: posX,
        posY: posY,
        width: 3,
        height: 2,
        facing: -45,
        strokes: [{
                cellX: 0,
                cellY: 0,
                width: 1,
                height: 2,
                swatch: 0
            }, {
                cellX: 0,
                cellY: 0,
                width: 3,
                height: 1,
                swatch: 0
            },]
    };
}
/**
 * Get master piece for scanner ui icon
 * @param posX Horizontal icon position
 * @param posY Vertical icon position
 */
function scannerUIMasterPiece(posX, posY) {
    return {
        palette: ["#FFFFFF", "#3399FF"],
        posX: posX,
        posY: posY,
        width: 3,
        height: 3,
        facing: 0,
        strokes: [{
                cellX: 0,
                cellY: 0,
                width: 3,
                height: 3,
                swatch: 0
            }, {
                cellX: -1,
                cellY: 1,
                width: 5,
                height: 1,
                swatch: 0
            }, {
                cellX: 1,
                cellY: 1,
                width: 1,
                height: 1,
                swatch: 1
            },]
    };
}
/**
 * Get master piece for builder ui icon
 * @param posX Horizontal icon position
 * @param posY Vertical icon position
 */
function builderUIMasterPiece(posX, posY) {
    return {
        palette: ["#000000", "#935200"],
        posX: posX,
        posY: posY,
        width: 3,
        height: 3,
        facing: -45,
        strokes: [{
                cellX: 1,
                cellY: 0,
                width: 1,
                height: 3,
                swatch: 1
            }, {
                cellX: 0,
                cellY: 0,
                width: 3,
                height: 1,
                swatch: 0
            },]
    };
}
/**
 * Get master piece for binoculars ui icon
 * @param posX Horizontal icon position
 * @param posY Vertical icon position
 */
function binocularsUIMasterPiece(posX, posY) {
    return {
        palette: ["#000000", "#333333"],
        posX: posX,
        posY: posY,
        width: 3,
        height: 3,
        facing: -45,
        strokes: [{
                cellX: 0,
                cellY: 1,
                width: 3,
                height: 1,
                swatch: 1
            }, {
                cellX: 0,
                cellY: 0,
                width: 1,
                height: 3,
                swatch: 0
            }, {
                cellX: 2,
                cellY: 0,
                width: 1,
                height: 3,
                swatch: 0
            },]
    };
}


/***/ }),

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
        this.cubeSize = 12;
    }
    /**
     * Initializes Popova's canvas
     * @param canvasId Id of html canvas element
     * @param cubeSize Render size for each cube when drawing with cubes
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
    Popova.prototype.drawText = function (text, posX, posY) {
        this.ctx.font = "16px Arial";
        this.ctx.fillText(text, posX, posY);
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
/* harmony import */ var _Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Louvre/Louvre */ "./src/Louvre/Louvre.ts");
/* harmony import */ var _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ObjectTypes */ "./ObjectTypes.js");
/* harmony import */ var _ObjectTypes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ObjectTypes__WEBPACK_IMPORTED_MODULE_2__);



// Socket listener
var socket = io();
var debug = true;
var cubeSize;
var gridSize = 48;
var canvasSize;
var equipmentIconPosX = 976;
var equipmentIconPosY = 726;
var playerId;
var renderOffsetX;
var renderOffsetY;
var cameraMovingToX;
var cameraMovingToY;
var cameraPanSpeed = 0.015;
var mousePos = { x: 0, y: 0, outOfBounds: true };
var playerInput = {
    up: false,
    down: false,
    left: false,
    right: false,
    cycleEquipmentForward: false,
    cycleEquipmentBackward: false,
    pickup: false,
    ability1: false,
    ability2: false,
    ability3: false,
    ability4: false,
    targetX: mousePos.x,
    targetY: mousePos.y,
};
var KEY_UP = 87; // Default to W
var KEY_DOWN = 83; // Default to S
var KEY_RIGHT = 68; // Default to D
var KEY_LEFT = 65; // Default to A
var KEY_CYCLE_EQUIPMENT_FORWARD = 69; // Default to E
var KEY_CYCLE_EQUIPMENT_BACKWARD = 81; // Default to Q
var KEY_PICKUP = 70; // Default to F
var KEY_ABILITY_1 = 49; // Default to 1
var KEY_ABILITY_2 = 50; // Default to 2
var KEY_ABILITY_3 = 51; // Default to 3
var KEY_ABILITY_4 = 52; // Default to 4
var prevTime = 0;
var delta = 0;
// Add listeners to document
document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case KEY_UP:
            playerInput.up = true;
            break;
        case KEY_DOWN:
            playerInput.down = true;
            break;
        case KEY_RIGHT:
            playerInput.right = true;
            break;
        case KEY_LEFT:
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
        case KEY_ABILITY_1:
            playerInput.ability1 = true;
            break;
        case KEY_ABILITY_2:
            playerInput.ability2 = true;
            break;
        case KEY_ABILITY_3:
            playerInput.ability3 = true;
            break;
        case KEY_ABILITY_4:
            playerInput.ability4 = true;
            break;
        default:
            return;
    }
    playerInput.targetX = mousePos.x + renderOffsetX;
    playerInput.targetY = mousePos.y + renderOffsetY;
    socket.emit("playerInput", playerInput);
    // Trigger keys are unset after emission
    playerInput.pickup = false;
    playerInput.cycleEquipmentForward = false;
    playerInput.cycleEquipmentBackward = false;
    playerInput.ability1 = false;
    playerInput.ability2 = false;
    playerInput.ability3 = false;
    playerInput.ability4 = false;
});
document.addEventListener("keyup", function (event) {
    switch (event.keyCode) {
        case KEY_UP:
            playerInput.up = false;
            break;
        case KEY_DOWN:
            playerInput.down = false;
            break;
        case KEY_RIGHT:
            playerInput.right = false;
            break;
        case KEY_LEFT:
            playerInput.left = false;
            break;
        default:
            return;
    }
    socket.emit("playerInput", playerInput);
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
            targetY: (mousePos.y + renderOffsetY),
            playerInput: playerInput,
        });
    }
}
window.addEventListener("click", onMouseClick, false);
// Init canvas
var background = new _Popova_Popova__WEBPACK_IMPORTED_MODULE_0__["Popova"]();
var env = new _Popova_Popova__WEBPACK_IMPORTED_MODULE_0__["Popova"]();
var foreground = new _Popova_Popova__WEBPACK_IMPORTED_MODULE_0__["Popova"]();
var cover = new _Popova_Popova__WEBPACK_IMPORTED_MODULE_0__["Popova"]();
var ui = new _Popova_Popova__WEBPACK_IMPORTED_MODULE_0__["Popova"]();
background.init("background");
env.init("env");
foreground.init("foreground");
cover.init("cover");
ui.init("ui");
// Tell the server a new player has joined and handshake
socket.emit("new-player");
socket.on("handshake", function (info) {
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
socket.on("state", function (objects) {
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
    var time = Date.now();
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
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["EquipmentTypes"].BLASTER:
                ui.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["blasterUIMasterPiece"](equipmentIconPosX, equipmentIconPosY));
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["EquipmentTypes"].SCANNER:
                ui.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["scannerUIMasterPiece"](equipmentIconPosX, equipmentIconPosY));
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["EquipmentTypes"].BUILDER:
                ui.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["builderUIMasterPiece"](equipmentIconPosX, equipmentIconPosY));
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["EquipmentTypes"].BINOCULARS:
                ui.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["binocularsUIMasterPiece"](equipmentIconPosX, equipmentIconPosY));
                break;
            default:
                break;
        }
    }
    for (var id in objects) {
        var object = objects[id];
        switch (object.type) {
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["ObjectTypes"].PLAYER:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["Player"].HUMAN:
                        foreground.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["playerMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["Player"].GOD:
                        foreground.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["godPlayerMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["Player"].FIRE_MAGE:
                        foreground.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["firemagePlayerMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                foreground.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["healthBarMasterPiece"](object, renderOffsetX, renderOffsetY, cubeSize));
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["ObjectTypes"].PROJECTILE:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["Projectile"].BASIC_PROJECTILE:
                        env.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["projectileMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["Projectile"].FIREBOLT_PROJECTILE:
                        env.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["fireboltProjectileMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["ObjectTypes"].GRAVESTONE:
                env.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["graveStoneMasterPiece"](object, renderOffsetX, renderOffsetY));
                env.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["healthBarMasterPiece"](object, renderOffsetX, renderOffsetY, cubeSize));
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["ObjectTypes"].TERRAIN:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["Terrain"].TREE:
                        env.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["treeTrunkMasterPiece"](object, renderOffsetX, renderOffsetY));
                        cover.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["treeLeafMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["Terrain"].WALL_HORIZ:
                        env.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["wallHorizBaseMasterPiece"](object, renderOffsetX, renderOffsetY));
                        cover.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["wallHorizCoverMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["ObjectTypes"].INTERACTABLE:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["Interactable"].HEALTH_PICKUP:
                        env.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["healthPickupMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["ObjectTypes"].TRIGGER:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["Trigger"].SPIKE_TRAP:
                        env.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["spikeTrapMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["ObjectTypes"].VEHICLE:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_2__["Vehicle"].CAR:
                        foreground.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["carMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            default:
                env.draw(_Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["defaultTerrainMasterPiece"](object, renderOffsetX, renderOffsetY));
                break;
        }
    }
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vT2JqZWN0VHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xvdXZyZS9Mb3V2cmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BvcG92YS9Qb3BvdmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuRUEsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNiLFdBQVcsRUFBRTtRQUNULE1BQU0sRUFBRSxRQUFRO1FBQ2hCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFlBQVksRUFBRSxjQUFjO1FBQzVCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxTQUFTO0tBQ3JCO0lBQ0QsTUFBTSxFQUFFO1FBQ0osS0FBSyxFQUFFLE9BQU87UUFDZCxHQUFHLEVBQUUsS0FBSztRQUNWLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLE1BQU0sRUFBRSxRQUFRO0tBQ25CO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsZ0JBQWdCLEVBQUUsa0JBQWtC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QUUsYUFBYSxDQUFDLENBQUMsQ0FBQzt3QkFDL0UsTUFBTTtpQkFDYjtnQkFDRCxNQUFNO1lBQ1YsS0FBSyx3REFBaUIsQ0FBQyxPQUFPO2dCQUMxQixRQUFRLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQ3BCLEtBQUssb0RBQWEsQ0FBQyxVQUFVO3dCQUN6QixHQUFHLENBQUMsSUFBSSxDQUFDLG1FQUEyQixDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQzt3QkFDNUUsTUFBTTtpQkFDYjtnQkFDRCxNQUFNO1lBQ1YsS0FBSyx3REFBaUIsQ0FBQyxPQUFPO2dCQUMxQixRQUFRLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQ3BCLEtBQUssb0RBQWEsQ0FBQyxHQUFHO3dCQUNsQixVQUFVLENBQUMsSUFBSSxDQUFDLDZEQUFxQixDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQzt3QkFDN0UsTUFBTTtpQkFDYjtnQkFDRCxNQUFNO1lBQ1Y7Z0JBQ0ksR0FBRyxDQUFDLElBQUksQ0FBQyx3RUFBZ0MsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pGLE1BQU07U0FDYjtLQUNKO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgT2JqZWN0VHlwZXM6IHtcbiAgICAgICAgUExBWUVSOiBcInBsYXllclwiLFxuICAgICAgICBHUkFWRVNUT05FOiBcImdyYXZlc3RvbmVcIixcbiAgICAgICAgUFJPSkVDVElMRTogXCJwcm9qZWN0aWxlXCIsXG4gICAgICAgIFRFUlJBSU46IFwidGVycmFpblwiLFxuICAgICAgICBJTlRFUkFDVEFCTEU6IFwiaW50ZXJhY3RhYmxlXCIsXG4gICAgICAgIFRSSUdHRVI6IFwidHJpZ2dlclwiLFxuICAgICAgICBWRUhJQ0xFOiBcInZlaGljbGVcIixcbiAgICB9LFxuICAgIFBsYXllcjoge1xuICAgICAgICBIVU1BTjogXCJodW1hblwiLFxuICAgICAgICBHT0Q6IFwiZ29kXCIsXG4gICAgICAgIEZJUkVfTUFHRTogXCJmaXJlLW1hZ2VcIixcbiAgICAgICAgS05JR0hUOiBcImtuaWdodFwiLFxuICAgIH0sXG4gICAgUHJvamVjdGlsZToge1xuICAgICAgICBCQVNJQ19QUk9KRUNUSUxFOiBcImJhc2ljLXByb2plY3RpbGVcIixcbiAgICAgICAgRklSRUJPTFRfUFJPSkVDVElMRTogXCJmaXJlYm9sZC1wcm9qZWN0aWxlXCIsXG4gICAgfSxcbiAgICBUZXJyYWluOiB7XG4gICAgICAgIFRSRUU6IFwidHJlZVwiLFxuICAgICAgICBXQUxMX0hPUklaOiBcIndhbGwtaG9yaXpcIixcbiAgICB9LFxuICAgIEludGVyYWN0YWJsZToge1xuICAgICAgICBIRUFMVEhfUElDS1VQOiBcImhlYWx0aC1waWNrdXBcIixcbiAgICAgICAgQ0FSX0VOVEVSOiBcImNhci1lbnRlclwiLFxuICAgIH0sXG4gICAgVHJpZ2dlcjoge1xuICAgICAgICBTUElLRV9UUkFQOiBcInNwaWtlLXRyYXBcIixcbiAgICB9LFxuICAgIFZlaGljbGU6IHtcbiAgICAgICAgQ0FSOiBcImNhclwiLFxuICAgIH0sXG4gICAgRXF1aXBtZW50VHlwZXM6IHtcbiAgICAgICAgQkxBU1RFUjogXCJibGFzdGVyXCIsXG4gICAgICAgIFNDQU5ORVI6IFwic2Nhbm5lclwiLFxuICAgICAgICBCVUlMREVSOiBcImJ1aWxkZXJcIixcbiAgICAgICAgQklOT0NVTEFSUzogXCJiaW5vY3VsYXJzXCIsXG4gICAgfSxcbiAgICBBYmlsaXRpZXM6IHtcbiAgICAgICAgRklSRUJPTFQ6IFwiZmlyZWJvbHRcIixcbiAgICB9LFxufSIsImltcG9ydCB7IG1hc3RlclBpZWNlLCAgfSBmcm9tIFwiLi4vUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIHBsYXllciBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHBsYXllciBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNhYmFiOWFcIiwgXCIjNzc1MDUwXCIsIFwiI0FBQUFBQVwiLCBcIiMwMDAwODBcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDIsXG4gICAgICAgICAgICB3aWR0aDogNCxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogM1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAzLFxuICAgICAgICAgICAgY2VsbFk6IDMsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH1dLFxuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBnb2QgcGxheWVyIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgZ29kIHBsYXllciBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ29kUGxheWVyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNGRjE0OTM4OFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMixcbiAgICAgICAgICAgIHdpZHRoOiA0LFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdLFxuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBmaXJlbWFnZSBwbGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBmaXJlbWFnZSBwbGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpcmVtYWdlUGxheWVyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7ICAgIC8vIFNraW4sICAgICAgUGFudHMsICAgICBTaGlydCwgICAgICBGYWNlXG4gICAgICAgIHBhbGV0dGU6IFtcIiNEMkI0OENcIiwgXCIjQTUyQTJBXCIsIFwiI0RDMTQzQ1wiLCBcIiNkYmMzYTNcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDIsXG4gICAgICAgICAgICB3aWR0aDogNCxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDQsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAwLjUsXG4gICAgICAgICAgICBoZWlnaHQ6IDYsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIuNSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDAuNSxcbiAgICAgICAgICAgIGhlaWdodDogNixcbiAgICAgICAgICAgIHN3YXRjaDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDAuNSxcbiAgICAgICAgICAgIHN3YXRjaDogMlxuICAgICAgICB9LF0sXG4gICAgfVxufVxuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIG9iamVjdCdzIGhlYWx0aCBiYXJcbiAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdCB0aGF0IG5lZWRzIGEgaGVhbHRoIGJhclxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlciBvYmplY3RzXG4gKiBAcGFyYW0gY3ViZVNpemUgVGhlIGN1YmUgcmVuZGVyIHNpemUsIHJlcXVpcmVkIHdoZW4gZHJhd2luZyBmcmVlIGhhbmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhlYWx0aEJhck1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlciwgY3ViZVNpemU6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjMDBhNDAwXCIsIFwiI0ZGMDAwMFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFkgLSAob2JqZWN0LmhlaWdodCArIDIpICogY3ViZVNpemUgLyAyLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoICogY3ViZVNpemUsXG4gICAgICAgIGhlaWdodDogMSAqIGN1YmVTaXplLFxuICAgICAgICBmYWNpbmc6IDAsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC5oZWFsdGggLyBvYmplY3QubWF4SGVhbHRoICogb2JqZWN0LndpZHRoICogY3ViZVNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IGN1YmVTaXplICogMyAvIDQsXG4gICAgICAgICAgICBzd2F0Y2g6IChvYmplY3QuaGVhbHRoID4gb2JqZWN0Lm1heEhlYWx0aCAvIDMpID8gMCA6IDEsXG4gICAgICAgIH0sXSxcbiAgICBmcmVlSGFuZDogdHJ1ZX07XG59XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgdHJlZSBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHRyZWUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyZWVUcnVua01hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjOTkzMzAwXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LF0sXG4gICAgfTtcbn1cblxuLy8gVE9ETzogQ2hhbmdlIGxlYWYgcmVuZGVyaW5nIGRlcGVuZGluZyBvbiB0cmVlIGhlYWx0aFxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciB0cmVlIG9iamVjdCdzIGxlYXZlc1xuICogQHBhcmFtIG9iamVjdCBUaGUgdHJlZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gdHJlZUxlYWZNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzIyODgyMlwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IC0yLFxuICAgICAgICAgICAgY2VsbFk6IC00LFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAqIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogLTEwLFxuICAgICAgICAgICAgd2lkdGg6IDQsXG4gICAgICAgICAgICBoZWlnaHQ6IDcsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdLFxuICAgIH07XG59XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgZ3JhdmVzdG9uZSBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGdyYXZlc3RvbmUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdyYXZlU3RvbmVNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzg4ODg4OFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDAsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgICAgIHN3YXRjaDogMCxcbiAgICAgICAgfV1cbiAgICB9XG59XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgYmFzaWMgcHJvamVjdGlsZVxuICogQHBhcmFtIG9iamVjdCBUaGUgcHJvamVjdGlsZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0aWxlTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIC8vIFJlbW92ZSBjb21tZW50cyBmb3IgcmFpbmJvdyBidWxsZXRzXG4gICAgICAgIC8vIHBhbGV0dGU6IFtcIiNGRjY2NjZcIiwgXCIjNjZGRjY2XCIsIFwiIzY2NjZGRlwiLCBcIiNGRkZGNjZcIiwgXCIjRkY2NkZGXCIsIFwiIzY2RkZGRlwiXSxcbiAgICAgICAgcGFsZXR0ZTogW1wiIzIyMjIyMlwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICAvLyBzd2F0Y2g6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfV1cbiAgICB9XG59XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgZmlyZWJvbHQgcHJvamVjdGlsZVxuICogQHBhcmFtIG9iamVjdCBUaGUgZmlyZWJvbHQgcHJvamVjdGlsZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaXJlYm9sdFByb2plY3RpbGVNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI0NENUM1Q1wiLCBcIiNGRjhDMDBcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMC41LFxuICAgICAgICAgICAgY2VsbFk6IDAuNSxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LF1cbiAgICB9XG59XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgZGVmYXVsdCB0ZXJyYWluIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgdGVycmFpbiBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFRlcnJhaW5NYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOm1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjRkZCM0ZGXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9XVxuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBob3Jpem9udGFsIHdhbGwgb2JqZWN0IGJhc2VcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGhvcml6b250YWwgd2FsbCBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gd2FsbEhvcml6QmFzZU1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjODg4ODg4XCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC5oaXRib3hXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGl0Ym94SGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC5oaXRib3hXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhpdGJveEhlaWdodCxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9XVxuICAgIH1cbn1cblxuLy8gVE9ETzogQWRkIG1vcmUgZGV0YWlsIHRvIHdhbGwgKGNvYmJsZXN0b25lIHN0eWxlKSwgY2hhbmdlIGNvbG9yaW5nIGRlcGVuZGluZyBvbiBvYmplY3QgaGVhbHRoXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGhvcml6b250YWwgd2FsbCBvYmplY3QgY292ZXJcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGhvcml6b250YWwgd2FsbCBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gd2FsbEhvcml6Q292ZXJNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI0EzQTNDMkJCXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAtb2JqZWN0LmhlaWdodCAvIDIsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH1dXG4gICAgfVxufVxuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGhlYWx0aCBwaWNrdXAgb2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBoZWFsdGggcGlja3VwIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoZWFsdGhQaWNrdXBNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI0ZGRkZGRlwiLCBcIiNGRjAwMDBcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9XVxuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBzcGlrZSB0cmFwIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgc3Bpa2UgdHJhcCBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3Bpa2VUcmFwTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiM4MDgwODBcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMyxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAyLFxuICAgICAgICAgICAgY2VsbFk6IDMsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogNCxcbiAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhck1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICB2YXIgaGlnaGxpZ2h0UjogbnVtYmVyID0gcGFyc2VJbnQoXCIweFwiICsgb2JqZWN0LmNhckNvbG9yLnN1YnN0cmluZygxLCAzKSwgMTYpICsgMHgzMztcbiAgICB2YXIgaGlnaGxpZ2h0RzogbnVtYmVyID0gcGFyc2VJbnQoXCIweFwiICsgb2JqZWN0LmNhckNvbG9yLnN1YnN0cmluZygzLCA1KSwgMTYpICsgMHgzMztcbiAgICB2YXIgaGlnaGxpZ2h0QjogbnVtYmVyID0gcGFyc2VJbnQoXCIweFwiICsgb2JqZWN0LmNhckNvbG9yLnN1YnN0cmluZyg1LCA3KSwgMTYpICsgMHgzMztcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjMzMzMzMzXCJdXG4gICAgICAgICAgICAuY29uY2F0KG9iamVjdC5jYXJDb2xvcilcbiAgICAgICAgICAgIC5jb25jYXQoXCIjXCIgK1xuICAgICAgICAgICAgICAgIChoaWdobGlnaHRSID4gMHhGRiA/IDB4RkYgOiBoaWdobGlnaHRSKS50b1N0cmluZygxNikgK1xuICAgICAgICAgICAgICAgIChoaWdobGlnaHRHID4gMHhGRiA/IDB4RkYgOiBoaWdobGlnaHRHKS50b1N0cmluZygxNikgK1xuICAgICAgICAgICAgICAgIChoaWdobGlnaHRCID4gMHhGRiA/IDB4RkYgOiBoaWdobGlnaHRCKS50b1N0cmluZygxNilcbiAgICAgICAgICAgICksXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiA1LFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoIC0gMixcbiAgICAgICAgICAgIGhlaWdodDogNSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDYsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogOSxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IDYsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogOSxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggLSAyLFxuICAgICAgICAgICAgaGVpZ2h0OiA3LFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDMsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoIC0gMixcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiAyLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDQsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMTAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoIC0gMixcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiAxMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggLSA0LFxuICAgICAgICAgICAgaGVpZ2h0OiA0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAzLFxuICAgICAgICAgICAgY2VsbFk6IDYsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoIC0gNixcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogLTEsXG4gICAgICAgICAgICBjZWxsWTogNixcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBjZWxsWTogNixcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sXVxuICAgIH07XG59XG5cblxuLy8gLS0tIFVJIEljb25zIC0tLVxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBibGFzdGVyIHVpIGljb25cbiAqIEBwYXJhbSBwb3NYIEhvcml6b250YWwgaWNvbiBwb3NpdGlvblxuICogQHBhcmFtIHBvc1kgVmVydGljYWwgaWNvbiBwb3NpdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gYmxhc3RlclVJTWFzdGVyUGllY2UocG9zWDogbnVtYmVyLCBwb3NZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzAwMDAwMFwiXSxcbiAgICAgICAgcG9zWDogcG9zWCxcbiAgICAgICAgcG9zWTogcG9zWSxcbiAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgIGhlaWdodDogMixcbiAgICAgICAgZmFjaW5nOiAtNDUsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sXVxuICAgIH07XG59XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3Igc2Nhbm5lciB1aSBpY29uXG4gKiBAcGFyYW0gcG9zWCBIb3Jpem9udGFsIGljb24gcG9zaXRpb25cbiAqIEBwYXJhbSBwb3NZIFZlcnRpY2FsIGljb24gcG9zaXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjYW5uZXJVSU1hc3RlclBpZWNlKHBvc1g6IG51bWJlciwgcG9zWTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNGRkZGRkZcIiwgXCIjMzM5OUZGXCJdLFxuICAgICAgICBwb3NYOiBwb3NYLFxuICAgICAgICBwb3NZOiBwb3NZLFxuICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICBmYWNpbmc6IDAsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IC0xLFxuICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICB3aWR0aDogNSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSxdXG4gICAgfTtcbn1cblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBidWlsZGVyIHVpIGljb25cbiAqIEBwYXJhbSBwb3NYIEhvcml6b250YWwgaWNvbiBwb3NpdGlvblxuICogQHBhcmFtIHBvc1kgVmVydGljYWwgaWNvbiBwb3NpdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRlclVJTWFzdGVyUGllY2UocG9zWDogbnVtYmVyLCBwb3NZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzAwMDAwMFwiLCBcIiM5MzUyMDBcIl0sXG4gICAgICAgIHBvc1g6IHBvc1gsXG4gICAgICAgIHBvc1k6IHBvc1ksXG4gICAgICAgIHdpZHRoOiAzLFxuICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgIGZhY2luZzogLTQ1LFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LF1cbiAgICB9O1xufVxuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGJpbm9jdWxhcnMgdWkgaWNvblxuICogQHBhcmFtIHBvc1ggSG9yaXpvbnRhbCBpY29uIHBvc2l0aW9uXG4gKiBAcGFyYW0gcG9zWSBWZXJ0aWNhbCBpY29uIHBvc2l0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5vY3VsYXJzVUlNYXN0ZXJQaWVjZShwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjMDAwMDAwXCIsIFwiIzMzMzMzM1wiXSxcbiAgICAgICAgcG9zWDogcG9zWCxcbiAgICAgICAgcG9zWTogcG9zWSxcbiAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgZmFjaW5nOiAtNDUsXG4gICAgICAgIHN0cm9rZXM6IFsge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdXG4gICAgfTtcbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgbWFzdGVyUGllY2Uge1xuICAgIHBhbGV0dGU6IHN0cmluZ1tdLFxuICAgIHBvc1g6IG51bWJlcixcbiAgICBwb3NZOiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBmYWNpbmc6IG51bWJlcixcbiAgICBzdHJva2VzOiBzdHJva2VbXSxcbiAgICBmcmVlSGFuZD86IGJvb2xlYW4sXG59XG5cbmV4cG9ydCBpbnRlcmZhY2Ugc3Ryb2tlIHtcbiAgICBjZWxsWDogbnVtYmVyLFxuICAgIGNlbGxZOiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBzd2F0Y2g6IG51bWJlcixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBtb3VzZVBvc2l0aW9uIHtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIG91dE9mQm91bmRzOiBib29sZWFuLFxufVxuXG5leHBvcnQgY2xhc3MgUG9wb3ZhIHtcblxuICAgIHByaXZhdGUgY2FudmFzOiBhbnk7XG4gICAgcHJpdmF0ZSBjdHg6IGFueTtcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIGN1YmVTaXplOiBudW1iZXIgPSAxMjtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBQb3BvdmEncyBjYW52YXNcbiAgICAgKiBAcGFyYW0gY2FudmFzSWQgSWQgb2YgaHRtbCBjYW52YXMgZWxlbWVudFxuICAgICAqIEBwYXJhbSBjdWJlU2l6ZSBSZW5kZXIgc2l6ZSBmb3IgZWFjaCBjdWJlIHdoZW4gZHJhd2luZyB3aXRoIGN1YmVzXG4gICAgICovXG4gICAgaW5pdChjYW52YXNJZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gPGFueT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpO1xuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5jYW52YXMub2Zmc2V0V2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGEgZ3JpZCBvbiB0aGUgY2FudmFzXG4gICAgICogQHBhcmFtIHNwYWNpbmcgTnVtYmVyIG9mIHBpeGVscyBiZXR3ZWVuIGdyaWQgbGluZXNcbiAgICAqL1xuICAgIGRyYXdHcmlkKHNwYWNpbmc6IG51bWJlciwgb2Zmc2V0WD86IG51bWJlciwgb2Zmc2V0WT86IG51bWJlcikge1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgICAvLyBEcmF3IGdyaWQgb24gYmFja2dyb3VuZFxuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwiI2QwZDBkMFwiO1xuICAgICAgICBmb3IgKHZhciB4ID0gKCEhb2Zmc2V0WCkgPyBvZmZzZXRYICUgc3BhY2luZyA6IDA7IHggPD0gdGhpcy53aWR0aDsgeCArPSBzcGFjaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgMCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgeSA9ICghIW9mZnNldFkpID8gb2Zmc2V0WSAlIHNwYWNpbmcgOiAwOyB5IDw9IHRoaXMuaGVpZ2h0OyB5ICs9IHNwYWNpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbygwLCB5KTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLndpZHRoLCB5KTtcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYXdzIGEgbWFzdGVycGllY2UgdG8gdGhlIGNhbnZhc1xuICAgICAqIEBwYXJhbSBtYXN0ZXJQaWVjZSBEZWZpbml0aW9uIGZvciB3aGF0IHRvIGRyYXdcbiAgICAgKi9cbiAgICBkcmF3KG1hc3RlclBpZWNlOiBtYXN0ZXJQaWVjZSkge1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG5cbiAgICAgICAgdGhpcy5wcmVwQ2FudmFzKFxuICAgICAgICAgICAgbWFzdGVyUGllY2UucG9zWCxcbiAgICAgICAgICAgIG1hc3RlclBpZWNlLnBvc1ksXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS53aWR0aCxcbiAgICAgICAgICAgIG1hc3RlclBpZWNlLmhlaWdodCxcbiAgICAgICAgICAgIG1hc3RlclBpZWNlLmZhY2luZyxcbiAgICAgICAgICAgIG1hc3RlclBpZWNlLmZyZWVIYW5kKTtcbiAgICAgICAgbWFzdGVyUGllY2Uuc3Ryb2tlcy5mb3JFYWNoKChzdHJva2U6IHN0cm9rZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJTdHJva2Uoc3Ryb2tlLCBtYXN0ZXJQaWVjZS5wYWxldHRlLCBtYXN0ZXJQaWVjZS5mcmVlSGFuZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDZW50ZXJzIHRoZSBjYW52YXMgb24gcG9zaXRpb24sIGFuZCByb3RhdGVzIHRvIGEgY2VydGFpbiBmYWNpbmdcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25YIFRoZSB4IHBvc2l0aW9uIG9mIHdoYXQgaXMgYmVpbmcgZHJhd25cbiAgICAgKiBAcGFyYW0gcG9zaXRpb25ZIFRoZSB5IHBvc2l0aW9uIG9mIHdoYXQgaXMgYmVpbmcgZHJhd25cbiAgICAgKiBAcGFyYW0gd2lkdGggVGhlIHdpZHRoIG9mIHdoYXQgaXMgYmVpbmcgZHJhd25cbiAgICAgKiBAcGFyYW0gaGVpZ2h0IFRoZSBoZWlnaHQgb2Ygd2hhdCBpcyBiZWluZyBkcmF3blxuICAgICAqIEBwYXJhbSBkZWdyZWVzIERlZ3JlZXMgdG8gcm90YXRlIHRoZSBjYW52YXMgYnlcbiAgICAgKiBAcGFyYW0gZnJlZUhhbmQgSWYgdGhlIHN0cm9rZSBpcyByZW5kZXJlZCB3aXRoIGJsb2NrcyBvciBmcmVlIGhhbmRcbiAgICAgKi9cbiAgICBwcmVwQ2FudmFzKHBvc2l0aW9uWDogbnVtYmVyLCBwb3NpdGlvblk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGRlZ3JlZXM6IG51bWJlciwgZnJlZUhhbmQ/OiBib29sZWFuKXtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZShwb3NpdGlvblgsIHBvc2l0aW9uWSk7XG4gICAgICAgIHRoaXMuY3R4LnJvdGF0ZShkZWdyZWVzICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgIGlmIChmcmVlSGFuZCkge1xuICAgICAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKC0gd2lkdGggLyAyLCAtIGhlaWdodCAvIDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKC0gd2lkdGggKiB0aGlzLmN1YmVTaXplIC8gMiwgLSBoZWlnaHQgKiB0aGlzLmN1YmVTaXplIC8gMik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIFxuICAgICAqIEBwYXJhbSBzdHJva2UgU3Ryb2tlIHRvIHJlbmRlclxuICAgICAqIEBwYXJhbSBwYWxldHRlIENvbnRhaW5zIHRoZSBtYXN0ZXIgcGllY2UncyBjb2xvciBzd2F0Y2hlc1xuICAgICAqIEBwYXJhbSBmcmVlSGFuZCBJZiB0aGUgc3Ryb2tlIGlzIHJlbmRlcmVkIHdpdGggYmxvY2tzIG9yIGZyZWUgaGFuZFxuICAgICAqL1xuICAgIHJlbmRlclN0cm9rZShzdHJva2U6IHN0cm9rZSwgcGFsZXR0ZTogc3RyaW5nW10sIGZyZWVIYW5kPzogYm9vbGVhbil7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHBhbGV0dGVbc3Ryb2tlLnN3YXRjaF07XG4gICAgICAgIGlmIChmcmVlSGFuZCl7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChzdHJva2UuY2VsbFgsIHN0cm9rZS5jZWxsWSxcbiAgICAgICAgICAgICAgICBzdHJva2Uud2lkdGgsIHN0cm9rZS5oZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3Qoc3Ryb2tlLmNlbGxYICogdGhpcy5jdWJlU2l6ZSwgc3Ryb2tlLmNlbGxZICogdGhpcy5jdWJlU2l6ZSxcbiAgICAgICAgICAgICAgICBzdHJva2Uud2lkdGggKiB0aGlzLmN1YmVTaXplLCBzdHJva2UuaGVpZ2h0ICogdGhpcy5jdWJlU2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXJhc2VzIGV2ZXJ5dGhpbmcgb24gdGhlIGNhbnZhc1xuICAgICAqL1xuICAgIHdpcGVDYW52YXMoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY2FudmFzJyB3aWR0aCBhbmQgaGVpZ2h0XG4gICAgICovXG4gICAgc2l6ZSgpOiB7IHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyIH0ge1xuICAgICAgICByZXR1cm4geyB3aWR0aDogdGhpcy53aWR0aCwgaGVpZ2h0OiB0aGlzLmhlaWdodCB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgUG9wb3ZhJ3MgY3ViZSByZW5kZXIgc2l6ZVxuICAgICAqL1xuICAgIGdldEN1YmVTaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1YmVTaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgUG9wb3ZhJ3MgY3ViZSByZW5kZXIgc2l6ZVxuICAgICAqIEBwYXJhbSBzaXplIFZhbHVlIGZvciBjdWJlIHJlbmRlciBzaXplXG4gICAgICovXG4gICAgc2V0Q3ViZVNpemUoc2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY3ViZVNpemUgPSBzaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgbW91c2UgcG9zaXRpb24gYW5kIGlmIG1vdXNlIGlzIGluc2lkZSBjYW52YXNcbiAgICAgKiBAcGFyYW0gZXZ0IE1vdXNlIG1vdmVtZW50IGV2ZW50LCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uXG4gICAgICovXG4gICAgZ2V0TW91c2VQb3MoZXZ0OiBhbnkpOiBtb3VzZVBvc2l0aW9uIHtcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHBvc1ggPSBldnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgICAgdmFyIHBvc1kgPSBldnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICB2YXIgb2ZmQ2FudmFzID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHBvc1ggPCAwKSB7XG4gICAgICAgICAgICBwb3NYID0gMDtcbiAgICAgICAgICAgIG9mZkNhbnZhcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc1kgPCAwKSB7XG4gICAgICAgICAgICBwb3NZID0gMDtcbiAgICAgICAgICAgIG9mZkNhbnZhcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc1ggPiB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICBwb3NYID0gdGhpcy53aWR0aDtcbiAgICAgICAgICAgIG9mZkNhbnZhcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc1kgPiB0aGlzLmhlaWdodCkge1xuICAgICAgICAgICAgcG9zWSA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICAgICAgb2ZmQ2FudmFzID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogcG9zWCxcbiAgICAgICAgICB5OiBwb3NZLFxuICAgICAgICAgIG91dE9mQm91bmRzOiBvZmZDYW52YXMsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZHJhd1RleHQodGV4dDogc3RyaW5nLCBwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlcikge1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIxNnB4IEFyaWFsXCJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGV4dCwgcG9zWCwgcG9zWSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgKiBhcyBzb2NrZXRJbyBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xuaW1wb3J0IHsgUG9wb3ZhLCBtb3VzZVBvc2l0aW9uLCBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuL1BvcG92YS9Qb3BvdmFcIjtcbmltcG9ydCAqIGFzIGxvdXZyZSBmcm9tIFwiLi9Mb3V2cmUvTG91dnJlXCI7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vT2JqZWN0VHlwZXNcIjtcblxuLy8gU29ja2V0IGxpc3RlbmVyXG52YXIgc29ja2V0ID0gaW8oKTtcbnZhciBkZWJ1ZyA9IHRydWU7XG5cbnZhciBjdWJlU2l6ZTogbnVtYmVyO1xudmFyIGdyaWRTaXplOiBudW1iZXIgPSA0ODtcbnZhciBjYW52YXNTaXplOiB7IHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyIH07XG52YXIgZXF1aXBtZW50SWNvblBvc1g6IG51bWJlciA9IDk3NjtcbnZhciBlcXVpcG1lbnRJY29uUG9zWTogbnVtYmVyID0gNzI2O1xuXG52YXIgcGxheWVySWQ6IHN0cmluZztcblxudmFyIHJlbmRlck9mZnNldFg6IG51bWJlcjtcbnZhciByZW5kZXJPZmZzZXRZOiBudW1iZXI7XG52YXIgY2FtZXJhTW92aW5nVG9YOiBudW1iZXI7XG52YXIgY2FtZXJhTW92aW5nVG9ZOiBudW1iZXI7XG52YXIgY2FtZXJhUGFuU3BlZWQgPSAwLjAxNTtcblxudmFyIG1vdXNlUG9zOiBtb3VzZVBvc2l0aW9uID0geyB4OiAwLCB5OiAwLCBvdXRPZkJvdW5kczogdHJ1ZSB9O1xuXG52YXIgcGxheWVySW5wdXQgPSB7XG4gICAgdXA6IGZhbHNlLFxuICAgIGRvd246IGZhbHNlLFxuICAgIGxlZnQ6IGZhbHNlLFxuICAgIHJpZ2h0OiBmYWxzZSxcbiAgICBjeWNsZUVxdWlwbWVudEZvcndhcmQ6IGZhbHNlLFxuICAgIGN5Y2xlRXF1aXBtZW50QmFja3dhcmQ6IGZhbHNlLFxuICAgIHBpY2t1cDogZmFsc2UsXG4gICAgYWJpbGl0eTE6IGZhbHNlLFxuICAgIGFiaWxpdHkyOiBmYWxzZSxcbiAgICBhYmlsaXR5MzogZmFsc2UsXG4gICAgYWJpbGl0eTQ6IGZhbHNlLFxuICAgIHRhcmdldFg6IG1vdXNlUG9zLngsXG4gICAgdGFyZ2V0WTogbW91c2VQb3MueSxcbn1cblxudmFyIEtFWV9VUCA9IDg3OyAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gV1xudmFyIEtFWV9ET1dOID0gODM7ICAgICAgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gU1xudmFyIEtFWV9SSUdIVCA9IDY4OyAgICAgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gRFxudmFyIEtFWV9MRUZUID0gNjU7ICAgICAgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gQVxudmFyIEtFWV9DWUNMRV9FUVVJUE1FTlRfRk9SV0FSRCA9IDY5OyAgIC8vIERlZmF1bHQgdG8gRVxudmFyIEtFWV9DWUNMRV9FUVVJUE1FTlRfQkFDS1dBUkQgPSA4MTsgIC8vIERlZmF1bHQgdG8gUVxudmFyIEtFWV9QSUNLVVAgPSA3MDsgICAgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gRlxudmFyIEtFWV9BQklMSVRZXzEgPSA0OTsgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gMVxudmFyIEtFWV9BQklMSVRZXzIgPSA1MDsgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gMlxudmFyIEtFWV9BQklMSVRZXzMgPSA1MTsgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gM1xudmFyIEtFWV9BQklMSVRZXzQgPSA1MjsgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gNFxuXG52YXIgcHJldlRpbWUgPSAwO1xudmFyIGRlbHRhID0gMDtcblxuLy8gQWRkIGxpc3RlbmVycyB0byBkb2N1bWVudFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgS0VZX1VQOlxuICAgICAgICAgICAgcGxheWVySW5wdXQudXAgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0RPV046XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5kb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9SSUdIVDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LnJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9MRUZUOlxuICAgICAgICAgICAgcGxheWVySW5wdXQubGVmdCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfQ1lDTEVfRVFVSVBNRU5UX0ZPUldBUkQ6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5jeWNsZUVxdWlwbWVudEZvcndhcmQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0NZQ0xFX0VRVUlQTUVOVF9CQUNLV0FSRDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmN5Y2xlRXF1aXBtZW50QmFja3dhcmQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX1BJQ0tVUDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LnBpY2t1cCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfQUJJTElUWV8xOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuYWJpbGl0eTEgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0FCSUxJVFlfMjpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmFiaWxpdHkyID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9BQklMSVRZXzM6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5MyA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfQUJJTElUWV80OlxuICAgICAgICAgICAgcGxheWVySW5wdXQuYWJpbGl0eTQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHBsYXllcklucHV0LnRhcmdldFggPSBtb3VzZVBvcy54ICsgcmVuZGVyT2Zmc2V0WDtcbiAgICBwbGF5ZXJJbnB1dC50YXJnZXRZID0gbW91c2VQb3MueSArIHJlbmRlck9mZnNldFk7XG4gICAgc29ja2V0LmVtaXQoXCJwbGF5ZXJJbnB1dFwiLCBwbGF5ZXJJbnB1dCk7XG4gICAgXG4gICAgLy8gVHJpZ2dlciBrZXlzIGFyZSB1bnNldCBhZnRlciBlbWlzc2lvblxuICAgIHBsYXllcklucHV0LnBpY2t1cCA9IGZhbHNlO1xuICAgIHBsYXllcklucHV0LmN5Y2xlRXF1aXBtZW50Rm9yd2FyZCA9IGZhbHNlO1xuICAgIHBsYXllcklucHV0LmN5Y2xlRXF1aXBtZW50QmFja3dhcmQgPSBmYWxzZTtcbiAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5MSA9IGZhbHNlO1xuICAgIHBsYXllcklucHV0LmFiaWxpdHkyID0gZmFsc2U7XG4gICAgcGxheWVySW5wdXQuYWJpbGl0eTMgPSBmYWxzZTtcbiAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5NCA9IGZhbHNlO1xufSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgS0VZX1VQOlxuICAgICAgICAgICAgcGxheWVySW5wdXQudXAgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9ET1dOOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX1JJR0hUOlxuICAgICAgICAgICAgcGxheWVySW5wdXQucmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9MRUZUOlxuICAgICAgICAgICAgcGxheWVySW5wdXQubGVmdCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNvY2tldC5lbWl0KFwicGxheWVySW5wdXRcIiwgcGxheWVySW5wdXQpO1xufSk7XG5cbmZ1bmN0aW9uIG9uTW91c2VNb3ZlKGV2ZW50OiBhbnkpIHtcbiAgICBtb3VzZVBvcyA9IGZvcmVncm91bmQuZ2V0TW91c2VQb3MoZXZlbnQpO1xufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmUsIGZhbHNlKTtcblxuZnVuY3Rpb24gb25Nb3VzZUNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAoIW1vdXNlUG9zLm91dE9mQm91bmRzKSB7XG4gICAgICAgIHNvY2tldC5lbWl0KFwibW91c2VEb3duXCIsIHtcbiAgICAgICAgICAgIHNvdXJjZUlkOiBwbGF5ZXJJZCxcbiAgICAgICAgICAgIHRhcmdldFg6IChtb3VzZVBvcy54ICsgcmVuZGVyT2Zmc2V0WCksXG4gICAgICAgICAgICB0YXJnZXRZOiAobW91c2VQb3MueSArIHJlbmRlck9mZnNldFkpLFxuICAgICAgICAgICAgcGxheWVySW5wdXQ6IHBsYXllcklucHV0LFxuICAgICAgICB9KTtcbiAgICB9XG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uTW91c2VDbGljaywgZmFsc2UpO1xuXG4vLyBJbml0IGNhbnZhc1xudmFyIGJhY2tncm91bmQgID0gbmV3IFBvcG92YSgpO1xudmFyIGVudiAgICAgICAgID0gbmV3IFBvcG92YSgpO1xudmFyIGZvcmVncm91bmQgID0gbmV3IFBvcG92YSgpO1xudmFyIGNvdmVyICAgICAgID0gbmV3IFBvcG92YSgpO1xudmFyIHVpICAgICAgICAgID0gbmV3IFBvcG92YSgpO1xuXG5iYWNrZ3JvdW5kLmluaXQoXCJiYWNrZ3JvdW5kXCIpO1xuZW52LmluaXQoXCJlbnZcIik7XG5mb3JlZ3JvdW5kLmluaXQoXCJmb3JlZ3JvdW5kXCIpO1xuY292ZXIuaW5pdChcImNvdmVyXCIpO1xudWkuaW5pdChcInVpXCIpO1xuXG4vLyBUZWxsIHRoZSBzZXJ2ZXIgYSBuZXcgcGxheWVyIGhhcyBqb2luZWQgYW5kIGhhbmRzaGFrZVxuc29ja2V0LmVtaXQoXCJuZXctcGxheWVyXCIpO1xuc29ja2V0Lm9uKFwiaGFuZHNoYWtlXCIsIChpbmZvOiBhbnkpID0+IHtcbiAgICBwbGF5ZXJJZCA9IGluZm8uaWQ7XG4gICAgY3ViZVNpemUgPSBpbmZvLmN1YmVTaXplO1xuICAgIGJhY2tncm91bmQuc2V0Q3ViZVNpemUoY3ViZVNpemUpO1xuICAgIGVudi5zZXRDdWJlU2l6ZShjdWJlU2l6ZSk7XG4gICAgZm9yZWdyb3VuZC5zZXRDdWJlU2l6ZShjdWJlU2l6ZSk7XG4gICAgY292ZXIuc2V0Q3ViZVNpemUoY3ViZVNpemUpO1xuICAgIHVpLnNldEN1YmVTaXplKGN1YmVTaXplKTtcbiAgICBjYW52YXNTaXplID0gZm9yZWdyb3VuZC5zaXplKCk7XG5cbiAgICBwcmV2VGltZSA9IERhdGUubm93KCk7XG4gICAgcmVuZGVyT2Zmc2V0WCA9IDA7XG4gICAgcmVuZGVyT2Zmc2V0WSA9IDA7XG59KTtcblxuLy8gSW50ZXJwcmV0IHN0YXRlIGFuZCBkcmF3IG9iamVjdHNcbnNvY2tldC5vbihcInN0YXRlXCIsIChvYmplY3RzOiBhbnkpID0+IHtcbiAgICB2YXIgcGxheWVyID0gdW5kZWZpbmVkO1xuICAgIGlmIChwbGF5ZXJJZCAmJiBvYmplY3RzW3BsYXllcklkXSkge1xuICAgICAgICBwbGF5ZXIgPSBvYmplY3RzW3BsYXllcklkXTtcbiAgICB9XG5cbiAgICBpZiAoIWNhbnZhc1NpemUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvcmVncm91bmQud2lwZUNhbnZhcygpO1xuICAgIGVudi53aXBlQ2FudmFzKCk7XG4gICAgY292ZXIud2lwZUNhbnZhcygpO1xuICAgIHVpLndpcGVDYW52YXMoKTtcblxuICAgIGNvbnN0IHRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGRlbHRhID0gdGltZSAtIHByZXZUaW1lO1xuICAgIHByZXZUaW1lID0gdGltZTtcblxuICAgIC8vIENhbWVyYSBzbW9vdGhpbmcgYW5kIHJlbmRlciBvZmZzZXQgY2FsY3VsYXRpb25zXG4gICAgY2FtZXJhTW92aW5nVG9YID0gKCEhcGxheWVyKVxuICAgICAgICA/IHBsYXllci54ICsgKG1vdXNlUG9zLnggLSAoY2FudmFzU2l6ZS53aWR0aCAvIDIpKSAqIHBsYXllci52aWV3UmFuZ2UgLSBjYW52YXNTaXplLndpZHRoIC8gMlxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICBjYW1lcmFNb3ZpbmdUb1kgPSAoISFwbGF5ZXIpXG4gICAgICAgID8gcGxheWVyLnkgKyAobW91c2VQb3MueSAtIChjYW52YXNTaXplLmhlaWdodCAvIDIpKSAqIHBsYXllci52aWV3UmFuZ2UgLSBjYW52YXNTaXplLmhlaWdodCAvIDJcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICByZW5kZXJPZmZzZXRYICs9ICghIWNhbWVyYU1vdmluZ1RvWClcbiAgICAgICAgPyAoY2FtZXJhTW92aW5nVG9YIC0gcmVuZGVyT2Zmc2V0WCkgKiBjYW1lcmFQYW5TcGVlZCAqIGRlbHRhXG4gICAgICAgIDogMDtcbiAgICByZW5kZXJPZmZzZXRZICs9ICghIWNhbWVyYU1vdmluZ1RvWSlcbiAgICAgICAgPyAoY2FtZXJhTW92aW5nVG9ZIC0gcmVuZGVyT2Zmc2V0WSkgKiBjYW1lcmFQYW5TcGVlZCAqIGRlbHRhXG4gICAgICAgIDogMDtcblxuICAgIC8vIFRPRE86IERyYXcgYmFja2dyb3VuZCBtYXAgKGluc3RlYWQgb2Yvd2l0aCBncmlkKVxuICAgIGlmICghIW9iamVjdHMpIHtcbiAgICAgICAgYmFja2dyb3VuZC53aXBlQ2FudmFzKCk7XG4gICAgICAgIGJhY2tncm91bmQuZHJhd0dyaWQoZ3JpZFNpemUsIC1yZW5kZXJPZmZzZXRYLCAtcmVuZGVyT2Zmc2V0WSk7XG4gICAgfVxuXG4gICAgaWYgKGRlYnVnKSB7XG4gICAgICAgIHVpLmRyYXdUZXh0KGRlbHRhLnRvU3RyaW5nKCkgKyBcIm1zXCIsIGNhbnZhc1NpemUud2lkdGggLSA0OCwgMTYpO1xuICAgIH1cblxuICAgIC8vIERyYXcgY3VycmVudCBlcXVpcG1lbnQgdWkgaWNvblxuICAgIGlmIChwbGF5ZXIgJiYgcGxheWVyLmN1cnJlbnRFcXVpcG1lbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN3aXRjaCAocGxheWVyLmVxdWlwbWVudFtwbGF5ZXIuY3VycmVudEVxdWlwbWVudF0udHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CTEFTVEVSOlxuICAgICAgICAgICAgICAgIHVpLmRyYXcobG91dnJlLmJsYXN0ZXJVSU1hc3RlclBpZWNlKGVxdWlwbWVudEljb25Qb3NYLCBlcXVpcG1lbnRJY29uUG9zWSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5TQ0FOTkVSOlxuICAgICAgICAgICAgICAgIHVpLmRyYXcobG91dnJlLnNjYW5uZXJVSU1hc3RlclBpZWNlKGVxdWlwbWVudEljb25Qb3NYLCBlcXVpcG1lbnRJY29uUG9zWSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CVUlMREVSOlxuICAgICAgICAgICAgICAgIHVpLmRyYXcobG91dnJlLmJ1aWxkZXJVSU1hc3RlclBpZWNlKGVxdWlwbWVudEljb25Qb3NYLCBlcXVpcG1lbnRJY29uUG9zWSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CSU5PQ1VMQVJTOlxuICAgICAgICAgICAgICAgIHVpLmRyYXcobG91dnJlLmJpbm9jdWxhcnNVSU1hc3RlclBpZWNlKGVxdWlwbWVudEljb25Qb3NYLCBlcXVpcG1lbnRJY29uUG9zWSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGlkIGluIG9iamVjdHMpIHtcbiAgICAgICAgdmFyIG9iamVjdCA9IG9iamVjdHNbaWRdO1xuXG4gICAgICAgIHN3aXRjaCAob2JqZWN0LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuUExBWUVSOlxuICAgICAgICAgICAgICAgIHN3aXRjaCAob2JqZWN0LnN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5QbGF5ZXIuSFVNQU46XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kLmRyYXcobG91dnJlLnBsYXllck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUGxheWVyLkdPRDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVncm91bmQuZHJhdyhsb3V2cmUuZ29kUGxheWVyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5QbGF5ZXIuRklSRV9NQUdFOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWdyb3VuZC5kcmF3KGxvdXZyZS5maXJlbWFnZVBsYXllck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvcmVncm91bmQuZHJhdyhsb3V2cmUuaGVhbHRoQmFyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZLCBjdWJlU2l6ZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QUk9KRUNUSUxFOlxuICAgICAgICAgICAgICAgIHN3aXRjaCAob2JqZWN0LnN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Qcm9qZWN0aWxlLkJBU0lDX1BST0pFQ1RJTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhsb3V2cmUucHJvamVjdGlsZU1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUHJvamVjdGlsZS5GSVJFQk9MVF9QUk9KRUNUSUxFOlxuICAgICAgICAgICAgICAgICAgICAgICAgZW52LmRyYXcobG91dnJlLmZpcmVib2x0UHJvamVjdGlsZU1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5HUkFWRVNUT05FOlxuICAgICAgICAgICAgICAgIGVudi5kcmF3KGxvdXZyZS5ncmF2ZVN0b25lTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgZW52LmRyYXcobG91dnJlLmhlYWx0aEJhck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSwgY3ViZVNpemUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTjpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVGVycmFpbi5UUkVFOlxuICAgICAgICAgICAgICAgICAgICAgICAgZW52LmRyYXcobG91dnJlLnRyZWVUcnVua01hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY292ZXIuZHJhdyhsb3V2cmUudHJlZUxlYWZNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRlcnJhaW4uV0FMTF9IT1JJWjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KGxvdXZyZS53YWxsSG9yaXpCYXNlTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3Zlci5kcmF3KGxvdXZyZS53YWxsSG9yaXpDb3Zlck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5JTlRFUkFDVEFCTEU6XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvYmplY3Quc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkludGVyYWN0YWJsZS5IRUFMVEhfUElDS1VQOlxuICAgICAgICAgICAgICAgICAgICAgICAgZW52LmRyYXcobG91dnJlLmhlYWx0aFBpY2t1cE1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5UUklHR0VSOlxuICAgICAgICAgICAgICAgIHN3aXRjaCAob2JqZWN0LnN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5UcmlnZ2VyLlNQSUtFX1RSQVA6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhsb3V2cmUuc3Bpa2VUcmFwTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEU6XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvYmplY3Quc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlZlaGljbGUuQ0FSOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWdyb3VuZC5kcmF3KGxvdXZyZS5jYXJNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZW52LmRyYXcobG91dnJlLmRlZmF1bHRUZXJyYWluTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=