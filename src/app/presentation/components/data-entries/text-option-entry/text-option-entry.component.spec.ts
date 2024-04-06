import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextOptionEntryComponent } from './text-option-entry.component';

describe('TextMessageSelectComponent', () => {
  let component: TextOptionEntryComponent;
  let fixture: ComponentFixture<TextOptionEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextOptionEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextOptionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
