import { ApiBlockItemModel } from "@/api";
import { LatestArticles } from "@/components/blockList/latestArticles";
import { ImageRow } from "@/components/blockList/imageRow";
import { RichTextRow } from "@/components/blockList/richTextRow";
import { DictionaryItem } from "@/utls";
import { ImageCarouselRow } from "@/components/blockList/imageCarouselRow";
import { VideoRow } from "@/components/blockList/videoRow";
import { CodeSnippetRow } from "@/components/blockList/codeSnippetRow";

const components = [
  { contentType: "codeSnippetRow", component: CodeSnippetRow }, 
  { contentType: "latestArticlesRow", component: LatestArticles }, 
  { contentType: "imageRow", component: ImageRow }, 
  { contentType: "imageCarouselRow", component: ImageCarouselRow }, 
  { contentType: "richTextRow", component: RichTextRow },
  { contentType: "videoRow", component: VideoRow },
];

export function GetComponent(dictionary: DictionaryItem[], item: ApiBlockItemModel) {

  const matchedComponent = components.find(c => c.contentType === item.content?.contentType);

  if(matchedComponent === undefined) console.log(`Component ${item.content?.contentType} not found`)

  // If a matching component is found, instantiate it with the props
  return matchedComponent ? <matchedComponent.component dictionary={dictionary} content={item.content} settings={item.settings} pageNo={1} /> : null;
}