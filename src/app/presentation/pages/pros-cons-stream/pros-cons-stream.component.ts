import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {BotMessageComponent} from "@components/chat-bubbles/bot-message/bot-message.component";
import {
  ITextAndSelectedOptEntryEvent,
  TextOptionEntryComponent
} from "@components/data-entries/text-option-entry/text-option-entry.component";
import {TypingLoaderComponent} from "@components/typing-loader/typing-loader.component";
import {UserMessageComponent} from "@components/chat-bubbles/user-message/user-message.component";
import {ITextEntryEvent, TextEntryComponent} from "@components/data-entries/text-entry/text-entry.component";
import {IMessage} from "@interfaces/message.interface";
import {OpenAiService} from "../../services/open-ai.service";
import {ITextAndFileEntryEvent} from "@components/data-entries/text-file-entry/text-file-entry.component";

@Component({
  selector: 'app-pros-cons-stream',
  standalone: true,
  imports: [
    BotMessageComponent,
    TextOptionEntryComponent,
    TypingLoaderComponent,
    UserMessageComponent,
    TextEntryComponent
  ],
  templateUrl: './pros-cons-stream.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProsConsStreamComponent {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);
  public abortSignal = new AbortController();

  public async handleTextEntry({prompt}: ITextEntryEvent) {
    this.abortSignal.abort()
    this.abortSignal = new AbortController();

    this.messages.update((prev) => [
      ...prev, {isGpt: false, text: prompt}, {isGpt: false, text: '...'}])
    this.isLoading.set(true)
    const stream = this.openAiService.analyzeProsConsStream(prompt, this.abortSignal.signal);
    this.isLoading.set(false);
    for await (const text of stream) {
      this.handleStreamResponse(text);
    }
  }

  private handleStreamResponse(message: string) {
    this.messages().pop();
    const messages = this.messages();
    this.messages.set([...messages, {isGpt: true, text: message}])
  }
}
