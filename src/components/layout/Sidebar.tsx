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
import { ModeToggle } from "../toogle/ModeToggle";

const navLinks = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/transactions", label: "Transações", icon: Receipt },
  { to: "/categories", label: "Categorias", icon: Tag },
  { to: "/reports", label: "Relatórios", icon: ChartColumn },
  { to: "/projections", label: "Projeções", icon: TrendingUp },
];

export function Sidebar() {
  return (
    <aside className="w-52 border-r border-primary-border bg-primary-bg flex flex-col py-4 px-2 h-screen antialiased">
      <div className="h-10 flex items-center px-2 gap-2">
        <div className="bg-blue-500 p-1.5 rounded-md">
          <Wallet size={16} className="text-white" />
        </div>
        <h1 className="font-bold text-lg text-text-primary">Vext</h1>
      </div>

      <nav className="flex-1 py-4 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            activeProps={{
              className: "bg-primary-active text-text-primary font-medium",
            }}
            activeOptions={link.exact ? { exact: true } : undefined}
            className="flex items-center gap-2 px-2 py-1 text-sm rounded-lg text-text-secondary hover:bg-primary-hover hover:text-text-primary transition-colors"
          >
            <link.icon size={16} />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mb-2 px-2">
        <ModeToggle />
      </div>

      <div className="p-2 border-t border-primary-border mt-auto">
        <div className="flex items-center gap-3 mb-4 px-1">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>VN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium text-text-primary truncate">
              Vinícius
            </span>
            <span className="text-xs text-text-secondary truncate">
              vini@dev.com
            </span>
          </div>
        </div>

        <button
          onClick={() => console.log("Logout!")}
          className="cursor-pointer flex w-full items-center gap-2 px-2 py-2 rounded-lg bg-primary-hover text-red-600 hover:bg-red-50/10 transition-colors text-sm"
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </aside>
  );
}
