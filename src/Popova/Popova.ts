export interface masterPiece {
    palette: string[],
    posX: number,
    posY: number,
    facing: number,
    strokes: stroke[],
}

export interface stroke {
    cellX: number,
    cellY: number,
    width: number,
    height: number,
    swatch: number,
}

const CUBE_SIZE = 8;

export class Popova {

    private canvas: any;
    private ctx: any;
    private width: number;
    private height: number;

    constructor() { }

    /**
     * Initializes Popova's canvas
     * @param canvasId Id of html canvas element
     */
    init(canvasId: string) {
        this.canvas = <any> document.getElementById(canvasId);
        this.width = this.canvas.offsetWidth;
        this.height = this.canvas.offsetHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext("2d");
    }

    /**
     * Renders a grid on the canvas
     * @param spacing Number of pixels between grid lines
    */
    drawGrid(spacing: number, offsetX?: number, offsetY?: number) {
        this.ctx.beginPath();
        this.ctx.save();
        // Draw grid on background
        this.ctx.strokeStyle = "#d8d8d8";
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
    }

    /**
     * Draws a masterpiece to the canvas
     * @param masterPiece Definition for what to draw
     */
    draw(masterPiece: masterPiece) {
        this.ctx.save();

        this.prepCanvas(masterPiece.posX, masterPiece.posY, masterPiece.facing);
        masterPiece.strokes.forEach((stroke: stroke) => {
            this.renderStroke(stroke, masterPiece.palette);
        });

        this.ctx.restore();
    }

    /**
     * Centers the canvas on position, and rotates to a certain facing
     * @param positionX The x position of what is being drawn
     * @param positionY The y position of what is being drawn
     * @param degrees Degrees to rotate the canvas by
     */
    prepCanvas(positionX: number, positionY: number, degrees: number){
        this.ctx.beginPath();
        this.ctx.translate(positionX, positionY);
        this.ctx.rotate(degrees * Math.PI / 180);
    }

    /**
     * Renders 
     * @param stroke Stroke to render
     * @param palette Contains the master piece's color swatches
     */
    renderStroke(stroke: stroke, palette: string[]){
        this.ctx.fillStyle = palette[stroke.swatch];
        this.ctx.fillRect(stroke.cellX * CUBE_SIZE, stroke.cellY * CUBE_SIZE,
            stroke.width * CUBE_SIZE, stroke.height * CUBE_SIZE);
    }

    /**
     * Erases everything on the canvas
     */
    wipeCanvas() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    /**
     * Returns the canvas' width and height
     */
    size(): {width: number, height: number} {
        return { width: this.width, height: this. height };
    }

    /**
     * Returns Popova's cube render size
     */
    cubeSize(): number {
        return CUBE_SIZE;
    }


    getMousePos(evt: any): { x: number, y: number } {
        var rect = this.canvas.getBoundingClientRect();
        var posX = evt.clientX - rect.left;
        var posY = evt.clientY - rect.top;

        if (posX < 0) posX = 0;
        if (posY < 0) posY = 0;
        if (posX > this.width) posX = this.width;
        if (posY > this.height) posY = this.height;

        return {
          x: posX,
          y: posY,
        };
    }

}
