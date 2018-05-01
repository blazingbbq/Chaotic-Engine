var types = require("../ObjectTypes");
var collisions = require("../Collisions");

// ----- Prefabs ----- //
var _player = require("./Player/_Player");
var god = require("./Player/God");
var firemage = require("./Player/FireMage");

var _gravestone = require("./Gravestone/_Gravestone");

var _projectile = require("./Projectile/_Projectile");
var fireboltProjectile = require("./Projectile/FireboltProjectile");
var flamePillarProjectile = require("./Projectile/FlamePillarProjectile");
var flameDashProjectile = require("./Projectile/FlameDashProjectile");

var _terrain = require("./Terrain/_Terrain");
var tree = require("./Terrain/Tree");
var wallHoriz = require("./Terrain/WallHoriz");

var _interactable = require("./Interactable/_Interactable");
var healthPickup = require("./Interactable/HealthPickup");
var carEnter = require("./Interactable/CarEnter");
var playerTypeChanger = require("./Interactable/PlayerTypeChanger");

var _trigger = require("./Trigger/_Trigger");
var spikeTrap = require("./Trigger/SpikeTrap");

var _vehicle = require("./Vehicle/_Vehicle");
var car = require("./Vehicle/Car");

var blaster = require("./Equipment/Blaster");
var scanner = require("./Equipment/Scanner");
var builder = require("./Equipment/Builder");
var binoculars = require("./Equipment/Binoculars");

var firebolt = require("./Abilities/Firebolt");
var flamePillar = require("./Abilities/FlamePillar");
var flameDash = require("./Abilities/FlameDash");
var flameBarrier = require("./Abilities/FlameBarrier");

var _combatText = require("./CombatText/_CombatText");
var damageText = require("./CombatText/DamageText");
var fireDamageText = require("./CombatText/FireDamageText");
var invulnerableText = require("./CombatText/InvulnerableText");
var healText = require("./CombatText/HealText");

// Export render size
var renderSize = 4;

module.exports = {
    renderSize: renderSize,
    // Generate a new terrain object
    generateNew: (obs, src, posX, posY, type, subtype, params = { }) => {
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
                while (obs[newId.concat(":" + dup)]){
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
                        if (!newObj) return;
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
                while (obs[newId.concat(":" + dup)]){
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
                update: (obs, selfId, delta) => { },
                damage: (obs, selfId, amount) => {
                    obs[selfId].health -= amount;

                    if (obs[selfId].health <= 0){
                        obs[selfId].deathrattle(obs, selfId);
                    }
                },
                deathrattle: (obs, selfId) => { },
            }
        }
        obs[src + ":" + type + ":" + subtype + ":" + posX + ":" + posY] = newObj;
    },
    newEquipment: (obs, type, params = { }) => {
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
    newAbility: (obs, type, params = { }) => {
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
}