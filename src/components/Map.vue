<script setup>
import mapbox from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { magneticHeading } from '~/composables'
import Marker from './Marker.vue'

const mapContainer = ref(null)
mapbox.accessToken = import.meta.env.VITE_MAPBOX_TOKEN
let map

onMounted(() => {
  map = new mapbox.Map({
    container: mapContainer.value, // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [13.453557155315018, 52.51959827780059], // starting position [lng, lat]
    zoom: 12, // starting zoom
  })
  map.on('load', () => {
    removeMapboxElements()
    addMarkers()
    console.log(map.getBounds())
  })
})

const isInteracting = ref(false)

const removeMapboxElements = () => {
  const mapboxElements = document.getElementsByClassName('mapboxgl-ctrl')
  for (let i = 0; i < mapboxElements.length; i++) {
    mapboxElements[i].style.display = 'none'
  }
}

watch(magneticHeading, () => {
  if (map && !isInteracting.value) {
    map.rotateTo(magneticHeading.value, {
      duration: 0,
    })
  }
})

// add random markers to map inside the current viewport
const addMarkers = () => {
  const bounds = map.getBounds()
  const width = bounds.getEast() - bounds.getWest()
  const height = bounds.getNorth() - bounds.getSouth()

  const markers = []

  const el = document.getElementById('marker')
  for (let i = 0; i < 300; i++) {
    markers.push(
      new mapbox.Marker(el.cloneNode(true))
        .setLngLat([
          bounds.getWest() - width / 2 + Math.random() * width * 2,
          bounds.getSouth() - height / 2 + Math.random() * height * 2,
        ])
        .addTo(map)
    )
  }
}
</script>

<template>
  <div
    class="w-screen h-screen overflow-hidden"
    @touchstart="isInteracting = true"
    @touchend="isInteracting = false"
    @click="rotate"
  >
    <div ref="mapContainer" class="w-full h-full"></div>
  </div>
  <Marker id="marker"></Marker>
</template>

<style>
.mapboxgl-ctrl {
  display: none;
}
</style>
