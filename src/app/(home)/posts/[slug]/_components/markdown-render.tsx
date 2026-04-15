/* eslint-disable @next/next/no-img-element */
"use client";

import parse, { attributesToProps, type DOMNode, type Element } from "html-react-parser";
import Zoom from "react-medium-image-zoom";

import "react-medium-image-zoom/dist/styles.css";

function isElement(domNode: DOMNode): domNode is Element {
  return domNode.type === "tag";
}

export function MarkdownRender({ html }: { html: string }) {
  return (
    <div className="prose max-w-none">
      {parse(html, {
        replace(domNode: DOMNode) {
          if (!isElement(domNode) || domNode.name !== "img") return;

          const props = attributesToProps(domNode.attribs);
          const src = domNode.attribs.src ?? "";
          const alt = src.split("/").pop() ?? "";

          return (
            <Zoom wrapElement="span">
              <img {...props} alt={alt} />
            </Zoom>
          );
        },
      })}
    </div>
  );
}
