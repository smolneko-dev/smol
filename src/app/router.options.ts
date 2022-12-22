import type { RouterConfig } from "@nuxt/schema";

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  linkActiveClass: "active-link",
  linkExactActiveClass: "exact-active-link",
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();

    if (savedPosition) {
      return new Promise((resolve) => {
        nuxtApp.hooks.hookOnce("page:finish", () => {
          setTimeout(() => resolve(savedPosition), 50);
        });
      });
    }

    if (from.path !== to.path) {
      return { top: 0, behavior: "auto" };
    }

    return { top: 0, behavior: "smooth" };
  },
};
