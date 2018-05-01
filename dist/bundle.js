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
/***/ (function(module, exports, __webpack_require__) {

var types = __webpack_require__(/*! ./ObjectTypes */ "./ObjectTypes.js");
module.exports = {
    // Check collisions between all objects
    checkCollisions: function (checkSrc, obs, renderSize, callBack) {
        var src = obs[checkSrc];
        for (id in obs) {
            var check = obs[id];
            var collision = false;
            if (check) {
                switch (src.hitboxType) {
                    case types.HitboxTypes.RECT:
                        switch (check.hitboxType) {
                            case types.HitboxTypes.RECT:
                                collision = checkCollisionRectRect(src, check, renderSize);
                                break;
                            case types.HitboxTypes.CIRC:
                                collision = checkCollisionCircRect(check, src, renderSize);
                                break;
                        }
                        break;
                    case types.HitboxTypes.CIRC:
                        switch (check.hitboxType) {
                            case types.HitboxTypes.RECT:
                                collision = checkCollisionCircRect(src, check, renderSize);
                                break;
                            case types.HitboxTypes.CIRC:
                                collision = checkCollisionCircCirc(src, check, renderSize);
                                break;
                        }
                        break;
                }
                if (collision)
                    callBack(checkSrc, id);
            }
        }
    },
    // Check collisions between all objects by distance
    checkCollisionsByDistance: function (checkSrc, obs, maxDist, callBack) {
        var src = obs[checkSrc];
        for (id in obs) {
            var check = obs[id];
            if (check) {
                var dist = Math.sqrt(Math.pow(src.x - check.x, 2) +
                    Math.pow(src.y - check.y, 2));
                if (dist <= maxDist)
                    callBack(checkSrc, id, dist);
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
// Check collision: rect - rect
function checkCollisionRectRect(src, check, renderSize) {
    var xIn = valueInRange(src.x - src.hitboxWidth / 2 * renderSize, check.x - check.hitboxWidth / 2 * renderSize, check.x + check.hitboxWidth / 2 * renderSize) ||
        valueInRange(src.x + src.hitboxWidth / 2 * renderSize, check.x - check.hitboxWidth / 2 * renderSize, check.x + check.hitboxWidth / 2 * renderSize) ||
        valueInRange(check.x - check.hitboxWidth / 2 * renderSize, src.x - src.hitboxWidth / 2 * renderSize, src.x + src.hitboxWidth / 2 * renderSize) ||
        valueInRange(check.x + check.hitboxWidth / 2 * renderSize, src.x - src.hitboxWidth / 2 * renderSize, src.x + src.hitboxWidth / 2 * renderSize);
    var yIn = valueInRange(src.y - src.hitboxHeight / 2 * renderSize, check.y - check.hitboxHeight / 2 * renderSize, check.y + check.hitboxHeight / 2 * renderSize) ||
        valueInRange(src.y + src.hitboxHeight / 2 * renderSize, check.y - check.hitboxHeight / 2 * renderSize, check.y + check.hitboxHeight / 2 * renderSize) ||
        valueInRange(check.y - check.hitboxHeight / 2 * renderSize, src.y - src.hitboxHeight / 2 * renderSize, src.y + src.hitboxHeight / 2 * renderSize) ||
        valueInRange(check.y + check.hitboxHeight / 2 * renderSize, src.y - src.hitboxHeight / 2 * renderSize, src.y + src.hitboxHeight / 2 * renderSize);
    return xIn && yIn;
}
// Check collision: circ - rect
function checkCollisionCircRect(src, check, renderSize) {
    var angle = Math.atan2(src.y - check.y, src.x - check.x);
    var width = Math.abs(Math.cos(angle) * src.hitboxRadius * 2);
    var height = Math.abs(Math.sin(angle) * src.hitboxRadius * 2);
    return checkCollisionRectRect({ x: src.x, y: src.y, hitboxWidth: width, hitboxHeight: height }, check, renderSize);
}
// Check collision: circ - circ
function checkCollisionCircCirc(src, check, renderSize) {
    var angle = Math.atan2(src.y - check.y, src.x - check.x);
    var width = Math.abs(Math.cos(angle) * src.hitboxRadius * 2);
    var height = Math.abs(Math.sin(angle) * src.hitboxRadius * 2);
    return checkCollisionCircRect(check, { x: src.x, y: src.y, hitboxWidth: width, hitboxHeight: height }, renderSize);
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
        COMBAT_TEXT: "combat-text",
    },
    Player: {
        HUMAN: "human",
        GOD: "god",
        FIRE_MAGE: "fire-mage",
    },
    Projectile: {
        BASIC_PROJECTILE: "basic-projectile",
        FIREBOLT_PROJECTILE: "firebolt-projectile",
        FLAME_PILLAR_PROJECTILE: "flame-pillar-projectile",
        FLAME_DASH_PROJECTILE: "flame-dash-projectile",
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
        FLAME_PILLAR: "flame-pillar",
        FLAME_DASH: "flame-dash",
        FLAME_BARRIER: "flame-barrier",
    },
    StatusEffects: {
        STUNNED: "stunned",
        INVULNERABLE: "invulnerable",
    },
    CombatText: {
        DAMAGE_TEXT: "damage-text",
        FIRE_DAMAGE_TEXT: "fire-damage-text",
        INVULNERABLE_TEXT: "invulnerable-text",
        HEAL_TEXT: "heal-text",
    },
    HitboxTypes: {
        NONE: "none",
        RECT: "rect",
        CIRC: "circ",
    },
};


/***/ }),

/***/ "./Prefabs/Abilities/Firebolt.js":
/*!***************************************!*\
  !*** ./Prefabs/Abilities/Firebolt.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fireboltCooldown = 600;
function generateNew(obs) {
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

/***/ "./Prefabs/Abilities/FlameBarrier.js":
/*!*******************************************!*\
  !*** ./Prefabs/Abilities/FlameBarrier.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var flameBarrierCooldown = 800;
var flameBarrierInvulnDuration = 350;
function generateNew(obs) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return {
        type: types.Abilities.FLAME_BARRIER,
        cooldown: flameBarrierCooldown,
        lastcast: undefined,
        cast: function (obs, sourceId, abilityIndex, targetX, targetY) {
            var newTime = Date.now();
            if (!obs[sourceId].abilities[abilityIndex].lastcast
                || newTime - obs[sourceId].abilities[abilityIndex].lastcast >= obs[sourceId].abilities[abilityIndex].cooldown) {
                obs[sourceId].abilities[abilityIndex].lastcast = newTime;
                obs[sourceId].addStatusEffect(obs, sourceId, types.StatusEffects.INVULNERABLE, flameBarrierInvulnDuration);
            }
        },
    };
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Abilities/FlameDash.js":
/*!****************************************!*\
  !*** ./Prefabs/Abilities/FlameDash.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var flameDashCooldown = 5000;
function generateNew(obs) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return {
        type: types.Abilities.FLAME_DASH,
        cooldown: flameDashCooldown,
        lastcast: undefined,
        cast: function (obs, sourceId, abilityIndex, targetX, targetY) {
            var newTime = Date.now();
            if (!obs[sourceId].abilities[abilityIndex].lastcast
                || newTime - obs[sourceId].abilities[abilityIndex].lastcast >= obs[sourceId].abilities[abilityIndex].cooldown) {
                obs[sourceId].x = targetX;
                obs[sourceId].y = targetY;
                obs[sourceId].abilities[abilityIndex].lastcast = newTime;
                prefabs.generateNew(obs, sourceId, targetX, targetY, types.ObjectTypes.PROJECTILE, types.Projectile.FLAME_DASH_PROJECTILE);
            }
        },
    };
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Abilities/FlamePillar.js":
/*!******************************************!*\
  !*** ./Prefabs/Abilities/FlamePillar.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var flamePillarCooldown = 3000;
function generateNew(obs) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return {
        type: types.Abilities.FLAME_PILLAR,
        cooldown: flamePillarCooldown,
        lastcast: undefined,
        cast: function (obs, sourceId, abilityIndex, targetX, targetY) {
            var newTime = Date.now();
            if (!obs[sourceId].abilities[abilityIndex].lastcast
                || newTime - obs[sourceId].abilities[abilityIndex].lastcast >= obs[sourceId].abilities[abilityIndex].cooldown) {
                obs[sourceId].abilities[abilityIndex].lastcast = newTime;
                prefabs.generateNew(obs, sourceId, targetX, targetY, types.ObjectTypes.PROJECTILE, types.Projectile.FLAME_PILLAR_PROJECTILE);
            }
        },
    };
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/CombatText/DamageText.js":
/*!******************************************!*\
  !*** ./Prefabs/CombatText/DamageText.js ***!
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
var damageTextColor = "#555555FF";
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    return __assign({}, base, { subtype: types.CombatText.DAMAGE_TEXT, color: damageTextColor });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/CombatText/FireDamageText.js":
/*!**********************************************!*\
  !*** ./Prefabs/CombatText/FireDamageText.js ***!
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
var fireDamageTextColor = "#FF0000FF";
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    return __assign({}, base, { subtype: types.CombatText.FIRE_DAMAGE_TEXT, color: fireDamageTextColor });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/CombatText/HealText.js":
/*!****************************************!*\
  !*** ./Prefabs/CombatText/HealText.js ***!
  \****************************************/
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
var healTextColor = "#00CC00FF";
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    return __assign({}, base, { subtype: types.CombatText.HEAL_TEXT, color: healTextColor });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/CombatText/InvulnerableText.js":
/*!************************************************!*\
  !*** ./Prefabs/CombatText/InvulnerableText.js ***!
  \************************************************/
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
var invulnerableTextColor = "#AAAA0088"; // TODO: More visible color...
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    return __assign({}, base, { subtype: types.CombatText.INVULNERABLE_TEXT, color: invulnerableTextColor });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/CombatText/_CombatText.js":
/*!*******************************************!*\
  !*** ./Prefabs/CombatText/_CombatText.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var combatTextAnimationSpeed = 0.12;
var combatTextFontSize = 9;
var combatTextColor = "#000000FF";
var combatTextDuration = 200;
function generateNew(obs, src, posX, posY, params) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var x = obs[src] ? obs[src].x + (Math.random() - 0.5) * obs[src].width * 4 : posX;
    var y = obs[src] ? obs[src].y - Math.random() * obs[src].height * 3 - obs[src].height * 3 : posY;
    var angle = obs[src] ? Math.atan2(y - obs[src].y, x - obs[src].x) : 0;
    return {
        type: types.ObjectTypes.COMBAT_TEXT,
        x: x,
        y: y,
        angle: angle,
        text: params.text,
        size: combatTextFontSize,
        color: combatTextColor,
        facing: angle * 180 / Math.PI + 90,
        initTime: Date.now(),
        duration: combatTextDuration,
        hitboxType: types.HitboxTypes.NONE,
        animationSpeed: combatTextAnimationSpeed,
        update: function (obs, selfId, delta) {
            obs[selfId].velocityX = Math.cos(angle) * obs[selfId].animationSpeed;
            obs[selfId].velocityY = Math.sin(angle) * obs[selfId].animationSpeed;
            var newTime = Date.now();
            var lifeTime = newTime - obs[selfId].initTime;
            obs[selfId].x += obs[selfId].velocityX * delta;
            obs[selfId].y += obs[selfId].velocityY * delta;
            var newOpacity = Math.max((1 - lifeTime / obs[selfId].duration) * 255, 0).toString(16).substring(0, 2).replace(".", "");
            if (newOpacity.length <= 1)
                newOpacity = "0" + newOpacity;
            obs[selfId].color = obs[selfId].color.substring(0, 7) + newOpacity;
            if (obs[selfId] && lifeTime >= obs[selfId].duration) {
                delete obs[selfId];
            }
        },
    };
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Equipment/Binoculars.icon.ts":
/*!**********************************************!*\
  !*** ./Prefabs/Equipment/Binoculars.icon.ts ***!
  \**********************************************/
/*! exports provided: binocularsUIMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "binocularsUIMasterPiece", function() { return binocularsUIMasterPiece; });
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

/***/ "./Prefabs/Equipment/Blaster.icon.ts":
/*!*******************************************!*\
  !*** ./Prefabs/Equipment/Blaster.icon.ts ***!
  \*******************************************/
/*! exports provided: blasterUIMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blasterUIMasterPiece", function() { return blasterUIMasterPiece; });
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

/***/ "./Prefabs/Equipment/Builder.icon.ts":
/*!*******************************************!*\
  !*** ./Prefabs/Equipment/Builder.icon.ts ***!
  \*******************************************/
/*! exports provided: builderUIMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "builderUIMasterPiece", function() { return builderUIMasterPiece; });
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

/***/ "./Prefabs/Equipment/Scanner.icon.ts":
/*!*******************************************!*\
  !*** ./Prefabs/Equipment/Scanner.icon.ts ***!
  \*******************************************/
/*! exports provided: scannerUIMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scannerUIMasterPiece", function() { return scannerUIMasterPiece; });
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
        hitboxType: types.HitboxTypes.RECT,
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
    return __assign({}, base, { subtype: types.Interactable.CAR_ENTER, width: carEnterWidth, height: carEnterHeight, hitboxType: types.HitboxTypes.RECT, hitboxWidth: carEnterHitboxWidth, hitboxHeight: carEnterHitboxHeight, vehicleId: src, onInteract: function (obs, selfRef, interactId) {
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
    return __assign({}, base, { subtype: types.Interactable.HEALTH_PICKUP, width: healthPickupWidth, height: healthPickupHeight, hitboxType: types.HitboxTypes.RECT, hitboxWidth: healthPickupHitboxWidth, hitboxHeight: healthPickupHitboxHeight, onInteract: function (obs, selfRef, interactId) {
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
    return __assign({}, base, { subtype: types.Interactable.PLAYER_TYPE_CHANGER, width: playerTypeChangerWidth, height: playerTypeChangerHeight, hitboxType: types.HitboxTypes.RECT, hitboxWidth: playerTypeChangerHitboxWidth, hitboxHeight: playerTypeChangerHitboxHeight, newPlayerType: params.newType, onInteract: function (obs, selfRef, interactId) {
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
var baseFireTicksDuration = 500;
var firemageFireTicksDuration = 750;
var fireTickDamage = 6;
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return __assign({}, base, { subtype: types.Player.FIRE_MAGE, maxHealth: firemageHealth, health: firemageHealth, speed: firemageSpeed, fireTicksDuration: firemageFireTicksDuration, abilities: [
            prefabs.newAbility(obs, types.Abilities.FIREBOLT),
            prefabs.newAbility(obs, types.Abilities.FLAME_PILLAR),
            prefabs.newAbility(obs, types.Abilities.FLAME_DASH),
            prefabs.newAbility(obs, types.Abilities.FLAME_BARRIER),
        ] });
}
function increaseFireTick(obs, sourceId, amount) {
    var newTime = Date.now();
    if (obs[sourceId].fireTicks && newTime - obs[sourceId].fireTicksLastIncrease < obs[sourceId].fireTicksDuration) {
        obs[sourceId].fireTicks = obs[sourceId].fireTicks + amount;
    }
    else {
        obs[sourceId].fireTicks = amount;
        if (!obs[sourceId].fireTicksDuration) {
            obs[sourceId].fireTicksDuration = baseFireTicksDuration;
        }
    }
    obs[sourceId].fireTicksLastIncrease = newTime;
}
module.exports = {
    generateNew: generateNew,
    increaseFireTick: increaseFireTick,
    fireTickDamage: fireTickDamage,
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

/***/ "./Prefabs/Player/StatusEffects/Invulnerable.template.ts":
/*!***************************************************************!*\
  !*** ./Prefabs/Player/StatusEffects/Invulnerable.template.ts ***!
  \***************************************************************/
/*! exports provided: invulnerableStatusEffectMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invulnerableStatusEffectMasterPiece", function() { return invulnerableStatusEffectMasterPiece; });
/* harmony import */ var _src_Popova_Popova__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../src/Popova/Popova */ "./src/Popova/Popova.ts");

/**
 * Get master piece for invulnerable status effect
 * @param object The invulnerable object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
function invulnerableStatusEffectMasterPiece(object, renderOffsetX, renderOffsetY, renderSize) {
    return {
        palette: ["#FFFF0066"],
        posX: object.x - renderOffsetX,
        posY: object.y - renderOffsetY,
        width: object.width + 2,
        height: object.height + 2,
        facing: 0,
        strokes: [{
                cellX: 0,
                cellY: 0,
                width: object.width + 2,
                height: object.height + 2,
                swatch: 0,
                type: _src_Popova_Popova__WEBPACK_IMPORTED_MODULE_0__["StrokeTypes"].RECT,
            },],
    };
}


/***/ }),

/***/ "./Prefabs/Player/StatusEffects/Stunned.template.ts":
/*!**********************************************************!*\
  !*** ./Prefabs/Player/StatusEffects/Stunned.template.ts ***!
  \**********************************************************/
/*! exports provided: stunnedStatusEffectMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stunnedStatusEffectMasterPiece", function() { return stunnedStatusEffectMasterPiece; });
/**
 * Get master piece for stunned status effect
 * @param object The stunned object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
function stunnedStatusEffectMasterPiece(object, renderOffsetX, renderOffsetY, renderSize) {
    return {
        palette: ["#FFFF00"],
        posX: object.x - renderOffsetX,
        posY: object.y - object.height / 2 - renderOffsetY,
        width: object.width,
        height: 6,
        facing: 0,
        strokes: [{
                cellX: 1,
                cellY: 0,
                width: 1,
                height: 3,
                swatch: 0
            }, {
                cellX: 0,
                cellY: 1,
                width: 3,
                height: 1,
                swatch: 0
            }, {
                cellX: 3,
                cellY: 4,
                width: 1,
                height: 3,
                swatch: 0
            }, {
                cellX: 2,
                cellY: 5,
                width: 3,
                height: 1,
                swatch: 0
            }, {
                cellX: 5,
                cellY: 1,
                width: 1,
                height: 3,
                swatch: 0
            }, {
                cellX: 4,
                cellY: 2,
                width: 3,
                height: 1,
                swatch: 0
            },],
        customRenderSize: 2,
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
        hitboxType: types.HitboxTypes.RECT,
        hitboxWidth: playerWidth - 2,
        hitboxHeight: playerHeight,
        health: playerHealth,
        maxHealth: playerHealth,
        currentEquipment: undefined,
        equipment: [],
        abilities: [],
        statusEffects: {},
        viewRange: playerViewRange,
        deathrattle: function (obs, selfRef) {
            prefabs.generateNew(obs, selfRef, obs[selfRef].x, obs[selfRef].y, types.ObjectTypes.GRAVESTONE);
        },
        update: function (obs, selfId, delta) {
            obs[selfId].updateStatusEffects(obs, selfId);
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
            if (obs[mouseEvent.sourceId].abilities[0] && !checkStatusEffect(obs, mouseEvent.sourceId, types.StatusEffects.STUNNED)) {
                obs[mouseEvent.sourceId].abilities[0].cast(obs, mouseEvent.sourceId, 0, mouseEvent.targetX, mouseEvent.targetY);
            }
        },
        onPlayerInput: function (obs, selfId, playerInput) {
            player = obs[selfId];
            if (checkStatusEffect(obs, selfId, types.StatusEffects.STUNNED)) {
                player.velocityX = 0;
                player.velocityY = 0;
            }
            else {
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
                if (playerInput.cycleEquipmentForward && !playerInput.cycleEquipmentBackward && obs[selfId].currentEquipment != undefined) {
                    player.equipment[player.currentEquipment].onDequip(obs, selfId);
                    player.currentEquipment = player.currentEquipment + 1 >= player.equipment.length ? 0 : player.currentEquipment + 1;
                    player.equipment[player.currentEquipment].onEquip(obs, selfId);
                }
                if (playerInput.cycleEquipmentBackward && !playerInput.cycleEquipmentForward && obs[selfId].currentEquipment != undefined) {
                    player.equipment[player.currentEquipment].onDequip(obs, selfId);
                    player.currentEquipment = player.currentEquipment - 1 < 0 ? player.equipment.length - 1 : player.currentEquipment - 1;
                    player.equipment[player.currentEquipment].onEquip(obs, selfId);
                }
                if (playerInput.useEquipment && obs[selfId].currentEquipment != undefined) {
                    obs[selfId].equipment[obs[selfId].currentEquipment]
                        .use(obs, selfId, playerInput.targetX, playerInput.targetY);
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
            }
        },
        heal: function (obs, selfId, amount) {
            if (obs[selfId]) {
                var healAmount = obs[selfId].health + amount >= obs[selfId].maxHealth
                    ? obs[selfId].maxHealth - obs[selfId].health
                    : amount;
                obs[selfId].health += healAmount;
                prefabs.generateNew(obs, selfId, 0, 0, types.ObjectTypes.COMBAT_TEXT, types.CombatText.HEAL_TEXT, { text: "+" + healAmount });
            }
        },
        damage: function (obs, selfId, amount) {
            if (checkStatusEffect(obs, selfId, types.StatusEffects.INVULNERABLE)) {
                prefabs.generateNew(obs, selfId, 0, 0, types.ObjectTypes.COMBAT_TEXT, types.CombatText.INVULNERABLE_TEXT, { text: "* " + amount + " *" });
            }
            else {
                obs[selfId].health -= amount;
                if (obs[selfId].health <= 0) {
                    obs[selfId].deathrattle(obs, selfId);
                }
            }
        },
        updateStatusEffects: function (obs, selfId) {
            var newTime = Date.now();
            statusEffectCheckHelper(obs, selfId, types.StatusEffects.STUNNED, newTime);
            statusEffectCheckHelper(obs, selfId, types.StatusEffects.INVULNERABLE, newTime);
        },
        addStatusEffect: function (obs, id, effect, duration) {
            var newTime = Date.now();
            // Only replace the current status effect last cast and duration if the new duration is longer than what's left
            if (!obs[id].statusEffects[effect] ||
                obs[id].statusEffects[effect].duration - (newTime - obs[id].statusEffects[effect].last) < duration) {
                obs[id].statusEffects[effect] = {};
                obs[id].statusEffects[effect].last = newTime;
                obs[id].statusEffects[effect].duration = duration;
            }
        },
    };
}
function statusEffectCheckHelper(obs, id, effect, newTime) {
    if (obs[id].statusEffects[effect] &&
        newTime - obs[id].statusEffects[effect].last >= obs[id].statusEffects[effect].duration) {
        delete obs[id].statusEffects[effect];
    }
}
function checkStatusEffect(obs, id, effect) {
    return obs[id].statusEffects[effect];
}
function checkStatusEffectObject(object, effect) {
    return object.statusEffects[effect];
}
module.exports = {
    generateNew: generateNew,
    checkStatusEffect: checkStatusEffectObject,
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
var flamePillarProjectile = __webpack_require__(/*! ./Projectile/FlamePillarProjectile */ "./Prefabs/Projectile/FlamePillarProjectile.js");
var flameDashProjectile = __webpack_require__(/*! ./Projectile/FlameDashProjectile */ "./Prefabs/Projectile/FlameDashProjectile.js");
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
var flamePillar = __webpack_require__(/*! ./Abilities/FlamePillar */ "./Prefabs/Abilities/FlamePillar.js");
var flameDash = __webpack_require__(/*! ./Abilities/FlameDash */ "./Prefabs/Abilities/FlameDash.js");
var flameBarrier = __webpack_require__(/*! ./Abilities/FlameBarrier */ "./Prefabs/Abilities/FlameBarrier.js");
var _combatText = __webpack_require__(/*! ./CombatText/_CombatText */ "./Prefabs/CombatText/_CombatText.js");
var damageText = __webpack_require__(/*! ./CombatText/DamageText */ "./Prefabs/CombatText/DamageText.js");
var fireDamageText = __webpack_require__(/*! ./CombatText/FireDamageText */ "./Prefabs/CombatText/FireDamageText.js");
var invulnerableText = __webpack_require__(/*! ./CombatText/InvulnerableText */ "./Prefabs/CombatText/InvulnerableText.js");
var healText = __webpack_require__(/*! ./CombatText/HealText */ "./Prefabs/CombatText/HealText.js");
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
                    case types.Projectile.FIREBOLT_PROJECTILE:
                        newObj = fireboltProjectile.generateNew(obs, src, posX, posY, newObj);
                        break;
                    case types.Projectile.FLAME_PILLAR_PROJECTILE:
                        newObj = flamePillarProjectile.generateNew(obs, src, posX, posY, newObj);
                        break;
                    case types.Projectile.FLAME_DASH_PROJECTILE:
                        newObj = flameDashProjectile.generateNew(obs, src, posX, posY, newObj);
                        if (!newObj)
                            return;
                        break;
                        obs[newId.concat(":" + dup)] = newObj;
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
            case types.ObjectTypes.COMBAT_TEXT:
                // Generate unique Id for new combat text
                var newId = src.concat(":" + type + ":" + subtype + ":", posX, ":", posY);
                var dup = 0;
                while (obs[newId.concat(":" + dup)]) {
                    dup++;
                }
                newObj = _combatText.generateNew(obs, src, posX, posY, params);
                switch (subtype) {
                    case types.CombatText.DAMAGE_TEXT:
                        newObj = damageText.generateNew(obs, src, posX, posY, newObj);
                        break;
                    case types.CombatText.FIRE_DAMAGE_TEXT:
                        newObj = fireDamageText.generateNew(obs, src, posX, posY, newObj);
                        break;
                    case types.CombatText.INVULNERABLE_TEXT:
                        newObj = invulnerableText.generateNew(obs, src, posX, posY, newObj);
                        break;
                    case types.CombatText.HEAL_TEXT:
                        newObj = healText.generateNew(obs, src, posX, posY, newObj);
                        break;
                }
                obs[newId.concat(":" + dup)] = newObj;
                return;
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
                hitboxType: types.HitboxTypes.RECT,
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
                return firebolt.generateNew(obs);
            case types.Abilities.FLAME_PILLAR:
                return flamePillar.generateNew(obs);
            case types.Abilities.FLAME_DASH:
                return flameDash.generateNew(obs);
            case types.Abilities.FLAME_BARRIER:
                return flameBarrier.generateNew(obs);
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
var fireboltHitBoxRadius = 1.5;
var fireboltDamage = 12;
var fireboltTickIncrease = 1;
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    var firemage = __webpack_require__(/*! ../Player/FireMage */ "./Prefabs/Player/FireMage.js");
    return __assign({}, base, { subtype: types.Projectile.FIREBOLT_PROJECTILE, velocityX: Math.cos(base.angle) * fireboltSpeed, velocityY: Math.sin(base.angle) * fireboltSpeed, width: fireboltWidth, height: fireboltHeight, hitboxType: types.HitboxTypes.CIRC, hitboxRadius: fireboltHitBoxRadius, damage: fireboltDamage, onHit: function (obs, srcId, collisionId) {
            switch (obs[collisionId].type) {
                case types.ObjectTypes.PLAYER:
                case types.ObjectTypes.GRAVESTONE:
                case types.ObjectTypes.VEHICLE:
                case types.ObjectTypes.TERRAIN:
                    if (obs[srcId]) {
                        if (obs[collisionId] && obs[collisionId].damage) {
                            firemage.increaseFireTick(obs, obs[srcId].source, obs[collisionId].type === types.ObjectTypes.PLAYER ? fireboltTickIncrease : 0);
                            var damage = obs[srcId].damage;
                            var fireDamage = obs[obs[srcId].source].fireTicks ? obs[obs[srcId].source].fireTicks * firemage.fireTickDamage : 0;
                            prefabs.generateNew(obs, collisionId, 0, 0, types.ObjectTypes.COMBAT_TEXT, types.CombatText.DAMAGE_TEXT, { text: "-" + damage });
                            if (fireDamage)
                                prefabs.generateNew(obs, collisionId, 0, 0, types.ObjectTypes.COMBAT_TEXT, types.CombatText.FIRE_DAMAGE_TEXT, { text: "-" + fireDamage });
                            obs[collisionId].damage(obs, collisionId, damage + fireDamage);
                        }
                        delete obs[srcId];
                    }
                    break;
            }
        } });
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

/***/ "./Prefabs/Projectile/FlameDashProjectile.js":
/*!***************************************************!*\
  !*** ./Prefabs/Projectile/FlameDashProjectile.js ***!
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
var flameDashSpeed = 0.14;
var flameDashWidth = 2;
var flameDashHeight = 2;
var flameDashHitBoxRadius = 1;
var flameDashDamage = 8;
var flameDashTickIncrease = 2;
var flameDashTrackingRadius = 150;
var flameDashMaxProjDistance = flameDashTrackingRadius * 2;
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    var firemage = __webpack_require__(/*! ../Player/FireMage */ "./Prefabs/Player/FireMage.js");
    var collisions = __webpack_require__(/*! ../../Collisions */ "./Collisions.js");
    var trackId = undefined;
    var smallestDist = undefined;
    collisions.checkCollisionsByDistance(src, obs, flameDashTrackingRadius, function (srcId, collisionId, dist) {
        if (obs[collisionId] && obs[srcId] && srcId !== collisionId) {
            switch (obs[collisionId].type) {
                case types.ObjectTypes.PLAYER:
                case types.ObjectTypes.GRAVESTONE:
                case types.ObjectTypes.VEHICLE:
                case types.ObjectTypes.TERRAIN:
                    if (!trackId || dist < smallestDist) {
                        trackId = collisionId;
                        smallestDist = dist;
                    }
                    break;
            }
        }
    });
    if (!trackId)
        return;
    return __assign({}, base, { subtype: types.Projectile.FLAME_DASH_PROJECTILE, velocityX: 0, velocityY: 0, width: flameDashWidth, height: flameDashHeight, hitboxType: types.HitboxTypes.RECT, hitboxWidth: flameDashHitBoxRadius, hitboxHeight: flameDashHitBoxRadius, damage: flameDashDamage, trackId: trackId, maxProjDist: flameDashMaxProjDistance, update: function (obs, selfId, delta) {
            if (obs[selfId] && obs[obs[selfId].trackId]) {
                var dist = Math.sqrt(Math.pow(obs[selfId].x - obs[obs[selfId].trackId].x, 2) +
                    Math.pow(obs[selfId].y - obs[obs[selfId].trackId].y, 2));
                if (dist > flameDashTrackingRadius) {
                    delete obs[selfId];
                }
                else {
                    var angle = Math.atan2(obs[obs[selfId].trackId].y - obs[selfId].y, obs[obs[selfId].trackId].x - obs[selfId].x);
                    obs[selfId].velocityX = Math.cos(angle) * flameDashSpeed,
                        obs[selfId].velocityY = Math.sin(angle) * flameDashSpeed,
                        // Calculate projectile movement
                        obs[selfId].x += obs[selfId].velocityX * delta;
                    obs[selfId].y += obs[selfId].velocityY * delta;
                    obs[selfId].dist += Math.sqrt(Math.pow(obs[selfId].velocityX * delta, 2) +
                        Math.pow(obs[selfId].velocityY * delta, 2));
                    collisions.checkCollisions(selfId, obs, prefabs.renderSize, function (srcId, collisionId) {
                        if (obs[srcId] && collisionId != srcId && collisionId != obs[srcId].source) {
                            obs[srcId].onHit(obs, srcId, collisionId);
                        }
                    });
                    if (obs[selfId]) {
                        if (obs[selfId].dist > obs[selfId].maxProjDist) {
                            delete obs[selfId];
                        }
                    }
                }
            }
            else {
                if (obs[selfId])
                    delete obs[selfId];
            }
        }, onHit: function (obs, srcId, collisionId) {
            switch (obs[collisionId].type) {
                case types.ObjectTypes.PLAYER:
                case types.ObjectTypes.GRAVESTONE:
                case types.ObjectTypes.VEHICLE:
                case types.ObjectTypes.TERRAIN:
                    if (obs[srcId]) {
                        if (obs[collisionId] && obs[collisionId].damage) {
                            firemage.increaseFireTick(obs, obs[srcId].source, obs[collisionId].type === types.ObjectTypes.PLAYER ? flameDashTickIncrease : 0);
                            var damage = obs[srcId].damage;
                            var fireDamage = obs[obs[srcId].source].fireTicks ? obs[obs[srcId].source].fireTicks * firemage.fireTickDamage : 0;
                            prefabs.generateNew(obs, collisionId, 0, 0, types.ObjectTypes.COMBAT_TEXT, types.CombatText.DAMAGE_TEXT, { text: "-" + damage });
                            if (fireDamage)
                                prefabs.generateNew(obs, collisionId, 0, 0, types.ObjectTypes.COMBAT_TEXT, types.CombatText.FIRE_DAMAGE_TEXT, { text: "-" + fireDamage });
                            obs[collisionId].damage(obs, collisionId, damage + fireDamage);
                        }
                        delete obs[srcId];
                    }
                    break;
            }
        } });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Projectile/FlameDashProjectile.template.ts":
/*!************************************************************!*\
  !*** ./Prefabs/Projectile/FlameDashProjectile.template.ts ***!
  \************************************************************/
/*! exports provided: flameDashProjectileMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flameDashProjectileMasterPiece", function() { return flameDashProjectileMasterPiece; });
/**
 * Get master piece for fire dash projectile
 * @param object The fire dash projectile object
 * @param renderOffsetX Horizontal offset for rendering the objects
 * @param renderOffsetY Vertical offset for rendering the objects
 */
function flameDashProjectileMasterPiece(object, renderOffsetX, renderOffsetY) {
    var customRenderSize = 2;
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
                width: 2,
                height: object.height * customRenderSize,
                swatch: 0
            }, {
                cellX: 0,
                cellY: 1,
                width: object.width * customRenderSize,
                height: 2,
                swatch: 0
            }, {
                cellX: 0.5,
                cellY: 0.5,
                width: 3,
                height: 3,
                swatch: 0
            }, {
                cellX: 1,
                cellY: 1,
                width: 2,
                height: 2,
                swatch: 1
            },],
        customRenderSize: customRenderSize,
    };
}


/***/ }),

/***/ "./Prefabs/Projectile/FlamePillarProjectile.js":
/*!*****************************************************!*\
  !*** ./Prefabs/Projectile/FlamePillarProjectile.js ***!
  \*****************************************************/
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
var flamePillarSpeed = 0;
var flamePillarWidth = 6;
var flamePillarHeight = 12;
var flamePillarHitBoxWidth = 6;
var flamePillarHitBoxHeight = 12;
var flamePillarDamage = 16;
var flamePillarTickIncrease = 3;
var flamePillarStunDuration = 1500;
var flamePillarTriggerDelay = 500;
var flamePillarTimeout = 1000;
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    var firemage = __webpack_require__(/*! ../Player/FireMage */ "./Prefabs/Player/FireMage.js");
    var collisions = __webpack_require__(/*! ../../Collisions */ "./Collisions.js");
    return __assign({}, base, { subtype: types.Projectile.FLAME_PILLAR_PROJECTILE, x: posX, y: posY, velocityX: flamePillarSpeed, velocityY: flamePillarSpeed, facing: 0, width: flamePillarWidth, height: flamePillarHeight, hitboxType: types.HitboxTypes.RECT, hitboxWidth: flamePillarHitBoxWidth, hitboxHeight: flamePillarHitBoxHeight, damage: flamePillarDamage, initTime: Date.now(), triggered: false, update: function (obs, selfId, delta) {
            var newTime = Date.now();
            // If timeout is passed, delete item
            if (obs[selfId] && newTime - obs[selfId].initTime >= flamePillarTimeout) {
                delete obs[selfId];
            }
            // If trigger delay elapsed, check for object collisions
            if (obs[selfId] && newTime - obs[selfId].initTime >= flamePillarTriggerDelay) {
                obs[selfId].triggered = true;
                collisions.checkCollisions(selfId, obs, prefabs.renderSize, function (srcId, collisionId) {
                    if (obs[srcId] && collisionId != srcId && collisionId != obs[srcId].source) {
                        obs[srcId].onHit(obs, srcId, collisionId);
                    }
                });
            }
        }, onHit: function (obs, srcId, collisionId) {
            switch (obs[collisionId].type) {
                case types.ObjectTypes.PLAYER:
                    obs[collisionId].addStatusEffect(obs, collisionId, types.StatusEffects.STUNNED, flamePillarStunDuration);
                case types.ObjectTypes.GRAVESTONE:
                case types.ObjectTypes.VEHICLE:
                case types.ObjectTypes.TERRAIN:
                    if (obs[srcId]) {
                        if (obs[collisionId] && obs[collisionId].damage) {
                            firemage.increaseFireTick(obs, obs[srcId].source, obs[collisionId].type === types.ObjectTypes.PLAYER ? flamePillarTickIncrease : 0);
                            var damage = obs[srcId].damage;
                            var fireDamage = obs[obs[srcId].source].fireTicks ? obs[obs[srcId].source].fireTicks * firemage.fireTickDamage : 0;
                            prefabs.generateNew(obs, collisionId, 0, 0, types.ObjectTypes.COMBAT_TEXT, types.CombatText.DAMAGE_TEXT, { text: "-" + damage });
                            if (fireDamage)
                                prefabs.generateNew(obs, collisionId, 0, 0, types.ObjectTypes.COMBAT_TEXT, types.CombatText.FIRE_DAMAGE_TEXT, { text: "-" + fireDamage });
                            obs[collisionId].damage(obs, collisionId, damage + fireDamage);
                        }
                        delete obs[srcId];
                    }
                    break;
            }
        } });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Projectile/FlamePillarProjectile.template.ts":
/*!**************************************************************!*\
  !*** ./Prefabs/Projectile/FlamePillarProjectile.template.ts ***!
  \**************************************************************/
/*! exports provided: flamePillarProjectileMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flamePillarProjectileMasterPiece", function() { return flamePillarProjectileMasterPiece; });
/**
 * Get master piece for fire pillar projectile
 * @param object The fire pillar projectile object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
function flamePillarProjectileMasterPiece(object, renderOffsetX, renderOffsetY) {
    return {
        palette: ["#E67E00D9", "#FF6933D9", "#FF8C00D9", "#FFA500D9"],
        posX: object.x - renderOffsetX,
        posY: object.y - renderOffsetY,
        width: object.width,
        height: object.height,
        facing: object.facing,
        strokes: [{
                cellX: 1,
                cellY: 0,
                width: object.width - 2,
                height: object.height,
                swatch: object.triggered ? 1 : 0
            }, {
                cellX: 0,
                cellY: 1,
                width: object.width,
                height: object.height - 1,
                swatch: object.triggered ? 1 : 0
            }, {
                cellX: 0,
                cellY: 3,
                width: 2,
                height: 1,
                swatch: object.triggered ? 3 : 2
            }, {
                cellX: 2,
                cellY: 4,
                width: 2,
                height: 1,
                swatch: object.triggered ? 3 : 2
            }, {
                cellX: 4,
                cellY: 5,
                width: 2,
                height: 1,
                swatch: object.triggered ? 3 : 2
            }, {
                cellX: 0,
                cellY: 7,
                width: 2,
                height: 1,
                swatch: object.triggered ? 3 : 2
            }, {
                cellX: 2,
                cellY: 8,
                width: 2,
                height: 1,
                swatch: object.triggered ? 3 : 2
            }, {
                cellX: 4,
                cellY: 9,
                width: 2,
                height: 1,
                swatch: object.triggered ? 3 : 2
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
        hitboxType: types.HitboxTypes.RECT,
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
                    obs[srcId].onHit(obs, srcId, collisionId);
                }
            });
            if (obs[selfId]) {
                if (obs[selfId].dist > obs[selfId].maxProjDist) {
                    delete obs[selfId];
                }
            }
        },
        onHit: function (obs, srcId, collisionId) {
            switch (obs[collisionId].type) {
                case types.ObjectTypes.PLAYER:
                case types.ObjectTypes.GRAVESTONE:
                case types.ObjectTypes.VEHICLE:
                case types.ObjectTypes.TERRAIN:
                    if (obs[srcId]) {
                        if (obs[collisionId] && obs[collisionId].damage) {
                            prefabs.generateNew(obs, collisionId, 0, 0, types.ObjectTypes.COMBAT_TEXT, types.CombatText.DAMAGE_TEXT, { text: "-" + obs[srcId].damage });
                            obs[collisionId].damage(obs, collisionId, obs[srcId].damage);
                        }
                        delete obs[srcId];
                    }
                    break;
            }
        },
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
    return __assign({}, base, { subtype: types.Terrain.TREE, width: treeWidth, height: treeHeight, hitboxType: types.HitboxTypes.RECT, hitboxWidth: treeHitboxWidth, hitboxHeight: treeHitboxHeight, health: treeHealth, maxHealth: treeHealth });
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
    return __assign({}, base, { subtype: types.Terrain.WALL_HORIZ, width: wallHorizWidth, height: wallHorizHeight, hitboxType: types.HitboxTypes.RECT, hitboxWidth: wallHorizHitboxWidth, hitboxHeight: wallHorizHitboxHeight, health: wallHorizHealth, maxHealth: wallHorizHealth });
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
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return __assign({}, base, { subtype: types.Trigger.SPIKE_TRAP, width: spikeTrapWidth, height: spikeTrapHeight, hitboxType: types.HitboxTypes.RECT, hitboxWidth: spikeTrapHitboxWidth, hitboxHeight: spikeTrapHitboxHeight, onTrigger: function (obs, selfRef, triggerId) {
            if (obs[triggerId] && (obs[triggerId].type == types.ObjectTypes.PLAYER ||
                obs[triggerId].type == types.ObjectTypes.VEHICLE)) {
                if (obs[triggerId].damage) {
                    obs[triggerId].damage(obs, triggerId, spikeTrapDamage);
                    prefabs.generateNew(obs, triggerId, 0, 0, types.ObjectTypes.COMBAT_TEXT, types.CombatText.DAMAGE_TEXT, { text: "-" + spikeTrapDamage });
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
    obs[vehicleId] = __assign({}, base, { subtype: types.Vehicle.CAR, speed: carSpeed, width: carWidth, height: carHeight, hitboxType: types.HitboxTypes.RECT, hitboxWidth: carHitboxWidth, hitboxHeight: carHitboxHeight, health: carHealth, maxHealth: carHealth, carColor: carColors[carColor], viewRange: carViewRange, interactableId: vehicleId + ":" + types.ObjectTypes.INTERACTABLE + ":" + types.Interactable.CAR_ENTER });
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
/*! exports provided: renderObjects, renderCurrentEquipment, renderAbilities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderObjects", function() { return renderObjects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderCurrentEquipment", function() { return renderCurrentEquipment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderAbilities", function() { return renderAbilities; });
/* harmony import */ var _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
/* harmony import */ var _ObjectTypes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ObjectTypes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Prefabs_Player_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Prefabs/Player/_Player */ "./Prefabs/Player/_Player.js");
/* harmony import */ var _Prefabs_Player_Player__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Prefabs_Player_Player__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Prefabs_Player_Player_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Prefabs/Player/_Player.template */ "./Prefabs/Player/_Player.template.ts");
/* harmony import */ var _Prefabs_Player_God_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Prefabs/Player/God.template */ "./Prefabs/Player/God.template.ts");
/* harmony import */ var _Prefabs_Player_FireMage_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Prefabs/Player/FireMage.template */ "./Prefabs/Player/FireMage.template.ts");
/* harmony import */ var _Prefabs_Player_HealthBar_template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Prefabs/Player/HealthBar.template */ "./Prefabs/Player/HealthBar.template.ts");
/* harmony import */ var _Prefabs_Player_StatusEffects_Stunned_template__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Prefabs/Player/StatusEffects/Stunned.template */ "./Prefabs/Player/StatusEffects/Stunned.template.ts");
/* harmony import */ var _Prefabs_Player_StatusEffects_Invulnerable_template__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Prefabs/Player/StatusEffects/Invulnerable.template */ "./Prefabs/Player/StatusEffects/Invulnerable.template.ts");
/* harmony import */ var _Prefabs_Projectile_Projectile_template__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Prefabs/Projectile/_Projectile.template */ "./Prefabs/Projectile/_Projectile.template.ts");
/* harmony import */ var _Prefabs_Projectile_FireboltProjectile_template__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Prefabs/Projectile/FireboltProjectile.template */ "./Prefabs/Projectile/FireboltProjectile.template.ts");
/* harmony import */ var _Prefabs_Projectile_FlamePillarProjectile_template__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../Prefabs/Projectile/FlamePillarProjectile.template */ "./Prefabs/Projectile/FlamePillarProjectile.template.ts");
/* harmony import */ var _Prefabs_Projectile_FlameDashProjectile_template__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../Prefabs/Projectile/FlameDashProjectile.template */ "./Prefabs/Projectile/FlameDashProjectile.template.ts");
/* harmony import */ var _Prefabs_Gravestone_Gravestone_template__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../Prefabs/Gravestone/_Gravestone.template */ "./Prefabs/Gravestone/_Gravestone.template.ts");
/* harmony import */ var _Prefabs_Terrain_Terrain_template__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../Prefabs/Terrain/_Terrain.template */ "./Prefabs/Terrain/_Terrain.template.ts");
/* harmony import */ var _Prefabs_Terrain_Tree_template__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../Prefabs/Terrain/Tree.template */ "./Prefabs/Terrain/Tree.template.ts");
/* harmony import */ var _Prefabs_Terrain_WallHoriz_template__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../Prefabs/Terrain/WallHoriz.template */ "./Prefabs/Terrain/WallHoriz.template.ts");
/* harmony import */ var _Prefabs_Interactable_HealthPickup_template__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../Prefabs/Interactable/HealthPickup.template */ "./Prefabs/Interactable/HealthPickup.template.ts");
/* harmony import */ var _Prefabs_Interactable_PlayerTypeChanger_template__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../Prefabs/Interactable/PlayerTypeChanger.template */ "./Prefabs/Interactable/PlayerTypeChanger.template.ts");
/* harmony import */ var _Prefabs_Trigger_SpikeTrap_template__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../Prefabs/Trigger/SpikeTrap.template */ "./Prefabs/Trigger/SpikeTrap.template.ts");
/* harmony import */ var _Prefabs_Vehicle_Car_template__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../Prefabs/Vehicle/Car.template */ "./Prefabs/Vehicle/Car.template.ts");
/* harmony import */ var _Prefabs_Equipment_Binoculars_icon__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../Prefabs/Equipment/Binoculars.icon */ "./Prefabs/Equipment/Binoculars.icon.ts");
/* harmony import */ var _Prefabs_Equipment_Blaster_icon__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../Prefabs/Equipment/Blaster.icon */ "./Prefabs/Equipment/Blaster.icon.ts");
/* harmony import */ var _Prefabs_Equipment_Builder_icon__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../Prefabs/Equipment/Builder.icon */ "./Prefabs/Equipment/Builder.icon.ts");
/* harmony import */ var _Prefabs_Equipment_Scanner_icon__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../Prefabs/Equipment/Scanner.icon */ "./Prefabs/Equipment/Scanner.icon.ts");
























function renderObjects(objects, renderOffsetX, renderOffsetY, renderSize, background, env, foreground, cover, ui) {
    for (var id in objects) {
        var object = objects[id];
        switch (object.type) {
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].PLAYER:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Player"].HUMAN:
                        foreground.draw(_Prefabs_Player_Player_template__WEBPACK_IMPORTED_MODULE_2__["playerMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Player"].GOD:
                        foreground.draw(_Prefabs_Player_God_template__WEBPACK_IMPORTED_MODULE_3__["godPlayerMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Player"].FIRE_MAGE:
                        foreground.draw(_Prefabs_Player_FireMage_template__WEBPACK_IMPORTED_MODULE_4__["firemagePlayerMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                if (Object(_Prefabs_Player_Player__WEBPACK_IMPORTED_MODULE_1__["checkStatusEffect"])(object, _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["StatusEffects"].STUNNED)) {
                    foreground.draw(_Prefabs_Player_StatusEffects_Stunned_template__WEBPACK_IMPORTED_MODULE_6__["stunnedStatusEffectMasterPiece"](object, renderOffsetX, renderOffsetY, renderSize));
                }
                if (Object(_Prefabs_Player_Player__WEBPACK_IMPORTED_MODULE_1__["checkStatusEffect"])(object, _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["StatusEffects"].INVULNERABLE)) {
                    cover.draw(_Prefabs_Player_StatusEffects_Invulnerable_template__WEBPACK_IMPORTED_MODULE_7__["invulnerableStatusEffectMasterPiece"](object, renderOffsetX, renderOffsetY, renderSize));
                }
                foreground.draw(_Prefabs_Player_HealthBar_template__WEBPACK_IMPORTED_MODULE_5__["healthBarMasterPiece"](object, renderOffsetX, renderOffsetY, renderSize));
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].PROJECTILE:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Projectile"].BASIC_PROJECTILE:
                        env.draw(_Prefabs_Projectile_Projectile_template__WEBPACK_IMPORTED_MODULE_8__["projectileMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Projectile"].FIREBOLT_PROJECTILE:
                        env.draw(_Prefabs_Projectile_FireboltProjectile_template__WEBPACK_IMPORTED_MODULE_9__["fireboltProjectileMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Projectile"].FLAME_PILLAR_PROJECTILE:
                        env.draw(_Prefabs_Projectile_FlamePillarProjectile_template__WEBPACK_IMPORTED_MODULE_10__["flamePillarProjectileMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Projectile"].FLAME_DASH_PROJECTILE:
                        env.draw(_Prefabs_Projectile_FlameDashProjectile_template__WEBPACK_IMPORTED_MODULE_11__["flameDashProjectileMasterPiece"](object, renderOffsetX, renderOffsetY));
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].GRAVESTONE:
                env.draw(_Prefabs_Gravestone_Gravestone_template__WEBPACK_IMPORTED_MODULE_12__["graveStoneMasterPiece"](object, renderOffsetX, renderOffsetY));
                env.draw(_Prefabs_Player_HealthBar_template__WEBPACK_IMPORTED_MODULE_5__["healthBarMasterPiece"](object, renderOffsetX, renderOffsetY, renderSize));
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].TERRAIN:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Terrain"].TREE:
                        env.draw(_Prefabs_Terrain_Tree_template__WEBPACK_IMPORTED_MODULE_14__["treeTrunkMasterPiece"](object, renderOffsetX, renderOffsetY));
                        cover.draw(_Prefabs_Terrain_Tree_template__WEBPACK_IMPORTED_MODULE_14__["treeLeafMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Terrain"].WALL_HORIZ:
                        env.draw(_Prefabs_Terrain_WallHoriz_template__WEBPACK_IMPORTED_MODULE_15__["wallHorizBaseMasterPiece"](object, renderOffsetX, renderOffsetY));
                        cover.draw(_Prefabs_Terrain_WallHoriz_template__WEBPACK_IMPORTED_MODULE_15__["wallHorizCoverMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].INTERACTABLE:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Interactable"].HEALTH_PICKUP:
                        env.draw(_Prefabs_Interactable_HealthPickup_template__WEBPACK_IMPORTED_MODULE_16__["healthPickupMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Interactable"].PLAYER_TYPE_CHANGER:
                        env.draw(_Prefabs_Interactable_PlayerTypeChanger_template__WEBPACK_IMPORTED_MODULE_17__["playerTypeChangerMasterPiece"](object, renderOffsetX, renderOffsetY));
                        env.draw(_Prefabs_Interactable_PlayerTypeChanger_template__WEBPACK_IMPORTED_MODULE_17__["littleManMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].TRIGGER:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Trigger"].SPIKE_TRAP:
                        env.draw(_Prefabs_Trigger_SpikeTrap_template__WEBPACK_IMPORTED_MODULE_18__["spikeTrapMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].VEHICLE:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Vehicle"].CAR:
                        foreground.draw(_Prefabs_Vehicle_Car_template__WEBPACK_IMPORTED_MODULE_19__["carMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].COMBAT_TEXT:
                ui.drawText(object.text, object.x - renderOffsetX, object.y - renderOffsetY, object.size, object.color, object.facing);
                break;
            default:
                env.draw(_Prefabs_Terrain_Terrain_template__WEBPACK_IMPORTED_MODULE_13__["defaultTerrainMasterPiece"](object, renderOffsetX, renderOffsetY));
                break;
        }
    }
}
function renderCurrentEquipment(player, renderOffsetX, renderOffsetY, ui) {
    if (player && player.currentEquipment != undefined) {
        switch (player.equipment[player.currentEquipment].type) {
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["EquipmentTypes"].BLASTER:
                ui.draw(_Prefabs_Equipment_Blaster_icon__WEBPACK_IMPORTED_MODULE_21__["blasterUIMasterPiece"](renderOffsetX, renderOffsetY));
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["EquipmentTypes"].SCANNER:
                ui.draw(_Prefabs_Equipment_Scanner_icon__WEBPACK_IMPORTED_MODULE_23__["scannerUIMasterPiece"](renderOffsetX, renderOffsetY));
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["EquipmentTypes"].BUILDER:
                ui.draw(_Prefabs_Equipment_Builder_icon__WEBPACK_IMPORTED_MODULE_22__["builderUIMasterPiece"](renderOffsetX, renderOffsetY));
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["EquipmentTypes"].BINOCULARS:
                ui.draw(_Prefabs_Equipment_Binoculars_icon__WEBPACK_IMPORTED_MODULE_20__["binocularsUIMasterPiece"](renderOffsetX, renderOffsetY));
                break;
            default:
                break;
        }
    }
}
function renderAbilities(player, ui) {
    if (player && player.abilities) {
        var iconSize_1 = 48;
        var numAbilities_1 = player.abilities.length;
        var renderWidth_1 = ui.size().width / 2;
        var renderHeight_1 = ui.size().height - iconSize_1;
        // TODO: Move these to their own template files
        player.abilities.forEach(function (ability, index) {
            var iconPosX = renderWidth_1 + (0.5 - numAbilities_1 / 2 + index) * iconSize_1;
            var remaining = (ability.cooldown - (Date.now() - ability.lastcast)) / 1000;
            ui.draw({
                palette: ["#888888", "#CCCCCC", "#BBBBBB"],
                posX: iconPosX,
                posY: renderHeight_1,
                width: 8,
                height: 8,
                facing: 0,
                strokes: [{
                        cellX: 1,
                        cellY: 0,
                        width: 14,
                        height: 16,
                        swatch: 0
                    }, {
                        cellX: 0,
                        cellY: 1,
                        width: 16,
                        height: 14,
                        swatch: 0
                    }, {
                        cellX: 1,
                        cellY: 1,
                        width: 14,
                        height: 14,
                        swatch: (remaining > 0) ? 1 : 2
                    },],
                customRenderSize: 2
            });
            if (remaining > 0) {
                ui.drawText(remaining.toFixed(1), iconPosX, renderHeight_1 + 4, 12, "#EEEEEE");
            }
            else {
                ui.drawText(String(index + 1), iconPosX, renderHeight_1 + 6, 18, "#EEEEEE");
            }
        });
    }
}


/***/ }),

/***/ "./src/Popova/Popova.ts":
/*!******************************!*\
  !*** ./src/Popova/Popova.ts ***!
  \******************************/
/*! exports provided: StrokeTypes, Popova */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrokeTypes", function() { return StrokeTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Popova", function() { return Popova; });
var StrokeTypes;
(function (StrokeTypes) {
    StrokeTypes["RECT"] = "stroke-rect";
    StrokeTypes["CIRC"] = "stroke-circ";
})(StrokeTypes || (StrokeTypes = {}));
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
        this.width = this.canvas.offsetWidth - 4;
        this.height = this.canvas.offsetHeight - 4;
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
        this.ctx.strokeStyle = "#f0e7db";
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
    Popova.prototype.prepCanvas = function (positionX, positionY, width, height, degrees, customRenderSize) {
        var renderSize = customRenderSize ? customRenderSize : this.cubeSize;
        this.ctx.beginPath();
        this.ctx.translate(positionX, positionY);
        this.ctx.rotate(degrees * Math.PI / 180);
        this.ctx.translate(-width * renderSize / 2, -height * renderSize / 2);
    };
    /**
     * Renders
     * @param stroke Stroke to render
     * @param palette Contains the master piece's color swatches
     * @param customRenderSize Render the master piece with custom cube sizing
     */
    Popova.prototype.renderStroke = function (stroke, palette, customRenderSize) {
        this.ctx.fillStyle = palette[stroke.swatch];
        if (stroke.type && stroke.type === StrokeTypes.CIRC) {
            this.ctx.fillCirc(2, 2, 2, 2); // TODO: Draw circle to canvas
        }
        else {
            this.ctx.fillRect(stroke.cellX * (customRenderSize ? customRenderSize : this.cubeSize), stroke.cellY * (customRenderSize ? customRenderSize : this.cubeSize), stroke.width * (customRenderSize ? customRenderSize : this.cubeSize), stroke.height * (customRenderSize ? customRenderSize : this.cubeSize));
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
    /**
     * Draw text to the canvas
     * @param text The text to draw
     * @param posX The horizontal position to draw the text
     * @param posY The vertical position to draw the text
     * @param size The font size of the text
     * @param color The color to draw the text
     * @param facing The angle to render the text
     */
    Popova.prototype.drawText = function (text, posX, posY, size, color, facing) {
        this.ctx.save();
        var actualSize = size ? size : 16;
        this.ctx.font = String(actualSize) + "px Arial";
        this.prepCanvas(posX, posY, this.ctx.measureText(text).width, 0, facing, 1);
        this.ctx.fillStyle = color ? color : "black";
        this.ctx.fillText(text, 0, 0);
        this.ctx.restore();
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
    useEquipment: false,
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
var KEY_USE_EQUIPMENT = 82; // Default to R
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
        case KEY_USE_EQUIPMENT:
            playerInput.useEquipment = true;
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
    playerInput.useEquipment = false;
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
        case KEY_ABILITY_1:
            playerInput.ability1 = false;
            break;
        case KEY_ABILITY_2:
            playerInput.ability2 = false;
            break;
        case KEY_ABILITY_3:
            playerInput.ability3 = false;
            break;
        case KEY_ABILITY_4:
            playerInput.ability4 = false;
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
        ui.drawText(delta.toString() + "ms", canvasSize.width - 32, 16, 16, "#444444");
    }
    // Render current equipment ui icon
    _Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["renderCurrentEquipment"](player, equipmentIconPosX, equipmentIconPosY, ui);
    // Render player's abilities
    _Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["renderAbilities"](player, ui);
    // Render objects
    _Louvre_Louvre__WEBPACK_IMPORTED_MODULE_1__["renderObjects"](objects, renderOffsetX, renderOffsetY, cubeSize, background, env, foreground, cover, ui);
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vQ29sbGlzaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9PYmplY3RUeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0FiaWxpdGllcy9GaXJlYm9sdC5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0FiaWxpdGllcy9GbGFtZUJhcnJpZXIuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9BYmlsaXRpZXMvRmxhbWVEYXNoLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvQWJpbGl0aWVzL0ZsYW1lUGlsbGFyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvQ29tYmF0VGV4dC9EYW1hZ2VUZXh0LmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvQ29tYmF0VGV4dC9GaXJlRGFtYWdlVGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0NvbWJhdFRleHQvSGVhbFRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9Db21iYXRUZXh0L0ludnVsbmVyYWJsZVRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9Db21iYXRUZXh0L19Db21iYXRUZXh0LmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRXF1aXBtZW50L0Jpbm9jdWxhcnMuaWNvbi50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0VxdWlwbWVudC9CaW5vY3VsYXJzLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRXF1aXBtZW50L0JsYXN0ZXIuaWNvbi50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0VxdWlwbWVudC9CbGFzdGVyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRXF1aXBtZW50L0J1aWxkZXIuaWNvbi50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0VxdWlwbWVudC9CdWlsZGVyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRXF1aXBtZW50L1NjYW5uZXIuaWNvbi50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0VxdWlwbWVudC9TY2FubmVyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvR3JhdmVzdG9uZS9fR3JhdmVzdG9uZS5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0dyYXZlc3RvbmUvX0dyYXZlc3RvbmUudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9JbnRlcmFjdGFibGUvQ2FyRW50ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9JbnRlcmFjdGFibGUvSGVhbHRoUGlja3VwLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvSW50ZXJhY3RhYmxlL0hlYWx0aFBpY2t1cC50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0ludGVyYWN0YWJsZS9QbGF5ZXJUeXBlQ2hhbmdlci5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0ludGVyYWN0YWJsZS9QbGF5ZXJUeXBlQ2hhbmdlci50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0ludGVyYWN0YWJsZS9fSW50ZXJhY3RhYmxlLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL0ZpcmVNYWdlLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL0ZpcmVNYWdlLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL0dvZC5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1BsYXllci9Hb2QudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9QbGF5ZXIvSGVhbHRoQmFyLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL1N0YXR1c0VmZmVjdHMvSW52dWxuZXJhYmxlLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL1N0YXR1c0VmZmVjdHMvU3R1bm5lZC50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1BsYXllci9fUGxheWVyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL19QbGF5ZXIudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9QcmVmYWJzLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUHJvamVjdGlsZS9GaXJlYm9sdFByb2plY3RpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9Qcm9qZWN0aWxlL0ZpcmVib2x0UHJvamVjdGlsZS50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1Byb2plY3RpbGUvRmxhbWVEYXNoUHJvamVjdGlsZS5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1Byb2plY3RpbGUvRmxhbWVEYXNoUHJvamVjdGlsZS50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1Byb2plY3RpbGUvRmxhbWVQaWxsYXJQcm9qZWN0aWxlLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUHJvamVjdGlsZS9GbGFtZVBpbGxhclByb2plY3RpbGUudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9Qcm9qZWN0aWxlL19Qcm9qZWN0aWxlLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUHJvamVjdGlsZS9fUHJvamVjdGlsZS50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1RlcnJhaW4vVHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1RlcnJhaW4vVHJlZS50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1RlcnJhaW4vV2FsbEhvcml6LmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVGVycmFpbi9XYWxsSG9yaXoudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9UZXJyYWluL19UZXJyYWluLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVGVycmFpbi9fVGVycmFpbi50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1RyaWdnZXIvU3Bpa2VUcmFwLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVHJpZ2dlci9TcGlrZVRyYXAudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9UcmlnZ2VyL19UcmlnZ2VyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVmVoaWNsZS9DYXIuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9WZWhpY2xlL0Nhci50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1ZlaGljbGUvX1ZlaGljbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xvdXZyZS9Mb3V2cmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BvcG92YS9Qb3BvdmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuRUEsSUFBSSxLQUFLLEdBQUcsbUJBQU8sQ0FBQyx1Q0FBZSxDQUFDLENBQUM7QUFFckMsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNiLHVDQUF1QztJQUN2QyxlQUFlLEVBQUUsVUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxRQUFRO1FBQ2pELElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4QixLQUFLLEVBQUUsSUFBSSxHQUFHLEVBQUU7WUFDWixJQUFJLEtBQUss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QUFHLFVBQVUsQ0FBQyxDQUFDO2dCQUVySCxJQUFJLEdBQUcsR0FDSCxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO29CQUNsSCxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7Z0JBRXZILElBQUksR0FBRyxJQUFJLEdBQUc7b0JBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsUUFBUSxFQUFFLFVBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVTtRQUMxQyx5R0FBeUc7UUFDekcsSUFBSSxTQUFTLEdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUosSUFBSSxRQUFRLEdBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUosSUFBSSxNQUFNLEdBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUosSUFBSSxRQUFRLEdBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFOUosSUFBSSxTQUFTLEdBQUcsUUFBUSxJQUFJLFNBQVMsR0FBRyxNQUFNLElBQUksU0FBUyxHQUFHLFFBQVEsRUFBRTtZQUNwRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxRQUFRLEdBQUcsU0FBUyxJQUFJLFFBQVEsR0FBRyxNQUFNLElBQUksUUFBUSxHQUFHLFFBQVEsRUFBRTtZQUNsRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxNQUFNLEdBQUcsU0FBUyxJQUFJLE1BQU0sR0FBRyxRQUFRLElBQUksTUFBTSxHQUFHLFFBQVEsRUFBRTtZQUM5RCxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxRQUFRLEdBQUcsU0FBUyxJQUFJLFFBQVEsR0FBRyxRQUFRLElBQUksUUFBUSxHQUFHLE1BQU0sRUFBRTtZQUNsRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO1NBQzFDO0lBQ0wsQ0FBQztDQUNKO0FBRUQscUVBQXFFO0FBQ3JFLHNCQUFzQixLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUc7SUFDakMsT0FBTyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBRUQsK0JBQStCO0FBQy9CLGdDQUFnQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFVBQVU7SUFDbEQsSUFBSSxHQUFHLEdBQ0gsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO1FBQ2xKLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUNsSixZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7UUFDOUksWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7SUFFbkosSUFBSSxHQUFHLEdBQ0gsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO1FBQ3JKLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUNySixZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsR0FB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QztnQkFDTixLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsQ0FBQztnQkFDVCxNQUFNLEVBQUUsQ0FBQzthQUNaLEVBQUU7Z0JBQ0MsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsTUFBTSxFQUFFLENBQUM7YUFDWixFQUFFO2dCQUNDLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxDQUFDO2dCQUNULE1BQU0sRUFBRSxDQUFDO2FBQ1osRUFBRTtnQkFDQyxLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsQ0FBQztnQkFDVCxNQUFNLEVBQUUsQ0FBQzthQUNaLEVBQUU7Z0JBQ0MsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsTUFBTSxFQUFFLENBQUM7YUFDWixFQUFFO2dCQUNDLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxHQUFHO2dCQUNWLE1BQU0sRUFBRSxDQUFDO2dCQUNULE1BQU0sRUFBRSxDQUFDO2FBQ1osRUFBRTtnQkFDQyxLQUFLLEVBQUUsR0FBRztnQkFDVixLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsR0FBRztnQkFDVixNQUFNLEVBQUUsQ0FBQztnQkFDVCxNQUFNLEVBQUUsQ0FBQzthQUNaLEVBQUU7Z0JBQ0MsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsTUFB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QUFHLGNBQWMsR0FBRyxLQUFLO1FBQzVELENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFUixtREFBbUQ7SUFDbkQsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO1FBQ1gsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDakU7SUFFRCxJQUFJLEtBQUssRUFBRTtRQUNQLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksRUFBRSxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQ2xGO0lBRUQsbUNBQW1DO0lBQ25DLHFFQUE2QixDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVoRiw0QkFBNEI7SUFDNUIsOERBQXNCLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRW5DLGlCQUFpQjtJQUNqQiw0REFBb0IsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2xILENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsInZhciB0eXBlcyA9IHJlcXVpcmUoXCIuL09iamVjdFR5cGVzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAvLyBDaGVjayBjb2xsaXNpb25zIGJldHdlZW4gYWxsIG9iamVjdHNcbiAgICBjaGVja0NvbGxpc2lvbnM6IChjaGVja1NyYywgb2JzLCByZW5kZXJTaXplLCBjYWxsQmFjaykgPT4ge1xuICAgICAgICB2YXIgc3JjID0gb2JzW2NoZWNrU3JjXTtcblxuICAgICAgICBmb3IgKGlkIGluIG9icykge1xuICAgICAgICAgICAgdmFyIGNoZWNrID0gb2JzW2lkXTtcbiAgICAgICAgICAgIHZhciBjb2xsaXNpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKGNoZWNrKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzcmMuaGl0Ym94VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkhpdGJveFR5cGVzLlJFQ1Q6XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNoZWNrLmhpdGJveFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkhpdGJveFR5cGVzLlJFQ1Q6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9IGNoZWNrQ29sbGlzaW9uUmVjdFJlY3Qoc3JjLCBjaGVjaywgcmVuZGVyU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuSGl0Ym94VHlwZXMuQ0lSQzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uID0gY2hlY2tDb2xsaXNpb25DaXJjUmVjdChjaGVjaywgc3JjLCByZW5kZXJTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5IaXRib3hUeXBlcy5DSVJDOlxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjaGVjay5oaXRib3hUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5IaXRib3hUeXBlcy5SRUNUOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb24gPSBjaGVja0NvbGxpc2lvbkNpcmNSZWN0KHNyYywgY2hlY2ssIHJlbmRlclNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkhpdGJveFR5cGVzLkNJUkM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9IGNoZWNrQ29sbGlzaW9uQ2lyY0NpcmMoc3JjLCBjaGVjaywgcmVuZGVyU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbGxpc2lvbikgY2FsbEJhY2soY2hlY2tTcmMsIGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gQ2hlY2sgY29sbGlzaW9ucyBiZXR3ZWVuIGFsbCBvYmplY3RzIGJ5IGRpc3RhbmNlXG4gICAgY2hlY2tDb2xsaXNpb25zQnlEaXN0YW5jZTogKGNoZWNrU3JjLCBvYnMsIG1heERpc3QsIGNhbGxCYWNrKSA9PiB7XG4gICAgICAgIHZhciBzcmMgPSBvYnNbY2hlY2tTcmNdO1xuXG4gICAgICAgIGZvciAoaWQgaW4gb2JzKSB7XG4gICAgICAgICAgICB2YXIgY2hlY2sgPSBvYnNbaWRdO1xuXG4gICAgICAgICAgICBpZiAoY2hlY2spIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhzcmMueCAtIGNoZWNrLngsIDIpICtcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coc3JjLnkgLSBjaGVjay55LCAyKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGlzdCA8PSBtYXhEaXN0KSBjYWxsQmFjayhjaGVja1NyYywgaWQsIGRpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBDaGVjayBjb2xsaXNpb25zIGJldHdlZW4gY2xpY2sgbG9jYXRpb24gYW5kIGFsbCBvYmplY3RzXG4gICAgY2hlY2tDbGlja0NvbGxpc2lvbnM6IChjbGlja1gsIGNsaWNrWSwgb2JzLCByZW5kZXJTaXplLCBjYWxsQmFjaykgPT4ge1xuICAgICAgICBmb3IgKGlkIGluIG9icykge1xuICAgICAgICAgICAgdmFyIGNoZWNrID0gb2JzW2lkXTtcblxuICAgICAgICAgICAgaWYgKGNoZWNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHhJbiA9IFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZUluUmFuZ2UoY2xpY2tYLCBjaGVjay54IC0gY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueCArIGNoZWNrLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUpIHx8XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlSW5SYW5nZShjbGlja1gsIGNoZWNrLnggLSBjaGVjay5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay54ICsgY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgeUluID1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWVJblJhbmdlKGNsaWNrWSwgY2hlY2sueSAtIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay55ICsgY2hlY2suaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUpIHx8XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlSW5SYW5nZShjbGlja1ksIGNoZWNrLnkgLSBjaGVjay5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueSArIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplKTtcblxuICAgICAgICAgICAgICAgIGlmICh4SW4gJiYgeUluKSBjYWxsQmFjayhpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHB1c2hCYWNrOiAob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQsIHJlbmRlclNpemUpID0+IHtcbiAgICAgICAgLy8gUHVzaCBvYmplY3QgYmFjayBvdXQgb2YgY29sbGlzaW9uIHRlcnJhaW4gdG93YXJkcyB3aGljaCBldmVyIHNpZGUgaXMgdGhlIGNsb3Nlc3QgdG8gdGhlIHRlcnJhaW4gb2JqZWN0XG4gICAgICAgIHZhciBkaXN0UmlnaHQgICA9IE1hdGguYWJzKChvYnNbY29sbGlzaW9uSWRdLnggLSBvYnNbY29sbGlzaW9uSWRdLmhpdGJveFdpZHRoICogcmVuZGVyU2l6ZSAvIDIpIC0gKG9ic1tzcmNJZF0ueCArIG9ic1tzcmNJZF0uaGl0Ym94V2lkdGggKiByZW5kZXJTaXplIC8gMikpO1xuICAgICAgICB2YXIgZGlzdExlZnQgICAgPSBNYXRoLmFicygob2JzW2NvbGxpc2lvbklkXS54ICsgb2JzW2NvbGxpc2lvbklkXS5oaXRib3hXaWR0aCAqIHJlbmRlclNpemUgLyAyKSAtIChvYnNbc3JjSWRdLnggLSBvYnNbc3JjSWRdLmhpdGJveFdpZHRoICogcmVuZGVyU2l6ZSAvIDIpKTtcbiAgICAgICAgdmFyIGRpc3RVcCAgICAgID0gTWF0aC5hYnMoKG9ic1tjb2xsaXNpb25JZF0ueSArIG9ic1tjb2xsaXNpb25JZF0uaGl0Ym94SGVpZ2h0ICogcmVuZGVyU2l6ZSAvIDIpIC0gKG9ic1tzcmNJZF0ueSAtIG9ic1tzcmNJZF0uaGl0Ym94SGVpZ2h0ICogcmVuZGVyU2l6ZSAvIDIpKTtcbiAgICAgICAgdmFyIGRpc3REb3duICAgID0gTWF0aC5hYnMoKG9ic1tjb2xsaXNpb25JZF0ueSAtIG9ic1tjb2xsaXNpb25JZF0uaGl0Ym94SGVpZ2h0ICogcmVuZGVyU2l6ZSAvIDIpIC0gKG9ic1tzcmNJZF0ueSArIG9ic1tzcmNJZF0uaGl0Ym94SGVpZ2h0ICogcmVuZGVyU2l6ZSAvIDIpKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkaXN0UmlnaHQgPCBkaXN0TGVmdCAmJiBkaXN0UmlnaHQgPCBkaXN0VXAgJiYgZGlzdFJpZ2h0IDwgZGlzdERvd24pIHtcbiAgICAgICAgICAgIG9ic1tzcmNJZF0ueCA9IG9ic1tzcmNJZF0ueCAtIGRpc3RSaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlzdExlZnQgPCBkaXN0UmlnaHQgJiYgZGlzdExlZnQgPCBkaXN0VXAgJiYgZGlzdExlZnQgPCBkaXN0RG93bikge1xuICAgICAgICAgICAgb2JzW3NyY0lkXS54ID0gb2JzW3NyY0lkXS54ICsgZGlzdExlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpc3RVcCA8IGRpc3RSaWdodCAmJiBkaXN0VXAgPCBkaXN0TGVmdCAmJiBkaXN0VXAgPCBkaXN0RG93bikge1xuICAgICAgICAgICAgb2JzW3NyY0lkXS55ID0gb2JzW3NyY0lkXS55ICsgZGlzdFVwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXN0RG93biA8IGRpc3RSaWdodCAmJiBkaXN0RG93biA8IGRpc3RMZWZ0ICYmIGRpc3REb3duIDwgZGlzdFVwKSB7XG4gICAgICAgICAgICBvYnNbc3JjSWRdLnkgPSBvYnNbc3JjSWRdLnkgLSBkaXN0RG93bjtcbiAgICAgICAgfVxuICAgIH0sXG59XG5cbi8vIENvbGxpc2lvbiBkZXRlY3Rpb24gaGVscGVyLCBjaGVja3MgaWYgdmFsdWUgaXMgYmV0d2VlbiBtaW4gYW5kIG1heFxuZnVuY3Rpb24gdmFsdWVJblJhbmdlKHZhbHVlLCBtaW4sIG1heCkgeyBcbiAgICByZXR1cm4gKHZhbHVlID49IG1pbikgJiYgKHZhbHVlIDw9IG1heCk7IFxufVxuXG4vLyBDaGVjayBjb2xsaXNpb246IHJlY3QgLSByZWN0XG5mdW5jdGlvbiBjaGVja0NvbGxpc2lvblJlY3RSZWN0KHNyYywgY2hlY2ssIHJlbmRlclNpemUpIHtcbiAgICB2YXIgeEluID0gXG4gICAgICAgIHZhbHVlSW5SYW5nZShzcmMueCAtIHNyYy5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay54IC0gY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueCArIGNoZWNrLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUpIHx8XG4gICAgICAgIHZhbHVlSW5SYW5nZShzcmMueCArIHNyYy5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay54IC0gY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueCArIGNoZWNrLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUpIHx8XG4gICAgICAgIHZhbHVlSW5SYW5nZShjaGVjay54IC0gY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSwgc3JjLnggLSBzcmMuaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSwgc3JjLnggKyBzcmMuaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSkgfHxcbiAgICAgICAgdmFsdWVJblJhbmdlKGNoZWNrLnggKyBjaGVjay5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBzcmMueCAtIHNyYy5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBzcmMueCArIHNyYy5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplKTtcblxuICAgIHZhciB5SW4gPVxuICAgICAgICB2YWx1ZUluUmFuZ2Uoc3JjLnkgLSBzcmMuaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUsIGNoZWNrLnkgLSBjaGVjay5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueSArIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplKSB8fFxuICAgICAgICB2YWx1ZUluUmFuZ2Uoc3JjLnkgKyBzcmMuaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUsIGNoZWNrLnkgLSBjaGVjay5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueSArIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplKSB8fFxuICAgICAgICB2YWx1ZUluUmFuZ2UoY2hlY2sueSAtIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplLCBzcmMueSAtIHNyYy5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSwgc3JjLnkgKyBzcmMuaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUpIHx8XG4gICAgICAgIHZhbHVlSW5SYW5nZShjaGVjay55ICsgY2hlY2suaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUsIHNyYy55IC0gc3JjLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplLCBzcmMueSArIHNyYy5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSk7XG5cbiAgICByZXR1cm4geEluICYmIHlJbjtcbn1cblxuLy8gQ2hlY2sgY29sbGlzaW9uOiBjaXJjIC0gcmVjdFxuZnVuY3Rpb24gY2hlY2tDb2xsaXNpb25DaXJjUmVjdChzcmMsIGNoZWNrLCByZW5kZXJTaXplKSB7XG4gICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMihcbiAgICAgICAgc3JjLnkgLSBjaGVjay55LFxuICAgICAgICBzcmMueCAtIGNoZWNrLngpO1xuXG4gICAgdmFyIHdpZHRoID0gTWF0aC5hYnMoTWF0aC5jb3MoYW5nbGUpICogc3JjLmhpdGJveFJhZGl1cyAqIDIpO1xuICAgIHZhciBoZWlnaHQgPSBNYXRoLmFicyhNYXRoLnNpbihhbmdsZSkgKiBzcmMuaGl0Ym94UmFkaXVzICogMik7XG5cbiAgICByZXR1cm4gY2hlY2tDb2xsaXNpb25SZWN0UmVjdChcbiAgICAgICAgeyB4OiBzcmMueCwgeTogc3JjLnksIGhpdGJveFdpZHRoOiB3aWR0aCwgaGl0Ym94SGVpZ2h0OiBoZWlnaHQgfSxcbiAgICAgICAgY2hlY2ssXG4gICAgICAgIHJlbmRlclNpemVcbiAgICApO1xufVxuXG4vLyBDaGVjayBjb2xsaXNpb246IGNpcmMgLSBjaXJjXG5mdW5jdGlvbiBjaGVja0NvbGxpc2lvbkNpcmNDaXJjKHNyYywgY2hlY2ssIHJlbmRlclNpemUpIHtcbiAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKFxuICAgICAgICBzcmMueSAtIGNoZWNrLnksXG4gICAgICAgIHNyYy54IC0gY2hlY2sueCk7XG5cbiAgICB2YXIgd2lkdGggPSBNYXRoLmFicyhNYXRoLmNvcyhhbmdsZSkgKiBzcmMuaGl0Ym94UmFkaXVzICogMik7XG4gICAgdmFyIGhlaWdodCA9IE1hdGguYWJzKE1hdGguc2luKGFuZ2xlKSAqIHNyYy5oaXRib3hSYWRpdXMgKiAyKTtcblxuICAgIHJldHVybiBjaGVja0NvbGxpc2lvbkNpcmNSZWN0KFxuICAgICAgICBjaGVjayxcbiAgICAgICAgeyB4OiBzcmMueCwgeTogc3JjLnksIGhpdGJveFdpZHRoOiB3aWR0aCwgaGl0Ym94SGVpZ2h0OiBoZWlnaHQgfSxcbiAgICAgICAgcmVuZGVyU2l6ZVxuICAgICk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBPYmplY3RUeXBlczoge1xuICAgICAgICBQTEFZRVI6IFwicGxheWVyXCIsXG4gICAgICAgIEdSQVZFU1RPTkU6IFwiZ3JhdmVzdG9uZVwiLFxuICAgICAgICBQUk9KRUNUSUxFOiBcInByb2plY3RpbGVcIixcbiAgICAgICAgVEVSUkFJTjogXCJ0ZXJyYWluXCIsXG4gICAgICAgIElOVEVSQUNUQUJMRTogXCJpbnRlcmFjdGFibGVcIixcbiAgICAgICAgVFJJR0dFUjogXCJ0cmlnZ2VyXCIsXG4gICAgICAgIFZFSElDTEU6IFwidmVoaWNsZVwiLFxuICAgICAgICBDT01CQVRfVEVYVDogXCJjb21iYXQtdGV4dFwiLFxuICAgIH0sXG4gICAgUGxheWVyOiB7XG4gICAgICAgIEhVTUFOOiBcImh1bWFuXCIsXG4gICAgICAgIEdPRDogXCJnb2RcIixcbiAgICAgICAgRklSRV9NQUdFOiBcImZpcmUtbWFnZVwiLFxuICAgIH0sXG4gICAgUHJvamVjdGlsZToge1xuICAgICAgICBCQVNJQ19QUk9KRUNUSUxFOiBcImJhc2ljLXByb2plY3RpbGVcIixcbiAgICAgICAgRklSRUJPTFRfUFJPSkVDVElMRTogXCJmaXJlYm9sdC1wcm9qZWN0aWxlXCIsXG4gICAgICAgIEZMQU1FX1BJTExBUl9QUk9KRUNUSUxFOiBcImZsYW1lLXBpbGxhci1wcm9qZWN0aWxlXCIsXG4gICAgICAgIEZMQU1FX0RBU0hfUFJPSkVDVElMRTogXCJmbGFtZS1kYXNoLXByb2plY3RpbGVcIixcbiAgICB9LFxuICAgIFRlcnJhaW46IHtcbiAgICAgICAgVFJFRTogXCJ0cmVlXCIsXG4gICAgICAgIFdBTExfSE9SSVo6IFwid2FsbC1ob3JpelwiLFxuICAgIH0sXG4gICAgSW50ZXJhY3RhYmxlOiB7XG4gICAgICAgIEhFQUxUSF9QSUNLVVA6IFwiaGVhbHRoLXBpY2t1cFwiLFxuICAgICAgICBDQVJfRU5URVI6IFwiY2FyLWVudGVyXCIsXG4gICAgICAgIFBMQVlFUl9UWVBFX0NIQU5HRVI6IFwicGxheWVyLXR5cGUtY2hhbmdlclwiLFxuICAgIH0sXG4gICAgVHJpZ2dlcjoge1xuICAgICAgICBTUElLRV9UUkFQOiBcInNwaWtlLXRyYXBcIixcbiAgICB9LFxuICAgIFZlaGljbGU6IHtcbiAgICAgICAgQ0FSOiBcImNhclwiLFxuICAgIH0sXG4gICAgRXF1aXBtZW50VHlwZXM6IHtcbiAgICAgICAgQkxBU1RFUjogXCJibGFzdGVyXCIsXG4gICAgICAgIFNDQU5ORVI6IFwic2Nhbm5lclwiLFxuICAgICAgICBCVUlMREVSOiBcImJ1aWxkZXJcIixcbiAgICAgICAgQklOT0NVTEFSUzogXCJiaW5vY3VsYXJzXCIsXG4gICAgfSxcbiAgICBBYmlsaXRpZXM6IHtcbiAgICAgICAgRklSRUJPTFQ6IFwiZmlyZWJvbHRcIixcbiAgICAgICAgRkxBTUVfUElMTEFSOiBcImZsYW1lLXBpbGxhclwiLFxuICAgICAgICBGTEFNRV9EQVNIOiBcImZsYW1lLWRhc2hcIixcbiAgICAgICAgRkxBTUVfQkFSUklFUjogXCJmbGFtZS1iYXJyaWVyXCIsXG4gICAgfSxcbiAgICBTdGF0dXNFZmZlY3RzOiB7XG4gICAgICAgIFNUVU5ORUQ6IFwic3R1bm5lZFwiLFxuICAgICAgICBJTlZVTE5FUkFCTEU6IFwiaW52dWxuZXJhYmxlXCIsXG4gICAgfSxcbiAgICBDb21iYXRUZXh0OiB7XG4gICAgICAgIERBTUFHRV9URVhUOiBcImRhbWFnZS10ZXh0XCIsXG4gICAgICAgIEZJUkVfREFNQUdFX1RFWFQ6IFwiZmlyZS1kYW1hZ2UtdGV4dFwiLFxuICAgICAgICBJTlZVTE5FUkFCTEVfVEVYVDogXCJpbnZ1bG5lcmFibGUtdGV4dFwiLFxuICAgICAgICBIRUFMX1RFWFQ6IFwiaGVhbC10ZXh0XCIsXG4gICAgfSxcbiAgICBIaXRib3hUeXBlczoge1xuICAgICAgICBOT05FOiBcIm5vbmVcIixcbiAgICAgICAgUkVDVDogXCJyZWN0XCIsXG4gICAgICAgIENJUkM6IFwiY2lyY1wiLFxuICAgIH0sXG59IiwidmFyIGZpcmVib2x0Q29vbGRvd24gPSA2MDA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icykge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuQWJpbGl0aWVzLkZJUkVCT0xULFxuICAgICAgICBjb29sZG93bjogZmlyZWJvbHRDb29sZG93bixcbiAgICAgICAgbGFzdGNhc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FzdDogKG9icywgc291cmNlSWQsIGFiaWxpdHlJbmRleCwgdGFyZ2V0WCwgdGFyZ2V0WSkgPT4ge1xuICAgICAgICAgICAgdmFyIG5ld1RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKCFvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmxhc3RjYXN0XG4gICAgICAgICAgICAgICAgfHwgbmV3VGltZSAtIG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3QgPj0gb2JzW3NvdXJjZUlkXS5hYmlsaXRpZXNbYWJpbGl0eUluZGV4XS5jb29sZG93bikge1xuICAgICAgICAgICAgICAgIG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3QgPSBuZXdUaW1lO1xuICAgICAgICAgICAgICAgIHByZWZhYnMuZ2VuZXJhdGVOZXcob2JzLCBzb3VyY2VJZCwgdGFyZ2V0WCwgdGFyZ2V0WSwgdHlwZXMuT2JqZWN0VHlwZXMuUFJPSkVDVElMRSwgdHlwZXMuUHJvamVjdGlsZS5GSVJFQk9MVF9QUk9KRUNUSUxFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJ2YXIgZmxhbWVCYXJyaWVyQ29vbGRvd24gPSA4MDA7XG52YXIgZmxhbWVCYXJyaWVySW52dWxuRHVyYXRpb24gPSAzNTA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icykge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuQWJpbGl0aWVzLkZMQU1FX0JBUlJJRVIsXG4gICAgICAgIGNvb2xkb3duOiBmbGFtZUJhcnJpZXJDb29sZG93bixcbiAgICAgICAgbGFzdGNhc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FzdDogKG9icywgc291cmNlSWQsIGFiaWxpdHlJbmRleCwgdGFyZ2V0WCwgdGFyZ2V0WSkgPT4ge1xuICAgICAgICAgICAgdmFyIG5ld1RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKCFvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmxhc3RjYXN0XG4gICAgICAgICAgICAgICAgfHwgbmV3VGltZSAtIG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3QgPj0gb2JzW3NvdXJjZUlkXS5hYmlsaXRpZXNbYWJpbGl0eUluZGV4XS5jb29sZG93bikge1xuICAgICAgICAgICAgICAgIG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3QgPSBuZXdUaW1lO1xuICAgICAgICAgICAgICAgIG9ic1tzb3VyY2VJZF0uYWRkU3RhdHVzRWZmZWN0KG9icywgc291cmNlSWQsIHR5cGVzLlN0YXR1c0VmZmVjdHMuSU5WVUxORVJBQkxFLCBmbGFtZUJhcnJpZXJJbnZ1bG5EdXJhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGZsYW1lRGFzaENvb2xkb3duID0gNTAwMDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5BYmlsaXRpZXMuRkxBTUVfREFTSCxcbiAgICAgICAgY29vbGRvd246IGZsYW1lRGFzaENvb2xkb3duLFxuICAgICAgICBsYXN0Y2FzdDogdW5kZWZpbmVkLFxuICAgICAgICBjYXN0OiAob2JzLCBzb3VyY2VJZCwgYWJpbGl0eUluZGV4LCB0YXJnZXRYLCB0YXJnZXRZKSA9PiB7XG4gICAgICAgICAgICB2YXIgbmV3VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBpZiAoIW9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3RcbiAgICAgICAgICAgICAgICB8fCBuZXdUaW1lIC0gb2JzW3NvdXJjZUlkXS5hYmlsaXRpZXNbYWJpbGl0eUluZGV4XS5sYXN0Y2FzdCA+PSBvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmNvb2xkb3duKSB7XG4gICAgICAgICAgICAgICAgb2JzW3NvdXJjZUlkXS54ID0gdGFyZ2V0WDtcbiAgICAgICAgICAgICAgICBvYnNbc291cmNlSWRdLnkgPSB0YXJnZXRZO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3QgPSBuZXdUaW1lO1xuICAgICAgICAgICAgICAgIHByZWZhYnMuZ2VuZXJhdGVOZXcob2JzLCBzb3VyY2VJZCwgdGFyZ2V0WCwgdGFyZ2V0WSwgdHlwZXMuT2JqZWN0VHlwZXMuUFJPSkVDVElMRSwgdHlwZXMuUHJvamVjdGlsZS5GTEFNRV9EQVNIX1BST0pFQ1RJTEUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsInZhciBmbGFtZVBpbGxhckNvb2xkb3duID0gMzAwMDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5BYmlsaXRpZXMuRkxBTUVfUElMTEFSLFxuICAgICAgICBjb29sZG93bjogZmxhbWVQaWxsYXJDb29sZG93bixcbiAgICAgICAgbGFzdGNhc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FzdDogKG9icywgc291cmNlSWQsIGFiaWxpdHlJbmRleCwgdGFyZ2V0WCwgdGFyZ2V0WSkgPT4ge1xuICAgICAgICAgICAgdmFyIG5ld1RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKCFvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmxhc3RjYXN0XG4gICAgICAgICAgICAgICAgfHwgbmV3VGltZSAtIG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3QgPj0gb2JzW3NvdXJjZUlkXS5hYmlsaXRpZXNbYWJpbGl0eUluZGV4XS5jb29sZG93bikge1xuICAgICAgICAgICAgICAgIG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3QgPSBuZXdUaW1lO1xuICAgICAgICAgICAgICAgIHByZWZhYnMuZ2VuZXJhdGVOZXcob2JzLCBzb3VyY2VJZCwgdGFyZ2V0WCwgdGFyZ2V0WSwgdHlwZXMuT2JqZWN0VHlwZXMuUFJPSkVDVElMRSwgdHlwZXMuUHJvamVjdGlsZS5GTEFNRV9QSUxMQVJfUFJPSkVDVElMRSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGRhbWFnZVRleHRDb2xvciA9IFwiIzU1NTU1NUZGXCI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJhc2UsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLkNvbWJhdFRleHQuREFNQUdFX1RFWFQsXG4gICAgICAgIGNvbG9yOiBkYW1hZ2VUZXh0Q29sb3IsXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJ2YXIgZmlyZURhbWFnZVRleHRDb2xvciA9IFwiI0ZGMDAwMEZGXCI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJhc2UsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLkNvbWJhdFRleHQuRklSRV9EQU1BR0VfVEVYVCxcbiAgICAgICAgY29sb3I6IGZpcmVEYW1hZ2VUZXh0Q29sb3IsXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJ2YXIgaGVhbFRleHRDb2xvciA9IFwiIzAwQ0MwMEZGXCI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJhc2UsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLkNvbWJhdFRleHQuSEVBTF9URVhULFxuICAgICAgICBjb2xvcjogaGVhbFRleHRDb2xvcixcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsInZhciBpbnZ1bG5lcmFibGVUZXh0Q29sb3IgPSBcIiNBQUFBMDA4OFwiOyAgICAvLyBUT0RPOiBNb3JlIHZpc2libGUgY29sb3IuLi5cblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuQ29tYmF0VGV4dC5JTlZVTE5FUkFCTEVfVEVYVCxcbiAgICAgICAgY29sb3I6IGludnVsbmVyYWJsZVRleHRDb2xvcixcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsInZhciBjb21iYXRUZXh0QW5pbWF0aW9uU3BlZWQgPSAwLjEyO1xudmFyIGNvbWJhdFRleHRGb250U2l6ZSA9IDk7XG52YXIgY29tYmF0VGV4dENvbG9yID0gXCIjMDAwMDAwRkZcIjtcbnZhciBjb21iYXRUZXh0RHVyYXRpb24gPSAyMDA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBwYXJhbXMpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG5cbiAgICBjb25zdCB4ID0gb2JzW3NyY10gPyBvYnNbc3JjXS54ICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogb2JzW3NyY10ud2lkdGggKiA0OiBwb3NYO1xuICAgIGNvbnN0IHkgPSBvYnNbc3JjXSA/IG9ic1tzcmNdLnkgLSBNYXRoLnJhbmRvbSgpICogb2JzW3NyY10uaGVpZ2h0ICogMyAtIG9ic1tzcmNdLmhlaWdodCAqIDMgOiBwb3NZO1xuICAgIGNvbnN0IGFuZ2xlID0gb2JzW3NyY10gPyBNYXRoLmF0YW4yKHkgLSBvYnNbc3JjXS55LCB4IC0gb2JzW3NyY10ueCkgOiAwO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuT2JqZWN0VHlwZXMuQ09NQkFUX1RFWFQsXG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIGFuZ2xlOiBhbmdsZSxcbiAgICAgICAgdGV4dDogcGFyYW1zLnRleHQsXG4gICAgICAgIHNpemU6IGNvbWJhdFRleHRGb250U2l6ZSxcbiAgICAgICAgY29sb3I6IGNvbWJhdFRleHRDb2xvcixcbiAgICAgICAgZmFjaW5nOiBhbmdsZSAqIDE4MCAvIE1hdGguUEkgKyA5MCxcbiAgICAgICAgaW5pdFRpbWU6IERhdGUubm93KCksXG4gICAgICAgIGR1cmF0aW9uOiBjb21iYXRUZXh0RHVyYXRpb24sXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLk5PTkUsXG4gICAgICAgIGFuaW1hdGlvblNwZWVkOiBjb21iYXRUZXh0QW5pbWF0aW9uU3BlZWQsXG4gICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4ge1xuICAgICAgICAgICAgb2JzW3NlbGZJZF0udmVsb2NpdHlYID0gTWF0aC5jb3MoYW5nbGUpICogb2JzW3NlbGZJZF0uYW5pbWF0aW9uU3BlZWQ7XG4gICAgICAgICAgICBvYnNbc2VsZklkXS52ZWxvY2l0eVkgPSBNYXRoLnNpbihhbmdsZSkgKiBvYnNbc2VsZklkXS5hbmltYXRpb25TcGVlZDtcblxuICAgICAgICAgICAgY29uc3QgbmV3VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBjb25zdCBsaWZlVGltZSA9IG5ld1RpbWUgLSBvYnNbc2VsZklkXS5pbml0VGltZTtcblxuICAgICAgICAgICAgb2JzW3NlbGZJZF0ueCArPSBvYnNbc2VsZklkXS52ZWxvY2l0eVggKiBkZWx0YTtcbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLnkgKz0gb2JzW3NlbGZJZF0udmVsb2NpdHlZICogZGVsdGE7XG5cbiAgICAgICAgICAgIHZhciBuZXdPcGFjaXR5ID0gTWF0aC5tYXgoKDEgLSBsaWZlVGltZSAvIG9ic1tzZWxmSWRdLmR1cmF0aW9uKSAqIDI1NSwgMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygwLCAyKS5yZXBsYWNlKFwiLlwiLCBcIlwiKTtcbiAgICAgICAgICAgIGlmIChuZXdPcGFjaXR5Lmxlbmd0aCA8PSAxKSBuZXdPcGFjaXR5ID0gXCIwXCIgKyBuZXdPcGFjaXR5O1xuICAgICAgICAgICAgb2JzW3NlbGZJZF0uY29sb3IgPSBvYnNbc2VsZklkXS5jb2xvci5zdWJzdHJpbmcoMCwgNykgKyBuZXdPcGFjaXR5O1xuXG4gICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0gJiYgbGlmZVRpbWUgPj0gb2JzW3NlbGZJZF0uZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JzW3NlbGZJZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBiaW5vY3VsYXJzIHVpIGljb25cbiAqIEBwYXJhbSBwb3NYIEhvcml6b250YWwgaWNvbiBwb3NpdGlvblxuICogQHBhcmFtIHBvc1kgVmVydGljYWwgaWNvbiBwb3NpdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gYmlub2N1bGFyc1VJTWFzdGVyUGllY2UocG9zWDogbnVtYmVyLCBwb3NZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzAwMDAwMFwiLCBcIiMzMzMzMzNcIl0sXG4gICAgICAgIHBvc1g6IHBvc1gsXG4gICAgICAgIHBvc1k6IHBvc1ksXG4gICAgICAgIHdpZHRoOiAzLFxuICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgIGZhY2luZzogLTQ1LFxuICAgICAgICBzdHJva2VzOiBbIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sXVxuICAgIH07XG59XG4iLCJ2YXIgYmlub2N1bGFyc1ZpZXdSYW5nZSA9IDI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgcGFyYW1zID0geyB9KSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuRXF1aXBtZW50VHlwZXMuQklOT0NVTEFSUyxcbiAgICAgICAgdXNlOiAob2JzLCBzb3VyY2VJZCwgdGFyZ2V0WCwgdGFyZ2V0WSkgPT4geyB9LFxuICAgICAgICBvbkVxdWlwOiAob2JzLCBzb3VyY2VJZCkgPT4ge1xuICAgICAgICAgICAgb2JzW3NvdXJjZUlkXS5wcmV2Vmlld1JhbmdlID0gb2JzW3NvdXJjZUlkXS52aWV3UmFuZ2U7XG4gICAgICAgICAgICBvYnNbc291cmNlSWRdLnZpZXdSYW5nZSA9IGJpbm9jdWxhcnNWaWV3UmFuZ2U7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRGVxdWlwOiAob2JzLCBzb3VyY2VJZCkgPT4ge1xuICAgICAgICAgICAgb2JzW3NvdXJjZUlkXS52aWV3UmFuZ2UgPSBvYnNbc291cmNlSWRdLnByZXZWaWV3UmFuZ2U7XG4gICAgICAgICAgICBkZWxldGUgb2JzW3NvdXJjZUlkXS5wcmV2Vmlld1JhbmdlO1xuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgYmxhc3RlciB1aSBpY29uXG4gKiBAcGFyYW0gcG9zWCBIb3Jpem9udGFsIGljb24gcG9zaXRpb25cbiAqIEBwYXJhbSBwb3NZIFZlcnRpY2FsIGljb24gcG9zaXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJsYXN0ZXJVSU1hc3RlclBpZWNlKHBvc1g6IG51bWJlciwgcG9zWTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiMwMDAwMDBcIl0sXG4gICAgICAgIHBvc1g6IHBvc1gsXG4gICAgICAgIHBvc1k6IHBvc1ksXG4gICAgICAgIHdpZHRoOiAzLFxuICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgIGZhY2luZzogLTQ1LFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LF1cbiAgICB9O1xufVxuIiwiZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBwYXJhbXMgPSB7IH0pIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLkVxdWlwbWVudFR5cGVzLkJMQVNURVIsXG4gICAgICAgIHVzZTogKG9icywgc291cmNlSWQsIHRhcmdldFgsIHRhcmdldFkpID0+IHtcbiAgICAgICAgICAgIHByZWZhYnMuZ2VuZXJhdGVOZXcob2JzLCBzb3VyY2VJZCwgdGFyZ2V0WCwgdGFyZ2V0WSwgdHlwZXMuT2JqZWN0VHlwZXMuUFJPSkVDVElMRSwgdHlwZXMuUHJvamVjdGlsZS5CQVNJQ19QUk9KRUNUSUxFKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25FcXVpcDogKG9icywgc291cmNlSWQpID0+IHsgfSxcbiAgICAgICAgb25EZXF1aXA6IChvYnMsIHNvdXJjZUlkKSA9PiB7IH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBidWlsZGVyIHVpIGljb25cbiAqIEBwYXJhbSBwb3NYIEhvcml6b250YWwgaWNvbiBwb3NpdGlvblxuICogQHBhcmFtIHBvc1kgVmVydGljYWwgaWNvbiBwb3NpdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRlclVJTWFzdGVyUGllY2UocG9zWDogbnVtYmVyLCBwb3NZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzAwMDAwMFwiLCBcIiM5MzUyMDBcIl0sXG4gICAgICAgIHBvc1g6IHBvc1gsXG4gICAgICAgIHBvc1k6IHBvc1ksXG4gICAgICAgIHdpZHRoOiAzLFxuICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgIGZhY2luZzogLTQ1LFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LF1cbiAgICB9O1xufVxuIiwiZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBwYXJhbXMgPSB7IH0pIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLkVxdWlwbWVudFR5cGVzLkJVSUxERVIsXG4gICAgICAgIHVzZTogKG9icywgc291cmNlSWQsIHRhcmdldFgsIHRhcmdldFkpID0+IHtcbiAgICAgICAgICAgIHByZWZhYnMuZ2VuZXJhdGVOZXcob2JzLCBzb3VyY2VJZCwgdGFyZ2V0WCwgdGFyZ2V0WSwgcGFyYW1zLnR5cGUsIHBhcmFtcy5zdWJ0eXBlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25FcXVpcDogKG9icywgc291cmNlSWQpID0+IHsgfSxcbiAgICAgICAgb25EZXF1aXA6IChvYnMsIHNvdXJjZUlkKSA9PiB7IH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBzY2FubmVyIHVpIGljb25cbiAqIEBwYXJhbSBwb3NYIEhvcml6b250YWwgaWNvbiBwb3NpdGlvblxuICogQHBhcmFtIHBvc1kgVmVydGljYWwgaWNvbiBwb3NpdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gc2Nhbm5lclVJTWFzdGVyUGllY2UocG9zWDogbnVtYmVyLCBwb3NZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI0ZGRkZGRlwiLCBcIiMzMzk5RkZcIl0sXG4gICAgICAgIHBvc1g6IHBvc1gsXG4gICAgICAgIHBvc1k6IHBvc1ksXG4gICAgICAgIHdpZHRoOiAzLFxuICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogLTEsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiA1LFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LF1cbiAgICB9O1xufVxuIiwiZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBwYXJhbXMgPSB7IH0pIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIGNvbGxpc2lvbnMgPSByZXF1aXJlKFwiLi4vLi4vQ29sbGlzaW9uc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuRXF1aXBtZW50VHlwZXMuU0NBTk5FUixcbiAgICAgICAgdXNlOiAob2JzLCBzb3VyY2VJZCwgdGFyZ2V0WCwgdGFyZ2V0WSkgPT4ge1xuICAgICAgICAgICAgLy8gUmVwbGFjZXMgYWxsIGJ1aWxkZXJzIHdpdGggdGhpcyBidWlsZCB0eXBlLi4uXG4gICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ2xpY2tDb2xsaXNpb25zKHRhcmdldFgsIHRhcmdldFksIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoY29sbGlzaW9uSWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob2JzW2NvbGxpc2lvbklkXS5zdWJ0eXBlICE9IHR5cGVzLkludGVyYWN0YWJsZS5DQVJfRU5URVIpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzW3NvdXJjZUlkXS5lcXVpcG1lbnQgPSBvYnNbc291cmNlSWRdLmVxdWlwbWVudC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT0gdHlwZXMuRXF1aXBtZW50VHlwZXMuQlVJTERFUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBwcmVmYWJzLm5ld0VxdWlwbWVudChvYnMsIHR5cGVzLkVxdWlwbWVudFR5cGVzLkJVSUxERVIsIHsgdHlwZTogb2JzW2NvbGxpc2lvbklkXS50eXBlLCBzdWJ0eXBlOiBvYnNbY29sbGlzaW9uSWRdLnN1YnR5cGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRXF1aXA6IChvYnMsIHNvdXJjZUlkKSA9PiB7IH0sXG4gICAgICAgIG9uRGVxdWlwOiAob2JzLCBzb3VyY2VJZCkgPT4geyB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsInZhciBncmF2ZXN0b25lV2lkdGggPSAzO1xudmFyIGdyYXZlc3RvbmVIZWlnaHQgPSA0O1xudmFyIGdyYXZlc3RvbmVIaXRib3hXaWR0aCA9IGdyYXZlc3RvbmVXaWR0aDtcbnZhciBncmF2ZXN0b25lSGl0Ym94SGVpZ2h0ID0gZ3JhdmVzdG9uZUhlaWdodDtcbnZhciBncmF2ZXN0b25lSGVhbHRoID0gNDA7XG52YXIgZ3JhdmVzdG9uZVZpZXdSYW5nZSA9IDEgLyA0O1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgY29sbGlzaW9ucyA9IHJlcXVpcmUoXCIuLi8uLi9Db2xsaXNpb25zXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5PYmplY3RUeXBlcy5HUkFWRVNUT05FLFxuICAgICAgICBzdWJ0eXBlOiBvYnNbc3JjXS5zdWJ0eXBlLFxuICAgICAgICB4OiBwb3NYLFxuICAgICAgICB5OiBwb3NZICsgMSAqIHByZWZhYnMucmVuZGVyU2l6ZSxcbiAgICAgICAgdmVsb2NpdHlYOiAwLFxuICAgICAgICB2ZWxvY2l0eVk6IDAsXG4gICAgICAgIHNwZWVkOiAwLFxuICAgICAgICB3aWR0aDogZ3JhdmVzdG9uZVdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGdyYXZlc3RvbmVIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBncmF2ZXN0b25lSGl0Ym94V2lkdGgsXG4gICAgICAgIGhpdGJveEhlaWdodDogZ3JhdmVzdG9uZUhpdGJveEhlaWdodCxcbiAgICAgICAgaGVhbHRoOiBncmF2ZXN0b25lSGVhbHRoLFxuICAgICAgICBtYXhIZWFsdGg6IGdyYXZlc3RvbmVIZWFsdGgsXG4gICAgICAgIGN1cnJlbnRFcXVpcG1lbnQ6IHVuZGVmaW5lZCxcbiAgICAgICAgZXF1aXBtZW50OiBbXSxcbiAgICAgICAgdmlld1JhbmdlOiBncmF2ZXN0b25lVmlld1JhbmdlLFxuICAgICAgICBkZWF0aHJhdHRsZTogKG9icywgc2VsZlJlZikgPT4ge1xuICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIHNlbGZSZWYsIDAsIDAsIHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUik7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4ge1xuICAgICAgICAgICAgLy8gQ2hlY2sgY29sbGlzaW9ucyB3aXRoIHZlaGljbGVzIGFuZCByZXBvc2l0aW9uIGFjY29yZGluZ2x5XG4gICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9ucyhzZWxmSWQsIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQpe1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9ic1tjb2xsaXNpb25JZF0udHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFB1c2ggb2JqZWN0IGJhY2sgb3V0IG9mIGNvbGxpc2lvbiB2ZWhpY2xlIHRvd2FyZHMgd2hpY2ggZXZlciBzaWRlIGlzIHRoZSBjbG9zZXN0IHRvIHRoZSB2ZWhpY2xlIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnMucHVzaEJhY2sob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQsIHByZWZhYnMucmVuZGVyU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbW91c2VEb3duOiAob2JzLCBtb3VzZUV2ZW50KSA9PiB7IH0sXG4gICAgICAgIG9uUGxheWVySW5wdXQ6IChvYnMsIHNlbGZJZCwgcGxheWVySW5wdXQpID0+IHsgfSxcbiAgICAgICAgZGFtYWdlOiAob2JzLCBzZWxmSWQsIGFtb3VudCkgPT4ge1xuICAgICAgICAgICAgb2JzW3NlbGZJZF0uaGVhbHRoIC09IGFtb3VudDtcblxuICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdLmhlYWx0aCA8PSAwKXtcbiAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS5kZWF0aHJhdHRsZShvYnMsIHNlbGZJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBncmF2ZXN0b25lIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgZ3JhdmVzdG9uZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ3JhdmVTdG9uZU1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjODg4ODg4XCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMCxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwLFxuICAgICAgICB9XVxuICAgIH1cbn1cbiIsInZhciBjYXJFbnRlcldpZHRoID0gMjQ7XG52YXIgY2FyRW50ZXJIZWlnaHQgPSAyNDtcbnZhciBjYXJFbnRlckhpdGJveFdpZHRoID0gMjQ7XG52YXIgY2FyRW50ZXJIaXRib3hIZWlnaHQgPSAyNDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuSW50ZXJhY3RhYmxlLkNBUl9FTlRFUixcbiAgICAgICAgd2lkdGg6IGNhckVudGVyV2lkdGgsXG4gICAgICAgIGhlaWdodDogY2FyRW50ZXJIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBjYXJFbnRlckhpdGJveFdpZHRoLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IGNhckVudGVySGl0Ym94SGVpZ2h0LFxuICAgICAgICB2ZWhpY2xlSWQ6IHNyYyxcbiAgICAgICAgb25JbnRlcmFjdDogKG9icywgc2VsZlJlZiwgaW50ZXJhY3RJZCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic1tpbnRlcmFjdElkXSAmJlxuICAgICAgICAgICAgICAgIG9ic1tpbnRlcmFjdElkXS50eXBlID09PSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVIgJiZcbiAgICAgICAgICAgICAgICBvYnNbb2JzW3NlbGZSZWZdLnZlaGljbGVJZF0ucmlkZXIgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvYnNbb2JzW3NlbGZSZWZdLnZlaGljbGVJZF0ucmlkZXIgPSBvYnNbaW50ZXJhY3RJZF07XG4gICAgICAgICAgICAgICAgb2JzW2ludGVyYWN0SWRdID0gb2JzW29ic1tzZWxmUmVmXS52ZWhpY2xlSWRdO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbb2JzW3NlbGZSZWZdLnZlaGljbGVJZF07XG4gICAgICAgICAgICAgICAgb2JzW3NlbGZSZWZdLnZlaGljbGVJZCA9IGludGVyYWN0SWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGhlYWx0aFBpY2t1cFdpZHRoID0gMztcbnZhciBoZWFsdGhQaWNrdXBIZWlnaHQgPSAzO1xudmFyIGhlYWx0aFBpY2t1cEhpdGJveFdpZHRoID0gMztcbnZhciBoZWFsdGhQaWNrdXBIaXRib3hIZWlnaHQgPSAzO1xudmFyIGhlYWx0aFBpY2t1cEhlYWxpbmcgPSA0MDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuSW50ZXJhY3RhYmxlLkhFQUxUSF9QSUNLVVAsXG4gICAgICAgIHdpZHRoOiBoZWFsdGhQaWNrdXBXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBoZWFsdGhQaWNrdXBIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBoZWFsdGhQaWNrdXBIaXRib3hXaWR0aCxcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiBoZWFsdGhQaWNrdXBIaXRib3hIZWlnaHQsXG4gICAgICAgIG9uSW50ZXJhY3Q6IChvYnMsIHNlbGZSZWYsIGludGVyYWN0SWQpID0+IHtcbiAgICAgICAgICAgIGlmIChvYnNbaW50ZXJhY3RJZF0uaGVhbCkge1xuICAgICAgICAgICAgICAgIG9ic1tpbnRlcmFjdElkXS5oZWFsKG9icywgaW50ZXJhY3RJZCwgaGVhbHRoUGlja3VwSGVhbGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgb2JzW3NlbGZSZWZdO1xuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgaGVhbHRoIHBpY2t1cCBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGhlYWx0aCBwaWNrdXAgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhlYWx0aFBpY2t1cE1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjRkZGRkZGXCIsIFwiI0ZGMDAwMFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH1dXG4gICAgfVxufVxuIiwidmFyIHBsYXllclR5cGVDaGFuZ2VyV2lkdGggPSA1O1xudmFyIHBsYXllclR5cGVDaGFuZ2VySGVpZ2h0ID0gNTtcbnZhciBwbGF5ZXJUeXBlQ2hhbmdlckhpdGJveFdpZHRoID0gNTtcbnZhciBwbGF5ZXJUeXBlQ2hhbmdlckhpdGJveEhlaWdodCA9IDU7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlLCBwYXJhbXMgPSB7IH0pIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5JbnRlcmFjdGFibGUuUExBWUVSX1RZUEVfQ0hBTkdFUixcbiAgICAgICAgd2lkdGg6IHBsYXllclR5cGVDaGFuZ2VyV2lkdGgsXG4gICAgICAgIGhlaWdodDogcGxheWVyVHlwZUNoYW5nZXJIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBwbGF5ZXJUeXBlQ2hhbmdlckhpdGJveFdpZHRoLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IHBsYXllclR5cGVDaGFuZ2VySGl0Ym94SGVpZ2h0LFxuICAgICAgICBuZXdQbGF5ZXJUeXBlOiBwYXJhbXMubmV3VHlwZSxcbiAgICAgICAgb25JbnRlcmFjdDogKG9icywgc2VsZlJlZiwgaW50ZXJhY3RJZCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic1tpbnRlcmFjdElkXS50eXBlID09PSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVIgJiYgb2JzW2ludGVyYWN0SWRdLnN1YnR5cGUgIT09IG9ic1tzZWxmUmVmXS5uZXdQbGF5ZXJUeXBlKSB7XG4gICAgICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIGludGVyYWN0SWQsIG9ic1tpbnRlcmFjdElkXS54LCBvYnNbaW50ZXJhY3RJZF0ueSwgdHlwZXMuT2JqZWN0VHlwZXMuUExBWUVSLCBvYnNbc2VsZlJlZl0ubmV3UGxheWVyVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi9PYmplY3RUeXBlc1wiO1xuaW1wb3J0ICogYXMgcHJlZmFicyBmcm9tIFwiLi4vUHJlZmFic1wiO1xuXG5pbXBvcnQgKiBhcyBfcGxheWVyIGZyb20gXCIuLi9QbGF5ZXIvX1BsYXllci50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgZmlyZW1hZ2UgZnJvbSBcIi4uL1BsYXllci9GaXJlTWFnZS50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgZ29kIGZyb20gXCIuLi9QbGF5ZXIvR29kLnRlbXBsYXRlXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgcGxheWVyIHR5cGUgY2hhbmdlciBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHBsYXllciB0eXBlIGNoYW5nZXIgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBsYXllclR5cGVDaGFuZ2VyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHZhciBjdXN0b21SZW5kZXJTaXplID0gMjtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjODg4ODg4XCIsIFwiI2JiYmJiYlwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggKiBwcmVmYWJzLnJlbmRlclNpemUgLyBjdXN0b21SZW5kZXJTaXplLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0ICogcHJlZmFicy5yZW5kZXJTaXplIC8gY3VzdG9tUmVuZGVyU2l6ZSxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IChvYmplY3Qud2lkdGggLSAxKSAqIHByZWZhYnMucmVuZGVyU2l6ZSAvIGN1c3RvbVJlbmRlclNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IChvYmplY3QuaGVpZ2h0IC0gMSkgKiBwcmVmYWJzLnJlbmRlclNpemUgLyBjdXN0b21SZW5kZXJTaXplLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sXSxcbiAgICAgICAgY3VzdG9tUmVuZGVyU2l6ZTogY3VzdG9tUmVuZGVyU2l6ZSxcbiAgICB9XG59XG5cbi8qKlxuICogR2V0IGxpdHRsZSBtYW4gZm9yIHBsYXllciB0eXBlIGNoYW5nZXIgb2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBwbGF5ZXIgdHlwZSBjaGFuZ2VyIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaXR0bGVNYW5NYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgdmFyIG9iakNvcHkgPSBvYmplY3Q7XG4gICAgb2JqQ29weS53aWR0aCA9IDI7XG4gICAgb2JqQ29weS5oZWlnaHQgPSAzO1xuXG4gICAgdmFyIHBsYXllclR5cGVDaGFuZ2VyTWFzdGVyUGllY2UgPSBfcGxheWVyLnBsYXllck1hc3RlclBpZWNlKG9iakNvcHksIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpO1xuICAgIHN3aXRjaCAob2JqZWN0Lm5ld1BsYXllclR5cGUpIHtcbiAgICAgICAgY2FzZSB0eXBlcy5QbGF5ZXIuRklSRV9NQUdFOlxuICAgICAgICAgICAgcGxheWVyVHlwZUNoYW5nZXJNYXN0ZXJQaWVjZSA9IGZpcmVtYWdlLmZpcmVtYWdlUGxheWVyTWFzdGVyUGllY2Uob2JqQ29weSwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0eXBlcy5QbGF5ZXIuR09EOlxuICAgICAgICAgICAgcGxheWVyVHlwZUNoYW5nZXJNYXN0ZXJQaWVjZSA9IGdvZC5nb2RQbGF5ZXJNYXN0ZXJQaWVjZShvYmpDb3B5LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBwbGF5ZXJUeXBlQ2hhbmdlck1hc3RlclBpZWNlLmN1c3RvbVJlbmRlclNpemUgPSAyO1xuXG4gICAgcmV0dXJuIHBsYXllclR5cGVDaGFuZ2VyTWFzdGVyUGllY2U7XG59XG4iLCJmdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLk9iamVjdFR5cGVzLklOVEVSQUNUQUJMRSxcbiAgICAgICAgeDogcG9zWCxcbiAgICAgICAgeTogcG9zWSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7IH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGZpcmVtYWdlU3BlZWQgPSAwLjE4O1xudmFyIGZpcmVtYWdlSGVhbHRoID0gNjQ7XG5cbnZhciBiYXNlRmlyZVRpY2tzRHVyYXRpb24gPSA1MDA7XG52YXIgZmlyZW1hZ2VGaXJlVGlja3NEdXJhdGlvbiA9IDc1MDtcblxudmFyIGZpcmVUaWNrRGFtYWdlID0gNjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5QbGF5ZXIuRklSRV9NQUdFLFxuICAgICAgICBtYXhIZWFsdGg6IGZpcmVtYWdlSGVhbHRoLFxuICAgICAgICBoZWFsdGg6IGZpcmVtYWdlSGVhbHRoLFxuICAgICAgICBzcGVlZDogZmlyZW1hZ2VTcGVlZCxcbiAgICAgICAgZmlyZVRpY2tzRHVyYXRpb246IGZpcmVtYWdlRmlyZVRpY2tzRHVyYXRpb24sXG4gICAgICAgIGFiaWxpdGllczogW1xuICAgICAgICAgICAgcHJlZmFicy5uZXdBYmlsaXR5KG9icywgdHlwZXMuQWJpbGl0aWVzLkZJUkVCT0xUKSxcbiAgICAgICAgICAgIHByZWZhYnMubmV3QWJpbGl0eShvYnMsIHR5cGVzLkFiaWxpdGllcy5GTEFNRV9QSUxMQVIpLFxuICAgICAgICAgICAgcHJlZmFicy5uZXdBYmlsaXR5KG9icywgdHlwZXMuQWJpbGl0aWVzLkZMQU1FX0RBU0gpLFxuICAgICAgICAgICAgcHJlZmFicy5uZXdBYmlsaXR5KG9icywgdHlwZXMuQWJpbGl0aWVzLkZMQU1FX0JBUlJJRVIpLFxuICAgICAgICBdLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5jcmVhc2VGaXJlVGljayhvYnMsIHNvdXJjZUlkLCBhbW91bnQpIHtcbiAgICB2YXIgbmV3VGltZSA9IERhdGUubm93KCk7XG4gICAgaWYgKG9ic1tzb3VyY2VJZF0uZmlyZVRpY2tzICYmIG5ld1RpbWUgLSBvYnNbc291cmNlSWRdLmZpcmVUaWNrc0xhc3RJbmNyZWFzZSA8IG9ic1tzb3VyY2VJZF0uZmlyZVRpY2tzRHVyYXRpb24pIHtcbiAgICAgICAgb2JzW3NvdXJjZUlkXS5maXJlVGlja3MgPSBvYnNbc291cmNlSWRdLmZpcmVUaWNrcyArIGFtb3VudDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvYnNbc291cmNlSWRdLmZpcmVUaWNrcyA9IGFtb3VudDtcbiAgICAgICAgXG4gICAgICAgIGlmICghb2JzW3NvdXJjZUlkXS5maXJlVGlja3NEdXJhdGlvbikge1xuICAgICAgICAgICAgb2JzW3NvdXJjZUlkXS5maXJlVGlja3NEdXJhdGlvbiA9IGJhc2VGaXJlVGlja3NEdXJhdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvYnNbc291cmNlSWRdLmZpcmVUaWNrc0xhc3RJbmNyZWFzZSA9IG5ld1RpbWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbiAgICBpbmNyZWFzZUZpcmVUaWNrOiBpbmNyZWFzZUZpcmVUaWNrLFxuICAgIGZpcmVUaWNrRGFtYWdlOiBmaXJlVGlja0RhbWFnZSxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgZmlyZW1hZ2UgcGxheWVyIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgZmlyZW1hZ2UgcGxheWVyIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlciBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaXJlbWFnZVBsYXllck1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4geyAgICAvLyBTa2luLCAgICAgIFBhbnRzLCAgICAgU2hpcnQsICAgICAgRmFjZVxuICAgICAgICBwYWxldHRlOiBbXCIjRDJCNDhDXCIsIFwiI0E1MkEyQVwiLCBcIiNEQzE0M0NcIiwgXCIjZGJjM2EzXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IDAsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAyLFxuICAgICAgICAgICAgd2lkdGg6IDQsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiA0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogM1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMC41LFxuICAgICAgICAgICAgaGVpZ2h0OiA2LFxuICAgICAgICAgICAgc3dhdGNoOiAyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAyLjUsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAwLjUsXG4gICAgICAgICAgICBoZWlnaHQ6IDYsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAwLjUsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSxdLFxuICAgIH1cbn1cbiIsInZhciBnb2RTcGVlZCA9IDAuMjg7XG52YXIgZ29kSGVhbHRoID0gMzUwO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgYmFzZSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuICAgIFxuICAgIHJldHVybiB7IFxuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5QbGF5ZXIuR09ELFxuICAgICAgICBtYXhIZWFsdGg6IGdvZEhlYWx0aCxcbiAgICAgICAgaGVhbHRoOiBnb2RIZWFsdGgsXG4gICAgICAgIGN1cnJlbnRFcXVpcG1lbnQ6IDAsXG4gICAgICAgIGVxdWlwbWVudDogW1xuICAgICAgICAgICAgcHJlZmFicy5uZXdFcXVpcG1lbnQob2JzLCB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CTEFTVEVSKSxcbiAgICAgICAgICAgIHByZWZhYnMubmV3RXF1aXBtZW50KG9icywgdHlwZXMuRXF1aXBtZW50VHlwZXMuU0NBTk5FUiksXG4gICAgICAgICAgICBwcmVmYWJzLm5ld0VxdWlwbWVudChvYnMsIHR5cGVzLkVxdWlwbWVudFR5cGVzLkJVSUxERVIsIHsgdHlwZTogdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTiwgc3VidHlwZTogdHlwZXMuVGVycmFpbi5UUkVFIH0pLFxuICAgICAgICAgICAgcHJlZmFicy5uZXdFcXVpcG1lbnQob2JzLCB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CSU5PQ1VMQVJTKSxcbiAgICAgICAgXSxcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgZ29kIHBsYXllciBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGdvZCBwbGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdvZFBsYXllck1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjRkYxNDkzODhcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDIsXG4gICAgICAgICAgICB3aWR0aDogNCxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sXSxcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIG9iamVjdCdzIGhlYWx0aCBiYXJcbiAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdCB0aGF0IG5lZWRzIGEgaGVhbHRoIGJhclxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlciBvYmplY3RzXG4gKiBAcGFyYW0gY3ViZVNpemUgVGhlIGN1YmUgcmVuZGVyIHNpemUsIHJlcXVpcmVkIHdoZW4gZHJhd2luZyBmcmVlIGhhbmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhlYWx0aEJhck1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlciwgY3ViZVNpemU6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjMDBhNDAwXCIsIFwiI0ZGMDAwMFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFkgLSAob2JqZWN0LmhlaWdodCArIDIpICogY3ViZVNpemUgLyAyLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LmhlYWx0aCAvIG9iamVjdC5tYXhIZWFsdGggKiBvYmplY3Qud2lkdGggKiBjdWJlU2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogY3ViZVNpemUgKiAzIC8gNCxcbiAgICAgICAgICAgIHN3YXRjaDogKG9iamVjdC5oZWFsdGggPiBvYmplY3QubWF4SGVhbHRoIC8gMykgPyAwIDogMSxcbiAgICAgICAgfSxdLFxuICAgICAgICBjdXN0b21SZW5kZXJTaXplOiAxXG4gICAgfTtcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlLCBTdHJva2VUeXBlcyB9IGZyb20gXCIuLi8uLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGludnVsbmVyYWJsZSBzdGF0dXMgZWZmZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBpbnZ1bG5lcmFibGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludnVsbmVyYWJsZVN0YXR1c0VmZmVjdE1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlciwgcmVuZGVyU2l6ZTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNGRkZGMDA2NlwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggKyAyLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQgKyAyLFxuICAgICAgICBmYWNpbmc6IDAsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCArIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQgKyAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwLFxuICAgICAgICAgICAgdHlwZTogU3Ryb2tlVHlwZXMuUkVDVCwgLy8gVE9ETzogTWFrZSBjaXJjXG4gICAgICAgIH0sXSxcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIHN0dW5uZWQgc3RhdHVzIGVmZmVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgc3R1bm5lZCBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3R1bm5lZFN0YXR1c0VmZmVjdE1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlciwgcmVuZGVyU2l6ZTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNGRkZGMDBcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSBvYmplY3QuaGVpZ2h0IC8gMiAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogNixcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMyxcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogNSxcbiAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiA1LFxuICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogNCxcbiAgICAgICAgICAgIGNlbGxZOiAyLFxuICAgICAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwgXSxcbiAgICAgICAgY3VzdG9tUmVuZGVyU2l6ZTogMixcbiAgICB9XG59XG4iLCJ2YXIgcGxheWVyU3BlZWQgPSAwLjI7XG52YXIgcGxheWVySGVhbHRoID0gMTAwO1xudmFyIHBsYXllcldpZHRoID0gNDtcbnZhciBwbGF5ZXJIZWlnaHQgPSA2O1xudmFyIHBsYXllclZpZXdSYW5nZSA9IDEgLyAyO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgY29sbGlzaW9ucyA9IHJlcXVpcmUoXCIuLi8uLi9Db2xsaXNpb25zXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVIsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLlBsYXllci5IVU1BTixcbiAgICAgICAgeDogcG9zWCxcbiAgICAgICAgeTogcG9zWSxcbiAgICAgICAgdmVsb2NpdHlYOiAwLFxuICAgICAgICB2ZWxvY2l0eVk6IDAsXG4gICAgICAgIHNwZWVkOiBwbGF5ZXJTcGVlZCxcbiAgICAgICAgd2lkdGg6IHBsYXllcldpZHRoLFxuICAgICAgICBoZWlnaHQ6IHBsYXllckhlaWdodCxcbiAgICAgICAgaGl0Ym94VHlwZTogdHlwZXMuSGl0Ym94VHlwZXMuUkVDVCxcbiAgICAgICAgaGl0Ym94V2lkdGg6IHBsYXllcldpZHRoIC0gMixcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiBwbGF5ZXJIZWlnaHQsXG4gICAgICAgIGhlYWx0aDogcGxheWVySGVhbHRoLFxuICAgICAgICBtYXhIZWFsdGg6IHBsYXllckhlYWx0aCxcbiAgICAgICAgY3VycmVudEVxdWlwbWVudDogdW5kZWZpbmVkLFxuICAgICAgICBlcXVpcG1lbnQ6IFsgXSxcbiAgICAgICAgYWJpbGl0aWVzOiBbIF0sXG4gICAgICAgIHN0YXR1c0VmZmVjdHM6IHsgfSxcbiAgICAgICAgdmlld1JhbmdlOiBwbGF5ZXJWaWV3UmFuZ2UsXG4gICAgICAgIGRlYXRocmF0dGxlOiAob2JzLCBzZWxmUmVmKSA9PiB7XG4gICAgICAgICAgICBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgc2VsZlJlZiwgb2JzW3NlbGZSZWZdLngsIG9ic1tzZWxmUmVmXS55LCB0eXBlcy5PYmplY3RUeXBlcy5HUkFWRVNUT05FKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7XG4gICAgICAgICAgICBvYnNbc2VsZklkXS51cGRhdGVTdGF0dXNFZmZlY3RzKG9icywgc2VsZklkKTtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHBsYXllciBtb3ZlbWVudFxuICAgICAgICAgICAgb2JzW3NlbGZJZF0ueCArPSBvYnNbc2VsZklkXS52ZWxvY2l0eVggKiBkZWx0YTtcbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLnkgKz0gb2JzW3NlbGZJZF0udmVsb2NpdHlZICogZGVsdGE7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGNvbGxpc2lvbnMgd2l0aCB0ZXJyYWluIGFuZCByZXBvc2l0aW9uIGFjY29yZGluZ2x5XG4gICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9ucyhzZWxmSWQsIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQpe1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9ic1tjb2xsaXNpb25JZF0udHlwZSkgeyAgICAgICAgLy8gU2hvdWxkIHBsYXllcnMgY29sbGlkZSB3aXRoIG90aGVyIHBsYXllcnM/XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRFUlJBSU46XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5wdXNoQmFjayhvYnMsIHNyY0lkLCBjb2xsaXNpb25JZCwgcHJlZmFicy5yZW5kZXJTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBtb3VzZURvd246IChvYnMsIG1vdXNlRXZlbnQpID0+IHsgICAvLyBQcmltYXJ5IGNsaWNrIGNhc3RzIGZpcnN0IGFiaWxpdHlcbiAgICAgICAgICAgIGlmIChvYnNbbW91c2VFdmVudC5zb3VyY2VJZF0uYWJpbGl0aWVzWzBdICYmICFjaGVja1N0YXR1c0VmZmVjdChvYnMsIG1vdXNlRXZlbnQuc291cmNlSWQsIHR5cGVzLlN0YXR1c0VmZmVjdHMuU1RVTk5FRCkpIHtcbiAgICAgICAgICAgICAgICBvYnNbbW91c2VFdmVudC5zb3VyY2VJZF0uYWJpbGl0aWVzWzBdLmNhc3Qob2JzLCBtb3VzZUV2ZW50LnNvdXJjZUlkLCAwLCBtb3VzZUV2ZW50LnRhcmdldFgsIG1vdXNlRXZlbnQudGFyZ2V0WSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uUGxheWVySW5wdXQ6IChvYnMsIHNlbGZJZCwgcGxheWVySW5wdXQpID0+IHtcbiAgICAgICAgICAgIHBsYXllciA9IG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgaWYgKGNoZWNrU3RhdHVzRWZmZWN0KG9icywgc2VsZklkLCB0eXBlcy5TdGF0dXNFZmZlY3RzLlNUVU5ORUQpKSB7XG4gICAgICAgICAgICAgICAgIHBsYXllci52ZWxvY2l0eVggPSAwO1xuICAgICAgICAgICAgICAgICBwbGF5ZXIudmVsb2NpdHlZID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHhEaXIgPSAwO1xuICAgICAgICAgICAgICAgIHZhciB5RGlyID0gMDtcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAocGxheWVySW5wdXQubGVmdCkge1xuICAgICAgICAgICAgICAgICAgICB4RGlyIC09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5yaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB4RGlyICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC51cCkge1xuICAgICAgICAgICAgICAgICAgICB5RGlyIC09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5kb3duKSB7XG4gICAgICAgICAgICAgICAgICAgIHlEaXIgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgcGxheWVyLnZlbG9jaXR5WCA9IHhEaXIgKiBwbGF5ZXIuc3BlZWQ7XG4gICAgICAgICAgICAgICAgcGxheWVyLnZlbG9jaXR5WSA9IHlEaXIgKiBwbGF5ZXIuc3BlZWQ7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5jeWNsZUVxdWlwbWVudEZvcndhcmQgJiYgIXBsYXllcklucHV0LmN5Y2xlRXF1aXBtZW50QmFja3dhcmQgJiYgb2JzW3NlbGZJZF0uY3VycmVudEVxdWlwbWVudCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmVxdWlwbWVudFtwbGF5ZXIuY3VycmVudEVxdWlwbWVudF0ub25EZXF1aXAob2JzLCBzZWxmSWQpO1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuY3VycmVudEVxdWlwbWVudCA9IHBsYXllci5jdXJyZW50RXF1aXBtZW50ICsgMSA+PSBwbGF5ZXIuZXF1aXBtZW50Lmxlbmd0aCA/IDAgOiBwbGF5ZXIuY3VycmVudEVxdWlwbWVudCArIDE7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5lcXVpcG1lbnRbcGxheWVyLmN1cnJlbnRFcXVpcG1lbnRdLm9uRXF1aXAob2JzLCBzZWxmSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGxheWVySW5wdXQuY3ljbGVFcXVpcG1lbnRCYWNrd2FyZCAmJiAhcGxheWVySW5wdXQuY3ljbGVFcXVpcG1lbnRGb3J3YXJkICYmIG9ic1tzZWxmSWRdLmN1cnJlbnRFcXVpcG1lbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5lcXVpcG1lbnRbcGxheWVyLmN1cnJlbnRFcXVpcG1lbnRdLm9uRGVxdWlwKG9icywgc2VsZklkKTtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRFcXVpcG1lbnQgPSBwbGF5ZXIuY3VycmVudEVxdWlwbWVudCAtIDEgPCAwID8gcGxheWVyLmVxdWlwbWVudC5sZW5ndGggLSAxIDogcGxheWVyLmN1cnJlbnRFcXVpcG1lbnQgLSAxO1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZXF1aXBtZW50W3BsYXllci5jdXJyZW50RXF1aXBtZW50XS5vbkVxdWlwKG9icywgc2VsZklkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllcklucHV0LnVzZUVxdWlwbWVudCAmJiBvYnNbc2VsZklkXS5jdXJyZW50RXF1aXBtZW50ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS5lcXVpcG1lbnRbb2JzW3NlbGZJZF0uY3VycmVudEVxdWlwbWVudF1cbiAgICAgICAgICAgICAgICAgICAgICAgIC51c2Uob2JzLCBzZWxmSWQsIHBsYXllcklucHV0LnRhcmdldFgsIHBsYXllcklucHV0LnRhcmdldFkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICBpZiAocGxheWVySW5wdXQuYWJpbGl0eTEgJiYgb2JzW3NlbGZJZF0uYWJpbGl0aWVzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLmFiaWxpdGllc1swXS5jYXN0KG9icywgc2VsZklkLCAwLCBwbGF5ZXJJbnB1dC50YXJnZXRYLCBwbGF5ZXJJbnB1dC50YXJnZXRZKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllcklucHV0LmFiaWxpdHkyICYmIG9ic1tzZWxmSWRdLmFiaWxpdGllc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS5hYmlsaXRpZXNbMV0uY2FzdChvYnMsIHNlbGZJZCwgMSwgcGxheWVySW5wdXQudGFyZ2V0WCwgcGxheWVySW5wdXQudGFyZ2V0WSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5hYmlsaXR5MyAmJiBvYnNbc2VsZklkXS5hYmlsaXRpZXNbMl0pIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0uYWJpbGl0aWVzWzJdLmNhc3Qob2JzLCBzZWxmSWQsIDIsIHBsYXllcklucHV0LnRhcmdldFgsIHBsYXllcklucHV0LnRhcmdldFkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGxheWVySW5wdXQuYWJpbGl0eTQgJiYgb2JzW3NlbGZJZF0uYWJpbGl0aWVzWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLmFiaWxpdGllc1szXS5jYXN0KG9icywgc2VsZklkLCAzLCBwbGF5ZXJJbnB1dC50YXJnZXRYLCBwbGF5ZXJJbnB1dC50YXJnZXRZKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5waWNrdXApIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5jaGVja0NvbGxpc2lvbnMoc2VsZklkLCBvYnMsIHByZWZhYnMucmVuZGVyU2l6ZSwgKHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQgJiYgb2JzW2NvbGxpc2lvbklkXS50eXBlID09IHR5cGVzLk9iamVjdFR5cGVzLklOVEVSQUNUQUJMRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tjb2xsaXNpb25JZF0ub25JbnRlcmFjdChvYnMsIGNvbGxpc2lvbklkLCBzcmNJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaGVhbDogKG9icywgc2VsZklkLCBhbW91bnQpID0+IHtcbiAgICAgICAgICAgIGlmIChvYnNbc2VsZklkXSkge1xuICAgICAgICAgICAgICAgIHZhciBoZWFsQW1vdW50ID0gb2JzW3NlbGZJZF0uaGVhbHRoICsgYW1vdW50ID49IG9ic1tzZWxmSWRdLm1heEhlYWx0aFxuICAgICAgICAgICAgICAgICAgICA/IG9ic1tzZWxmSWRdLm1heEhlYWx0aCAtIG9ic1tzZWxmSWRdLmhlYWx0aFxuICAgICAgICAgICAgICAgICAgICA6IGFtb3VudDtcbiAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS5oZWFsdGggKz0gaGVhbEFtb3VudFxuICAgICAgICAgICAgICAgIHByZWZhYnMuZ2VuZXJhdGVOZXcob2JzLCBzZWxmSWQsIDAsIDAsIHR5cGVzLk9iamVjdFR5cGVzLkNPTUJBVF9URVhULCB0eXBlcy5Db21iYXRUZXh0LkhFQUxfVEVYVCwgeyB0ZXh0OiBcIitcIiArIGhlYWxBbW91bnQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRhbWFnZTogKG9icywgc2VsZklkLCBhbW91bnQpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGVja1N0YXR1c0VmZmVjdChvYnMsIHNlbGZJZCwgdHlwZXMuU3RhdHVzRWZmZWN0cy5JTlZVTE5FUkFCTEUpKSB7XG4gICAgICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIHNlbGZJZCwgMCwgMCwgdHlwZXMuT2JqZWN0VHlwZXMuQ09NQkFUX1RFWFQsIHR5cGVzLkNvbWJhdFRleHQuSU5WVUxORVJBQkxFX1RFWFQsIHsgdGV4dDogXCIqIFwiICsgYW1vdW50ICsgXCIgKlwiIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS5oZWFsdGggLT0gYW1vdW50O1xuXG4gICAgICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdLmhlYWx0aCA8PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0uZGVhdGhyYXR0bGUob2JzLCBzZWxmSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlU3RhdHVzRWZmZWN0czogKG9icywgc2VsZklkKSA9PiB7XG4gICAgICAgICAgICB2YXIgbmV3VGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgICAgIHN0YXR1c0VmZmVjdENoZWNrSGVscGVyKG9icywgc2VsZklkLCB0eXBlcy5TdGF0dXNFZmZlY3RzLlNUVU5ORUQsIG5ld1RpbWUpO1xuICAgICAgICAgICAgc3RhdHVzRWZmZWN0Q2hlY2tIZWxwZXIob2JzLCBzZWxmSWQsIHR5cGVzLlN0YXR1c0VmZmVjdHMuSU5WVUxORVJBQkxFLCBuZXdUaW1lKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkU3RhdHVzRWZmZWN0OiAob2JzLCBpZCwgZWZmZWN0LCBkdXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgdmFyIG5ld1RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBPbmx5IHJlcGxhY2UgdGhlIGN1cnJlbnQgc3RhdHVzIGVmZmVjdCBsYXN0IGNhc3QgYW5kIGR1cmF0aW9uIGlmIHRoZSBuZXcgZHVyYXRpb24gaXMgbG9uZ2VyIHRoYW4gd2hhdCdzIGxlZnRcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0gfHxcbiAgICAgICAgICAgICAgICBvYnNbaWRdLnN0YXR1c0VmZmVjdHNbZWZmZWN0XS5kdXJhdGlvbiAtIChuZXdUaW1lIC0gb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0ubGFzdCkgPCBkdXJhdGlvblxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0gPSB7IH07XG4gICAgICAgICAgICAgICAgb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0ubGFzdCA9IG5ld1RpbWU7XG4gICAgICAgICAgICAgICAgb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0uZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBzdGF0dXNFZmZlY3RDaGVja0hlbHBlcihvYnMsIGlkLCBlZmZlY3QsIG5ld1RpbWUpIHtcbiAgICBpZiAoXG4gICAgICAgIG9ic1tpZF0uc3RhdHVzRWZmZWN0c1tlZmZlY3RdICYmXG4gICAgICAgIG5ld1RpbWUgLSBvYnNbaWRdLnN0YXR1c0VmZmVjdHNbZWZmZWN0XS5sYXN0ID49IG9ic1tpZF0uc3RhdHVzRWZmZWN0c1tlZmZlY3RdLmR1cmF0aW9uXG4gICAgKSB7XG4gICAgICAgIGRlbGV0ZSBvYnNbaWRdLnN0YXR1c0VmZmVjdHNbZWZmZWN0XTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrU3RhdHVzRWZmZWN0KG9icywgaWQsIGVmZmVjdCkge1xuICAgIHJldHVybiBvYnNbaWRdLnN0YXR1c0VmZmVjdHNbZWZmZWN0XTtcbn1cblxuZnVuY3Rpb24gY2hlY2tTdGF0dXNFZmZlY3RPYmplY3Qob2JqZWN0LCBlZmZlY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0LnN0YXR1c0VmZmVjdHNbZWZmZWN0XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxuICAgIGNoZWNrU3RhdHVzRWZmZWN0OiBjaGVja1N0YXR1c0VmZmVjdE9iamVjdCxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgcGxheWVyIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgcGxheWVyIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlciBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI2FiYWI5YVwiLCBcIiM3NzUwNTBcIiwgXCIjQUFBQUFBXCIsIFwiIzAwMDA4MFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMixcbiAgICAgICAgICAgIHdpZHRoOiA0LFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDMsXG4gICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDQsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfV0sXG4gICAgfVxufVxuIiwidmFyIHR5cGVzID0gcmVxdWlyZShcIi4uL09iamVjdFR5cGVzXCIpO1xudmFyIGNvbGxpc2lvbnMgPSByZXF1aXJlKFwiLi4vQ29sbGlzaW9uc1wiKTtcblxuLy8gLS0tLS0gUHJlZmFicyAtLS0tLSAvL1xudmFyIF9wbGF5ZXIgPSByZXF1aXJlKFwiLi9QbGF5ZXIvX1BsYXllclwiKTtcbnZhciBnb2QgPSByZXF1aXJlKFwiLi9QbGF5ZXIvR29kXCIpO1xudmFyIGZpcmVtYWdlID0gcmVxdWlyZShcIi4vUGxheWVyL0ZpcmVNYWdlXCIpO1xuXG52YXIgX2dyYXZlc3RvbmUgPSByZXF1aXJlKFwiLi9HcmF2ZXN0b25lL19HcmF2ZXN0b25lXCIpO1xuXG52YXIgX3Byb2plY3RpbGUgPSByZXF1aXJlKFwiLi9Qcm9qZWN0aWxlL19Qcm9qZWN0aWxlXCIpO1xudmFyIGZpcmVib2x0UHJvamVjdGlsZSA9IHJlcXVpcmUoXCIuL1Byb2plY3RpbGUvRmlyZWJvbHRQcm9qZWN0aWxlXCIpO1xudmFyIGZsYW1lUGlsbGFyUHJvamVjdGlsZSA9IHJlcXVpcmUoXCIuL1Byb2plY3RpbGUvRmxhbWVQaWxsYXJQcm9qZWN0aWxlXCIpO1xudmFyIGZsYW1lRGFzaFByb2plY3RpbGUgPSByZXF1aXJlKFwiLi9Qcm9qZWN0aWxlL0ZsYW1lRGFzaFByb2plY3RpbGVcIik7XG5cbnZhciBfdGVycmFpbiA9IHJlcXVpcmUoXCIuL1RlcnJhaW4vX1RlcnJhaW5cIik7XG52YXIgdHJlZSA9IHJlcXVpcmUoXCIuL1RlcnJhaW4vVHJlZVwiKTtcbnZhciB3YWxsSG9yaXogPSByZXF1aXJlKFwiLi9UZXJyYWluL1dhbGxIb3JpelwiKTtcblxudmFyIF9pbnRlcmFjdGFibGUgPSByZXF1aXJlKFwiLi9JbnRlcmFjdGFibGUvX0ludGVyYWN0YWJsZVwiKTtcbnZhciBoZWFsdGhQaWNrdXAgPSByZXF1aXJlKFwiLi9JbnRlcmFjdGFibGUvSGVhbHRoUGlja3VwXCIpO1xudmFyIGNhckVudGVyID0gcmVxdWlyZShcIi4vSW50ZXJhY3RhYmxlL0NhckVudGVyXCIpO1xudmFyIHBsYXllclR5cGVDaGFuZ2VyID0gcmVxdWlyZShcIi4vSW50ZXJhY3RhYmxlL1BsYXllclR5cGVDaGFuZ2VyXCIpO1xuXG52YXIgX3RyaWdnZXIgPSByZXF1aXJlKFwiLi9UcmlnZ2VyL19UcmlnZ2VyXCIpO1xudmFyIHNwaWtlVHJhcCA9IHJlcXVpcmUoXCIuL1RyaWdnZXIvU3Bpa2VUcmFwXCIpO1xuXG52YXIgX3ZlaGljbGUgPSByZXF1aXJlKFwiLi9WZWhpY2xlL19WZWhpY2xlXCIpO1xudmFyIGNhciA9IHJlcXVpcmUoXCIuL1ZlaGljbGUvQ2FyXCIpO1xuXG52YXIgYmxhc3RlciA9IHJlcXVpcmUoXCIuL0VxdWlwbWVudC9CbGFzdGVyXCIpO1xudmFyIHNjYW5uZXIgPSByZXF1aXJlKFwiLi9FcXVpcG1lbnQvU2Nhbm5lclwiKTtcbnZhciBidWlsZGVyID0gcmVxdWlyZShcIi4vRXF1aXBtZW50L0J1aWxkZXJcIik7XG52YXIgYmlub2N1bGFycyA9IHJlcXVpcmUoXCIuL0VxdWlwbWVudC9CaW5vY3VsYXJzXCIpO1xuXG52YXIgZmlyZWJvbHQgPSByZXF1aXJlKFwiLi9BYmlsaXRpZXMvRmlyZWJvbHRcIik7XG52YXIgZmxhbWVQaWxsYXIgPSByZXF1aXJlKFwiLi9BYmlsaXRpZXMvRmxhbWVQaWxsYXJcIik7XG52YXIgZmxhbWVEYXNoID0gcmVxdWlyZShcIi4vQWJpbGl0aWVzL0ZsYW1lRGFzaFwiKTtcbnZhciBmbGFtZUJhcnJpZXIgPSByZXF1aXJlKFwiLi9BYmlsaXRpZXMvRmxhbWVCYXJyaWVyXCIpO1xuXG52YXIgX2NvbWJhdFRleHQgPSByZXF1aXJlKFwiLi9Db21iYXRUZXh0L19Db21iYXRUZXh0XCIpO1xudmFyIGRhbWFnZVRleHQgPSByZXF1aXJlKFwiLi9Db21iYXRUZXh0L0RhbWFnZVRleHRcIik7XG52YXIgZmlyZURhbWFnZVRleHQgPSByZXF1aXJlKFwiLi9Db21iYXRUZXh0L0ZpcmVEYW1hZ2VUZXh0XCIpO1xudmFyIGludnVsbmVyYWJsZVRleHQgPSByZXF1aXJlKFwiLi9Db21iYXRUZXh0L0ludnVsbmVyYWJsZVRleHRcIik7XG52YXIgaGVhbFRleHQgPSByZXF1aXJlKFwiLi9Db21iYXRUZXh0L0hlYWxUZXh0XCIpO1xuXG4vLyBFeHBvcnQgcmVuZGVyIHNpemVcbnZhciByZW5kZXJTaXplID0gNDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcmVuZGVyU2l6ZTogcmVuZGVyU2l6ZSxcbiAgICAvLyBHZW5lcmF0ZSBhIG5ldyB0ZXJyYWluIG9iamVjdFxuICAgIGdlbmVyYXRlTmV3OiAob2JzLCBzcmMsIHBvc1gsIHBvc1ksIHR5cGUsIHN1YnR5cGUsIHBhcmFtcyA9IHsgfSkgPT4ge1xuICAgICAgICB2YXIgbmV3T2JqO1xuICAgICAgICBcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUjpcbiAgICAgICAgICAgICAgICBuZXdPYmogPSBfcGxheWVyLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5QbGF5ZXIuR09EOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gZ29kLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUGxheWVyLkZJUkVfTUFHRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGZpcmVtYWdlLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9ic1tzcmNdID0gbmV3T2JqO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuR1JBVkVTVE9ORTpcbiAgICAgICAgICAgICAgICBuZXdPYmogPSBfZ3JhdmVzdG9uZS5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSk7XG4gICAgICAgICAgICAgICAgb2JzW3NyY10gPSBuZXdPYmo7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QUk9KRUNUSUxFOlxuICAgICAgICAgICAgICAgIC8vIEdlbmVyYXRlIHVuaXF1ZSBJZCBmb3IgbmV3IHByb2plY3RpbGVcbiAgICAgICAgICAgICAgICB2YXIgbmV3SWQgPSBzcmMuY29uY2F0KFwiOlwiICsgdHlwZSArIFwiOlwiICsgc3VidHlwZSArIFwiOlwiLCBwb3NYLCBcIjpcIiwgcG9zWSk7XG4gICAgICAgICAgICAgICAgdmFyIGR1cCA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG9ic1tuZXdJZC5jb25jYXQoXCI6XCIgKyBkdXApXSl7XG4gICAgICAgICAgICAgICAgICAgIGR1cCsrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5ld09iaiA9IF9wcm9qZWN0aWxlLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Qcm9qZWN0aWxlLkZJUkVCT0xUX1BST0pFQ1RJTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmogPSBmaXJlYm9sdFByb2plY3RpbGUuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIG5ld09iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Qcm9qZWN0aWxlLkZMQU1FX1BJTExBUl9QUk9KRUNUSUxFOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gZmxhbWVQaWxsYXJQcm9qZWN0aWxlLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUHJvamVjdGlsZS5GTEFNRV9EQVNIX1BST0pFQ1RJTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmogPSBmbGFtZURhc2hQcm9qZWN0aWxlLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXdPYmopIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBvYnNbbmV3SWQuY29uY2F0KFwiOlwiICsgZHVwKV0gPSBuZXdPYmo7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRFUlJBSU46XG4gICAgICAgICAgICAgICAgbmV3T2JqID0gX3RlcnJhaW4uZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRlcnJhaW4uVFJFRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IHRyZWUuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIG5ld09iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5UZXJyYWluLldBTExfSE9SSVo6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmogPSB3YWxsSG9yaXouZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIG5ld09iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLklOVEVSQUNUQUJMRTpcbiAgICAgICAgICAgICAgICBuZXdPYmogPSBfaW50ZXJhY3RhYmxlLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5JbnRlcmFjdGFibGUuSEVBTFRIX1BJQ0tVUDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGhlYWx0aFBpY2t1cC5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkludGVyYWN0YWJsZS5DQVJfRU5URVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmogPSBjYXJFbnRlci5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgb2JzW3NyYyArIFwiOlwiICsgdHlwZSArIFwiOlwiICsgc3VidHlwZV0gPSBuZXdPYmo7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuSW50ZXJhY3RhYmxlLlBMQVlFUl9UWVBFX0NIQU5HRVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmogPSBwbGF5ZXJUeXBlQ2hhbmdlci5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqLCBwYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5UUklHR0VSOlxuICAgICAgICAgICAgICAgIG5ld09iaiA9IF90cmlnZ2VyLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5UcmlnZ2VyLlNQSUtFX1RSQVA6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmogPSBzcGlrZVRyYXAuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIG5ld09iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEU6XG4gICAgICAgICAgICAgICAgbmV3T2JqID0gX3ZlaGljbGUuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlZlaGljbGUuQ0FSOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gY2FyLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuQ09NQkFUX1RFWFQ6XG4gICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgdW5pcXVlIElkIGZvciBuZXcgY29tYmF0IHRleHRcbiAgICAgICAgICAgICAgICB2YXIgbmV3SWQgPSBzcmMuY29uY2F0KFwiOlwiICsgdHlwZSArIFwiOlwiICsgc3VidHlwZSArIFwiOlwiLCBwb3NYLCBcIjpcIiwgcG9zWSk7XG4gICAgICAgICAgICAgICAgdmFyIGR1cCA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG9ic1tuZXdJZC5jb25jYXQoXCI6XCIgKyBkdXApXSl7XG4gICAgICAgICAgICAgICAgICAgIGR1cCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdPYmogPSBfY29tYmF0VGV4dC5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgcGFyYW1zKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Db21iYXRUZXh0LkRBTUFHRV9URVhUOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gZGFtYWdlVGV4dC5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkNvbWJhdFRleHQuRklSRV9EQU1BR0VfVEVYVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGZpcmVEYW1hZ2VUZXh0LmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuQ29tYmF0VGV4dC5JTlZVTE5FUkFCTEVfVEVYVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGludnVsbmVyYWJsZVRleHQuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIG5ld09iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Db21iYXRUZXh0LkhFQUxfVEVYVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGhlYWxUZXh0LmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9ic1tuZXdJZC5jb25jYXQoXCI6XCIgKyBkdXApXSA9IG5ld09iajtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE86IENvbnNpZGVyIHJlbW92aW5nIHRoaXM/XG4gICAgICAgIGlmICghbmV3T2JqKSB7XG4gICAgICAgICAgICBuZXdPYmogPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTixcbiAgICAgICAgICAgICAgICBzdWJ0eXBlOiBzdWJ0eXBlLFxuICAgICAgICAgICAgICAgIHg6IHBvc1gsXG4gICAgICAgICAgICAgICAgeTogcG9zWSxcbiAgICAgICAgICAgICAgICB3aWR0aDogNixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDYsXG4gICAgICAgICAgICAgICAgaGl0Ym94VHlwZTogdHlwZXMuSGl0Ym94VHlwZXMuUkVDVCxcbiAgICAgICAgICAgICAgICBoaXRib3hXaWR0aDogNixcbiAgICAgICAgICAgICAgICBoaXRib3hIZWlnaHQ6IDYsXG4gICAgICAgICAgICAgICAgaGVhbHRoOiAxLFxuICAgICAgICAgICAgICAgIG1heEhlYWx0aDogMSxcbiAgICAgICAgICAgICAgICB1cGRhdGU6IChvYnMsIHNlbGZJZCwgZGVsdGEpID0+IHsgfSxcbiAgICAgICAgICAgICAgICBkYW1hZ2U6IChvYnMsIHNlbGZJZCwgYW1vdW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLmhlYWx0aCAtPSBhbW91bnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdLmhlYWx0aCA8PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLmRlYXRocmF0dGxlKG9icywgc2VsZklkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVhdGhyYXR0bGU6IChvYnMsIHNlbGZJZCkgPT4geyB9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9ic1tzcmMgKyBcIjpcIiArIHR5cGUgKyBcIjpcIiArIHN1YnR5cGUgKyBcIjpcIiArIHBvc1ggKyBcIjpcIiArIHBvc1ldID0gbmV3T2JqO1xuICAgIH0sXG4gICAgbmV3RXF1aXBtZW50OiAob2JzLCB0eXBlLCBwYXJhbXMgPSB7IH0pID0+IHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkVxdWlwbWVudFR5cGVzLkJMQVNURVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJsYXN0ZXIuZ2VuZXJhdGVOZXcob2JzLCBwYXJhbXMpO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5TQ0FOTkVSOlxuICAgICAgICAgICAgICAgIHJldHVybiBzY2FubmVyLmdlbmVyYXRlTmV3KG9icywgcGFyYW1zKTtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuRXF1aXBtZW50VHlwZXMuQlVJTERFUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVpbGRlci5nZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyk7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkVxdWlwbWVudFR5cGVzLkJJTk9DVUxBUlM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbm9jdWxhcnMuZ2VuZXJhdGVOZXcob2JzLCBwYXJhbXMpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBuZXdBYmlsaXR5OiAob2JzLCB0eXBlLCBwYXJhbXMgPSB7IH0pID0+IHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkFiaWxpdGllcy5GSVJFQk9MVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlyZWJvbHQuZ2VuZXJhdGVOZXcob2JzKTtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuQWJpbGl0aWVzLkZMQU1FX1BJTExBUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmxhbWVQaWxsYXIuZ2VuZXJhdGVOZXcob2JzKTtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuQWJpbGl0aWVzLkZMQU1FX0RBU0g6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZsYW1lRGFzaC5nZW5lcmF0ZU5ldyhvYnMpO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5BYmlsaXRpZXMuRkxBTUVfQkFSUklFUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmxhbWVCYXJyaWVyLmdlbmVyYXRlTmV3KG9icyk7XG4gICAgICAgIH1cbiAgICB9LFxufSIsInZhciBmaXJlYm9sdFNwZWVkID0gMC4zNTtcbnZhciBmaXJlYm9sdFdpZHRoID0gMztcbnZhciBmaXJlYm9sdEhlaWdodCA9IDM7XG52YXIgZmlyZWJvbHRIaXRCb3hSYWRpdXMgPSAxLjU7XG52YXIgZmlyZWJvbHREYW1hZ2UgPSAxMjtcbnZhciBmaXJlYm9sdFRpY2tJbmNyZWFzZSA9IDE7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG4gICAgdmFyIGZpcmVtYWdlID0gcmVxdWlyZShcIi4uL1BsYXllci9GaXJlTWFnZVwiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5Qcm9qZWN0aWxlLkZJUkVCT0xUX1BST0pFQ1RJTEUsXG4gICAgICAgIHZlbG9jaXR5WDogTWF0aC5jb3MoYmFzZS5hbmdsZSkgKiBmaXJlYm9sdFNwZWVkLFxuICAgICAgICB2ZWxvY2l0eVk6IE1hdGguc2luKGJhc2UuYW5nbGUpICogZmlyZWJvbHRTcGVlZCxcbiAgICAgICAgd2lkdGg6IGZpcmVib2x0V2lkdGgsXG4gICAgICAgIGhlaWdodDogZmlyZWJvbHRIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLkNJUkMsXG4gICAgICAgIGhpdGJveFJhZGl1czogZmlyZWJvbHRIaXRCb3hSYWRpdXMsXG4gICAgICAgIGRhbWFnZTogZmlyZWJvbHREYW1hZ2UsXG4gICAgICAgIG9uSGl0OiAob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAob2JzW2NvbGxpc2lvbklkXS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVI6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5HUkFWRVNUT05FOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVkVISUNMRTpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRFUlJBSU46XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYnNbc3JjSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JzW2NvbGxpc2lvbklkXSAmJiBvYnNbY29sbGlzaW9uSWRdLmRhbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVtYWdlLmluY3JlYXNlRmlyZVRpY2soXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9icyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzW3NyY0lkXS5zb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tjb2xsaXNpb25JZF0udHlwZSA9PT0gdHlwZXMuT2JqZWN0VHlwZXMuUExBWUVSID8gZmlyZWJvbHRUaWNrSW5jcmVhc2UgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhbWFnZSA9IG9ic1tzcmNJZF0uZGFtYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcmVEYW1hZ2UgPSBvYnNbb2JzW3NyY0lkXS5zb3VyY2VdLmZpcmVUaWNrcyA/IG9ic1tvYnNbc3JjSWRdLnNvdXJjZV0uZmlyZVRpY2tzICogZmlyZW1hZ2UuZmlyZVRpY2tEYW1hZ2U6IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgY29sbGlzaW9uSWQsIDAsIDAsIHR5cGVzLk9iamVjdFR5cGVzLkNPTUJBVF9URVhULCB0eXBlcy5Db21iYXRUZXh0LkRBTUFHRV9URVhULCB7IHRleHQ6IFwiLVwiICsgZGFtYWdlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaXJlRGFtYWdlKSBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgY29sbGlzaW9uSWQsIDAsIDAsIHR5cGVzLk9iamVjdFR5cGVzLkNPTUJBVF9URVhULCB0eXBlcy5Db21iYXRUZXh0LkZJUkVfREFNQUdFX1RFWFQsIHsgdGV4dDogXCItXCIgKyBmaXJlRGFtYWdlIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzW2NvbGxpc2lvbklkXS5kYW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9icyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhbWFnZSArIGZpcmVEYW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzcmNJZF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGZpcmVib2x0IHByb2plY3RpbGVcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGZpcmVib2x0IHByb2plY3RpbGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gZmlyZWJvbHRQcm9qZWN0aWxlTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNDRDVDNUNcIiwgXCIjRkY4QzAwXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAuNSxcbiAgICAgICAgICAgIGNlbGxZOiAwLjUsXG4gICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSxdXG4gICAgfVxufVxuIiwidmFyIGZsYW1lRGFzaFNwZWVkID0gMC4xNDtcbnZhciBmbGFtZURhc2hXaWR0aCA9IDI7XG52YXIgZmxhbWVEYXNoSGVpZ2h0ID0gMjtcbnZhciBmbGFtZURhc2hIaXRCb3hSYWRpdXMgPSAxO1xudmFyIGZsYW1lRGFzaERhbWFnZSA9IDg7XG52YXIgZmxhbWVEYXNoVGlja0luY3JlYXNlID0gMjtcbnZhciBmbGFtZURhc2hUcmFja2luZ1JhZGl1cyA9IDE1MDtcbnZhciBmbGFtZURhc2hNYXhQcm9qRGlzdGFuY2UgPSBmbGFtZURhc2hUcmFja2luZ1JhZGl1cyAqIDI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG4gICAgdmFyIGZpcmVtYWdlID0gcmVxdWlyZShcIi4uL1BsYXllci9GaXJlTWFnZVwiKTtcbiAgICB2YXIgY29sbGlzaW9ucyA9IHJlcXVpcmUoXCIuLi8uLi9Db2xsaXNpb25zXCIpO1xuXG4gICAgdmFyIHRyYWNrSWQgPSB1bmRlZmluZWQ7XG4gICAgdmFyIHNtYWxsZXN0RGlzdCA9IHVuZGVmaW5lZDtcblxuICAgIGNvbGxpc2lvbnMuY2hlY2tDb2xsaXNpb25zQnlEaXN0YW5jZShzcmMsIG9icywgZmxhbWVEYXNoVHJhY2tpbmdSYWRpdXMsIChzcmNJZCwgY29sbGlzaW9uSWQsIGRpc3QpID0+IHtcbiAgICAgICAgaWYgKG9ic1tjb2xsaXNpb25JZF0gJiYgb2JzW3NyY0lkXSAmJiBzcmNJZCAhPT0gY29sbGlzaW9uSWQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAob2JzW2NvbGxpc2lvbklkXS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVI6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5HUkFWRVNUT05FOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVkVISUNMRTpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRFUlJBSU46XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHJhY2tJZCB8fCBkaXN0IDwgc21hbGxlc3REaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFja0lkID0gY29sbGlzaW9uSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbGVzdERpc3QgPSBkaXN0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCF0cmFja0lkKSByZXR1cm47XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuUHJvamVjdGlsZS5GTEFNRV9EQVNIX1BST0pFQ1RJTEUsXG4gICAgICAgIHZlbG9jaXR5WDogMCxcbiAgICAgICAgdmVsb2NpdHlZOiAwLFxuICAgICAgICB3aWR0aDogZmxhbWVEYXNoV2lkdGgsXG4gICAgICAgIGhlaWdodDogZmxhbWVEYXNoSGVpZ2h0LFxuICAgICAgICBoaXRib3hUeXBlOiB0eXBlcy5IaXRib3hUeXBlcy5SRUNULFxuICAgICAgICBoaXRib3hXaWR0aDogZmxhbWVEYXNoSGl0Qm94UmFkaXVzLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IGZsYW1lRGFzaEhpdEJveFJhZGl1cyxcbiAgICAgICAgZGFtYWdlOiBmbGFtZURhc2hEYW1hZ2UsXG4gICAgICAgIHRyYWNrSWQ6IHRyYWNrSWQsXG4gICAgICAgIG1heFByb2pEaXN0OiBmbGFtZURhc2hNYXhQcm9qRGlzdGFuY2UsXG4gICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdICYmIG9ic1tvYnNbc2VsZklkXS50cmFja0lkXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoXG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KG9ic1tzZWxmSWRdLnggLSBvYnNbb2JzW3NlbGZJZF0udHJhY2tJZF0ueCwgMikgK1xuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhvYnNbc2VsZklkXS55IC0gb2JzW29ic1tzZWxmSWRdLnRyYWNrSWRdLnksIDIpKTtcblxuICAgICAgICAgICAgICAgIGlmIChkaXN0ID4gZmxhbWVEYXNoVHJhY2tpbmdSYWRpdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIoXG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNbb2JzW3NlbGZJZF0udHJhY2tJZF0ueSAtIG9ic1tzZWxmSWRdLnksXG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNbb2JzW3NlbGZJZF0udHJhY2tJZF0ueCAtIG9ic1tzZWxmSWRdLngpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0udmVsb2NpdHlYID0gTWF0aC5jb3MoYW5nbGUpICogZmxhbWVEYXNoU3BlZWQsXG4gICAgICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLnZlbG9jaXR5WSA9IE1hdGguc2luKGFuZ2xlKSAqIGZsYW1lRGFzaFNwZWVkLFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBwcm9qZWN0aWxlIG1vdmVtZW50XG4gICAgICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLnggKz0gb2JzW3NlbGZJZF0udmVsb2NpdHlYICogZGVsdGE7XG4gICAgICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLnkgKz0gb2JzW3NlbGZJZF0udmVsb2NpdHlZICogZGVsdGE7XG4gICAgICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLmRpc3QgKz0gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3cob2JzW3NlbGZJZF0udmVsb2NpdHlYICogZGVsdGEsIDIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KG9ic1tzZWxmSWRdLnZlbG9jaXR5WSAqIGRlbHRhLCAyKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5jaGVja0NvbGxpc2lvbnMoc2VsZklkLCBvYnMsIHByZWZhYnMucmVuZGVyU2l6ZSwgKHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQgJiYgY29sbGlzaW9uSWQgIT0gb2JzW3NyY0lkXS5zb3VyY2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tzcmNJZF0ub25IaXQob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0uZGlzdCA+IG9ic1tzZWxmSWRdLm1heFByb2pEaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0pIGRlbGV0ZSBvYnNbc2VsZklkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25IaXQ6IChvYnMsIHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChvYnNbY29sbGlzaW9uSWRdLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUjpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLkdSQVZFU1RPTkU6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYnNbY29sbGlzaW9uSWRdICYmIG9ic1tjb2xsaXNpb25JZF0uZGFtYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZW1hZ2UuaW5jcmVhc2VGaXJlVGljayhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNbc3JjSWRdLnNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzW2NvbGxpc2lvbklkXS50eXBlID09PSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVIgPyBmbGFtZURhc2hUaWNrSW5jcmVhc2UgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhbWFnZSA9IG9ic1tzcmNJZF0uZGFtYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcmVEYW1hZ2UgPSBvYnNbb2JzW3NyY0lkXS5zb3VyY2VdLmZpcmVUaWNrcyA/IG9ic1tvYnNbc3JjSWRdLnNvdXJjZV0uZmlyZVRpY2tzICogZmlyZW1hZ2UuZmlyZVRpY2tEYW1hZ2U6IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgY29sbGlzaW9uSWQsIDAsIDAsIHR5cGVzLk9iamVjdFR5cGVzLkNPTUJBVF9URVhULCB0eXBlcy5Db21iYXRUZXh0LkRBTUFHRV9URVhULCB7IHRleHQ6IFwiLVwiICsgZGFtYWdlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaXJlRGFtYWdlKSBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgY29sbGlzaW9uSWQsIDAsIDAsIHR5cGVzLk9iamVjdFR5cGVzLkNPTUJBVF9URVhULCB0eXBlcy5Db21iYXRUZXh0LkZJUkVfREFNQUdFX1RFWFQsIHsgdGV4dDogXCItXCIgKyBmaXJlRGFtYWdlIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzW2NvbGxpc2lvbklkXS5kYW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9icyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhbWFnZSArIGZpcmVEYW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzcmNJZF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGZpcmUgZGFzaCBwcm9qZWN0aWxlXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBmaXJlIGRhc2ggcHJvamVjdGlsZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGFtZURhc2hQcm9qZWN0aWxlTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIGNvbnN0IGN1c3RvbVJlbmRlclNpemUgPSAyO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNDRDVDNUNcIiwgXCIjRkY4QzAwXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQgICogY3VzdG9tUmVuZGVyU2l6ZSxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAqIGN1c3RvbVJlbmRlclNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAuNSxcbiAgICAgICAgICAgIGNlbGxZOiAwLjUsXG4gICAgICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSxdLFxuICAgICAgICBjdXN0b21SZW5kZXJTaXplOiBjdXN0b21SZW5kZXJTaXplLFxuICAgIH1cbn1cbiIsInZhciBmbGFtZVBpbGxhclNwZWVkID0gMDtcbnZhciBmbGFtZVBpbGxhcldpZHRoID0gNjtcbnZhciBmbGFtZVBpbGxhckhlaWdodCA9IDEyO1xudmFyIGZsYW1lUGlsbGFySGl0Qm94V2lkdGggPSA2O1xudmFyIGZsYW1lUGlsbGFySGl0Qm94SGVpZ2h0ID0gMTI7XG52YXIgZmxhbWVQaWxsYXJEYW1hZ2UgPSAxNjtcbnZhciBmbGFtZVBpbGxhclRpY2tJbmNyZWFzZSA9IDM7XG52YXIgZmxhbWVQaWxsYXJTdHVuRHVyYXRpb24gPSAxNTAwO1xuXG52YXIgZmxhbWVQaWxsYXJUcmlnZ2VyRGVsYXkgPSA1MDA7XG52YXIgZmxhbWVQaWxsYXJUaW1lb3V0ID0gMTAwMDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICB2YXIgZmlyZW1hZ2UgPSByZXF1aXJlKFwiLi4vUGxheWVyL0ZpcmVNYWdlXCIpO1xuICAgIHZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uLy4uL0NvbGxpc2lvbnNcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuUHJvamVjdGlsZS5GTEFNRV9QSUxMQVJfUFJPSkVDVElMRSxcbiAgICAgICAgeDogcG9zWCxcbiAgICAgICAgeTogcG9zWSxcbiAgICAgICAgdmVsb2NpdHlYOiBmbGFtZVBpbGxhclNwZWVkLFxuICAgICAgICB2ZWxvY2l0eVk6IGZsYW1lUGlsbGFyU3BlZWQsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgd2lkdGg6IGZsYW1lUGlsbGFyV2lkdGgsXG4gICAgICAgIGhlaWdodDogZmxhbWVQaWxsYXJIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBmbGFtZVBpbGxhckhpdEJveFdpZHRoLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IGZsYW1lUGlsbGFySGl0Qm94SGVpZ2h0LFxuICAgICAgICBkYW1hZ2U6IGZsYW1lUGlsbGFyRGFtYWdlLFxuICAgICAgICBpbml0VGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgdHJpZ2dlcmVkOiBmYWxzZSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7XG4gICAgICAgICAgICB2YXIgbmV3VGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgICAgIC8vIElmIHRpbWVvdXQgaXMgcGFzc2VkLCBkZWxldGUgaXRlbVxuICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdICYmIG5ld1RpbWUgLSBvYnNbc2VsZklkXS5pbml0VGltZSA+PSBmbGFtZVBpbGxhclRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JzW3NlbGZJZF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIHRyaWdnZXIgZGVsYXkgZWxhcHNlZCwgY2hlY2sgZm9yIG9iamVjdCBjb2xsaXNpb25zXG4gICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0gJiYgbmV3VGltZSAtIG9ic1tzZWxmSWRdLmluaXRUaW1lID49IGZsYW1lUGlsbGFyVHJpZ2dlckRlbGF5KSB7XG4gICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0udHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9ucyhzZWxmSWQsIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYnNbc3JjSWRdICYmIGNvbGxpc2lvbklkICE9IHNyY0lkICYmIGNvbGxpc2lvbklkICE9IG9ic1tzcmNJZF0uc291cmNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tzcmNJZF0ub25IaXQob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uSGl0OiAob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAob2JzW2NvbGxpc2lvbklkXS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVI6XG4gICAgICAgICAgICAgICAgICAgIG9ic1tjb2xsaXNpb25JZF0uYWRkU3RhdHVzRWZmZWN0KG9icywgY29sbGlzaW9uSWQsIHR5cGVzLlN0YXR1c0VmZmVjdHMuU1RVTk5FRCwgZmxhbWVQaWxsYXJTdHVuRHVyYXRpb24pO1xuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuR1JBVkVTVE9ORTpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEU6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5URVJSQUlOOlxuICAgICAgICAgICAgICAgICAgICBpZiAob2JzW3NyY0lkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ic1tjb2xsaXNpb25JZF0gJiYgb2JzW2NvbGxpc2lvbklkXS5kYW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlbWFnZS5pbmNyZWFzZUZpcmVUaWNrKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tzcmNJZF0uc291cmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNbY29sbGlzaW9uSWRdLnR5cGUgPT09IHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUiA/IGZsYW1lUGlsbGFyVGlja0luY3JlYXNlIDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYW1hZ2UgPSBvYnNbc3JjSWRdLmRhbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaXJlRGFtYWdlID0gb2JzW29ic1tzcmNJZF0uc291cmNlXS5maXJlVGlja3MgPyBvYnNbb2JzW3NyY0lkXS5zb3VyY2VdLmZpcmVUaWNrcyAqIGZpcmVtYWdlLmZpcmVUaWNrRGFtYWdlOiAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIGNvbGxpc2lvbklkLCAwLCAwLCB0eXBlcy5PYmplY3RUeXBlcy5DT01CQVRfVEVYVCwgdHlwZXMuQ29tYmF0VGV4dC5EQU1BR0VfVEVYVCwgeyB0ZXh0OiBcIi1cIiArIGRhbWFnZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyZURhbWFnZSkgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIGNvbGxpc2lvbklkLCAwLCAwLCB0eXBlcy5PYmplY3RUeXBlcy5DT01CQVRfVEVYVCwgdHlwZXMuQ29tYmF0VGV4dC5GSVJFX0RBTUFHRV9URVhULCB7IHRleHQ6IFwiLVwiICsgZmlyZURhbWFnZSB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tjb2xsaXNpb25JZF0uZGFtYWdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW1hZ2UgKyBmaXJlRGFtYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbc3JjSWRdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBmaXJlIHBpbGxhciBwcm9qZWN0aWxlXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBmaXJlIHBpbGxhciBwcm9qZWN0aWxlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGFtZVBpbGxhclByb2plY3RpbGVNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI0U2N0UwMEQ5XCIsIFwiI0ZGNjkzM0Q5XCIsIFwiI0ZGOEMwMEQ5XCIsIFwiI0ZGQTUwMEQ5XCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IG9iamVjdC50cmlnZ2VyZWQgPyAxIDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCAtIDEsXG4gICAgICAgICAgICBzd2F0Y2g6IG9iamVjdC50cmlnZ2VyZWQgPyAxIDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IG9iamVjdC50cmlnZ2VyZWQgPyAzIDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IG9iamVjdC50cmlnZ2VyZWQgPyAzIDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogNCxcbiAgICAgICAgICAgIGNlbGxZOiA1LFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IG9iamVjdC50cmlnZ2VyZWQgPyAzIDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiA3LFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IG9iamVjdC50cmlnZ2VyZWQgPyAzIDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiA4LFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IG9iamVjdC50cmlnZ2VyZWQgPyAzIDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogNCxcbiAgICAgICAgICAgIGNlbGxZOiA5LFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IG9iamVjdC50cmlnZ2VyZWQgPyAzIDogMlxuICAgICAgICB9LF1cbiAgICB9XG59XG4iLCJ2YXIgcHJvamVjdGlsZVdpZHRoID0gMjtcbnZhciBwcm9qZWN0aWxlSGVpZ2h0ID0gMC41O1xudmFyIHByb2plY3RpbGVIaXRCb3hSYWRpdXMgPSAxLjU7XG52YXIgYmFzZVByb2plY3RpbGVEYW1hZ2UgPSAxMDtcbnZhciBwcm9qZWN0aWxlU3BlZWQgPSAwLjg7IFxudmFyIG1heFByb2pEaXN0ID0gMTYwMDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIGNvbGxpc2lvbnMgPSByZXF1aXJlKFwiLi4vLi4vQ29sbGlzaW9uc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMihcbiAgICAgICAgcG9zWSAtIG9ic1tzcmNdLnksXG4gICAgICAgIHBvc1ggLSBvYnNbc3JjXS54KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLk9iamVjdFR5cGVzLlBST0pFQ1RJTEUsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLlByb2plY3RpbGUuQkFTSUNfUFJPSkVDVElMRSxcbiAgICAgICAgc291cmNlOiBzcmMsXG4gICAgICAgIHg6IG9ic1tzcmNdLngsXG4gICAgICAgIHk6IG9ic1tzcmNdLnksXG4gICAgICAgIGFuZ2xlOiBhbmdsZSxcbiAgICAgICAgdmVsb2NpdHlYOiBNYXRoLmNvcyhhbmdsZSkgKiBwcm9qZWN0aWxlU3BlZWQsXG4gICAgICAgIHZlbG9jaXR5WTogTWF0aC5zaW4oYW5nbGUpICogcHJvamVjdGlsZVNwZWVkLFxuICAgICAgICB3aWR0aDogcHJvamVjdGlsZVdpZHRoLFxuICAgICAgICBoZWlnaHQ6IHByb2plY3RpbGVIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBwcm9qZWN0aWxlSGl0Qm94UmFkaXVzLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IHByb2plY3RpbGVIaXRCb3hSYWRpdXMsXG4gICAgICAgIGZhY2luZzogYW5nbGUgKiAxODAgLyBNYXRoLlBJLFxuICAgICAgICBkaXN0OiAwLFxuICAgICAgICBtYXhQcm9qRGlzdDogbWF4UHJvakRpc3QsXG4gICAgICAgIGRhbWFnZTogYmFzZVByb2plY3RpbGVEYW1hZ2UsXG4gICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4ge1xuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHByb2plY3RpbGUgbW92ZW1lbnRcbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLnggKz0gb2JzW3NlbGZJZF0udmVsb2NpdHlYICogZGVsdGE7XG4gICAgICAgICAgICBvYnNbc2VsZklkXS55ICs9IG9ic1tzZWxmSWRdLnZlbG9jaXR5WSAqIGRlbHRhO1xuICAgICAgICAgICAgb2JzW3NlbGZJZF0uZGlzdCArPSBNYXRoLnNxcnQoXG4gICAgICAgICAgICAgICAgTWF0aC5wb3cob2JzW3NlbGZJZF0udmVsb2NpdHlYICogZGVsdGEsIDIpICtcbiAgICAgICAgICAgICAgICBNYXRoLnBvdyhvYnNbc2VsZklkXS52ZWxvY2l0eVkgKiBkZWx0YSwgMikpO1xuXG4gICAgICAgICAgICAvLyBUT0RPOiBDaGFuZ2UgcHJvamVjdGlsZSBjb2xsaXNpb25zIHRvIHJheSBjYXN0XG4gICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9ucyhzZWxmSWQsIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQgJiYgY29sbGlzaW9uSWQgIT0gb2JzW3NyY0lkXS5zb3VyY2Upe1xuICAgICAgICAgICAgICAgICAgICBvYnNbc3JjSWRdLm9uSGl0KG9icywgc3JjSWQsIGNvbGxpc2lvbklkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChvYnNbc2VsZklkXSkge1xuICAgICAgICAgICAgICAgIGlmIChvYnNbc2VsZklkXS5kaXN0ID4gb2JzW3NlbGZJZF0ubWF4UHJvakRpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25IaXQ6IChvYnMsIHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChvYnNbY29sbGlzaW9uSWRdLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUjpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLkdSQVZFU1RPTkU6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYnNbY29sbGlzaW9uSWRdICYmIG9ic1tjb2xsaXNpb25JZF0uZGFtYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIGNvbGxpc2lvbklkLCAwLCAwLCB0eXBlcy5PYmplY3RUeXBlcy5DT01CQVRfVEVYVCwgdHlwZXMuQ29tYmF0VGV4dC5EQU1BR0VfVEVYVCwgeyB0ZXh0OiBcIi1cIiArIG9ic1tzcmNJZF0uZGFtYWdlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tjb2xsaXNpb25JZF0uZGFtYWdlKG9icywgY29sbGlzaW9uSWQsIG9ic1tzcmNJZF0uZGFtYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbc3JjSWRdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgYmFzaWMgcHJvamVjdGlsZVxuICogQHBhcmFtIG9iamVjdCBUaGUgcHJvamVjdGlsZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0aWxlTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIC8vIFJlbW92ZSBjb21tZW50cyBmb3IgcmFpbmJvdyBidWxsZXRzXG4gICAgICAgIC8vIHBhbGV0dGU6IFtcIiNGRjY2NjZcIiwgXCIjNjZGRjY2XCIsIFwiIzY2NjZGRlwiLCBcIiNGRkZGNjZcIiwgXCIjRkY2NkZGXCIsIFwiIzY2RkZGRlwiXSxcbiAgICAgICAgcGFsZXR0ZTogW1wiIzIyMjIyMlwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICAvLyBzd2F0Y2g6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfV1cbiAgICB9XG59XG4iLCJ2YXIgdHJlZVdpZHRoID0gNDtcbnZhciB0cmVlSGVpZ2h0ID0gODtcbnZhciB0cmVlSGl0Ym94V2lkdGggPSA0O1xudmFyIHRyZWVIaXRib3hIZWlnaHQgPSA4O1xudmFyIHRyZWVIZWFsdGggPSAyMDA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJhc2UsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLlRlcnJhaW4uVFJFRSxcbiAgICAgICAgd2lkdGg6IHRyZWVXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0cmVlSGVpZ2h0LFxuICAgICAgICBoaXRib3hUeXBlOiB0eXBlcy5IaXRib3hUeXBlcy5SRUNULFxuICAgICAgICBoaXRib3hXaWR0aDogdHJlZUhpdGJveFdpZHRoLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IHRyZWVIaXRib3hIZWlnaHQsXG4gICAgICAgIGhlYWx0aDogdHJlZUhlYWx0aCxcbiAgICAgICAgbWF4SGVhbHRoOiB0cmVlSGVhbHRoLFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgdHJlZSBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHRyZWUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyZWVUcnVua01hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjOTkzMzAwXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LF0sXG4gICAgfTtcbn1cblxuLy8gVE9ETzogQ2hhbmdlIGxlYWYgcmVuZGVyaW5nIGRlcGVuZGluZyBvbiB0cmVlIGhlYWx0aFxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciB0cmVlIG9iamVjdCdzIGxlYXZlc1xuICogQHBhcmFtIG9iamVjdCBUaGUgdHJlZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gdHJlZUxlYWZNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzIyODgyMlwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IC0yLFxuICAgICAgICAgICAgY2VsbFk6IC00LFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAqIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogLTEwLFxuICAgICAgICAgICAgd2lkdGg6IDQsXG4gICAgICAgICAgICBoZWlnaHQ6IDcsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdLFxuICAgIH07XG59XG4iLCJ2YXIgd2FsbEhvcml6V2lkdGggPSAyMDtcbnZhciB3YWxsSG9yaXpIZWlnaHQgPSAxMjtcbnZhciB3YWxsSG9yaXpIaXRib3hXaWR0aCA9IDIwO1xudmFyIHdhbGxIb3JpekhpdGJveEhlaWdodCA9IDI7XG52YXIgd2FsbEhvcml6SGVhbHRoID0gMjUwO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgYmFzZSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5UZXJyYWluLldBTExfSE9SSVosXG4gICAgICAgIHdpZHRoOiB3YWxsSG9yaXpXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiB3YWxsSG9yaXpIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiB3YWxsSG9yaXpIaXRib3hXaWR0aCxcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiB3YWxsSG9yaXpIaXRib3hIZWlnaHQsXG4gICAgICAgIGhlYWx0aDogd2FsbEhvcml6SGVhbHRoLFxuICAgICAgICBtYXhIZWFsdGg6IHdhbGxIb3JpekhlYWx0aCxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGhvcml6b250YWwgd2FsbCBvYmplY3QgYmFzZVxuICogQHBhcmFtIG9iamVjdCBUaGUgaG9yaXpvbnRhbCB3YWxsIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3YWxsSG9yaXpCYXNlTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiM4ODg4ODhcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LmhpdGJveFdpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oaXRib3hIZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LmhpdGJveFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGl0Ym94SGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH1dXG4gICAgfVxufVxuXG4vLyBUT0RPOiBBZGQgbW9yZSBkZXRhaWwgdG8gd2FsbCAoY29iYmxlc3RvbmUgc3R5bGUpLCBjaGFuZ2UgY29sb3JpbmcgZGVwZW5kaW5nIG9uIG9iamVjdCBoZWFsdGhcbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgaG9yaXpvbnRhbCB3YWxsIG9iamVjdCBjb3ZlclxuICogQHBhcmFtIG9iamVjdCBUaGUgaG9yaXpvbnRhbCB3YWxsIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3YWxsSG9yaXpDb3Zlck1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjQTNBM0MyQkJcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IC1vYmplY3QuaGVpZ2h0IC8gMixcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfV1cbiAgICB9XG59XG4iLCJmdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLk9iamVjdFR5cGVzLlRFUlJBSU4sXG4gICAgICAgIHg6IHBvc1gsXG4gICAgICAgIHk6IHBvc1ksXG4gICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4geyB9LFxuICAgICAgICBkYW1hZ2U6IChvYnMsIHNlbGZJZCwgYW1vdW50KSA9PiB7XG4gICAgICAgICAgICBvYnNbc2VsZklkXS5oZWFsdGggLT0gYW1vdW50O1xuXG4gICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0uaGVhbHRoIDw9IDApe1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbc2VsZklkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGRlZmF1bHQgdGVycmFpbiBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHRlcnJhaW4gb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRUZXJyYWluTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTptYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI0ZGQjNGRlwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfV1cbiAgICB9XG59XG4iLCJ2YXIgc3Bpa2VUcmFwV2lkdGggPSA1O1xudmFyIHNwaWtlVHJhcEhlaWdodCA9IDU7XG52YXIgc3Bpa2VUcmFwSGl0Ym94V2lkdGggPSA1O1xudmFyIHNwaWtlVHJhcEhpdGJveEhlaWdodCA9IDU7XG52YXIgc3Bpa2VUcmFwRGFtYWdlID0gMjA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuVHJpZ2dlci5TUElLRV9UUkFQLFxuICAgICAgICB3aWR0aDogc3Bpa2VUcmFwV2lkdGgsXG4gICAgICAgIGhlaWdodDogc3Bpa2VUcmFwSGVpZ2h0LFxuICAgICAgICBoaXRib3hUeXBlOiB0eXBlcy5IaXRib3hUeXBlcy5SRUNULFxuICAgICAgICBoaXRib3hXaWR0aDogc3Bpa2VUcmFwSGl0Ym94V2lkdGgsXG4gICAgICAgIGhpdGJveEhlaWdodDogc3Bpa2VUcmFwSGl0Ym94SGVpZ2h0LFxuICAgICAgICBvblRyaWdnZXI6IChvYnMsIHNlbGZSZWYsIHRyaWdnZXJJZCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic1t0cmlnZ2VySWRdICYmIChcbiAgICAgICAgICAgICAgICBvYnNbdHJpZ2dlcklkXS50eXBlID09IHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUiB8fFxuICAgICAgICAgICAgICAgIG9ic1t0cmlnZ2VySWRdLnR5cGUgPT0gdHlwZXMuT2JqZWN0VHlwZXMuVkVISUNMRVxuICAgICAgICAgICAgKSkge1xuICAgICAgICAgICAgICAgIGlmIChvYnNbdHJpZ2dlcklkXS5kYW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzW3RyaWdnZXJJZF0uZGFtYWdlKG9icywgdHJpZ2dlcklkLCBzcGlrZVRyYXBEYW1hZ2UpO1xuICAgICAgICAgICAgICAgICAgICBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgdHJpZ2dlcklkLCAwLCAwLCB0eXBlcy5PYmplY3RUeXBlcy5DT01CQVRfVEVYVCwgdHlwZXMuQ29tYmF0VGV4dC5EQU1BR0VfVEVYVCwgeyB0ZXh0OiBcIi1cIiArIHNwaWtlVHJhcERhbWFnZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzZWxmUmVmXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIHNwaWtlIHRyYXAgb2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBzcGlrZSB0cmFwIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGlrZVRyYXBNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzgwODA4MFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAzLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiA0LFxuICAgICAgICAgICAgY2VsbFk6IDMsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LF1cbiAgICB9O1xufVxuIiwiZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIGNvbGxpc2lvbnMgPSByZXF1aXJlKFwiLi4vLi4vQ29sbGlzaW9uc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuT2JqZWN0VHlwZXMuVFJJR0dFUixcbiAgICAgICAgeDogcG9zWCxcbiAgICAgICAgeTogcG9zWSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7XG4gICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9ucyhzZWxmSWQsIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQpe1xuICAgICAgICAgICAgICAgICAgICBvYnNbc3JjSWRdLm9uVHJpZ2dlcihvYnMsIHNyY0lkLCBjb2xsaXNpb25JZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGNhclNwZWVkID0gMC4zNTtcbnZhciBjYXJXaWR0aCA9IDEwO1xudmFyIGNhckhlaWdodCA9IDE2O1xudmFyIGNhckhpdGJveFdpZHRoID0gMTA7XG52YXIgY2FySGl0Ym94SGVpZ2h0ID0gMTY7XG52YXIgY2FySGVhbHRoID0gMjAwO1xudmFyIGNhclZpZXdSYW5nZSA9IDEgLyAzO1xudmFyIGNhckNvbG9ycyA9IFtcbiAgICBcIiNEQzE0M0NcIiwgICAgICAvLyBDcmltc29uXG4gICAgXCIjMDA2NDAwXCIsICAgICAgLy8gRGFyayBHcmVlblxuICAgIFwiI0ZGNjlCNFwiLCAgICAgIC8vIEhvdCBQaW5rXG4gICAgXCIjRkZENzAwXCIsICAgICAgLy8gR29sZFxuICAgIFwiIzcwODA5MFwiLCAgICAgIC8vIFNsYXRlIEdyYXlcbiAgICBcIiMwMEJGRkZcIiwgICAgICAvLyBEZWVwIFNreSBCbHVlXG4gICAgXCIjMDAwMENEXCIsICAgICAgLy8gTWVkaXVtIEJsdWVcbiAgICBcIiNGRjQ1MDBcIiwgICAgICAvLyBPcmFuZ2UgUmVkXG4gICAgXCIjOEIwMDhCXCIsICAgICAgLy8gRGFyayBNYWdlbnRhXG5dO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgYmFzZSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuICAgIHZhciBjYXJDb2xvciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChjYXJDb2xvcnMubGVuZ3RoKSk7XG4gICAgdmFyIHZlaGljbGVJZCA9IHNyYyArIFwiOlwiICsgdHlwZXMuT2JqZWN0VHlwZXMuVkVISUNMRSArIFwiOlwiICsgdHlwZXMuVmVoaWNsZS5DQVIgKyBcIjpcIiArIHBvc1ggKyBcIjpcIiArIHBvc1k7XG4gICAgXG4gICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIHZlaGljbGVJZCwgcG9zWCwgcG9zWSwgdHlwZXMuT2JqZWN0VHlwZXMuSU5URVJBQ1RBQkxFLCB0eXBlcy5JbnRlcmFjdGFibGUuQ0FSX0VOVEVSKTtcblxuICAgIG9ic1t2ZWhpY2xlSWRdID0gIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuVmVoaWNsZS5DQVIsXG4gICAgICAgIHNwZWVkOiBjYXJTcGVlZCxcbiAgICAgICAgd2lkdGg6IGNhcldpZHRoLFxuICAgICAgICBoZWlnaHQ6IGNhckhlaWdodCxcbiAgICAgICAgaGl0Ym94VHlwZTogdHlwZXMuSGl0Ym94VHlwZXMuUkVDVCxcbiAgICAgICAgaGl0Ym94V2lkdGg6IGNhckhpdGJveFdpZHRoLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IGNhckhpdGJveEhlaWdodCxcbiAgICAgICAgaGVhbHRoOiBjYXJIZWFsdGgsXG4gICAgICAgIG1heEhlYWx0aDogY2FySGVhbHRoLFxuICAgICAgICBjYXJDb2xvcjogY2FyQ29sb3JzW2NhckNvbG9yXSxcbiAgICAgICAgdmlld1JhbmdlOiBjYXJWaWV3UmFuZ2UsXG4gICAgICAgIGludGVyYWN0YWJsZUlkOiB2ZWhpY2xlSWQgKyBcIjpcIiArIHR5cGVzLk9iamVjdFR5cGVzLklOVEVSQUNUQUJMRSArIFwiOlwiICsgdHlwZXMuSW50ZXJhY3RhYmxlLkNBUl9FTlRFUixcbiAgICB9O1xuICAgIHJldHVybjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNhck1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICB2YXIgaGlnaGxpZ2h0UjogbnVtYmVyID0gcGFyc2VJbnQoXCIweFwiICsgb2JqZWN0LmNhckNvbG9yLnN1YnN0cmluZygxLCAzKSwgMTYpICsgMHgzMztcbiAgICB2YXIgaGlnaGxpZ2h0RzogbnVtYmVyID0gcGFyc2VJbnQoXCIweFwiICsgb2JqZWN0LmNhckNvbG9yLnN1YnN0cmluZygzLCA1KSwgMTYpICsgMHgzMztcbiAgICB2YXIgaGlnaGxpZ2h0QjogbnVtYmVyID0gcGFyc2VJbnQoXCIweFwiICsgb2JqZWN0LmNhckNvbG9yLnN1YnN0cmluZyg1LCA3KSwgMTYpICsgMHgzMztcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjMzMzMzMzXCJdXG4gICAgICAgICAgICAuY29uY2F0KG9iamVjdC5jYXJDb2xvcilcbiAgICAgICAgICAgIC5jb25jYXQoXCIjXCIgK1xuICAgICAgICAgICAgICAgIChoaWdobGlnaHRSID4gMHhGRiA/IDB4RkYgOiBoaWdobGlnaHRSKS50b1N0cmluZygxNikgK1xuICAgICAgICAgICAgICAgIChoaWdobGlnaHRHID4gMHhGRiA/IDB4RkYgOiBoaWdobGlnaHRHKS50b1N0cmluZygxNikgK1xuICAgICAgICAgICAgICAgIChoaWdobGlnaHRCID4gMHhGRiA/IDB4RkYgOiBoaWdobGlnaHRCKS50b1N0cmluZygxNilcbiAgICAgICAgICAgICksXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiA1LFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoIC0gMixcbiAgICAgICAgICAgIGhlaWdodDogNSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDYsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogOSxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IDYsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogOSxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggLSAyLFxuICAgICAgICAgICAgaGVpZ2h0OiA3LFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDMsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoIC0gMixcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiAyLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDQsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMTAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoIC0gMixcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiAxMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggLSA0LFxuICAgICAgICAgICAgaGVpZ2h0OiA0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAzLFxuICAgICAgICAgICAgY2VsbFk6IDYsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoIC0gNixcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogLTEsXG4gICAgICAgICAgICBjZWxsWTogNixcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBjZWxsWTogNixcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sXVxuICAgIH07XG59XG4iLCJ2YXIgZGVmYXVsdFZlaGljbGVWaWV3UmFuZ2UgPSAxIC8gNDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIGNvbGxpc2lvbnMgPSByZXF1aXJlKFwiLi4vLi4vQ29sbGlzaW9uc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuT2JqZWN0VHlwZXMuVkVISUNMRSxcbiAgICAgICAgeDogcG9zWCxcbiAgICAgICAgeTogcG9zWSxcbiAgICAgICAgdmVsb2NpdHlYOiAwLFxuICAgICAgICB2ZWxvY2l0eVk6IDAsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgY3VycmVudEVxdWlwbWVudDogdW5kZWZpbmVkLFxuICAgICAgICBlcXVpcG1lbnQ6IFsgXSxcbiAgICAgICAgdmlld1JhbmdlOiBkZWZhdWx0VmVoaWNsZVZpZXdSYW5nZSxcbiAgICAgICAgcmlkZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgZGVhdGhyYXR0bGU6IChvYnMsIHNlbGZJZCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdLnJpZGVyKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tvYnNbc2VsZklkXS5pbnRlcmFjdGFibGVJZF07XG4gICAgICAgICAgICAgICAgdmFyIHJpZGVyID0gb2JzW3NlbGZJZF0ucmlkZXI7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXNldCB2ZWxvY2l0aWVzIGFuZCBwb3NpdGlvblxuICAgICAgICAgICAgICAgIHJpZGVyLnZlbG9jaXR5WCA9IDA7XG4gICAgICAgICAgICAgICAgcmlkZXIudmVsb2NpdHlZID0gMDtcbiAgICAgICAgICAgICAgICByaWRlci54ID0gb2JzW3NlbGZJZF0ueDtcbiAgICAgICAgICAgICAgICByaWRlci55ID0gb2JzW3NlbGZJZF0ueTtcblxuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbc2VsZklkXTtcbiAgICAgICAgICAgICAgICBvYnNbc2VsZklkXSA9IHJpZGVyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JzW29ic1tzZWxmSWRdLmludGVyYWN0YWJsZUlkXTtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JzW3NlbGZJZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4ge1xuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIGNhciBtb3ZlbWVudFxuICAgICAgICAgICAgb2JzW3NlbGZJZF0ueCArPSBvYnNbc2VsZklkXS52ZWxvY2l0eVggKiBkZWx0YTtcbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLnkgKz0gb2JzW3NlbGZJZF0udmVsb2NpdHlZICogZGVsdGE7XG5cbiAgICAgICAgICAgIGlmIChvYnNbb2JzW3NlbGZJZF0uaW50ZXJhY3RhYmxlSWRdKSB7XG4gICAgICAgICAgICAgICAgb2JzW29ic1tzZWxmSWRdLmludGVyYWN0YWJsZUlkXS54ID0gb2JzW3NlbGZJZF0ueDtcbiAgICAgICAgICAgICAgICBvYnNbb2JzW3NlbGZJZF0uaW50ZXJhY3RhYmxlSWRdLnkgPSBvYnNbc2VsZklkXS55O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDaGVjayBjb2xsaXNpb25zIHdpdGggdGVycmFpbiBhbmQgcmVwb3NpdGlvbiBhY2NvcmRpbmdseVxuICAgICAgICAgICAgY29sbGlzaW9ucy5jaGVja0NvbGxpc2lvbnMoc2VsZklkLCBvYnMsIHByZWZhYnMucmVuZGVyU2l6ZSwgKHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYnNbc3JjSWRdICYmIGNvbGxpc2lvbklkICE9IHNyY0lkKXtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvYnNbY29sbGlzaW9uSWRdLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVkVISUNMRTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zLnB1c2hCYWNrKG9icywgc3JjSWQsIGNvbGxpc2lvbklkLCBwcmVmYWJzLnJlbmRlclNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG1vdXNlRG93bjogKG9icywgbW91c2VFdmVudCkgPT4geyB9LFxuICAgICAgICBvblBsYXllcklucHV0OiAob2JzLCBzZWxmSWQsIHBsYXllcklucHV0KSA9PiB7XG4gICAgICAgICAgICBwbGF5ZXIgPSBvYnNbc2VsZklkXTtcbiAgICAgICAgICAgIHZhciB4RGlyID0gMDtcbiAgICAgICAgICAgIHZhciB5RGlyID0gMDtcblxuICAgICAgICAgICAgaWYgKHBsYXllcklucHV0LmxlZnQpIHtcbiAgICAgICAgICAgICAgICB4RGlyIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGxheWVySW5wdXQucmlnaHQpIHtcbiAgICAgICAgICAgICAgICB4RGlyICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBpZiAocGxheWVySW5wdXQudXApIHtcbiAgICAgICAgICAgICAgICB5RGlyIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGxheWVySW5wdXQuZG93bikge1xuICAgICAgICAgICAgICAgIHlEaXIgKz0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWVyLnZlbG9jaXR5WCA9IHhEaXIgKiBwbGF5ZXIuc3BlZWQ7XG4gICAgICAgICAgICBwbGF5ZXIudmVsb2NpdHlZID0geURpciAqIHBsYXllci5zcGVlZDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHhEaXIgIT0gMCB8fCB5RGlyICE9IDApIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuZmFjaW5nID0gKE1hdGguYXRhbihwbGF5ZXIudmVsb2NpdHlZIC8gcGxheWVyLnZlbG9jaXR5WCkgKiA1Ny4yOTU4ICsgOTApICsoeERpciA8IDAgPyAxODAgOiAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHhEaXIgIT0gMCkge1xuICAgICAgICAgICAgICAgIHBsYXllci5oaXRib3hXaWR0aCA9IG9ic1tzZWxmSWRdLmhlaWdodDtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuaGl0Ym94SGVpZ2h0ID0gb2JzW3NlbGZJZF0ud2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoeURpciAhPSAwKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyLmhpdGJveFdpZHRoID0gb2JzW3NlbGZJZF0ud2lkdGg7XG4gICAgICAgICAgICAgICAgcGxheWVyLmhpdGJveEhlaWdodCA9IG9ic1tzZWxmSWRdLmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHBsYXllcklucHV0LnBpY2t1cCkge1xuICAgICAgICAgICAgICAgIHZhciBuZXdWZWNoaWNsZUlkID0gc2VsZklkICsgXCI6XCIgKyBvYnNbc2VsZklkXS50eXBlICsgXCI6XCIgKyBvYnNbc2VsZklkXS5zdWJ0eXBlICsgXCI6XCIgKyBvYnNbc2VsZklkXS54ICsgXCI6XCIgKyBvYnNbc2VsZklkXS55O1xuICAgICAgICAgICAgICAgIG9ic1tvYnNbc2VsZklkXS5pbnRlcmFjdGFibGVJZF0udmVoaWNsZUlkID0gbmV3VmVjaGljbGVJZDtcbiAgICAgICAgICAgICAgICBvYnNbbmV3VmVjaGljbGVJZF0gPSBvYnNbc2VsZklkXTtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JzW3NlbGZJZF07XG4gICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0gPSBvYnNbbmV3VmVjaGljbGVJZF0ucmlkZXI7XG4gICAgICAgICAgICAgICAgb2JzW25ld1ZlY2hpY2xlSWRdLnJpZGVyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgdmVsb2NpdGllcyBhbmQgcG9zaXRpb25cbiAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS52ZWxvY2l0eVggPSAwO1xuICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLnZlbG9jaXR5WSA9IDA7XG4gICAgICAgICAgICAgICAgb2JzW25ld1ZlY2hpY2xlSWRdLnZlbG9jaXR5WCA9IDA7XG4gICAgICAgICAgICAgICAgb2JzW25ld1ZlY2hpY2xlSWRdLnZlbG9jaXR5WSA9IDA7XG4gICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0ueCA9IG9ic1tuZXdWZWNoaWNsZUlkXS54ICsgb2JzW25ld1ZlY2hpY2xlSWRdLndpZHRoIC8gMiArIG9ic1tzZWxmSWRdLndpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS55ID0gb2JzW25ld1ZlY2hpY2xlSWRdLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRhbWFnZTogKG9icywgc2VsZklkLCBhbW91bnQpID0+IHtcbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLmhlYWx0aCAtPSBhbW91bnQ7XG5cbiAgICAgICAgICAgIGlmIChvYnNbc2VsZklkXS5oZWFsdGggPD0gMCl7XG4gICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0uZGVhdGhyYXR0bGUob2JzLCBzZWxmSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlLCBQb3BvdmEgfSBmcm9tIFwiLi4vUG9wb3ZhL1BvcG92YVwiO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4uLy4uL09iamVjdFR5cGVzXCI7XG5cbmltcG9ydCB7IGNoZWNrU3RhdHVzRWZmZWN0IH0gZnJvbSBcIi4uLy4uL1ByZWZhYnMvUGxheWVyL19QbGF5ZXJcIjtcbmltcG9ydCAqIGFzIHBsYXllciBmcm9tIFwiLi4vLi4vUHJlZmFicy9QbGF5ZXIvX1BsYXllci50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgZ29kIGZyb20gXCIuLi8uLi9QcmVmYWJzL1BsYXllci9Hb2QudGVtcGxhdGVcIjtcbmltcG9ydCAqIGFzIGZpcmVtYWdlIGZyb20gXCIuLi8uLi9QcmVmYWJzL1BsYXllci9GaXJlTWFnZS50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgaGVhbHRoYmFyIGZyb20gXCIuLi8uLi9QcmVmYWJzL1BsYXllci9IZWFsdGhCYXIudGVtcGxhdGVcIjtcblxuaW1wb3J0ICogYXMgc3R1bm5lZFN0YXR1c0VmZmVjdCBmcm9tIFwiLi4vLi4vUHJlZmFicy9QbGF5ZXIvU3RhdHVzRWZmZWN0cy9TdHVubmVkLnRlbXBsYXRlXCI7XG5pbXBvcnQgKiBhcyBpbnZ1bG5lYXJhYmxlU3RhdHVzRWZmZWN0IGZyb20gXCIuLi8uLi9QcmVmYWJzL1BsYXllci9TdGF0dXNFZmZlY3RzL0ludnVsbmVyYWJsZS50ZW1wbGF0ZVwiO1xuXG5pbXBvcnQgKiBhcyBwcm9qZWN0aWxlIGZyb20gXCIuLi8uLi9QcmVmYWJzL1Byb2plY3RpbGUvX1Byb2plY3RpbGUudGVtcGxhdGVcIjtcbmltcG9ydCAqIGFzIGZpcmVib2x0IGZyb20gXCIuLi8uLi9QcmVmYWJzL1Byb2plY3RpbGUvRmlyZWJvbHRQcm9qZWN0aWxlLnRlbXBsYXRlXCI7XG5pbXBvcnQgKiBhcyBmbGFtZVBpbGxhciBmcm9tIFwiLi4vLi4vUHJlZmFicy9Qcm9qZWN0aWxlL0ZsYW1lUGlsbGFyUHJvamVjdGlsZS50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgZmxhbWVEYXNoIGZyb20gXCIuLi8uLi9QcmVmYWJzL1Byb2plY3RpbGUvRmxhbWVEYXNoUHJvamVjdGlsZS50ZW1wbGF0ZVwiO1xuXG5pbXBvcnQgKiBhcyBncmF2ZXN0b25lIGZyb20gXCIuLi8uLi9QcmVmYWJzL0dyYXZlc3RvbmUvX0dyYXZlc3RvbmUudGVtcGxhdGVcIjtcblxuaW1wb3J0ICogYXMgX3RlcnJhaW4gZnJvbSBcIi4uLy4uL1ByZWZhYnMvVGVycmFpbi9fVGVycmFpbi50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgdHJlZSBmcm9tIFwiLi4vLi4vUHJlZmFicy9UZXJyYWluL1RyZWUudGVtcGxhdGVcIjtcbmltcG9ydCAqIGFzIHdhbGxIb3JpeiBmcm9tIFwiLi4vLi4vUHJlZmFicy9UZXJyYWluL1dhbGxIb3Jpei50ZW1wbGF0ZVwiO1xuXG5pbXBvcnQgKiBhcyBoZWFsdGhQaWNrdXAgZnJvbSBcIi4uLy4uL1ByZWZhYnMvSW50ZXJhY3RhYmxlL0hlYWx0aFBpY2t1cC50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgcGxheWVyVHlwZUNoYW5nZXIgZnJvbSBcIi4uLy4uL1ByZWZhYnMvSW50ZXJhY3RhYmxlL1BsYXllclR5cGVDaGFuZ2VyLnRlbXBsYXRlXCI7XG5cbmltcG9ydCAqIGFzIHNwaWtlVHJhcCBmcm9tIFwiLi4vLi4vUHJlZmFicy9UcmlnZ2VyL1NwaWtlVHJhcC50ZW1wbGF0ZVwiO1xuXG5pbXBvcnQgKiBhcyBjYXIgZnJvbSBcIi4uLy4uL1ByZWZhYnMvVmVoaWNsZS9DYXIudGVtcGxhdGVcIjtcblxuaW1wb3J0ICogYXMgYmlub2N1bGFyc0ljb24gZnJvbSBcIi4uLy4uL1ByZWZhYnMvRXF1aXBtZW50L0Jpbm9jdWxhcnMuaWNvblwiO1xuaW1wb3J0ICogYXMgYmxhc3Rlckljb24gZnJvbSBcIi4uLy4uL1ByZWZhYnMvRXF1aXBtZW50L0JsYXN0ZXIuaWNvblwiO1xuaW1wb3J0ICogYXMgYnVpbGRlckljb24gZnJvbSBcIi4uLy4uL1ByZWZhYnMvRXF1aXBtZW50L0J1aWxkZXIuaWNvblwiO1xuaW1wb3J0ICogYXMgc2Nhbm5lckljb24gZnJvbSBcIi4uLy4uL1ByZWZhYnMvRXF1aXBtZW50L1NjYW5uZXIuaWNvblwiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyT2JqZWN0cyhcbiAgICBvYmplY3RzOiBhbnksXG4gICAgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLFxuICAgIHJlbmRlck9mZnNldFk6IG51bWJlcixcbiAgICByZW5kZXJTaXplOiBudW1iZXIsXG4gICAgYmFja2dyb3VuZDogUG9wb3ZhLFxuICAgIGVudjogUG9wb3ZhLFxuICAgIGZvcmVncm91bmQ6IFBvcG92YSxcbiAgICBjb3ZlcjogUG9wb3ZhLFxuICAgIHVpOiBQb3BvdmEsXG4pIHtcbiAgICBmb3IgKHZhciBpZCBpbiBvYmplY3RzKSB7XG4gICAgICAgIHZhciBvYmplY3QgPSBvYmplY3RzW2lkXTtcblxuICAgICAgICBzd2l0Y2ggKG9iamVjdC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUjpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUGxheWVyLkhVTUFOOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWdyb3VuZC5kcmF3KHBsYXllci5wbGF5ZXJNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlBsYXllci5HT0Q6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kLmRyYXcoZ29kLmdvZFBsYXllck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUGxheWVyLkZJUkVfTUFHRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVncm91bmQuZHJhdyhmaXJlbWFnZS5maXJlbWFnZVBsYXllck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjaGVja1N0YXR1c0VmZmVjdChvYmplY3QsIHR5cGVzLlN0YXR1c0VmZmVjdHMuU1RVTk5FRCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yZWdyb3VuZC5kcmF3KHN0dW5uZWRTdGF0dXNFZmZlY3Quc3R1bm5lZFN0YXR1c0VmZmVjdE1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSwgcmVuZGVyU2l6ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tTdGF0dXNFZmZlY3Qob2JqZWN0LCB0eXBlcy5TdGF0dXNFZmZlY3RzLklOVlVMTkVSQUJMRSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY292ZXIuZHJhdyhpbnZ1bG5lYXJhYmxlU3RhdHVzRWZmZWN0LmludnVsbmVyYWJsZVN0YXR1c0VmZmVjdE1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSwgcmVuZGVyU2l6ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kLmRyYXcoaGVhbHRoYmFyLmhlYWx0aEJhck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSwgcmVuZGVyU2l6ZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QUk9KRUNUSUxFOlxuICAgICAgICAgICAgICAgIHN3aXRjaCAob2JqZWN0LnN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Qcm9qZWN0aWxlLkJBU0lDX1BST0pFQ1RJTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhwcm9qZWN0aWxlLnByb2plY3RpbGVNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlByb2plY3RpbGUuRklSRUJPTFRfUFJPSkVDVElMRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KGZpcmVib2x0LmZpcmVib2x0UHJvamVjdGlsZU1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUHJvamVjdGlsZS5GTEFNRV9QSUxMQVJfUFJPSkVDVElMRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KGZsYW1lUGlsbGFyLmZsYW1lUGlsbGFyUHJvamVjdGlsZU1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUHJvamVjdGlsZS5GTEFNRV9EQVNIX1BST0pFQ1RJTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhmbGFtZURhc2guZmxhbWVEYXNoUHJvamVjdGlsZU1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuR1JBVkVTVE9ORTpcbiAgICAgICAgICAgICAgICBlbnYuZHJhdyhncmF2ZXN0b25lLmdyYXZlU3RvbmVNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICBlbnYuZHJhdyhoZWFsdGhiYXIuaGVhbHRoQmFyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZLCByZW5kZXJTaXplKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRFUlJBSU46XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvYmplY3Quc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRlcnJhaW4uVFJFRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KHRyZWUudHJlZVRydW5rTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3Zlci5kcmF3KHRyZWUudHJlZUxlYWZNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRlcnJhaW4uV0FMTF9IT1JJWjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KHdhbGxIb3Jpei53YWxsSG9yaXpCYXNlTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3Zlci5kcmF3KHdhbGxIb3Jpei53YWxsSG9yaXpDb3Zlck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5JTlRFUkFDVEFCTEU6XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvYmplY3Quc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkludGVyYWN0YWJsZS5IRUFMVEhfUElDS1VQOlxuICAgICAgICAgICAgICAgICAgICAgICAgZW52LmRyYXcoaGVhbHRoUGlja3VwLmhlYWx0aFBpY2t1cE1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuSW50ZXJhY3RhYmxlLlBMQVlFUl9UWVBFX0NIQU5HRVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhwbGF5ZXJUeXBlQ2hhbmdlci5wbGF5ZXJUeXBlQ2hhbmdlck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW52LmRyYXcocGxheWVyVHlwZUNoYW5nZXIubGl0dGxlTWFuTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRSSUdHRVI6XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvYmplY3Quc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRyaWdnZXIuU1BJS0VfVFJBUDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KHNwaWtlVHJhcC5zcGlrZVRyYXBNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVkVISUNMRTpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVmVoaWNsZS5DQVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kLmRyYXcoY2FyLmNhck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5DT01CQVRfVEVYVDpcbiAgICAgICAgICAgICAgICB1aS5kcmF3VGV4dChvYmplY3QudGV4dCwgb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLCBvYmplY3QueSAtIHJlbmRlck9mZnNldFksIG9iamVjdC5zaXplLCBvYmplY3QuY29sb3IsIG9iamVjdC5mYWNpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBlbnYuZHJhdyhfdGVycmFpbi5kZWZhdWx0VGVycmFpbk1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQ3VycmVudEVxdWlwbWVudChwbGF5ZXI6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIsIHVpOiBQb3BvdmEpIHtcbiAgICBpZiAocGxheWVyICYmIHBsYXllci5jdXJyZW50RXF1aXBtZW50ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBzd2l0Y2ggKHBsYXllci5lcXVpcG1lbnRbcGxheWVyLmN1cnJlbnRFcXVpcG1lbnRdLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuRXF1aXBtZW50VHlwZXMuQkxBU1RFUjpcbiAgICAgICAgICAgICAgICB1aS5kcmF3KGJsYXN0ZXJJY29uLmJsYXN0ZXJVSU1hc3RlclBpZWNlKHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuRXF1aXBtZW50VHlwZXMuU0NBTk5FUjpcbiAgICAgICAgICAgICAgICB1aS5kcmF3KHNjYW5uZXJJY29uLnNjYW5uZXJVSU1hc3RlclBpZWNlKHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuRXF1aXBtZW50VHlwZXMuQlVJTERFUjpcbiAgICAgICAgICAgICAgICB1aS5kcmF3KGJ1aWxkZXJJY29uLmJ1aWxkZXJVSU1hc3RlclBpZWNlKHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuRXF1aXBtZW50VHlwZXMuQklOT0NVTEFSUzpcbiAgICAgICAgICAgICAgICB1aS5kcmF3KGJpbm9jdWxhcnNJY29uLmJpbm9jdWxhcnNVSU1hc3RlclBpZWNlKHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJBYmlsaXRpZXMocGxheWVyOiBhbnksIHVpOiBQb3BvdmEpIHtcbiAgICBpZiAocGxheWVyICYmIHBsYXllci5hYmlsaXRpZXMpIHtcbiAgICAgICAgY29uc3QgaWNvblNpemUgPSA0ODtcbiAgICAgICAgY29uc3QgbnVtQWJpbGl0aWVzID0gcGxheWVyLmFiaWxpdGllcy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHJlbmRlcldpZHRoID0gdWkuc2l6ZSgpLndpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgcmVuZGVySGVpZ2h0ID0gdWkuc2l6ZSgpLmhlaWdodCAtIGljb25TaXplO1xuXG4gICAgICAgIC8vIFRPRE86IE1vdmUgdGhlc2UgdG8gdGhlaXIgb3duIHRlbXBsYXRlIGZpbGVzXG4gICAgICAgIHBsYXllci5hYmlsaXRpZXMuZm9yRWFjaCgoYWJpbGl0eTogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpY29uUG9zWCA9IHJlbmRlcldpZHRoICsgKDAuNSAtIG51bUFiaWxpdGllcyAvIDIgKyBpbmRleCkgKiBpY29uU2l6ZTtcbiAgICAgICAgICAgIGNvbnN0IHJlbWFpbmluZzogbnVtYmVyID0gKGFiaWxpdHkuY29vbGRvd24gLSAoRGF0ZS5ub3coKSAtIGFiaWxpdHkubGFzdGNhc3QpKSAvIDEwMDA7XG4gICAgICAgICAgICB1aS5kcmF3KHtcbiAgICAgICAgICAgICAgICBwYWxldHRlOiBbXCIjODg4ODg4XCIsIFwiI0NDQ0NDQ1wiLCBcIiNCQkJCQkJcIl0sXG4gICAgICAgICAgICAgICAgcG9zWDogaWNvblBvc1gsXG4gICAgICAgICAgICAgICAgcG9zWTogcmVuZGVySGVpZ2h0LFxuICAgICAgICAgICAgICAgIHdpZHRoOiA4LFxuICAgICAgICAgICAgICAgIGhlaWdodDogOCxcbiAgICAgICAgICAgICAgICBmYWNpbmc6IDAsXG4gICAgICAgICAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTYsXG4gICAgICAgICAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTYsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTQsXG4gICAgICAgICAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTQsXG4gICAgICAgICAgICAgICAgICAgIHN3YXRjaDogKHJlbWFpbmluZyA+IDApID8gMSA6IDJcbiAgICAgICAgICAgICAgICB9LF0sXG4gICAgICAgICAgICAgICAgY3VzdG9tUmVuZGVyU2l6ZTogMlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocmVtYWluaW5nID4gMCkge1xuICAgICAgICAgICAgICAgIHVpLmRyYXdUZXh0KFxuICAgICAgICAgICAgICAgICAgICByZW1haW5pbmcudG9GaXhlZCgxKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvblBvc1gsXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlckhlaWdodCArIDQsXG4gICAgICAgICAgICAgICAgICAgIDEyLFxuICAgICAgICAgICAgICAgICAgICBcIiNFRUVFRUVcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVpLmRyYXdUZXh0KFN0cmluZyhpbmRleCArIDEpLCBpY29uUG9zWCwgcmVuZGVySGVpZ2h0ICsgNiwgMTgsIFwiI0VFRUVFRVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBtYXN0ZXJQaWVjZSB7XG4gICAgcGFsZXR0ZTogc3RyaW5nW10sXG4gICAgcG9zWDogbnVtYmVyLFxuICAgIHBvc1k6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIGZhY2luZzogbnVtYmVyLFxuICAgIHN0cm9rZXM6IHN0cm9rZVtdLFxuICAgIGN1c3RvbVJlbmRlclNpemU/OiBudW1iZXIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2Ugc3Ryb2tlIHtcbiAgICBjZWxsWDogbnVtYmVyLFxuICAgIGNlbGxZOiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBzd2F0Y2g6IG51bWJlcixcbiAgICB0eXBlPzogU3Ryb2tlVHlwZXMsXG59XG5cbmV4cG9ydCBlbnVtIFN0cm9rZVR5cGVzIHtcbiAgICBSRUNUID0gXCJzdHJva2UtcmVjdFwiLFxuICAgIENJUkMgPSBcInN0cm9rZS1jaXJjXCIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgbW91c2VQb3NpdGlvbiB7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICBvdXRPZkJvdW5kczogYm9vbGVhbixcbn1cblxuZXhwb3J0IGNsYXNzIFBvcG92YSB7XG5cbiAgICBwcml2YXRlIGNhbnZhczogYW55O1xuICAgIHByaXZhdGUgY3R4OiBhbnk7XG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gICAgcHJpdmF0ZSBjdWJlU2l6ZTogbnVtYmVyID0gMTI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgUG9wb3ZhJ3MgY2FudmFzXG4gICAgICogQHBhcmFtIGNhbnZhc0lkIElkIG9mIGh0bWwgY2FudmFzIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gY3ViZVNpemUgUmVuZGVyIHNpemUgZm9yIGVhY2ggY3ViZSB3aGVuIGRyYXdpbmcgd2l0aCBjdWJlc1xuICAgICAqL1xuICAgIGluaXQoY2FudmFzSWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IDxhbnk+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY2FudmFzLm9mZnNldFdpZHRoIC0gNDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5vZmZzZXRIZWlnaHQgLSA0O1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5kZXJzIGEgZ3JpZCBvbiB0aGUgY2FudmFzXG4gICAgICogQHBhcmFtIHNwYWNpbmcgTnVtYmVyIG9mIHBpeGVscyBiZXR3ZWVuIGdyaWQgbGluZXNcbiAgICAqL1xuICAgIGRyYXdHcmlkKHNwYWNpbmc6IG51bWJlciwgb2Zmc2V0WD86IG51bWJlciwgb2Zmc2V0WT86IG51bWJlcikge1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgICAvLyBEcmF3IGdyaWQgb24gYmFja2dyb3VuZFxuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwiI2YwZTdkYlwiO1xuICAgICAgICBmb3IgKHZhciB4ID0gKCEhb2Zmc2V0WCkgPyBvZmZzZXRYICUgc3BhY2luZyA6IDA7IHggPD0gdGhpcy53aWR0aDsgeCArPSBzcGFjaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgMCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgeSA9ICghIW9mZnNldFkpID8gb2Zmc2V0WSAlIHNwYWNpbmcgOiAwOyB5IDw9IHRoaXMuaGVpZ2h0OyB5ICs9IHNwYWNpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbygwLCB5KTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLndpZHRoLCB5KTtcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYXdzIGEgbWFzdGVycGllY2UgdG8gdGhlIGNhbnZhc1xuICAgICAqIEBwYXJhbSBtYXN0ZXJQaWVjZSBEZWZpbml0aW9uIGZvciB3aGF0IHRvIGRyYXdcbiAgICAgKi9cbiAgICBkcmF3KG1hc3RlclBpZWNlOiBtYXN0ZXJQaWVjZSkge1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG5cbiAgICAgICAgdGhpcy5wcmVwQ2FudmFzKFxuICAgICAgICAgICAgbWFzdGVyUGllY2UucG9zWCxcbiAgICAgICAgICAgIG1hc3RlclBpZWNlLnBvc1ksXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS53aWR0aCxcbiAgICAgICAgICAgIG1hc3RlclBpZWNlLmhlaWdodCxcbiAgICAgICAgICAgIG1hc3RlclBpZWNlLmZhY2luZyk7XG4gICAgICAgIG1hc3RlclBpZWNlLnN0cm9rZXMuZm9yRWFjaCgoc3Ryb2tlOiBzdHJva2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU3Ryb2tlKHN0cm9rZSwgbWFzdGVyUGllY2UucGFsZXR0ZSwgbWFzdGVyUGllY2UuY3VzdG9tUmVuZGVyU2l6ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDZW50ZXJzIHRoZSBjYW52YXMgb24gcG9zaXRpb24sIGFuZCByb3RhdGVzIHRvIGEgY2VydGFpbiBmYWNpbmdcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25YIFRoZSB4IHBvc2l0aW9uIG9mIHdoYXQgaXMgYmVpbmcgZHJhd25cbiAgICAgKiBAcGFyYW0gcG9zaXRpb25ZIFRoZSB5IHBvc2l0aW9uIG9mIHdoYXQgaXMgYmVpbmcgZHJhd25cbiAgICAgKiBAcGFyYW0gd2lkdGggVGhlIHdpZHRoIG9mIHdoYXQgaXMgYmVpbmcgZHJhd25cbiAgICAgKiBAcGFyYW0gaGVpZ2h0IFRoZSBoZWlnaHQgb2Ygd2hhdCBpcyBiZWluZyBkcmF3blxuICAgICAqIEBwYXJhbSBkZWdyZWVzIERlZ3JlZXMgdG8gcm90YXRlIHRoZSBjYW52YXMgYnlcbiAgICAgKiBAcGFyYW0gY3VzdG9tUmVuZGVyU2l6ZSBSZW5kZXIgdGhlIG1hc3RlciBwaWVjZSB3aXRoIGN1c3RvbSBjdWJlIHNpemluZ1xuICAgICAqL1xuICAgIHByZXBDYW52YXMocG9zaXRpb25YOiBudW1iZXIsIHBvc2l0aW9uWTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgZGVncmVlczogbnVtYmVyLCBjdXN0b21SZW5kZXJTaXplPzogbnVtYmVyKXtcbiAgICAgICAgY29uc3QgcmVuZGVyU2l6ZSA9IGN1c3RvbVJlbmRlclNpemUgPyBjdXN0b21SZW5kZXJTaXplIDogdGhpcy5jdWJlU2l6ZTtcblxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHBvc2l0aW9uWCwgcG9zaXRpb25ZKTtcbiAgICAgICAgdGhpcy5jdHgucm90YXRlKGRlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKC0gd2lkdGggKiByZW5kZXJTaXplIC8gMiwgLSBoZWlnaHQgKiByZW5kZXJTaXplIC8gMik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBcbiAgICAgKiBAcGFyYW0gc3Ryb2tlIFN0cm9rZSB0byByZW5kZXJcbiAgICAgKiBAcGFyYW0gcGFsZXR0ZSBDb250YWlucyB0aGUgbWFzdGVyIHBpZWNlJ3MgY29sb3Igc3dhdGNoZXNcbiAgICAgKiBAcGFyYW0gY3VzdG9tUmVuZGVyU2l6ZSBSZW5kZXIgdGhlIG1hc3RlciBwaWVjZSB3aXRoIGN1c3RvbSBjdWJlIHNpemluZ1xuICAgICAqL1xuICAgIHJlbmRlclN0cm9rZShzdHJva2U6IHN0cm9rZSwgcGFsZXR0ZTogc3RyaW5nW10sIGN1c3RvbVJlbmRlclNpemU/OiBudW1iZXIpe1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBwYWxldHRlW3N0cm9rZS5zd2F0Y2hdO1xuXG4gICAgICAgIGlmIChzdHJva2UudHlwZSAmJiBzdHJva2UudHlwZSA9PT0gU3Ryb2tlVHlwZXMuQ0lSQykge1xuICAgICAgICAgICAgdGhpcy5jdHguZmlsbENpcmMoMiwgMiwgMiwgMik7ICAgICAgLy8gVE9ETzogRHJhdyBjaXJjbGUgdG8gY2FudmFzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsUmVjdChcbiAgICAgICAgICAgICAgICBzdHJva2UuY2VsbFggKiAoY3VzdG9tUmVuZGVyU2l6ZSA/IGN1c3RvbVJlbmRlclNpemUgOiB0aGlzLmN1YmVTaXplKSxcbiAgICAgICAgICAgICAgICBzdHJva2UuY2VsbFkgKiAoY3VzdG9tUmVuZGVyU2l6ZSA/IGN1c3RvbVJlbmRlclNpemUgOiB0aGlzLmN1YmVTaXplKSxcbiAgICAgICAgICAgICAgICBzdHJva2Uud2lkdGggKiAoY3VzdG9tUmVuZGVyU2l6ZSA/IGN1c3RvbVJlbmRlclNpemUgOiB0aGlzLmN1YmVTaXplKSxcbiAgICAgICAgICAgICAgICBzdHJva2UuaGVpZ2h0ICogKGN1c3RvbVJlbmRlclNpemUgPyBjdXN0b21SZW5kZXJTaXplIDogdGhpcy5jdWJlU2l6ZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFcmFzZXMgZXZlcnl0aGluZyBvbiB0aGUgY2FudmFzXG4gICAgICovXG4gICAgd2lwZUNhbnZhcygpIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjYW52YXMnIHdpZHRoIGFuZCBoZWlnaHRcbiAgICAgKi9cbiAgICBzaXplKCk6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfSB7XG4gICAgICAgIHJldHVybiB7IHdpZHRoOiB0aGlzLndpZHRoLCBoZWlnaHQ6IHRoaXMuaGVpZ2h0IH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBQb3BvdmEncyBjdWJlIHJlbmRlciBzaXplXG4gICAgICovXG4gICAgZ2V0Q3ViZVNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3ViZVNpemU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyBQb3BvdmEncyBjdWJlIHJlbmRlciBzaXplXG4gICAgICogQHBhcmFtIHNpemUgVmFsdWUgZm9yIGN1YmUgcmVuZGVyIHNpemVcbiAgICAgKi9cbiAgICBzZXRDdWJlU2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jdWJlU2l6ZSA9IHNpemU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBtb3VzZSBwb3NpdGlvbiBhbmQgaWYgbW91c2UgaXMgaW5zaWRlIGNhbnZhc1xuICAgICAqIEBwYXJhbSBldnQgTW91c2UgbW92ZW1lbnQgZXZlbnQsIGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb25cbiAgICAgKi9cbiAgICBnZXRNb3VzZVBvcyhldnQ6IGFueSk6IG1vdXNlUG9zaXRpb24ge1xuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgcG9zWCA9IGV2dC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgICB2YXIgcG9zWSA9IGV2dC5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgICAgIHZhciBvZmZDYW52YXMgPSBmYWxzZTtcblxuICAgICAgICBpZiAocG9zWCA8IDApIHtcbiAgICAgICAgICAgIHBvc1ggPSAwO1xuICAgICAgICAgICAgb2ZmQ2FudmFzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zWSA8IDApIHtcbiAgICAgICAgICAgIHBvc1kgPSAwO1xuICAgICAgICAgICAgb2ZmQ2FudmFzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zWCA+IHRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgIHBvc1ggPSB0aGlzLndpZHRoO1xuICAgICAgICAgICAgb2ZmQ2FudmFzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zWSA+IHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICBwb3NZID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgICAgICBvZmZDYW52YXMgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiBwb3NYLFxuICAgICAgICAgIHk6IHBvc1ksXG4gICAgICAgICAgb3V0T2ZCb3VuZHM6IG9mZkNhbnZhcyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmF3IHRleHQgdG8gdGhlIGNhbnZhc1xuICAgICAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IHRvIGRyYXdcbiAgICAgKiBAcGFyYW0gcG9zWCBUaGUgaG9yaXpvbnRhbCBwb3NpdGlvbiB0byBkcmF3IHRoZSB0ZXh0XG4gICAgICogQHBhcmFtIHBvc1kgVGhlIHZlcnRpY2FsIHBvc2l0aW9uIHRvIGRyYXcgdGhlIHRleHRcbiAgICAgKiBAcGFyYW0gc2l6ZSBUaGUgZm9udCBzaXplIG9mIHRoZSB0ZXh0XG4gICAgICogQHBhcmFtIGNvbG9yIFRoZSBjb2xvciB0byBkcmF3IHRoZSB0ZXh0XG4gICAgICogQHBhcmFtIGZhY2luZyBUaGUgYW5nbGUgdG8gcmVuZGVyIHRoZSB0ZXh0XG4gICAgICovXG4gICAgZHJhd1RleHQodGV4dDogc3RyaW5nLCBwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlciwgc2l6ZT86IG51bWJlciwgY29sb3I/OiBzdHJpbmcsIGZhY2luZz86IG51bWJlcikge1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG5cbiAgICAgICAgY29uc3QgYWN0dWFsU2l6ZSA9IHNpemUgPyBzaXplIDogMTY7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBTdHJpbmcoYWN0dWFsU2l6ZSkgKyBcInB4IEFyaWFsXCI7XG4gICAgICAgIHRoaXMucHJlcENhbnZhcyhwb3NYLCBwb3NZLCB0aGlzLmN0eC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCwgMCwgZmFjaW5nLCAxKTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY29sb3IgPyBjb2xvciA6IFwiYmxhY2tcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGV4dCwgMCwgMCk7XG5cbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0ICogYXMgc29ja2V0SW8gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcbmltcG9ydCB7IFBvcG92YSwgbW91c2VQb3NpdGlvbiwgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi9Qb3BvdmEvUG9wb3ZhXCI7XG5pbXBvcnQgKiBhcyBsb3V2cmUgZnJvbSBcIi4vTG91dnJlL0xvdXZyZVwiO1xuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4uL09iamVjdFR5cGVzXCI7XG5cbi8vIFNvY2tldCBsaXN0ZW5lclxudmFyIHNvY2tldCA9IGlvKCk7XG52YXIgZGVidWcgPSB0cnVlO1xuXG52YXIgY3ViZVNpemU6IG51bWJlcjtcbnZhciBncmlkU2l6ZTogbnVtYmVyID0gNDg7XG52YXIgY2FudmFzU2l6ZTogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9O1xudmFyIGVxdWlwbWVudEljb25Qb3NYOiBudW1iZXIgPSA5NzY7XG52YXIgZXF1aXBtZW50SWNvblBvc1k6IG51bWJlciA9IDcyNjtcblxudmFyIHBsYXllcklkOiBzdHJpbmc7XG5cbnZhciByZW5kZXJPZmZzZXRYOiBudW1iZXI7XG52YXIgcmVuZGVyT2Zmc2V0WTogbnVtYmVyO1xudmFyIGNhbWVyYU1vdmluZ1RvWDogbnVtYmVyO1xudmFyIGNhbWVyYU1vdmluZ1RvWTogbnVtYmVyO1xudmFyIGNhbWVyYVBhblNwZWVkID0gMC4wMTU7XG5cbnZhciBtb3VzZVBvczogbW91c2VQb3NpdGlvbiA9IHsgeDogMCwgeTogMCwgb3V0T2ZCb3VuZHM6IHRydWUgfTtcblxudmFyIHBsYXllcklucHV0ID0ge1xuICAgIHVwOiBmYWxzZSxcbiAgICBkb3duOiBmYWxzZSxcbiAgICBsZWZ0OiBmYWxzZSxcbiAgICByaWdodDogZmFsc2UsXG4gICAgY3ljbGVFcXVpcG1lbnRGb3J3YXJkOiBmYWxzZSxcbiAgICBjeWNsZUVxdWlwbWVudEJhY2t3YXJkOiBmYWxzZSxcbiAgICB1c2VFcXVpcG1lbnQ6IGZhbHNlLFxuICAgIHBpY2t1cDogZmFsc2UsXG4gICAgYWJpbGl0eTE6IGZhbHNlLFxuICAgIGFiaWxpdHkyOiBmYWxzZSxcbiAgICBhYmlsaXR5MzogZmFsc2UsXG4gICAgYWJpbGl0eTQ6IGZhbHNlLFxuICAgIHRhcmdldFg6IG1vdXNlUG9zLngsXG4gICAgdGFyZ2V0WTogbW91c2VQb3MueSxcbn1cblxudmFyIEtFWV9VUCA9IDg3OyAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gV1xudmFyIEtFWV9ET1dOID0gODM7ICAgICAgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gU1xudmFyIEtFWV9SSUdIVCA9IDY4OyAgICAgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gRFxudmFyIEtFWV9MRUZUID0gNjU7ICAgICAgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gQVxudmFyIEtFWV9DWUNMRV9FUVVJUE1FTlRfRk9SV0FSRCA9IDY5OyAgIC8vIERlZmF1bHQgdG8gRVxudmFyIEtFWV9DWUNMRV9FUVVJUE1FTlRfQkFDS1dBUkQgPSA4MTsgIC8vIERlZmF1bHQgdG8gUVxudmFyIEtFWV9VU0VfRVFVSVBNRU5UID0gODIgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gUlxudmFyIEtFWV9QSUNLVVAgPSA3MDsgICAgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gRlxudmFyIEtFWV9BQklMSVRZXzEgPSA0OTsgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gMVxudmFyIEtFWV9BQklMSVRZXzIgPSA1MDsgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gMlxudmFyIEtFWV9BQklMSVRZXzMgPSA1MTsgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gM1xudmFyIEtFWV9BQklMSVRZXzQgPSA1MjsgICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gNFxuXG52YXIgcHJldlRpbWUgPSAwO1xudmFyIGRlbHRhID0gMDtcblxuLy8gQWRkIGxpc3RlbmVycyB0byBkb2N1bWVudFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgS0VZX1VQOlxuICAgICAgICAgICAgcGxheWVySW5wdXQudXAgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0RPV046XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5kb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9SSUdIVDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LnJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9MRUZUOlxuICAgICAgICAgICAgcGxheWVySW5wdXQubGVmdCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfQ1lDTEVfRVFVSVBNRU5UX0ZPUldBUkQ6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5jeWNsZUVxdWlwbWVudEZvcndhcmQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0NZQ0xFX0VRVUlQTUVOVF9CQUNLV0FSRDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmN5Y2xlRXF1aXBtZW50QmFja3dhcmQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX1VTRV9FUVVJUE1FTlQ6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC51c2VFcXVpcG1lbnQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX1BJQ0tVUDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LnBpY2t1cCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfQUJJTElUWV8xOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuYWJpbGl0eTEgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0FCSUxJVFlfMjpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmFiaWxpdHkyID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9BQklMSVRZXzM6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5MyA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfQUJJTElUWV80OlxuICAgICAgICAgICAgcGxheWVySW5wdXQuYWJpbGl0eTQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHBsYXllcklucHV0LnRhcmdldFggPSBtb3VzZVBvcy54ICsgcmVuZGVyT2Zmc2V0WDtcbiAgICBwbGF5ZXJJbnB1dC50YXJnZXRZID0gbW91c2VQb3MueSArIHJlbmRlck9mZnNldFk7XG4gICAgc29ja2V0LmVtaXQoXCJwbGF5ZXJJbnB1dFwiLCBwbGF5ZXJJbnB1dCk7XG4gICAgXG4gICAgLy8gVHJpZ2dlciBrZXlzIGFyZSB1bnNldCBhZnRlciBlbWlzc2lvblxuICAgIHBsYXllcklucHV0LnBpY2t1cCA9IGZhbHNlO1xuICAgIHBsYXllcklucHV0LmN5Y2xlRXF1aXBtZW50Rm9yd2FyZCA9IGZhbHNlO1xuICAgIHBsYXllcklucHV0LmN5Y2xlRXF1aXBtZW50QmFja3dhcmQgPSBmYWxzZTtcbiAgICBwbGF5ZXJJbnB1dC51c2VFcXVpcG1lbnQgPSBmYWxzZTtcbn0pO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIEtFWV9VUDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LnVwID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfRE9XTjpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9SSUdIVDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LnJpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfTEVGVDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmxlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9BQklMSVRZXzE6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5MSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0FCSUxJVFlfMjpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmFiaWxpdHkyID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfQUJJTElUWV8zOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuYWJpbGl0eTMgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9BQklMSVRZXzQ6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5NCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNvY2tldC5lbWl0KFwicGxheWVySW5wdXRcIiwgcGxheWVySW5wdXQpO1xufSk7XG5cbmZ1bmN0aW9uIG9uTW91c2VNb3ZlKGV2ZW50OiBhbnkpIHtcbiAgICBtb3VzZVBvcyA9IGZvcmVncm91bmQuZ2V0TW91c2VQb3MoZXZlbnQpO1xufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmUsIGZhbHNlKTtcblxuZnVuY3Rpb24gb25Nb3VzZUNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAoIW1vdXNlUG9zLm91dE9mQm91bmRzKSB7XG4gICAgICAgIHNvY2tldC5lbWl0KFwibW91c2VEb3duXCIsIHtcbiAgICAgICAgICAgIHNvdXJjZUlkOiBwbGF5ZXJJZCxcbiAgICAgICAgICAgIHRhcmdldFg6IChtb3VzZVBvcy54ICsgcmVuZGVyT2Zmc2V0WCksXG4gICAgICAgICAgICB0YXJnZXRZOiAobW91c2VQb3MueSArIHJlbmRlck9mZnNldFkpLFxuICAgICAgICAgICAgcGxheWVySW5wdXQ6IHBsYXllcklucHV0LFxuICAgICAgICB9KTtcbiAgICB9XG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uTW91c2VDbGljaywgZmFsc2UpO1xuXG4vLyBJbml0IGNhbnZhc1xudmFyIGJhY2tncm91bmQgID0gbmV3IFBvcG92YSgpO1xudmFyIGVudiAgICAgICAgID0gbmV3IFBvcG92YSgpO1xudmFyIGZvcmVncm91bmQgID0gbmV3IFBvcG92YSgpO1xudmFyIGNvdmVyICAgICAgID0gbmV3IFBvcG92YSgpO1xudmFyIHVpICAgICAgICAgID0gbmV3IFBvcG92YSgpO1xuXG5iYWNrZ3JvdW5kLmluaXQoXCJiYWNrZ3JvdW5kXCIpO1xuZW52LmluaXQoXCJlbnZcIik7XG5mb3JlZ3JvdW5kLmluaXQoXCJmb3JlZ3JvdW5kXCIpO1xuY292ZXIuaW5pdChcImNvdmVyXCIpO1xudWkuaW5pdChcInVpXCIpO1xuXG4vLyBUZWxsIHRoZSBzZXJ2ZXIgYSBuZXcgcGxheWVyIGhhcyBqb2luZWQgYW5kIGhhbmRzaGFrZVxuc29ja2V0LmVtaXQoXCJuZXctcGxheWVyXCIpO1xuc29ja2V0Lm9uKFwiaGFuZHNoYWtlXCIsIChpbmZvOiBhbnkpID0+IHtcbiAgICBwbGF5ZXJJZCA9IGluZm8uaWQ7XG4gICAgY3ViZVNpemUgPSBpbmZvLmN1YmVTaXplO1xuICAgIGJhY2tncm91bmQuc2V0Q3ViZVNpemUoY3ViZVNpemUpO1xuICAgIGVudi5zZXRDdWJlU2l6ZShjdWJlU2l6ZSk7XG4gICAgZm9yZWdyb3VuZC5zZXRDdWJlU2l6ZShjdWJlU2l6ZSk7XG4gICAgY292ZXIuc2V0Q3ViZVNpemUoY3ViZVNpemUpO1xuICAgIHVpLnNldEN1YmVTaXplKGN1YmVTaXplKTtcbiAgICBjYW52YXNTaXplID0gZm9yZWdyb3VuZC5zaXplKCk7XG5cbiAgICBwcmV2VGltZSA9IERhdGUubm93KCk7XG4gICAgcmVuZGVyT2Zmc2V0WCA9IDA7XG4gICAgcmVuZGVyT2Zmc2V0WSA9IDA7XG59KTtcblxuLy8gSW50ZXJwcmV0IHN0YXRlIGFuZCBkcmF3IG9iamVjdHNcbnNvY2tldC5vbihcInN0YXRlXCIsIChvYmplY3RzOiBhbnkpID0+IHtcbiAgICB2YXIgcGxheWVyID0gdW5kZWZpbmVkO1xuICAgIGlmIChwbGF5ZXJJZCAmJiBvYmplY3RzW3BsYXllcklkXSkge1xuICAgICAgICBwbGF5ZXIgPSBvYmplY3RzW3BsYXllcklkXTtcbiAgICB9XG5cbiAgICBpZiAoIWNhbnZhc1NpemUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvcmVncm91bmQud2lwZUNhbnZhcygpO1xuICAgIGVudi53aXBlQ2FudmFzKCk7XG4gICAgY292ZXIud2lwZUNhbnZhcygpO1xuICAgIHVpLndpcGVDYW52YXMoKTtcblxuICAgIGNvbnN0IHRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGRlbHRhID0gdGltZSAtIHByZXZUaW1lO1xuICAgIHByZXZUaW1lID0gdGltZTtcblxuICAgIC8vIENhbWVyYSBzbW9vdGhpbmcgYW5kIHJlbmRlciBvZmZzZXQgY2FsY3VsYXRpb25zXG4gICAgY2FtZXJhTW92aW5nVG9YID0gKCEhcGxheWVyKVxuICAgICAgICA/IHBsYXllci54ICsgKG1vdXNlUG9zLnggLSAoY2FudmFzU2l6ZS53aWR0aCAvIDIpKSAqIHBsYXllci52aWV3UmFuZ2UgLSBjYW52YXNTaXplLndpZHRoIC8gMlxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICBjYW1lcmFNb3ZpbmdUb1kgPSAoISFwbGF5ZXIpXG4gICAgICAgID8gcGxheWVyLnkgKyAobW91c2VQb3MueSAtIChjYW52YXNTaXplLmhlaWdodCAvIDIpKSAqIHBsYXllci52aWV3UmFuZ2UgLSBjYW52YXNTaXplLmhlaWdodCAvIDJcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICByZW5kZXJPZmZzZXRYICs9ICghIWNhbWVyYU1vdmluZ1RvWClcbiAgICAgICAgPyAoY2FtZXJhTW92aW5nVG9YIC0gcmVuZGVyT2Zmc2V0WCkgKiBjYW1lcmFQYW5TcGVlZCAqIGRlbHRhXG4gICAgICAgIDogMDtcbiAgICByZW5kZXJPZmZzZXRZICs9ICghIWNhbWVyYU1vdmluZ1RvWSlcbiAgICAgICAgPyAoY2FtZXJhTW92aW5nVG9ZIC0gcmVuZGVyT2Zmc2V0WSkgKiBjYW1lcmFQYW5TcGVlZCAqIGRlbHRhXG4gICAgICAgIDogMDtcblxuICAgIC8vIFRPRE86IERyYXcgYmFja2dyb3VuZCBtYXAgKGluc3RlYWQgb2Yvd2l0aCBncmlkKVxuICAgIGlmICghIW9iamVjdHMpIHtcbiAgICAgICAgYmFja2dyb3VuZC53aXBlQ2FudmFzKCk7XG4gICAgICAgIGJhY2tncm91bmQuZHJhd0dyaWQoZ3JpZFNpemUsIC1yZW5kZXJPZmZzZXRYLCAtcmVuZGVyT2Zmc2V0WSk7XG4gICAgfVxuXG4gICAgaWYgKGRlYnVnKSB7XG4gICAgICAgIHVpLmRyYXdUZXh0KGRlbHRhLnRvU3RyaW5nKCkgKyBcIm1zXCIsIGNhbnZhc1NpemUud2lkdGggLSAzMiwgMTYsIDE2LCBcIiM0NDQ0NDRcIik7XG4gICAgfVxuXG4gICAgLy8gUmVuZGVyIGN1cnJlbnQgZXF1aXBtZW50IHVpIGljb25cbiAgICBsb3V2cmUucmVuZGVyQ3VycmVudEVxdWlwbWVudChwbGF5ZXIsIGVxdWlwbWVudEljb25Qb3NYLCBlcXVpcG1lbnRJY29uUG9zWSwgdWkpO1xuXG4gICAgLy8gUmVuZGVyIHBsYXllcidzIGFiaWxpdGllc1xuICAgIGxvdXZyZS5yZW5kZXJBYmlsaXRpZXMocGxheWVyLCB1aSk7XG5cbiAgICAvLyBSZW5kZXIgb2JqZWN0c1xuICAgIGxvdXZyZS5yZW5kZXJPYmplY3RzKG9iamVjdHMsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFksIGN1YmVTaXplLCBiYWNrZ3JvdW5kLCBlbnYsIGZvcmVncm91bmQsIGNvdmVyLCB1aSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=