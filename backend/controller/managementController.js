import mongoose from 'mongoose'
import User from '../model/User.js'

export const getUsersOnly = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 })
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const updateUsersDetails = async (req, res) => {
  const { userId, role } = req.body || {}
  try {
    await User.updateOne({ userId }, { $set: { role } })
    res.status(200).json({ message: 'User role updated successfully' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
