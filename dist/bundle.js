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

/***/ "./Collisions.js":
/*!***********************!*\
  !*** ./Collisions.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    // Check collisions between all objects
    checkCollisions: function (checkSrc, obs, renderSize, callBack) {
        var src = obs[checkSrc];
        for (id in obs) {
            var check = obs[id];
            if (check) {
                var xIn = valueInRange(src.x - src.hitboxWidth / 2 * renderSize, check.x - check.hitboxWidth / 2 * renderSize, check.x + check.hitboxWidth / 2 * renderSize) ||
                    valueInRange(src.x + src.hitboxWidth / 2 * renderSize, check.x - check.hitboxWidth / 2 * renderSize, check.x + check.hitboxWidth / 2 * renderSize) ||
                    valueInRange(check.x - check.hitboxWidth / 2 * renderSize, src.x - src.hitboxWidth / 2 * renderSize, src.x + src.hitboxWidth / 2 * renderSize) ||
                    valueInRange(check.x + check.hitboxWidth / 2 * renderSize, src.x - src.hitboxWidth / 2 * renderSize, src.x + src.hitboxWidth / 2 * renderSize);
                var yIn = valueInRange(src.y - src.hitboxHeight / 2 * renderSize, check.y - check.hitboxHeight / 2 * renderSize, check.y + check.hitboxHeight / 2 * renderSize) ||
                    valueInRange(src.y + src.hitboxHeight / 2 * renderSize, check.y - check.hitboxHeight / 2 * renderSize, check.y + check.hitboxHeight / 2 * renderSize) ||
                    valueInRange(check.y - check.hitboxHeight / 2 * renderSize, src.y - src.hitboxHeight / 2 * renderSize, src.y + src.hitboxHeight / 2 * renderSize) ||
                    valueInRange(check.y + check.hitboxHeight / 2 * renderSize, src.y - src.hitboxHeight / 2 * renderSize, src.y + src.hitboxHeight / 2 * renderSize);
                if (xIn && yIn)
                    callBack(checkSrc, id);
            }
        }
    },
    // Check collisions between click location and all objects
    checkClickCollisions: function (clickX, clickY, obs, renderSize, callBack) {
        for (id in obs) {
            var check = obs[id];
            if (check) {
                var xIn = valueInRange(clickX, check.x - check.hitboxWidth / 2 * renderSize, check.x + check.hitboxWidth / 2 * renderSize) ||
                    valueInRange(clickX, check.x - check.hitboxWidth / 2 * renderSize, check.x + check.hitboxWidth / 2 * renderSize);
                var yIn = valueInRange(clickY, check.y - check.hitboxHeight / 2 * renderSize, check.y + check.hitboxHeight / 2 * renderSize) ||
                    valueInRange(clickY, check.y - check.hitboxHeight / 2 * renderSize, check.y + check.hitboxHeight / 2 * renderSize);
                if (xIn && yIn)
                    callBack(id);
            }
        }
    },
    pushBack: function (obs, srcId, collisionId, renderSize) {
        // Push object back out of collision terrain towards which ever side is the closest to the terrain object
        var distRight = Math.abs((obs[collisionId].x - obs[collisionId].hitboxWidth * renderSize / 2) - (obs[srcId].x + obs[srcId].hitboxWidth * renderSize / 2));
        var distLeft = Math.abs((obs[collisionId].x + obs[collisionId].hitboxWidth * renderSize / 2) - (obs[srcId].x - obs[srcId].hitboxWidth * renderSize / 2));
        var distUp = Math.abs((obs[collisionId].y + obs[collisionId].hitboxHeight * renderSize / 2) - (obs[srcId].y - obs[srcId].hitboxHeight * renderSize / 2));
        var distDown = Math.abs((obs[collisionId].y - obs[collisionId].hitboxHeight * renderSize / 2) - (obs[srcId].y + obs[srcId].hitboxHeight * renderSize / 2));
        if (distRight < distLeft && distRight < distUp && distRight < distDown) {
            obs[srcId].x = obs[srcId].x - distRight;
        }
        if (distLeft < distRight && distLeft < distUp && distLeft < distDown) {
            obs[srcId].x = obs[srcId].x + distLeft;
        }
        if (distUp < distRight && distUp < distLeft && distUp < distDown) {
            obs[srcId].y = obs[srcId].y + distUp;
        }
        if (distDown < distRight && distDown < distLeft && distDown < distUp) {
            obs[srcId].y = obs[srcId].y - distDown;
        }
    },
};
// Collision detection helper, checks if value is between min and max
function valueInRange(value, min, max) {
    return (value >= min) && (value <= max);
}


/***/ }),

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
        PLAYER_TYPE_CHANGER: "player-type-changer",
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

/***/ "./Prefabs/Abilities/Firebolt.js":
/*!***************************************!*\
  !*** ./Prefabs/Abilities/Firebolt.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fireboltCooldown = 1200;
function generateNew(obs, params) {
    if (params === void 0) { params = {}; }
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return {
        type: types.Abilities.FIREBOLT,
        cooldown: fireboltCooldown,
        lastcast: undefined,
        cast: function (obs, sourceId, abilityIndex, targetX, targetY) {
            var newTime = Date.now();
            if (!obs[sourceId].abilities[abilityIndex].lastcast
                || newTime - obs[sourceId].abilities[abilityIndex].lastcast >= obs[sourceId].abilities[abilityIndex].cooldown) {
                obs[sourceId].abilities[abilityIndex].lastcast = newTime;
                prefabs.generateNew(obs, sourceId, targetX, targetY, types.ObjectTypes.PROJECTILE, types.Projectile.FIREBOLT_PROJECTILE);
            }
        },
    };
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Equipment/Binoculars.js":
/*!*****************************************!*\
  !*** ./Prefabs/Equipment/Binoculars.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var binocularsViewRange = 2;
function generateNew(obs, params) {
    if (params === void 0) { params = {}; }
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    return {
        type: types.EquipmentTypes.BINOCULARS,
        use: function (obs, sourceId, targetX, targetY) { },
        onEquip: function (obs, sourceId) {
            obs[sourceId].prevViewRange = obs[sourceId].viewRange;
            obs[sourceId].viewRange = binocularsViewRange;
        },
        onDequip: function (obs, sourceId) {
            obs[sourceId].viewRange = obs[sourceId].prevViewRange;
            delete obs[sourceId].prevViewRange;
        },
    };
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Equipment/Blaster.js":
/*!**************************************!*\
  !*** ./Prefabs/Equipment/Blaster.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function generateNew(obs, params) {
    if (params === void 0) { params = {}; }
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return {
        type: types.EquipmentTypes.BLASTER,
        use: function (obs, sourceId, targetX, targetY) {
            prefabs.generateNew(obs, sourceId, targetX, targetY, types.ObjectTypes.PROJECTILE, types.Projectile.BASIC_PROJECTILE);
        },
        onEquip: function (obs, sourceId) { },
        onDequip: function (obs, sourceId) { },
    };
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Equipment/Builder.js":
/*!**************************************!*\
  !*** ./Prefabs/Equipment/Builder.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function generateNew(obs, params) {
    if (params === void 0) { params = {}; }
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return {
        type: types.EquipmentTypes.BUILDER,
        use: function (obs, sourceId, targetX, targetY) {
            prefabs.generateNew(obs, sourceId, targetX, targetY, params.type, params.subtype);
        },
        onEquip: function (obs, sourceId) { },
        onDequip: function (obs, sourceId) { },
    };
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Equipment/Scanner.js":
/*!**************************************!*\
  !*** ./Prefabs/Equipment/Scanner.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function generateNew(obs, params) {
    if (params === void 0) { params = {}; }
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var collisions = __webpack_require__(/*! ../../Collisions */ "./Collisions.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return {
        type: types.EquipmentTypes.SCANNER,
        use: function (obs, sourceId, targetX, targetY) {
            // Replaces all builders with this build type...
            collisions.checkClickCollisions(targetX, targetY, obs, prefabs.renderSize, function (collisionId) {
                if (obs[collisionId].subtype != types.Interactable.CAR_ENTER) {
                    obs[sourceId].equipment = obs[sourceId].equipment.map(function (item) {
                        if (item.type == types.EquipmentTypes.BUILDER) {
                            item = prefabs.newEquipment(obs, types.EquipmentTypes.BUILDER, { type: obs[collisionId].type, subtype: obs[collisionId].subtype });
                        }
                        return item;
                    });
                }
            });
        },
        onEquip: function (obs, sourceId) { },
        onDequip: function (obs, sourceId) { },
    };
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Gravestone/_Gravestone.js":
/*!*******************************************!*\
  !*** ./Prefabs/Gravestone/_Gravestone.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var gravestoneWidth = 3;
var gravestoneHeight = 4;
var gravestoneHitboxWidth = gravestoneWidth;
var gravestoneHitboxHeight = gravestoneHeight;
var gravestoneHealth = 40;
var gravestoneViewRange = 1 / 4;
function generateNew(obs, src, posX, posY) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var collisions = __webpack_require__(/*! ../../Collisions */ "./Collisions.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return {
        type: types.ObjectTypes.GRAVESTONE,
        subtype: obs[src].subtype,
        x: posX,
        y: posY + 1 * prefabs.renderSize,
        velocityX: 0,
        velocityY: 0,
        speed: 0,
        width: gravestoneWidth,
        height: gravestoneHeight,
        hitboxWidth: gravestoneHitboxWidth,
        hitboxHeight: gravestoneHitboxHeight,
        health: gravestoneHealth,
        maxHealth: gravestoneHealth,
        currentEquipment: undefined,
        equipment: [],
        viewRange: gravestoneViewRange,
        deathrattle: function (obs, selfRef) {
            prefabs.generateNew(obs, selfRef, 0, 0, types.ObjectTypes.PLAYER);
        },
        update: function (obs, selfId, delta) {
            // Check collisions with vehicles and reposition accordingly
            collisions.checkCollisions(selfId, obs, prefabs.renderSize, function (srcId, collisionId) {
                if (obs[srcId] && collisionId != srcId) {
                    switch (obs[collisionId].type) {
                        case types.ObjectTypes.VEHICLE:
                            // Push object back out of collision vehicle towards which ever side is the closest to the vehicle object
                            collisions.pushBack(obs, srcId, collisionId, prefabs.renderSize);
                            break;
                    }
                }
            });
        },
        mouseDown: function (obs, mouseEvent) { },
        onPlayerInput: function (obs, selfId, playerInput) { },
        damage: function (obs, selfId, amount) {
            obs[selfId].health -= amount;
            if (obs[selfId].health <= 0) {
                obs[selfId].deathrattle(obs, selfId);
            }
        },
    };
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Gravestone/_Gravestone.template.ts":
/*!****************************************************!*\
  !*** ./Prefabs/Gravestone/_Gravestone.template.ts ***!
  \****************************************************/
/*! exports provided: graveStoneMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graveStoneMasterPiece", function() { return graveStoneMasterPiece; });
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


/***/ }),

/***/ "./Prefabs/Interactable/CarEnter.js":
/*!******************************************!*\
  !*** ./Prefabs/Interactable/CarEnter.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var carEnterWidth = 24;
var carEnterHeight = 24;
var carEnterHitboxWidth = 24;
var carEnterHitboxHeight = 24;
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    return __assign({}, base, { subtype: types.Interactable.CAR_ENTER, width: carEnterWidth, height: carEnterHeight, hitboxWidth: carEnterHitboxWidth, hitboxHeight: carEnterHitboxHeight, vehicleId: src, onInteract: function (obs, selfRef, interactId) {
            if (obs[interactId] &&
                obs[interactId].type === types.ObjectTypes.PLAYER &&
                obs[obs[selfRef].vehicleId].rider == undefined) {
                obs[obs[selfRef].vehicleId].rider = obs[interactId];
                obs[interactId] = obs[obs[selfRef].vehicleId];
                delete obs[obs[selfRef].vehicleId];
                obs[selfRef].vehicleId = interactId;
            }
        } });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Interactable/HealthPickup.js":
/*!**********************************************!*\
  !*** ./Prefabs/Interactable/HealthPickup.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var healthPickupWidth = 3;
var healthPickupHeight = 3;
var healthPickupHitboxWidth = 3;
var healthPickupHitboxHeight = 3;
var healthPickupHealing = 40;
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    return __assign({}, base, { subtype: types.Interactable.HEALTH_PICKUP, width: healthPickupWidth, height: healthPickupHeight, hitboxWidth: healthPickupHitboxWidth, hitboxHeight: healthPickupHitboxHeight, onInteract: function (obs, selfRef, interactId) {
            if (obs[interactId].heal) {
                obs[interactId].heal(obs, interactId, healthPickupHealing);
            }
            delete obs[selfRef];
        } });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Interactable/HealthPickup.template.ts":
/*!*******************************************************!*\
  !*** ./Prefabs/Interactable/HealthPickup.template.ts ***!
  \*******************************************************/
/*! exports provided: healthPickupMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "healthPickupMasterPiece", function() { return healthPickupMasterPiece; });
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


/***/ }),

/***/ "./Prefabs/Interactable/PlayerTypeChanger.js":
/*!***************************************************!*\
  !*** ./Prefabs/Interactable/PlayerTypeChanger.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var playerTypeChangerWidth = 5;
var playerTypeChangerHeight = 5;
var playerTypeChangerHitboxWidth = 5;
var playerTypeChangerHitboxHeight = 5;
function generateNew(obs, src, posX, posY, base, params) {
    if (params === void 0) { params = {}; }
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return __assign({}, base, { subtype: types.Interactable.PLAYER_TYPE_CHANGER, width: playerTypeChangerWidth, height: playerTypeChangerHeight, hitboxWidth: playerTypeChangerHitboxWidth, hitboxHeight: playerTypeChangerHitboxHeight, newPlayerType: params.newType, onInteract: function (obs, selfRef, interactId) {
            if (obs[interactId].type === types.ObjectTypes.PLAYER && obs[interactId].subtype !== obs[selfRef].newPlayerType) {
                prefabs.generateNew(obs, interactId, obs[interactId].x, obs[interactId].y, types.ObjectTypes.PLAYER, obs[selfRef].newPlayerType);
            }
        } });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Interactable/PlayerTypeChanger.template.ts":
/*!************************************************************!*\
  !*** ./Prefabs/Interactable/PlayerTypeChanger.template.ts ***!
  \************************************************************/
/*! exports provided: playerTypeChangerMasterPiece, littleManMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerTypeChangerMasterPiece", function() { return playerTypeChangerMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "littleManMasterPiece", function() { return littleManMasterPiece; });
/* harmony import */ var _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
/* harmony import */ var _ObjectTypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ObjectTypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Prefabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
/* harmony import */ var _Prefabs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Prefabs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Player_Player_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Player/_Player.template */ "./Prefabs/Player/_Player.template.ts");
/* harmony import */ var _Player_FireMage_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Player/FireMage.template */ "./Prefabs/Player/FireMage.template.ts");
/* harmony import */ var _Player_God_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Player/God.template */ "./Prefabs/Player/God.template.ts");





/**
 * Get master piece for player type changer object
 * @param object The player type changer object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
function playerTypeChangerMasterPiece(object, renderOffsetX, renderOffsetY) {
    var customRenderSize = 2;
    return {
        palette: ["#888888", "#bbbbbb"],
        posX: object.x - renderOffsetX,
        posY: object.y - renderOffsetY,
        width: object.width,
        height: object.height,
        facing: object.facing,
        strokes: [{
                cellX: 0,
                cellY: 0,
                width: object.width * _Prefabs__WEBPACK_IMPORTED_MODULE_1__["renderSize"] / customRenderSize,
                height: object.height * _Prefabs__WEBPACK_IMPORTED_MODULE_1__["renderSize"] / customRenderSize,
                swatch: 0
            }, {
                cellX: 1,
                cellY: 1,
                width: (object.width - 1) * _Prefabs__WEBPACK_IMPORTED_MODULE_1__["renderSize"] / customRenderSize,
                height: (object.height - 1) * _Prefabs__WEBPACK_IMPORTED_MODULE_1__["renderSize"] / customRenderSize,
                swatch: 1
            },],
        customRenderSize: customRenderSize,
    };
}
/**
 * Get little man for player type changer object
 * @param object The player type changer object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
function littleManMasterPiece(object, renderOffsetX, renderOffsetY) {
    var objCopy = object;
    objCopy.width = 2;
    objCopy.height = 3;
    var playerTypeChangerMasterPiece = _Player_Player_template__WEBPACK_IMPORTED_MODULE_2__["playerMasterPiece"](objCopy, renderOffsetX, renderOffsetY);
    switch (object.newPlayerType) {
        case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Player"].FIRE_MAGE:
            playerTypeChangerMasterPiece = _Player_FireMage_template__WEBPACK_IMPORTED_MODULE_3__["firemagePlayerMasterPiece"](objCopy, renderOffsetX, renderOffsetY);
            break;
        case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Player"].GOD:
            playerTypeChangerMasterPiece = _Player_God_template__WEBPACK_IMPORTED_MODULE_4__["godPlayerMasterPiece"](objCopy, renderOffsetX, renderOffsetY);
            break;
    }
    playerTypeChangerMasterPiece.customRenderSize = 2;
    return playerTypeChangerMasterPiece;
}


/***/ }),

/***/ "./Prefabs/Interactable/_Interactable.js":
/*!***********************************************!*\
  !*** ./Prefabs/Interactable/_Interactable.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function generateNew(obs, src, posX, posY) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    return {
        type: types.ObjectTypes.INTERACTABLE,
        x: posX,
        y: posY,
        update: function (obs, selfId, delta) { },
    };
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Player/FireMage.js":
/*!************************************!*\
  !*** ./Prefabs/Player/FireMage.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var firemageSpeed = 0.18;
var firemageHealth = 64;
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return __assign({}, base, { subtype: types.Player.FIRE_MAGE, maxHealth: firemageHealth, health: firemageHealth, speed: firemageSpeed, abilities: [
            prefabs.newAbility(obs, types.Abilities.FIREBOLT),
        ] });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Player/FireMage.template.ts":
/*!*********************************************!*\
  !*** ./Prefabs/Player/FireMage.template.ts ***!
  \*********************************************/
/*! exports provided: firemagePlayerMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firemagePlayerMasterPiece", function() { return firemagePlayerMasterPiece; });
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


/***/ }),

/***/ "./Prefabs/Player/God.js":
/*!*******************************!*\
  !*** ./Prefabs/Player/God.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var godSpeed = 0.28;
var godHealth = 350;
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return __assign({}, base, { subtype: types.Player.GOD, maxHealth: godHealth, health: godHealth, currentEquipment: 0, equipment: [
            prefabs.newEquipment(obs, types.EquipmentTypes.BLASTER),
            prefabs.newEquipment(obs, types.EquipmentTypes.SCANNER),
            prefabs.newEquipment(obs, types.EquipmentTypes.BUILDER, { type: types.ObjectTypes.TERRAIN, subtype: types.Terrain.TREE }),
            prefabs.newEquipment(obs, types.EquipmentTypes.BINOCULARS),
        ] });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Player/God.template.ts":
/*!****************************************!*\
  !*** ./Prefabs/Player/God.template.ts ***!
  \****************************************/
/*! exports provided: godPlayerMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "godPlayerMasterPiece", function() { return godPlayerMasterPiece; });
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


/***/ }),

/***/ "./Prefabs/Player/HealthBar.template.ts":
/*!**********************************************!*\
  !*** ./Prefabs/Player/HealthBar.template.ts ***!
  \**********************************************/
/*! exports provided: healthBarMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "healthBarMasterPiece", function() { return healthBarMasterPiece; });
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
        width: object.width,
        height: 1,
        facing: 0,
        strokes: [{
                cellX: 0,
                cellY: 0,
                width: object.health / object.maxHealth * object.width * cubeSize,
                height: cubeSize * 3 / 4,
                swatch: (object.health > object.maxHealth / 3) ? 0 : 1,
            },],
        customRenderSize: 1
    };
}


/***/ }),

/***/ "./Prefabs/Player/_Player.js":
/*!***********************************!*\
  !*** ./Prefabs/Player/_Player.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var playerSpeed = 0.2;
var playerHealth = 100;
var playerWidth = 4;
var playerHeight = 6;
var playerViewRange = 1 / 2;
function generateNew(obs, src, posX, posY) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var collisions = __webpack_require__(/*! ../../Collisions */ "./Collisions.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return {
        type: types.ObjectTypes.PLAYER,
        subtype: types.Player.HUMAN,
        x: posX,
        y: posY,
        velocityX: 0,
        velocityY: 0,
        speed: playerSpeed,
        width: playerWidth,
        height: playerHeight,
        hitboxWidth: playerWidth - 2,
        hitboxHeight: playerHeight,
        health: playerHealth,
        maxHealth: playerHealth,
        currentEquipment: undefined,
        equipment: [],
        abilities: [],
        viewRange: playerViewRange,
        deathrattle: function (obs, selfRef) {
            prefabs.generateNew(obs, selfRef, obs[selfRef].x, obs[selfRef].y, types.ObjectTypes.GRAVESTONE);
        },
        update: function (obs, selfId, delta) {
            // Calculate player movement
            obs[selfId].x += obs[selfId].velocityX * delta;
            obs[selfId].y += obs[selfId].velocityY * delta;
            // Check collisions with terrain and reposition accordingly
            collisions.checkCollisions(selfId, obs, prefabs.renderSize, function (srcId, collisionId) {
                if (obs[srcId] && collisionId != srcId) {
                    switch (obs[collisionId].type) { // Should players collide with other players?
                        case types.ObjectTypes.VEHICLE:
                        case types.ObjectTypes.TERRAIN:
                            collisions.pushBack(obs, srcId, collisionId, prefabs.renderSize);
                            break;
                    }
                }
            });
        },
        mouseDown: function (obs, mouseEvent) {
            if (obs[mouseEvent.sourceId].currentEquipment != undefined) {
                obs[mouseEvent.sourceId].equipment[obs[mouseEvent.sourceId].currentEquipment]
                    .use(obs, mouseEvent.sourceId, mouseEvent.targetX, mouseEvent.targetY);
            }
        },
        onPlayerInput: function (obs, selfId, playerInput) {
            player = obs[selfId];
            var xDir = 0;
            var yDir = 0;
            if (playerInput.left) {
                xDir -= 1;
            }
            if (playerInput.right) {
                xDir += 1;
            }
            if (playerInput.up) {
                yDir -= 1;
            }
            if (playerInput.down) {
                yDir += 1;
            }
            player.velocityX = xDir * player.speed;
            player.velocityY = yDir * player.speed;
            if (obs[selfId].currentEquipment != undefined && playerInput.cycleEquipmentForward && !playerInput.cycleEquipmentBackward) {
                player.equipment[player.currentEquipment].onDequip(obs, selfId);
                player.currentEquipment = player.currentEquipment + 1 >= player.equipment.length ? 0 : player.currentEquipment + 1;
                player.equipment[player.currentEquipment].onEquip(obs, selfId);
            }
            if (obs[selfId].currentEquipment != undefined && playerInput.cycleEquipmentBackward && !playerInput.cycleEquipmentForward) {
                player.equipment[player.currentEquipment].onDequip(obs, selfId);
                player.currentEquipment = player.currentEquipment - 1 < 0 ? player.equipment.length - 1 : player.currentEquipment - 1;
                player.equipment[player.currentEquipment].onEquip(obs, selfId);
            }
            if (playerInput.ability1 && obs[selfId].abilities[0]) {
                obs[selfId].abilities[0].cast(obs, selfId, 0, playerInput.targetX, playerInput.targetY);
            }
            if (playerInput.ability2 && obs[selfId].abilities[1]) {
                obs[selfId].abilities[1].cast(obs, selfId, 1, playerInput.targetX, playerInput.targetY);
            }
            if (playerInput.ability3 && obs[selfId].abilities[2]) {
                obs[selfId].abilities[2].cast(obs, selfId, 2, playerInput.targetX, playerInput.targetY);
            }
            if (playerInput.ability4 && obs[selfId].abilities[3]) {
                obs[selfId].abilities[3].cast(obs, selfId, 3, playerInput.targetX, playerInput.targetY);
            }
            if (playerInput.pickup) {
                collisions.checkCollisions(selfId, obs, prefabs.renderSize, function (srcId, collisionId) {
                    if (obs[srcId] && collisionId != srcId && obs[collisionId].type == types.ObjectTypes.INTERACTABLE) {
                        obs[collisionId].onInteract(obs, collisionId, srcId);
                    }
                });
            }
        },
        heal: function (obs, selfId, amount) {
            obs[selfId].health + amount >= obs[selfId].maxHealth
                ? obs[selfId].health = obs[selfId].maxHealth
                : obs[selfId].health += amount;
        },
        damage: function (obs, selfId, amount) {
            obs[selfId].health -= amount;
            if (obs[selfId].health <= 0) {
                obs[selfId].deathrattle(obs, selfId);
            }
        },
    };
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Player/_Player.template.ts":
/*!********************************************!*\
  !*** ./Prefabs/Player/_Player.template.ts ***!
  \********************************************/
/*! exports provided: playerMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "playerMasterPiece", function() { return playerMasterPiece; });
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


/***/ }),

/***/ "./Prefabs/Prefabs.js":
/*!****************************!*\
  !*** ./Prefabs/Prefabs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var types = __webpack_require__(/*! ../ObjectTypes */ "./ObjectTypes.js");
var collisions = __webpack_require__(/*! ../Collisions */ "./Collisions.js");
// ----- Prefabs ----- //
var _player = __webpack_require__(/*! ./Player/_Player */ "./Prefabs/Player/_Player.js");
var god = __webpack_require__(/*! ./Player/God */ "./Prefabs/Player/God.js");
var firemage = __webpack_require__(/*! ./Player/FireMage */ "./Prefabs/Player/FireMage.js");
var _gravestone = __webpack_require__(/*! ./Gravestone/_Gravestone */ "./Prefabs/Gravestone/_Gravestone.js");
var _projectile = __webpack_require__(/*! ./Projectile/_Projectile */ "./Prefabs/Projectile/_Projectile.js");
var fireboltProjectile = __webpack_require__(/*! ./Projectile/FireboltProjectile */ "./Prefabs/Projectile/FireboltProjectile.js");
var _terrain = __webpack_require__(/*! ./Terrain/_Terrain */ "./Prefabs/Terrain/_Terrain.js");
var tree = __webpack_require__(/*! ./Terrain/Tree */ "./Prefabs/Terrain/Tree.js");
var wallHoriz = __webpack_require__(/*! ./Terrain/WallHoriz */ "./Prefabs/Terrain/WallHoriz.js");
var _interactable = __webpack_require__(/*! ./Interactable/_Interactable */ "./Prefabs/Interactable/_Interactable.js");
var healthPickup = __webpack_require__(/*! ./Interactable/HealthPickup */ "./Prefabs/Interactable/HealthPickup.js");
var carEnter = __webpack_require__(/*! ./Interactable/CarEnter */ "./Prefabs/Interactable/CarEnter.js");
var playerTypeChanger = __webpack_require__(/*! ./Interactable/PlayerTypeChanger */ "./Prefabs/Interactable/PlayerTypeChanger.js");
var _trigger = __webpack_require__(/*! ./Trigger/_Trigger */ "./Prefabs/Trigger/_Trigger.js");
var spikeTrap = __webpack_require__(/*! ./Trigger/SpikeTrap */ "./Prefabs/Trigger/SpikeTrap.js");
var _vehicle = __webpack_require__(/*! ./Vehicle/_Vehicle */ "./Prefabs/Vehicle/_Vehicle.js");
var car = __webpack_require__(/*! ./Vehicle/Car */ "./Prefabs/Vehicle/Car.js");
var blaster = __webpack_require__(/*! ./Equipment/Blaster */ "./Prefabs/Equipment/Blaster.js");
var scanner = __webpack_require__(/*! ./Equipment/Scanner */ "./Prefabs/Equipment/Scanner.js");
var builder = __webpack_require__(/*! ./Equipment/Builder */ "./Prefabs/Equipment/Builder.js");
var binoculars = __webpack_require__(/*! ./Equipment/Binoculars */ "./Prefabs/Equipment/Binoculars.js");
var firebolt = __webpack_require__(/*! ./Abilities/Firebolt */ "./Prefabs/Abilities/Firebolt.js");
// Export render size
var renderSize = 4;
module.exports = {
    renderSize: renderSize,
    // Generate a new terrain object
    generateNew: function (obs, src, posX, posY, type, subtype, params) {
        if (params === void 0) { params = {}; }
        var newObj;
        switch (type) {
            case types.ObjectTypes.PLAYER:
                newObj = _player.generateNew(obs, src, posX, posY);
                switch (subtype) {
                    case types.Player.GOD:
                        newObj = god.generateNew(obs, src, posX, posY, newObj);
                        break;
                    case types.Player.FIRE_MAGE:
                        newObj = firemage.generateNew(obs, src, posX, posY, newObj);
                        break;
                }
                obs[src] = newObj;
                return;
            case types.ObjectTypes.GRAVESTONE:
                newObj = _gravestone.generateNew(obs, src, posX, posY);
                obs[src] = newObj;
                return;
            case types.ObjectTypes.PROJECTILE:
                // Generate unique Id for new projectile
                var newId = src.concat(":" + type + ":" + subtype + ":", posX, ":", posY);
                var dup = 0;
                while (obs[newId.concat(":" + dup)]) {
                    dup++;
                }
                newObj = _projectile.generateNew(obs, src, posX, posY);
                switch (subtype) {
                    case types.Projectile.BASIC_PROJECTILE:
                        obs[newId.concat(":" + dup)] = newObj;
                        return;
                    case types.Projectile.FIREBOLT_PROJECTILE:
                        obs[newId.concat(":" + dup)] = fireboltProjectile.generateNew(obs, src, posX, posY, newObj);
                        return;
                }
                break;
            case types.ObjectTypes.TERRAIN:
                newObj = _terrain.generateNew(obs, src, posX, posY);
                switch (subtype) {
                    case types.Terrain.TREE:
                        newObj = tree.generateNew(obs, src, posX, posY, newObj);
                        break;
                    case types.Terrain.WALL_HORIZ:
                        newObj = wallHoriz.generateNew(obs, src, posX, posY, newObj);
                        break;
                }
                break;
            case types.ObjectTypes.INTERACTABLE:
                newObj = _interactable.generateNew(obs, src, posX, posY);
                switch (subtype) {
                    case types.Interactable.HEALTH_PICKUP:
                        newObj = healthPickup.generateNew(obs, src, posX, posY, newObj);
                        break;
                    case types.Interactable.CAR_ENTER:
                        newObj = carEnter.generateNew(obs, src, posX, posY, newObj);
                        obs[src + ":" + type + ":" + subtype] = newObj;
                        return;
                    case types.Interactable.PLAYER_TYPE_CHANGER:
                        newObj = playerTypeChanger.generateNew(obs, src, posX, posY, newObj, params);
                        break;
                }
                break;
            case types.ObjectTypes.TRIGGER:
                newObj = _trigger.generateNew(obs, src, posX, posY);
                switch (subtype) {
                    case types.Trigger.SPIKE_TRAP:
                        newObj = spikeTrap.generateNew(obs, src, posX, posY, newObj);
                        break;
                }
                break;
            case types.ObjectTypes.VEHICLE:
                newObj = _vehicle.generateNew(obs, src, posX, posY);
                switch (subtype) {
                    case types.Vehicle.CAR:
                        newObj = car.generateNew(obs, src, posX, posY, newObj);
                        return;
                }
                break;
            default:
                break;
        }
        // TODO: Consider removing this?
        if (!newObj) {
            newObj = {
                type: types.ObjectTypes.TERRAIN,
                subtype: subtype,
                x: posX,
                y: posY,
                width: 6,
                height: 6,
                hitboxWidth: 6,
                hitboxHeight: 6,
                health: 1,
                maxHealth: 1,
                update: function (obs, selfId, delta) { },
                damage: function (obs, selfId, amount) {
                    obs[selfId].health -= amount;
                    if (obs[selfId].health <= 0) {
                        obs[selfId].deathrattle(obs, selfId);
                    }
                },
                deathrattle: function (obs, selfId) { },
            };
        }
        obs[src + ":" + type + ":" + subtype + ":" + posX + ":" + posY] = newObj;
    },
    newEquipment: function (obs, type, params) {
        if (params === void 0) { params = {}; }
        switch (type) {
            case types.EquipmentTypes.BLASTER:
                return blaster.generateNew(obs, params);
            case types.EquipmentTypes.SCANNER:
                return scanner.generateNew(obs, params);
            case types.EquipmentTypes.BUILDER:
                return builder.generateNew(obs, params);
            case types.EquipmentTypes.BINOCULARS:
                return binoculars.generateNew(obs, params);
        }
    },
    newAbility: function (obs, type, params) {
        if (params === void 0) { params = {}; }
        switch (type) {
            case types.Abilities.FIREBOLT:
                return firebolt.generateNew(obs, params);
        }
    },
};


/***/ }),

/***/ "./Prefabs/Projectile/FireboltProjectile.js":
/*!**************************************************!*\
  !*** ./Prefabs/Projectile/FireboltProjectile.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var fireboltSpeed = 0.35;
var fireboltWidth = 3;
var fireboltHeight = 3;
var fireboltHitBoxRadius = 2;
var fireboltDamage = 34;
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return __assign({}, base, { subtype: types.Projectile.FIREBOLT_PROJECTILE, velocityX: Math.cos(base.angle) * fireboltSpeed, velocityY: Math.sin(base.angle) * fireboltSpeed, width: fireboltWidth, height: fireboltHeight, hitboxWidth: fireboltHitBoxRadius, hitboxHeight: fireboltHitBoxRadius, damage: fireboltDamage });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Projectile/FireboltProjectile.template.ts":
/*!***********************************************************!*\
  !*** ./Prefabs/Projectile/FireboltProjectile.template.ts ***!
  \***********************************************************/
/*! exports provided: fireboltProjectileMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fireboltProjectileMasterPiece", function() { return fireboltProjectileMasterPiece; });
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


/***/ }),

/***/ "./Prefabs/Projectile/_Projectile.js":
/*!*******************************************!*\
  !*** ./Prefabs/Projectile/_Projectile.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var projectileWidth = 2;
var projectileHeight = 0.5;
var projectileHitBoxRadius = 1.5;
var baseProjectileDamage = 10;
var projectileSpeed = 0.8;
var maxProjDist = 1600;
function generateNew(obs, src, posX, posY) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var collisions = __webpack_require__(/*! ../../Collisions */ "./Collisions.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    var angle = Math.atan2(posY - obs[src].y, posX - obs[src].x);
    return {
        type: types.ObjectTypes.PROJECTILE,
        subtype: types.Projectile.BASIC_PROJECTILE,
        source: src,
        x: obs[src].x,
        y: obs[src].y,
        angle: angle,
        velocityX: Math.cos(angle) * projectileSpeed,
        velocityY: Math.sin(angle) * projectileSpeed,
        width: projectileWidth,
        height: projectileHeight,
        hitboxWidth: projectileHitBoxRadius,
        hitboxHeight: projectileHitBoxRadius,
        facing: angle * 180 / Math.PI,
        dist: 0,
        maxProjDist: maxProjDist,
        damage: baseProjectileDamage,
        update: function (obs, selfId, delta) {
            // Calculate projectile movement
            obs[selfId].x += obs[selfId].velocityX * delta;
            obs[selfId].y += obs[selfId].velocityY * delta;
            obs[selfId].dist += Math.sqrt(Math.pow(obs[selfId].velocityX * delta, 2) +
                Math.pow(obs[selfId].velocityY * delta, 2));
            // TODO: Change projectile collisions to ray cast
            collisions.checkCollisions(selfId, obs, prefabs.renderSize, function (srcId, collisionId) {
                if (obs[srcId] && collisionId != srcId && collisionId != obs[srcId].source) {
                    switch (obs[collisionId].type) {
                        case types.ObjectTypes.PLAYER:
                        case types.ObjectTypes.GRAVESTONE:
                        case types.ObjectTypes.VEHICLE:
                        case types.ObjectTypes.TERRAIN:
                            if (obs[srcId]) {
                                if (obs[collisionId] && obs[collisionId].damage) {
                                    obs[collisionId].damage(obs, collisionId, obs[srcId].damage);
                                }
                                delete obs[srcId];
                            }
                            break;
                    }
                }
            });
            if (obs[id]) {
                if (obs[id].dist > obs[id].maxProjDist) {
                    delete obs[id];
                }
            }
        }
    };
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Projectile/_Projectile.template.ts":
/*!****************************************************!*\
  !*** ./Prefabs/Projectile/_Projectile.template.ts ***!
  \****************************************************/
/*! exports provided: projectileMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "projectileMasterPiece", function() { return projectileMasterPiece; });
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


/***/ }),

/***/ "./Prefabs/Terrain/Tree.js":
/*!*********************************!*\
  !*** ./Prefabs/Terrain/Tree.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var treeWidth = 4;
var treeHeight = 8;
var treeHitboxWidth = 4;
var treeHitboxHeight = 8;
var treeHealth = 200;
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    return __assign({}, base, { subtype: types.Terrain.TREE, width: treeWidth, height: treeHeight, hitboxWidth: treeHitboxWidth, hitboxHeight: treeHitboxHeight, health: treeHealth, maxHealth: treeHealth });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Terrain/Tree.template.ts":
/*!******************************************!*\
  !*** ./Prefabs/Terrain/Tree.template.ts ***!
  \******************************************/
/*! exports provided: treeTrunkMasterPiece, treeLeafMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "treeTrunkMasterPiece", function() { return treeTrunkMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "treeLeafMasterPiece", function() { return treeLeafMasterPiece; });
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


/***/ }),

/***/ "./Prefabs/Terrain/WallHoriz.js":
/*!**************************************!*\
  !*** ./Prefabs/Terrain/WallHoriz.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var wallHorizWidth = 20;
var wallHorizHeight = 12;
var wallHorizHitboxWidth = 20;
var wallHorizHitboxHeight = 2;
var wallHorizHealth = 250;
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    return __assign({}, base, { subtype: types.Terrain.WALL_HORIZ, width: wallHorizWidth, height: wallHorizHeight, hitboxWidth: wallHorizHitboxWidth, hitboxHeight: wallHorizHitboxHeight, health: wallHorizHealth, maxHealth: wallHorizHealth });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Terrain/WallHoriz.template.ts":
/*!***********************************************!*\
  !*** ./Prefabs/Terrain/WallHoriz.template.ts ***!
  \***********************************************/
/*! exports provided: wallHorizBaseMasterPiece, wallHorizCoverMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wallHorizBaseMasterPiece", function() { return wallHorizBaseMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wallHorizCoverMasterPiece", function() { return wallHorizCoverMasterPiece; });
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


/***/ }),

/***/ "./Prefabs/Terrain/_Terrain.js":
/*!*************************************!*\
  !*** ./Prefabs/Terrain/_Terrain.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function generateNew(obs, src, posX, posY) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    return {
        type: types.ObjectTypes.TERRAIN,
        x: posX,
        y: posY,
        update: function (obs, selfId, delta) { },
        damage: function (obs, selfId, amount) {
            obs[selfId].health -= amount;
            if (obs[selfId].health <= 0) {
                delete obs[selfId];
            }
        },
    };
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Terrain/_Terrain.template.ts":
/*!**********************************************!*\
  !*** ./Prefabs/Terrain/_Terrain.template.ts ***!
  \**********************************************/
/*! exports provided: defaultTerrainMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultTerrainMasterPiece", function() { return defaultTerrainMasterPiece; });
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


/***/ }),

/***/ "./Prefabs/Trigger/SpikeTrap.js":
/*!**************************************!*\
  !*** ./Prefabs/Trigger/SpikeTrap.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var spikeTrapWidth = 5;
var spikeTrapHeight = 5;
var spikeTrapHitboxWidth = 5;
var spikeTrapHitboxHeight = 5;
var spikeTrapDamage = 20;
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    return __assign({}, base, { subtype: types.Trigger.SPIKE_TRAP, width: spikeTrapWidth, height: spikeTrapHeight, hitboxWidth: spikeTrapHitboxWidth, hitboxHeight: spikeTrapHitboxHeight, onTrigger: function (obs, selfRef, triggerId) {
            if (obs[triggerId] && (obs[triggerId].type == types.ObjectTypes.PLAYER ||
                obs[triggerId].type == types.ObjectTypes.VEHICLE)) {
                if (obs[triggerId].damage) {
                    obs[triggerId].damage(obs, triggerId, spikeTrapDamage);
                }
                delete obs[selfRef];
            }
        } });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Trigger/SpikeTrap.template.ts":
/*!***********************************************!*\
  !*** ./Prefabs/Trigger/SpikeTrap.template.ts ***!
  \***********************************************/
/*! exports provided: spikeTrapMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spikeTrapMasterPiece", function() { return spikeTrapMasterPiece; });
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


/***/ }),

/***/ "./Prefabs/Trigger/_Trigger.js":
/*!*************************************!*\
  !*** ./Prefabs/Trigger/_Trigger.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function generateNew(obs, src, posX, posY) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var collisions = __webpack_require__(/*! ../../Collisions */ "./Collisions.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return {
        type: types.ObjectTypes.TRIGGER,
        x: posX,
        y: posY,
        update: function (obs, selfId, delta) {
            collisions.checkCollisions(selfId, obs, prefabs.renderSize, function (srcId, collisionId) {
                if (obs[srcId] && collisionId != srcId) {
                    obs[srcId].onTrigger(obs, srcId, collisionId);
                }
            });
        },
    };
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Vehicle/Car.js":
/*!********************************!*\
  !*** ./Prefabs/Vehicle/Car.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var carSpeed = 0.35;
var carWidth = 10;
var carHeight = 16;
var carHitboxWidth = 10;
var carHitboxHeight = 16;
var carHealth = 200;
var carViewRange = 1 / 3;
var carColors = [
    "#DC143C",
    "#006400",
    "#FF69B4",
    "#FFD700",
    "#708090",
    "#00BFFF",
    "#0000CD",
    "#FF4500",
    "#8B008B",
];
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    var carColor = Math.floor(Math.random() * (carColors.length));
    var vehicleId = src + ":" + types.ObjectTypes.VEHICLE + ":" + types.Vehicle.CAR + ":" + posX + ":" + posY;
    prefabs.generateNew(obs, vehicleId, posX, posY, types.ObjectTypes.INTERACTABLE, types.Interactable.CAR_ENTER);
    obs[vehicleId] = __assign({}, base, { subtype: types.Vehicle.CAR, speed: carSpeed, width: carWidth, height: carHeight, hitboxWidth: carHitboxWidth, hitboxHeight: carHitboxHeight, health: carHealth, maxHealth: carHealth, carColor: carColors[carColor], viewRange: carViewRange, interactableId: vehicleId + ":" + types.ObjectTypes.INTERACTABLE + ":" + types.Interactable.CAR_ENTER });
    return;
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Vehicle/Car.template.ts":
/*!*****************************************!*\
  !*** ./Prefabs/Vehicle/Car.template.ts ***!
  \*****************************************/
/*! exports provided: carMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "carMasterPiece", function() { return carMasterPiece; });
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


/***/ }),

/***/ "./Prefabs/Vehicle/_Vehicle.js":
/*!*************************************!*\
  !*** ./Prefabs/Vehicle/_Vehicle.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defaultVehicleViewRange = 1 / 4;
function generateNew(obs, src, posX, posY) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var collisions = __webpack_require__(/*! ../../Collisions */ "./Collisions.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return {
        type: types.ObjectTypes.VEHICLE,
        x: posX,
        y: posY,
        velocityX: 0,
        velocityY: 0,
        facing: 0,
        currentEquipment: undefined,
        equipment: [],
        viewRange: defaultVehicleViewRange,
        rider: undefined,
        deathrattle: function (obs, selfId) {
            if (obs[selfId].rider) {
                delete obs[obs[selfId].interactableId];
                var rider = obs[selfId].rider;
                // Reset velocities and position
                rider.velocityX = 0;
                rider.velocityY = 0;
                rider.x = obs[selfId].x;
                rider.y = obs[selfId].y;
                delete obs[selfId];
                obs[selfId] = rider;
            }
            else {
                delete obs[obs[selfId].interactableId];
                delete obs[selfId];
            }
        },
        update: function (obs, selfId, delta) {
            // Calculate car movement
            obs[selfId].x += obs[selfId].velocityX * delta;
            obs[selfId].y += obs[selfId].velocityY * delta;
            if (obs[obs[selfId].interactableId]) {
                obs[obs[selfId].interactableId].x = obs[selfId].x;
                obs[obs[selfId].interactableId].y = obs[selfId].y;
            }
            // Check collisions with terrain and reposition accordingly
            collisions.checkCollisions(selfId, obs, prefabs.renderSize, function (srcId, collisionId) {
                if (obs[srcId] && collisionId != srcId) {
                    switch (obs[collisionId].type) {
                        case types.ObjectTypes.TERRAIN:
                        case types.ObjectTypes.VEHICLE:
                            collisions.pushBack(obs, srcId, collisionId, prefabs.renderSize);
                            break;
                    }
                }
            });
        },
        mouseDown: function (obs, mouseEvent) { },
        onPlayerInput: function (obs, selfId, playerInput) {
            player = obs[selfId];
            var xDir = 0;
            var yDir = 0;
            if (playerInput.left) {
                xDir -= 1;
            }
            if (playerInput.right) {
                xDir += 1;
            }
            if (playerInput.up) {
                yDir -= 1;
            }
            if (playerInput.down) {
                yDir += 1;
            }
            player.velocityX = xDir * player.speed;
            player.velocityY = yDir * player.speed;
            if (xDir != 0 || yDir != 0) {
                player.facing = (Math.atan(player.velocityY / player.velocityX) * 57.2958 + 90) + (xDir < 0 ? 180 : 0);
            }
            if (xDir != 0) {
                player.hitboxWidth = obs[selfId].height;
                player.hitboxHeight = obs[selfId].width;
            }
            if (yDir != 0) {
                player.hitboxWidth = obs[selfId].width;
                player.hitboxHeight = obs[selfId].height;
            }
            if (playerInput.pickup) {
                var newVechicleId = selfId + ":" + obs[selfId].type + ":" + obs[selfId].subtype + ":" + obs[selfId].x + ":" + obs[selfId].y;
                obs[obs[selfId].interactableId].vehicleId = newVechicleId;
                obs[newVechicleId] = obs[selfId];
                delete obs[selfId];
                obs[selfId] = obs[newVechicleId].rider;
                obs[newVechicleId].rider = undefined;
                // Reset velocities and position
                obs[selfId].velocityX = 0;
                obs[selfId].velocityY = 0;
                obs[newVechicleId].velocityX = 0;
                obs[newVechicleId].velocityY = 0;
                obs[selfId].x = obs[newVechicleId].x + obs[newVechicleId].width / 2 + obs[selfId].width / 2;
                obs[selfId].y = obs[newVechicleId].y;
            }
        },
        damage: function (obs, selfId, amount) {
            obs[selfId].health -= amount;
            if (obs[selfId].health <= 0) {
                obs[selfId].deathrattle(obs, selfId);
            }
        },
    };
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./src/Louvre/Louvre.ts":
/*!******************************!*\
  !*** ./src/Louvre/Louvre.ts ***!
  \******************************/
/*! exports provided: blasterUIMasterPiece, scannerUIMasterPiece, builderUIMasterPiece, binocularsUIMasterPiece, renderObjects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blasterUIMasterPiece", function() { return blasterUIMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scannerUIMasterPiece", function() { return scannerUIMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "builderUIMasterPiece", function() { return builderUIMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "binocularsUIMasterPiece", function() { return binocularsUIMasterPiece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderObjects", function() { return renderObjects; });
/* harmony import */ var _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
/* harmony import */ var _ObjectTypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ObjectTypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Prefabs_Player_Player_template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Prefabs/Player/_Player.template */ "./Prefabs/Player/_Player.template.ts");
/* harmony import */ var _Prefabs_Player_God_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Prefabs/Player/God.template */ "./Prefabs/Player/God.template.ts");
/* harmony import */ var _Prefabs_Player_FireMage_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Prefabs/Player/FireMage.template */ "./Prefabs/Player/FireMage.template.ts");
/* harmony import */ var _Prefabs_Player_HealthBar_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Prefabs/Player/HealthBar.template */ "./Prefabs/Player/HealthBar.template.ts");
/* harmony import */ var _Prefabs_Projectile_Projectile_template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Prefabs/Projectile/_Projectile.template */ "./Prefabs/Projectile/_Projectile.template.ts");
/* harmony import */ var _Prefabs_Projectile_FireboltProjectile_template__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Prefabs/Projectile/FireboltProjectile.template */ "./Prefabs/Projectile/FireboltProjectile.template.ts");
/* harmony import */ var _Prefabs_Gravestone_Gravestone_template__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Prefabs/Gravestone/_Gravestone.template */ "./Prefabs/Gravestone/_Gravestone.template.ts");
/* harmony import */ var _Prefabs_Terrain_Terrain_template__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Prefabs/Terrain/_Terrain.template */ "./Prefabs/Terrain/_Terrain.template.ts");
/* harmony import */ var _Prefabs_Terrain_Tree_template__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Prefabs/Terrain/Tree.template */ "./Prefabs/Terrain/Tree.template.ts");
/* harmony import */ var _Prefabs_Terrain_WallHoriz_template__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../Prefabs/Terrain/WallHoriz.template */ "./Prefabs/Terrain/WallHoriz.template.ts");
/* harmony import */ var _Prefabs_Interactable_HealthPickup_template__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../Prefabs/Interactable/HealthPickup.template */ "./Prefabs/Interactable/HealthPickup.template.ts");
/* harmony import */ var _Prefabs_Interactable_PlayerTypeChanger_template__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../Prefabs/Interactable/PlayerTypeChanger.template */ "./Prefabs/Interactable/PlayerTypeChanger.template.ts");
/* harmony import */ var _Prefabs_Trigger_SpikeTrap_template__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../Prefabs/Trigger/SpikeTrap.template */ "./Prefabs/Trigger/SpikeTrap.template.ts");
/* harmony import */ var _Prefabs_Vehicle_Car_template__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../Prefabs/Vehicle/Car.template */ "./Prefabs/Vehicle/Car.template.ts");















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
function renderObjects(objects, renderOffsetX, renderOffsetY, renderSize, background, env, foreground, cover, ui) {
    for (var id in objects) {
        var object = objects[id];
        switch (object.type) {
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].PLAYER:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Player"].HUMAN:
                        foreground.draw(_Prefabs_Player_Player_template__WEBPACK_IMPORTED_MODULE_1__["playerMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Player"].GOD:
                        foreground.draw(_Prefabs_Player_God_template__WEBPACK_IMPORTED_MODULE_2__["godPlayerMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Player"].FIRE_MAGE:
                        foreground.draw(_Prefabs_Player_FireMage_template__WEBPACK_IMPORTED_MODULE_3__["firemagePlayerMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                foreground.draw(_Prefabs_Player_HealthBar_template__WEBPACK_IMPORTED_MODULE_4__["healthBarMasterPiece"](object, renderOffsetX, renderOffsetY, renderSize));
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].PROJECTILE:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Projectile"].BASIC_PROJECTILE:
                        env.draw(_Prefabs_Projectile_Projectile_template__WEBPACK_IMPORTED_MODULE_5__["projectileMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Projectile"].FIREBOLT_PROJECTILE:
                        env.draw(_Prefabs_Projectile_FireboltProjectile_template__WEBPACK_IMPORTED_MODULE_6__["fireboltProjectileMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].GRAVESTONE:
                env.draw(_Prefabs_Gravestone_Gravestone_template__WEBPACK_IMPORTED_MODULE_7__["graveStoneMasterPiece"](object, renderOffsetX, renderOffsetY));
                env.draw(_Prefabs_Player_HealthBar_template__WEBPACK_IMPORTED_MODULE_4__["healthBarMasterPiece"](object, renderOffsetX, renderOffsetY, renderSize));
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].TERRAIN:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Terrain"].TREE:
                        env.draw(_Prefabs_Terrain_Tree_template__WEBPACK_IMPORTED_MODULE_9__["treeTrunkMasterPiece"](object, renderOffsetX, renderOffsetY));
                        cover.draw(_Prefabs_Terrain_Tree_template__WEBPACK_IMPORTED_MODULE_9__["treeLeafMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Terrain"].WALL_HORIZ:
                        env.draw(_Prefabs_Terrain_WallHoriz_template__WEBPACK_IMPORTED_MODULE_10__["wallHorizBaseMasterPiece"](object, renderOffsetX, renderOffsetY));
                        cover.draw(_Prefabs_Terrain_WallHoriz_template__WEBPACK_IMPORTED_MODULE_10__["wallHorizCoverMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].INTERACTABLE:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Interactable"].HEALTH_PICKUP:
                        env.draw(_Prefabs_Interactable_HealthPickup_template__WEBPACK_IMPORTED_MODULE_11__["healthPickupMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Interactable"].PLAYER_TYPE_CHANGER:
                        env.draw(_Prefabs_Interactable_PlayerTypeChanger_template__WEBPACK_IMPORTED_MODULE_12__["playerTypeChangerMasterPiece"](object, renderOffsetX, renderOffsetY));
                        env.draw(_Prefabs_Interactable_PlayerTypeChanger_template__WEBPACK_IMPORTED_MODULE_12__["littleManMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].TRIGGER:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Trigger"].SPIKE_TRAP:
                        env.draw(_Prefabs_Trigger_SpikeTrap_template__WEBPACK_IMPORTED_MODULE_13__["spikeTrapMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].VEHICLE:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Vehicle"].CAR:
                        foreground.draw(_Prefabs_Vehicle_Car_template__WEBPACK_IMPORTED_MODULE_14__["carMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            default:
                env.draw(_Prefabs_Terrain_Terrain_template__WEBPACK_IMPORTED_MODULE_8__["defaultTerrainMasterPiece"](object, renderOffsetX, renderOffsetY));
                break;
        }
    }
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
        this.prepCanvas(masterPiece.posX, masterPiece.posY, masterPiece.width, masterPiece.height, masterPiece.facing);
        masterPiece.strokes.forEach(function (stroke) {
            _this.renderStroke(stroke, masterPiece.palette, masterPiece.customRenderSize);
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
     * @param customRenderSize Render the master piece with custom cube sizing
     */
    Popova.prototype.prepCanvas = function (positionX, positionY, width, height, degrees) {
        this.ctx.beginPath();
        this.ctx.translate(positionX, positionY);
        this.ctx.rotate(degrees * Math.PI / 180);
        this.ctx.translate(-width * this.cubeSize / 2, -height * this.cubeSize / 2);
    };
    /**
     * Renders
     * @param stroke Stroke to render
     * @param palette Contains the master piece's color swatches
     * @param customRenderSize Render the master piece with custom cube sizing
     */
    Popova.prototype.renderStroke = function (stroke, palette, customRenderSize) {
        this.ctx.fillStyle = palette[stroke.swatch];
        if (customRenderSize) {
            this.ctx.fillRect(stroke.cellX * customRenderSize, stroke.cellY * customRenderSize, stroke.width * customRenderSize, stroke.height * customRenderSize);
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
    _Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["renderObjects"](objects, renderOffsetX, renderOffsetY, cubeSize, background, env, foreground, cover, ui);
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vQ29sbGlzaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9PYmplY3RUeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0FiaWxpdGllcy9GaXJlYm9sdC5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0VxdWlwbWVudC9CaW5vY3VsYXJzLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRXF1aXBtZW50L0JsYXN0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9FcXVpcG1lbnQvQnVpbGRlci5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0VxdWlwbWVudC9TY2FubmVyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvR3JhdmVzdG9uZS9fR3JhdmVzdG9uZS5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0dyYXZlc3RvbmUvX0dyYXZlc3RvbmUudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9JbnRlcmFjdGFibGUvQ2FyRW50ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9JbnRlcmFjdGFibGUvSGVhbHRoUGlja3VwLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvSW50ZXJhY3RhYmxlL0hlYWx0aFBpY2t1cC50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0ludGVyYWN0YWJsZS9QbGF5ZXJUeXBlQ2hhbmdlci5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0ludGVyYWN0YWJsZS9QbGF5ZXJUeXBlQ2hhbmdlci50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0ludGVyYWN0YWJsZS9fSW50ZXJhY3RhYmxlLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL0ZpcmVNYWdlLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL0ZpcmVNYWdlLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL0dvZC5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1BsYXllci9Hb2QudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9QbGF5ZXIvSGVhbHRoQmFyLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL19QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9QbGF5ZXIvX1BsYXllci50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1ByZWZhYnMuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9Qcm9qZWN0aWxlL0ZpcmVib2x0UHJvamVjdGlsZS5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1Byb2plY3RpbGUvRmlyZWJvbHRQcm9qZWN0aWxlLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUHJvamVjdGlsZS9fUHJvamVjdGlsZS5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1Byb2plY3RpbGUvX1Byb2plY3RpbGUudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9UZXJyYWluL1RyZWUuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9UZXJyYWluL1RyZWUudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9UZXJyYWluL1dhbGxIb3Jpei5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1RlcnJhaW4vV2FsbEhvcml6LnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVGVycmFpbi9fVGVycmFpbi5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1RlcnJhaW4vX1RlcnJhaW4udGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9UcmlnZ2VyL1NwaWtlVHJhcC5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1RyaWdnZXIvU3Bpa2VUcmFwLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVHJpZ2dlci9fVHJpZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1ZlaGljbGUvQ2FyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVmVoaWNsZS9DYXIudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9WZWhpY2xlL19WZWhpY2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9Mb3V2cmUvTG91dnJlLnRzIiwid2VicGFjazovLy8uL3NyYy9Qb3BvdmEvUG9wb3ZhLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkVBLE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDYix1Q0FBdUM7SUFDdkMsZUFBZSxFQUFFLFVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsUUFBUTtRQUNqRCxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFeEIsS0FBSyxFQUFFLElBQUksR0FBRyxFQUFFO1lBQ1osSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXBCLElBQUksS0FBSyxFQUFFO2dCQUNQLElBQUksR0FBRyxHQUNILFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztvQkFDbEosWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO29CQUNsSixZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7b0JBQzlJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDO2dCQUVuSixJQUFJLEdBQUcsR0FDSCxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsS0FBSyxDQUFDLENB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VUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVKLElBQUksUUFBUSxHQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVKLElBQUksTUFBTSxHQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlKLElBQUksUUFBUSxHQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlKLElBQUksU0FBUyxHQUFHLFFBQVEsSUFBSSxT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RUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbEgsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLy8gQ2hlY2sgY29sbGlzaW9ucyBiZXR3ZWVuIGFsbCBvYmplY3RzXG4gICAgY2hlY2tDb2xsaXNpb25zOiAoY2hlY2tTcmMsIG9icywgcmVuZGVyU2l6ZSwgY2FsbEJhY2spID0+IHtcbiAgICAgICAgdmFyIHNyYyA9IG9ic1tjaGVja1NyY107XG5cbiAgICAgICAgZm9yIChpZCBpbiBvYnMpIHtcbiAgICAgICAgICAgIHZhciBjaGVjayA9IG9ic1tpZF07XG5cbiAgICAgICAgICAgIGlmIChjaGVjaykge1xuICAgICAgICAgICAgICAgIHZhciB4SW4gPSBcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVJblJhbmdlKHNyYy54IC0gc3JjLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUsIGNoZWNrLnggLSBjaGVjay5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay54ICsgY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVJblJhbmdlKHNyYy54ICsgc3JjLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUsIGNoZWNrLnggLSBjaGVjay5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay54ICsgY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVJblJhbmdlKGNoZWNrLnggLSBjaGVjay5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBzcmMueCAtIHNyYy5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBzcmMueCArIHNyYy5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplKSB8fFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZUluUmFuZ2UoY2hlY2sueCArIGNoZWNrLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUsIHNyYy54IC0gc3JjLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUsIHNyYy54ICsgc3JjLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHlJbiA9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlSW5SYW5nZShzcmMueSAtIHNyYy5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueSAtIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay55ICsgY2hlY2suaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUpIHx8XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlSW5SYW5nZShzcmMueSArIHNyYy5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueSAtIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay55ICsgY2hlY2suaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUpIHx8XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlSW5SYW5nZShjaGVjay55IC0gY2hlY2suaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUsIHNyYy55IC0gc3JjLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplLCBzcmMueSArIHNyYy5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVJblJhbmdlKGNoZWNrLnkgKyBjaGVjay5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSwgc3JjLnkgLSBzcmMuaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUsIHNyYy55ICsgc3JjLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplKTtcblxuICAgICAgICAgICAgICAgIGlmICh4SW4gJiYgeUluKSBjYWxsQmFjayhjaGVja1NyYywgaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBDaGVjayBjb2xsaXNpb25zIGJldHdlZW4gY2xpY2sgbG9jYXRpb24gYW5kIGFsbCBvYmplY3RzXG4gICAgY2hlY2tDbGlja0NvbGxpc2lvbnM6IChjbGlja1gsIGNsaWNrWSwgb2JzLCByZW5kZXJTaXplLCBjYWxsQmFjaykgPT4ge1xuICAgICAgICBmb3IgKGlkIGluIG9icykge1xuICAgICAgICAgICAgdmFyIGNoZWNrID0gb2JzW2lkXTtcblxuICAgICAgICAgICAgaWYgKGNoZWNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHhJbiA9IFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZUluUmFuZ2UoY2xpY2tYLCBjaGVjay54IC0gY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueCArIGNoZWNrLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUpIHx8XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlSW5SYW5nZShjbGlja1gsIGNoZWNrLnggLSBjaGVjay5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay54ICsgY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgeUluID1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWVJblJhbmdlKGNsaWNrWSwgY2hlY2sueSAtIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay55ICsgY2hlY2suaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUpIHx8XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlSW5SYW5nZShjbGlja1ksIGNoZWNrLnkgLSBjaGVjay5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueSArIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplKTtcblxuICAgICAgICAgICAgICAgIGlmICh4SW4gJiYgeUluKSBjYWxsQmFjayhpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHB1c2hCYWNrOiAob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQsIHJlbmRlclNpemUpID0+IHtcbiAgICAgICAgLy8gUHVzaCBvYmplY3QgYmFjayBvdXQgb2YgY29sbGlzaW9uIHRlcnJhaW4gdG93YXJkcyB3aGljaCBldmVyIHNpZGUgaXMgdGhlIGNsb3Nlc3QgdG8gdGhlIHRlcnJhaW4gb2JqZWN0XG4gICAgICAgIHZhciBkaXN0UmlnaHQgICA9IE1hdGguYWJzKChvYnNbY29sbGlzaW9uSWRdLnggLSBvYnNbY29sbGlzaW9uSWRdLmhpdGJveFdpZHRoICogcmVuZGVyU2l6ZSAvIDIpIC0gKG9ic1tzcmNJZF0ueCArIG9ic1tzcmNJZF0uaGl0Ym94V2lkdGggKiByZW5kZXJTaXplIC8gMikpO1xuICAgICAgICB2YXIgZGlzdExlZnQgICAgPSBNYXRoLmFicygob2JzW2NvbGxpc2lvbklkXS54ICsgb2JzW2NvbGxpc2lvbklkXS5oaXRib3hXaWR0aCAqIHJlbmRlclNpemUgLyAyKSAtIChvYnNbc3JjSWRdLnggLSBvYnNbc3JjSWRdLmhpdGJveFdpZHRoICogcmVuZGVyU2l6ZSAvIDIpKTtcbiAgICAgICAgdmFyIGRpc3RVcCAgICAgID0gTWF0aC5hYnMoKG9ic1tjb2xsaXNpb25JZF0ueSArIG9ic1tjb2xsaXNpb25JZF0uaGl0Ym94SGVpZ2h0ICogcmVuZGVyU2l6ZSAvIDIpIC0gKG9ic1tzcmNJZF0ueSAtIG9ic1tzcmNJZF0uaGl0Ym94SGVpZ2h0ICogcmVuZGVyU2l6ZSAvIDIpKTtcbiAgICAgICAgdmFyIGRpc3REb3duICAgID0gTWF0aC5hYnMoKG9ic1tjb2xsaXNpb25JZF0ueSAtIG9ic1tjb2xsaXNpb25JZF0uaGl0Ym94SGVpZ2h0ICogcmVuZGVyU2l6ZSAvIDIpIC0gKG9ic1tzcmNJZF0ueSArIG9ic1tzcmNJZF0uaGl0Ym94SGVpZ2h0ICogcmVuZGVyU2l6ZSAvIDIpKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkaXN0UmlnaHQgPCBkaXN0TGVmdCAmJiBkaXN0UmlnaHQgPCBkaXN0VXAgJiYgZGlzdFJpZ2h0IDwgZGlzdERvd24pIHtcbiAgICAgICAgICAgIG9ic1tzcmNJZF0ueCA9IG9ic1tzcmNJZF0ueCAtIGRpc3RSaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlzdExlZnQgPCBkaXN0UmlnaHQgJiYgZGlzdExlZnQgPCBkaXN0VXAgJiYgZGlzdExlZnQgPCBkaXN0RG93bikge1xuICAgICAgICAgICAgb2JzW3NyY0lkXS54ID0gb2JzW3NyY0lkXS54ICsgZGlzdExlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpc3RVcCA8IGRpc3RSaWdodCAmJiBkaXN0VXAgPCBkaXN0TGVmdCAmJiBkaXN0VXAgPCBkaXN0RG93bikge1xuICAgICAgICAgICAgb2JzW3NyY0lkXS55ID0gb2JzW3NyY0lkXS55ICsgZGlzdFVwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXN0RG93biA8IGRpc3RSaWdodCAmJiBkaXN0RG93biA8IGRpc3RMZWZ0ICYmIGRpc3REb3duIDwgZGlzdFVwKSB7XG4gICAgICAgICAgICBvYnNbc3JjSWRdLnkgPSBvYnNbc3JjSWRdLnkgLSBkaXN0RG93bjtcbiAgICAgICAgfVxuICAgIH0sXG59XG5cbi8vIENvbGxpc2lvbiBkZXRlY3Rpb24gaGVscGVyLCBjaGVja3MgaWYgdmFsdWUgaXMgYmV0d2VlbiBtaW4gYW5kIG1heFxuZnVuY3Rpb24gdmFsdWVJblJhbmdlKHZhbHVlLCBtaW4sIG1heCkgeyBcbiAgICByZXR1cm4gKHZhbHVlID49IG1pbikgJiYgKHZhbHVlIDw9IG1heCk7IFxufSIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIE9iamVjdFR5cGVzOiB7XG4gICAgICAgIFBMQVlFUjogXCJwbGF5ZXJcIixcbiAgICAgICAgR1JBVkVTVE9ORTogXCJncmF2ZXN0b25lXCIsXG4gICAgICAgIFBST0pFQ1RJTEU6IFwicHJvamVjdGlsZVwiLFxuICAgICAgICBURVJSQUlOOiBcInRlcnJhaW5cIixcbiAgICAgICAgSU5URVJBQ1RBQkxFOiBcImludGVyYWN0YWJsZVwiLFxuICAgICAgICBUUklHR0VSOiBcInRyaWdnZXJcIixcbiAgICAgICAgVkVISUNMRTogXCJ2ZWhpY2xlXCIsXG4gICAgfSxcbiAgICBQbGF5ZXI6IHtcbiAgICAgICAgSFVNQU46IFwiaHVtYW5cIixcbiAgICAgICAgR09EOiBcImdvZFwiLFxuICAgICAgICBGSVJFX01BR0U6IFwiZmlyZS1tYWdlXCIsXG4gICAgfSxcbiAgICBQcm9qZWN0aWxlOiB7XG4gICAgICAgIEJBU0lDX1BST0pFQ1RJTEU6IFwiYmFzaWMtcHJvamVjdGlsZVwiLFxuICAgICAgICBGSVJFQk9MVF9QUk9KRUNUSUxFOiBcImZpcmVib2xkLXByb2plY3RpbGVcIixcbiAgICB9LFxuICAgIFRlcnJhaW46IHtcbiAgICAgICAgVFJFRTogXCJ0cmVlXCIsXG4gICAgICAgIFdBTExfSE9SSVo6IFwid2FsbC1ob3JpelwiLFxuICAgIH0sXG4gICAgSW50ZXJhY3RhYmxlOiB7XG4gICAgICAgIEhFQUxUSF9QSUNLVVA6IFwiaGVhbHRoLXBpY2t1cFwiLFxuICAgICAgICBDQVJfRU5URVI6IFwiY2FyLWVudGVyXCIsXG4gICAgICAgIFBMQVlFUl9UWVBFX0NIQU5HRVI6IFwicGxheWVyLXR5cGUtY2hhbmdlclwiLFxuICAgIH0sXG4gICAgVHJpZ2dlcjoge1xuICAgICAgICBTUElLRV9UUkFQOiBcInNwaWtlLXRyYXBcIixcbiAgICB9LFxuICAgIFZlaGljbGU6IHtcbiAgICAgICAgQ0FSOiBcImNhclwiLFxuICAgIH0sXG4gICAgRXF1aXBtZW50VHlwZXM6IHtcbiAgICAgICAgQkxBU1RFUjogXCJibGFzdGVyXCIsXG4gICAgICAgIFNDQU5ORVI6IFwic2Nhbm5lclwiLFxuICAgICAgICBCVUlMREVSOiBcImJ1aWxkZXJcIixcbiAgICAgICAgQklOT0NVTEFSUzogXCJiaW5vY3VsYXJzXCIsXG4gICAgfSxcbiAgICBBYmlsaXRpZXM6IHtcbiAgICAgICAgRklSRUJPTFQ6IFwiZmlyZWJvbHRcIixcbiAgICB9LFxufSIsInZhciBmaXJlYm9sdENvb2xkb3duID0gMTIwMDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBwYXJhbXMgPSB7IH0pIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLkFiaWxpdGllcy5GSVJFQk9MVCxcbiAgICAgICAgY29vbGRvd246IGZpcmVib2x0Q29vbGRvd24sXG4gICAgICAgIGxhc3RjYXN0OiB1bmRlZmluZWQsXG4gICAgICAgIGNhc3Q6IChvYnMsIHNvdXJjZUlkLCBhYmlsaXR5SW5kZXgsIHRhcmdldFgsIHRhcmdldFkpID0+IHtcbiAgICAgICAgICAgIHZhciBuZXdUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmICghb2JzW3NvdXJjZUlkXS5hYmlsaXRpZXNbYWJpbGl0eUluZGV4XS5sYXN0Y2FzdFxuICAgICAgICAgICAgICAgIHx8IG5ld1RpbWUgLSBvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmxhc3RjYXN0ID49IG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0uY29vbGRvd24pIHtcbiAgICAgICAgICAgICAgICBvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmxhc3RjYXN0ID0gbmV3VGltZTtcbiAgICAgICAgICAgICAgICBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgc291cmNlSWQsIHRhcmdldFgsIHRhcmdldFksIHR5cGVzLk9iamVjdFR5cGVzLlBST0pFQ1RJTEUsIHR5cGVzLlByb2plY3RpbGUuRklSRUJPTFRfUFJPSkVDVElMRSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGJpbm9jdWxhcnNWaWV3UmFuZ2UgPSAyO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyA9IHsgfSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLkVxdWlwbWVudFR5cGVzLkJJTk9DVUxBUlMsXG4gICAgICAgIHVzZTogKG9icywgc291cmNlSWQsIHRhcmdldFgsIHRhcmdldFkpID0+IHsgfSxcbiAgICAgICAgb25FcXVpcDogKG9icywgc291cmNlSWQpID0+IHtcbiAgICAgICAgICAgIG9ic1tzb3VyY2VJZF0ucHJldlZpZXdSYW5nZSA9IG9ic1tzb3VyY2VJZF0udmlld1JhbmdlO1xuICAgICAgICAgICAgb2JzW3NvdXJjZUlkXS52aWV3UmFuZ2UgPSBiaW5vY3VsYXJzVmlld1JhbmdlO1xuICAgICAgICB9LFxuICAgICAgICBvbkRlcXVpcDogKG9icywgc291cmNlSWQpID0+IHtcbiAgICAgICAgICAgIG9ic1tzb3VyY2VJZF0udmlld1JhbmdlID0gb2JzW3NvdXJjZUlkXS5wcmV2Vmlld1JhbmdlO1xuICAgICAgICAgICAgZGVsZXRlIG9ic1tzb3VyY2VJZF0ucHJldlZpZXdSYW5nZTtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJmdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyA9IHsgfSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuRXF1aXBtZW50VHlwZXMuQkxBU1RFUixcbiAgICAgICAgdXNlOiAob2JzLCBzb3VyY2VJZCwgdGFyZ2V0WCwgdGFyZ2V0WSkgPT4ge1xuICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIHNvdXJjZUlkLCB0YXJnZXRYLCB0YXJnZXRZLCB0eXBlcy5PYmplY3RUeXBlcy5QUk9KRUNUSUxFLCB0eXBlcy5Qcm9qZWN0aWxlLkJBU0lDX1BST0pFQ1RJTEUpO1xuICAgICAgICB9LFxuICAgICAgICBvbkVxdWlwOiAob2JzLCBzb3VyY2VJZCkgPT4geyB9LFxuICAgICAgICBvbkRlcXVpcDogKG9icywgc291cmNlSWQpID0+IHsgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJmdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyA9IHsgfSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuRXF1aXBtZW50VHlwZXMuQlVJTERFUixcbiAgICAgICAgdXNlOiAob2JzLCBzb3VyY2VJZCwgdGFyZ2V0WCwgdGFyZ2V0WSkgPT4ge1xuICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIHNvdXJjZUlkLCB0YXJnZXRYLCB0YXJnZXRZLCBwYXJhbXMudHlwZSwgcGFyYW1zLnN1YnR5cGUpO1xuICAgICAgICB9LFxuICAgICAgICBvbkVxdWlwOiAob2JzLCBzb3VyY2VJZCkgPT4geyB9LFxuICAgICAgICBvbkRlcXVpcDogKG9icywgc291cmNlSWQpID0+IHsgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJmdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyA9IHsgfSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgY29sbGlzaW9ucyA9IHJlcXVpcmUoXCIuLi8uLi9Db2xsaXNpb25zXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5FcXVpcG1lbnRUeXBlcy5TQ0FOTkVSLFxuICAgICAgICB1c2U6IChvYnMsIHNvdXJjZUlkLCB0YXJnZXRYLCB0YXJnZXRZKSA9PiB7XG4gICAgICAgICAgICAvLyBSZXBsYWNlcyBhbGwgYnVpbGRlcnMgd2l0aCB0aGlzIGJ1aWxkIHR5cGUuLi5cbiAgICAgICAgICAgIGNvbGxpc2lvbnMuY2hlY2tDbGlja0NvbGxpc2lvbnModGFyZ2V0WCwgdGFyZ2V0WSwgb2JzLCBwcmVmYWJzLnJlbmRlclNpemUsIChjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYnNbY29sbGlzaW9uSWRdLnN1YnR5cGUgIT0gdHlwZXMuSW50ZXJhY3RhYmxlLkNBUl9FTlRFUikge1xuICAgICAgICAgICAgICAgICAgICBvYnNbc291cmNlSWRdLmVxdWlwbWVudCA9IG9ic1tzb3VyY2VJZF0uZXF1aXBtZW50Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CVUlMREVSKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHByZWZhYnMubmV3RXF1aXBtZW50KG9icywgdHlwZXMuRXF1aXBtZW50VHlwZXMuQlVJTERFUiwgeyB0eXBlOiBvYnNbY29sbGlzaW9uSWRdLnR5cGUsIHN1YnR5cGU6IG9ic1tjb2xsaXNpb25JZF0uc3VidHlwZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25FcXVpcDogKG9icywgc291cmNlSWQpID0+IHsgfSxcbiAgICAgICAgb25EZXF1aXA6IChvYnMsIHNvdXJjZUlkKSA9PiB7IH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGdyYXZlc3RvbmVXaWR0aCA9IDM7XG52YXIgZ3JhdmVzdG9uZUhlaWdodCA9IDQ7XG52YXIgZ3JhdmVzdG9uZUhpdGJveFdpZHRoID0gZ3JhdmVzdG9uZVdpZHRoO1xudmFyIGdyYXZlc3RvbmVIaXRib3hIZWlnaHQgPSBncmF2ZXN0b25lSGVpZ2h0O1xudmFyIGdyYXZlc3RvbmVIZWFsdGggPSA0MDtcbnZhciBncmF2ZXN0b25lVmlld1JhbmdlID0gMSAvIDQ7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uLy4uL0NvbGxpc2lvbnNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLk9iamVjdFR5cGVzLkdSQVZFU1RPTkUsXG4gICAgICAgIHN1YnR5cGU6IG9ic1tzcmNdLnN1YnR5cGUsXG4gICAgICAgIHg6IHBvc1gsXG4gICAgICAgIHk6IHBvc1kgKyAxICogcHJlZmFicy5yZW5kZXJTaXplLFxuICAgICAgICB2ZWxvY2l0eVg6IDAsXG4gICAgICAgIHZlbG9jaXR5WTogMCxcbiAgICAgICAgc3BlZWQ6IDAsXG4gICAgICAgIHdpZHRoOiBncmF2ZXN0b25lV2lkdGgsXG4gICAgICAgIGhlaWdodDogZ3JhdmVzdG9uZUhlaWdodCxcbiAgICAgICAgaGl0Ym94V2lkdGg6IGdyYXZlc3RvbmVIaXRib3hXaWR0aCxcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiBncmF2ZXN0b25lSGl0Ym94SGVpZ2h0LFxuICAgICAgICBoZWFsdGg6IGdyYXZlc3RvbmVIZWFsdGgsXG4gICAgICAgIG1heEhlYWx0aDogZ3JhdmVzdG9uZUhlYWx0aCxcbiAgICAgICAgY3VycmVudEVxdWlwbWVudDogdW5kZWZpbmVkLFxuICAgICAgICBlcXVpcG1lbnQ6IFtdLFxuICAgICAgICB2aWV3UmFuZ2U6IGdyYXZlc3RvbmVWaWV3UmFuZ2UsXG4gICAgICAgIGRlYXRocmF0dGxlOiAob2JzLCBzZWxmUmVmKSA9PiB7XG4gICAgICAgICAgICBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgc2VsZlJlZiwgMCwgMCwgdHlwZXMuT2JqZWN0VHlwZXMuUExBWUVSKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7XG4gICAgICAgICAgICAvLyBDaGVjayBjb2xsaXNpb25zIHdpdGggdmVoaWNsZXMgYW5kIHJlcG9zaXRpb24gYWNjb3JkaW5nbHlcbiAgICAgICAgICAgIGNvbGxpc2lvbnMuY2hlY2tDb2xsaXNpb25zKHNlbGZJZCwgb2JzLCBwcmVmYWJzLnJlbmRlclNpemUsIChzcmNJZCwgY29sbGlzaW9uSWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob2JzW3NyY0lkXSAmJiBjb2xsaXNpb25JZCAhPSBzcmNJZCl7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob2JzW2NvbGxpc2lvbklkXS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHVzaCBvYmplY3QgYmFjayBvdXQgb2YgY29sbGlzaW9uIHZlaGljbGUgdG93YXJkcyB3aGljaCBldmVyIHNpZGUgaXMgdGhlIGNsb3Nlc3QgdG8gdGhlIHZlaGljbGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5wdXNoQmFjayhvYnMsIHNyY0lkLCBjb2xsaXNpb25JZCwgcHJlZmFicy5yZW5kZXJTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBtb3VzZURvd246IChvYnMsIG1vdXNlRXZlbnQpID0+IHsgfSxcbiAgICAgICAgb25QbGF5ZXJJbnB1dDogKG9icywgc2VsZklkLCBwbGF5ZXJJbnB1dCkgPT4geyB9LFxuICAgICAgICBkYW1hZ2U6IChvYnMsIHNlbGZJZCwgYW1vdW50KSA9PiB7XG4gICAgICAgICAgICBvYnNbc2VsZklkXS5oZWFsdGggLT0gYW1vdW50O1xuXG4gICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0uaGVhbHRoIDw9IDApe1xuICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLmRlYXRocmF0dGxlKG9icywgc2VsZklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGdyYXZlc3RvbmUgb2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBncmF2ZXN0b25lIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlciBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBncmF2ZVN0b25lTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiM4ODg4ODhcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAwLFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDAsXG4gICAgICAgIH1dXG4gICAgfVxufVxuIiwidmFyIGNhckVudGVyV2lkdGggPSAyNDtcbnZhciBjYXJFbnRlckhlaWdodCA9IDI0O1xudmFyIGNhckVudGVySGl0Ym94V2lkdGggPSAyNDtcbnZhciBjYXJFbnRlckhpdGJveEhlaWdodCA9IDI0O1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgYmFzZSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5JbnRlcmFjdGFibGUuQ0FSX0VOVEVSLFxuICAgICAgICB3aWR0aDogY2FyRW50ZXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjYXJFbnRlckhlaWdodCxcbiAgICAgICAgaGl0Ym94V2lkdGg6IGNhckVudGVySGl0Ym94V2lkdGgsXG4gICAgICAgIGhpdGJveEhlaWdodDogY2FyRW50ZXJIaXRib3hIZWlnaHQsXG4gICAgICAgIHZlaGljbGVJZDogc3JjLFxuICAgICAgICBvbkludGVyYWN0OiAob2JzLCBzZWxmUmVmLCBpbnRlcmFjdElkKSA9PiB7XG4gICAgICAgICAgICBpZiAob2JzW2ludGVyYWN0SWRdICYmXG4gICAgICAgICAgICAgICAgb2JzW2ludGVyYWN0SWRdLnR5cGUgPT09IHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUiAmJlxuICAgICAgICAgICAgICAgIG9ic1tvYnNbc2VsZlJlZl0udmVoaWNsZUlkXS5yaWRlciA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG9ic1tvYnNbc2VsZlJlZl0udmVoaWNsZUlkXS5yaWRlciA9IG9ic1tpbnRlcmFjdElkXTtcbiAgICAgICAgICAgICAgICBvYnNbaW50ZXJhY3RJZF0gPSBvYnNbb2JzW3NlbGZSZWZdLnZlaGljbGVJZF07XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tvYnNbc2VsZlJlZl0udmVoaWNsZUlkXTtcbiAgICAgICAgICAgICAgICBvYnNbc2VsZlJlZl0udmVoaWNsZUlkID0gaW50ZXJhY3RJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJ2YXIgaGVhbHRoUGlja3VwV2lkdGggPSAzO1xudmFyIGhlYWx0aFBpY2t1cEhlaWdodCA9IDM7XG52YXIgaGVhbHRoUGlja3VwSGl0Ym94V2lkdGggPSAzO1xudmFyIGhlYWx0aFBpY2t1cEhpdGJveEhlaWdodCA9IDM7XG52YXIgaGVhbHRoUGlja3VwSGVhbGluZyA9IDQwO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgYmFzZSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5JbnRlcmFjdGFibGUuSEVBTFRIX1BJQ0tVUCxcbiAgICAgICAgd2lkdGg6IGhlYWx0aFBpY2t1cFdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGhlYWx0aFBpY2t1cEhlaWdodCxcbiAgICAgICAgaGl0Ym94V2lkdGg6IGhlYWx0aFBpY2t1cEhpdGJveFdpZHRoLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IGhlYWx0aFBpY2t1cEhpdGJveEhlaWdodCxcbiAgICAgICAgb25JbnRlcmFjdDogKG9icywgc2VsZlJlZiwgaW50ZXJhY3RJZCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic1tpbnRlcmFjdElkXS5oZWFsKSB7XG4gICAgICAgICAgICAgICAgb2JzW2ludGVyYWN0SWRdLmhlYWwob2JzLCBpbnRlcmFjdElkLCBoZWFsdGhQaWNrdXBIZWFsaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSBvYnNbc2VsZlJlZl07XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBoZWFsdGggcGlja3VwIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgaGVhbHRoIHBpY2t1cCBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaGVhbHRoUGlja3VwTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNGRkZGRkZcIiwgXCIjRkYwMDAwXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfV1cbiAgICB9XG59XG4iLCJ2YXIgcGxheWVyVHlwZUNoYW5nZXJXaWR0aCA9IDU7XG52YXIgcGxheWVyVHlwZUNoYW5nZXJIZWlnaHQgPSA1O1xudmFyIHBsYXllclR5cGVDaGFuZ2VySGl0Ym94V2lkdGggPSA1O1xudmFyIHBsYXllclR5cGVDaGFuZ2VySGl0Ym94SGVpZ2h0ID0gNTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UsIHBhcmFtcyA9IHsgfSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJhc2UsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLkludGVyYWN0YWJsZS5QTEFZRVJfVFlQRV9DSEFOR0VSLFxuICAgICAgICB3aWR0aDogcGxheWVyVHlwZUNoYW5nZXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBwbGF5ZXJUeXBlQ2hhbmdlckhlaWdodCxcbiAgICAgICAgaGl0Ym94V2lkdGg6IHBsYXllclR5cGVDaGFuZ2VySGl0Ym94V2lkdGgsXG4gICAgICAgIGhpdGJveEhlaWdodDogcGxheWVyVHlwZUNoYW5nZXJIaXRib3hIZWlnaHQsXG4gICAgICAgIG5ld1BsYXllclR5cGU6IHBhcmFtcy5uZXdUeXBlLFxuICAgICAgICBvbkludGVyYWN0OiAob2JzLCBzZWxmUmVmLCBpbnRlcmFjdElkKSA9PiB7XG4gICAgICAgICAgICBpZiAob2JzW2ludGVyYWN0SWRdLnR5cGUgPT09IHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUiAmJiBvYnNbaW50ZXJhY3RJZF0uc3VidHlwZSAhPT0gb2JzW3NlbGZSZWZdLm5ld1BsYXllclR5cGUpIHtcbiAgICAgICAgICAgICAgICBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgaW50ZXJhY3RJZCwgb2JzW2ludGVyYWN0SWRdLngsIG9ic1tpbnRlcmFjdElkXS55LCB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVIsIG9ic1tzZWxmUmVmXS5uZXdQbGF5ZXJUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4uLy4uL09iamVjdFR5cGVzXCI7XG5pbXBvcnQgKiBhcyBwcmVmYWJzIGZyb20gXCIuLi9QcmVmYWJzXCI7XG5cbmltcG9ydCAqIGFzIF9wbGF5ZXIgZnJvbSBcIi4uL1BsYXllci9fUGxheWVyLnRlbXBsYXRlXCI7XG5pbXBvcnQgKiBhcyBmaXJlbWFnZSBmcm9tIFwiLi4vUGxheWVyL0ZpcmVNYWdlLnRlbXBsYXRlXCI7XG5pbXBvcnQgKiBhcyBnb2QgZnJvbSBcIi4uL1BsYXllci9Hb2QudGVtcGxhdGVcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBwbGF5ZXIgdHlwZSBjaGFuZ2VyIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgcGxheWVyIHR5cGUgY2hhbmdlciBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyVHlwZUNoYW5nZXJNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgdmFyIGN1c3RvbVJlbmRlclNpemUgPSAyO1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiM4ODg4ODhcIiwgXCIjYmJiYmJiXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAqIHByZWZhYnMucmVuZGVyU2l6ZSAvIGN1c3RvbVJlbmRlclNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQgKiBwcmVmYWJzLnJlbmRlclNpemUgLyBjdXN0b21SZW5kZXJTaXplLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICB3aWR0aDogKG9iamVjdC53aWR0aCAtIDEpICogcHJlZmFicy5yZW5kZXJTaXplIC8gY3VzdG9tUmVuZGVyU2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogKG9iamVjdC5oZWlnaHQgLSAxKSAqIHByZWZhYnMucmVuZGVyU2l6ZSAvIGN1c3RvbVJlbmRlclNpemUsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSxdLFxuICAgICAgICBjdXN0b21SZW5kZXJTaXplOiBjdXN0b21SZW5kZXJTaXplLFxuICAgIH1cbn1cblxuLyoqXG4gKiBHZXQgbGl0dGxlIG1hbiBmb3IgcGxheWVyIHR5cGUgY2hhbmdlciBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHBsYXllciB0eXBlIGNoYW5nZXIgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpdHRsZU1hbk1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICB2YXIgb2JqQ29weSA9IG9iamVjdDtcbiAgICBvYmpDb3B5LndpZHRoID0gMjtcbiAgICBvYmpDb3B5LmhlaWdodCA9IDM7XG5cbiAgICB2YXIgcGxheWVyVHlwZUNoYW5nZXJNYXN0ZXJQaWVjZSA9IF9wbGF5ZXIucGxheWVyTWFzdGVyUGllY2Uob2JqQ29weSwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSk7XG4gICAgc3dpdGNoIChvYmplY3QubmV3UGxheWVyVHlwZSkge1xuICAgICAgICBjYXNlIHR5cGVzLlBsYXllci5GSVJFX01BR0U6XG4gICAgICAgICAgICBwbGF5ZXJUeXBlQ2hhbmdlck1hc3RlclBpZWNlID0gZmlyZW1hZ2UuZmlyZW1hZ2VQbGF5ZXJNYXN0ZXJQaWVjZShvYmpDb3B5LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHR5cGVzLlBsYXllci5HT0Q6XG4gICAgICAgICAgICBwbGF5ZXJUeXBlQ2hhbmdlck1hc3RlclBpZWNlID0gZ29kLmdvZFBsYXllck1hc3RlclBpZWNlKG9iakNvcHksIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHBsYXllclR5cGVDaGFuZ2VyTWFzdGVyUGllY2UuY3VzdG9tUmVuZGVyU2l6ZSA9IDI7XG5cbiAgICByZXR1cm4gcGxheWVyVHlwZUNoYW5nZXJNYXN0ZXJQaWVjZTtcbn1cbiIsImZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuT2JqZWN0VHlwZXMuSU5URVJBQ1RBQkxFLFxuICAgICAgICB4OiBwb3NYLFxuICAgICAgICB5OiBwb3NZLFxuICAgICAgICB1cGRhdGU6IChvYnMsIHNlbGZJZCwgZGVsdGEpID0+IHsgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJ2YXIgZmlyZW1hZ2VTcGVlZCA9IDAuMTg7XG52YXIgZmlyZW1hZ2VIZWFsdGggPSA2NDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5QbGF5ZXIuRklSRV9NQUdFLFxuICAgICAgICBtYXhIZWFsdGg6IGZpcmVtYWdlSGVhbHRoLFxuICAgICAgICBoZWFsdGg6IGZpcmVtYWdlSGVhbHRoLFxuICAgICAgICBzcGVlZDogZmlyZW1hZ2VTcGVlZCxcbiAgICAgICAgYWJpbGl0aWVzOiBbXG4gICAgICAgICAgICBwcmVmYWJzLm5ld0FiaWxpdHkob2JzLCB0eXBlcy5BYmlsaXRpZXMuRklSRUJPTFQpLFxuICAgICAgICBdLFxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBmaXJlbWFnZSBwbGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBmaXJlbWFnZSBwbGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpcmVtYWdlUGxheWVyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7ICAgIC8vIFNraW4sICAgICAgUGFudHMsICAgICBTaGlydCwgICAgICBGYWNlXG4gICAgICAgIHBhbGV0dGU6IFtcIiNEMkI0OENcIiwgXCIjQTUyQTJBXCIsIFwiI0RDMTQzQ1wiLCBcIiNkYmMzYTNcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDIsXG4gICAgICAgICAgICB3aWR0aDogNCxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDQsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAwLjUsXG4gICAgICAgICAgICBoZWlnaHQ6IDYsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIuNSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDAuNSxcbiAgICAgICAgICAgIGhlaWdodDogNixcbiAgICAgICAgICAgIHN3YXRjaDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDAuNSxcbiAgICAgICAgICAgIHN3YXRjaDogMlxuICAgICAgICB9LF0sXG4gICAgfVxufVxuIiwidmFyIGdvZFNwZWVkID0gMC4yODtcbnZhciBnb2RIZWFsdGggPSAzNTA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG4gICAgXG4gICAgcmV0dXJuIHsgXG4gICAgICAgIC4uLmJhc2UsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLlBsYXllci5HT0QsXG4gICAgICAgIG1heEhlYWx0aDogZ29kSGVhbHRoLFxuICAgICAgICBoZWFsdGg6IGdvZEhlYWx0aCxcbiAgICAgICAgY3VycmVudEVxdWlwbWVudDogMCxcbiAgICAgICAgZXF1aXBtZW50OiBbXG4gICAgICAgICAgICBwcmVmYWJzLm5ld0VxdWlwbWVudChvYnMsIHR5cGVzLkVxdWlwbWVudFR5cGVzLkJMQVNURVIpLFxuICAgICAgICAgICAgcHJlZmFicy5uZXdFcXVpcG1lbnQob2JzLCB0eXBlcy5FcXVpcG1lbnRUeXBlcy5TQ0FOTkVSKSxcbiAgICAgICAgICAgIHByZWZhYnMubmV3RXF1aXBtZW50KG9icywgdHlwZXMuRXF1aXBtZW50VHlwZXMuQlVJTERFUiwgeyB0eXBlOiB0eXBlcy5PYmplY3RUeXBlcy5URVJSQUlOLCBzdWJ0eXBlOiB0eXBlcy5UZXJyYWluLlRSRUUgfSksXG4gICAgICAgICAgICBwcmVmYWJzLm5ld0VxdWlwbWVudChvYnMsIHR5cGVzLkVxdWlwbWVudFR5cGVzLkJJTk9DVUxBUlMpLFxuICAgICAgICBdLFxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBnb2QgcGxheWVyIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgZ29kIHBsYXllciBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ29kUGxheWVyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNGRjE0OTM4OFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMixcbiAgICAgICAgICAgIHdpZHRoOiA0LFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdLFxuICAgIH1cbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3Igb2JqZWN0J3MgaGVhbHRoIGJhclxuICogQHBhcmFtIG9iamVjdCBUaGUgb2JqZWN0IHRoYXQgbmVlZHMgYSBoZWFsdGggYmFyXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyIG9iamVjdHNcbiAqIEBwYXJhbSBjdWJlU2l6ZSBUaGUgY3ViZSByZW5kZXIgc2l6ZSwgcmVxdWlyZWQgd2hlbiBkcmF3aW5nIGZyZWUgaGFuZFxuICovXG5leHBvcnQgZnVuY3Rpb24gaGVhbHRoQmFyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyLCBjdWJlU2l6ZTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiMwMGE0MDBcIiwgXCIjRkYwMDAwXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSAtIChvYmplY3QuaGVpZ2h0ICsgMikgKiBjdWJlU2l6ZSAvIDIsXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3QuaGVhbHRoIC8gb2JqZWN0Lm1heEhlYWx0aCAqIG9iamVjdC53aWR0aCAqIGN1YmVTaXplLFxuICAgICAgICAgICAgaGVpZ2h0OiBjdWJlU2l6ZSAqIDMgLyA0LFxuICAgICAgICAgICAgc3dhdGNoOiAob2JqZWN0LmhlYWx0aCA+IG9iamVjdC5tYXhIZWFsdGggLyAzKSA/IDAgOiAxLFxuICAgICAgICB9LF0sXG4gICAgY3VzdG9tUmVuZGVyU2l6ZTogMSB9O1xufVxuIiwidmFyIHBsYXllclNwZWVkID0gMC4yO1xudmFyIHBsYXllckhlYWx0aCA9IDEwMDtcbnZhciBwbGF5ZXJXaWR0aCA9IDQ7XG52YXIgcGxheWVySGVpZ2h0ID0gNjtcbnZhciBwbGF5ZXJWaWV3UmFuZ2UgPSAxIC8gMjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIGNvbGxpc2lvbnMgPSByZXF1aXJlKFwiLi4vLi4vQ29sbGlzaW9uc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuT2JqZWN0VHlwZXMuUExBWUVSLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5QbGF5ZXIuSFVNQU4sXG4gICAgICAgIHg6IHBvc1gsXG4gICAgICAgIHk6IHBvc1ksXG4gICAgICAgIHZlbG9jaXR5WDogMCxcbiAgICAgICAgdmVsb2NpdHlZOiAwLFxuICAgICAgICBzcGVlZDogcGxheWVyU3BlZWQsXG4gICAgICAgIHdpZHRoOiBwbGF5ZXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBwbGF5ZXJIZWlnaHQsXG4gICAgICAgIGhpdGJveFdpZHRoOiBwbGF5ZXJXaWR0aCAtIDIsXG4gICAgICAgIGhpdGJveEhlaWdodDogcGxheWVySGVpZ2h0LFxuICAgICAgICBoZWFsdGg6IHBsYXllckhlYWx0aCxcbiAgICAgICAgbWF4SGVhbHRoOiBwbGF5ZXJIZWFsdGgsXG4gICAgICAgIGN1cnJlbnRFcXVpcG1lbnQ6IHVuZGVmaW5lZCxcbiAgICAgICAgZXF1aXBtZW50OiBbIF0sXG4gICAgICAgIGFiaWxpdGllczogWyBdLFxuICAgICAgICB2aWV3UmFuZ2U6IHBsYXllclZpZXdSYW5nZSxcbiAgICAgICAgZGVhdGhyYXR0bGU6IChvYnMsIHNlbGZSZWYpID0+IHtcbiAgICAgICAgICAgIHByZWZhYnMuZ2VuZXJhdGVOZXcob2JzLCBzZWxmUmVmLCBvYnNbc2VsZlJlZl0ueCwgb2JzW3NlbGZSZWZdLnksIHR5cGVzLk9iamVjdFR5cGVzLkdSQVZFU1RPTkUpO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGU6IChvYnMsIHNlbGZJZCwgZGVsdGEpID0+IHtcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBwbGF5ZXIgbW92ZW1lbnRcbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLnggKz0gb2JzW3NlbGZJZF0udmVsb2NpdHlYICogZGVsdGE7XG4gICAgICAgICAgICBvYnNbc2VsZklkXS55ICs9IG9ic1tzZWxmSWRdLnZlbG9jaXR5WSAqIGRlbHRhO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBjb2xsaXNpb25zIHdpdGggdGVycmFpbiBhbmQgcmVwb3NpdGlvbiBhY2NvcmRpbmdseVxuICAgICAgICAgICAgY29sbGlzaW9ucy5jaGVja0NvbGxpc2lvbnMoc2VsZklkLCBvYnMsIHByZWZhYnMucmVuZGVyU2l6ZSwgKHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYnNbc3JjSWRdICYmIGNvbGxpc2lvbklkICE9IHNyY0lkKXtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvYnNbY29sbGlzaW9uSWRdLnR5cGUpIHsgICAgICAgIC8vIFNob3VsZCBwbGF5ZXJzIGNvbGxpZGUgd2l0aCBvdGhlciBwbGF5ZXJzP1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5URVJSQUlOOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnMucHVzaEJhY2sob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQsIHByZWZhYnMucmVuZGVyU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbW91c2VEb3duOiAob2JzLCBtb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAob2JzW21vdXNlRXZlbnQuc291cmNlSWRdLmN1cnJlbnRFcXVpcG1lbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgb2JzW21vdXNlRXZlbnQuc291cmNlSWRdLmVxdWlwbWVudFtvYnNbbW91c2VFdmVudC5zb3VyY2VJZF0uY3VycmVudEVxdWlwbWVudF1cbiAgICAgICAgICAgICAgICAgICAgLnVzZShvYnMsIG1vdXNlRXZlbnQuc291cmNlSWQsIG1vdXNlRXZlbnQudGFyZ2V0WCwgbW91c2VFdmVudC50YXJnZXRZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25QbGF5ZXJJbnB1dDogKG9icywgc2VsZklkLCBwbGF5ZXJJbnB1dCkgPT4ge1xuICAgICAgICAgICAgcGxheWVyID0gb2JzW3NlbGZJZF07XG4gICAgICAgICAgICB2YXIgeERpciA9IDA7XG4gICAgICAgICAgICB2YXIgeURpciA9IDA7XG5cbiAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5sZWZ0KSB7XG4gICAgICAgICAgICAgICAgeERpciAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYXllcklucHV0LnJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgeERpciArPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGxheWVySW5wdXQudXApIHtcbiAgICAgICAgICAgICAgICB5RGlyIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGxheWVySW5wdXQuZG93bikge1xuICAgICAgICAgICAgICAgIHlEaXIgKz0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWVyLnZlbG9jaXR5WCA9IHhEaXIgKiBwbGF5ZXIuc3BlZWQ7XG4gICAgICAgICAgICBwbGF5ZXIudmVsb2NpdHlZID0geURpciAqIHBsYXllci5zcGVlZDtcbiAgICBcbiAgICAgICAgICAgIGlmIChvYnNbc2VsZklkXS5jdXJyZW50RXF1aXBtZW50ICE9IHVuZGVmaW5lZCAmJiBwbGF5ZXJJbnB1dC5jeWNsZUVxdWlwbWVudEZvcndhcmQgJiYgIXBsYXllcklucHV0LmN5Y2xlRXF1aXBtZW50QmFja3dhcmQpIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuZXF1aXBtZW50W3BsYXllci5jdXJyZW50RXF1aXBtZW50XS5vbkRlcXVpcChvYnMsIHNlbGZJZCk7XG4gICAgICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRFcXVpcG1lbnQgPSBwbGF5ZXIuY3VycmVudEVxdWlwbWVudCArIDEgPj0gcGxheWVyLmVxdWlwbWVudC5sZW5ndGggPyAwIDogcGxheWVyLmN1cnJlbnRFcXVpcG1lbnQgKyAxO1xuICAgICAgICAgICAgICAgIHBsYXllci5lcXVpcG1lbnRbcGxheWVyLmN1cnJlbnRFcXVpcG1lbnRdLm9uRXF1aXAob2JzLCBzZWxmSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdLmN1cnJlbnRFcXVpcG1lbnQgIT0gdW5kZWZpbmVkICYmIHBsYXllcklucHV0LmN5Y2xlRXF1aXBtZW50QmFja3dhcmQgJiYgIXBsYXllcklucHV0LmN5Y2xlRXF1aXBtZW50Rm9yd2FyZCkge1xuICAgICAgICAgICAgICAgIHBsYXllci5lcXVpcG1lbnRbcGxheWVyLmN1cnJlbnRFcXVpcG1lbnRdLm9uRGVxdWlwKG9icywgc2VsZklkKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuY3VycmVudEVxdWlwbWVudCA9IHBsYXllci5jdXJyZW50RXF1aXBtZW50IC0gMSA8IDAgPyBwbGF5ZXIuZXF1aXBtZW50Lmxlbmd0aCAtIDEgOiBwbGF5ZXIuY3VycmVudEVxdWlwbWVudCAtIDE7XG4gICAgICAgICAgICAgICAgcGxheWVyLmVxdWlwbWVudFtwbGF5ZXIuY3VycmVudEVxdWlwbWVudF0ub25FcXVpcChvYnMsIHNlbGZJZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5hYmlsaXR5MSAmJiBvYnNbc2VsZklkXS5hYmlsaXRpZXNbMF0pIHtcbiAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS5hYmlsaXRpZXNbMF0uY2FzdChvYnMsIHNlbGZJZCwgMCwgcGxheWVySW5wdXQudGFyZ2V0WCwgcGxheWVySW5wdXQudGFyZ2V0WSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGxheWVySW5wdXQuYWJpbGl0eTIgJiYgb2JzW3NlbGZJZF0uYWJpbGl0aWVzWzFdKSB7XG4gICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0uYWJpbGl0aWVzWzFdLmNhc3Qob2JzLCBzZWxmSWQsIDEsIHBsYXllcklucHV0LnRhcmdldFgsIHBsYXllcklucHV0LnRhcmdldFkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYXllcklucHV0LmFiaWxpdHkzICYmIG9ic1tzZWxmSWRdLmFiaWxpdGllc1syXSkge1xuICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLmFiaWxpdGllc1syXS5jYXN0KG9icywgc2VsZklkLCAyLCBwbGF5ZXJJbnB1dC50YXJnZXRYLCBwbGF5ZXJJbnB1dC50YXJnZXRZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5hYmlsaXR5NCAmJiBvYnNbc2VsZklkXS5hYmlsaXRpZXNbM10pIHtcbiAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS5hYmlsaXRpZXNbM10uY2FzdChvYnMsIHNlbGZJZCwgMywgcGxheWVySW5wdXQudGFyZ2V0WCwgcGxheWVySW5wdXQudGFyZ2V0WSk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBpZiAocGxheWVySW5wdXQucGlja3VwKSB7XG4gICAgICAgICAgICAgICAgY29sbGlzaW9ucy5jaGVja0NvbGxpc2lvbnMoc2VsZklkLCBvYnMsIHByZWZhYnMucmVuZGVyU2l6ZSwgKHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JzW3NyY0lkXSAmJiBjb2xsaXNpb25JZCAhPSBzcmNJZCAmJiBvYnNbY29sbGlzaW9uSWRdLnR5cGUgPT0gdHlwZXMuT2JqZWN0VHlwZXMuSU5URVJBQ1RBQkxFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNbY29sbGlzaW9uSWRdLm9uSW50ZXJhY3Qob2JzLCBjb2xsaXNpb25JZCwgc3JjSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGhlYWw6IChvYnMsIHNlbGZJZCwgYW1vdW50KSA9PiB7XG4gICAgICAgICAgICBvYnNbc2VsZklkXS5oZWFsdGggKyBhbW91bnQgPj0gb2JzW3NlbGZJZF0ubWF4SGVhbHRoXG4gICAgICAgICAgICAgICAgPyBvYnNbc2VsZklkXS5oZWFsdGggPSBvYnNbc2VsZklkXS5tYXhIZWFsdGhcbiAgICAgICAgICAgICAgICA6IG9ic1tzZWxmSWRdLmhlYWx0aCArPSBhbW91bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGRhbWFnZTogKG9icywgc2VsZklkLCBhbW91bnQpID0+IHtcbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLmhlYWx0aCAtPSBhbW91bnQ7XG5cbiAgICAgICAgICAgIGlmIChvYnNbc2VsZklkXS5oZWFsdGggPD0gMCl7XG4gICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0uZGVhdGhyYXR0bGUob2JzLCBzZWxmSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgcGxheWVyIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgcGxheWVyIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlciBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI2FiYWI5YVwiLCBcIiM3NzUwNTBcIiwgXCIjQUFBQUFBXCIsIFwiIzAwMDA4MFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMixcbiAgICAgICAgICAgIHdpZHRoOiA0LFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDMsXG4gICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDQsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfV0sXG4gICAgfVxufVxuIiwidmFyIHR5cGVzID0gcmVxdWlyZShcIi4uL09iamVjdFR5cGVzXCIpO1xudmFyIGNvbGxpc2lvbnMgPSByZXF1aXJlKFwiLi4vQ29sbGlzaW9uc1wiKTtcblxuLy8gLS0tLS0gUHJlZmFicyAtLS0tLSAvL1xudmFyIF9wbGF5ZXIgPSByZXF1aXJlKFwiLi9QbGF5ZXIvX1BsYXllclwiKTtcbnZhciBnb2QgPSByZXF1aXJlKFwiLi9QbGF5ZXIvR29kXCIpO1xudmFyIGZpcmVtYWdlID0gcmVxdWlyZShcIi4vUGxheWVyL0ZpcmVNYWdlXCIpO1xuXG52YXIgX2dyYXZlc3RvbmUgPSByZXF1aXJlKFwiLi9HcmF2ZXN0b25lL19HcmF2ZXN0b25lXCIpO1xuXG52YXIgX3Byb2plY3RpbGUgPSByZXF1aXJlKFwiLi9Qcm9qZWN0aWxlL19Qcm9qZWN0aWxlXCIpO1xudmFyIGZpcmVib2x0UHJvamVjdGlsZSA9IHJlcXVpcmUoXCIuL1Byb2plY3RpbGUvRmlyZWJvbHRQcm9qZWN0aWxlXCIpO1xuXG52YXIgX3RlcnJhaW4gPSByZXF1aXJlKFwiLi9UZXJyYWluL19UZXJyYWluXCIpO1xudmFyIHRyZWUgPSByZXF1aXJlKFwiLi9UZXJyYWluL1RyZWVcIik7XG52YXIgd2FsbEhvcml6ID0gcmVxdWlyZShcIi4vVGVycmFpbi9XYWxsSG9yaXpcIik7XG5cbnZhciBfaW50ZXJhY3RhYmxlID0gcmVxdWlyZShcIi4vSW50ZXJhY3RhYmxlL19JbnRlcmFjdGFibGVcIik7XG52YXIgaGVhbHRoUGlja3VwID0gcmVxdWlyZShcIi4vSW50ZXJhY3RhYmxlL0hlYWx0aFBpY2t1cFwiKTtcbnZhciBjYXJFbnRlciA9IHJlcXVpcmUoXCIuL0ludGVyYWN0YWJsZS9DYXJFbnRlclwiKTtcbnZhciBwbGF5ZXJUeXBlQ2hhbmdlciA9IHJlcXVpcmUoXCIuL0ludGVyYWN0YWJsZS9QbGF5ZXJUeXBlQ2hhbmdlclwiKTtcblxudmFyIF90cmlnZ2VyID0gcmVxdWlyZShcIi4vVHJpZ2dlci9fVHJpZ2dlclwiKTtcbnZhciBzcGlrZVRyYXAgPSByZXF1aXJlKFwiLi9UcmlnZ2VyL1NwaWtlVHJhcFwiKTtcblxudmFyIF92ZWhpY2xlID0gcmVxdWlyZShcIi4vVmVoaWNsZS9fVmVoaWNsZVwiKTtcbnZhciBjYXIgPSByZXF1aXJlKFwiLi9WZWhpY2xlL0NhclwiKTtcblxudmFyIGJsYXN0ZXIgPSByZXF1aXJlKFwiLi9FcXVpcG1lbnQvQmxhc3RlclwiKTtcbnZhciBzY2FubmVyID0gcmVxdWlyZShcIi4vRXF1aXBtZW50L1NjYW5uZXJcIik7XG52YXIgYnVpbGRlciA9IHJlcXVpcmUoXCIuL0VxdWlwbWVudC9CdWlsZGVyXCIpO1xudmFyIGJpbm9jdWxhcnMgPSByZXF1aXJlKFwiLi9FcXVpcG1lbnQvQmlub2N1bGFyc1wiKTtcblxudmFyIGZpcmVib2x0ID0gcmVxdWlyZShcIi4vQWJpbGl0aWVzL0ZpcmVib2x0XCIpO1xuXG4vLyBFeHBvcnQgcmVuZGVyIHNpemVcbnZhciByZW5kZXJTaXplID0gNDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcmVuZGVyU2l6ZTogcmVuZGVyU2l6ZSxcbiAgICAvLyBHZW5lcmF0ZSBhIG5ldyB0ZXJyYWluIG9iamVjdFxuICAgIGdlbmVyYXRlTmV3OiAob2JzLCBzcmMsIHBvc1gsIHBvc1ksIHR5cGUsIHN1YnR5cGUsIHBhcmFtcyA9IHsgfSkgPT4ge1xuICAgICAgICB2YXIgbmV3T2JqO1xuICAgICAgICBcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUjpcbiAgICAgICAgICAgICAgICBuZXdPYmogPSBfcGxheWVyLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5QbGF5ZXIuR09EOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gZ29kLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUGxheWVyLkZJUkVfTUFHRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGZpcmVtYWdlLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9ic1tzcmNdID0gbmV3T2JqO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuR1JBVkVTVE9ORTpcbiAgICAgICAgICAgICAgICBuZXdPYmogPSBfZ3JhdmVzdG9uZS5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSk7XG4gICAgICAgICAgICAgICAgb2JzW3NyY10gPSBuZXdPYmo7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QUk9KRUNUSUxFOlxuICAgICAgICAgICAgICAgIC8vIEdlbmVyYXRlIHVuaXF1ZSBJZCBmb3IgbmV3IHByb2plY3RpbGVcbiAgICAgICAgICAgICAgICB2YXIgbmV3SWQgPSBzcmMuY29uY2F0KFwiOlwiICsgdHlwZSArIFwiOlwiICsgc3VidHlwZSArIFwiOlwiLCBwb3NYLCBcIjpcIiwgcG9zWSk7XG4gICAgICAgICAgICAgICAgdmFyIGR1cCA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG9ic1tuZXdJZC5jb25jYXQoXCI6XCIgKyBkdXApXSl7XG4gICAgICAgICAgICAgICAgICAgIGR1cCsrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5ld09iaiA9IF9wcm9qZWN0aWxlLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Qcm9qZWN0aWxlLkJBU0lDX1BST0pFQ1RJTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNbbmV3SWQuY29uY2F0KFwiOlwiICsgZHVwKV0gPSBuZXdPYmo7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUHJvamVjdGlsZS5GSVJFQk9MVF9QUk9KRUNUSUxFOlxuICAgICAgICAgICAgICAgICAgICAgICAgb2JzW25ld0lkLmNvbmNhdChcIjpcIiArIGR1cCldID0gZmlyZWJvbHRQcm9qZWN0aWxlLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTjpcbiAgICAgICAgICAgICAgICBuZXdPYmogPSBfdGVycmFpbi5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVGVycmFpbi5UUkVFOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gdHJlZS5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRlcnJhaW4uV0FMTF9IT1JJWjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IHdhbGxIb3Jpei5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuSU5URVJBQ1RBQkxFOlxuICAgICAgICAgICAgICAgIG5ld09iaiA9IF9pbnRlcmFjdGFibGUuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkludGVyYWN0YWJsZS5IRUFMVEhfUElDS1VQOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gaGVhbHRoUGlja3VwLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuSW50ZXJhY3RhYmxlLkNBUl9FTlRFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGNhckVudGVyLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNbc3JjICsgXCI6XCIgKyB0eXBlICsgXCI6XCIgKyBzdWJ0eXBlXSA9IG5ld09iajtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5JbnRlcmFjdGFibGUuUExBWUVSX1RZUEVfQ0hBTkdFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IHBsYXllclR5cGVDaGFuZ2VyLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmosIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRSSUdHRVI6XG4gICAgICAgICAgICAgICAgbmV3T2JqID0gX3RyaWdnZXIuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRyaWdnZXIuU1BJS0VfVFJBUDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IHNwaWtlVHJhcC5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVkVISUNMRTpcbiAgICAgICAgICAgICAgICBuZXdPYmogPSBfdmVoaWNsZS5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVmVoaWNsZS5DQVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmogPSBjYXIuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIG5ld09iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPOiBDb25zaWRlciByZW1vdmluZyB0aGlzP1xuICAgICAgICBpZiAoIW5ld09iaikge1xuICAgICAgICAgICAgbmV3T2JqID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVzLk9iamVjdFR5cGVzLlRFUlJBSU4sXG4gICAgICAgICAgICAgICAgc3VidHlwZTogc3VidHlwZSxcbiAgICAgICAgICAgICAgICB4OiBwb3NYLFxuICAgICAgICAgICAgICAgIHk6IHBvc1ksXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2LFxuICAgICAgICAgICAgICAgIGhpdGJveFdpZHRoOiA2LFxuICAgICAgICAgICAgICAgIGhpdGJveEhlaWdodDogNixcbiAgICAgICAgICAgICAgICBoZWFsdGg6IDEsXG4gICAgICAgICAgICAgICAgbWF4SGVhbHRoOiAxLFxuICAgICAgICAgICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4geyB9LFxuICAgICAgICAgICAgICAgIGRhbWFnZTogKG9icywgc2VsZklkLCBhbW91bnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0uaGVhbHRoIC09IGFtb3VudDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0uaGVhbHRoIDw9IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0uZGVhdGhyYXR0bGUob2JzLCBzZWxmSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWF0aHJhdHRsZTogKG9icywgc2VsZklkKSA9PiB7IH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb2JzW3NyYyArIFwiOlwiICsgdHlwZSArIFwiOlwiICsgc3VidHlwZSArIFwiOlwiICsgcG9zWCArIFwiOlwiICsgcG9zWV0gPSBuZXdPYmo7XG4gICAgfSxcbiAgICBuZXdFcXVpcG1lbnQ6IChvYnMsIHR5cGUsIHBhcmFtcyA9IHsgfSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuRXF1aXBtZW50VHlwZXMuQkxBU1RFUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gYmxhc3Rlci5nZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyk7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkVxdWlwbWVudFR5cGVzLlNDQU5ORVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjYW5uZXIuZ2VuZXJhdGVOZXcob2JzLCBwYXJhbXMpO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CVUlMREVSOlxuICAgICAgICAgICAgICAgIHJldHVybiBidWlsZGVyLmdlbmVyYXRlTmV3KG9icywgcGFyYW1zKTtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuRXF1aXBtZW50VHlwZXMuQklOT0NVTEFSUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gYmlub2N1bGFycy5nZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG5ld0FiaWxpdHk6IChvYnMsIHR5cGUsIHBhcmFtcyA9IHsgfSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuQWJpbGl0aWVzLkZJUkVCT0xUOlxuICAgICAgICAgICAgICAgIHJldHVybiBmaXJlYm9sdC5nZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyk7XG4gICAgICAgIH1cbiAgICB9LFxufSIsInZhciBmaXJlYm9sdFNwZWVkID0gMC4zNTtcbnZhciBmaXJlYm9sdFdpZHRoID0gMztcbnZhciBmaXJlYm9sdEhlaWdodCA9IDM7XG52YXIgZmlyZWJvbHRIaXRCb3hSYWRpdXMgPSAyO1xudmFyIGZpcmVib2x0RGFtYWdlID0gMzQ7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuUHJvamVjdGlsZS5GSVJFQk9MVF9QUk9KRUNUSUxFLFxuICAgICAgICB2ZWxvY2l0eVg6IE1hdGguY29zKGJhc2UuYW5nbGUpICogZmlyZWJvbHRTcGVlZCxcbiAgICAgICAgdmVsb2NpdHlZOiBNYXRoLnNpbihiYXNlLmFuZ2xlKSAqIGZpcmVib2x0U3BlZWQsXG4gICAgICAgIHdpZHRoOiBmaXJlYm9sdFdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGZpcmVib2x0SGVpZ2h0LFxuICAgICAgICBoaXRib3hXaWR0aDogZmlyZWJvbHRIaXRCb3hSYWRpdXMsXG4gICAgICAgIGhpdGJveEhlaWdodDogZmlyZWJvbHRIaXRCb3hSYWRpdXMsXG4gICAgICAgIGRhbWFnZTogZmlyZWJvbHREYW1hZ2UsICAgICAgICAgICAgIC8vIFRPRE86IEdldCBmaXJlYm9sdCBkYW1hZ2UgZnJvbSBmaXJlbWFnZSdzIGZpcmVjb3VudGVyc1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBmaXJlYm9sdCBwcm9qZWN0aWxlXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBmaXJlYm9sdCBwcm9qZWN0aWxlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpcmVib2x0UHJvamVjdGlsZU1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjQ0Q1QzVDXCIsIFwiI0ZGOEMwMFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLjUsXG4gICAgICAgICAgICBjZWxsWTogMC41LFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sXVxuICAgIH1cbn1cbiIsInZhciBwcm9qZWN0aWxlV2lkdGggPSAyO1xudmFyIHByb2plY3RpbGVIZWlnaHQgPSAwLjU7XG52YXIgcHJvamVjdGlsZUhpdEJveFJhZGl1cyA9IDEuNTtcbnZhciBiYXNlUHJvamVjdGlsZURhbWFnZSA9IDEwO1xudmFyIHByb2plY3RpbGVTcGVlZCA9IDAuODsgXG52YXIgbWF4UHJvakRpc3QgPSAxNjAwO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgY29sbGlzaW9ucyA9IHJlcXVpcmUoXCIuLi8uLi9Db2xsaXNpb25zXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG5cbiAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKFxuICAgICAgICBwb3NZIC0gb2JzW3NyY10ueSxcbiAgICAgICAgcG9zWCAtIG9ic1tzcmNdLngpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuT2JqZWN0VHlwZXMuUFJPSkVDVElMRSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuUHJvamVjdGlsZS5CQVNJQ19QUk9KRUNUSUxFLFxuICAgICAgICBzb3VyY2U6IHNyYyxcbiAgICAgICAgeDogb2JzW3NyY10ueCxcbiAgICAgICAgeTogb2JzW3NyY10ueSxcbiAgICAgICAgYW5nbGU6IGFuZ2xlLFxuICAgICAgICB2ZWxvY2l0eVg6IE1hdGguY29zKGFuZ2xlKSAqIHByb2plY3RpbGVTcGVlZCxcbiAgICAgICAgdmVsb2NpdHlZOiBNYXRoLnNpbihhbmdsZSkgKiBwcm9qZWN0aWxlU3BlZWQsXG4gICAgICAgIHdpZHRoOiBwcm9qZWN0aWxlV2lkdGgsXG4gICAgICAgIGhlaWdodDogcHJvamVjdGlsZUhlaWdodCxcbiAgICAgICAgaGl0Ym94V2lkdGg6IHByb2plY3RpbGVIaXRCb3hSYWRpdXMsXG4gICAgICAgIGhpdGJveEhlaWdodDogcHJvamVjdGlsZUhpdEJveFJhZGl1cyxcbiAgICAgICAgZmFjaW5nOiBhbmdsZSAqIDE4MCAvIE1hdGguUEksXG4gICAgICAgIGRpc3Q6IDAsXG4gICAgICAgIG1heFByb2pEaXN0OiBtYXhQcm9qRGlzdCxcbiAgICAgICAgZGFtYWdlOiBiYXNlUHJvamVjdGlsZURhbWFnZSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgcHJvamVjdGlsZSBtb3ZlbWVudFxuICAgICAgICAgICAgb2JzW3NlbGZJZF0ueCArPSBvYnNbc2VsZklkXS52ZWxvY2l0eVggKiBkZWx0YTtcbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLnkgKz0gb2JzW3NlbGZJZF0udmVsb2NpdHlZICogZGVsdGE7XG4gICAgICAgICAgICBvYnNbc2VsZklkXS5kaXN0ICs9IE1hdGguc3FydChcbiAgICAgICAgICAgICAgICBNYXRoLnBvdyhvYnNbc2VsZklkXS52ZWxvY2l0eVggKiBkZWx0YSwgMikgK1xuICAgICAgICAgICAgICAgIE1hdGgucG93KG9ic1tzZWxmSWRdLnZlbG9jaXR5WSAqIGRlbHRhLCAyKSk7XG5cbiAgICAgICAgICAgIC8vIFRPRE86IENoYW5nZSBwcm9qZWN0aWxlIGNvbGxpc2lvbnMgdG8gcmF5IGNhc3RcbiAgICAgICAgICAgIGNvbGxpc2lvbnMuY2hlY2tDb2xsaXNpb25zKHNlbGZJZCwgb2JzLCBwcmVmYWJzLnJlbmRlclNpemUsIChzcmNJZCwgY29sbGlzaW9uSWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob2JzW3NyY0lkXSAmJiBjb2xsaXNpb25JZCAhPSBzcmNJZCAmJiBjb2xsaXNpb25JZCAhPSBvYnNbc3JjSWRdLnNvdXJjZSl7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob2JzW2NvbGxpc2lvbklkXS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuR1JBVkVTVE9ORTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVkVISUNMRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JzW3NyY0lkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JzW2NvbGxpc2lvbklkXSAmJiBvYnNbY29sbGlzaW9uSWRdLmRhbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzW2NvbGxpc2lvbklkXS5kYW1hZ2Uob2JzLCBjb2xsaXNpb25JZCwgb2JzW3NyY0lkXS5kYW1hZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbc3JjSWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG9ic1tpZF0pIHtcbiAgICAgICAgICAgICAgICBpZiAob2JzW2lkXS5kaXN0ID4gb2JzW2lkXS5tYXhQcm9qRGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb2JzW2lkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGJhc2ljIHByb2plY3RpbGVcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHByb2plY3RpbGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvamVjdGlsZU1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICAvLyBSZW1vdmUgY29tbWVudHMgZm9yIHJhaW5ib3cgYnVsbGV0c1xuICAgICAgICAvLyBwYWxldHRlOiBbXCIjRkY2NjY2XCIsIFwiIzY2RkY2NlwiLCBcIiM2NjY2RkZcIiwgXCIjRkZGRjY2XCIsIFwiI0ZGNjZGRlwiLCBcIiM2NkZGRkZcIl0sXG4gICAgICAgIHBhbGV0dGU6IFtcIiMyMjIyMjJcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgLy8gc3dhdGNoOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KVxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH1dXG4gICAgfVxufVxuIiwidmFyIHRyZWVXaWR0aCA9IDQ7XG52YXIgdHJlZUhlaWdodCA9IDg7XG52YXIgdHJlZUhpdGJveFdpZHRoID0gNDtcbnZhciB0cmVlSGl0Ym94SGVpZ2h0ID0gODtcbnZhciB0cmVlSGVhbHRoID0gMjAwO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgYmFzZSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5UZXJyYWluLlRSRUUsXG4gICAgICAgIHdpZHRoOiB0cmVlV2lkdGgsXG4gICAgICAgIGhlaWdodDogdHJlZUhlaWdodCxcbiAgICAgICAgaGl0Ym94V2lkdGg6IHRyZWVIaXRib3hXaWR0aCxcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiB0cmVlSGl0Ym94SGVpZ2h0LFxuICAgICAgICBoZWFsdGg6IHRyZWVIZWFsdGgsXG4gICAgICAgIG1heEhlYWx0aDogdHJlZUhlYWx0aCxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIHRyZWUgb2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSB0cmVlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlciBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmVlVHJ1bmtNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzk5MzMwMFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdLFxuICAgIH07XG59XG5cbi8vIFRPRE86IENoYW5nZSBsZWFmIHJlbmRlcmluZyBkZXBlbmRpbmcgb24gdHJlZSBoZWFsdGhcbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgdHJlZSBvYmplY3QncyBsZWF2ZXNcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHRyZWUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyZWVMZWFmTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiMyMjg4MjJcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAtMixcbiAgICAgICAgICAgIGNlbGxZOiAtNCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggKiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IC0xMCxcbiAgICAgICAgICAgIHdpZHRoOiA0LFxuICAgICAgICAgICAgaGVpZ2h0OiA3LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sXSxcbiAgICB9O1xufVxuIiwidmFyIHdhbGxIb3JpeldpZHRoID0gMjA7XG52YXIgd2FsbEhvcml6SGVpZ2h0ID0gMTI7XG52YXIgd2FsbEhvcml6SGl0Ym94V2lkdGggPSAyMDtcbnZhciB3YWxsSG9yaXpIaXRib3hIZWlnaHQgPSAyO1xudmFyIHdhbGxIb3JpekhlYWx0aCA9IDI1MDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuVGVycmFpbi5XQUxMX0hPUklaLFxuICAgICAgICB3aWR0aDogd2FsbEhvcml6V2lkdGgsXG4gICAgICAgIGhlaWdodDogd2FsbEhvcml6SGVpZ2h0LFxuICAgICAgICBoaXRib3hXaWR0aDogd2FsbEhvcml6SGl0Ym94V2lkdGgsXG4gICAgICAgIGhpdGJveEhlaWdodDogd2FsbEhvcml6SGl0Ym94SGVpZ2h0LFxuICAgICAgICBoZWFsdGg6IHdhbGxIb3JpekhlYWx0aCxcbiAgICAgICAgbWF4SGVhbHRoOiB3YWxsSG9yaXpIZWFsdGgsXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBob3Jpem9udGFsIHdhbGwgb2JqZWN0IGJhc2VcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGhvcml6b250YWwgd2FsbCBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gd2FsbEhvcml6QmFzZU1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjODg4ODg4XCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC5oaXRib3hXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGl0Ym94SGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC5oaXRib3hXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhpdGJveEhlaWdodCxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9XVxuICAgIH1cbn1cblxuLy8gVE9ETzogQWRkIG1vcmUgZGV0YWlsIHRvIHdhbGwgKGNvYmJsZXN0b25lIHN0eWxlKSwgY2hhbmdlIGNvbG9yaW5nIGRlcGVuZGluZyBvbiBvYmplY3QgaGVhbHRoXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGhvcml6b250YWwgd2FsbCBvYmplY3QgY292ZXJcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGhvcml6b250YWwgd2FsbCBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gd2FsbEhvcml6Q292ZXJNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI0EzQTNDMkJCXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAtb2JqZWN0LmhlaWdodCAvIDIsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH1dXG4gICAgfVxufVxuIiwiZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5PYmplY3RUeXBlcy5URVJSQUlOLFxuICAgICAgICB4OiBwb3NYLFxuICAgICAgICB5OiBwb3NZLFxuICAgICAgICB1cGRhdGU6IChvYnMsIHNlbGZJZCwgZGVsdGEpID0+IHsgfSxcbiAgICAgICAgZGFtYWdlOiAob2JzLCBzZWxmSWQsIGFtb3VudCkgPT4ge1xuICAgICAgICAgICAgb2JzW3NlbGZJZF0uaGVhbHRoIC09IGFtb3VudDtcblxuICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdLmhlYWx0aCA8PSAwKXtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JzW3NlbGZJZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBkZWZhdWx0IHRlcnJhaW4gb2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSB0ZXJyYWluIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0VGVycmFpbk1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6bWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNGRkIzRkZcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH1dXG4gICAgfVxufVxuIiwidmFyIHNwaWtlVHJhcFdpZHRoID0gNTtcbnZhciBzcGlrZVRyYXBIZWlnaHQgPSA1O1xudmFyIHNwaWtlVHJhcEhpdGJveFdpZHRoID0gNTtcbnZhciBzcGlrZVRyYXBIaXRib3hIZWlnaHQgPSA1O1xudmFyIHNwaWtlVHJhcERhbWFnZSA9IDIwO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgYmFzZSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5UcmlnZ2VyLlNQSUtFX1RSQVAsXG4gICAgICAgIHdpZHRoOiBzcGlrZVRyYXBXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBzcGlrZVRyYXBIZWlnaHQsXG4gICAgICAgIGhpdGJveFdpZHRoOiBzcGlrZVRyYXBIaXRib3hXaWR0aCxcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiBzcGlrZVRyYXBIaXRib3hIZWlnaHQsXG4gICAgICAgIG9uVHJpZ2dlcjogKG9icywgc2VsZlJlZiwgdHJpZ2dlcklkKSA9PiB7XG4gICAgICAgICAgICBpZiAob2JzW3RyaWdnZXJJZF0gJiYgKFxuICAgICAgICAgICAgICAgIG9ic1t0cmlnZ2VySWRdLnR5cGUgPT0gdHlwZXMuT2JqZWN0VHlwZXMuUExBWUVSIHx8XG4gICAgICAgICAgICAgICAgb2JzW3RyaWdnZXJJZF0udHlwZSA9PSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFXG4gICAgICAgICAgICApKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ic1t0cmlnZ2VySWRdLmRhbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICBvYnNbdHJpZ2dlcklkXS5kYW1hZ2Uob2JzLCB0cmlnZ2VySWQsIHNwaWtlVHJhcERhbWFnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbc2VsZlJlZl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBzcGlrZSB0cmFwIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgc3Bpa2UgdHJhcCBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3Bpa2VUcmFwTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiM4MDgwODBcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMyxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAyLFxuICAgICAgICAgICAgY2VsbFk6IDMsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogNCxcbiAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdXG4gICAgfTtcbn1cbiIsImZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uLy4uL0NvbGxpc2lvbnNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLk9iamVjdFR5cGVzLlRSSUdHRVIsXG4gICAgICAgIHg6IHBvc1gsXG4gICAgICAgIHk6IHBvc1ksXG4gICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4ge1xuICAgICAgICAgICAgY29sbGlzaW9ucy5jaGVja0NvbGxpc2lvbnMoc2VsZklkLCBvYnMsIHByZWZhYnMucmVuZGVyU2l6ZSwgKHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYnNbc3JjSWRdICYmIGNvbGxpc2lvbklkICE9IHNyY0lkKXtcbiAgICAgICAgICAgICAgICAgICAgb2JzW3NyY0lkXS5vblRyaWdnZXIob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsInZhciBjYXJTcGVlZCA9IDAuMzU7XG52YXIgY2FyV2lkdGggPSAxMDtcbnZhciBjYXJIZWlnaHQgPSAxNjtcbnZhciBjYXJIaXRib3hXaWR0aCA9IDEwO1xudmFyIGNhckhpdGJveEhlaWdodCA9IDE2O1xudmFyIGNhckhlYWx0aCA9IDIwMDtcbnZhciBjYXJWaWV3UmFuZ2UgPSAxIC8gMztcbnZhciBjYXJDb2xvcnMgPSBbXG4gICAgXCIjREMxNDNDXCIsICAgICAgLy8gQ3JpbXNvblxuICAgIFwiIzAwNjQwMFwiLCAgICAgIC8vIERhcmsgR3JlZW5cbiAgICBcIiNGRjY5QjRcIiwgICAgICAvLyBIb3QgUGlua1xuICAgIFwiI0ZGRDcwMFwiLCAgICAgIC8vIEdvbGRcbiAgICBcIiM3MDgwOTBcIiwgICAgICAvLyBTbGF0ZSBHcmF5XG4gICAgXCIjMDBCRkZGXCIsICAgICAgLy8gRGVlcCBTa3kgQmx1ZVxuICAgIFwiIzAwMDBDRFwiLCAgICAgIC8vIE1lZGl1bSBCbHVlXG4gICAgXCIjRkY0NTAwXCIsICAgICAgLy8gT3JhbmdlIFJlZFxuICAgIFwiIzhCMDA4QlwiLCAgICAgIC8vIERhcmsgTWFnZW50YVxuXTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICB2YXIgY2FyQ29sb3IgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoY2FyQ29sb3JzLmxlbmd0aCkpO1xuICAgIHZhciB2ZWhpY2xlSWQgPSBzcmMgKyBcIjpcIiArIHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEUgKyBcIjpcIiArIHR5cGVzLlZlaGljbGUuQ0FSICsgXCI6XCIgKyBwb3NYICsgXCI6XCIgKyBwb3NZO1xuICAgIFxuICAgIHByZWZhYnMuZ2VuZXJhdGVOZXcob2JzLCB2ZWhpY2xlSWQsIHBvc1gsIHBvc1ksIHR5cGVzLk9iamVjdFR5cGVzLklOVEVSQUNUQUJMRSwgdHlwZXMuSW50ZXJhY3RhYmxlLkNBUl9FTlRFUik7XG5cbiAgICBvYnNbdmVoaWNsZUlkXSA9ICB7XG4gICAgICAgIC4uLmJhc2UsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLlZlaGljbGUuQ0FSLFxuICAgICAgICBzcGVlZDogY2FyU3BlZWQsXG4gICAgICAgIHdpZHRoOiBjYXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjYXJIZWlnaHQsXG4gICAgICAgIGhpdGJveFdpZHRoOiBjYXJIaXRib3hXaWR0aCxcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiBjYXJIaXRib3hIZWlnaHQsXG4gICAgICAgIGhlYWx0aDogY2FySGVhbHRoLFxuICAgICAgICBtYXhIZWFsdGg6IGNhckhlYWx0aCxcbiAgICAgICAgY2FyQ29sb3I6IGNhckNvbG9yc1tjYXJDb2xvcl0sXG4gICAgICAgIHZpZXdSYW5nZTogY2FyVmlld1JhbmdlLFxuICAgICAgICBpbnRlcmFjdGFibGVJZDogdmVoaWNsZUlkICsgXCI6XCIgKyB0eXBlcy5PYmplY3RUeXBlcy5JTlRFUkFDVEFCTEUgKyBcIjpcIiArIHR5cGVzLkludGVyYWN0YWJsZS5DQVJfRU5URVIsXG4gICAgfTtcbiAgICByZXR1cm47XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXJNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgdmFyIGhpZ2hsaWdodFI6IG51bWJlciA9IHBhcnNlSW50KFwiMHhcIiArIG9iamVjdC5jYXJDb2xvci5zdWJzdHJpbmcoMSwgMyksIDE2KSArIDB4MzM7XG4gICAgdmFyIGhpZ2hsaWdodEc6IG51bWJlciA9IHBhcnNlSW50KFwiMHhcIiArIG9iamVjdC5jYXJDb2xvci5zdWJzdHJpbmcoMywgNSksIDE2KSArIDB4MzM7XG4gICAgdmFyIGhpZ2hsaWdodEI6IG51bWJlciA9IHBhcnNlSW50KFwiMHhcIiArIG9iamVjdC5jYXJDb2xvci5zdWJzdHJpbmcoNSwgNyksIDE2KSArIDB4MzM7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzMzMzMzM1wiXVxuICAgICAgICAgICAgLmNvbmNhdChvYmplY3QuY2FyQ29sb3IpXG4gICAgICAgICAgICAuY29uY2F0KFwiI1wiICtcbiAgICAgICAgICAgICAgICAoaGlnaGxpZ2h0UiA+IDB4RkYgPyAweEZGIDogaGlnaGxpZ2h0UikudG9TdHJpbmcoMTYpICtcbiAgICAgICAgICAgICAgICAoaGlnaGxpZ2h0RyA+IDB4RkYgPyAweEZGIDogaGlnaGxpZ2h0RykudG9TdHJpbmcoMTYpICtcbiAgICAgICAgICAgICAgICAoaGlnaGxpZ2h0QiA+IDB4RkYgPyAweEZGIDogaGlnaGxpZ2h0QikudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICApLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogNSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDUsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggLSAyLFxuICAgICAgICAgICAgaGVpZ2h0OiA2LFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDksXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiA2LFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDksXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoIC0gMixcbiAgICAgICAgICAgIGhlaWdodDogNyxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogMixcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggLSA0LFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDEwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogMTAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoIC0gNCxcbiAgICAgICAgICAgIGhlaWdodDogNCxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMyxcbiAgICAgICAgICAgIGNlbGxZOiA2LFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDYsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IC0xLFxuICAgICAgICAgICAgY2VsbFk6IDYsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgY2VsbFk6IDYsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LF1cbiAgICB9O1xufVxuIiwidmFyIGRlZmF1bHRWZWhpY2xlVmlld1JhbmdlID0gMSAvIDQ7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uLy4uL0NvbGxpc2lvbnNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEUsXG4gICAgICAgIHg6IHBvc1gsXG4gICAgICAgIHk6IHBvc1ksXG4gICAgICAgIHZlbG9jaXR5WDogMCxcbiAgICAgICAgdmVsb2NpdHlZOiAwLFxuICAgICAgICBmYWNpbmc6IDAsXG4gICAgICAgIGN1cnJlbnRFcXVpcG1lbnQ6IHVuZGVmaW5lZCxcbiAgICAgICAgZXF1aXBtZW50OiBbIF0sXG4gICAgICAgIHZpZXdSYW5nZTogZGVmYXVsdFZlaGljbGVWaWV3UmFuZ2UsXG4gICAgICAgIHJpZGVyOiB1bmRlZmluZWQsXG4gICAgICAgIGRlYXRocmF0dGxlOiAob2JzLCBzZWxmSWQpID0+IHtcbiAgICAgICAgICAgIGlmIChvYnNbc2VsZklkXS5yaWRlcikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbb2JzW3NlbGZJZF0uaW50ZXJhY3RhYmxlSWRdO1xuICAgICAgICAgICAgICAgIHZhciByaWRlciA9IG9ic1tzZWxmSWRdLnJpZGVyO1xuXG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgdmVsb2NpdGllcyBhbmQgcG9zaXRpb25cbiAgICAgICAgICAgICAgICByaWRlci52ZWxvY2l0eVggPSAwO1xuICAgICAgICAgICAgICAgIHJpZGVyLnZlbG9jaXR5WSA9IDA7XG4gICAgICAgICAgICAgICAgcmlkZXIueCA9IG9ic1tzZWxmSWRdLng7XG4gICAgICAgICAgICAgICAgcmlkZXIueSA9IG9ic1tzZWxmSWRdLnk7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgb2JzW3NlbGZJZF07XG4gICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0gPSByaWRlcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tvYnNbc2VsZklkXS5pbnRlcmFjdGFibGVJZF07XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB1cGRhdGU6IChvYnMsIHNlbGZJZCwgZGVsdGEpID0+IHtcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBjYXIgbW92ZW1lbnRcbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLnggKz0gb2JzW3NlbGZJZF0udmVsb2NpdHlYICogZGVsdGE7XG4gICAgICAgICAgICBvYnNbc2VsZklkXS55ICs9IG9ic1tzZWxmSWRdLnZlbG9jaXR5WSAqIGRlbHRhO1xuXG4gICAgICAgICAgICBpZiAob2JzW29ic1tzZWxmSWRdLmludGVyYWN0YWJsZUlkXSkge1xuICAgICAgICAgICAgICAgIG9ic1tvYnNbc2VsZklkXS5pbnRlcmFjdGFibGVJZF0ueCA9IG9ic1tzZWxmSWRdLng7XG4gICAgICAgICAgICAgICAgb2JzW29ic1tzZWxmSWRdLmludGVyYWN0YWJsZUlkXS55ID0gb2JzW3NlbGZJZF0ueTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ2hlY2sgY29sbGlzaW9ucyB3aXRoIHRlcnJhaW4gYW5kIHJlcG9zaXRpb24gYWNjb3JkaW5nbHlcbiAgICAgICAgICAgIGNvbGxpc2lvbnMuY2hlY2tDb2xsaXNpb25zKHNlbGZJZCwgb2JzLCBwcmVmYWJzLnJlbmRlclNpemUsIChzcmNJZCwgY29sbGlzaW9uSWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob2JzW3NyY0lkXSAmJiBjb2xsaXNpb25JZCAhPSBzcmNJZCl7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob2JzW2NvbGxpc2lvbklkXS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRFUlJBSU46XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5wdXNoQmFjayhvYnMsIHNyY0lkLCBjb2xsaXNpb25JZCwgcHJlZmFicy5yZW5kZXJTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBtb3VzZURvd246IChvYnMsIG1vdXNlRXZlbnQpID0+IHsgfSxcbiAgICAgICAgb25QbGF5ZXJJbnB1dDogKG9icywgc2VsZklkLCBwbGF5ZXJJbnB1dCkgPT4ge1xuICAgICAgICAgICAgcGxheWVyID0gb2JzW3NlbGZJZF07XG4gICAgICAgICAgICB2YXIgeERpciA9IDA7XG4gICAgICAgICAgICB2YXIgeURpciA9IDA7XG5cbiAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5sZWZ0KSB7XG4gICAgICAgICAgICAgICAgeERpciAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYXllcklucHV0LnJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgeERpciArPSAxO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgaWYgKHBsYXllcklucHV0LnVwKSB7XG4gICAgICAgICAgICAgICAgeURpciAtPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBsYXllcklucHV0LmRvd24pIHtcbiAgICAgICAgICAgICAgICB5RGlyICs9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYXllci52ZWxvY2l0eVggPSB4RGlyICogcGxheWVyLnNwZWVkO1xuICAgICAgICAgICAgcGxheWVyLnZlbG9jaXR5WSA9IHlEaXIgKiBwbGF5ZXIuc3BlZWQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh4RGlyICE9IDAgfHwgeURpciAhPSAwKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyLmZhY2luZyA9IChNYXRoLmF0YW4ocGxheWVyLnZlbG9jaXR5WSAvIHBsYXllci52ZWxvY2l0eVgpICogNTcuMjk1OCArIDkwKSArKHhEaXIgPCAwID8gMTgwIDogMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh4RGlyICE9IDApIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuaGl0Ym94V2lkdGggPSBvYnNbc2VsZklkXS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgcGxheWVyLmhpdGJveEhlaWdodCA9IG9ic1tzZWxmSWRdLndpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHlEaXIgIT0gMCkge1xuICAgICAgICAgICAgICAgIHBsYXllci5oaXRib3hXaWR0aCA9IG9ic1tzZWxmSWRdLndpZHRoO1xuICAgICAgICAgICAgICAgIHBsYXllci5oaXRib3hIZWlnaHQgPSBvYnNbc2VsZklkXS5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5waWNrdXApIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3VmVjaGljbGVJZCA9IHNlbGZJZCArIFwiOlwiICsgb2JzW3NlbGZJZF0udHlwZSArIFwiOlwiICsgb2JzW3NlbGZJZF0uc3VidHlwZSArIFwiOlwiICsgb2JzW3NlbGZJZF0ueCArIFwiOlwiICsgb2JzW3NlbGZJZF0ueTtcbiAgICAgICAgICAgICAgICBvYnNbb2JzW3NlbGZJZF0uaW50ZXJhY3RhYmxlSWRdLnZlaGljbGVJZCA9IG5ld1ZlY2hpY2xlSWQ7XG4gICAgICAgICAgICAgICAgb2JzW25ld1ZlY2hpY2xlSWRdID0gb2JzW3NlbGZJZF07XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdID0gb2JzW25ld1ZlY2hpY2xlSWRdLnJpZGVyO1xuICAgICAgICAgICAgICAgIG9ic1tuZXdWZWNoaWNsZUlkXS5yaWRlciA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIC8vIFJlc2V0IHZlbG9jaXRpZXMgYW5kIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0udmVsb2NpdHlYID0gMDtcbiAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS52ZWxvY2l0eVkgPSAwO1xuICAgICAgICAgICAgICAgIG9ic1tuZXdWZWNoaWNsZUlkXS52ZWxvY2l0eVggPSAwO1xuICAgICAgICAgICAgICAgIG9ic1tuZXdWZWNoaWNsZUlkXS52ZWxvY2l0eVkgPSAwO1xuICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLnggPSBvYnNbbmV3VmVjaGljbGVJZF0ueCArIG9ic1tuZXdWZWNoaWNsZUlkXS53aWR0aCAvIDIgKyBvYnNbc2VsZklkXS53aWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0ueSA9IG9ic1tuZXdWZWNoaWNsZUlkXS55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkYW1hZ2U6IChvYnMsIHNlbGZJZCwgYW1vdW50KSA9PiB7XG4gICAgICAgICAgICBvYnNbc2VsZklkXS5oZWFsdGggLT0gYW1vdW50O1xuXG4gICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0uaGVhbHRoIDw9IDApe1xuICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLmRlYXRocmF0dGxlKG9icywgc2VsZklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSwgUG9wb3ZhIH0gZnJvbSBcIi4uL1BvcG92YS9Qb3BvdmFcIjtcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi9PYmplY3RUeXBlc1wiO1xuXG5pbXBvcnQgKiBhcyBwbGF5ZXIgZnJvbSBcIi4uLy4uL1ByZWZhYnMvUGxheWVyL19QbGF5ZXIudGVtcGxhdGVcIjtcbmltcG9ydCAqIGFzIGdvZCBmcm9tIFwiLi4vLi4vUHJlZmFicy9QbGF5ZXIvR29kLnRlbXBsYXRlXCI7XG5pbXBvcnQgKiBhcyBmaXJlbWFnZSBmcm9tIFwiLi4vLi4vUHJlZmFicy9QbGF5ZXIvRmlyZU1hZ2UudGVtcGxhdGVcIjtcbmltcG9ydCAqIGFzIGhlYWx0aGJhciBmcm9tIFwiLi4vLi4vUHJlZmFicy9QbGF5ZXIvSGVhbHRoQmFyLnRlbXBsYXRlXCI7XG5cbmltcG9ydCAqIGFzIHByb2plY3RpbGUgZnJvbSBcIi4uLy4uL1ByZWZhYnMvUHJvamVjdGlsZS9fUHJvamVjdGlsZS50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgZmlyZWJvbHQgZnJvbSBcIi4uLy4uL1ByZWZhYnMvUHJvamVjdGlsZS9GaXJlYm9sdFByb2plY3RpbGUudGVtcGxhdGVcIjtcblxuaW1wb3J0ICogYXMgZ3JhdmVzdG9uZSBmcm9tIFwiLi4vLi4vUHJlZmFicy9HcmF2ZXN0b25lL19HcmF2ZXN0b25lLnRlbXBsYXRlXCI7XG5cbmltcG9ydCAqIGFzIF90ZXJyYWluIGZyb20gXCIuLi8uLi9QcmVmYWJzL1RlcnJhaW4vX1RlcnJhaW4udGVtcGxhdGVcIjtcbmltcG9ydCAqIGFzIHRyZWUgZnJvbSBcIi4uLy4uL1ByZWZhYnMvVGVycmFpbi9UcmVlLnRlbXBsYXRlXCI7XG5pbXBvcnQgKiBhcyB3YWxsSG9yaXogZnJvbSBcIi4uLy4uL1ByZWZhYnMvVGVycmFpbi9XYWxsSG9yaXoudGVtcGxhdGVcIjtcblxuaW1wb3J0ICogYXMgaGVhbHRoUGlja3VwIGZyb20gXCIuLi8uLi9QcmVmYWJzL0ludGVyYWN0YWJsZS9IZWFsdGhQaWNrdXAudGVtcGxhdGVcIjtcbmltcG9ydCAqIGFzIHBsYXllclR5cGVDaGFuZ2VyIGZyb20gXCIuLi8uLi9QcmVmYWJzL0ludGVyYWN0YWJsZS9QbGF5ZXJUeXBlQ2hhbmdlci50ZW1wbGF0ZVwiO1xuXG5pbXBvcnQgKiBhcyBzcGlrZVRyYXAgZnJvbSBcIi4uLy4uL1ByZWZhYnMvVHJpZ2dlci9TcGlrZVRyYXAudGVtcGxhdGVcIjtcblxuaW1wb3J0ICogYXMgY2FyIGZyb20gXCIuLi8uLi9QcmVmYWJzL1ZlaGljbGUvQ2FyLnRlbXBsYXRlXCI7XG5cbi8vIC0tLSBVSSBJY29ucyAtLS1cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgYmxhc3RlciB1aSBpY29uXG4gKiBAcGFyYW0gcG9zWCBIb3Jpem9udGFsIGljb24gcG9zaXRpb25cbiAqIEBwYXJhbSBwb3NZIFZlcnRpY2FsIGljb24gcG9zaXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJsYXN0ZXJVSU1hc3RlclBpZWNlKHBvc1g6IG51bWJlciwgcG9zWTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiMwMDAwMDBcIl0sXG4gICAgICAgIHBvc1g6IHBvc1gsXG4gICAgICAgIHBvc1k6IHBvc1ksXG4gICAgICAgIHdpZHRoOiAzLFxuICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgIGZhY2luZzogLTQ1LFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LF1cbiAgICB9O1xufVxuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIHNjYW5uZXIgdWkgaWNvblxuICogQHBhcmFtIHBvc1ggSG9yaXpvbnRhbCBpY29uIHBvc2l0aW9uXG4gKiBAcGFyYW0gcG9zWSBWZXJ0aWNhbCBpY29uIHBvc2l0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2FubmVyVUlNYXN0ZXJQaWVjZShwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjRkZGRkZGXCIsIFwiIzMzOTlGRlwiXSxcbiAgICAgICAgcG9zWDogcG9zWCxcbiAgICAgICAgcG9zWTogcG9zWSxcbiAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAtMSxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IDUsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sXVxuICAgIH07XG59XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgYnVpbGRlciB1aSBpY29uXG4gKiBAcGFyYW0gcG9zWCBIb3Jpem9udGFsIGljb24gcG9zaXRpb25cbiAqIEBwYXJhbSBwb3NZIFZlcnRpY2FsIGljb24gcG9zaXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkZXJVSU1hc3RlclBpZWNlKHBvc1g6IG51bWJlciwgcG9zWTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiMwMDAwMDBcIiwgXCIjOTM1MjAwXCJdLFxuICAgICAgICBwb3NYOiBwb3NYLFxuICAgICAgICBwb3NZOiBwb3NZLFxuICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICBmYWNpbmc6IC00NSxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdXG4gICAgfTtcbn1cblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBiaW5vY3VsYXJzIHVpIGljb25cbiAqIEBwYXJhbSBwb3NYIEhvcml6b250YWwgaWNvbiBwb3NpdGlvblxuICogQHBhcmFtIHBvc1kgVmVydGljYWwgaWNvbiBwb3NpdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gYmlub2N1bGFyc1VJTWFzdGVyUGllY2UocG9zWDogbnVtYmVyLCBwb3NZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzAwMDAwMFwiLCBcIiMzMzMzMzNcIl0sXG4gICAgICAgIHBvc1g6IHBvc1gsXG4gICAgICAgIHBvc1k6IHBvc1ksXG4gICAgICAgIHdpZHRoOiAzLFxuICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgIGZhY2luZzogLTQ1LFxuICAgICAgICBzdHJva2VzOiBbIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sXVxuICAgIH07XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlck9iamVjdHMoXG4gICAgb2JqZWN0czogYW55LFxuICAgIHJlbmRlck9mZnNldFg6IG51bWJlcixcbiAgICByZW5kZXJPZmZzZXRZOiBudW1iZXIsXG4gICAgcmVuZGVyU2l6ZTogbnVtYmVyLFxuICAgIGJhY2tncm91bmQ6IFBvcG92YSxcbiAgICBlbnY6IFBvcG92YSxcbiAgICBmb3JlZ3JvdW5kOiBQb3BvdmEsXG4gICAgY292ZXI6IFBvcG92YSxcbiAgICB1aTogUG9wb3ZhLFxuKSB7XG4gICAgZm9yICh2YXIgaWQgaW4gb2JqZWN0cykge1xuICAgICAgICB2YXIgb2JqZWN0ID0gb2JqZWN0c1tpZF07XG5cbiAgICAgICAgc3dpdGNoIChvYmplY3QudHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVI6XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvYmplY3Quc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlBsYXllci5IVU1BTjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVncm91bmQuZHJhdyhwbGF5ZXIucGxheWVyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5QbGF5ZXIuR09EOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWdyb3VuZC5kcmF3KGdvZC5nb2RQbGF5ZXJNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlBsYXllci5GSVJFX01BR0U6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kLmRyYXcoZmlyZW1hZ2UuZmlyZW1hZ2VQbGF5ZXJNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kLmRyYXcoaGVhbHRoYmFyLmhlYWx0aEJhck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSwgcmVuZGVyU2l6ZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QUk9KRUNUSUxFOlxuICAgICAgICAgICAgICAgIHN3aXRjaCAob2JqZWN0LnN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Qcm9qZWN0aWxlLkJBU0lDX1BST0pFQ1RJTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhwcm9qZWN0aWxlLnByb2plY3RpbGVNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlByb2plY3RpbGUuRklSRUJPTFRfUFJPSkVDVElMRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KGZpcmVib2x0LmZpcmVib2x0UHJvamVjdGlsZU1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5HUkFWRVNUT05FOlxuICAgICAgICAgICAgICAgIGVudi5kcmF3KGdyYXZlc3RvbmUuZ3JhdmVTdG9uZU1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgIGVudi5kcmF3KGhlYWx0aGJhci5oZWFsdGhCYXJNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFksIHJlbmRlclNpemUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTjpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVGVycmFpbi5UUkVFOlxuICAgICAgICAgICAgICAgICAgICAgICAgZW52LmRyYXcodHJlZS50cmVlVHJ1bmtNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdmVyLmRyYXcodHJlZS50cmVlTGVhZk1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVGVycmFpbi5XQUxMX0hPUklaOlxuICAgICAgICAgICAgICAgICAgICAgICAgZW52LmRyYXcod2FsbEhvcml6LndhbGxIb3JpekJhc2VNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdmVyLmRyYXcod2FsbEhvcml6LndhbGxIb3JpekNvdmVyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLklOVEVSQUNUQUJMRTpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuSW50ZXJhY3RhYmxlLkhFQUxUSF9QSUNLVVA6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhoZWFsdGhQaWNrdXAuaGVhbHRoUGlja3VwTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5JbnRlcmFjdGFibGUuUExBWUVSX1RZUEVfQ0hBTkdFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KHBsYXllclR5cGVDaGFuZ2VyLnBsYXllclR5cGVDaGFuZ2VyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhwbGF5ZXJUeXBlQ2hhbmdlci5saXR0bGVNYW5NYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVFJJR0dFUjpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVHJpZ2dlci5TUElLRV9UUkFQOlxuICAgICAgICAgICAgICAgICAgICAgICAgZW52LmRyYXcoc3Bpa2VUcmFwLnNwaWtlVHJhcE1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFOlxuICAgICAgICAgICAgICAgIHN3aXRjaCAob2JqZWN0LnN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5WZWhpY2xlLkNBUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVncm91bmQuZHJhdyhjYXIuY2FyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGVudi5kcmF3KF90ZXJyYWluLmRlZmF1bHRUZXJyYWluTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIG1hc3RlclBpZWNlIHtcbiAgICBwYWxldHRlOiBzdHJpbmdbXSxcbiAgICBwb3NYOiBudW1iZXIsXG4gICAgcG9zWTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgZmFjaW5nOiBudW1iZXIsXG4gICAgc3Ryb2tlczogc3Ryb2tlW10sXG4gICAgY3VzdG9tUmVuZGVyU2l6ZT86IG51bWJlcixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBzdHJva2Uge1xuICAgIGNlbGxYOiBudW1iZXIsXG4gICAgY2VsbFk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHN3YXRjaDogbnVtYmVyLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIG1vdXNlUG9zaXRpb24ge1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgb3V0T2ZCb3VuZHM6IGJvb2xlYW4sXG59XG5cbmV4cG9ydCBjbGFzcyBQb3BvdmEge1xuXG4gICAgcHJpdmF0ZSBjYW52YXM6IGFueTtcbiAgICBwcml2YXRlIGN0eDogYW55O1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgY3ViZVNpemU6IG51bWJlciA9IDEyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIFBvcG92YSdzIGNhbnZhc1xuICAgICAqIEBwYXJhbSBjYW52YXNJZCBJZCBvZiBodG1sIGNhbnZhcyBlbGVtZW50XG4gICAgICogQHBhcmFtIGN1YmVTaXplIFJlbmRlciBzaXplIGZvciBlYWNoIGN1YmUgd2hlbiBkcmF3aW5nIHdpdGggY3ViZXNcbiAgICAgKi9cbiAgICBpbml0KGNhbnZhc0lkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSA8YW55PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNJZCk7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbnZhcy5vZmZzZXRXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgYSBncmlkIG9uIHRoZSBjYW52YXNcbiAgICAgKiBAcGFyYW0gc3BhY2luZyBOdW1iZXIgb2YgcGl4ZWxzIGJldHdlZW4gZ3JpZCBsaW5lc1xuICAgICovXG4gICAgZHJhd0dyaWQoc3BhY2luZzogbnVtYmVyLCBvZmZzZXRYPzogbnVtYmVyLCBvZmZzZXRZPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIC8vIERyYXcgZ3JpZCBvbiBiYWNrZ3JvdW5kXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCIjZDBkMGQwXCI7XG4gICAgICAgIGZvciAodmFyIHggPSAoISFvZmZzZXRYKSA/IG9mZnNldFggJSBzcGFjaW5nIDogMDsgeCA8PSB0aGlzLndpZHRoOyB4ICs9IHNwYWNpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCAwKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4LCB0aGlzLmhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciB5ID0gKCEhb2Zmc2V0WSkgPyBvZmZzZXRZICUgc3BhY2luZyA6IDA7IHkgPD0gdGhpcy5oZWlnaHQ7IHkgKz0gc3BhY2luZykge1xuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKDAsIHkpO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHRoaXMud2lkdGgsIHkpO1xuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHJhd3MgYSBtYXN0ZXJwaWVjZSB0byB0aGUgY2FudmFzXG4gICAgICogQHBhcmFtIG1hc3RlclBpZWNlIERlZmluaXRpb24gZm9yIHdoYXQgdG8gZHJhd1xuICAgICAqL1xuICAgIGRyYXcobWFzdGVyUGllY2U6IG1hc3RlclBpZWNlKSB7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcblxuICAgICAgICB0aGlzLnByZXBDYW52YXMoXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS5wb3NYLFxuICAgICAgICAgICAgbWFzdGVyUGllY2UucG9zWSxcbiAgICAgICAgICAgIG1hc3RlclBpZWNlLndpZHRoLFxuICAgICAgICAgICAgbWFzdGVyUGllY2UuaGVpZ2h0LFxuICAgICAgICAgICAgbWFzdGVyUGllY2UuZmFjaW5nKTtcbiAgICAgICAgbWFzdGVyUGllY2Uuc3Ryb2tlcy5mb3JFYWNoKChzdHJva2U6IHN0cm9rZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJTdHJva2Uoc3Ryb2tlLCBtYXN0ZXJQaWVjZS5wYWxldHRlLCBtYXN0ZXJQaWVjZS5jdXN0b21SZW5kZXJTaXplKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENlbnRlcnMgdGhlIGNhbnZhcyBvbiBwb3NpdGlvbiwgYW5kIHJvdGF0ZXMgdG8gYSBjZXJ0YWluIGZhY2luZ1xuICAgICAqIEBwYXJhbSBwb3NpdGlvblggVGhlIHggcG9zaXRpb24gb2Ygd2hhdCBpcyBiZWluZyBkcmF3blxuICAgICAqIEBwYXJhbSBwb3NpdGlvblkgVGhlIHkgcG9zaXRpb24gb2Ygd2hhdCBpcyBiZWluZyBkcmF3blxuICAgICAqIEBwYXJhbSB3aWR0aCBUaGUgd2lkdGggb2Ygd2hhdCBpcyBiZWluZyBkcmF3blxuICAgICAqIEBwYXJhbSBoZWlnaHQgVGhlIGhlaWdodCBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIGRlZ3JlZXMgRGVncmVlcyB0byByb3RhdGUgdGhlIGNhbnZhcyBieVxuICAgICAqIEBwYXJhbSBjdXN0b21SZW5kZXJTaXplIFJlbmRlciB0aGUgbWFzdGVyIHBpZWNlIHdpdGggY3VzdG9tIGN1YmUgc2l6aW5nXG4gICAgICovXG4gICAgcHJlcENhbnZhcyhwb3NpdGlvblg6IG51bWJlciwgcG9zaXRpb25ZOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBkZWdyZWVzOiBudW1iZXIpe1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHBvc2l0aW9uWCwgcG9zaXRpb25ZKTtcbiAgICAgICAgdGhpcy5jdHgucm90YXRlKGRlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKC0gd2lkdGggKiB0aGlzLmN1YmVTaXplIC8gMiwgLSBoZWlnaHQgKiB0aGlzLmN1YmVTaXplIC8gMik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBcbiAgICAgKiBAcGFyYW0gc3Ryb2tlIFN0cm9rZSB0byByZW5kZXJcbiAgICAgKiBAcGFyYW0gcGFsZXR0ZSBDb250YWlucyB0aGUgbWFzdGVyIHBpZWNlJ3MgY29sb3Igc3dhdGNoZXNcbiAgICAgKiBAcGFyYW0gY3VzdG9tUmVuZGVyU2l6ZSBSZW5kZXIgdGhlIG1hc3RlciBwaWVjZSB3aXRoIGN1c3RvbSBjdWJlIHNpemluZ1xuICAgICAqL1xuICAgIHJlbmRlclN0cm9rZShzdHJva2U6IHN0cm9rZSwgcGFsZXR0ZTogc3RyaW5nW10sIGN1c3RvbVJlbmRlclNpemU/OiBudW1iZXIpe1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBwYWxldHRlW3N0cm9rZS5zd2F0Y2hdO1xuICAgICAgICBpZiAoY3VzdG9tUmVuZGVyU2l6ZSl7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChzdHJva2UuY2VsbFggKiBjdXN0b21SZW5kZXJTaXplLCBzdHJva2UuY2VsbFkgKiBjdXN0b21SZW5kZXJTaXplLFxuICAgICAgICAgICAgICAgIHN0cm9rZS53aWR0aCAqIGN1c3RvbVJlbmRlclNpemUsIHN0cm9rZS5oZWlnaHQgKiBjdXN0b21SZW5kZXJTaXplKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHN0cm9rZS5jZWxsWCAqIHRoaXMuY3ViZVNpemUsIHN0cm9rZS5jZWxsWSAqIHRoaXMuY3ViZVNpemUsXG4gICAgICAgICAgICAgICAgc3Ryb2tlLndpZHRoICogdGhpcy5jdWJlU2l6ZSwgc3Ryb2tlLmhlaWdodCAqIHRoaXMuY3ViZVNpemUpO1xuICAgICAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVyYXNlcyBldmVyeXRoaW5nIG9uIHRoZSBjYW52YXNcbiAgICAgKi9cbiAgICB3aXBlQ2FudmFzKCkge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhbnZhcycgd2lkdGggYW5kIGhlaWdodFxuICAgICAqL1xuICAgIHNpemUoKTogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9IHtcbiAgICAgICAgcmV0dXJuIHsgd2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHQgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIFBvcG92YSdzIGN1YmUgcmVuZGVyIHNpemVcbiAgICAgKi9cbiAgICBnZXRDdWJlU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jdWJlU2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIFBvcG92YSdzIGN1YmUgcmVuZGVyIHNpemVcbiAgICAgKiBAcGFyYW0gc2l6ZSBWYWx1ZSBmb3IgY3ViZSByZW5kZXIgc2l6ZVxuICAgICAqL1xuICAgIHNldEN1YmVTaXplKHNpemU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmN1YmVTaXplID0gc2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG1vdXNlIHBvc2l0aW9uIGFuZCBpZiBtb3VzZSBpcyBpbnNpZGUgY2FudmFzXG4gICAgICogQHBhcmFtIGV2dCBNb3VzZSBtb3ZlbWVudCBldmVudCwgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvblxuICAgICAqL1xuICAgIGdldE1vdXNlUG9zKGV2dDogYW55KTogbW91c2VQb3NpdGlvbiB7XG4gICAgICAgIHZhciByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBwb3NYID0gZXZ0LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgIHZhciBwb3NZID0gZXZ0LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgdmFyIG9mZkNhbnZhcyA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChwb3NYIDwgMCkge1xuICAgICAgICAgICAgcG9zWCA9IDA7XG4gICAgICAgICAgICBvZmZDYW52YXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NZIDwgMCkge1xuICAgICAgICAgICAgcG9zWSA9IDA7XG4gICAgICAgICAgICBvZmZDYW52YXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NYID4gdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgcG9zWCA9IHRoaXMud2lkdGg7XG4gICAgICAgICAgICBvZmZDYW52YXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NZID4gdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHBvc1kgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgICAgIG9mZkNhbnZhcyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHBvc1gsXG4gICAgICAgICAgeTogcG9zWSxcbiAgICAgICAgICBvdXRPZkJvdW5kczogb2ZmQ2FudmFzLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGRyYXdUZXh0KHRleHQ6IHN0cmluZywgcG9zWDogbnVtYmVyLCBwb3NZOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMTZweCBBcmlhbFwiXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRleHQsIHBvc1gsIHBvc1kpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0ICogYXMgc29ja2V0SW8gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcbmltcG9ydCB7IFBvcG92YSwgbW91c2VQb3NpdGlvbiwgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi9Qb3BvdmEvUG9wb3ZhXCI7XG5pbXBvcnQgKiBhcyBsb3V2cmUgZnJvbSBcIi4vTG91dnJlL0xvdXZyZVwiO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4uL09iamVjdFR5cGVzXCI7XG5cbi8vIFNvY2tldCBsaXN0ZW5lclxudmFyIHNvY2tldCA9IGlvKCk7XG52YXIgZGVidWcgPSB0cnVlO1xuXG52YXIgY3ViZVNpemU6IG51bWJlcjtcbnZhciBncmlkU2l6ZTogbnVtYmVyID0gNDg7XG52YXIgY2FudmFzU2l6ZTogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9O1xudmFyIGVxdWlwbWVudEljb25Qb3NYOiBudW1iZXIgPSA5NzY7XG52YXIgZXF1aXBtZW50SWNvblBvc1k6IG51bWJlciA9IDcyNjtcblxudmFyIHBsYXllcklkOiBzdHJpbmc7XG5cbnZhciByZW5kZXJPZmZzZXRYOiBudW1iZXI7XG52YXIgcmVuZGVyT2Zmc2V0WTogbnVtYmVyO1xudmFyIGNhbWVyYU1vdmluZ1RvWDogbnVtYmVyO1xudmFyIGNhbWVyYU1vdmluZ1RvWTogbnVtYmVyO1xudmFyIGNhbWVyYVBhblNwZWVkID0gMC4wMTU7XG5cbnZhciBtb3VzZVBvczogbW91c2VQb3NpdGlvbiA9IHsgeDogMCwgeTogMCwgb3V0T2ZCb3VuZHM6IHRydWUgfTtcblxudmFyIHBsYXllcklucHV0ID0ge1xuICAgIHVwOiBmYWxzZSxcbiAgICBkb3duOiBmYWxzZSxcbiAgICBsZWZ0OiBmYWxzZSxcbiAgICByaWdodDogZmFsc2UsXG4gICAgY3ljbGVFcXVpcG1lbnRGb3J3YXJkOiBmYWxzZSxcbiAgICBjeWNsZUVxdWlwbWVudEJhY2t3YXJkOiBmYWxzZSxcbiAgICBwaWNrdXA6IGZhbHNlLFxuICAgIGFiaWxpdHkxOiBmYWxzZSxcbiAgICBhYmlsaXR5MjogZmFsc2UsXG4gICAgYWJpbGl0eTM6IGZhbHNlLFxuICAgIGFiaWxpdHk0OiBmYWxzZSxcbiAgICB0YXJnZXRYOiBtb3VzZVBvcy54LFxuICAgIHRhcmdldFk6IG1vdXNlUG9zLnksXG59XG5cbnZhciBLRVlfVVAgPSA4NzsgICAgICAgICAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IHRvIFdcbnZhciBLRVlfRE9XTiA9IDgzOyAgICAgICAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IHRvIFNcbnZhciBLRVlfUklHSFQgPSA2ODsgICAgICAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IHRvIERcbnZhciBLRVlfTEVGVCA9IDY1OyAgICAgICAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IHRvIEFcbnZhciBLRVlfQ1lDTEVfRVFVSVBNRU5UX0ZPUldBUkQgPSA2OTsgICAvLyBEZWZhdWx0IHRvIEVcbnZhciBLRVlfQ1lDTEVfRVFVSVBNRU5UX0JBQ0tXQVJEID0gODE7ICAvLyBEZWZhdWx0IHRvIFFcbnZhciBLRVlfUElDS1VQID0gNzA7ICAgICAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IHRvIEZcbnZhciBLRVlfQUJJTElUWV8xID0gNDk7ICAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IHRvIDFcbnZhciBLRVlfQUJJTElUWV8yID0gNTA7ICAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IHRvIDJcbnZhciBLRVlfQUJJTElUWV8zID0gNTE7ICAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IHRvIDNcbnZhciBLRVlfQUJJTElUWV80ID0gNTI7ICAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IHRvIDRcblxudmFyIHByZXZUaW1lID0gMDtcbnZhciBkZWx0YSA9IDA7XG5cbi8vIEFkZCBsaXN0ZW5lcnMgdG8gZG9jdW1lbnRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIEtFWV9VUDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LnVwID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9ET1dOOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuZG93biA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfUklHSFQ6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5yaWdodCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfTEVGVDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmxlZnQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0NZQ0xFX0VRVUlQTUVOVF9GT1JXQVJEOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuY3ljbGVFcXVpcG1lbnRGb3J3YXJkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9DWUNMRV9FUVVJUE1FTlRfQkFDS1dBUkQ6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5jeWNsZUVxdWlwbWVudEJhY2t3YXJkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9QSUNLVVA6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5waWNrdXAgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0FCSUxJVFlfMTpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmFiaWxpdHkxID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9BQklMSVRZXzI6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5MiA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfQUJJTElUWV8zOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuYWJpbGl0eTMgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0FCSUxJVFlfNDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmFiaWxpdHk0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwbGF5ZXJJbnB1dC50YXJnZXRYID0gbW91c2VQb3MueCArIHJlbmRlck9mZnNldFg7XG4gICAgcGxheWVySW5wdXQudGFyZ2V0WSA9IG1vdXNlUG9zLnkgKyByZW5kZXJPZmZzZXRZO1xuICAgIHNvY2tldC5lbWl0KFwicGxheWVySW5wdXRcIiwgcGxheWVySW5wdXQpO1xuICAgIFxuICAgIC8vIFRyaWdnZXIga2V5cyBhcmUgdW5zZXQgYWZ0ZXIgZW1pc3Npb25cbiAgICBwbGF5ZXJJbnB1dC5waWNrdXAgPSBmYWxzZTtcbiAgICBwbGF5ZXJJbnB1dC5jeWNsZUVxdWlwbWVudEZvcndhcmQgPSBmYWxzZTtcbiAgICBwbGF5ZXJJbnB1dC5jeWNsZUVxdWlwbWVudEJhY2t3YXJkID0gZmFsc2U7XG4gICAgcGxheWVySW5wdXQuYWJpbGl0eTEgPSBmYWxzZTtcbiAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5MiA9IGZhbHNlO1xuICAgIHBsYXllcklucHV0LmFiaWxpdHkzID0gZmFsc2U7XG4gICAgcGxheWVySW5wdXQuYWJpbGl0eTQgPSBmYWxzZTtcbn0pO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIEtFWV9VUDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LnVwID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfRE9XTjpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9SSUdIVDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LnJpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfTEVGVDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmxlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzb2NrZXQuZW1pdChcInBsYXllcklucHV0XCIsIHBsYXllcklucHV0KTtcbn0pO1xuXG5mdW5jdGlvbiBvbk1vdXNlTW92ZShldmVudDogYW55KSB7XG4gICAgbW91c2VQb3MgPSBmb3JlZ3JvdW5kLmdldE1vdXNlUG9zKGV2ZW50KTtcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlLCBmYWxzZSk7XG5cbmZ1bmN0aW9uIG9uTW91c2VDbGljayhldmVudDogYW55KSB7XG4gICAgaWYgKCFtb3VzZVBvcy5vdXRPZkJvdW5kcykge1xuICAgICAgICBzb2NrZXQuZW1pdChcIm1vdXNlRG93blwiLCB7XG4gICAgICAgICAgICBzb3VyY2VJZDogcGxheWVySWQsXG4gICAgICAgICAgICB0YXJnZXRYOiAobW91c2VQb3MueCArIHJlbmRlck9mZnNldFgpLFxuICAgICAgICAgICAgdGFyZ2V0WTogKG1vdXNlUG9zLnkgKyByZW5kZXJPZmZzZXRZKSxcbiAgICAgICAgICAgIHBsYXllcklucHV0OiBwbGF5ZXJJbnB1dCxcbiAgICAgICAgfSk7XG4gICAgfVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbk1vdXNlQ2xpY2ssIGZhbHNlKTtcblxuLy8gSW5pdCBjYW52YXNcbnZhciBiYWNrZ3JvdW5kICA9IG5ldyBQb3BvdmEoKTtcbnZhciBlbnYgICAgICAgICA9IG5ldyBQb3BvdmEoKTtcbnZhciBmb3JlZ3JvdW5kICA9IG5ldyBQb3BvdmEoKTtcbnZhciBjb3ZlciAgICAgICA9IG5ldyBQb3BvdmEoKTtcbnZhciB1aSAgICAgICAgICA9IG5ldyBQb3BvdmEoKTtcblxuYmFja2dyb3VuZC5pbml0KFwiYmFja2dyb3VuZFwiKTtcbmVudi5pbml0KFwiZW52XCIpO1xuZm9yZWdyb3VuZC5pbml0KFwiZm9yZWdyb3VuZFwiKTtcbmNvdmVyLmluaXQoXCJjb3ZlclwiKTtcbnVpLmluaXQoXCJ1aVwiKTtcblxuLy8gVGVsbCB0aGUgc2VydmVyIGEgbmV3IHBsYXllciBoYXMgam9pbmVkIGFuZCBoYW5kc2hha2VcbnNvY2tldC5lbWl0KFwibmV3LXBsYXllclwiKTtcbnNvY2tldC5vbihcImhhbmRzaGFrZVwiLCAoaW5mbzogYW55KSA9PiB7XG4gICAgcGxheWVySWQgPSBpbmZvLmlkO1xuICAgIGN1YmVTaXplID0gaW5mby5jdWJlU2l6ZTtcbiAgICBiYWNrZ3JvdW5kLnNldEN1YmVTaXplKGN1YmVTaXplKTtcbiAgICBlbnYuc2V0Q3ViZVNpemUoY3ViZVNpemUpO1xuICAgIGZvcmVncm91bmQuc2V0Q3ViZVNpemUoY3ViZVNpemUpO1xuICAgIGNvdmVyLnNldEN1YmVTaXplKGN1YmVTaXplKTtcbiAgICB1aS5zZXRDdWJlU2l6ZShjdWJlU2l6ZSk7XG4gICAgY2FudmFzU2l6ZSA9IGZvcmVncm91bmQuc2l6ZSgpO1xuXG4gICAgcHJldlRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHJlbmRlck9mZnNldFggPSAwO1xuICAgIHJlbmRlck9mZnNldFkgPSAwO1xufSk7XG5cbi8vIEludGVycHJldCBzdGF0ZSBhbmQgZHJhdyBvYmplY3RzXG5zb2NrZXQub24oXCJzdGF0ZVwiLCAob2JqZWN0czogYW55KSA9PiB7XG4gICAgdmFyIHBsYXllciA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGxheWVySWQgJiYgb2JqZWN0c1twbGF5ZXJJZF0pIHtcbiAgICAgICAgcGxheWVyID0gb2JqZWN0c1twbGF5ZXJJZF07XG4gICAgfVxuXG4gICAgaWYgKCFjYW52YXNTaXplKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3JlZ3JvdW5kLndpcGVDYW52YXMoKTtcbiAgICBlbnYud2lwZUNhbnZhcygpO1xuICAgIGNvdmVyLndpcGVDYW52YXMoKTtcbiAgICB1aS53aXBlQ2FudmFzKCk7XG5cbiAgICBjb25zdCB0aW1lID0gRGF0ZS5ub3coKTtcbiAgICBkZWx0YSA9IHRpbWUgLSBwcmV2VGltZTtcbiAgICBwcmV2VGltZSA9IHRpbWU7XG5cbiAgICAvLyBDYW1lcmEgc21vb3RoaW5nIGFuZCByZW5kZXIgb2Zmc2V0IGNhbGN1bGF0aW9uc1xuICAgIGNhbWVyYU1vdmluZ1RvWCA9ICghIXBsYXllcilcbiAgICAgICAgPyBwbGF5ZXIueCArIChtb3VzZVBvcy54IC0gKGNhbnZhc1NpemUud2lkdGggLyAyKSkgKiBwbGF5ZXIudmlld1JhbmdlIC0gY2FudmFzU2l6ZS53aWR0aCAvIDJcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgY2FtZXJhTW92aW5nVG9ZID0gKCEhcGxheWVyKVxuICAgICAgICA/IHBsYXllci55ICsgKG1vdXNlUG9zLnkgLSAoY2FudmFzU2l6ZS5oZWlnaHQgLyAyKSkgKiBwbGF5ZXIudmlld1JhbmdlIC0gY2FudmFzU2l6ZS5oZWlnaHQgLyAyXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgcmVuZGVyT2Zmc2V0WCArPSAoISFjYW1lcmFNb3ZpbmdUb1gpXG4gICAgICAgID8gKGNhbWVyYU1vdmluZ1RvWCAtIHJlbmRlck9mZnNldFgpICogY2FtZXJhUGFuU3BlZWQgKiBkZWx0YVxuICAgICAgICA6IDA7XG4gICAgcmVuZGVyT2Zmc2V0WSArPSAoISFjYW1lcmFNb3ZpbmdUb1kpXG4gICAgICAgID8gKGNhbWVyYU1vdmluZ1RvWSAtIHJlbmRlck9mZnNldFkpICogY2FtZXJhUGFuU3BlZWQgKiBkZWx0YVxuICAgICAgICA6IDA7XG5cbiAgICAvLyBUT0RPOiBEcmF3IGJhY2tncm91bmQgbWFwIChpbnN0ZWFkIG9mL3dpdGggZ3JpZClcbiAgICBpZiAoISFvYmplY3RzKSB7XG4gICAgICAgIGJhY2tncm91bmQud2lwZUNhbnZhcygpO1xuICAgICAgICBiYWNrZ3JvdW5kLmRyYXdHcmlkKGdyaWRTaXplLCAtcmVuZGVyT2Zmc2V0WCwgLXJlbmRlck9mZnNldFkpO1xuICAgIH1cblxuICAgIGlmIChkZWJ1Zykge1xuICAgICAgICB1aS5kcmF3VGV4dChkZWx0YS50b1N0cmluZygpICsgXCJtc1wiLCBjYW52YXNTaXplLndpZHRoIC0gNDgsIDE2KTtcbiAgICB9XG5cbiAgICAvLyBEcmF3IGN1cnJlbnQgZXF1aXBtZW50IHVpIGljb25cbiAgICBpZiAocGxheWVyICYmIHBsYXllci5jdXJyZW50RXF1aXBtZW50ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBzd2l0Y2ggKHBsYXllci5lcXVpcG1lbnRbcGxheWVyLmN1cnJlbnRFcXVpcG1lbnRdLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuRXF1aXBtZW50VHlwZXMuQkxBU1RFUjpcbiAgICAgICAgICAgICAgICB1aS5kcmF3KGxvdXZyZS5ibGFzdGVyVUlNYXN0ZXJQaWVjZShlcXVpcG1lbnRJY29uUG9zWCwgZXF1aXBtZW50SWNvblBvc1kpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuRXF1aXBtZW50VHlwZXMuU0NBTk5FUjpcbiAgICAgICAgICAgICAgICB1aS5kcmF3KGxvdXZyZS5zY2FubmVyVUlNYXN0ZXJQaWVjZShlcXVpcG1lbnRJY29uUG9zWCwgZXF1aXBtZW50SWNvblBvc1kpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuRXF1aXBtZW50VHlwZXMuQlVJTERFUjpcbiAgICAgICAgICAgICAgICB1aS5kcmF3KGxvdXZyZS5idWlsZGVyVUlNYXN0ZXJQaWVjZShlcXVpcG1lbnRJY29uUG9zWCwgZXF1aXBtZW50SWNvblBvc1kpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuRXF1aXBtZW50VHlwZXMuQklOT0NVTEFSUzpcbiAgICAgICAgICAgICAgICB1aS5kcmF3KGxvdXZyZS5iaW5vY3VsYXJzVUlNYXN0ZXJQaWVjZShlcXVpcG1lbnRJY29uUG9zWCwgZXF1aXBtZW50SWNvblBvc1kpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb3V2cmUucmVuZGVyT2JqZWN0cyhvYmplY3RzLCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZLCBjdWJlU2l6ZSwgYmFja2dyb3VuZCwgZW52LCBmb3JlZ3JvdW5kLCBjb3ZlciwgdWkpO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9