import { useWorkspace } from "@/context/workspace-context";

export function WorkspaceToggle() {
  const { workspace, setWorkspace } = useWorkspace();

  return (
    <div className="bg-primary-bg border border-primary-border rounded-lg p-1 flex w-fit">
      <button
        onClick={() => setWorkspace("personal")}
        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
          workspace === "personal"
            ? "bg-primary-active text-text-primary shadow-xs"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        Pessoal
      </button>
      <button
        onClick={() => setWorkspace("business")}
        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
          workspace === "business"
            ? "bg-primary-active text-text-primary shadow-xs"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        Empresarial
      </button>
    </div>
  );
}
