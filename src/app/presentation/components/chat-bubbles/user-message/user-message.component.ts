import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-message',
  standalone: true,
  imports: [],
  templateUrl: './user-message.component.html'
})
export class UserMessageComponent {
  @Input({required: true}) text!: string;
}
