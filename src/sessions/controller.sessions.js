const {Router} = require('express')
const Sessions = require('../model/Sessions.model')
const passport = require('passport')

const router = Router()


router.post('/',passport.authenticate('register', {failureRedirect:'/sessions/failregister'}), async (req,res) =>{
  try {
    res.status(201).json({status:'succes', message:'Usuario Registrado'})

  } catch (error) {
    if (error.code === 11000){
      res.status(500).json({status:'error', error:'Internal server error'})
    }
  }
})

router.get('/failregister', (req,res) => {
  console.log('fallo estrategia de registro')

  res.json({error: 'Failed register'})
})
module.exports = router
