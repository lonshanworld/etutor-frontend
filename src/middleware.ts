// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { AppRouter } from "./router";
import { cookies } from "next/headers";

const roleRoutes = {
  staff: [
    AppRouter.staffDashboard,
    AppRouter.staffStudents,
    AppRouter.staffTutors,
    AppRouter.staffStaff,
    AppRouter.staffAllocate,
    AppRouter.staffAllocateTutor,
    AppRouter.staffAllocateStudent,
    AppRouter.staffUnassignStudent,
    AppRouter.staffActiveUsers,
    AppRouter.staffBrowsers,
    AppRouter.staffPages,
    AppRouter.staffMessage,

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

    AppRouter.tutorBoard,
    AppRouter.tutorChat,
    AppRouter.tutorChatBox,
    AppRouter.tutorDashboard,
    AppRouter.tutorMeeting,
    AppRouter.tutorNote,
    AppRouter.tutorPeople,
    AppRouter.tutorAllocatedStudents,
  ],
  tutor: [
    AppRouter.tutorBoard,
    AppRouter.tutorChat,
    AppRouter.tutorChatBox,
    AppRouter.tutorDashboard,
    AppRouter.tutorMeeting,
    AppRouter.tutorNote,
    AppRouter.tutorPeople,
    AppRouter.tutorAllocatedStudents,

    AppRouter.studentDashboard,
    AppRouter.studentChat,
    AppRouter.studentBoard,
    AppRouter.studentMeeting,
    AppRouter.studentNote,
    AppRouter.studentPeople,
    AppRouter.studentChatBox,
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
    if (!role || !(role in roleRoutes)) {
      return NextResponse.redirect(
        new URL(AppRouter.loginPage, req.nextUrl.origin)
      );
    }

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
