import { locationModel } from '~/models/locationModel'
import { instance } from '~/config/axiosConfig'
import { calculateArea, changeLocationToArray, determineLocationType } from '~/utils/algorithms'

const PLACES_SEARCH_TYPES = 'hospital,school,park,supermarket'
const DEFAULT_RADIUS = 20000 // 20km

const fetchPlacesFromRadius = async (location, radius = DEFAULT_RADIUS, types = PLACES_SEARCH_TYPES) => {
  try {
    const response = await instance.get('/place/nearbysearch/json', {
      params: { location, radius, types }
    })
    return response.data.results
  } catch (error) {
    throw new Error(error)
  }
}

const processAndSavePlaces = async (location, places, radius) => {
  const areaLocation = changeLocationToArray(location)
  const area = calculateArea(areaLocation, radius)

  await Promise.all(
    places.map(async (place) => {
      const { name, geometry, vicinity, types } = place
      const location = { lat: geometry.location.lat, lng: geometry.location.lng }
      const locationType = determineLocationType(types)

      if (locationType !== 'Unknown') {
        const existLocation = await locationModel.getLocationByName(name)
        if (existLocation) { return }
        await locationModel.createLocation({ name, location, address: vicinity, type: locationType, area })
      }
    })
  )
}

const createLocation = async (data) => {
  try {
    const { name, address, location, placeType: type } = data.place
    const locationChanged = changeLocationToArray(location)
    const area = calculateArea(locationChanged, DEFAULT_RADIUS)

    const existLocation = await locationModel.getLocationByName(name)
    if (!existLocation) {
      const locationDetail = await locationModel.createLocation({ name, location, address, type, area })
      return locationDetail
    }
  } catch (error) { throw new Error(error) }
}


const createLocationFromRadius = async (data) => {
  try {
    const { location } = data
    const response = await fetchPlacesFromRadius(location)
    await processAndSavePlaces(location, response, DEFAULT_RADIUS)
  } catch (error) { throw new Error(error) }
}

const getLocations = async () => {
  try {
    const locations = await locationModel.getLocations()
    return locations
  } catch (error) { throw new Error(error) }
}

const updateLocation = async (id, data) => {
  try {
    const location = await locationModel.updateLocation(id, data)
    return location
  } catch (error) { throw new Error(error) }
}

const deleteLocation = async (id) => {
  try {
    const location = await locationModel.deleteLocation(id)
    return location
  } catch (error) { throw new Error(error) }
}

export const locationService = {
  createLocationFromRadius,
  getLocations,
  updateLocation,
  deleteLocation,
  createLocation
}
