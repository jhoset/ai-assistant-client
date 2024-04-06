import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthographyComponent } from './orthography.component';

describe('OrthographyComponent', () => {
  let component: OrthographyComponent;
  let fixture: ComponentFixture<OrthographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrthographyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrthographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
