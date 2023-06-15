const mongoose = require('mongoose')

const mongoConnect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://gaiagames:gaiagames@eccomerce.bwoogg4.mongodb.net/mongoAvanzado?retryWrites=true&w=majority'
    )
    console.log('DB is Connected')
  } catch (error) {
    console.log(error)
  }
}

module.exports = mongoConnect