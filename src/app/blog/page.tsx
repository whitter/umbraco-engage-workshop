import { ArticleListContentModel } from "@/api/model";
import { PageHeader } from "@/components/partials/pageHeader";
import { getPage } from "@/umbraco";
import { GetComponent } from "@/umbraco/components/GetComponent";
import { getDictionaryItems } from "@/utls";

export default async function ArticleListing() {

  const dictionaryItems = await getDictionaryItems();
  const articleList = await getPage<ArticleListContentModel>("blog");

  return (
    <>
      {articleList && <PageHeader content={articleList} />}
      <article>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              {articleList?.properties?.contentRows?.items?.map((item, index) => {
                return GetComponent(dictionaryItems!, item, index);
              })}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}