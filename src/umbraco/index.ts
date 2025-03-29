import { ArticleContentResponseModel, ContentService, VisibilityControlsContentResponseModel } from "@/api";

export async function getPage<T>(handle: string): Promise<T | undefined> {

  const d = await ContentService.getContentItemByPath20({
    path: handle,
  });

  const page : T = d as T;
  return page;

}

export async function getArticles(id?: string): Promise<ArticleContentResponseModel[]> {

    if(!id) return [];

    const pages = await ContentService.getContent20({
        fetch: `children:${id}`
    });

    return pages.items.map((item) => item as ArticleContentResponseModel);
}
  
export async function getNavigation(): Promise<VisibilityControlsContentResponseModel[]> {
    const pages = await ContentService.getContent20({
        fetch: "children:/"
    });

    return pages.items.map((item) => item as VisibilityControlsContentResponseModel).filter(item => item.properties?.hideFromTopNavigation === false) as VisibilityControlsContentResponseModel[];
}
