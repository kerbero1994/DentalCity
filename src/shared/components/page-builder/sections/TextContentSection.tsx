import DOMPurify from "isomorphic-dompurify";
import type { TextContentSection } from "@/core/types/lib/page-builder";
import { getContentContainerClass } from "../utils/section-styles";

export function TextContentSectionComponent({ section }: { section: TextContentSection }) {
  const { content, textContent } = section;

  return (
    <div className={getContentContainerClass()}>
      {content?.title && <h2 className="mb-6 text-3xl font-bold">{content.title}</h2>}

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(textContent.body, {
            ALLOWED_TAGS: [
              "p",
              "br",
              "strong",
              "em",
              "u",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "ul",
              "ol",
              "li",
              "a",
              "img",
              "blockquote",
              "code",
              "pre",
              "span",
              "div",
            ],
            ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "id", "target", "rel"],
          }),
        }}
      />
    </div>
  );
}
