import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTransactions } from "./moc-data";

export function Dashboard() {
  const totalReceitas = mockTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, t) => acc + t.value, 0);

  const totalDespesas = mockTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, t) => acc + t.value, 0);

  const summaryCards = [
    {
      title: "Saldo Atual",
      value: totalReceitas,
      color: "text-text-primary",
    },
    {
      title: "Receitas",
      value: totalDespesas,
      color: "text-red-600",
    },
    {
      title: "Despesas",
      value: totalReceitas - totalDespesas,
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {summaryCards.map((card) => (
        <Card key={card.title} className="border-primary-border">
          <CardHeader>
            <CardTitle className="text-sm uppercase font-medium">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.color}`}>
              R$ {card.value.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
