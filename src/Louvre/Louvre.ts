import { masterPiece, Popova } from "../Popova/Popova";
import * as types from "../../ObjectTypes";

import { checkStatusEffect } from "../../Prefabs/Player/_Player";
import * as player from "../../Prefabs/Player/_Player.template";
import * as god from "../../Prefabs/Player/God.template";
import * as firemage from "../../Prefabs/Player/FireMage.template";
import * as healthbar from "../../Prefabs/Player/HealthBar.template";

import * as stunnedStatusEffect from "../../Prefabs/Player/StatusEffects/Stunned.template";

import * as projectile from "../../Prefabs/Projectile/_Projectile.template";
import * as firebolt from "../../Prefabs/Projectile/FireboltProjectile.template";
import * as flamePillar from "../../Prefabs/Projectile/FlamePillarProjectile.template";
import * as flameDash from "../../Prefabs/Projectile/FlameDashProjectile.template";

import * as gravestone from "../../Prefabs/Gravestone/_Gravestone.template";

import * as _terrain from "../../Prefabs/Terrain/_Terrain.template";
import * as tree from "../../Prefabs/Terrain/Tree.template";
import * as wallHoriz from "../../Prefabs/Terrain/WallHoriz.template";

import * as healthPickup from "../../Prefabs/Interactable/HealthPickup.template";
import * as playerTypeChanger from "../../Prefabs/Interactable/PlayerTypeChanger.template";

import * as spikeTrap from "../../Prefabs/Trigger/SpikeTrap.template";

import * as car from "../../Prefabs/Vehicle/Car.template";

import * as binocularsIcon from "../../Prefabs/Equipment/Binoculars.icon";
import * as blasterIcon from "../../Prefabs/Equipment/Blaster.icon";
import * as builderIcon from "../../Prefabs/Equipment/Builder.icon";
import * as scannerIcon from "../../Prefabs/Equipment/Scanner.icon";

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
                if (checkStatusEffect(object, types.StatusEffects.STUNNED)) {
                    foreground.draw(stunnedStatusEffect.stunnedStatusEffectMasterPiece(object, renderOffsetX, renderOffsetY, renderSize));
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
                    case types.Projectile.FLAME_PILLAR_PROJECTILE:
                        env.draw(flamePillar.flamePillarProjectileMasterPiece(object, renderOffsetX, renderOffsetY));
                        break;
                    case types.Projectile.FLAME_DASH_PROJECTILE:
                        env.draw(flameDash.flameDashProjectileMasterPiece(object, renderOffsetX, renderOffsetY));
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
            case types.ObjectTypes.COMBAT_TEXT:
                ui.drawText(object.text, object.x - renderOffsetX, object.y - renderOffsetY, object.size, object.color, object.facing);
                break;
            default:
                env.draw(_terrain.defaultTerrainMasterPiece(object, renderOffsetX, renderOffsetY));
                break;
        }
    }
}

export function renderCurrentEquipment(player: any, renderOffsetX: number, renderOffsetY: number, ui: Popova) {
    if (player && player.currentEquipment != undefined) {
        switch (player.equipment[player.currentEquipment].type) {
            case types.EquipmentTypes.BLASTER:
                ui.draw(blasterIcon.blasterUIMasterPiece(renderOffsetX, renderOffsetY));
                break;
            case types.EquipmentTypes.SCANNER:
                ui.draw(scannerIcon.scannerUIMasterPiece(renderOffsetX, renderOffsetY));
                break;
            case types.EquipmentTypes.BUILDER:
                ui.draw(builderIcon.builderUIMasterPiece(renderOffsetX, renderOffsetY));
                break;
            case types.EquipmentTypes.BINOCULARS:
                ui.draw(binocularsIcon.binocularsUIMasterPiece(renderOffsetX, renderOffsetY));
                break;
            default:
                break;
        }
    }
}

export function renderAbilities(player: any, ui: Popova) {
    if (player && player.abilities) {
        const iconSize = 48;
        const numAbilities = player.abilities.length;
        const renderWidth = ui.size().width / 2;
        const renderHeight = ui.size().height - iconSize;

        player.abilities.forEach((ability: any, index: number) => {
            const iconPosX = renderWidth + (0.5 - numAbilities / 2 + index) * iconSize;
            const remaining: number = (ability.cooldown - (Date.now() - ability.lastcast)) / 1000;
            ui.draw({
                palette: ["#888888", "#CCCCCC", "#BBBBBB"],
                posX: iconPosX,
                posY: renderHeight,
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
                ui.drawText(
                    remaining.toFixed(1),
                    iconPosX,
                    renderHeight + 4,
                    12,
                    "#EEEEEE"
                );
            } else {
                ui.drawText(String(index + 1), iconPosX, renderHeight + 6, 18, "#EEEEEE");
            }
        });
    }
}
