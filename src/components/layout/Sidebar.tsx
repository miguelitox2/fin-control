import {
  LayoutDashboard,
  ChartColumn,
  TrendingUp,
  Tag,
  Receipt,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

const navLinks = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/transactions", label: "Transações", icon: Receipt },
  { to: "/categories", label: "Categorias", icon: Tag },
  { to: "/reports", label: "Relatórios", icon: ChartColumn },
  { to: "/projections", label: "Projeções", icon: TrendingUp },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <h1 className="font-bold text-xl text-indigo-600">Vext</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            // Estado ativo
            activeProps={{
              className: "bg-slate-100 text-indigo-700 font-medium",
            }}
            // Garante que o dashboard só fique ativo na raiz
            activeOptions={link.exact ? { exact: true } : undefined}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <link.icon size={20} />
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
