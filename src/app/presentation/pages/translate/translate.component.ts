import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {BotMessageComponent} from "@components/chat-bubbles/bot-message/bot-message.component";
import {
  ITextAndSelectedOptEntryEvent,
  TextOptionEntryComponent
} from "@components/data-entries/text-option-entry/text-option-entry.component";
import {TypingLoaderComponent} from "@components/typing-loader/typing-loader.component";
import {UserMessageComponent} from "@components/chat-bubbles/user-message/user-message.component";
import {IMessage} from "@interfaces/message.interface";
import {OpenAiService} from "../../services/open-ai.service";

@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [
    BotMessageComponent,
    TextOptionEntryComponent,
    TypingLoaderComponent,
    UserMessageComponent
  ],
  templateUrl: './translate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TranslateComponent {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public languages = signal([
    {id: 'alemán', text: 'Alemán'},
    {id: 'árabe', text: 'Árabe'},
    {id: 'bengalí', text: 'Bengalí'},
    {id: 'francés', text: 'Francés'},
    {id: 'hindi', text: 'Hindi'},
    {id: 'inglés', text: 'Inglés'},
    {id: 'japonés', text: 'Japonés'},
    {id: 'mandarín', text: 'Mandarín'},
    {id: 'portugués', text: 'Portugués'},
    {id: 'ruso', text: 'Ruso'},
  ])

  public handleTextAndSelectedOptEntry({prompt, option}: ITextAndSelectedOptEntryEvent) {
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {isGpt: false, text: `Translate to ${option}: ${prompt}`}
    ])

    this.openAiService.translate(prompt, option).subscribe(result => {
      this.isLoading.set(false);
      this.messages.update((prev) => [
        ...prev,
        {isGpt: true, text: result.content}
      ])
    })
  }
}
