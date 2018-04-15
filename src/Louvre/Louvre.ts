import { masterPiece, Popova } from "../Popova/Popova";
import * as types from "../../ObjectTypes";

import * as player from "../../Prefabs/Player/_Player.template";
import * as god from "../../Prefabs/Player/God.template";
import * as firemage from "../../Prefabs/Player/FireMage.template";
import * as healthbar from "../../Prefabs/Player/HealthBar.template";

import * as projectile from "../../Prefabs/Projectile/_Projectile.template";
import * as firebolt from "../../Prefabs/Projectile/FireboltProjectile.template";

import * as gravestone from "../../Prefabs/Gravestone/_Gravestone.template";

import * as _terrain from "../../Prefabs/Terrain/_Terrain.template";
import * as tree from "../../Prefabs/Terrain/Tree.template";
import * as wallHoriz from "../../Prefabs/Terrain/WallHoriz.template";

import * as healthPickup from "../../Prefabs/Interactable/HealthPickup.template";
import * as playerTypeChanger from "../../Prefabs/Interactable/PlayerTypeChanger.template";

import * as spikeTrap from "../../Prefabs/Trigger/SpikeTrap.template";

import * as car from "../../Prefabs/Vehicle/Car.template";

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


export function renderObjects(
    objects: any,
    renderOffsetX: number,
    renderOffsetY: number,
    renderSize: number,
    background: Popova,
    env: Popova,
    foreground: Popova,
    cover: Popova,
    ui: Popova,
) {
    for (var id in objects) {
        var object = objects[id];

        switch (object.type) {
            case types.ObjectTypes.PLAYER:
                switch (object.subtype) {
                    case types.Player.HUMAN:
                        foreground.draw(player.playerMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                    case types.Player.GOD:
                        foreground.draw(god.godPlayerMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                    case types.Player.FIRE_MAGE:
                        foreground.draw(firemage.firemagePlayerMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                }
                foreground.draw(healthbar.healthBarMasterPiece(object, renderOffsetX, renderOffsetY, renderSize));
                break;
            case types.ObjectTypes.PROJECTILE:
                switch (object.subtype) {
                    case types.Projectile.BASIC_PROJECTILE:
                        env.draw(projectile.projectileMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                    case types.Projectile.FIREBOLT_PROJECTILE:
                        env.draw(firebolt.fireboltProjectileMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case types.ObjectTypes.GRAVESTONE:
                env.draw(gravestone.graveStoneMasterPiece(object, renderOffsetX, renderOffsetY));
                env.draw(healthbar.healthBarMasterPiece(object, renderOffsetX, renderOffsetY, renderSize));
                break;
            case types.ObjectTypes.TERRAIN:
                switch (object.subtype) {
                    case types.Terrain.TREE:
                        env.draw(tree.treeTrunkMasterPiece(object, renderOffsetX, renderOffsetY));
                        cover.draw(tree.treeLeafMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                    case types.Terrain.WALL_HORIZ:
                        env.draw(wallHoriz.wallHorizBaseMasterPiece(object, renderOffsetX, renderOffsetY));
                        cover.draw(wallHoriz.wallHorizCoverMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case types.ObjectTypes.INTERACTABLE:
                switch (object.subtype) {
                    case types.Interactable.HEALTH_PICKUP:
                        env.draw(healthPickup.healthPickupMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                    case types.Interactable.PLAYER_TYPE_CHANGER:
                        env.draw(playerTypeChanger.playerTypeChangerMasterPiece(object, renderOffsetX, renderOffsetY));
                        env.draw(playerTypeChanger.littleManMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case types.ObjectTypes.TRIGGER:
                switch (object.subtype) {
                    case types.Trigger.SPIKE_TRAP:
                        env.draw(spikeTrap.spikeTrapMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            case types.ObjectTypes.VEHICLE:
                switch (object.subtype) {
                    case types.Vehicle.CAR:
                        foreground.draw(car.carMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                }
                break;
            default:
                env.draw(_terrain.defaultTerrainMasterPiece(object, renderOffsetX, renderOffsetY));
                break;
        }
    }
}
