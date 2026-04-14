import GithubSlugger from "github-slugger";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function parseHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];

  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const text = match[2].trim();
    headings.push({
      id: slugger.slug(text),
      text,
      level: match[1].length,
    });
  }

  return headings;
}
