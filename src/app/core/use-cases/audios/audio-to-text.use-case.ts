import {environment} from "../../../../environments/environment";
import {IAudioToTextResponse} from "@interfaces/audio-to-text-response.interface";

export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {
  try {

    const formData = new FormData();
    formData.append('file', audioFile);
    if (prompt) {
      formData.append('prompt', prompt);
    }

    const response = await fetch(`${environment.backendApi}/audio-to-text`, {
      method: 'POST',
      body: formData,
    });

    return await response.json() as IAudioToTextResponse;

  } catch (e) {
    console.log(e)
    return null;
  }
}
