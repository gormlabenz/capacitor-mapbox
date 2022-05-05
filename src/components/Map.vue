<script setup>
import mapbox from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { magneticHeading } from '~/composables'
import Marker from './Marker.vue'
import { createApp } from 'vue/dist/vue.esm-bundler'
import { center } from '~/composables'

const MARKER_COUNT = 50

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
    center.value = map.getCenter()
    removeMapboxElements()
    const markerCoordinates = getMarkerCoordinates(MARKER_COUNT)
    addMarkers(markerCoordinates)
  })

  map.on('move', (data) => {
    center.value = map.getCenter()
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

const addMarkers = (markerCoordinates) => {
  markerCoordinates.forEach((coordinates) => {
    new mapbox.Marker(getMarker()).setLngLat(coordinates).addTo(map)
  })
}

const getMarker = () => {
  const parent = document.createElement('div')
  createApp(Marker).mount(parent)
  return parent
}

const getMarkerCoordinates = (length) => {
  const bounds = map.getBounds()
  const width = bounds.getEast() - bounds.getWest()
  const height = bounds.getNorth() - bounds.getSouth()

  const markers = Array.from({ length }, () => {
    return [
      Math.random() * width + bounds.getWest(),
      Math.random() * height + bounds.getSouth(),
    ]
  })

  return markers
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
</template>
