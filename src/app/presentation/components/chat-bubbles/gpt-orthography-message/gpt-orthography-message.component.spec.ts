import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GptOrthographyMessageComponent } from './gpt-orthography-message.component';

describe('GptOrthographyMessageComponent', () => {
  let component: GptOrthographyMessageComponent;
  let fixture: ComponentFixture<GptOrthographyMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GptOrthographyMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GptOrthographyMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
