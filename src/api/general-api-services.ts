async function fetchData(
  method: string,
  apiString?: string,
  body?: any
): Promise<any> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiString}`,
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    }
  );

  if (!response.ok) {
    throw new Error(`Errors: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export function GetRequest(apiString?: string): Promise<any> {
  return fetchData("GET", apiString);
}

export function PostRequest(body: any, apiString?: string): Promise<any> {
  return fetchData("POST", apiString, body);
}
