import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTunningComponent } from './image-tunning.component';

describe('ImageTunningComponent', () => {
  let component: ImageTunningComponent;
  let fixture: ComponentFixture<ImageTunningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageTunningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageTunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
