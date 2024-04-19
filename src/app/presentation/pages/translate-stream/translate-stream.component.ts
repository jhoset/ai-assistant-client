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
import {ITextEntryEvent} from "@components/data-entries/text-entry/text-entry.component";
import {ITextAndFileEntryEvent} from "@components/data-entries/text-file-entry/text-file-entry.component";

@Component({
  selector: 'app-translate-stream',
  standalone: true,
  imports: [
    BotMessageComponent,
    TextOptionEntryComponent,
    TypingLoaderComponent,
    UserMessageComponent
  ],
  templateUrl: './translate-stream.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TranslateStreamComponent {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);
  public abortSignal = new AbortController();

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

  public async handleTextAndSelectedOptEntry({prompt, option}: ITextAndSelectedOptEntryEvent) {
    this.abortSignal.abort();
    this.abortSignal = new AbortController();

    this.messages.update((prev) => [
      ...prev,
      {isGpt: false, text: `Translate to ${option}: ${prompt}`}
    ]);
    this.isLoading.set(true);
    const stream = this.openAiService.translateStream(prompt, option, this.abortSignal.signal);
    this.isLoading.set(false);
    for await (const text of stream) {
      this.handleStreamResponse(text);
    }
  }

  private handleStreamResponse(message: string) {
    if (this.messages().at(-1)?.isGpt) {
      this.messages().pop();
    }
    const messages = this.messages();
    this.messages.set([...messages, {isGpt: true, text: message}])
  }
}
