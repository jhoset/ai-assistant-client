import {IOrthographyResponse} from "@interfaces/index";
import {environment} from "../../../../environments/environment";


export const orthographyUseCase = async (prompt: string) => {
  try {

    const resp = await fetch(`${environment.backendApi}/orthography-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt})
    });
    const data = await resp.json() as IOrthographyResponse;
    return {
      ok: true,
      ...data,
    }

  } catch (e) {
    console.log(e)
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'Something went wrong. Please try again.',
    }
  }
}
