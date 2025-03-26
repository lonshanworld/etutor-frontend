"use server";

import { cookies } from "next/headers";

export async function storeTokenInCookie(txt: string) {
  const cookieStore = await cookies();
  console.log(txt);
  cookieStore.set("sessionToken", txt, {
    httpOnly: true, // Prevents JavaScript access (secure)
    //   secure: process.env.NODE_ENV === "production",
    secure: false,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function storeRoleInCookie(roleTxt?: string) {
  if (roleTxt) {
    const cookieStore = await cookies();
    const txt = roleTxt === "admin" ? "staff" : roleTxt;
    console.log(txt);
    cookieStore.set("role", txt, {
      httpOnly: true, // Prevents JavaScript access (secure)
      //   secure: process.env.NODE_ENV === "production",
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }
}

export async function getTokenCookies() : Promise<{sessionToken : any, role : any}> {
  const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;
    const role = cookieStore.get("role")?.value;
  
    return { sessionToken, role };
}

export async function deleteTokensInCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("sessionToken");
  cookieStore.delete("role");
}
