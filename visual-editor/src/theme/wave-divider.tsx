import React from "react";

export default function WaveDivider() {
  return (
    <svg
      className="wave-divider"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "60px" }}
    >
      <path
        fill="var(--color-primary)"
        d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
      ></path>
    </svg>
  );
}