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
    name: "modules-dashboard-super-admin",
    routes: ["modules-dashboard-super-admin"],
  },
  {
    label: "Gestion",
    icon: BuildingOfficeIcon,
    child: [
      {
        label: "Utilisateurs",
        name: "modules-user",
        routes: [
          "modules-user",
          "modules-user-create",
          "modules-user-edit-id",
          "modules-user-view-id",
        ],
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
