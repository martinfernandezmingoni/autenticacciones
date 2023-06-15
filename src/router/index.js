const cookiesController = require('../cookies/controller.cookies')
const sessionsController = require('../sessions/controller.sessions')
const authController = require('../auth/controller.auth')
const viewsTemplate = require('../viewsTemplate/controller.viewsTemplate')

const router = app => {
  app.use('/auth', authController)
  app.use('/cookies', cookiesController)
  app.use('/sessions', sessionsController)
  app.use('/', viewsTemplate)
}

module.exports = router