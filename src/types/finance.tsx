export type WorkspaceType = "PERSONAL" | "BUSINESS";

export interface Category {
  id: string;
  name: string;
  color: string;
  type: "INCOME" | "EXPENSE";
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
