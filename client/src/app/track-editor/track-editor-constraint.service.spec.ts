import { TestBed, inject } from '@angular/core/testing';


import { TrackEditorConstraintService } from './track-editor-constraint.service';
import { PointCoordinates } from './pointCoordinates';
import { Vector } from './vector/vector';

describe("Track-Editor-Constraint", () => {

  const pointStart: PointCoordinates = new PointCoordinates(2, 6);
  const pointEnd: PointCoordinates = new PointCoordinates (1, 3);
  const pointLess45: PointCoordinates = new PointCoordinates(1, 2);
  const vectorTest: Vector = new Vector(pointStart, pointEnd);
  const vectorTestMoins45: Vector = new Vector(pointStart, pointLess45);
  
  it("Angle should be less than 45 degree", () => {
    expect((vectorTest.calculateAngle(vectorTestMoins45).toFixed(3))).toBe(((4.4 * Math.PI)/180).toFixed(3));
  });


});