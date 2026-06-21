import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTransactions } from "./moc-data";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";

export function Dashboard() {
  const { workspace } = useWorkspace();

  const currentMonth = 5;
  const prevMonth = 4;

  const workspaceTransactions = mockTransactions.filter(
    (t) => t.workspaceId === workspace,
  );

  const getTotals = (month: number) => {
    const monthTxs = workspaceTransactions.filter((t) => {
      return t.date.getUTCMonth() === month;
    });

    const income = monthTxs
      .filter((t) => t.type === "INCOME")
      .reduce((acc, t) => acc + t.value, 0);

    const expense = monthTxs
      .filter((t) => t.type === "EXPENSE")
      .reduce((acc, t) => acc + t.value, 0);

    return { income, expense, balance: income - expense };
  };

  const current = getTotals(currentMonth);
  const previous = getTotals(prevMonth);

  const calculateTrend = (curr: number, prev: number) => {
    if (prev === 0) return 0;
    return ((curr - prev) / Math.abs(prev)) * 100;
  };

  const trend = calculateTrend(current.balance, previous.balance);

  const summaryCards = [
    {
      title: "SALDO ATUAL",
      value: current.balance,
      color: "text-text-primary",
      type: "trend",
      trend: `${trend.toFixed(1)}%`,
      isPositive: trend >= 0,
      trendText: "vs mês anterior",
    },
    {
      title: "RECEITAS",
      value: current.income,
      color: "text-emerald-500",
      type: "progress",
      progress:
        current.income + current.expense > 0
          ? (current.income / (current.income + current.expense)) * 100
          : 0,
      progressColor: "bg-emerald-500",
    },
    {
      title: "DESPESAS",
      value: current.expense,
      color: "text-red-500",
      type: "progress",
      progress:
        current.income + current.expense > 0
          ? (current.expense / (current.income + current.expense)) * 100
          : 0,
      progressColor: "bg-red-500",
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
              <div className={`text-3xl font-bold ${card.color}`}>
                R$ {card.value.toFixed(2)}
              </div>

              {card.type === "trend" && (
                <div className="flex items-center gap-1.5 mt-2 text-xs">
                  <span
                    className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded font-medium ${
                      card.isPositive
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {card.isPositive ? (
                      <ArrowUp size={12} />
                    ) : (
                      <ArrowDown size={12} />
                    )}
                    {card.trend}
                  </span>
                  <span className="text-text-secondary">{card.trendText}</span>
                </div>
              )}

              {card.type === "progress" && (
                <div className="mt-4">
                  <div className="w-full h-1 bg-primary-border rounded-full overflow-hidden">
                    <div
                      className={`h-full ${card.progressColor}`}
                      style={{ width: `${card.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
