// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
  features: {
    inlineStyles: true,
  },

  runtimeConfig: {
    public: {
      siteName:
        process.env.NUXT_PUBLIC_SITE_NAME ?? "🍋 Lemoncode Shop × Nuxt 4",
    },
  },
});
