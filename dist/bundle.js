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
        ENEMY: "enemy",
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
        DEAD_DUMMY: "dead-dummy",
    },
    Interactable: {
        HEALTH_PICKUP: "health-pickup",
        CAR_ENTER: "car-enter",
        PLAYER_TYPE_CHANGER: "player-type-changer",
    },
    Trigger: {
        SPIKE_TRAP: "spike-trap",
        INVULN_PLATFORM: "invuln-platform",
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
    Enemy: {
        TARGET_DUMMY: "target-dummy",
    },
    HitboxTypes: {
        NONE: "none",
        RECT: "rect",
        CIRC: "circ",
    },
    DamageTypes: {
        NORMAL: "normal-damage",
        FIRE: "fire-damage",
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

var flameBarrierCooldown = 8000;
var flameBarrierInvulnDuration = 500;
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

/***/ "./Prefabs/Enemy/_Enemy.js":
/*!*********************************!*\
  !*** ./Prefabs/Enemy/_Enemy.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var enemySpeed = 0.2;
var enemyHealth = 300;
var enemyWidth = 4;
var enemyHeight = 6;
function generateNew(obs, src, posX, posY) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var collisions = __webpack_require__(/*! ../../Collisions */ "./Collisions.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    var utils = __webpack_require__(/*! ../PrefabUtils */ "./Prefabs/PrefabUtils.js");
    return {
        type: types.ObjectTypes.ENEMY,
        subtype: types.Enemy.TARGET_DUMMY,
        x: posX,
        y: posY,
        velocityX: 0,
        velocityY: 0,
        speed: enemySpeed,
        width: enemyWidth,
        height: enemyHeight,
        hitboxType: types.HitboxTypes.RECT,
        hitboxWidth: enemyWidth,
        hitboxHeight: enemyHeight,
        health: enemyHealth,
        maxHealth: enemyHealth,
        statusEffects: {},
        deathrattle: function (obs, selfRef) {
            prefabs.generateNew(obs, selfRef, obs[selfRef].x, obs[selfRef].y + 1 * obs[selfRef].height / 3 * prefabs.renderSize, types.ObjectTypes.TERRAIN, types.Terrain.DEAD_DUMMY);
            delete obs[selfRef];
        },
        update: function (obs, selfId, delta) {
            obs[selfId].updateStatusEffects(obs, selfId);
            // Check collisions with terrain and reposition accordingly
            collisions.checkCollisions(selfId, obs, prefabs.renderSize, function (srcId, collisionId) {
                if (obs[srcId] && collisionId != srcId) {
                    switch (obs[collisionId].type) { // Should collide with players?
                        case types.ObjectTypes.VEHICLE:
                        case types.ObjectTypes.TERRAIN:
                        case types.ObjectTypes.PLAYER:
                        case types.ObjectTypes.ENEMY:
                            collisions.pushBack(obs, srcId, collisionId, prefabs.renderSize);
                            break;
                    }
                }
            });
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
        damage: function (obs, selfId, amount, damageType) {
            if (checkStatusEffect(obs, selfId, types.StatusEffects.INVULNERABLE)) {
                prefabs.generateNew(obs, selfId, 0, 0, types.ObjectTypes.COMBAT_TEXT, types.CombatText.INVULNERABLE_TEXT, { text: "* " + amount });
            }
            else {
                utils.damage(obs, selfId, amount, damageType);
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

/***/ "./Prefabs/Enemy/_Enemy.template.ts":
/*!******************************************!*\
  !*** ./Prefabs/Enemy/_Enemy.template.ts ***!
  \******************************************/
/*! exports provided: enemyMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enemyMasterPiece", function() { return enemyMasterPiece; });
/**
 * Get master piece for enemy object
 * @param object The enemy object
 * @param renderOffsetX Horizontal offset for rendering objects
 * @param renderOffsetY Vertical offset for render objects
 */
function enemyMasterPiece(object, renderOffsetX, renderOffsetY) {
    return {
        palette: ["#A52A2A", "#FF0000", "#FFFFFF"],
        posX: object.x - renderOffsetX,
        posY: object.y - renderOffsetY,
        width: object.width,
        height: object.height,
        facing: 0,
        strokes: [
            { cellX: 3, cellY: 0, width: 2, height: 12, swatch: 0 },
            { cellX: 0, cellY: 4, width: 8, height: 2, swatch: 0 },
            { cellX: 1, cellY: 3, width: 6, height: 6, swatch: 2 },
            { cellX: 2, cellY: 4, width: 4, height: 4, swatch: 1 },
            { cellX: 3, cellY: 5, width: 2, height: 2, swatch: 2 },
        ],
        customRenderSize: 2,
    };
}


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
    var utils = __webpack_require__(/*! ../PrefabUtils */ "./Prefabs/PrefabUtils.js");
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
        damage: utils.damage,
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
        width: object.width,
        height: object.height,
        facing: 0,
        strokes: [{
                cellX: object.width / 2,
                cellY: object.height / 2,
                width: object.width,
                height: object.height,
                swatch: 0,
                type: _src_Popova_Popova__WEBPACK_IMPORTED_MODULE_0__["StrokeTypes"].CIRC,
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
    var utils = __webpack_require__(/*! ../PrefabUtils */ "./Prefabs/PrefabUtils.js");
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
        damage: function (obs, selfId, amount, damageType) {
            if (checkStatusEffect(obs, selfId, types.StatusEffects.INVULNERABLE)) {
                prefabs.generateNew(obs, selfId, 0, 0, types.ObjectTypes.COMBAT_TEXT, types.CombatText.INVULNERABLE_TEXT, { text: "* " + amount });
            }
            else {
                utils.damage(obs, selfId, amount, damageType);
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

/***/ "./Prefabs/PrefabUtils.js":
/*!********************************!*\
  !*** ./Prefabs/PrefabUtils.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var types = __webpack_require__(/*! ../ObjectTypes */ "./ObjectTypes.js");
var prefabs = __webpack_require__(/*! ./Prefabs */ "./Prefabs/Prefabs.js");
function damage(obs, selfId, amount, damageType) {
    var types = __webpack_require__(/*! ../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ./Prefabs */ "./Prefabs/Prefabs.js");
    obs[selfId].health -= amount;
    var textType = undefined;
    switch (damageType) {
        case types.DamageTypes.NORMAL:
            textType = types.CombatText.DAMAGE_TEXT;
            break;
        case types.DamageTypes.FIRE:
            textType = types.CombatText.FIRE_DAMAGE_TEXT;
            break;
    }
    if (textType)
        prefabs.generateNew(obs, selfId, 0, 0, types.ObjectTypes.COMBAT_TEXT, textType, { text: "-" + amount });
    if (obs[selfId].health <= 0) {
        obs[selfId].deathrattle(obs, selfId);
    }
}
module.exports = {
    damage: damage,
};


/***/ }),

/***/ "./Prefabs/Prefabs.js":
/*!****************************!*\
  !*** ./Prefabs/Prefabs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var types = __webpack_require__(/*! ../ObjectTypes */ "./ObjectTypes.js");
var collisions = __webpack_require__(/*! ../Collisions */ "./Collisions.js");
var utils = __webpack_require__(/*! ./PrefabUtils */ "./Prefabs/PrefabUtils.js");
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
var deadDummy = __webpack_require__(/*! ./Terrain/DeadDummy */ "./Prefabs/Terrain/DeadDummy.js");
var _interactable = __webpack_require__(/*! ./Interactable/_Interactable */ "./Prefabs/Interactable/_Interactable.js");
var healthPickup = __webpack_require__(/*! ./Interactable/HealthPickup */ "./Prefabs/Interactable/HealthPickup.js");
var carEnter = __webpack_require__(/*! ./Interactable/CarEnter */ "./Prefabs/Interactable/CarEnter.js");
var playerTypeChanger = __webpack_require__(/*! ./Interactable/PlayerTypeChanger */ "./Prefabs/Interactable/PlayerTypeChanger.js");
var _trigger = __webpack_require__(/*! ./Trigger/_Trigger */ "./Prefabs/Trigger/_Trigger.js");
var spikeTrap = __webpack_require__(/*! ./Trigger/SpikeTrap */ "./Prefabs/Trigger/SpikeTrap.js");
var invulnPlatform = __webpack_require__(/*! ./Trigger/InvulnPlatform */ "./Prefabs/Trigger/InvulnPlatform.js");
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
var _enemy = __webpack_require__(/*! ./Enemy/_Enemy */ "./Prefabs/Enemy/_Enemy.js");
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
                }
                obs[newId.concat(":" + dup)] = newObj;
                return;
            case types.ObjectTypes.TERRAIN:
                newObj = _terrain.generateNew(obs, src, posX, posY);
                switch (subtype) {
                    case types.Terrain.TREE:
                        newObj = tree.generateNew(obs, src, posX, posY, newObj);
                        break;
                    case types.Terrain.WALL_HORIZ:
                        newObj = wallHoriz.generateNew(obs, src, posX, posY, newObj);
                        break;
                    case types.Terrain.DEAD_DUMMY:
                        newObj = deadDummy.generateNew(obs, src, posX, posY, newObj);
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
                    case types.Trigger.INVULN_PLATFORM:
                        newObj = invulnPlatform.generateNew(obs, src, posX, posY, newObj);
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
            case types.ObjectTypes.ENEMY:
                newObj = _enemy.generateNew(obs, src, posX, posY);
                switch (subtype) {
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
                hitboxType: types.HitboxTypes.RECT,
                hitboxWidth: 6,
                hitboxHeight: 6,
                health: 1,
                maxHealth: 1,
                update: function (obs, selfId, delta) { },
                damage: utils.damage,
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
                case types.ObjectTypes.ENEMY:
                    if (obs[srcId]) {
                        if (obs[collisionId] && obs[collisionId].damage) {
                            firemage.increaseFireTick(obs, obs[srcId].source, (obs[collisionId].type === types.ObjectTypes.PLAYER || obs[collisionId].type === types.ObjectTypes.ENEMY) ? fireboltTickIncrease : 0);
                            var damage = obs[srcId].damage;
                            var fireDamage = obs[obs[srcId].source].fireTicks ? obs[obs[srcId].source].fireTicks * firemage.fireTickDamage : 0;
                            obs[collisionId].damage(obs, collisionId, damage, types.DamageTypes.NORMAL);
                            if (fireDamage && obs[collisionId])
                                obs[collisionId].damage(obs, collisionId, fireDamage, types.DamageTypes.FIRE);
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
var flameDashDamage = 6;
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
                case types.ObjectTypes.ENEMY:
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
                case types.ObjectTypes.ENEMY:
                    if (obs[srcId]) {
                        if (obs[collisionId] && obs[collisionId].damage) {
                            firemage.increaseFireTick(obs, obs[srcId].source, (obs[collisionId].type === types.ObjectTypes.PLAYER || obs[collisionId].type === types.ObjectTypes.ENEMY) ? flameDashTickIncrease : 0);
                            var damage = obs[srcId].damage;
                            var fireDamage = obs[obs[srcId].source].fireTicks ? obs[obs[srcId].source].fireTicks * firemage.fireTickDamage : 0;
                            obs[collisionId].damage(obs, collisionId, damage, types.DamageTypes.NORMAL);
                            if (fireDamage && obs[collisionId])
                                obs[collisionId].damage(obs, collisionId, fireDamage, types.DamageTypes.FIRE);
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
var flamePillarTickIncrease = 2;
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
                case types.ObjectTypes.ENEMY:
                    obs[collisionId].addStatusEffect(obs, collisionId, types.StatusEffects.STUNNED, flamePillarStunDuration);
                case types.ObjectTypes.GRAVESTONE:
                case types.ObjectTypes.VEHICLE:
                case types.ObjectTypes.TERRAIN:
                    if (obs[srcId]) {
                        if (obs[collisionId] && obs[collisionId].damage) {
                            firemage.increaseFireTick(obs, obs[srcId].source, (obs[collisionId].type === types.ObjectTypes.PLAYER || obs[collisionId].type === types.ObjectTypes.ENEMY) ? flamePillarTickIncrease : 0);
                            var damage = obs[srcId].damage;
                            var fireDamage = obs[obs[srcId].source].fireTicks ? obs[obs[srcId].source].fireTicks * firemage.fireTickDamage : 0;
                            obs[collisionId].damage(obs, collisionId, damage, types.DamageTypes.NORMAL);
                            if (fireDamage && obs[collisionId])
                                obs[collisionId].damage(obs, collisionId, fireDamage, types.DamageTypes.FIRE);
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
var projectileSpeed = 0.7;
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
                case types.ObjectTypes.ENEMY:
                case types.ObjectTypes.GRAVESTONE:
                case types.ObjectTypes.VEHICLE:
                case types.ObjectTypes.TERRAIN:
                    if (obs[srcId]) {
                        if (obs[collisionId] && obs[collisionId].damage) {
                            obs[collisionId].damage(obs, collisionId, obs[srcId].damage, types.DamageTypes.NORMAL);
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

/***/ "./Prefabs/Terrain/DeadDummy.js":
/*!**************************************!*\
  !*** ./Prefabs/Terrain/DeadDummy.js ***!
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
var deadDummyWidth = 4;
var deadDummyHeight = 2;
var deadDummyHitboxWidth = 4;
var deadDummyHitboxHeight = 2;
var deadDummyHealth = 1000;
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return __assign({}, base, { subtype: types.Terrain.DEAD_DUMMY, width: deadDummyWidth, height: deadDummyHeight, hitboxType: types.HitboxTypes.RECT, hitboxWidth: deadDummyHitboxWidth, hitboxHeight: deadDummyHitboxHeight, health: deadDummyHealth, maxHealth: deadDummyHealth, update: function (obs, selfId, delta) {
            if (obs[selfId]) {
                obs[selfId].health -= deadDummyHealth / delta / 8;
                if (obs[selfId].health <= 0)
                    obs[selfId].deathrattle(obs, selfId);
            }
        }, deathrattle: function (obs, selfId) {
            if (obs[selfId]) {
                prefabs.generateNew(obs, selfId, obs[selfId].x, obs[selfId].y - obs[selfId].height * prefabs.renderSize, types.ObjectTypes.ENEMY, types.Enemy.TARGET_DUMMY);
                delete obs[selfId];
            }
        } });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Terrain/DeadDummy.template.ts":
/*!***********************************************!*\
  !*** ./Prefabs/Terrain/DeadDummy.template.ts ***!
  \***********************************************/
/*! exports provided: deadDummyMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deadDummyMasterPiece", function() { return deadDummyMasterPiece; });
/**
 * Get master piece for dead dummy object
 * @param object The dead dummy object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
function deadDummyMasterPiece(object, renderOffsetX, renderOffsetY) {
    return {
        palette: ["#A52A2A"],
        posX: object.x - renderOffsetX,
        posY: object.y - renderOffsetY,
        width: object.width,
        height: object.height,
        facing: 0,
        strokes: [
            { cellX: 3, cellY: 0, width: 2, height: 4, swatch: 0 },
        ],
        customRenderSize: 2,
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
    var utils = __webpack_require__(/*! ../PrefabUtils */ "./Prefabs/PrefabUtils.js");
    return {
        type: types.ObjectTypes.TERRAIN,
        x: posX,
        y: posY,
        update: function (obs, selfId, delta) { },
        deathrattle: function (obs, selfId) {
            if (obs[selfId])
                delete obs[selfId];
        },
        damage: utils.damage,
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

/***/ "./Prefabs/Trigger/InvulnPlatform.js":
/*!*******************************************!*\
  !*** ./Prefabs/Trigger/InvulnPlatform.js ***!
  \*******************************************/
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
var invulnPlatformWidth = 16;
var invulnPlatformHeight = 16;
var invulnPlatformBuffDuration = 150;
function generateNew(obs, src, posX, posY, base) {
    var types = __webpack_require__(/*! ../../ObjectTypes */ "./ObjectTypes.js");
    var prefabs = __webpack_require__(/*! ../Prefabs */ "./Prefabs/Prefabs.js");
    return __assign({}, base, { subtype: types.Trigger.INVULN_PLATFORM, width: invulnPlatformWidth, height: invulnPlatformHeight, hitboxType: types.HitboxTypes.RECT, hitboxWidth: invulnPlatformWidth, hitboxHeight: invulnPlatformHeight, onTrigger: function (obs, selfRef, triggerId) {
            if (obs[triggerId]) {
                if (obs[triggerId].statusEffects) {
                    obs[triggerId].addStatusEffect(obs, triggerId, types.StatusEffects.INVULNERABLE, invulnPlatformBuffDuration);
                }
            }
        } });
}
module.exports = {
    generateNew: generateNew,
};


/***/ }),

/***/ "./Prefabs/Trigger/InvulnPlatform.template.ts":
/*!****************************************************!*\
  !*** ./Prefabs/Trigger/InvulnPlatform.template.ts ***!
  \****************************************************/
/*! exports provided: invulnPlatformMasterPiece */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invulnPlatformMasterPiece", function() { return invulnPlatformMasterPiece; });
/**
 * Get master piece for invuln platform object
 * @param object The invuln platform object
 * @param renderOffsetX Horizontal offset for rendering objects
 * @param renderOffsetY Vertical offset for render objects
 */
function invulnPlatformMasterPiece(object, renderOffsetX, renderOffsetY) {
    return {
        palette: ["#E5E5E5", "#222222", "#888888", "#ADD8E6"],
        posX: object.x - renderOffsetX,
        posY: object.y - renderOffsetY,
        width: object.width,
        height: object.height,
        facing: 0,
        strokes: [
            { cellX: 2, cellY: 0, width: 12, height: 16, swatch: 0 },
            { cellX: 0, cellY: 2, width: 16, height: 12, swatch: 0 },
            { cellX: 2, cellY: 0, width: 12, height: 1, swatch: 1 },
            { cellX: 0, cellY: 2, width: 1, height: 12, swatch: 1 },
            { cellX: 2, cellY: 15, width: 12, height: 1, swatch: 1 },
            { cellX: 15, cellY: 2, width: 1, height: 12, swatch: 1 },
            { cellX: 1, cellY: 1, width: 1, height: 1, swatch: 1 },
            { cellX: 14, cellY: 1, width: 1, height: 1, swatch: 1 },
            { cellX: 1, cellY: 14, width: 1, height: 1, swatch: 1 },
            { cellX: 14, cellY: 14, width: 1, height: 1, swatch: 1 },
            { cellX: 3, cellY: 3, width: 10, height: 6, swatch: 3 },
            { cellX: 4, cellY: 8, width: 8, height: 3, swatch: 3 },
            { cellX: 5, cellY: 10, width: 6, height: 2, swatch: 3 },
            { cellX: 3, cellY: 3, width: 10, height: 1, swatch: 2 },
            { cellX: 3, cellY: 3, width: 1, height: 6, swatch: 2 },
            { cellX: 12, cellY: 3, width: 1, height: 6, swatch: 2 },
            { cellX: 6, cellY: 12, width: 4, height: 1, swatch: 2 },
            { cellX: 4, cellY: 9, width: 1, height: 2, swatch: 2 },
            { cellX: 11, cellY: 9, width: 1, height: 2, swatch: 2 },
            { cellX: 5, cellY: 11, width: 1, height: 1, swatch: 2 },
            { cellX: 10, cellY: 11, width: 1, height: 1, swatch: 2 },
        ],
    };
}
// Creeper face...
// {cellX: 0, cellY: 0, width: 16, height: 16, swatch: 0},
// {cellX: 2, cellY: 2, width: 4, height: 4, swatch: 1},
// {cellX: 10, cellY: 2, width: 4, height: 4, swatch: 1},
// {cellX: 6, cellY: 6, width: 4, height: 6, swatch: 1},
// {cellX: 4, cellY: 8, width: 2, height: 6, swatch: 1},
// {cellX: 10, cellY: 8, width: 2, height: 6, swatch: 1},


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
                obs[triggerId].type == types.ObjectTypes.VEHICLE ||
                obs[triggerId].type == types.ObjectTypes.ENEMY)) {
                if (obs[triggerId].damage) {
                    obs[triggerId].damage(obs, triggerId, spikeTrapDamage, types.DamageTypes.NORMAL);
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
    var utils = __webpack_require__(/*! ../PrefabUtils */ "./Prefabs/PrefabUtils.js");
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
        damage: utils.damage,
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
/* harmony import */ var _Prefabs_Terrain_DeadDummy_template__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../Prefabs/Terrain/DeadDummy.template */ "./Prefabs/Terrain/DeadDummy.template.ts");
/* harmony import */ var _Prefabs_Interactable_HealthPickup_template__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../Prefabs/Interactable/HealthPickup.template */ "./Prefabs/Interactable/HealthPickup.template.ts");
/* harmony import */ var _Prefabs_Interactable_PlayerTypeChanger_template__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../Prefabs/Interactable/PlayerTypeChanger.template */ "./Prefabs/Interactable/PlayerTypeChanger.template.ts");
/* harmony import */ var _Prefabs_Trigger_SpikeTrap_template__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../Prefabs/Trigger/SpikeTrap.template */ "./Prefabs/Trigger/SpikeTrap.template.ts");
/* harmony import */ var _Prefabs_Trigger_InvulnPlatform_template__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../Prefabs/Trigger/InvulnPlatform.template */ "./Prefabs/Trigger/InvulnPlatform.template.ts");
/* harmony import */ var _Prefabs_Vehicle_Car_template__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../Prefabs/Vehicle/Car.template */ "./Prefabs/Vehicle/Car.template.ts");
/* harmony import */ var _Prefabs_Equipment_Binoculars_icon__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../Prefabs/Equipment/Binoculars.icon */ "./Prefabs/Equipment/Binoculars.icon.ts");
/* harmony import */ var _Prefabs_Equipment_Blaster_icon__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../Prefabs/Equipment/Blaster.icon */ "./Prefabs/Equipment/Blaster.icon.ts");
/* harmony import */ var _Prefabs_Equipment_Builder_icon__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../Prefabs/Equipment/Builder.icon */ "./Prefabs/Equipment/Builder.icon.ts");
/* harmony import */ var _Prefabs_Equipment_Scanner_icon__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../Prefabs/Equipment/Scanner.icon */ "./Prefabs/Equipment/Scanner.icon.ts");
/* harmony import */ var _Prefabs_Enemy_Enemy_template__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../Prefabs/Enemy/_Enemy.template */ "./Prefabs/Enemy/_Enemy.template.ts");



























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
                drawStatusEffects(object, renderOffsetX, renderOffsetY, renderSize, cover);
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
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Terrain"].DEAD_DUMMY:
                        env.draw(_Prefabs_Terrain_DeadDummy_template__WEBPACK_IMPORTED_MODULE_16__["deadDummyMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].INTERACTABLE:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Interactable"].HEALTH_PICKUP:
                        env.draw(_Prefabs_Interactable_HealthPickup_template__WEBPACK_IMPORTED_MODULE_17__["healthPickupMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Interactable"].PLAYER_TYPE_CHANGER:
                        env.draw(_Prefabs_Interactable_PlayerTypeChanger_template__WEBPACK_IMPORTED_MODULE_18__["playerTypeChangerMasterPiece"](object, renderOffsetX, renderOffsetY));
                        env.draw(_Prefabs_Interactable_PlayerTypeChanger_template__WEBPACK_IMPORTED_MODULE_18__["littleManMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].TRIGGER:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Trigger"].SPIKE_TRAP:
                        env.draw(_Prefabs_Trigger_SpikeTrap_template__WEBPACK_IMPORTED_MODULE_19__["spikeTrapMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Trigger"].INVULN_PLATFORM:
                        env.draw(_Prefabs_Trigger_InvulnPlatform_template__WEBPACK_IMPORTED_MODULE_20__["invulnPlatformMasterPiece"](object, renderOffsetX, renderOffsetY));
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].VEHICLE:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Vehicle"].CAR:
                        foreground.draw(_Prefabs_Vehicle_Car_template__WEBPACK_IMPORTED_MODULE_21__["carMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].COMBAT_TEXT:
                ui.drawText(object.text, object.x - renderOffsetX, object.y - renderOffsetY, object.size, object.color, object.facing);
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].ENEMY:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Enemy"].TARGET_DUMMY:
                        foreground.draw(_Prefabs_Enemy_Enemy_template__WEBPACK_IMPORTED_MODULE_26__["enemyMasterPiece"](object, renderOffsetX, renderOffsetY));
                        break;
                }
                foreground.draw(_Prefabs_Player_HealthBar_template__WEBPACK_IMPORTED_MODULE_5__["healthBarMasterPiece"](object, renderOffsetX, renderOffsetY, renderSize));
                drawStatusEffects(object, renderOffsetX, renderOffsetY, renderSize, cover);
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
                ui.draw(_Prefabs_Equipment_Blaster_icon__WEBPACK_IMPORTED_MODULE_23__["blasterUIMasterPiece"](renderOffsetX, renderOffsetY));
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["EquipmentTypes"].SCANNER:
                ui.draw(_Prefabs_Equipment_Scanner_icon__WEBPACK_IMPORTED_MODULE_25__["scannerUIMasterPiece"](renderOffsetX, renderOffsetY));
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["EquipmentTypes"].BUILDER:
                ui.draw(_Prefabs_Equipment_Builder_icon__WEBPACK_IMPORTED_MODULE_24__["builderUIMasterPiece"](renderOffsetX, renderOffsetY));
                break;
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["EquipmentTypes"].BINOCULARS:
                ui.draw(_Prefabs_Equipment_Binoculars_icon__WEBPACK_IMPORTED_MODULE_22__["binocularsUIMasterPiece"](renderOffsetX, renderOffsetY));
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
function drawStatusEffects(object, renderOffsetX, renderOffsetY, renderSize, cover) {
    if (Object(_Prefabs_Player_Player__WEBPACK_IMPORTED_MODULE_1__["checkStatusEffect"])(object, _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["StatusEffects"].STUNNED)) {
        cover.draw(_Prefabs_Player_StatusEffects_Stunned_template__WEBPACK_IMPORTED_MODULE_6__["stunnedStatusEffectMasterPiece"](object, renderOffsetX, renderOffsetY, renderSize));
    }
    if (Object(_Prefabs_Player_Player__WEBPACK_IMPORTED_MODULE_1__["checkStatusEffect"])(object, _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["StatusEffects"].INVULNERABLE)) {
        cover.draw(_Prefabs_Player_StatusEffects_Invulnerable_template__WEBPACK_IMPORTED_MODULE_7__["invulnerableStatusEffectMasterPiece"](object, renderOffsetX, renderOffsetY, renderSize));
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
            this.ctx.arc(stroke.cellX * (customRenderSize ? customRenderSize : this.cubeSize), stroke.cellY * (customRenderSize ? customRenderSize : this.cubeSize), Math.min(stroke.width, stroke.height) * (customRenderSize ? customRenderSize : this.cubeSize), 0, Math.PI * 2);
            this.ctx.fill();
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
        // background.drawGrid(gridSize, -renderOffsetX, -renderOffsetY);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vQ29sbGlzaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9PYmplY3RUeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0FiaWxpdGllcy9GaXJlYm9sdC5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0FiaWxpdGllcy9GbGFtZUJhcnJpZXIuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9BYmlsaXRpZXMvRmxhbWVEYXNoLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvQWJpbGl0aWVzL0ZsYW1lUGlsbGFyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvQ29tYmF0VGV4dC9EYW1hZ2VUZXh0LmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvQ29tYmF0VGV4dC9GaXJlRGFtYWdlVGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0NvbWJhdFRleHQvSGVhbFRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9Db21iYXRUZXh0L0ludnVsbmVyYWJsZVRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9Db21iYXRUZXh0L19Db21iYXRUZXh0LmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRW5lbXkvX0VuZW15LmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRW5lbXkvX0VuZW15LnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRXF1aXBtZW50L0Jpbm9jdWxhcnMuaWNvbi50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0VxdWlwbWVudC9CaW5vY3VsYXJzLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRXF1aXBtZW50L0JsYXN0ZXIuaWNvbi50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0VxdWlwbWVudC9CbGFzdGVyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRXF1aXBtZW50L0J1aWxkZXIuaWNvbi50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0VxdWlwbWVudC9CdWlsZGVyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRXF1aXBtZW50L1NjYW5uZXIuaWNvbi50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0VxdWlwbWVudC9TY2FubmVyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvR3JhdmVzdG9uZS9fR3JhdmVzdG9uZS5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0dyYXZlc3RvbmUvX0dyYXZlc3RvbmUudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9JbnRlcmFjdGFibGUvQ2FyRW50ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9JbnRlcmFjdGFibGUvSGVhbHRoUGlja3VwLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvSW50ZXJhY3RhYmxlL0hlYWx0aFBpY2t1cC50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0ludGVyYWN0YWJsZS9QbGF5ZXJUeXBlQ2hhbmdlci5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0ludGVyYWN0YWJsZS9QbGF5ZXJUeXBlQ2hhbmdlci50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0ludGVyYWN0YWJsZS9fSW50ZXJhY3RhYmxlLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL0ZpcmVNYWdlLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL0ZpcmVNYWdlLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL0dvZC5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1BsYXllci9Hb2QudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9QbGF5ZXIvSGVhbHRoQmFyLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL1N0YXR1c0VmZmVjdHMvSW52dWxuZXJhYmxlLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL1N0YXR1c0VmZmVjdHMvU3R1bm5lZC50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1BsYXllci9fUGxheWVyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL19QbGF5ZXIudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9QcmVmYWJVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1ByZWZhYnMuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9Qcm9qZWN0aWxlL0ZpcmVib2x0UHJvamVjdGlsZS5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1Byb2plY3RpbGUvRmlyZWJvbHRQcm9qZWN0aWxlLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUHJvamVjdGlsZS9GbGFtZURhc2hQcm9qZWN0aWxlLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUHJvamVjdGlsZS9GbGFtZURhc2hQcm9qZWN0aWxlLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUHJvamVjdGlsZS9GbGFtZVBpbGxhclByb2plY3RpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9Qcm9qZWN0aWxlL0ZsYW1lUGlsbGFyUHJvamVjdGlsZS50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1Byb2plY3RpbGUvX1Byb2plY3RpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9Qcm9qZWN0aWxlL19Qcm9qZWN0aWxlLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVGVycmFpbi9EZWFkRHVtbXkuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9UZXJyYWluL0RlYWREdW1teS50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1RlcnJhaW4vVHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1RlcnJhaW4vVHJlZS50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1RlcnJhaW4vV2FsbEhvcml6LmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVGVycmFpbi9XYWxsSG9yaXoudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9UZXJyYWluL19UZXJyYWluLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVGVycmFpbi9fVGVycmFpbi50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1RyaWdnZXIvSW52dWxuUGxhdGZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9UcmlnZ2VyL0ludnVsblBsYXRmb3JtLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVHJpZ2dlci9TcGlrZVRyYXAuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9UcmlnZ2VyL1NwaWtlVHJhcC50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1RyaWdnZXIvX1RyaWdnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9WZWhpY2xlL0Nhci5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1ZlaGljbGUvQ2FyLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVmVoaWNsZS9fVmVoaWNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTG91dnJlL0xvdXZyZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUG9wb3ZhL1BvcG92YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFF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V0FBVyxDQUFDLENBQUMsV0FBVyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1SixJQUFJLFFBQVEsR0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1SixJQUFJLE1BQU0sR0FBUSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5SixJQUFJLFFBQVEsR0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU5SixJQUFJLFNBQVMsR0FBRyxRQUFRLElBQUksU0FBUyxHQUFHLE1BQU0sSUFBSSxTQUFTLEdBQUcsUUFBUSxFQUFFO1lBQ3BFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7U0FDM0M7UUFDRCxJQUFJLFFBQVEsR0FBRyxTQUFTLElBQUksUUFBUSxHQUFHLE1BQU0sSUFBSSxRQUFRLEdBQUcsUUFBUSxFQUFFO1lBQ2xFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDMUM7UUFDRCxJQUFJLE1BQU0sR0FBRyxTQUFTLElBQUksTUFBTSxHQUFHLFFBQVEsSUFBSSxNQUFNLEdBQUcsUUFBUSxFQUFFO1lBQzlELEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7U0FDeEM7UUFDRCxJQUFJLFFBQVEsR0FBRyxTQUFTLElBQUksUUFBUSxHQUFHLFFBQVEsSUFBSSxRQUFRLEdBQUcsTUFBTSxFQUFFO1lBQ2xFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDMUM7SUFDTCxDQUFDO0NBQ0o7QUFFRCxxRUFBcUU7QUFDckUsc0JBQXNCLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRztJQUNqQyxPQUFPLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFFRCwrQkFBK0I7QUFDL0IsZ0NBQWdDLEdBQUcsRUFBRSxLQUFLLEVBQUUsVUFBVTtJQUNsRCxJQUFJLEdBQUcsR0FDSCxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7UUFDbEosWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO1FBQ2xKLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUM5SSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQztJQUVuSixJQUFJLEdBQUcsR0FDSCxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsS0FBSyxD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QUM7Z0JBQ1IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsTUFBTSxFQUFFLENBQUM7YUFDWixFQUFFO2dCQUNDLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxDQUFDO2dCQUNULE1BQU0sRUFBRSxDQUFDO2FBQ1osRUFBRTtnQkFDQyxLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsQ0FBQztnQkFDVCxNQUFNLEVBQUUsQ0FBQzthQUNaLEVBQUU7Z0JBQ0MsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsTUFBTSxFQUFFLENBQUM7YUFDWixFQUFFO2dCQUNDLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxDQUFDO2dCQUNULE1BQU0sRUFBRSxDQUFDO2FBQ1osRUFBRTtnQkFDQyxLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsR0FBRztnQkFDVixNQUFNLEVBQUUsQ0FBQztnQkFDVCxNQUFNLEVBQUUsQ0FBQzthQUNaLEVBQUU7Z0JBQ0MsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsTUFBTSxFQUFFLENBQUM7YUFDWixFQUFFO2dCQUNDLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxHQUFHO2dCQUNYLE1BQU0sRUFBRSxDQUFDO2FBQ1osRUFBRTtLQUNOO0FBQ0wsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRUQs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QU0sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbkMsRUFBRTtnQkFDQyxLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsQ0FBQztnQkFDVCxNQUFNLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25DLEVBQUU7Z0JBQ0MsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuQyxFQUFFO2dCQUNDLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxDQUFDO2dCQUNULE1BQU0sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbkMsRUFBRTtnQkFDQyxLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsQ0FBQztnQkFDVCxNQUFNLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25DLEVBQUU7Z0JBQ0MsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuQyxF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RUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDdEQsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDcEQsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDckQsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDckQsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDdEQsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDckQsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDcEQsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDckQsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDckQsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDcEQsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDckQsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDckQsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDcEQsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDckQsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDckQsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUM7U0FDekQ7S0FDSjtBQUNMLENBQUM7QUFFRCxrQkFB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LFFBQVEsRUFBRSxHQUFHLElBQUksRUFBRSxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQ2xGO0lBRUQsbUNBQW1DO0lBQ25DLHFFQUE2QixDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVoRiw0QkFBNEI7SUFDNUIsOERBQXNCLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRW5DLGlCQUFpQjtJQUNqQiw0REFBb0IsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2xILENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsInZhciB0eXBlcyA9IHJlcXVpcmUoXCIuL09iamVjdFR5cGVzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAvLyBDaGVjayBjb2xsaXNpb25zIGJldHdlZW4gYWxsIG9iamVjdHNcbiAgICBjaGVja0NvbGxpc2lvbnM6IChjaGVja1NyYywgb2JzLCByZW5kZXJTaXplLCBjYWxsQmFjaykgPT4ge1xuICAgICAgICB2YXIgc3JjID0gb2JzW2NoZWNrU3JjXTtcblxuICAgICAgICBmb3IgKGlkIGluIG9icykge1xuICAgICAgICAgICAgdmFyIGNoZWNrID0gb2JzW2lkXTtcbiAgICAgICAgICAgIHZhciBjb2xsaXNpb24gPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKGNoZWNrKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzcmMuaGl0Ym94VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkhpdGJveFR5cGVzLlJFQ1Q6XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNoZWNrLmhpdGJveFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkhpdGJveFR5cGVzLlJFQ1Q6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9IGNoZWNrQ29sbGlzaW9uUmVjdFJlY3Qoc3JjLCBjaGVjaywgcmVuZGVyU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuSGl0Ym94VHlwZXMuQ0lSQzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uID0gY2hlY2tDb2xsaXNpb25DaXJjUmVjdChjaGVjaywgc3JjLCByZW5kZXJTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5IaXRib3hUeXBlcy5DSVJDOlxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjaGVjay5oaXRib3hUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5IaXRib3hUeXBlcy5SRUNUOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb24gPSBjaGVja0NvbGxpc2lvbkNpcmNSZWN0KHNyYywgY2hlY2ssIHJlbmRlclNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkhpdGJveFR5cGVzLkNJUkM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9IGNoZWNrQ29sbGlzaW9uQ2lyY0NpcmMoc3JjLCBjaGVjaywgcmVuZGVyU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbGxpc2lvbikgY2FsbEJhY2soY2hlY2tTcmMsIGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gQ2hlY2sgY29sbGlzaW9ucyBiZXR3ZWVuIGFsbCBvYmplY3RzIGJ5IGRpc3RhbmNlXG4gICAgY2hlY2tDb2xsaXNpb25zQnlEaXN0YW5jZTogKGNoZWNrU3JjLCBvYnMsIG1heERpc3QsIGNhbGxCYWNrKSA9PiB7XG4gICAgICAgIHZhciBzcmMgPSBvYnNbY2hlY2tTcmNdO1xuXG4gICAgICAgIGZvciAoaWQgaW4gb2JzKSB7XG4gICAgICAgICAgICB2YXIgY2hlY2sgPSBvYnNbaWRdO1xuXG4gICAgICAgICAgICBpZiAoY2hlY2spIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhzcmMueCAtIGNoZWNrLngsIDIpICtcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coc3JjLnkgLSBjaGVjay55LCAyKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGlzdCA8PSBtYXhEaXN0KSBjYWxsQmFjayhjaGVja1NyYywgaWQsIGRpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBDaGVjayBjb2xsaXNpb25zIGJldHdlZW4gY2xpY2sgbG9jYXRpb24gYW5kIGFsbCBvYmplY3RzXG4gICAgY2hlY2tDbGlja0NvbGxpc2lvbnM6IChjbGlja1gsIGNsaWNrWSwgb2JzLCByZW5kZXJTaXplLCBjYWxsQmFjaykgPT4ge1xuICAgICAgICBmb3IgKGlkIGluIG9icykge1xuICAgICAgICAgICAgdmFyIGNoZWNrID0gb2JzW2lkXTtcblxuICAgICAgICAgICAgaWYgKGNoZWNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHhJbiA9IFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZUluUmFuZ2UoY2xpY2tYLCBjaGVjay54IC0gY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueCArIGNoZWNrLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUpIHx8XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlSW5SYW5nZShjbGlja1gsIGNoZWNrLnggLSBjaGVjay5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay54ICsgY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgeUluID1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWVJblJhbmdlKGNsaWNrWSwgY2hlY2sueSAtIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay55ICsgY2hlY2suaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUpIHx8XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlSW5SYW5nZShjbGlja1ksIGNoZWNrLnkgLSBjaGVjay5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueSArIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplKTtcblxuICAgICAgICAgICAgICAgIGlmICh4SW4gJiYgeUluKSBjYWxsQmFjayhpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHB1c2hCYWNrOiAob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQsIHJlbmRlclNpemUpID0+IHtcbiAgICAgICAgLy8gUHVzaCBvYmplY3QgYmFjayBvdXQgb2YgY29sbGlzaW9uIHRlcnJhaW4gdG93YXJkcyB3aGljaCBldmVyIHNpZGUgaXMgdGhlIGNsb3Nlc3QgdG8gdGhlIHRlcnJhaW4gb2JqZWN0XG4gICAgICAgIHZhciBkaXN0UmlnaHQgICA9IE1hdGguYWJzKChvYnNbY29sbGlzaW9uSWRdLnggLSBvYnNbY29sbGlzaW9uSWRdLmhpdGJveFdpZHRoICogcmVuZGVyU2l6ZSAvIDIpIC0gKG9ic1tzcmNJZF0ueCArIG9ic1tzcmNJZF0uaGl0Ym94V2lkdGggKiByZW5kZXJTaXplIC8gMikpO1xuICAgICAgICB2YXIgZGlzdExlZnQgICAgPSBNYXRoLmFicygob2JzW2NvbGxpc2lvbklkXS54ICsgb2JzW2NvbGxpc2lvbklkXS5oaXRib3hXaWR0aCAqIHJlbmRlclNpemUgLyAyKSAtIChvYnNbc3JjSWRdLnggLSBvYnNbc3JjSWRdLmhpdGJveFdpZHRoICogcmVuZGVyU2l6ZSAvIDIpKTtcbiAgICAgICAgdmFyIGRpc3RVcCAgICAgID0gTWF0aC5hYnMoKG9ic1tjb2xsaXNpb25JZF0ueSArIG9ic1tjb2xsaXNpb25JZF0uaGl0Ym94SGVpZ2h0ICogcmVuZGVyU2l6ZSAvIDIpIC0gKG9ic1tzcmNJZF0ueSAtIG9ic1tzcmNJZF0uaGl0Ym94SGVpZ2h0ICogcmVuZGVyU2l6ZSAvIDIpKTtcbiAgICAgICAgdmFyIGRpc3REb3duICAgID0gTWF0aC5hYnMoKG9ic1tjb2xsaXNpb25JZF0ueSAtIG9ic1tjb2xsaXNpb25JZF0uaGl0Ym94SGVpZ2h0ICogcmVuZGVyU2l6ZSAvIDIpIC0gKG9ic1tzcmNJZF0ueSArIG9ic1tzcmNJZF0uaGl0Ym94SGVpZ2h0ICogcmVuZGVyU2l6ZSAvIDIpKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkaXN0UmlnaHQgPCBkaXN0TGVmdCAmJiBkaXN0UmlnaHQgPCBkaXN0VXAgJiYgZGlzdFJpZ2h0IDwgZGlzdERvd24pIHtcbiAgICAgICAgICAgIG9ic1tzcmNJZF0ueCA9IG9ic1tzcmNJZF0ueCAtIGRpc3RSaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlzdExlZnQgPCBkaXN0UmlnaHQgJiYgZGlzdExlZnQgPCBkaXN0VXAgJiYgZGlzdExlZnQgPCBkaXN0RG93bikge1xuICAgICAgICAgICAgb2JzW3NyY0lkXS54ID0gb2JzW3NyY0lkXS54ICsgZGlzdExlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpc3RVcCA8IGRpc3RSaWdodCAmJiBkaXN0VXAgPCBkaXN0TGVmdCAmJiBkaXN0VXAgPCBkaXN0RG93bikge1xuICAgICAgICAgICAgb2JzW3NyY0lkXS55ID0gb2JzW3NyY0lkXS55ICsgZGlzdFVwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXN0RG93biA8IGRpc3RSaWdodCAmJiBkaXN0RG93biA8IGRpc3RMZWZ0ICYmIGRpc3REb3duIDwgZGlzdFVwKSB7XG4gICAgICAgICAgICBvYnNbc3JjSWRdLnkgPSBvYnNbc3JjSWRdLnkgLSBkaXN0RG93bjtcbiAgICAgICAgfVxuICAgIH0sXG59XG5cbi8vIENvbGxpc2lvbiBkZXRlY3Rpb24gaGVscGVyLCBjaGVja3MgaWYgdmFsdWUgaXMgYmV0d2VlbiBtaW4gYW5kIG1heFxuZnVuY3Rpb24gdmFsdWVJblJhbmdlKHZhbHVlLCBtaW4sIG1heCkgeyBcbiAgICByZXR1cm4gKHZhbHVlID49IG1pbikgJiYgKHZhbHVlIDw9IG1heCk7IFxufVxuXG4vLyBDaGVjayBjb2xsaXNpb246IHJlY3QgLSByZWN0XG5mdW5jdGlvbiBjaGVja0NvbGxpc2lvblJlY3RSZWN0KHNyYywgY2hlY2ssIHJlbmRlclNpemUpIHtcbiAgICB2YXIgeEluID0gXG4gICAgICAgIHZhbHVlSW5SYW5nZShzcmMueCAtIHNyYy5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay54IC0gY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueCArIGNoZWNrLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUpIHx8XG4gICAgICAgIHZhbHVlSW5SYW5nZShzcmMueCArIHNyYy5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay54IC0gY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueCArIGNoZWNrLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUpIHx8XG4gICAgICAgIHZhbHVlSW5SYW5nZShjaGVjay54IC0gY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSwgc3JjLnggLSBzcmMuaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSwgc3JjLnggKyBzcmMuaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSkgfHxcbiAgICAgICAgdmFsdWVJblJhbmdlKGNoZWNrLnggKyBjaGVjay5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBzcmMueCAtIHNyYy5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBzcmMueCArIHNyYy5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplKTtcblxuICAgIHZhciB5SW4gPVxuICAgICAgICB2YWx1ZUluUmFuZ2Uoc3JjLnkgLSBzcmMuaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUsIGNoZWNrLnkgLSBjaGVjay5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueSArIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplKSB8fFxuICAgICAgICB2YWx1ZUluUmFuZ2Uoc3JjLnkgKyBzcmMuaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUsIGNoZWNrLnkgLSBjaGVjay5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueSArIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplKSB8fFxuICAgICAgICB2YWx1ZUluUmFuZ2UoY2hlY2sueSAtIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplLCBzcmMueSAtIHNyYy5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSwgc3JjLnkgKyBzcmMuaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUpIHx8XG4gICAgICAgIHZhbHVlSW5SYW5nZShjaGVjay55ICsgY2hlY2suaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUsIHNyYy55IC0gc3JjLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplLCBzcmMueSArIHNyYy5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSk7XG5cbiAgICByZXR1cm4geEluICYmIHlJbjtcbn1cblxuLy8gQ2hlY2sgY29sbGlzaW9uOiBjaXJjIC0gcmVjdFxuZnVuY3Rpb24gY2hlY2tDb2xsaXNpb25DaXJjUmVjdChzcmMsIGNoZWNrLCByZW5kZXJTaXplKSB7XG4gICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMihcbiAgICAgICAgc3JjLnkgLSBjaGVjay55LFxuICAgICAgICBzcmMueCAtIGNoZWNrLngpO1xuXG4gICAgdmFyIHdpZHRoID0gTWF0aC5hYnMoTWF0aC5jb3MoYW5nbGUpICogc3JjLmhpdGJveFJhZGl1cyAqIDIpO1xuICAgIHZhciBoZWlnaHQgPSBNYXRoLmFicyhNYXRoLnNpbihhbmdsZSkgKiBzcmMuaGl0Ym94UmFkaXVzICogMik7XG5cbiAgICByZXR1cm4gY2hlY2tDb2xsaXNpb25SZWN0UmVjdChcbiAgICAgICAgeyB4OiBzcmMueCwgeTogc3JjLnksIGhpdGJveFdpZHRoOiB3aWR0aCwgaGl0Ym94SGVpZ2h0OiBoZWlnaHQgfSxcbiAgICAgICAgY2hlY2ssXG4gICAgICAgIHJlbmRlclNpemVcbiAgICApO1xufVxuXG4vLyBDaGVjayBjb2xsaXNpb246IGNpcmMgLSBjaXJjXG5mdW5jdGlvbiBjaGVja0NvbGxpc2lvbkNpcmNDaXJjKHNyYywgY2hlY2ssIHJlbmRlclNpemUpIHtcbiAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKFxuICAgICAgICBzcmMueSAtIGNoZWNrLnksXG4gICAgICAgIHNyYy54IC0gY2hlY2sueCk7XG5cbiAgICB2YXIgd2lkdGggPSBNYXRoLmFicyhNYXRoLmNvcyhhbmdsZSkgKiBzcmMuaGl0Ym94UmFkaXVzICogMik7XG4gICAgdmFyIGhlaWdodCA9IE1hdGguYWJzKE1hdGguc2luKGFuZ2xlKSAqIHNyYy5oaXRib3hSYWRpdXMgKiAyKTtcblxuICAgIHJldHVybiBjaGVja0NvbGxpc2lvbkNpcmNSZWN0KFxuICAgICAgICBjaGVjayxcbiAgICAgICAgeyB4OiBzcmMueCwgeTogc3JjLnksIGhpdGJveFdpZHRoOiB3aWR0aCwgaGl0Ym94SGVpZ2h0OiBoZWlnaHQgfSxcbiAgICAgICAgcmVuZGVyU2l6ZVxuICAgICk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBPYmplY3RUeXBlczoge1xuICAgICAgICBQTEFZRVI6IFwicGxheWVyXCIsXG4gICAgICAgIEdSQVZFU1RPTkU6IFwiZ3JhdmVzdG9uZVwiLFxuICAgICAgICBQUk9KRUNUSUxFOiBcInByb2plY3RpbGVcIixcbiAgICAgICAgVEVSUkFJTjogXCJ0ZXJyYWluXCIsXG4gICAgICAgIElOVEVSQUNUQUJMRTogXCJpbnRlcmFjdGFibGVcIixcbiAgICAgICAgVFJJR0dFUjogXCJ0cmlnZ2VyXCIsXG4gICAgICAgIFZFSElDTEU6IFwidmVoaWNsZVwiLFxuICAgICAgICBDT01CQVRfVEVYVDogXCJjb21iYXQtdGV4dFwiLFxuICAgICAgICBFTkVNWTogXCJlbmVteVwiLFxuICAgIH0sXG4gICAgUGxheWVyOiB7XG4gICAgICAgIEhVTUFOOiBcImh1bWFuXCIsXG4gICAgICAgIEdPRDogXCJnb2RcIixcbiAgICAgICAgRklSRV9NQUdFOiBcImZpcmUtbWFnZVwiLFxuICAgIH0sXG4gICAgUHJvamVjdGlsZToge1xuICAgICAgICBCQVNJQ19QUk9KRUNUSUxFOiBcImJhc2ljLXByb2plY3RpbGVcIixcbiAgICAgICAgRklSRUJPTFRfUFJPSkVDVElMRTogXCJmaXJlYm9sdC1wcm9qZWN0aWxlXCIsXG4gICAgICAgIEZMQU1FX1BJTExBUl9QUk9KRUNUSUxFOiBcImZsYW1lLXBpbGxhci1wcm9qZWN0aWxlXCIsXG4gICAgICAgIEZMQU1FX0RBU0hfUFJPSkVDVElMRTogXCJmbGFtZS1kYXNoLXByb2plY3RpbGVcIixcbiAgICB9LFxuICAgIFRlcnJhaW46IHtcbiAgICAgICAgVFJFRTogXCJ0cmVlXCIsXG4gICAgICAgIFdBTExfSE9SSVo6IFwid2FsbC1ob3JpelwiLFxuICAgICAgICBERUFEX0RVTU1ZOiBcImRlYWQtZHVtbXlcIixcbiAgICB9LFxuICAgIEludGVyYWN0YWJsZToge1xuICAgICAgICBIRUFMVEhfUElDS1VQOiBcImhlYWx0aC1waWNrdXBcIixcbiAgICAgICAgQ0FSX0VOVEVSOiBcImNhci1lbnRlclwiLFxuICAgICAgICBQTEFZRVJfVFlQRV9DSEFOR0VSOiBcInBsYXllci10eXBlLWNoYW5nZXJcIixcbiAgICB9LFxuICAgIFRyaWdnZXI6IHtcbiAgICAgICAgU1BJS0VfVFJBUDogXCJzcGlrZS10cmFwXCIsXG4gICAgICAgIElOVlVMTl9QTEFURk9STTogXCJpbnZ1bG4tcGxhdGZvcm1cIixcbiAgICB9LFxuICAgIFZlaGljbGU6IHtcbiAgICAgICAgQ0FSOiBcImNhclwiLFxuICAgIH0sXG4gICAgRXF1aXBtZW50VHlwZXM6IHtcbiAgICAgICAgQkxBU1RFUjogXCJibGFzdGVyXCIsXG4gICAgICAgIFNDQU5ORVI6IFwic2Nhbm5lclwiLFxuICAgICAgICBCVUlMREVSOiBcImJ1aWxkZXJcIixcbiAgICAgICAgQklOT0NVTEFSUzogXCJiaW5vY3VsYXJzXCIsXG4gICAgfSxcbiAgICBBYmlsaXRpZXM6IHtcbiAgICAgICAgRklSRUJPTFQ6IFwiZmlyZWJvbHRcIixcbiAgICAgICAgRkxBTUVfUElMTEFSOiBcImZsYW1lLXBpbGxhclwiLFxuICAgICAgICBGTEFNRV9EQVNIOiBcImZsYW1lLWRhc2hcIixcbiAgICAgICAgRkxBTUVfQkFSUklFUjogXCJmbGFtZS1iYXJyaWVyXCIsXG4gICAgfSxcbiAgICBTdGF0dXNFZmZlY3RzOiB7XG4gICAgICAgIFNUVU5ORUQ6IFwic3R1bm5lZFwiLFxuICAgICAgICBJTlZVTE5FUkFCTEU6IFwiaW52dWxuZXJhYmxlXCIsXG4gICAgfSxcbiAgICBDb21iYXRUZXh0OiB7XG4gICAgICAgIERBTUFHRV9URVhUOiBcImRhbWFnZS10ZXh0XCIsXG4gICAgICAgIEZJUkVfREFNQUdFX1RFWFQ6IFwiZmlyZS1kYW1hZ2UtdGV4dFwiLFxuICAgICAgICBJTlZVTE5FUkFCTEVfVEVYVDogXCJpbnZ1bG5lcmFibGUtdGV4dFwiLFxuICAgICAgICBIRUFMX1RFWFQ6IFwiaGVhbC10ZXh0XCIsXG4gICAgfSxcbiAgICBFbmVteToge1xuICAgICAgICBUQVJHRVRfRFVNTVk6IFwidGFyZ2V0LWR1bW15XCIsXG4gICAgfSxcbiAgICBIaXRib3hUeXBlczoge1xuICAgICAgICBOT05FOiBcIm5vbmVcIixcbiAgICAgICAgUkVDVDogXCJyZWN0XCIsXG4gICAgICAgIENJUkM6IFwiY2lyY1wiLFxuICAgIH0sXG4gICAgRGFtYWdlVHlwZXM6IHtcbiAgICAgICAgTk9STUFMOiBcIm5vcm1hbC1kYW1hZ2VcIixcbiAgICAgICAgRklSRTogXCJmaXJlLWRhbWFnZVwiLFxuICAgIH0sXG59IiwidmFyIGZpcmVib2x0Q29vbGRvd24gPSA2MDA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icykge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuQWJpbGl0aWVzLkZJUkVCT0xULFxuICAgICAgICBjb29sZG93bjogZmlyZWJvbHRDb29sZG93bixcbiAgICAgICAgbGFzdGNhc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FzdDogKG9icywgc291cmNlSWQsIGFiaWxpdHlJbmRleCwgdGFyZ2V0WCwgdGFyZ2V0WSkgPT4ge1xuICAgICAgICAgICAgdmFyIG5ld1RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKCFvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmxhc3RjYXN0XG4gICAgICAgICAgICAgICAgfHwgbmV3VGltZSAtIG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3QgPj0gb2JzW3NvdXJjZUlkXS5hYmlsaXRpZXNbYWJpbGl0eUluZGV4XS5jb29sZG93bikge1xuICAgICAgICAgICAgICAgIG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3QgPSBuZXdUaW1lO1xuICAgICAgICAgICAgICAgIHByZWZhYnMuZ2VuZXJhdGVOZXcob2JzLCBzb3VyY2VJZCwgdGFyZ2V0WCwgdGFyZ2V0WSwgdHlwZXMuT2JqZWN0VHlwZXMuUFJPSkVDVElMRSwgdHlwZXMuUHJvamVjdGlsZS5GSVJFQk9MVF9QUk9KRUNUSUxFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJ2YXIgZmxhbWVCYXJyaWVyQ29vbGRvd24gPSA4MDAwO1xudmFyIGZsYW1lQmFycmllckludnVsbkR1cmF0aW9uID0gNTAwO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLkFiaWxpdGllcy5GTEFNRV9CQVJSSUVSLFxuICAgICAgICBjb29sZG93bjogZmxhbWVCYXJyaWVyQ29vbGRvd24sXG4gICAgICAgIGxhc3RjYXN0OiB1bmRlZmluZWQsXG4gICAgICAgIGNhc3Q6IChvYnMsIHNvdXJjZUlkLCBhYmlsaXR5SW5kZXgsIHRhcmdldFgsIHRhcmdldFkpID0+IHtcbiAgICAgICAgICAgIHZhciBuZXdUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmICghb2JzW3NvdXJjZUlkXS5hYmlsaXRpZXNbYWJpbGl0eUluZGV4XS5sYXN0Y2FzdFxuICAgICAgICAgICAgICAgIHx8IG5ld1RpbWUgLSBvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmxhc3RjYXN0ID49IG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0uY29vbGRvd24pIHtcbiAgICAgICAgICAgICAgICBvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmxhc3RjYXN0ID0gbmV3VGltZTtcbiAgICAgICAgICAgICAgICBvYnNbc291cmNlSWRdLmFkZFN0YXR1c0VmZmVjdChvYnMsIHNvdXJjZUlkLCB0eXBlcy5TdGF0dXNFZmZlY3RzLklOVlVMTkVSQUJMRSwgZmxhbWVCYXJyaWVySW52dWxuRHVyYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsInZhciBmbGFtZURhc2hDb29sZG93biA9IDUwMDA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icykge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuQWJpbGl0aWVzLkZMQU1FX0RBU0gsXG4gICAgICAgIGNvb2xkb3duOiBmbGFtZURhc2hDb29sZG93bixcbiAgICAgICAgbGFzdGNhc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FzdDogKG9icywgc291cmNlSWQsIGFiaWxpdHlJbmRleCwgdGFyZ2V0WCwgdGFyZ2V0WSkgPT4ge1xuICAgICAgICAgICAgdmFyIG5ld1RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKCFvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmxhc3RjYXN0XG4gICAgICAgICAgICAgICAgfHwgbmV3VGltZSAtIG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3QgPj0gb2JzW3NvdXJjZUlkXS5hYmlsaXRpZXNbYWJpbGl0eUluZGV4XS5jb29sZG93bikge1xuICAgICAgICAgICAgICAgIG9ic1tzb3VyY2VJZF0ueCA9IHRhcmdldFg7XG4gICAgICAgICAgICAgICAgb2JzW3NvdXJjZUlkXS55ID0gdGFyZ2V0WTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmxhc3RjYXN0ID0gbmV3VGltZTtcbiAgICAgICAgICAgICAgICBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgc291cmNlSWQsIHRhcmdldFgsIHRhcmdldFksIHR5cGVzLk9iamVjdFR5cGVzLlBST0pFQ1RJTEUsIHR5cGVzLlByb2plY3RpbGUuRkxBTUVfREFTSF9QUk9KRUNUSUxFKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJ2YXIgZmxhbWVQaWxsYXJDb29sZG93biA9IDMwMDA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icykge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuQWJpbGl0aWVzLkZMQU1FX1BJTExBUixcbiAgICAgICAgY29vbGRvd246IGZsYW1lUGlsbGFyQ29vbGRvd24sXG4gICAgICAgIGxhc3RjYXN0OiB1bmRlZmluZWQsXG4gICAgICAgIGNhc3Q6IChvYnMsIHNvdXJjZUlkLCBhYmlsaXR5SW5kZXgsIHRhcmdldFgsIHRhcmdldFkpID0+IHtcbiAgICAgICAgICAgIHZhciBuZXdUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmICghb2JzW3NvdXJjZUlkXS5hYmlsaXRpZXNbYWJpbGl0eUluZGV4XS5sYXN0Y2FzdFxuICAgICAgICAgICAgICAgIHx8IG5ld1RpbWUgLSBvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmxhc3RjYXN0ID49IG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0uY29vbGRvd24pIHtcbiAgICAgICAgICAgICAgICBvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmxhc3RjYXN0ID0gbmV3VGltZTtcbiAgICAgICAgICAgICAgICBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgc291cmNlSWQsIHRhcmdldFgsIHRhcmdldFksIHR5cGVzLk9iamVjdFR5cGVzLlBST0pFQ1RJTEUsIHR5cGVzLlByb2plY3RpbGUuRkxBTUVfUElMTEFSX1BST0pFQ1RJTEUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsInZhciBkYW1hZ2VUZXh0Q29sb3IgPSBcIiM1NTU1NTVGRlwiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgYmFzZSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5Db21iYXRUZXh0LkRBTUFHRV9URVhULFxuICAgICAgICBjb2xvcjogZGFtYWdlVGV4dENvbG9yLFxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGZpcmVEYW1hZ2VUZXh0Q29sb3IgPSBcIiNGRjAwMDBGRlwiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgYmFzZSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5Db21iYXRUZXh0LkZJUkVfREFNQUdFX1RFWFQsXG4gICAgICAgIGNvbG9yOiBmaXJlRGFtYWdlVGV4dENvbG9yLFxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGhlYWxUZXh0Q29sb3IgPSBcIiMwMENDMDBGRlwiO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgYmFzZSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5Db21iYXRUZXh0LkhFQUxfVEVYVCxcbiAgICAgICAgY29sb3I6IGhlYWxUZXh0Q29sb3IsXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJ2YXIgaW52dWxuZXJhYmxlVGV4dENvbG9yID0gXCIjQUFBQTAwODhcIjsgICAgLy8gVE9ETzogTW9yZSB2aXNpYmxlIGNvbG9yLi4uXG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJhc2UsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLkNvbWJhdFRleHQuSU5WVUxORVJBQkxFX1RFWFQsXG4gICAgICAgIGNvbG9yOiBpbnZ1bG5lcmFibGVUZXh0Q29sb3IsXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJ2YXIgY29tYmF0VGV4dEFuaW1hdGlvblNwZWVkID0gMC4xMjtcbnZhciBjb21iYXRUZXh0Rm9udFNpemUgPSA5O1xudmFyIGNvbWJhdFRleHRDb2xvciA9IFwiIzAwMDAwMEZGXCI7XG52YXIgY29tYmF0VGV4dER1cmF0aW9uID0gMjAwO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgcGFyYW1zKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuXG4gICAgY29uc3QgeCA9IG9ic1tzcmNdID8gb2JzW3NyY10ueCArIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIG9ic1tzcmNdLndpZHRoICogNDogcG9zWDtcbiAgICBjb25zdCB5ID0gb2JzW3NyY10gPyBvYnNbc3JjXS55IC0gTWF0aC5yYW5kb20oKSAqIG9ic1tzcmNdLmhlaWdodCAqIDMgLSBvYnNbc3JjXS5oZWlnaHQgKiAzIDogcG9zWTtcbiAgICBjb25zdCBhbmdsZSA9IG9ic1tzcmNdID8gTWF0aC5hdGFuMih5IC0gb2JzW3NyY10ueSwgeCAtIG9ic1tzcmNdLngpIDogMDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLk9iamVjdFR5cGVzLkNPTUJBVF9URVhULFxuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5LFxuICAgICAgICBhbmdsZTogYW5nbGUsXG4gICAgICAgIHRleHQ6IHBhcmFtcy50ZXh0LFxuICAgICAgICBzaXplOiBjb21iYXRUZXh0Rm9udFNpemUsXG4gICAgICAgIGNvbG9yOiBjb21iYXRUZXh0Q29sb3IsXG4gICAgICAgIGZhY2luZzogYW5nbGUgKiAxODAgLyBNYXRoLlBJICsgOTAsXG4gICAgICAgIGluaXRUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgICBkdXJhdGlvbjogY29tYmF0VGV4dER1cmF0aW9uLFxuICAgICAgICBoaXRib3hUeXBlOiB0eXBlcy5IaXRib3hUeXBlcy5OT05FLFxuICAgICAgICBhbmltYXRpb25TcGVlZDogY29tYmF0VGV4dEFuaW1hdGlvblNwZWVkLFxuICAgICAgICB1cGRhdGU6IChvYnMsIHNlbGZJZCwgZGVsdGEpID0+IHtcbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLnZlbG9jaXR5WCA9IE1hdGguY29zKGFuZ2xlKSAqIG9ic1tzZWxmSWRdLmFuaW1hdGlvblNwZWVkO1xuICAgICAgICAgICAgb2JzW3NlbGZJZF0udmVsb2NpdHlZID0gTWF0aC5zaW4oYW5nbGUpICogb2JzW3NlbGZJZF0uYW5pbWF0aW9uU3BlZWQ7XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld1RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgY29uc3QgbGlmZVRpbWUgPSBuZXdUaW1lIC0gb2JzW3NlbGZJZF0uaW5pdFRpbWU7XG5cbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLnggKz0gb2JzW3NlbGZJZF0udmVsb2NpdHlYICogZGVsdGE7XG4gICAgICAgICAgICBvYnNbc2VsZklkXS55ICs9IG9ic1tzZWxmSWRdLnZlbG9jaXR5WSAqIGRlbHRhO1xuXG4gICAgICAgICAgICB2YXIgbmV3T3BhY2l0eSA9IE1hdGgubWF4KCgxIC0gbGlmZVRpbWUgLyBvYnNbc2VsZklkXS5kdXJhdGlvbikgKiAyNTUsIDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMCwgMikucmVwbGFjZShcIi5cIiwgXCJcIik7XG4gICAgICAgICAgICBpZiAobmV3T3BhY2l0eS5sZW5ndGggPD0gMSkgbmV3T3BhY2l0eSA9IFwiMFwiICsgbmV3T3BhY2l0eTtcbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLmNvbG9yID0gb2JzW3NlbGZJZF0uY29sb3Iuc3Vic3RyaW5nKDAsIDcpICsgbmV3T3BhY2l0eTtcblxuICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdICYmIGxpZmVUaW1lID49IG9ic1tzZWxmSWRdLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsInZhciBlbmVteVNwZWVkID0gMC4yO1xudmFyIGVuZW15SGVhbHRoID0gMzAwO1xudmFyIGVuZW15V2lkdGggPSA0O1xudmFyIGVuZW15SGVpZ2h0ID0gNjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIGNvbGxpc2lvbnMgPSByZXF1aXJlKFwiLi4vLi4vQ29sbGlzaW9uc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuICAgIHZhciB1dGlscyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJVdGlsc1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLk9iamVjdFR5cGVzLkVORU1ZLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5FbmVteS5UQVJHRVRfRFVNTVksXG4gICAgICAgIHg6IHBvc1gsXG4gICAgICAgIHk6IHBvc1ksXG4gICAgICAgIHZlbG9jaXR5WDogMCxcbiAgICAgICAgdmVsb2NpdHlZOiAwLFxuICAgICAgICBzcGVlZDogZW5lbXlTcGVlZCxcbiAgICAgICAgd2lkdGg6IGVuZW15V2lkdGgsXG4gICAgICAgIGhlaWdodDogZW5lbXlIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBlbmVteVdpZHRoLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IGVuZW15SGVpZ2h0LFxuICAgICAgICBoZWFsdGg6IGVuZW15SGVhbHRoLFxuICAgICAgICBtYXhIZWFsdGg6IGVuZW15SGVhbHRoLFxuICAgICAgICBzdGF0dXNFZmZlY3RzOiB7IH0sXG4gICAgICAgIGRlYXRocmF0dGxlOiAob2JzLCBzZWxmUmVmKSA9PiB7XG4gICAgICAgICAgICBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgc2VsZlJlZiwgb2JzW3NlbGZSZWZdLngsIG9ic1tzZWxmUmVmXS55ICsgMSAqIG9ic1tzZWxmUmVmXS5oZWlnaHQgLyAzICogcHJlZmFicy5yZW5kZXJTaXplLCB0eXBlcy5PYmplY3RUeXBlcy5URVJSQUlOLCB0eXBlcy5UZXJyYWluLkRFQURfRFVNTVkpO1xuICAgICAgICAgICAgZGVsZXRlIG9ic1tzZWxmUmVmXTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7XG4gICAgICAgICAgICBvYnNbc2VsZklkXS51cGRhdGVTdGF0dXNFZmZlY3RzKG9icywgc2VsZklkKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQ2hlY2sgY29sbGlzaW9ucyB3aXRoIHRlcnJhaW4gYW5kIHJlcG9zaXRpb24gYWNjb3JkaW5nbHlcbiAgICAgICAgICAgIGNvbGxpc2lvbnMuY2hlY2tDb2xsaXNpb25zKHNlbGZJZCwgb2JzLCBwcmVmYWJzLnJlbmRlclNpemUsIChzcmNJZCwgY29sbGlzaW9uSWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob2JzW3NyY0lkXSAmJiBjb2xsaXNpb25JZCAhPSBzcmNJZCl7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob2JzW2NvbGxpc2lvbklkXS50eXBlKSB7ICAgICAgICAvLyBTaG91bGQgY29sbGlkZSB3aXRoIHBsYXllcnM/XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRFUlJBSU46XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuRU5FTVk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5wdXNoQmFjayhvYnMsIHNyY0lkLCBjb2xsaXNpb25JZCwgcHJlZmFicy5yZW5kZXJTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBoZWFsOiAob2JzLCBzZWxmSWQsIGFtb3VudCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhlYWxBbW91bnQgPSBvYnNbc2VsZklkXS5oZWFsdGggKyBhbW91bnQgPj0gb2JzW3NlbGZJZF0ubWF4SGVhbHRoXG4gICAgICAgICAgICAgICAgICAgID8gb2JzW3NlbGZJZF0ubWF4SGVhbHRoIC0gb2JzW3NlbGZJZF0uaGVhbHRoXG4gICAgICAgICAgICAgICAgICAgIDogYW1vdW50O1xuICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLmhlYWx0aCArPSBoZWFsQW1vdW50XG4gICAgICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIHNlbGZJZCwgMCwgMCwgdHlwZXMuT2JqZWN0VHlwZXMuQ09NQkFUX1RFWFQsIHR5cGVzLkNvbWJhdFRleHQuSEVBTF9URVhULCB7IHRleHQ6IFwiK1wiICsgaGVhbEFtb3VudCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGFtYWdlOiAob2JzLCBzZWxmSWQsIGFtb3VudCwgZGFtYWdlVHlwZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoZWNrU3RhdHVzRWZmZWN0KG9icywgc2VsZklkLCB0eXBlcy5TdGF0dXNFZmZlY3RzLklOVlVMTkVSQUJMRSkpIHtcbiAgICAgICAgICAgICAgICBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgc2VsZklkLCAwLCAwLCB0eXBlcy5PYmplY3RUeXBlcy5DT01CQVRfVEVYVCwgdHlwZXMuQ29tYmF0VGV4dC5JTlZVTE5FUkFCTEVfVEVYVCwgeyB0ZXh0OiBcIiogXCIgKyBhbW91bnQgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHV0aWxzLmRhbWFnZShvYnMsIHNlbGZJZCwgYW1vdW50LCBkYW1hZ2VUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlU3RhdHVzRWZmZWN0czogKG9icywgc2VsZklkKSA9PiB7XG4gICAgICAgICAgICB2YXIgbmV3VGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgICAgIHN0YXR1c0VmZmVjdENoZWNrSGVscGVyKG9icywgc2VsZklkLCB0eXBlcy5TdGF0dXNFZmZlY3RzLlNUVU5ORUQsIG5ld1RpbWUpO1xuICAgICAgICAgICAgc3RhdHVzRWZmZWN0Q2hlY2tIZWxwZXIob2JzLCBzZWxmSWQsIHR5cGVzLlN0YXR1c0VmZmVjdHMuSU5WVUxORVJBQkxFLCBuZXdUaW1lKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkU3RhdHVzRWZmZWN0OiAob2JzLCBpZCwgZWZmZWN0LCBkdXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgdmFyIG5ld1RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBPbmx5IHJlcGxhY2UgdGhlIGN1cnJlbnQgc3RhdHVzIGVmZmVjdCBsYXN0IGNhc3QgYW5kIGR1cmF0aW9uIGlmIHRoZSBuZXcgZHVyYXRpb24gaXMgbG9uZ2VyIHRoYW4gd2hhdCdzIGxlZnRcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0gfHxcbiAgICAgICAgICAgICAgICBvYnNbaWRdLnN0YXR1c0VmZmVjdHNbZWZmZWN0XS5kdXJhdGlvbiAtIChuZXdUaW1lIC0gb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0ubGFzdCkgPCBkdXJhdGlvblxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0gPSB7IH07XG4gICAgICAgICAgICAgICAgb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0ubGFzdCA9IG5ld1RpbWU7XG4gICAgICAgICAgICAgICAgb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0uZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBzdGF0dXNFZmZlY3RDaGVja0hlbHBlcihvYnMsIGlkLCBlZmZlY3QsIG5ld1RpbWUpIHtcbiAgICBpZiAoXG4gICAgICAgIG9ic1tpZF0uc3RhdHVzRWZmZWN0c1tlZmZlY3RdICYmXG4gICAgICAgIG5ld1RpbWUgLSBvYnNbaWRdLnN0YXR1c0VmZmVjdHNbZWZmZWN0XS5sYXN0ID49IG9ic1tpZF0uc3RhdHVzRWZmZWN0c1tlZmZlY3RdLmR1cmF0aW9uXG4gICAgKSB7XG4gICAgICAgIGRlbGV0ZSBvYnNbaWRdLnN0YXR1c0VmZmVjdHNbZWZmZWN0XTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrU3RhdHVzRWZmZWN0KG9icywgaWQsIGVmZmVjdCkge1xuICAgIHJldHVybiBvYnNbaWRdLnN0YXR1c0VmZmVjdHNbZWZmZWN0XTtcbn1cblxuZnVuY3Rpb24gY2hlY2tTdGF0dXNFZmZlY3RPYmplY3Qob2JqZWN0LCBlZmZlY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0LnN0YXR1c0VmZmVjdHNbZWZmZWN0XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxuICAgIGNoZWNrU3RhdHVzRWZmZWN0OiBjaGVja1N0YXR1c0VmZmVjdE9iamVjdCxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgZW5lbXkgb2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBlbmVteSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gZW5lbXlNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI0E1MkEyQVwiLCBcIiNGRjAwMDBcIiwgXCIjRkZGRkZGXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IDAsXG4gICAgICAgIHN0cm9rZXM6IFtcbiAgICAgICAgICAgIHtjZWxsWDogMywgY2VsbFk6IDAsIHdpZHRoOiAyLCBoZWlnaHQ6IDEyLCBzd2F0Y2g6IDB9LFxuICAgICAgICAgICAge2NlbGxYOiAwLCBjZWxsWTogNCwgd2lkdGg6IDgsIGhlaWdodDogMiwgc3dhdGNoOiAwfSxcbiAgICAgICAgICAgIHtjZWxsWDogMSwgY2VsbFk6IDMsIHdpZHRoOiA2LCBoZWlnaHQ6IDYsIHN3YXRjaDogMn0sXG4gICAgICAgICAgICB7Y2VsbFg6IDIsIGNlbGxZOiA0LCB3aWR0aDogNCwgaGVpZ2h0OiA0LCBzd2F0Y2g6IDF9LFxuICAgICAgICAgICAge2NlbGxYOiAzLCBjZWxsWTogNSwgd2lkdGg6IDIsIGhlaWdodDogMiwgc3dhdGNoOiAyfSxcbiAgICAgICAgXSxcbiAgICAgICAgY3VzdG9tUmVuZGVyU2l6ZTogMixcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGJpbm9jdWxhcnMgdWkgaWNvblxuICogQHBhcmFtIHBvc1ggSG9yaXpvbnRhbCBpY29uIHBvc2l0aW9uXG4gKiBAcGFyYW0gcG9zWSBWZXJ0aWNhbCBpY29uIHBvc2l0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5vY3VsYXJzVUlNYXN0ZXJQaWVjZShwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjMDAwMDAwXCIsIFwiIzMzMzMzM1wiXSxcbiAgICAgICAgcG9zWDogcG9zWCxcbiAgICAgICAgcG9zWTogcG9zWSxcbiAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgZmFjaW5nOiAtNDUsXG4gICAgICAgIHN0cm9rZXM6IFsge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdXG4gICAgfTtcbn1cbiIsInZhciBiaW5vY3VsYXJzVmlld1JhbmdlID0gMjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBwYXJhbXMgPSB7IH0pIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CSU5PQ1VMQVJTLFxuICAgICAgICB1c2U6IChvYnMsIHNvdXJjZUlkLCB0YXJnZXRYLCB0YXJnZXRZKSA9PiB7IH0sXG4gICAgICAgIG9uRXF1aXA6IChvYnMsIHNvdXJjZUlkKSA9PiB7XG4gICAgICAgICAgICBvYnNbc291cmNlSWRdLnByZXZWaWV3UmFuZ2UgPSBvYnNbc291cmNlSWRdLnZpZXdSYW5nZTtcbiAgICAgICAgICAgIG9ic1tzb3VyY2VJZF0udmlld1JhbmdlID0gYmlub2N1bGFyc1ZpZXdSYW5nZTtcbiAgICAgICAgfSxcbiAgICAgICAgb25EZXF1aXA6IChvYnMsIHNvdXJjZUlkKSA9PiB7XG4gICAgICAgICAgICBvYnNbc291cmNlSWRdLnZpZXdSYW5nZSA9IG9ic1tzb3VyY2VJZF0ucHJldlZpZXdSYW5nZTtcbiAgICAgICAgICAgIGRlbGV0ZSBvYnNbc291cmNlSWRdLnByZXZWaWV3UmFuZ2U7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBibGFzdGVyIHVpIGljb25cbiAqIEBwYXJhbSBwb3NYIEhvcml6b250YWwgaWNvbiBwb3NpdGlvblxuICogQHBhcmFtIHBvc1kgVmVydGljYWwgaWNvbiBwb3NpdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gYmxhc3RlclVJTWFzdGVyUGllY2UocG9zWDogbnVtYmVyLCBwb3NZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzAwMDAwMFwiXSxcbiAgICAgICAgcG9zWDogcG9zWCxcbiAgICAgICAgcG9zWTogcG9zWSxcbiAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgIGhlaWdodDogMixcbiAgICAgICAgZmFjaW5nOiAtNDUsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sXVxuICAgIH07XG59XG4iLCJmdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyA9IHsgfSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuRXF1aXBtZW50VHlwZXMuQkxBU1RFUixcbiAgICAgICAgdXNlOiAob2JzLCBzb3VyY2VJZCwgdGFyZ2V0WCwgdGFyZ2V0WSkgPT4ge1xuICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIHNvdXJjZUlkLCB0YXJnZXRYLCB0YXJnZXRZLCB0eXBlcy5PYmplY3RUeXBlcy5QUk9KRUNUSUxFLCB0eXBlcy5Qcm9qZWN0aWxlLkJBU0lDX1BST0pFQ1RJTEUpO1xuICAgICAgICB9LFxuICAgICAgICBvbkVxdWlwOiAob2JzLCBzb3VyY2VJZCkgPT4geyB9LFxuICAgICAgICBvbkRlcXVpcDogKG9icywgc291cmNlSWQpID0+IHsgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGJ1aWxkZXIgdWkgaWNvblxuICogQHBhcmFtIHBvc1ggSG9yaXpvbnRhbCBpY29uIHBvc2l0aW9uXG4gKiBAcGFyYW0gcG9zWSBWZXJ0aWNhbCBpY29uIHBvc2l0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZGVyVUlNYXN0ZXJQaWVjZShwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjMDAwMDAwXCIsIFwiIzkzNTIwMFwiXSxcbiAgICAgICAgcG9zWDogcG9zWCxcbiAgICAgICAgcG9zWTogcG9zWSxcbiAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgZmFjaW5nOiAtNDUsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sXVxuICAgIH07XG59XG4iLCJmdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyA9IHsgfSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuRXF1aXBtZW50VHlwZXMuQlVJTERFUixcbiAgICAgICAgdXNlOiAob2JzLCBzb3VyY2VJZCwgdGFyZ2V0WCwgdGFyZ2V0WSkgPT4ge1xuICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIHNvdXJjZUlkLCB0YXJnZXRYLCB0YXJnZXRZLCBwYXJhbXMudHlwZSwgcGFyYW1zLnN1YnR5cGUpO1xuICAgICAgICB9LFxuICAgICAgICBvbkVxdWlwOiAob2JzLCBzb3VyY2VJZCkgPT4geyB9LFxuICAgICAgICBvbkRlcXVpcDogKG9icywgc291cmNlSWQpID0+IHsgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIHNjYW5uZXIgdWkgaWNvblxuICogQHBhcmFtIHBvc1ggSG9yaXpvbnRhbCBpY29uIHBvc2l0aW9uXG4gKiBAcGFyYW0gcG9zWSBWZXJ0aWNhbCBpY29uIHBvc2l0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2FubmVyVUlNYXN0ZXJQaWVjZShwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjRkZGRkZGXCIsIFwiIzMzOTlGRlwiXSxcbiAgICAgICAgcG9zWDogcG9zWCxcbiAgICAgICAgcG9zWTogcG9zWSxcbiAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAtMSxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IDUsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sXVxuICAgIH07XG59XG4iLCJmdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyA9IHsgfSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgY29sbGlzaW9ucyA9IHJlcXVpcmUoXCIuLi8uLi9Db2xsaXNpb25zXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5FcXVpcG1lbnRUeXBlcy5TQ0FOTkVSLFxuICAgICAgICB1c2U6IChvYnMsIHNvdXJjZUlkLCB0YXJnZXRYLCB0YXJnZXRZKSA9PiB7XG4gICAgICAgICAgICAvLyBSZXBsYWNlcyBhbGwgYnVpbGRlcnMgd2l0aCB0aGlzIGJ1aWxkIHR5cGUuLi5cbiAgICAgICAgICAgIGNvbGxpc2lvbnMuY2hlY2tDbGlja0NvbGxpc2lvbnModGFyZ2V0WCwgdGFyZ2V0WSwgb2JzLCBwcmVmYWJzLnJlbmRlclNpemUsIChjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYnNbY29sbGlzaW9uSWRdLnN1YnR5cGUgIT0gdHlwZXMuSW50ZXJhY3RhYmxlLkNBUl9FTlRFUikge1xuICAgICAgICAgICAgICAgICAgICBvYnNbc291cmNlSWRdLmVxdWlwbWVudCA9IG9ic1tzb3VyY2VJZF0uZXF1aXBtZW50Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CVUlMREVSKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHByZWZhYnMubmV3RXF1aXBtZW50KG9icywgdHlwZXMuRXF1aXBtZW50VHlwZXMuQlVJTERFUiwgeyB0eXBlOiBvYnNbY29sbGlzaW9uSWRdLnR5cGUsIHN1YnR5cGU6IG9ic1tjb2xsaXNpb25JZF0uc3VidHlwZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25FcXVpcDogKG9icywgc291cmNlSWQpID0+IHsgfSxcbiAgICAgICAgb25EZXF1aXA6IChvYnMsIHNvdXJjZUlkKSA9PiB7IH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGdyYXZlc3RvbmVXaWR0aCA9IDM7XG52YXIgZ3JhdmVzdG9uZUhlaWdodCA9IDQ7XG52YXIgZ3JhdmVzdG9uZUhpdGJveFdpZHRoID0gZ3JhdmVzdG9uZVdpZHRoO1xudmFyIGdyYXZlc3RvbmVIaXRib3hIZWlnaHQgPSBncmF2ZXN0b25lSGVpZ2h0O1xudmFyIGdyYXZlc3RvbmVIZWFsdGggPSA0MDtcbnZhciBncmF2ZXN0b25lVmlld1JhbmdlID0gMSAvIDQ7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uLy4uL0NvbGxpc2lvbnNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICB2YXIgdXRpbHMgPSByZXF1aXJlKFwiLi4vUHJlZmFiVXRpbHNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5PYmplY3RUeXBlcy5HUkFWRVNUT05FLFxuICAgICAgICBzdWJ0eXBlOiBvYnNbc3JjXS5zdWJ0eXBlLFxuICAgICAgICB4OiBwb3NYLFxuICAgICAgICB5OiBwb3NZICsgMSAqIHByZWZhYnMucmVuZGVyU2l6ZSxcbiAgICAgICAgdmVsb2NpdHlYOiAwLFxuICAgICAgICB2ZWxvY2l0eVk6IDAsXG4gICAgICAgIHNwZWVkOiAwLFxuICAgICAgICB3aWR0aDogZ3JhdmVzdG9uZVdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGdyYXZlc3RvbmVIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBncmF2ZXN0b25lSGl0Ym94V2lkdGgsXG4gICAgICAgIGhpdGJveEhlaWdodDogZ3JhdmVzdG9uZUhpdGJveEhlaWdodCxcbiAgICAgICAgaGVhbHRoOiBncmF2ZXN0b25lSGVhbHRoLFxuICAgICAgICBtYXhIZWFsdGg6IGdyYXZlc3RvbmVIZWFsdGgsXG4gICAgICAgIGN1cnJlbnRFcXVpcG1lbnQ6IHVuZGVmaW5lZCxcbiAgICAgICAgZXF1aXBtZW50OiBbXSxcbiAgICAgICAgdmlld1JhbmdlOiBncmF2ZXN0b25lVmlld1JhbmdlLFxuICAgICAgICBkZWF0aHJhdHRsZTogKG9icywgc2VsZlJlZikgPT4ge1xuICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIHNlbGZSZWYsIDAsIDAsIHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUik7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4ge1xuICAgICAgICAgICAgLy8gQ2hlY2sgY29sbGlzaW9ucyB3aXRoIHZlaGljbGVzIGFuZCByZXBvc2l0aW9uIGFjY29yZGluZ2x5XG4gICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9ucyhzZWxmSWQsIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQpe1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9ic1tjb2xsaXNpb25JZF0udHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFB1c2ggb2JqZWN0IGJhY2sgb3V0IG9mIGNvbGxpc2lvbiB2ZWhpY2xlIHRvd2FyZHMgd2hpY2ggZXZlciBzaWRlIGlzIHRoZSBjbG9zZXN0IHRvIHRoZSB2ZWhpY2xlIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnMucHVzaEJhY2sob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQsIHByZWZhYnMucmVuZGVyU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbW91c2VEb3duOiAob2JzLCBtb3VzZUV2ZW50KSA9PiB7IH0sXG4gICAgICAgIG9uUGxheWVySW5wdXQ6IChvYnMsIHNlbGZJZCwgcGxheWVySW5wdXQpID0+IHsgfSxcbiAgICAgICAgZGFtYWdlOiB1dGlscy5kYW1hZ2UsXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBncmF2ZXN0b25lIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgZ3JhdmVzdG9uZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ3JhdmVTdG9uZU1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjODg4ODg4XCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMCxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwLFxuICAgICAgICB9XVxuICAgIH1cbn1cbiIsInZhciBjYXJFbnRlcldpZHRoID0gMjQ7XG52YXIgY2FyRW50ZXJIZWlnaHQgPSAyNDtcbnZhciBjYXJFbnRlckhpdGJveFdpZHRoID0gMjQ7XG52YXIgY2FyRW50ZXJIaXRib3hIZWlnaHQgPSAyNDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuSW50ZXJhY3RhYmxlLkNBUl9FTlRFUixcbiAgICAgICAgd2lkdGg6IGNhckVudGVyV2lkdGgsXG4gICAgICAgIGhlaWdodDogY2FyRW50ZXJIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBjYXJFbnRlckhpdGJveFdpZHRoLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IGNhckVudGVySGl0Ym94SGVpZ2h0LFxuICAgICAgICB2ZWhpY2xlSWQ6IHNyYyxcbiAgICAgICAgb25JbnRlcmFjdDogKG9icywgc2VsZlJlZiwgaW50ZXJhY3RJZCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic1tpbnRlcmFjdElkXSAmJlxuICAgICAgICAgICAgICAgIG9ic1tpbnRlcmFjdElkXS50eXBlID09PSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVIgJiZcbiAgICAgICAgICAgICAgICBvYnNbb2JzW3NlbGZSZWZdLnZlaGljbGVJZF0ucmlkZXIgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvYnNbb2JzW3NlbGZSZWZdLnZlaGljbGVJZF0ucmlkZXIgPSBvYnNbaW50ZXJhY3RJZF07XG4gICAgICAgICAgICAgICAgb2JzW2ludGVyYWN0SWRdID0gb2JzW29ic1tzZWxmUmVmXS52ZWhpY2xlSWRdO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbb2JzW3NlbGZSZWZdLnZlaGljbGVJZF07XG4gICAgICAgICAgICAgICAgb2JzW3NlbGZSZWZdLnZlaGljbGVJZCA9IGludGVyYWN0SWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGhlYWx0aFBpY2t1cFdpZHRoID0gMztcbnZhciBoZWFsdGhQaWNrdXBIZWlnaHQgPSAzO1xudmFyIGhlYWx0aFBpY2t1cEhpdGJveFdpZHRoID0gMztcbnZhciBoZWFsdGhQaWNrdXBIaXRib3hIZWlnaHQgPSAzO1xudmFyIGhlYWx0aFBpY2t1cEhlYWxpbmcgPSA0MDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuSW50ZXJhY3RhYmxlLkhFQUxUSF9QSUNLVVAsXG4gICAgICAgIHdpZHRoOiBoZWFsdGhQaWNrdXBXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBoZWFsdGhQaWNrdXBIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBoZWFsdGhQaWNrdXBIaXRib3hXaWR0aCxcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiBoZWFsdGhQaWNrdXBIaXRib3hIZWlnaHQsXG4gICAgICAgIG9uSW50ZXJhY3Q6IChvYnMsIHNlbGZSZWYsIGludGVyYWN0SWQpID0+IHtcbiAgICAgICAgICAgIGlmIChvYnNbaW50ZXJhY3RJZF0uaGVhbCkge1xuICAgICAgICAgICAgICAgIG9ic1tpbnRlcmFjdElkXS5oZWFsKG9icywgaW50ZXJhY3RJZCwgaGVhbHRoUGlja3VwSGVhbGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgb2JzW3NlbGZSZWZdO1xuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgaGVhbHRoIHBpY2t1cCBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGhlYWx0aCBwaWNrdXAgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhlYWx0aFBpY2t1cE1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjRkZGRkZGXCIsIFwiI0ZGMDAwMFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH1dXG4gICAgfVxufVxuIiwidmFyIHBsYXllclR5cGVDaGFuZ2VyV2lkdGggPSA1O1xudmFyIHBsYXllclR5cGVDaGFuZ2VySGVpZ2h0ID0gNTtcbnZhciBwbGF5ZXJUeXBlQ2hhbmdlckhpdGJveFdpZHRoID0gNTtcbnZhciBwbGF5ZXJUeXBlQ2hhbmdlckhpdGJveEhlaWdodCA9IDU7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlLCBwYXJhbXMgPSB7IH0pIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5JbnRlcmFjdGFibGUuUExBWUVSX1RZUEVfQ0hBTkdFUixcbiAgICAgICAgd2lkdGg6IHBsYXllclR5cGVDaGFuZ2VyV2lkdGgsXG4gICAgICAgIGhlaWdodDogcGxheWVyVHlwZUNoYW5nZXJIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBwbGF5ZXJUeXBlQ2hhbmdlckhpdGJveFdpZHRoLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IHBsYXllclR5cGVDaGFuZ2VySGl0Ym94SGVpZ2h0LFxuICAgICAgICBuZXdQbGF5ZXJUeXBlOiBwYXJhbXMubmV3VHlwZSxcbiAgICAgICAgb25JbnRlcmFjdDogKG9icywgc2VsZlJlZiwgaW50ZXJhY3RJZCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic1tpbnRlcmFjdElkXS50eXBlID09PSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVIgJiYgb2JzW2ludGVyYWN0SWRdLnN1YnR5cGUgIT09IG9ic1tzZWxmUmVmXS5uZXdQbGF5ZXJUeXBlKSB7XG4gICAgICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIGludGVyYWN0SWQsIG9ic1tpbnRlcmFjdElkXS54LCBvYnNbaW50ZXJhY3RJZF0ueSwgdHlwZXMuT2JqZWN0VHlwZXMuUExBWUVSLCBvYnNbc2VsZlJlZl0ubmV3UGxheWVyVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi9PYmplY3RUeXBlc1wiO1xuaW1wb3J0ICogYXMgcHJlZmFicyBmcm9tIFwiLi4vUHJlZmFic1wiO1xuXG5pbXBvcnQgKiBhcyBfcGxheWVyIGZyb20gXCIuLi9QbGF5ZXIvX1BsYXllci50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgZmlyZW1hZ2UgZnJvbSBcIi4uL1BsYXllci9GaXJlTWFnZS50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgZ29kIGZyb20gXCIuLi9QbGF5ZXIvR29kLnRlbXBsYXRlXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgcGxheWVyIHR5cGUgY2hhbmdlciBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHBsYXllciB0eXBlIGNoYW5nZXIgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBsYXllclR5cGVDaGFuZ2VyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHZhciBjdXN0b21SZW5kZXJTaXplID0gMjtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjODg4ODg4XCIsIFwiI2JiYmJiYlwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggKiBwcmVmYWJzLnJlbmRlclNpemUgLyBjdXN0b21SZW5kZXJTaXplLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0ICogcHJlZmFicy5yZW5kZXJTaXplIC8gY3VzdG9tUmVuZGVyU2l6ZSxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IChvYmplY3Qud2lkdGggLSAxKSAqIHByZWZhYnMucmVuZGVyU2l6ZSAvIGN1c3RvbVJlbmRlclNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IChvYmplY3QuaGVpZ2h0IC0gMSkgKiBwcmVmYWJzLnJlbmRlclNpemUgLyBjdXN0b21SZW5kZXJTaXplLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sXSxcbiAgICAgICAgY3VzdG9tUmVuZGVyU2l6ZTogY3VzdG9tUmVuZGVyU2l6ZSxcbiAgICB9XG59XG5cbi8qKlxuICogR2V0IGxpdHRsZSBtYW4gZm9yIHBsYXllciB0eXBlIGNoYW5nZXIgb2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBwbGF5ZXIgdHlwZSBjaGFuZ2VyIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaXR0bGVNYW5NYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgdmFyIG9iakNvcHkgPSBvYmplY3Q7XG4gICAgb2JqQ29weS53aWR0aCA9IDI7XG4gICAgb2JqQ29weS5oZWlnaHQgPSAzO1xuXG4gICAgdmFyIHBsYXllclR5cGVDaGFuZ2VyTWFzdGVyUGllY2UgPSBfcGxheWVyLnBsYXllck1hc3RlclBpZWNlKG9iakNvcHksIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpO1xuICAgIHN3aXRjaCAob2JqZWN0Lm5ld1BsYXllclR5cGUpIHtcbiAgICAgICAgY2FzZSB0eXBlcy5QbGF5ZXIuRklSRV9NQUdFOlxuICAgICAgICAgICAgcGxheWVyVHlwZUNoYW5nZXJNYXN0ZXJQaWVjZSA9IGZpcmVtYWdlLmZpcmVtYWdlUGxheWVyTWFzdGVyUGllY2Uob2JqQ29weSwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0eXBlcy5QbGF5ZXIuR09EOlxuICAgICAgICAgICAgcGxheWVyVHlwZUNoYW5nZXJNYXN0ZXJQaWVjZSA9IGdvZC5nb2RQbGF5ZXJNYXN0ZXJQaWVjZShvYmpDb3B5LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBwbGF5ZXJUeXBlQ2hhbmdlck1hc3RlclBpZWNlLmN1c3RvbVJlbmRlclNpemUgPSAyO1xuXG4gICAgcmV0dXJuIHBsYXllclR5cGVDaGFuZ2VyTWFzdGVyUGllY2U7XG59XG4iLCJmdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLk9iamVjdFR5cGVzLklOVEVSQUNUQUJMRSxcbiAgICAgICAgeDogcG9zWCxcbiAgICAgICAgeTogcG9zWSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7IH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGZpcmVtYWdlU3BlZWQgPSAwLjE4O1xudmFyIGZpcmVtYWdlSGVhbHRoID0gNjQ7XG5cbnZhciBiYXNlRmlyZVRpY2tzRHVyYXRpb24gPSA1MDA7XG52YXIgZmlyZW1hZ2VGaXJlVGlja3NEdXJhdGlvbiA9IDc1MDtcblxudmFyIGZpcmVUaWNrRGFtYWdlID0gNjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5QbGF5ZXIuRklSRV9NQUdFLFxuICAgICAgICBtYXhIZWFsdGg6IGZpcmVtYWdlSGVhbHRoLFxuICAgICAgICBoZWFsdGg6IGZpcmVtYWdlSGVhbHRoLFxuICAgICAgICBzcGVlZDogZmlyZW1hZ2VTcGVlZCxcbiAgICAgICAgZmlyZVRpY2tzRHVyYXRpb246IGZpcmVtYWdlRmlyZVRpY2tzRHVyYXRpb24sXG4gICAgICAgIGFiaWxpdGllczogW1xuICAgICAgICAgICAgcHJlZmFicy5uZXdBYmlsaXR5KG9icywgdHlwZXMuQWJpbGl0aWVzLkZJUkVCT0xUKSxcbiAgICAgICAgICAgIHByZWZhYnMubmV3QWJpbGl0eShvYnMsIHR5cGVzLkFiaWxpdGllcy5GTEFNRV9QSUxMQVIpLFxuICAgICAgICAgICAgcHJlZmFicy5uZXdBYmlsaXR5KG9icywgdHlwZXMuQWJpbGl0aWVzLkZMQU1FX0RBU0gpLFxuICAgICAgICAgICAgcHJlZmFicy5uZXdBYmlsaXR5KG9icywgdHlwZXMuQWJpbGl0aWVzLkZMQU1FX0JBUlJJRVIpLFxuICAgICAgICBdLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5jcmVhc2VGaXJlVGljayhvYnMsIHNvdXJjZUlkLCBhbW91bnQpIHtcbiAgICB2YXIgbmV3VGltZSA9IERhdGUubm93KCk7XG4gICAgaWYgKG9ic1tzb3VyY2VJZF0uZmlyZVRpY2tzICYmIG5ld1RpbWUgLSBvYnNbc291cmNlSWRdLmZpcmVUaWNrc0xhc3RJbmNyZWFzZSA8IG9ic1tzb3VyY2VJZF0uZmlyZVRpY2tzRHVyYXRpb24pIHtcbiAgICAgICAgb2JzW3NvdXJjZUlkXS5maXJlVGlja3MgPSBvYnNbc291cmNlSWRdLmZpcmVUaWNrcyArIGFtb3VudDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvYnNbc291cmNlSWRdLmZpcmVUaWNrcyA9IGFtb3VudDtcbiAgICAgICAgXG4gICAgICAgIGlmICghb2JzW3NvdXJjZUlkXS5maXJlVGlja3NEdXJhdGlvbikge1xuICAgICAgICAgICAgb2JzW3NvdXJjZUlkXS5maXJlVGlja3NEdXJhdGlvbiA9IGJhc2VGaXJlVGlja3NEdXJhdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvYnNbc291cmNlSWRdLmZpcmVUaWNrc0xhc3RJbmNyZWFzZSA9IG5ld1RpbWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbiAgICBpbmNyZWFzZUZpcmVUaWNrOiBpbmNyZWFzZUZpcmVUaWNrLFxuICAgIGZpcmVUaWNrRGFtYWdlOiBmaXJlVGlja0RhbWFnZSxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgZmlyZW1hZ2UgcGxheWVyIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgZmlyZW1hZ2UgcGxheWVyIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlciBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaXJlbWFnZVBsYXllck1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4geyAgICAvLyBTa2luLCAgICAgIFBhbnRzLCAgICAgU2hpcnQsICAgICAgRmFjZVxuICAgICAgICBwYWxldHRlOiBbXCIjRDJCNDhDXCIsIFwiI0E1MkEyQVwiLCBcIiNEQzE0M0NcIiwgXCIjZGJjM2EzXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IDAsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAyLFxuICAgICAgICAgICAgd2lkdGg6IDQsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiA0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogM1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMC41LFxuICAgICAgICAgICAgaGVpZ2h0OiA2LFxuICAgICAgICAgICAgc3dhdGNoOiAyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAyLjUsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAwLjUsXG4gICAgICAgICAgICBoZWlnaHQ6IDYsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAwLjUsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSxdLFxuICAgIH1cbn1cbiIsInZhciBnb2RTcGVlZCA9IDAuMjg7XG52YXIgZ29kSGVhbHRoID0gMzUwO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgYmFzZSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuICAgIFxuICAgIHJldHVybiB7IFxuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5QbGF5ZXIuR09ELFxuICAgICAgICBtYXhIZWFsdGg6IGdvZEhlYWx0aCxcbiAgICAgICAgaGVhbHRoOiBnb2RIZWFsdGgsXG4gICAgICAgIGN1cnJlbnRFcXVpcG1lbnQ6IDAsXG4gICAgICAgIGVxdWlwbWVudDogW1xuICAgICAgICAgICAgcHJlZmFicy5uZXdFcXVpcG1lbnQob2JzLCB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CTEFTVEVSKSxcbiAgICAgICAgICAgIHByZWZhYnMubmV3RXF1aXBtZW50KG9icywgdHlwZXMuRXF1aXBtZW50VHlwZXMuU0NBTk5FUiksXG4gICAgICAgICAgICBwcmVmYWJzLm5ld0VxdWlwbWVudChvYnMsIHR5cGVzLkVxdWlwbWVudFR5cGVzLkJVSUxERVIsIHsgdHlwZTogdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTiwgc3VidHlwZTogdHlwZXMuVGVycmFpbi5UUkVFIH0pLFxuICAgICAgICAgICAgcHJlZmFicy5uZXdFcXVpcG1lbnQob2JzLCB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CSU5PQ1VMQVJTKSxcbiAgICAgICAgXSxcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgZ29kIHBsYXllciBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGdvZCBwbGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdvZFBsYXllck1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjRkYxNDkzODhcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDIsXG4gICAgICAgICAgICB3aWR0aDogNCxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sXSxcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIG9iamVjdCdzIGhlYWx0aCBiYXJcbiAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdCB0aGF0IG5lZWRzIGEgaGVhbHRoIGJhclxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlciBvYmplY3RzXG4gKiBAcGFyYW0gY3ViZVNpemUgVGhlIGN1YmUgcmVuZGVyIHNpemUsIHJlcXVpcmVkIHdoZW4gZHJhd2luZyBmcmVlIGhhbmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhlYWx0aEJhck1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlciwgY3ViZVNpemU6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjMDBhNDAwXCIsIFwiI0ZGMDAwMFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFkgLSAob2JqZWN0LmhlaWdodCArIDIpICogY3ViZVNpemUgLyAyLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LmhlYWx0aCAvIG9iamVjdC5tYXhIZWFsdGggKiBvYmplY3Qud2lkdGggKiBjdWJlU2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogY3ViZVNpemUgKiAzIC8gNCxcbiAgICAgICAgICAgIHN3YXRjaDogKG9iamVjdC5oZWFsdGggPiBvYmplY3QubWF4SGVhbHRoIC8gMykgPyAwIDogMSxcbiAgICAgICAgfSxdLFxuICAgICAgICBjdXN0b21SZW5kZXJTaXplOiAxXG4gICAgfTtcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlLCBTdHJva2VUeXBlcyB9IGZyb20gXCIuLi8uLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGludnVsbmVyYWJsZSBzdGF0dXMgZWZmZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBpbnZ1bG5lcmFibGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludnVsbmVyYWJsZVN0YXR1c0VmZmVjdE1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlciwgcmVuZGVyU2l6ZTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNGRkZGMDA2NlwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IG9iamVjdC53aWR0aCAvIDIsXG4gICAgICAgICAgICBjZWxsWTogb2JqZWN0LmhlaWdodCAvIDIsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwLFxuICAgICAgICAgICAgdHlwZTogU3Ryb2tlVHlwZXMuQ0lSQyxcbiAgICAgICAgfSxdLFxuICAgIH1cbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3Igc3R1bm5lZCBzdGF0dXMgZWZmZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBzdHVubmVkIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHVubmVkU3RhdHVzRWZmZWN0TWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyLCByZW5kZXJTaXplOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI0ZGRkYwMFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIG9iamVjdC5oZWlnaHQgLyAyIC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiA2LFxuICAgICAgICBmYWNpbmc6IDAsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAzLFxuICAgICAgICAgICAgY2VsbFk6IDQsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiA1LFxuICAgICAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDUsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiA0LFxuICAgICAgICAgICAgY2VsbFk6IDIsXG4gICAgICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCBdLFxuICAgICAgICBjdXN0b21SZW5kZXJTaXplOiAyLFxuICAgIH1cbn1cbiIsInZhciBwbGF5ZXJTcGVlZCA9IDAuMjtcbnZhciBwbGF5ZXJIZWFsdGggPSAxMDA7XG52YXIgcGxheWVyV2lkdGggPSA0O1xudmFyIHBsYXllckhlaWdodCA9IDY7XG52YXIgcGxheWVyVmlld1JhbmdlID0gMSAvIDI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uLy4uL0NvbGxpc2lvbnNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICB2YXIgdXRpbHMgPSByZXF1aXJlKFwiLi4vUHJlZmFiVXRpbHNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVIsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLlBsYXllci5IVU1BTixcbiAgICAgICAgeDogcG9zWCxcbiAgICAgICAgeTogcG9zWSxcbiAgICAgICAgdmVsb2NpdHlYOiAwLFxuICAgICAgICB2ZWxvY2l0eVk6IDAsXG4gICAgICAgIHNwZWVkOiBwbGF5ZXJTcGVlZCxcbiAgICAgICAgd2lkdGg6IHBsYXllcldpZHRoLFxuICAgICAgICBoZWlnaHQ6IHBsYXllckhlaWdodCxcbiAgICAgICAgaGl0Ym94VHlwZTogdHlwZXMuSGl0Ym94VHlwZXMuUkVDVCxcbiAgICAgICAgaGl0Ym94V2lkdGg6IHBsYXllcldpZHRoIC0gMixcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiBwbGF5ZXJIZWlnaHQsXG4gICAgICAgIGhlYWx0aDogcGxheWVySGVhbHRoLFxuICAgICAgICBtYXhIZWFsdGg6IHBsYXllckhlYWx0aCxcbiAgICAgICAgY3VycmVudEVxdWlwbWVudDogdW5kZWZpbmVkLFxuICAgICAgICBlcXVpcG1lbnQ6IFsgXSxcbiAgICAgICAgYWJpbGl0aWVzOiBbIF0sXG4gICAgICAgIHN0YXR1c0VmZmVjdHM6IHsgfSxcbiAgICAgICAgdmlld1JhbmdlOiBwbGF5ZXJWaWV3UmFuZ2UsXG4gICAgICAgIGRlYXRocmF0dGxlOiAob2JzLCBzZWxmUmVmKSA9PiB7XG4gICAgICAgICAgICBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgc2VsZlJlZiwgb2JzW3NlbGZSZWZdLngsIG9ic1tzZWxmUmVmXS55LCB0eXBlcy5PYmplY3RUeXBlcy5HUkFWRVNUT05FKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7XG4gICAgICAgICAgICBvYnNbc2VsZklkXS51cGRhdGVTdGF0dXNFZmZlY3RzKG9icywgc2VsZklkKTtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHBsYXllciBtb3ZlbWVudFxuICAgICAgICAgICAgb2JzW3NlbGZJZF0ueCArPSBvYnNbc2VsZklkXS52ZWxvY2l0eVggKiBkZWx0YTtcbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLnkgKz0gb2JzW3NlbGZJZF0udmVsb2NpdHlZICogZGVsdGE7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGNvbGxpc2lvbnMgd2l0aCB0ZXJyYWluIGFuZCByZXBvc2l0aW9uIGFjY29yZGluZ2x5XG4gICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9ucyhzZWxmSWQsIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQpe1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9ic1tjb2xsaXNpb25JZF0udHlwZSkgeyAgICAgICAgLy8gU2hvdWxkIHBsYXllcnMgY29sbGlkZSB3aXRoIG90aGVyIHBsYXllcnM/XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRFUlJBSU46XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5wdXNoQmFjayhvYnMsIHNyY0lkLCBjb2xsaXNpb25JZCwgcHJlZmFicy5yZW5kZXJTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBtb3VzZURvd246IChvYnMsIG1vdXNlRXZlbnQpID0+IHsgICAvLyBQcmltYXJ5IGNsaWNrIGNhc3RzIGZpcnN0IGFiaWxpdHlcbiAgICAgICAgICAgIGlmIChvYnNbbW91c2VFdmVudC5zb3VyY2VJZF0uYWJpbGl0aWVzWzBdICYmICFjaGVja1N0YXR1c0VmZmVjdChvYnMsIG1vdXNlRXZlbnQuc291cmNlSWQsIHR5cGVzLlN0YXR1c0VmZmVjdHMuU1RVTk5FRCkpIHtcbiAgICAgICAgICAgICAgICBvYnNbbW91c2VFdmVudC5zb3VyY2VJZF0uYWJpbGl0aWVzWzBdLmNhc3Qob2JzLCBtb3VzZUV2ZW50LnNvdXJjZUlkLCAwLCBtb3VzZUV2ZW50LnRhcmdldFgsIG1vdXNlRXZlbnQudGFyZ2V0WSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uUGxheWVySW5wdXQ6IChvYnMsIHNlbGZJZCwgcGxheWVySW5wdXQpID0+IHtcbiAgICAgICAgICAgIHBsYXllciA9IG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgaWYgKGNoZWNrU3RhdHVzRWZmZWN0KG9icywgc2VsZklkLCB0eXBlcy5TdGF0dXNFZmZlY3RzLlNUVU5ORUQpKSB7XG4gICAgICAgICAgICAgICAgIHBsYXllci52ZWxvY2l0eVggPSAwO1xuICAgICAgICAgICAgICAgICBwbGF5ZXIudmVsb2NpdHlZID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHhEaXIgPSAwO1xuICAgICAgICAgICAgICAgIHZhciB5RGlyID0gMDtcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAocGxheWVySW5wdXQubGVmdCkge1xuICAgICAgICAgICAgICAgICAgICB4RGlyIC09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5yaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB4RGlyICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC51cCkge1xuICAgICAgICAgICAgICAgICAgICB5RGlyIC09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5kb3duKSB7XG4gICAgICAgICAgICAgICAgICAgIHlEaXIgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgcGxheWVyLnZlbG9jaXR5WCA9IHhEaXIgKiBwbGF5ZXIuc3BlZWQ7XG4gICAgICAgICAgICAgICAgcGxheWVyLnZlbG9jaXR5WSA9IHlEaXIgKiBwbGF5ZXIuc3BlZWQ7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5jeWNsZUVxdWlwbWVudEZvcndhcmQgJiYgIXBsYXllcklucHV0LmN5Y2xlRXF1aXBtZW50QmFja3dhcmQgJiYgb2JzW3NlbGZJZF0uY3VycmVudEVxdWlwbWVudCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmVxdWlwbWVudFtwbGF5ZXIuY3VycmVudEVxdWlwbWVudF0ub25EZXF1aXAob2JzLCBzZWxmSWQpO1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuY3VycmVudEVxdWlwbWVudCA9IHBsYXllci5jdXJyZW50RXF1aXBtZW50ICsgMSA+PSBwbGF5ZXIuZXF1aXBtZW50Lmxlbmd0aCA/IDAgOiBwbGF5ZXIuY3VycmVudEVxdWlwbWVudCArIDE7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5lcXVpcG1lbnRbcGxheWVyLmN1cnJlbnRFcXVpcG1lbnRdLm9uRXF1aXAob2JzLCBzZWxmSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGxheWVySW5wdXQuY3ljbGVFcXVpcG1lbnRCYWNrd2FyZCAmJiAhcGxheWVySW5wdXQuY3ljbGVFcXVpcG1lbnRGb3J3YXJkICYmIG9ic1tzZWxmSWRdLmN1cnJlbnRFcXVpcG1lbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5lcXVpcG1lbnRbcGxheWVyLmN1cnJlbnRFcXVpcG1lbnRdLm9uRGVxdWlwKG9icywgc2VsZklkKTtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRFcXVpcG1lbnQgPSBwbGF5ZXIuY3VycmVudEVxdWlwbWVudCAtIDEgPCAwID8gcGxheWVyLmVxdWlwbWVudC5sZW5ndGggLSAxIDogcGxheWVyLmN1cnJlbnRFcXVpcG1lbnQgLSAxO1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZXF1aXBtZW50W3BsYXllci5jdXJyZW50RXF1aXBtZW50XS5vbkVxdWlwKG9icywgc2VsZklkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllcklucHV0LnVzZUVxdWlwbWVudCAmJiBvYnNbc2VsZklkXS5jdXJyZW50RXF1aXBtZW50ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS5lcXVpcG1lbnRbb2JzW3NlbGZJZF0uY3VycmVudEVxdWlwbWVudF1cbiAgICAgICAgICAgICAgICAgICAgICAgIC51c2Uob2JzLCBzZWxmSWQsIHBsYXllcklucHV0LnRhcmdldFgsIHBsYXllcklucHV0LnRhcmdldFkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICBpZiAocGxheWVySW5wdXQuYWJpbGl0eTEgJiYgb2JzW3NlbGZJZF0uYWJpbGl0aWVzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLmFiaWxpdGllc1swXS5jYXN0KG9icywgc2VsZklkLCAwLCBwbGF5ZXJJbnB1dC50YXJnZXRYLCBwbGF5ZXJJbnB1dC50YXJnZXRZKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllcklucHV0LmFiaWxpdHkyICYmIG9ic1tzZWxmSWRdLmFiaWxpdGllc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS5hYmlsaXRpZXNbMV0uY2FzdChvYnMsIHNlbGZJZCwgMSwgcGxheWVySW5wdXQudGFyZ2V0WCwgcGxheWVySW5wdXQudGFyZ2V0WSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5hYmlsaXR5MyAmJiBvYnNbc2VsZklkXS5hYmlsaXRpZXNbMl0pIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0uYWJpbGl0aWVzWzJdLmNhc3Qob2JzLCBzZWxmSWQsIDIsIHBsYXllcklucHV0LnRhcmdldFgsIHBsYXllcklucHV0LnRhcmdldFkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGxheWVySW5wdXQuYWJpbGl0eTQgJiYgb2JzW3NlbGZJZF0uYWJpbGl0aWVzWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLmFiaWxpdGllc1szXS5jYXN0KG9icywgc2VsZklkLCAzLCBwbGF5ZXJJbnB1dC50YXJnZXRYLCBwbGF5ZXJJbnB1dC50YXJnZXRZKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5waWNrdXApIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5jaGVja0NvbGxpc2lvbnMoc2VsZklkLCBvYnMsIHByZWZhYnMucmVuZGVyU2l6ZSwgKHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQgJiYgb2JzW2NvbGxpc2lvbklkXS50eXBlID09IHR5cGVzLk9iamVjdFR5cGVzLklOVEVSQUNUQUJMRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tjb2xsaXNpb25JZF0ub25JbnRlcmFjdChvYnMsIGNvbGxpc2lvbklkLCBzcmNJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaGVhbDogKG9icywgc2VsZklkLCBhbW91bnQpID0+IHtcbiAgICAgICAgICAgIGlmIChvYnNbc2VsZklkXSkge1xuICAgICAgICAgICAgICAgIHZhciBoZWFsQW1vdW50ID0gb2JzW3NlbGZJZF0uaGVhbHRoICsgYW1vdW50ID49IG9ic1tzZWxmSWRdLm1heEhlYWx0aFxuICAgICAgICAgICAgICAgICAgICA/IG9ic1tzZWxmSWRdLm1heEhlYWx0aCAtIG9ic1tzZWxmSWRdLmhlYWx0aFxuICAgICAgICAgICAgICAgICAgICA6IGFtb3VudDtcbiAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS5oZWFsdGggKz0gaGVhbEFtb3VudFxuICAgICAgICAgICAgICAgIHByZWZhYnMuZ2VuZXJhdGVOZXcob2JzLCBzZWxmSWQsIDAsIDAsIHR5cGVzLk9iamVjdFR5cGVzLkNPTUJBVF9URVhULCB0eXBlcy5Db21iYXRUZXh0LkhFQUxfVEVYVCwgeyB0ZXh0OiBcIitcIiArIGhlYWxBbW91bnQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRhbWFnZTogKG9icywgc2VsZklkLCBhbW91bnQsIGRhbWFnZVR5cGUpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGVja1N0YXR1c0VmZmVjdChvYnMsIHNlbGZJZCwgdHlwZXMuU3RhdHVzRWZmZWN0cy5JTlZVTE5FUkFCTEUpKSB7XG4gICAgICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIHNlbGZJZCwgMCwgMCwgdHlwZXMuT2JqZWN0VHlwZXMuQ09NQkFUX1RFWFQsIHR5cGVzLkNvbWJhdFRleHQuSU5WVUxORVJBQkxFX1RFWFQsIHsgdGV4dDogXCIqIFwiICsgYW1vdW50IH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1dGlscy5kYW1hZ2Uob2JzLCBzZWxmSWQsIGFtb3VudCwgZGFtYWdlVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZVN0YXR1c0VmZmVjdHM6IChvYnMsIHNlbGZJZCkgPT4ge1xuICAgICAgICAgICAgdmFyIG5ld1RpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgICAgICBzdGF0dXNFZmZlY3RDaGVja0hlbHBlcihvYnMsIHNlbGZJZCwgdHlwZXMuU3RhdHVzRWZmZWN0cy5TVFVOTkVELCBuZXdUaW1lKTtcbiAgICAgICAgICAgIHN0YXR1c0VmZmVjdENoZWNrSGVscGVyKG9icywgc2VsZklkLCB0eXBlcy5TdGF0dXNFZmZlY3RzLklOVlVMTkVSQUJMRSwgbmV3VGltZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZFN0YXR1c0VmZmVjdDogKG9icywgaWQsIGVmZmVjdCwgZHVyYXRpb24pID0+IHtcbiAgICAgICAgICAgIHZhciBuZXdUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gT25seSByZXBsYWNlIHRoZSBjdXJyZW50IHN0YXR1cyBlZmZlY3QgbGFzdCBjYXN0IGFuZCBkdXJhdGlvbiBpZiB0aGUgbmV3IGR1cmF0aW9uIGlzIGxvbmdlciB0aGFuIHdoYXQncyBsZWZ0XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIW9ic1tpZF0uc3RhdHVzRWZmZWN0c1tlZmZlY3RdIHx8XG4gICAgICAgICAgICAgICAgb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0uZHVyYXRpb24gLSAobmV3VGltZSAtIG9ic1tpZF0uc3RhdHVzRWZmZWN0c1tlZmZlY3RdLmxhc3QpIDwgZHVyYXRpb25cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG9ic1tpZF0uc3RhdHVzRWZmZWN0c1tlZmZlY3RdID0geyB9O1xuICAgICAgICAgICAgICAgIG9ic1tpZF0uc3RhdHVzRWZmZWN0c1tlZmZlY3RdLmxhc3QgPSBuZXdUaW1lO1xuICAgICAgICAgICAgICAgIG9ic1tpZF0uc3RhdHVzRWZmZWN0c1tlZmZlY3RdLmR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gc3RhdHVzRWZmZWN0Q2hlY2tIZWxwZXIob2JzLCBpZCwgZWZmZWN0LCBuZXdUaW1lKSB7XG4gICAgaWYgKFxuICAgICAgICBvYnNbaWRdLnN0YXR1c0VmZmVjdHNbZWZmZWN0XSAmJlxuICAgICAgICBuZXdUaW1lIC0gb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0ubGFzdCA+PSBvYnNbaWRdLnN0YXR1c0VmZmVjdHNbZWZmZWN0XS5kdXJhdGlvblxuICAgICkge1xuICAgICAgICBkZWxldGUgb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjaGVja1N0YXR1c0VmZmVjdChvYnMsIGlkLCBlZmZlY3QpIHtcbiAgICByZXR1cm4gb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF07XG59XG5cbmZ1bmN0aW9uIGNoZWNrU3RhdHVzRWZmZWN0T2JqZWN0KG9iamVjdCwgZWZmZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdC5zdGF0dXNFZmZlY3RzW2VmZmVjdF07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbiAgICBjaGVja1N0YXR1c0VmZmVjdDogY2hlY2tTdGF0dXNFZmZlY3RPYmplY3QsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIHBsYXllciBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHBsYXllciBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNhYmFiOWFcIiwgXCIjNzc1MDUwXCIsIFwiI0FBQUFBQVwiLCBcIiMwMDAwODBcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDIsXG4gICAgICAgICAgICB3aWR0aDogNCxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogM1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAzLFxuICAgICAgICAgICAgY2VsbFk6IDMsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH1dLFxuICAgIH1cbn1cbiIsInZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi9PYmplY3RUeXBlc1wiKTtcbnZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4vUHJlZmFic1wiKTtcblxuZnVuY3Rpb24gZGFtYWdlKG9icywgc2VsZklkLCBhbW91bnQsIGRhbWFnZVR5cGUpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi9QcmVmYWJzXCIpO1xuXG4gICAgb2JzW3NlbGZJZF0uaGVhbHRoIC09IGFtb3VudDtcblxuICAgIHZhciB0ZXh0VHlwZSA9IHVuZGVmaW5lZDtcbiAgICBzd2l0Y2ggKGRhbWFnZVR5cGUpIHtcbiAgICAgICAgY2FzZSB0eXBlcy5EYW1hZ2VUeXBlcy5OT1JNQUw6XG4gICAgICAgICAgICB0ZXh0VHlwZSA9IHR5cGVzLkNvbWJhdFRleHQuREFNQUdFX1RFWFQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0eXBlcy5EYW1hZ2VUeXBlcy5GSVJFOlxuICAgICAgICAgICAgdGV4dFR5cGUgPSB0eXBlcy5Db21iYXRUZXh0LkZJUkVfREFNQUdFX1RFWFQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHRleHRUeXBlKSBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgc2VsZklkLCAwLCAwLCB0eXBlcy5PYmplY3RUeXBlcy5DT01CQVRfVEVYVCwgdGV4dFR5cGUsIHsgdGV4dDogXCItXCIgKyBhbW91bnQgfSk7XG5cbiAgICBpZiAob2JzW3NlbGZJZF0uaGVhbHRoIDw9IDApe1xuICAgICAgICBvYnNbc2VsZklkXS5kZWF0aHJhdHRsZShvYnMsIHNlbGZJZCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkYW1hZ2U6IGRhbWFnZSxcbn1cbiIsInZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi9PYmplY3RUeXBlc1wiKTtcbnZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uL0NvbGxpc2lvbnNcIik7XG52YXIgdXRpbHMgPSByZXF1aXJlKFwiLi9QcmVmYWJVdGlsc1wiKTtcblxuLy8gLS0tLS0gUHJlZmFicyAtLS0tLSAvL1xudmFyIF9wbGF5ZXIgPSByZXF1aXJlKFwiLi9QbGF5ZXIvX1BsYXllclwiKTtcbnZhciBnb2QgPSByZXF1aXJlKFwiLi9QbGF5ZXIvR29kXCIpO1xudmFyIGZpcmVtYWdlID0gcmVxdWlyZShcIi4vUGxheWVyL0ZpcmVNYWdlXCIpO1xuXG52YXIgX2dyYXZlc3RvbmUgPSByZXF1aXJlKFwiLi9HcmF2ZXN0b25lL19HcmF2ZXN0b25lXCIpO1xuXG52YXIgX3Byb2plY3RpbGUgPSByZXF1aXJlKFwiLi9Qcm9qZWN0aWxlL19Qcm9qZWN0aWxlXCIpO1xudmFyIGZpcmVib2x0UHJvamVjdGlsZSA9IHJlcXVpcmUoXCIuL1Byb2plY3RpbGUvRmlyZWJvbHRQcm9qZWN0aWxlXCIpO1xudmFyIGZsYW1lUGlsbGFyUHJvamVjdGlsZSA9IHJlcXVpcmUoXCIuL1Byb2plY3RpbGUvRmxhbWVQaWxsYXJQcm9qZWN0aWxlXCIpO1xudmFyIGZsYW1lRGFzaFByb2plY3RpbGUgPSByZXF1aXJlKFwiLi9Qcm9qZWN0aWxlL0ZsYW1lRGFzaFByb2plY3RpbGVcIik7XG5cbnZhciBfdGVycmFpbiA9IHJlcXVpcmUoXCIuL1RlcnJhaW4vX1RlcnJhaW5cIik7XG52YXIgdHJlZSA9IHJlcXVpcmUoXCIuL1RlcnJhaW4vVHJlZVwiKTtcbnZhciB3YWxsSG9yaXogPSByZXF1aXJlKFwiLi9UZXJyYWluL1dhbGxIb3JpelwiKTtcbnZhciBkZWFkRHVtbXkgPSByZXF1aXJlKFwiLi9UZXJyYWluL0RlYWREdW1teVwiKTtcblxudmFyIF9pbnRlcmFjdGFibGUgPSByZXF1aXJlKFwiLi9JbnRlcmFjdGFibGUvX0ludGVyYWN0YWJsZVwiKTtcbnZhciBoZWFsdGhQaWNrdXAgPSByZXF1aXJlKFwiLi9JbnRlcmFjdGFibGUvSGVhbHRoUGlja3VwXCIpO1xudmFyIGNhckVudGVyID0gcmVxdWlyZShcIi4vSW50ZXJhY3RhYmxlL0NhckVudGVyXCIpO1xudmFyIHBsYXllclR5cGVDaGFuZ2VyID0gcmVxdWlyZShcIi4vSW50ZXJhY3RhYmxlL1BsYXllclR5cGVDaGFuZ2VyXCIpO1xuXG52YXIgX3RyaWdnZXIgPSByZXF1aXJlKFwiLi9UcmlnZ2VyL19UcmlnZ2VyXCIpO1xudmFyIHNwaWtlVHJhcCA9IHJlcXVpcmUoXCIuL1RyaWdnZXIvU3Bpa2VUcmFwXCIpO1xudmFyIGludnVsblBsYXRmb3JtID0gcmVxdWlyZShcIi4vVHJpZ2dlci9JbnZ1bG5QbGF0Zm9ybVwiKTtcblxudmFyIF92ZWhpY2xlID0gcmVxdWlyZShcIi4vVmVoaWNsZS9fVmVoaWNsZVwiKTtcbnZhciBjYXIgPSByZXF1aXJlKFwiLi9WZWhpY2xlL0NhclwiKTtcblxudmFyIGJsYXN0ZXIgPSByZXF1aXJlKFwiLi9FcXVpcG1lbnQvQmxhc3RlclwiKTtcbnZhciBzY2FubmVyID0gcmVxdWlyZShcIi4vRXF1aXBtZW50L1NjYW5uZXJcIik7XG52YXIgYnVpbGRlciA9IHJlcXVpcmUoXCIuL0VxdWlwbWVudC9CdWlsZGVyXCIpO1xudmFyIGJpbm9jdWxhcnMgPSByZXF1aXJlKFwiLi9FcXVpcG1lbnQvQmlub2N1bGFyc1wiKTtcblxudmFyIGZpcmVib2x0ID0gcmVxdWlyZShcIi4vQWJpbGl0aWVzL0ZpcmVib2x0XCIpO1xudmFyIGZsYW1lUGlsbGFyID0gcmVxdWlyZShcIi4vQWJpbGl0aWVzL0ZsYW1lUGlsbGFyXCIpO1xudmFyIGZsYW1lRGFzaCA9IHJlcXVpcmUoXCIuL0FiaWxpdGllcy9GbGFtZURhc2hcIik7XG52YXIgZmxhbWVCYXJyaWVyID0gcmVxdWlyZShcIi4vQWJpbGl0aWVzL0ZsYW1lQmFycmllclwiKTtcblxudmFyIF9jb21iYXRUZXh0ID0gcmVxdWlyZShcIi4vQ29tYmF0VGV4dC9fQ29tYmF0VGV4dFwiKTtcbnZhciBkYW1hZ2VUZXh0ID0gcmVxdWlyZShcIi4vQ29tYmF0VGV4dC9EYW1hZ2VUZXh0XCIpO1xudmFyIGZpcmVEYW1hZ2VUZXh0ID0gcmVxdWlyZShcIi4vQ29tYmF0VGV4dC9GaXJlRGFtYWdlVGV4dFwiKTtcbnZhciBpbnZ1bG5lcmFibGVUZXh0ID0gcmVxdWlyZShcIi4vQ29tYmF0VGV4dC9JbnZ1bG5lcmFibGVUZXh0XCIpO1xudmFyIGhlYWxUZXh0ID0gcmVxdWlyZShcIi4vQ29tYmF0VGV4dC9IZWFsVGV4dFwiKTtcblxudmFyIF9lbmVteSA9IHJlcXVpcmUoXCIuL0VuZW15L19FbmVteVwiKTtcblxuLy8gRXhwb3J0IHJlbmRlciBzaXplXG52YXIgcmVuZGVyU2l6ZSA9IDQ7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHJlbmRlclNpemU6IHJlbmRlclNpemUsXG4gICAgLy8gR2VuZXJhdGUgYSBuZXcgdGVycmFpbiBvYmplY3RcbiAgICBnZW5lcmF0ZU5ldzogKG9icywgc3JjLCBwb3NYLCBwb3NZLCB0eXBlLCBzdWJ0eXBlLCBwYXJhbXMgPSB7IH0pID0+IHtcbiAgICAgICAgdmFyIG5ld09iajtcbiAgICAgICAgXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVI6XG4gICAgICAgICAgICAgICAgbmV3T2JqID0gX3BsYXllci5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUGxheWVyLkdPRDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGdvZC5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlBsYXllci5GSVJFX01BR0U6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmogPSBmaXJlbWFnZS5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvYnNbc3JjXSA9IG5ld09iajtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLkdSQVZFU1RPTkU6XG4gICAgICAgICAgICAgICAgbmV3T2JqID0gX2dyYXZlc3RvbmUuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpO1xuICAgICAgICAgICAgICAgIG9ic1tzcmNdID0gbmV3T2JqO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuUFJPSkVDVElMRTpcbiAgICAgICAgICAgICAgICAvLyBHZW5lcmF0ZSB1bmlxdWUgSWQgZm9yIG5ldyBwcm9qZWN0aWxlXG4gICAgICAgICAgICAgICAgdmFyIG5ld0lkID0gc3JjLmNvbmNhdChcIjpcIiArIHR5cGUgKyBcIjpcIiArIHN1YnR5cGUgKyBcIjpcIiwgcG9zWCwgXCI6XCIsIHBvc1kpO1xuICAgICAgICAgICAgICAgIHZhciBkdXAgPSAwO1xuICAgICAgICAgICAgICAgIHdoaWxlIChvYnNbbmV3SWQuY29uY2F0KFwiOlwiICsgZHVwKV0pe1xuICAgICAgICAgICAgICAgICAgICBkdXArKztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBuZXdPYmogPSBfcHJvamVjdGlsZS5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUHJvamVjdGlsZS5GSVJFQk9MVF9QUk9KRUNUSUxFOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gZmlyZWJvbHRQcm9qZWN0aWxlLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUHJvamVjdGlsZS5GTEFNRV9QSUxMQVJfUFJPSkVDVElMRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGZsYW1lUGlsbGFyUHJvamVjdGlsZS5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlByb2plY3RpbGUuRkxBTUVfREFTSF9QUk9KRUNUSUxFOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gZmxhbWVEYXNoUHJvamVjdGlsZS5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmV3T2JqKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb2JzW25ld0lkLmNvbmNhdChcIjpcIiArIGR1cCldID0gbmV3T2JqO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTjpcbiAgICAgICAgICAgICAgICBuZXdPYmogPSBfdGVycmFpbi5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVGVycmFpbi5UUkVFOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gdHJlZS5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRlcnJhaW4uV0FMTF9IT1JJWjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IHdhbGxIb3Jpei5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRlcnJhaW4uREVBRF9EVU1NWTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGRlYWREdW1teS5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuSU5URVJBQ1RBQkxFOlxuICAgICAgICAgICAgICAgIG5ld09iaiA9IF9pbnRlcmFjdGFibGUuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkludGVyYWN0YWJsZS5IRUFMVEhfUElDS1VQOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gaGVhbHRoUGlja3VwLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuSW50ZXJhY3RhYmxlLkNBUl9FTlRFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGNhckVudGVyLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNbc3JjICsgXCI6XCIgKyB0eXBlICsgXCI6XCIgKyBzdWJ0eXBlXSA9IG5ld09iajtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5JbnRlcmFjdGFibGUuUExBWUVSX1RZUEVfQ0hBTkdFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IHBsYXllclR5cGVDaGFuZ2VyLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmosIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRSSUdHRVI6XG4gICAgICAgICAgICAgICAgbmV3T2JqID0gX3RyaWdnZXIuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRyaWdnZXIuU1BJS0VfVFJBUDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IHNwaWtlVHJhcC5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRyaWdnZXIuSU5WVUxOX1BMQVRGT1JNOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gaW52dWxuUGxhdGZvcm0uZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIG5ld09iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEU6XG4gICAgICAgICAgICAgICAgbmV3T2JqID0gX3ZlaGljbGUuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlZlaGljbGUuQ0FSOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gY2FyLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuQ09NQkFUX1RFWFQ6XG4gICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgdW5pcXVlIElkIGZvciBuZXcgY29tYmF0IHRleHRcbiAgICAgICAgICAgICAgICB2YXIgbmV3SWQgPSBzcmMuY29uY2F0KFwiOlwiICsgdHlwZSArIFwiOlwiICsgc3VidHlwZSArIFwiOlwiLCBwb3NYLCBcIjpcIiwgcG9zWSk7XG4gICAgICAgICAgICAgICAgdmFyIGR1cCA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG9ic1tuZXdJZC5jb25jYXQoXCI6XCIgKyBkdXApXSl7XG4gICAgICAgICAgICAgICAgICAgIGR1cCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdPYmogPSBfY29tYmF0VGV4dC5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgcGFyYW1zKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Db21iYXRUZXh0LkRBTUFHRV9URVhUOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gZGFtYWdlVGV4dC5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkNvbWJhdFRleHQuRklSRV9EQU1BR0VfVEVYVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGZpcmVEYW1hZ2VUZXh0LmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuQ29tYmF0VGV4dC5JTlZVTE5FUkFCTEVfVEVYVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGludnVsbmVyYWJsZVRleHQuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIG5ld09iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Db21iYXRUZXh0LkhFQUxfVEVYVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGhlYWxUZXh0LmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9ic1tuZXdJZC5jb25jYXQoXCI6XCIgKyBkdXApXSA9IG5ld09iajtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLkVORU1ZOlxuICAgICAgICAgICAgICAgIG5ld09iaiA9IF9lbmVteS5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETzogQ29uc2lkZXIgcmVtb3ZpbmcgdGhpcz9cbiAgICAgICAgaWYgKCFuZXdPYmopIHtcbiAgICAgICAgICAgIG5ld09iaiA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlcy5PYmplY3RUeXBlcy5URVJSQUlOLFxuICAgICAgICAgICAgICAgIHN1YnR5cGU6IHN1YnR5cGUsXG4gICAgICAgICAgICAgICAgeDogcG9zWCxcbiAgICAgICAgICAgICAgICB5OiBwb3NZLFxuICAgICAgICAgICAgICAgIHdpZHRoOiA2LFxuICAgICAgICAgICAgICAgIGhlaWdodDogNixcbiAgICAgICAgICAgICAgICBoaXRib3hUeXBlOiB0eXBlcy5IaXRib3hUeXBlcy5SRUNULFxuICAgICAgICAgICAgICAgIGhpdGJveFdpZHRoOiA2LFxuICAgICAgICAgICAgICAgIGhpdGJveEhlaWdodDogNixcbiAgICAgICAgICAgICAgICBoZWFsdGg6IDEsXG4gICAgICAgICAgICAgICAgbWF4SGVhbHRoOiAxLFxuICAgICAgICAgICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4geyB9LFxuICAgICAgICAgICAgICAgIGRhbWFnZTogdXRpbHMuZGFtYWdlLFxuICAgICAgICAgICAgICAgIGRlYXRocmF0dGxlOiAob2JzLCBzZWxmSWQpID0+IHsgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvYnNbc3JjICsgXCI6XCIgKyB0eXBlICsgXCI6XCIgKyBzdWJ0eXBlICsgXCI6XCIgKyBwb3NYICsgXCI6XCIgKyBwb3NZXSA9IG5ld09iajtcbiAgICB9LFxuICAgIG5ld0VxdWlwbWVudDogKG9icywgdHlwZSwgcGFyYW1zID0geyB9KSA9PiB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CTEFTVEVSOlxuICAgICAgICAgICAgICAgIHJldHVybiBibGFzdGVyLmdlbmVyYXRlTmV3KG9icywgcGFyYW1zKTtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuRXF1aXBtZW50VHlwZXMuU0NBTk5FUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gc2Nhbm5lci5nZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyk7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkVxdWlwbWVudFR5cGVzLkJVSUxERVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1aWxkZXIuZ2VuZXJhdGVOZXcob2JzLCBwYXJhbXMpO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CSU5PQ1VMQVJTOlxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5vY3VsYXJzLmdlbmVyYXRlTmV3KG9icywgcGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbmV3QWJpbGl0eTogKG9icywgdHlwZSwgcGFyYW1zID0geyB9KSA9PiB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5BYmlsaXRpZXMuRklSRUJPTFQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpcmVib2x0LmdlbmVyYXRlTmV3KG9icyk7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkFiaWxpdGllcy5GTEFNRV9QSUxMQVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZsYW1lUGlsbGFyLmdlbmVyYXRlTmV3KG9icyk7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkFiaWxpdGllcy5GTEFNRV9EQVNIOlxuICAgICAgICAgICAgICAgIHJldHVybiBmbGFtZURhc2guZ2VuZXJhdGVOZXcob2JzKTtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuQWJpbGl0aWVzLkZMQU1FX0JBUlJJRVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZsYW1lQmFycmllci5nZW5lcmF0ZU5ldyhvYnMpO1xuICAgICAgICB9XG4gICAgfSxcbn0iLCJ2YXIgZmlyZWJvbHRTcGVlZCA9IDAuMzU7XG52YXIgZmlyZWJvbHRXaWR0aCA9IDM7XG52YXIgZmlyZWJvbHRIZWlnaHQgPSAzO1xudmFyIGZpcmVib2x0SGl0Qm94UmFkaXVzID0gMS41O1xudmFyIGZpcmVib2x0RGFtYWdlID0gMTI7XG52YXIgZmlyZWJvbHRUaWNrSW5jcmVhc2UgPSAxO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgYmFzZSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuICAgIHZhciBmaXJlbWFnZSA9IHJlcXVpcmUoXCIuLi9QbGF5ZXIvRmlyZU1hZ2VcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuUHJvamVjdGlsZS5GSVJFQk9MVF9QUk9KRUNUSUxFLFxuICAgICAgICB2ZWxvY2l0eVg6IE1hdGguY29zKGJhc2UuYW5nbGUpICogZmlyZWJvbHRTcGVlZCxcbiAgICAgICAgdmVsb2NpdHlZOiBNYXRoLnNpbihiYXNlLmFuZ2xlKSAqIGZpcmVib2x0U3BlZWQsXG4gICAgICAgIHdpZHRoOiBmaXJlYm9sdFdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGZpcmVib2x0SGVpZ2h0LFxuICAgICAgICBoaXRib3hUeXBlOiB0eXBlcy5IaXRib3hUeXBlcy5DSVJDLFxuICAgICAgICBoaXRib3hSYWRpdXM6IGZpcmVib2x0SGl0Qm94UmFkaXVzLFxuICAgICAgICBkYW1hZ2U6IGZpcmVib2x0RGFtYWdlLFxuICAgICAgICBvbkhpdDogKG9icywgc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9ic1tjb2xsaXNpb25JZF0udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuUExBWUVSOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuR1JBVkVTVE9ORTpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEU6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5URVJSQUlOOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuRU5FTVk6XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYnNbc3JjSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JzW2NvbGxpc2lvbklkXSAmJiBvYnNbY29sbGlzaW9uSWRdLmRhbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVtYWdlLmluY3JlYXNlRmlyZVRpY2soXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9icyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzW3NyY0lkXS5zb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvYnNbY29sbGlzaW9uSWRdLnR5cGUgPT09IHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUiB8fCBvYnNbY29sbGlzaW9uSWRdLnR5cGUgPT09IHR5cGVzLk9iamVjdFR5cGVzLkVORU1ZKSA/IGZpcmVib2x0VGlja0luY3JlYXNlIDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYW1hZ2UgPSBvYnNbc3JjSWRdLmRhbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaXJlRGFtYWdlID0gb2JzW29ic1tzcmNJZF0uc291cmNlXS5maXJlVGlja3MgPyBvYnNbb2JzW3NyY0lkXS5zb3VyY2VdLmZpcmVUaWNrcyAqIGZpcmVtYWdlLmZpcmVUaWNrRGFtYWdlOiAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzW2NvbGxpc2lvbklkXS5kYW1hZ2Uob2JzLCBjb2xsaXNpb25JZCwgZGFtYWdlLCB0eXBlcy5EYW1hZ2VUeXBlcy5OT1JNQUwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaXJlRGFtYWdlICYmIG9ic1tjb2xsaXNpb25JZF0pIG9ic1tjb2xsaXNpb25JZF0uZGFtYWdlKCBvYnMsIGNvbGxpc2lvbklkLCBmaXJlRGFtYWdlLCB0eXBlcy5EYW1hZ2VUeXBlcy5GSVJFKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbc3JjSWRdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBmaXJlYm9sdCBwcm9qZWN0aWxlXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBmaXJlYm9sdCBwcm9qZWN0aWxlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpcmVib2x0UHJvamVjdGlsZU1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjQ0Q1QzVDXCIsIFwiI0ZGOEMwMFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLjUsXG4gICAgICAgICAgICBjZWxsWTogMC41LFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sXVxuICAgIH1cbn1cbiIsInZhciBmbGFtZURhc2hTcGVlZCA9IDAuMTQ7XG52YXIgZmxhbWVEYXNoV2lkdGggPSAyO1xudmFyIGZsYW1lRGFzaEhlaWdodCA9IDI7XG52YXIgZmxhbWVEYXNoSGl0Qm94UmFkaXVzID0gMTtcbnZhciBmbGFtZURhc2hEYW1hZ2UgPSA2O1xudmFyIGZsYW1lRGFzaFRpY2tJbmNyZWFzZSA9IDI7XG52YXIgZmxhbWVEYXNoVHJhY2tpbmdSYWRpdXMgPSAxNTA7XG52YXIgZmxhbWVEYXNoTWF4UHJvakRpc3RhbmNlID0gZmxhbWVEYXNoVHJhY2tpbmdSYWRpdXMgKiAyO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgYmFzZSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuICAgIHZhciBmaXJlbWFnZSA9IHJlcXVpcmUoXCIuLi9QbGF5ZXIvRmlyZU1hZ2VcIik7XG4gICAgdmFyIGNvbGxpc2lvbnMgPSByZXF1aXJlKFwiLi4vLi4vQ29sbGlzaW9uc1wiKTtcblxuICAgIHZhciB0cmFja0lkID0gdW5kZWZpbmVkO1xuICAgIHZhciBzbWFsbGVzdERpc3QgPSB1bmRlZmluZWQ7XG5cbiAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9uc0J5RGlzdGFuY2Uoc3JjLCBvYnMsIGZsYW1lRGFzaFRyYWNraW5nUmFkaXVzLCAoc3JjSWQsIGNvbGxpc2lvbklkLCBkaXN0KSA9PiB7XG4gICAgICAgIGlmIChvYnNbY29sbGlzaW9uSWRdICYmIG9ic1tzcmNJZF0gJiYgc3JjSWQgIT09IGNvbGxpc2lvbklkKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9ic1tjb2xsaXNpb25JZF0udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuUExBWUVSOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuRU5FTVk6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5HUkFWRVNUT05FOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVkVISUNMRTpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRFUlJBSU46XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHJhY2tJZCB8fCBkaXN0IDwgc21hbGxlc3REaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFja0lkID0gY29sbGlzaW9uSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbWFsbGVzdERpc3QgPSBkaXN0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCF0cmFja0lkKSByZXR1cm47XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuUHJvamVjdGlsZS5GTEFNRV9EQVNIX1BST0pFQ1RJTEUsXG4gICAgICAgIHZlbG9jaXR5WDogMCxcbiAgICAgICAgdmVsb2NpdHlZOiAwLFxuICAgICAgICB3aWR0aDogZmxhbWVEYXNoV2lkdGgsXG4gICAgICAgIGhlaWdodDogZmxhbWVEYXNoSGVpZ2h0LFxuICAgICAgICBoaXRib3hUeXBlOiB0eXBlcy5IaXRib3hUeXBlcy5SRUNULFxuICAgICAgICBoaXRib3hXaWR0aDogZmxhbWVEYXNoSGl0Qm94UmFkaXVzLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IGZsYW1lRGFzaEhpdEJveFJhZGl1cyxcbiAgICAgICAgZGFtYWdlOiBmbGFtZURhc2hEYW1hZ2UsXG4gICAgICAgIHRyYWNrSWQ6IHRyYWNrSWQsXG4gICAgICAgIG1heFByb2pEaXN0OiBmbGFtZURhc2hNYXhQcm9qRGlzdGFuY2UsXG4gICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdICYmIG9ic1tvYnNbc2VsZklkXS50cmFja0lkXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoXG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KG9ic1tzZWxmSWRdLnggLSBvYnNbb2JzW3NlbGZJZF0udHJhY2tJZF0ueCwgMikgK1xuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhvYnNbc2VsZklkXS55IC0gb2JzW29ic1tzZWxmSWRdLnRyYWNrSWRdLnksIDIpKTtcblxuICAgICAgICAgICAgICAgIGlmIChkaXN0ID4gZmxhbWVEYXNoVHJhY2tpbmdSYWRpdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIoXG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNbb2JzW3NlbGZJZF0udHJhY2tJZF0ueSAtIG9ic1tzZWxmSWRdLnksXG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNbb2JzW3NlbGZJZF0udHJhY2tJZF0ueCAtIG9ic1tzZWxmSWRdLngpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0udmVsb2NpdHlYID0gTWF0aC5jb3MoYW5nbGUpICogZmxhbWVEYXNoU3BlZWQsXG4gICAgICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLnZlbG9jaXR5WSA9IE1hdGguc2luKGFuZ2xlKSAqIGZsYW1lRGFzaFNwZWVkLFxuXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBwcm9qZWN0aWxlIG1vdmVtZW50XG4gICAgICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLnggKz0gb2JzW3NlbGZJZF0udmVsb2NpdHlYICogZGVsdGE7XG4gICAgICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLnkgKz0gb2JzW3NlbGZJZF0udmVsb2NpdHlZICogZGVsdGE7XG4gICAgICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLmRpc3QgKz0gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3cob2JzW3NlbGZJZF0udmVsb2NpdHlYICogZGVsdGEsIDIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KG9ic1tzZWxmSWRdLnZlbG9jaXR5WSAqIGRlbHRhLCAyKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5jaGVja0NvbGxpc2lvbnMoc2VsZklkLCBvYnMsIHByZWZhYnMucmVuZGVyU2l6ZSwgKHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQgJiYgY29sbGlzaW9uSWQgIT0gb2JzW3NyY0lkXS5zb3VyY2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tzcmNJZF0ub25IaXQob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0uZGlzdCA+IG9ic1tzZWxmSWRdLm1heFByb2pEaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0pIGRlbGV0ZSBvYnNbc2VsZklkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25IaXQ6IChvYnMsIHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChvYnNbY29sbGlzaW9uSWRdLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUjpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLkdSQVZFU1RPTkU6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTjpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLkVORU1ZOlxuICAgICAgICAgICAgICAgICAgICBpZiAob2JzW3NyY0lkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ic1tjb2xsaXNpb25JZF0gJiYgb2JzW2NvbGxpc2lvbklkXS5kYW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlbWFnZS5pbmNyZWFzZUZpcmVUaWNrKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tzcmNJZF0uc291cmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob2JzW2NvbGxpc2lvbklkXS50eXBlID09PSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVIgfHwgb2JzW2NvbGxpc2lvbklkXS50eXBlID09PSB0eXBlcy5PYmplY3RUeXBlcy5FTkVNWSkgPyBmbGFtZURhc2hUaWNrSW5jcmVhc2UgOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhbWFnZSA9IG9ic1tzcmNJZF0uZGFtYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcmVEYW1hZ2UgPSBvYnNbb2JzW3NyY0lkXS5zb3VyY2VdLmZpcmVUaWNrcyA/IG9ic1tvYnNbc3JjSWRdLnNvdXJjZV0uZmlyZVRpY2tzICogZmlyZW1hZ2UuZmlyZVRpY2tEYW1hZ2U6IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNbY29sbGlzaW9uSWRdLmRhbWFnZShvYnMsIGNvbGxpc2lvbklkLCBkYW1hZ2UsIHR5cGVzLkRhbWFnZVR5cGVzLk5PUk1BTCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpcmVEYW1hZ2UgJiYgb2JzW2NvbGxpc2lvbklkXSkgb2JzW2NvbGxpc2lvbklkXS5kYW1hZ2UoIG9icywgY29sbGlzaW9uSWQsIGZpcmVEYW1hZ2UsIHR5cGVzLkRhbWFnZVR5cGVzLkZJUkUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzcmNJZF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGZpcmUgZGFzaCBwcm9qZWN0aWxlXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBmaXJlIGRhc2ggcHJvamVjdGlsZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGFtZURhc2hQcm9qZWN0aWxlTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIGNvbnN0IGN1c3RvbVJlbmRlclNpemUgPSAyO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNDRDVDNUNcIiwgXCIjRkY4QzAwXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQgICogY3VzdG9tUmVuZGVyU2l6ZSxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAqIGN1c3RvbVJlbmRlclNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAuNSxcbiAgICAgICAgICAgIGNlbGxZOiAwLjUsXG4gICAgICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSxdLFxuICAgICAgICBjdXN0b21SZW5kZXJTaXplOiBjdXN0b21SZW5kZXJTaXplLFxuICAgIH1cbn1cbiIsInZhciBmbGFtZVBpbGxhclNwZWVkID0gMDtcbnZhciBmbGFtZVBpbGxhcldpZHRoID0gNjtcbnZhciBmbGFtZVBpbGxhckhlaWdodCA9IDEyO1xudmFyIGZsYW1lUGlsbGFySGl0Qm94V2lkdGggPSA2O1xudmFyIGZsYW1lUGlsbGFySGl0Qm94SGVpZ2h0ID0gMTI7XG52YXIgZmxhbWVQaWxsYXJEYW1hZ2UgPSAxNjtcbnZhciBmbGFtZVBpbGxhclRpY2tJbmNyZWFzZSA9IDI7XG52YXIgZmxhbWVQaWxsYXJTdHVuRHVyYXRpb24gPSAxNTAwO1xuXG52YXIgZmxhbWVQaWxsYXJUcmlnZ2VyRGVsYXkgPSA1MDA7XG52YXIgZmxhbWVQaWxsYXJUaW1lb3V0ID0gMTAwMDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICB2YXIgZmlyZW1hZ2UgPSByZXF1aXJlKFwiLi4vUGxheWVyL0ZpcmVNYWdlXCIpO1xuICAgIHZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uLy4uL0NvbGxpc2lvbnNcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuUHJvamVjdGlsZS5GTEFNRV9QSUxMQVJfUFJPSkVDVElMRSxcbiAgICAgICAgeDogcG9zWCxcbiAgICAgICAgeTogcG9zWSxcbiAgICAgICAgdmVsb2NpdHlYOiBmbGFtZVBpbGxhclNwZWVkLFxuICAgICAgICB2ZWxvY2l0eVk6IGZsYW1lUGlsbGFyU3BlZWQsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgd2lkdGg6IGZsYW1lUGlsbGFyV2lkdGgsXG4gICAgICAgIGhlaWdodDogZmxhbWVQaWxsYXJIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBmbGFtZVBpbGxhckhpdEJveFdpZHRoLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IGZsYW1lUGlsbGFySGl0Qm94SGVpZ2h0LFxuICAgICAgICBkYW1hZ2U6IGZsYW1lUGlsbGFyRGFtYWdlLFxuICAgICAgICBpbml0VGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgdHJpZ2dlcmVkOiBmYWxzZSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7XG4gICAgICAgICAgICB2YXIgbmV3VGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgICAgIC8vIElmIHRpbWVvdXQgaXMgcGFzc2VkLCBkZWxldGUgaXRlbVxuICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdICYmIG5ld1RpbWUgLSBvYnNbc2VsZklkXS5pbml0VGltZSA+PSBmbGFtZVBpbGxhclRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JzW3NlbGZJZF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIHRyaWdnZXIgZGVsYXkgZWxhcHNlZCwgY2hlY2sgZm9yIG9iamVjdCBjb2xsaXNpb25zXG4gICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0gJiYgbmV3VGltZSAtIG9ic1tzZWxmSWRdLmluaXRUaW1lID49IGZsYW1lUGlsbGFyVHJpZ2dlckRlbGF5KSB7XG4gICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0udHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9ucyhzZWxmSWQsIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYnNbc3JjSWRdICYmIGNvbGxpc2lvbklkICE9IHNyY0lkICYmIGNvbGxpc2lvbklkICE9IG9ic1tzcmNJZF0uc291cmNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tzcmNJZF0ub25IaXQob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uSGl0OiAob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAob2JzW2NvbGxpc2lvbklkXS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVI6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5FTkVNWTpcbiAgICAgICAgICAgICAgICAgICAgb2JzW2NvbGxpc2lvbklkXS5hZGRTdGF0dXNFZmZlY3Qob2JzLCBjb2xsaXNpb25JZCwgdHlwZXMuU3RhdHVzRWZmZWN0cy5TVFVOTkVELCBmbGFtZVBpbGxhclN0dW5EdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5HUkFWRVNUT05FOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVkVISUNMRTpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRFUlJBSU46XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYnNbc3JjSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JzW2NvbGxpc2lvbklkXSAmJiBvYnNbY29sbGlzaW9uSWRdLmRhbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVtYWdlLmluY3JlYXNlRmlyZVRpY2soXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9icyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzW3NyY0lkXS5zb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvYnNbY29sbGlzaW9uSWRdLnR5cGUgPT09IHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUiB8fCBvYnNbY29sbGlzaW9uSWRdLnR5cGUgPT09IHR5cGVzLk9iamVjdFR5cGVzLkVORU1ZKSA/IGZsYW1lUGlsbGFyVGlja0luY3JlYXNlIDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYW1hZ2UgPSBvYnNbc3JjSWRdLmRhbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaXJlRGFtYWdlID0gb2JzW29ic1tzcmNJZF0uc291cmNlXS5maXJlVGlja3MgPyBvYnNbb2JzW3NyY0lkXS5zb3VyY2VdLmZpcmVUaWNrcyAqIGZpcmVtYWdlLmZpcmVUaWNrRGFtYWdlOiAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzW2NvbGxpc2lvbklkXS5kYW1hZ2Uob2JzLCBjb2xsaXNpb25JZCwgZGFtYWdlLCB0eXBlcy5EYW1hZ2VUeXBlcy5OT1JNQUwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaXJlRGFtYWdlICYmIG9ic1tjb2xsaXNpb25JZF0pIG9ic1tjb2xsaXNpb25JZF0uZGFtYWdlKCBvYnMsIGNvbGxpc2lvbklkLCBmaXJlRGFtYWdlLCB0eXBlcy5EYW1hZ2VUeXBlcy5GSVJFKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbc3JjSWRdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBmaXJlIHBpbGxhciBwcm9qZWN0aWxlXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBmaXJlIHBpbGxhciBwcm9qZWN0aWxlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGFtZVBpbGxhclByb2plY3RpbGVNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI0U2N0UwMEQ5XCIsIFwiI0ZGNjkzM0Q5XCIsIFwiI0ZGOEMwMEQ5XCIsIFwiI0ZGQTUwMEQ5XCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IG9iamVjdC50cmlnZ2VyZWQgPyAxIDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCAtIDEsXG4gICAgICAgICAgICBzd2F0Y2g6IG9iamVjdC50cmlnZ2VyZWQgPyAxIDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IG9iamVjdC50cmlnZ2VyZWQgPyAzIDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IG9iamVjdC50cmlnZ2VyZWQgPyAzIDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogNCxcbiAgICAgICAgICAgIGNlbGxZOiA1LFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IG9iamVjdC50cmlnZ2VyZWQgPyAzIDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiA3LFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IG9iamVjdC50cmlnZ2VyZWQgPyAzIDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiA4LFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IG9iamVjdC50cmlnZ2VyZWQgPyAzIDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogNCxcbiAgICAgICAgICAgIGNlbGxZOiA5LFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IG9iamVjdC50cmlnZ2VyZWQgPyAzIDogMlxuICAgICAgICB9LF1cbiAgICB9XG59XG4iLCJ2YXIgcHJvamVjdGlsZVdpZHRoID0gMjtcbnZhciBwcm9qZWN0aWxlSGVpZ2h0ID0gMC41O1xudmFyIHByb2plY3RpbGVIaXRCb3hSYWRpdXMgPSAxLjU7XG52YXIgYmFzZVByb2plY3RpbGVEYW1hZ2UgPSAxMDtcbnZhciBwcm9qZWN0aWxlU3BlZWQgPSAwLjc7IFxudmFyIG1heFByb2pEaXN0ID0gMTYwMDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIGNvbGxpc2lvbnMgPSByZXF1aXJlKFwiLi4vLi4vQ29sbGlzaW9uc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMihcbiAgICAgICAgcG9zWSAtIG9ic1tzcmNdLnksXG4gICAgICAgIHBvc1ggLSBvYnNbc3JjXS54KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLk9iamVjdFR5cGVzLlBST0pFQ1RJTEUsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLlByb2plY3RpbGUuQkFTSUNfUFJPSkVDVElMRSxcbiAgICAgICAgc291cmNlOiBzcmMsXG4gICAgICAgIHg6IG9ic1tzcmNdLngsXG4gICAgICAgIHk6IG9ic1tzcmNdLnksXG4gICAgICAgIGFuZ2xlOiBhbmdsZSxcbiAgICAgICAgdmVsb2NpdHlYOiBNYXRoLmNvcyhhbmdsZSkgKiBwcm9qZWN0aWxlU3BlZWQsXG4gICAgICAgIHZlbG9jaXR5WTogTWF0aC5zaW4oYW5nbGUpICogcHJvamVjdGlsZVNwZWVkLFxuICAgICAgICB3aWR0aDogcHJvamVjdGlsZVdpZHRoLFxuICAgICAgICBoZWlnaHQ6IHByb2plY3RpbGVIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBwcm9qZWN0aWxlSGl0Qm94UmFkaXVzLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IHByb2plY3RpbGVIaXRCb3hSYWRpdXMsXG4gICAgICAgIGZhY2luZzogYW5nbGUgKiAxODAgLyBNYXRoLlBJLFxuICAgICAgICBkaXN0OiAwLFxuICAgICAgICBtYXhQcm9qRGlzdDogbWF4UHJvakRpc3QsXG4gICAgICAgIGRhbWFnZTogYmFzZVByb2plY3RpbGVEYW1hZ2UsXG4gICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4ge1xuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHByb2plY3RpbGUgbW92ZW1lbnRcbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLnggKz0gb2JzW3NlbGZJZF0udmVsb2NpdHlYICogZGVsdGE7XG4gICAgICAgICAgICBvYnNbc2VsZklkXS55ICs9IG9ic1tzZWxmSWRdLnZlbG9jaXR5WSAqIGRlbHRhO1xuICAgICAgICAgICAgb2JzW3NlbGZJZF0uZGlzdCArPSBNYXRoLnNxcnQoXG4gICAgICAgICAgICAgICAgTWF0aC5wb3cob2JzW3NlbGZJZF0udmVsb2NpdHlYICogZGVsdGEsIDIpICtcbiAgICAgICAgICAgICAgICBNYXRoLnBvdyhvYnNbc2VsZklkXS52ZWxvY2l0eVkgKiBkZWx0YSwgMikpO1xuXG4gICAgICAgICAgICAvLyBUT0RPOiBDaGFuZ2UgcHJvamVjdGlsZSBjb2xsaXNpb25zIHRvIHJheSBjYXN0XG4gICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9ucyhzZWxmSWQsIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQgJiYgY29sbGlzaW9uSWQgIT0gb2JzW3NyY0lkXS5zb3VyY2Upe1xuICAgICAgICAgICAgICAgICAgICBvYnNbc3JjSWRdLm9uSGl0KG9icywgc3JjSWQsIGNvbGxpc2lvbklkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChvYnNbc2VsZklkXSkge1xuICAgICAgICAgICAgICAgIGlmIChvYnNbc2VsZklkXS5kaXN0ID4gb2JzW3NlbGZJZF0ubWF4UHJvakRpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25IaXQ6IChvYnMsIHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChvYnNbY29sbGlzaW9uSWRdLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUjpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLkVORU1ZOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuR1JBVkVTVE9ORTpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEU6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5URVJSQUlOOlxuICAgICAgICAgICAgICAgICAgICBpZiAob2JzW3NyY0lkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ic1tjb2xsaXNpb25JZF0gJiYgb2JzW2NvbGxpc2lvbklkXS5kYW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNbY29sbGlzaW9uSWRdLmRhbWFnZShvYnMsIGNvbGxpc2lvbklkLCBvYnNbc3JjSWRdLmRhbWFnZSwgdHlwZXMuRGFtYWdlVHlwZXMuTk9STUFMKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbc3JjSWRdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgYmFzaWMgcHJvamVjdGlsZVxuICogQHBhcmFtIG9iamVjdCBUaGUgcHJvamVjdGlsZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0aWxlTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIC8vIFJlbW92ZSBjb21tZW50cyBmb3IgcmFpbmJvdyBidWxsZXRzXG4gICAgICAgIC8vIHBhbGV0dGU6IFtcIiNGRjY2NjZcIiwgXCIjNjZGRjY2XCIsIFwiIzY2NjZGRlwiLCBcIiNGRkZGNjZcIiwgXCIjRkY2NkZGXCIsIFwiIzY2RkZGRlwiXSxcbiAgICAgICAgcGFsZXR0ZTogW1wiIzIyMjIyMlwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICAvLyBzd2F0Y2g6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfV1cbiAgICB9XG59XG4iLCJ2YXIgZGVhZER1bW15V2lkdGggPSA0O1xudmFyIGRlYWREdW1teUhlaWdodCA9IDI7XG52YXIgZGVhZER1bW15SGl0Ym94V2lkdGggPSA0O1xudmFyIGRlYWREdW1teUhpdGJveEhlaWdodCA9IDI7XG52YXIgZGVhZER1bW15SGVhbHRoID0gMTAwMDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5UZXJyYWluLkRFQURfRFVNTVksXG4gICAgICAgIHdpZHRoOiBkZWFkRHVtbXlXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBkZWFkRHVtbXlIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBkZWFkRHVtbXlIaXRib3hXaWR0aCxcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiBkZWFkRHVtbXlIaXRib3hIZWlnaHQsXG4gICAgICAgIGhlYWx0aDogZGVhZER1bW15SGVhbHRoLFxuICAgICAgICBtYXhIZWFsdGg6IGRlYWREdW1teUhlYWx0aCxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7XG4gICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0pIHtcbiAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS5oZWFsdGggLT0gZGVhZER1bW15SGVhbHRoIC8gZGVsdGEgLyA4O1xuICAgICAgICAgICAgICAgIGlmIChvYnNbc2VsZklkXS5oZWFsdGggPD0gMCkgb2JzW3NlbGZJZF0uZGVhdGhyYXR0bGUob2JzLCBzZWxmSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZWF0aHJhdHRsZTogKG9icywgc2VsZklkKSA9PiB7XG4gICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0pIHtcbiAgICAgICAgICAgICAgICBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgc2VsZklkLCBvYnNbc2VsZklkXS54LCBvYnNbc2VsZklkXS55IC0gb2JzW3NlbGZJZF0uaGVpZ2h0ICogcHJlZmFicy5yZW5kZXJTaXplLCB0eXBlcy5PYmplY3RUeXBlcy5FTkVNWSwgdHlwZXMuRW5lbXkuVEFSR0VUX0RVTU1ZKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JzW3NlbGZJZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBkZWFkIGR1bW15IG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgZGVhZCBkdW1teSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVhZER1bW15TWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNBNTJBMkFcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW1xuICAgICAgICAgICAge2NlbGxYOiAzLCBjZWxsWTogMCwgd2lkdGg6IDIsIGhlaWdodDogNCwgc3dhdGNoOiAwfSxcbiAgICAgICAgXSxcbiAgICAgICAgY3VzdG9tUmVuZGVyU2l6ZTogMixcbiAgICB9XG59XG4iLCJ2YXIgdHJlZVdpZHRoID0gNDtcbnZhciB0cmVlSGVpZ2h0ID0gODtcbnZhciB0cmVlSGl0Ym94V2lkdGggPSA0O1xudmFyIHRyZWVIaXRib3hIZWlnaHQgPSA4O1xudmFyIHRyZWVIZWFsdGggPSAyMDA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJhc2UsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLlRlcnJhaW4uVFJFRSxcbiAgICAgICAgd2lkdGg6IHRyZWVXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiB0cmVlSGVpZ2h0LFxuICAgICAgICBoaXRib3hUeXBlOiB0eXBlcy5IaXRib3hUeXBlcy5SRUNULFxuICAgICAgICBoaXRib3hXaWR0aDogdHJlZUhpdGJveFdpZHRoLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IHRyZWVIaXRib3hIZWlnaHQsXG4gICAgICAgIGhlYWx0aDogdHJlZUhlYWx0aCxcbiAgICAgICAgbWF4SGVhbHRoOiB0cmVlSGVhbHRoLFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgdHJlZSBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHRyZWUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyZWVUcnVua01hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjOTkzMzAwXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LF0sXG4gICAgfTtcbn1cblxuLy8gVE9ETzogQ2hhbmdlIGxlYWYgcmVuZGVyaW5nIGRlcGVuZGluZyBvbiB0cmVlIGhlYWx0aFxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciB0cmVlIG9iamVjdCdzIGxlYXZlc1xuICogQHBhcmFtIG9iamVjdCBUaGUgdHJlZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gdHJlZUxlYWZNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzIyODgyMlwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IC0yLFxuICAgICAgICAgICAgY2VsbFk6IC00LFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAqIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogLTEwLFxuICAgICAgICAgICAgd2lkdGg6IDQsXG4gICAgICAgICAgICBoZWlnaHQ6IDcsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdLFxuICAgIH07XG59XG4iLCJ2YXIgd2FsbEhvcml6V2lkdGggPSAyMDtcbnZhciB3YWxsSG9yaXpIZWlnaHQgPSAxMjtcbnZhciB3YWxsSG9yaXpIaXRib3hXaWR0aCA9IDIwO1xudmFyIHdhbGxIb3JpekhpdGJveEhlaWdodCA9IDI7XG52YXIgd2FsbEhvcml6SGVhbHRoID0gMjUwO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgYmFzZSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5UZXJyYWluLldBTExfSE9SSVosXG4gICAgICAgIHdpZHRoOiB3YWxsSG9yaXpXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiB3YWxsSG9yaXpIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiB3YWxsSG9yaXpIaXRib3hXaWR0aCxcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiB3YWxsSG9yaXpIaXRib3hIZWlnaHQsXG4gICAgICAgIGhlYWx0aDogd2FsbEhvcml6SGVhbHRoLFxuICAgICAgICBtYXhIZWFsdGg6IHdhbGxIb3JpekhlYWx0aCxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGhvcml6b250YWwgd2FsbCBvYmplY3QgYmFzZVxuICogQHBhcmFtIG9iamVjdCBUaGUgaG9yaXpvbnRhbCB3YWxsIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3YWxsSG9yaXpCYXNlTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiM4ODg4ODhcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LmhpdGJveFdpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oaXRib3hIZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LmhpdGJveFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGl0Ym94SGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH1dXG4gICAgfVxufVxuXG4vLyBUT0RPOiBBZGQgbW9yZSBkZXRhaWwgdG8gd2FsbCAoY29iYmxlc3RvbmUgc3R5bGUpLCBjaGFuZ2UgY29sb3JpbmcgZGVwZW5kaW5nIG9uIG9iamVjdCBoZWFsdGhcbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgaG9yaXpvbnRhbCB3YWxsIG9iamVjdCBjb3ZlclxuICogQHBhcmFtIG9iamVjdCBUaGUgaG9yaXpvbnRhbCB3YWxsIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3YWxsSG9yaXpDb3Zlck1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjQTNBM0MyQkJcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IC1vYmplY3QuaGVpZ2h0IC8gMixcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfV1cbiAgICB9XG59XG4iLCJmdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgdXRpbHMgPSByZXF1aXJlKFwiLi4vUHJlZmFiVXRpbHNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5PYmplY3RUeXBlcy5URVJSQUlOLFxuICAgICAgICB4OiBwb3NYLFxuICAgICAgICB5OiBwb3NZLFxuICAgICAgICB1cGRhdGU6IChvYnMsIHNlbGZJZCwgZGVsdGEpID0+IHsgfSxcbiAgICAgICAgZGVhdGhyYXR0bGU6IChvYnMsIHNlbGZJZCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdKSBkZWxldGUgb2JzW3NlbGZJZF07XG4gICAgICAgIH0sXG4gICAgICAgIGRhbWFnZTogdXRpbHMuZGFtYWdlLFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgZGVmYXVsdCB0ZXJyYWluIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgdGVycmFpbiBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFRlcnJhaW5NYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOm1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjRkZCM0ZGXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9XVxuICAgIH1cbn1cbiIsInZhciBpbnZ1bG5QbGF0Zm9ybVdpZHRoID0gMTY7XG52YXIgaW52dWxuUGxhdGZvcm1IZWlnaHQgPSAxNjtcbnZhciBpbnZ1bG5QbGF0Zm9ybUJ1ZmZEdXJhdGlvbiA9IDE1MDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5UcmlnZ2VyLklOVlVMTl9QTEFURk9STSxcbiAgICAgICAgd2lkdGg6IGludnVsblBsYXRmb3JtV2lkdGgsXG4gICAgICAgIGhlaWdodDogaW52dWxuUGxhdGZvcm1IZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBpbnZ1bG5QbGF0Zm9ybVdpZHRoLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IGludnVsblBsYXRmb3JtSGVpZ2h0LFxuICAgICAgICBvblRyaWdnZXI6IChvYnMsIHNlbGZSZWYsIHRyaWdnZXJJZCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic1t0cmlnZ2VySWRdKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ic1t0cmlnZ2VySWRdLnN0YXR1c0VmZmVjdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzW3RyaWdnZXJJZF0uYWRkU3RhdHVzRWZmZWN0KG9icywgdHJpZ2dlcklkLCB0eXBlcy5TdGF0dXNFZmZlY3RzLklOVlVMTkVSQUJMRSwgaW52dWxuUGxhdGZvcm1CdWZmRHVyYXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGludnVsbiBwbGF0Zm9ybSBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGludnVsbiBwbGF0Zm9ybSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gaW52dWxuUGxhdGZvcm1NYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI0U1RTVFNVwiLCBcIiMyMjIyMjJcIiwgXCIjODg4ODg4XCIsIFwiI0FERDhFNlwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBzdHJva2VzOiBbXG4gICAgICAgICAgICB7Y2VsbFg6IDIsIGNlbGxZOiAwLCB3aWR0aDogMTIsIGhlaWdodDogMTYsIHN3YXRjaDogMH0sXG4gICAgICAgICAgICB7Y2VsbFg6IDAsIGNlbGxZOiAyLCB3aWR0aDogMTYsIGhlaWdodDogMTIsIHN3YXRjaDogMH0sXG4gICAgICAgICAgICB7Y2VsbFg6IDIsIGNlbGxZOiAwLCB3aWR0aDogMTIsIGhlaWdodDogMSwgc3dhdGNoOiAxfSxcbiAgICAgICAgICAgIHtjZWxsWDogMCwgY2VsbFk6IDIsIHdpZHRoOiAxLCBoZWlnaHQ6IDEyLCBzd2F0Y2g6IDF9LFxuICAgICAgICAgICAge2NlbGxYOiAyLCBjZWxsWTogMTUsIHdpZHRoOiAxMiwgaGVpZ2h0OiAxLCBzd2F0Y2g6IDF9LFxuICAgICAgICAgICAge2NlbGxYOiAxNSwgY2VsbFk6IDIsIHdpZHRoOiAxLCBoZWlnaHQ6IDEyLCBzd2F0Y2g6IDF9LFxuICAgICAgICAgICAge2NlbGxYOiAxLCBjZWxsWTogMSwgd2lkdGg6IDEsIGhlaWdodDogMSwgc3dhdGNoOiAxfSxcbiAgICAgICAgICAgIHtjZWxsWDogMTQsIGNlbGxZOiAxLCB3aWR0aDogMSwgaGVpZ2h0OiAxLCBzd2F0Y2g6IDF9LFxuICAgICAgICAgICAge2NlbGxYOiAxLCBjZWxsWTogMTQsIHdpZHRoOiAxLCBoZWlnaHQ6IDEsIHN3YXRjaDogMX0sXG4gICAgICAgICAgICB7Y2VsbFg6IDE0LCBjZWxsWTogMTQsIHdpZHRoOiAxLCBoZWlnaHQ6IDEsIHN3YXRjaDogMX0sXG4gICAgICAgICAgICB7Y2VsbFg6IDMsIGNlbGxZOiAzLCB3aWR0aDogMTAsIGhlaWdodDogNiwgc3dhdGNoOiAzfSxcbiAgICAgICAgICAgIHtjZWxsWDogNCwgY2VsbFk6IDgsIHdpZHRoOiA4LCBoZWlnaHQ6IDMsIHN3YXRjaDogM30sXG4gICAgICAgICAgICB7Y2VsbFg6IDUsIGNlbGxZOiAxMCwgd2lkdGg6IDYsIGhlaWdodDogMiwgc3dhdGNoOiAzfSxcbiAgICAgICAgICAgIHtjZWxsWDogMywgY2VsbFk6IDMsIHdpZHRoOiAxMCwgaGVpZ2h0OiAxLCBzd2F0Y2g6IDJ9LFxuICAgICAgICAgICAge2NlbGxYOiAzLCBjZWxsWTogMywgd2lkdGg6IDEsIGhlaWdodDogNiwgc3dhdGNoOiAyfSxcbiAgICAgICAgICAgIHtjZWxsWDogMTIsIGNlbGxZOiAzLCB3aWR0aDogMSwgaGVpZ2h0OiA2LCBzd2F0Y2g6IDJ9LFxuICAgICAgICAgICAge2NlbGxYOiA2LCBjZWxsWTogMTIsIHdpZHRoOiA0LCBoZWlnaHQ6IDEsIHN3YXRjaDogMn0sXG4gICAgICAgICAgICB7Y2VsbFg6IDQsIGNlbGxZOiA5LCB3aWR0aDogMSwgaGVpZ2h0OiAyLCBzd2F0Y2g6IDJ9LFxuICAgICAgICAgICAge2NlbGxYOiAxMSwgY2VsbFk6IDksIHdpZHRoOiAxLCBoZWlnaHQ6IDIsIHN3YXRjaDogMn0sXG4gICAgICAgICAgICB7Y2VsbFg6IDUsIGNlbGxZOiAxMSwgd2lkdGg6IDEsIGhlaWdodDogMSwgc3dhdGNoOiAyfSxcbiAgICAgICAgICAgIHtjZWxsWDogMTAsIGNlbGxZOiAxMSwgd2lkdGg6IDEsIGhlaWdodDogMSwgc3dhdGNoOiAyfSxcbiAgICAgICAgXSxcbiAgICB9XG59XG5cbi8vIENyZWVwZXIgZmFjZS4uLlxuLy8ge2NlbGxYOiAwLCBjZWxsWTogMCwgd2lkdGg6IDE2LCBoZWlnaHQ6IDE2LCBzd2F0Y2g6IDB9LFxuLy8ge2NlbGxYOiAyLCBjZWxsWTogMiwgd2lkdGg6IDQsIGhlaWdodDogNCwgc3dhdGNoOiAxfSxcbi8vIHtjZWxsWDogMTAsIGNlbGxZOiAyLCB3aWR0aDogNCwgaGVpZ2h0OiA0LCBzd2F0Y2g6IDF9LFxuLy8ge2NlbGxYOiA2LCBjZWxsWTogNiwgd2lkdGg6IDQsIGhlaWdodDogNiwgc3dhdGNoOiAxfSxcbi8vIHtjZWxsWDogNCwgY2VsbFk6IDgsIHdpZHRoOiAyLCBoZWlnaHQ6IDYsIHN3YXRjaDogMX0sXG4vLyB7Y2VsbFg6IDEwLCBjZWxsWTogOCwgd2lkdGg6IDIsIGhlaWdodDogNiwgc3dhdGNoOiAxfSxcbiIsInZhciBzcGlrZVRyYXBXaWR0aCA9IDU7XG52YXIgc3Bpa2VUcmFwSGVpZ2h0ID0gNTtcbnZhciBzcGlrZVRyYXBIaXRib3hXaWR0aCA9IDU7XG52YXIgc3Bpa2VUcmFwSGl0Ym94SGVpZ2h0ID0gNTtcbnZhciBzcGlrZVRyYXBEYW1hZ2UgPSAyMDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5UcmlnZ2VyLlNQSUtFX1RSQVAsXG4gICAgICAgIHdpZHRoOiBzcGlrZVRyYXBXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBzcGlrZVRyYXBIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBzcGlrZVRyYXBIaXRib3hXaWR0aCxcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiBzcGlrZVRyYXBIaXRib3hIZWlnaHQsXG4gICAgICAgIG9uVHJpZ2dlcjogKG9icywgc2VsZlJlZiwgdHJpZ2dlcklkKSA9PiB7XG4gICAgICAgICAgICBpZiAob2JzW3RyaWdnZXJJZF0gJiYgKFxuICAgICAgICAgICAgICAgIG9ic1t0cmlnZ2VySWRdLnR5cGUgPT0gdHlwZXMuT2JqZWN0VHlwZXMuUExBWUVSIHx8XG4gICAgICAgICAgICAgICAgb2JzW3RyaWdnZXJJZF0udHlwZSA9PSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFIHx8XG4gICAgICAgICAgICAgICAgb2JzW3RyaWdnZXJJZF0udHlwZSA9PSB0eXBlcy5PYmplY3RUeXBlcy5FTkVNWVxuICAgICAgICAgICAgKSkge1xuICAgICAgICAgICAgICAgIGlmIChvYnNbdHJpZ2dlcklkXS5kYW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzW3RyaWdnZXJJZF0uZGFtYWdlKG9icywgdHJpZ2dlcklkLCBzcGlrZVRyYXBEYW1hZ2UsIHR5cGVzLkRhbWFnZVR5cGVzLk5PUk1BTCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbc2VsZlJlZl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBzcGlrZSB0cmFwIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgc3Bpa2UgdHJhcCBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3Bpa2VUcmFwTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiM4MDgwODBcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMyxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAyLFxuICAgICAgICAgICAgY2VsbFk6IDMsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogNCxcbiAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdXG4gICAgfTtcbn1cbiIsImZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uLy4uL0NvbGxpc2lvbnNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLk9iamVjdFR5cGVzLlRSSUdHRVIsXG4gICAgICAgIHg6IHBvc1gsXG4gICAgICAgIHk6IHBvc1ksXG4gICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4ge1xuICAgICAgICAgICAgY29sbGlzaW9ucy5jaGVja0NvbGxpc2lvbnMoc2VsZklkLCBvYnMsIHByZWZhYnMucmVuZGVyU2l6ZSwgKHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYnNbc3JjSWRdICYmIGNvbGxpc2lvbklkICE9IHNyY0lkKXtcbiAgICAgICAgICAgICAgICAgICAgb2JzW3NyY0lkXS5vblRyaWdnZXIob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsInZhciBjYXJTcGVlZCA9IDAuMzU7XG52YXIgY2FyV2lkdGggPSAxMDtcbnZhciBjYXJIZWlnaHQgPSAxNjtcbnZhciBjYXJIaXRib3hXaWR0aCA9IDEwO1xudmFyIGNhckhpdGJveEhlaWdodCA9IDE2O1xudmFyIGNhckhlYWx0aCA9IDIwMDtcbnZhciBjYXJWaWV3UmFuZ2UgPSAxIC8gMztcbnZhciBjYXJDb2xvcnMgPSBbXG4gICAgXCIjREMxNDNDXCIsICAgICAgLy8gQ3JpbXNvblxuICAgIFwiIzAwNjQwMFwiLCAgICAgIC8vIERhcmsgR3JlZW5cbiAgICBcIiNGRjY5QjRcIiwgICAgICAvLyBIb3QgUGlua1xuICAgIFwiI0ZGRDcwMFwiLCAgICAgIC8vIEdvbGRcbiAgICBcIiM3MDgwOTBcIiwgICAgICAvLyBTbGF0ZSBHcmF5XG4gICAgXCIjMDBCRkZGXCIsICAgICAgLy8gRGVlcCBTa3kgQmx1ZVxuICAgIFwiIzAwMDBDRFwiLCAgICAgIC8vIE1lZGl1bSBCbHVlXG4gICAgXCIjRkY0NTAwXCIsICAgICAgLy8gT3JhbmdlIFJlZFxuICAgIFwiIzhCMDA4QlwiLCAgICAgIC8vIERhcmsgTWFnZW50YVxuXTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICB2YXIgY2FyQ29sb3IgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoY2FyQ29sb3JzLmxlbmd0aCkpO1xuICAgIHZhciB2ZWhpY2xlSWQgPSBzcmMgKyBcIjpcIiArIHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEUgKyBcIjpcIiArIHR5cGVzLlZlaGljbGUuQ0FSICsgXCI6XCIgKyBwb3NYICsgXCI6XCIgKyBwb3NZO1xuICAgIFxuICAgIHByZWZhYnMuZ2VuZXJhdGVOZXcob2JzLCB2ZWhpY2xlSWQsIHBvc1gsIHBvc1ksIHR5cGVzLk9iamVjdFR5cGVzLklOVEVSQUNUQUJMRSwgdHlwZXMuSW50ZXJhY3RhYmxlLkNBUl9FTlRFUik7XG5cbiAgICBvYnNbdmVoaWNsZUlkXSA9ICB7XG4gICAgICAgIC4uLmJhc2UsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLlZlaGljbGUuQ0FSLFxuICAgICAgICBzcGVlZDogY2FyU3BlZWQsXG4gICAgICAgIHdpZHRoOiBjYXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjYXJIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBjYXJIaXRib3hXaWR0aCxcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiBjYXJIaXRib3hIZWlnaHQsXG4gICAgICAgIGhlYWx0aDogY2FySGVhbHRoLFxuICAgICAgICBtYXhIZWFsdGg6IGNhckhlYWx0aCxcbiAgICAgICAgY2FyQ29sb3I6IGNhckNvbG9yc1tjYXJDb2xvcl0sXG4gICAgICAgIHZpZXdSYW5nZTogY2FyVmlld1JhbmdlLFxuICAgICAgICBpbnRlcmFjdGFibGVJZDogdmVoaWNsZUlkICsgXCI6XCIgKyB0eXBlcy5PYmplY3RUeXBlcy5JTlRFUkFDVEFCTEUgKyBcIjpcIiArIHR5cGVzLkludGVyYWN0YWJsZS5DQVJfRU5URVIsXG4gICAgfTtcbiAgICByZXR1cm47XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXJNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgdmFyIGhpZ2hsaWdodFI6IG51bWJlciA9IHBhcnNlSW50KFwiMHhcIiArIG9iamVjdC5jYXJDb2xvci5zdWJzdHJpbmcoMSwgMyksIDE2KSArIDB4MzM7XG4gICAgdmFyIGhpZ2hsaWdodEc6IG51bWJlciA9IHBhcnNlSW50KFwiMHhcIiArIG9iamVjdC5jYXJDb2xvci5zdWJzdHJpbmcoMywgNSksIDE2KSArIDB4MzM7XG4gICAgdmFyIGhpZ2hsaWdodEI6IG51bWJlciA9IHBhcnNlSW50KFwiMHhcIiArIG9iamVjdC5jYXJDb2xvci5zdWJzdHJpbmcoNSwgNyksIDE2KSArIDB4MzM7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzMzMzMzM1wiXVxuICAgICAgICAgICAgLmNvbmNhdChvYmplY3QuY2FyQ29sb3IpXG4gICAgICAgICAgICAuY29uY2F0KFwiI1wiICtcbiAgICAgICAgICAgICAgICAoaGlnaGxpZ2h0UiA+IDB4RkYgPyAweEZGIDogaGlnaGxpZ2h0UikudG9TdHJpbmcoMTYpICtcbiAgICAgICAgICAgICAgICAoaGlnaGxpZ2h0RyA+IDB4RkYgPyAweEZGIDogaGlnaGxpZ2h0RykudG9TdHJpbmcoMTYpICtcbiAgICAgICAgICAgICAgICAoaGlnaGxpZ2h0QiA+IDB4RkYgPyAweEZGIDogaGlnaGxpZ2h0QikudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICApLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogNSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDUsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggLSAyLFxuICAgICAgICAgICAgaGVpZ2h0OiA2LFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDksXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiA2LFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDksXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoIC0gMixcbiAgICAgICAgICAgIGhlaWdodDogNyxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogMixcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggLSA0LFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDEwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogMTAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoIC0gNCxcbiAgICAgICAgICAgIGhlaWdodDogNCxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMyxcbiAgICAgICAgICAgIGNlbGxZOiA2LFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDYsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IC0xLFxuICAgICAgICAgICAgY2VsbFk6IDYsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgY2VsbFk6IDYsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LF1cbiAgICB9O1xufVxuIiwidmFyIGRlZmF1bHRWZWhpY2xlVmlld1JhbmdlID0gMSAvIDQ7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uLy4uL0NvbGxpc2lvbnNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICB2YXIgdXRpbHMgPSByZXF1aXJlKFwiLi4vUHJlZmFiVXRpbHNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFLFxuICAgICAgICB4OiBwb3NYLFxuICAgICAgICB5OiBwb3NZLFxuICAgICAgICB2ZWxvY2l0eVg6IDAsXG4gICAgICAgIHZlbG9jaXR5WTogMCxcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBjdXJyZW50RXF1aXBtZW50OiB1bmRlZmluZWQsXG4gICAgICAgIGVxdWlwbWVudDogWyBdLFxuICAgICAgICB2aWV3UmFuZ2U6IGRlZmF1bHRWZWhpY2xlVmlld1JhbmdlLFxuICAgICAgICByaWRlcjogdW5kZWZpbmVkLFxuICAgICAgICBkZWF0aHJhdHRsZTogKG9icywgc2VsZklkKSA9PiB7XG4gICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0ucmlkZXIpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JzW29ic1tzZWxmSWRdLmludGVyYWN0YWJsZUlkXTtcbiAgICAgICAgICAgICAgICB2YXIgcmlkZXIgPSBvYnNbc2VsZklkXS5yaWRlcjtcblxuICAgICAgICAgICAgICAgIC8vIFJlc2V0IHZlbG9jaXRpZXMgYW5kIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgcmlkZXIudmVsb2NpdHlYID0gMDtcbiAgICAgICAgICAgICAgICByaWRlci52ZWxvY2l0eVkgPSAwO1xuICAgICAgICAgICAgICAgIHJpZGVyLnggPSBvYnNbc2VsZklkXS54O1xuICAgICAgICAgICAgICAgIHJpZGVyLnkgPSBvYnNbc2VsZklkXS55O1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdID0gcmlkZXI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbb2JzW3NlbGZJZF0uaW50ZXJhY3RhYmxlSWRdO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbc2VsZklkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgY2FyIG1vdmVtZW50XG4gICAgICAgICAgICBvYnNbc2VsZklkXS54ICs9IG9ic1tzZWxmSWRdLnZlbG9jaXR5WCAqIGRlbHRhO1xuICAgICAgICAgICAgb2JzW3NlbGZJZF0ueSArPSBvYnNbc2VsZklkXS52ZWxvY2l0eVkgKiBkZWx0YTtcblxuICAgICAgICAgICAgaWYgKG9ic1tvYnNbc2VsZklkXS5pbnRlcmFjdGFibGVJZF0pIHtcbiAgICAgICAgICAgICAgICBvYnNbb2JzW3NlbGZJZF0uaW50ZXJhY3RhYmxlSWRdLnggPSBvYnNbc2VsZklkXS54O1xuICAgICAgICAgICAgICAgIG9ic1tvYnNbc2VsZklkXS5pbnRlcmFjdGFibGVJZF0ueSA9IG9ic1tzZWxmSWRdLnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGNvbGxpc2lvbnMgd2l0aCB0ZXJyYWluIGFuZCByZXBvc2l0aW9uIGFjY29yZGluZ2x5XG4gICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9ucyhzZWxmSWQsIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQpe1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9ic1tjb2xsaXNpb25JZF0udHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5URVJSQUlOOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnMucHVzaEJhY2sob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQsIHByZWZhYnMucmVuZGVyU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbW91c2VEb3duOiAob2JzLCBtb3VzZUV2ZW50KSA9PiB7IH0sXG4gICAgICAgIG9uUGxheWVySW5wdXQ6IChvYnMsIHNlbGZJZCwgcGxheWVySW5wdXQpID0+IHtcbiAgICAgICAgICAgIHBsYXllciA9IG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgdmFyIHhEaXIgPSAwO1xuICAgICAgICAgICAgdmFyIHlEaXIgPSAwO1xuXG4gICAgICAgICAgICBpZiAocGxheWVySW5wdXQubGVmdCkge1xuICAgICAgICAgICAgICAgIHhEaXIgLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5yaWdodCkge1xuICAgICAgICAgICAgICAgIHhEaXIgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC51cCkge1xuICAgICAgICAgICAgICAgIHlEaXIgLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5kb3duKSB7XG4gICAgICAgICAgICAgICAgeURpciArPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGF5ZXIudmVsb2NpdHlYID0geERpciAqIHBsYXllci5zcGVlZDtcbiAgICAgICAgICAgIHBsYXllci52ZWxvY2l0eVkgPSB5RGlyICogcGxheWVyLnNwZWVkO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoeERpciAhPSAwIHx8IHlEaXIgIT0gMCkge1xuICAgICAgICAgICAgICAgIHBsYXllci5mYWNpbmcgPSAoTWF0aC5hdGFuKHBsYXllci52ZWxvY2l0eVkgLyBwbGF5ZXIudmVsb2NpdHlYKSAqIDU3LjI5NTggKyA5MCkgKyh4RGlyIDwgMCA/IDE4MCA6IDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoeERpciAhPSAwKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyLmhpdGJveFdpZHRoID0gb2JzW3NlbGZJZF0uaGVpZ2h0O1xuICAgICAgICAgICAgICAgIHBsYXllci5oaXRib3hIZWlnaHQgPSBvYnNbc2VsZklkXS53aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh5RGlyICE9IDApIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuaGl0Ym94V2lkdGggPSBvYnNbc2VsZklkXS53aWR0aDtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuaGl0Ym94SGVpZ2h0ID0gb2JzW3NlbGZJZF0uaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocGxheWVySW5wdXQucGlja3VwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZlY2hpY2xlSWQgPSBzZWxmSWQgKyBcIjpcIiArIG9ic1tzZWxmSWRdLnR5cGUgKyBcIjpcIiArIG9ic1tzZWxmSWRdLnN1YnR5cGUgKyBcIjpcIiArIG9ic1tzZWxmSWRdLnggKyBcIjpcIiArIG9ic1tzZWxmSWRdLnk7XG4gICAgICAgICAgICAgICAgb2JzW29ic1tzZWxmSWRdLmludGVyYWN0YWJsZUlkXS52ZWhpY2xlSWQgPSBuZXdWZWNoaWNsZUlkO1xuICAgICAgICAgICAgICAgIG9ic1tuZXdWZWNoaWNsZUlkXSA9IG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbc2VsZklkXTtcbiAgICAgICAgICAgICAgICBvYnNbc2VsZklkXSA9IG9ic1tuZXdWZWNoaWNsZUlkXS5yaWRlcjtcbiAgICAgICAgICAgICAgICBvYnNbbmV3VmVjaGljbGVJZF0ucmlkZXIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXNldCB2ZWxvY2l0aWVzIGFuZCBwb3NpdGlvblxuICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLnZlbG9jaXR5WCA9IDA7XG4gICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0udmVsb2NpdHlZID0gMDtcbiAgICAgICAgICAgICAgICBvYnNbbmV3VmVjaGljbGVJZF0udmVsb2NpdHlYID0gMDtcbiAgICAgICAgICAgICAgICBvYnNbbmV3VmVjaGljbGVJZF0udmVsb2NpdHlZID0gMDtcbiAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS54ID0gb2JzW25ld1ZlY2hpY2xlSWRdLnggKyBvYnNbbmV3VmVjaGljbGVJZF0ud2lkdGggLyAyICsgb2JzW3NlbGZJZF0ud2lkdGggLyAyO1xuICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLnkgPSBvYnNbbmV3VmVjaGljbGVJZF0ueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGFtYWdlOiB1dGlscy5kYW1hZ2UsXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UsIFBvcG92YSB9IGZyb20gXCIuLi9Qb3BvdmEvUG9wb3ZhXCI7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vLi4vT2JqZWN0VHlwZXNcIjtcblxuaW1wb3J0IHsgY2hlY2tTdGF0dXNFZmZlY3QgfSBmcm9tIFwiLi4vLi4vUHJlZmFicy9QbGF5ZXIvX1BsYXllclwiO1xuaW1wb3J0ICogYXMgcGxheWVyIGZyb20gXCIuLi8uLi9QcmVmYWJzL1BsYXllci9fUGxheWVyLnRlbXBsYXRlXCI7XG5pbXBvcnQgKiBhcyBnb2QgZnJvbSBcIi4uLy4uL1ByZWZhYnMvUGxheWVyL0dvZC50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgZmlyZW1hZ2UgZnJvbSBcIi4uLy4uL1ByZWZhYnMvUGxheWVyL0ZpcmVNYWdlLnRlbXBsYXRlXCI7XG5pbXBvcnQgKiBhcyBoZWFsdGhiYXIgZnJvbSBcIi4uLy4uL1ByZWZhYnMvUGxheWVyL0hlYWx0aEJhci50ZW1wbGF0ZVwiO1xuXG5pbXBvcnQgKiBhcyBzdHVubmVkU3RhdHVzRWZmZWN0IGZyb20gXCIuLi8uLi9QcmVmYWJzL1BsYXllci9TdGF0dXNFZmZlY3RzL1N0dW5uZWQudGVtcGxhdGVcIjtcbmltcG9ydCAqIGFzIGludnVsbmVhcmFibGVTdGF0dXNFZmZlY3QgZnJvbSBcIi4uLy4uL1ByZWZhYnMvUGxheWVyL1N0YXR1c0VmZmVjdHMvSW52dWxuZXJhYmxlLnRlbXBsYXRlXCI7XG5cbmltcG9ydCAqIGFzIHByb2plY3RpbGUgZnJvbSBcIi4uLy4uL1ByZWZhYnMvUHJvamVjdGlsZS9fUHJvamVjdGlsZS50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgZmlyZWJvbHQgZnJvbSBcIi4uLy4uL1ByZWZhYnMvUHJvamVjdGlsZS9GaXJlYm9sdFByb2plY3RpbGUudGVtcGxhdGVcIjtcbmltcG9ydCAqIGFzIGZsYW1lUGlsbGFyIGZyb20gXCIuLi8uLi9QcmVmYWJzL1Byb2plY3RpbGUvRmxhbWVQaWxsYXJQcm9qZWN0aWxlLnRlbXBsYXRlXCI7XG5pbXBvcnQgKiBhcyBmbGFtZURhc2ggZnJvbSBcIi4uLy4uL1ByZWZhYnMvUHJvamVjdGlsZS9GbGFtZURhc2hQcm9qZWN0aWxlLnRlbXBsYXRlXCI7XG5cbmltcG9ydCAqIGFzIGdyYXZlc3RvbmUgZnJvbSBcIi4uLy4uL1ByZWZhYnMvR3JhdmVzdG9uZS9fR3JhdmVzdG9uZS50ZW1wbGF0ZVwiO1xuXG5pbXBvcnQgKiBhcyBfdGVycmFpbiBmcm9tIFwiLi4vLi4vUHJlZmFicy9UZXJyYWluL19UZXJyYWluLnRlbXBsYXRlXCI7XG5pbXBvcnQgKiBhcyB0cmVlIGZyb20gXCIuLi8uLi9QcmVmYWJzL1RlcnJhaW4vVHJlZS50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgd2FsbEhvcml6IGZyb20gXCIuLi8uLi9QcmVmYWJzL1RlcnJhaW4vV2FsbEhvcml6LnRlbXBsYXRlXCI7XG5pbXBvcnQgKiBhcyBkZWFkRHVtbXkgZnJvbSBcIi4uLy4uL1ByZWZhYnMvVGVycmFpbi9EZWFkRHVtbXkudGVtcGxhdGVcIjtcblxuaW1wb3J0ICogYXMgaGVhbHRoUGlja3VwIGZyb20gXCIuLi8uLi9QcmVmYWJzL0ludGVyYWN0YWJsZS9IZWFsdGhQaWNrdXAudGVtcGxhdGVcIjtcbmltcG9ydCAqIGFzIHBsYXllclR5cGVDaGFuZ2VyIGZyb20gXCIuLi8uLi9QcmVmYWJzL0ludGVyYWN0YWJsZS9QbGF5ZXJUeXBlQ2hhbmdlci50ZW1wbGF0ZVwiO1xuXG5pbXBvcnQgKiBhcyBzcGlrZVRyYXAgZnJvbSBcIi4uLy4uL1ByZWZhYnMvVHJpZ2dlci9TcGlrZVRyYXAudGVtcGxhdGVcIjtcbmltcG9ydCAqIGFzIGludnVsblBsYXRmb3JtIGZyb20gXCIuLi8uLi9QcmVmYWJzL1RyaWdnZXIvSW52dWxuUGxhdGZvcm0udGVtcGxhdGVcIjtcblxuaW1wb3J0ICogYXMgY2FyIGZyb20gXCIuLi8uLi9QcmVmYWJzL1ZlaGljbGUvQ2FyLnRlbXBsYXRlXCI7XG5cbmltcG9ydCAqIGFzIGJpbm9jdWxhcnNJY29uIGZyb20gXCIuLi8uLi9QcmVmYWJzL0VxdWlwbWVudC9CaW5vY3VsYXJzLmljb25cIjtcbmltcG9ydCAqIGFzIGJsYXN0ZXJJY29uIGZyb20gXCIuLi8uLi9QcmVmYWJzL0VxdWlwbWVudC9CbGFzdGVyLmljb25cIjtcbmltcG9ydCAqIGFzIGJ1aWxkZXJJY29uIGZyb20gXCIuLi8uLi9QcmVmYWJzL0VxdWlwbWVudC9CdWlsZGVyLmljb25cIjtcbmltcG9ydCAqIGFzIHNjYW5uZXJJY29uIGZyb20gXCIuLi8uLi9QcmVmYWJzL0VxdWlwbWVudC9TY2FubmVyLmljb25cIjtcblxuaW1wb3J0ICogYXMgX2VuZW15IGZyb20gXCIuLi8uLi9QcmVmYWJzL0VuZW15L19FbmVteS50ZW1wbGF0ZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyT2JqZWN0cyhcbiAgICBvYmplY3RzOiBhbnksXG4gICAgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLFxuICAgIHJlbmRlck9mZnNldFk6IG51bWJlcixcbiAgICByZW5kZXJTaXplOiBudW1iZXIsXG4gICAgYmFja2dyb3VuZDogUG9wb3ZhLFxuICAgIGVudjogUG9wb3ZhLFxuICAgIGZvcmVncm91bmQ6IFBvcG92YSxcbiAgICBjb3ZlcjogUG9wb3ZhLFxuICAgIHVpOiBQb3BvdmEsXG4pIHtcbiAgICBmb3IgKHZhciBpZCBpbiBvYmplY3RzKSB7XG4gICAgICAgIHZhciBvYmplY3QgPSBvYmplY3RzW2lkXTtcblxuICAgICAgICBzd2l0Y2ggKG9iamVjdC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUjpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUGxheWVyLkhVTUFOOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWdyb3VuZC5kcmF3KHBsYXllci5wbGF5ZXJNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlBsYXllci5HT0Q6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kLmRyYXcoZ29kLmdvZFBsYXllck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUGxheWVyLkZJUkVfTUFHRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVncm91bmQuZHJhdyhmaXJlbWFnZS5maXJlbWFnZVBsYXllck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRyYXdTdGF0dXNFZmZlY3RzKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSwgcmVuZGVyU2l6ZSwgY292ZXIpO1xuICAgICAgICAgICAgICAgIGZvcmVncm91bmQuZHJhdyhoZWFsdGhiYXIuaGVhbHRoQmFyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZLCByZW5kZXJTaXplKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlBST0pFQ1RJTEU6XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvYmplY3Quc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlByb2plY3RpbGUuQkFTSUNfUFJPSkVDVElMRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KHByb2plY3RpbGUucHJvamVjdGlsZU1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUHJvamVjdGlsZS5GSVJFQk9MVF9QUk9KRUNUSUxFOlxuICAgICAgICAgICAgICAgICAgICAgICAgZW52LmRyYXcoZmlyZWJvbHQuZmlyZWJvbHRQcm9qZWN0aWxlTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Qcm9qZWN0aWxlLkZMQU1FX1BJTExBUl9QUk9KRUNUSUxFOlxuICAgICAgICAgICAgICAgICAgICAgICAgZW52LmRyYXcoZmxhbWVQaWxsYXIuZmxhbWVQaWxsYXJQcm9qZWN0aWxlTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Qcm9qZWN0aWxlLkZMQU1FX0RBU0hfUFJPSkVDVElMRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KGZsYW1lRGFzaC5mbGFtZURhc2hQcm9qZWN0aWxlTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5HUkFWRVNUT05FOlxuICAgICAgICAgICAgICAgIGVudi5kcmF3KGdyYXZlc3RvbmUuZ3JhdmVTdG9uZU1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgIGVudi5kcmF3KGhlYWx0aGJhci5oZWFsdGhCYXJNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFksIHJlbmRlclNpemUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTjpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVGVycmFpbi5UUkVFOlxuICAgICAgICAgICAgICAgICAgICAgICAgZW52LmRyYXcodHJlZS50cmVlVHJ1bmtNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdmVyLmRyYXcodHJlZS50cmVlTGVhZk1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVGVycmFpbi5XQUxMX0hPUklaOlxuICAgICAgICAgICAgICAgICAgICAgICAgZW52LmRyYXcod2FsbEhvcml6LndhbGxIb3JpekJhc2VNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdmVyLmRyYXcod2FsbEhvcml6LndhbGxIb3JpekNvdmVyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5UZXJyYWluLkRFQURfRFVNTVk6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhkZWFkRHVtbXkuZGVhZER1bW15TWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLklOVEVSQUNUQUJMRTpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuSW50ZXJhY3RhYmxlLkhFQUxUSF9QSUNLVVA6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhoZWFsdGhQaWNrdXAuaGVhbHRoUGlja3VwTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5JbnRlcmFjdGFibGUuUExBWUVSX1RZUEVfQ0hBTkdFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KHBsYXllclR5cGVDaGFuZ2VyLnBsYXllclR5cGVDaGFuZ2VyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhwbGF5ZXJUeXBlQ2hhbmdlci5saXR0bGVNYW5NYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVFJJR0dFUjpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVHJpZ2dlci5TUElLRV9UUkFQOlxuICAgICAgICAgICAgICAgICAgICAgICAgZW52LmRyYXcoc3Bpa2VUcmFwLnNwaWtlVHJhcE1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVHJpZ2dlci5JTlZVTE5fUExBVEZPUk06XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhpbnZ1bG5QbGF0Zm9ybS5pbnZ1bG5QbGF0Zm9ybU1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVkVISUNMRTpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVmVoaWNsZS5DQVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kLmRyYXcoY2FyLmNhck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5DT01CQVRfVEVYVDpcbiAgICAgICAgICAgICAgICB1aS5kcmF3VGV4dChvYmplY3QudGV4dCwgb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLCBvYmplY3QueSAtIHJlbmRlck9mZnNldFksIG9iamVjdC5zaXplLCBvYmplY3QuY29sb3IsIG9iamVjdC5mYWNpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5FTkVNWTpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuRW5lbXkuVEFSR0VUX0RVTU1ZOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWdyb3VuZC5kcmF3KF9lbmVteS5lbmVteU1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvcmVncm91bmQuZHJhdyhoZWFsdGhiYXIuaGVhbHRoQmFyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZLCByZW5kZXJTaXplKSk7XG4gICAgICAgICAgICAgICAgZHJhd1N0YXR1c0VmZmVjdHMob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZLCByZW5kZXJTaXplLCBjb3Zlcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGVudi5kcmF3KF90ZXJyYWluLmRlZmF1bHRUZXJyYWluTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJDdXJyZW50RXF1aXBtZW50KHBsYXllcjogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlciwgdWk6IFBvcG92YSkge1xuICAgIGlmIChwbGF5ZXIgJiYgcGxheWVyLmN1cnJlbnRFcXVpcG1lbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN3aXRjaCAocGxheWVyLmVxdWlwbWVudFtwbGF5ZXIuY3VycmVudEVxdWlwbWVudF0udHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CTEFTVEVSOlxuICAgICAgICAgICAgICAgIHVpLmRyYXcoYmxhc3Rlckljb24uYmxhc3RlclVJTWFzdGVyUGllY2UocmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5TQ0FOTkVSOlxuICAgICAgICAgICAgICAgIHVpLmRyYXcoc2Nhbm5lckljb24uc2Nhbm5lclVJTWFzdGVyUGllY2UocmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CVUlMREVSOlxuICAgICAgICAgICAgICAgIHVpLmRyYXcoYnVpbGRlckljb24uYnVpbGRlclVJTWFzdGVyUGllY2UocmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CSU5PQ1VMQVJTOlxuICAgICAgICAgICAgICAgIHVpLmRyYXcoYmlub2N1bGFyc0ljb24uYmlub2N1bGFyc1VJTWFzdGVyUGllY2UocmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckFiaWxpdGllcyhwbGF5ZXI6IGFueSwgdWk6IFBvcG92YSkge1xuICAgIGlmIChwbGF5ZXIgJiYgcGxheWVyLmFiaWxpdGllcykge1xuICAgICAgICBjb25zdCBpY29uU2l6ZSA9IDQ4O1xuICAgICAgICBjb25zdCBudW1BYmlsaXRpZXMgPSBwbGF5ZXIuYWJpbGl0aWVzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgcmVuZGVyV2lkdGggPSB1aS5zaXplKCkud2lkdGggLyAyO1xuICAgICAgICBjb25zdCByZW5kZXJIZWlnaHQgPSB1aS5zaXplKCkuaGVpZ2h0IC0gaWNvblNpemU7XG5cbiAgICAgICAgLy8gVE9ETzogTW92ZSB0aGVzZSB0byB0aGVpciBvd24gdGVtcGxhdGUgZmlsZXNcbiAgICAgICAgcGxheWVyLmFiaWxpdGllcy5mb3JFYWNoKChhYmlsaXR5OiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGljb25Qb3NYID0gcmVuZGVyV2lkdGggKyAoMC41IC0gbnVtQWJpbGl0aWVzIC8gMiArIGluZGV4KSAqIGljb25TaXplO1xuICAgICAgICAgICAgY29uc3QgcmVtYWluaW5nOiBudW1iZXIgPSAoYWJpbGl0eS5jb29sZG93biAtIChEYXRlLm5vdygpIC0gYWJpbGl0eS5sYXN0Y2FzdCkpIC8gMTAwMDtcbiAgICAgICAgICAgIHVpLmRyYXcoe1xuICAgICAgICAgICAgICAgIHBhbGV0dGU6IFtcIiM4ODg4ODhcIiwgXCIjQ0NDQ0NDXCIsIFwiI0JCQkJCQlwiXSxcbiAgICAgICAgICAgICAgICBwb3NYOiBpY29uUG9zWCxcbiAgICAgICAgICAgICAgICBwb3NZOiByZW5kZXJIZWlnaHQsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA4LFxuICAgICAgICAgICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxNixcbiAgICAgICAgICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxNCxcbiAgICAgICAgICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxNCxcbiAgICAgICAgICAgICAgICAgICAgc3dhdGNoOiAocmVtYWluaW5nID4gMCkgPyAxIDogMlxuICAgICAgICAgICAgICAgIH0sXSxcbiAgICAgICAgICAgICAgICBjdXN0b21SZW5kZXJTaXplOiAyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChyZW1haW5pbmcgPiAwKSB7XG4gICAgICAgICAgICAgICAgdWkuZHJhd1RleHQoXG4gICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZy50b0ZpeGVkKDEpLFxuICAgICAgICAgICAgICAgICAgICBpY29uUG9zWCxcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVySGVpZ2h0ICsgNCxcbiAgICAgICAgICAgICAgICAgICAgMTIsXG4gICAgICAgICAgICAgICAgICAgIFwiI0VFRUVFRVwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdWkuZHJhd1RleHQoU3RyaW5nKGluZGV4ICsgMSksIGljb25Qb3NYLCByZW5kZXJIZWlnaHQgKyA2LCAxOCwgXCIjRUVFRUVFXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYXdTdGF0dXNFZmZlY3RzKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlciwgcmVuZGVyU2l6ZTogbnVtYmVyLCBjb3ZlcjogUG9wb3ZhKSB7XG4gICAgaWYgKGNoZWNrU3RhdHVzRWZmZWN0KG9iamVjdCwgdHlwZXMuU3RhdHVzRWZmZWN0cy5TVFVOTkVEKSkge1xuICAgICAgICBjb3Zlci5kcmF3KHN0dW5uZWRTdGF0dXNFZmZlY3Quc3R1bm5lZFN0YXR1c0VmZmVjdE1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSwgcmVuZGVyU2l6ZSkpO1xuICAgIH1cbiAgICBpZiAoY2hlY2tTdGF0dXNFZmZlY3Qob2JqZWN0LCB0eXBlcy5TdGF0dXNFZmZlY3RzLklOVlVMTkVSQUJMRSkpIHtcbiAgICAgICAgY292ZXIuZHJhdyhpbnZ1bG5lYXJhYmxlU3RhdHVzRWZmZWN0LmludnVsbmVyYWJsZVN0YXR1c0VmZmVjdE1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSwgcmVuZGVyU2l6ZSkpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgbWFzdGVyUGllY2Uge1xuICAgIHBhbGV0dGU6IHN0cmluZ1tdLFxuICAgIHBvc1g6IG51bWJlcixcbiAgICBwb3NZOiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBmYWNpbmc6IG51bWJlcixcbiAgICBzdHJva2VzOiBzdHJva2VbXSxcbiAgICBjdXN0b21SZW5kZXJTaXplPzogbnVtYmVyLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIHN0cm9rZSB7XG4gICAgY2VsbFg6IG51bWJlcixcbiAgICBjZWxsWTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgc3dhdGNoOiBudW1iZXIsXG4gICAgdHlwZT86IFN0cm9rZVR5cGVzLFxufVxuXG5leHBvcnQgZW51bSBTdHJva2VUeXBlcyB7XG4gICAgUkVDVCA9IFwic3Ryb2tlLXJlY3RcIixcbiAgICBDSVJDID0gXCJzdHJva2UtY2lyY1wiLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIG1vdXNlUG9zaXRpb24ge1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgb3V0T2ZCb3VuZHM6IGJvb2xlYW4sXG59XG5cbmV4cG9ydCBjbGFzcyBQb3BvdmEge1xuXG4gICAgcHJpdmF0ZSBjYW52YXM6IGFueTtcbiAgICBwcml2YXRlIGN0eDogYW55O1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgY3ViZVNpemU6IG51bWJlciA9IDEyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIFBvcG92YSdzIGNhbnZhc1xuICAgICAqIEBwYXJhbSBjYW52YXNJZCBJZCBvZiBodG1sIGNhbnZhcyBlbGVtZW50XG4gICAgICogQHBhcmFtIGN1YmVTaXplIFJlbmRlciBzaXplIGZvciBlYWNoIGN1YmUgd2hlbiBkcmF3aW5nIHdpdGggY3ViZXNcbiAgICAgKi9cbiAgICBpbml0KGNhbnZhc0lkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSA8YW55PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNJZCk7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbnZhcy5vZmZzZXRXaWR0aCAtIDQ7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMub2Zmc2V0SGVpZ2h0IC0gNDtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIGdyaWQgb24gdGhlIGNhbnZhc1xuICAgICAqIEBwYXJhbSBzcGFjaW5nIE51bWJlciBvZiBwaXhlbHMgYmV0d2VlbiBncmlkIGxpbmVzXG4gICAgKi9cbiAgICBkcmF3R3JpZChzcGFjaW5nOiBudW1iZXIsIG9mZnNldFg/OiBudW1iZXIsIG9mZnNldFk/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgLy8gRHJhdyBncmlkIG9uIGJhY2tncm91bmRcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIiNmMGU3ZGJcIjtcbiAgICAgICAgZm9yICh2YXIgeCA9ICghIW9mZnNldFgpID8gb2Zmc2V0WCAlIHNwYWNpbmcgOiAwOyB4IDw9IHRoaXMud2lkdGg7IHggKz0gc3BhY2luZykge1xuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIDApO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIHkgPSAoISFvZmZzZXRZKSA/IG9mZnNldFkgJSBzcGFjaW5nIDogMDsgeSA8PSB0aGlzLmhlaWdodDsgeSArPSBzcGFjaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oMCwgeSk7XG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8odGhpcy53aWR0aCwgeSk7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmF3cyBhIG1hc3RlcnBpZWNlIHRvIHRoZSBjYW52YXNcbiAgICAgKiBAcGFyYW0gbWFzdGVyUGllY2UgRGVmaW5pdGlvbiBmb3Igd2hhdCB0byBkcmF3XG4gICAgICovXG4gICAgZHJhdyhtYXN0ZXJQaWVjZTogbWFzdGVyUGllY2UpIHtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuXG4gICAgICAgIHRoaXMucHJlcENhbnZhcyhcbiAgICAgICAgICAgIG1hc3RlclBpZWNlLnBvc1gsXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS5wb3NZLFxuICAgICAgICAgICAgbWFzdGVyUGllY2Uud2lkdGgsXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS5oZWlnaHQsXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS5mYWNpbmcpO1xuICAgICAgICBtYXN0ZXJQaWVjZS5zdHJva2VzLmZvckVhY2goKHN0cm9rZTogc3Ryb2tlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclN0cm9rZShzdHJva2UsIG1hc3RlclBpZWNlLnBhbGV0dGUsIG1hc3RlclBpZWNlLmN1c3RvbVJlbmRlclNpemUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2VudGVycyB0aGUgY2FudmFzIG9uIHBvc2l0aW9uLCBhbmQgcm90YXRlcyB0byBhIGNlcnRhaW4gZmFjaW5nXG4gICAgICogQHBhcmFtIHBvc2l0aW9uWCBUaGUgeCBwb3NpdGlvbiBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIHBvc2l0aW9uWSBUaGUgeSBwb3NpdGlvbiBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIHdpZHRoIFRoZSB3aWR0aCBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIGhlaWdodCBUaGUgaGVpZ2h0IG9mIHdoYXQgaXMgYmVpbmcgZHJhd25cbiAgICAgKiBAcGFyYW0gZGVncmVlcyBEZWdyZWVzIHRvIHJvdGF0ZSB0aGUgY2FudmFzIGJ5XG4gICAgICogQHBhcmFtIGN1c3RvbVJlbmRlclNpemUgUmVuZGVyIHRoZSBtYXN0ZXIgcGllY2Ugd2l0aCBjdXN0b20gY3ViZSBzaXppbmdcbiAgICAgKi9cbiAgICBwcmVwQ2FudmFzKHBvc2l0aW9uWDogbnVtYmVyLCBwb3NpdGlvblk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGRlZ3JlZXM6IG51bWJlciwgY3VzdG9tUmVuZGVyU2l6ZT86IG51bWJlcil7XG4gICAgICAgIGNvbnN0IHJlbmRlclNpemUgPSBjdXN0b21SZW5kZXJTaXplID8gY3VzdG9tUmVuZGVyU2l6ZSA6IHRoaXMuY3ViZVNpemU7XG5cbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZShwb3NpdGlvblgsIHBvc2l0aW9uWSk7XG4gICAgICAgIHRoaXMuY3R4LnJvdGF0ZShkZWdyZWVzICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSgtIHdpZHRoICogcmVuZGVyU2l6ZSAvIDIsIC0gaGVpZ2h0ICogcmVuZGVyU2l6ZSAvIDIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgXG4gICAgICogQHBhcmFtIHN0cm9rZSBTdHJva2UgdG8gcmVuZGVyXG4gICAgICogQHBhcmFtIHBhbGV0dGUgQ29udGFpbnMgdGhlIG1hc3RlciBwaWVjZSdzIGNvbG9yIHN3YXRjaGVzXG4gICAgICogQHBhcmFtIGN1c3RvbVJlbmRlclNpemUgUmVuZGVyIHRoZSBtYXN0ZXIgcGllY2Ugd2l0aCBjdXN0b20gY3ViZSBzaXppbmdcbiAgICAgKi9cbiAgICByZW5kZXJTdHJva2Uoc3Ryb2tlOiBzdHJva2UsIHBhbGV0dGU6IHN0cmluZ1tdLCBjdXN0b21SZW5kZXJTaXplPzogbnVtYmVyKXtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gcGFsZXR0ZVtzdHJva2Uuc3dhdGNoXTtcblxuICAgICAgICBpZiAoc3Ryb2tlLnR5cGUgJiYgc3Ryb2tlLnR5cGUgPT09IFN0cm9rZVR5cGVzLkNJUkMpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmFyYyhcbiAgICAgICAgICAgICAgICBzdHJva2UuY2VsbFggKiAoY3VzdG9tUmVuZGVyU2l6ZSA/IGN1c3RvbVJlbmRlclNpemUgOiB0aGlzLmN1YmVTaXplKSxcbiAgICAgICAgICAgICAgICBzdHJva2UuY2VsbFkgKiAoY3VzdG9tUmVuZGVyU2l6ZSA/IGN1c3RvbVJlbmRlclNpemUgOiB0aGlzLmN1YmVTaXplKSxcbiAgICAgICAgICAgICAgICBNYXRoLm1pbihzdHJva2Uud2lkdGgsIHN0cm9rZS5oZWlnaHQpICogKGN1c3RvbVJlbmRlclNpemUgPyBjdXN0b21SZW5kZXJTaXplIDogdGhpcy5jdWJlU2l6ZSksXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBNYXRoLlBJICogMlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgIHN0cm9rZS5jZWxsWCAqIChjdXN0b21SZW5kZXJTaXplID8gY3VzdG9tUmVuZGVyU2l6ZSA6IHRoaXMuY3ViZVNpemUpLFxuICAgICAgICAgICAgICAgIHN0cm9rZS5jZWxsWSAqIChjdXN0b21SZW5kZXJTaXplID8gY3VzdG9tUmVuZGVyU2l6ZSA6IHRoaXMuY3ViZVNpemUpLFxuICAgICAgICAgICAgICAgIHN0cm9rZS53aWR0aCAqIChjdXN0b21SZW5kZXJTaXplID8gY3VzdG9tUmVuZGVyU2l6ZSA6IHRoaXMuY3ViZVNpemUpLFxuICAgICAgICAgICAgICAgIHN0cm9rZS5oZWlnaHQgKiAoY3VzdG9tUmVuZGVyU2l6ZSA/IGN1c3RvbVJlbmRlclNpemUgOiB0aGlzLmN1YmVTaXplKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVyYXNlcyBldmVyeXRoaW5nIG9uIHRoZSBjYW52YXNcbiAgICAgKi9cbiAgICB3aXBlQ2FudmFzKCkge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhbnZhcycgd2lkdGggYW5kIGhlaWdodFxuICAgICAqL1xuICAgIHNpemUoKTogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9IHtcbiAgICAgICAgcmV0dXJuIHsgd2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHQgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIFBvcG92YSdzIGN1YmUgcmVuZGVyIHNpemVcbiAgICAgKi9cbiAgICBnZXRDdWJlU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jdWJlU2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIFBvcG92YSdzIGN1YmUgcmVuZGVyIHNpemVcbiAgICAgKiBAcGFyYW0gc2l6ZSBWYWx1ZSBmb3IgY3ViZSByZW5kZXIgc2l6ZVxuICAgICAqL1xuICAgIHNldEN1YmVTaXplKHNpemU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmN1YmVTaXplID0gc2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG1vdXNlIHBvc2l0aW9uIGFuZCBpZiBtb3VzZSBpcyBpbnNpZGUgY2FudmFzXG4gICAgICogQHBhcmFtIGV2dCBNb3VzZSBtb3ZlbWVudCBldmVudCwgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvblxuICAgICAqL1xuICAgIGdldE1vdXNlUG9zKGV2dDogYW55KTogbW91c2VQb3NpdGlvbiB7XG4gICAgICAgIHZhciByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBwb3NYID0gZXZ0LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgIHZhciBwb3NZID0gZXZ0LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgdmFyIG9mZkNhbnZhcyA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChwb3NYIDwgMCkge1xuICAgICAgICAgICAgcG9zWCA9IDA7XG4gICAgICAgICAgICBvZmZDYW52YXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NZIDwgMCkge1xuICAgICAgICAgICAgcG9zWSA9IDA7XG4gICAgICAgICAgICBvZmZDYW52YXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NYID4gdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgcG9zWCA9IHRoaXMud2lkdGg7XG4gICAgICAgICAgICBvZmZDYW52YXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NZID4gdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHBvc1kgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgICAgIG9mZkNhbnZhcyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHBvc1gsXG4gICAgICAgICAgeTogcG9zWSxcbiAgICAgICAgICBvdXRPZkJvdW5kczogb2ZmQ2FudmFzLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYXcgdGV4dCB0byB0aGUgY2FudmFzXG4gICAgICogQHBhcmFtIHRleHQgVGhlIHRleHQgdG8gZHJhd1xuICAgICAqIEBwYXJhbSBwb3NYIFRoZSBob3Jpem9udGFsIHBvc2l0aW9uIHRvIGRyYXcgdGhlIHRleHRcbiAgICAgKiBAcGFyYW0gcG9zWSBUaGUgdmVydGljYWwgcG9zaXRpb24gdG8gZHJhdyB0aGUgdGV4dFxuICAgICAqIEBwYXJhbSBzaXplIFRoZSBmb250IHNpemUgb2YgdGhlIHRleHRcbiAgICAgKiBAcGFyYW0gY29sb3IgVGhlIGNvbG9yIHRvIGRyYXcgdGhlIHRleHRcbiAgICAgKiBAcGFyYW0gZmFjaW5nIFRoZSBhbmdsZSB0byByZW5kZXIgdGhlIHRleHRcbiAgICAgKi9cbiAgICBkcmF3VGV4dCh0ZXh0OiBzdHJpbmcsIHBvc1g6IG51bWJlciwgcG9zWTogbnVtYmVyLCBzaXplPzogbnVtYmVyLCBjb2xvcj86IHN0cmluZywgZmFjaW5nPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcblxuICAgICAgICBjb25zdCBhY3R1YWxTaXplID0gc2l6ZSA/IHNpemUgOiAxNjtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFN0cmluZyhhY3R1YWxTaXplKSArIFwicHggQXJpYWxcIjtcbiAgICAgICAgdGhpcy5wcmVwQ2FudmFzKHBvc1gsIHBvc1ksIHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoLCAwLCBmYWNpbmcsIDEpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvciA/IGNvbG9yIDogXCJibGFja1wiO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0ZXh0LCAwLCAwKTtcblxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgKiBhcyBzb2NrZXRJbyBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xuaW1wb3J0IHsgUG9wb3ZhLCBtb3VzZVBvc2l0aW9uLCBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuL1BvcG92YS9Qb3BvdmFcIjtcbmltcG9ydCAqIGFzIGxvdXZyZSBmcm9tIFwiLi9Mb3V2cmUvTG91dnJlXCI7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vT2JqZWN0VHlwZXNcIjtcblxuLy8gU29ja2V0IGxpc3RlbmVyXG52YXIgc29ja2V0ID0gaW8oKTtcbnZhciBkZWJ1ZyA9IHRydWU7XG5cbnZhciBjdWJlU2l6ZTogbnVtYmVyO1xudmFyIGdyaWRTaXplOiBudW1iZXIgPSA0ODtcbnZhciBjYW52YXNTaXplOiB7IHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyIH07XG52YXIgZXF1aXBtZW50SWNvblBvc1g6IG51bWJlciA9IDk3NjtcbnZhciBlcXVpcG1lbnRJY29uUG9zWTogbnVtYmVyID0gNzI2O1xuXG52YXIgcGxheWVySWQ6IHN0cmluZztcblxudmFyIHJlbmRlck9mZnNldFg6IG51bWJlcjtcbnZhciByZW5kZXJPZmZzZXRZOiBudW1iZXI7XG52YXIgY2FtZXJhTW92aW5nVG9YOiBudW1iZXI7XG52YXIgY2FtZXJhTW92aW5nVG9ZOiBudW1iZXI7XG52YXIgY2FtZXJhUGFuU3BlZWQgPSAwLjAxNTtcblxudmFyIG1vdXNlUG9zOiBtb3VzZVBvc2l0aW9uID0geyB4OiAwLCB5OiAwLCBvdXRPZkJvdW5kczogdHJ1ZSB9O1xuXG52YXIgcGxheWVySW5wdXQgPSB7XG4gICAgdXA6IGZhbHNlLFxuICAgIGRvd246IGZhbHNlLFxuICAgIGxlZnQ6IGZhbHNlLFxuICAgIHJpZ2h0OiBmYWxzZSxcbiAgICBjeWNsZUVxdWlwbWVudEZvcndhcmQ6IGZhbHNlLFxuICAgIGN5Y2xlRXF1aXBtZW50QmFja3dhcmQ6IGZhbHNlLFxuICAgIHVzZUVxdWlwbWVudDogZmFsc2UsXG4gICAgcGlja3VwOiBmYWxzZSxcbiAgICBhYmlsaXR5MTogZmFsc2UsXG4gICAgYWJpbGl0eTI6IGZhbHNlLFxuICAgIGFiaWxpdHkzOiBmYWxzZSxcbiAgICBhYmlsaXR5NDogZmFsc2UsXG4gICAgdGFyZ2V0WDogbW91c2VQb3MueCxcbiAgICB0YXJnZXRZOiBtb3VzZVBvcy55LFxufVxuXG52YXIgS0VZX1VQID0gODc7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBXXG52YXIgS0VZX0RPV04gPSA4MzsgICAgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBTXG52YXIgS0VZX1JJR0hUID0gNjg7ICAgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBEXG52YXIgS0VZX0xFRlQgPSA2NTsgICAgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBBXG52YXIgS0VZX0NZQ0xFX0VRVUlQTUVOVF9GT1JXQVJEID0gNjk7ICAgLy8gRGVmYXVsdCB0byBFXG52YXIgS0VZX0NZQ0xFX0VRVUlQTUVOVF9CQUNLV0FSRCA9IDgxOyAgLy8gRGVmYXVsdCB0byBRXG52YXIgS0VZX1VTRV9FUVVJUE1FTlQgPSA4MiAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBSXG52YXIgS0VZX1BJQ0tVUCA9IDcwOyAgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBGXG52YXIgS0VZX0FCSUxJVFlfMSA9IDQ5OyAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byAxXG52YXIgS0VZX0FCSUxJVFlfMiA9IDUwOyAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byAyXG52YXIgS0VZX0FCSUxJVFlfMyA9IDUxOyAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byAzXG52YXIgS0VZX0FCSUxJVFlfNCA9IDUyOyAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byA0XG5cbnZhciBwcmV2VGltZSA9IDA7XG52YXIgZGVsdGEgPSAwO1xuXG4vLyBBZGQgbGlzdGVuZXJzIHRvIGRvY3VtZW50XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBLRVlfVVA6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC51cCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfRE9XTjpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmRvd24gPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX1JJR0hUOlxuICAgICAgICAgICAgcGxheWVySW5wdXQucmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0xFRlQ6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5sZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9DWUNMRV9FUVVJUE1FTlRfRk9SV0FSRDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmN5Y2xlRXF1aXBtZW50Rm9yd2FyZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfQ1lDTEVfRVFVSVBNRU5UX0JBQ0tXQVJEOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuY3ljbGVFcXVpcG1lbnRCYWNrd2FyZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfVVNFX0VRVUlQTUVOVDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LnVzZUVxdWlwbWVudCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfUElDS1VQOlxuICAgICAgICAgICAgcGxheWVySW5wdXQucGlja3VwID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9BQklMSVRZXzE6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5MSA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfQUJJTElUWV8yOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuYWJpbGl0eTIgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0FCSUxJVFlfMzpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmFiaWxpdHkzID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9BQklMSVRZXzQ6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5NCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGxheWVySW5wdXQudGFyZ2V0WCA9IG1vdXNlUG9zLnggKyByZW5kZXJPZmZzZXRYO1xuICAgIHBsYXllcklucHV0LnRhcmdldFkgPSBtb3VzZVBvcy55ICsgcmVuZGVyT2Zmc2V0WTtcbiAgICBzb2NrZXQuZW1pdChcInBsYXllcklucHV0XCIsIHBsYXllcklucHV0KTtcbiAgICBcbiAgICAvLyBUcmlnZ2VyIGtleXMgYXJlIHVuc2V0IGFmdGVyIGVtaXNzaW9uXG4gICAgcGxheWVySW5wdXQucGlja3VwID0gZmFsc2U7XG4gICAgcGxheWVySW5wdXQuY3ljbGVFcXVpcG1lbnRGb3J3YXJkID0gZmFsc2U7XG4gICAgcGxheWVySW5wdXQuY3ljbGVFcXVpcG1lbnRCYWNrd2FyZCA9IGZhbHNlO1xuICAgIHBsYXllcklucHV0LnVzZUVxdWlwbWVudCA9IGZhbHNlO1xufSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgS0VZX1VQOlxuICAgICAgICAgICAgcGxheWVySW5wdXQudXAgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9ET1dOOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX1JJR0hUOlxuICAgICAgICAgICAgcGxheWVySW5wdXQucmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9MRUZUOlxuICAgICAgICAgICAgcGxheWVySW5wdXQubGVmdCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0FCSUxJVFlfMTpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmFiaWxpdHkxID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfQUJJTElUWV8yOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuYWJpbGl0eTIgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9BQklMSVRZXzM6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5MyA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0FCSUxJVFlfNDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmFiaWxpdHk0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc29ja2V0LmVtaXQoXCJwbGF5ZXJJbnB1dFwiLCBwbGF5ZXJJbnB1dCk7XG59KTtcblxuZnVuY3Rpb24gb25Nb3VzZU1vdmUoZXZlbnQ6IGFueSkge1xuICAgIG1vdXNlUG9zID0gZm9yZWdyb3VuZC5nZXRNb3VzZVBvcyhldmVudCk7XG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSwgZmFsc2UpO1xuXG5mdW5jdGlvbiBvbk1vdXNlQ2xpY2soZXZlbnQ6IGFueSkge1xuICAgIGlmICghbW91c2VQb3Mub3V0T2ZCb3VuZHMpIHtcbiAgICAgICAgc29ja2V0LmVtaXQoXCJtb3VzZURvd25cIiwge1xuICAgICAgICAgICAgc291cmNlSWQ6IHBsYXllcklkLFxuICAgICAgICAgICAgdGFyZ2V0WDogKG1vdXNlUG9zLnggKyByZW5kZXJPZmZzZXRYKSxcbiAgICAgICAgICAgIHRhcmdldFk6IChtb3VzZVBvcy55ICsgcmVuZGVyT2Zmc2V0WSksXG4gICAgICAgICAgICBwbGF5ZXJJbnB1dDogcGxheWVySW5wdXQsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25Nb3VzZUNsaWNrLCBmYWxzZSk7XG5cbi8vIEluaXQgY2FudmFzXG52YXIgYmFja2dyb3VuZCAgPSBuZXcgUG9wb3ZhKCk7XG52YXIgZW52ICAgICAgICAgPSBuZXcgUG9wb3ZhKCk7XG52YXIgZm9yZWdyb3VuZCAgPSBuZXcgUG9wb3ZhKCk7XG52YXIgY292ZXIgICAgICAgPSBuZXcgUG9wb3ZhKCk7XG52YXIgdWkgICAgICAgICAgPSBuZXcgUG9wb3ZhKCk7XG5cbmJhY2tncm91bmQuaW5pdChcImJhY2tncm91bmRcIik7XG5lbnYuaW5pdChcImVudlwiKTtcbmZvcmVncm91bmQuaW5pdChcImZvcmVncm91bmRcIik7XG5jb3Zlci5pbml0KFwiY292ZXJcIik7XG51aS5pbml0KFwidWlcIik7XG5cbi8vIFRlbGwgdGhlIHNlcnZlciBhIG5ldyBwbGF5ZXIgaGFzIGpvaW5lZCBhbmQgaGFuZHNoYWtlXG5zb2NrZXQuZW1pdChcIm5ldy1wbGF5ZXJcIik7XG5zb2NrZXQub24oXCJoYW5kc2hha2VcIiwgKGluZm86IGFueSkgPT4ge1xuICAgIHBsYXllcklkID0gaW5mby5pZDtcbiAgICBjdWJlU2l6ZSA9IGluZm8uY3ViZVNpemU7XG4gICAgYmFja2dyb3VuZC5zZXRDdWJlU2l6ZShjdWJlU2l6ZSk7XG4gICAgZW52LnNldEN1YmVTaXplKGN1YmVTaXplKTtcbiAgICBmb3JlZ3JvdW5kLnNldEN1YmVTaXplKGN1YmVTaXplKTtcbiAgICBjb3Zlci5zZXRDdWJlU2l6ZShjdWJlU2l6ZSk7XG4gICAgdWkuc2V0Q3ViZVNpemUoY3ViZVNpemUpO1xuICAgIGNhbnZhc1NpemUgPSBmb3JlZ3JvdW5kLnNpemUoKTtcblxuICAgIHByZXZUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZW5kZXJPZmZzZXRYID0gMDtcbiAgICByZW5kZXJPZmZzZXRZID0gMDtcbn0pO1xuXG4vLyBJbnRlcnByZXQgc3RhdGUgYW5kIGRyYXcgb2JqZWN0c1xuc29ja2V0Lm9uKFwic3RhdGVcIiwgKG9iamVjdHM6IGFueSkgPT4ge1xuICAgIHZhciBwbGF5ZXIgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHBsYXllcklkICYmIG9iamVjdHNbcGxheWVySWRdKSB7XG4gICAgICAgIHBsYXllciA9IG9iamVjdHNbcGxheWVySWRdO1xuICAgIH1cblxuICAgIGlmICghY2FudmFzU2l6ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yZWdyb3VuZC53aXBlQ2FudmFzKCk7XG4gICAgZW52LndpcGVDYW52YXMoKTtcbiAgICBjb3Zlci53aXBlQ2FudmFzKCk7XG4gICAgdWkud2lwZUNhbnZhcygpO1xuXG4gICAgY29uc3QgdGltZSA9IERhdGUubm93KCk7XG4gICAgZGVsdGEgPSB0aW1lIC0gcHJldlRpbWU7XG4gICAgcHJldlRpbWUgPSB0aW1lO1xuXG4gICAgLy8gQ2FtZXJhIHNtb290aGluZyBhbmQgcmVuZGVyIG9mZnNldCBjYWxjdWxhdGlvbnNcbiAgICBjYW1lcmFNb3ZpbmdUb1ggPSAoISFwbGF5ZXIpXG4gICAgICAgID8gcGxheWVyLnggKyAobW91c2VQb3MueCAtIChjYW52YXNTaXplLndpZHRoIC8gMikpICogcGxheWVyLnZpZXdSYW5nZSAtIGNhbnZhc1NpemUud2lkdGggLyAyXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIGNhbWVyYU1vdmluZ1RvWSA9ICghIXBsYXllcilcbiAgICAgICAgPyBwbGF5ZXIueSArIChtb3VzZVBvcy55IC0gKGNhbnZhc1NpemUuaGVpZ2h0IC8gMikpICogcGxheWVyLnZpZXdSYW5nZSAtIGNhbnZhc1NpemUuaGVpZ2h0IC8gMlxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIHJlbmRlck9mZnNldFggKz0gKCEhY2FtZXJhTW92aW5nVG9YKVxuICAgICAgICA/IChjYW1lcmFNb3ZpbmdUb1ggLSByZW5kZXJPZmZzZXRYKSAqIGNhbWVyYVBhblNwZWVkICogZGVsdGFcbiAgICAgICAgOiAwO1xuICAgIHJlbmRlck9mZnNldFkgKz0gKCEhY2FtZXJhTW92aW5nVG9ZKVxuICAgICAgICA/IChjYW1lcmFNb3ZpbmdUb1kgLSByZW5kZXJPZmZzZXRZKSAqIGNhbWVyYVBhblNwZWVkICogZGVsdGFcbiAgICAgICAgOiAwO1xuXG4gICAgLy8gVE9ETzogRHJhdyBiYWNrZ3JvdW5kIG1hcCAoaW5zdGVhZCBvZi93aXRoIGdyaWQpXG4gICAgaWYgKCEhb2JqZWN0cykge1xuICAgICAgICBiYWNrZ3JvdW5kLndpcGVDYW52YXMoKTtcbiAgICAgICAgLy8gYmFja2dyb3VuZC5kcmF3R3JpZChncmlkU2l6ZSwgLXJlbmRlck9mZnNldFgsIC1yZW5kZXJPZmZzZXRZKTtcbiAgICB9XG5cbiAgICBpZiAoZGVidWcpIHtcbiAgICAgICAgdWkuZHJhd1RleHQoZGVsdGEudG9TdHJpbmcoKSArIFwibXNcIiwgY2FudmFzU2l6ZS53aWR0aCAtIDMyLCAxNiwgMTYsIFwiIzQ0NDQ0NFwiKTtcbiAgICB9XG5cbiAgICAvLyBSZW5kZXIgY3VycmVudCBlcXVpcG1lbnQgdWkgaWNvblxuICAgIGxvdXZyZS5yZW5kZXJDdXJyZW50RXF1aXBtZW50KHBsYXllciwgZXF1aXBtZW50SWNvblBvc1gsIGVxdWlwbWVudEljb25Qb3NZLCB1aSk7XG5cbiAgICAvLyBSZW5kZXIgcGxheWVyJ3MgYWJpbGl0aWVzXG4gICAgbG91dnJlLnJlbmRlckFiaWxpdGllcyhwbGF5ZXIsIHVpKTtcblxuICAgIC8vIFJlbmRlciBvYmplY3RzXG4gICAgbG91dnJlLnJlbmRlck9iamVjdHMob2JqZWN0cywgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSwgY3ViZVNpemUsIGJhY2tncm91bmQsIGVudiwgZm9yZWdyb3VuZCwgY292ZXIsIHVpKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==