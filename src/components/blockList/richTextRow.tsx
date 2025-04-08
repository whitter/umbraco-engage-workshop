import { IApiElementModel, RichTextRowElementModel } from "@/api/model";
import { DictionaryItem, getSpacingClass } from "@/utls";
import HTMLParser from 'html-react-parser';

export const RichTextRow = async (props: { dictionary: DictionaryItem[], content?: IApiElementModel, settings?: IApiElementModel, pageNo?: number }) => {

    const content = props.content as RichTextRowElementModel;

    
    if(!content || !content.properties || !content.properties.content) return null;
    const spacingClasses = getSpacingClass(props.settings);

    return (
        <div className={`richtext ${spacingClasses}`}>
            {HTMLParser(content.properties.content.markup)}
        </div>
    )
}