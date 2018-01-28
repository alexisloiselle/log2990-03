import { Component, OnInit, ElementRef, ViewChild} from "@angular/core";
//We need to import the pointCoordinates class
import { pointCoordinates } from "./pointCoordinates";

@Component({
  selector: "app-track-editor",
  templateUrl: "./track-editor.component.html",
  styleUrls: ["./track-editor.component.css"]
})
 
export class TrackEditorComponent implements OnInit {
  @ViewChild("canvas") 
  private canvasRef: ElementRef;
  private pointArray: pointCoordinates[] = [];
  private ctx : any;
  private mouseMovedEvent : any;  //So that each method can access the coordinates
                                  //at all times
  private mouseDown : boolean;    //Used for the drag and drop
  
  constructor() { 
     
  }

  ngOnInit() {
    //We here initialise the canvas and get the context (ctx)
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    //we set the canvas height and width attribute
    this.canvasRef.nativeElement.height = 800;
    this.canvasRef.nativeElement.width = 800;

    //We initialise the mouseMovedEvent
    this.mouseMovedEvent = 0;
    //We initiali
    this.mouseDown = false;
  }

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

  canvasMouseUp(event: any){
    this.mouseDown = false;
    if(event.button === 0) {  //if it's a left click
        this.canvasDrawPoint(event.layerX, event.layerY);
    }else if (event.button === 2) { //Si c'est un clic droit
      this.canvasEraseLastPoint();
    }
  }

  canvasMouseDown(event: any){
    this.mouseDown = true;
  }

  canvasMouseMoved(event: any){
    this.mouseMovedEvent = event;  //We stock the mouseCoordinates inside the mouseMovedEvent variable

    if(!this.mouseDown){  
      this.focusOnPoint();
    }else{
      this.dragNDrop();
    }
  }


  private focusOnPoint(){ //Checks if the focus is on the point or not
    if(this.pointArray.length>0){
      for(let point of this.pointArray){
        if(this.mouseMovedEvent.layerX >= point.getX() - 10 && this.mouseMovedEvent.layerX <= point.getX() +10 &&
          this.mouseMovedEvent.layerY >= point.getY() - 10 && this.mouseMovedEvent.layerY <= point.getY() + 10){
            this.mouseOnPoint(point.getX(), point.getY());
          }
        else{
            this.mouseNotOnPoint(point.getX(), point.getY());
        }
      }  
    }
  }

  private mouseOnPoint(x: number, y: number){ //If the focus is on the point, it becomes green
    this.ctx.beginPath();
    this.ctx.arc(x, y, 9, 0, 2*Math.PI);
    this.ctx.fillStyle = "#00FF00";
    this.ctx.fill();
  }

  private mouseNotOnPoint(x: number, y: number){ //If the focus is not on the point, it stays black 
      this.ctx.beginPath();
      this.ctx.arc(x, y, 9, 0, 2*Math.PI);
      this.ctx.fillStyle = "black";
      this.ctx.fill();
  }

  

  private clickedOnExistingPoint(x: number, y: number){
    for(let point of this.pointArray){
        if(x >= point.getX() - 10 && x <= point.getX() +10 &&
          y >= point.getY() - 10 && y <= point.getY() + 10){
              return true;
          }
      }
                                      return false;
                          }
  private dragNDrop(){
    //Je trouve le point sur lequel il a cliqué
    for(let point of this.pointArray){
      if(this.mouseMovedEvent.layerX >= point.getX() - 10 && this.mouseMovedEvent.layerX <= point.getX() +10 &&
        this.mouseMovedEvent.layerY >= point.getY() - 10 && this.mouseMovedEvent.layerY <= point.getY() + 10){
            this.pointArray[this.pointArray.indexOf(point)].setX(this.mouseMovedEvent.layerX);
            this.pointArray[this.pointArray.indexOf(point)].setY(this.mouseMovedEvent.layerY);
        }
    }
    this.eraseCanvas();
    this.redrawCanvas();
  }
  



  

  canvasCloseLoop(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.pointArray[this.pointArray.length-1].getX(), 
                      this.pointArray[this.pointArray.length-1].getY());
    this.ctx.lineTo(this.pointArray[0].getX(), 
                      this.pointArray[0].getY());
    this.ctx.strokeStyle="black";
    this.ctx.stroke();
  }


  canvasDrawPoint(x : number, y : number){
    //if I clicked on a point and the arrayLength is superior to three
    if(this.pointArray.length >=3 && this.clickedOnFirstPoint(x, y)){
      this.canvasCloseLoop(); //I can close the circuit
    }else if(!this.clickedOnExistingPoint(x, y)){
      this.ctx.beginPath();
      this.ctx.arc(x, y, 9, 0, 2*Math.PI);
      this.ctx.fillStyle = "#00FF00";
      this.ctx.fill();

      this.pointArray.push(new pointCoordinates(x,y));

      if(this.pointArray.length == 1){
        this.ctx.beginPath();
        this.ctx.arc(x, y, 10, 0, 2*Math.PI);
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke();
        //We reset the line Width
        this.ctx.lineWidth = 2;
      }
      
      this.canvasDrawLine();
    }
  }


  canvasDrawLine(){
    if(this.pointArray.length >= 2)
    {
      this.ctx.beginPath();
      this.ctx.moveTo(this.pointArray[this.pointArray.length-2].getX(), 
                      this.pointArray[this.pointArray.length-2].getY());
      this.ctx.lineTo(this.pointArray[this.pointArray.length-1].getX(), 
                      this.pointArray[this.pointArray.length-1].getY());
      this.ctx.strokeStyle="black";
      this.ctx.stroke();
    }
  }
  redrawCanvas(){
     //We redraw the points
     for(let i of this.pointArray){
      this.ctx.beginPath();
      this.ctx.arc(i.getX(), i.getY(), 9, 0, 2*Math.PI);
      this.ctx.fillStyle = "black";
      this.ctx.fill();

      if(this.pointArray.indexOf(i) === 0){
        this.ctx.beginPath();
        this.ctx.arc(i.getX(), i.getY(), 10, 0, 2*Math.PI);
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke();
        //We reset the line Width
        this.ctx.lineWidth = 2;
      }
      //We draw the lines back
      if(this.pointArray.indexOf(i) != 0 ){
        this.ctx.beginPath();
        this.ctx.moveTo(this.pointArray[this.pointArray.indexOf(i) - 1].getX(), 
                      this.pointArray[this.pointArray.indexOf(i)-1].getY());
        this.ctx.lineTo(i.getX(), i.getY());
        this.ctx.strokeStyle="black";
        this.ctx.stroke();
        
        
      }
    }
  }
  eraseCanvas(){
    this.ctx.clearRect(0, 0, 800, 800);
  }

  canvasEraseLastPoint(){
    this.pointArray.splice(this.pointArray.length-1);

    //We clear the canvas
    this.eraseCanvas();

    this.redrawCanvas();
   
  }
  
  clickedOnFirstPoint(x: number, y: number){
    let clickedOnFirstPoint: boolean = false;

    if((x <= this.pointArray[0].getX() + 10 && x >= this.pointArray[0].getX() - 10) &&
    (y <= this.pointArray[0].getY() + 10 && y >= this.pointArray[0].getY() - 10) ){
      clickedOnFirstPoint = true;
    }

    return clickedOnFirstPoint;
  }
}