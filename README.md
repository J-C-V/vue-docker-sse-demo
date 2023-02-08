# VUE Docker SSE Demo (Frontend)
This demo works in tandem with [Symfony-Docker-SSE-Demo](https://github.com/J-C-V/symfony-docker-sse-demo). Currently uses the Vite development server with hot reload enabled (See Vite's [server.watch](https://vitejs.dev/config/server-options.html#server-watch) configuration).

Simple demo to test and learn about following topics in regards to mobile devices:
* [Vue](https://vuejs.org/)
* [Bootstrap](https://getbootstrap.com/)
* [Docker](https://www.docker.com/)
* Server-Sent Events with the help of the [Mercure protocol](https://mercure.rocks/)
* Barcode and QR Code Scanning with the help of the image processing library [ZXing](https://github.com/zxing-js/library)
* [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

## Getting Started
1. If not already done, install Docker Compose (v2.10+)
2. Run docker compose up
3. Open http://127.0.0.1:8000
4. Run docker compose down --remove-orphans to stop the Docker containers

## Access Demo On Other Devices
With the current configuration the demo is only running on your local computer and can't be properly accessed by other devices in the same network (e.g. to test it on actually mobile devices).

To do so, change the URL of the Backend and Mercure Hub in the .env, as well as the exposed IP:Port configuration in the [Backend Demo](https://github.com/J-C-V/symfony-docker-sse-demo) to the IP address of the device on which the Docker containers are running on.