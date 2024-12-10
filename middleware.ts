import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([ "/api/webhook/clerk"]);

//used to protect all routes, and specically exlcude any around
//now, now al routes are public, we speficy which to protect
export default clerkMiddleware(async (auth, request) => {
    // if (isProtectedRoute(request)) {
    //     await auth.protect();
    // }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
