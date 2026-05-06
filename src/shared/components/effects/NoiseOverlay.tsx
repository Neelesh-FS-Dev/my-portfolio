import { memo } from "react";

function NoiseOverlay() {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="scanline-overlay" aria-hidden="true" />
    </>
  );
}

export default memo(NoiseOverlay);
