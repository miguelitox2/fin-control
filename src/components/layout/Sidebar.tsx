import {
  LayoutDashboard,
  ChartColumn,
  TrendingUp,
  Tag,
  Receipt,
  LogOut, // Importe o ícone de logout
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/transactions", label: "Transações", icon: Receipt },
  { to: "/categories", label: "Categorias", icon: Tag },
  { to: "/reports", label: "Relatórios", icon: ChartColumn },
  { to: "/projections", label: "Projeções", icon: TrendingUp },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col h-screen">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <h1 className="font-bold text-xl text-indigo-600">Vext</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            activeProps={{
              className: "bg-slate-100 text-indigo-700 font-medium",
            }}
            activeOptions={link.exact ? { exact: true } : undefined}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <link.icon size={20} />
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Seção do Usuário - Fica fixada no final */}
      <div className="p-4 border-t border-slate-200 mt-auto">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>VN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-slate-900 truncate">
              Vinícius
            </span>
            <span className="text-xs text-slate-500 truncate">
              vini@dev.com
            </span>
          </div>
        </div>

        <button
          onClick={() => console.log("Logout!")} // Futura lógica de logout
          className="flex w-full items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm"
        >
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </aside>
  );
}
