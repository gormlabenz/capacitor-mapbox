import { registerPlugin } from '@capacitor/core'
import { Capacitor } from '@capacitor/core'

export const magneticHeading = ref(0)

const Compass = registerPlugin('Compass')

if (Capacitor.getPlatform() !== 'web') {
  if (Capacitor.getPlatform() === 'ios') Compass.setup().then(() => Compass.start())

  Compass.addListener('heading', (data) => {
    magneticHeading.value = data.magneticHeading
  })
}
