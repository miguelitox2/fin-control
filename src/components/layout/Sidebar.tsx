import {
  LayoutDashboard,
  ChartColumn,
  TrendingUp,
  Tag,
  Receipt,
  LogOut,
  Wallet,
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
    <aside className="w-52 border-r border-zinc-200 bg-zinc-100 flex flex-col py-2 h-screen antialiased">
      <div className="h-10 flex items-center px-2 gap-2">
        <div className="bg-blue-600 p-1.5 rounded-md border-none">
          <Wallet size={16} className="text-zinc-100" />
        </div>
        <h1 className="font-bold text-lg text-zinc-950">Vext Finanças</h1>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            activeProps={{
              className: "bg-zinc-200 text-zinc-900 font-medium",
            }}
            activeOptions={link.exact ? { exact: true } : undefined}
            className="flex items-center gap-2 px-2 py-1 text-sm rounded-lg text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 transition-colors"
          >
            <link.icon size={16} />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-2 border-t border-zinc-200 mt-auto">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>VN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-zinc-900 truncate">
              Vinícius
            </span>
            <span className="text-xs text-zinc-500 truncate">vini@dev.com</span>
          </div>
        </div>

        <button
          onClick={() => console.log("Logout!")}
          className="flex w-full items-center gap-2 px-2 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm"
        >
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </aside>
  );
}
