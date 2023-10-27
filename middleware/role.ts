import { getMe } from "~/services/UserService";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Composable
  const config = useRuntimeConfig();
  const token = useCookie("token", {
    maxAge: parseInt(config.public.maxAuthCookieAge),
  });

  const { execute, data } = useAsyncData({
    promise: () => getMe(),
    options: {
      immediate: false,
    },
  });

  const user = useState("user");
  const { links, home } = useRouteList();

  if (!token.value) return navigateTo("/auth/login");

  if (!user.value) {
    await execute();

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
