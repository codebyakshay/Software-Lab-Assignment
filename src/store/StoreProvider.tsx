import React, { createContext, useContext, ReactNode } from "react";
import { RootStore, rootStore } from "./RootStore";

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === null) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
