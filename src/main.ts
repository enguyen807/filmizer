import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ApiService from "@/core/services/ApiService";

const app = createApp(App)

app.use(createPinia())
app.use(router)

ApiService.init(app);
ApiService.setRequestInterceptor();
ApiService.setResponseInterceptor();

app.mount('#app')
