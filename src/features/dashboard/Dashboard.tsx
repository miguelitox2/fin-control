import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDown, ArrowUp, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWorkspace } from "@/context/workspace-context";
import { FixedExpensesList } from "@/components/finance/fixedExpensesList";
import { mockFixedExpenses } from "./mockFixedExpenses";
import { getTransactionTotals, useTransactions } from "@/features/transactions/transactions-context";

const monthlyData = {
  personal: [
    { month: "Ago", income: 6500, expense: 3100 },
    { month: "Set", income: 6800, expense: 3300 },
    { month: "Out", income: 6900, expense: 3500 },
    { month: "Nov", income: 7000, expense: 3200 },
    { month: "Dez", income: 7600, expense: 3000 },
    { month: "Jan", income: 7200, expense: 3400 },
  ],
  business: [
    { month: "Ago", income: 11200, expense: 5100 },
    { month: "Set", income: 11800, expense: 5600 },
    { month: "Out", income: 12100, expense: 5400 },
    { month: "Nov", income: 11900, expense: 5900 },
    { month: "Dez", income: 13200, expense: 6100 },
    { month: "Jan", income: 12800, expense: 5800 },
  ],
};

const categoryData = {
  personal: [
    { name: "Moradia", value: 54, color: "#ef4444" },
    { name: "Alimentação", value: 19, color: "#f59e0b" },
    { name: "Saúde", value: 14, color: "#10b981" },
    { name: "Transporte", value: 8, color: "#3b82f6" },
    { name: "Lazer", value: 5, color: "#8b5cf6" },
  ],
  business: [
    { name: "Pessoal", value: 42, color: "#ef4444" },
    { name: "Infraestrutura", value: 25, color: "#f59e0b" },
    { name: "Marketing", value: 18, color: "#10b981" },
    { name: "Impostos", value: 10, color: "#3b82f6" },
    { name: "Outros", value: 5, color: "#8b5cf6" },
  ],
};

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function Dashboard() {
  const { workspace } = useWorkspace();
  const { entries } = useTransactions();
  const chartData = monthlyData[workspace];
  const categories = categoryData[workspace];

  const { income, expense, balance, trend, fixedExpenses } = useMemo(() => {
    const transactions = entries.filter((entry) => entry.workspaceId === workspace);
    const fixedExpenses = mockFixedExpenses.filter(
      (fixedExpense) => fixedExpense.workspaceId === workspace,
    );
    const { income, expense } = getTransactionTotals(transactions);
    const balance = income - expense;
    return {
      income,
      expense,
      balance,
      trend: 0,
      fixedExpenses,
    };
  }, [entries, workspace]);

  const summaryCards = [
    {
      title: "Saldo atual",
      value: balance,
      color: balance >= 0 ? "text-text-primary" : "text-red-500",
      gradient:
        balance >= 0
          ? "from-blue-500/12 via-blue-500/5 to-white/0 dark:to-transparent"
          : "from-red-500/12 via-red-500/5 to-white/0 dark:to-transparent",
    },
    {
      title: "Receitas",
      value: income,
      color: "text-emerald-500",
      progress: (income / (income + expense || 1)) * 100,
      gradient:
        "from-emerald-500/12 via-emerald-500/5 to-white/0 dark:to-transparent",
    },
    {
      title: "Despesas",
      value: expense,
      color: "text-red-500",
      progress: (expense / (income + expense || 1)) * 100,
      gradient: "from-red-500/12 via-red-500/5 to-white/0 dark:to-transparent",
    },
  ];

  return (
    <div className="space-y-8 pb-6">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {summaryCards.map((card, index) => (
          <Card
            key={card.title}
            className={`border-primary-border bg-linear-to-br ${card.gradient} shadow-none`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-secondary">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-2xl font-bold tracking-tight ${card.color}`}>
                {formatCurrency(card.value)}
              </p>
              {index === 0 ? (
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span
                    className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-medium ${trend >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}
                  >
                    {trend >= 0 ? (
                      <ArrowUp size={12} />
                    ) : (
                      <ArrowDown size={12} />
                    )}
                    {Math.abs(trend).toFixed(1)}%
                  </span>
                  <span className="text-text-secondary">vs mês anterior</span>
                </div>
              ) : (
                <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-primary-border">
                  <div
                    className={
                      index === 1
                        ? "h-full bg-emerald-500"
                        : "h-full bg-red-500"
                    }
                    style={{ width: `${card.progress}%` }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.55fr_1fr]">
        <Card className="border-primary-border bg-primary-bg shadow-none">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-5">
            <CardTitle className="text-sm font-semibold text-text-primary">
              Evolução mensal
            </CardTitle>
            <span className="text-xs text-text-secondary">Últimos 6 meses</span>
          </CardHeader>
          <CardContent className="h-72 pl-1 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="income-gradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--text-emerald-500)"
                      stopOpacity={0.32}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--text-emerald-500)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="expense-gradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--text-danger-600)"
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--text-danger-600)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  width={46}
                  tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                  tickFormatter={(value) => `R$${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    backgroundColor: "var(--primary-bg)",
                    border: "1px solid var(--primary-border)",
                    borderRadius: "8px",
                    color: "var(--text-primary)",
                  }}
                  labelStyle={{ color: "var(--text-secondary)" }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  name="Receitas"
                  stroke="var(--text-emerald-500)"
                  strokeWidth={2}
                  fill="url(#income-gradient)"
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  name="Despesas"
                  stroke="var(--text-danger-600)"
                  strokeWidth={2}
                  fill="url(#expense-gradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-primary-border bg-primary-bg shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-text-primary">
              Despesas por categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mx-auto h-48 max-w-xs">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categories}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={52}
                    outerRadius={78}
                    paddingAngle={3}
                    stroke="var(--primary-bg)"
                    strokeWidth={2}
                  >
                    {categories.map((category) => (
                      <Cell key={category.name} fill={category.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: "var(--primary-bg)",
                      border: "1px solid var(--primary-border)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3 pt-3">
              {categories.slice(0, 4).map((category) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between gap-2 text-xs"
                >
                  <span className="flex items-center gap-2 text-text-secondary">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    {category.name}
                  </span>
                  <strong className="text-text-primary">
                    {category.value}%
                  </strong>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FixedExpensesList expenses={fixedExpenses} categories={[]} />
        <Card className="border-primary-border bg-primary-bg shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <CalendarDays size={16} /> Últimos lançamentos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-text-secondary">
            Os seus próximos lançamentos aparecerão aqui.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
