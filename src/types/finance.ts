export type WorkspaceType = "personal" | "business";

export interface Workspace {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  type: "INCOME" | "EXPENSE";
  workspaceId: string;
}

export interface Transaction {
  id: string;
  description: string;
  value: number;
  date: Date;
  type: "INCOME" | "EXPENSE";
  categoryId: string;
  workspaceId: string;
}

export interface FixedExpense {
  id: string;
  name: string;
  amount: number;
  dayOfMonth: number;
  categoryId: string;
  workspaceId: string;
}
