// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { AppRouter } from "./router";
import { cookies } from "next/headers";

const roleRoutes = {
  staff : [
    AppRouter.staffDashboard,
    AppRouter.staffDashboardStudents,
    AppRouter.staffDashboardTutors,
    AppRouter.staffDashboardStaff,
    AppRouter.staffDashboardAllocate,
  ],
  student : [
    AppRouter.studentDashboard,
    AppRouter.studentChat,
    AppRouter.studentBoard,
    AppRouter.studentMeeting,
    AppRouter.studentNote,
    AppRouter.studentPeople
  ],
  tutor : [
    AppRouter.tutorBoard,
    AppRouter.tutorChat,
    AppRouter.tutorDashboard,
    AppRouter.tutorMeeting,
    AppRouter.tutorNote,
    AppRouter.tutorPeople,
    AppRouter.tutorAllocatedStudents,
  ]
}

export async function middleware(req: NextRequest) {
  // const cookieStore = await cookies();
  // const sessionToken = cookieStore.get("sessionToken")?.value;
  // const role = cookieStore.get("role")?.value;

  // console.log("Middleware: Checking sessionToken:", sessionToken); // Debugging

  // if (req.nextUrl.pathname.startsWith("/_next/") || 
  //   req.nextUrl.pathname.startsWith("/static/") || 
  //   req.nextUrl.pathname.startsWith("/api/") || 
  //   req.nextUrl.pathname === "/favicon.ico") {
  //   return NextResponse.next();
  // }

  // if (!sessionToken) {
  //   return NextResponse.redirect(new URL(AppRouter.loginPage, req.nextUrl.origin));
  // }else{
  //   if (!role || !(role in roleRoutes)) {
  //     return NextResponse.redirect(new URL(AppRouter.loginPage, req.nextUrl.origin));
  //   }

  //   const allowedRoutes = roleRoutes[role as keyof typeof roleRoutes];
  //   console.log(allowedRoutes);
  //   if (!allowedRoutes.includes(req.nextUrl.pathname)) {

  //     return NextResponse.redirect(new URL(AppRouter.loginPage, req.nextUrl.origin));
  //   }

  // }

  // return NextResponse.next(); 
}


export const config = {
  matcher: ["/((?!login|forget-password|verify-otp|reset-password|$).*)"],
};
