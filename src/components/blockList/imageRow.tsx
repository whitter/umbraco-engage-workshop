import { IApiElementModel, ImageRowPropertiesModel } from "@/api/model";
import { DictionaryItem, getSpacingClass, ImagesToImageMap } from "@/utls";
import Image from "next/image";

export const ImageRow = async (props: { dictionary: DictionaryItem[], content?: IApiElementModel, settings?: IApiElementModel, pageNo?: number }) => {

    const content = props.content?.properties as ImageRowPropertiesModel;

    const image = ImagesToImageMap(content.image)
    const spacingClasses = getSpacingClass(props.settings);

    if(!image) return null;

    return (
        <div className={`image ${spacingClasses}`}>
            <Image src={image.src!} alt={image.alt!} width={800} height={600} />
            {content.caption && <p className="caption">{content.caption}</p>}
        </div>
    )
}