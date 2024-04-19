import {environment} from "../../../../environments/environment";

export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {

    const resp = await fetch(`${environment.backendApi}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt, voice})
    });
    const audioFile = await resp.blob();
    const audioUrl = URL.createObjectURL(audioFile);
    return {
      ok: true,
      message: prompt,
      audioUrl: audioUrl,
    }

  } catch (e) {
    console.log(e)
    return {
      ok: false,
      message: 'Something went wrong. Please try again.',
      audioUrl: '',
    }
  }
}
