import TotalSummary from '../model/TotalSummary.js'
import Transaction from '../model/Transaction.js'
import User from '../model/User.js'

export const getDashboardsDetails = async (req, res) => {
  // Extract the userId from the decoded token
  const userId = req.userId

  try {
    // hardcoded values
    const currentMonth = 'November'
    const currentYear = 2021
    const currentDay = '2021-11-15'

    /* Recent Transactions */
    const transactions = await Transaction.find({ userId })
      .limit(50)
      .sort({ createdOn: -1 })

    /* Overall Stats */
    const TotalSummaryData = await TotalSummary.find({ year: currentYear })

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = TotalSummaryData[0]

    const thisMonthStats = TotalSummaryData[0].monthlyData.find(({ month }) => {
      return month === currentMonth
    })

    const todayStats = TotalSummaryData[0].dailyData.find(({ date }) => {
      return date === currentDay
    })

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getUserDetails = async (req, res) => {
  const userId = req.userId
  try {
    const user = await User.find({ userId })
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
