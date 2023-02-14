<script setup lang='ts'>
import { reactive, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

// URLs
const urlBackend = import.meta.env.VITE_URL_BACKEND;
const urlHub = new URL(import.meta.env.VITE_URL_HUB);
const urlSubbedTopics = urlBackend + '/hub';
const urlMsgEndpoint = urlBackend + '/messages';

// Subscribe to topics
urlHub.searchParams.append('topic', urlSubbedTopics + '/messages');

// Messages
interface Message {
    id: number,
    message: string,
    postedAt: Date
}
const messages: Message[] = reactive([]);
const sentMsg = ref('');
const isLoading = ref(true);
fetchMsgHistory();

// SSE
const eventSource = new EventSource(urlHub);

eventSource.onopen = (ev) => {
    console.log(ev);
    console.log('Subscription successful...');
}
eventSource.onmessage = (ev) => {
    console.log(ev);

    // Add to array and render new message
    const data = JSON.parse(ev.data);
    data.postedAt = new Date(data.postedAt);

    messages.unshift(data);
}
eventSource.onerror = (ev) => {
    console.log(ev);
}

onBeforeRouteLeave(() => {
    eventSource.close();
    console.log('Closing connection...');
});

/**
 * Fetches message history.
 */
async function fetchMsgHistory()
{
    await fetch(urlMsgEndpoint, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        // Add to array and render old messages
        const oldMessages: Message[] = data.messages;
        oldMessages.forEach(message => {
            message.postedAt = new Date(message.postedAt);
            messages.push(message);
        });

        // Hide spinner
        isLoading.value = false;
    })
    .catch((err) => {
        console.log(err);
    });
}

/**
 * Publish new message.
 */
async function publishMsg()
{
    const msg = {
        message: sentMsg.value
    }

    await fetch(urlMsgEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(msg)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        
        sentMsg.value = '';
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<template>
    <!-- Chat Container -->
    <div class="d-flex flex-column h-100">
        <!-- Text Container -->
        <div class="flex-grow-1 h-100 overflow-auto">
            <div class="d-flex flex-column-reverse h-100 overflow-auto">
                <p class="text-break" v-for="message in messages">{{ message.postedAt.toLocaleString() + ' | ' + message.message }}</p>
            </div>
        </div>
        <!-- Input Container -->
        <div class="d-flex">
            <input class="flex-grow-1 p-2" type="text" placeholder="Type your message here..." v-model="sentMsg" @keyup.enter="publishMsg" />
            <button type="button" class="button-send" @click="publishMsg"><i class="bi bi-send-fill"></i></button>
        </div>
    </div>
    <!-- Loading Spinner -->
    <div v-if="isLoading" class="position-absolute top-0 start-0 h-100 w-100 d-flex justify-content-center align-items-center bg-white">
        <div class="spinner-border loading" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>    
</template>

<style scoped>
    .button-send {
        width: 44px;
        border: 0;
        background-color: rgb(90, 90, 255);
    }

    .button-send i {
        color: rgb(255, 255, 255);
    }
</style>
