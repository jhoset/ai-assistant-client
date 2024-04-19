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
  selector: 'app-text-entry-to-audio',
  standalone: true,
  imports: [
    BotMessageComponent,
    TextOptionEntryComponent,
    TypingLoaderComponent,
    UserMessageComponent
  ],
  templateUrl: './text-to-audio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TextToAudioComponent {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public voices = signal([
    {id: "nova", text: "Nova"},
    {id: "alloy", text: "Alloy"},
    {id: "echo", text: "Echo"},
    {id: "fable", text: "Fable"},
    {id: "onyx", text: "Onyx"},
    {id: "shimmer", text: "Shimmer"},
  ]);

  public handleTextAndSelectedOptEntry({prompt, option}: ITextAndSelectedOptEntryEvent) {

    const message = `${option} - ${prompt}`;
    this.messages.update(prev => [...prev, {text: message, isGpt: false}])
    this.isLoading.set(true);

    this.openAiService.textToAudio(prompt, option)
      .subscribe(({message, audioUrl}) => {
        this.isLoading.set(false);
        this.messages.update(prev => [
          ...prev,
          {isGpt: true, text: prompt, audioUrl}])
      })

  }
}
