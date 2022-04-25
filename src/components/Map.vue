<script setup>
import mapbox from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const mapContainer = ref(null)
mapbox.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

function rotateCamera(map, timestamp) {
  map.rotateTo((timestamp / 100) % 360, {
    duration: 0,
  })
  requestAnimationFrame((timestamp) => rotateCamera(map, timestamp))
}

onMounted(() => {
  const map = new mapbox.Map({
    container: mapContainer.value, // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  })
  map.on('load', (event) => {
    rotateCamera(event.target, 0)
  })
})
</script>

<template>
  <div class="w-screen h-screen overflow-hidden">
    <div ref="mapContainer" class="w-full h-full"></div>
  </div>
</template>
