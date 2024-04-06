import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

export interface ITextAndFileEntryEvent {
  file: File;
  prompt?: string | null
}

@Component({
  selector: 'app-text-file-entry',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './text-file-entry.component.html'
})
export class TextFileEntryComponent {
  @Input() placeholder: string = '';
  @Input() disableCorrections: boolean = false;
  @Output() onMessage: EventEmitter<ITextAndFileEntryEvent> = new EventEmitter<ITextAndFileEntryEvent>();

  public form = new FormGroup({
    prompt: new FormControl(''),
    file: new FormControl(null, Validators.required)
  })

  handleSelectedFile({target}: any) {
    const file = target.files.item(0)
    this.form.controls.file.setValue(file)
  }

  handleSubmit() {
    if (this.form.invalid) return;
    const {prompt, file} = this.form.value;
    this.onMessage.emit({prompt, file: file!});
    this.form.reset();
  }
}
