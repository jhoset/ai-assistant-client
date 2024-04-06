import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

export interface ITextEntryEvent {
  prompt: string
}

@Component({
  selector: 'app-text-entry',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './text-entry.component.html'
})
export class TextEntryComponent {
  @Input() placeholder: string = '';
  @Input() disableCorrections: boolean = false;
  @Output() onMessage: EventEmitter<ITextEntryEvent> = new EventEmitter<ITextEntryEvent>();

  public messageForm = new FormGroup({
    prompt: new FormControl('', Validators.required)
  })

  handleSubmit() {
    if (this.messageForm.invalid) return;
    const {prompt} = this.messageForm.value;
    this.onMessage.emit({prompt: prompt!});
    this.messageForm.reset();
  }

}
