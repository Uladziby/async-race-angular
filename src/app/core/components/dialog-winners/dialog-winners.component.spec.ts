import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWinnersComponent } from './dialog-winners.component';

describe('DialogWinnersComponent', () => {
  let component: DialogWinnersComponent;
  let fixture: ComponentFixture<DialogWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogWinnersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
