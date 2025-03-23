// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { AppRouter } from "./router";
import { cookies } from "next/headers";

const roleRoutes = {
  staff: [
    AppRouter.staffDashboard,
    AppRouter.staffDashboardStudents,
    AppRouter.staffDashboardTutors,
    AppRouter.staffDashboardStaff,
    AppRouter.staffDashboardAllocate,

    AppRouter.studentDashboard,
    AppRouter.studentChat,
    AppRouter.studentBoard,
    AppRouter.studentMeeting,
    AppRouter.studentNote,
    AppRouter.studentPeople,
    AppRouter.studentChatBox,

    AppRouter.tutorBoard,
    AppRouter.tutorChat,
    AppRouter.tutorDashboard,
    AppRouter.tutorMeeting,
    AppRouter.tutorNote,
    AppRouter.tutorPeople,
    AppRouter.tutorAllocatedStudents,
  ],
  student: [
    AppRouter.studentDashboard,
    AppRouter.studentChat,
    AppRouter.studentBoard,
    AppRouter.studentMeeting,
    AppRouter.studentNote,
    AppRouter.studentPeople,
    AppRouter.studentChatBox,
  ],
  tutor: [
    AppRouter.tutorBoard,
    AppRouter.tutorChat,
    AppRouter.tutorDashboard,
    AppRouter.tutorMeeting,
    AppRouter.tutorNote,
    AppRouter.tutorPeople,
    AppRouter.tutorAllocatedStudents,
  ],
};

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  const role = cookieStore.get("role")?.value;


  if (
    req.nextUrl.pathname.startsWith("/_next/") ||
    req.nextUrl.pathname.startsWith("/static/") ||
    req.nextUrl.pathname.startsWith("/api/") ||
    req.nextUrl.pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (!sessionToken) {
    return NextResponse.redirect(
      new URL(AppRouter.loginPage, req.nextUrl.origin)
    );
  } else {
    // If the role is missing or not recognized, redirect to login
    if (!role || !(role in roleRoutes)) {
      return NextResponse.redirect(
        new URL(AppRouter.loginPage, req.nextUrl.origin)
      );
    }

    // Allow role-specific routes only
    const allowedRoutes = roleRoutes[role as keyof typeof roleRoutes];
    if (!allowedRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(
        new URL(AppRouter.unauthorized, req.nextUrl.origin)
      );
    }
  }

  return NextResponse.next(); // Allow request to continue
}

// ✅ Apply middleware to all routes EXCEPT "/"
export const config = {
  matcher: [
    "/((?!login|forget-password|confirm-otp|unauthorized|reset-password|$).*)",
  ],
};
