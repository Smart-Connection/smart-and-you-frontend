import { SUPER_ADMIN_ROUTES } from "@/routes/superAdmin";
import { ADMIN_ROUTES } from "@/routes/admin";
import { USER_ROUTES } from "@/routes/user";
import type { RouteLink } from "@/types/router/Routes";

// Composables
const user = {
  role: "SUPER_ADMIN",
};

export const useRouteList = () => {
  let links: RouteLink[] = [];

  if (user.role === "SUPER_ADMIN") {
    links = SUPER_ADMIN_ROUTES;
  } else if (user.role === "ADMIN") {
    links = ADMIN_ROUTES;
  } else if (user.role === "USER") {
    links = USER_ROUTES;
  }

  return {
    links,
  };
};
