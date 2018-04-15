import { masterPiece } from "../../src/Popova/Popova";

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
