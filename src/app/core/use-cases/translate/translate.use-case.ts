import {environment} from "../../../../environments/environment";
import {ITranslateResponse} from "@interfaces/translate-response.interface";


export const translateUseCase = async (prompt: string, lang: string) => {
  try {
    const resp = await fetch(`${environment.backendApi}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt, lang})
    });
    const data = await resp.json() as ITranslateResponse;
    return {
      ok: true,
      ...data,
    }

  } catch (e) {
    console.log(e)
    return {
      ok: false,
      role: 'assistant',
      content: 'Something went wrong. Please try again.'
    }
  }
}
