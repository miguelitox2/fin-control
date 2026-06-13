import type { Transaction } from "../../types/finance";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    description: "Aluguel Apartamento",
    value: 1800.0,
    date: new Date("2026-06-05"),
    type: "EXPENSE",
    categoryId: "moradia",
    workspaceId: "personal",
  },
  {
    id: "2",
    description: "Freelance Design",
    value: 1200.0,
    date: new Date("2026-06-01"),
    type: "INCOME",
    categoryId: "freelance",
    workspaceId: "personal",
  },
];
