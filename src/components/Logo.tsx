import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeMap = {
    sm: "w-12 h-12 text-[7px]",
    md: "w-20 h-20 text-[11px]",
    lg: "w-32 h-32 text-[18px]",
    xl: "w-52 h-52 text-[28px]",
  };

  const ringRadius = size === "xl" ? 90 : size === "lg" ? 56 : size === "md" ? 35 : 21;

  return (
    <div className={`relative inline-block select-none ${sizeMap[size]} ${className}`} id="brand-logo">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(212,175,55,0.15)] animate-spin-slow"
        style={{ animationDuration: "120s" }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Black Circular Base */}
        <circle cx="100" cy="100" r="98" fill="#151211" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="100" cy="100" r="94" fill="#0D0A09" />

        {/* Outer Segmented Gold Beaded Ring */}
        <circle
          cx="100"
          cy="100"
          r="86"
          stroke="#D4AF37"
          strokeWidth="3"
          strokeDasharray="4,4"
        />

        {/* Medium Concentric Inner Golden Band */}
        <circle cx="100" cy="100" r="80" stroke="#C5A028" strokeWidth="2" />
        <circle cx="100" cy="100" r="76" stroke="#C5A028" strokeWidth="1" />

        {/* Tiny Inward Dots Line */}
        <circle
          cx="100"
          cy="100"
          r="71"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeDasharray="1,5"
        />

        {/* Inner base circle */}
        <circle cx="100" cy="100" r="66" fill="#13100E" />
        <circle cx="100" cy="100" r="62" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,3" />

        {/* Brand Text Elements (Central Circle) */}
        <g id="logo-text-group">
          {/* MOMOS */}
          <text
            x="100"
            y="85"
            fill="url(#goldGradient)"
            fontSize="25"
            fontWeight="900"
            fontFamily="'Space Grotesk', 'Inter', sans-serif"
            textAnchor="middle"
            letterSpacing="2"
          >
            MOMOS
          </text>
          
          {/* KINGDOM */}
          <text
            x="100"
            y="112"
            fill="url(#goldGradient)"
            fontSize="21"
            fontWeight="800"
            fontFamily="'Space Grotesk', 'Inter', sans-serif"
            textAnchor="middle"
            letterSpacing="1.5"
          >
            KINGDOM
          </text>

          {/* Business Delivery Label */}
          <text
            x="100"
            y="44"
            fill="#D4AF37"
            fontSize="9"
            fontWeight="600"
            fontFamily="'Inter', sans-serif"
            textAnchor="middle"
            letterSpacing="0.5"
          >
            For Delivery
          </text>

          {/* Delivery Phone */}
          <text
            x="100"
            y="55"
            fill="#EAD075"
            fontSize="9"
            fontWeight="700"
            fontFamily="'Inter', sans-serif"
            textAnchor="middle"
          >
            0318-9212223
          </text>
        </g>

        {/* Dumbell / Dumpling Vector Drawings at the base inside */}
        <g id="dumpling-vectors" transform="translate(42, 125)">
          {/* Center Dumpling */}
          <path
            d="M58 24C58 24 53 14 50 12C47 14 42 24 42 24C34 24 30 28 30 35C30 42 39 44 50 44C61 44 70 42 70 35C70 28 66 24 58 24Z"
            fill="#CE9A2E"
            stroke="#110B02"
            strokeWidth="1.5"
          />
          <path
            d="M50 12V44M46 16C46 16 43 25 41 29M54 16C54 16 57 25 59 29M37 25C37 25 41 33 46 35M63 25C63 25 59 33 54 35"
            stroke="#1D1503"
            strokeWidth="1"
            fill="none"
          />

          {/* Left Dumpling (Angled Behind) */}
          <path
            d="M32 24C32 24 28 15 25 13C22 15 17 24 17 24C10 24 6 28 6 34C6 40 14 42 25 42C36 42 44 40 44 34C44 28 40 24 32 24Z"
            fill="#BF891D"
            stroke="#110B02"
            strokeWidth="1.2"
            transform="rotate(-15, 25, 30)"
          />

          {/* Right Dumpling (Angled Behind) */}
          <path
            d="M82 24C82 24 78 15 75 13C72 15 67 24 67 24C60 24 56 28 56 34C56 40 64 42 75 42C86 42 94 40 94 34C94 28 90 24 82 24Z"
            fill="#BF891D"
            stroke="#110B02"
            strokeWidth="1.2"
            transform="rotate(15, 75, 30)"
          />
        </g>

        {/* Gradients Definitions */}
        <defs>
          <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF2AF" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#A67C1E" />
            <stop offset="100%" stopColor="#F7E28E" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
