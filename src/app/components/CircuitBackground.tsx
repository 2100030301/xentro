"use client";

import React from "react";
import "./circuit.css";

export function CircuitBackground({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="circuit-root">
      <svg
        className="circuit-frame"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Top */}
        <path className="circuit-path" d="M5 10 H95" />
        {/* Bottom */}
        <path className="circuit-path" d="M5 90 H95" />
        {/* Left */}
        <path className="circuit-path" d="M10 5 V95" />
        {/* Right */}
        <path className="circuit-path" d="M90 5 V95" />

        {/* Extra “circuit” details – tweak as you like */}
        <path className="circuit-path" d="M10 30 H25 V15" />
        <path className="circuit-path" d="M90 30 H75 V15" />
        <path className="circuit-path" d="M10 70 H30 V85" />
        <path className="circuit-path" d="M90 70 H70 V85" />
      </svg>

      <div className="circuit-content">{children}</div>
    </div>
  );
}
