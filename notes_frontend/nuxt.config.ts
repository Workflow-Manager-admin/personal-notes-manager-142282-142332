export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    '~/assets/main.css'
  ],
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  alias: {
    '~types': '/types',
    '~utils': '/utils',
  },
  app: {
    head: {
      title: 'Notes App',
      meta: [
        { name: 'theme-color', content: '#f7fafc' },
        { name: 'color-scheme', content: 'light' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' }
      ],
      link: []
    }
  },
  ssr: false,
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
})
