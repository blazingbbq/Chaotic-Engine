import { masterPiece } from "../Popova/Popova";

/**
 * Get master peice for player object
 * @param object The player object
 * @param renderOffsetX Horizontal offset for rendering objects
 * @param renderOffsetY Vertical offset for render objects
 */
export function playerMasterPiece(object: any, renderOffsetX: number, renderOffsetY: number): masterPiece {
    return {
        palette: ["#abab9a", "#775050", "#AAAAAA"].concat(object.teamColor),
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