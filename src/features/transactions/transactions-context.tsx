import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { WorkspaceType } from "@/types/finance";

export type EntryKind = "FIXED" | "VARIABLE";
export type EntryType = "INCOME" | "EXPENSE";
export interface TransactionEntry {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  categoryColor: string;
  type: EntryType;
  kind: EntryKind;
  fixedUntil?: string;
  workspaceId: WorkspaceType;
}
export type TransactionInput = Omit<TransactionEntry, "id" | "workspaceId">;
interface TransactionsContextValue {
  entries: TransactionEntry[];
  createEntry: (input: TransactionInput, workspaceId: WorkspaceType) => void;
  updateEntry: (id: string, input: TransactionInput, workspaceId: WorkspaceType) => void;
  deleteEntry: (id: string) => void;
}
const STORAGE_KEY = "fin-control.entries";
const TransactionsContext = createContext<TransactionsContextValue | undefined>(undefined);

function readEntries(): TransactionEntry[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as TransactionEntry[]) : [];
  } catch { return []; }
}

/** Local adapter. Swap its persistence calls for the API client when the backend is ready. */
export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<TransactionEntry[]>(readEntries);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); }, [entries]);
  const createEntry = useCallback((input: TransactionInput, workspaceId: WorkspaceType) => {
    setEntries((current) => [...current, { ...input, id: crypto.randomUUID(), workspaceId }]);
  }, []);
  const updateEntry = useCallback((id: string, input: TransactionInput, workspaceId: WorkspaceType) => {
    setEntries((current) => current.map((entry) => entry.id === id ? { ...input, id, workspaceId } : entry));
  }, []);
  const deleteEntry = useCallback((id: string) => { setEntries((current) => current.filter((entry) => entry.id !== id)); }, []);
  const value = useMemo(() => ({ entries, createEntry, updateEntry, deleteEntry }), [entries, createEntry, updateEntry, deleteEntry]);
  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}
export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) throw new Error("useTransactions deve ser usado dentro de TransactionsProvider");
  return context;
}
export function getTransactionTotals(entries: TransactionEntry[]) {
  return entries.reduce((summary, entry) => ({
    income: summary.income + (entry.type === "INCOME" ? entry.amount : 0),
    expense: summary.expense + (entry.type === "EXPENSE" ? entry.amount : 0),
  }), { income: 0, expense: 0 });
}
