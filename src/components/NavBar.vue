<script setup lang='ts'>
import { reactive, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

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
            routes.home = true;
            break;
        case 'chat':
            routes.chat = true;
            break;
        case 'scan':
            routes.scan = true;
            break;
        case 'history':
            routes.history = true;
            break;
        case 'settings':
            routes.settings = true;
            break;
    }
});
</script>

<template>
    <footer class="container-fluid fixed-bottom bg-white border-top border-2 nav-footer">
        <nav class="row">
            <div class="col text-center p-0 nav-button" :class="{ active: routes.home }" aria-label="Home">
                <RouterLink to="/">
                    <div class="p-2">
                        <i class="bi bi-house-fill"></i>
                    </div>
                </RouterLink>
            </div>
            <div class="col text-center p-0 nav-button" :class="{ active: routes.chat }" aria-label="Chat">
                <RouterLink to="/chat">
                    <div class="p-2">
                        <i class="bi bi-keyboard-fill"></i>
                    </div>
                </RouterLink>
            </div>
            <div class="col text-center p-0 nav-button" :class="{ active: routes.scan }" aria-label="Scan">
                <RouterLink to="/scan">
                    <div class="p-2">
                        <i class="bi bi-qr-code-scan"></i>
                    </div>
                </RouterLink>
            </div>
            <div class="col text-center p-0 nav-button" :class="{ active: routes.history }" aria-label="History">
                <RouterLink to="/history">
                    <div class="p-2">
                        <i class="bi bi-book-fill"></i>
                    </div>
                </RouterLink>
            </div>
            <div class="col text-center p-0 nav-button" :class="{ active: routes.settings }" aria-label="Settings">
                <RouterLink to="/settings">
                    <div class="p-2">
                        <i class="bi bi-gear-fill"></i>
                    </div>
                </RouterLink>
            </div>
        </nav>    
    </footer>
</template>

<style scoped>
    .nav-footer {
        height: 54px;
    }

    .nav-button i {
        font-size: 1.5em;
        color: rgb(100, 100, 100);
    }

    .nav-button.active {
        background-color: rgb(90, 90, 255);
    }

    .nav-button.active i {
        color: rgb(255, 255, 255);
    }
</style>