import { HomeContentResponseModel } from "@/api/model";
import { PageHeader } from "@/components/partials/pageHeader";
import { getPage } from "@/umbraco";
import { GetComponent } from "@/umbraco/components/GetComponent";
import { getDictionaryItems } from "@/utls";

export default async function Home() {

  const dictionaryItems = await getDictionaryItems();
  const homePage = await getPage<HomeContentResponseModel>("");

  return (
    <>
      {homePage && <PageHeader content={homePage} />}
      <article>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              {homePage?.properties?.contentRows?.items?.map((item) => {
                return GetComponent(dictionaryItems!, item);
              })}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
