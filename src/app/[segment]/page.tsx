import { HomeContentResponseModel, SEocontrolsContentResponseModel } from "@/api/model";
import { PageHeader } from "@/components/partials/pageHeader";
import { getMeta } from "@/helpers/metaHelper";
import { getPage } from "@/umbraco";
import { GetComponent } from "@/umbraco/components/GetComponent";
import { getDictionaryItems } from "@/helpers/dictionary";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSegments } from "@/umbraco/engage";

export async function generateStaticParams() {

  const allSegments: { segment: string; }[] = [];

    const segmentResponse = await getSegments('');

    segmentResponse.data?.segments?.forEach((segment) => {
      allSegments.push({
        segment: segment.umbracoSegmentAlias!,
      });
    });

    allSegments.push({
      segment: "default",
    });

  return allSegments;
}

export async function generateMetadata({ params }: { params: Promise<{ segment: string }> }) : Promise<Metadata> {

  const { segment } = await params;
  const metaContent = await getPage<SEocontrolsContentResponseModel>('', segment);

  if (!metaContent) return notFound();

  return getMeta(metaContent);
}

export default async function Home({ params }: { params: Promise<{ segment: string }> }) {

  const { segment } = await params;
  const dictionaryItems = await getDictionaryItems();
  const homePage = await getPage<HomeContentResponseModel>("", segment);

  if (!homePage) return notFound();

  return (
    <>
      {homePage && <PageHeader content={homePage} />}
      <article>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              {homePage?.properties?.contentRows?.items?.map((item, index) => {
                return GetComponent(dictionaryItems!, item, index);
              })}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
