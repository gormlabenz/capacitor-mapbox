<template>
  <div ref="marker" class="h-6 w-6 bg-red-500 rounded-full"></div>
</template>

<script setup>
const marker = ref(null)
const markerBoundingRect = useElementBounding(marker)

watch(markerBoundingRect.width, () => {
  /* console.log('markerBoundingRect.width', markerBoundingRect.width) */
})

onMounted(() => {
  console.log('mounted', markerBoundingRect.bottom.value)
})
</script>
