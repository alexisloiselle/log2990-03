import { Injectable } from "@angular/core";

@Injectable()
export class RaceAdministratorService {
  private isRaceOnGoing: boolean;

  public constructor() {
    this.isRaceOnGoing = true;
  }

  /* RESPONSABILITÉS:
   * Retourne le lap auquel sont rendus les autos
   * Détermine lorsque la course commence et se termine
   * Simulation du temps des autres joueurs
   */
  public getLap(): number {
    /* Lap où le player est arrivé */
    return 1;
  }

  public botController(): void {
    // if (this.isRaceOnGoing) {
    //   car.go();
    // }
    // else {

    // }
  }

}
