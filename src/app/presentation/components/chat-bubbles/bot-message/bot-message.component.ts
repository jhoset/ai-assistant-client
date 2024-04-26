import {Component, Input} from '@angular/core';
import {MarkdownComponent} from "ngx-markdown";

@Component({
  selector: 'app-bot-message',
  standalone: true,
  imports: [
    MarkdownComponent
  ],
  templateUrl: './bot-message.component.html'
})
export class BotMessageComponent {
  @Input({required: true}) text!: string;
  @Input() audioUrl?: string;
  @Input() imageInfo?: { url: string, alt: string }
}
