import {Injectable} from '@angular/core';
import {orthographyUseCase} from "@use-cases/orthography/orthography.use-case";
import {from} from "rxjs";
import {prosConsUseCase} from "@use-cases/pros-cons/pros-cons.use-case";
import {prosConsStreamUseCase} from "@use-cases/pros-cons/pros-cons-stream.use-case";

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


}
