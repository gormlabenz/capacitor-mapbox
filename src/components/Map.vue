<script setup>
import mapbox from 'mapbox-gl'
const mapContainer = ref(null)
mapbox.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

onMounted(() => {
  const map = new mapbox.Map({
    container: mapContainer.value, // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  })
})
</script>
<template>
  <div class="w-screen h-screen overflow-hidden">
    <div ref="mapContainer" class="w-full h-full"></div>
  </div>
</template>
