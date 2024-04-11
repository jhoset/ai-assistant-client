import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-gpt-orthography-message',
  standalone: true,
  imports: [],
  templateUrl: './gpt-orthography-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptOrthographyMessageComponent {
  @Input({required: true}) userScore!: number;
  @Input({required: true}) text!: string;
  @Input() errors: string[] = [];
}
