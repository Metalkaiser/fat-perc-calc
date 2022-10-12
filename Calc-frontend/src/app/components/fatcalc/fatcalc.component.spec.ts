import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatcalcComponent } from './fatcalc.component';

describe('FatcalcComponent', () => {
  let component: FatcalcComponent;
  let fixture: ComponentFixture<FatcalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatcalcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FatcalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
