import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

interface Option {
  id: string;
  text: string;
}

export interface ITextAndSelectedOptEntryEvent {
  prompt: string;
  option: string;
}

@Component({
  selector: 'app-text-option-entry',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './text-option-entry.component.html'
})
export class TextOptionEntryComponent {
  @Input({required: true}) options!: Option[];
  @Input() placeholder: string = '';
  @Output() onMessage: EventEmitter<ITextAndSelectedOptEntryEvent> = new EventEmitter<ITextAndSelectedOptEntryEvent>();

  public form = new FormGroup({
    prompt: new FormControl('', Validators.required),
    selectedOption: new FormControl('', Validators.required)
  })

  handleSubmit() {
    if (this.form.invalid) return;
    const {prompt, selectedOption} = this.form.value;
    this.onMessage.emit({prompt: prompt!, option: selectedOption!});
    this.form.reset();
  }
}
