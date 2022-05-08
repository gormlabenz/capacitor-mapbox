import mapbox from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { magneticHeading } from '~/composables'

export const center = ref([0, 0])

const MARKER_COUNT = 1
export let map
mapbox.accessToken = import.meta.env.VITE_MAPBOX_TOKEN
export const markerCoordinates = ref([])

export const create = (mapContainer) => {
  map = new mapbox.Map({
    container: mapContainer.value, // container ID
    style: 'mapbox://styles/gormlabenz/cjohonoex80r92slb2yu629ww', // style URL
    center: [13.453557155315018, 52.51959827780059], // starting position [lng, lat]
    zoom: 12, // starting zoom
  })

  map.on('load', () => {
    center.value = map.getCenter()
    removeMapboxElements()
    markerCoordinates.value = getMarkerCoordinates(MARKER_COUNT)
  })

  map.on('move', (data) => {
    center.value = map.getCenter()
  })
}

const removeMapboxElements = () => {
  const mapboxElements = document.getElementsByClassName('mapboxgl-ctrl')
  for (let i = 0; i < mapboxElements.length; i++) {
    mapboxElements[i].style.display = 'none'
  }
}

const getMarkerCoordinates = (length) => {
  const bounds = map.getBounds()
  const width = bounds.getEast() - bounds.getWest()
  const height = bounds.getNorth() - bounds.getSouth()

  const markers = Array.from({ length }, () => {
    return [
      Math.random() * width + bounds.getWest(),
      Math.random() * height + bounds.getSouth(),
    ]
  })

  return markers
}

export function project(d) {
  return map.project(new mapbox.LngLat(d[0], d[1]))
}
