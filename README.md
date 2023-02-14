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
1. Rename .env.example to .env
2. If not already done, install Docker Compose (v2.10+)
3. Run docker compose up
4. Open `https://localhost:8080` in your web browser and [accept the auto-generated TLS certificate](https://stackoverflow.com/a/15076602/1352334)
5. Run docker compose down --remove-orphans to stop the Docker containers

## HTTPS
An Https connection is required to use a device's media devices (in this case camera and gelocation). [@vitejs/plugin-basic-ssl](@vitejs/plugin-basic-ssl) is used in this case to generate untrusted certificates which still allow access to the page after proceeding a message with a warning. Don't use that in production!


## Accessing the Demo from an External Device
With the current configuration the demo is only running on your local computer and can't be properly accessed by other devices in the same network (e.g. to test it on actually mobile devices). Just set `VITE_URL_BACKEND` and `VITE_URL_HUB` to a valid backend and Mercure hub. See [Symfony-Docker-SSE-Demo](https://github.com/J-C-V/symfony-docker-sse-demo).
