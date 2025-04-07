import { ArticleContentModel } from "@/api/model";
import { PageHeader } from "@/components/partials/pageHeader";
import { getPage } from "@/umbraco";
import { GetComponent } from "@/umbraco/components/GetComponent";
import { getDictionaryItems } from "@/utls";

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {

  const dictionaryItems = await getDictionaryItems();
  const { slug } = await params;
  const article = await getPage<ArticleContentModel>(`blog/${slug}`);

  return (
    <>
      {article && <PageHeader content={article} isArticle />}
      <article>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              {article?.properties?.contentRows?.items?.map((item, index) => {
                return GetComponent(dictionaryItems!, item, index);
              })}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}