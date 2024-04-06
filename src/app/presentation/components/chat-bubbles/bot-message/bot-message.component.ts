import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-bot-message',
  standalone: true,
  imports: [],
  templateUrl: './bot-message.component.html'
})
export class BotMessageComponent {
  @Input({required: true}) text!: string;
}
