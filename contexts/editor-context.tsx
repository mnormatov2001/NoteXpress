import { Note } from "@/lib/notes-client";
import { ReactNode, createContext, useContext } from "react";

interface EditorContextProps {
  activeDocument?: Note;
  setActiveDocument: (note: Note) => void;
  refetchActiveDocument: () => void;
}

export const EditorContext = createContext<EditorContextProps | undefined>(undefined);

export const EditorContextProvider: React.FC<{
  value: EditorContextProps;
  children: ReactNode;
}> = ({ value, children }) => (
  <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
);

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context)
    throw new Error("useEditorContext must be used within a EditorContextProvider");

  return context;
};
