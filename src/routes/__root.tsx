import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      {/*(Header/Sidebar) no futuro */}
      <div className="p-2">
        <Outlet />
      </div>
    </>
  ),
});
