import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcalcComponent } from './calcalc.component';

describe('CalcalcComponent', () => {
  let component: CalcalcComponent;
  let fixture: ComponentFixture<CalcalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcalcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
