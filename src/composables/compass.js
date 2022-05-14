import { registerPlugin } from '@capacitor/core'
import { Capacitor } from '@capacitor/core'

export const magneticHeading = ref(0)

if (Capacitor.getPlatform() === 'ios') {
  const Compass = registerPlugin('Compass')

  Compass.setup().then(() => Compass.start())

  Compass.addListener('heading', (data) => {
    magneticHeading.value = data.magneticHeading
  })


}
