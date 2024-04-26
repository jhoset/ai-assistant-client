import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {IMessage} from "@interfaces/message.interface";
import {OpenAiService} from "../../services/open-ai.service";
import {ITextEntryEvent, TextEntryComponent} from "@components/data-entries/text-entry/text-entry.component";
import {
  ITextAndFileEntryEvent,
  TextFileEntryComponent
} from "@components/data-entries/text-file-entry/text-file-entry.component";
import {
  ITextAndSelectedOptEntryEvent,
  TextOptionEntryComponent
} from "@components/data-entries/text-option-entry/text-option-entry.component";
import {BotMessageComponent} from "@components/chat-bubbles/bot-message/bot-message.component";
import {TypingLoaderComponent} from "@components/typing-loader/typing-loader.component";
import {UserMessageComponent} from "@components/chat-bubbles/user-message/user-message.component";
import {
  GptMessageEditableComponent
} from "@components/chat-bubbles/gpt-message-editable/gpt-message-editable.component";


@Component({
  selector: 'app-image-tuning',
  standalone: true,
  imports: [
    BotMessageComponent,
    TextOptionEntryComponent,
    TypingLoaderComponent,
    UserMessageComponent,
    TextFileEntryComponent,
    GptMessageEditableComponent,
    TextEntryComponent
  ],
  templateUrl: './image-tuning.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ImageTuningComponent {

  public messages = signal<IMessage[]>([
    // {
    //   isGpt: true,
    //   text: 'Dummy Image',
    //   imageInfo: {
    //     alt: 'Dummy Image',
    //     url: 'http://localhost:3000/gpt/image-generation/1714144774073.png'
    //   }
    // }
  ]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public originalImage = signal<string | undefined>(undefined);
  public masksImage = signal<string | undefined>(undefined);

  public handleTextEntry({prompt}: ITextEntryEvent) {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, {isGpt: false, text: prompt}]);

    this.openAiService.imageGeneration(prompt, this.originalImage(), this.masksImage())
      .subscribe(resp => {
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

  public generateVariation() {
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: 'Generate variation of selected image'
      }

    ]);
    this.openAiService.generateVariation(this.originalImage()!).subscribe(resp => {
      this.isLoading.set(false);
      if (!resp) return;
      this.messages.update((prev) => [
        ...prev,
        {
          isGpt: true,
          text: resp.alt,
          imageInfo: resp
        }
      ])

    })

  }

  public handleImageChange(newImage: string, originalImage: string) {
    this.originalImage.set(originalImage);
    this.masksImage.set(newImage)

  }

}
