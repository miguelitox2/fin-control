import {
  LayoutDashboard,
  ChartColumn,
  TrendingUp,
  Tag,
  Receipt,
  LogOut,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "../toogle/ModeToggle";
import { useState } from "react";
import { Button } from "../ui/button";

const navLinks = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/transactions", label: "Transações", icon: Receipt },
  { to: "/categories", label: "Categorias", icon: Tag },
  { to: "/reports", label: "Relatórios", icon: ChartColumn },
  { to: "/projections", label: "Projeções", icon: TrendingUp },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={cn(
        "border-r border-primary-border bg-primary-bg flex flex-col py-2 h-screen transition-all duration-300 ease-in-out relative",
        isExpanded ? "w-52" : "w-16",
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
        className="absolute -right-3 top-5 bg-primary-bg border border-primary-border rounded-full p-0.5 text-text-secondary hover:text-text-primary z-50"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <div className="h-10 flex items-center px-4 gap-2 mb-6">
        <Wallet size={20} className="text-blue-500 shrink-0" />
        <h1
          className={cn(
            "font-bold text-lg text-text-primary transition-opacity duration-300",
            !isExpanded && "opacity-0",
          )}
        >
          Vext
        </h1>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            activeProps={{
              className: "bg-primary-active text-text-primary font-medium",
            }}
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-text-secondary hover:bg-primary-hover transition-colors"
          >
            <link.icon size={16} className="shrink-0" />
            <span
              className={cn(
                "transition-opacity duration-300 whitespace-nowrap",
                !isExpanded && "opacity-0",
              )}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-primary-border py-4 space-y-2">
        <div className="px-2">
          <ModeToggle isExpanded={isExpanded} />
        </div>

        <div className="flex items-center gap-3 px-4 py-2 transition-all duration-300">
          <Avatar className="size-8 shrink-0">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>VN</AvatarFallback>
          </Avatar>

          <div
            className={cn(
              "flex flex-col overflow-hidden transition-all duration-300",
              isExpanded ? "w-full opacity-100" : "w-0 opacity-0",
            )}
          >
            <span className="text-sm font-medium text-text-primary truncate">
              Vinícius
            </span>
            <span className="text-xs text-text-secondary truncate">
              vini@dev.com
            </span>
          </div>
        </div>

        <div className="px-2">
          <Button
            variant="ghost"
            className={cn(
              "flex w-full items-center justify-start gap-3 px-3 py-2 text-text-danger-600 hover:bg-text-danger-600/10 transition-all duration-300 cursor-pointer",
            )}
          >
            <div className="flex size-5 shrink-0 items-center justify-center">
              <LogOut size={16} />
            </div>

            <span
              className={cn(
                "text-sm text-text-danger-600 whitespace-nowrap transition-all duration-300",
                isExpanded
                  ? "w-auto opacity-100"
                  : "w-0 opacity-0 overflow-hidden",
              )}
            >
              Sair
            </span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
