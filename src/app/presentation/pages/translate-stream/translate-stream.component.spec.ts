import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateStreamComponent } from './translate-stream.component';

describe('TranslateStreamComponent', () => {
  let component: TranslateStreamComponent;
  let fixture: ComponentFixture<TranslateStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateStreamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranslateStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
