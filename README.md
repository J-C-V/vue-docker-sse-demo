# Vue-Docker-SSE-Demo
This demo works in tandem with [Symfony-Docker-SSE-Demo](https://github.com/J-C-V/symfony-docker-sse-demo). Currently uses the Vite development server with hot reload enabled (See Vite's [server.watch](https://vitejs.dev/config/server-options.html#server-watch) configuration).

Simple demo to test and learn about following topics in regards to mobile devices:
* [Vue](https://vuejs.org/)
* [Bootstrap](https://getbootstrap.com/)
* [Docker](https://www.docker.com/)
* Server-Sent Events with the help of the [Mercure protocol](https://mercure.rocks/)
* Barcode and QR Code Scanning with the help of the image processing library [ZXing](https://github.com/zxing-js/library)
* [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

## Getting Started
1. Rename .env.example to .env
2. If not already done, install Docker Compose (v2.10+)
3. Run docker compose up
4. Open `http://localhost:8080` in your web browser to see the demo

## HTTPS
Certain features (`Geolocation API`, `MediaDevices.getUserMedia()`, ...) are only available in secure contexts (HTTPS). `http://localhost` is treated as an exception though and can be used for local development and testing.

## Debugging on Mobile Devices
### Android
You can remote debug and test on Android devices with the help of [Google Chrome's DevTools](https://developer.chrome.com/docs/devtools/remote-debugging/). To test the demo enable [port-forwarding in the remote device settings](https://developer.chrome.com/docs/devtools/remote-debugging/local-server/) and you're good to go!

Be sure to set `VITE_URL_BACKEND` and `VITE_URL_HUB` in your `.env` to a valid backend and Mercure hub URL as well (See [Symfony-Docker-SSE-Demo](https://github.com/J-C-V/symfony-docker-sse-demo)).

### iOS
WIP
