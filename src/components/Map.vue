<script setup>
import mapbox from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { degree } from '~/composables'

const mapContainer = ref(null)
mapbox.accessToken = import.meta.env.VITE_MAPBOX_TOKEN
let map
const rotation = ref(0)

const isInteracting = ref(false)

/* watch(degree, () => {
  if (map && !isInteracting.value) {
    map.rotateTo(degree.value, {
      duration: 50,
    })
  }
}) */

function rotate() {
  if (map && !isInteracting.value) {
    map.rotateTo(degree.value, {
      duration: 0,
    })
  }
  requestAnimationFrame(rotate)
}

const init = async () => {
  const request = await DeviceMotionEvent.requestPermission()
  if (request === 'granted') {
    console.log('DeviceMotionEvent permission granted', request)
    window.addEventListener(
      'deviceorientation',
      (event) => (rotation.value = event.alpha)
    )
  } else {
    console.log('DeviceMotionEvent permission denied', request)
  }
}

onMounted(() => {
  map = new mapbox.Map({
    container: mapContainer.value, // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [13.453557155315018, 52.51959827780059], // starting position [lng, lat]
    zoom: 9, // starting zoom
  })
  map.on('load', () => rotate())
})
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
