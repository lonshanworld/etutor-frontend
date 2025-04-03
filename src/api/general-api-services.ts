"use server";

import { ErrorModel } from "@/model/ErrorModel";
import { cookies } from "next/headers";

async function fetchData(
  method: string,
  apiString?: string,
  body?: any
): Promise<any | ErrorModel> {
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
    return {
      errorCode: response.status,
      errorText:
        responseData.message ||
        responseData.errorMessage ||
        response.statusText,
    };
  }

  if (response.status === 204) {
    return response;
  }
  return response.json();
}

export async function GetRequest(apiString?: string): Promise<any> {
  return fetchData("GET", apiString, undefined);
}

export async function PostRequest(
  body?: any,
  apiString?: string
): Promise<any> {
  return fetchData("POST", apiString, body);
}

// ...existing code...

export async function ChatFilePostFormDataRequest(
  formData : FormData,
  apiString: string,
): Promise<any | ErrorModel> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;



  console.log("it even reach here???", formData);
  const headers: Record<string, string> = {
    ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
  };

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
  };

  requestOptions.body = formData;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiString}`,
    requestOptions
  );

  console.log('checking response from general', response);

  const responseData = await response.json();
  if (!response.ok) {
    console.log('checking response from error', response);
    return {
      errorCode: response.status,
      errorText: responseData.message || responseData.errorMessage || response.statusText,
    };
  }

  return responseData;
}