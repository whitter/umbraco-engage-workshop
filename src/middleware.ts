import { NextRequest, NextResponse } from "next/server";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { getActiveSegment, postPageView } from "./umbraco/engage";
import { RemotePageViewResponseModel } from "./api-engage/model";

const staticFileRegex = /\.(ico|png|jpg|jpeg|svg|webp|css|js|map)$/
const EXTERNAL_VISITOR_ID_COOKIE_NAME = "external_visitor_id";

const middleware = async (request : NextRequest) => {

  const { pathname } = request.nextUrl;

  if (staticFileRegex.test(pathname)) {
    return NextResponse.next()
  }

  const trackingData = await postPageView(
    request.url,
    getHeaders(request.headers),
    getUserAgent(request.headers),
    getRemoteClientAddress(request.headers),
    getReferrer(request),
    getExternalVisitorId(request.cookies)
  );

  const f = trackingData.data as RemotePageViewResponseModel

  const segmentData = await getActiveSegment(
    request.nextUrl.pathname,
    "en-gb",
    f.externalVisitorId!
  );

  let segment = "default";

  if (segmentData.data.segments?.length) {
    segment = segmentData.data.segments[0].umbracoSegmentAlias!;
  }

  console.log(getExternalVisitorId(request.cookies))
  console.log(segment)

  request.nextUrl.pathname = `/${segment}${pathname}`;

  const response = NextResponse.rewrite(request.nextUrl);

  if (trackingData.data) {
    response.cookies.set(
      EXTERNAL_VISITOR_ID_COOKIE_NAME,
      f.externalVisitorId!
    );
  }

  return response;
};

export default middleware;

function getHeaders(headers: Headers) {
  return Array.from(headers, (value) => `${value[0]}=${value[1]}`).join("$");
}

function getUserAgent(headers: Headers) {
  return headers.get("user-agent") ?? undefined;
}

function getRemoteClientAddress(headers: Headers) {
  return headers.get("x-forwarded-for") ?? undefined;
}

function getReferrer(request: NextRequest) {
  return "https://www.google.com";
}

function getExternalVisitorId(cookies: RequestCookies) {
  return cookies.get(EXTERNAL_VISITOR_ID_COOKIE_NAME)?.value;
}

export const config = {
  matcher: ["/((?!_next|api).*)"],
};
