import { createError } from '../misc/helper.js'
import User from '../model/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const loginController = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return next(createError(401, 'User not found'))
    }

    const validPassword = await bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return next(createError(201, 'Wrong password'))
    }

    // create jwt token
    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET, {
      expiresIn: '9999 years',
    })

    res.status(200).json({ token, user })
  } catch (err) {
    next(err)
  }
}

export const signupController = async (req, res, next) => {
  const {
    name,
    email,
    password,
    role,
    city,
    state,
    country,
    occupation,
    phoneNumber,
  } = req.body
  console.dir({ body: req.body }, { depth: null })
  if (!email) {
    return res.status(400).send({ message: 'Missing email.', field: 'email' })
  }
  if (!name) {
    return res.status(400).send({ message: 'Missing name', field: 'name' })
  }
  if (!password) {
    return res
      .status(400)
      .send({ message: 'Missing password', field: 'password' })
  }

  try {
    const existingUser = await User.findOne({ email }).exec()
    if (existingUser) {
      return res.status(400).send({
        message: 'Email is already in use.',
      })
    }
    // Step 1 - Create and save the userconst salt = bcrypt.genSaltSync(10);
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    })

    newUser
      .save()
      .then((user) => {
        // create jwt token
        const token = jwt.sign({ id: user.userId }, process.env.JWT, {
          expiresIn: '9999 years',
        })
        res.status(200).json({ token, user })
      })
      .catch((err) => {
        next(err)
      })
  } catch (err) {
    next(err)
  }
}
