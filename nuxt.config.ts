// https://nuxt.com/docs/api/configuration/nuxt-config
import config from './config';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/eslint-module',
    '@element-plus/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  devServer: {
    port: config.PORT
  }
})
