export default function TrendDownIcon() {
  return (
    <svg
      width="66"
      height="64"
      viewBox="0 0 66 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_bd_22_10049)">
        <path
          d="M21 25C21 20.5817 24.5817 17 29 17H37C41.4183 17 45 20.5817 45 25V31C45 35.4183 41.4183 39 37 39H29C24.5817 39 21 35.4183 21 31V25Z"
          fill="url(#paint0_linear_22_10049)"
          shapeRendering="crispEdges"
        />
        <path
          d="M21 25C21 20.5817 24.5817 17 29 17H37C41.4183 17 45 20.5817 45 25V31C45 35.4183 41.4183 39 37 39H29C24.5817 39 21 35.4183 21 31V25Z"
          stroke="url(#paint1_linear_22_10049)"
          shapeRendering="crispEdges"
        />
      </g>
      <path
        d="M39 31L34.1111 26.2L31.6667 28.6L28 25M39 31H35.3333M39 31V27.4"
        stroke="#E85151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_bd_22_10049"
          x="0.5"
          y="0.5"
          width="65"
          height="63"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="7.5" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_22_10049"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_backgroundBlur_22_10049"
            result="effect2_dropShadow_22_10049"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_22_10049"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_22_10049"
          x1="28.7509"
          y1="17.8684"
          x2="36.955"
          y2="38.2223"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#28C45D" stopOpacity="0.08" />
          <stop offset="1" stopColor="#28C45D" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_22_10049"
          x1="21"
          y1="17"
          x2="32.8162"
          y2="44.6608"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E85151" stopOpacity="0.59" />
          <stop offset="1" stopColor="#E85151" stopOpacity="0.15" />
        </linearGradient>
      </defs>
    </svg>
  );
}
