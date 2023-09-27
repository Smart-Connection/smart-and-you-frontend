import type { RouteLink } from "@/types/router/Routes";
import {
  BuildingOfficeIcon,
  ChartBarSquareIcon,
} from "@heroicons/vue/24/outline";

// Admin routes list
export const ADMIN_ROUTES: RouteLink[] = [
  {
    label: "Dashboard",
    icon: ChartBarSquareIcon,
    path: "/modules/dashboard/admin",
    routes: ["/modules/dashboard/admin"],
  },
  {
    label: "Gestion",
    icon: BuildingOfficeIcon,
    child: [
      {
        label: "Utilisateurs",
        path: "/modules/user",
        routes: ["/modules/user"],
      },
    ],
  },
  {
    label: "Profile",
    hidden: true,
    icon: ChartBarSquareIcon,
    path: "/account",
    routes: ["/account"],
  },
];
