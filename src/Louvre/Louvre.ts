import { masterPiece,  } from "../Popova/Popova";

/**
 * Get master piece for player object
 * @param object The player object
 * @param renderOffsetX Horizontal offset for rendering objects
 * @param renderOffsetY Vertical offset for render objects
 */
export function playerMasterPiece(object: any, renderOffsetX: number, renderOffsetY: number): masterPiece {
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
    }
}

/**
 * Get master piece for god player object
 * @param object The god player object
 * @param renderOffsetX Horizontal offset for rendering objects
 * @param renderOffsetY Vertical offset for render objects
 */
export function godPlayerMasterPiece(object: any, renderOffsetX: number, renderOffsetY: number): masterPiece {
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
    }
}

/**
 * Get master piece for object's health bar
 * @param object The object that needs a health bar
 * @param renderOffsetX Horizontal offset for rendering objects
 * @param renderOffsetY Vertical offset for render objects
 * @param cubeSize The cube render size, required when drawing free hand
 */
export function healthBarMasterPiece(object: any, renderOffsetX: number, renderOffsetY: number, cubeSize: number): masterPiece {
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
    freeHand: true};
}

/**
 * Get master piece for tree object
 * @param object The tree object
 * @param renderOffsetX Horizontal offset for rendering objects
 * @param renderOffsetY Vertical offset for render objects
 */
export function treeTrunkMasterPiece(object: any, renderOffsetX: number, renderOffsetY: number): masterPiece {
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
export function treeLeafMasterPiece(object: any, renderOffsetX: number, renderOffsetY: number): masterPiece {
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
export function graveStoneMasterPiece(object: any, renderOffsetX: number, renderOffsetY: number): masterPiece {
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
    }
}

/**
 * Get master piece for basic projectile
 * @param object The projectile object
 * @param renderOffsetX Horizontal offset for rendering objects
 * @param renderOffsetY Vertical offset for render objects
 */
export function projectileMasterPiece(object: any, renderOffsetX: number, renderOffsetY: number): masterPiece {
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
    }
}

/**
 * Get master piece for default terrain object
 * @param object The terrain object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
export function defaultTerrainMasterPiece(object: any, renderOffsetX: number, renderOffsetY: number):masterPiece {
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
    }
}

/**
 * Get master piece for horizontal wall object base
 * @param object The horizontal wall object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
export function wallHorizBaseMasterPiece(object: any, renderOffsetX: number, renderOffsetY: number): masterPiece {
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
    }
}

// TODO: Add more detail to wall (cobblestone style), change coloring depending on object health
/**
 * Get master piece for horizontal wall object cover
 * @param object The horizontal wall object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
export function wallHorizCoverMasterPiece(object: any, renderOffsetX: number, renderOffsetY: number): masterPiece {
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
    }
}

/**
 * Get master piece for health pickup object
 * @param object The health pickup object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
export function healthPickupMasterPiece(object: any, renderOffsetX: number, renderOffsetY: number): masterPiece {
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
    }
}

/**
 * Get master piece for spike trap object
 * @param object The spike trap object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
export function spikeTrapMasterPiece(object: any, renderOffsetX: number, renderOffsetY: number): masterPiece {
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

export function carMasterPiece(object: any, renderOffsetX: number, renderOffsetY: number): masterPiece {
    var highlightR: number = parseInt("0x" + object.carColor.substring(1, 3), 16) + 0x33;
    var highlightG: number = parseInt("0x" + object.carColor.substring(3, 5), 16) + 0x33;
    var highlightB: number = parseInt("0x" + object.carColor.substring(5, 7), 16) + 0x33;
    return {
        palette: ["#333333"]
            .concat(object.carColor)
            .concat("#" +
                (highlightR > 0xFF ? 0xFF : highlightR).toString(16) +
                (highlightG > 0xFF ? 0xFF : highlightG).toString(16) +
                (highlightB > 0xFF ? 0xFF : highlightB).toString(16)
            ),
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
export function blasterUIMasterPiece(posX: number, posY: number): masterPiece {
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
export function scannerUIMasterPiece(posX: number, posY: number): masterPiece {
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
export function builderUIMasterPiece(posX: number, posY: number): masterPiece {
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
export function binocularsUIMasterPiece(posX: number, posY: number): masterPiece {
    return {
        palette: ["#000000", "#333333"],
        posX: posX,
        posY: posY,
        width: 3,
        height: 3,
        facing: -45,
        strokes: [ {
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
