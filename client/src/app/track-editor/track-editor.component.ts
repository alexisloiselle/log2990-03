<<<<<<< HEAD
import { Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import { Event } from "_debugger";
//We need to import the pointCoordinates class
import { pointCoordinates } from "./pointCoordinates";
=======
import { Component, OnInit } from "@angular/core";
>>>>>>> b62e974b238c86ad09953429f293e2c58a3aca20

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
  
  constructor() { 
    
  }

  ngOnInit() {
    //We here initialise the canvas and get the context (ctx)
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    //we set the canvas height and width attribute
    this.canvasRef.nativeElement.height = 800;
    this.canvasRef.nativeElement.width = 800;
  }

  canvasClicked(event : Event){
    //console.log(this.canvasRef.nativeElement.offsetTop + " " +this.canvasRef.nativeElement.offsetLeft)
    //console.log(event);
    //We draw the dots on the canvas using the event's layerX and layerY properties
    this.ctx.beginPath();
    this.ctx.arc(event.layerX, event.layerY, 9, 0, 2*Math.PI);
    this.ctx.fill();

    this.pointArray.push(new pointCoordinates(event.layerX, event.layerY));

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

}
