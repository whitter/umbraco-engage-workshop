import { ContentContentResponseModel } from "@/api";
import { PageHeader } from "@/components/partials/pageHeader";
import { getPage } from "@/umbraco";
import { GetComponent } from "@/umbraco/components/GetComponent";
import { getDictionaryItems } from "@/utls";

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
              {pageContent?.properties?.contentRows?.items?.map((item) => {
                return GetComponent(dictionaryItems, item);
              })}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}