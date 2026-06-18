import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBooker } from './flight-booker';

describe('FlightBooker', () => {
  let component: FlightBooker;
  let fixture: ComponentFixture<FlightBooker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightBooker]
    }).compileComponents();

    fixture = TestBed.createComponent(FlightBooker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true when return flight is selected', () => {
    component.flightType.setValue('return');

    expect(component.isReturnFlight()).toBeTrue();
  });
});