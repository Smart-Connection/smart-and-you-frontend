export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  app: {
    head: {
      titleTemplate: "Smartfit",
      title: "Welcome",
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: "",
      maxAuthCookieAge: "",
    },
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },
  tailwindcss: {},
});
