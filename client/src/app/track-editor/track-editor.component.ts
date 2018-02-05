import { Component, OnInit, ElementRef, ViewChild} from "@angular/core";
// We need to import the pointCoordinates class
import { PointCoordinates } from "./pointCoordinates";
// import { Vector2 } from "three";
// import { vector } from "./vector/vector";

@Component({
  selector: "app-track-editor",
  templateUrl: "./track-editor.component.html",
  styleUrls: ["./track-editor.component.css"],
})

export class TrackEditorComponent implements OnInit {
  @ViewChild("canvas")
  private canvasRef: ElementRef;
  private pointArray: PointCoordinates[] = [];
  private ctx: any;
  // private currentPoint : number
  private mouseMovedEvent: any;  // So that each method can access the coordinates
                                  // at all times
  private mouseDown: boolean;    // Used for the drag and drop

  public constructor() {

  }

  public ngOnInit(): void {
    // We here initialise the canvas and get the context (ctx)
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    // we set the canvas height and width attribute
    this.canvasRef.nativeElement.height = 800;
    this.canvasRef.nativeElement.width = 800;

    // We initialise the mouseMovedEvent
    this.mouseMovedEvent = 0;
    // We initiali
    this.mouseDown = false;

  }

  canvasMouseUp(event: any){
    this.mouseDown = false;
    if (event.button === 0) {  // if it's a left click
        this.canvasDrawPoint(event.layerX, event.layerY);
        this.removeDragNDropDuplicate();
    }else if (event.button === 2) { // Si c'est un clic droit
      this.canvasEraseLastPoint();
    }
  }
  canvasMouseDown(event: any){
    this.mouseDown = true;
  }

  canvasMouseMoved(event: any){
    this.mouseMovedEvent = event;  // We stock the mouseCoordinates inside the mouseMovedEvent variable

    if (this.mouseDown){
      this.dragNDrop();
    }else{
      // On colore les points si le focus est sur l'un d'eux
      this.focusOnPoint();
    }
  }

  // Checks if there's duplicated points and removes them
  private removeDragNDropDuplicate(): void {
    if (this.pointArray.length > 2){
      for (let i: number = 1; i < this.pointArray.length - 1; i++){  // On commence à partir du deuxième point, car de toute façon le point d'ordigine aura le dernier point qui se superposera à lui.
        for (let j: number = i + 1; j < this.pointArray.length; j++){
          if (this.pointArray[i].getX() === this.pointArray[j].getX() &&
            this.pointArray[i].getY() === this.pointArray[j].getY()){
              this.pointArray.splice(this.pointArray.indexOf(this.pointArray[j]));
            }
        }
      }
      this.eraseCanvas();
      this.redrawCanvas();
    }
  }

  private focusOnPoint(): void { // Checks if the focus is on a point or not
    if (this.pointArray.length > 0) {
      for (const point of this.pointArray) {
        if (this.mouseMovedEvent.layerX >= point.getX() - 10 && this.mouseMovedEvent.layerX <= point.getX() + 10 &&
          this.mouseMovedEvent.layerY >= point.getY() - 10 && this.mouseMovedEvent.layerY <= point.getY() + 10){
            this.mouseOnPoint(point.getX(), point.getY());
          } else {
            this.mouseNotOnPoint(point.getX(), point.getY());
        }
      }
    }
  }

  // If the focus is on the point, it becomes green
  private mouseOnPoint(x: number, y: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 9, 0, Math.PI * 2);
    this.ctx.fillStyle = "#00FF00";
    this.ctx.fill();
  }

  // If the focus is not on the point, it stays black
  private mouseNotOnPoint(x: number, y: number): void {
      this.ctx.beginPath();
      // TODO CREER ET PUSH VECTOR ICI
      // TODO INCREMENTER
      this.ctx.arc(x, y, 9, 0, Math.PI * 2);
      this.ctx.fillStyle = "black";
      this.ctx.fill();
  }

  private clickedOnExistingPoint(x: number, y: number): boolean {
    for (let point of this.pointArray) {
        if (x >= point.getX() - 10 && x <= point.getX() + 10 &&
          y >= point.getY() - 10 && y <= point.getY() + 10) {
              return true;
          }
      }

    return false;
    }

  private dragNDrop(): void {
    // Je trouve le point sur lequel il a cliqué
    for (const point of this.pointArray) {
      if (this.mouseMovedEvent.layerX >= point.getX() - 10 && this.mouseMovedEvent.layerX <= point.getX() + 10 &&
        this.mouseMovedEvent.layerY >= point.getY() - 10 && this.mouseMovedEvent.layerY <= point.getY() + 10) {
            this.pointArray[this.pointArray.indexOf(point)].setX(this.mouseMovedEvent.layerX);
            this.pointArray[this.pointArray.indexOf(point)].setY(this.mouseMovedEvent.layerY);
        }
    }
    this.eraseCanvas();
    this.redrawCanvas();
  }

  public canvasCloseLoop(): void {
    console.log("Allo");
    this.ctx.beginPath();
    this.ctx.moveTo(this.pointArray[this.pointArray.length - 1].getX(),
                    this.pointArray[this.pointArray.length - 1].getY());
    this.ctx.lineTo(this.pointArray[0].getX(),
                    this.pointArray[0].getY());
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
  }

  public canvasDrawPoint(x: number, y: number): void {
    // if I clicked on a point and the arrayLength is superior to three
    if (this.pointArray.length >= 3 && this.clickedOnFirstPoint(x, y)) {
      this.canvasCloseLoop(); // I can close the circuit
    } else if (!this.clickedOnExistingPoint(x, y)) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, 9, 0, Math.PI * 2);
      this.ctx.fillStyle = "#00FF00";
      this.ctx.fill();

      this.pointArray.push(new PointCoordinates(x, y));

      if (this.pointArray.length === 1) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 10, 0, Math.PI * 2);
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke();
        // We reset the line Width
        this.ctx.lineWidth = 2;
      }

      this.canvasDrawLine();
    }
  }

  public canvasDrawLine(): void {
    if (this.pointArray.length >= 2) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.pointArray[this.pointArray.length - 2].getX(),
                      this.pointArray[this.pointArray.length - 2].getY());
      this.ctx.lineTo(this.pointArray[this.pointArray.length - 1].getX(),
                      this.pointArray[this.pointArray.length - 1].getY());
      this.ctx.strokeStyle = "black";
      this.ctx.stroke();
    }
  }
  public redrawCanvas(): void {
     // We redraw the points
     for (const i of this.pointArray) {
      this.ctx.beginPath();
      this.ctx.arc(i.getX(), i.getY(), 9, 0, Math.PI * 2);
      this.ctx.fillStyle = "black";
      this.ctx.fill();

      if (this.pointArray.indexOf(i) === 0) {
        this.ctx.beginPath();
        this.ctx.arc(i.getX(), i.getY(), 10, 0, Math.PI * 2);
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke();
        // We reset the line Width
        this.ctx.lineWidth = 2;
      }
      // We draw the lines back
      if (this.pointArray.indexOf(i) !== 0 ) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.pointArray[this.pointArray.indexOf(i) - 1].getX(),
                        this.pointArray[this.pointArray.indexOf(i) - 1].getY());
        this.ctx.lineTo(i.getX(), i.getY());
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();

      }
    }
  }
  public eraseCanvas(): void {
    this.ctx.clearRect(0, 0, 800, 800);
  }

  public canvasEraseLastPoint(): void {
    this.pointArray.splice(this.pointArray.length - 1);

    // We clear the canvas
    this.eraseCanvas();

    this.redrawCanvas();

  }

  public clickedOnFirstPoint(x: number, y: number): boolean {
    let clickedOnFirstPoint: boolean = false;

    if ((x <= this.pointArray[0].getX() + 10 && x >= this.pointArray[0].getX() - 10) &&
    (y <= this.pointArray[0].getY() + 10 && y >= this.pointArray[0].getY() - 10) ) {
      clickedOnFirstPoint = true;
    }

    return clickedOnFirstPoint;
  }
}
