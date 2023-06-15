const {Router} = require('express')
const Sessions = require('../model/Sessions.model')
const { isValidPass, hashPass } = require('../utils/cryptPassword')
const passport = require('passport')

const router = Router()

router.post(
	'/',
	passport.authenticate('login', { failureRedirect: '/auth/faillogin'}), 
	async (req,res) => {
		try {
			if(!req.user)
			return res
			.status(401)
			.json({status: 'error', error:'Usuario y contraseña no coinciden' })

			req.session.user = {
				first_name: req.user.first_name,
				last_name: req.user.last_name,
				email: req.user.email
			}

			res.json({status:'succes', message:'sesion iniciada'})
		} catch (error) {
				console.log(error.message)
				res.status(500).json({status:'error', error:'Internal server error'})
		}
	}
)

router.get(
'/github',
 passport.authenticate('github', {scope: ['user:email']}), 
async (req, res) =>{}
)

router.get(
	'/githubcallback',
	passport.authenticate('github', {failureRedirect: '/login'}), 
async (req,res) =>{
	req.session.user = req.user
	res.redirect('/')
}
)

router.get('/logout', (req,res)=>{
		req.session.destroy(error => {
				if(error) return res.json({error})
				res.redirect('/login')
		})
})

router.patch('/forgotPass', async (req,res) => {
		try {
				const {email, password} = req.body
				const passEncrypted = hashPass(password)
				await Sessions.updateOne({email}, {password: passEncrypted})

				res.json({message:'Contraseña actualizada'})
		} catch (error) {
				res.json({error: error.message})
		}
})

module.exports = router
