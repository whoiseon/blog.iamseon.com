'use client';

import Image from 'next/image';

interface Props {
  text: string;
}

function EmptyBox({ text }: Props) {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="relative flex items-center justify-center w-[320px] h-[320px] my-8">
        <svg
          width="301"
          height="211"
          viewBox="0 0 301 211"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M44.8899 20.0978C76.3096 7.06442 78.2779 5.83255 98.8729 3.06431C111.906 1.31246 125.119 0.819552 138.238 1.73498C158.307 3.13541 175.705 5.45626 184.31 14.2823C198.486 28.821 255.396 25.4116 269.362 50.6291C279.024 68.0756 217.901 68.4391 210.632 79.7066C203.362 90.9742 259.073 63.3031 293.503 102.242C324.034 136.771 250.751 155.125 261.517 170.937C273.148 188.02 255.909 200.015 237.013 200.015C217.75 200.015 218.113 190.201 159.595 194.926C101.076 199.651 39.6499 231.637 7.81594 185.113C-20.148 144.244 58.3989 138.952 22.7183 102.242C-15.0821 63.3505 -4.17841 40.452 44.8899 20.0978Z"
            fill="currentColor"
            className="text-neutral-100 dark:text-neutral-900"
          />
          <path
            d="M233.742 51.9201L140.694 28.4576V104.26L233.742 106.967V51.9201Z"
            fill="#309354"
          />
          <path
            d="M141.421 28.4576L47.6465 56.4406V110.601H141.421V28.4576Z"
            fill="#40BF6E"
          />
          <path
            d="M47.6465 160.854V56.8081L143.602 77.165V182.568L47.6465 160.854Z"
            fill="#4ADE80"
          />
          <path
            d="M143.603 77.0743V182.568L233.743 153.139V51.7195L143.603 77.0743Z"
            fill="#40BF6E"
          />
          <path
            d="M159.456 109.148L143.603 76.9489L233.743 59.7159V80.577L159.456 109.148Z"
            fill="#1A542F"
            fillOpacity="0.4"
          />
          <path
            d="M149.418 77.9083V173.845L239.558 144.291V52.4465L149.418 77.9083Z"
            stroke="#0B4435"
            strokeOpacity="0.8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 8"
          />
          <path
            d="M47.6465 78.6162C54.4115 107.218 81.2249 165.986 135.554 180.749L143.602 182.568C140.855 182.069 138.173 181.46 135.554 180.749L47.6465 160.874V78.6162Z"
            fill="#40C370"
            fillOpacity="0.5"
          />
          <path
            d="M47.6465 89.0659V60.4428L143.602 77.2532L132.287 111.328L47.6465 89.0659Z"
            fill="#1A542F"
            fillOpacity="0.4"
          />
          <path
            d="M44.0117 152.965V57.535L139.967 77.7914V174.572L44.0117 152.965Z"
            stroke="#0B4435"
            strokeOpacity="0.8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 8"
          />
          <path
            d="M30.9268 81.4385L47.6697 56.8081L143.602 77.3334L127.312 103.332L30.9268 81.4385Z"
            fill="#6EFCA2"
          />
          <path
            d="M161.307 100.424L143.603 76.9739L233.939 51.7196L251.189 72.4642L161.307 100.424Z"
            fill="#6EFCA2"
          />
          <path
            d="M44.7383 51.4861L140.517 23.369L238.104 46.9511L143.68 72.8007L44.7383 51.4861Z"
            stroke="#0B4435"
            strokeOpacity="0.8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 8"
          />
        </svg>
      </div>
      <h2 className="text-neutral-600 dark:text-neutral-400 text-[2rem]">
        {text}
      </h2>
    </div>
  );
}

export default EmptyBox;
