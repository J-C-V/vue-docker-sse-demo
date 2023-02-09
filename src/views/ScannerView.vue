<script setup lang='ts'>
import { BrowserMultiFormatReader } from '@zxing/library';
import { ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const reader = new BrowserMultiFormatReader();
const codeType = ref('')
const decodedMsg = ref('');

const cameraInitialized = ref(false);

onBeforeRouteLeave((from, to) => {
    // Wait for the camera to finish its initialization before leaving this route
    // to properly close the media stream.
    if (cameraInitialized.value) {
        reader.reset();
        console.log('Stopping media streams...');

        return true;
    }

    return false;
});

reader.listVideoInputDevices()
    .then((videoInputDevices) => {
        console.log(videoInputDevices);

        // Use the default camera
        reader.decodeFromVideoDevice(null, 'camera-feed', (result, err) => {
            // Camera is initialized
            cameraInitialized.value = true

            if (result) {
                // Debug
                console.log(result);

                // Set decoded message
                switch (result.getBarcodeFormat()) {
                    case 4:
                        codeType.value = 'Barcode'
                        break;
                    case 11:
                        codeType.value = 'QR Code'
                        break;
                    default:
                        codeType.value = 'Unknown'
                        break;
                }

                decodedMsg.value = result.getText();
            }
        })
        .catch((err) => {
            console.log(err);
            reader.reset();
            console.log('Stopping media streams because of an error...');
        });
    })
    .catch((err) => {
        console.log(err);
    });
</script>

<template>
    <div class="position-absolute start-0 top-0 h-100 w-100 bg-dark"></div>
    <video id="camera-feed" class="position-absolute start-0 top-0 w-100"></video>
    <div class="position-absolute start-0 bottom-0 h-25 w-100 p-3 bg-dark text-white">
        <h2 class="fs-4 mb-3">Scan Barcode/QR Code</h2>
        <p>Code type: {{ codeType }}</p>
        <p>Decoded message: {{ decodedMsg }}</p>
    </div>
</template>
