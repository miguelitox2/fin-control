import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { WorkspaceProvider } from "@/context/workspace-context";
import { Sidebar } from "@/components/layout/Sidebar";
import { WorkspaceToggle } from "@/components/toggle/workspace-toggle";
import { CategoriesProvider } from "@/context/categories-context";

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
        <div className="flex h-screen w-full bg-page-bg">
          <Sidebar />
          <div className="flex h-full flex-1 flex-col overflow-hidden px-6 py-4 pr-5">
            <div className="flex justify-between items-start mb-6 ">
              <header className="flex flex-col">
                <h2 className="text-2xl font-bold text-text-primary">
                  {config.title}
                </h2>
                <p className="text-text-secondary text-sm">{config.subtitle}</p>
              </header>
              <WorkspaceToggle />
            </div>

            <main className="flex-1 overflow-y-auto pr-4 pb-4 scrollbar-gutter-stable">
              <Outlet />
            </main>
          </div>
        </div>
      </CategoriesProvider>
    </WorkspaceProvider>
  );
}
