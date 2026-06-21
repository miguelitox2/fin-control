import { createContext, useContext, useState, type ReactNode } from "react";

type Workspace = "personal" | "business";

interface WorkspaceContextType {
  workspace: Workspace;
  setWorkspace: (workspace: Workspace) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined,
);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspace, setWorkspace] = useState<Workspace>("personal");

  return (
    <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context)
    throw new Error(
      "useWorkspace deve ser usado dentro de um WorkspaceProvider",
    );
  return context;
};
