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
import {
  ITextAndFileEntryEvent,
  TextFileEntryComponent
} from "@components/data-entries/text-file-entry/text-file-entry.component";
import {IAudioToTextResponse} from "@interfaces/audio-to-text-response.interface";

@Component({
  selector: 'app-audio-to-text-entry',
  standalone: true,
  imports: [
    BotMessageComponent,
    TextOptionEntryComponent,
    TypingLoaderComponent,
    UserMessageComponent,
    TextFileEntryComponent
  ],
  templateUrl: './audio-to-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AudioToTextComponent {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);


  public handleTextAndFileEntry({prompt, file}: ITextAndFileEntryEvent) {
    const text =  'Generate transcription of the audio';
    this.isLoading.set(true);

    this.messages.update(prev => [...prev, {isGpt: false, text}])
    this.openAiService.audioToText(file, prompt ?? undefined)
      .subscribe(rs => this.handleResponse(rs))
  }

  handleResponse(response: IAudioToTextResponse | null) {
    this.isLoading.set(false);
    if (!response) return;

    this.messages.update(prev => [
      ...prev,
      {isGpt: true, text: response.text}
    ])
  }
}
