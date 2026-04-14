import type { Element, ElementContent, Root } from "hast";
import { toString } from "hast-util-to-string";
import { createHighlighter, type ShikiTransformer } from "shiki";
import { visit } from "unist-util-visit";

interface RawNode {
  type: "raw";
  value: string;
}

const LANGUAGE_LABELS: Record<string, string> = {
  js: "JavaScript",
  jsx: "JavaScript",
  ts: "TypeScript",
  tsx: "TypeScript",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  json: "JSON",
  yaml: "YAML",
  yml: "YAML",
  md: "Markdown",
  mdx: "MDX",
  bash: "Terminal",
  sh: "Terminal",
  shell: "Terminal",
  zsh: "Terminal",
  python: "Python",
  py: "Python",
  go: "Go",
  rust: "Rust",
  java: "Java",
  kotlin: "Kotlin",
  swift: "Swift",
  sql: "SQL",
  graphql: "GraphQL",
  docker: "Docker",
  dockerfile: "Docker",
  plaintext: "Text",
  text: "Text",
  txt: "Text",
};

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-dark-default", "github-light-default"],
      langs: [
        "javascript",
        "typescript",
        "jsx",
        "tsx",
        "html",
        "css",
        "json",
        "bash",
        "python",
        "go",
        "rust",
        "java",
        "sql",
        "yaml",
        "markdown",
        "graphql",
        "docker",
        "plaintext",
      ],
    });
  }
  return highlighter;
}

function getLanguage(node: Element): string {
  const className = node.properties?.className;
  if (Array.isArray(className)) {
    for (const cls of className) {
      if (typeof cls === "string" && cls.startsWith("language-")) {
        return cls.replace("language-", "");
      }
    }
  }
  return "plaintext";
}

export default function rehypeShiki() {
  return async (tree: Root) => {
    const shiki = await getHighlighter();
    const nodes: { parent: Element; index: number; code: Element; lang: string }[] = [];

    visit(tree, "element", (node: Element, index, parent) => {
      if (
        node.tagName === "pre" &&
        node.children.length === 1 &&
        (node.children[0] as Element).tagName === "code"
      ) {
        const code = node.children[0] as Element;
        const lang = getLanguage(code);
        if (parent && typeof index === "number") {
          nodes.push({ parent: parent as Element, index, code, lang });
        }
      }
    });

    for (const { parent, index, code, lang } of nodes) {
      const codeText = toString(code);
      const label = LANGUAGE_LABELS[lang] ?? lang;

      const shikiOptions = {
        themes: { dark: "github-dark-default", light: "github-light-default" } as const,
        defaultColor: false as const,
        transformers: [
          {
            pre(node) {
              // Remove inline background styles set by shiki
              if (node.properties?.style) {
                node.properties.style = (node.properties.style as string)
                  .replace(/--shiki-dark-bg:[^;]+;?/g, "")
                  .replace(/--shiki-light-bg:[^;]+;?/g, "");
              }
            },
          } satisfies ShikiTransformer,
        ],
      };

      let highlighted: string;
      try {
        highlighted = shiki!.codeToHtml(codeText, { lang, ...shikiOptions });
      } catch {
        highlighted = shiki!.codeToHtml(codeText, { lang: "plaintext", ...shikiOptions });
      }

      const escapedCode = codeText
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;");

      const svgTerminal =
        '<svg data-code-icon xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>';
      const svgCopy =
        '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';

      const headerHtml = `<div data-code-header><span data-code-lang>${svgTerminal} ${label}</span><button data-copy-button data-code="${escapedCode}" type="button" aria-label="Copy code">${svgCopy}</button></div>`;

      const figureNode: RawNode = {
        type: "raw",
        value: `<figure data-code-block data-lang="${lang}">${headerHtml}${highlighted}</figure>`,
      };

      (parent.children as (ElementContent | RawNode)[])[index] = figureNode;
    }
  };
}
