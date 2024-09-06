const CircleLineIcon = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_22_9578)">
        <circle cx="7.5" cy="7.5" r="7.5" fill="#111111" fillOpacity="0.16" />
        <circle cx="7.5" cy="7.5" r="6.5" stroke="#8F9BBF" strokeWidth="2" />
      </g>
      <defs>
        <filter
          id="filter0_b_22_9578"
          x="-46"
          y="-46"
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
            result="effect1_backgroundBlur_22_9578"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_22_9578"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default CircleLineIcon;
