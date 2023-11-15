import type { RouteLink } from "@/types/router/Routes";
import {
  BuildingOfficeIcon,
  ChartBarSquareIcon,
  CalendarIcon,
  CurrencyEuroIcon
} from "@heroicons/vue/24/outline";

// Admin routes list
export const ADMIN_ROUTES: RouteLink[] = [
  {
    label: "Dashboard",
    icon: ChartBarSquareIcon,
    name: "modules-dashboard-admin",
    routes: ["modules-dashboard-admin"],
  },
  {
    label: "Calendrier",
    icon: CalendarIcon,
    name: "modules-calendar",
    routes: ["modules-calendar"],
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
          "modules-user-delete",
        ],
      },
    ],
  },
  {
    label: "Prestations",
    icon: CurrencyEuroIcon,
    name: "modules-contract",
    routes: [
      "modules-contract",
      "modules-contract-view-id",
      "modules-session-view-id",
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
