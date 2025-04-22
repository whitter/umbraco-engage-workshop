import { NextRequest, NextResponse } from "next/server";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { getActiveSegment, postPageView } from "./umbraco/engage";
import { NotPermittedDueToLicenseResult, RemotePageViewResponseModel, StatusCodeResult } from "./api-engage/model";

const staticFileRegex = /\.(ico|png|jpg|jpeg|svg|webp|css|js|map)$/
const EXTERNAL_VISITOR_ID_COOKIE_NAME = "external_visitor_id";

const middleware = async (request : NextRequest) => {

  const { pathname } = request.nextUrl;

  if (staticFileRegex.test(pathname)) {
    return NextResponse.next()
  }

  const trackingDataResponse = await postPageView(
    request.url,
    getHeaders(request.headers),
    getUserAgent(request.headers),
    getRemoteClientAddress(request.headers),
    getReferrer(request),
    getExternalVisitorId(request.cookies)
  );

  if (trackingDataResponse && isRemotePageViewResponseModel(trackingDataResponse.data)) {

    const trackingData = trackingDataResponse.data;

    const segmentData = await getActiveSegment(
      request.nextUrl.pathname,
      "en-gb",
      trackingData.externalVisitorId!
    );
  
    let segment = "default";
  
    console.log(segmentData.data.segments)

    if (segmentData.data.segments?.length) {
      segment = segmentData.data.segments[0].umbracoSegmentAlias!;
    }
  
    console.log(getExternalVisitorId(request.cookies))
    console.log(segment)
  
    request.nextUrl.pathname = `/${segment}${pathname}`;
  
    const response = NextResponse.rewrite(request.nextUrl);
  
    response.cookies.set(
      EXTERNAL_VISITOR_ID_COOKIE_NAME,
      trackingData.externalVisitorId!
    );

    return response;
  }

  return NextResponse.next();
};

function isRemotePageViewResponseModel(data: RemotePageViewResponseModel | NotPermittedDueToLicenseResult | StatusCodeResult): data is RemotePageViewResponseModel {
  return data && typeof data === "object" && "externalVisitorId" in data;
}

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
