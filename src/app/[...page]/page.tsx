import { ContentContentResponseModel, SEocontrolsContentResponseModel } from "@/api/model";
import { PageHeader } from "@/components/partials/pageHeader";
import { getContentPages, getPage } from "@/umbraco";
import { GetComponent } from "@/umbraco/components/GetComponent";
import { getDictionaryItems } from "@/utls";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {

  const pages = await getContentPages();
  const allSegments = pages.map((page) => ({
    page: page.route?.path?.split('/').filter((segment) => segment !== '') || [],
  })) 

  return allSegments;
}

export async function generateMetadata({ params }: { params: Promise<{ page: string[] }> }) : Promise<Metadata> {

  const { page } = await params;
  const metaContent = await getPage<SEocontrolsContentResponseModel>(`/${page.join('/')}/`);

  const shouldIndex = metaContent?.properties?.isIndexable !== false;
  const shouldFollow = metaContent?.properties?.isFollowable !== false;

  if (!page) return notFound();

  return {
    title: metaContent?.properties?.metaName || metaContent?.name || '',
    description: metaContent?.properties?.metaDescription || '',
    keywords: metaContent?.properties?.metaKeywords || '',
    robots: {
      index: shouldIndex,
      follow: shouldFollow,
    },
  };
}


export default async function Page({ params }: { params: Promise<{ page: string[] }> }) {

  const dictionaryItems = await getDictionaryItems();
  const { page } = await params;
  const pageContent = await getPage<ContentContentResponseModel>(`/${page.join('/')}/`);

  return (
    <>
      {pageContent && <PageHeader content={pageContent} />}
      <article>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              {pageContent?.properties?.contentRows?.items?.map((item, index) => {
                return GetComponent(dictionaryItems, item, index);
              })}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}