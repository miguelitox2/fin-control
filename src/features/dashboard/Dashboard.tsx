import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTransactions } from "./moc-data";

export function Dashboard() {
  const totalReceitas = mockTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, t) => acc + t.value, 0);

  const totalDespesas = mockTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, t) => acc + t.value, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-slate-300">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Receitas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-600">
            R$ {totalReceitas.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Despesas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            R$ {totalDespesas.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-600">
            R$ {(totalReceitas - totalDespesas).toFixed(2)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
