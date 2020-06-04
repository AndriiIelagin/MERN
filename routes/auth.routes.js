const {Router} = require('express')
const router = Router()

const User = require('../models/User')

// /api/auth/register
router.post('/register', async (req, res) => {
  try {
    
    const {email, password} = req.body

    const candidate = User.findOne({ email })
    if(candidate) {
      res.status(400).json({ message: 'Such user already exist' })
    }

  } catch (error) {
    res.status(500).json({ message: 'Something has happened on the server' })
  }
})

// /api/auth/login
router.post('/login', async (req, res) => {

})

module.exports = router