import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Sidebar } from "@/components/layout/Sidebar";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const { pathname } = useLocation();
  const titleMap: Record<string, string> = {
    "/": "Dashboard",
    "/transactions": "Transações",
    "/categories": "Categorias",
    "/reports": "Relatórios",
    "/projections": "Projeções",
  };

  const title = titleMap[pathname] || "Vext";

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-10 flex items-center px-6 bg-zinc-50">
          <h2 className="text-md font-semibold text-zinc-800">{title}</h2>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-zinc-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
