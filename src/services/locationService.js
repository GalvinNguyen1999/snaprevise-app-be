import { locationModel } from '~/models/locationModel'
import { instance } from '~/config/axiosConfig'
import { calculateArea } from '~/utils/algorithms'

const determineLocationType = (types) => {
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

const fetchPlacesFromRadius = async (location, radius, types) => {
  try {
    return await instance.get('/place/nearbysearch/json', {
      params: {
        location,
        radius,
        types
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}

const fetchPlacesFromId = async (id) => {
  try {
    return await instance.get('/place/details/json', {
      params: {
        place_id: id
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}

const processAndSavePlaces = async (location, places, radius) => {
  const areaLocation = location.split(',')
  const area = calculateArea(areaLocation, radius)

  await Promise.all(
    places.map(async (place) => {
      const { name, geometry, vicinity, types } = place
      const location = {
        lat: geometry.location.lat,
        lng: geometry.location.lng
      }

      const locationType = determineLocationType(types)

      if (locationType !== 'Unknown') {
        const existLocation = await locationModel.getLocationByName(name)
        if (existLocation) { return }

        await locationModel.createLocation({ name, location, address: vicinity, type: locationType, area })
      }
    })
  )
}

const createLocationFromId = async (data) => {
  try {
    const { placeId } = data
    const response = await fetchPlacesFromId(placeId)

    const { name, geometry, formatted_address: address, types } = response.data.result
    const type = types[0]

    const location = {
      lat: geometry.location.lat,
      lng: geometry.location.lng
    }

    const changeLocationToArray = Object.keys(location).map((key) => {
      return location[key]
    })

    const area = calculateArea(changeLocationToArray, 20000)

    const locationDetail = await locationModel.createLocation({ name, location, address, type, area })
    return locationDetail
  } catch (error) { throw new Error(error) }
}

const createLocationFromRadius = async (data) => {
  try {
    const { location } = data
    const types = 'hospital,school,park,supermarket'
    const radius = 20000 // 20km

    const response = await fetchPlacesFromRadius(location, radius, types)
    const places = response.data.results

    await processAndSavePlaces(location, places, radius)
  } catch (error) {
    throw new Error(error)
  }
}

const getLoations = async () => {
  try {
    const locations = await locationModel.getLoations()
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
  getLoations,
  updateLocation,
  deleteLocation,
  createLocationFromId
}
