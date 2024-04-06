import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {IMessage} from '@interfaces/index';
import {OpenAiService} from "../../services/open-ai.service";
import {
  BotMessageComponent,
  ITextAndFileEntryEvent, ITextAndSelectedOptEntryEvent,
  ITextEntryEvent,
  TextEntryComponent,
  TextFileEntryComponent,
  TextOptionEntryComponent, TypingLoaderComponent, UserMessageComponent
} from '@components/index';


@Component({
  selector: 'app-orthography',
  standalone: true,
  imports: [
    BotMessageComponent,
    UserMessageComponent,
    TypingLoaderComponent,
    TextEntryComponent,
    TextFileEntryComponent,
    TextOptionEntryComponent,
  ],
  templateUrl: './orthography.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyComponent {

  public messages = signal<IMessage[]>([{text: 'Hello World', isGpt: false}]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public handleTextEntry({prompt}: ITextEntryEvent) {
    console.log({prompt})
  }

  public handleTextAndFileEntry({prompt, file}: ITextAndFileEntryEvent) {
    console.log({prompt, file})
  }

  public handleTextAndSelectedOptEntry({prompt, option}: ITextAndSelectedOptEntryEvent) {
    console.log({prompt, option})
  }
}
