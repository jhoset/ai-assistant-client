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
import {ITextEntryEvent, TextEntryComponent} from "@components/data-entries/text-entry/text-entry.component";
import {ITextAndFileEntryEvent} from "@components/data-entries/text-file-entry/text-file-entry.component";

@Component({
  selector: 'app-image-generation',
  standalone: true,
  imports: [
    BotMessageComponent,
    TextOptionEntryComponent,
    TypingLoaderComponent,
    UserMessageComponent,
    TextEntryComponent
  ],
  templateUrl: './image-generation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ImageGenerationComponent {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public handleTextEntry({prompt}: ITextEntryEvent) {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, {isGpt: false, text: prompt}]);

    this.openAiService.imageGeneration(prompt).subscribe(resp => {
      this.isLoading.set(false)
      if (!resp) return;
      this.messages.update(prev => [
        ...prev,
        {
          isGpt: true,
          text: resp.alt,
          imageInfo: resp
        }
      ])
    })
  }
}
