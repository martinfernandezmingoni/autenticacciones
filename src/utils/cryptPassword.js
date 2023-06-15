const bcrypt = require('bcrypt')

exports.hashPass = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

exports.isValidPass = (password, user) => {
    return bcrypt.compareSync(password, user.password)
}