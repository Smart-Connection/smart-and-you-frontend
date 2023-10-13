import type { RouteLink } from "@/types/router/Routes";
import { ChartBarSquareIcon } from "@heroicons/vue/24/outline";

// Admin routes list
export const CONSULTANT_ROUTES: RouteLink[] = [
  {
    label: "Dashboard",
    icon: ChartBarSquareIcon,
    name: "modules-dashboard-consultant",
    routes: ["modules-dashboard-consultant"],
  },
  {
    label: "Profil",
    hidden: true,
    icon: ChartBarSquareIcon,
    name: "account",
    routes: ["account"],
  },
];
