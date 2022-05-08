<script setup>
import { create, markerCoordinates } from '~/composables'
const mapContainer = ref(null)

onMounted(() => {
  create(mapContainer)
})
</script>

<template>
  <div
    class="w-screen h-screen overflow-hidden bg-[#FFBC42]"
    @touchstart="isInteracting = true"
    @touchend="isInteracting = false"
    @click="rotate"
  >
    <div
      class="absolute pointer-events-none w-screen h-screen overflow-hidden"
      v-for="markerCoordinate in markerCoordinates"
    >
      <Marker :markerCoordinate="markerCoordinate"></Marker>
    </div>
    <div ref="mapContainer" class="w-full h-full"></div>
  </div>
</template>
