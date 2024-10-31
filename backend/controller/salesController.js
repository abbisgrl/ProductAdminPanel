import TotalStats from '../model/TotalStats.js'

export const totalStats = async (req, res, next) => {
  try {
    const totalStats = await TotalStats.find()
    res.status(200).json(totalStats[0])
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
