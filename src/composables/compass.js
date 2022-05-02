import { registerPlugin } from '@capacitor/core'

export const magneticHeading = ref(0)

const Compass = registerPlugin('Compass')

Compass.setup().then(() => Compass.start())

Compass.addListener('heading', (data) => {
  magneticHeading.value = data.magneticHeading
})
