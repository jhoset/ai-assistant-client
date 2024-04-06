import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsConsStreamComponent } from './pros-cons-stream.component';

describe('ProsConsStreamComponent', () => {
  let component: ProsConsStreamComponent;
  let fixture: ComponentFixture<ProsConsStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProsConsStreamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProsConsStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
