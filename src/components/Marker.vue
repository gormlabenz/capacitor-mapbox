<template>
  <div
    ref="container"
    :style="{ width: size + 'px', height: size + 'px' }"
    class="flex justify-center items-center"
  >
    <div
      ref="marker"
      :style="style"
      class="border-red-500 border-2 overflow-hidden w-full h-full rounded-full absolute"
    >
      <img src="https://picsum.photos/200" class="" alt="" />
    </div>
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

  const edge = Object.keys(distanceToEdges).find(
    (key) => distanceToEdges[key] === min
  )

  if (min < 0) {
    scale = 0
  } else if (min < MIN_DISTANCE) {
    scale = (1 / MIN_DISTANCE) * min
  }
  return {
    transform: `scale(${scale})`,
    transformOrigin: `${edge} center`,
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
