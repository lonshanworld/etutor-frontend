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

  // Use a Record type for headers to allow arbitrary string keys
  const headers: Record<string, string> = {
    ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
  };

  const requestOptions: RequestInit = {
    method: method,
    headers: headers,
  };

  if (body) {
    // If the body is a FormData object (for file uploads), don't set the Content-Type
    if (body instanceof FormData) {
      requestOptions.body = body;
    } else {
      // For regular JSON bodies
      headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiString}`,
    requestOptions
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
  return fetchData("GET", apiString);
}

export async function PostRequest(
  body?: any,
  apiString?: string
): Promise<any> {
  return fetchData("POST", apiString, body);
}
