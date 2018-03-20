import { Injectable } from '@angular/core';
import { Car } from '../car/car';

@Injectable()
export class CarPositionService {

  constructor() { 

  }

  public isAutoOutOfTrack(car: Car) : boolean {
    return false;
  }

  public isAutoOutOfBound(car: Car): boolean {
    return false;
  }

}
