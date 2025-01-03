import { formatDate } from 'date-fns';

export function escapeForUrl(text: string): string {
  return text
    .replace(
      /[^0-9a-zA-Zㄱ-힣.\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf -]/g,
      '',
    )
    .trim()
    .replace(/ /g, '-')
    .replace(/--+/g, '-');
}

export function replaceDashToSpace(text: string): string {
  return text.replaceAll('-', ' ');
}

export function detectJSDOM() {
  if (window === undefined) return false;

  if (typeof window.navigator === 'undefined') return false;
  return window.navigator.userAgent.includes('jsdom');
}

export function getTodayDateToString() {
  return formatDate(new Date(), 'yyyy-MM-dd');
}

export function getScrollTop() {
  if (!document.body) return 0;
  return document.documentElement
    ? document.documentElement.scrollTop || document.body.scrollTop
    : document.body.scrollTop;
}
