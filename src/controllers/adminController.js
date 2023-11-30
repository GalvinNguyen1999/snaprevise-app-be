import { adminService } from '~/services/adminService'
import { StatusCodes } from 'http-status-codes'

const getUsers = async (req, res, next) => {
  try {
    const users = await adminService.getUsers()
    return res.status(StatusCodes.OK).json(users)
  } catch (error) { next(error) }
}

const assignAdminRole = async (req, res, next) => {
  try {
    const user = await adminService.assignAdminRole(req.params.id)
    return res.status(StatusCodes.OK).json(user)
  } catch (error) { next(error) }
}

const assignUserRole = async (req, res, next) => {
  try {
    const user = await adminService.assignUserRole(req.params.id)
    return res.status(StatusCodes.OK).json(user)
  } catch (error) { next(error) }
}

const updateStatus = async (req, res, next) => {
  try {
    const newStatus = await adminService.updateStatus(req.params.id, req.body)
    return res.status(StatusCodes.OK).json(newStatus)
  } catch (error) { next(error) }
}

const unconfirmedLocations = async (req, res, next) => {
  try {
    const locations = await adminService.unconfirmedLocations()
    return res.status(StatusCodes.OK).json(locations)
  } catch (error) {
    next(error)
  }
}

const approveLocation = async (req, res, next) => {
  try {
    const location = await adminService.approveLocation(req.params.id)
    return res.status(StatusCodes.OK).json(location)
  } catch (error) { next(error) }
}

const declineLocation = async (req, res, next) => {
  try {
    const location = await adminService.declineLocation(req.params.id)
    return res.status(StatusCodes.OK).json(location)
  } catch (error) { next(error) }
}

export const adminController = {
  getUsers,
  assignAdminRole,
  assignUserRole,
  updateStatus,
  unconfirmedLocations,
  approveLocation,
  declineLocation
}
