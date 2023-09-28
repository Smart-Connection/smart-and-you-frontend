import type { RouteLink } from "@/types/router/Routes";
import { ChartBarSquareIcon } from "@heroicons/vue/24/outline";

// user routes list
export const USER_ROUTES: RouteLink[] = [
  {
    label: "Dashboard",
    icon: ChartBarSquareIcon,
    name: "modules-dashboard-user",
    routes: ["modules-dashboard-user"],
  },
  {
    label: "Profil",
    hidden: true,
    icon: ChartBarSquareIcon,
    name: "account",
    routes: ["account"],
  },
];
