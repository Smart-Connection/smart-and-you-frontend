import type { FunctionalComponent } from "vue";

export interface RouteLink {
  label: string;
  icon: FunctionalComponent;
  child?: {
    label: string;
    path: string;
    routes: string[];
  }[];
  path?: string;
  routes?: string[];
}
