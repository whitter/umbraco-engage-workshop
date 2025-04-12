import { getUmbracoEngageApiV1SegmentationContentActivesegmentsPath } from "@/api-engage/segmentation-visitor/segmentation-visitor";
import { postUmbracoEngageApiV1AnalyticsPageviewTrackpageviewServer } from "@/api-engage/analytics/analytics";
import { RemotePageViewServerRequestModel } from "@/api-engage/model";
import { getUmbracoEngageApiV1SegmentationContentSegmentsPath } from "@/api-engage/segmentation-content/segmentation-content";

  export async function postPageView(
    url: string,
    headers: string,
    browserUserAgent?: string,
    remoteClientAddress?: string,
    referrerUrl?: string,
    externalVisitorId?: string
  ) {
    const body: RemotePageViewServerRequestModel = {
      url: url,
      headers: headers,
    };
  
    if (browserUserAgent) {
      body.browserUserAgent = browserUserAgent;
    }
  
    if (remoteClientAddress) {
      body.remoteClientAddress = remoteClientAddress;
    }

    if (referrerUrl) {
      body.referrerUrl = referrerUrl;
    }

    return await postUmbracoEngageApiV1AnalyticsPageviewTrackpageviewServer(body, {
      headers: {
        "External-Visitor-Id": externalVisitorId!,
      },
    });
  }
  
  export async function getSegments(path: string) {
    return await getUmbracoEngageApiV1SegmentationContentSegmentsPath(path);
  }
  
  export async function getActiveSegment(
    path: string,
    locale: string,
    externalVisitorId: string
  ) {
    const options: RequestInit = {
      headers: {
        "Accept-Language": locale,
        "External-Visitor-Id": externalVisitorId,
      },
    };
  
    return await getUmbracoEngageApiV1SegmentationContentActivesegmentsPath(path, options);
  }
  