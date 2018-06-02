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
var enemyHeight = 4;
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
            // TODO: Make better deathrattle...
            // prefabs.generateNew(obs, selfRef, obs[selfRef].x, obs[selfRef].y, types.ObjectTypes.GRAVESTONE);
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
                            if (fireDamage)
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
                            if (fireDamage)
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
                            if (fireDamage)
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
/* harmony import */ var _Prefabs_Interactable_HealthPickup_template__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../Prefabs/Interactable/HealthPickup.template */ "./Prefabs/Interactable/HealthPickup.template.ts");
/* harmony import */ var _Prefabs_Interactable_PlayerTypeChanger_template__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../Prefabs/Interactable/PlayerTypeChanger.template */ "./Prefabs/Interactable/PlayerTypeChanger.template.ts");
/* harmony import */ var _Prefabs_Trigger_SpikeTrap_template__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../Prefabs/Trigger/SpikeTrap.template */ "./Prefabs/Trigger/SpikeTrap.template.ts");
/* harmony import */ var _Prefabs_Vehicle_Car_template__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../Prefabs/Vehicle/Car.template */ "./Prefabs/Vehicle/Car.template.ts");
/* harmony import */ var _Prefabs_Equipment_Binoculars_icon__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../Prefabs/Equipment/Binoculars.icon */ "./Prefabs/Equipment/Binoculars.icon.ts");
/* harmony import */ var _Prefabs_Equipment_Blaster_icon__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../Prefabs/Equipment/Blaster.icon */ "./Prefabs/Equipment/Blaster.icon.ts");
/* harmony import */ var _Prefabs_Equipment_Builder_icon__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../Prefabs/Equipment/Builder.icon */ "./Prefabs/Equipment/Builder.icon.ts");
/* harmony import */ var _Prefabs_Equipment_Scanner_icon__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../Prefabs/Equipment/Scanner.icon */ "./Prefabs/Equipment/Scanner.icon.ts");
/* harmony import */ var _Prefabs_Enemy_Enemy_template__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../Prefabs/Enemy/_Enemy.template */ "./Prefabs/Enemy/_Enemy.template.ts");

























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
            case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["ObjectTypes"].ENEMY:
                switch (object.subtype) {
                    case _ObjectTypes__WEBPACK_IMPORTED_MODULE_0__["Enemy"].TARGET_DUMMY:
                        foreground.draw(_Prefabs_Enemy_Enemy_template__WEBPACK_IMPORTED_MODULE_24__["enemyMasterPiece"](object, renderOffsetX, renderOffsetY));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vQ29sbGlzaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9PYmplY3RUeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0FiaWxpdGllcy9GaXJlYm9sdC5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0FiaWxpdGllcy9GbGFtZUJhcnJpZXIuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9BYmlsaXRpZXMvRmxhbWVEYXNoLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvQWJpbGl0aWVzL0ZsYW1lUGlsbGFyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvQ29tYmF0VGV4dC9EYW1hZ2VUZXh0LmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvQ29tYmF0VGV4dC9GaXJlRGFtYWdlVGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0NvbWJhdFRleHQvSGVhbFRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9Db21iYXRUZXh0L0ludnVsbmVyYWJsZVRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9Db21iYXRUZXh0L19Db21iYXRUZXh0LmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRW5lbXkvX0VuZW15LmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRW5lbXkvX0VuZW15LnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRXF1aXBtZW50L0Jpbm9jdWxhcnMuaWNvbi50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0VxdWlwbWVudC9CaW5vY3VsYXJzLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRXF1aXBtZW50L0JsYXN0ZXIuaWNvbi50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0VxdWlwbWVudC9CbGFzdGVyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRXF1aXBtZW50L0J1aWxkZXIuaWNvbi50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0VxdWlwbWVudC9CdWlsZGVyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvRXF1aXBtZW50L1NjYW5uZXIuaWNvbi50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0VxdWlwbWVudC9TY2FubmVyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvR3JhdmVzdG9uZS9fR3JhdmVzdG9uZS5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0dyYXZlc3RvbmUvX0dyYXZlc3RvbmUudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9JbnRlcmFjdGFibGUvQ2FyRW50ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9JbnRlcmFjdGFibGUvSGVhbHRoUGlja3VwLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvSW50ZXJhY3RhYmxlL0hlYWx0aFBpY2t1cC50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0ludGVyYWN0YWJsZS9QbGF5ZXJUeXBlQ2hhbmdlci5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0ludGVyYWN0YWJsZS9QbGF5ZXJUeXBlQ2hhbmdlci50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL0ludGVyYWN0YWJsZS9fSW50ZXJhY3RhYmxlLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL0ZpcmVNYWdlLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL0ZpcmVNYWdlLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL0dvZC5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1BsYXllci9Hb2QudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9QbGF5ZXIvSGVhbHRoQmFyLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL1N0YXR1c0VmZmVjdHMvSW52dWxuZXJhYmxlLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL1N0YXR1c0VmZmVjdHMvU3R1bm5lZC50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1BsYXllci9fUGxheWVyLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUGxheWVyL19QbGF5ZXIudGVtcGxhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9QcmVmYWJVdGlscy5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1ByZWZhYnMuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9Qcm9qZWN0aWxlL0ZpcmVib2x0UHJvamVjdGlsZS5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1Byb2plY3RpbGUvRmlyZWJvbHRQcm9qZWN0aWxlLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUHJvamVjdGlsZS9GbGFtZURhc2hQcm9qZWN0aWxlLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUHJvamVjdGlsZS9GbGFtZURhc2hQcm9qZWN0aWxlLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvUHJvamVjdGlsZS9GbGFtZVBpbGxhclByb2plY3RpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9Qcm9qZWN0aWxlL0ZsYW1lUGlsbGFyUHJvamVjdGlsZS50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1Byb2plY3RpbGUvX1Byb2plY3RpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9Qcm9qZWN0aWxlL19Qcm9qZWN0aWxlLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVGVycmFpbi9UcmVlLmpzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVGVycmFpbi9UcmVlLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVGVycmFpbi9XYWxsSG9yaXouanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9UZXJyYWluL1dhbGxIb3Jpei50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1RlcnJhaW4vX1RlcnJhaW4uanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9UZXJyYWluL19UZXJyYWluLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVHJpZ2dlci9TcGlrZVRyYXAuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9UcmlnZ2VyL1NwaWtlVHJhcC50ZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1RyaWdnZXIvX1RyaWdnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vUHJlZmFicy9WZWhpY2xlL0Nhci5qcyIsIndlYnBhY2s6Ly8vLi9QcmVmYWJzL1ZlaGljbGUvQ2FyLnRlbXBsYXRlLnRzIiwid2VicGFjazovLy8uL1ByZWZhYnMvVmVoaWNsZS9fVmVoaWNsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTG91dnJlL0xvdXZyZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUG9wb3ZhL1BvcG92YS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25FQSxJQUFJLEtBQUssR0FBRyxtQkFBTyxDQUFDLHVDQUFlLENBQUMsQ0FBQztBQUVyQyxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2IsdUNBQXVDO0lBQ3ZDLGVBQWUsRUFBRSxVQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLFFBQVE7UUFDakQsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXhCLEtBQUssRUFBRSxJQUFJLEdBQUcsRUFBRTtZQUNaLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFFdEIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsUUFBUSxHQUFHLENBQUMsVUFBVSxFQUFFO29CQUNwQixLQUFLLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSTt3QkFDdkIsUUFBUSxLQUFLLENBQUMsVUFBVSxFQUFFOzRCQUN0QixLQUFLLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSTtnQ0FDdkIsU0FBUyxHQUFHLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0NBQzNELE1BQU07NEJBQ1YsS0FBSyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUk7Z0NBQ3ZCLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dDQUMzRCxNQUFNO3lCQUNiO3dCQUNELE1BQU07b0JBQ1YsS0FBSyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUk7d0JBQ3ZCLFFBQVEsS0FBSyxDQUFDLFVBQVUsRUFBRTs0QkFDdEIsS0FBSyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUk7Z0NBQ3ZCLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dDQUMzRCxNQUFNOzRCQUNWLEtBQUssS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJO2dDQUN2QixTQUFTLEdBQUcsc0JBQXNCLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztnQ0FDM0QsTUFBTTt5QkFDYjt3QkFDRCxNQUFNO2lCQUNiO2dCQUVELElBQUksU0FBUztvQkFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3pDO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsbURBQW1EO0lBQ25ELHlCQUF5QixFQUFFLFVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUTtRQUN4RCxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFeEIsS0FBSyxFQUFFLElBQUksR0FBRyxFQUFFO1lBQ1osSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXBCLElBQUksS0FBSyxFQUFFO2dCQUNQLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbEMsSUFBSSxJQUFJLElBQUksT0FBTztvQkFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNyRDtTQUNKO0lBQ0wsQ0FBQztJQUNELDBEQUEwRDtJQUMxRCxvQkFBb0IsRUFBRSxVQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxRQUFRO1FBQzVELEtBQUssRUFBRSxJQUFJLEdBQUcsRUFBRTtZQUNaLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVwQixJQUFJLEtBQUssRUFBRTtnQkFDUCxJQUFJLEdBQUcsR0FDSCxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO29CQUNoSCxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7Z0JBRXJILElBQUksR0FBRyxHQUNILFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7b0JBQ2xILFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQztnQkFFdkgsSUFBSSxHQUFHLElBQUksR0FBRztvQkFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDaEM7U0FDSjtJQUNMLENBQUM7SUFDRCxRQUFRLEVBQUUsVUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxVQUFVO1FBQzFDLHlHQUF5RztRQUN6RyxJQUFJLFNBQVMsR0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1SixJQUFJLFFBQVEsR0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1SixJQUFJLE1BQU0sR0FBUSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5SixJQUFJLFFBQVEsR0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksR0FBRyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU5SixJQUFJLFNBQVMsR0FBRyxRQUFRLElBQUksU0FBUyxHQUFHLE1BQU0sSUFBSSxTQUFTLEdBQUcsUUFBUSxFQUFFO1lBQ3BFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7U0FDM0M7UUFDRCxJQUFJLFFBQVEsR0FBRyxTQUFTLElBQUksUUFBUSxHQUFHLE1BQU0sSUFBSSxRQUFRLEdBQUcsUUFBUSxFQUFFO1lBQ2xFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDMUM7UUFDRCxJQUFJLE1BQU0sR0FBRyxTQUFTLElBQUksTUFBTSxHQUFHLFFBQVEsSUFBSSxNQUFNLEdBQUcsUUFBUSxFQUFFO1lBQzlELEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7U0FDeEM7UUFDRCxJQUFJLFFBQVEsR0FBRyxTQUFTLElBQUksUUFBUSxHQUFHLFFBQVEsSUFBSSxRQUFRLEdBQUcsTUFBTSxFQUFFO1lBQ2xFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDMUM7SUFDTCxDQUFDO0NBQ0o7QUFFRCxxRUFBcUU7QUFDckUsc0JBQXNCLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRztJQUNqQyxPQUFPLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFFRCwrQkFBK0I7QUFDL0IsZ0NBQWdDLEdBQUcsRUFBRSxLQUFLLEVBQUUsVUFBVTtJQUNsRCxJQUFJLEdBQUcsR0FDSCxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7UUFDbEosWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDO1FBQ2xKLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUM5SSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQztJQUVuSixJQUFJLEdBQUcsR0FDSCxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7UUFDckosWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFD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QUFvQixDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbEgsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwidmFyIHR5cGVzID0gcmVxdWlyZShcIi4vT2JqZWN0VHlwZXNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIC8vIENoZWNrIGNvbGxpc2lvbnMgYmV0d2VlbiBhbGwgb2JqZWN0c1xuICAgIGNoZWNrQ29sbGlzaW9uczogKGNoZWNrU3JjLCBvYnMsIHJlbmRlclNpemUsIGNhbGxCYWNrKSA9PiB7XG4gICAgICAgIHZhciBzcmMgPSBvYnNbY2hlY2tTcmNdO1xuXG4gICAgICAgIGZvciAoaWQgaW4gb2JzKSB7XG4gICAgICAgICAgICB2YXIgY2hlY2sgPSBvYnNbaWRdO1xuICAgICAgICAgICAgdmFyIGNvbGxpc2lvbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoY2hlY2spIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHNyYy5oaXRib3hUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuSGl0Ym94VHlwZXMuUkVDVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hlY2suaGl0Ym94VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuSGl0Ym94VHlwZXMuUkVDVDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uID0gY2hlY2tDb2xsaXNpb25SZWN0UmVjdChzcmMsIGNoZWNrLCByZW5kZXJTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5IaXRib3hUeXBlcy5DSVJDOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb24gPSBjaGVja0NvbGxpc2lvbkNpcmNSZWN0KGNoZWNrLCBzcmMsIHJlbmRlclNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkhpdGJveFR5cGVzLkNJUkM6XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNoZWNrLmhpdGJveFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkhpdGJveFR5cGVzLlJFQ1Q6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbiA9IGNoZWNrQ29sbGlzaW9uQ2lyY1JlY3Qoc3JjLCBjaGVjaywgcmVuZGVyU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuSGl0Ym94VHlwZXMuQ0lSQzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uID0gY2hlY2tDb2xsaXNpb25DaXJjQ2lyYyhzcmMsIGNoZWNrLCByZW5kZXJTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29sbGlzaW9uKSBjYWxsQmFjayhjaGVja1NyYywgaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBDaGVjayBjb2xsaXNpb25zIGJldHdlZW4gYWxsIG9iamVjdHMgYnkgZGlzdGFuY2VcbiAgICBjaGVja0NvbGxpc2lvbnNCeURpc3RhbmNlOiAoY2hlY2tTcmMsIG9icywgbWF4RGlzdCwgY2FsbEJhY2spID0+IHtcbiAgICAgICAgdmFyIHNyYyA9IG9ic1tjaGVja1NyY107XG5cbiAgICAgICAgZm9yIChpZCBpbiBvYnMpIHtcbiAgICAgICAgICAgIHZhciBjaGVjayA9IG9ic1tpZF07XG5cbiAgICAgICAgICAgIGlmIChjaGVjaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoXG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KHNyYy54IC0gY2hlY2sueCwgMikgK1xuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhzcmMueSAtIGNoZWNrLnksIDIpKTtcblxuICAgICAgICAgICAgICAgIGlmIChkaXN0IDw9IG1heERpc3QpIGNhbGxCYWNrKGNoZWNrU3JjLCBpZCwgZGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIENoZWNrIGNvbGxpc2lvbnMgYmV0d2VlbiBjbGljayBsb2NhdGlvbiBhbmQgYWxsIG9iamVjdHNcbiAgICBjaGVja0NsaWNrQ29sbGlzaW9uczogKGNsaWNrWCwgY2xpY2tZLCBvYnMsIHJlbmRlclNpemUsIGNhbGxCYWNrKSA9PiB7XG4gICAgICAgIGZvciAoaWQgaW4gb2JzKSB7XG4gICAgICAgICAgICB2YXIgY2hlY2sgPSBvYnNbaWRdO1xuXG4gICAgICAgICAgICBpZiAoY2hlY2spIHtcbiAgICAgICAgICAgICAgICB2YXIgeEluID0gXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlSW5SYW5nZShjbGlja1gsIGNoZWNrLnggLSBjaGVjay5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay54ICsgY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVJblJhbmdlKGNsaWNrWCwgY2hlY2sueCAtIGNoZWNrLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUsIGNoZWNrLnggKyBjaGVjay5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplKTtcblxuICAgICAgICAgICAgICAgIHZhciB5SW4gPVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZUluUmFuZ2UoY2xpY2tZLCBjaGVjay55IC0gY2hlY2suaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUsIGNoZWNrLnkgKyBjaGVjay5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVJblJhbmdlKGNsaWNrWSwgY2hlY2sueSAtIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay55ICsgY2hlY2suaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHhJbiAmJiB5SW4pIGNhbGxCYWNrKGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcHVzaEJhY2s6IChvYnMsIHNyY0lkLCBjb2xsaXNpb25JZCwgcmVuZGVyU2l6ZSkgPT4ge1xuICAgICAgICAvLyBQdXNoIG9iamVjdCBiYWNrIG91dCBvZiBjb2xsaXNpb24gdGVycmFpbiB0b3dhcmRzIHdoaWNoIGV2ZXIgc2lkZSBpcyB0aGUgY2xvc2VzdCB0byB0aGUgdGVycmFpbiBvYmplY3RcbiAgICAgICAgdmFyIGRpc3RSaWdodCAgID0gTWF0aC5hYnMoKG9ic1tjb2xsaXNpb25JZF0ueCAtIG9ic1tjb2xsaXNpb25JZF0uaGl0Ym94V2lkdGggKiByZW5kZXJTaXplIC8gMikgLSAob2JzW3NyY0lkXS54ICsgb2JzW3NyY0lkXS5oaXRib3hXaWR0aCAqIHJlbmRlclNpemUgLyAyKSk7XG4gICAgICAgIHZhciBkaXN0TGVmdCAgICA9IE1hdGguYWJzKChvYnNbY29sbGlzaW9uSWRdLnggKyBvYnNbY29sbGlzaW9uSWRdLmhpdGJveFdpZHRoICogcmVuZGVyU2l6ZSAvIDIpIC0gKG9ic1tzcmNJZF0ueCAtIG9ic1tzcmNJZF0uaGl0Ym94V2lkdGggKiByZW5kZXJTaXplIC8gMikpO1xuICAgICAgICB2YXIgZGlzdFVwICAgICAgPSBNYXRoLmFicygob2JzW2NvbGxpc2lvbklkXS55ICsgb2JzW2NvbGxpc2lvbklkXS5oaXRib3hIZWlnaHQgKiByZW5kZXJTaXplIC8gMikgLSAob2JzW3NyY0lkXS55IC0gb2JzW3NyY0lkXS5oaXRib3hIZWlnaHQgKiByZW5kZXJTaXplIC8gMikpO1xuICAgICAgICB2YXIgZGlzdERvd24gICAgPSBNYXRoLmFicygob2JzW2NvbGxpc2lvbklkXS55IC0gb2JzW2NvbGxpc2lvbklkXS5oaXRib3hIZWlnaHQgKiByZW5kZXJTaXplIC8gMikgLSAob2JzW3NyY0lkXS55ICsgb2JzW3NyY0lkXS5oaXRib3hIZWlnaHQgKiByZW5kZXJTaXplIC8gMikpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGRpc3RSaWdodCA8IGRpc3RMZWZ0ICYmIGRpc3RSaWdodCA8IGRpc3RVcCAmJiBkaXN0UmlnaHQgPCBkaXN0RG93bikge1xuICAgICAgICAgICAgb2JzW3NyY0lkXS54ID0gb2JzW3NyY0lkXS54IC0gZGlzdFJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXN0TGVmdCA8IGRpc3RSaWdodCAmJiBkaXN0TGVmdCA8IGRpc3RVcCAmJiBkaXN0TGVmdCA8IGRpc3REb3duKSB7XG4gICAgICAgICAgICBvYnNbc3JjSWRdLnggPSBvYnNbc3JjSWRdLnggKyBkaXN0TGVmdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGlzdFVwIDwgZGlzdFJpZ2h0ICYmIGRpc3RVcCA8IGRpc3RMZWZ0ICYmIGRpc3RVcCA8IGRpc3REb3duKSB7XG4gICAgICAgICAgICBvYnNbc3JjSWRdLnkgPSBvYnNbc3JjSWRdLnkgKyBkaXN0VXA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpc3REb3duIDwgZGlzdFJpZ2h0ICYmIGRpc3REb3duIDwgZGlzdExlZnQgJiYgZGlzdERvd24gPCBkaXN0VXApIHtcbiAgICAgICAgICAgIG9ic1tzcmNJZF0ueSA9IG9ic1tzcmNJZF0ueSAtIGRpc3REb3duO1xuICAgICAgICB9XG4gICAgfSxcbn1cblxuLy8gQ29sbGlzaW9uIGRldGVjdGlvbiBoZWxwZXIsIGNoZWNrcyBpZiB2YWx1ZSBpcyBiZXR3ZWVuIG1pbiBhbmQgbWF4XG5mdW5jdGlvbiB2YWx1ZUluUmFuZ2UodmFsdWUsIG1pbiwgbWF4KSB7IFxuICAgIHJldHVybiAodmFsdWUgPj0gbWluKSAmJiAodmFsdWUgPD0gbWF4KTsgXG59XG5cbi8vIENoZWNrIGNvbGxpc2lvbjogcmVjdCAtIHJlY3RcbmZ1bmN0aW9uIGNoZWNrQ29sbGlzaW9uUmVjdFJlY3Qoc3JjLCBjaGVjaywgcmVuZGVyU2l6ZSkge1xuICAgIHZhciB4SW4gPSBcbiAgICAgICAgdmFsdWVJblJhbmdlKHNyYy54IC0gc3JjLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUsIGNoZWNrLnggLSBjaGVjay5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay54ICsgY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSkgfHxcbiAgICAgICAgdmFsdWVJblJhbmdlKHNyYy54ICsgc3JjLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUsIGNoZWNrLnggLSBjaGVjay5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay54ICsgY2hlY2suaGl0Ym94V2lkdGggLyAyICogcmVuZGVyU2l6ZSkgfHxcbiAgICAgICAgdmFsdWVJblJhbmdlKGNoZWNrLnggLSBjaGVjay5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBzcmMueCAtIHNyYy5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplLCBzcmMueCArIHNyYy5oaXRib3hXaWR0aCAvIDIgKiByZW5kZXJTaXplKSB8fFxuICAgICAgICB2YWx1ZUluUmFuZ2UoY2hlY2sueCArIGNoZWNrLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUsIHNyYy54IC0gc3JjLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUsIHNyYy54ICsgc3JjLmhpdGJveFdpZHRoIC8gMiAqIHJlbmRlclNpemUpO1xuXG4gICAgdmFyIHlJbiA9XG4gICAgICAgIHZhbHVlSW5SYW5nZShzcmMueSAtIHNyYy5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueSAtIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay55ICsgY2hlY2suaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUpIHx8XG4gICAgICAgIHZhbHVlSW5SYW5nZShzcmMueSArIHNyYy5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSwgY2hlY2sueSAtIGNoZWNrLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplLCBjaGVjay55ICsgY2hlY2suaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUpIHx8XG4gICAgICAgIHZhbHVlSW5SYW5nZShjaGVjay55IC0gY2hlY2suaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUsIHNyYy55IC0gc3JjLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplLCBzcmMueSArIHNyYy5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSkgfHxcbiAgICAgICAgdmFsdWVJblJhbmdlKGNoZWNrLnkgKyBjaGVjay5oaXRib3hIZWlnaHQgLyAyICogcmVuZGVyU2l6ZSwgc3JjLnkgLSBzcmMuaGl0Ym94SGVpZ2h0IC8gMiAqIHJlbmRlclNpemUsIHNyYy55ICsgc3JjLmhpdGJveEhlaWdodCAvIDIgKiByZW5kZXJTaXplKTtcblxuICAgIHJldHVybiB4SW4gJiYgeUluO1xufVxuXG4vLyBDaGVjayBjb2xsaXNpb246IGNpcmMgLSByZWN0XG5mdW5jdGlvbiBjaGVja0NvbGxpc2lvbkNpcmNSZWN0KHNyYywgY2hlY2ssIHJlbmRlclNpemUpIHtcbiAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKFxuICAgICAgICBzcmMueSAtIGNoZWNrLnksXG4gICAgICAgIHNyYy54IC0gY2hlY2sueCk7XG5cbiAgICB2YXIgd2lkdGggPSBNYXRoLmFicyhNYXRoLmNvcyhhbmdsZSkgKiBzcmMuaGl0Ym94UmFkaXVzICogMik7XG4gICAgdmFyIGhlaWdodCA9IE1hdGguYWJzKE1hdGguc2luKGFuZ2xlKSAqIHNyYy5oaXRib3hSYWRpdXMgKiAyKTtcblxuICAgIHJldHVybiBjaGVja0NvbGxpc2lvblJlY3RSZWN0KFxuICAgICAgICB7IHg6IHNyYy54LCB5OiBzcmMueSwgaGl0Ym94V2lkdGg6IHdpZHRoLCBoaXRib3hIZWlnaHQ6IGhlaWdodCB9LFxuICAgICAgICBjaGVjayxcbiAgICAgICAgcmVuZGVyU2l6ZVxuICAgICk7XG59XG5cbi8vIENoZWNrIGNvbGxpc2lvbjogY2lyYyAtIGNpcmNcbmZ1bmN0aW9uIGNoZWNrQ29sbGlzaW9uQ2lyY0NpcmMoc3JjLCBjaGVjaywgcmVuZGVyU2l6ZSkge1xuICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIoXG4gICAgICAgIHNyYy55IC0gY2hlY2sueSxcbiAgICAgICAgc3JjLnggLSBjaGVjay54KTtcblxuICAgIHZhciB3aWR0aCA9IE1hdGguYWJzKE1hdGguY29zKGFuZ2xlKSAqIHNyYy5oaXRib3hSYWRpdXMgKiAyKTtcbiAgICB2YXIgaGVpZ2h0ID0gTWF0aC5hYnMoTWF0aC5zaW4oYW5nbGUpICogc3JjLmhpdGJveFJhZGl1cyAqIDIpO1xuXG4gICAgcmV0dXJuIGNoZWNrQ29sbGlzaW9uQ2lyY1JlY3QoXG4gICAgICAgIGNoZWNrLFxuICAgICAgICB7IHg6IHNyYy54LCB5OiBzcmMueSwgaGl0Ym94V2lkdGg6IHdpZHRoLCBoaXRib3hIZWlnaHQ6IGhlaWdodCB9LFxuICAgICAgICByZW5kZXJTaXplXG4gICAgKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIE9iamVjdFR5cGVzOiB7XG4gICAgICAgIFBMQVlFUjogXCJwbGF5ZXJcIixcbiAgICAgICAgR1JBVkVTVE9ORTogXCJncmF2ZXN0b25lXCIsXG4gICAgICAgIFBST0pFQ1RJTEU6IFwicHJvamVjdGlsZVwiLFxuICAgICAgICBURVJSQUlOOiBcInRlcnJhaW5cIixcbiAgICAgICAgSU5URVJBQ1RBQkxFOiBcImludGVyYWN0YWJsZVwiLFxuICAgICAgICBUUklHR0VSOiBcInRyaWdnZXJcIixcbiAgICAgICAgVkVISUNMRTogXCJ2ZWhpY2xlXCIsXG4gICAgICAgIENPTUJBVF9URVhUOiBcImNvbWJhdC10ZXh0XCIsXG4gICAgICAgIEVORU1ZOiBcImVuZW15XCIsXG4gICAgfSxcbiAgICBQbGF5ZXI6IHtcbiAgICAgICAgSFVNQU46IFwiaHVtYW5cIixcbiAgICAgICAgR09EOiBcImdvZFwiLFxuICAgICAgICBGSVJFX01BR0U6IFwiZmlyZS1tYWdlXCIsXG4gICAgfSxcbiAgICBQcm9qZWN0aWxlOiB7XG4gICAgICAgIEJBU0lDX1BST0pFQ1RJTEU6IFwiYmFzaWMtcHJvamVjdGlsZVwiLFxuICAgICAgICBGSVJFQk9MVF9QUk9KRUNUSUxFOiBcImZpcmVib2x0LXByb2plY3RpbGVcIixcbiAgICAgICAgRkxBTUVfUElMTEFSX1BST0pFQ1RJTEU6IFwiZmxhbWUtcGlsbGFyLXByb2plY3RpbGVcIixcbiAgICAgICAgRkxBTUVfREFTSF9QUk9KRUNUSUxFOiBcImZsYW1lLWRhc2gtcHJvamVjdGlsZVwiLFxuICAgIH0sXG4gICAgVGVycmFpbjoge1xuICAgICAgICBUUkVFOiBcInRyZWVcIixcbiAgICAgICAgV0FMTF9IT1JJWjogXCJ3YWxsLWhvcml6XCIsXG4gICAgfSxcbiAgICBJbnRlcmFjdGFibGU6IHtcbiAgICAgICAgSEVBTFRIX1BJQ0tVUDogXCJoZWFsdGgtcGlja3VwXCIsXG4gICAgICAgIENBUl9FTlRFUjogXCJjYXItZW50ZXJcIixcbiAgICAgICAgUExBWUVSX1RZUEVfQ0hBTkdFUjogXCJwbGF5ZXItdHlwZS1jaGFuZ2VyXCIsXG4gICAgfSxcbiAgICBUcmlnZ2VyOiB7XG4gICAgICAgIFNQSUtFX1RSQVA6IFwic3Bpa2UtdHJhcFwiLFxuICAgIH0sXG4gICAgVmVoaWNsZToge1xuICAgICAgICBDQVI6IFwiY2FyXCIsXG4gICAgfSxcbiAgICBFcXVpcG1lbnRUeXBlczoge1xuICAgICAgICBCTEFTVEVSOiBcImJsYXN0ZXJcIixcbiAgICAgICAgU0NBTk5FUjogXCJzY2FubmVyXCIsXG4gICAgICAgIEJVSUxERVI6IFwiYnVpbGRlclwiLFxuICAgICAgICBCSU5PQ1VMQVJTOiBcImJpbm9jdWxhcnNcIixcbiAgICB9LFxuICAgIEFiaWxpdGllczoge1xuICAgICAgICBGSVJFQk9MVDogXCJmaXJlYm9sdFwiLFxuICAgICAgICBGTEFNRV9QSUxMQVI6IFwiZmxhbWUtcGlsbGFyXCIsXG4gICAgICAgIEZMQU1FX0RBU0g6IFwiZmxhbWUtZGFzaFwiLFxuICAgICAgICBGTEFNRV9CQVJSSUVSOiBcImZsYW1lLWJhcnJpZXJcIixcbiAgICB9LFxuICAgIFN0YXR1c0VmZmVjdHM6IHtcbiAgICAgICAgU1RVTk5FRDogXCJzdHVubmVkXCIsXG4gICAgICAgIElOVlVMTkVSQUJMRTogXCJpbnZ1bG5lcmFibGVcIixcbiAgICB9LFxuICAgIENvbWJhdFRleHQ6IHtcbiAgICAgICAgREFNQUdFX1RFWFQ6IFwiZGFtYWdlLXRleHRcIixcbiAgICAgICAgRklSRV9EQU1BR0VfVEVYVDogXCJmaXJlLWRhbWFnZS10ZXh0XCIsXG4gICAgICAgIElOVlVMTkVSQUJMRV9URVhUOiBcImludnVsbmVyYWJsZS10ZXh0XCIsXG4gICAgICAgIEhFQUxfVEVYVDogXCJoZWFsLXRleHRcIixcbiAgICB9LFxuICAgIEVuZW15OiB7XG4gICAgICAgIFRBUkdFVF9EVU1NWTogXCJ0YXJnZXQtZHVtbXlcIixcbiAgICB9LFxuICAgIEhpdGJveFR5cGVzOiB7XG4gICAgICAgIE5PTkU6IFwibm9uZVwiLFxuICAgICAgICBSRUNUOiBcInJlY3RcIixcbiAgICAgICAgQ0lSQzogXCJjaXJjXCIsXG4gICAgfSxcbiAgICBEYW1hZ2VUeXBlczoge1xuICAgICAgICBOT1JNQUw6IFwibm9ybWFsLWRhbWFnZVwiLFxuICAgICAgICBGSVJFOiBcImZpcmUtZGFtYWdlXCIsXG4gICAgfSxcbn0iLCJ2YXIgZmlyZWJvbHRDb29sZG93biA9IDYwMDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5BYmlsaXRpZXMuRklSRUJPTFQsXG4gICAgICAgIGNvb2xkb3duOiBmaXJlYm9sdENvb2xkb3duLFxuICAgICAgICBsYXN0Y2FzdDogdW5kZWZpbmVkLFxuICAgICAgICBjYXN0OiAob2JzLCBzb3VyY2VJZCwgYWJpbGl0eUluZGV4LCB0YXJnZXRYLCB0YXJnZXRZKSA9PiB7XG4gICAgICAgICAgICB2YXIgbmV3VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBpZiAoIW9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3RcbiAgICAgICAgICAgICAgICB8fCBuZXdUaW1lIC0gb2JzW3NvdXJjZUlkXS5hYmlsaXRpZXNbYWJpbGl0eUluZGV4XS5sYXN0Y2FzdCA+PSBvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmNvb2xkb3duKSB7XG4gICAgICAgICAgICAgICAgb2JzW3NvdXJjZUlkXS5hYmlsaXRpZXNbYWJpbGl0eUluZGV4XS5sYXN0Y2FzdCA9IG5ld1RpbWU7XG4gICAgICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIHNvdXJjZUlkLCB0YXJnZXRYLCB0YXJnZXRZLCB0eXBlcy5PYmplY3RUeXBlcy5QUk9KRUNUSUxFLCB0eXBlcy5Qcm9qZWN0aWxlLkZJUkVCT0xUX1BST0pFQ1RJTEUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsInZhciBmbGFtZUJhcnJpZXJDb29sZG93biA9IDgwMDA7XG52YXIgZmxhbWVCYXJyaWVySW52dWxuRHVyYXRpb24gPSA1MDA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icykge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuQWJpbGl0aWVzLkZMQU1FX0JBUlJJRVIsXG4gICAgICAgIGNvb2xkb3duOiBmbGFtZUJhcnJpZXJDb29sZG93bixcbiAgICAgICAgbGFzdGNhc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FzdDogKG9icywgc291cmNlSWQsIGFiaWxpdHlJbmRleCwgdGFyZ2V0WCwgdGFyZ2V0WSkgPT4ge1xuICAgICAgICAgICAgdmFyIG5ld1RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKCFvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmxhc3RjYXN0XG4gICAgICAgICAgICAgICAgfHwgbmV3VGltZSAtIG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3QgPj0gb2JzW3NvdXJjZUlkXS5hYmlsaXRpZXNbYWJpbGl0eUluZGV4XS5jb29sZG93bikge1xuICAgICAgICAgICAgICAgIG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3QgPSBuZXdUaW1lO1xuICAgICAgICAgICAgICAgIG9ic1tzb3VyY2VJZF0uYWRkU3RhdHVzRWZmZWN0KG9icywgc291cmNlSWQsIHR5cGVzLlN0YXR1c0VmZmVjdHMuSU5WVUxORVJBQkxFLCBmbGFtZUJhcnJpZXJJbnZ1bG5EdXJhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGZsYW1lRGFzaENvb2xkb3duID0gNTAwMDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5BYmlsaXRpZXMuRkxBTUVfREFTSCxcbiAgICAgICAgY29vbGRvd246IGZsYW1lRGFzaENvb2xkb3duLFxuICAgICAgICBsYXN0Y2FzdDogdW5kZWZpbmVkLFxuICAgICAgICBjYXN0OiAob2JzLCBzb3VyY2VJZCwgYWJpbGl0eUluZGV4LCB0YXJnZXRYLCB0YXJnZXRZKSA9PiB7XG4gICAgICAgICAgICB2YXIgbmV3VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBpZiAoIW9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3RcbiAgICAgICAgICAgICAgICB8fCBuZXdUaW1lIC0gb2JzW3NvdXJjZUlkXS5hYmlsaXRpZXNbYWJpbGl0eUluZGV4XS5sYXN0Y2FzdCA+PSBvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmNvb2xkb3duKSB7XG4gICAgICAgICAgICAgICAgb2JzW3NvdXJjZUlkXS54ID0gdGFyZ2V0WDtcbiAgICAgICAgICAgICAgICBvYnNbc291cmNlSWRdLnkgPSB0YXJnZXRZO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3QgPSBuZXdUaW1lO1xuICAgICAgICAgICAgICAgIHByZWZhYnMuZ2VuZXJhdGVOZXcob2JzLCBzb3VyY2VJZCwgdGFyZ2V0WCwgdGFyZ2V0WSwgdHlwZXMuT2JqZWN0VHlwZXMuUFJPSkVDVElMRSwgdHlwZXMuUHJvamVjdGlsZS5GTEFNRV9EQVNIX1BST0pFQ1RJTEUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsInZhciBmbGFtZVBpbGxhckNvb2xkb3duID0gMzAwMDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5BYmlsaXRpZXMuRkxBTUVfUElMTEFSLFxuICAgICAgICBjb29sZG93bjogZmxhbWVQaWxsYXJDb29sZG93bixcbiAgICAgICAgbGFzdGNhc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgY2FzdDogKG9icywgc291cmNlSWQsIGFiaWxpdHlJbmRleCwgdGFyZ2V0WCwgdGFyZ2V0WSkgPT4ge1xuICAgICAgICAgICAgdmFyIG5ld1RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKCFvYnNbc291cmNlSWRdLmFiaWxpdGllc1thYmlsaXR5SW5kZXhdLmxhc3RjYXN0XG4gICAgICAgICAgICAgICAgfHwgbmV3VGltZSAtIG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3QgPj0gb2JzW3NvdXJjZUlkXS5hYmlsaXRpZXNbYWJpbGl0eUluZGV4XS5jb29sZG93bikge1xuICAgICAgICAgICAgICAgIG9ic1tzb3VyY2VJZF0uYWJpbGl0aWVzW2FiaWxpdHlJbmRleF0ubGFzdGNhc3QgPSBuZXdUaW1lO1xuICAgICAgICAgICAgICAgIHByZWZhYnMuZ2VuZXJhdGVOZXcob2JzLCBzb3VyY2VJZCwgdGFyZ2V0WCwgdGFyZ2V0WSwgdHlwZXMuT2JqZWN0VHlwZXMuUFJPSkVDVElMRSwgdHlwZXMuUHJvamVjdGlsZS5GTEFNRV9QSUxMQVJfUFJPSkVDVElMRSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGRhbWFnZVRleHRDb2xvciA9IFwiIzU1NTU1NUZGXCI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJhc2UsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLkNvbWJhdFRleHQuREFNQUdFX1RFWFQsXG4gICAgICAgIGNvbG9yOiBkYW1hZ2VUZXh0Q29sb3IsXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJ2YXIgZmlyZURhbWFnZVRleHRDb2xvciA9IFwiI0ZGMDAwMEZGXCI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJhc2UsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLkNvbWJhdFRleHQuRklSRV9EQU1BR0VfVEVYVCxcbiAgICAgICAgY29sb3I6IGZpcmVEYW1hZ2VUZXh0Q29sb3IsXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJ2YXIgaGVhbFRleHRDb2xvciA9IFwiIzAwQ0MwMEZGXCI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJhc2UsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLkNvbWJhdFRleHQuSEVBTF9URVhULFxuICAgICAgICBjb2xvcjogaGVhbFRleHRDb2xvcixcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsInZhciBpbnZ1bG5lcmFibGVUZXh0Q29sb3IgPSBcIiNBQUFBMDA4OFwiOyAgICAvLyBUT0RPOiBNb3JlIHZpc2libGUgY29sb3IuLi5cblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuQ29tYmF0VGV4dC5JTlZVTE5FUkFCTEVfVEVYVCxcbiAgICAgICAgY29sb3I6IGludnVsbmVyYWJsZVRleHRDb2xvcixcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsInZhciBjb21iYXRUZXh0QW5pbWF0aW9uU3BlZWQgPSAwLjEyO1xudmFyIGNvbWJhdFRleHRGb250U2l6ZSA9IDk7XG52YXIgY29tYmF0VGV4dENvbG9yID0gXCIjMDAwMDAwRkZcIjtcbnZhciBjb21iYXRUZXh0RHVyYXRpb24gPSAyMDA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBwYXJhbXMpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG5cbiAgICBjb25zdCB4ID0gb2JzW3NyY10gPyBvYnNbc3JjXS54ICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogb2JzW3NyY10ud2lkdGggKiA0OiBwb3NYO1xuICAgIGNvbnN0IHkgPSBvYnNbc3JjXSA/IG9ic1tzcmNdLnkgLSBNYXRoLnJhbmRvbSgpICogb2JzW3NyY10uaGVpZ2h0ICogMyAtIG9ic1tzcmNdLmhlaWdodCAqIDMgOiBwb3NZO1xuICAgIGNvbnN0IGFuZ2xlID0gb2JzW3NyY10gPyBNYXRoLmF0YW4yKHkgLSBvYnNbc3JjXS55LCB4IC0gb2JzW3NyY10ueCkgOiAwO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuT2JqZWN0VHlwZXMuQ09NQkFUX1RFWFQsXG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIGFuZ2xlOiBhbmdsZSxcbiAgICAgICAgdGV4dDogcGFyYW1zLnRleHQsXG4gICAgICAgIHNpemU6IGNvbWJhdFRleHRGb250U2l6ZSxcbiAgICAgICAgY29sb3I6IGNvbWJhdFRleHRDb2xvcixcbiAgICAgICAgZmFjaW5nOiBhbmdsZSAqIDE4MCAvIE1hdGguUEkgKyA5MCxcbiAgICAgICAgaW5pdFRpbWU6IERhdGUubm93KCksXG4gICAgICAgIGR1cmF0aW9uOiBjb21iYXRUZXh0RHVyYXRpb24sXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLk5PTkUsXG4gICAgICAgIGFuaW1hdGlvblNwZWVkOiBjb21iYXRUZXh0QW5pbWF0aW9uU3BlZWQsXG4gICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4ge1xuICAgICAgICAgICAgb2JzW3NlbGZJZF0udmVsb2NpdHlYID0gTWF0aC5jb3MoYW5nbGUpICogb2JzW3NlbGZJZF0uYW5pbWF0aW9uU3BlZWQ7XG4gICAgICAgICAgICBvYnNbc2VsZklkXS52ZWxvY2l0eVkgPSBNYXRoLnNpbihhbmdsZSkgKiBvYnNbc2VsZklkXS5hbmltYXRpb25TcGVlZDtcblxuICAgICAgICAgICAgY29uc3QgbmV3VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBjb25zdCBsaWZlVGltZSA9IG5ld1RpbWUgLSBvYnNbc2VsZklkXS5pbml0VGltZTtcblxuICAgICAgICAgICAgb2JzW3NlbGZJZF0ueCArPSBvYnNbc2VsZklkXS52ZWxvY2l0eVggKiBkZWx0YTtcbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLnkgKz0gb2JzW3NlbGZJZF0udmVsb2NpdHlZICogZGVsdGE7XG5cbiAgICAgICAgICAgIHZhciBuZXdPcGFjaXR5ID0gTWF0aC5tYXgoKDEgLSBsaWZlVGltZSAvIG9ic1tzZWxmSWRdLmR1cmF0aW9uKSAqIDI1NSwgMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygwLCAyKS5yZXBsYWNlKFwiLlwiLCBcIlwiKTtcbiAgICAgICAgICAgIGlmIChuZXdPcGFjaXR5Lmxlbmd0aCA8PSAxKSBuZXdPcGFjaXR5ID0gXCIwXCIgKyBuZXdPcGFjaXR5O1xuICAgICAgICAgICAgb2JzW3NlbGZJZF0uY29sb3IgPSBvYnNbc2VsZklkXS5jb2xvci5zdWJzdHJpbmcoMCwgNykgKyBuZXdPcGFjaXR5O1xuXG4gICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0gJiYgbGlmZVRpbWUgPj0gb2JzW3NlbGZJZF0uZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JzW3NlbGZJZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGVuZW15U3BlZWQgPSAwLjI7XG52YXIgZW5lbXlIZWFsdGggPSAzMDA7XG52YXIgZW5lbXlXaWR0aCA9IDQ7XG52YXIgZW5lbXlIZWlnaHQgPSA0O1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgY29sbGlzaW9ucyA9IHJlcXVpcmUoXCIuLi8uLi9Db2xsaXNpb25zXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG4gICAgdmFyIHV0aWxzID0gcmVxdWlyZShcIi4uL1ByZWZhYlV0aWxzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuT2JqZWN0VHlwZXMuRU5FTVksXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLkVuZW15LlRBUkdFVF9EVU1NWSxcbiAgICAgICAgeDogcG9zWCxcbiAgICAgICAgeTogcG9zWSxcbiAgICAgICAgdmVsb2NpdHlYOiAwLFxuICAgICAgICB2ZWxvY2l0eVk6IDAsXG4gICAgICAgIHNwZWVkOiBlbmVteVNwZWVkLFxuICAgICAgICB3aWR0aDogZW5lbXlXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBlbmVteUhlaWdodCxcbiAgICAgICAgaGl0Ym94VHlwZTogdHlwZXMuSGl0Ym94VHlwZXMuUkVDVCxcbiAgICAgICAgaGl0Ym94V2lkdGg6IGVuZW15V2lkdGgsXG4gICAgICAgIGhpdGJveEhlaWdodDogZW5lbXlIZWlnaHQsXG4gICAgICAgIGhlYWx0aDogZW5lbXlIZWFsdGgsXG4gICAgICAgIG1heEhlYWx0aDogZW5lbXlIZWFsdGgsXG4gICAgICAgIHN0YXR1c0VmZmVjdHM6IHsgfSxcbiAgICAgICAgZGVhdGhyYXR0bGU6IChvYnMsIHNlbGZSZWYpID0+IHtcbiAgICAgICAgICAgIC8vIFRPRE86IE1ha2UgYmV0dGVyIGRlYXRocmF0dGxlLi4uXG4gICAgICAgICAgICAvLyBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgc2VsZlJlZiwgb2JzW3NlbGZSZWZdLngsIG9ic1tzZWxmUmVmXS55LCB0eXBlcy5PYmplY3RUeXBlcy5HUkFWRVNUT05FKTtcbiAgICAgICAgICAgIGRlbGV0ZSBvYnNbc2VsZlJlZl07XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4ge1xuICAgICAgICAgICAgb2JzW3NlbGZJZF0udXBkYXRlU3RhdHVzRWZmZWN0cyhvYnMsIHNlbGZJZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIENoZWNrIGNvbGxpc2lvbnMgd2l0aCB0ZXJyYWluIGFuZCByZXBvc2l0aW9uIGFjY29yZGluZ2x5XG4gICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9ucyhzZWxmSWQsIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQpe1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9ic1tjb2xsaXNpb25JZF0udHlwZSkgeyAgICAgICAgLy8gU2hvdWxkIGNvbGxpZGUgd2l0aCBwbGF5ZXJzP1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5URVJSQUlOOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5wdXNoQmFjayhvYnMsIHNyY0lkLCBjb2xsaXNpb25JZCwgcHJlZmFicy5yZW5kZXJTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBoZWFsOiAob2JzLCBzZWxmSWQsIGFtb3VudCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhlYWxBbW91bnQgPSBvYnNbc2VsZklkXS5oZWFsdGggKyBhbW91bnQgPj0gb2JzW3NlbGZJZF0ubWF4SGVhbHRoXG4gICAgICAgICAgICAgICAgICAgID8gb2JzW3NlbGZJZF0ubWF4SGVhbHRoIC0gb2JzW3NlbGZJZF0uaGVhbHRoXG4gICAgICAgICAgICAgICAgICAgIDogYW1vdW50O1xuICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLmhlYWx0aCArPSBoZWFsQW1vdW50XG4gICAgICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIHNlbGZJZCwgMCwgMCwgdHlwZXMuT2JqZWN0VHlwZXMuQ09NQkFUX1RFWFQsIHR5cGVzLkNvbWJhdFRleHQuSEVBTF9URVhULCB7IHRleHQ6IFwiK1wiICsgaGVhbEFtb3VudCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGFtYWdlOiAob2JzLCBzZWxmSWQsIGFtb3VudCwgZGFtYWdlVHlwZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoZWNrU3RhdHVzRWZmZWN0KG9icywgc2VsZklkLCB0eXBlcy5TdGF0dXNFZmZlY3RzLklOVlVMTkVSQUJMRSkpIHtcbiAgICAgICAgICAgICAgICBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgc2VsZklkLCAwLCAwLCB0eXBlcy5PYmplY3RUeXBlcy5DT01CQVRfVEVYVCwgdHlwZXMuQ29tYmF0VGV4dC5JTlZVTE5FUkFCTEVfVEVYVCwgeyB0ZXh0OiBcIiogXCIgKyBhbW91bnQgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHV0aWxzLmRhbWFnZShvYnMsIHNlbGZJZCwgYW1vdW50LCBkYW1hZ2VUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlU3RhdHVzRWZmZWN0czogKG9icywgc2VsZklkKSA9PiB7XG4gICAgICAgICAgICB2YXIgbmV3VGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgICAgIHN0YXR1c0VmZmVjdENoZWNrSGVscGVyKG9icywgc2VsZklkLCB0eXBlcy5TdGF0dXNFZmZlY3RzLlNUVU5ORUQsIG5ld1RpbWUpO1xuICAgICAgICAgICAgc3RhdHVzRWZmZWN0Q2hlY2tIZWxwZXIob2JzLCBzZWxmSWQsIHR5cGVzLlN0YXR1c0VmZmVjdHMuSU5WVUxORVJBQkxFLCBuZXdUaW1lKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkU3RhdHVzRWZmZWN0OiAob2JzLCBpZCwgZWZmZWN0LCBkdXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgdmFyIG5ld1RpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBPbmx5IHJlcGxhY2UgdGhlIGN1cnJlbnQgc3RhdHVzIGVmZmVjdCBsYXN0IGNhc3QgYW5kIGR1cmF0aW9uIGlmIHRoZSBuZXcgZHVyYXRpb24gaXMgbG9uZ2VyIHRoYW4gd2hhdCdzIGxlZnRcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0gfHxcbiAgICAgICAgICAgICAgICBvYnNbaWRdLnN0YXR1c0VmZmVjdHNbZWZmZWN0XS5kdXJhdGlvbiAtIChuZXdUaW1lIC0gb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0ubGFzdCkgPCBkdXJhdGlvblxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0gPSB7IH07XG4gICAgICAgICAgICAgICAgb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0ubGFzdCA9IG5ld1RpbWU7XG4gICAgICAgICAgICAgICAgb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0uZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBzdGF0dXNFZmZlY3RDaGVja0hlbHBlcihvYnMsIGlkLCBlZmZlY3QsIG5ld1RpbWUpIHtcbiAgICBpZiAoXG4gICAgICAgIG9ic1tpZF0uc3RhdHVzRWZmZWN0c1tlZmZlY3RdICYmXG4gICAgICAgIG5ld1RpbWUgLSBvYnNbaWRdLnN0YXR1c0VmZmVjdHNbZWZmZWN0XS5sYXN0ID49IG9ic1tpZF0uc3RhdHVzRWZmZWN0c1tlZmZlY3RdLmR1cmF0aW9uXG4gICAgKSB7XG4gICAgICAgIGRlbGV0ZSBvYnNbaWRdLnN0YXR1c0VmZmVjdHNbZWZmZWN0XTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrU3RhdHVzRWZmZWN0KG9icywgaWQsIGVmZmVjdCkge1xuICAgIHJldHVybiBvYnNbaWRdLnN0YXR1c0VmZmVjdHNbZWZmZWN0XTtcbn1cblxuZnVuY3Rpb24gY2hlY2tTdGF0dXNFZmZlY3RPYmplY3Qob2JqZWN0LCBlZmZlY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0LnN0YXR1c0VmZmVjdHNbZWZmZWN0XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxuICAgIGNoZWNrU3RhdHVzRWZmZWN0OiBjaGVja1N0YXR1c0VmZmVjdE9iamVjdCxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgZW5lbXkgb2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBlbmVteSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gZW5lbXlNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI0E1MkEyQVwiLCBcIiNGRjAwMDBcIiwgXCIjRkZGRkZGXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IDAsXG4gICAgICAgIHN0cm9rZXM6IFtcbiAgICAgICAgICAgIHtjZWxsWDogMywgY2VsbFk6IDAsIHdpZHRoOiAyLCBoZWlnaHQ6IDEyLCBzd2F0Y2g6IDB9LFxuICAgICAgICAgICAge2NlbGxYOiAwLCBjZWxsWTogNCwgd2lkdGg6IDgsIGhlaWdodDogMiwgc3dhdGNoOiAwfSxcbiAgICAgICAgICAgIHtjZWxsWDogMSwgY2VsbFk6IDMsIHdpZHRoOiA2LCBoZWlnaHQ6IDYsIHN3YXRjaDogMn0sXG4gICAgICAgICAgICB7Y2VsbFg6IDIsIGNlbGxZOiA0LCB3aWR0aDogNCwgaGVpZ2h0OiA0LCBzd2F0Y2g6IDF9LFxuICAgICAgICAgICAge2NlbGxYOiAzLCBjZWxsWTogNSwgd2lkdGg6IDIsIGhlaWdodDogMiwgc3dhdGNoOiAyfSxcbiAgICAgICAgXSxcbiAgICAgICAgY3VzdG9tUmVuZGVyU2l6ZTogMixcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGJpbm9jdWxhcnMgdWkgaWNvblxuICogQHBhcmFtIHBvc1ggSG9yaXpvbnRhbCBpY29uIHBvc2l0aW9uXG4gKiBAcGFyYW0gcG9zWSBWZXJ0aWNhbCBpY29uIHBvc2l0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5vY3VsYXJzVUlNYXN0ZXJQaWVjZShwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjMDAwMDAwXCIsIFwiIzMzMzMzM1wiXSxcbiAgICAgICAgcG9zWDogcG9zWCxcbiAgICAgICAgcG9zWTogcG9zWSxcbiAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgZmFjaW5nOiAtNDUsXG4gICAgICAgIHN0cm9rZXM6IFsge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdXG4gICAgfTtcbn1cbiIsInZhciBiaW5vY3VsYXJzVmlld1JhbmdlID0gMjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBwYXJhbXMgPSB7IH0pIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CSU5PQ1VMQVJTLFxuICAgICAgICB1c2U6IChvYnMsIHNvdXJjZUlkLCB0YXJnZXRYLCB0YXJnZXRZKSA9PiB7IH0sXG4gICAgICAgIG9uRXF1aXA6IChvYnMsIHNvdXJjZUlkKSA9PiB7XG4gICAgICAgICAgICBvYnNbc291cmNlSWRdLnByZXZWaWV3UmFuZ2UgPSBvYnNbc291cmNlSWRdLnZpZXdSYW5nZTtcbiAgICAgICAgICAgIG9ic1tzb3VyY2VJZF0udmlld1JhbmdlID0gYmlub2N1bGFyc1ZpZXdSYW5nZTtcbiAgICAgICAgfSxcbiAgICAgICAgb25EZXF1aXA6IChvYnMsIHNvdXJjZUlkKSA9PiB7XG4gICAgICAgICAgICBvYnNbc291cmNlSWRdLnZpZXdSYW5nZSA9IG9ic1tzb3VyY2VJZF0ucHJldlZpZXdSYW5nZTtcbiAgICAgICAgICAgIGRlbGV0ZSBvYnNbc291cmNlSWRdLnByZXZWaWV3UmFuZ2U7XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBibGFzdGVyIHVpIGljb25cbiAqIEBwYXJhbSBwb3NYIEhvcml6b250YWwgaWNvbiBwb3NpdGlvblxuICogQHBhcmFtIHBvc1kgVmVydGljYWwgaWNvbiBwb3NpdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gYmxhc3RlclVJTWFzdGVyUGllY2UocG9zWDogbnVtYmVyLCBwb3NZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzAwMDAwMFwiXSxcbiAgICAgICAgcG9zWDogcG9zWCxcbiAgICAgICAgcG9zWTogcG9zWSxcbiAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgIGhlaWdodDogMixcbiAgICAgICAgZmFjaW5nOiAtNDUsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sXVxuICAgIH07XG59XG4iLCJmdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyA9IHsgfSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuRXF1aXBtZW50VHlwZXMuQkxBU1RFUixcbiAgICAgICAgdXNlOiAob2JzLCBzb3VyY2VJZCwgdGFyZ2V0WCwgdGFyZ2V0WSkgPT4ge1xuICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIHNvdXJjZUlkLCB0YXJnZXRYLCB0YXJnZXRZLCB0eXBlcy5PYmplY3RUeXBlcy5QUk9KRUNUSUxFLCB0eXBlcy5Qcm9qZWN0aWxlLkJBU0lDX1BST0pFQ1RJTEUpO1xuICAgICAgICB9LFxuICAgICAgICBvbkVxdWlwOiAob2JzLCBzb3VyY2VJZCkgPT4geyB9LFxuICAgICAgICBvbkRlcXVpcDogKG9icywgc291cmNlSWQpID0+IHsgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGJ1aWxkZXIgdWkgaWNvblxuICogQHBhcmFtIHBvc1ggSG9yaXpvbnRhbCBpY29uIHBvc2l0aW9uXG4gKiBAcGFyYW0gcG9zWSBWZXJ0aWNhbCBpY29uIHBvc2l0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZGVyVUlNYXN0ZXJQaWVjZShwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjMDAwMDAwXCIsIFwiIzkzNTIwMFwiXSxcbiAgICAgICAgcG9zWDogcG9zWCxcbiAgICAgICAgcG9zWTogcG9zWSxcbiAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgZmFjaW5nOiAtNDUsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sXVxuICAgIH07XG59XG4iLCJmdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyA9IHsgfSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuRXF1aXBtZW50VHlwZXMuQlVJTERFUixcbiAgICAgICAgdXNlOiAob2JzLCBzb3VyY2VJZCwgdGFyZ2V0WCwgdGFyZ2V0WSkgPT4ge1xuICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIHNvdXJjZUlkLCB0YXJnZXRYLCB0YXJnZXRZLCBwYXJhbXMudHlwZSwgcGFyYW1zLnN1YnR5cGUpO1xuICAgICAgICB9LFxuICAgICAgICBvbkVxdWlwOiAob2JzLCBzb3VyY2VJZCkgPT4geyB9LFxuICAgICAgICBvbkRlcXVpcDogKG9icywgc291cmNlSWQpID0+IHsgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIHNjYW5uZXIgdWkgaWNvblxuICogQHBhcmFtIHBvc1ggSG9yaXpvbnRhbCBpY29uIHBvc2l0aW9uXG4gKiBAcGFyYW0gcG9zWSBWZXJ0aWNhbCBpY29uIHBvc2l0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2FubmVyVUlNYXN0ZXJQaWVjZShwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjRkZGRkZGXCIsIFwiIzMzOTlGRlwiXSxcbiAgICAgICAgcG9zWDogcG9zWCxcbiAgICAgICAgcG9zWTogcG9zWSxcbiAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAtMSxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IDUsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sXVxuICAgIH07XG59XG4iLCJmdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyA9IHsgfSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgY29sbGlzaW9ucyA9IHJlcXVpcmUoXCIuLi8uLi9Db2xsaXNpb25zXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5FcXVpcG1lbnRUeXBlcy5TQ0FOTkVSLFxuICAgICAgICB1c2U6IChvYnMsIHNvdXJjZUlkLCB0YXJnZXRYLCB0YXJnZXRZKSA9PiB7XG4gICAgICAgICAgICAvLyBSZXBsYWNlcyBhbGwgYnVpbGRlcnMgd2l0aCB0aGlzIGJ1aWxkIHR5cGUuLi5cbiAgICAgICAgICAgIGNvbGxpc2lvbnMuY2hlY2tDbGlja0NvbGxpc2lvbnModGFyZ2V0WCwgdGFyZ2V0WSwgb2JzLCBwcmVmYWJzLnJlbmRlclNpemUsIChjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYnNbY29sbGlzaW9uSWRdLnN1YnR5cGUgIT0gdHlwZXMuSW50ZXJhY3RhYmxlLkNBUl9FTlRFUikge1xuICAgICAgICAgICAgICAgICAgICBvYnNbc291cmNlSWRdLmVxdWlwbWVudCA9IG9ic1tzb3VyY2VJZF0uZXF1aXBtZW50Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CVUlMREVSKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHByZWZhYnMubmV3RXF1aXBtZW50KG9icywgdHlwZXMuRXF1aXBtZW50VHlwZXMuQlVJTERFUiwgeyB0eXBlOiBvYnNbY29sbGlzaW9uSWRdLnR5cGUsIHN1YnR5cGU6IG9ic1tjb2xsaXNpb25JZF0uc3VidHlwZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25FcXVpcDogKG9icywgc291cmNlSWQpID0+IHsgfSxcbiAgICAgICAgb25EZXF1aXA6IChvYnMsIHNvdXJjZUlkKSA9PiB7IH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGdyYXZlc3RvbmVXaWR0aCA9IDM7XG52YXIgZ3JhdmVzdG9uZUhlaWdodCA9IDQ7XG52YXIgZ3JhdmVzdG9uZUhpdGJveFdpZHRoID0gZ3JhdmVzdG9uZVdpZHRoO1xudmFyIGdyYXZlc3RvbmVIaXRib3hIZWlnaHQgPSBncmF2ZXN0b25lSGVpZ2h0O1xudmFyIGdyYXZlc3RvbmVIZWFsdGggPSA0MDtcbnZhciBncmF2ZXN0b25lVmlld1JhbmdlID0gMSAvIDQ7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uLy4uL0NvbGxpc2lvbnNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICB2YXIgdXRpbHMgPSByZXF1aXJlKFwiLi4vUHJlZmFiVXRpbHNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5PYmplY3RUeXBlcy5HUkFWRVNUT05FLFxuICAgICAgICBzdWJ0eXBlOiBvYnNbc3JjXS5zdWJ0eXBlLFxuICAgICAgICB4OiBwb3NYLFxuICAgICAgICB5OiBwb3NZICsgMSAqIHByZWZhYnMucmVuZGVyU2l6ZSxcbiAgICAgICAgdmVsb2NpdHlYOiAwLFxuICAgICAgICB2ZWxvY2l0eVk6IDAsXG4gICAgICAgIHNwZWVkOiAwLFxuICAgICAgICB3aWR0aDogZ3JhdmVzdG9uZVdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGdyYXZlc3RvbmVIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBncmF2ZXN0b25lSGl0Ym94V2lkdGgsXG4gICAgICAgIGhpdGJveEhlaWdodDogZ3JhdmVzdG9uZUhpdGJveEhlaWdodCxcbiAgICAgICAgaGVhbHRoOiBncmF2ZXN0b25lSGVhbHRoLFxuICAgICAgICBtYXhIZWFsdGg6IGdyYXZlc3RvbmVIZWFsdGgsXG4gICAgICAgIGN1cnJlbnRFcXVpcG1lbnQ6IHVuZGVmaW5lZCxcbiAgICAgICAgZXF1aXBtZW50OiBbXSxcbiAgICAgICAgdmlld1JhbmdlOiBncmF2ZXN0b25lVmlld1JhbmdlLFxuICAgICAgICBkZWF0aHJhdHRsZTogKG9icywgc2VsZlJlZikgPT4ge1xuICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIHNlbGZSZWYsIDAsIDAsIHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUik7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4ge1xuICAgICAgICAgICAgLy8gQ2hlY2sgY29sbGlzaW9ucyB3aXRoIHZlaGljbGVzIGFuZCByZXBvc2l0aW9uIGFjY29yZGluZ2x5XG4gICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9ucyhzZWxmSWQsIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQpe1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9ic1tjb2xsaXNpb25JZF0udHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFB1c2ggb2JqZWN0IGJhY2sgb3V0IG9mIGNvbGxpc2lvbiB2ZWhpY2xlIHRvd2FyZHMgd2hpY2ggZXZlciBzaWRlIGlzIHRoZSBjbG9zZXN0IHRvIHRoZSB2ZWhpY2xlIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnMucHVzaEJhY2sob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQsIHByZWZhYnMucmVuZGVyU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbW91c2VEb3duOiAob2JzLCBtb3VzZUV2ZW50KSA9PiB7IH0sXG4gICAgICAgIG9uUGxheWVySW5wdXQ6IChvYnMsIHNlbGZJZCwgcGxheWVySW5wdXQpID0+IHsgfSxcbiAgICAgICAgZGFtYWdlOiB1dGlscy5kYW1hZ2UsXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBncmF2ZXN0b25lIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgZ3JhdmVzdG9uZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ3JhdmVTdG9uZU1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjODg4ODg4XCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMCxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwLFxuICAgICAgICB9XVxuICAgIH1cbn1cbiIsInZhciBjYXJFbnRlcldpZHRoID0gMjQ7XG52YXIgY2FyRW50ZXJIZWlnaHQgPSAyNDtcbnZhciBjYXJFbnRlckhpdGJveFdpZHRoID0gMjQ7XG52YXIgY2FyRW50ZXJIaXRib3hIZWlnaHQgPSAyNDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuSW50ZXJhY3RhYmxlLkNBUl9FTlRFUixcbiAgICAgICAgd2lkdGg6IGNhckVudGVyV2lkdGgsXG4gICAgICAgIGhlaWdodDogY2FyRW50ZXJIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBjYXJFbnRlckhpdGJveFdpZHRoLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IGNhckVudGVySGl0Ym94SGVpZ2h0LFxuICAgICAgICB2ZWhpY2xlSWQ6IHNyYyxcbiAgICAgICAgb25JbnRlcmFjdDogKG9icywgc2VsZlJlZiwgaW50ZXJhY3RJZCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic1tpbnRlcmFjdElkXSAmJlxuICAgICAgICAgICAgICAgIG9ic1tpbnRlcmFjdElkXS50eXBlID09PSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVIgJiZcbiAgICAgICAgICAgICAgICBvYnNbb2JzW3NlbGZSZWZdLnZlaGljbGVJZF0ucmlkZXIgPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvYnNbb2JzW3NlbGZSZWZdLnZlaGljbGVJZF0ucmlkZXIgPSBvYnNbaW50ZXJhY3RJZF07XG4gICAgICAgICAgICAgICAgb2JzW2ludGVyYWN0SWRdID0gb2JzW29ic1tzZWxmUmVmXS52ZWhpY2xlSWRdO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbb2JzW3NlbGZSZWZdLnZlaGljbGVJZF07XG4gICAgICAgICAgICAgICAgb2JzW3NlbGZSZWZdLnZlaGljbGVJZCA9IGludGVyYWN0SWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGhlYWx0aFBpY2t1cFdpZHRoID0gMztcbnZhciBoZWFsdGhQaWNrdXBIZWlnaHQgPSAzO1xudmFyIGhlYWx0aFBpY2t1cEhpdGJveFdpZHRoID0gMztcbnZhciBoZWFsdGhQaWNrdXBIaXRib3hIZWlnaHQgPSAzO1xudmFyIGhlYWx0aFBpY2t1cEhlYWxpbmcgPSA0MDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuSW50ZXJhY3RhYmxlLkhFQUxUSF9QSUNLVVAsXG4gICAgICAgIHdpZHRoOiBoZWFsdGhQaWNrdXBXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBoZWFsdGhQaWNrdXBIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBoZWFsdGhQaWNrdXBIaXRib3hXaWR0aCxcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiBoZWFsdGhQaWNrdXBIaXRib3hIZWlnaHQsXG4gICAgICAgIG9uSW50ZXJhY3Q6IChvYnMsIHNlbGZSZWYsIGludGVyYWN0SWQpID0+IHtcbiAgICAgICAgICAgIGlmIChvYnNbaW50ZXJhY3RJZF0uaGVhbCkge1xuICAgICAgICAgICAgICAgIG9ic1tpbnRlcmFjdElkXS5oZWFsKG9icywgaW50ZXJhY3RJZCwgaGVhbHRoUGlja3VwSGVhbGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgb2JzW3NlbGZSZWZdO1xuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgaGVhbHRoIHBpY2t1cCBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGhlYWx0aCBwaWNrdXAgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhlYWx0aFBpY2t1cE1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjRkZGRkZGXCIsIFwiI0ZGMDAwMFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH1dXG4gICAgfVxufVxuIiwidmFyIHBsYXllclR5cGVDaGFuZ2VyV2lkdGggPSA1O1xudmFyIHBsYXllclR5cGVDaGFuZ2VySGVpZ2h0ID0gNTtcbnZhciBwbGF5ZXJUeXBlQ2hhbmdlckhpdGJveFdpZHRoID0gNTtcbnZhciBwbGF5ZXJUeXBlQ2hhbmdlckhpdGJveEhlaWdodCA9IDU7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlLCBwYXJhbXMgPSB7IH0pIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5JbnRlcmFjdGFibGUuUExBWUVSX1RZUEVfQ0hBTkdFUixcbiAgICAgICAgd2lkdGg6IHBsYXllclR5cGVDaGFuZ2VyV2lkdGgsXG4gICAgICAgIGhlaWdodDogcGxheWVyVHlwZUNoYW5nZXJIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBwbGF5ZXJUeXBlQ2hhbmdlckhpdGJveFdpZHRoLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IHBsYXllclR5cGVDaGFuZ2VySGl0Ym94SGVpZ2h0LFxuICAgICAgICBuZXdQbGF5ZXJUeXBlOiBwYXJhbXMubmV3VHlwZSxcbiAgICAgICAgb25JbnRlcmFjdDogKG9icywgc2VsZlJlZiwgaW50ZXJhY3RJZCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic1tpbnRlcmFjdElkXS50eXBlID09PSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVIgJiYgb2JzW2ludGVyYWN0SWRdLnN1YnR5cGUgIT09IG9ic1tzZWxmUmVmXS5uZXdQbGF5ZXJUeXBlKSB7XG4gICAgICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIGludGVyYWN0SWQsIG9ic1tpbnRlcmFjdElkXS54LCBvYnNbaW50ZXJhY3RJZF0ueSwgdHlwZXMuT2JqZWN0VHlwZXMuUExBWUVSLCBvYnNbc2VsZlJlZl0ubmV3UGxheWVyVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi9PYmplY3RUeXBlc1wiO1xuaW1wb3J0ICogYXMgcHJlZmFicyBmcm9tIFwiLi4vUHJlZmFic1wiO1xuXG5pbXBvcnQgKiBhcyBfcGxheWVyIGZyb20gXCIuLi9QbGF5ZXIvX1BsYXllci50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgZmlyZW1hZ2UgZnJvbSBcIi4uL1BsYXllci9GaXJlTWFnZS50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgZ29kIGZyb20gXCIuLi9QbGF5ZXIvR29kLnRlbXBsYXRlXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgcGxheWVyIHR5cGUgY2hhbmdlciBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHBsYXllciB0eXBlIGNoYW5nZXIgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBsYXllclR5cGVDaGFuZ2VyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHZhciBjdXN0b21SZW5kZXJTaXplID0gMjtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjODg4ODg4XCIsIFwiI2JiYmJiYlwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggKiBwcmVmYWJzLnJlbmRlclNpemUgLyBjdXN0b21SZW5kZXJTaXplLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0ICogcHJlZmFicy5yZW5kZXJTaXplIC8gY3VzdG9tUmVuZGVyU2l6ZSxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IChvYmplY3Qud2lkdGggLSAxKSAqIHByZWZhYnMucmVuZGVyU2l6ZSAvIGN1c3RvbVJlbmRlclNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IChvYmplY3QuaGVpZ2h0IC0gMSkgKiBwcmVmYWJzLnJlbmRlclNpemUgLyBjdXN0b21SZW5kZXJTaXplLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sXSxcbiAgICAgICAgY3VzdG9tUmVuZGVyU2l6ZTogY3VzdG9tUmVuZGVyU2l6ZSxcbiAgICB9XG59XG5cbi8qKlxuICogR2V0IGxpdHRsZSBtYW4gZm9yIHBsYXllciB0eXBlIGNoYW5nZXIgb2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBwbGF5ZXIgdHlwZSBjaGFuZ2VyIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaXR0bGVNYW5NYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgdmFyIG9iakNvcHkgPSBvYmplY3Q7XG4gICAgb2JqQ29weS53aWR0aCA9IDI7XG4gICAgb2JqQ29weS5oZWlnaHQgPSAzO1xuXG4gICAgdmFyIHBsYXllclR5cGVDaGFuZ2VyTWFzdGVyUGllY2UgPSBfcGxheWVyLnBsYXllck1hc3RlclBpZWNlKG9iakNvcHksIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpO1xuICAgIHN3aXRjaCAob2JqZWN0Lm5ld1BsYXllclR5cGUpIHtcbiAgICAgICAgY2FzZSB0eXBlcy5QbGF5ZXIuRklSRV9NQUdFOlxuICAgICAgICAgICAgcGxheWVyVHlwZUNoYW5nZXJNYXN0ZXJQaWVjZSA9IGZpcmVtYWdlLmZpcmVtYWdlUGxheWVyTWFzdGVyUGllY2Uob2JqQ29weSwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0eXBlcy5QbGF5ZXIuR09EOlxuICAgICAgICAgICAgcGxheWVyVHlwZUNoYW5nZXJNYXN0ZXJQaWVjZSA9IGdvZC5nb2RQbGF5ZXJNYXN0ZXJQaWVjZShvYmpDb3B5LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBwbGF5ZXJUeXBlQ2hhbmdlck1hc3RlclBpZWNlLmN1c3RvbVJlbmRlclNpemUgPSAyO1xuXG4gICAgcmV0dXJuIHBsYXllclR5cGVDaGFuZ2VyTWFzdGVyUGllY2U7XG59XG4iLCJmdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLk9iamVjdFR5cGVzLklOVEVSQUNUQUJMRSxcbiAgICAgICAgeDogcG9zWCxcbiAgICAgICAgeTogcG9zWSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7IH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwidmFyIGZpcmVtYWdlU3BlZWQgPSAwLjE4O1xudmFyIGZpcmVtYWdlSGVhbHRoID0gNjQ7XG5cbnZhciBiYXNlRmlyZVRpY2tzRHVyYXRpb24gPSA1MDA7XG52YXIgZmlyZW1hZ2VGaXJlVGlja3NEdXJhdGlvbiA9IDc1MDtcblxudmFyIGZpcmVUaWNrRGFtYWdlID0gNjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5QbGF5ZXIuRklSRV9NQUdFLFxuICAgICAgICBtYXhIZWFsdGg6IGZpcmVtYWdlSGVhbHRoLFxuICAgICAgICBoZWFsdGg6IGZpcmVtYWdlSGVhbHRoLFxuICAgICAgICBzcGVlZDogZmlyZW1hZ2VTcGVlZCxcbiAgICAgICAgZmlyZVRpY2tzRHVyYXRpb246IGZpcmVtYWdlRmlyZVRpY2tzRHVyYXRpb24sXG4gICAgICAgIGFiaWxpdGllczogW1xuICAgICAgICAgICAgcHJlZmFicy5uZXdBYmlsaXR5KG9icywgdHlwZXMuQWJpbGl0aWVzLkZJUkVCT0xUKSxcbiAgICAgICAgICAgIHByZWZhYnMubmV3QWJpbGl0eShvYnMsIHR5cGVzLkFiaWxpdGllcy5GTEFNRV9QSUxMQVIpLFxuICAgICAgICAgICAgcHJlZmFicy5uZXdBYmlsaXR5KG9icywgdHlwZXMuQWJpbGl0aWVzLkZMQU1FX0RBU0gpLFxuICAgICAgICAgICAgcHJlZmFicy5uZXdBYmlsaXR5KG9icywgdHlwZXMuQWJpbGl0aWVzLkZMQU1FX0JBUlJJRVIpLFxuICAgICAgICBdLFxuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5jcmVhc2VGaXJlVGljayhvYnMsIHNvdXJjZUlkLCBhbW91bnQpIHtcbiAgICB2YXIgbmV3VGltZSA9IERhdGUubm93KCk7XG4gICAgaWYgKG9ic1tzb3VyY2VJZF0uZmlyZVRpY2tzICYmIG5ld1RpbWUgLSBvYnNbc291cmNlSWRdLmZpcmVUaWNrc0xhc3RJbmNyZWFzZSA8IG9ic1tzb3VyY2VJZF0uZmlyZVRpY2tzRHVyYXRpb24pIHtcbiAgICAgICAgb2JzW3NvdXJjZUlkXS5maXJlVGlja3MgPSBvYnNbc291cmNlSWRdLmZpcmVUaWNrcyArIGFtb3VudDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvYnNbc291cmNlSWRdLmZpcmVUaWNrcyA9IGFtb3VudDtcbiAgICAgICAgXG4gICAgICAgIGlmICghb2JzW3NvdXJjZUlkXS5maXJlVGlja3NEdXJhdGlvbikge1xuICAgICAgICAgICAgb2JzW3NvdXJjZUlkXS5maXJlVGlja3NEdXJhdGlvbiA9IGJhc2VGaXJlVGlja3NEdXJhdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvYnNbc291cmNlSWRdLmZpcmVUaWNrc0xhc3RJbmNyZWFzZSA9IG5ld1RpbWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbiAgICBpbmNyZWFzZUZpcmVUaWNrOiBpbmNyZWFzZUZpcmVUaWNrLFxuICAgIGZpcmVUaWNrRGFtYWdlOiBmaXJlVGlja0RhbWFnZSxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgZmlyZW1hZ2UgcGxheWVyIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgZmlyZW1hZ2UgcGxheWVyIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlciBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaXJlbWFnZVBsYXllck1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4geyAgICAvLyBTa2luLCAgICAgIFBhbnRzLCAgICAgU2hpcnQsICAgICAgRmFjZVxuICAgICAgICBwYWxldHRlOiBbXCIjRDJCNDhDXCIsIFwiI0E1MkEyQVwiLCBcIiNEQzE0M0NcIiwgXCIjZGJjM2EzXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IDAsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAyLFxuICAgICAgICAgICAgd2lkdGg6IDQsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiA0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogM1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMC41LFxuICAgICAgICAgICAgaGVpZ2h0OiA2LFxuICAgICAgICAgICAgc3dhdGNoOiAyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAyLjUsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAwLjUsXG4gICAgICAgICAgICBoZWlnaHQ6IDYsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAwLjUsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSxdLFxuICAgIH1cbn1cbiIsInZhciBnb2RTcGVlZCA9IDAuMjg7XG52YXIgZ29kSGVhbHRoID0gMzUwO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgYmFzZSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICB2YXIgcHJlZmFicyA9IHJlcXVpcmUoXCIuLi9QcmVmYWJzXCIpO1xuICAgIFxuICAgIHJldHVybiB7IFxuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5QbGF5ZXIuR09ELFxuICAgICAgICBtYXhIZWFsdGg6IGdvZEhlYWx0aCxcbiAgICAgICAgaGVhbHRoOiBnb2RIZWFsdGgsXG4gICAgICAgIGN1cnJlbnRFcXVpcG1lbnQ6IDAsXG4gICAgICAgIGVxdWlwbWVudDogW1xuICAgICAgICAgICAgcHJlZmFicy5uZXdFcXVpcG1lbnQob2JzLCB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CTEFTVEVSKSxcbiAgICAgICAgICAgIHByZWZhYnMubmV3RXF1aXBtZW50KG9icywgdHlwZXMuRXF1aXBtZW50VHlwZXMuU0NBTk5FUiksXG4gICAgICAgICAgICBwcmVmYWJzLm5ld0VxdWlwbWVudChvYnMsIHR5cGVzLkVxdWlwbWVudFR5cGVzLkJVSUxERVIsIHsgdHlwZTogdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTiwgc3VidHlwZTogdHlwZXMuVGVycmFpbi5UUkVFIH0pLFxuICAgICAgICAgICAgcHJlZmFicy5uZXdFcXVpcG1lbnQob2JzLCB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CSU5PQ1VMQVJTKSxcbiAgICAgICAgXSxcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgZ29kIHBsYXllciBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGdvZCBwbGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdvZFBsYXllck1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjRkYxNDkzODhcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDIsXG4gICAgICAgICAgICB3aWR0aDogNCxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sXSxcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIG9iamVjdCdzIGhlYWx0aCBiYXJcbiAqIEBwYXJhbSBvYmplY3QgVGhlIG9iamVjdCB0aGF0IG5lZWRzIGEgaGVhbHRoIGJhclxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlciBvYmplY3RzXG4gKiBAcGFyYW0gY3ViZVNpemUgVGhlIGN1YmUgcmVuZGVyIHNpemUsIHJlcXVpcmVkIHdoZW4gZHJhd2luZyBmcmVlIGhhbmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhlYWx0aEJhck1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlciwgY3ViZVNpemU6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjMDBhNDAwXCIsIFwiI0ZGMDAwMFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFkgLSAob2JqZWN0LmhlaWdodCArIDIpICogY3ViZVNpemUgLyAyLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LmhlYWx0aCAvIG9iamVjdC5tYXhIZWFsdGggKiBvYmplY3Qud2lkdGggKiBjdWJlU2l6ZSxcbiAgICAgICAgICAgIGhlaWdodDogY3ViZVNpemUgKiAzIC8gNCxcbiAgICAgICAgICAgIHN3YXRjaDogKG9iamVjdC5oZWFsdGggPiBvYmplY3QubWF4SGVhbHRoIC8gMykgPyAwIDogMSxcbiAgICAgICAgfSxdLFxuICAgICAgICBjdXN0b21SZW5kZXJTaXplOiAxXG4gICAgfTtcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlLCBTdHJva2VUeXBlcyB9IGZyb20gXCIuLi8uLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGludnVsbmVyYWJsZSBzdGF0dXMgZWZmZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBpbnZ1bG5lcmFibGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludnVsbmVyYWJsZVN0YXR1c0VmZmVjdE1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlciwgcmVuZGVyU2l6ZTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNGRkZGMDA2NlwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IG9iamVjdC53aWR0aCAvIDIsXG4gICAgICAgICAgICBjZWxsWTogb2JqZWN0LmhlaWdodCAvIDIsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwLFxuICAgICAgICAgICAgdHlwZTogU3Ryb2tlVHlwZXMuQ0lSQyxcbiAgICAgICAgfSxdLFxuICAgIH1cbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3Igc3R1bm5lZCBzdGF0dXMgZWZmZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBzdHVubmVkIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHVubmVkU3RhdHVzRWZmZWN0TWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyLCByZW5kZXJTaXplOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI0ZGRkYwMFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIG9iamVjdC5oZWlnaHQgLyAyIC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiA2LFxuICAgICAgICBmYWNpbmc6IDAsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAzLFxuICAgICAgICAgICAgY2VsbFk6IDQsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMixcbiAgICAgICAgICAgIGNlbGxZOiA1LFxuICAgICAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDUsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiA0LFxuICAgICAgICAgICAgY2VsbFk6IDIsXG4gICAgICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCBdLFxuICAgICAgICBjdXN0b21SZW5kZXJTaXplOiAyLFxuICAgIH1cbn1cbiIsInZhciBwbGF5ZXJTcGVlZCA9IDAuMjtcbnZhciBwbGF5ZXJIZWFsdGggPSAxMDA7XG52YXIgcGxheWVyV2lkdGggPSA0O1xudmFyIHBsYXllckhlaWdodCA9IDY7XG52YXIgcGxheWVyVmlld1JhbmdlID0gMSAvIDI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uLy4uL0NvbGxpc2lvbnNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICB2YXIgdXRpbHMgPSByZXF1aXJlKFwiLi4vUHJlZmFiVXRpbHNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVIsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLlBsYXllci5IVU1BTixcbiAgICAgICAgeDogcG9zWCxcbiAgICAgICAgeTogcG9zWSxcbiAgICAgICAgdmVsb2NpdHlYOiAwLFxuICAgICAgICB2ZWxvY2l0eVk6IDAsXG4gICAgICAgIHNwZWVkOiBwbGF5ZXJTcGVlZCxcbiAgICAgICAgd2lkdGg6IHBsYXllcldpZHRoLFxuICAgICAgICBoZWlnaHQ6IHBsYXllckhlaWdodCxcbiAgICAgICAgaGl0Ym94VHlwZTogdHlwZXMuSGl0Ym94VHlwZXMuUkVDVCxcbiAgICAgICAgaGl0Ym94V2lkdGg6IHBsYXllcldpZHRoIC0gMixcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiBwbGF5ZXJIZWlnaHQsXG4gICAgICAgIGhlYWx0aDogcGxheWVySGVhbHRoLFxuICAgICAgICBtYXhIZWFsdGg6IHBsYXllckhlYWx0aCxcbiAgICAgICAgY3VycmVudEVxdWlwbWVudDogdW5kZWZpbmVkLFxuICAgICAgICBlcXVpcG1lbnQ6IFsgXSxcbiAgICAgICAgYWJpbGl0aWVzOiBbIF0sXG4gICAgICAgIHN0YXR1c0VmZmVjdHM6IHsgfSxcbiAgICAgICAgdmlld1JhbmdlOiBwbGF5ZXJWaWV3UmFuZ2UsXG4gICAgICAgIGRlYXRocmF0dGxlOiAob2JzLCBzZWxmUmVmKSA9PiB7XG4gICAgICAgICAgICBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgc2VsZlJlZiwgb2JzW3NlbGZSZWZdLngsIG9ic1tzZWxmUmVmXS55LCB0eXBlcy5PYmplY3RUeXBlcy5HUkFWRVNUT05FKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7XG4gICAgICAgICAgICBvYnNbc2VsZklkXS51cGRhdGVTdGF0dXNFZmZlY3RzKG9icywgc2VsZklkKTtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHBsYXllciBtb3ZlbWVudFxuICAgICAgICAgICAgb2JzW3NlbGZJZF0ueCArPSBvYnNbc2VsZklkXS52ZWxvY2l0eVggKiBkZWx0YTtcbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLnkgKz0gb2JzW3NlbGZJZF0udmVsb2NpdHlZICogZGVsdGE7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGNvbGxpc2lvbnMgd2l0aCB0ZXJyYWluIGFuZCByZXBvc2l0aW9uIGFjY29yZGluZ2x5XG4gICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9ucyhzZWxmSWQsIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQpe1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9ic1tjb2xsaXNpb25JZF0udHlwZSkgeyAgICAgICAgLy8gU2hvdWxkIHBsYXllcnMgY29sbGlkZSB3aXRoIG90aGVyIHBsYXllcnM/XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRFUlJBSU46XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5wdXNoQmFjayhvYnMsIHNyY0lkLCBjb2xsaXNpb25JZCwgcHJlZmFicy5yZW5kZXJTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBtb3VzZURvd246IChvYnMsIG1vdXNlRXZlbnQpID0+IHsgICAvLyBQcmltYXJ5IGNsaWNrIGNhc3RzIGZpcnN0IGFiaWxpdHlcbiAgICAgICAgICAgIGlmIChvYnNbbW91c2VFdmVudC5zb3VyY2VJZF0uYWJpbGl0aWVzWzBdICYmICFjaGVja1N0YXR1c0VmZmVjdChvYnMsIG1vdXNlRXZlbnQuc291cmNlSWQsIHR5cGVzLlN0YXR1c0VmZmVjdHMuU1RVTk5FRCkpIHtcbiAgICAgICAgICAgICAgICBvYnNbbW91c2VFdmVudC5zb3VyY2VJZF0uYWJpbGl0aWVzWzBdLmNhc3Qob2JzLCBtb3VzZUV2ZW50LnNvdXJjZUlkLCAwLCBtb3VzZUV2ZW50LnRhcmdldFgsIG1vdXNlRXZlbnQudGFyZ2V0WSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uUGxheWVySW5wdXQ6IChvYnMsIHNlbGZJZCwgcGxheWVySW5wdXQpID0+IHtcbiAgICAgICAgICAgIHBsYXllciA9IG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgaWYgKGNoZWNrU3RhdHVzRWZmZWN0KG9icywgc2VsZklkLCB0eXBlcy5TdGF0dXNFZmZlY3RzLlNUVU5ORUQpKSB7XG4gICAgICAgICAgICAgICAgIHBsYXllci52ZWxvY2l0eVggPSAwO1xuICAgICAgICAgICAgICAgICBwbGF5ZXIudmVsb2NpdHlZID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHhEaXIgPSAwO1xuICAgICAgICAgICAgICAgIHZhciB5RGlyID0gMDtcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAocGxheWVySW5wdXQubGVmdCkge1xuICAgICAgICAgICAgICAgICAgICB4RGlyIC09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5yaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB4RGlyICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC51cCkge1xuICAgICAgICAgICAgICAgICAgICB5RGlyIC09IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5kb3duKSB7XG4gICAgICAgICAgICAgICAgICAgIHlEaXIgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgcGxheWVyLnZlbG9jaXR5WCA9IHhEaXIgKiBwbGF5ZXIuc3BlZWQ7XG4gICAgICAgICAgICAgICAgcGxheWVyLnZlbG9jaXR5WSA9IHlEaXIgKiBwbGF5ZXIuc3BlZWQ7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5jeWNsZUVxdWlwbWVudEZvcndhcmQgJiYgIXBsYXllcklucHV0LmN5Y2xlRXF1aXBtZW50QmFja3dhcmQgJiYgb2JzW3NlbGZJZF0uY3VycmVudEVxdWlwbWVudCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmVxdWlwbWVudFtwbGF5ZXIuY3VycmVudEVxdWlwbWVudF0ub25EZXF1aXAob2JzLCBzZWxmSWQpO1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuY3VycmVudEVxdWlwbWVudCA9IHBsYXllci5jdXJyZW50RXF1aXBtZW50ICsgMSA+PSBwbGF5ZXIuZXF1aXBtZW50Lmxlbmd0aCA/IDAgOiBwbGF5ZXIuY3VycmVudEVxdWlwbWVudCArIDE7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5lcXVpcG1lbnRbcGxheWVyLmN1cnJlbnRFcXVpcG1lbnRdLm9uRXF1aXAob2JzLCBzZWxmSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGxheWVySW5wdXQuY3ljbGVFcXVpcG1lbnRCYWNrd2FyZCAmJiAhcGxheWVySW5wdXQuY3ljbGVFcXVpcG1lbnRGb3J3YXJkICYmIG9ic1tzZWxmSWRdLmN1cnJlbnRFcXVpcG1lbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5lcXVpcG1lbnRbcGxheWVyLmN1cnJlbnRFcXVpcG1lbnRdLm9uRGVxdWlwKG9icywgc2VsZklkKTtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRFcXVpcG1lbnQgPSBwbGF5ZXIuY3VycmVudEVxdWlwbWVudCAtIDEgPCAwID8gcGxheWVyLmVxdWlwbWVudC5sZW5ndGggLSAxIDogcGxheWVyLmN1cnJlbnRFcXVpcG1lbnQgLSAxO1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZXF1aXBtZW50W3BsYXllci5jdXJyZW50RXF1aXBtZW50XS5vbkVxdWlwKG9icywgc2VsZklkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllcklucHV0LnVzZUVxdWlwbWVudCAmJiBvYnNbc2VsZklkXS5jdXJyZW50RXF1aXBtZW50ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS5lcXVpcG1lbnRbb2JzW3NlbGZJZF0uY3VycmVudEVxdWlwbWVudF1cbiAgICAgICAgICAgICAgICAgICAgICAgIC51c2Uob2JzLCBzZWxmSWQsIHBsYXllcklucHV0LnRhcmdldFgsIHBsYXllcklucHV0LnRhcmdldFkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICBpZiAocGxheWVySW5wdXQuYWJpbGl0eTEgJiYgb2JzW3NlbGZJZF0uYWJpbGl0aWVzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLmFiaWxpdGllc1swXS5jYXN0KG9icywgc2VsZklkLCAwLCBwbGF5ZXJJbnB1dC50YXJnZXRYLCBwbGF5ZXJJbnB1dC50YXJnZXRZKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllcklucHV0LmFiaWxpdHkyICYmIG9ic1tzZWxmSWRdLmFiaWxpdGllc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS5hYmlsaXRpZXNbMV0uY2FzdChvYnMsIHNlbGZJZCwgMSwgcGxheWVySW5wdXQudGFyZ2V0WCwgcGxheWVySW5wdXQudGFyZ2V0WSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5hYmlsaXR5MyAmJiBvYnNbc2VsZklkXS5hYmlsaXRpZXNbMl0pIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0uYWJpbGl0aWVzWzJdLmNhc3Qob2JzLCBzZWxmSWQsIDIsIHBsYXllcklucHV0LnRhcmdldFgsIHBsYXllcklucHV0LnRhcmdldFkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGxheWVySW5wdXQuYWJpbGl0eTQgJiYgb2JzW3NlbGZJZF0uYWJpbGl0aWVzWzNdKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLmFiaWxpdGllc1szXS5jYXN0KG9icywgc2VsZklkLCAzLCBwbGF5ZXJJbnB1dC50YXJnZXRYLCBwbGF5ZXJJbnB1dC50YXJnZXRZKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5waWNrdXApIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9ucy5jaGVja0NvbGxpc2lvbnMoc2VsZklkLCBvYnMsIHByZWZhYnMucmVuZGVyU2l6ZSwgKHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQgJiYgb2JzW2NvbGxpc2lvbklkXS50eXBlID09IHR5cGVzLk9iamVjdFR5cGVzLklOVEVSQUNUQUJMRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tjb2xsaXNpb25JZF0ub25JbnRlcmFjdChvYnMsIGNvbGxpc2lvbklkLCBzcmNJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaGVhbDogKG9icywgc2VsZklkLCBhbW91bnQpID0+IHtcbiAgICAgICAgICAgIGlmIChvYnNbc2VsZklkXSkge1xuICAgICAgICAgICAgICAgIHZhciBoZWFsQW1vdW50ID0gb2JzW3NlbGZJZF0uaGVhbHRoICsgYW1vdW50ID49IG9ic1tzZWxmSWRdLm1heEhlYWx0aFxuICAgICAgICAgICAgICAgICAgICA/IG9ic1tzZWxmSWRdLm1heEhlYWx0aCAtIG9ic1tzZWxmSWRdLmhlYWx0aFxuICAgICAgICAgICAgICAgICAgICA6IGFtb3VudDtcbiAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS5oZWFsdGggKz0gaGVhbEFtb3VudFxuICAgICAgICAgICAgICAgIHByZWZhYnMuZ2VuZXJhdGVOZXcob2JzLCBzZWxmSWQsIDAsIDAsIHR5cGVzLk9iamVjdFR5cGVzLkNPTUJBVF9URVhULCB0eXBlcy5Db21iYXRUZXh0LkhFQUxfVEVYVCwgeyB0ZXh0OiBcIitcIiArIGhlYWxBbW91bnQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRhbWFnZTogKG9icywgc2VsZklkLCBhbW91bnQsIGRhbWFnZVR5cGUpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGVja1N0YXR1c0VmZmVjdChvYnMsIHNlbGZJZCwgdHlwZXMuU3RhdHVzRWZmZWN0cy5JTlZVTE5FUkFCTEUpKSB7XG4gICAgICAgICAgICAgICAgcHJlZmFicy5nZW5lcmF0ZU5ldyhvYnMsIHNlbGZJZCwgMCwgMCwgdHlwZXMuT2JqZWN0VHlwZXMuQ09NQkFUX1RFWFQsIHR5cGVzLkNvbWJhdFRleHQuSU5WVUxORVJBQkxFX1RFWFQsIHsgdGV4dDogXCIqIFwiICsgYW1vdW50IH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1dGlscy5kYW1hZ2Uob2JzLCBzZWxmSWQsIGFtb3VudCwgZGFtYWdlVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZVN0YXR1c0VmZmVjdHM6IChvYnMsIHNlbGZJZCkgPT4ge1xuICAgICAgICAgICAgdmFyIG5ld1RpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgICAgICBzdGF0dXNFZmZlY3RDaGVja0hlbHBlcihvYnMsIHNlbGZJZCwgdHlwZXMuU3RhdHVzRWZmZWN0cy5TVFVOTkVELCBuZXdUaW1lKTtcbiAgICAgICAgICAgIHN0YXR1c0VmZmVjdENoZWNrSGVscGVyKG9icywgc2VsZklkLCB0eXBlcy5TdGF0dXNFZmZlY3RzLklOVlVMTkVSQUJMRSwgbmV3VGltZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFkZFN0YXR1c0VmZmVjdDogKG9icywgaWQsIGVmZmVjdCwgZHVyYXRpb24pID0+IHtcbiAgICAgICAgICAgIHZhciBuZXdUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gT25seSByZXBsYWNlIHRoZSBjdXJyZW50IHN0YXR1cyBlZmZlY3QgbGFzdCBjYXN0IGFuZCBkdXJhdGlvbiBpZiB0aGUgbmV3IGR1cmF0aW9uIGlzIGxvbmdlciB0aGFuIHdoYXQncyBsZWZ0XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIW9ic1tpZF0uc3RhdHVzRWZmZWN0c1tlZmZlY3RdIHx8XG4gICAgICAgICAgICAgICAgb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0uZHVyYXRpb24gLSAobmV3VGltZSAtIG9ic1tpZF0uc3RhdHVzRWZmZWN0c1tlZmZlY3RdLmxhc3QpIDwgZHVyYXRpb25cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG9ic1tpZF0uc3RhdHVzRWZmZWN0c1tlZmZlY3RdID0geyB9O1xuICAgICAgICAgICAgICAgIG9ic1tpZF0uc3RhdHVzRWZmZWN0c1tlZmZlY3RdLmxhc3QgPSBuZXdUaW1lO1xuICAgICAgICAgICAgICAgIG9ic1tpZF0uc3RhdHVzRWZmZWN0c1tlZmZlY3RdLmR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gc3RhdHVzRWZmZWN0Q2hlY2tIZWxwZXIob2JzLCBpZCwgZWZmZWN0LCBuZXdUaW1lKSB7XG4gICAgaWYgKFxuICAgICAgICBvYnNbaWRdLnN0YXR1c0VmZmVjdHNbZWZmZWN0XSAmJlxuICAgICAgICBuZXdUaW1lIC0gb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF0ubGFzdCA+PSBvYnNbaWRdLnN0YXR1c0VmZmVjdHNbZWZmZWN0XS5kdXJhdGlvblxuICAgICkge1xuICAgICAgICBkZWxldGUgb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjaGVja1N0YXR1c0VmZmVjdChvYnMsIGlkLCBlZmZlY3QpIHtcbiAgICByZXR1cm4gb2JzW2lkXS5zdGF0dXNFZmZlY3RzW2VmZmVjdF07XG59XG5cbmZ1bmN0aW9uIGNoZWNrU3RhdHVzRWZmZWN0T2JqZWN0KG9iamVjdCwgZWZmZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdC5zdGF0dXNFZmZlY3RzW2VmZmVjdF07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbiAgICBjaGVja1N0YXR1c0VmZmVjdDogY2hlY2tTdGF0dXNFZmZlY3RPYmplY3QsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIHBsYXllciBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHBsYXllciBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgb2JqZWN0c1xuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXIgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNhYmFiOWFcIiwgXCIjNzc1MDUwXCIsIFwiI0FBQUFBQVwiLCBcIiMwMDAwODBcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDIsXG4gICAgICAgICAgICB3aWR0aDogNCxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogM1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiAyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAzLFxuICAgICAgICAgICAgY2VsbFk6IDMsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiA0LFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH1dLFxuICAgIH1cbn1cbiIsInZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi9PYmplY3RUeXBlc1wiKTtcbnZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4vUHJlZmFic1wiKTtcblxuZnVuY3Rpb24gZGFtYWdlKG9icywgc2VsZklkLCBhbW91bnQsIGRhbWFnZVR5cGUpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi9QcmVmYWJzXCIpO1xuXG4gICAgb2JzW3NlbGZJZF0uaGVhbHRoIC09IGFtb3VudDtcblxuICAgIHZhciB0ZXh0VHlwZSA9IHVuZGVmaW5lZDtcbiAgICBzd2l0Y2ggKGRhbWFnZVR5cGUpIHtcbiAgICAgICAgY2FzZSB0eXBlcy5EYW1hZ2VUeXBlcy5OT1JNQUw6XG4gICAgICAgICAgICB0ZXh0VHlwZSA9IHR5cGVzLkNvbWJhdFRleHQuREFNQUdFX1RFWFQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0eXBlcy5EYW1hZ2VUeXBlcy5GSVJFOlxuICAgICAgICAgICAgdGV4dFR5cGUgPSB0eXBlcy5Db21iYXRUZXh0LkZJUkVfREFNQUdFX1RFWFQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHRleHRUeXBlKSBwcmVmYWJzLmdlbmVyYXRlTmV3KG9icywgc2VsZklkLCAwLCAwLCB0eXBlcy5PYmplY3RUeXBlcy5DT01CQVRfVEVYVCwgdGV4dFR5cGUsIHsgdGV4dDogXCItXCIgKyBhbW91bnQgfSk7XG5cbiAgICBpZiAob2JzW3NlbGZJZF0uaGVhbHRoIDw9IDApe1xuICAgICAgICBvYnNbc2VsZklkXS5kZWF0aHJhdHRsZShvYnMsIHNlbGZJZCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkYW1hZ2U6IGRhbWFnZSxcbn1cbiIsInZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi9PYmplY3RUeXBlc1wiKTtcbnZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uL0NvbGxpc2lvbnNcIik7XG52YXIgdXRpbHMgPSByZXF1aXJlKFwiLi9QcmVmYWJVdGlsc1wiKTtcblxuLy8gLS0tLS0gUHJlZmFicyAtLS0tLSAvL1xudmFyIF9wbGF5ZXIgPSByZXF1aXJlKFwiLi9QbGF5ZXIvX1BsYXllclwiKTtcbnZhciBnb2QgPSByZXF1aXJlKFwiLi9QbGF5ZXIvR29kXCIpO1xudmFyIGZpcmVtYWdlID0gcmVxdWlyZShcIi4vUGxheWVyL0ZpcmVNYWdlXCIpO1xuXG52YXIgX2dyYXZlc3RvbmUgPSByZXF1aXJlKFwiLi9HcmF2ZXN0b25lL19HcmF2ZXN0b25lXCIpO1xuXG52YXIgX3Byb2plY3RpbGUgPSByZXF1aXJlKFwiLi9Qcm9qZWN0aWxlL19Qcm9qZWN0aWxlXCIpO1xudmFyIGZpcmVib2x0UHJvamVjdGlsZSA9IHJlcXVpcmUoXCIuL1Byb2plY3RpbGUvRmlyZWJvbHRQcm9qZWN0aWxlXCIpO1xudmFyIGZsYW1lUGlsbGFyUHJvamVjdGlsZSA9IHJlcXVpcmUoXCIuL1Byb2plY3RpbGUvRmxhbWVQaWxsYXJQcm9qZWN0aWxlXCIpO1xudmFyIGZsYW1lRGFzaFByb2plY3RpbGUgPSByZXF1aXJlKFwiLi9Qcm9qZWN0aWxlL0ZsYW1lRGFzaFByb2plY3RpbGVcIik7XG5cbnZhciBfdGVycmFpbiA9IHJlcXVpcmUoXCIuL1RlcnJhaW4vX1RlcnJhaW5cIik7XG52YXIgdHJlZSA9IHJlcXVpcmUoXCIuL1RlcnJhaW4vVHJlZVwiKTtcbnZhciB3YWxsSG9yaXogPSByZXF1aXJlKFwiLi9UZXJyYWluL1dhbGxIb3JpelwiKTtcblxudmFyIF9pbnRlcmFjdGFibGUgPSByZXF1aXJlKFwiLi9JbnRlcmFjdGFibGUvX0ludGVyYWN0YWJsZVwiKTtcbnZhciBoZWFsdGhQaWNrdXAgPSByZXF1aXJlKFwiLi9JbnRlcmFjdGFibGUvSGVhbHRoUGlja3VwXCIpO1xudmFyIGNhckVudGVyID0gcmVxdWlyZShcIi4vSW50ZXJhY3RhYmxlL0NhckVudGVyXCIpO1xudmFyIHBsYXllclR5cGVDaGFuZ2VyID0gcmVxdWlyZShcIi4vSW50ZXJhY3RhYmxlL1BsYXllclR5cGVDaGFuZ2VyXCIpO1xuXG52YXIgX3RyaWdnZXIgPSByZXF1aXJlKFwiLi9UcmlnZ2VyL19UcmlnZ2VyXCIpO1xudmFyIHNwaWtlVHJhcCA9IHJlcXVpcmUoXCIuL1RyaWdnZXIvU3Bpa2VUcmFwXCIpO1xuXG52YXIgX3ZlaGljbGUgPSByZXF1aXJlKFwiLi9WZWhpY2xlL19WZWhpY2xlXCIpO1xudmFyIGNhciA9IHJlcXVpcmUoXCIuL1ZlaGljbGUvQ2FyXCIpO1xuXG52YXIgYmxhc3RlciA9IHJlcXVpcmUoXCIuL0VxdWlwbWVudC9CbGFzdGVyXCIpO1xudmFyIHNjYW5uZXIgPSByZXF1aXJlKFwiLi9FcXVpcG1lbnQvU2Nhbm5lclwiKTtcbnZhciBidWlsZGVyID0gcmVxdWlyZShcIi4vRXF1aXBtZW50L0J1aWxkZXJcIik7XG52YXIgYmlub2N1bGFycyA9IHJlcXVpcmUoXCIuL0VxdWlwbWVudC9CaW5vY3VsYXJzXCIpO1xuXG52YXIgZmlyZWJvbHQgPSByZXF1aXJlKFwiLi9BYmlsaXRpZXMvRmlyZWJvbHRcIik7XG52YXIgZmxhbWVQaWxsYXIgPSByZXF1aXJlKFwiLi9BYmlsaXRpZXMvRmxhbWVQaWxsYXJcIik7XG52YXIgZmxhbWVEYXNoID0gcmVxdWlyZShcIi4vQWJpbGl0aWVzL0ZsYW1lRGFzaFwiKTtcbnZhciBmbGFtZUJhcnJpZXIgPSByZXF1aXJlKFwiLi9BYmlsaXRpZXMvRmxhbWVCYXJyaWVyXCIpO1xuXG52YXIgX2NvbWJhdFRleHQgPSByZXF1aXJlKFwiLi9Db21iYXRUZXh0L19Db21iYXRUZXh0XCIpO1xudmFyIGRhbWFnZVRleHQgPSByZXF1aXJlKFwiLi9Db21iYXRUZXh0L0RhbWFnZVRleHRcIik7XG52YXIgZmlyZURhbWFnZVRleHQgPSByZXF1aXJlKFwiLi9Db21iYXRUZXh0L0ZpcmVEYW1hZ2VUZXh0XCIpO1xudmFyIGludnVsbmVyYWJsZVRleHQgPSByZXF1aXJlKFwiLi9Db21iYXRUZXh0L0ludnVsbmVyYWJsZVRleHRcIik7XG52YXIgaGVhbFRleHQgPSByZXF1aXJlKFwiLi9Db21iYXRUZXh0L0hlYWxUZXh0XCIpO1xuXG52YXIgX2VuZW15ID0gcmVxdWlyZShcIi4vRW5lbXkvX0VuZW15XCIpO1xuXG4vLyBFeHBvcnQgcmVuZGVyIHNpemVcbnZhciByZW5kZXJTaXplID0gNDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcmVuZGVyU2l6ZTogcmVuZGVyU2l6ZSxcbiAgICAvLyBHZW5lcmF0ZSBhIG5ldyB0ZXJyYWluIG9iamVjdFxuICAgIGdlbmVyYXRlTmV3OiAob2JzLCBzcmMsIHBvc1gsIHBvc1ksIHR5cGUsIHN1YnR5cGUsIHBhcmFtcyA9IHsgfSkgPT4ge1xuICAgICAgICB2YXIgbmV3T2JqO1xuICAgICAgICBcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUjpcbiAgICAgICAgICAgICAgICBuZXdPYmogPSBfcGxheWVyLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5QbGF5ZXIuR09EOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gZ29kLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUGxheWVyLkZJUkVfTUFHRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGZpcmVtYWdlLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9ic1tzcmNdID0gbmV3T2JqO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuR1JBVkVTVE9ORTpcbiAgICAgICAgICAgICAgICBuZXdPYmogPSBfZ3JhdmVzdG9uZS5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSk7XG4gICAgICAgICAgICAgICAgb2JzW3NyY10gPSBuZXdPYmo7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QUk9KRUNUSUxFOlxuICAgICAgICAgICAgICAgIC8vIEdlbmVyYXRlIHVuaXF1ZSBJZCBmb3IgbmV3IHByb2plY3RpbGVcbiAgICAgICAgICAgICAgICB2YXIgbmV3SWQgPSBzcmMuY29uY2F0KFwiOlwiICsgdHlwZSArIFwiOlwiICsgc3VidHlwZSArIFwiOlwiLCBwb3NYLCBcIjpcIiwgcG9zWSk7XG4gICAgICAgICAgICAgICAgdmFyIGR1cCA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG9ic1tuZXdJZC5jb25jYXQoXCI6XCIgKyBkdXApXSl7XG4gICAgICAgICAgICAgICAgICAgIGR1cCsrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5ld09iaiA9IF9wcm9qZWN0aWxlLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Qcm9qZWN0aWxlLkZJUkVCT0xUX1BST0pFQ1RJTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmogPSBmaXJlYm9sdFByb2plY3RpbGUuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIG5ld09iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Qcm9qZWN0aWxlLkZMQU1FX1BJTExBUl9QUk9KRUNUSUxFOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gZmxhbWVQaWxsYXJQcm9qZWN0aWxlLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUHJvamVjdGlsZS5GTEFNRV9EQVNIX1BST0pFQ1RJTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmogPSBmbGFtZURhc2hQcm9qZWN0aWxlLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXdPYmopIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvYnNbbmV3SWQuY29uY2F0KFwiOlwiICsgZHVwKV0gPSBuZXdPYmo7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5URVJSQUlOOlxuICAgICAgICAgICAgICAgIG5ld09iaiA9IF90ZXJyYWluLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5UZXJyYWluLlRSRUU6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmogPSB0cmVlLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVGVycmFpbi5XQUxMX0hPUklaOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gd2FsbEhvcml6LmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5JTlRFUkFDVEFCTEU6XG4gICAgICAgICAgICAgICAgbmV3T2JqID0gX2ludGVyYWN0YWJsZS5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuSW50ZXJhY3RhYmxlLkhFQUxUSF9QSUNLVVA6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmogPSBoZWFsdGhQaWNrdXAuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIG5ld09iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5JbnRlcmFjdGFibGUuQ0FSX0VOVEVSOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gY2FyRW50ZXIuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIG5ld09iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tzcmMgKyBcIjpcIiArIHR5cGUgKyBcIjpcIiArIHN1YnR5cGVdID0gbmV3T2JqO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkludGVyYWN0YWJsZS5QTEFZRVJfVFlQRV9DSEFOR0VSOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gcGxheWVyVHlwZUNoYW5nZXIuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIG5ld09iaiwgcGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVFJJR0dFUjpcbiAgICAgICAgICAgICAgICBuZXdPYmogPSBfdHJpZ2dlci5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVHJpZ2dlci5TUElLRV9UUkFQOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3T2JqID0gc3Bpa2VUcmFwLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFOlxuICAgICAgICAgICAgICAgIG5ld09iaiA9IF92ZWhpY2xlLmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5WZWhpY2xlLkNBUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGNhci5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLkNPTUJBVF9URVhUOlxuICAgICAgICAgICAgICAgIC8vIEdlbmVyYXRlIHVuaXF1ZSBJZCBmb3IgbmV3IGNvbWJhdCB0ZXh0XG4gICAgICAgICAgICAgICAgdmFyIG5ld0lkID0gc3JjLmNvbmNhdChcIjpcIiArIHR5cGUgKyBcIjpcIiArIHN1YnR5cGUgKyBcIjpcIiwgcG9zWCwgXCI6XCIsIHBvc1kpO1xuICAgICAgICAgICAgICAgIHZhciBkdXAgPSAwO1xuICAgICAgICAgICAgICAgIHdoaWxlIChvYnNbbmV3SWQuY29uY2F0KFwiOlwiICsgZHVwKV0pe1xuICAgICAgICAgICAgICAgICAgICBkdXArKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3T2JqID0gX2NvbWJhdFRleHQuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuQ29tYmF0VGV4dC5EQU1BR0VfVEVYVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld09iaiA9IGRhbWFnZVRleHQuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIG5ld09iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Db21iYXRUZXh0LkZJUkVfREFNQUdFX1RFWFQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmogPSBmaXJlRGFtYWdlVGV4dC5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkNvbWJhdFRleHQuSU5WVUxORVJBQkxFX1RFWFQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmogPSBpbnZ1bG5lcmFibGVUZXh0LmdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBuZXdPYmopO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuQ29tYmF0VGV4dC5IRUFMX1RFWFQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdPYmogPSBoZWFsVGV4dC5nZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgbmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvYnNbbmV3SWQuY29uY2F0KFwiOlwiICsgZHVwKV0gPSBuZXdPYmo7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5FTkVNWTpcbiAgICAgICAgICAgICAgICBuZXdPYmogPSBfZW5lbXkuZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE86IENvbnNpZGVyIHJlbW92aW5nIHRoaXM/XG4gICAgICAgIGlmICghbmV3T2JqKSB7XG4gICAgICAgICAgICBuZXdPYmogPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTixcbiAgICAgICAgICAgICAgICBzdWJ0eXBlOiBzdWJ0eXBlLFxuICAgICAgICAgICAgICAgIHg6IHBvc1gsXG4gICAgICAgICAgICAgICAgeTogcG9zWSxcbiAgICAgICAgICAgICAgICB3aWR0aDogNixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDYsXG4gICAgICAgICAgICAgICAgaGl0Ym94VHlwZTogdHlwZXMuSGl0Ym94VHlwZXMuUkVDVCxcbiAgICAgICAgICAgICAgICBoaXRib3hXaWR0aDogNixcbiAgICAgICAgICAgICAgICBoaXRib3hIZWlnaHQ6IDYsXG4gICAgICAgICAgICAgICAgaGVhbHRoOiAxLFxuICAgICAgICAgICAgICAgIG1heEhlYWx0aDogMSxcbiAgICAgICAgICAgICAgICB1cGRhdGU6IChvYnMsIHNlbGZJZCwgZGVsdGEpID0+IHsgfSxcbiAgICAgICAgICAgICAgICBkYW1hZ2U6IHV0aWxzLmRhbWFnZSxcbiAgICAgICAgICAgICAgICBkZWF0aHJhdHRsZTogKG9icywgc2VsZklkKSA9PiB7IH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb2JzW3NyYyArIFwiOlwiICsgdHlwZSArIFwiOlwiICsgc3VidHlwZSArIFwiOlwiICsgcG9zWCArIFwiOlwiICsgcG9zWV0gPSBuZXdPYmo7XG4gICAgfSxcbiAgICBuZXdFcXVpcG1lbnQ6IChvYnMsIHR5cGUsIHBhcmFtcyA9IHsgfSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuRXF1aXBtZW50VHlwZXMuQkxBU1RFUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gYmxhc3Rlci5nZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyk7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkVxdWlwbWVudFR5cGVzLlNDQU5ORVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjYW5uZXIuZ2VuZXJhdGVOZXcob2JzLCBwYXJhbXMpO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CVUlMREVSOlxuICAgICAgICAgICAgICAgIHJldHVybiBidWlsZGVyLmdlbmVyYXRlTmV3KG9icywgcGFyYW1zKTtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuRXF1aXBtZW50VHlwZXMuQklOT0NVTEFSUzpcbiAgICAgICAgICAgICAgICByZXR1cm4gYmlub2N1bGFycy5nZW5lcmF0ZU5ldyhvYnMsIHBhcmFtcyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG5ld0FiaWxpdHk6IChvYnMsIHR5cGUsIHBhcmFtcyA9IHsgfSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuQWJpbGl0aWVzLkZJUkVCT0xUOlxuICAgICAgICAgICAgICAgIHJldHVybiBmaXJlYm9sdC5nZW5lcmF0ZU5ldyhvYnMpO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5BYmlsaXRpZXMuRkxBTUVfUElMTEFSOlxuICAgICAgICAgICAgICAgIHJldHVybiBmbGFtZVBpbGxhci5nZW5lcmF0ZU5ldyhvYnMpO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5BYmlsaXRpZXMuRkxBTUVfREFTSDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZmxhbWVEYXNoLmdlbmVyYXRlTmV3KG9icyk7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkFiaWxpdGllcy5GTEFNRV9CQVJSSUVSOlxuICAgICAgICAgICAgICAgIHJldHVybiBmbGFtZUJhcnJpZXIuZ2VuZXJhdGVOZXcob2JzKTtcbiAgICAgICAgfVxuICAgIH0sXG59IiwidmFyIGZpcmVib2x0U3BlZWQgPSAwLjM1O1xudmFyIGZpcmVib2x0V2lkdGggPSAzO1xudmFyIGZpcmVib2x0SGVpZ2h0ID0gMztcbnZhciBmaXJlYm9sdEhpdEJveFJhZGl1cyA9IDEuNTtcbnZhciBmaXJlYm9sdERhbWFnZSA9IDEyO1xudmFyIGZpcmVib2x0VGlja0luY3JlYXNlID0gMTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICB2YXIgZmlyZW1hZ2UgPSByZXF1aXJlKFwiLi4vUGxheWVyL0ZpcmVNYWdlXCIpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJhc2UsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLlByb2plY3RpbGUuRklSRUJPTFRfUFJPSkVDVElMRSxcbiAgICAgICAgdmVsb2NpdHlYOiBNYXRoLmNvcyhiYXNlLmFuZ2xlKSAqIGZpcmVib2x0U3BlZWQsXG4gICAgICAgIHZlbG9jaXR5WTogTWF0aC5zaW4oYmFzZS5hbmdsZSkgKiBmaXJlYm9sdFNwZWVkLFxuICAgICAgICB3aWR0aDogZmlyZWJvbHRXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBmaXJlYm9sdEhlaWdodCxcbiAgICAgICAgaGl0Ym94VHlwZTogdHlwZXMuSGl0Ym94VHlwZXMuQ0lSQyxcbiAgICAgICAgaGl0Ym94UmFkaXVzOiBmaXJlYm9sdEhpdEJveFJhZGl1cyxcbiAgICAgICAgZGFtYWdlOiBmaXJlYm9sdERhbWFnZSxcbiAgICAgICAgb25IaXQ6IChvYnMsIHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChvYnNbY29sbGlzaW9uSWRdLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUjpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLkdSQVZFU1RPTkU6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTjpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLkVORU1ZOlxuICAgICAgICAgICAgICAgICAgICBpZiAob2JzW3NyY0lkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ic1tjb2xsaXNpb25JZF0gJiYgb2JzW2NvbGxpc2lvbklkXS5kYW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlbWFnZS5pbmNyZWFzZUZpcmVUaWNrKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tzcmNJZF0uc291cmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob2JzW2NvbGxpc2lvbklkXS50eXBlID09PSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVIgfHwgb2JzW2NvbGxpc2lvbklkXS50eXBlID09PSB0eXBlcy5PYmplY3RUeXBlcy5FTkVNWSkgPyBmaXJlYm9sdFRpY2tJbmNyZWFzZSA6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGFtYWdlID0gb2JzW3NyY0lkXS5kYW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyZURhbWFnZSA9IG9ic1tvYnNbc3JjSWRdLnNvdXJjZV0uZmlyZVRpY2tzID8gb2JzW29ic1tzcmNJZF0uc291cmNlXS5maXJlVGlja3MgKiBmaXJlbWFnZS5maXJlVGlja0RhbWFnZTogMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tjb2xsaXNpb25JZF0uZGFtYWdlKG9icywgY29sbGlzaW9uSWQsIGRhbWFnZSwgdHlwZXMuRGFtYWdlVHlwZXMuTk9STUFMKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyZURhbWFnZSkgb2JzW2NvbGxpc2lvbklkXS5kYW1hZ2UoIG9icywgY29sbGlzaW9uSWQsIGZpcmVEYW1hZ2UsIHR5cGVzLkRhbWFnZVR5cGVzLkZJUkUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzcmNJZF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGZpcmVib2x0IHByb2plY3RpbGVcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGZpcmVib2x0IHByb2plY3RpbGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gZmlyZWJvbHRQcm9qZWN0aWxlTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNDRDVDNUNcIiwgXCIjRkY4QzAwXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAuNSxcbiAgICAgICAgICAgIGNlbGxZOiAwLjUsXG4gICAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSxdXG4gICAgfVxufVxuIiwidmFyIGZsYW1lRGFzaFNwZWVkID0gMC4xNDtcbnZhciBmbGFtZURhc2hXaWR0aCA9IDI7XG52YXIgZmxhbWVEYXNoSGVpZ2h0ID0gMjtcbnZhciBmbGFtZURhc2hIaXRCb3hSYWRpdXMgPSAxO1xudmFyIGZsYW1lRGFzaERhbWFnZSA9IDY7XG52YXIgZmxhbWVEYXNoVGlja0luY3JlYXNlID0gMjtcbnZhciBmbGFtZURhc2hUcmFja2luZ1JhZGl1cyA9IDE1MDtcbnZhciBmbGFtZURhc2hNYXhQcm9qRGlzdGFuY2UgPSBmbGFtZURhc2hUcmFja2luZ1JhZGl1cyAqIDI7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG4gICAgdmFyIGZpcmVtYWdlID0gcmVxdWlyZShcIi4uL1BsYXllci9GaXJlTWFnZVwiKTtcbiAgICB2YXIgY29sbGlzaW9ucyA9IHJlcXVpcmUoXCIuLi8uLi9Db2xsaXNpb25zXCIpO1xuXG4gICAgdmFyIHRyYWNrSWQgPSB1bmRlZmluZWQ7XG4gICAgdmFyIHNtYWxsZXN0RGlzdCA9IHVuZGVmaW5lZDtcblxuICAgIGNvbGxpc2lvbnMuY2hlY2tDb2xsaXNpb25zQnlEaXN0YW5jZShzcmMsIG9icywgZmxhbWVEYXNoVHJhY2tpbmdSYWRpdXMsIChzcmNJZCwgY29sbGlzaW9uSWQsIGRpc3QpID0+IHtcbiAgICAgICAgaWYgKG9ic1tjb2xsaXNpb25JZF0gJiYgb2JzW3NyY0lkXSAmJiBzcmNJZCAhPT0gY29sbGlzaW9uSWQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAob2JzW2NvbGxpc2lvbklkXS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVI6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5FTkVNWTpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLkdSQVZFU1RPTkU6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFja0lkIHx8IGRpc3QgPCBzbWFsbGVzdERpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrSWQgPSBjb2xsaXNpb25JZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNtYWxsZXN0RGlzdCA9IGRpc3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIXRyYWNrSWQpIHJldHVybjtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5Qcm9qZWN0aWxlLkZMQU1FX0RBU0hfUFJPSkVDVElMRSxcbiAgICAgICAgdmVsb2NpdHlYOiAwLFxuICAgICAgICB2ZWxvY2l0eVk6IDAsXG4gICAgICAgIHdpZHRoOiBmbGFtZURhc2hXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBmbGFtZURhc2hIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBmbGFtZURhc2hIaXRCb3hSYWRpdXMsXG4gICAgICAgIGhpdGJveEhlaWdodDogZmxhbWVEYXNoSGl0Qm94UmFkaXVzLFxuICAgICAgICBkYW1hZ2U6IGZsYW1lRGFzaERhbWFnZSxcbiAgICAgICAgdHJhY2tJZDogdHJhY2tJZCxcbiAgICAgICAgbWF4UHJvakRpc3Q6IGZsYW1lRGFzaE1heFByb2pEaXN0YW5jZSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7XG4gICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0gJiYgb2JzW29ic1tzZWxmSWRdLnRyYWNrSWRdKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzdCA9IE1hdGguc3FydChcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3cob2JzW3NlbGZJZF0ueCAtIG9ic1tvYnNbc2VsZklkXS50cmFja0lkXS54LCAyKSArXG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KG9ic1tzZWxmSWRdLnkgLSBvYnNbb2JzW3NlbGZJZF0udHJhY2tJZF0ueSwgMikpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpc3QgPiBmbGFtZURhc2hUcmFja2luZ1JhZGl1cykge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb2JzW3NlbGZJZF07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMihcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tvYnNbc2VsZklkXS50cmFja0lkXS55IC0gb2JzW3NlbGZJZF0ueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tvYnNbc2VsZklkXS50cmFja0lkXS54IC0gb2JzW3NlbGZJZF0ueCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS52ZWxvY2l0eVggPSBNYXRoLmNvcyhhbmdsZSkgKiBmbGFtZURhc2hTcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0udmVsb2NpdHlZID0gTWF0aC5zaW4oYW5nbGUpICogZmxhbWVEYXNoU3BlZWQsXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHByb2plY3RpbGUgbW92ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0ueCArPSBvYnNbc2VsZklkXS52ZWxvY2l0eVggKiBkZWx0YTtcbiAgICAgICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0ueSArPSBvYnNbc2VsZklkXS52ZWxvY2l0eVkgKiBkZWx0YTtcbiAgICAgICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0uZGlzdCArPSBNYXRoLnNxcnQoXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhvYnNbc2VsZklkXS52ZWxvY2l0eVggKiBkZWx0YSwgMikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3cob2JzW3NlbGZJZF0udmVsb2NpdHlZICogZGVsdGEsIDIpKTtcblxuICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9ucyhzZWxmSWQsIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JzW3NyY0lkXSAmJiBjb2xsaXNpb25JZCAhPSBzcmNJZCAmJiBjb2xsaXNpb25JZCAhPSBvYnNbc3JjSWRdLnNvdXJjZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzW3NyY0lkXS5vbkhpdChvYnMsIHNyY0lkLCBjb2xsaXNpb25JZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYnNbc2VsZklkXS5kaXN0ID4gb2JzW3NlbGZJZF0ubWF4UHJvakRpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgb2JzW3NlbGZJZF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChvYnNbc2VsZklkXSkgZGVsZXRlIG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbkhpdDogKG9icywgc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9ic1tjb2xsaXNpb25JZF0udHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuUExBWUVSOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuR1JBVkVTVE9ORTpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEU6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5URVJSQUlOOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuRU5FTVk6XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYnNbc3JjSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JzW2NvbGxpc2lvbklkXSAmJiBvYnNbY29sbGlzaW9uSWRdLmRhbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVtYWdlLmluY3JlYXNlRmlyZVRpY2soXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9icyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzW3NyY0lkXS5zb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvYnNbY29sbGlzaW9uSWRdLnR5cGUgPT09IHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUiB8fCBvYnNbY29sbGlzaW9uSWRdLnR5cGUgPT09IHR5cGVzLk9iamVjdFR5cGVzLkVORU1ZKSA/IGZsYW1lRGFzaFRpY2tJbmNyZWFzZSA6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGFtYWdlID0gb2JzW3NyY0lkXS5kYW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyZURhbWFnZSA9IG9ic1tvYnNbc3JjSWRdLnNvdXJjZV0uZmlyZVRpY2tzID8gb2JzW29ic1tzcmNJZF0uc291cmNlXS5maXJlVGlja3MgKiBmaXJlbWFnZS5maXJlVGlja0RhbWFnZTogMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tjb2xsaXNpb25JZF0uZGFtYWdlKG9icywgY29sbGlzaW9uSWQsIGRhbWFnZSwgdHlwZXMuRGFtYWdlVHlwZXMuTk9STUFMKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyZURhbWFnZSkgb2JzW2NvbGxpc2lvbklkXS5kYW1hZ2UoIG9icywgY29sbGlzaW9uSWQsIGZpcmVEYW1hZ2UsIHR5cGVzLkRhbWFnZVR5cGVzLkZJUkUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzcmNJZF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGZpcmUgZGFzaCBwcm9qZWN0aWxlXG4gKiBAcGFyYW0gb2JqZWN0IFRoZSBmaXJlIGRhc2ggcHJvamVjdGlsZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmbGFtZURhc2hQcm9qZWN0aWxlTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIGNvbnN0IGN1c3RvbVJlbmRlclNpemUgPSAyO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNDRDVDNUNcIiwgXCIjRkY4QzAwXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQgICogY3VzdG9tUmVuZGVyU2l6ZSxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAqIGN1c3RvbVJlbmRlclNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAuNSxcbiAgICAgICAgICAgIGNlbGxZOiAwLjUsXG4gICAgICAgICAgICB3aWR0aDogMyxcbiAgICAgICAgICAgIGhlaWdodDogMyxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSxdLFxuICAgICAgICBjdXN0b21SZW5kZXJTaXplOiBjdXN0b21SZW5kZXJTaXplLFxuICAgIH1cbn1cbiIsInZhciBmbGFtZVBpbGxhclNwZWVkID0gMDtcbnZhciBmbGFtZVBpbGxhcldpZHRoID0gNjtcbnZhciBmbGFtZVBpbGxhckhlaWdodCA9IDEyO1xudmFyIGZsYW1lUGlsbGFySGl0Qm94V2lkdGggPSA2O1xudmFyIGZsYW1lUGlsbGFySGl0Qm94SGVpZ2h0ID0gMTI7XG52YXIgZmxhbWVQaWxsYXJEYW1hZ2UgPSAxNjtcbnZhciBmbGFtZVBpbGxhclRpY2tJbmNyZWFzZSA9IDI7XG52YXIgZmxhbWVQaWxsYXJTdHVuRHVyYXRpb24gPSAxNTAwO1xuXG52YXIgZmxhbWVQaWxsYXJUcmlnZ2VyRGVsYXkgPSA1MDA7XG52YXIgZmxhbWVQaWxsYXJUaW1lb3V0ID0gMTAwMDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICB2YXIgZmlyZW1hZ2UgPSByZXF1aXJlKFwiLi4vUGxheWVyL0ZpcmVNYWdlXCIpO1xuICAgIHZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uLy4uL0NvbGxpc2lvbnNcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuUHJvamVjdGlsZS5GTEFNRV9QSUxMQVJfUFJPSkVDVElMRSxcbiAgICAgICAgeDogcG9zWCxcbiAgICAgICAgeTogcG9zWSxcbiAgICAgICAgdmVsb2NpdHlYOiBmbGFtZVBpbGxhclNwZWVkLFxuICAgICAgICB2ZWxvY2l0eVk6IGZsYW1lUGlsbGFyU3BlZWQsXG4gICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgd2lkdGg6IGZsYW1lUGlsbGFyV2lkdGgsXG4gICAgICAgIGhlaWdodDogZmxhbWVQaWxsYXJIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBmbGFtZVBpbGxhckhpdEJveFdpZHRoLFxuICAgICAgICBoaXRib3hIZWlnaHQ6IGZsYW1lUGlsbGFySGl0Qm94SGVpZ2h0LFxuICAgICAgICBkYW1hZ2U6IGZsYW1lUGlsbGFyRGFtYWdlLFxuICAgICAgICBpbml0VGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgdHJpZ2dlcmVkOiBmYWxzZSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7XG4gICAgICAgICAgICB2YXIgbmV3VGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgICAgIC8vIElmIHRpbWVvdXQgaXMgcGFzc2VkLCBkZWxldGUgaXRlbVxuICAgICAgICAgICAgaWYgKG9ic1tzZWxmSWRdICYmIG5ld1RpbWUgLSBvYnNbc2VsZklkXS5pbml0VGltZSA+PSBmbGFtZVBpbGxhclRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JzW3NlbGZJZF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIElmIHRyaWdnZXIgZGVsYXkgZWxhcHNlZCwgY2hlY2sgZm9yIG9iamVjdCBjb2xsaXNpb25zXG4gICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0gJiYgbmV3VGltZSAtIG9ic1tzZWxmSWRdLmluaXRUaW1lID49IGZsYW1lUGlsbGFyVHJpZ2dlckRlbGF5KSB7XG4gICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0udHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9ucyhzZWxmSWQsIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYnNbc3JjSWRdICYmIGNvbGxpc2lvbklkICE9IHNyY0lkICYmIGNvbGxpc2lvbklkICE9IG9ic1tzcmNJZF0uc291cmNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic1tzcmNJZF0ub25IaXQob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uSGl0OiAob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAob2JzW2NvbGxpc2lvbklkXS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVI6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5FTkVNWTpcbiAgICAgICAgICAgICAgICAgICAgb2JzW2NvbGxpc2lvbklkXS5hZGRTdGF0dXNFZmZlY3Qob2JzLCBjb2xsaXNpb25JZCwgdHlwZXMuU3RhdHVzRWZmZWN0cy5TVFVOTkVELCBmbGFtZVBpbGxhclN0dW5EdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5HUkFWRVNUT05FOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVkVISUNMRTpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRFUlJBSU46XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYnNbc3JjSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JzW2NvbGxpc2lvbklkXSAmJiBvYnNbY29sbGlzaW9uSWRdLmRhbWFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVtYWdlLmluY3JlYXNlRmlyZVRpY2soXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9icyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzW3NyY0lkXS5zb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvYnNbY29sbGlzaW9uSWRdLnR5cGUgPT09IHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUiB8fCBvYnNbY29sbGlzaW9uSWRdLnR5cGUgPT09IHR5cGVzLk9iamVjdFR5cGVzLkVORU1ZKSA/IGZsYW1lUGlsbGFyVGlja0luY3JlYXNlIDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYW1hZ2UgPSBvYnNbc3JjSWRdLmRhbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaXJlRGFtYWdlID0gb2JzW29ic1tzcmNJZF0uc291cmNlXS5maXJlVGlja3MgPyBvYnNbb2JzW3NyY0lkXS5zb3VyY2VdLmZpcmVUaWNrcyAqIGZpcmVtYWdlLmZpcmVUaWNrRGFtYWdlOiAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzW2NvbGxpc2lvbklkXS5kYW1hZ2Uob2JzLCBjb2xsaXNpb25JZCwgZGFtYWdlLCB0eXBlcy5EYW1hZ2VUeXBlcy5OT1JNQUwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaXJlRGFtYWdlKSBvYnNbY29sbGlzaW9uSWRdLmRhbWFnZSggb2JzLCBjb2xsaXNpb25JZCwgZmlyZURhbWFnZSwgdHlwZXMuRGFtYWdlVHlwZXMuRklSRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgb2JzW3NyY0lkXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgZmlyZSBwaWxsYXIgcHJvamVjdGlsZVxuICogQHBhcmFtIG9iamVjdCBUaGUgZmlyZSBwaWxsYXIgcHJvamVjdGlsZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhbWVQaWxsYXJQcm9qZWN0aWxlTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiNFNjdFMDBEOVwiLCBcIiNGRjY5MzNEOVwiLCBcIiNGRjhDMDBEOVwiLCBcIiNGRkE1MDBEOVwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggLSAyLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiBvYmplY3QudHJpZ2dlcmVkID8gMSA6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMSxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQgLSAxLFxuICAgICAgICAgICAgc3dhdGNoOiBvYmplY3QudHJpZ2dlcmVkID8gMSA6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiBvYmplY3QudHJpZ2dlcmVkID8gMyA6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiBvYmplY3QudHJpZ2dlcmVkID8gMyA6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDQsXG4gICAgICAgICAgICBjZWxsWTogNSxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiBvYmplY3QudHJpZ2dlcmVkID8gMyA6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogNyxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiBvYmplY3QudHJpZ2dlcmVkID8gMyA6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogOCxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiBvYmplY3QudHJpZ2dlcmVkID8gMyA6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDQsXG4gICAgICAgICAgICBjZWxsWTogOSxcbiAgICAgICAgICAgIHdpZHRoOiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgc3dhdGNoOiBvYmplY3QudHJpZ2dlcmVkID8gMyA6IDJcbiAgICAgICAgfSxdXG4gICAgfVxufVxuIiwidmFyIHByb2plY3RpbGVXaWR0aCA9IDI7XG52YXIgcHJvamVjdGlsZUhlaWdodCA9IDAuNTtcbnZhciBwcm9qZWN0aWxlSGl0Qm94UmFkaXVzID0gMS41O1xudmFyIGJhc2VQcm9qZWN0aWxlRGFtYWdlID0gMTA7XG52YXIgcHJvamVjdGlsZVNwZWVkID0gMC44OyBcbnZhciBtYXhQcm9qRGlzdCA9IDE2MDA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uLy4uL0NvbGxpc2lvbnNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcblxuICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIoXG4gICAgICAgIHBvc1kgLSBvYnNbc3JjXS55LFxuICAgICAgICBwb3NYIC0gb2JzW3NyY10ueCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5PYmplY3RUeXBlcy5QUk9KRUNUSUxFLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5Qcm9qZWN0aWxlLkJBU0lDX1BST0pFQ1RJTEUsXG4gICAgICAgIHNvdXJjZTogc3JjLFxuICAgICAgICB4OiBvYnNbc3JjXS54LFxuICAgICAgICB5OiBvYnNbc3JjXS55LFxuICAgICAgICBhbmdsZTogYW5nbGUsXG4gICAgICAgIHZlbG9jaXR5WDogTWF0aC5jb3MoYW5nbGUpICogcHJvamVjdGlsZVNwZWVkLFxuICAgICAgICB2ZWxvY2l0eVk6IE1hdGguc2luKGFuZ2xlKSAqIHByb2plY3RpbGVTcGVlZCxcbiAgICAgICAgd2lkdGg6IHByb2plY3RpbGVXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBwcm9qZWN0aWxlSGVpZ2h0LFxuICAgICAgICBoaXRib3hUeXBlOiB0eXBlcy5IaXRib3hUeXBlcy5SRUNULFxuICAgICAgICBoaXRib3hXaWR0aDogcHJvamVjdGlsZUhpdEJveFJhZGl1cyxcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiBwcm9qZWN0aWxlSGl0Qm94UmFkaXVzLFxuICAgICAgICBmYWNpbmc6IGFuZ2xlICogMTgwIC8gTWF0aC5QSSxcbiAgICAgICAgZGlzdDogMCxcbiAgICAgICAgbWF4UHJvakRpc3Q6IG1heFByb2pEaXN0LFxuICAgICAgICBkYW1hZ2U6IGJhc2VQcm9qZWN0aWxlRGFtYWdlLFxuICAgICAgICB1cGRhdGU6IChvYnMsIHNlbGZJZCwgZGVsdGEpID0+IHtcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBwcm9qZWN0aWxlIG1vdmVtZW50XG4gICAgICAgICAgICBvYnNbc2VsZklkXS54ICs9IG9ic1tzZWxmSWRdLnZlbG9jaXR5WCAqIGRlbHRhO1xuICAgICAgICAgICAgb2JzW3NlbGZJZF0ueSArPSBvYnNbc2VsZklkXS52ZWxvY2l0eVkgKiBkZWx0YTtcbiAgICAgICAgICAgIG9ic1tzZWxmSWRdLmRpc3QgKz0gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgICAgIE1hdGgucG93KG9ic1tzZWxmSWRdLnZlbG9jaXR5WCAqIGRlbHRhLCAyKSArXG4gICAgICAgICAgICAgICAgTWF0aC5wb3cob2JzW3NlbGZJZF0udmVsb2NpdHlZICogZGVsdGEsIDIpKTtcblxuICAgICAgICAgICAgLy8gVE9ETzogQ2hhbmdlIHByb2plY3RpbGUgY29sbGlzaW9ucyB0byByYXkgY2FzdFxuICAgICAgICAgICAgY29sbGlzaW9ucy5jaGVja0NvbGxpc2lvbnMoc2VsZklkLCBvYnMsIHByZWZhYnMucmVuZGVyU2l6ZSwgKHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYnNbc3JjSWRdICYmIGNvbGxpc2lvbklkICE9IHNyY0lkICYmIGNvbGxpc2lvbklkICE9IG9ic1tzcmNJZF0uc291cmNlKXtcbiAgICAgICAgICAgICAgICAgICAgb2JzW3NyY0lkXS5vbkhpdChvYnMsIHNyY0lkLCBjb2xsaXNpb25JZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0pIHtcbiAgICAgICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0uZGlzdCA+IG9ic1tzZWxmSWRdLm1heFByb2pEaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbc2VsZklkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uSGl0OiAob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAob2JzW2NvbGxpc2lvbklkXS50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVI6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5FTkVNWTpcbiAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLkdSQVZFU1RPTkU6XG4gICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFOlxuICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYnNbY29sbGlzaW9uSWRdICYmIG9ic1tjb2xsaXNpb25JZF0uZGFtYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzW2NvbGxpc2lvbklkXS5kYW1hZ2Uob2JzLCBjb2xsaXNpb25JZCwgb2JzW3NyY0lkXS5kYW1hZ2UsIHR5cGVzLkRhbWFnZVR5cGVzLk5PUk1BTCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgb2JzW3NyY0lkXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGJhc2ljIHByb2plY3RpbGVcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHByb2plY3RpbGUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyB0aGUgb2JqZWN0c1xuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvamVjdGlsZU1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICAvLyBSZW1vdmUgY29tbWVudHMgZm9yIHJhaW5ib3cgYnVsbGV0c1xuICAgICAgICAvLyBwYWxldHRlOiBbXCIjRkY2NjY2XCIsIFwiIzY2RkY2NlwiLCBcIiM2NjY2RkZcIiwgXCIjRkZGRjY2XCIsIFwiI0ZGNjZGRlwiLCBcIiM2NkZGRkZcIl0sXG4gICAgICAgIHBhbGV0dGU6IFtcIiMyMjIyMjJcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgLy8gc3dhdGNoOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KVxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH1dXG4gICAgfVxufVxuIiwidmFyIHRyZWVXaWR0aCA9IDQ7XG52YXIgdHJlZUhlaWdodCA9IDg7XG52YXIgdHJlZUhpdGJveFdpZHRoID0gNDtcbnZhciB0cmVlSGl0Ym94SGVpZ2h0ID0gODtcbnZhciB0cmVlSGVhbHRoID0gMjAwO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU5ldyhvYnMsIHNyYywgcG9zWCwgcG9zWSwgYmFzZSkge1xuICAgIHZhciB0eXBlcyA9IHJlcXVpcmUoXCIuLi8uLi9PYmplY3RUeXBlc1wiKTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICAuLi5iYXNlLFxuICAgICAgICBzdWJ0eXBlOiB0eXBlcy5UZXJyYWluLlRSRUUsXG4gICAgICAgIHdpZHRoOiB0cmVlV2lkdGgsXG4gICAgICAgIGhlaWdodDogdHJlZUhlaWdodCxcbiAgICAgICAgaGl0Ym94VHlwZTogdHlwZXMuSGl0Ym94VHlwZXMuUkVDVCxcbiAgICAgICAgaGl0Ym94V2lkdGg6IHRyZWVIaXRib3hXaWR0aCxcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiB0cmVlSGl0Ym94SGVpZ2h0LFxuICAgICAgICBoZWFsdGg6IHRyZWVIZWFsdGgsXG4gICAgICAgIG1heEhlYWx0aDogdHJlZUhlYWx0aCxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIHRyZWUgb2JqZWN0XG4gKiBAcGFyYW0gb2JqZWN0IFRoZSB0cmVlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFggSG9yaXpvbnRhbCBvZmZzZXQgZm9yIHJlbmRlcmluZyBvYmplY3RzXG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WSBWZXJ0aWNhbCBvZmZzZXQgZm9yIHJlbmRlciBvYmplY3RzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmVlVHJ1bmtNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzk5MzMwMFwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdLFxuICAgIH07XG59XG5cbi8vIFRPRE86IENoYW5nZSBsZWFmIHJlbmRlcmluZyBkZXBlbmRpbmcgb24gdHJlZSBoZWFsdGhcbi8qKlxuICogR2V0IG1hc3RlciBwaWVjZSBmb3IgdHJlZSBvYmplY3QncyBsZWF2ZXNcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHRyZWUgb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIG9iamVjdHNcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyIG9iamVjdHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyZWVMZWFmTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiMyMjg4MjJcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAtMixcbiAgICAgICAgICAgIGNlbGxZOiAtNCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggKiAyLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IC0xMCxcbiAgICAgICAgICAgIHdpZHRoOiA0LFxuICAgICAgICAgICAgaGVpZ2h0OiA3LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sXSxcbiAgICB9O1xufVxuIiwidmFyIHdhbGxIb3JpeldpZHRoID0gMjA7XG52YXIgd2FsbEhvcml6SGVpZ2h0ID0gMTI7XG52YXIgd2FsbEhvcml6SGl0Ym94V2lkdGggPSAyMDtcbnZhciB3YWxsSG9yaXpIaXRib3hIZWlnaHQgPSAyO1xudmFyIHdhbGxIb3JpekhlYWx0aCA9IDI1MDtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuVGVycmFpbi5XQUxMX0hPUklaLFxuICAgICAgICB3aWR0aDogd2FsbEhvcml6V2lkdGgsXG4gICAgICAgIGhlaWdodDogd2FsbEhvcml6SGVpZ2h0LFxuICAgICAgICBoaXRib3hUeXBlOiB0eXBlcy5IaXRib3hUeXBlcy5SRUNULFxuICAgICAgICBoaXRib3hXaWR0aDogd2FsbEhvcml6SGl0Ym94V2lkdGgsXG4gICAgICAgIGhpdGJveEhlaWdodDogd2FsbEhvcml6SGl0Ym94SGVpZ2h0LFxuICAgICAgICBoZWFsdGg6IHdhbGxIb3JpekhlYWx0aCxcbiAgICAgICAgbWF4SGVhbHRoOiB3YWxsSG9yaXpIZWFsdGgsXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBob3Jpem9udGFsIHdhbGwgb2JqZWN0IGJhc2VcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGhvcml6b250YWwgd2FsbCBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gd2FsbEhvcml6QmFzZU1hc3RlclBpZWNlKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlcik6IG1hc3RlclBpZWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBwYWxldHRlOiBbXCIjODg4ODg4XCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC5oaXRib3hXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGl0Ym94SGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC5oaXRib3hXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogb2JqZWN0LmhpdGJveEhlaWdodCxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9XVxuICAgIH1cbn1cblxuLy8gVE9ETzogQWRkIG1vcmUgZGV0YWlsIHRvIHdhbGwgKGNvYmJsZXN0b25lIHN0eWxlKSwgY2hhbmdlIGNvbG9yaW5nIGRlcGVuZGluZyBvbiBvYmplY3QgaGVhbHRoXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGhvcml6b250YWwgd2FsbCBvYmplY3QgY292ZXJcbiAqIEBwYXJhbSBvYmplY3QgVGhlIGhvcml6b250YWwgd2FsbCBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gd2FsbEhvcml6Q292ZXJNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI0EzQTNDMkJCXCJdLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAtb2JqZWN0LmhlaWdodCAvIDIsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH1dXG4gICAgfVxufVxuIiwiZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1kpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHV0aWxzID0gcmVxdWlyZShcIi4uL1ByZWZhYlV0aWxzXCIpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogdHlwZXMuT2JqZWN0VHlwZXMuVEVSUkFJTixcbiAgICAgICAgeDogcG9zWCxcbiAgICAgICAgeTogcG9zWSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7IH0sXG4gICAgICAgIGRlYXRocmF0dGxlOiAob2JzLCBzZWxmSWQpID0+IHtcbiAgICAgICAgICAgIGlmIChvYnNbc2VsZklkXSkgZGVsZXRlIG9ic1tzZWxmSWRdO1xuICAgICAgICB9LFxuICAgICAgICBkYW1hZ2U6IHV0aWxzLmRhbWFnZSxcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZW5lcmF0ZU5ldzogZ2VuZXJhdGVOZXcsXG59XG4iLCJpbXBvcnQgeyBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuLi8uLi9zcmMvUG9wb3ZhL1BvcG92YVwiO1xuXG4vKipcbiAqIEdldCBtYXN0ZXIgcGllY2UgZm9yIGRlZmF1bHQgdGVycmFpbiBvYmplY3RcbiAqIEBwYXJhbSBvYmplY3QgVGhlIHRlcnJhaW4gb2JqZWN0XG4gKiBAcGFyYW0gcmVuZGVyT2Zmc2V0WCBIb3Jpem9udGFsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRZIFZlcnRpY2FsIG9mZnNldCBmb3IgcmVuZGVyaW5nIHRoZSBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRUZXJyYWluTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTptYXN0ZXJQaWVjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiI0ZGQjNGRlwiXSxcbiAgICAgICAgcG9zWDogb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLFxuICAgICAgICBwb3NZOiBvYmplY3QueSAtIHJlbmRlck9mZnNldFksXG4gICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgIGhlaWdodDogb2JqZWN0LmhlaWdodCxcbiAgICAgICAgZmFjaW5nOiBvYmplY3QuZmFjaW5nLFxuICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfV1cbiAgICB9XG59XG4iLCJ2YXIgc3Bpa2VUcmFwV2lkdGggPSA1O1xudmFyIHNwaWtlVHJhcEhlaWdodCA9IDU7XG52YXIgc3Bpa2VUcmFwSGl0Ym94V2lkdGggPSA1O1xudmFyIHNwaWtlVHJhcEhpdGJveEhlaWdodCA9IDU7XG52YXIgc3Bpa2VUcmFwRGFtYWdlID0gMjA7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZLCBiYXNlKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBwcmVmYWJzID0gcmVxdWlyZShcIi4uL1ByZWZhYnNcIik7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uYmFzZSxcbiAgICAgICAgc3VidHlwZTogdHlwZXMuVHJpZ2dlci5TUElLRV9UUkFQLFxuICAgICAgICB3aWR0aDogc3Bpa2VUcmFwV2lkdGgsXG4gICAgICAgIGhlaWdodDogc3Bpa2VUcmFwSGVpZ2h0LFxuICAgICAgICBoaXRib3hUeXBlOiB0eXBlcy5IaXRib3hUeXBlcy5SRUNULFxuICAgICAgICBoaXRib3hXaWR0aDogc3Bpa2VUcmFwSGl0Ym94V2lkdGgsXG4gICAgICAgIGhpdGJveEhlaWdodDogc3Bpa2VUcmFwSGl0Ym94SGVpZ2h0LFxuICAgICAgICBvblRyaWdnZXI6IChvYnMsIHNlbGZSZWYsIHRyaWdnZXJJZCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9ic1t0cmlnZ2VySWRdICYmIChcbiAgICAgICAgICAgICAgICBvYnNbdHJpZ2dlcklkXS50eXBlID09IHR5cGVzLk9iamVjdFR5cGVzLlBMQVlFUiB8fFxuICAgICAgICAgICAgICAgIG9ic1t0cmlnZ2VySWRdLnR5cGUgPT0gdHlwZXMuT2JqZWN0VHlwZXMuVkVISUNMRVxuICAgICAgICAgICAgKSkge1xuICAgICAgICAgICAgICAgIGlmIChvYnNbdHJpZ2dlcklkXS5kYW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzW3RyaWdnZXJJZF0uZGFtYWdlKG9icywgdHJpZ2dlcklkLCBzcGlrZVRyYXBEYW1hZ2UsIHR5cGVzLkRhbWFnZVR5cGVzLk5PUk1BTCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbc2VsZlJlZl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UgfSBmcm9tIFwiLi4vLi4vc3JjL1BvcG92YS9Qb3BvdmFcIjtcblxuLyoqXG4gKiBHZXQgbWFzdGVyIHBpZWNlIGZvciBzcGlrZSB0cmFwIG9iamVjdFxuICogQHBhcmFtIG9iamVjdCBUaGUgc3Bpa2UgdHJhcCBvYmplY3RcbiAqIEBwYXJhbSByZW5kZXJPZmZzZXRYIEhvcml6b250YWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICogQHBhcmFtIHJlbmRlck9mZnNldFkgVmVydGljYWwgb2Zmc2V0IGZvciByZW5kZXJpbmcgdGhlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3Bpa2VUcmFwTWFzdGVyUGllY2Uob2JqZWN0OiBhbnksIHJlbmRlck9mZnNldFg6IG51bWJlciwgcmVuZGVyT2Zmc2V0WTogbnVtYmVyKTogbWFzdGVyUGllY2Uge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhbGV0dGU6IFtcIiM4MDgwODBcIl0sXG4gICAgICAgIHBvc1g6IG9iamVjdC54IC0gcmVuZGVyT2Zmc2V0WCxcbiAgICAgICAgcG9zWTogb2JqZWN0LnkgLSByZW5kZXJPZmZzZXRZLFxuICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9iamVjdC5oZWlnaHQsXG4gICAgICAgIGZhY2luZzogb2JqZWN0LmZhY2luZyxcbiAgICAgICAgc3Ryb2tlczogW3tcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMyxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDAsXG4gICAgICAgICAgICBjZWxsWTogMyxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAyLFxuICAgICAgICAgICAgY2VsbFk6IDMsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMixcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogNCxcbiAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSxdXG4gICAgfTtcbn1cbiIsImZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uLy4uL0NvbGxpc2lvbnNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHR5cGVzLk9iamVjdFR5cGVzLlRSSUdHRVIsXG4gICAgICAgIHg6IHBvc1gsXG4gICAgICAgIHk6IHBvc1ksXG4gICAgICAgIHVwZGF0ZTogKG9icywgc2VsZklkLCBkZWx0YSkgPT4ge1xuICAgICAgICAgICAgY29sbGlzaW9ucy5jaGVja0NvbGxpc2lvbnMoc2VsZklkLCBvYnMsIHByZWZhYnMucmVuZGVyU2l6ZSwgKHNyY0lkLCBjb2xsaXNpb25JZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChvYnNbc3JjSWRdICYmIGNvbGxpc2lvbklkICE9IHNyY0lkKXtcbiAgICAgICAgICAgICAgICAgICAgb2JzW3NyY0lkXS5vblRyaWdnZXIob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsInZhciBjYXJTcGVlZCA9IDAuMzU7XG52YXIgY2FyV2lkdGggPSAxMDtcbnZhciBjYXJIZWlnaHQgPSAxNjtcbnZhciBjYXJIaXRib3hXaWR0aCA9IDEwO1xudmFyIGNhckhpdGJveEhlaWdodCA9IDE2O1xudmFyIGNhckhlYWx0aCA9IDIwMDtcbnZhciBjYXJWaWV3UmFuZ2UgPSAxIC8gMztcbnZhciBjYXJDb2xvcnMgPSBbXG4gICAgXCIjREMxNDNDXCIsICAgICAgLy8gQ3JpbXNvblxuICAgIFwiIzAwNjQwMFwiLCAgICAgIC8vIERhcmsgR3JlZW5cbiAgICBcIiNGRjY5QjRcIiwgICAgICAvLyBIb3QgUGlua1xuICAgIFwiI0ZGRDcwMFwiLCAgICAgIC8vIEdvbGRcbiAgICBcIiM3MDgwOTBcIiwgICAgICAvLyBTbGF0ZSBHcmF5XG4gICAgXCIjMDBCRkZGXCIsICAgICAgLy8gRGVlcCBTa3kgQmx1ZVxuICAgIFwiIzAwMDBDRFwiLCAgICAgIC8vIE1lZGl1bSBCbHVlXG4gICAgXCIjRkY0NTAwXCIsICAgICAgLy8gT3JhbmdlIFJlZFxuICAgIFwiIzhCMDA4QlwiLCAgICAgIC8vIERhcmsgTWFnZW50YVxuXTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXcob2JzLCBzcmMsIHBvc1gsIHBvc1ksIGJhc2UpIHtcbiAgICB2YXIgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vT2JqZWN0VHlwZXNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICB2YXIgY2FyQ29sb3IgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoY2FyQ29sb3JzLmxlbmd0aCkpO1xuICAgIHZhciB2ZWhpY2xlSWQgPSBzcmMgKyBcIjpcIiArIHR5cGVzLk9iamVjdFR5cGVzLlZFSElDTEUgKyBcIjpcIiArIHR5cGVzLlZlaGljbGUuQ0FSICsgXCI6XCIgKyBwb3NYICsgXCI6XCIgKyBwb3NZO1xuICAgIFxuICAgIHByZWZhYnMuZ2VuZXJhdGVOZXcob2JzLCB2ZWhpY2xlSWQsIHBvc1gsIHBvc1ksIHR5cGVzLk9iamVjdFR5cGVzLklOVEVSQUNUQUJMRSwgdHlwZXMuSW50ZXJhY3RhYmxlLkNBUl9FTlRFUik7XG5cbiAgICBvYnNbdmVoaWNsZUlkXSA9ICB7XG4gICAgICAgIC4uLmJhc2UsXG4gICAgICAgIHN1YnR5cGU6IHR5cGVzLlZlaGljbGUuQ0FSLFxuICAgICAgICBzcGVlZDogY2FyU3BlZWQsXG4gICAgICAgIHdpZHRoOiBjYXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjYXJIZWlnaHQsXG4gICAgICAgIGhpdGJveFR5cGU6IHR5cGVzLkhpdGJveFR5cGVzLlJFQ1QsXG4gICAgICAgIGhpdGJveFdpZHRoOiBjYXJIaXRib3hXaWR0aCxcbiAgICAgICAgaGl0Ym94SGVpZ2h0OiBjYXJIaXRib3hIZWlnaHQsXG4gICAgICAgIGhlYWx0aDogY2FySGVhbHRoLFxuICAgICAgICBtYXhIZWFsdGg6IGNhckhlYWx0aCxcbiAgICAgICAgY2FyQ29sb3I6IGNhckNvbG9yc1tjYXJDb2xvcl0sXG4gICAgICAgIHZpZXdSYW5nZTogY2FyVmlld1JhbmdlLFxuICAgICAgICBpbnRlcmFjdGFibGVJZDogdmVoaWNsZUlkICsgXCI6XCIgKyB0eXBlcy5PYmplY3RUeXBlcy5JTlRFUkFDVEFCTEUgKyBcIjpcIiArIHR5cGVzLkludGVyYWN0YWJsZS5DQVJfRU5URVIsXG4gICAgfTtcbiAgICByZXR1cm47XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdlbmVyYXRlTmV3OiBnZW5lcmF0ZU5ldyxcbn1cbiIsImltcG9ydCB7IG1hc3RlclBpZWNlIH0gZnJvbSBcIi4uLy4uL3NyYy9Qb3BvdmEvUG9wb3ZhXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXJNYXN0ZXJQaWVjZShvYmplY3Q6IGFueSwgcmVuZGVyT2Zmc2V0WDogbnVtYmVyLCByZW5kZXJPZmZzZXRZOiBudW1iZXIpOiBtYXN0ZXJQaWVjZSB7XG4gICAgdmFyIGhpZ2hsaWdodFI6IG51bWJlciA9IHBhcnNlSW50KFwiMHhcIiArIG9iamVjdC5jYXJDb2xvci5zdWJzdHJpbmcoMSwgMyksIDE2KSArIDB4MzM7XG4gICAgdmFyIGhpZ2hsaWdodEc6IG51bWJlciA9IHBhcnNlSW50KFwiMHhcIiArIG9iamVjdC5jYXJDb2xvci5zdWJzdHJpbmcoMywgNSksIDE2KSArIDB4MzM7XG4gICAgdmFyIGhpZ2hsaWdodEI6IG51bWJlciA9IHBhcnNlSW50KFwiMHhcIiArIG9iamVjdC5jYXJDb2xvci5zdWJzdHJpbmcoNSwgNyksIDE2KSArIDB4MzM7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFsZXR0ZTogW1wiIzMzMzMzM1wiXVxuICAgICAgICAgICAgLmNvbmNhdChvYmplY3QuY2FyQ29sb3IpXG4gICAgICAgICAgICAuY29uY2F0KFwiI1wiICtcbiAgICAgICAgICAgICAgICAoaGlnaGxpZ2h0UiA+IDB4RkYgPyAweEZGIDogaGlnaGxpZ2h0UikudG9TdHJpbmcoMTYpICtcbiAgICAgICAgICAgICAgICAoaGlnaGxpZ2h0RyA+IDB4RkYgPyAweEZGIDogaGlnaGxpZ2h0RykudG9TdHJpbmcoMTYpICtcbiAgICAgICAgICAgICAgICAoaGlnaGxpZ2h0QiA+IDB4RkYgPyAweEZGIDogaGlnaGxpZ2h0QikudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICApLFxuICAgICAgICBwb3NYOiBvYmplY3QueCAtIHJlbmRlck9mZnNldFgsXG4gICAgICAgIHBvc1k6IG9iamVjdC55IC0gcmVuZGVyT2Zmc2V0WSxcbiAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvYmplY3QuaGVpZ2h0LFxuICAgICAgICBmYWNpbmc6IG9iamVjdC5mYWNpbmcsXG4gICAgICAgIHN0cm9rZXM6IFt7XG4gICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgIGNlbGxZOiAxLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogNSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDUsXG4gICAgICAgICAgICBzd2F0Y2g6IDFcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDEsXG4gICAgICAgICAgICBjZWxsWTogNCxcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggLSAyLFxuICAgICAgICAgICAgaGVpZ2h0OiA2LFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAwLFxuICAgICAgICAgICAgY2VsbFk6IDksXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiA2LFxuICAgICAgICAgICAgc3dhdGNoOiAxXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDksXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoIC0gMixcbiAgICAgICAgICAgIGhlaWdodDogNyxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgIGNlbGxZOiAzLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogMixcbiAgICAgICAgICAgIHdpZHRoOiBvYmplY3Qud2lkdGggLSA0LFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNlbGxYOiAxLFxuICAgICAgICAgICAgY2VsbFk6IDEwLFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDIsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IDIsXG4gICAgICAgICAgICBjZWxsWTogMTAsXG4gICAgICAgICAgICB3aWR0aDogb2JqZWN0LndpZHRoIC0gNCxcbiAgICAgICAgICAgIGhlaWdodDogNCxcbiAgICAgICAgICAgIHN3YXRjaDogMFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogMyxcbiAgICAgICAgICAgIGNlbGxZOiA2LFxuICAgICAgICAgICAgd2lkdGg6IG9iamVjdC53aWR0aCAtIDYsXG4gICAgICAgICAgICBoZWlnaHQ6IDMsXG4gICAgICAgICAgICBzd2F0Y2g6IDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2VsbFg6IC0xLFxuICAgICAgICAgICAgY2VsbFk6IDYsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjZWxsWDogb2JqZWN0LndpZHRoLFxuICAgICAgICAgICAgY2VsbFk6IDYsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIHN3YXRjaDogMVxuICAgICAgICB9LF1cbiAgICB9O1xufVxuIiwidmFyIGRlZmF1bHRWZWhpY2xlVmlld1JhbmdlID0gMSAvIDQ7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV3KG9icywgc3JjLCBwb3NYLCBwb3NZKSB7XG4gICAgdmFyIHR5cGVzID0gcmVxdWlyZShcIi4uLy4uL09iamVjdFR5cGVzXCIpO1xuICAgIHZhciBjb2xsaXNpb25zID0gcmVxdWlyZShcIi4uLy4uL0NvbGxpc2lvbnNcIik7XG4gICAgdmFyIHByZWZhYnMgPSByZXF1aXJlKFwiLi4vUHJlZmFic1wiKTtcbiAgICB2YXIgdXRpbHMgPSByZXF1aXJlKFwiLi4vUHJlZmFiVXRpbHNcIik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFLFxuICAgICAgICB4OiBwb3NYLFxuICAgICAgICB5OiBwb3NZLFxuICAgICAgICB2ZWxvY2l0eVg6IDAsXG4gICAgICAgIHZlbG9jaXR5WTogMCxcbiAgICAgICAgZmFjaW5nOiAwLFxuICAgICAgICBjdXJyZW50RXF1aXBtZW50OiB1bmRlZmluZWQsXG4gICAgICAgIGVxdWlwbWVudDogWyBdLFxuICAgICAgICB2aWV3UmFuZ2U6IGRlZmF1bHRWZWhpY2xlVmlld1JhbmdlLFxuICAgICAgICByaWRlcjogdW5kZWZpbmVkLFxuICAgICAgICBkZWF0aHJhdHRsZTogKG9icywgc2VsZklkKSA9PiB7XG4gICAgICAgICAgICBpZiAob2JzW3NlbGZJZF0ucmlkZXIpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JzW29ic1tzZWxmSWRdLmludGVyYWN0YWJsZUlkXTtcbiAgICAgICAgICAgICAgICB2YXIgcmlkZXIgPSBvYnNbc2VsZklkXS5yaWRlcjtcblxuICAgICAgICAgICAgICAgIC8vIFJlc2V0IHZlbG9jaXRpZXMgYW5kIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgcmlkZXIudmVsb2NpdHlYID0gMDtcbiAgICAgICAgICAgICAgICByaWRlci52ZWxvY2l0eVkgPSAwO1xuICAgICAgICAgICAgICAgIHJpZGVyLnggPSBvYnNbc2VsZklkXS54O1xuICAgICAgICAgICAgICAgIHJpZGVyLnkgPSBvYnNbc2VsZklkXS55O1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlIG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdID0gcmlkZXI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbb2JzW3NlbGZJZF0uaW50ZXJhY3RhYmxlSWRdO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbc2VsZklkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlOiAob2JzLCBzZWxmSWQsIGRlbHRhKSA9PiB7XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgY2FyIG1vdmVtZW50XG4gICAgICAgICAgICBvYnNbc2VsZklkXS54ICs9IG9ic1tzZWxmSWRdLnZlbG9jaXR5WCAqIGRlbHRhO1xuICAgICAgICAgICAgb2JzW3NlbGZJZF0ueSArPSBvYnNbc2VsZklkXS52ZWxvY2l0eVkgKiBkZWx0YTtcblxuICAgICAgICAgICAgaWYgKG9ic1tvYnNbc2VsZklkXS5pbnRlcmFjdGFibGVJZF0pIHtcbiAgICAgICAgICAgICAgICBvYnNbb2JzW3NlbGZJZF0uaW50ZXJhY3RhYmxlSWRdLnggPSBvYnNbc2VsZklkXS54O1xuICAgICAgICAgICAgICAgIG9ic1tvYnNbc2VsZklkXS5pbnRlcmFjdGFibGVJZF0ueSA9IG9ic1tzZWxmSWRdLnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGNvbGxpc2lvbnMgd2l0aCB0ZXJyYWluIGFuZCByZXBvc2l0aW9uIGFjY29yZGluZ2x5XG4gICAgICAgICAgICBjb2xsaXNpb25zLmNoZWNrQ29sbGlzaW9ucyhzZWxmSWQsIG9icywgcHJlZmFicy5yZW5kZXJTaXplLCAoc3JjSWQsIGNvbGxpc2lvbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG9ic1tzcmNJZF0gJiYgY29sbGlzaW9uSWQgIT0gc3JjSWQpe1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9ic1tjb2xsaXNpb25JZF0udHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5URVJSQUlOOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5WRUhJQ0xFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpc2lvbnMucHVzaEJhY2sob2JzLCBzcmNJZCwgY29sbGlzaW9uSWQsIHByZWZhYnMucmVuZGVyU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbW91c2VEb3duOiAob2JzLCBtb3VzZUV2ZW50KSA9PiB7IH0sXG4gICAgICAgIG9uUGxheWVySW5wdXQ6IChvYnMsIHNlbGZJZCwgcGxheWVySW5wdXQpID0+IHtcbiAgICAgICAgICAgIHBsYXllciA9IG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgdmFyIHhEaXIgPSAwO1xuICAgICAgICAgICAgdmFyIHlEaXIgPSAwO1xuXG4gICAgICAgICAgICBpZiAocGxheWVySW5wdXQubGVmdCkge1xuICAgICAgICAgICAgICAgIHhEaXIgLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5yaWdodCkge1xuICAgICAgICAgICAgICAgIHhEaXIgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC51cCkge1xuICAgICAgICAgICAgICAgIHlEaXIgLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwbGF5ZXJJbnB1dC5kb3duKSB7XG4gICAgICAgICAgICAgICAgeURpciArPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGF5ZXIudmVsb2NpdHlYID0geERpciAqIHBsYXllci5zcGVlZDtcbiAgICAgICAgICAgIHBsYXllci52ZWxvY2l0eVkgPSB5RGlyICogcGxheWVyLnNwZWVkO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoeERpciAhPSAwIHx8IHlEaXIgIT0gMCkge1xuICAgICAgICAgICAgICAgIHBsYXllci5mYWNpbmcgPSAoTWF0aC5hdGFuKHBsYXllci52ZWxvY2l0eVkgLyBwbGF5ZXIudmVsb2NpdHlYKSAqIDU3LjI5NTggKyA5MCkgKyh4RGlyIDwgMCA/IDE4MCA6IDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoeERpciAhPSAwKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyLmhpdGJveFdpZHRoID0gb2JzW3NlbGZJZF0uaGVpZ2h0O1xuICAgICAgICAgICAgICAgIHBsYXllci5oaXRib3hIZWlnaHQgPSBvYnNbc2VsZklkXS53aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh5RGlyICE9IDApIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuaGl0Ym94V2lkdGggPSBvYnNbc2VsZklkXS53aWR0aDtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuaGl0Ym94SGVpZ2h0ID0gb2JzW3NlbGZJZF0uaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocGxheWVySW5wdXQucGlja3VwKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZlY2hpY2xlSWQgPSBzZWxmSWQgKyBcIjpcIiArIG9ic1tzZWxmSWRdLnR5cGUgKyBcIjpcIiArIG9ic1tzZWxmSWRdLnN1YnR5cGUgKyBcIjpcIiArIG9ic1tzZWxmSWRdLnggKyBcIjpcIiArIG9ic1tzZWxmSWRdLnk7XG4gICAgICAgICAgICAgICAgb2JzW29ic1tzZWxmSWRdLmludGVyYWN0YWJsZUlkXS52ZWhpY2xlSWQgPSBuZXdWZWNoaWNsZUlkO1xuICAgICAgICAgICAgICAgIG9ic1tuZXdWZWNoaWNsZUlkXSA9IG9ic1tzZWxmSWRdO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYnNbc2VsZklkXTtcbiAgICAgICAgICAgICAgICBvYnNbc2VsZklkXSA9IG9ic1tuZXdWZWNoaWNsZUlkXS5yaWRlcjtcbiAgICAgICAgICAgICAgICBvYnNbbmV3VmVjaGljbGVJZF0ucmlkZXIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXNldCB2ZWxvY2l0aWVzIGFuZCBwb3NpdGlvblxuICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLnZlbG9jaXR5WCA9IDA7XG4gICAgICAgICAgICAgICAgb2JzW3NlbGZJZF0udmVsb2NpdHlZID0gMDtcbiAgICAgICAgICAgICAgICBvYnNbbmV3VmVjaGljbGVJZF0udmVsb2NpdHlYID0gMDtcbiAgICAgICAgICAgICAgICBvYnNbbmV3VmVjaGljbGVJZF0udmVsb2NpdHlZID0gMDtcbiAgICAgICAgICAgICAgICBvYnNbc2VsZklkXS54ID0gb2JzW25ld1ZlY2hpY2xlSWRdLnggKyBvYnNbbmV3VmVjaGljbGVJZF0ud2lkdGggLyAyICsgb2JzW3NlbGZJZF0ud2lkdGggLyAyO1xuICAgICAgICAgICAgICAgIG9ic1tzZWxmSWRdLnkgPSBvYnNbbmV3VmVjaGljbGVJZF0ueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGFtYWdlOiB1dGlscy5kYW1hZ2UsXG4gICAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVOZXc6IGdlbmVyYXRlTmV3LFxufVxuIiwiaW1wb3J0IHsgbWFzdGVyUGllY2UsIFBvcG92YSB9IGZyb20gXCIuLi9Qb3BvdmEvUG9wb3ZhXCI7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vLi4vT2JqZWN0VHlwZXNcIjtcblxuaW1wb3J0IHsgY2hlY2tTdGF0dXNFZmZlY3QgfSBmcm9tIFwiLi4vLi4vUHJlZmFicy9QbGF5ZXIvX1BsYXllclwiO1xuaW1wb3J0ICogYXMgcGxheWVyIGZyb20gXCIuLi8uLi9QcmVmYWJzL1BsYXllci9fUGxheWVyLnRlbXBsYXRlXCI7XG5pbXBvcnQgKiBhcyBnb2QgZnJvbSBcIi4uLy4uL1ByZWZhYnMvUGxheWVyL0dvZC50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgZmlyZW1hZ2UgZnJvbSBcIi4uLy4uL1ByZWZhYnMvUGxheWVyL0ZpcmVNYWdlLnRlbXBsYXRlXCI7XG5pbXBvcnQgKiBhcyBoZWFsdGhiYXIgZnJvbSBcIi4uLy4uL1ByZWZhYnMvUGxheWVyL0hlYWx0aEJhci50ZW1wbGF0ZVwiO1xuXG5pbXBvcnQgKiBhcyBzdHVubmVkU3RhdHVzRWZmZWN0IGZyb20gXCIuLi8uLi9QcmVmYWJzL1BsYXllci9TdGF0dXNFZmZlY3RzL1N0dW5uZWQudGVtcGxhdGVcIjtcbmltcG9ydCAqIGFzIGludnVsbmVhcmFibGVTdGF0dXNFZmZlY3QgZnJvbSBcIi4uLy4uL1ByZWZhYnMvUGxheWVyL1N0YXR1c0VmZmVjdHMvSW52dWxuZXJhYmxlLnRlbXBsYXRlXCI7XG5cbmltcG9ydCAqIGFzIHByb2plY3RpbGUgZnJvbSBcIi4uLy4uL1ByZWZhYnMvUHJvamVjdGlsZS9fUHJvamVjdGlsZS50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgZmlyZWJvbHQgZnJvbSBcIi4uLy4uL1ByZWZhYnMvUHJvamVjdGlsZS9GaXJlYm9sdFByb2plY3RpbGUudGVtcGxhdGVcIjtcbmltcG9ydCAqIGFzIGZsYW1lUGlsbGFyIGZyb20gXCIuLi8uLi9QcmVmYWJzL1Byb2plY3RpbGUvRmxhbWVQaWxsYXJQcm9qZWN0aWxlLnRlbXBsYXRlXCI7XG5pbXBvcnQgKiBhcyBmbGFtZURhc2ggZnJvbSBcIi4uLy4uL1ByZWZhYnMvUHJvamVjdGlsZS9GbGFtZURhc2hQcm9qZWN0aWxlLnRlbXBsYXRlXCI7XG5cbmltcG9ydCAqIGFzIGdyYXZlc3RvbmUgZnJvbSBcIi4uLy4uL1ByZWZhYnMvR3JhdmVzdG9uZS9fR3JhdmVzdG9uZS50ZW1wbGF0ZVwiO1xuXG5pbXBvcnQgKiBhcyBfdGVycmFpbiBmcm9tIFwiLi4vLi4vUHJlZmFicy9UZXJyYWluL19UZXJyYWluLnRlbXBsYXRlXCI7XG5pbXBvcnQgKiBhcyB0cmVlIGZyb20gXCIuLi8uLi9QcmVmYWJzL1RlcnJhaW4vVHJlZS50ZW1wbGF0ZVwiO1xuaW1wb3J0ICogYXMgd2FsbEhvcml6IGZyb20gXCIuLi8uLi9QcmVmYWJzL1RlcnJhaW4vV2FsbEhvcml6LnRlbXBsYXRlXCI7XG5cbmltcG9ydCAqIGFzIGhlYWx0aFBpY2t1cCBmcm9tIFwiLi4vLi4vUHJlZmFicy9JbnRlcmFjdGFibGUvSGVhbHRoUGlja3VwLnRlbXBsYXRlXCI7XG5pbXBvcnQgKiBhcyBwbGF5ZXJUeXBlQ2hhbmdlciBmcm9tIFwiLi4vLi4vUHJlZmFicy9JbnRlcmFjdGFibGUvUGxheWVyVHlwZUNoYW5nZXIudGVtcGxhdGVcIjtcblxuaW1wb3J0ICogYXMgc3Bpa2VUcmFwIGZyb20gXCIuLi8uLi9QcmVmYWJzL1RyaWdnZXIvU3Bpa2VUcmFwLnRlbXBsYXRlXCI7XG5cbmltcG9ydCAqIGFzIGNhciBmcm9tIFwiLi4vLi4vUHJlZmFicy9WZWhpY2xlL0Nhci50ZW1wbGF0ZVwiO1xuXG5pbXBvcnQgKiBhcyBiaW5vY3VsYXJzSWNvbiBmcm9tIFwiLi4vLi4vUHJlZmFicy9FcXVpcG1lbnQvQmlub2N1bGFycy5pY29uXCI7XG5pbXBvcnQgKiBhcyBibGFzdGVySWNvbiBmcm9tIFwiLi4vLi4vUHJlZmFicy9FcXVpcG1lbnQvQmxhc3Rlci5pY29uXCI7XG5pbXBvcnQgKiBhcyBidWlsZGVySWNvbiBmcm9tIFwiLi4vLi4vUHJlZmFicy9FcXVpcG1lbnQvQnVpbGRlci5pY29uXCI7XG5pbXBvcnQgKiBhcyBzY2FubmVySWNvbiBmcm9tIFwiLi4vLi4vUHJlZmFicy9FcXVpcG1lbnQvU2Nhbm5lci5pY29uXCI7XG5cbmltcG9ydCAqIGFzIF9lbmVteSBmcm9tIFwiLi4vLi4vUHJlZmFicy9FbmVteS9fRW5lbXkudGVtcGxhdGVcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlck9iamVjdHMoXG4gICAgb2JqZWN0czogYW55LFxuICAgIHJlbmRlck9mZnNldFg6IG51bWJlcixcbiAgICByZW5kZXJPZmZzZXRZOiBudW1iZXIsXG4gICAgcmVuZGVyU2l6ZTogbnVtYmVyLFxuICAgIGJhY2tncm91bmQ6IFBvcG92YSxcbiAgICBlbnY6IFBvcG92YSxcbiAgICBmb3JlZ3JvdW5kOiBQb3BvdmEsXG4gICAgY292ZXI6IFBvcG92YSxcbiAgICB1aTogUG9wb3ZhLFxuKSB7XG4gICAgZm9yICh2YXIgaWQgaW4gb2JqZWN0cykge1xuICAgICAgICB2YXIgb2JqZWN0ID0gb2JqZWN0c1tpZF07XG5cbiAgICAgICAgc3dpdGNoIChvYmplY3QudHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QTEFZRVI6XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvYmplY3Quc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlBsYXllci5IVU1BTjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVncm91bmQuZHJhdyhwbGF5ZXIucGxheWVyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5QbGF5ZXIuR09EOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWdyb3VuZC5kcmF3KGdvZC5nb2RQbGF5ZXJNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlBsYXllci5GSVJFX01BR0U6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kLmRyYXcoZmlyZW1hZ2UuZmlyZW1hZ2VQbGF5ZXJNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkcmF3U3RhdHVzRWZmZWN0cyhvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFksIHJlbmRlclNpemUsIGNvdmVyKTtcbiAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kLmRyYXcoaGVhbHRoYmFyLmhlYWx0aEJhck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSwgcmVuZGVyU2l6ZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5QUk9KRUNUSUxFOlxuICAgICAgICAgICAgICAgIHN3aXRjaCAob2JqZWN0LnN1YnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0eXBlcy5Qcm9qZWN0aWxlLkJBU0lDX1BST0pFQ1RJTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhwcm9qZWN0aWxlLnByb2plY3RpbGVNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlByb2plY3RpbGUuRklSRUJPTFRfUFJPSkVDVElMRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KGZpcmVib2x0LmZpcmVib2x0UHJvamVjdGlsZU1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUHJvamVjdGlsZS5GTEFNRV9QSUxMQVJfUFJPSkVDVElMRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KGZsYW1lUGlsbGFyLmZsYW1lUGlsbGFyUHJvamVjdGlsZU1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuUHJvamVjdGlsZS5GTEFNRV9EQVNIX1BST0pFQ1RJTEU6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhmbGFtZURhc2guZmxhbWVEYXNoUHJvamVjdGlsZU1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuR1JBVkVTVE9ORTpcbiAgICAgICAgICAgICAgICBlbnYuZHJhdyhncmF2ZXN0b25lLmdyYXZlU3RvbmVNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICBlbnYuZHJhdyhoZWFsdGhiYXIuaGVhbHRoQmFyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZLCByZW5kZXJTaXplKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRFUlJBSU46XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvYmplY3Quc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRlcnJhaW4uVFJFRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KHRyZWUudHJlZVRydW5rTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3Zlci5kcmF3KHRyZWUudHJlZUxlYWZNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRlcnJhaW4uV0FMTF9IT1JJWjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KHdhbGxIb3Jpei53YWxsSG9yaXpCYXNlTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3Zlci5kcmF3KHdhbGxIb3Jpei53YWxsSG9yaXpDb3Zlck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5JTlRFUkFDVEFCTEU6XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvYmplY3Quc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLkludGVyYWN0YWJsZS5IRUFMVEhfUElDS1VQOlxuICAgICAgICAgICAgICAgICAgICAgICAgZW52LmRyYXcoaGVhbHRoUGlja3VwLmhlYWx0aFBpY2t1cE1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuSW50ZXJhY3RhYmxlLlBMQVlFUl9UWVBFX0NIQU5HRVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnYuZHJhdyhwbGF5ZXJUeXBlQ2hhbmdlci5wbGF5ZXJUeXBlQ2hhbmdlck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW52LmRyYXcocGxheWVyVHlwZUNoYW5nZXIubGl0dGxlTWFuTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLk9iamVjdFR5cGVzLlRSSUdHRVI6XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvYmplY3Quc3VidHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHR5cGVzLlRyaWdnZXIuU1BJS0VfVFJBUDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudi5kcmF3KHNwaWtlVHJhcC5zcGlrZVRyYXBNYXN0ZXJQaWVjZShvYmplY3QsIHJlbmRlck9mZnNldFgsIHJlbmRlck9mZnNldFkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuT2JqZWN0VHlwZXMuVkVISUNMRTpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuVmVoaWNsZS5DQVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kLmRyYXcoY2FyLmNhck1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5DT01CQVRfVEVYVDpcbiAgICAgICAgICAgICAgICB1aS5kcmF3VGV4dChvYmplY3QudGV4dCwgb2JqZWN0LnggLSByZW5kZXJPZmZzZXRYLCBvYmplY3QueSAtIHJlbmRlck9mZnNldFksIG9iamVjdC5zaXplLCBvYmplY3QuY29sb3IsIG9iamVjdC5mYWNpbmcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5PYmplY3RUeXBlcy5FTkVNWTpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamVjdC5zdWJ0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdHlwZXMuRW5lbXkuVEFSR0VUX0RVTU1ZOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWdyb3VuZC5kcmF3KF9lbmVteS5lbmVteU1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvcmVncm91bmQuZHJhdyhoZWFsdGhiYXIuaGVhbHRoQmFyTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZLCByZW5kZXJTaXplKSk7XG4gICAgICAgICAgICAgICAgZHJhd1N0YXR1c0VmZmVjdHMob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZLCByZW5kZXJTaXplLCBjb3Zlcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGVudi5kcmF3KF90ZXJyYWluLmRlZmF1bHRUZXJyYWluTWFzdGVyUGllY2Uob2JqZWN0LCByZW5kZXJPZmZzZXRYLCByZW5kZXJPZmZzZXRZKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJDdXJyZW50RXF1aXBtZW50KHBsYXllcjogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlciwgdWk6IFBvcG92YSkge1xuICAgIGlmIChwbGF5ZXIgJiYgcGxheWVyLmN1cnJlbnRFcXVpcG1lbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN3aXRjaCAocGxheWVyLmVxdWlwbWVudFtwbGF5ZXIuY3VycmVudEVxdWlwbWVudF0udHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CTEFTVEVSOlxuICAgICAgICAgICAgICAgIHVpLmRyYXcoYmxhc3Rlckljb24uYmxhc3RlclVJTWFzdGVyUGllY2UocmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5TQ0FOTkVSOlxuICAgICAgICAgICAgICAgIHVpLmRyYXcoc2Nhbm5lckljb24uc2Nhbm5lclVJTWFzdGVyUGllY2UocmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CVUlMREVSOlxuICAgICAgICAgICAgICAgIHVpLmRyYXcoYnVpbGRlckljb24uYnVpbGRlclVJTWFzdGVyUGllY2UocmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5FcXVpcG1lbnRUeXBlcy5CSU5PQ1VMQVJTOlxuICAgICAgICAgICAgICAgIHVpLmRyYXcoYmlub2N1bGFyc0ljb24uYmlub2N1bGFyc1VJTWFzdGVyUGllY2UocmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckFiaWxpdGllcyhwbGF5ZXI6IGFueSwgdWk6IFBvcG92YSkge1xuICAgIGlmIChwbGF5ZXIgJiYgcGxheWVyLmFiaWxpdGllcykge1xuICAgICAgICBjb25zdCBpY29uU2l6ZSA9IDQ4O1xuICAgICAgICBjb25zdCBudW1BYmlsaXRpZXMgPSBwbGF5ZXIuYWJpbGl0aWVzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgcmVuZGVyV2lkdGggPSB1aS5zaXplKCkud2lkdGggLyAyO1xuICAgICAgICBjb25zdCByZW5kZXJIZWlnaHQgPSB1aS5zaXplKCkuaGVpZ2h0IC0gaWNvblNpemU7XG5cbiAgICAgICAgLy8gVE9ETzogTW92ZSB0aGVzZSB0byB0aGVpciBvd24gdGVtcGxhdGUgZmlsZXNcbiAgICAgICAgcGxheWVyLmFiaWxpdGllcy5mb3JFYWNoKChhYmlsaXR5OiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGljb25Qb3NYID0gcmVuZGVyV2lkdGggKyAoMC41IC0gbnVtQWJpbGl0aWVzIC8gMiArIGluZGV4KSAqIGljb25TaXplO1xuICAgICAgICAgICAgY29uc3QgcmVtYWluaW5nOiBudW1iZXIgPSAoYWJpbGl0eS5jb29sZG93biAtIChEYXRlLm5vdygpIC0gYWJpbGl0eS5sYXN0Y2FzdCkpIC8gMTAwMDtcbiAgICAgICAgICAgIHVpLmRyYXcoe1xuICAgICAgICAgICAgICAgIHBhbGV0dGU6IFtcIiM4ODg4ODhcIiwgXCIjQ0NDQ0NDXCIsIFwiI0JCQkJCQlwiXSxcbiAgICAgICAgICAgICAgICBwb3NYOiBpY29uUG9zWCxcbiAgICAgICAgICAgICAgICBwb3NZOiByZW5kZXJIZWlnaHQsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA4LFxuICAgICAgICAgICAgICAgIGZhY2luZzogMCxcbiAgICAgICAgICAgICAgICBzdHJva2VzOiBbe1xuICAgICAgICAgICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgICAgICAgICAgY2VsbFk6IDAsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxNixcbiAgICAgICAgICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBjZWxsWDogMCxcbiAgICAgICAgICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxNCxcbiAgICAgICAgICAgICAgICAgICAgc3dhdGNoOiAwXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBjZWxsWDogMSxcbiAgICAgICAgICAgICAgICAgICAgY2VsbFk6IDEsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxNCxcbiAgICAgICAgICAgICAgICAgICAgc3dhdGNoOiAocmVtYWluaW5nID4gMCkgPyAxIDogMlxuICAgICAgICAgICAgICAgIH0sXSxcbiAgICAgICAgICAgICAgICBjdXN0b21SZW5kZXJTaXplOiAyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChyZW1haW5pbmcgPiAwKSB7XG4gICAgICAgICAgICAgICAgdWkuZHJhd1RleHQoXG4gICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZy50b0ZpeGVkKDEpLFxuICAgICAgICAgICAgICAgICAgICBpY29uUG9zWCxcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVySGVpZ2h0ICsgNCxcbiAgICAgICAgICAgICAgICAgICAgMTIsXG4gICAgICAgICAgICAgICAgICAgIFwiI0VFRUVFRVwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdWkuZHJhd1RleHQoU3RyaW5nKGluZGV4ICsgMSksIGljb25Qb3NYLCByZW5kZXJIZWlnaHQgKyA2LCAxOCwgXCIjRUVFRUVFXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYXdTdGF0dXNFZmZlY3RzKG9iamVjdDogYW55LCByZW5kZXJPZmZzZXRYOiBudW1iZXIsIHJlbmRlck9mZnNldFk6IG51bWJlciwgcmVuZGVyU2l6ZTogbnVtYmVyLCBjb3ZlcjogUG9wb3ZhKSB7XG4gICAgaWYgKGNoZWNrU3RhdHVzRWZmZWN0KG9iamVjdCwgdHlwZXMuU3RhdHVzRWZmZWN0cy5TVFVOTkVEKSkge1xuICAgICAgICBjb3Zlci5kcmF3KHN0dW5uZWRTdGF0dXNFZmZlY3Quc3R1bm5lZFN0YXR1c0VmZmVjdE1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSwgcmVuZGVyU2l6ZSkpO1xuICAgIH1cbiAgICBpZiAoY2hlY2tTdGF0dXNFZmZlY3Qob2JqZWN0LCB0eXBlcy5TdGF0dXNFZmZlY3RzLklOVlVMTkVSQUJMRSkpIHtcbiAgICAgICAgY292ZXIuZHJhdyhpbnZ1bG5lYXJhYmxlU3RhdHVzRWZmZWN0LmludnVsbmVyYWJsZVN0YXR1c0VmZmVjdE1hc3RlclBpZWNlKG9iamVjdCwgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSwgcmVuZGVyU2l6ZSkpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgbWFzdGVyUGllY2Uge1xuICAgIHBhbGV0dGU6IHN0cmluZ1tdLFxuICAgIHBvc1g6IG51bWJlcixcbiAgICBwb3NZOiBudW1iZXIsXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBmYWNpbmc6IG51bWJlcixcbiAgICBzdHJva2VzOiBzdHJva2VbXSxcbiAgICBjdXN0b21SZW5kZXJTaXplPzogbnVtYmVyLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIHN0cm9rZSB7XG4gICAgY2VsbFg6IG51bWJlcixcbiAgICBjZWxsWTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgc3dhdGNoOiBudW1iZXIsXG4gICAgdHlwZT86IFN0cm9rZVR5cGVzLFxufVxuXG5leHBvcnQgZW51bSBTdHJva2VUeXBlcyB7XG4gICAgUkVDVCA9IFwic3Ryb2tlLXJlY3RcIixcbiAgICBDSVJDID0gXCJzdHJva2UtY2lyY1wiLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIG1vdXNlUG9zaXRpb24ge1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgb3V0T2ZCb3VuZHM6IGJvb2xlYW4sXG59XG5cbmV4cG9ydCBjbGFzcyBQb3BvdmEge1xuXG4gICAgcHJpdmF0ZSBjYW52YXM6IGFueTtcbiAgICBwcml2YXRlIGN0eDogYW55O1xuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgY3ViZVNpemU6IG51bWJlciA9IDEyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIFBvcG92YSdzIGNhbnZhc1xuICAgICAqIEBwYXJhbSBjYW52YXNJZCBJZCBvZiBodG1sIGNhbnZhcyBlbGVtZW50XG4gICAgICogQHBhcmFtIGN1YmVTaXplIFJlbmRlciBzaXplIGZvciBlYWNoIGN1YmUgd2hlbiBkcmF3aW5nIHdpdGggY3ViZXNcbiAgICAgKi9cbiAgICBpbml0KGNhbnZhc0lkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSA8YW55PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNJZCk7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbnZhcy5vZmZzZXRXaWR0aCAtIDQ7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMub2Zmc2V0SGVpZ2h0IC0gNDtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVuZGVycyBhIGdyaWQgb24gdGhlIGNhbnZhc1xuICAgICAqIEBwYXJhbSBzcGFjaW5nIE51bWJlciBvZiBwaXhlbHMgYmV0d2VlbiBncmlkIGxpbmVzXG4gICAgKi9cbiAgICBkcmF3R3JpZChzcGFjaW5nOiBudW1iZXIsIG9mZnNldFg/OiBudW1iZXIsIG9mZnNldFk/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgLy8gRHJhdyBncmlkIG9uIGJhY2tncm91bmRcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIiNmMGU3ZGJcIjtcbiAgICAgICAgZm9yICh2YXIgeCA9ICghIW9mZnNldFgpID8gb2Zmc2V0WCAlIHNwYWNpbmcgOiAwOyB4IDw9IHRoaXMud2lkdGg7IHggKz0gc3BhY2luZykge1xuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIDApO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIHkgPSAoISFvZmZzZXRZKSA/IG9mZnNldFkgJSBzcGFjaW5nIDogMDsgeSA8PSB0aGlzLmhlaWdodDsgeSArPSBzcGFjaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oMCwgeSk7XG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8odGhpcy53aWR0aCwgeSk7XG4gICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmF3cyBhIG1hc3RlcnBpZWNlIHRvIHRoZSBjYW52YXNcbiAgICAgKiBAcGFyYW0gbWFzdGVyUGllY2UgRGVmaW5pdGlvbiBmb3Igd2hhdCB0byBkcmF3XG4gICAgICovXG4gICAgZHJhdyhtYXN0ZXJQaWVjZTogbWFzdGVyUGllY2UpIHtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuXG4gICAgICAgIHRoaXMucHJlcENhbnZhcyhcbiAgICAgICAgICAgIG1hc3RlclBpZWNlLnBvc1gsXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS5wb3NZLFxuICAgICAgICAgICAgbWFzdGVyUGllY2Uud2lkdGgsXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS5oZWlnaHQsXG4gICAgICAgICAgICBtYXN0ZXJQaWVjZS5mYWNpbmcpO1xuICAgICAgICBtYXN0ZXJQaWVjZS5zdHJva2VzLmZvckVhY2goKHN0cm9rZTogc3Ryb2tlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclN0cm9rZShzdHJva2UsIG1hc3RlclBpZWNlLnBhbGV0dGUsIG1hc3RlclBpZWNlLmN1c3RvbVJlbmRlclNpemUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2VudGVycyB0aGUgY2FudmFzIG9uIHBvc2l0aW9uLCBhbmQgcm90YXRlcyB0byBhIGNlcnRhaW4gZmFjaW5nXG4gICAgICogQHBhcmFtIHBvc2l0aW9uWCBUaGUgeCBwb3NpdGlvbiBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIHBvc2l0aW9uWSBUaGUgeSBwb3NpdGlvbiBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIHdpZHRoIFRoZSB3aWR0aCBvZiB3aGF0IGlzIGJlaW5nIGRyYXduXG4gICAgICogQHBhcmFtIGhlaWdodCBUaGUgaGVpZ2h0IG9mIHdoYXQgaXMgYmVpbmcgZHJhd25cbiAgICAgKiBAcGFyYW0gZGVncmVlcyBEZWdyZWVzIHRvIHJvdGF0ZSB0aGUgY2FudmFzIGJ5XG4gICAgICogQHBhcmFtIGN1c3RvbVJlbmRlclNpemUgUmVuZGVyIHRoZSBtYXN0ZXIgcGllY2Ugd2l0aCBjdXN0b20gY3ViZSBzaXppbmdcbiAgICAgKi9cbiAgICBwcmVwQ2FudmFzKHBvc2l0aW9uWDogbnVtYmVyLCBwb3NpdGlvblk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGRlZ3JlZXM6IG51bWJlciwgY3VzdG9tUmVuZGVyU2l6ZT86IG51bWJlcil7XG4gICAgICAgIGNvbnN0IHJlbmRlclNpemUgPSBjdXN0b21SZW5kZXJTaXplID8gY3VzdG9tUmVuZGVyU2l6ZSA6IHRoaXMuY3ViZVNpemU7XG5cbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZShwb3NpdGlvblgsIHBvc2l0aW9uWSk7XG4gICAgICAgIHRoaXMuY3R4LnJvdGF0ZShkZWdyZWVzICogTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSgtIHdpZHRoICogcmVuZGVyU2l6ZSAvIDIsIC0gaGVpZ2h0ICogcmVuZGVyU2l6ZSAvIDIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgXG4gICAgICogQHBhcmFtIHN0cm9rZSBTdHJva2UgdG8gcmVuZGVyXG4gICAgICogQHBhcmFtIHBhbGV0dGUgQ29udGFpbnMgdGhlIG1hc3RlciBwaWVjZSdzIGNvbG9yIHN3YXRjaGVzXG4gICAgICogQHBhcmFtIGN1c3RvbVJlbmRlclNpemUgUmVuZGVyIHRoZSBtYXN0ZXIgcGllY2Ugd2l0aCBjdXN0b20gY3ViZSBzaXppbmdcbiAgICAgKi9cbiAgICByZW5kZXJTdHJva2Uoc3Ryb2tlOiBzdHJva2UsIHBhbGV0dGU6IHN0cmluZ1tdLCBjdXN0b21SZW5kZXJTaXplPzogbnVtYmVyKXtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gcGFsZXR0ZVtzdHJva2Uuc3dhdGNoXTtcblxuICAgICAgICBpZiAoc3Ryb2tlLnR5cGUgJiYgc3Ryb2tlLnR5cGUgPT09IFN0cm9rZVR5cGVzLkNJUkMpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmFyYyhcbiAgICAgICAgICAgICAgICBzdHJva2UuY2VsbFggKiAoY3VzdG9tUmVuZGVyU2l6ZSA/IGN1c3RvbVJlbmRlclNpemUgOiB0aGlzLmN1YmVTaXplKSxcbiAgICAgICAgICAgICAgICBzdHJva2UuY2VsbFkgKiAoY3VzdG9tUmVuZGVyU2l6ZSA/IGN1c3RvbVJlbmRlclNpemUgOiB0aGlzLmN1YmVTaXplKSxcbiAgICAgICAgICAgICAgICBNYXRoLm1pbihzdHJva2Uud2lkdGgsIHN0cm9rZS5oZWlnaHQpICogKGN1c3RvbVJlbmRlclNpemUgPyBjdXN0b21SZW5kZXJTaXplIDogdGhpcy5jdWJlU2l6ZSksXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBNYXRoLlBJICogMlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KFxuICAgICAgICAgICAgICAgIHN0cm9rZS5jZWxsWCAqIChjdXN0b21SZW5kZXJTaXplID8gY3VzdG9tUmVuZGVyU2l6ZSA6IHRoaXMuY3ViZVNpemUpLFxuICAgICAgICAgICAgICAgIHN0cm9rZS5jZWxsWSAqIChjdXN0b21SZW5kZXJTaXplID8gY3VzdG9tUmVuZGVyU2l6ZSA6IHRoaXMuY3ViZVNpemUpLFxuICAgICAgICAgICAgICAgIHN0cm9rZS53aWR0aCAqIChjdXN0b21SZW5kZXJTaXplID8gY3VzdG9tUmVuZGVyU2l6ZSA6IHRoaXMuY3ViZVNpemUpLFxuICAgICAgICAgICAgICAgIHN0cm9rZS5oZWlnaHQgKiAoY3VzdG9tUmVuZGVyU2l6ZSA/IGN1c3RvbVJlbmRlclNpemUgOiB0aGlzLmN1YmVTaXplKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVyYXNlcyBldmVyeXRoaW5nIG9uIHRoZSBjYW52YXNcbiAgICAgKi9cbiAgICB3aXBlQ2FudmFzKCkge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNhbnZhcycgd2lkdGggYW5kIGhlaWdodFxuICAgICAqL1xuICAgIHNpemUoKTogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9IHtcbiAgICAgICAgcmV0dXJuIHsgd2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHQgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIFBvcG92YSdzIGN1YmUgcmVuZGVyIHNpemVcbiAgICAgKi9cbiAgICBnZXRDdWJlU2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jdWJlU2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIFBvcG92YSdzIGN1YmUgcmVuZGVyIHNpemVcbiAgICAgKiBAcGFyYW0gc2l6ZSBWYWx1ZSBmb3IgY3ViZSByZW5kZXIgc2l6ZVxuICAgICAqL1xuICAgIHNldEN1YmVTaXplKHNpemU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmN1YmVTaXplID0gc2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG1vdXNlIHBvc2l0aW9uIGFuZCBpZiBtb3VzZSBpcyBpbnNpZGUgY2FudmFzXG4gICAgICogQHBhcmFtIGV2dCBNb3VzZSBtb3ZlbWVudCBldmVudCwgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvblxuICAgICAqL1xuICAgIGdldE1vdXNlUG9zKGV2dDogYW55KTogbW91c2VQb3NpdGlvbiB7XG4gICAgICAgIHZhciByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBwb3NYID0gZXZ0LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgIHZhciBwb3NZID0gZXZ0LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgICAgdmFyIG9mZkNhbnZhcyA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChwb3NYIDwgMCkge1xuICAgICAgICAgICAgcG9zWCA9IDA7XG4gICAgICAgICAgICBvZmZDYW52YXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NZIDwgMCkge1xuICAgICAgICAgICAgcG9zWSA9IDA7XG4gICAgICAgICAgICBvZmZDYW52YXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NYID4gdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgcG9zWCA9IHRoaXMud2lkdGg7XG4gICAgICAgICAgICBvZmZDYW52YXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NZID4gdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHBvc1kgPSB0aGlzLmhlaWdodDtcbiAgICAgICAgICAgIG9mZkNhbnZhcyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IHBvc1gsXG4gICAgICAgICAgeTogcG9zWSxcbiAgICAgICAgICBvdXRPZkJvdW5kczogb2ZmQ2FudmFzLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERyYXcgdGV4dCB0byB0aGUgY2FudmFzXG4gICAgICogQHBhcmFtIHRleHQgVGhlIHRleHQgdG8gZHJhd1xuICAgICAqIEBwYXJhbSBwb3NYIFRoZSBob3Jpem9udGFsIHBvc2l0aW9uIHRvIGRyYXcgdGhlIHRleHRcbiAgICAgKiBAcGFyYW0gcG9zWSBUaGUgdmVydGljYWwgcG9zaXRpb24gdG8gZHJhdyB0aGUgdGV4dFxuICAgICAqIEBwYXJhbSBzaXplIFRoZSBmb250IHNpemUgb2YgdGhlIHRleHRcbiAgICAgKiBAcGFyYW0gY29sb3IgVGhlIGNvbG9yIHRvIGRyYXcgdGhlIHRleHRcbiAgICAgKiBAcGFyYW0gZmFjaW5nIFRoZSBhbmdsZSB0byByZW5kZXIgdGhlIHRleHRcbiAgICAgKi9cbiAgICBkcmF3VGV4dCh0ZXh0OiBzdHJpbmcsIHBvc1g6IG51bWJlciwgcG9zWTogbnVtYmVyLCBzaXplPzogbnVtYmVyLCBjb2xvcj86IHN0cmluZywgZmFjaW5nPzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcblxuICAgICAgICBjb25zdCBhY3R1YWxTaXplID0gc2l6ZSA/IHNpemUgOiAxNjtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFN0cmluZyhhY3R1YWxTaXplKSArIFwicHggQXJpYWxcIjtcbiAgICAgICAgdGhpcy5wcmVwQ2FudmFzKHBvc1gsIHBvc1ksIHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoLCAwLCBmYWNpbmcsIDEpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvciA/IGNvbG9yIDogXCJibGFja1wiO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0ZXh0LCAwLCAwKTtcblxuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgKiBhcyBzb2NrZXRJbyBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xuaW1wb3J0IHsgUG9wb3ZhLCBtb3VzZVBvc2l0aW9uLCBtYXN0ZXJQaWVjZSB9IGZyb20gXCIuL1BvcG92YS9Qb3BvdmFcIjtcbmltcG9ydCAqIGFzIGxvdXZyZSBmcm9tIFwiLi9Mb3V2cmUvTG91dnJlXCI7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vT2JqZWN0VHlwZXNcIjtcblxuLy8gU29ja2V0IGxpc3RlbmVyXG52YXIgc29ja2V0ID0gaW8oKTtcbnZhciBkZWJ1ZyA9IHRydWU7XG5cbnZhciBjdWJlU2l6ZTogbnVtYmVyO1xudmFyIGdyaWRTaXplOiBudW1iZXIgPSA0ODtcbnZhciBjYW52YXNTaXplOiB7IHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyIH07XG52YXIgZXF1aXBtZW50SWNvblBvc1g6IG51bWJlciA9IDk3NjtcbnZhciBlcXVpcG1lbnRJY29uUG9zWTogbnVtYmVyID0gNzI2O1xuXG52YXIgcGxheWVySWQ6IHN0cmluZztcblxudmFyIHJlbmRlck9mZnNldFg6IG51bWJlcjtcbnZhciByZW5kZXJPZmZzZXRZOiBudW1iZXI7XG52YXIgY2FtZXJhTW92aW5nVG9YOiBudW1iZXI7XG52YXIgY2FtZXJhTW92aW5nVG9ZOiBudW1iZXI7XG52YXIgY2FtZXJhUGFuU3BlZWQgPSAwLjAxNTtcblxudmFyIG1vdXNlUG9zOiBtb3VzZVBvc2l0aW9uID0geyB4OiAwLCB5OiAwLCBvdXRPZkJvdW5kczogdHJ1ZSB9O1xuXG52YXIgcGxheWVySW5wdXQgPSB7XG4gICAgdXA6IGZhbHNlLFxuICAgIGRvd246IGZhbHNlLFxuICAgIGxlZnQ6IGZhbHNlLFxuICAgIHJpZ2h0OiBmYWxzZSxcbiAgICBjeWNsZUVxdWlwbWVudEZvcndhcmQ6IGZhbHNlLFxuICAgIGN5Y2xlRXF1aXBtZW50QmFja3dhcmQ6IGZhbHNlLFxuICAgIHVzZUVxdWlwbWVudDogZmFsc2UsXG4gICAgcGlja3VwOiBmYWxzZSxcbiAgICBhYmlsaXR5MTogZmFsc2UsXG4gICAgYWJpbGl0eTI6IGZhbHNlLFxuICAgIGFiaWxpdHkzOiBmYWxzZSxcbiAgICBhYmlsaXR5NDogZmFsc2UsXG4gICAgdGFyZ2V0WDogbW91c2VQb3MueCxcbiAgICB0YXJnZXRZOiBtb3VzZVBvcy55LFxufVxuXG52YXIgS0VZX1VQID0gODc7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBXXG52YXIgS0VZX0RPV04gPSA4MzsgICAgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBTXG52YXIgS0VZX1JJR0hUID0gNjg7ICAgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBEXG52YXIgS0VZX0xFRlQgPSA2NTsgICAgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBBXG52YXIgS0VZX0NZQ0xFX0VRVUlQTUVOVF9GT1JXQVJEID0gNjk7ICAgLy8gRGVmYXVsdCB0byBFXG52YXIgS0VZX0NZQ0xFX0VRVUlQTUVOVF9CQUNLV0FSRCA9IDgxOyAgLy8gRGVmYXVsdCB0byBRXG52YXIgS0VZX1VTRV9FUVVJUE1FTlQgPSA4MiAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBSXG52YXIgS0VZX1BJQ0tVUCA9IDcwOyAgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byBGXG52YXIgS0VZX0FCSUxJVFlfMSA9IDQ5OyAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byAxXG52YXIgS0VZX0FCSUxJVFlfMiA9IDUwOyAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byAyXG52YXIgS0VZX0FCSUxJVFlfMyA9IDUxOyAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byAzXG52YXIgS0VZX0FCSUxJVFlfNCA9IDUyOyAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCB0byA0XG5cbnZhciBwcmV2VGltZSA9IDA7XG52YXIgZGVsdGEgPSAwO1xuXG4vLyBBZGQgbGlzdGVuZXJzIHRvIGRvY3VtZW50XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBLRVlfVVA6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC51cCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfRE9XTjpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmRvd24gPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX1JJR0hUOlxuICAgICAgICAgICAgcGxheWVySW5wdXQucmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0xFRlQ6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5sZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9DWUNMRV9FUVVJUE1FTlRfRk9SV0FSRDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmN5Y2xlRXF1aXBtZW50Rm9yd2FyZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfQ1lDTEVfRVFVSVBNRU5UX0JBQ0tXQVJEOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuY3ljbGVFcXVpcG1lbnRCYWNrd2FyZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfVVNFX0VRVUlQTUVOVDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LnVzZUVxdWlwbWVudCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfUElDS1VQOlxuICAgICAgICAgICAgcGxheWVySW5wdXQucGlja3VwID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9BQklMSVRZXzE6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5MSA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfQUJJTElUWV8yOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuYWJpbGl0eTIgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0FCSUxJVFlfMzpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmFiaWxpdHkzID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9BQklMSVRZXzQ6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5NCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGxheWVySW5wdXQudGFyZ2V0WCA9IG1vdXNlUG9zLnggKyByZW5kZXJPZmZzZXRYO1xuICAgIHBsYXllcklucHV0LnRhcmdldFkgPSBtb3VzZVBvcy55ICsgcmVuZGVyT2Zmc2V0WTtcbiAgICBzb2NrZXQuZW1pdChcInBsYXllcklucHV0XCIsIHBsYXllcklucHV0KTtcbiAgICBcbiAgICAvLyBUcmlnZ2VyIGtleXMgYXJlIHVuc2V0IGFmdGVyIGVtaXNzaW9uXG4gICAgcGxheWVySW5wdXQucGlja3VwID0gZmFsc2U7XG4gICAgcGxheWVySW5wdXQuY3ljbGVFcXVpcG1lbnRGb3J3YXJkID0gZmFsc2U7XG4gICAgcGxheWVySW5wdXQuY3ljbGVFcXVpcG1lbnRCYWNrd2FyZCA9IGZhbHNlO1xuICAgIHBsYXllcklucHV0LnVzZUVxdWlwbWVudCA9IGZhbHNlO1xufSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50KSA9PiB7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgS0VZX1VQOlxuICAgICAgICAgICAgcGxheWVySW5wdXQudXAgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9ET1dOOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX1JJR0hUOlxuICAgICAgICAgICAgcGxheWVySW5wdXQucmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9MRUZUOlxuICAgICAgICAgICAgcGxheWVySW5wdXQubGVmdCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0FCSUxJVFlfMTpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmFiaWxpdHkxID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLRVlfQUJJTElUWV8yOlxuICAgICAgICAgICAgcGxheWVySW5wdXQuYWJpbGl0eTIgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtFWV9BQklMSVRZXzM6XG4gICAgICAgICAgICBwbGF5ZXJJbnB1dC5hYmlsaXR5MyA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS0VZX0FCSUxJVFlfNDpcbiAgICAgICAgICAgIHBsYXllcklucHV0LmFiaWxpdHk0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc29ja2V0LmVtaXQoXCJwbGF5ZXJJbnB1dFwiLCBwbGF5ZXJJbnB1dCk7XG59KTtcblxuZnVuY3Rpb24gb25Nb3VzZU1vdmUoZXZlbnQ6IGFueSkge1xuICAgIG1vdXNlUG9zID0gZm9yZWdyb3VuZC5nZXRNb3VzZVBvcyhldmVudCk7XG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSwgZmFsc2UpO1xuXG5mdW5jdGlvbiBvbk1vdXNlQ2xpY2soZXZlbnQ6IGFueSkge1xuICAgIGlmICghbW91c2VQb3Mub3V0T2ZCb3VuZHMpIHtcbiAgICAgICAgc29ja2V0LmVtaXQoXCJtb3VzZURvd25cIiwge1xuICAgICAgICAgICAgc291cmNlSWQ6IHBsYXllcklkLFxuICAgICAgICAgICAgdGFyZ2V0WDogKG1vdXNlUG9zLnggKyByZW5kZXJPZmZzZXRYKSxcbiAgICAgICAgICAgIHRhcmdldFk6IChtb3VzZVBvcy55ICsgcmVuZGVyT2Zmc2V0WSksXG4gICAgICAgICAgICBwbGF5ZXJJbnB1dDogcGxheWVySW5wdXQsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25Nb3VzZUNsaWNrLCBmYWxzZSk7XG5cbi8vIEluaXQgY2FudmFzXG52YXIgYmFja2dyb3VuZCAgPSBuZXcgUG9wb3ZhKCk7XG52YXIgZW52ICAgICAgICAgPSBuZXcgUG9wb3ZhKCk7XG52YXIgZm9yZWdyb3VuZCAgPSBuZXcgUG9wb3ZhKCk7XG52YXIgY292ZXIgICAgICAgPSBuZXcgUG9wb3ZhKCk7XG52YXIgdWkgICAgICAgICAgPSBuZXcgUG9wb3ZhKCk7XG5cbmJhY2tncm91bmQuaW5pdChcImJhY2tncm91bmRcIik7XG5lbnYuaW5pdChcImVudlwiKTtcbmZvcmVncm91bmQuaW5pdChcImZvcmVncm91bmRcIik7XG5jb3Zlci5pbml0KFwiY292ZXJcIik7XG51aS5pbml0KFwidWlcIik7XG5cbi8vIFRlbGwgdGhlIHNlcnZlciBhIG5ldyBwbGF5ZXIgaGFzIGpvaW5lZCBhbmQgaGFuZHNoYWtlXG5zb2NrZXQuZW1pdChcIm5ldy1wbGF5ZXJcIik7XG5zb2NrZXQub24oXCJoYW5kc2hha2VcIiwgKGluZm86IGFueSkgPT4ge1xuICAgIHBsYXllcklkID0gaW5mby5pZDtcbiAgICBjdWJlU2l6ZSA9IGluZm8uY3ViZVNpemU7XG4gICAgYmFja2dyb3VuZC5zZXRDdWJlU2l6ZShjdWJlU2l6ZSk7XG4gICAgZW52LnNldEN1YmVTaXplKGN1YmVTaXplKTtcbiAgICBmb3JlZ3JvdW5kLnNldEN1YmVTaXplKGN1YmVTaXplKTtcbiAgICBjb3Zlci5zZXRDdWJlU2l6ZShjdWJlU2l6ZSk7XG4gICAgdWkuc2V0Q3ViZVNpemUoY3ViZVNpemUpO1xuICAgIGNhbnZhc1NpemUgPSBmb3JlZ3JvdW5kLnNpemUoKTtcblxuICAgIHByZXZUaW1lID0gRGF0ZS5ub3coKTtcbiAgICByZW5kZXJPZmZzZXRYID0gMDtcbiAgICByZW5kZXJPZmZzZXRZID0gMDtcbn0pO1xuXG4vLyBJbnRlcnByZXQgc3RhdGUgYW5kIGRyYXcgb2JqZWN0c1xuc29ja2V0Lm9uKFwic3RhdGVcIiwgKG9iamVjdHM6IGFueSkgPT4ge1xuICAgIHZhciBwbGF5ZXIgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHBsYXllcklkICYmIG9iamVjdHNbcGxheWVySWRdKSB7XG4gICAgICAgIHBsYXllciA9IG9iamVjdHNbcGxheWVySWRdO1xuICAgIH1cblxuICAgIGlmICghY2FudmFzU2l6ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yZWdyb3VuZC53aXBlQ2FudmFzKCk7XG4gICAgZW52LndpcGVDYW52YXMoKTtcbiAgICBjb3Zlci53aXBlQ2FudmFzKCk7XG4gICAgdWkud2lwZUNhbnZhcygpO1xuXG4gICAgY29uc3QgdGltZSA9IERhdGUubm93KCk7XG4gICAgZGVsdGEgPSB0aW1lIC0gcHJldlRpbWU7XG4gICAgcHJldlRpbWUgPSB0aW1lO1xuXG4gICAgLy8gQ2FtZXJhIHNtb290aGluZyBhbmQgcmVuZGVyIG9mZnNldCBjYWxjdWxhdGlvbnNcbiAgICBjYW1lcmFNb3ZpbmdUb1ggPSAoISFwbGF5ZXIpXG4gICAgICAgID8gcGxheWVyLnggKyAobW91c2VQb3MueCAtIChjYW52YXNTaXplLndpZHRoIC8gMikpICogcGxheWVyLnZpZXdSYW5nZSAtIGNhbnZhc1NpemUud2lkdGggLyAyXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIGNhbWVyYU1vdmluZ1RvWSA9ICghIXBsYXllcilcbiAgICAgICAgPyBwbGF5ZXIueSArIChtb3VzZVBvcy55IC0gKGNhbnZhc1NpemUuaGVpZ2h0IC8gMikpICogcGxheWVyLnZpZXdSYW5nZSAtIGNhbnZhc1NpemUuaGVpZ2h0IC8gMlxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIHJlbmRlck9mZnNldFggKz0gKCEhY2FtZXJhTW92aW5nVG9YKVxuICAgICAgICA/IChjYW1lcmFNb3ZpbmdUb1ggLSByZW5kZXJPZmZzZXRYKSAqIGNhbWVyYVBhblNwZWVkICogZGVsdGFcbiAgICAgICAgOiAwO1xuICAgIHJlbmRlck9mZnNldFkgKz0gKCEhY2FtZXJhTW92aW5nVG9ZKVxuICAgICAgICA/IChjYW1lcmFNb3ZpbmdUb1kgLSByZW5kZXJPZmZzZXRZKSAqIGNhbWVyYVBhblNwZWVkICogZGVsdGFcbiAgICAgICAgOiAwO1xuXG4gICAgLy8gVE9ETzogRHJhdyBiYWNrZ3JvdW5kIG1hcCAoaW5zdGVhZCBvZi93aXRoIGdyaWQpXG4gICAgaWYgKCEhb2JqZWN0cykge1xuICAgICAgICBiYWNrZ3JvdW5kLndpcGVDYW52YXMoKTtcbiAgICAgICAgLy8gYmFja2dyb3VuZC5kcmF3R3JpZChncmlkU2l6ZSwgLXJlbmRlck9mZnNldFgsIC1yZW5kZXJPZmZzZXRZKTtcbiAgICB9XG5cbiAgICBpZiAoZGVidWcpIHtcbiAgICAgICAgdWkuZHJhd1RleHQoZGVsdGEudG9TdHJpbmcoKSArIFwibXNcIiwgY2FudmFzU2l6ZS53aWR0aCAtIDMyLCAxNiwgMTYsIFwiIzQ0NDQ0NFwiKTtcbiAgICB9XG5cbiAgICAvLyBSZW5kZXIgY3VycmVudCBlcXVpcG1lbnQgdWkgaWNvblxuICAgIGxvdXZyZS5yZW5kZXJDdXJyZW50RXF1aXBtZW50KHBsYXllciwgZXF1aXBtZW50SWNvblBvc1gsIGVxdWlwbWVudEljb25Qb3NZLCB1aSk7XG5cbiAgICAvLyBSZW5kZXIgcGxheWVyJ3MgYWJpbGl0aWVzXG4gICAgbG91dnJlLnJlbmRlckFiaWxpdGllcyhwbGF5ZXIsIHVpKTtcblxuICAgIC8vIFJlbmRlciBvYmplY3RzXG4gICAgbG91dnJlLnJlbmRlck9iamVjdHMob2JqZWN0cywgcmVuZGVyT2Zmc2V0WCwgcmVuZGVyT2Zmc2V0WSwgY3ViZVNpemUsIGJhY2tncm91bmQsIGVudiwgZm9yZWdyb3VuZCwgY292ZXIsIHVpKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==