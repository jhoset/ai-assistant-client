import {Component, inject, signal} from '@angular/core';
import {
  BotMessageComponent,
  ITextAndFileEntryEvent,
  ITextAndSelectedOptEntryEvent,
  ITextEntryEvent, TextEntryComponent, TextFileEntryComponent, TextOptionEntryComponent,
  TypingLoaderComponent, UserMessageComponent
} from '@components/index';
import {IMessage} from "@interfaces/message.interface";
import {OpenAiService} from "../../presentation/services/open-ai.service";

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    BotMessageComponent,
    TypingLoaderComponent,
    TextOptionEntryComponent,
    TextFileEntryComponent,
    TextEntryComponent,
    UserMessageComponent
  ],
  templateUrl: './chat-template.component.html'
})
export class ChatTemplateComponent {
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
