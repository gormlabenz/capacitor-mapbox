<template>
  <div
    ref="marker"
    :style="style"
    class="h-12 w-12 bg-red-500 rounded-full absolute"
  ></div>
</template>

<script setup>
import { center } from '~/composables'
const MIN_DISTANCE = 50
const marker = ref(null)

const style = ref({})

const getDistanceToEdges = () => {
  const { left, top, right, bottom } = marker.value.getBoundingClientRect()
  const distanceToEdges = {
    left: left + window.scrollX,
    top: top + window.scrollY,
    right: window.innerWidth - right,
    bottom: window.innerHeight - bottom,
  }
  return distanceToEdges
}

const getStyle = () => {
  let scale = 1
  const distanceToEdges = getDistanceToEdges()
  const min = Math.min(...Object.values(distanceToEdges))

  if (min < 0) {
    scale = 0
  } else if (min < MIN_DISTANCE) {
    scale = (1 / MIN_DISTANCE) * min
  }

  return {
    transform: `scale(${scale})`,
  }
}

watch(center, () => {
  if (marker.value) {
    style.value = getStyle()
  }
})
</script>
