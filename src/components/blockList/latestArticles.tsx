import { IApiElementModel, LatestArticlesRowElementModel, LatestArticlesRowSettingsElementModel } from "@/api";
import { getArticles } from "@/umbraco";
import { DictionaryItem, getSpacingClass } from "@/utls";
import { LatestArticlesRow } from "./latestAriclesRow";

export const LatestArticles = async (props: { dictionary: DictionaryItem[], content?: IApiElementModel, settings?: IApiElementModel, pageNo: number }) => {

    const { dictionary, pageNo } = props;
    const content = props.content as LatestArticlesRowElementModel;
    const settings = props.settings as LatestArticlesRowSettingsElementModel;

    if (settings.properties?.hide ?? false) { return; }

    const spacingClasses = getSpacingClass(settings);
    const pageSize = content?.properties?.pageSize ?? 5;

    //really we should do this sorting on the server
    const allArticles = (await getArticles(content.properties?.articleList?.id))?.sort((a, b) => {
        const dateA = a.properties?.articleDate ? new Date(a.properties.articleDate).getTime() : 0;
        const dateB = b.properties?.articleDate ? new Date(b.properties.articleDate).getTime() : 0;
        
        return dateB - dateA;
    });

    const pageOfArticles = allArticles.slice((pageNo - 1) * pageSize, pageNo * pageSize);
    const totalItemCount = allArticles.length;
    const pageCount = totalItemCount > 0 ? Math.ceil(totalItemCount / pageSize) : 1;

    return (
        <div className={`row clearfix ${spacingClasses}`}>
            <div className="col-md-12 column">
                {pageOfArticles.map((article, index) => (<LatestArticlesRow key={index} dictionary={dictionary} article={article}/>))}
            </div>
        </div>  
    )
}

