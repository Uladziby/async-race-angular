import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAboutComponent } from './dialog-about.component';

describe('DialogAboutComponent', () => {
  let component: DialogAboutComponent;
  let fixture: ComponentFixture<DialogAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
