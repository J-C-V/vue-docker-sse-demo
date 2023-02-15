<script setup lang='ts'>
import Feature from 'ol/Feature';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import { useGeographic } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import View from 'ol/View';
import { onMounted, ref } from 'vue';

import 'ol/ol.css';
import markerUrl from '@/assets/img/map-marker.png';

// Show loading spinner as long as page isn't fully rendered yet
const isLoading = ref(true);

// Map instance
let map: Map;

onMounted(() => {
    initMap();

    if (isGeolocationSupported()) {
        navigator.geolocation.getCurrentPosition((pos) => {
            console.log(pos);

            setMapPos(pos.coords, true);
        });
    }
});

/**
 * Check if current device supports Geolocation API.
 */
function isGeolocationSupported(): boolean
{
    let geolocation = false;

    if ('geolocation' in navigator) {
        geolocation = true;

        console.log('Geolocation is supported.');
    } else {
        console.log('Geolocation isn\'t supported.');
    }

    return geolocation;
}

/**
 * Initialize map with marker.
 */
function initMap(): void
{
    useGeographic();

    // OpenStreetMap layer
    const osmLayer = new TileLayer({
        source: new OSM()
    });

    // Marker layer
    const markerLayer = new VectorLayer({
        style: new Style({
            image: new Icon({
                anchor: [0.5, 1],
                src: markerUrl,
                scale: 1
            })
        })
    });
    markerLayer.setVisible(false);

    // Map
    map = new Map({
        view: new View({
            center: [0, 0],
            zoom: 0
        }),
        layers: [
            osmLayer,
            markerLayer
        ],
        target: 'map'
    });

    map.once('postrender', () => {
        isLoading.value = false;
    });
}

/**
 * Set map position.
 * 
 * @param pos Map position
 * @param showMarker Show/Hide marker
 */
function setMapPos(pos: GeolocationCoordinates, showMarker: boolean): void
{
    const view = new View({
        center: [pos.longitude, pos.latitude],
        zoom: 16
    });

    const vectorSrc = new VectorSource({
        features: [
            new Feature({
                geometry: new Point([pos.longitude, pos.latitude])
            })
        ]
    });

    const markerLayer = map.getAllLayers()[1];
    markerLayer.setSource(vectorSrc);
    markerLayer.setVisible(showMarker);

    map.setView(view);
}
</script>

<template>
    <!-- Map -->
    <div id="map" class="position-absolute start-0 top-0 w-100 h-100"></div>
    <!-- Loading Spinner -->
    <div v-if="isLoading" class="position-absolute top-0 start-0 h-100 w-100 d-flex justify-content-center align-items-center bg-white">
        <div class="spinner-border loading" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>
