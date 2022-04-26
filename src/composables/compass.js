import { registerPlugin } from '@capacitor/core'

export const degree = ref(0)

const CompassHeading = registerPlugin('CompassHeading')
CompassHeading.addListener('degree', (data) => {
  degree.value = data.degree
})
