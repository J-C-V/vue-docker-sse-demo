<script setup lang='ts'>
import { reactive, ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import NavBar from '@/components/NavBar.vue';

// Page Name in Header
const pageName = ref('No Title');

// Get current route
const route = useRoute();

// Active status of the navigation buttons depending on the current route
const routes = reactive ({
    home: false,
    chat: false,
    scan: false,
    location: false,
    settings: false
});

// Watch route name an set active navigation buttons accordingly
watch(() => route.name, function() {
    // Reset status
    let k: keyof typeof routes;
    for (k in routes) {
        routes[k] = false;
    }

    // Set status
    switch (route.name) {
        case 'home':
            pageName.value = 'Home';
            routes.home = true;
            break;
        case 'chat':
            pageName.value = 'Chat';
            routes.chat = true;
            break;
        case 'scan':
            pageName.value = 'Scan'
            routes.scan = true;
            break;
        case 'location':
            pageName.value = 'Location';
            routes.location = true;
            break;
        case 'settings':
            pageName.value = 'Settings';
            routes.settings = true;
            break;
    }
});
</script>

<template>
    <div class="d-flex flex-column h-100">
        <Header :page-name="pageName" />
        <main class="position-relative flex-grow-1 overflow-auto p-3">
            <RouterView></RouterView>
        </main>
        <NavBar :home="routes.home" :chat="routes.chat" :scan="routes.scan" :location="routes.location" :settings="routes.settings" />
    </div>
</template>
