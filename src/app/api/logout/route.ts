import { logout } from "@/api/services/authService";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const backendRespond = await logout();

    // Remove the cookies
    if (backendRespond.status === 204) {
      const response = NextResponse.json({ message: "Logout successful" });
      response.cookies.set("sessionToken", "", { httpOnly: true, maxAge: -1 });
      response.cookies.set("role", "", { httpOnly: true, maxAge: -1 });
      return response;
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error logging out" }, { status: 500 });
  }
}
