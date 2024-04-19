import {Injectable} from '@angular/core';
import {from} from "rxjs";
import {
  audioToTextUseCase,
  orthographyUseCase,
  prosConsStreamUseCase,
  prosConsUseCase, textToAudioUseCase,
  translateStreamUseCase,
  translateUseCase
} from '@use-cases/index';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  public checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  public analyzeProsCons(prompt: string) {
    return from(prosConsUseCase(prompt));
  }

  public analyzeProsConsStream(prompt: string, abortSignal: AbortSignal) {
    return prosConsStreamUseCase(prompt, abortSignal);
  }

  public translate(prompt: string, lang: string) {
    return from(translateUseCase(prompt, lang));
  }

  public translateStream(prompt: string, lang: string, abortSignal: AbortSignal) {
    return translateStreamUseCase(prompt, lang, abortSignal);
  }

  public textToAudio(prompt: string, voice: string) {
    return from(textToAudioUseCase(prompt, voice));
  }

  public audioToText(audioFile: File, prompt?: string) {
    return from(audioToTextUseCase(audioFile, prompt))
  }

}
