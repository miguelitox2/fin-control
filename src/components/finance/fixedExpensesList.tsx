import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type FixedExpense } from "@/types/fixedExpense";
import { getNextDueDate } from "@/lib/utils";

interface Props {
  expenses: FixedExpense[];
}

export function FixedExpensesList({ expenses }: Props) {
  return (
    <Card className="border-primary-border bg-primary-bg shadow-none max-w-1/2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-text-primary text-sm font-medium">
          <Calendar size={16} />
          Próximos Vencimentos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {expenses.map((expense) => {
          const nextDate = getNextDueDate(expense.dayOfMonth);
          const formattedDate = nextDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
          });

          return (
            <div key={expense.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`size-8 rounded-lg ${expense.color} flex items-center justify-center text-xs font-bold text-text-primary`}
                >
                  {expense.initials}
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-medium text-text-primary">
                    {expense.name}
                  </span>
                  <span className="text-xs text-text-secondary">
                    Fixo • {formattedDate}
                  </span>
                </div>
              </div>

              <span className="text-sm font-bold text-text-danger-600">
                R${" "}
                {expense.amount.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
