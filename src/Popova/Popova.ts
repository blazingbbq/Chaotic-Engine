export interface masterPiece {
    palette: string[],
    posX: number,
    posY: number,
    width: number,
    height: number,
    facing: number,
    strokes: stroke[],
    freeHand?: boolean,
}

export interface stroke {
    cellX: number,
    cellY: number,
    width: number,
    height: number,
    swatch: number,
}

export interface mousePosition {
    x: number,
    y: number,
    outOfBounds: boolean,
}

export class Popova {

    private canvas: any;
    private ctx: any;
    private width: number;
    private height: number;
    private cubeSize: number = 12;

    constructor() { }

    /**
     * Initializes Popova's canvas
     * @param canvasId Id of html canvas element
     * @param cubeSize Render size for each cube when drawing with cubes
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
        this.ctx.strokeStyle = "#d0d0d0";
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

        this.prepCanvas(
            masterPiece.posX,
            masterPiece.posY,
            masterPiece.width,
            masterPiece.height,
            masterPiece.facing,
            masterPiece.freeHand);
        masterPiece.strokes.forEach((stroke: stroke) => {
            this.renderStroke(stroke, masterPiece.palette, masterPiece.freeHand);
        });

        this.ctx.restore();
    }

    /**
     * Centers the canvas on position, and rotates to a certain facing
     * @param positionX The x position of what is being drawn
     * @param positionY The y position of what is being drawn
     * @param width The width of what is being drawn
     * @param height The height of what is being drawn
     * @param degrees Degrees to rotate the canvas by
     * @param freeHand If the stroke is rendered with blocks or free hand
     */
    prepCanvas(positionX: number, positionY: number, width: number, height: number, degrees: number, freeHand?: boolean){
        this.ctx.beginPath();
        this.ctx.translate(positionX, positionY);
        this.ctx.rotate(degrees * Math.PI / 180);
        if (freeHand) {
            this.ctx.translate(- width / 2, - height / 2);
        } else {
            this.ctx.translate(- width * this.cubeSize / 2, - height * this.cubeSize / 2);
        }
    }

    /**
     * Renders 
     * @param stroke Stroke to render
     * @param palette Contains the master piece's color swatches
     * @param freeHand If the stroke is rendered with blocks or free hand
     */
    renderStroke(stroke: stroke, palette: string[], freeHand?: boolean){
        this.ctx.fillStyle = palette[stroke.swatch];
        if (freeHand){
            this.ctx.fillRect(stroke.cellX, stroke.cellY,
                stroke.width, stroke.height);
        } else {
            this.ctx.fillRect(stroke.cellX * this.cubeSize, stroke.cellY * this.cubeSize,
                stroke.width * this.cubeSize, stroke.height * this.cubeSize);
            }
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
    size(): { width: number, height: number } {
        return { width: this.width, height: this.height };
    }

    /**
     * Returns Popova's cube render size
     */
    getCubeSize(): number {
        return this.cubeSize;
    }

    /**
     * Sets Popova's cube render size
     * @param size Value for cube render size
     */
    setCubeSize(size: number) {
        this.cubeSize = size;
    }

    /**
     * Returns mouse position and if mouse is inside canvas
     * @param evt Mouse movement event, containing position information
     */
    getMousePos(evt: any): mousePosition {
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
    }

    drawText(text: string, posX: number, posY: number) {
        this.ctx.font = "16px Arial"
        this.ctx.fillText(text, posX, posY);
    }

}
