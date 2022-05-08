<script setup>
import { create, markerCoordinates } from '~/composables'
const mapContainer = ref(null)

onMounted(() => {
  create(mapContainer)
})
</script>

<template>
  <div
    class="w-screen h-screen overflow-hidden"
    @touchstart="isInteracting = true"
    @touchend="isInteracting = false"
    @click="rotate"
  >
    <div class="absolute z-20" v-for="markerCoordinate in markerCoordinates">
      <Marker :lonLat="markerCoordinate"></Marker>
    </div>
    <div ref="mapContainer" class="w-full h-full"></div>
  </div>
</template>
