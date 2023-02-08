<script setup lang='ts'>
import { RouterLink } from 'vue-router';

const props = defineProps({
    home: Boolean,
    chat: Boolean,
    scan: Boolean,
    location: Boolean,
    settings: Boolean
});
</script>

<template>
    <footer class="container-fluid bg-white border-top border-2">
        <nav class="row">
            <div class="col text-center p-0 nav-button" :class="{ active: home }" aria-label="Home">
                <RouterLink to="/">
                    <div class="p-2">
                        <i class="bi bi-house-fill"></i>
                    </div>
                </RouterLink>
            </div>
            <div class="col text-center p-0 nav-button" :class="{ active: chat }" aria-label="Chat">
                <RouterLink to="/chat">
                    <div class="p-2">
                        <i class="bi bi-chat-fill"></i>
                    </div>
                </RouterLink>
            </div>
            <div class="col text-center p-0 nav-button" :class="{ active: scan }" aria-label="Scan">
                <RouterLink to="/scan">
                    <div class="p-2">
                        <i class="bi bi-qr-code-scan"></i>
                    </div>
                </RouterLink>
            </div>
            <div class="col text-center p-0 nav-button" :class="{ active: location }" aria-label="Location">
                <RouterLink to="/location">
                    <div class="p-2">
                        <i class="bi bi-compass-fill"></i>
                    </div>
                </RouterLink>
            </div>
            <div class="col text-center p-0 nav-button" :class="{ active: settings }" aria-label="Settings">
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
