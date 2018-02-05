import { PointCoordinates } from "./pointCoordinates";
import { OnInit, Input } from "@angular/core";
import { Vector } from "./vector/vector";


/*Classe qui s'occuppe de manipuler le canvas.*/ 
export class trackEditorModel implements OnInit {
    pointArray : PointCoordinates[] = [];
    @Input() vecArray: Vector[] = [];

    ngOnInit(){
        
    }

    getPointArray(){
        return this.pointArray;
    }

    getPointArrayLength(){
        return this.pointArray.length;
    }

    getSinglePoint(index: number){
        if(index >= 0 && index <this.pointArray.length){
            return this.pointArray[index];
        }
        return new PointCoordinates(-1, -1);
    }
    setPointCoordinates(index: number, mouseCoordinates: PointCoordinates){
        if(index >= 0 && index < this.pointArray.length){
            this.pointArray[index].setX(mouseCoordinates.getX());
            this.pointArray[index].setY(mouseCoordinates.getY());
        }
        
    }

    addPoint(point: PointCoordinates){
        this.pointArray.push(point);
    }


    eraseLastPoint(){
        if(this.pointArray.length >= 1){
            this.pointArray.splice(this.pointArray.length - 1);
        }
    }

    

    //On enlève les points potentiellement dupliqués par le drag and drop
    removeDuplicatedPoints(){
        if(this.pointArray.length > 2){
          for(let i: number = 1; i<this.pointArray.length - 1; i++){  //On commence à partir du deuxième point, car de toute façon le point d'ordigine aura le dernier point qui se superposera à lui.
            for(let j: number = i+1; j<this.pointArray.length; j++){
              if(this.pointArray[i].getX() == this.pointArray[j].getX()&&
                this.pointArray[i].getY() == this.pointArray[j].getY()){
                  this.pointArray.splice(this.pointArray.indexOf(this.pointArray[j]));
                }
            }
          }
        }
      }

    loopIsClosed(){
        if(this.pointArray.length >= 3){
            if(this.pointArray[this.pointArray.length - 1].getX() == this.pointArray[0].getX() &&
              this.pointArray[this.pointArray.length - 1].getY() == this.pointArray[0].getY()){
                return true;
              }
          }
         return false;
    }

    
    closeLoop(){
        let point : PointCoordinates = new PointCoordinates(this.pointArray[0].getX(), this.pointArray[0].getY());
        this.pointArray.push(point);     
    }

    clickedOnExistingPoint(mouseCoordinates: PointCoordinates){
        for(let point of this.pointArray){
            if(mouseCoordinates.getX() >= point.getX() - 20 && mouseCoordinates.getX() <= point.getX() + 20 &&
               mouseCoordinates.getY() >= point.getY() - 20 && mouseCoordinates.getY() <= point.getY() + 20){
                  return true;
              }
          }
        return false;
    }

    clickedOnFirstPoint(mouseCoordinates: PointCoordinates){
        if((mouseCoordinates.getX() <= this.pointArray[0].getX() + 10 && mouseCoordinates.getX() >= this.pointArray[0].getX() - 10) &&
           (mouseCoordinates.getY() <= this.pointArray[0].getY() + 10 && mouseCoordinates.getY() >= this.pointArray[0].getY() - 10) ){
            return true;;
        }
    
        return false;
      }
     
}