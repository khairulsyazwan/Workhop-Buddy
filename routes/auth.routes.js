const router = require('express').Router()
const passport = require('../lib/passportConfig')
const jwt = require('jsonwebtoken')
const Workshop = require('../models/workshop.model')
const Customer = require('../models/customer.model')

/**
 * @method POST
 * @route api/auth/register
 * @name Registration
 */

router.post('/register', async (req, res) => {
  try {
    let { email, password, firstname, lastname, address } = req.body
    let customer = new Customer({
      email,
      password,
      firstname,
      lastname,
      address,
    })
    await customer.save()
    res.status(201).json({ message: 'user successfully registered!' })
  } catch (error) {
    res
      .status(400)
      .json({ message: 'one or more fields does not match requirement' })
  }
})

//register for workshops
router.post('/register/ws', async (req, res) => {
  try {
    let { email, password, name, address, phone } = req.body
    let workshop = new Workshop({
      email,
      password,
      name,
      address,
      phone,
    })
    await workshop.save()
    res.status(201).json({ message: 'workshop successfully registered!' })
  } catch (error) {
    res
      .status(400)
      .json({ message: 'one or more fields does not match requirement' })
  }
})

/**
 * @method POST
 * @route api/auth/login
 * @name login
 * @returns jwt
 */
router.post('/login', async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error occurred.')

        return next(error)
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)

        const body = { _id: user._id }
        const token = jwt.sign({ user: body }, process.env.SECRET)
        const id = user.id

        return res.status(200).json({ token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})

//jwt auth
router.get(
  '/authtoken',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    try {
      // res.send("ok your in");
      console.log(req.user)
      res.status(200).json({ message: 'wooooo!', user: req.user })
    } catch (error) {}
  }
)

module.exports = router
