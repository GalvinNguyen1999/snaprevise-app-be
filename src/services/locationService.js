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

const fetchPlacesFromAPI = async (location, radius, types) => {
  try {
    return await instance.get('', {
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

const createLocation = async (data) => {
  try {
    const { location } = data
    const types = 'hospital,school,park,supermarket'
    const radius = 20000 // 20km

    const response = await fetchPlacesFromAPI(location, radius, types)
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
  createLocation,
  getLoations,
  updateLocation,
  deleteLocation
}
