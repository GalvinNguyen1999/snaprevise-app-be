import { locationService } from '~/services/locationService'
import { StatusCodes } from 'http-status-codes'

const createLocation = async (req, res, next) => {
  try {
    const location = await locationService.createLocation(req.body)
    return res.status(StatusCodes.CREATED).json(location)
  } catch (error) { next(error) }
}

const getLocations = async (req, res, next) => {
  try {
    const locations = await locationService.getLocations()
    return res.status(StatusCodes.OK).json(locations)
  } catch (error) { next(error) }
}

const updateLocation = async (req, res, next) => {
  try {
    const location = await locationService.updateLocation(req.params.id, req.body)
    return res.status(StatusCodes.OK).json(location)
  } catch (error) { next(error) }
}

const deleteLocation = async (req, res, next) => {
  try {
    const location = await locationService.deleteLocation(req.params.id)
    return res.status(StatusCodes.OK).json(location)
  } catch (error) { next(error) }
}

export const locationController = {
  createLocation,
  getLocations,
  updateLocation,
  deleteLocation
}
