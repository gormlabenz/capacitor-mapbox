<script setup>
import mapbox from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { heading } from '~/composables'

const mapContainer = ref(null)
mapbox.accessToken = import.meta.env.VITE_MAPBOX_TOKEN
let map

onMounted(() => {
  map = new mapbox.Map({
    container: mapContainer.value, // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [13.453557155315018, 52.51959827780059], // starting position [lng, lat]
    zoom: 9, // starting zoom
  })
})

const isInteracting = ref(false)

watch(
  heading,
  () => {
    if (map && !isInteracting.value) {
      map.rotateTo(heading.value.magneticHeading, {
        duration: heading.value.trueHeading,
      })
    }
  },
  { immediate: true, deep: true }
)
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
