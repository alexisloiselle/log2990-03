import { Injectable } from "@angular/core";

@Injectable()
export class RaceAdministratorService {

  public constructor() { }

  /* RESPONSABILITÉS:
   * Retourne le lap auquel sont rendus les autos
   * Détermine lorsque la course commence et se termine
   * Simulation du temps des autres joueurs
   */
  public getLap(): number {
    /* Prends le lap où toutes les autos sont rendues et prends la maximale */
    return 1;
  }

}
