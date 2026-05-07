import { cacheLife } from "next/cache";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import rehypeShiki from "./plugin/rehype-shiki";

/**
 * Notion API 마크다운은 문단 사이에 빈 줄(\n\n) 없이 단일 줄바꿈(\n)만 사용합니다.
 * 표준 마크다운에서는 \n\n이 문단 구분이므로, 코드블록 외부의 단일 \n을 \n\n으로 변환합니다.
 */
const HTML_BLOCK_TAGS =
  /^<\/?(table|thead|tbody|tfoot|tr|th|td|div|details|summary|figure|figcaption|section|aside|nav|header|footer|dl|dt|dd)\b/i;

function normalizeNotionLineBreaks(markdown: string): string {
  const lines = markdown.split("\n");
  const result: string[] = [];
  let inCodeBlock = false;
  let inHtmlBlock = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();

    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
    }

    if (!inCodeBlock) {
      const openTags = trimmed.match(
        /<(table|div|details|figure|section|aside|nav|header|footer|dl)\b/gi
      );
      const closeTags = trimmed.match(
        /<\/(table|div|details|figure|section|aside|nav|header|footer|dl)\b/gi
      );
      if (openTags) inHtmlBlock += openTags.length;
      if (closeTags) inHtmlBlock -= closeTags.length;
      if (inHtmlBlock < 0) inHtmlBlock = 0;
    }

    result.push(line);

    if (
      !inCodeBlock &&
      !inHtmlBlock &&
      i < lines.length - 1 &&
      line.trim() !== "" &&
      lines[i + 1].trim() !== "" &&
      !trimmed.startsWith("```") &&
      !lines[i + 1].trimStart().startsWith("```") &&
      !lines[i + 1].trimStart().startsWith(">") &&
      !trimmed.startsWith(">") &&
      !lines[i + 1].trimStart().startsWith("- ") &&
      !lines[i + 1].trimStart().startsWith("* ") &&
      !lines[i + 1].trimStart().match(/^\d+\. /) &&
      !trimmed.startsWith("- ") &&
      !trimmed.startsWith("* ") &&
      !trimmed.match(/^\d+\. /) &&
      !trimmed.startsWith("#") &&
      !lines[i + 1].trimStart().startsWith("#") &&
      !trimmed.startsWith("|") &&
      !lines[i + 1].trimStart().startsWith("|") &&
      !HTML_BLOCK_TAGS.test(trimmed) &&
      !HTML_BLOCK_TAGS.test(lines[i + 1].trimStart())
    ) {
      result.push("");
    }
  }

  return result.join("\n");
}

export async function markdownToHtml(markdown: string): Promise<string> {
  "use cache";
  cacheLife("max");

  const normalized = normalizeNotionLineBreaks(markdown);

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeShiki)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(normalized);

  return String(result);
}
