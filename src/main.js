import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VueAxios from 'vue-axios'
import { securedAxiosInstance, plainAxiosInstance } from './backend/axios'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  }
})

createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueAxios, {
    secured: securedAxiosInstance,
    plain: plainAxiosInstance
  })
  .mount('#app')
