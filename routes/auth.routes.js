const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Password length should be more than 6 symbols')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect registration data'
      })
    }
    
    const {email, password} = req.body

    const candidate = User.findOne({ email })
    if(candidate) {
      return res.status(400).json({ message: 'Such user already exist' })
    }

    const hashedPassword = bcrypt.hash(password, 12)

    const user = new User({ email, password: hashedPassword })
    await user.save()

    res.status(201).json({ message: 'User has been successfully created' })

  } catch (error) {
    res.status(500).json({ message: 'Something has happened on the server' })
  }
})

// /api/auth/login
router.post('/login', async (req, res) => {

})

module.exports = router