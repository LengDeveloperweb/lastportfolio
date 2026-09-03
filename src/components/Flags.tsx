import React from 'react';

interface FlagProps {
  className?: string;
}

export const CambodiaFlag: React.FC<FlagProps> = ({ className = 'w-4 h-3' }) => {
  return (
    <svg
      viewBox="0 0 640 480"
      className={`rounded-[2px] shadow-sm inline-block shrink-0 ${className}`}
      aria-label="Cambodia Flag"
    >
      <rect width="640" height="480" fill="#032ea6" />
      <rect y="120" width="640" height="240" fill="#e00025" />
      <g fill="#ffffff">
        <rect x="200" y="300" width="240" height="25" rx="2" />
        <rect x="220" y="280" width="200" height="20" rx="1" />
        <rect x="235" y="260" width="170" height="20" rx="1" />
        {/* Central Angkor Wat Tower */}
        <path d="M305 180 Q320 150 335 180 L340 260 L300 260 Z" />
        <circle cx="320" cy="150" r="5" />
        {/* Left Tower */}
        <path d="M260 210 Q275 180 290 210 L295 260 L255 260 Z" />
        <circle cx="275" cy="180" r="4" />
        {/* Right Tower */}
        <path d="M350 210 Q365 180 380 210 L385 260 L345 260 Z" />
        <circle cx="365" cy="180" r="4" />
        {/* Outer Left Tower */}
        <path d="M230 235 Q242 210 254 235 L258 260 L226 260 Z" />
        <circle cx="242" cy="210" r="3.5" />
        {/* Outer Right Tower */}
        <path d="M386 235 Q398 210 410 235 L414 260 L382 260 Z" />
        <circle cx="398" cy="210" r="3.5" />
      </g>
    </svg>
  );
};

export const UKFlag: React.FC<FlagProps> = ({ className = 'w-4 h-3' }) => {
  return (
    <svg
      viewBox="0 0 60 30"
      className={`rounded-[2px] shadow-sm inline-block shrink-0 ${className}`}
      aria-label="United Kingdom Flag"
    >
      <clipPath id="uk-clip">
        <rect width="60" height="30" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
};
