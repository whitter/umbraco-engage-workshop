import { SearchContentResponseModel } from "@/api/model";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { PageHeader } from "@/components/partials/pageHeader";
import { getPage } from "@/umbraco";
import { getDictionaryItems, getDictionValue } from "@/utls";

export default async function Page() {

  const dictionaryItems = await getDictionaryItems();
  const pageContent = await getPage<SearchContentResponseModel>(`/search/`);

  return (
    <>
      {pageContent && <PageHeader content={pageContent} />}
      <div className="container">
        <form action="@Model.Url()" method="GET" id="search">
            <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                    <div className="form-group controls">
                        <input type="text" className="form-control col-xs-6" placeholder={getDictionValue(dictionaryItems, "Search.Placeholder")} name="q" value="" />
                    </div>
                </div>
                <div className="col-lg-8 col-md-10 mx-auto my-3">
                    <div className="form-group">
                        <button className="btn btn-primary search-button float-end">{getDictionValue(dictionaryItems, "Search.SearchButton")} <FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                </div>
                <div className="col-lg-8 col-md-10 mx-auto">

                </div>
            </div>
        </form>
        </div>
    </>
  );
}