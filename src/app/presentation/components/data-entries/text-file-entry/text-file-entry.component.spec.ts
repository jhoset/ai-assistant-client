import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFileEntryComponent } from './text-file-entry.component';

describe('TextMessageFileComponent', () => {
  let component: TextFileEntryComponent;
  let fixture: ComponentFixture<TextFileEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextFileEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextFileEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
