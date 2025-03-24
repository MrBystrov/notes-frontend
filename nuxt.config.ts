// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
   plugins: [
    '~/plugins/quill.client.js',
  ],
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],
   imports: {
    dirs: ['stores'],
  },
  ui: {
    safelistColors: ['red' , 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'primary']
  },
  i18n: {
       locales: [
         { code: 'en', name: 'English', file: 'en.ts' },  
         { code: 'ru', name: 'Russian', file: 'ru.ts' }, 
       ],
       defaultLocale: 'ru',
       lazy: true, 
       langDir: 'locales/', 
     },
});