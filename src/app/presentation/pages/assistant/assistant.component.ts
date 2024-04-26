import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {IMessage} from "@interfaces/message.interface";
import {OpenAiService} from "../../services/open-ai.service";
import {ITextEntryEvent, TextEntryComponent} from "@components/data-entries/text-entry/text-entry.component";
import {ITextAndFileEntryEvent} from "@components/data-entries/text-file-entry/text-file-entry.component";
import {
  ITextAndSelectedOptEntryEvent,
  TextOptionEntryComponent
} from "@components/data-entries/text-option-entry/text-option-entry.component";
import {BotMessageComponent} from "@components/chat-bubbles/bot-message/bot-message.component";
import {TypingLoaderComponent} from "@components/typing-loader/typing-loader.component";
import {UserMessageComponent} from "@components/chat-bubbles/user-message/user-message.component";

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [
    BotMessageComponent,
    TextOptionEntryComponent,
    TypingLoaderComponent,
    UserMessageComponent,
    TextEntryComponent
  ],
  templateUrl: './assistant.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AssistantComponent implements OnInit {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);
  public threadId = signal<string | undefined>(undefined)

  public handleTextEntry({prompt}: ITextEntryEvent) {
    this.isLoading.set(true);
    this.messages.update(prev => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ])

    this.openAiService.postQuestion(this.threadId()!, prompt).subscribe(replies => {
      this.isLoading.set(false);

      for (const reply of replies) {
        for (const message of reply.content) {
          this.messages.update(prev => [
            ...prev,
            { text: message, isGpt: reply.role === 'assistant' }
          ])
        }
      }

    })
  }


  ngOnInit(): void {
    this.openAiService.createThread().subscribe(id => {
      this.threadId.set(id);
    })
  }
}
