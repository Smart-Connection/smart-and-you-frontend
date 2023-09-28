import type { FunctionalComponent } from "vue";

export interface RouteLink {
  label: string;
  icon?: FunctionalComponent;
  child?: {
    label: string;
    name: string;
    routes: string[];
  }[];
  name?: string;
  routes?: string[];
  hidden?: boolean;
}
