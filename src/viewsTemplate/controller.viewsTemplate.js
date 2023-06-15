const {Router} = require('express')
const publicAccess = require('../middlewares/publicAccess.middleware')
const privateAccess = require('../middlewares/privateAcces.middleware')


const router = Router()


router.get('/signup', publicAccess, async (req,res) => {
    res.render('signup.handlebars')
})


router.get('/login',publicAccess, async (req,res) => {
    res.render('login.handlebars')
})

router.get('/', privateAccess, (req,res) =>{
    const {user} = req.session
    res.render('profile.handlebars', {user})
})

router.get('/forgotPass', (req,res) => {
    res.render('forgotPass.handlebars')
})

module.exports = router