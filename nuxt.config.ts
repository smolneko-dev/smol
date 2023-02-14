// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
    shim: false,
    typeCheck: true,
  },
  debug: process.env.NODE_ENV === "development" ? true : false,
  srcDir: "src/",
  build: {
    transpile: ["swiper", "swiper/vue"],
  },
  app: {
    rootId: "__smolneko",
    buildAssetsDir: "/_smolneko/",
    pageTransition: { name: "fade", mode: "out-in" },
    head: {
      meta: [{ name: "theme-color", content: "#610BEF" }],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },
  runtimeConfig: {
    public: {
      apiURL: process.env.NUXT_PUBLIC_API_URL,
      appURL: process.env.NUXT_PUBLIC_APP_URL,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@vueuse/motion/nuxt",
    "@nuxtjs/color-mode",
    // "nuxt-security",
  ],
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  tailwindcss: {
    viewer: true,
    cssPath: "~/assets/css/tailwind.css",
    configPath: "~~/tailwind.config.ts",
  },
  colorMode: {
    classSuffix: "",
    storageKey: "smolneko-color-mode",
  },
  // security: {
  // }
});
