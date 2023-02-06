<script setup lang='ts'>
    const props = defineProps({
        pageName: String
    });
</script>

<template>
    <header class="fixed-top bg-white border-bottom border-2 px-3 py-2">
        <h1>{{ pageName }}</h1>
    </header>
</template>

<style scoped>
header {
    height: 54px;
}

h1 {
    font-size: 30px;
    margin: 0;
}
</style>
