import express from 'express'
import { locationController } from '~/controllers/locationController'

const ROUTE = express.Router()

ROUTE.route('/submit-location')
  .post(locationController.createLocation)

ROUTE.route('/all-locations')
  .get(locationController.getLocations)

ROUTE.route('/update-location/:id')
  .put(locationController.updateLocation)

ROUTE.route('/delete-location/:id')
  .delete(locationController.deleteLocation)

export const locationRoute = ROUTE
