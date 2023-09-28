import type { RouteLink } from "@/types/router/Routes";
import {
  BuildingOfficeIcon,
  ChartBarSquareIcon,
} from "@heroicons/vue/24/outline";

// Super admin routes list
export const SUPER_ADMIN_ROUTES: RouteLink[] = [
  {
    label: "Dashboard",
    icon: ChartBarSquareIcon,
    name: "modules-dashboard-super-admin",
    routes: ["modules-dashboard-super-admin"],
  },
  {
    label: "Gestion",
    icon: BuildingOfficeIcon,
    child: [
      {
        label: "Clients",
        name: "modules-client",
        routes: ["modules-client"],
      },
      {
        label: "Utilisateurs",
        name: "modules-user",
        routes: ["modules-user", "modules-user-id", "modules-user-create"],
      },
    ],
  },
  {
    label: "Profil",
    hidden: true,
    icon: ChartBarSquareIcon,
    name: "account",
    routes: ["account"],
  },
];
