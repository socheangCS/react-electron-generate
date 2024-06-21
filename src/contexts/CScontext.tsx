import React, { createContext, useContext, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface CSContextType {
  getUniqueId: () => Promise<string>;
}

const CSContext = createContext<CSContextType | undefined>(undefined);

export const useCS = (): CSContextType => {
  const context = useContext(CSContext);
  if (!context) {
    throw new Error('useCS must be used within a CSProvider');
  }
  return context;
};

interface CSProviderProps {
  children: ReactNode; 
}

export const CSProvider: React.FC<CSProviderProps> = ({ children }: CSProviderProps) => {
  const getUniqueId = async (): Promise<string> => {
    const time = new Date();
    const sec = time.getSeconds();
    const min = time.getMinutes();
    const hour = time.getHours();
    const uniqueId = `${sec}${hour}${uuidv4()}${min}`;
    return uniqueId;
  };

  const value: CSContextType = {
    getUniqueId,
  };

  return <CSContext.Provider value={value}>{children}</CSContext.Provider>;
};
