import { Component, OnInit } from '@angular/core';
import { Case } from '../Case';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  private cases: Case[][];

  constructor(x : number, y : number) { 
    this.cases = [];
    for (var i : number = 0; i < x; i++){
      this.cases[i] = [];
      for (var j : number = 0; j < y; j++){
        this.cases[i][j] = new Case();
      }
    }
  }

  ngOnInit() {
  }

}
