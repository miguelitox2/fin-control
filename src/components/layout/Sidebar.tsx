import {
  LayoutDashboard,
  ChartColumn,
  TrendingUp,
  Tag,
  Receipt,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <h1 className="font-bold text-xl text-indigo-600">Vext</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link
          to="/transactions"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          <Receipt size={20} />
          Transações
        </Link>
        <Link
          to="/categories"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          <Tag size={20} />
          Categorias
        </Link>
        <Link
          to="/reports"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          <ChartColumn size={20} />
          Relatórios
        </Link>
        <Link
          to="/projections"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          <TrendingUp size={20} />
          Projeções
        </Link>
      </nav>
    </aside>
  );
}
