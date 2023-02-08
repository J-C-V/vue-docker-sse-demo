import { createRouter, createWebHistory } from 'vue-router'

import ChatView from '@/views/ChatView.vue'
import LocationView from '@/views/LocationView.vue'
import HomeView from '@/views/HomeView.vue'
import ScannerView from '@/views/ScannerView.vue'
import SettingsView from '@/views/Settings.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/chat',
            name: 'chat',
            component: ChatView
        },
        {
            path: '/scan',
            name: 'scan',
            component: ScannerView
        },
        {
            path: '/location',
            name: 'location',
            component: LocationView
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsView
        }
    ]
});

export default router;
