import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type FixedExpense, type Category } from "@/types/finance";
import { getNextDueDate } from "@/lib/utils";
import { getCategoryInitials } from "@/lib/utils";

interface Props {
  expenses: FixedExpense[];
  categories: Category[];
}

export function FixedExpensesList({ expenses, categories }: Props) {
  return (
    <Card className="border-primary-border bg-primary-bg shadow-none w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-text-primary text-sm font-medium">
          <Calendar size={16} />
          Próximos Vencimentos
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {expenses.map((expense) => {
          const category = categories.find((c) => c.id === expense.categoryId);
          const nextDate = getNextDueDate(expense.dayOfMonth);

          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              category={category}
              nextDate={nextDate}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
function ExpenseItem({
  expense,
  category,
  nextDate,
}: {
  expense: FixedExpense;
  category?: Category;
  nextDate: Date;
}) {
  const formattedDate = nextDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`size-8 rounded-lg ${category?.color || "bg-gray-500"} flex items-center justify-center text-xs font-bold text-white`}
        >
          {getCategoryInitials(category?.name || "??")}
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
        {expense.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </span>
    </div>
  );
}
