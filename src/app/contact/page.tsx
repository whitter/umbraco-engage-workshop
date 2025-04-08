import { ContactContentResponseModel } from "@/api/model";
import { PageHeader } from "@/components/partials/pageHeader";
import { getPage } from "@/umbraco";
import { getDictionaryItems } from "@/utls";


export default async function Page() {

  const dictionaryItems = await getDictionaryItems();
  const pageContent = await getPage<ContactContentResponseModel>(`/contact/`);

  return (
    <>
      {pageContent && <PageHeader content={pageContent} />}
      <main className="mb-4">
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                
                </div>
            </div>
          </div>
      </main>
    </>
  );
}