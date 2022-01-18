import createUrl from './createUrl';
import { IListSettings } from './IListSettings';

export async function fetchListData(settings: IListSettings): Promise<any> {
  try {
    const url = createUrl(settings);

    const options: RequestInit = {
      credentials: "include",
      headers: {
        "accept": "application/json;odata=verbose",
        "content-type": "application/json;charset=utf-8",
      },
      method: "GET",
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      // return Promise.reject(response.statusText)
      throw Error(response.statusText);
    }

    const json = await response.json();
    if (
      json.d !== undefined &&
      json.d.results !== undefined &&
      Array.isArray(json.d.results)
    ) {
      return json.d.results;
    } else {
      // Promise.reject("Data corrupted!");
      throw Error('Data corrupted!');
    }
  } catch (error) {
    console.error(error);
    throw Error(error);
    // return Promise.reject(error);
  }
}

export default fetchListData;
