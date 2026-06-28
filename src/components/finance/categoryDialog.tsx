import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCategories } from "@/hooks/use-categories";
import { useWorkspace } from "@/context/workspace-context";

const CATEGORY_COLORS = [
  "bg-blue-500",
  "bg-red-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-violet-500",
  "bg-pink-500",
  "bg-sky-500",
  "bg-orange-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-red-600",
  "bg-slate-500",
];

export function CategoryDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState(CATEGORY_COLORS[0]);

  const { addCategory } = useCategories();
  const { workspace } = useWorkspace();

  const handleCreate = () => {
    if (!name.trim()) return;

    addCategory({
      id: crypto.randomUUID(),
      name,
      color,
      type: "EXPENSE",
      workspaceId: workspace,
    });

    setName("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-primary-bg border-primary-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-text-primary">
            Nova Categoria
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-text-secondary text-sm">Nome</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome da categoria"
              className="bg-primary-bg border-primary-border text-text-primary"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-text-secondary text-sm">Cor</Label>
            <div className="grid grid-cols-6 gap-3">
              {CATEGORY_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`size-8 rounded-md transition-all ${c} bg-opacity-20 ${
                    color === c
                      ? "ring-2 ring-white ring-offset-2 ring-offset-primary-bg"
                      : "hover:opacity-80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={handleCreate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Criar Categoria
        </Button>
      </DialogContent>
    </Dialog>
  );
}
