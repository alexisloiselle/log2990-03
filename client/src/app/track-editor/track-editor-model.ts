import { pointCoordinates } from "./pointCoordinates";
import { OnInit } from "@angular/core";


/*Classe qui s'occuppe de manipuler le canvas.*/ 
export class trackEditorModel implements OnInit {
    private pointArray : pointCoordinates[] = [];

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
        return new pointCoordinates(-1, -1);
    }
    setPointCoordinates(index: number, mouseCoordinates: pointCoordinates){
        if(index >= 0 && index < this.pointArray.length){
            this.pointArray[index].setX(mouseCoordinates.getX());
            this.pointArray[index].setY(mouseCoordinates.getY());
        }
        
    }

    addPoint(point: pointCoordinates){
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
        let point : pointCoordinates = new pointCoordinates(this.pointArray[0].getX(), this.pointArray[0].getY());
        this.pointArray.push(point);     
    }

    clickedOnExistingPoint(mouseCoordinates: pointCoordinates){
        for(let point of this.pointArray){
            if(mouseCoordinates.getX() >= point.getX() - 20 && mouseCoordinates.getX() <= point.getX() + 20 &&
               mouseCoordinates.getY() >= point.getY() - 20 && mouseCoordinates.getY() <= point.getY() + 20){
                  return true;
              }
          }
        return false;
    }

    clickedOnFirstPoint(mouseCoordinates: pointCoordinates){
        if((mouseCoordinates.getX() <= this.pointArray[0].getX() + 10 && mouseCoordinates.getX() >= this.pointArray[0].getX() - 10) &&
           (mouseCoordinates.getY() <= this.pointArray[0].getY() + 10 && mouseCoordinates.getY() >= this.pointArray[0].getY() - 10) ){
            return true;;
        }
    
        return false;
      }
     
}