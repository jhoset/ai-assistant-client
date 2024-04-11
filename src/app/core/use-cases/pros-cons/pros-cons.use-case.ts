import {IProsConsResponse} from "@interfaces/index";
import {environment} from "../../../../environments/environment";

export const prosConsUseCase = async (prompt: string) => {
  try {

    const resp = await fetch(`${environment.backendApi}/pros-cons-analyzer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt})
    });
    const data = await resp.json() as IProsConsResponse;
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
