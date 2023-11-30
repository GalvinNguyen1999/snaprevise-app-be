import { DataTypes } from 'sequelize'
import { GET_DB } from '~/config/database'
import { sequelize } from '~/config/database'

// Define the Location model
const locations = sequelize.define(
  'locations',
  {
    name: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.JSON,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    area: {
      type: DataTypes.FLOAT
    }
  },
  { paranoid: true }
)

const createLocation = async (data) => {
  try {
    const location = await GET_DB().locations.create(data)
    return location
  } catch (error) { throw new Error(error) }
}

// get all non-soft deleted locations
const getLoations = async () => {
  try {
    const locations = await GET_DB().locations.findAll()
    return locations
  } catch (error) { throw new Error(error) }
}

// get all locations, including soft deletions
const getAllLocations= async () => {
  try {
    const locations = await GET_DB().locations.findAll({ paranoid: false })
    return locations
  } catch (error) { throw new Error(error) }
}

const getLocationByName = async (name) => {
  try {
    const location = await GET_DB().locations.findOne({ where: { name } })
    return location
  } catch (error) { throw new Error(error) }
}

const updateLocation = async (id, data) => {
  try {
    const location = await GET_DB().locations.update(data, { where: { id } })
    return location
  } catch (error) { throw new Error(error) }
}

const deleteLocation = async (id) => {
  try {
    const location = await GET_DB().locations.destroy({ where: { id } })
    return location
  } catch (error) { throw new Error(error) }
}

const updateStatus = async (id, status) => {
  try {
    const newStatus = await GET_DB().locations.update({ status }, { where: { id } })
    return newStatus
  } catch (error) { throw new Error(error) }
}

const unconfirmedLocations = async () => {
  try {
    const locations = await GET_DB().locations.findAll({ where: { status: 'pending' } })
    return locations
  } catch (error) { throw new Error(error) }
}

const approveLocation = async (id) => {
  try {
    const location = await GET_DB().locations.update({ status: 'approved' }, { where: { id } })
    return location
  } catch (error) { throw new Error(error) }
}

const declineLocation = async (id) => {
  try {
    const location = await GET_DB().locations.update({ status: 'declined' }, { where: { id } })
    return location
  } catch (error) { throw new Error(error) }
}

export const locationModel = {
  locations,
  createLocation,
  getLoations,
  updateLocation,
  deleteLocation,
  updateStatus,
  getAllLocations,
  getLocationByName,
  unconfirmedLocations,
  approveLocation,
  declineLocation
}
