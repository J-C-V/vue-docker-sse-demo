<script setup lang='ts'>
    const props = defineProps({
        pageName: String
    });
</script>

<template>
    <header class="bg-white border-bottom border-2 px-3 py-2">
        <h1 class="fs-1 m-0">{{ pageName }}</h1>
    </header>
</template>
