const User = require('../models/User')

//handleErrors
const handleErrors = (err) => {
  let errorMessage = { email: '', password: ''}
  if (err.code === 11000) {
    errorMessage.email = 'That email is already registered'
    return errorMessage
  }
  //validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach((er) => {
      errorMessage[er.properties.path] = er.properties.message
    })
    return errorMessage
  }
}
module.exports.signup_get = (req, res) => {
  res.render('signup')
}

module.exports.login_get = (req, res) => {
  res.render('login')
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.create({ email, password })
    res.status(201).json(user)
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).json({ errors })
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)
  res.send('new login')

}
