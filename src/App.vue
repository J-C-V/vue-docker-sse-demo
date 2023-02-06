<script setup lang='ts'>
import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
</script>

<template>
    <div class="content">
        <RouterView></RouterView>
    </div>
    <NavBar />
</template>

<style scoped>
    .content {
        margin-bottom: 54px;
    }
</style>