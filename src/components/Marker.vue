<template>
  <div
    ref="container"
    :style="{ width: size + 'px', height: size + 'px' }"
    class="flex justify-center items-center"
  >
    <div
      ref="marker"
      :style="style"
      class="bg-red-500 w-full h-full rounded-full absolute"
    ></div>
  </div>
</template>

<script setup>
import { center } from '~/composables'
const MIN_DISTANCE = 15
const marker = ref(null)
const container = ref(null)
const size = Math.random() * 24 + 24
const style = ref({})

const getDistanceToEdges = () => {
  const { left, top, right, bottom, width, height } =
    container.value.getBoundingClientRect()
  const distanceToEdges = {
    left: left,
    top: top,
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

watch(
  center,
  () => {
    if (marker.value) {
      style.value = getStyle()
    }
  },
  {
    immediate: true,
  }
)
</script>
