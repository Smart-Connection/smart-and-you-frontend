import type { RouteLink } from "@/types/router/Routes";
import {
  ChartBarSquareIcon,
  CurrencyEuroIcon,
  CalendarIcon
} from "@heroicons/vue/24/outline";

// Admin routes list
export const CONSULTANT_ROUTES: RouteLink[] = [
  {
    label: "Dashboard",
    icon: ChartBarSquareIcon,
    name: "modules-dashboard-consultant",
    routes: ["modules-dashboard-consultant"],
  },
  {
    label: "Calendrier",
    icon: CalendarIcon,
    name: "modules-calendar",
    routes: ["modules-calendar"],
  },
  {
    label: "Prestations",
    icon: CurrencyEuroIcon,
    name: "modules-contract",
    routes: [
      "modules-contract",
      "modules-contract-view-id",
      "modules-contract-create",
      "modules-session-view-id",
    ],
  },
  {
    label: "Utilisateurs",
    hidden: true,
    name: "modules-user",
    routes: ["modules-user-view-id"],
  },
  {
    label: "Profil",
    hidden: true,
    icon: ChartBarSquareIcon,
    name: "account",
    routes: ["account"],
  },
];
