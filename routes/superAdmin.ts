import type { RouteLink } from "@/types/router/Routes";
import {
  BuildingOfficeIcon,
  ChartBarSquareIcon,
  CurrencyEuroIcon,
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
        routes: [
          "modules-client",
          "modules-client-create",
          "modules-client-edit-id",
          "modules-client-view-id",
        ],
      },
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
    label: "Prestations",
    icon: CurrencyEuroIcon,
    name: "modules-contract",
    routes: [
      "modules-contract",
      "modules-contract-view-id",
      "modules-contract-edit-id",
      "modules-contract-create",
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
