"use client";
// MarginWidthWrapper.tsx
import { useSideNavContext } from '@/context/useSideNavContext';
import React from 'react';

const MarginWidthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { showIconsOnly } = useSideNavContext();


  return (
    <div
      className={`flex flex-col overflow-auto max-w-[${showIconsOnly ? "1340px" : "1200px"}] sm:border-r sm:border-zinc-700 max-h-screen h-[90vh] transition-all`}
    >
      {children}
    </div>
  );
};

export default MarginWidthWrapper;
