export default function LiquidGlassFilter() {
  return (
    <svg aria-hidden="true" className="fixed h-0 w-0" focusable="false">
      <filter
        id="liquid-glass-filter"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
        filterUnits="objectBoundingBox"
        primitiveUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.009 0.015"
          numOctaves="2"
          seed="9"
          stitchTiles="stitch"
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="0.45" result="softNoise" />
        <feColorMatrix
          in="softNoise"
          type="matrix"
          values="
            1.2 0   0   0  -0.06
            0   1.2 0   0  -0.06
            0   0   1   0   0
            0   0   0   1   0
          "
          result="contrastNoise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="contrastNoise"
          scale="3.4"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displaced"
        />
        <feGaussianBlur in="displaced" stdDeviation="0.08" />
      </filter>
    </svg>
  );
}
