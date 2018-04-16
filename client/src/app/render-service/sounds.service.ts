import { Injectable } from "@angular/core";
import * as THREE from "three";

const INITIAL_VOLUME: number = 0.3;

@Injectable()
export class SoundsService {
  public audioListener: THREE.AudioListener;
  public startingSound: THREE.Audio;

  public constructor() { }

  public playSound(soundName: string): void {
    this.audioListener = new THREE.AudioListener();
    this.startingSound = new THREE.Audio(this.audioListener);
    const audioLoader: THREE.AudioLoader = new THREE.AudioLoader();
    audioLoader.load(
      soundName,
      (audioBuffer: THREE.AudioBuffer) => {
                this.startingSound.setBuffer(audioBuffer);
                this.startingSound.setVolume(INITIAL_VOLUME);
                this.startingSound.setLoop(false);
                this.startingSound.play();
            },
      () => { },
      () => { });
  }

}
