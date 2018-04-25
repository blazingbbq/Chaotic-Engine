var flameDashSpeed = 0.2;
var flameDashWidth = 3;
var flameDashHeight = 3;
var flameDashHitBoxRadius = 2;
var flameDashDamage = 8;
var flameDashTickIncrease = 2;
var flameDashTrackingRadius = 50;
var flameDashMaxTether = 15;

function generateNew(obs, src, posX, posY, base) {
    var types = require("../../ObjectTypes");
    var prefabs = require("../Prefabs");
    var firemage = require("../Player/FireMage");
    var collisions = require("../../Collisions");

    var trackId = undefined;
    var smallestDist = undefined;

    collisions.checkZoneCollisions(src, obs, flameDashTrackingRadius, (srcId, collisionId) => {
        if (obs[collisionId] && obs[src] && src !== collisionId) {
            switch (obs[collisionId].type) {
                case types.ObjectTypes.PLAYER:
                case types.ObjectTypes.GRAVESTONE:
                case types.ObjectTypes.VEHICLE:
                case types.ObjectTypes.TERRAIN:
                    const dist = Math.sqrt(
                        Math.abs(obs[srcId].x - obs[collisionId].x) +
                        Math.abs(obs[srcId].y - obs[collisionId].y));
                    if (dist <= flameDashTrackingRadius) {
                        if (!trackId || dist < smallestDist) {
                            trackId = collisionId;
                            smallestDist = dist;
                        }
                    }
                    break;
            }
        }
    });
    if (!!trackId) {
        return {
            ...base,
            subtype: types.Projectile.FLAME_DASH_PROJECTILE,
            velocityX: 0,
            velocityY: 0,
            width: flameDashWidth,
            height: flameDashHeight,
            hitboxWidth: flameDashHitBoxRadius,
            hitboxHeight: flameDashHitBoxRadius,
            damage: flameDashDamage,
            trackId: trackId,
            update: (obs, selfId, delta) => {
                const dist = Math.sqrt(
                    Math.abs(obs[selfId].x - obs[obs[selfId].trackId].x) +
                    Math.abs(obs[selfId].y - obs[obs[selfId].trackId].y));

                if (dist > flameDashMaxTether && obs[selfId] && obs[obs[selfId].trackId]) {
                    delete obs[selfId];
                } else {
                    var angle = Math.atan2(
                        obs[obs[selfId].trackId].y - obs[selfId].y,
                        obs[obs[selfId].trackId].x - obs[selfId].x);
                    
                    obs[selfId].velocityX = Math.cos(angle) * flameDashSpeed,
                    obs[selfId].velocityY = Math.sin(angle) * flameDashSpeed,
    
                    // Calculate projectile movement
                    obs[selfId].x += obs[selfId].velocityX * delta;
                    obs[selfId].y += obs[selfId].velocityY * delta;
                    obs[selfId].dist += Math.sqrt(
                        Math.pow(obs[selfId].velocityX * delta, 2) +
                        Math.pow(obs[selfId].velocityY * delta, 2));
    
                    // TODO: Change projectile collisions to ray cast
                    collisions.checkCollisions(selfId, obs, prefabs.renderSize, (srcId, collisionId) => {
                        if (obs[srcId] && collisionId != srcId && collisionId != obs[srcId].source){
                            obs[srcId].onHit(obs, srcId, collisionId);
                        }
                    });
                    if (obs[id]) {
                        if (obs[id].dist > obs[id].maxProjDist) {
                            delete obs[id];
                        }
                    }
                }
            },
            onHit: (obs, srcId, collisionId) => {
                switch (obs[collisionId].type) {
                    case types.ObjectTypes.PLAYER:
                    case types.ObjectTypes.GRAVESTONE:
                    case types.ObjectTypes.VEHICLE:
                    case types.ObjectTypes.TERRAIN:
                        if (obs[srcId]) {
                            if (obs[collisionId] && obs[collisionId].damage) {
                                firemage.increaseFireTick(
                                    obs,
                                    obs[srcId].source,
                                    obs[collisionId].type === types.ObjectTypes.PLAYER ? flameDashTickIncrease : 0
                                );

                                const damage = obs[srcId].damage;
                                const fireDamage = obs[obs[srcId].source].fireTicks ? obs[obs[srcId].source].fireTicks * firemage.fireTickDamage: 0;

                                prefabs.generateNew(obs, collisionId, 0, 0, types.ObjectTypes.COMBAT_TEXT, types.CombatText.DAMAGE_TEXT, { text: "-" + damage });
                                if (fireDamage) prefabs.generateNew(obs, collisionId, 0, 0, types.ObjectTypes.COMBAT_TEXT, types.CombatText.FIRE_DAMAGE_TEXT, { text: "-" + fireDamage });

                                obs[collisionId].damage(
                                    obs,
                                    collisionId,
                                    damage + fireDamage
                                );
                            }
                            delete obs[srcId];
                        }
                        break;
                }
            },
        }
    }
}

module.exports = {
    generateNew: generateNew,
}
