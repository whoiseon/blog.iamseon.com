'use client';

import { escapeForUrl } from '@/src/shared/lib/utils';

export function setHeadingId(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;

  const h1 = div.querySelectorAll('h1');
  const h2 = div.querySelectorAll('h2');
  const h3 = div.querySelectorAll('h3');

  const idList: string[] = [];

  const setId = (element: HTMLHeadingElement) => {
    const id = escapeForUrl(element.innerText);
    const exists = idList.filter((existingId) => existingId.indexOf(id) !== -1);
    const uniqueId = `${id}${exists.length === 0 ? '' : `-${exists.length}`}`;
    element.id = uniqueId;
    idList.push(uniqueId);
  };

  [h1, h2, h3].forEach((headings) => headings.forEach(setId));

  return div.innerHTML;
}

export type TOCItem = {
  text: string;
  level: string;
  id: string;
  link: string;
  rawId: string;
};

export function parseHeadings(markdown: string) {
  const headingsLines = markdown
    .split('\n')
    .filter((line) => line.match(/^#{1,3}\s/));

  const headings: TOCItem[] = [];

  headingsLines.forEach((line) => {
    const text = line.replace(/^#{1,3}\s/, '');
    const rawId = escapeForUrl(text);
    const nodeLength = headings.filter((item) => item.rawId === rawId).length;
    const id = nodeLength > 0 ? `${rawId}-${nodeLength}` : rawId;
    const link = `#${id}`;
    let level = '1';
    if (line.startsWith('## ')) level = '2';
    if (line.startsWith('### ')) level = '3';

    headings.push({ text, level, id, link, rawId });
  });

  return headings;
}
