import { Component, OnInit, ElementRef, ViewChild} from "@angular/core";

//We need to import the pointCoordinates class
import { pointCoordinates } from "./pointCoordinates";
import { Vector2 } from "three";
import { vector } from "./vector";
import { TrackEditorVectorService } from "./track-editor-vector.service";


@Component({
  selector: "app-track-editor",
  templateUrl: "./track-editor.component.html",
  styleUrls: ["./track-editor.component.css"],
  providers: [TrackEditorVectorService]
})
export class TrackEditorComponent implements OnInit {
  @ViewChild("canvas") 
  private canvasRef: ElementRef;
  private pointArray: pointCoordinates[] = [];
  private ctx : any;
  private currentPoint : number // rajout jeremie
  private vectorArray : vector[] = [];
  
  constructor(private trackEditorVectorService : TrackEditorVectorService) {}
  

  ngOnInit() {
    //We here initialise the canvas and get the context (ctx)
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    //we set the canvas height and width attribute
    this.canvasRef.nativeElement.height = 800;
    this.canvasRef.nativeElement.width = 800;
  }

  canvasClicked(event : any){
    //console.log(this.canvasRef.nativeElement.offsetTop + " " +this.canvasRef.nativeElement.offsetLeft)
    //console.log(event);
    //We draw the dots on the canvas using the event's layerX and layerY properties
    this.ctx.beginPath();
    this.ctx.arc(event.layerX, event.layerY, 9, 0, 2*Math.PI);
    this.ctx.fill();
    
    //CREER VECTOR AVEC LE event.layerX, event.layerY et pointArray[currentPoint]
    let pointClicked= new pointCoordinates(event.layerX, event.layerY)
    this.trackEditorVectorService.createNewVector(pointClicked, this.pointArray[this.currentPoint]); //ajout jeremie
    this.vectorArray.push()
    this.pointArray.push(pointClicked);
    this.currentPoint++; //Ajout jeremie

    this.canvasDrawLine();
    console.log(this.pointArray[this.pointArray.length - 1].getX() + " " + this.pointArray[this.pointArray.length - 1].getY());
  }

  canvasDrawLine(){
    if(this.pointArray.length >= 2)
    {
      this.ctx.beginPath();
      this.ctx.moveTo(this.pointArray[this.pointArray.length-2].getX(), 
                      this.pointArray[this.pointArray.length-2].getY());
      this.ctx.lineTo(this.pointArray[this.pointArray.length-1].getX(), 
                      this.pointArray[this.pointArray.length-1].getY());
      this.ctx.stroke();
    }
  }

  // public angleCalculatorWithPreviousPoint(pointX:number, pointY: number) {
  //   var previousPointX : Number = this.pointArray[this.currentPoint].getX();
  //   var previousPointY : Number = this.pointArray[this.currentPoint].getY();
  // }

}
