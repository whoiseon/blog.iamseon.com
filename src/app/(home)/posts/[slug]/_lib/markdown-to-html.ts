import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import rehypeShiki from "./rehype-shiki";

/**
 * Notion API 마크다운은 문단 사이에 빈 줄(\n\n) 없이 단일 줄바꿈(\n)만 사용합니다.
 * 표준 마크다운에서는 \n\n이 문단 구분이므로, 코드블록 외부의 단일 \n을 \n\n으로 변환합니다.
 */
function normalizeNotionLineBreaks(markdown: string): string {
  const lines = markdown.split("\n");
  const result: string[] = [];
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trimStart().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
    }

    result.push(line);

    if (
      !inCodeBlock &&
      i < lines.length - 1 &&
      line.trim() !== "" &&
      lines[i + 1].trim() !== "" &&
      !line.trimStart().startsWith("```") &&
      !lines[i + 1].trimStart().startsWith("```") &&
      !lines[i + 1].trimStart().startsWith(">") &&
      !line.trimStart().startsWith(">") &&
      !lines[i + 1].trimStart().startsWith("- ") &&
      !lines[i + 1].trimStart().startsWith("* ") &&
      !lines[i + 1].trimStart().match(/^\d+\. /) &&
      !line.trimStart().startsWith("- ") &&
      !line.trimStart().startsWith("* ") &&
      !line.trimStart().match(/^\d+\. /) &&
      !line.trimStart().startsWith("#") &&
      !lines[i + 1].trimStart().startsWith("#")
    ) {
      result.push("");
    }
  }

  return result.join("\n");
}

export async function markdownToHtml(markdown: string): Promise<string> {
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
