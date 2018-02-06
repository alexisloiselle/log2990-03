import { PointCoordinates } from "./pointCoordinates";
<<<<<<< HEAD
// import { BooleanKeyframeTrack } from "three";
=======
import { OnInit, Input } from "@angular/core";
import { Vector } from "./vector/vector";
>>>>>>> track-editor

/*Classe qui s'occuppe de manipuler le tableau de points.
C'est notre modèle.*/
export class TrackEditorModel {
    private pointArray: PointCoordinates[] = [];

<<<<<<< HEAD
    public getPointArray(): PointCoordinates[] {
=======
/*Classe qui s'occuppe de manipuler le canvas.*/ 
export class trackEditorModel implements OnInit {
    pointArray : PointCoordinates[] = [];
    @Input() vecArray: Vector[] = [];

    ngOnInit(){
        
    }

    getPointArray(){
>>>>>>> track-editor
        return this.pointArray;
    }

    public getPointArrayLength(): number {
        return this.pointArray.length;
    }

    public getSinglePoint(index: number): PointCoordinates {
        if (index >= 0 && index < this.pointArray.length) {
            return this.pointArray[index];
        }
<<<<<<< HEAD

        return new PointCoordinates(-1, -1);
    }

    public setPointCoordinates(index: number, mouseCoordinates: PointCoordinates): void {
        if (index >= 0 && index < this.pointArray.length) {
=======
        return new PointCoordinates(-1, -1);
    }
    setPointCoordinates(index: number, mouseCoordinates: PointCoordinates){
        if(index >= 0 && index < this.pointArray.length){
>>>>>>> track-editor
            this.pointArray[index].setX(mouseCoordinates.getX());
            this.pointArray[index].setY(mouseCoordinates.getY());
        }
    }

<<<<<<< HEAD
    public addPoint(point: PointCoordinates): void {
=======
    addPoint(point: PointCoordinates){
>>>>>>> track-editor
        this.pointArray.push(point);
    }

    public eraseLastPoint(): void {
        if (this.pointArray.length >= 1) {
            this.pointArray.splice(this.pointArray.length - 1);
        }
    }

    // On enlève les points potentiellement dupliqués par le drag and drop
    public removeDuplicatedPoints(): void {
        if (this.pointArray.length > 2) {
          // On commence à partir du deuxième point, car de toute façon le point
          // d'origine aura le dernier point qui se superposera à lui.
          for (let i: number = 1; i < this.pointArray.length - 1; i++) {
            for (let j: number = i + 1; j < this.pointArray.length; j++) {
              if (this.pointArray[i].getX() === this.pointArray[j].getX() &&
                  this.pointArray[i].getY() === this.pointArray[j].getY()) {
                  console.log("Point is " + j);
                  console.log(this.pointArray[j]);
                  this.pointArray.splice(this.pointArray.indexOf(this.pointArray[j]));
                }
            }
          }
        }
      }

    public loopIsClosed(): boolean {
        if (this.pointArray.length >= 3) {
            if (this.pointArray[this.pointArray.length - 1].getX() === this.pointArray[0].getX() &&
               this.pointArray[this.pointArray.length - 1].getY() === this.pointArray[0].getY()) {
                return true;
            }
        }

        return false;
    }

<<<<<<< HEAD
    public closeLoop(): void {
        const point: PointCoordinates = new PointCoordinates(this.pointArray[0].getX(), this.pointArray[0].getY());
        this.pointArray.push(point);
    }

    public clickedOnExistingPoint(mouseCoordinates: PointCoordinates): boolean {
        for (const point of this.pointArray) {
            if (mouseCoordinates.getX() >= point.getX() - 20 && mouseCoordinates.getX() <= point.getX() + 20 &&
                mouseCoordinates.getY() >= point.getY() - 20 && mouseCoordinates.getY() <= point.getY() + 20){
=======
    
    closeLoop(){
        let point : PointCoordinates = new PointCoordinates(this.pointArray[0].getX(), this.pointArray[0].getY());
        this.pointArray.push(point);     
    }

    clickedOnExistingPoint(mouseCoordinates: PointCoordinates){
        for(let point of this.pointArray){
            if(mouseCoordinates.getX() >= point.getX() - 20 && mouseCoordinates.getX() <= point.getX() + 20 &&
               mouseCoordinates.getY() >= point.getY() - 20 && mouseCoordinates.getY() <= point.getY() + 20){
>>>>>>> track-editor
                  return true;
              }
          }

        return false;
    }

<<<<<<< HEAD
    public clickedOnFirstPoint(mouseCoordinates: PointCoordinates): boolean {
        if ((mouseCoordinates.getX() <= this.pointArray[0].getX() + 10 && mouseCoordinates.getX() >= this.pointArray[0].getX() - 10) &&
           (mouseCoordinates.getY() <= this.pointArray[0].getY() + 10 && mouseCoordinates.getY() >= this.pointArray[0].getY() - 10) ) {
            return true;
        }

        return false;
    }
=======
    clickedOnFirstPoint(mouseCoordinates: PointCoordinates){
        if((mouseCoordinates.getX() <= this.pointArray[0].getX() + 10 && mouseCoordinates.getX() >= this.pointArray[0].getX() - 10) &&
           (mouseCoordinates.getY() <= this.pointArray[0].getY() + 10 && mouseCoordinates.getY() >= this.pointArray[0].getY() - 10) ){
            return true;;
        }
        return false;
      }     
>>>>>>> track-editor
}