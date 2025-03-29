import { ApiLinkModel, LinkTypeModel, IApiMediaWithCropsModel, SpacingPropertiesPropertiesModel, IApiElementModel } from "./api";

export interface Link {
  href?: string,
  label?: string;
  target?: string;
  newTab?: boolean;
  linkType?: LinkTypeModel;
}

export interface Image {
    src?: string;
    alt?: string;
  }

export const LinksToLinkMap = (source: ApiLinkModel[]): Link | undefined => {
  if (source == null || source.length === 0) {
    return undefined;
  }

  const links = source.map(item => LinkMap(item));

  return links[0] || undefined;
};

export const LinksMap = (source: ApiLinkModel[]) : Link[] => {
  if (source == null) return [];
  return source
    .filter(item => item !== undefined)
    .map(item => LinkMap(item)!)
}

export const LinkMap = (source: ApiLinkModel) : Link | undefined => {
  if (source == null) return undefined;
  let href = source.url;
  if (source.route) {
    href = source.queryString ? `${source.route.path}${source.queryString}` : source.route.path
  }

  return {
    href: href!,
    label: source.title!,
    target: source.target!,
    linkType: source.linkType,
  };
}

export const ImageMap = (source?: IApiMediaWithCropsModel | null): Image | undefined => {
    if (!source) return undefined;
    return {
      src: source.url,
    }
  }

export const ImagesToImageMap = (source?: IApiMediaWithCropsModel[] | null): Image | undefined => {
    if (source == null || source.length === 0 || source === undefined) {
      return undefined;
    }
  
    const links = source.map(item => ImageMap(item));
  
    return links[0] || undefined;
  };

export const ImagesToImagesMap = (source?: IApiMediaWithCropsModel[] | null): Image[] => {
    if (source == null || source.length === 0 || source === undefined) {
      return [];
    }
  
    const links = source.map(item => ImageMap(item)).filter(item => item !== undefined);
  
    return links || [];
  };

export interface DictionaryItem {
    Id: string,
    Key: string,
    Value: string
  }
  
export const getDictionValue = (dictionaryItems: DictionaryItem[] | undefined, key: string): string | undefined => {
    if(dictionaryItems === undefined) return undefined;
    return dictionaryItems.find(item => item.Key === key)?.Value;
}

export const getDictionaryItems = async (): Promise<DictionaryItem[]> => {
    try {
      const response = await fetch('http://localhost:23142/api/v1.0/dictionary/GetDictionaryTranslations');
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const dictionaryItems: DictionaryItem[] = await response.json();
      return dictionaryItems;
    } catch (error) {
      console.error("Error fetching dictionary items:", error);
      return [];
    }
  };


  export function getSpacingClasses(
    paddingTop?: (string) | null, 
    paddingBottom?: (string) | null, 
    paddingLeft?: (string) | null, 
    paddingRight?: (string) | null, 
    marginTop?: (string) | null, 
    marginBottom?: (string) | null, 
    marginLeft?: (string) | null, 
    marginRight?: (string) | null
  ): string {
    const classList: string[] = [
      getClassIfNotEmpty("pt-", paddingTop!),
      getClassIfNotEmpty("pb-", paddingBottom!),
      getClassIfNotEmpty("ps-", paddingLeft!),
      getClassIfNotEmpty("pe-", paddingRight!),
      getClassIfNotEmpty("mt-", marginTop!),
      getClassIfNotEmpty("mb-", marginBottom!),
      getClassIfNotEmpty("ms-", marginLeft!),
      getClassIfNotEmpty("me-", marginRight!),
    ];
  
    return classList.filter(Boolean).join(" ");
  }
  
  export function getClassIfNotEmpty(prefix: string, value?: string): string {
    return value?.trim() ? `${prefix}${value}` : "";
  }

  export function getSpacingClass(settings?: IApiElementModel) {
    if (!settings) return "";
    let spacingClasses = "";

    if (settings.properties && "paddingTop" in settings.properties) {
        const spacing: SpacingPropertiesPropertiesModel = settings.properties as SpacingPropertiesPropertiesModel;
        spacingClasses = getSpacingClasses(
            spacing.paddingTop,
            spacing.paddingBottom,
            spacing.paddingLeft,
            spacing.paddingRight,
            spacing.marginTop,
            spacing.marginBottom,
            spacing.marginLeft,
            spacing.marginRight
        );
    }

    return spacingClasses;
}

export function getYouTubeVideoId(youtubeUrl: string): string | null {
    try {
        const url = new URL(youtubeUrl);

        if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
            const videoId = url.searchParams.get("v");
            return videoId ?? null;
        } 
        
        if (url.hostname === "youtu.be") {
            return url.pathname.split("/").pop() || null;
        }
    } catch (error) {
        console.error("Invalid URL:", error);
    }

    return null;
}