import { getMe } from "~/services/UserService";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Composable
  const config = useRuntimeConfig();
  const token = useCookie("token", {
    maxAge: parseInt(config.public.maxAuthCookieAge),
  });
  const user = useState("user");
  const { links, home } = useRouteList();

  const { execute, data, error } = useAsyncData({
    promise: () => getMe(),
    options: {
      immediate: false,
    },
  });

  if (!token.value) return navigateTo("/auth/login");

  if (!user.value) {
    await execute();

    if(error.value) return navigateTo("/auth/login");

    if (!data) return navigateTo("/auth/login");
    user.value = data;
  }

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

  if (!routes.includes(to?.name?.toString() ?? "")) {
    return navigateTo({ name: home?.name });
  }
});
