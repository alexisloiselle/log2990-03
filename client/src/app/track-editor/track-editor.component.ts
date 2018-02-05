import { Component, OnInit, ElementRef, ViewChild} from "@angular/core";
//We need to import the pointCoordinates class
import { pointCoordinates } from "./pointCoordinates";
import { trackEditorModel } from "./track-editor-model";
//import { Vector2 } from "three";
//import { vector } from "./vector/vector";


@Component({
  selector: "app-track-editor",
  templateUrl: "./track-editor.component.html",
  styleUrls: ["./track-editor.component.css"],
})
 
export class TrackEditorComponent implements OnInit {
  @ViewChild("canvas") 
  private canvasRef: ElementRef;
  private ctx : any;
  //private currentPoint : number 
  private mouseMovedEvent : any;  //So that each method can access the coordinates
                                  //at all times
  private mouseDown : boolean;    //Used for the drag and drop
  private myTrackEditorModel : trackEditorModel;
  

  ngOnInit() {
    //We here initialise the canvas and get the context (ctx)
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    //we set the canvas height and width attribute
    this.canvasRef.nativeElement.height = 800;
    this.canvasRef.nativeElement.width = 800;

    //We initialise the mouseMovedEvent
    this.mouseMovedEvent = 0;
    //We initialise the mouse down event to false
    this.mouseDown = false;
    //We instanciate the model
    this.myTrackEditorModel = new trackEditorModel;

  }

  canvasMouseDown(event: any){
    this.mouseDown = true;
  }

  canvasMouseUp(event: any){
    this.mouseDown = false;
    let mouseCoordinates : pointCoordinates = new pointCoordinates(event.layerX, event.layerY);
    //If it's a left click and the loop is not closed
    if(event.button === 0 && !this.myTrackEditorModel.loopIsClosed()) {
        this.canvasDrawPoint(mouseCoordinates);
    }else if (event.button === 2) { //If it's a right click
      this.canvasEraseLastPoint();
    }

    //The points can be absorbed if you do a drag and
    //drop. We make sure the array doesn't contain any duplicated
    //points with this function.
    this.removeDuplicatedPoints();
  }
  
  
  canvasMouseMoved(event: any){
    this.mouseMovedEvent = event;  //We stock the mouseCoordinates inside the mouseMovedEvent variable

    if(this.mouseDown){  
      this.dragNDrop();
    }else{ //On colore les points si le focus est sur l'un d'eux
      this.checkMouseFocus();
    }
  }

  removeDuplicatedPoints(){
    this.myTrackEditorModel.removeDuplicatedPoints();   
    this.redrawCanvas();
  }

  canvasEraseLastPoint(){
    this.myTrackEditorModel.eraseLastPoint();
    this.redrawCanvas();
   
  }

  drawLineOnCanvas(point1: pointCoordinates, point2: pointCoordinates){
    this.ctx.beginPath();
    this.ctx.moveTo(this.myTrackEditorModel.getSinglePoint(this.myTrackEditorModel.getPointArrayLength() - 2).getX(), 
                    this.myTrackEditorModel.getSinglePoint(this.myTrackEditorModel.getPointArrayLength() - 2).getY());
    this.ctx.lineTo(this.myTrackEditorModel.getSinglePoint(0).getX(), 
                    this.myTrackEditorModel.getSinglePoint(0).getY());
    this.ctx.strokeStyle="black";
    this.ctx.stroke();
  }
  drawPointOnCanvas(point:pointCoordinates, color: string, size: number){
    this.ctx.beginPath();
    this.ctx.arc(point.getX(), point.getY(), size, 0, 2*Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  canvasCloseLoop(){
    this.myTrackEditorModel.closeLoop();

    let point1:pointCoordinates = this.myTrackEditorModel.getSinglePoint(this.myTrackEditorModel.getPointArrayLength() - 2);
    let point2: pointCoordinates = this.myTrackEditorModel.getSinglePoint(0);
    this.drawLineOnCanvas(point1, point2);
 
 
   }

  checkMouseFocus(){ //Checks if the focus is on a point or not
    if(this.myTrackEditorModel.getPointArrayLength()>0){
      for(let point of this.myTrackEditorModel.getPointArray()){
        if(this.mouseMovedEvent.layerX >= point.getX() - 10 && this.mouseMovedEvent.layerX <= point.getX() +10 &&
          this.mouseMovedEvent.layerY >= point.getY() - 10 && this.mouseMovedEvent.layerY <= point.getY() + 10){
            this.mouseOnPoint(point.getX(), point.getY());
          }else {
            this.mouseNotOnPoint(point.getX(), point.getY());
        }
      }  
    }
  }

  //If the focus is on the point, it becomes green
  mouseOnPoint(x: number, y: number){ 
    let tempPoint :pointCoordinates = new pointCoordinates(x, y);
    this.drawPointOnCanvas(tempPoint, "#00FF00", 10);
  }

  //If the focus is not on the point, it stays black 
  mouseNotOnPoint(x: number, y: number){ 
     //TODO CREER ET PUSH VECTOR ICI
      //TODO INCREMENTER 
      let tempPoint :pointCoordinates = new pointCoordinates(x, y);
      this.drawPointOnCanvas(tempPoint, "black", 9);
      
  }

  clickedOnExistingPoint(x: number, y: number){
    for(let point of this.myTrackEditorModel.getPointArray()){
        if(x >= point.getX() - 20 && x <= point.getX() + 20 &&
          y >= point.getY() - 20 && y <= point.getY() + 20){
              return true;
          }
      }
    return false;
    }

  dragNDrop(){
    let mouseCoordinates: pointCoordinates = new pointCoordinates(this.mouseMovedEvent.layerX, this.mouseMovedEvent.layerY);
    //Je trouve le point sur lequel il a cliqué
    for(let point of this.myTrackEditorModel.getPointArray()){
      if(this.mouseMovedEvent.layerX >= point.getX() - 15 && this.mouseMovedEvent.layerX <= point.getX() +15 &&
        this.mouseMovedEvent.layerY >= point.getY() - 15 && this.mouseMovedEvent.layerY <= point.getY() + 15){
            
          this.myTrackEditorModel.setPointCoordinates(this.myTrackEditorModel.getPointArray().indexOf(point), mouseCoordinates);
        }
    }
    this.eraseCanvas();
    this.redrawCanvas();
  }
  


  canvasDrawPoint(mouseCoordinates: pointCoordinates){
    //if I clicked on a point and the arrayLength is superior to three
    if(this.myTrackEditorModel.getPointArrayLength() >=3 && this.myTrackEditorModel.clickedOnFirstPoint(mouseCoordinates)){
      this.canvasCloseLoop(); //I can close the circuit
    }else if(!this.myTrackEditorModel.clickedOnExistingPoint(mouseCoordinates)){
      this.myTrackEditorModel.addPoint(mouseCoordinates);

      this.drawPointOnCanvas(mouseCoordinates, "#00FF00", 10);

      if(this.myTrackEditorModel.getPointArrayLength() == 1){
        this.ctx.beginPath();
        this.ctx.arc(mouseCoordinates.getX(), mouseCoordinates.getY(), 10, 0, 2*Math.PI);
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke();
        //We reset the line Width
        this.ctx.lineWidth = 2;
      }
      this.canvasDrawLine();
    }
  }


  canvasDrawLine(){
    if(this.myTrackEditorModel.getPointArrayLength() >= 2)
    {
      let point1: pointCoordinates = this.myTrackEditorModel.getSinglePoint(this.myTrackEditorModel.getPointArrayLength() - 2);
      let point2: pointCoordinates = this.myTrackEditorModel.getSinglePoint(this.myTrackEditorModel.getPointArrayLength()-1);
      this.drawLineOnCanvas(point1, point2);

    }
  }

  redrawCanvas(){
    this.eraseCanvas();
    // We redraw the points
     for(let i of this.myTrackEditorModel.getPointArray()){
      this.drawPointOnCanvas(i, "black", 9);

      //We redraw the shit for the point
      if(this.myTrackEditorModel.getPointArray().indexOf(i) === 0){
        this.ctx.beginPath();
        this.ctx.arc(i.getX(), i.getY(), 10, 0, 2*Math.PI);
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke();
        //We reset the line Width
        this.ctx.lineWidth = 2;
      }
     // We draw the lines back
      else{
        this.ctx.beginPath();
        this.ctx.moveTo(this.myTrackEditorModel.getSinglePoint(this.myTrackEditorModel.getPointArray().indexOf(i)-1).getX(), 
                        this.myTrackEditorModel.getSinglePoint(this.myTrackEditorModel.getPointArray().indexOf(i)-1).getY());
        this.ctx.lineTo(i.getX(), i.getY());
        this.ctx.strokeStyle="black";
        this.ctx.stroke();
        
        
      }
    }
  }

  eraseCanvas(){
    this.ctx.clearRect(0, 0, 800, 800);
  }

}
