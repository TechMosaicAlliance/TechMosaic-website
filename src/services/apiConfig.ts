import { wordPressAuth, wordpressUsername } from "./constants";

interface IRequestType<TVariables> {
  entity?: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: TVariables;
  customUrl?: string;
}

export async function request<TReturnType, TVariables>({
  entity,
  method,
  customUrl,

  body,
}: IRequestType<TVariables>): Promise<TReturnType> {
  const url = customUrl || "";
  const auth = Buffer.from(`${wordpressUsername}:${wordPressAuth}`).toString(
    "base64"
  );
  const headers: any = {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/json",
  };

  const requestOptions: RequestInit = {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : null,
    cache: "no-store",
  };
  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorText = await response.json();
      throw new Error(`${errorText.message}`);
    }
    const responseData: TReturnType = await response.json();
    return responseData;
  } catch (error) {
    // Handle errors here if needed
    return Promise.reject(error);
  }
}
