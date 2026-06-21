import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Sidebar } from "@/components/layout/Sidebar";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const { pathname } = useLocation();
  const titleMap: Record<string, string> = {
    "/": "Visão Geral",
    "/transactions": "Transações",
    "/categories": "Categorias",
    "/reports": "Relatórios",
    "/projections": "Projeções",
  };

  const title = titleMap[pathname] || "Vext";

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden py-2 px-4">
        <header className="flex items-center">
          <h2 className="text-2xl font-semibold text-text-primary">{title}</h2>
        </header>
        <main className="flex-1 overflow-y-auto py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
