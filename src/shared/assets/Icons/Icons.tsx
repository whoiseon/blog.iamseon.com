'use client';

interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

const defaultClassName = 'transition';

export const Icons = {
  Sun: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C12.5523 2 13 2.44772 13 3V5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5V3C11 2.44772 11.4477 2 12 2Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L17.7071 7.70711C17.3166 8.09763 16.6834 8.09763 16.2929 7.70711C15.9024 7.31658 15.9024 6.68342 16.2929 6.29289L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 12C18 11.4477 18.4477 11 19 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H19C18.4477 13 18 12.5523 18 12Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2929 16.2929C16.6834 15.9024 17.3166 15.9024 17.7071 16.2929L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L16.2929 17.7071C15.9024 17.3166 15.9024 16.6834 16.2929 16.2929Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 18C12.5523 18 13 18.4477 13 19V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V19C11 18.4477 11.4477 18 12 18Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.70711 16.2929C8.09763 16.6834 8.09763 17.3166 7.70711 17.7071L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L6.29289 16.2929C6.68342 15.9024 7.31658 15.9024 7.70711 16.2929Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 12C2 11.4477 2.44772 11 3 11H5C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13H3C2.44772 13 2 12.5523 2 12Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L7.70711 6.29289C8.09763 6.68342 8.09763 7.31658 7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"
        fill="currentColor"
      />
    </svg>
  ),
  Moon: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        fill="currentColor"
      />
    </svg>
  ),
  Computer: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="0 0 24 24"
    >
      <title>laptop_fill</title>
      <g id="1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Device"
          transform="translate(-528.000000, -48.000000)"
          fillRule="nonzero"
        >
          <g id="laptop_fill" transform="translate(528.000000, 48.000000)">
            <path
              d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
              id="MingCute"
              fillRule="nonzero"
            ></path>
            <path
              d="M21,19 C21.5523,19 22,19.4477 22,20 C22,20.51285 21.613973,20.9355092 21.1166239,20.9932725 L21,21 L3,21 C2.44772,21 2,20.5523 2,20 C2,19.48715 2.38604429,19.0644908 2.88337975,19.0067275 L3,19 L21,19 Z M19,4 C20.0543909,4 20.9181678,4.81587733 20.9945144,5.85073759 L21,6 L21,16 C21,17.0543909 20.18415,17.9181678 19.1492661,17.9945144 L19,18 L5,18 C3.94563773,18 3.08183483,17.18415 3.00548573,16.1492661 L3,16 L3,6 C3,4.94563773 3.81587733,4.08183483 4.85073759,4.00548573 L5,4 L19,4 Z"
              id="2"
              fill="currentColor"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Github: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="0 0 20 20"
    >
      <title>github [#142]</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Dribbble-Light-Preview"
          transform="translate(-140.000000, -7559.000000)"
          fill="currentColor"
        >
          <g id="icons" transform="translate(56.000000, 160.000000)">
            <path
              d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
              id="github-[#142]"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  Close: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
        fill="currentColor"
      />
    </svg>
  ),
  BackArrow: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M17.0475 8.055H3.2275L9.5275 1.645C9.8975 1.265 9.8975 0.655 9.5275 0.285C9.1575 -0.095 8.5575 -0.095 8.1875 0.285L0.2775 8.335C-0.0925 8.715 -0.0925 9.325 0.2775 9.695L8.1675 17.715C8.5375 18.095 9.1375 18.095 9.5075 17.715C9.8775 17.335 9.8775 16.725 9.5075 16.355L3.2375 9.975H17.0575C17.5775 9.975 18.0075 9.545 18.0075 9.015C18.0075 8.485 17.5875 8.055 17.0575 8.055H17.0475Z"
        fill="currentColor"
      />
    </svg>
  ),
  Thumbnail: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_35_515)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 8.75C6.034 8.75 5.25 7.966 5.25 7C5.25 6.034 6.034 5.25 7 5.25C7.966 5.25 8.75 6.034 8.75 7C8.75 7.966 7.966 8.75 7 8.75ZM7 3.5C5.06712 3.5 3.5 5.06712 3.5 7C3.5 8.93287 5.06712 10.5 7 10.5C8.93287 10.5 10.5 8.93287 10.5 7C10.5 5.06712 8.93287 3.5 7 3.5ZM26.25 14.987L21 9.625L12.3016 18.4721L8.75 14.875L1.75 21.2949V3.5C1.75 2.534 2.534 1.75 3.5 1.75H24.5C25.466 1.75 26.25 2.534 26.25 3.5V14.987ZM26.25 24.5C26.25 25.466 25.466 26.25 24.5 26.25H19.978L13.531 19.7181L21 12.2491L26.25 17.4991V24.5ZM3.5 26.25C2.534 26.25 1.75 25.466 1.75 24.5V23.6784L8.70188 17.4519L17.5009 26.25H3.5ZM24.5 0H3.5C1.56712 0 0 1.56712 0 3.5V24.5C0 26.4329 1.56712 28 3.5 28H24.5C26.4329 28 28 26.4329 28 24.5V3.5C28 1.56712 26.4329 0 24.5 0Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_35_515">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  Series: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.66929 6.66385C1.64354 6.32072 1.79783 5.98033 2.07375 5.82969L9.42511 1.81627C9.79032 1.61691 10.2093 1.61691 10.5746 1.81627L17.9259 5.82969C18.2018 5.98033 18.3561 6.32072 18.3304 6.66385C18.3561 7.00697 18.2018 7.34736 17.9259 7.498L10.5746 11.5114C10.2093 11.7108 9.79032 11.7108 9.42511 11.5114L2.07375 7.498C1.79783 7.34736 1.64354 7.00697 1.66929 6.66385ZM2.07375 10.8343C1.7246 10.6437 1.57022 10.1491 1.72892 9.72977C1.88762 9.31048 2.29931 9.12507 2.64846 9.31566L9.99983 13.3291L17.3512 9.31566C17.7004 9.12507 18.1121 9.31048 18.2707 9.72977C18.4295 10.1491 18.275 10.6437 17.9259 10.8343L10.5746 14.8477C10.2093 15.047 9.79032 15.047 9.42511 14.8477L2.07375 10.8343ZM2.07375 14.1705C1.7246 13.9799 1.57022 13.4854 1.72892 13.0661C1.88762 12.6467 2.29931 12.4613 2.64846 12.6519L9.99983 16.6653L17.3512 12.6519C17.7004 12.4613 18.1121 12.6467 18.2707 13.0661C18.4295 13.4854 18.275 13.9799 17.9259 14.1705L10.5746 18.1839C10.2093 18.3832 9.79032 18.3832 9.42511 18.1839L2.07375 14.1705Z"
        fill="currentColor"
      />
    </svg>
  ),
  Lock: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 12.3149V14.1667M14.6875 8.1749C14.2455 8.14823 13.7007 8.14823 13 8.14823H7C6.29931 8.14823 5.75444 8.14823 5.3125 8.1749M14.6875 8.1749C15.2391 8.20814 15.6304 8.28295 15.9643 8.45101C16.4936 8.7173 16.9238 9.14221 17.1935 9.6649C17.5 10.2592 17.5 11.0369 17.5 12.5927V13.889C17.5 15.4447 17.5 16.2225 17.1935 16.8167C16.9238 17.3394 16.4936 17.7643 15.9643 18.0306C15.3627 18.3334 14.5751 18.3334 13 18.3334H7C5.42481 18.3334 4.63731 18.3334 4.03563 18.0306C3.50641 17.7643 3.07619 17.3394 2.80656 16.8167C2.5 16.2225 2.5 15.4447 2.5 13.889V12.5927C2.5 11.0369 2.5 10.2592 2.80656 9.6649C3.07619 9.14221 3.50641 8.7173 4.03563 8.45101C4.36966 8.28295 4.76097 8.20814 5.3125 8.1749M14.6875 8.1749V6.29638C14.6875 3.73951 12.5888 1.66675 10 1.66675C7.41119 1.66675 5.3125 3.73951 5.3125 6.29638V8.1749"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  UserIcon: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9999 6C9.79077 6 7.99991 7.79086 7.99991 10C7.99991 12.2091 9.79077 14 11.9999 14C14.209 14 15.9999 12.2091 15.9999 10C15.9999 7.79086 14.209 6 11.9999 6ZM17.1115 15.9974C17.8693 16.4854 17.8323 17.5491 17.1422 18.1288C15.7517 19.2966 13.9581 20 12.0001 20C10.0551 20 8.27215 19.3059 6.88556 18.1518C6.18931 17.5723 6.15242 16.5032 6.91351 16.012C7.15044 15.8591 7.40846 15.7251 7.68849 15.6097C8.81516 15.1452 10.2542 15 12 15C13.7546 15 15.2018 15.1359 16.3314 15.5954C16.6136 15.7102 16.8734 15.8441 17.1115 15.9974Z"
        fill="currentColor"
      />
    </svg>
  ),
  ConfigArrow: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 7.01065L16.0162 6L9.99082 12.0082L9.34816 11.3675L9.3517 11.3707L3.99859 6.03231L3 7.02841C4.47952 8.50388 8.61017 12.6231 9.99082 14C11.0169 12.9774 10.0169 13.9746 17 7.01065Z"
        fill="currentColor"
      />
    </svg>
  ),
  Bold: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="-2 0 22 22"
      id="meteor-icon-kit__solid-bold"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 2.91465C0.9174 2.70873 0.5 2.15311 0.5 1.5C0.5 0.67157 1.17157 0 2 0H9.5C12.8137 0 15.5 2.68629 15.5 6C15.5 7.44502 14.9892 8.77073 14.1383 9.8064C16.1426 10.9135 17.5 13.0482 17.5 15.5C17.5 19.0899 14.5899 22 11 22H2C1.17157 22 0.5 21.3284 0.5 20.5C0.5 19.8469 0.9174 19.2913 1.5 19.0854V2.91465zM4.5 3V9H9.5C11.1569 9 12.5 7.65685 12.5 6C12.5 4.34315 11.1569 3 9.5 3H4.5zM4.5 12V19H11C12.933 19 14.5 17.433 14.5 15.5C14.5 13.567 12.933 12 11 12H4.5z"
        fill="currentColor"
      />
    </svg>
  ),
  Italic: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 3L8 17m4-14H8m4 0h4M8 17H4m4 0h4"
      />
    </svg>
  ),
  Strike: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 5H10C8.34315 5 7 6.34315 7 8V9C7 10.6569 8.34315 12 10 12H17M7 19H14C15.6569 19 17 17.6569 17 16V15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  ),
  Heading: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 4v8m0 8v-8m10-8v8m0 8v-8m0 0H7M5 4h4m6 0h4m0 16h-4m-6 0H5"
      />
    </svg>
  ),
  Blockquote: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className} si-glyph si-glyph-quote-close`}
      viewBox="0 -0.5 17 17"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(1.000000, 1.000000)" fill="currentColor">
          <path
            d="M1,13.969 C0.447,13.969 0,13.534 0,13 C0,12.466 0.447,12.031 1,12.031 C3.757,12.031 5,10.83 5,8.124 L5,6.978 L1.559,6.978 C0.729,6.978 0.053,6.3 0.053,5.467 L0.053,1.511 C0.053,0.677 0.729,-0.001 1.559,-0.001 L5.494,-0.001 C6.324,-0.001 7,0.677 7,1.511 L7,8.123 C7,11.898 4.859,13.969 1,13.969 L1,13.969 Z"
            className="si-glyph-fill"
          ></path>
          <path
            d="M10,13.969 C9.447,13.969 9,13.534 9,13 C9,12.466 9.447,12.031 10,12.031 C12.757,12.031 14,10.83 14,8.124 L14,6.947 L10.533,6.947 C9.699,6.947 9.021,6.271 9.021,5.441 L9.021,1.505 C9.021,0.675 9.699,-0.001 10.533,-0.001 L14.488,-0.001 C15.322,-0.001 16,0.675 16,1.505 L16,8.123 C16,11.898 13.859,13.969 10,13.969 L10,13.969 Z"
            className="si-glyph-fill"
          ></path>
        </g>
      </g>
    </svg>
  ),
  CodeBlock: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 8L5 11.6923L9 16M15 8L19 11.6923L15 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Link: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 7H16C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17H14M10 7H8C5.23858 7 3 9.23858 3 12C3 14.7614 5.23858 17 8 17H10M8 12H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Image: ({ width = 24, height = 24, className }: IconProps) => (
    <svg
      width={width}
      height={width}
      className={`${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM7.5 10C8.88071 10 10 8.88071 10 7.5C10 6.11929 8.88071 5 7.5 5C6.11929 5 5 6.11929 5 7.5C5 8.88071 6.11929 10 7.5 10ZM10.3536 13.3536L12.5 15.5L18.1464 9.85355C18.4614 9.53857 19 9.76165 19 10.2071V19H5V18L9.64645 13.3536C9.84171 13.1583 10.1583 13.1583 10.3536 13.3536Z"
        fill="currentColor"
      />
    </svg>
  ),
};
