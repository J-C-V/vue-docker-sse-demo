<script setup lang='ts'>
import { reactive, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

// URLs
const urlBackend = import.meta.env.VITE_URL_BACKEND;
const urlHub = import.meta.env.VITE_URL_HUB;

const urlMsgHistory = urlBackend + '/getStoredMsg';
const urlPublish = urlBackend + '/publishMsg';
const urlSubscribe = new URL(urlHub);
urlSubscribe.searchParams.append('topic', urlBackend + '/subscribeMsg');

// Messages
interface Message {
    id: number,
    message: string,
    postedAt: Date
}
const messages: Message[] = reactive([]);
const sentMsg = ref('');
fetchMsgHistory();

// SSE
const eventSource = new EventSource(urlSubscribe);

eventSource.onopen = (ev) => {
    console.log('Subscription successful...');
}
eventSource.onmessage = (ev) => {
    // Debug
    console.log(ev);

    // Add to array and render new message
    const data = JSON.parse(ev.data);
    data.postedAt = new Date(data.postedAt);

    messages.unshift(data);
}
eventSource.onerror = (ev) => {
    console.log(ev);
}

// Navigation Guards
onBeforeRouteLeave((to, from) => {
    eventSource.close();
    console.log('Closing connection...')
});

/**
 * Fetches message history.
 */
async function fetchMsgHistory()
{
    await fetch(urlMsgHistory, {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
        // Debug
        console.log(data);

        // Add to array and render old messages
        const oldMessages: Message[] = data.messages;
        oldMessages.forEach(message => {
            message.postedAt = new Date(message.postedAt);

            messages.push(message);
        });
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

    await fetch(urlPublish, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(msg)
    })
    .then(() => {
        sentMsg.value = '';
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<template>
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