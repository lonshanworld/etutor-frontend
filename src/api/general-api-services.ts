async function fetchData(
  method: string,
  apiString?: string,
  body?: any
): Promise<any> {
  const token = "2|rD8VLynd5qWR1SJEVN1XqZEBURwOy7c2HsyuCkIE80436565";
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiString}`,
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    }
  );

  if (!response.ok) {
    const responseData = await response.json();
    throw new Error(responseData.message || response.statusText);
  }

  return response.json();
}

export function GetRequest(apiString?: string): Promise<any> {
  return fetchData("GET", apiString);
}

export function PostRequest(body: any, apiString?: string): Promise<any> {
  return fetchData("POST", apiString, body);
}
