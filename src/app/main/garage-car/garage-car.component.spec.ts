import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageCarComponent } from './garage-car.component';

describe('GarageCarComponent', () => {
  let component: GarageCarComponent;
  let fixture: ComponentFixture<GarageCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarageCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarageCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
