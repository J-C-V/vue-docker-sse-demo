<script setup lang='ts'>
    if ('geolocation' in navigator) {
        console.log('Geolocation works.');
    } else {
        console.log('Gelocation doesn\'t work.');
    }
</script>

<template>
    <h2>This is the location page</h2>
</template>