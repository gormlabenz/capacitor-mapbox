import { registerPlugin } from '@capacitor/core'

export const heading = ref({ magneticHeading: 0, trueHeading: 0 })

const Compass = registerPlugin('Compass')

Compass.addListener('heading', (data) => {
  heading.value.magneticHeading = data.magneticHeading
  heading.value.trueHeading = data.trueHeading
})


