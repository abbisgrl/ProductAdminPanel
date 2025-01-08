import { createError } from '../misc/helper.js'
import User from '../model/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid' // random

export const loginController = async (req, res, next) => {
  const { name, email, password, isAdmin, role, title } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return next(createError(401, 'User not found'))
    }

    const validPassword = await bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(401).send({ message: 'Wrong Password' })
    }

    // create jwt token
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: '9999 years',
    })

    res.status(200).json({ token, user })
  } catch (err) {
    next(err)
  }
}

export const signupController = async (req, res, next) => {
  const { name, email, password } = req.body
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
      userId: uuidv4(),
    })

    newUser
      .save()
      .then((user) => {
        // create jwt token
        const token = jwt.sign(
          { userId: user.userId },
          process.env.JWT_SECRET,
          {
            expiresIn: '9999 years',
          },
        )
        res.status(200).json({ token, user })
      })
      .catch((err) => {
        next(err)
      })
  } catch (err) {
    next(err)
  }
}
