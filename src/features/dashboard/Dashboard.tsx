import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";
import { FixedExpensesList } from "@/components/finance/fixedExpensesList";
import { mockTransactions } from "./moc-data";
import { mockFixedExpenses } from "./mockFixedExpenses";
import type { Category } from "@/types/finance";

export function Dashboard() {
  const CATEGORIES: Category[] = [];
  const { workspace } = useWorkspace();

  const { workspaceTransactions, filteredFixedExpenses } = useMemo(
    () => ({
      workspaceTransactions: mockTransactions.filter(
        (t) => t.workspaceId === workspace,
      ),
      filteredFixedExpenses: mockFixedExpenses.filter(
        (f) => f.workspaceId === workspace,
      ),
    }),
    [workspace],
  );

  const activeCategories = useMemo(() => {
    return CATEGORIES.filter((c) => c.workspaceId === workspace);
  }, [workspace]);

  const totals = useMemo(() => {
    const getTotalsForMonth = (month: number) => {
      const monthTxs = workspaceTransactions.filter(
        (t) => t.date.getUTCMonth() === month,
      );

      const income = monthTxs
        .filter((t) => t.type === "INCOME")
        .reduce((acc, t) => acc + t.value, 0);
      const regularExpense = monthTxs
        .filter((t) => t.type === "EXPENSE")
        .reduce((acc, t) => acc + t.value, 0);
      const fixedExpenseTotal = filteredFixedExpenses.reduce(
        (acc, f) => acc + f.amount,
        0,
      );

      const expense = regularExpense + fixedExpenseTotal;
      return { income, expense, balance: income - expense };
    };

    return {
      current: getTotalsForMonth(5),
      previous: getTotalsForMonth(4),
    };
  }, [workspaceTransactions, filteredFixedExpenses]);

  const trend =
    totals.previous.balance !== 0
      ? ((totals.current.balance - totals.previous.balance) /
          Math.abs(totals.previous.balance)) *
        100
      : 0;

  const summaryCards = [
    {
      title: "SALDO ATUAL",
      value: totals.current.balance,
      color: "text-text-primary",
      isTrend: true,
      trend: trend,
    },
    {
      title: "RECEITAS",
      value: totals.current.income,
      color: "text-emerald-500",
      isProgress: true,
      progress:
        (totals.current.income /
          (totals.current.income + totals.current.expense || 1)) *
        100,
    },
    {
      title: "DESPESAS",
      value: totals.current.expense,
      color: "text-red-500",
      isProgress: true,
      progress:
        (totals.current.expense /
          (totals.current.income + totals.current.expense || 1)) *
        100,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryCards.map((card) => (
          <Card
            key={card.title}
            className="border-primary-border bg-primary-bg"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase font-medium text-text-secondary tracking-wider">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-xl font-bold ${card.color}`}>
                R$ {card.value.toFixed(2)}
              </div>

              {card.isTrend && (
                <div className="flex items-center gap-1.5 mt-2 text-xs">
                  <span
                    className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded font-medium ${card.trend >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}
                  >
                    {card.trend >= 0 ? (
                      <ArrowUp size={12} />
                    ) : (
                      <ArrowDown size={12} />
                    )}
                    {Math.abs(card.trend).toFixed(1)}%
                  </span>
                  <span className="text-text-secondary">vs mês anterior</span>
                </div>
              )}

              {card.isProgress && (
                <div className="mt-4 w-full h-1 bg-primary-border rounded-full overflow-hidden">
                  <div
                    className={`h-full ${card.title === "RECEITAS" ? "bg-emerald-500" : "bg-red-500"}`}
                    style={{ width: `${card.progress}%` }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <FixedExpensesList
        expenses={filteredFixedExpenses}
        categories={activeCategories}
      />
    </div>
  );
}
