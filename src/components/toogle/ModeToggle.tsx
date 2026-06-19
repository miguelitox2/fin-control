import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="size-4" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-full justify-start gap-3 px-4 hover:bg-sidebar-hover transition-colors"
    >
      <Sun
        className={`size-4 transition-all ${theme === "dark" ? "scale-100" : "scale-0"}`}
      />
      <Moon
        className={`size-4 transition-all ${theme === "light" ? "scale-100" : "scale-0"}`}
      />

      <span className="text-sm text-sidebar-text-secondary">
        {theme === "light" ? "Modo Escuro" : "Modo Claro"}
      </span>
    </Button>
  );
}
