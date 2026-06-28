import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Tag, Plus, Search, Trash2 } from "lucide-react";
import { useCategories } from "@/hooks/use-categories";
import { useWorkspace } from "@/context/workspace-context";
import { CategoryDialog } from "@/components/finance/categoryDialog";

const styleMap: Record<string, { softBg: string; vibrantIcon: string }> = {
  "bg-blue-500": { softBg: "bg-blue-500/20", vibrantIcon: "text-blue-500" },
  "bg-red-500": { softBg: "bg-red-500/20", vibrantIcon: "text-red-500" },
  "bg-emerald-500": {
    softBg: "bg-emerald-500/20",
    vibrantIcon: "text-emerald-500",
  },
  "bg-amber-500": { softBg: "bg-amber-500/20", vibrantIcon: "text-amber-500" },
  "bg-violet-500": {
    softBg: "bg-violet-500/20",
    vibrantIcon: "text-violet-500",
  },
  "bg-pink-500": { softBg: "bg-pink-500/20", vibrantIcon: "text-pink-500" },
  "bg-sky-500": { softBg: "bg-sky-500/20", vibrantIcon: "text-sky-500" },
  "bg-orange-500": {
    softBg: "bg-orange-500/20",
    vibrantIcon: "text-orange-500",
  },
  "bg-indigo-500": {
    softBg: "bg-indigo-500/20",
    vibrantIcon: "text-indigo-500",
  },
  "bg-teal-500": { softBg: "bg-teal-500/20", vibrantIcon: "text-teal-500" },
  "bg-red-600": { softBg: "bg-red-600/20", vibrantIcon: "text-red-600" },
  "bg-slate-500": { softBg: "bg-slate-500/20", vibrantIcon: "text-slate-500" },
};

export const Route = createFileRoute("/_app/categories")({
  component: CategoriesPage,
});

function CategoriesPage() {
  const { workspace } = useWorkspace();
  const { categories, addCategory, deleteCategory } = useCategories();
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      const matchesWorkspace = c.workspaceId === workspace;
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      return matchesWorkspace && matchesSearch;
    });
  }, [categories, workspace, search]);

  const suggestedCategories = [
    { name: "Carro", color: "bg-blue-500" },
    { name: "Educação", color: "bg-violet-500" },
    { name: "Compras", color: "bg-orange-500" },
    { name: "Impostos", color: "bg-red-500" },
    { name: "Investimentos", color: "bg-emerald-500" },
    { name: "Empresa", color: "bg-teal-500" },
    { name: "Funcionários", color: "bg-indigo-500" },
    { name: "Marketing", color: "bg-amber-500" },
    { name: "Outros", color: "bg-slate-500" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-sm">
          <Search
            className="absolute left-3 top-2.5 text-text-secondary"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar categorias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-primary-bg border border-primary-border rounded-lg py-2.5 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-primary-active transition-all"
          />
        </div>

        <CategoryDialog>
          <button className="flex items-center gap-2 bg-primary-active border border-primary-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-all text-text-primary ml-4">
            <Plus size={16} /> Nova
          </button>
        </CategoryDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredCategories.map((cat) => {
          const styles = styleMap[cat.color] || {
            softBg: "bg-gray-500/20",
            vibrantIcon: "text-gray-500",
          };

          return (
            <div
              key={cat.id}
              className="relative p-4 flex items-center gap-3 border border-primary-border bg-primary-bg rounded-xl hover:border-primary-active transition-all group"
            >
              <button
                onClick={() => deleteCategory(cat.id)}
                className="absolute top-1/2 -translate-y-1/2 right-3 p-1.5 text-text-secondary opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-all"
              >
                <Trash2 size={16} />
              </button>

              <div
                className={`p-2 rounded-lg ${styles.softBg} flex items-center justify-center`}
              >
                <Tag size={20} className={styles.vibrantIcon} />
              </div>

              <span className="font-medium text-text-primary">{cat.name}</span>
            </div>
          );
        })}
      </div>

      <div className="pt-6 border-t border-primary-border">
        <h3 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">
          Categorias Sugeridas
        </h3>
        <div className="flex flex-wrap gap-2">
          {suggestedCategories.map((sug) => (
            <button
              key={sug.name}
              onClick={() =>
                addCategory({
                  id: crypto.randomUUID(),
                  name: sug.name,
                  color: sug.color,
                  type: "EXPENSE",
                  workspaceId: workspace,
                })
              }
              className="px-3 py-1.5 border border-primary-border rounded-full text-xs text-text-secondary hover:border-primary-active hover:text-text-primary transition-all"
            >
              + {sug.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
