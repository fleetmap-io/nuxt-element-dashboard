export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    base: '/dashboard/'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Dashboard ' + process.env.npm_package_version,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui', '@/plugins/vue-charts', '@/plugins/colors'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios', 'nuxt-i18n', '@nuxtjs/proxy'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/api',
    credentials: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  },
  i18n: {
    locales: ['en', 'es', 'pt', 'fr'],
    defaultLocale: 'pt',
    vueI18nLoader: true
  },
  proxy: [
    ['/api/reports', 'https://api2.pinme.io/api/reports'],
    ['/api', 'http://traccar-eu.fleetmap.pt'],
    ['/backend', { target: 'https://koutt85z24.execute-api.us-east-1.amazonaws.com/Prod' }],
    ['/pinmeapi', { target: 'https://koutt85z24.execute-api.us-east-1.amazonaws.com/Prod/pinmeapi' }]
  ]
}
