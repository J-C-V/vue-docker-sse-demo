<script setup lang='ts'>
import { BrowserMultiFormatReader } from '@zxing/library';
import { ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const reader = new BrowserMultiFormatReader();
const decodedMsg = ref('');
const isCameraReady = ref(false);
const isCameraError = ref(false);

onBeforeRouteLeave(() => {
    // Wait for the camera to finish its initialization before leaving this route
    // to properly close the media stream again
    if (isCameraReady.value || isCameraError.value) {
        reader.reset();
        console.log('Stopping media streams...');

        return true;
    }

    return false;
});

reader.listVideoInputDevices().then((videoInputDevices) => {
    console.log(videoInputDevices);

    // Use the default camera
    reader.decodeFromVideoDevice(null, 'camera-feed', (result, err) => {
        isCameraReady.value = true

        if (result) {
            console.log(result);

            decodedMsg.value = result.getText();
        }
    })
    .catch((err) => {
        console.log(err);

        isCameraError.value = true;
        reader.reset();
        console.log('Stopping media streams because of an error...');
    });
})
.catch((err) => {
    console.log(err);

    isCameraError.value = true;
    reader.reset();
    console.log('Stopping media streams because of an error...');
});
</script>

<template>
    <video id="camera-feed" class="position-absolute start-0 top-0 w-100"></video>
    <div v-if="!isCameraReady" class="position-absolute start-0 top-0 h-100 w-100 bg-dark text-secondary text-center">
        <p class="fs-2 fw-bold no-camera">Waiting for camera...</p>
    </div>    
    <div class="position-absolute start-0 bottom-0 h-25 w-100 p-3 bg-dark text-white">
        <h2 class="fs-4 mb-3">Scan Barcode/QR Code</h2>
        <p>Decoded message: {{ decodedMsg }}</p>
    </div>
</template>

<style scoped>
.no-camera {
    position: relative;
    top: 30vh;
}
</style>
