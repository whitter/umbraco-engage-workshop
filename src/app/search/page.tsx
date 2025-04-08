import { SearchContentResponseModel } from "@/api/model";
import { PageHeader } from "@/components/partials/pageHeader";
import { getPage } from "@/umbraco";
import { getDictionaryItems } from "@/utls";
import SearchForm from "./searchForm";

export default async function Page() {

  const dictionaryItems = await getDictionaryItems();
  const pageContent = await getPage<SearchContentResponseModel>(`/search/`);

  return (
    <>
      {pageContent && <PageHeader content={pageContent} />}
      <div className="container">
        <SearchForm dictionaryItems={dictionaryItems} />
      </div>
    </>
  );
}