import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoableCounter } from './undoable-counter';

describe('UndoableCounter', () => {
  let component: UndoableCounter;
  let fixture: ComponentFixture<UndoableCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UndoableCounter],
    }).compileComponents();

    fixture = TestBed.createComponent(UndoableCounter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
