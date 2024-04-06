import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [],
  templateUrl: './assistant.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AssistantComponent {

}
