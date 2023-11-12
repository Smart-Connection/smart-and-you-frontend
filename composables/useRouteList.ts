import { SUPER_ADMIN_ROUTES } from "@/routes/superAdmin";
import { ADMIN_ROUTES } from "@/routes/admin";
import { USER_ROUTES } from "@/routes/user";
import { CONSULTANT_ROUTES } from "@/routes/consultant";
import type { RouteLink } from "@/types/router/Routes";
import { User } from "~/types/entity/User";

export const useRouteList = () => {
  // User
  const user = useState<User>("user");

  // Get links
  let links: RouteLink[] = [];
  if (user.value?.role === "SUPER_ADMIN") {
    links = SUPER_ADMIN_ROUTES;
  } else if (user.value?.role === "ADMIN") {
    links = ADMIN_ROUTES;
  } else if (user.value?.role === "USER") {
    links = USER_ROUTES;
  } else if (user.value?.role === "CONSULTANT") {
    links = CONSULTANT_ROUTES;
  }

  // Get home
  const home = links.find((link) => {
    if (link.label === "Dashboard") {
      return link.name;
    }
  });

  // Get list
  const routes: RouteLink[] = [];
  links.map((route) => {
    if (route.routes) {
      routes.push(route);
    } else {
      route.child?.map((childRoutes) => {
        routes.push(childRoutes);
      });
    }
  });

  const asAccess = (routeName: string) => {
    const routes: string[] = [];

    links.map((route) => {
      if (route.routes) {
        routes.push(...route.routes);
      } else {
        route.child?.map((childRoutes) => {
          routes.push(...childRoutes.routes);
        });
      }
    });
    
    return routes.includes(routeName);
  };

  const useParams = <P>() => {
    const route = useRoute()
    return route.params as P
  }

  return {
    links,
    home,
    routes,
    asAccess,
    useParams
  };
};
