import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/assets/css/main.css'

const app = createApp(App);

import 'bootstrap/dist/js/bootstrap.min.js';

app.use(router);

app.mount('#app');
