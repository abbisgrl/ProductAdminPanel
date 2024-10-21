import TotalStats from '../model/TotalStats.js'

export const totalStats = async (req, res, next) => {
  try {
    const totalStats = await TotalStats.find()
    console.dir({ totalStats }, { depth: null })
    res.status(200).json(totalStats[0])
  } catch (error) {
    console.dir({ error }, { depth: null })
  }
}
