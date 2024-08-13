'use client';

import '../../lib/styles/prism.css';
import '../../lib/styles/markdown.css';

import katexWhitelist from '@/src/features/write/lib/katexWhiteList';
import sanitize from 'sanitize-html';
import { useEffect, useMemo, useState } from 'react';
import { remark } from 'remark';
import breaks from 'remark-breaks';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import math from 'remark-math';
import katex from 'rehype-katex';
import stringify from 'rehype-stringify';
import slug from 'rehype-slug';
import prismPlugin from '@/src/features/write/lib/prismPlugin';
import { throttle } from 'throttle-debounce';
import parse from 'html-react-parser';
import { setHeadingId } from '@/src/widgets/post/lib/utils';
import Typography from '@/src/features/post/ui/MarkdownRender/Typography';
import MarkdownRenderErrorBoundary from '@/src/features/post/ui/MarkdownRender/MarkdownRenderErrorBoundary';

function strikeThrough(htmlString: string) {
  return htmlString.replace(/~~(.*?)~~/g, '<del>$1</del>');
}

function sanitizeEventScript(htmlString: string) {
  return htmlString.replace(/ on\w+="[^"]*"/g, '');
}

function filter(html: string) {
  const presanitized = sanitizeEventScript(html);
  return sanitize(presanitized, {
    allowedTags: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'p',
      'a',
      'ul',
      'ol',
      'nl',
      'li',
      'b',
      'i',
      'strong',
      'em',
      'strike',
      'code',
      'hr',
      'br',
      'div',
      'table',
      'thead',
      'caption',
      'tbody',
      'tr',
      'th',
      'td',
      'pre',
      'iframe',
      'span',
      'img',
      'del',
      'input',

      ...katexWhitelist.tags,
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src'],
      iframe: ['src', 'allow', 'allowfullscreen', 'scrolling', 'class'],
      '*': ['class', 'id', 'aria-hidden'],
      span: ['style'],
      input: ['type'],
      ol: ['start'],
      ...katexWhitelist.attributes,
    },
    allowedStyles: {
      '*': {
        // Match HEX and RGB
        color: [
          /^#(0x)?[0-9a-f]+$/i,
          /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
        ],
        'text-align': [/^left$/, /^right$/, /^center$/],
      },
      span: {
        ...katexWhitelist.styles,
      },
    },
    allowedIframeHostnames: ['www.youtube.com', 'codesandbox.io', 'codepen.io'],
  });
}

type RenderedElement = string | React.JSX.Element | React.JSX.Element[];

interface Props {
  markdown?: string;
  editing?: boolean;
  className?: string;
}

function MarkdownRender({ markdown, editing, className }: Props) {
  const [html, setHtml] = useState(
    filter(
      remark()
        .use(breaks)
        .use(slug)
        .use(remarkParse)
        .use(prismPlugin)
        .use(remark2rehype, { allowDangerousHtml: true })
        .use(raw)
        .use(math)
        .use(katex)
        .use(stringify)
        .processSync(markdown)
        .toString(),
    ),
  );

  const [hasTagError, setHasTagError] = useState(false);
  const [element, setElement] = useState<RenderedElement | null>(null);
  const [delay, setDelay] = useState(25);

  const throttledUpdate = useMemo(() => {
    return throttle(delay, (markdown: string) => {
      remark()
        .use(breaks)
        .use(slug)
        .use(remarkParse)
        .use(prismPlugin)
        .use(remark2rehype, { allowDangerousHtml: true })
        .use(raw)
        .use(math)
        .use(katex)
        .use(stringify)
        .process(markdown, (err: any, file: any) => {
          const lines = markdown.split(/\r\n|\r|\n/).length;
          const nextDelay = Math.max(
            Math.min(Math.floor(lines * 0.5), 1500),
            22,
          );

          if (nextDelay !== delay) {
            setDelay(nextDelay);
          }

          const html = setHeadingId(strikeThrough(String(file)));

          if (!editing) {
            setHtml(filter(html));
            return;
          }

          try {
            const el = parse(html);
            setElement(el);
          } catch (e) {}
        });
    });
  }, [delay, editing]);

  useEffect(() => {
    throttledUpdate(markdown as string);
  }, [markdown, throttledUpdate]);

  return (
    <Typography>
      {editing ? (
        <MarkdownRenderErrorBoundary
          onError={() => setHasTagError(true)}
          hasTagError={hasTagError}
        >
          <div className="markdown-render-block prism-theme">{element}</div>
        </MarkdownRenderErrorBoundary>
      ) : (
        <div
          suppressHydrationWarning
          className={`markdown-render-block prism-theme ${className ? className : ''}`}
          dangerouslySetInnerHTML={{ __html: setHeadingId(html) }}
        />
      )}
    </Typography>
  );
}

export default MarkdownRender;
