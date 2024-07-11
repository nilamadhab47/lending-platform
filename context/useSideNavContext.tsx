"use client";
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface SideNavContextProps {
  showIconsOnly: boolean;
  toggleShowIconsOnly: () => void;
}

const SideNavContext = createContext<SideNavContextProps | undefined>(undefined);

export const SideNavProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showIconsOnly, setShowIconsOnly] = useState(true);

  const toggleShowIconsOnly = () => {
    setShowIconsOnly(!showIconsOnly);
  };

  return (
    <SideNavContext.Provider value={{ showIconsOnly, toggleShowIconsOnly }}>
      {children}
    </SideNavContext.Provider>
  );
};

export const useSideNavContext = () => {
  const context = useContext(SideNavContext);
  if (!context) {
    throw new Error('useSideNavContext must be used within an AppProvider');
  }
  return context;
};
