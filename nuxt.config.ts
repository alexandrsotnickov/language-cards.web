export default defineNuxtConfig({
  app: {
    head: {
      title: "Language cards - обучение английскому языку",
      htmlAttrs: {
        lang: "ru",
      },
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  alias: {
    "@": "../src",
  },

  dir: {
    pages: "./src/pages",
    layouts: "./src/app/layouts",
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/src/app/styles/variables.scss";`,
        },
      },
    },
  },

  css: ["@/app/styles/base.scss"],

  modules: ["@pinia/nuxt"],
});
