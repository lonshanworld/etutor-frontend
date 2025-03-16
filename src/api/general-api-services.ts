"use server";

import { cookies } from "next/headers";

async function fetchData(
  method: string,
  apiString?: string,
  body?: any
): Promise<any> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiString}`,
    {
      method: method,
      headers: {
        "Content-Type": "Application/json",
        ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
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

export async function GetRequest(apiString?: string): Promise<any> {
  return fetchData("GET", apiString, undefined);
}

export async function PostRequest(body: any, apiString?: string): Promise<any> {
  return fetchData("POST", apiString, body);
}
