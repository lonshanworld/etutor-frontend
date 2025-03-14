async function fetchData(
  method: string,
  apiString?: string,
  body?: any,
  token?: string
): Promise<any> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiString}`,
    {
      method: method,
      headers: {
        "Content-Type": "Application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    }
  );

  return response.json();
}

export function GetRequest(apiString?: string, token?: string): Promise<any> {
  return fetchData("GET", apiString, undefined, token);
}

export function PostRequest(
  body: any,
  apiString?: string,
  token?: string
): Promise<any> {
  return fetchData("POST", apiString, body, token);
}
