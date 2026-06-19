import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme/themeProvider";
import "../App.css";

export const Route = createRootRoute({
  component: () => (
    <>
      {/*(Header/Sidebar)*/}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="antialiased">
          <Outlet />
        </div>
      </ThemeProvider>
    </>
  ),
});
