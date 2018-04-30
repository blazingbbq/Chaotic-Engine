import { masterPiece, StrokeTypes } from "../../../src/Popova/Popova";

/**
 * Get master piece for invulnerable status effect
 * @param object The invulnerable object
 * @param renderOffsetX Horizontal offset for rendering the object
 * @param renderOffsetY Vertical offset for rendering the object
 */
export function invulnerableStatusEffectMasterPiece(object: any, renderOffsetX: number, renderOffsetY: number, renderSize: number): masterPiece {
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
            type: StrokeTypes.RECT, // TODO: Make circ
        },],
    }
}
