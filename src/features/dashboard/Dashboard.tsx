import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTransactions } from "./moc-data";

export function Dashboard() {
  const totalReceitas = mockTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, t) => acc + t.value, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Receitas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-600">
            R$ {totalReceitas.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      {/* Você pode replicar a estrutura para Despesas e Saldo */}
    </div>
  );
}
