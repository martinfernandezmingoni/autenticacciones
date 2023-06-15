const express = require('express')
const mongoConnect = require('../db')
const cookieParser = require('cookie-parser')
const handlebars = require('express-handlebars')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const router = require('./router')
const initializePassport = require('./config/passport.config')
const passport = require('passport')

const port = 3000

const app = express()


app.use(express.json())
app.unsubscribe(express.urlencoded({extended : true}))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://gaiagames:gaiagames@eccomerce.bwoogg4.mongodb.net/Sessions?retryWrites=true&w=majority',
      mongoOptions: {useNewUrlParser:true, useUnifiedTopology: true},
      ttl:15,
    }),
    secret:'code51120',
    resave: true,
    saveUninitialized: true
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')

mongoConnect()
router(app)

app.listen(port, () =>{
  console.log(`Server is running in port ${port}`)
})