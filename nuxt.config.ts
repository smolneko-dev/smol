// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
    shim: false,
  },
  debug: process.env.NODE_ENV === "development" ? true : false,
  srcDir: "src/",
  build: {
    transpile: ["@heroicons/vue", "swiper", "swiper/vue"],
  },
  app: {
    rootId: "__smolneko",
    buildAssetsDir: "/_smolneko/",
    pageTransition: { name: "fade", mode: "out-in" },
    head: {
      meta: [{ name: "theme-color", content: "#5F2EEA" }],
      link: [{ type: "image/svg+xml", rel: "icon", href: "/favicon.svg" }],
    },
  },
  runtimeConfig: {
    public: {
      apiURL: process.env.NUXT_PUBLIC_API_URL,
      appURL: process.env.NUXT_PUBLIC_APP_URL,
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "@vueuse/motion/nuxt"],
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
