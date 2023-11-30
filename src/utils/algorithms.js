import * as turf from '@turf/turf'

export const calculateArea = (location, radiusInKilometers) => {
  const center = turf.point(location)
  const options = { steps: 64, units: 'kilometers' }
  const circle = turf.circle(center, radiusInKilometers, options)
  const area = turf.area(circle)
  return area
}
