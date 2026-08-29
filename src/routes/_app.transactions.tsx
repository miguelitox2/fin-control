import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  CircleDollarSign,
  Pencil,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/context/workspace-context";
import { useCategories } from "@/hooks/use-categories";
import { getTransactionTotals, useTransactions, type EntryKind, type EntryType, type TransactionEntry, type TransactionInput } from "@/features/transactions/transactions-context";

type FormData = TransactionInput;
const defaultForm: FormData = {
  name: "",
  amount: 0,
  date: new Date().toISOString().slice(0, 10),
  category: "",
  categoryColor: "#3b82f6",
  type: "EXPENSE",
  kind: "VARIABLE",
  fixedUntil: "",
};

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const formatDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR");

export const Route = createFileRoute("/_app/transactions")({
  component: TransactionsPage,
});

function TransactionsPage() {
  const { workspace } = useWorkspace();
  const { categories } = useCategories();
  const { entries, createEntry, updateEntry, deleteEntry } = useTransactions();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | EntryType>("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const openDialog = useCallback(() => {
    setForm({ ...defaultForm, date: new Date().toISOString().slice(0, 10) });
    setEditingId(null);
    setError("");
    setIsDialogOpen(true);
  }, []);

  useEffect(() => {
    window.addEventListener("open-entry-dialog", openDialog);
    return () => window.removeEventListener("open-entry-dialog", openDialog);
  }, [openDialog]);

  const workspaceEntries = useMemo(
    () => entries.filter((entry) => entry.workspaceId === workspace),
    [entries, workspace],
  );
  const filteredEntries = useMemo(
    () =>
      workspaceEntries.filter((entry) => {
        const matchesSearch =
          entry.name.toLowerCase().includes(search.toLowerCase()) ||
          entry.category.toLowerCase().includes(search.toLowerCase());
        const isAfterStart = !startDate || entry.date >= startDate;
        const isBeforeEnd = !endDate || entry.date <= endDate;
        return (
          matchesSearch &&
          isAfterStart &&
          isBeforeEnd &&
          (filter === "ALL" || entry.type === filter)
        );
      }),
    [workspaceEntries, search, filter, startDate, endDate],
  );
  const totals = useMemo(() => getTransactionTotals(workspaceEntries), [workspaceEntries]);
  const categoryOptions = useMemo(
    () =>
      categories
        .filter((category) => category.workspaceId === workspace)
        .map((category) => category.name),
    [categories, workspace],
  );

  const openEditDialog = (entry: TransactionEntry) => {
    setForm({
      name: entry.name,
      amount: entry.amount,
      date: entry.date,
      category: entry.category,
      categoryColor: entry.categoryColor ?? "#3b82f6",
      type: entry.type,
      kind: entry.kind,
      fixedUntil: entry.fixedUntil ?? "",
    });
    setEditingId(entry.id);
    setError("");
    setIsDialogOpen(true);
  };
  const updateForm = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (error) setError("");
  };
  const saveEntry = () => {
    if (!form.name.trim() || !form.category || form.amount <= 0 || !form.date) {
      setError(
        "Preencha nome, valor, data e categoria para salvar o lançamento.",
      );
      return;
    }
    if (form.kind === "FIXED" && !form.fixedUntil) {
      setError("Informe até quando esta cobrança fixa deve ocorrer.");
      return;
    }
    const input = {
      ...form,
      name: form.name.trim(),
      fixedUntil: form.kind === "FIXED" ? form.fixedUntil : undefined,
    };
    if (editingId) updateEntry(editingId, input, workspace);
    else createEntry(input, workspace);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6 pb-6">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard
          title="Total receitas"
          value={totals.income}
          color="text-emerald-500"
          gradient="from-emerald-500/12 via-emerald-500/5 to-white/0 dark:to-transparent"
        />
        <SummaryCard
          title="Total despesas"
          value={totals.expense}
          color="text-red-500"
          gradient="from-red-500/12 via-red-500/5 to-white/0 dark:to-transparent"
        />
        <SummaryCard
          title="Saldo"
          value={totals.income - totals.expense}
          color={
            totals.income - totals.expense >= 0
              ? "text-text-primary"
              : "text-red-500"
          }
          gradient="from-blue-500/12 via-blue-500/5 to-white/0 dark:to-transparent"
        />
      </section>

      <Card className="border-primary-border bg-primary-bg shadow-none">
        <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2 text-base text-text-primary">
            <CircleDollarSign size={18} /> Lançamentos
          </CardTitle>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative block min-w-56">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar lançamento..."
                className="border-primary-border bg-primary-bg pl-9 text-text-primary"
              />
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-primary-border bg-primary-bg p-1.5 text-text-secondary">
              <CalendarDays size={15} className="ml-1 shrink-0" />
              <Input
                aria-label="Data inicial"
                type="date"
                value={startDate}
                max={endDate || undefined}
                onChange={(event) => setStartDate(event.target.value)}
                className="date-input h-7 border-0 bg-transparent px-1 text-xs text-text-primary shadow-none focus-visible:ring-0"
              />
              <span className="text-xs">até</span>
              <Input
                aria-label="Data final"
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(event) => setEndDate(event.target.value)}
                className="date-input h-7 border-0 bg-transparent px-1 text-xs text-text-primary shadow-none focus-visible:ring-0"
              />
              {(startDate || endDate) && (
                <button
                  onClick={() => {
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="rounded p-1 hover:bg-primary-hover hover:text-text-primary"
                  aria-label="Limpar filtro de datas"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex rounded-lg border border-primary-border p-1">
              {(["ALL", "INCOME", "EXPENSE"] as const).map((option) => {
                const label =
                  option === "ALL"
                    ? "Todos"
                    : option === "INCOME"
                      ? "Receitas"
                      : "Despesas";
                return (
                  <button
                    key={option}
                    onClick={() => setFilter(option)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${filter === option ? "bg-(image:--primary-button-bg) text-white" : "text-text-secondary hover:bg-primary-hover hover:text-text-primary"}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-left text-sm">
              <thead className="border-b border-primary-border text-xs uppercase tracking-wider text-text-secondary">
                <tr>
                  <th className="px-3 py-3 font-medium">Lançamento</th>
                  <th className="px-3 py-3 font-medium">Categoria</th>
                  <th className="px-3 py-3 font-medium">Data</th>
                  <th className="px-3 py-3 font-medium">Tipo</th>
                  <th className="px-3 py-3 text-right font-medium">Valor</th>
                  <th className="px-3 py-3" />
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-primary-border/70 last:border-0"
                  >
                    <td className="px-3 py-4 font-medium text-text-primary">
                      {entry.name}
                    </td>
                    <td className="px-3 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-hover px-2.5 py-1 text-xs text-text-secondary">
                        <span
                          className="size-2 rounded-full"
                          style={{
                            backgroundColor: entry.categoryColor ?? "#3b82f6",
                          }}
                        />
                        {entry.category}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-text-secondary">
                      {formatDate(entry.date)}
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`text-xs font-medium ${entry.kind === "FIXED" ? "text-blue-500" : "inline-flex items-center gap-1.5 rounded-full bg-primary-hover px-2.5 py-1 text-xs text-text-secondary"}`}
                      >
                        {entry.kind === "FIXED"
                          ? `Fixo até ${formatDate(entry.fixedUntil!)}`
                          : "Variável"}
                      </span>
                    </td>
                    <td
                      className={`px-3 py-4 text-right font-semibold ${entry.type === "INCOME" ? "text-emerald-500" : "text-red-500"}`}
                    >
                      {entry.type === "INCOME" ? "+ " : "- "}
                      {formatCurrency(entry.amount)}
                    </td>
                    <td className="px-3 py-4 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() => openEditDialog(entry)}
                          className="rounded p-1.5 text-text-secondary transition-colors hover:bg-primary-hover hover:text-text-primary"
                          aria-label={`Editar ${entry.name}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() =>
                            deleteEntry(entry.id)
                          }
                          className="rounded p-1.5 text-text-secondary transition-colors hover:bg-red-500/10 hover:text-red-500"
                          aria-label={`Excluir ${entry.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredEntries.length === 0 && (
            <div className="py-14 text-center text-sm text-text-secondary">
              Nenhum lançamento encontrado. Crie o primeiro para começar.
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-primary-border bg-primary-bg text-text-primary sm:max-w-xl">
          <DialogHeader className="flex-row items-center justify-between space-y-0">
            <DialogTitle className="text-text-primary">
              {editingId ? "Editar lançamento" : "Novo lançamento"}
            </DialogTitle>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="rounded p-1 text-text-secondary hover:bg-primary-hover hover:text-text-primary"
            >
              <X size={18} />
            </button>
          </DialogHeader>
          <div className="grid gap-5 py-2">
            <Field label="Nome">
              <Input
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                placeholder="Ex.: Salário, Aluguel..."
                className="border-primary-border bg-primary-bg text-text-primary"
              />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Valor">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.amount || ""}
                  onChange={(event) =>
                    updateForm("amount", Number(event.target.value))
                  }
                  placeholder="0,00"
                  className="border-primary-border bg-primary-bg text-text-primary"
                />
              </Field>
              <Field label="Data">
                <Input
                  type="date"
                  value={form.date}
                  onChange={(event) => updateForm("date", event.target.value)}
                  className="date-input border-primary-border bg-primary-bg text-text-primary"
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr_auto]">
              <Field label="Movimentação">
                <Select
                  value={form.type}
                  onChange={(event) =>
                    updateForm("type", event.target.value as EntryType)
                  }
                >
                  <option value="EXPENSE">Despesa</option>
                  <option value="INCOME">Receita</option>
                </Select>
              </Field>
              <Field label="Categoria">
                <Select
                  value={form.category}
                  onChange={(event) =>
                    updateForm("category", event.target.value)
                  }
                >
                  <option value="">
                    {categoryOptions.length
                      ? "Selecione..."
                      : "Crie uma categoria primeiro"}
                  </option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Cor">
                <input
                  type="color"
                  value={form.categoryColor}
                  onChange={(event) =>
                    updateForm("categoryColor", event.target.value)
                  }
                  className="h-9 w-14 cursor-pointer rounded-md border border-primary-border bg-primary-bg p-1"
                />
              </Field>
            </div>
            <Field label="Tipo">
              <Select
                value={form.kind}
                onChange={(event) =>
                  updateForm("kind", event.target.value as EntryKind)
                }
              >
                <option value="VARIABLE">Variável</option>
                <option value="FIXED">Fixo</option>
              </Select>
            </Field>
            {form.kind === "FIXED" && (
              <Field label="Cobrar até">
                <Input
                  type="date"
                  min={form.date}
                  value={form.fixedUntil}
                  onChange={(event) =>
                    updateForm("fixedUntil", event.target.value)
                  }
                  className="date-input border-primary-border bg-primary-bg text-text-primary"
                />
                <p className="mt-1 text-xs text-text-secondary">
                  A cobrança fixa permanecerá ativa até esta data.
                </p>
              </Field>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              onClick={saveEntry}
              className="rounded-lg cursor-pointer bg-(image:--primary-button-bg) px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-all duration-200"
            >
              {editingId ? "Salvar alterações" : "Salvar lançamento"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  color,
  gradient,
}: {
  title: string;
  value: number;
  color: string;
  gradient: string;
}) {
  return (
    <Card
      className={`border-primary-border bg-linear-to-br ${gradient} shadow-none`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-secondary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-2xl font-bold ${color}`}>{formatCurrency(value)}</p>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-text-primary">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Select({ className = "", ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={`h-9 w-full rounded-md border border-primary-border bg-primary-bg px-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary-button-bg ${className}`}
      {...props}
    />
  );
}
