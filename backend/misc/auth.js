import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
  const token = req.headers.authorization
  const accessToken = token.split('Bearer ')[1]
  if (!accessToken) {
    return res.status(401).send({
      message: 'Please login with a valid user',
      field: 'Invalid User',
    })
  }
  const secret = process.env.JWT_SECRET

  try {
    // Verify the token and extract the payload
    const decoded = jwt.verify(accessToken, secret)

    // Extract the userId from the decoded token
    const userId = decoded.userId
    req.userId = decoded.userId
  } catch (err) {
    console.error('Token verification failed:', err.message)
  }
  next()
}
