import {environment} from "../../../../environments/environment";

export async function* translateStreamUseCase(prompt: string, lang: string, abortSignal: AbortSignal) {

  try {
    const resp = await fetch(`${environment.backendApi}/translate-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt, lang}),
      signal: abortSignal
    });

    const reader = resp.body?.getReader();
    if (!reader) {
      console.log('Was not able to generate reader');
    }
    const decoder: TextDecoder = new TextDecoder();
    let text = '';
    while (true) {
      const {value, done} = await reader!.read();
      if (done) break;
      const decodedChunk = decoder.decode(value, {stream: true});
      text += decodedChunk;
      yield text;
    }
    return text;
  } catch (e) {
    console.log(e);
    return null;
  }

}
