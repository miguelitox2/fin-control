import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { WorkspaceProvider } from "@/context/workspace-context";
import { Sidebar } from "@/components/layout/Sidebar";
import { WorkspaceToggle } from "@/components/toggle/workspace-toggle";
import { CategoriesProvider } from "@/context/categories-context";
import { TransactionsProvider } from "@/features/transactions/transactions-context";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const { pathname } = useLocation();

  const pageConfig: Record<string, { title: string; subtitle: string }> = {
    "/": {
      title: "Visão Geral",
      subtitle: "Acompanhe seu desempenho financeiro em tempo real.",
    },
    "/transactions": {
      title: "Transações",
      subtitle: "Gerencie suas receitas e despesas por período.",
    },
    "/categories": {
      title: "Categorias",
      subtitle: "Organize suas receitas e despesas por categorias.",
    },
    "/reports": {
      title: "Relatórios",
      subtitle: "Análise detalhada de suas finanças.",
    },
    "/projections": {
      title: "Projeções",
      subtitle: "Veja o futuro do seu fluxo de caixa.",
    },
  };

  const config = pageConfig[pathname] || {
    title: "Vext",
    subtitle: "Gestão financeira inteligente.",
  };

  return (
    <WorkspaceProvider>
      <CategoriesProvider>
        <TransactionsProvider>
        <div className="flex h-screen w-full bg-page-bg">
          <Sidebar />
          <div className="flex h-full flex-1 flex-col overflow-hidden px-6 py-4">
            <div className="flex justify-between items-start mb-6 ">
              <header className="flex flex-col">
                <h2 className="text-2xl font-bold text-text-primary">
                  {config.title}
                </h2>
                <p className="text-text-secondary text-sm">{config.subtitle}</p>
              </header>
              <div className="flex items-center gap-3">
                <WorkspaceToggle />
                {pathname === "/transactions" && (
                  <button
                    onClick={() =>
                      window.dispatchEvent(new Event("open-entry-dialog"))
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-(image:--primary-button-bg) px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-hover-button"
                  >
                    <Plus size={16} /> Novo lançamento
                  </button>
                )}
              </div>
            </div>

            <main className="flex-1 overflow-y-auto scrollbar-gutter-stable">
              <Outlet />
            </main>
          </div>
        </div>
        </TransactionsProvider>
      </CategoriesProvider>
    </WorkspaceProvider>
  );
}
