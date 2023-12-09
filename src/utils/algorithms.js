import * as turf from '@turf/turf'

export const calculateArea = (location, radiusInKilometers) => {
  const center = turf.point(location)
  const options = { steps: 64, units: 'kilometers' }
  const circle = turf.circle(center, radiusInKilometers, options)
  const area = turf.area(circle)
  return area
}


export const changeLocationToArray = (location) => {
  return Object.keys(location).map((key) => {
    return location[key]
  })
}

export const determineLocationType = (types) => {
  switch (true) {
  case types.includes('hospital'):
    return 'Hospital'
  case types.includes('school') || types.includes('university'):
    return 'School'
  case types.includes('park'):
    return 'Park'
  case types.includes('supermarket'):
    return 'Supermarket'
  default:
    return 'Unknown'
  }
}
