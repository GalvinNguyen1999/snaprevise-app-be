import express from 'express'
import { adminController } from '~/controllers/adminController'

const ROUTE = express.Router()

ROUTE.route('/get-users')
  .get(adminController.getUsers)

ROUTE.route('/assign-user-role/:id')
  .put(adminController.assignUserRole)

ROUTE.route('/assign-admin-role/:id')
  .put(adminController.assignAdminRole)

ROUTE.route('/update-status/:id')
  .put(adminController.updateStatus)

ROUTE.route('/unconfirmed-locations')
  .get(adminController.unconfirmedLocations)

ROUTE.route('/approve-location/:id')
  .put(adminController.approveLocation)

ROUTE.route('/decline-location/:id')
  .put(adminController.declineLocation)

export const adminRoute = ROUTE