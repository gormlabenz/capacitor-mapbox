<template>
  <div
    ref="container"
    :style="{
      width: SIZE + 'px',
      height: SIZE + 'px',
      top: coordinated.x + 'px',
      left: coordinated.y + 'px',
    }"
    class="flex justify-center items-center absolute"
  >
    <div
      ref="marker"
      :style="style"
      class="border-red-500 border-2 overflow-hidden w-full h-full rounded-full"
    >
      <img src="https://picsum.photos/200" class="" alt="" />
    </div>
  </div>
</template>

<script setup>
import { map, center, project } from '~/composables'
const marker = ref(null)
const container = ref(null)
const style = ref({})

const SIZE = Math.random() * 24 + 24

const props = defineProps({
  markerCoordinate: {
    type: Array,
    required: true,
  },
})

const coordinated = ref([0, 0])

const getScale = (min) => {
  let scale = 1

  const offScreen = min < SIZE * -1
  if (offScreen) {
    scale = 0
  } else if (min < 0) {
    const v = SIZE - Math.abs(min)
    scale = v / SIZE
  }

  return scale
}

const getOrigin = (distanceToEdges, min) => {
  const edge = Object.keys(distanceToEdges).find(
    (key) => distanceToEdges[key] === min
  )

  origin = {
    left: 'right',
    top: 'bottom',
    right: 'left',
    bottom: 'top',
  }

  return origin[edge]
}

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
  const distanceToEdges = getDistanceToEdges()
  const min = Math.min(...Object.values(distanceToEdges))

  const scale = getScale(min)
  const origin = getOrigin(distanceToEdges, min)

  return {
    transform: `scale(${scale})`,
    transformOrigin: `${origin} center`,
  }
}

watch(center, () => {
  coordinated.value = project(props.markerCoordinate)
  if (marker.value) style.value = getStyle()
})

onMounted(() => {
  coordinated.value = project(props.markerCoordinate)
  if (marker.value) style.value = getStyle()
})
</script>
