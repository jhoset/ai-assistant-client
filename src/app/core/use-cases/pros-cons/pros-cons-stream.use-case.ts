import {environment} from "../../../../environments/environment";

export async function* prosConsStreamUseCase(prompt: string, abortSignal: AbortSignal) {
  try {

    const resp = await fetch(`${environment.backendApi}/pros-cons-analyzer-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt}),
      signal: abortSignal
    });

    const reader = resp.body?.getReader();
    if (!reader) {
      console.log('Was not able to generate reader')
    }
    const decoder = new TextDecoder();
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
    console.log(e)
    return null
  }
}
