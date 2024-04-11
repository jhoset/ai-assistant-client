import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {IMessage} from '@interfaces/index';
import {OpenAiService} from "../../services/open-ai.service";
import {
  BotMessageComponent, GptOrthographyMessageComponent,
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
    GptOrthographyMessageComponent,
  ],
  templateUrl: './orthography.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyComponent {

  public messages = signal<IMessage[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public handleTextEntry({prompt}: ITextEntryEvent) {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, {isGpt: false, text: prompt}])

    this.openAiService.checkOrthography(prompt).subscribe(result => {
      this.isLoading.set(false);
      this.messages.update((prev) => [
        ...prev,
        { isGpt: true, text: result.message, info: result }
    ])
    })
  }
}
