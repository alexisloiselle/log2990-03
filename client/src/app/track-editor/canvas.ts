import { pointCoordinates } from "./pointCoordinates";
import { OnInit, ViewChild,ElementRef } from "@angular/core";


/*Classe qui s'occuppe de manipuler le canvas.*/ 
export class canvas implements OnInit {
    @ViewChild("canvas") 
    private canvasRef: ElementRef;
    private ctx : any;
   
  
    ngOnInit(){
        //We here initialise the canvas and get the context (ctx)
        this.ctx = this.canvasRef.nativeElement.getContext('2d');
        //we set the canvas height and width attribute
        this.canvasRef.nativeElement.height = 800;
        this.canvasRef.nativeElement.width = 800;
    }

    redrawCanvas(pointArray: pointCoordinates[]){
        this.eraseCanvas();
        //We redraw the points
        for(let i of pointArray){
         this.ctx.beginPath();
         this.ctx.arc(i.getX(), i.getY(), 9, 0, 2*Math.PI);
         this.ctx.fillStyle = "black";
         this.ctx.fill();
   
         if(pointArray.indexOf(i) === 0){
           this.ctx.beginPath();
           this.ctx.arc(i.getX(), i.getY(), 10, 0, 2*Math.PI);
           this.ctx.lineWidth = 5;
           this.ctx.strokeStyle = "blue";
           this.ctx.stroke();
           //We reset the line Width
           this.ctx.lineWidth = 2;
         }
         //We draw the lines back
         else{
           this.ctx.beginPath();
           this.ctx.moveTo(pointArray[pointArray.indexOf(i) - 1].getX(), 
                           pointArray[pointArray.indexOf(i)-1].getY());
           this.ctx.lineTo(i.getX(), i.getY());
           this.ctx.strokeStyle="black";
           this.ctx.stroke();
         }
       }
     }

     private eraseCanvas(){
       this.ctx.clearRect(0, 0, 800, 800);
     }

    drawPoint(point : pointCoordinates, pointArray: pointCoordinates[]){
        //if I clicked on a point and the arrayLength is superior to three
        if(pointArray.length >=3 && this.clickedOnFirstPoint(point.getX(), point.getY(), pointArray)){
          //this.canvasCloseLoop(); //I can close the circuit
        }else{
          this.ctx.beginPath();
          this.ctx.arc(point.getX(), point.getY(), 9, 0, 2*Math.PI);
          this.ctx.fillStyle = "#00FF00";
          this.ctx.fill();
    
          //this.pointArray.push(new pointCoordinates(x,y));
    
          if(pointArray.length == 1){
            this.ctx.beginPath();
            this.ctx.arc(point.getX(), point.getY(), 10, 0, 2*Math.PI);
            this.ctx.lineWidth = 5;
            this.ctx.strokeStyle = "blue";
            this.ctx.stroke();
            //We reset the line Width
            this.ctx.lineWidth = 2;
          }
        
        }
    }

    checkMouseFocus(pointArray: pointCoordinates[], mouseCoordinates: pointCoordinates){ //Checks if the mouse focus is on a point or not
        if(pointArray.length>0){
          for(let point of pointArray){
            if(mouseCoordinates.getX() >= point.getX() - 10 && mouseCoordinates.getX() <= point.getX() +10 &&
              mouseCoordinates.getY() >= point.getY() - 10 && mouseCoordinates.getY() <= point.getY() + 10){
                this.mouseOnPoint(point.getX(), point.getY());
              }else {
                this.mouseNotOnPoint(point.getX(), point.getY());
            }
          }  
        }
      }

  //If the focus is on the point, it becomes green
  mouseOnPoint(x: number, y: number){ 
    this.ctx.beginPath();
    this.ctx.arc(x, y, 10, 0, 2*Math.PI);
    this.ctx.fillStyle = "#00FF00";
    this.ctx.fill();
  }

  //If the focus is not on the point, it stays black 
  mouseNotOnPoint(x: number, y: number){ 
      this.ctx.beginPath();
      //TODO CREER ET PUSH VECTOR ICI
      //TODO INCREMENTER 
      this.ctx.arc(x, y, 9, 0, 2*Math.PI);
      this.ctx.fillStyle = "black";
      this.ctx.fill();
  }

  clickedOnExistingPoint(x: number, y: number, pointArray: pointCoordinates[]){
    for(let point of pointArray){
        if(x >= point.getX() - 20 && x <= point.getX() + 20 &&
          y >= point.getY() - 20 && y <= point.getY() + 20){
              return true;
          }
      }
    return false;
    }

  dragNDrop(pointArray: pointCoordinates[], mouseCoordinates: pointCoordinates){
    //Je trouve le point sur lequel il a cliqué
    // for(let point of pointArray){
    //   if(mouseCoordinates.getX() >= point.getX() - 15 && mouseCoordinates.getY() <= point.getX() +15 &&
    //      mouseCoordinates.getY() >= point.getY() - 15 && mouseCoordinates.getY() <= point.getY() + 15){
    //         this.pointArray[this.pointArray.indexOf(point)].setX(this.mouseMovedEvent.layerX);
    //         this.pointArray[this.pointArray.indexOf(point)].setY(this.mouseMovedEvent.layerY);
    //     }
    // }
    this.redrawCanvas(pointArray);
  }

  canvasDrawLine(pointArray: pointCoordinates[]){
    if(pointArray.length >= 2)
    {
      this.ctx.beginPath();
      this.ctx.moveTo(pointArray[pointArray.length-2].getX(), 
                      pointArray[pointArray.length-2].getY());
      this.ctx.lineTo(pointArray[pointArray.length-1].getX(), 
                      pointArray[pointArray.length-1].getY());
      this.ctx.strokeStyle="black";
      this.ctx.stroke();
    }
  }

  clickedOnFirstPoint(x: number, y: number, pointArray: pointCoordinates[]){
    if((x <= pointArray[0].getX() + 10 && x >= pointArray[0].getX() - 10) &&
       (y <= pointArray[0].getY() + 10 && y >= pointArray[0].getY() - 10)){
      return true;;
    }
    return false;
  }
  canvasCloseLoop(pointArray: pointCoordinates[]){
     this.ctx.beginPath();
     this.ctx.moveTo(pointArray[pointArray.length-1].getX(), 
                     pointArray[pointArray.length-1].getY());
     this.ctx.lineTo(pointArray[0].getX(), 
                     pointArray[0].getY());
     this.ctx.strokeStyle="black";
     this.ctx.stroke();
 
     //CANVAS.DRAWPOINT
   }
    
}