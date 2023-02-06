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
    history: false,
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
        case 'history':
            pageName.value = 'History';
            routes.history = true;
            break;
        case 'settings':
            pageName.value = 'Settings';
            routes.settings = true;
            break;
    }
});
</script>

<template>
    <Header :page-name="pageName"/>
    <div class="p-3 content">
        <RouterView></RouterView>
    </div>
    <NavBar :home="routes.home" :chat="routes.chat" :scan="routes.scan" :history="routes.history" :settings="routes.settings" />
</template>

<style scoped>
    .content {
        margin-top: 54px;
        margin-bottom: 54px;
    }
</style>