import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotMessageComponent } from './bot-message.component';

describe('ChatMessageComponent', () => {
  let component: BotMessageComponent;
  let fixture: ComponentFixture<BotMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
