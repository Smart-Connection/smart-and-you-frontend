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
    path: "/modules/dashboard/super-admin",
    routes: ["/modules/dashboard/super-admin"],
  },
  {
    label: "Gestion",
    icon: BuildingOfficeIcon,
    child: [
      {
        label: "Clients",
        path: "/modules/client",
        routes: ["/modules/client"],
      },
      {
        label: "Utilisateurs",
        path: "/modules/user",
        routes: ["/modules/user"],
      },
    ],
  },
  {
    label: "Profil",
    hidden: true,
    icon: ChartBarSquareIcon,
    path: "/account",
    routes: ["/account"],
  },
];
