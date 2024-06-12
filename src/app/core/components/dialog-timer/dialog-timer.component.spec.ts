import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTimerComponent } from './dialog-timer.component';

describe('DialogTimerComponent', () => {
  let component: DialogTimerComponent;
  let fixture: ComponentFixture<DialogTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTimerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
