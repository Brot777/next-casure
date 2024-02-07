import { NextResponse } from "next/server";

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  console.log(request.headers.get("authorization"));
  /* await 
  if (!user) {
    return NextResponse.redirect(new URL("/singin", request.url));
  } */
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/contributions",
};
