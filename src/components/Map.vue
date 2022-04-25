<script setup>
import mapbox from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const mapContainer = ref(null)
mapbox.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

const rotation = ref(0)

function rotateCamera(map) {
  map.rotateTo(rotation.value * -1, {
    duration: 0,
  })
  requestAnimationFrame((timestamp) => rotateCamera(map, timestamp))
}

onMounted(() => {
  const map = new mapbox.Map({
    container: mapContainer.value, // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [13.453557155315018, 52.51959827780059], // starting position [lng, lat]
    zoom: 9, // starting zoom
  })
  map.on('load', (event) => {
    rotateCamera(event.target, 0)
  })
})

let accelHandler
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

onUnmounted(() => {
  if (accelHandler) accelHandler.remove()
})
</script>

<template>
  <button
    v-if="rotation === 0"
    class="px-2 py-2 z-10 border-2 border-gray-500 rounded-md absolute bg-white top-4 left-2"
    @click="init"
  >
    Start
  </button>
  <div class="w-screen h-screen overflow-hidden" @click="init">
    <div ref="mapContainer" class="w-full h-full"></div>
  </div>
  <!-- <div class="flex justify-center items-center h-screen">
    <div
      :style="{ transform: `rotate(${rotation}deg)` }"
      class="w-2 h-96 bg-black"
    ></div>
  </div> -->
</template>
