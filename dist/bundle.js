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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vT2JqZWN0VHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xvdXZyZS9Mb3V2cmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BvcG92YS9Qb3BvdmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuRUEsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNiLFdBQVcsRUFBRTtRQUNULE1BQU0sRUFBRSxRQUFRO1FBQ2hCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFlBQVksRUFBRSxjQUFjO1FBQzVCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxTQUFTO0tBQ3JCO0lBQ0QsTUFBTSxFQUFFO1FBQ0osS0FBSyxFQUFFLE9BQU87UUFDZCxHQUFHLEVBQUUsS0FBSztRQUNWLFNBQVMsRUFBRSxXQUFXO1FBQ3RCLE1BQU0sRUFBRSxRQUFRO0tBQ25CO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsZ0JBQWdCLEVBQUUsa0JBQWtC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QUUsYUFBYSxDQUFDLENBQUMsQ0FBQzt3QkFDL0UsTUFBTTtpQkFDYjtnQkFDRCxNQUFNO1lBQ1YsS0FBSyx3REFBaUIsQ0FBQyxPQUFPO2dCQUMxQixRQUFRLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQ3BCLEtBQUssb0RBQWEsQ0FBQyxVQUFVO3dCQUN6QixHQUFHLENBQUMsSUFBSSxDQUFDLG1FQUEyQixDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQzt3QkFDNUUsTUFBTTtpQkFDYjtnQkFDRCxNQUFNO1lBQ1YsS0FBSyx3REFBaUIsQ0FBQyxPQUFPO2dCQUMxQixRQUFRLE1BQU0sQ0FBQyxPQUFPLEVBQUU7b0JBQ3BCLEtBQUssb0RBQWEsQ0FBQyxHQUFHO3dCQUNsQixVQUFVLENBQUMsSUFBSSxDQUFDLDZEQUFxQixDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQzt3QkFDN0UsTUFBTTtpQkFDYjtnQkFDRCxNQUFNO1lBQ1Y7Z0JBQ0ksR0FBRyxDQUFDLElBQUksQ0FBQyx3RUFBZ0MsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pGLE1BQU07U0FDYjtLQUNKO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgT2JqZWN0VHlwZXM6IHtcbiAgICAgICAgUExBWUVSOiBcInBsYXllclwiLFxuICAgICAgICBHUkFWRVNUT05FOiBcImdyYXZlc3RvbmVcIixcbiAgICAgICAgUFJPSkVDVElMRTogXCJwcm9qZWN0aWxlXCIsXG4gICAgICAgIFRFUlJBSU46IFwidGVycmFpblwiLFxuICAgICAgICBJTlRFUkFDVEFCTEU6IFwiaW50ZXJhY3RhYmxlXCIsXG4gICAgICAgIFRSSUdHRVI6IFwidHJpZ2dlclwiLFxuICAgICAgICBWRUhJQ0xFOiBcInZlaGljbGVcIixcbiAgICB9LFxuICAgIFBsYXllcjoge1xuICAgICAgICBIVU1BTjogXCJodW1hblwiLFxuICAgICAgICBHT0Q6IFwiZ29kXCIsXG4gICAgICAgIEZJUkVfTUFHRTogXCJmaXJlLW1hZ2VcIixcbiAgICAgICAgS05JR0hUOiBcImtuaWdodFwiLFxuICAgIH0sXG4gICAgUHJvamVjdGlsZToge1xuICAgICAgICBCQVNJQ19QUk9KRUNUSUxFOiBcImJhc2ljLXByb2plY3RpbGVcIixcbiAgICAgICAgRklSRUJPTFRfUFJPSkVDVElMRTogXCJmaXJlYm9sZC1wcm9qZWN0aWxlXCIsXG4gICAgfSxcbiAgICBUZXJyYWluOiB7XG4gICAgICAgIFRSRUU6IFwidHJlZVwiLFxuICAgICAgICBXQUxMX0hPUklaOiBcIndhbGwtaG9yaXpcIixcbiAgICB9LFxuICAgIEludGVyYWN0YWJsZToge1xuICAgICAgICBIRUFMVEhfUElDS1VQOiBcImhlYWx0aC1waWNrdXBcIixcbiAgICAgICAgQ0FSX0VOVEVSOiBcImNhci1lbnRlclwiLFxuICAgIH0sXG4gICAgVHJpZ2dlcjoge1xuICAgICAgICBTUElLRV9UUkFQOiBcInNwaWtlLXRyYXBcIixcbiAgICB9LFxuICAgIFZlaGljbGU6IHtcbiAgICAgICAgQ0FSOiBcImNhclwiLFxuICAgIH0sXG4gICAgRXF1aXBtZW50VHlwZXM6IHtcbiAgICAgICAgQkxBU1RFUjogXCJibGFzdGVyXCIsXG4gICAgICAgIFNDQU5ORVI6IFwic2Nhbm5lclwiLFxuICAgICAgICBCVUlMREVSOiBcImJ1aWxkZXJcIixcbiAgICAgICAgQklOT0NVTEFSUzogXCJiaW5vY3VsYXJzXCIsXG4gICAgfSxcbiAgICBBYmlsaXRpZXM6IHtcbiAgICAgICAgRklSRUJPTFQ6IFwiZmlyZWJvbHRcIixcbiAgICB9LFxufSIsImltcG9ydCB7IG1hc3RlclBpZWNlLCAgfSBmcm9tIFwiLi4vUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIHBsYXllciBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHBsYXllciBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNhYmFiOWFcIiwgXCIjNzc1MDUwXCIsIFwiI0FBQUFBQVwiLCBcIiMwMDAwODBcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDIsXG4gICAgICAgICAgICB3aWR0aDogNCxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogM1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAzLFxuICAgICAgICAgICAgY2VsbFk6IDMsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH1dLFxuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBnb2QgcGxheWVyIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgZ29kIHBsYXllciBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ29kUGxheWVyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNGRjE0OTM4OFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMixcbiAgICAgICAgICAgIHdpZHRoOiA0LFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdLFxuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBmaXJlbWFnZSBwbGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBmaXJlbWFnZSBwbGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpcmVtYWdlUGxheWVyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7ICAgIC8vIFNraW4sICAgICAgUGFudHMsICAgICBTaGlydCAgICAgIC8vIEZhY2VcbiAgICAgICAgcGFsZXR0ZTogW1wiI0QyQjQ4Q1wiLCBcIiNBNTJBMkFcIiwgXCIjREMxNDNDXCIsIFwiI2RiYzNhM1wiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMixcbiAgICAgICAgICAgIHdpZHRoOiA0LFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgIGhlaWdodDogNCxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDNcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAyLFxuICAgICAgICAgICAgY2VsbFk6IDQsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDAuNSxcbiAgICAgICAgICAgIGhlaWdodDogNixcbiAgICAgICAgICAgIHN3YXRjaDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMi41LFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMC41LFxuICAgICAgICAgICAgaGVpZ2h0OiA2LFxuICAgICAgICAgICAgc3dhdGNoOiAyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgIGhlaWdodDogMC41LFxuICAgICAgICAgICAgc3dhdGNoOiAyXG4gICAgICAgIH0sXSxcbiAgICB9XG59XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3Igb2JqZWN0J3MgaGVhbHRoIGJhclxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0IHRoYXQgbmVlZHMgYSBoZWFsdGggYmFyXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyIG9iamVjdHNcbiAqIEBwYXJhbSBjdWJlU2l6ZSBUaGUgY3ViZSByZW5kZXIgc2l6ZSwgcmVxdWlyZWQgd2hlbiBkcmF3aW5nIGZyZWUgaGFuZFxuICovXG5leHBvcnQgZnVuY3Rpb24gaGVhbHRoQmFyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyLCBjdWJlU2l6ZTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiMwMGE0MDBcIiwgXCIjRkYwMDAwXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSAtIChvYmplY3QuaGVpZ2h0ICsgMikgKiBjdWJlU2l6ZSAvIDIsXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggKiBjdWJlU2l6ZSxcbiAgICAgICAgaGVpZ2h0OiAxICogY3ViZVNpemUsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LmhlYWx0aCAvIG9iamVjdC5tYXhIZWFsdGggKiBvYmplY3Qud2lkdGggKiBjdWJlU2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogY3ViZVNpemUgKiAzIC8gNCxcbiAgICAgICAgICAgIHN3YXRjaDogKG9iamVjdC5oZWFsdGggPiBvYmplY3QubWF4SGVhbHRoIC8gMykgPyAwIDogMSxcbiAgICAgICAgfSxdLFxuICAgIGZyZWVIYW5kOiB0cnVlfTtcbn1cblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciB0cmVlIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgdHJlZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gdHJlZVRydW5rTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiM5OTMzMDBcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sXSxcbiAgICB9O1xufVxuXG4vLyBUT0RPOiBDaGFuZ2UgbGVhZiByZW5kZXJpbmcgZGVwZW5kaW5nIG9uIHRyZWUgaGVhbHRoXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIHRyZWUgb2JqZWN0J3MgbGVhdmVzXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSB0cmVlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlciBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmVlTGVhZk1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjMjI4ODIyXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogLTIsXG4gICAgICAgICAgICBjZWxsWTogLTQsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoICogMixcbiAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAtMTAsXG4gICAgICAgICAgICB3aWR0aDogNCxcbiAgICAgICAgICAgIGhlaWdodDogNyxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LF0sXG4gICAgfTtcbn1cblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBncmF2ZXN0b25lIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgZ3JhdmVzdG9uZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ3JhdmVTdG9uZU1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjODg4ODg4XCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMCxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwLFxuICAgICAgICB9XVxuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBiYXNpYyBwcm9qZWN0aWxlXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBwcm9qZWN0aWxlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb2plY3RpbGVNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgLy8gUmVtb3ZlIGNvbW1lbnRzIGZvciByYWluYm93IGJ1bGxldHNcbiAgICAgICAgLy8gcGFsZXR0ZTogW1wiI0ZGNjY2NlwiLCBcIiM2NkZGNjZcIiwgXCIjNjY2NkZGXCIsIFwiI0ZGRkY2NlwiLCBcIiNGRjY2RkZcIiwgXCIjNjZGRkZGXCJdLFxuICAgICAgICBwYWxldHRlOiBbXCIjMjIyMjIyXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgICAgIC8vIHN3YXRjaDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNilcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9XVxuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBmaXJlYm9sdCBwcm9qZWN0aWxlXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBmaXJlYm9sdCBwcm9qZWN0aWxlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpcmVib2x0UHJvamVjdGlsZU1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjQ0Q1QzVDXCIsIFwiI0ZGOEMwMFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLjUsXG4gICAgICAgICAgICBjZWxsWTogMC41LFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sXVxuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBkZWZhdWx0IHRlcnJhaW4gb2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSB0ZXJyYWluIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0VGVycmFpbk1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6bWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNGRkIzRkZcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH1dXG4gICAgfVxufVxuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGhvcml6b250YWwgd2FsbCBvYmplY3QgYmFzZVxuICogQHBhcmFtIG9iamVjdCBUaGUgaG9yaXpvbnRhbCB3YWxsIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3YWxsSG9yaXpCYXNlTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiM4ODg4ODhcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LmhpdGJveFdpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oaXRib3hIZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LmhpdGJveFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGl0Ym94SGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH1dXG4gICAgfVxufVxuXG4vLyBUT0RPOiBBZGQgbW9yZSBkZXRhaWwgdG8gd2FsbCAoY29iYmxlc3RvbmUgc3R5bGUpLCBjaGFuZ2UgY29sb3JpbmcgZGVwZW5kaW5nIG9uIG9iamVjdCBoZWFsdGhcbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgaG9yaXpvbnRhbCB3YWxsIG9iamVjdCBjb3ZlclxuICogQHBhcmFtIG9iamVjdCBUaGUgaG9yaXpvbnRhbCB3YWxsIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3YWxsSG9yaXpDb3Zlck1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjQTNBM0MyQkJcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IC1vYmplY3QuaGVpZ2h0IC8gMixcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfV1cbiAgICB9XG59XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgaGVhbHRoIHBpY2t1cCBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGhlYWx0aCBwaWNrdXAgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhlYWx0aFBpY2t1cE1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjRkZGRkZGXCIsIFwiI0ZGMDAwMFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH1dXG4gICAgfVxufVxuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIHNwaWtlIHRyYXAgb2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBzcGlrZSB0cmFwIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGlrZVRyYXBNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzgwODA4MFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAzLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiA0LFxuICAgICAgICAgICAgY2VsbFk6IDMsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LF1cbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHZhciBoaWdobGlnaHRSOiBudW1iZXIgPSBwYXJzZUludChcIjB4XCIgKyBvYmplY3QuY2FyQ29sb3Iuc3Vic3RyaW5nKDEsIDMpLCAxNikgKyAweDMzO1xuICAgIHZhciBoaWdobGlnaHRHOiBudW1iZXIgPSBwYXJzZUludChcIjB4XCIgKyBvYmplY3QuY2FyQ29sb3Iuc3Vic3RyaW5nKDMsIDUpLCAxNikgKyAweDMzO1xuICAgIHZhciBoaWdobGlnaHRCOiBudW1iZXIgPSBwYXJzZUludChcIjB4XCIgKyBvYmplY3QuY2FyQ29sb3Iuc3Vic3RyaW5nKDUsIDcpLCAxNikgKyAweDMzO1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiMzMzMzMzNcIl1cbiAgICAgICAgICAgIC5jb25jYXQob2JqZWN0LmNhckNvbG9yKVxuICAgICAgICAgICAgLmNvbmNhdChcIiNcIiArXG4gICAgICAgICAgICAgICAgKGhpZ2hsaWdodFIgPiAweEZGID8gMHhGRiA6IGhpZ2hsaWdodFIpLnRvU3RyaW5nKDE2KSArXG4gICAgICAgICAgICAgICAgKGhpZ2hsaWdodEcgPiAweEZGID8gMHhGRiA6IGhpZ2hsaWdodEcpLnRvU3RyaW5nKDE2KSArXG4gICAgICAgICAgICAgICAgKGhpZ2hsaWdodEIgPiAweEZGID8gMHhGRiA6IGhpZ2hsaWdodEIpLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IDUsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggLSAyLFxuICAgICAgICAgICAgaGVpZ2h0OiA1LFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDQsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoIC0gMixcbiAgICAgICAgICAgIGhlaWdodDogNixcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiA5LFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogNixcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiA5LFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDcsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggLSAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAyLFxuICAgICAgICAgICAgY2VsbFk6IDIsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoIC0gNCxcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAxMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggLSAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAyLFxuICAgICAgICAgICAgY2VsbFk6IDEwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDQsXG4gICAgICAgICAgICBoZWlnaHQ6IDQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDMsXG4gICAgICAgICAgICBjZWxsWTogNixcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggLSA2LFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgc3dhdGNoOiAyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAtMSxcbiAgICAgICAgICAgIGNlbGxZOiA2LFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGNlbGxZOiA2LFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSxdXG4gICAgfTtcbn1cblxuXG4vLyAtLS0gVUkgSWNvbnMgLS0tXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGJsYXN0ZXIgdWkgaWNvblxuICogQHBhcmFtIHBvc1ggSG9yaXpvbnRhbCBpY29uIHBvc2l0aW9uXG4gKiBAcGFyYW0gcG9zWSBWZXJ0aWNhbCBpY29uIHBvc2l0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBibGFzdGVyVUlNYXN0ZXJQaWVjZShwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjMDAwMDAwXCJdLFxuICAgICAgICBwb3NYOiBwb3NYLFxuICAgICAgICBwb3NZOiBwb3NZLFxuICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICBmYWNpbmc6IC00NSxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdXG4gICAgfTtcbn1cblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBzY2FubmVyIHVpIGljb25cbiAqIEBwYXJhbSBwb3NYIEhvcml6b250YWwgaWNvbiBwb3NpdGlvblxuICogQHBhcmFtIHBvc1kgVmVydGljYWwgaWNvbiBwb3NpdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gc2Nhbm5lclVJTWFzdGVyUGllY2UocG9zWDogbnVtYmVyLCBwb3NZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI0ZGRkZGRlwiLCBcIiMzMzk5RkZcIl0sXG4gICAgICAgIHBvc1g6IHBvc1gsXG4gICAgICAgIHBvc1k6IHBvc1ksXG4gICAgICAgIHdpZHRoOiAzLFxuICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogLTEsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiA1LFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LF1cbiAgICB9O1xufVxuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGJ1aWxkZXIgdWkgaWNvblxuICogQHBhcmFtIHBvc1ggSG9yaXpvbnRhbCBpY29uIHBvc2l0aW9uXG4gKiBAcGFyYW0gcG9zWSBWZXJ0aWNhbCBpY29uIHBvc2l0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZGVyVUlNYXN0ZXJQaWVjZShwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjMDAwMDAwXCIsIFwiIzkzNTIwMFwiXSxcbiAgICAgICAgcG9zWDogcG9zWCxcbiAgICAgICAgcG9zWTogcG9zWSxcbiAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgZmFjaW5nOiAtNDUsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sXVxuICAgIH07XG59XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgYmlub2N1bGFycyB1aSBpY29uXG4gKiBAcGFyYW0gcG9zWCBIb3Jpem9udGFsIGljb24gcG9zaXRpb25cbiAqIEBwYXJhbSBwb3NZIFZlcnRpY2FsIGljb24gcG9zaXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbm9jdWxhcnNVSU1hc3RlclBpZWNlKHBvc1g6IG51bWJlciwgcG9zWTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiMwMDAwMDBcIiwgXCIjMzMzMzMzXCJdLFxuICAgICAgICBwb3NYOiBwb3NYLFxuICAgICAgICBwb3NZOiBwb3NZLFxuICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICBmYWNpbmc6IC00NSxcbiAgICAgICAgc3Ryb2tlczogWyB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAyLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LF1cbiAgICB9O1xufVxuIiwiZXhwb3J0IGludGVyZmFjZSBtYXN0ZXJQaWVjZSB7XG4gICAgcGFsZXR0ZTogc3RyaW5nW10sXG4gICAgcG9zWDogbnVtYmVyLFxuICAgIHBvc1k6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIGZhY2luZzogbnVtYmVyLFxuICAgIHN0cm9rZXM6IHN0cm9rZVtdLFxuICAgIGZyZWVIYW5kPzogYm9vbGVhbixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBzdHJva2Uge1xuICAgIGNlbGxYOiBudW1iZXIsXG4gICAgY2VsbFk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHN3YXRjaDogbnVtYmVyLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIG1vdXNlUG9zaXRpb24ge1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgb3V0T2ZCb3VuZHM6IGJvb2xlYW4sXG59XG5cbmV4cG9ydCBjbGFzcyBQb3BvdmEge1xuXG4gICAgcHJpdmF0ZSBjYW52YXM6IGFueTtcbiAgICBwcml2YXRlIGN0eDogYW55O1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgY3ViZVNpemU6IG51bWJlciA9IDEyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIFBvcG92YSdzIGNhbnZhc1xuICAgICAqIEBwYXJhbSBjYW52YXNJZCBJZCBvZiBodG1sIGNhbnZhcyBlbGVtZW50XG4gICAgICogQHBhcmFtIGN1YmVTaXplIFJlbmRlciBzaXplIGZvciBlYWNoIGN1YmUgd2hlbiBkcmF3aW5nIHdpdGggY3ViZXNcbiAgICAgKi9cbiAgICBpbml0KGNhbnZhc0lkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSA8YW55PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNJZCk7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbnZhcy5vZmZzZXRXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYSBncmlkIG9uIHRoZSBjYW52YXNcbiAgICAgKiBAcGFyYW0gc3BhY2luZyBOdW1iZXIgb2YgcGl4ZWxzIGJldHdlZW4gZ3JpZCBsaW5lc1xuICAgICovXG4gICAgZHJhd0dyaWQoc3BhY2luZzogbnVtYmVyLCBvZmZzZXRYPzogbnVtYmVyLCBvZmZzZXRZPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIC8vIERyYXcgZ3JpZCBvbiBiYWNrZ3JvdW5kXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCIjZDBkMGQwXCI7XG4gICAgICAgIGZvciAodmFyIHggPSAoISFvZmZzZXRYKSA/IG9mZnNldFggJSBzcGFjaW5nIDogMDsgeCA8PSB0aGlzLndpZHRoOyB4ICs9IHNwYWNpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCAwKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB0aGlzLmhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciB5ID0gKCEhb2Zmc2V0WSkgPyBvZmZzZXRZICUgc3BhY2luZyA6IDA7IHkgPD0gdGhpcy5oZWlnaHQ7IHkgKz0gc3BhY2luZykge1xuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKDAsIHkpO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHRoaXMud2lkdGgsIHkpO1xuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhd3MgYSBtYXN0ZXJwaWVjZSB0byB0aGUgY2FudmFzXG4gICAgICogQHBhcmFtIG1hc3RlclBpZWNlIERlZmluaXRpb24gZm9yIHdoYXQgdG8gZHJhd1xuICAgICAqL1xuICAgIGRyYXcobWFzdGVyUGllY2U6IG1hc3RlclBpZWNlKSB7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcblxuICAgICAgICB0aGlzLnByZXBDYW52YXMoXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS5wb3NYLFxuICAgICAgICAgICAgbWFzdGVyUGllY2UucG9zWSxcbiAgICAgICAgICAgIG1hc3RlclBpZWNlLndpZHRoLFxuICAgICAgICAgICAgbWFzdGVyUGllY2UuaGVpZ2h0LFxuICAgICAgICAgICAgbWFzdGVyUGllY2UuZmFjaW5nLFxuICAgICAgICAgICAgbWFzdGVyUGllY2UuZnJlZUhhbmQpO1xuICAgICAgICBtYXN0ZXJQaWVjZS5zdHJva2VzLmZvckVhY2goKHN0cm9rZTogc3Ryb2tlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclN0cm9rZShzdHJva2UsIG1hc3RlclBpZWNlLnBhbGV0dGUsIG1hc3RlclBpZWNlLmZyZWVIYW5kKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENlbnRlcnMgdGhlIGNhbnZhcyBvbiBwb3NpdGlvbiwgYW5kIHJvdGF0ZXMgdG8gYSBjZXJ0YWluIGZhY2luZ1xuICAgICAqIEBwYXJhbSBwb3NpdGlvblggVGhlIHggcG9zaXRpb24gb2Ygd2hhdCBpcyBiZWluZyBkcmF3blxuICAgICAqIEBwYXJhbSBwb3NpdGlvblkgVGhlIHkgcG9zaXRpb24gb2Ygd2hhdCBpcyBiZWluZyBkcmF3blxuICAgICAqIEBwYXJhbSB3aWR0aCBUaGUgd2lkdGggb2Ygd2hhdCBpcyBiZWluZyBkcmF3blxuICAgICAqIEBwYXJhbSBoZWlnaHQgVGhlIGhlaWdodCBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIGRlZ3JlZXMgRGVncmVlcyB0byByb3RhdGUgdGhlIGNhbnZhcyBieVxuICAgICAqIEBwYXJhbSBmcmVlSGFuZCBJZiB0aGUgc3Ryb2tlIGlzIHJlbmRlcmVkIHdpdGggYmxvY2tzIG9yIGZyZWUgaGFuZFxuICAgICAqL1xuICAgIHByZXBDYW52YXMocG9zaXRpb25YOiBudW1iZXIsIHBvc2l0aW9uWTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgZGVncmVlczogbnVtYmVyLCBmcmVlSGFuZD86IGJvb2xlYW4pe1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHBvc2l0aW9uWCwgcG9zaXRpb25ZKTtcbiAgICAgICAgdGhpcy5jdHgucm90YXRlKGRlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgaWYgKGZyZWVIYW5kKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoLSB3aWR0aCAvIDIsIC0gaGVpZ2h0IC8gMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN0eC50cmFuc2xhdGUoLSB3aWR0aCAqIHRoaXMuY3ViZVNpemUgLyAyLCAtIGhlaWdodCAqIHRoaXMuY3ViZVNpemUgLyAyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgXG4gICAgICogQHBhcmFtIHN0cm9rZSBTdHJva2UgdG8gcmVuZGVyXG4gICAgICogQHBhcmFtIHBhbGV0dGUgQ29udGFpbnMgdGhlIG1hc3RlciBwaWVjZSdzIGNvbG9yIHN3YXRjaGVzXG4gICAgICogQHBhcmFtIGZyZWVIYW5kIElmIHRoZSBzdHJva2UgaXMgcmVuZGVyZWQgd2l0aCBibG9ja3Mgb3IgZnJlZSBoYW5kXG4gICAgICovXG4gICAgcmVuZGVyU3Ryb2tlKHN0cm9rZTogc3Ryb2tlLCBwYWxldHRlOiBzdHJpbmdbXSwgZnJlZUhhbmQ/OiBib29sZWFuKXtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gcGFsZXR0ZVtzdHJva2Uuc3dhdGNoXTtcbiAgICAgICAgaWYgKGZyZWVIYW5kKXtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHN0cm9rZS5jZWxsWCwgc3Ryb2tlLmNlbGxZLFxuICAgICAgICAgICAgICAgIHN0cm9rZS53aWR0aCwgc3Ryb2tlLmhlaWdodCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChzdHJva2UuY2VsbFggKiB0aGlzLmN1YmVTaXplLCBzdHJva2UuY2VsbFkgKiB0aGlzLmN1YmVTaXplLFxuICAgICAgICAgICAgICAgIHN0cm9rZS53aWR0aCAqIHRoaXMuY3ViZVNpemUsIHN0cm9rZS5oZWlnaHQgKiB0aGlzLmN1YmVTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFcmFzZXMgZXZlcnl0aGluZyBvbiB0aGUgY2FudmFzXG4gICAgICovXG4gICAgd2lwZUNhbnZhcygpIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjYW52YXMnIHdpZHRoIGFuZCBoZWlnaHRcbiAgICAgKi9cbiAgICBzaXplKCk6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfSB7XG4gICAgICAgIHJldHVybiB7IHdpZHRoOiB0aGlzLndpZHRoLCBoZWlnaHQ6IHRoaXMuaGVpZ2h0IH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBQb3BvdmEncyBjdWJlIHJlbmRlciBzaXplXG4gICAgICovXG4gICAgZ2V0Q3ViZVNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3ViZVNpemU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyBQb3BvdmEncyBjdWJlIHJlbmRlciBzaXplXG4gICAgICogQHBhcmFtIHNpemUgVmFsdWUgZm9yIGN1YmUgcmVuZGVyIHNpemVcbiAgICAgKi9cbiAgICBzZXRDdWJlU2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jdWJlU2l6ZSA9IHNpemU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBtb3VzZSBwb3NpdGlvbiBhbmQgaWYgbW91c2UgaXMgaW5zaWRlIGNhbnZhc1xuICAgICAqIEBwYXJhbSBldnQgTW91c2UgbW92ZW1lbnQgZXZlbnQsIGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb25cbiAgICAgKi9cbiAgICBnZXRNb3VzZVBvcyhldnQ6IGFueSk6IG1vdXNlUG9zaXRpb24ge1xuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgcG9zWCA9IGV2dC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICB2YXIgcG9zWSA9IGV2dC5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgICAgIHZhciBvZmZDYW52YXMgPSBmYWxzZTtcblxuICAgICAgICBpZiAocG9zWCA8IDApIHtcbiAgICAgICAgICAgIHBvc1ggPSAwO1xuICAgICAgICAgICAgb2ZmQ2FudmFzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zWSA8IDApIHtcbiAgICAgICAgICAgIHBvc1kgPSAwO1xuICAgICAgICAgICAgb2ZmQ2FudmFzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zWCA+IHRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgIHBvc1ggPSB0aGlzLndpZHRoO1xuICAgICAgICAgICAgb2ZmQ2FudmFzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zWSA+IHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICBwb3NZID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgICAgICBvZmZDYW52YXMgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiBwb3NYLFxuICAgICAgICAgIHk6IHBvc1ksXG4gICAgICAgICAgb3V0T2ZCb3VuZHM6IG9mZkNhbnZhcyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBkcmF3VGV4dCh0ZXh0OiBzdHJpbmcsIHBvc1g6IG51bWJlciwgcG9zWTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjE2cHggQXJpYWxcIlxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0ZXh0LCBwb3NYLCBwb3NZKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCAqIGFzIHNvY2tldElvIGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XG5pbXBvcnQgeyBQb3BvdmEsIG1vdXNlUG9zaXRpb24sIG1hc3RlclBpZWNlIH0gZnJvbSBcIi4vUG9wb3ZhL1BvcG92YVwiO1xuaW1wb3J0ICogYXMgbG91dnJlIGZyb20gXCIuL0xvdXZyZS9Mb3V2cmVcIjtcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi9PYmplY3RUeXBlc1wiO1xuXG4vLyBTb2NrZXQgbGlzdGVuZXJcbnZhciBzb2NrZXQgPSBpbygpO1xudmFyIGRlYnVnID0gdHJ1ZTtcblxudmFyIGN1YmVTaXplOiBudW1iZXI7XG52YXIgZ3JpZFNpemU6IG51bWJlciA9IDQ4O1xudmFyIGNhbnZhc1NpemU6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfTtcbnZhciBlcXVpcG1lbnRJY29uUG9zWDogbnVtYmVyID0gOTc2O1xudmFyIGVxdWlwbWVudEljb25Qb3NZOiBudW1iZXIgPSA3MjY7XG5cbnZhciBwbGF5ZXJJZDogc3RyaW5nO1xuXG52YXIgcmVuZGVyT2Zmc2V0WDogbnVtYmVyO1xudmFyIHJlbmRlck9mZnNldFk6IG51bWJlcjtcbnZhciBjYW1lcmFNb3ZpbmdUb1g6IG51bWJlcjtcbnZhciBjYW1lcmFNb3ZpbmdUb1k6IG51bWJlcjtcbnZhciBjYW1lcmFQYW5TcGVlZCA9IDAuMDE1O1xuXG52YXIgbW91c2VQb3M6IG1vdXNlUG9zaXRpb24gPSB7IHg6IDAsIHk6IDAsIG91dE9mQm91bmRzOiB0cnVlIH07XG5cbnZhciBwbGF5ZXJJbnB1dCA9IHtcbiAgICB1cDogZmFsc2UsXG4gICAgZG93bjogZmFsc2UsXG4gICAgbGVmdDogZmFsc2UsXG4gICAgcmlnaHQ6IGZhbHNlLFxuICAgIGN5Y2xlRXF1aXBtZW50Rm9yd2FyZDogZmFsc2UsXG4gICAgY3ljbGVFcXVpcG1lbnRCYWNrd2FyZDogZmFsc2UsXG4gICAgcGlja3VwOiBmYWxzZSxcbiAgICBhYmlsaXR5MTogZmFsc2UsXG4gICAgYWJpbGl0eTI6IGZhbHNlLFxuICAgIGFiaWxpdHkzOiBmYWxzZSxcbiAgICBhYmlsaXR5NDogZmFsc2UsXG4gICAgdGFyZ2V0WDogbW91c2VQb3MueCxcbiAgICB0YXJnZXRZOiBtb3VzZVBvcy55LFxufVxuXG52YXIgS0VZX1VQID0gODc7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBXXG52YXIgS0VZX0RPV04gPSA4MzsgICAgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBTXG52YXIgS0VZX1JJR0hUID0gNjg7ICAgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBEXG52YXIgS0VZX0xFRlQgPSA2NTsgICAgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBBXG52YXIgS0VZX0NZQ0xFX0VRVUlQTUVOVF9GT1JXQVJEID0gNjk7ICAgLy8gRGVmYXVsdCB0byBFXG52YXIgS0VZX0NZQ0xFX0VRVUlQTUVOVF9CQUNLV0FSRCA9IDgxOyAgLy8gRGVmYXVsdCB0byBRXG52YXIgS0VZX1BJQ0tVUCA9IDcwOyAgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBGXG52YXIgS0VZX0FCSUxJVFlfMSA9IDQ5OyAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byAxXG52YXIgS0VZX0FCSUxJVFlfMiA9IDUwOyAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byAyXG52YXIgS0VZX0FCSUxJVFlfMyA9IDUxOyAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byAzXG52YXIgS0VZX0FCSUxJVFlfNCA9IDUyOyAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byA0XG5cbnZhciBwcmV2VGltZSA9IDA7XG52YXIgZGVsdGEgPSAwO1xuXG4vLyBBZGQgbGlzdGVuZXJzIHRvIGRvY3VtZW50XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBLRVlfVVA6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC51cCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfRE9XTjpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmRvd24gPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX1JJR0hUOlxuICAgICAgICAgICAgcGxheWVySW5wdXQucmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0xFRlQ6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5sZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9DWUNMRV9FUVVJUE1FTlRfRk9SV0FSRDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmN5Y2xlRXF1aXBtZW50Rm9yd2FyZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfQ1lDTEVfRVFVSVBNRU5UX0JBQ0tXQVJEOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuY3ljbGVFcXVpcG1lbnRCYWNrd2FyZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfUElDS1VQOlxuICAgICAgICAgICAgcGxheWVySW5wdXQucGlja3VwID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9BQklMSVRZXzE6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5MSA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfQUJJTElUWV8yOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuYWJpbGl0eTIgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0FCSUxJVFlfMzpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmFiaWxpdHkzID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9BQklMSVRZXzQ6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5NCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGxheWVySW5wdXQudGFyZ2V0WCA9IG1vdXNlUG9zLnggKyByZW5kZXJPZmZzZXRYO1xuICAgIHBsYXllcklucHV0LnRhcmdldFkgPSBtb3VzZVBvcy55ICsgcmVuZGVyT2Zmc2V0WTtcbiAgICBzb2NrZXQuZW1pdChcInBsYXllcklucHV0XCIsIHBsYXllcklucHV0KTtcbiAgICBcbiAgICAvLyBUcmlnZ2VyIGtleXMgYXJlIHVuc2V0IGFmdGVyIGVtaXNzaW9uXG4gICAgcGxheWVySW5wdXQucGlja3VwID0gZmFsc2U7XG4gICAgcGxheWVySW5wdXQuY3ljbGVFcXVpcG1lbnRGb3J3YXJkID0gZmFsc2U7XG4gICAgcGxheWVySW5wdXQuY3ljbGVFcXVpcG1lbnRCYWNrd2FyZCA9IGZhbHNlO1xuICAgIHBsYXllcklucHV0LmFiaWxpdHkxID0gZmFsc2U7XG4gICAgcGxheWVySW5wdXQuYWJpbGl0eTIgPSBmYWxzZTtcbiAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5MyA9IGZhbHNlO1xuICAgIHBsYXllcklucHV0LmFiaWxpdHk0ID0gZmFsc2U7XG59KTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBLRVlfVVA6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC51cCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0RPV046XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5kb3duID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfUklHSFQ6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5yaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0xFRlQ6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5sZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc29ja2V0LmVtaXQoXCJwbGF5ZXJJbnB1dFwiLCBwbGF5ZXJJbnB1dCk7XG59KTtcblxuZnVuY3Rpb24gb25Nb3VzZU1vdmUoZXZlbnQ6IGFueSkge1xuICAgIG1vdXNlUG9zID0gZm9yZWdyb3VuZC5nZXRNb3VzZVBvcyhldmVudCk7XG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSwgZmFsc2UpO1xuXG5mdW5jdGlvbiBvbk1vdXNlQ2xpY2soZXZlbnQ6IGFueSkge1xuICAgIGlmICghbW91c2VQb3Mub3V0T2ZCb3VuZHMpIHtcbiAgICAgICAgc29ja2V0LmVtaXQoXCJtb3VzZURvd25cIiwge1xuICAgICAgICAgICAgc291cmNlSWQ6IHBsYXllcklkLFxuICAgICAgICAgICAgdGFyZ2V0WDogKG1vdXNlUG9zLnggKyByZW5kZXJPZmZzZXRYKSxcbiAgICAgICAgICAgIHRhcmdldFk6IChtb3VzZVBvcy55ICsgcmVuZGVyT2Zmc2V0WSksXG4gICAgICAgICAgICBwbGF5ZXJJbnB1dDogcGxheWVySW5wdXQsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25Nb3VzZUNsaWNrLCBmYWxzZSk7XG5cbi8vIEluaXQgY2FudmFzXG52YXIgYmFja2dyb3VuZCAgPSBuZXcgUG9wb3ZhKCk7XG52YXIgZW52ICAgICAgICAgPSBuZXcgUG9wb3ZhKCk7XG52YXIgZm9yZWdyb3VuZCAgPSBuZXcgUG9wb3ZhKCk7XG52YXIgY292ZXIgICAgICAgPSBuZXcgUG9wb3ZhKCk7XG52YXIgdWkgICAgICAgICAgPSBuZXcgUG9wb3ZhKCk7XG5cbmJhY2tncm91bmQuaW5pdChcImJhY2tncm91bmRcIik7XG5lbnYuaW5pdChcImVudlwiKTtcbmZvcmVncm91bmQuaW5pdChcImZvcmVncm91bmRcIik7XG5jb3Zlci5pbml0KFwiY292ZXJcIik7XG51aS5pbml0KFwidWlcIik7XG5cbi8vIFRlbGwgdGhlIHNlcnZlciBhIG5ldyBwbGF5ZXIgaGFzIGpvaW5lZCBhbmQgaGFuZHNoYWtlXG5zb2NrZXQuZW1pdChcIm5ldy1wbGF5ZXJcIik7XG5zb2NrZXQub24oXCJoYW5kc2hha2VcIiwgKGluZm86IGFueSkgPT4ge1xuICAgIHBsYXllcklkID0gaW5mby5pZDtcbiAgICBjdWJlU2l6ZSA9IGluZm8uY3ViZVNpemU7XG4gICAgYmFja2dyb3VuZC5zZXRDdWJlU2l6ZShjdWJlU2l6ZSk7XG4gICAgZW52LnNldEN1YmVTaXplKGN1YmVTaXplKTtcbiAgICBmb3JlZ3JvdW5kLnNldEN1YmVTaXplKGN1YmVTaXplKTtcbiAgICBjb3Zlci5zZXRDdWJlU2l6ZShjdWJlU2l6ZSk7XG4gICAgdWkuc2V0Q3ViZVNpemUoY3ViZVNpemUpO1xuICAgIGNhbnZhc1NpemUgPSBmb3JlZ3JvdW5kLnNpemUoKTtcblxuICAgIHByZXZUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZW5kZXJPZmZzZXRYID0gMDtcbiAgICByZW5kZXJPZmZzZXRZID0gMDtcbn0pO1xuXG4vLyBJbnRlcnByZXQgc3RhdGUgYW5kIGRyYXcgb2JqZWN0c1xuc29ja2V0Lm9uKFwic3RhdGVcIiwgKG9iamVjdHM6IGFueSkgPT4ge1xuICAgIHZhciBwbGF5ZXIgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHBsYXllcklkICYmIG9iamVjdHNbcGxheWVySWRdKSB7XG4gICAgICAgIHBsYXllciA9IG9iamVjdHNbcGxheWVySWRdO1xuICAgIH1cblxuICAgIGlmICghY2FudmFzU2l6ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yZWdyb3VuZC53aXBlQ2FudmFzKCk7XG4gICAgZW52LndpcGVDYW52YXMoKTtcbiAgICBjb3Zlci53aXBlQ2FudmFzKCk7XG4gICAgdWkud2lwZUNhbnZhcygpO1xuXG4gICAgY29uc3QgdGltZSA9IERhdGUubm93KCk7XG4gICAgZGVsdGEgPSB0aW1lIC0gcHJldlRpbWU7XG4gICAgcHJldlRpbWUgPSB0aW1lO1xuXG4gICAgLy8gQ2FtZXJhIHNtb290aGluZyBhbmQgcmVuZGVyIG9mZnNldCBjYWxjdWxhdGlvbnNcbiAgICBjYW1lcmFNb3ZpbmdUb1ggPSAoISFwbGF5ZXIpXG4gICAgICAgID8gcGxheWVyLnggKyAobW91c2VQb3MueCAtIChjYW52YXNTaXplLndpZHRoIC8gMikpICogcGxheWVyLnZpZXdSYW5nZSAtIGNhbnZhc1NpemUud2lkdGggLyAyXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIGNhbWVyYU1vdmluZ1RvWSA9ICghIXBsYXllcilcbiAgICAgICAgPyBwbGF5ZXIueSArIChtb3VzZVBvcy55IC0gKGNhbnZhc1NpemUuaGVpZ2h0IC8gMikpICogcGxheWVyLnZpZXdSYW5nZSAtIGNhbnZhc1NpemUuaGVpZ2h0IC8gMlxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIHJlbmRlck9mZnNldFggKz0gKCEhY2FtZXJhTW92aW5nVG9YKVxuICAgICAgICA/IChjYW1lcmFNb3ZpbmdUb1ggLSByZW5kZXJPZmZzZXRYKSAqIGNhbWVyYVBhblNwZWVkICogZGVsdGFcbiAgICAgICAgOiAwO1xuICAgIHJlbmRlck9mZnNldFkgKz0gKCEhY2FtZXJhTW92aW5nVG9ZKVxuICAgICAgICA/IChjYW1lcmFNb3ZpbmdUb1kgLSByZW5kZXJPZmZzZXRZKSAqIGNhbWVyYVBhblNwZWVkICogZGVsdGFcbiAgICAgICAgOiAwO1xuXG4gICAgLy8gVE9ETzogRHJhdyBiYWNrZ3JvdW5kIG1hcCAoaW5zdGVhZCBvZi93aXRoIGdyaWQpXG4gICAgaWYgKCEhb2JqZWN0cykge1xuICAgICAgICBiYWNrZ3JvdW5kLndpcGVDYW52YXMoKTtcbiAgICAgICAgYmFja2dyb3VuZC5kcmF3R3JpZChncmlkU2l6ZSwgLXJlbmRlck9mZnNldFgsIC1yZW5kZXJPZmZzZXRZKTtcbiAgICB9XG5cbiAgICBpZiAoZGVidWcpIHtcbiAgICAgICAgdWkuZHJhd1RleHQoZGVsdGEudG9TdHJpbmcoKSArIFwibXNcIiwgY2FudmFzU2l6ZS53aWR0aCAtIDQ4LCAxNik7XG4gICAgfVxuXG4gICAgLy8gRHJhdyBjdXJyZW50IGVxdWlwbWVudCB1aSBpY29uXG4gICAgaWYgKHBsYXllciAmJiBwbGF5ZXIuY3VycmVudEVxdWlwbWVudCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3dpdGNoIChwbGF5ZXIuZXF1aXBtZW50W3BsYXllci5jdXJyZW50RXF1aXBtZW50XS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkVxdWlwbWVudFR5cGVzLkJMQVNURVI6XG4gICAgICAgICAgICAgICAgdWkuZHJhdyhsb3V2cmUuYmxhc3RlclVJTWFzdGVyUGllY2UoZXF1aXBtZW50SWNvblBvc1gsIGVxdWlwbWVudEljb25Qb3NZKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkVxdWlwbWVudFR5cGVzLlNDQU5ORVI6XG4gICAgICAgICAgICAgICAgdWkuZHJhdyhsb3V2cmUuc2Nhbm5lclVJTWFzdGVyUGllY2UoZXF1aXBtZW50SWNvblBvc1gsIGVxdWlwbWVudEljb25Qb3NZKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkVxdWlwbWVudFR5cGVzLkJVSUxERVI6XG4gICAgICAgICAgICAgICAgdWkuZHJhdyhsb3V2cmUuYnVpbGRlclVJTWFzdGVyUGllY2UoZXF1aXBtZW50SWNvblBvc1gsIGVxdWlwbWVudEljb25Qb3NZKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkVxdWlwbWVudFR5cGVzLkJJTk9DVUxBUlM6XG4gICAgICAgICAgICAgICAgdWkuZHJhdyhsb3V2cmUuYmlub2N1bGFyc1VJTWFzdGVyUGllY2UoZXF1aXBtZW50SWNvblBvc1gsIGVxdWlwbWVudEljb25Qb3NZKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaWQgaW4gb2JqZWN0cykge1xuICAgICAgICB2YXIgb2JqZWN0ID0gb2JqZWN0c1tpZF07XG5cbiAgICAgICAgc3dpdGNoIChvYmplY3QudHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVI6XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvYmplY3Quc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlBsYXllci5IVU1BTjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVncm91bmQuZHJhdyhsb3V2cmUucGxheWVyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5QbGF5ZXIuR09EOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWdyb3VuZC5kcmF3KGxvdXZyZS5nb2RQbGF5ZXJNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlBsYXllci5GSVJFX01BR0U6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kLmRyYXcobG91dnJlLmZpcmVtYWdlUGxheWVyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yZWdyb3VuZC5kcmF3KGxvdXZyZS5oZWFsdGhCYXJNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFksIGN1YmVTaXplKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlBST0pFQ1RJTEU6XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvYmplY3Quc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlByb2plY3RpbGUuQkFTSUNfUFJPSkVDVElMRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KGxvdXZyZS5wcm9qZWN0aWxlTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Qcm9qZWN0aWxlLkZJUkVCT0xUX1BST0pFQ1RJTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhsb3V2cmUuZmlyZWJvbHRQcm9qZWN0aWxlTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLkdSQVZFU1RPTkU6XG4gICAgICAgICAgICAgICAgZW52LmRyYXcobG91dnJlLmdyYXZlU3RvbmVNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICBlbnYuZHJhdyhsb3V2cmUuaGVhbHRoQmFyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZLCBjdWJlU2l6ZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5URVJSQUlOOlxuICAgICAgICAgICAgICAgIHN3aXRjaCAob2JqZWN0LnN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5UZXJyYWluLlRSRUU6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhsb3V2cmUudHJlZVRydW5rTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3Zlci5kcmF3KGxvdXZyZS50cmVlTGVhZk1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVGVycmFpbi5XQUxMX0hPUklaOlxuICAgICAgICAgICAgICAgICAgICAgICAgZW52LmRyYXcobG91dnJlLndhbGxIb3JpekJhc2VNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdmVyLmRyYXcobG91dnJlLndhbGxIb3JpekNvdmVyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLklOVEVSQUNUQUJMRTpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuSW50ZXJhY3RhYmxlLkhFQUxUSF9QSUNLVVA6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhsb3V2cmUuaGVhbHRoUGlja3VwTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRSSUdHRVI6XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvYmplY3Quc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRyaWdnZXIuU1BJS0VfVFJBUDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KGxvdXZyZS5zcGlrZVRyYXBNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVkVISUNMRTpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVmVoaWNsZS5DQVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kLmRyYXcobG91dnJlLmNhck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBlbnYuZHJhdyhsb3V2cmUuZGVmYXVsdFRlcnJhaW5NYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==