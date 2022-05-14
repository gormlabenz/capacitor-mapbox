<script setup>
import mapbox from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { magneticHeading } from '~/composables'

const mapContainer = ref(null)
const labelsVisible = ref(true)
mapbox.accessToken = import.meta.env.VITE_MAPBOX_TOKEN
let map

onMounted(() => {
  map = new mapbox.Map({
    container: mapContainer.value, // container ID
    style: 'mapbox://styles/gormlabenz/cjohonoex80r92slb2yu629ww',
    center: [13.453557155315018, 52.51959827780059], // starting position [lng, lat]
    zoom: 14, // starting zoom
  })

  map.on('load', () => {
    removeMapboxElements()
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

watch(labelsVisible, () => {
  if (map) {
    map.style.stylesheet.layers.forEach(function (layer) {
      if (layer.id.includes('label') || layer.id == 'pedestrian-path') {
        labelsVisible.value
          ? map.setLayoutProperty(layer.id, 'visibility', 'visible')
          : map.setLayoutProperty(layer.id, 'visibility', 'none')
      }
    })
  }
})
</script>

<template>
  <div
    class="w-screen h-screen overflow-hidden bg-[#FFBC42]"
    @touchstart="isInteracting = true"
    @touchend="isInteracting = false"
    @click="rotate"
  >
    <button
      @click="labelsVisible = !labelsVisible"
      class="py-2 px-4 bg-white rounded-sm absolute m-12 z-10"
    >
      Hide
    </button>
    <div ref="mapContainer" class="w-full h-full"></div>
  </div>
</template>

<style>
.mapboxgl-ctrl {
  display: none;
}
</style>
