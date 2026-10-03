"use client";

import React, { useState } from 'react';

interface AppBackgroundProps {
  /**
   * Adjust opacity level:
   * 'subtle' = kwa mbali sana (~25% opacity)
   * 'medium' = wastani (~35% opacity, default)
   * 'vivid' = inayoonekana zaidi (~50% opacity)
   */
  intensity?: 'subtle' | 'medium' | 'vivid';
  className?: string;
}

export const AppBackground: React.FC<AppBackgroundProps> = ({
  intensity = 'medium',
  className = '',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // High quality majestic mountain sunrise symbolizing clarity and elevation
  const primaryImageUrl =
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=85';

  const opacityClass =
    intensity === 'subtle'
      ? 'opacity-20 sm:opacity-25'
      : intensity === 'vivid'
      ? 'opacity-45 sm:opacity-50'
      : 'opacity-30 sm:opacity-35';

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-slate-950 ${className}`}
    >
      {/* 1. Base Image - Robust, Responsive & Scaled */}
      <img
        src={primaryImageUrl}
        alt=""
        loading="eager"
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover object-center transform scale-105 transition-opacity duration-1000 ${opacityClass} ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 2. Seamless Dark Atmospheric Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px]" />

      {/* 3. Deep Vignette and Gradients (Top & Bottom for crisp headers and footers) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-transparent to-slate-950/70" />
    </div>
  );
};

export default AppBackground;
