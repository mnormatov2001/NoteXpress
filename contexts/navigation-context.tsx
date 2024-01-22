"use client";

import { Note, NotesClient } from "@/lib/notes-client";
import React, {
  createContext,
  useContext,
  ReactNode,
} from "react";

interface NavigationContextProps {
  notesClient?: NotesClient;
  navigationDocuments?: Note[];
  setNavigationDocuments: (notes?: Note[]) => void;
  onUpdateNavigationDocumentsItems: (id?: string) => void;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

export const NavigationContextProvider: React.FC<{
  value: NavigationContextProps;
  children: ReactNode;
}> = ({ value, children }) => (
  <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
);

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigationContext must be used within a NavigationContextProvider");
  }
  return context;
};
