const StartFlag = () => {
  return (
    <svg
      width="25"
      height="227"
      viewBox="0 0 25 227"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 21V14"
        stroke="#ECF3FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14C8 14 9 13 12 13C15 13 17 15 20 15C23 15 24 14 24 14V2C24 2 23 3 20 3C17 3 15 1 12 1C9 1 8 2 8 2V14Z"
        stroke="#ECF3FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="7.5" y1="24" x2="7.50001" y2="212" stroke="#ECF3FF" />
      <g filter="url(#filter0_b_1974_90553)">
        <circle cx="7.5" cy="219.5" r="7.5" fill="#111111" fillOpacity="0.16" />
        <circle cx="7.5" cy="219.5" r="6.5" stroke="#ECF3FF" strokeWidth="2" />
      </g>
      <defs>
        <filter
          id="filter0_b_1974_90553"
          x="-46"
          y="166"
          width="107"
          height="107"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="23" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_1974_90553"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_1974_90553"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default StartFlag;
