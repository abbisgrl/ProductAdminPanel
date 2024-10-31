import jwt from 'jsonwebtoken'
import User from '../model/User.js'

export const auth = async (req, res, next) => {
  const token = req.headers.authorization
  const accessToken = token.split('Bearer ')[1]
  if (!accessToken) {
    return res.status(401).send({
      message: 'Please login with a valid user',
      field: 'Invalid User',
    })
  }
  const secret = process.env.JWT_SECRET
  const roleObject = {
    admin: 'A',
    user: 'T',
    superadmin: 'S',
  }

  try {
    // Verify the token and extract the payload
    const decoded = jwt.verify(accessToken, secret)
    const userId = decoded.userId
    req.userId = decoded.userId
    const user = await User.findOne({ userId })
    if (user?.role && !req.roles.includes(roleObject[user?.role])) {
      return res.status(403).json({ message: 'Access denied' })
    }
  } catch (err) {
    console.error('Token verification failed:', err.message)
  }
  next()
}

export const withRoles = (roles) => (req, res, next) => {
  req.roles = roles // Attach roles to req
  auth(req, res, next) // Call the original auth middleware
}
