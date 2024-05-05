/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import User from "@/config/User";
import {api} from "@/config/api"
window.User=User;
// Components
import App from './App.vue'
import router from './router';
// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.config.globalProperties.$http = api;
registerPlugins(app)

app.mount('#app')
