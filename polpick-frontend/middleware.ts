import { NextRequest, NextResponse } from "next/server";
// If the incoming request has the "token" cookie
export function middleware(request: NextRequest) {
  // const has_token = request.cookies.get("career_token")?.name;
  // const userFinishedIntro = Boolean(request.cookies.get("user_wallet")); // add checking to stop going to affilate create page
  // console.log("has_token", has_token);
  const tokenData = request.cookies.get("user_wallet")?.value;

  // const { pathname } = request.nextUrl;

  // if (pathname === "/affiliate-program/" && userFinishedIntro) {
  //   request.nextUrl.pathname = "/dashboard";
  //   return NextResponse.redirect(request.nextUrl);
  // } else {
  //   return NextResponse.next();
  // } // add checking to stop going to affilate create page

  if (tokenData === undefined || tokenData === null) {
    request.nextUrl.pathname = "/";
    return NextResponse.redirect(request.nextUrl);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  // matcher: ["/dashboard/dashboardfirst/"]
  matcher: [
    "/affiliate-program/",
    "/referral-program-link-manager/",
    "/dashboard/",
    "/profile/"
  ]
};
