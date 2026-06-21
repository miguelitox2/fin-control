import type { Transaction } from "../../types/finance";

export const mockTransactions: Transaction[] = [
  // --- WORKSPACE: PERSONAL ---
  // Junho (Atual)
  {
    id: "p1",
    description: "Salário",
    value: 5000,
    date: new Date("2026-06-01T00:00:00Z"),
    type: "INCOME",
    categoryId: "salario",
    workspaceId: "personal",
  },
  {
    id: "p2",
    description: "Netflix",
    value: 50,
    date: new Date("2026-06-05T00:00:00Z"),
    type: "EXPENSE",
    categoryId: "lazer",
    workspaceId: "personal",
  },
  // Maio (Anterior)
  {
    id: "p3",
    description: "Salário",
    value: 4800,
    date: new Date("2026-05-01T00:00:00Z"),
    type: "INCOME",
    categoryId: "salario",
    workspaceId: "personal",
  },
  {
    id: "p4",
    description: "Netflix",
    value: 50,
    date: new Date("2026-05-05T00:00:00Z"),
    type: "EXPENSE",
    categoryId: "lazer",
    workspaceId: "personal",
  },

  // --- WORKSPACE: BUSINESS ---
  // Junho (Atual)
  {
    id: "b1",
    description: "Venda Software",
    value: 10000,
    date: new Date("2026-06-10T00:00:00Z"),
    type: "INCOME",
    categoryId: "vendas",
    workspaceId: "business",
  },
  {
    id: "b2",
    description: "Servidor AWS",
    value: 2000,
    date: new Date("2026-06-12T00:00:00Z"),
    type: "EXPENSE",
    categoryId: "infra",
    workspaceId: "business",
  },
  // Maio (Anterior)
  {
    id: "b3",
    description: "Venda Software",
    value: 9000,
    date: new Date("2026-05-10T00:00:00Z"),
    type: "INCOME",
    categoryId: "vendas",
    workspaceId: "business",
  },
  {
    id: "b4",
    description: "Servidor AWS",
    value: 2000,
    date: new Date("2026-05-12T00:00:00Z"),
    type: "EXPENSE",
    categoryId: "infra",
    workspaceId: "business",
  },
];
