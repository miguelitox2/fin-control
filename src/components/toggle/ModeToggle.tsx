import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  isExpanded: boolean;
}

export function ModeToggle({ isExpanded }: ModeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "flex w-full items-center justify-start gap-3 px-3 hover:bg-primary-hover transition-all duration-300 cursor-pointer",
      )}
    >
      <div className="flex size-5 shrink-0 items-center justify-center">
        <Sun
          className={cn(
            "size-4 transition-all duration-300",
            theme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0",
          )}
        />
        <Moon
          className={cn(
            "size-4 absolute transition-all duration-300",
            theme === "light" ? "scale-100 opacity-100" : "scale-0 opacity-0",
          )}
        />
      </div>

      <span
        className={cn(
          "text-sm text-text-secondary whitespace-nowrap transition-all duration-300",
          isExpanded ? "w-auto opacity-100" : "w-0 opacity-0 overflow-hidden",
        )}
      >
        {theme === "light" ? "Modo Escuro" : "Modo Claro"}
      </span>
    </Button>
  );
}
