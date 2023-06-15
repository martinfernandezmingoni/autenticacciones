const paassport = require('passport')
const local = require('passport-local')
const Sessions = require('../model/Sessions.model')
const {hashPass, isValidPass} = require('../utils/cryptPassword')
const passport = require('passport')
const GitHubStrategy = require('passport-github2')

const LocalStrategy = local.Strategy
const initializePassport = () => {
  passport.use(
    'register',
    new LocalStrategy(
      {passReqToCallback: true, usernameField: 'email'}, 
        async (req, username, password, done) => {
          try {
            const {first_name, last_name, email, age, password} = req.body

            const user = await Sessions.findOne({email:username})
            if(user){
              console.log('Usuario ya existe')
                return done(null, false)
            }
            const newUserInfo = {
              first_name,
              last_name,
              email,
              age,
              password: hashPass(password),
            }
            const session = await Sessions.create(newUserInfo)

            done(null, session)
            
          }catch (error) {
            done(error)
          }
        }
    )
  ) 

  passport.use(
      'login',
        new LocalStrategy(
            {usernameField: 'email'}, 
            async (username, password, done) =>{
                try {
                    const user = await Sessions.findOne({email: username})
                    if(!user){
                        console.log('Usuario no existe')
                        return done (null, false)
                    }
            
                    if(!isValidPass(password, user))return done(null, false)

                    done(null, user)
                } catch (error) {
                    done(error)
                }
            }
        )
    )

    passport.use(
      'github', 
      new GitHubStrategy({
        clientID:'Iv1.d5a21eaa8e23f910',
        clientSecret: '16b4626f986f4081e0d3c0bc1e0c2d6e2f6e9da6',
        callbackURL:'http://localhost:3000/auth/githubcallback'
    }, async (accesToken, refreshToken, profile, done) => {
      try {
        console.log(profile)
        const user = await Sessions.findOne({email:profile._json.email})
        if(!user){
          const newUserInfo ={
            fisrt_name: profile._json.name,
            last_name:'',
            age: 18,
            email: profile._json.email,
            password:''
          }
          const newUser = await Sessions.create(newUserInfo)
          console.log(newUser)
          return done(null, newUser)
        }
        done(null,user)
      } catch (error) {
        done(error)
      }
    })
    )

    passport.serializeUser((user,done) => {
        done(null,user.id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await Sessions.findById(id)
        done(null, user)
    })
}

module.exports = initializePassport